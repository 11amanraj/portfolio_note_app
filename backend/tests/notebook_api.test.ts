import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Note from '../models/note'
import Notebook from '../models/notebook'
import Tag from '../models/tag'
import { notes } from '../types/types'
import User from '../models/user'
import bcrypt from 'bcrypt'

const api = supertest(app)

let token: string

beforeEach(async () => {
    await Notebook.deleteMany({})
    await Tag.deleteMany({})
    await Note.deleteMany({})
    await User.deleteMany({})

    const password = 'welcome'
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username: 'JDoe',
        name: 'John Doe',
        passwordHash: passwordHash,
        notebooks: []
    })

    const savedUser = await user.save()

    const response = await api
        .post('/api/login')
        .send({username: 'JDoe', password: password})

    token = `Bearer ${response.body.token}`

    const notebooks = [
        'First Notebook',
        'Second Notebook'
    ]

    const promiseArray = notebooks.map(async (notebook) => {
        const newNotebook = new Notebook({
            title: notebook,
            user: savedUser._id
        })
        await newNotebook.save()
    })

    await Promise.all(promiseArray)
}, 10000)

describe('GET Request', () => {
    test('get all notebooks for a user', async () => {
        const response = await api
            .get('/api/notebooks')
            .set({ Authorization: token })
            .expect(200)

        expect(response.body).toHaveLength(2)
    })

    test('get request without token returns 401 error', async () => {
        await api
            .get('/api/notebooks')
            .expect(401)
    })

    test('get requests only fetches notebooks from the associated user', async () => {
        const password = 'qwerty'
        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            username: 'anon',
            name: 'Anonymous',
            passwordHash: passwordHash,
            notebooks: []
        })
    
        const savedUser = await user.save()
    
        const response = await api
            .post('/api/login')
            .send({username: 'anon', password: password})

        const secondToken = `Bearer ${response.body.token}`

        const newNotebook = new Notebook({
            title: 'Second User Notebook',
            user: savedUser._id
        })
        await newNotebook.save()

        const { body: firstUserNB } = await api
            .get('/api/notebooks')
            .set({ Authorization: token })
            .expect(200)

        expect(firstUserNB).toHaveLength(2)

        const { body: SecondUserNB } = await api
            .get('/api/notebooks')
            .set({ Authorization: secondToken })
            .expect(200)

        expect(SecondUserNB).toHaveLength(1)
    })

    test('get/:id requests only fetches notebook if token matches the associated user', async () => {
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

        // creating new Notebook
        const newNotebook = new Notebook({
            title: 'Very New Notebook',
            user: savedUser._id
        })
        const createdNotebook = await newNotebook.save()

        // fetching tag from creator token
        await api
            .get(`/api/notebooks/${createdNotebook.id}`)
            .set({ Authorization: secondToken })
            .expect(200)

        // fetching tag from non-creator token
        await api
            .get(`/api/notebooks/${createdNotebook.id}`)
            .set({ Authorization: token })
            .expect(404)
    })
})

describe('POST request', () => {
    test('post request creates new notebook', async () => { 
        const newNotebook = {
            title: 'Testing Post Request'
        }

        const { body: savedNotebook } = await api
            .post('/api/notebooks')
            .send(newNotebook)
            .set({Authorization: token})
            .expect(201)

        await api
            .get(`/api/notebooks/${savedNotebook.id}`)
            .set({Authorization: token})
            .expect(200)
    })

    test('post request without token returns 401 error', async () => {
        const newNotebook = {
            title: 'Testing Post Request'
        }

        await api
            .post('/api/notebooks')
            .send(newNotebook)
            .expect(401)
    })

    test('post request with title of less than 3 character returns error', async () => {        
        const newNotebook = {
            title: 'Te'
        }

        await api
            .post('/api/notebooks')
            .send(newNotebook)
            .set({Authorization: token})
            .expect(400)
    })

    test('post request with non unique title returns error', async () => {
        const newNotebook = {
            title: 'First Notebook'
        }

        await api
            .post('/api/notebooks')
            .send(newNotebook)
            .set({Authorization: token})
            .expect(409)
    })

    test('two user can create notebooks with same name', async () => {
        // creating second user
        const password = 'qwerty'
        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            username: 'anon',
            name: 'Anonymous',
            passwordHash: passwordHash,
            notebooks: []
        })
    
        await user.save()
    
        // logging in second user
        const response = await api
            .post('/api/login')
            .send({username: 'anon', password: password})

        const secondToken = `Bearer ${response.body.token}`

        // saving a notebook for first user with same name
        const newNotebook = {
            title: 'First Notebook'
        }
        
        await api
            .post('/api/notebooks')
            .send(newNotebook)
            .set({Authorization: token})
            .expect(409)

        // saving a notebook for second user with same name
        await api
            .post('/api/notebooks')
            .send({ title: 'First Notebook' })
            .set({Authorization: secondToken})
            .expect(201)
    })
})

