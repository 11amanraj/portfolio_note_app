import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Note from '../models/note'
import Notebook from '../models/notebook'

const api = supertest(app)

beforeEach(async () => {
    await Note.deleteMany({})
    await Notebook.deleteMany({})

    const notesTitle = ['First Note','Second Note']
    
    const savedNewNotebook = await api
        .post('/api/notebooks')
        .send({ title: 'Alpha Notebook' })

    const promiseArray = notesTitle.map(note => 
        api
            .post('/api/notes')
            .send({
                title: note,
                content: '',
                author: 'John Doe',
                notebookID: savedNewNotebook.body.id
            })
    )
    await Promise.all(promiseArray)
}, 10000)

describe('GET request', () => {
    test('get all notes', async () => {
        const response = await api.get('/api/notes')
        expect(response.body).toHaveLength(2)
    })
})

describe('POST request', () => {
    test('post request creates new note and adds to provided notebook', async () => {
        const allNotebooks = await api.get('/api/notebooks')
        const notebookID = allNotebooks.body[0].id

        const newNote = {
            title: 'New Note',
            content: '',
            author: 'John Doe',
            notebookID: notebookID
        }

        const response = await api
            .post('/api/notes')
            .send(newNote)
            .expect(201)

        expect(response.body.notebook).toBe(notebookID)
    })
})

afterAll(() => {
    mongoose.connection.close()
})

// npm run test tests/note_api.test.js
