import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Note from '../models/note'
import Notebook from '../models/notebook'
import Tag from '../models/tag'
import { notebook, notes } from '../types/types'
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
})

// describe('POST request', () => {
//     test('post request creates new notebook', async () => { 
//         const { body: [selectedUser] } = await api
//             .get('/api/users')

//         const newNotebook = {
//             title: 'Testing Post Request',
//             user: selectedUser.id
//         }

//         const { body: savedNotebook } = await api
//             .post('/api/notebooks')
//             .send(newNotebook)
//             .expect(201)

//         await api
//             .get(`/api/notebooks/${savedNotebook.id}`)
//             .expect(200)
//     })

//     test('post request without user id returns error', async () => {
//         const newNotebook = {
//             title: 'Testing Post Request'
//         }

//         await api
//             .post('/api/notebooks')
//             .send(newNotebook)
//             .expect(400)
//     })

//     test('post request with title of less than 3 character returns error', async () => {
//         const { body: [selectedUser] } = await api
//             .get('/api/users')
        
//         const newNotebook = {
//             title: 'Te',
//             user: selectedUser.id
//         }

//         await api
//             .post('/api/notebooks')
//             .send(newNotebook)
//             .expect(400)
//     })

//     test('post request with non unique title returns error', async () => {
//         const { body: [selectedUser] } = await api
//             .get('/api/users')
        
//         const newNotebook = {
//             title: 'First Notebook',
//             user: selectedUser.id
//         }

//         await api
//             .post('/api/notebooks')
//             .send(newNotebook)
//             .expect(400)
//     })
// })

// npm run test tests/notebook_api.test.js

// describe('DELETE request', () => {
//     test('delete request removes the notebook', async () => {
//         const res = await api.get('/api/notebooks')
//         const initialLength = res.body.length
//         const notebookToBeDeleted = res.body[0]
        
//         await api
//             .delete(`/api/notebooks/${notebookToBeDeleted.id}`)
//             .expect(204)
    
//         const response = await api.get('/api/notebooks')
//         expect(response.body.length).toBe(initialLength-1)
//     })

//     test('deleting notebook also removes associated notes and in turn their reference in tags', async () => {
//         const res = await api.get('/api/notebooks')
//         const selectedNotebook = res.body[0].id

//         // creating new tag
//         const { body: { id: selectedTag } } = await api
//             .post('/api/tags')
//             .send({name: 'newTag'})
//             .expect(201)


//         // adding new note to the notebook
//         const { body: { id: selectedNote } } = await api
//             .post('/api/notes')
//             .send({
//                 title: 'Testing DELETE',
//                 content: '',
//                 author: 'John Doe',
//                 notebookID: selectedNotebook,
//             })
//             .expect(201)

//         // adding tag to the note
//         await api
//             .put(`/api/notes/${selectedNote}`)
//             .send({tags: [selectedTag]})
//             .expect(200)

//         // checking if note reference has been added to the tag
//         const { body: { notes: notesBefore } } = await api
//             .get(`/api/tags/${selectedTag}`)
        
//         expect(notesBefore.find((note: notes) => 
//             note.id === selectedNote
//         )).toBeDefined()

//         // deleting notebook
//         await api
//             .delete(`/api/notebooks/${selectedNotebook}`)
//             .expect(204)
    
//         // checking if added note has been deleted
//         await api
//             .get(`/api/notes/${selectedNote}`)
//             .expect(404)

//         // checking if note reference from tag has been removed
//         const { body: { notes: notesAfter } } = await api
//             .get(`/api/tags/${selectedTag}`)
        
//         expect(notesAfter.find((note: notes) => 
//             note.id === selectedNote
//         )).toBeUndefined()
//     })
// })

// describe('PUT request', () => {
//     test('put requests changes title and returns updated notebook', async () => {
//         const { body: [selectedNotebook] } = await api
//             .get('/api/notebooks')

//         const newTitle = 'not' + selectedNotebook.title

//         const { body: updatedNotebook } = await api
//             .put(`/api/notebooks/${selectedNotebook.id}`)
//             .send({title: newTitle})
//             .expect(201)

//         expect(updatedNotebook.title).toBe(newTitle)
//     })

//     test('put request with already similar title to another notebook returns error', async () => {
//         const { body: [selectedNotebook, differentNotebook] } = await api
//             .get('/api/notebooks')

//         const newTitle = differentNotebook.title

//         await api
//             .put(`/api/notebooks/${selectedNotebook.id}`)
//             .send({title: newTitle})
//             .expect(400)
//     })

//     test('put request with title having less than 3 characters returns error', async() => {
//         const { body: [selectedNotebook] } = await api
//             .get('/api/notebooks')

//         const newTitle = 'to'

//         await api
//             .put(`/api/notebooks/${selectedNotebook.id}`)
//             .send({title: newTitle})
//             .expect(400)
//     })
// })


afterAll(() => {
    mongoose.connection.close()
})

// npm run test tests/notebook_api.test.js