import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Tag from '../models/tag'
import { tag } from  '../types/types'
import User from '../models/user'
import bcrypt from 'bcrypt'
import Note from '../models/note'

const api = supertest(app)

let token: string

beforeEach(async () => {
    await Tag.deleteMany({})
    // await Notebook.deleteMany({})
    // await Note.deleteMany({})
    await User.deleteMany({})

    // saving new user
    const password = 'welcome'
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username: 'JDoe',
        name: 'John Doe',
        passwordHash: passwordHash,
        notebooks: []
    })

    const savedUser = await user.save()

    // logging in the saved user
    const response = await api
        .post('/api/login')
        .send({username: 'JDoe', password: password})

    token = `Bearer ${response.body.token}`

    // creating tags
    const tagList = ['important', 'today', 'homework']

    const promiseArray = tagList.map(async (tag) => {
        const newTag = new Tag({
            title: tag,
            user: savedUser._id
        })
        await newTag.save() 
    })
    await Promise.all(promiseArray)
})

describe('GET request', () => {
    test('get all tags for a user', async () => {
        const response = await api
            .get('/api/tags')
            .set({ Authorization: token })
            .expect(200)

        expect(response.body).toHaveLength(3)
    })

    test('get request without token returns 401 error', async () => {
        await api
            .get('/api/tags')
            .expect(401)
    })

    test('get requests only fetches tags from the associated user', async () => {
        // creating new user
        const password = 'qwerty'
        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            username: 'anon',
            name: 'Anonymous',
            passwordHash: passwordHash,
            notebooks: []
        })
    
        const savedUser = await user.save()
    
        // logging in the new user
        const response = await api
            .post('/api/login')
            .send({username: 'anon', password: password})

        const secondToken = `Bearer ${response.body.token}`

        // creating new Tag
        const newTag = new Tag({
            title: 'Second User Tag',
            user: savedUser._id
        })
        await newTag.save()

        const { body: firstUserTag } = await api
            .get('/api/tags')
            .set({ Authorization: token })
            .expect(200)

        expect(firstUserTag).toHaveLength(3)

        const { body: SecondUserTag } = await api
            .get('/api/tags')
            .set({ Authorization: secondToken })
            .expect(200)

        expect(SecondUserTag).toHaveLength(1)
    })

    test('get/:id requests only fetch tag if match the associated user', async () => {
        // creating new user
        const password = 'qwerty'
        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            username: 'anon',
            name: 'Anonymous',
            passwordHash: passwordHash,
            notebooks: []
        })
    
        const savedUser = await user.save()
    
        // logging in the new user
        const response = await api
            .post('/api/login')
            .send({username: 'anon', password: password})

        const secondToken = `Bearer ${response.body.token}`

        // creating new Tag
        const newTag = new Tag({
            title: 'Second User Tag',
            user: savedUser._id
        })
        const createdTag = await newTag.save()

        // fetching tag from creator token
        await api
            .get(`/api/tags/${createdTag.id}`)
            .set({ Authorization: secondToken })
            .expect(200)

        // fetching tag from non-creator token
        await api
            .get(`/api/tags/${createdTag.id}`)
            .set({ Authorization: token })
            .expect(404)
    })
})

describe('POST request', () => {
    test('post request creates new tag', async () => { 
        const newTag = {
            title: 'Testing Post Request'
        }

        const { body: savedTag } = await api
            .post('/api/tags')
            .send(newTag)
            .set({Authorization: token})
            .expect(201)

        await api
            .get(`/api/tags/${savedTag.id}`)
            .set({Authorization: token})
            .expect(200)

        const response = await api
            .get('/api/tags')
            .set({ Authorization: token })
            .expect(200)

        expect(response.body).toHaveLength(4)
    })

    test('post request without token returns 401 error', async () => {
        const newTag = {
            title: 'Testing Post Request'
        }

        await api
            .post('/api/tags')
            .send(newTag)
            .expect(401)
    })

    test('post request without name returns 400 error', async () => {
        const newTag = {}

        await api
            .post('/api/tags')
            .send(newTag)
            .set({Authorization: token})
            .expect(400)
    })

    test('new tag is always created without spaces', async () => {
        const tagTitle ='New Tag  '
        const noSpaceTitle = 'NewTag'
        
        const response = await api
            .post('/api/tags')
            .send({ title: tagTitle })
            .set({Authorization: token})
            .expect(201)

        expect(response.body.title).toBe(noSpaceTitle)
    })

    test('if tag name already exists in database (case insensitive) then it returns error 409', async () => {
        const tagTitle ='newTag'
        const tagTitleInsensitive = 'NewTag'
        
        // created first tag
        await api
            .post('/api/tags')
            .send({ title: tagTitle })
            .set({Authorization: token})
            .expect(201)

        // trying to create second tag with same title
        await api
            .post('/api/tags')
            .send({ title: tagTitleInsensitive })
            .set({Authorization: token})
            .expect(409)

        // creating new user
        const password = 'qwerty'
        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            username: 'anon',
            name: 'Anonymous',
            passwordHash: passwordHash,
            notebooks: []
        })
    
        await user.save()
    
        // logging in the new user
        const response = await api
            .post('/api/login')
            .send({username: 'anon', password: password})

        const secondToken = `Bearer ${response.body.token}`

        // trying to create tag for second user with same name
        await api
            .post('/api/tags')
            .send({title: tagTitleInsensitive})
            .set({Authorization: secondToken})
            .expect(201)
    })
})

