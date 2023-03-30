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

    test('new tag is always created without spaces', async () => {
        const tagName ='New Tag  '
        const noSpaceName = 'NewTag'
        
        const response = await api
            .post('/api/tags')
            .send({name: tagName})
            .expect(201)

        expect(response.body.name).toBe(noSpaceName)
    })

    test('if tag name already exists in database (case insensitive) then it returns error 400', async () => {
        const tagName ='newTag'
        const tagNameInsensitive = 'NewTag'
        
        await api
            .post('/api/tags')
            .send({name: tagName})
            .expect(201)

        await api
            .post('/api/tags')
            .send({name: tagNameInsensitive})
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})

// npm run test tests/tag_api.test.js