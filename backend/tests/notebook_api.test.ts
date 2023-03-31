import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Note from '../models/note'
import Notebook from '../models/notebook'
import Tag from '../models/tag'
import { notebook, notes } from '../types/types'

const api = supertest(app)

beforeEach(async () => {
    await Notebook.deleteMany({})
    await Tag.deleteMany({})
    await Note.deleteMany({})

    const notebooks = [
        'First Notebook',
        'Second Notebook'
    ]

    const promiseArray = notebooks.map(async (notebook) => {
        const newNotebook = new Notebook({title: notebook})
        await newNotebook.save()
    })

    await Promise.all(promiseArray)
}, 10000)

describe('GET Request', () => {
    test('get all notebooks', async () => {
        const response = await api.get('/api/notebooks')
        expect(response.body).toHaveLength(2)
    })
    
    test('Checks if id property exists', async () => {
        const response = await api.get('/api/notebooks')
    
        response.body.forEach((notebook: notebook) => {
            expect(notebook.id).toBeDefined()
        })
    })
})

describe('POST request', () => {
    test('post request creates new notebook', async () => {
        const newNotebook = {
            title: 'Testing Post Request'
        }
        await api
            .post('/api/notebooks')
            .send(newNotebook)
            .expect(201)

        const response = await api.get('/api/notebooks')
        expect(response.body).toHaveLength(3)
    })

    test('post request with title of less than 3 character returns error', async () => {
        const newNotebook = {
            title: 'Te'
        }

        await api
            .post('/api/notebooks')
            .send(newNotebook)
            .expect(400)

        const response = await api.get('/api/notebooks')
        expect(response.body).toHaveLength(2)
    })

    test('post request with non unique title returns error', async () => {
        const newNotebook = {
            title: 'First Notebook'
        }

        await api
            .post('/api/notebooks')
            .send(newNotebook)
            .expect(400)

        const response = await api.get('/api/notebooks')
        expect(response.body).toHaveLength(2)
    })
})

describe('DELETE request', () => {
    test('delete request removes the notebook', async () => {
        const res = await api.get('/api/notebooks')
        const initialLength = res.body.length
        const notebookToBeDeleted = res.body[0]
        
        await api
            .delete(`/api/notebooks/${notebookToBeDeleted.id}`)
            .expect(204)
    
        const response = await api.get('/api/notebooks')
        expect(response.body.length).toBe(initialLength-1)
    })

    test('deleting notebook also removes associated notes and in turn their reference in tags', async () => {
        const res = await api.get('/api/notebooks')
        const selectedNotebook = res.body[0].id

        // creating new tag
        const { body: { id: selectedTag } } = await api
            .post('/api/tags')
            .send({name: 'newTag'})
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
            .expect(201)

        // adding tag to the note
        await api
            .put(`/api/notes/${selectedNote}`)
            .send({tags: [selectedTag]})
            .expect(200)

        // checking if note reference has been added to the tag
        const { body: { notes: notesBefore } } = await api
            .get(`/api/tags/${selectedTag}`)
        
        expect(notesBefore.find((note: notes) => 
            note.id === selectedNote
        )).toBeDefined()

        // deleting notebook
        await api
            .delete(`/api/notebooks/${selectedNotebook}`)
            .expect(204)
    
        // checking if added note has been deleted
        await api
            .get(`/api/notes/${selectedNote}`)
            .expect(404)

        // checking if note reference from tag has been removed
        const { body: { notes: notesAfter } } = await api
            .get(`/api/tags/${selectedTag}`)
        
        expect(notesAfter.find((note: notes) => 
            note.id === selectedNote
        )).toBeUndefined()
    })
})


afterAll(() => {
    mongoose.connection.close()
})

// npm run test tests/notebook_api.test.js