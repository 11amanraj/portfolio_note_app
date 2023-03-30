import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Note from '../models/note'
import Notebook from '../models/notebook'
import { notes } from '../types/types'

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

describe('DELETE request', () => {
    test('deleting note is succesful and also remove reference in associated Notebook', async () => {
        const allNotebooks = await api.get('/api/notebooks')
        const notebookID = allNotebooks.body[0].id

        const newNote = {
            title: 'New Note',
            content: '',
            author: 'John Doe',
            notebookID: notebookID
        }

        const savedNote = await api
            .post('/api/notes')
            .send(newNote)
      
        // checks that note was correctly referenced in a notebook
        const beforeAssociatdNotebook = await api
            .get(`/api/notebooks/${allNotebooks.body[0].id}`)
        
        expect(beforeAssociatdNotebook.body.notes
            .find((note: notes) => note.id === savedNote.body.id)
        ).toBeDefined()

        // deletes notes
        await api
            .delete(`/api/notes/${savedNote.body.id}`)
            .expect(204)

        // checks that note was correctly referenced in a notebook
        const afterAssociatdNotebook = await api
            .get(`/api/notebooks/${allNotebooks.body[0].id}`)
        
        expect(afterAssociatdNotebook.body.notes
            .find((note: notes) => note.id === savedNote.body.id)
        ).toBeUndefined()
    })
})

describe('PUT request', () => {
    test('content is updated', async () => {
        const content = 'Working'

        const allNotes = await api
            .get('/api/notes')

        await api
            .put(`/api/notes/${allNotes.body[0].id}`)
            .set('Content-Type', 'application/json')
            .send({content: content})
            .expect(204)

        const response = await api
            .get('/api/notes')

        expect(response.body[0].content).toBe(content)
    })

    test('note is pinned', async () => {
        const pinStatus = true

        const allNotes = await api
            .get('/api/notes')

        await api
            .put(`/api/notes/${allNotes.body[0].id}`)
            .set('Content-Type', 'application/json')
            .send({ pinned: pinStatus})
            .expect(204)

        const response = await api
            .get('/api/notes')

        expect(response.body[0].pinned).toBe(pinStatus)
    })
})

afterAll(() => {
    mongoose.connection.close()
})

// npm run test tests/note_api.test.js