describe('PUT request', () => {
    test('put requests changes title and returns updated tag', async () => {
        const { body: [selectedTag] } = await api
            .get('/api/tags')
            .set({Authorization: token})

        const newTitle = 'not' + selectedTag.title

        const { body: updatedTag } = await api
            .put(`/api/tags/${selectedTag.id}`)
            .send({ title: newTitle })
            .set({Authorization: token})
            .expect(201)

        expect(updatedTag.title).toBe(newTitle)
    })

    test('put request with similar title to another tag returns error', async () => {
        // selecting tag
        const { body: [selectedTag, differentTag] } = await api
            .get('/api/tags')
            .set({Authorization: token})

        const newTitle = differentTag.title

        // changing title
        await api
            .put(`/api/tags/${selectedTag.id}`)
            .send({ title: newTitle })
            .set({Authorization: token})
            .expect(400)

        // creating new user
        const password = 'qwerty'
        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            username: 'anon',
            name: 'Anonymous',
            passwordHash: passwordHash,
            notebooks: []
        })
    
        await user.save()
    
        // logging in the new user
        const response = await api
            .post('/api/login')
            .send({username: 'anon', password: password})

        const secondToken = `Bearer ${response.body.token}`

        // creating new tag for second user with new name
        const { body: createdTag } = await api
            .post('/api/tags')
            .send({title: 'new name'})
            .set({Authorization: secondToken})
            .expect(201)

        // changing createdTag title to same title as first user's tag
        await api
            .put(`/api/tags/${createdTag.id}`)
            .send({ title: newTitle })
            .set({Authorization: secondToken})
            .expect(201)
    })
})

describe('DELETE request', () => {
    test('deleting tag also removes reference in associated note', async () => {
        // creating new user
        const password = 'qwerty'
        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            username: 'anon',
            name: 'Anonymous',
            passwordHash: passwordHash,
            notebooks: []
        })
    
        const savedUser = await user.save()
    
        // logging in the new user
        const res = await api
            .post('/api/login')
            .send({username: 'anon', password: password})

        const secondToken = `Bearer ${res.body.token}`

        // creating tag for second user
        const newTag = new Tag({
            title: 'New Tag',
            user: savedUser._id
        })
        const selectedTag = await newTag.save() 
        
        // creating new note with selectedTag
        const newNote = new Note({
            title: 'First Note',
            content: '',
            author: 'John Doe',
            user: savedUser._id
        })
        const selectedNote = await newNote.save()

        // adding selectedTag to the selectedNote
        const { body: updatedNote } = await api
            .put(`/api/notes/${selectedNote._id}`)
            .set('Content-Type', 'application/json')
            .send({tags: [selectedTag._id]})
            .set({ Authorization: secondToken })
            .expect(200)

        expect(updatedNote.tags.find((tag: tag) => 
            tag === selectedTag.id
        )).toBeDefined()

        // deleting the selectedTag
        await api
            .delete(`/api/tags/${selectedTag._id}`)
            .set({ Authorization: secondToken })
            .expect(204)

        // checking if tag reference has been removed from associated note
        const { body: returnedNote } = await api
            .put(`/api/notes/${selectedNote._id.toString()}`)
            .set({ Authorization: secondToken })
            .expect(200)

        expect(returnedNote.tags.find((tag: tag) => 
            tag === selectedTag.id
        )).toBeUndefined()
    })
})

afterAll(() => {
    mongoose.connection.close()
})

// npm run test tests/tag_api.test.js