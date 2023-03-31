import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import User from '../models/user'
import { user } from '../types/types'

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const user = new User({
        username: 'JDoe',
        name: 'John Doe',
        password: 'welcome',
    })

    await user.save()
})

describe('GET request', () => {
    test('get all users', async () => {
        const { body: users } = await api
            .get('/api/users')
            .expect(200)

        expect(users).toHaveLength(1)
    })

    test('get one user', async () => {
        const newUser = {
            username: 'JaneD',
            name: 'Jane Doe',
            password: 'goodbye',
        }

        const { body: savedUser } = await api
            .post('/api/users')
            .send(newUser)
            .expect(201)

        await api
            .get(`/api/users/${savedUser.id}`)
            .expect(200)
    })
})

describe('POST request', () => {
    test('creating new user', async () => {
        const newUser = {
            username: 'JaneD',
            name: 'Jane Doe',
            password: 'goodbye',
        }

        const { body: savedUser } = await api
            .post('/api/users')
            .send(newUser)
            .expect(201)

        expect(savedUser.username).toBe(newUser.username)
        
        const { body: allUsers } = await api.get('/api/users')
        expect(allUsers.find((user: user) => 
            user.id === savedUser.id
        )).toBeDefined()
    })
})

afterAll(() => {
    mongoose.connection.close()
})

// npm run test tests/user_api.test.js