describe('PUT request', () => {
    test('put requests changes title and returns updated notebook', async () => {
        const { body: [selectedNotebook] } = await api
            .get('/api/notebooks')
            .set({ Authorization: token })

        const newTitle = 'not' + selectedNotebook.title

        const { body: updatedNotebook } = await api
            .put(`/api/notebooks/${selectedNotebook.id}`)
            .send({title: newTitle})
            .set({ Authorization: token })
            .expect(201)

        expect(updatedNotebook.title).toBe(newTitle)
    })

    test('put request with already similar title to another notebook returns error', async () => {
        const { body: [selectedNotebook, differentNotebook] } = await api
            .get('/api/notebooks')
            .set({ Authorization: token })

        const newTitle = differentNotebook.title

        await api
            .put(`/api/notebooks/${selectedNotebook.id}`)
            .send({title: newTitle})
            .set({ Authorization: token })
            .expect(409)
    })

    test('put request two user can have same notebook title', async () => {
        // creating second user
        const password = 'qwerty'
        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            username: 'anon',
            name: 'Anonymous',
            passwordHash: passwordHash,
            notebooks: []
        })
    
        await user.save()
    
        // logging in second user
        const response = await api
            .post('/api/login')
            .send({username: 'anon', password: password})

        const secondToken = `Bearer ${response.body.token}`

        // selecting a notebook from first user
        const { body: [selectedNotebook] } = await api
            .get('/api/notebooks')
            .set({ Authorization: token })

        const newTitle = selectedNotebook.title

        // creating a notebook for second user with new title 
        const newNotebook = {
            title: 'Very New Notebook'
        }
    
        const { body: createdNotebook } = await api
            .post('/api/notebooks')
            .send(newNotebook)
            .set({Authorization: secondToken})
            .expect(201)

        await api
            .put(`/api/notebooks/${createdNotebook.id}`)
            .send({title: newTitle})
            .set({Authorization: secondToken})
            .expect(201)
        // put request to change createdNotebook title to newTitle
    })

    test('put request with title having less than 3 characters returns error', async() => {
        const { body: [selectedNotebook] } = await api
            .get('/api/notebooks')
            .set({ Authorization: token })

        const newTitle = 'to'

        await api
            .put(`/api/notebooks/${selectedNotebook.id}`)
            .send({title: newTitle})
            .set({ Authorization: token })
            .expect(400)
    })
})

describe('DELETE request', () => {
    test('delete request removes the notebook', async () => {
        const res = await api
            .get('/api/notebooks')
            .set({ Authorization: token })
        const initialLength = res.body.length
        const notebookToBeDeleted = res.body[0]
        
        await api
            .delete(`/api/notebooks/${notebookToBeDeleted.id}`)
            .set({ Authorization: token })
            .expect(204)
    
        const response = await api
            .get('/api/notebooks')
            .set({ Authorization: token })
        expect(response.body.length).toBe(initialLength-1)
    })

    test('only user who created the notebook can delete it', async () => {
        // creating second user
        const password = 'qwerty'
        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            username: 'anon',
            name: 'Anonymous',
            passwordHash: passwordHash,
            notebooks: []
        })
    
        await user.save()
    
        // logging in second user
        const response = await api
            .post('/api/login')
            .send({username: 'anon', password: password})

        const secondToken = `Bearer ${response.body.token}`

        // selecting notebooks from first User
        const { body: [selectedNotebook] } = await api
            .get('/api/notebooks')
            .set({ Authorization: token })

        // deleting selectedNotebook by second User
        await api
            .delete(`/api/notebooks/${selectedNotebook.id}`)
            .set({ Authorization: secondToken })
            .expect(404)
    })

    test('deleting notebook also removes associated notes and in turn their reference in tags', async () => {
        const res = await api
            .get('/api/notebooks')
            .set({ Authorization: token })
        const selectedNotebook = res.body[0].id

        // creating new tag
        const { body: { id: selectedTag } } = await api
            .post('/api/tags')
            .send({title: 'newTag'})
            .set({ Authorization: token })
            .expect(201)


        // adding new note to the notebook
        const { body: { id: selectedNote } } = await api
            .post('/api/notes')
            .send({
                title: 'Testing DELETE',
                content: '',
                author: 'John Doe',
                notebookID: selectedNotebook,
            })
            .set({ Authorization: token })
            .expect(201)

        // adding tag to the note
        await api
            .put(`/api/notes/${selectedNote}`)
            .send({tags: [selectedTag]})
            .set({ Authorization: token })
            .expect(200)

        // checking if note reference has been added to the tag
        const { body: { notes: notesBefore } } = await api
            .get(`/api/tags/${selectedTag}`)
            .set({ Authorization: token })
        
        expect(notesBefore.find((note: notes) => 
            note.id === selectedNote
        )).toBeDefined()

        // deleting notebook
        await api
            .delete(`/api/notebooks/${selectedNotebook}`)
            .set({ Authorization: token })
            .expect(204)
    
        // checking if added note has been deleted
        await api
            .get(`/api/notes/${selectedNote}`)
            .set({ Authorization: token })
            .expect(404)

        // checking if note reference from tag has been removed
        const { body: { notes: notesAfter } } = await api
            .get(`/api/tags/${selectedTag}`)
            .set({ Authorization: token })
        
        expect(notesAfter.find((note: notes) => 
            note.id === selectedNote
        )).toBeUndefined()
    })
})

afterAll(() => {
    mongoose.connection.close()
})

// npm run test tests/notebook_api.test.js