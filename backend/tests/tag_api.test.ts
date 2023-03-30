import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Tag from '../models/tag'
import { tag } from  '../types/types'

const api = supertest(app)

beforeEach(async () => {
    await Tag.deleteMany({})
    
    const tagList = ['important', 'today', 'homework']

    const promiseArray = tagList.map(async (tag) => {
        const newTag = new Tag({name: tag})
        await newTag.save() 
    })
    await Promise.all(promiseArray)
})

describe('GET request', () => {
    test('get all tags', async () => {
        const response = await api
            .get('/api/tags')

        expect(response.body).toHaveLength(3)
    })
})

describe('POST request', () => {
    test('creating new tag', async () => {
        const tagName ='newTag'
        await api
            .post('/api/tags')
            .send({name: tagName})
            .expect(201)

        const response = await api
            .get('/api/tags')

        expect(response.body.find((tag: tag) => tag.name === tagName))
            .toBeDefined()
    })
})

afterAll(() => {
    mongoose.connection.close()
})

// npm run test tests/tag_api.test.js