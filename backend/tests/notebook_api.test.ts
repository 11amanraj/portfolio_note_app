import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Notebook from '../models/notebook'

const api = supertest(app)

beforeEach(async () => {
    await Notebook.deleteMany({})

    const notebooks = [
        'First Notebook',
        'Second Notebook'
    ]

    notebooks.forEach(async (notebook) => {
        const newNotebook = new Notebook({title: notebook})
        await newNotebook.save()
    })
})

describe('Get Request', () => {
    test('get all notebooks', async () => {
        const response = await api.get('/api/notebooks')
        expect(response.body).toHaveLength(2)
    })
})

describe('Check Property', () => {
    test('Checks if id property exists', async () => {
        const response = await api.get('/api/notebooks')
    
        response.body.forEach(notebook => {
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
})


afterAll(() => {
    mongoose.connection.close()
})

// npm run test tests/notebook_api.test.js