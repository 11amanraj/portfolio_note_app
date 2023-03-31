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

    test('returns error is any one of username, name or password is missing', async () => {
        const newUser = {
            username: 'JaneD',
            password: 'goodbye'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('returns error if username has less than 4 characters', async () => {
        const newUser = {
            username: 'JD',
            name: 'Jane Doe',
            password: 'goodbye',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('returns error if username is not unique (case sensitive)', async () => {
        const newUser = {
            username: 'JDoe',
            name: 'Jane Doe',
            password: 'goodbye',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})

// npm run test tests/user_api.test.js