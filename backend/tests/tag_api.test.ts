import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Tag from '../models/tag'
import { tag } from  '../types/types'
import User from '../models/user'
import bcrypt from 'bcrypt'

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

// describe('PUT request', () => {
//     test('put requests changes title and returns updated notebook', async () => {
//         const { body: [selectedTag] } = await api
//             .get('/api/tags')

//         const newName = 'not' + selectedTag.name

//         const { body: updatedTag } = await api
//             .put(`/api/tags/${selectedTag.id}`)
//             .send({ name: newName })
//             .expect(201)

//         expect(updatedTag.name).toBe(newName)
//     })

//     test('put request with similar title to another notebook returns error', async () => {
//         const { body: [selectedTag, differentTag] } = await api
//             .get('/api/tags')

//         const newName = differentTag.name

//         await api
//             .put(`/api/tags/${selectedTag.id}`)
//             .send({ name: newName })
//             .expect(400)
//     })
// })

afterAll(() => {
    mongoose.connection.close()
})

// npm run test tests/tag_api.test.js