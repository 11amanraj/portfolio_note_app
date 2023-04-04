import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import bcrypt from 'bcrypt'
import Note from '../models/note'
import Tag from '../models/tag'
import Notebook from '../models/notebook'
import User from '../models/user'

const api = supertest(app)

let token: string

beforeEach(async () => {
    await Note.deleteMany({})
    await Notebook.deleteMany({})
    await Tag.deleteMany({})
    await User.deleteMany({})

    // creating a user
    const password = 'welcome'
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username: 'JDoe',
        name: 'John Doe',
        passwordHash: passwordHash,
        notebooks: []
    })
    const savedUser = await user.save()

    // logging in
    const response = await api
        .post('/api/login')
        .send({username: 'JDoe', password: password})

    token = `Bearer ${response.body.token}`

    // creating a notebook
    const newNotebook = new Notebook({
        title: 'First Notebook',
        user: savedUser._id
    })
    const savedNewNotebook = await newNotebook.save()

    // creating multiple notes
    const notesTitle = ['History Note','Working Tricks']

    const notesPromiseArray = notesTitle.map(async (note) => {
        const newNote = new Note({
            title: note,
            content: '',
            notebookID: savedNewNotebook._id,
            user: savedUser._id
        })
        await newNote.save() 
    })
    
    await Promise.all(notesPromiseArray)

    // creating multiple tags
    const tagList = ['important', 'homework', 'classwork']
    const tagPromiseArray = tagList.map(async (tag) => {
        const newTag = new Tag({
            title: tag,
            user: savedUser._id
        })
        await newTag.save() 
    })
    await Promise.all(tagPromiseArray)
})

test('GET request returns matching documents', async () => {
    const { body: searchResult1 } = await api
        .get(`/api/search/${'work'}`)
        .set({ Authorization: token })

    expect(searchResult1.notes).toHaveLength(1)
    expect(searchResult1.notebooks).toHaveLength(0)
    expect(searchResult1.tags).toHaveLength(2)

    const { body: searchResult2 } = await api
        .get(`/api/search/${'first'}`)
        .set({ Authorization: token })

    expect(searchResult2.notes).toHaveLength(0)
    expect(searchResult2.notebooks).toHaveLength(1)
    expect(searchResult2.tags).toHaveLength(0)
})

test('GET request only returns data from the user who provides the token', async () => {
    const { body: searchResult1 } = await api
        .get(`/api/search/${'work'}`)
        .set({ Authorization: token })

    expect(searchResult1.notes).toHaveLength(1)
    expect(searchResult1.notebooks).toHaveLength(0)
    expect(searchResult1.tags).toHaveLength(2)

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

    const { body: searchResult2 } = await api
        .get(`/api/search/${'work'}`)
        .set({ Authorization: secondToken })

    expect(searchResult2.notes).toHaveLength(0)
    expect(searchResult2.notebooks).toHaveLength(0)
    expect(searchResult2.tags).toHaveLength(0)
})

test('GET request matches from both title and content for notes', async () => {
    const { body : savedNotebook } = await api
        .post('/api/notebooks')
        .send({
            title: 'Architecture'
        })
        .set({ Authorization: token })
        .expect(201)

    console.log(savedNotebook)

    await api
        .post('/api/notes')
        .send({
            title: 'Schedule',
            content: 'Sustainability',
            notebookID: savedNotebook.id
        })
        .set({ Authorization: token })
        .expect(201)

    const { body: searchResult1 } = await api
        .get(`/api/search/${'Schedule'}`)
        .set({ Authorization: token })

    expect(searchResult1.notes).toHaveLength(1)

    const { body: searchResult2 } = await api
        .get(`/api/search/${'Sustainability'}`)
        .set({ Authorization: token })

    expect(searchResult2.notes).toHaveLength(1)
})

afterAll(() => {
    mongoose.connection.close()
})

// npm run test tests/search_api.test.js