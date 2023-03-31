import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import Note from '../models/note'
import Tag from '../models/tag'
import Notebook from '../models/notebook'
import { notes, tag } from '../types/types'

const api = supertest(app)

beforeEach(async () => {
    await Note.deleteMany({})
    await Notebook.deleteMany({})
    await Tag.deleteMany({})

    const notesTitle = ['First Note','Second Note']
    
    const savedNewNotebook = await api
        .post('/api/notebooks')
        .send({ title: 'Alpha Notebook' })


    const tagList = ['tag1', 'tag2', 'tag3']

    const tagPromiseArray = tagList.map(async (tag) => {
        const newTag = new Tag({name: tag})
        await newTag.save() 
    })
    await Promise.all(tagPromiseArray)

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

    test('deleting note removes tag and notebook reference', async () => {
        // selecting notebooks, notes and tags
        const allNotebooks = await api.get('/api/notebooks')  
        const allNotes = await api.get('/api/notes')
        const allTags = await api.get('/api/tags')

        const selectedNotebook = allNotebooks.body[0].id
        const selectedNote = allNotes.body[0].id
        const selectedTag = allTags.body[0].id

        // adding selectedTag to selectedNote 
        await api
            .put(`/api/notes/${selectedNote}`)
            .set('Content-Type', 'application/json')
            .send({tags: [selectedTag]})
            .expect(200)

        // checking if reference is added to Tag and Notebook
        const responseNotebook = await api.get(`/api/notebooks/${selectedNotebook}`)
        const responseTag = await api.get(`/api/tags/${selectedTag}`)

        expect(responseNotebook.body.notes.find((note: notes) => 
            note.id === selectedNote)
        ).toBeDefined()
        expect(responseTag.body.notes.find((note: notes) => 
            note.id === selectedNote)
        ).toBeDefined()

        // deleting Note
        await api
            .delete(`/api/notes/${selectedNote}`)
            .expect(204)

        // checking if reference is removed from Tag and Notebook
        const responseNotebook2 = await api.get(`/api/notebooks/${selectedNotebook}`)
        const responseTag2 = await api.get(`/api/tags/${selectedTag}`)

        expect(responseNotebook2.body.notes.find((note: notes) => 
            note.id === selectedNote)
        ).toBeUndefined()
        expect(responseTag2.body.notes.find((note: notes) => 
            note.id === selectedNote)
        ).toBeUndefined()
    })
})

describe('PUT request', () => {
    test('content is updated and put request returns updatedDocument', async () => {
        const content = 'Working'

        const allNotes = await api
            .get('/api/notes')

        const updatedNote = await api
            .put(`/api/notes/${allNotes.body[0].id}`)
            .set('Content-Type', 'application/json')
            .send({content: content})
            .expect(200)

        const response = await api
            .get('/api/notes')

        expect(response.body[0].content).toBe(content)
        expect(updatedNote.body.content).toBe(content)
    })

    test('note is pinned', async () => {
        const pinStatus = true

        const allNotes = await api
            .get('/api/notes')

        await api
            .put(`/api/notes/${allNotes.body[0].id}`)
            .set('Content-Type', 'application/json')
            .send({ pinned: pinStatus})
            .expect(200)

        const response = await api
            .get('/api/notes')

        expect(response.body[0].pinned).toBe(pinStatus)
    })

    test('tag is added to note', async () => {
        const allNotes = await api
            .get('/api/notes')

        const allTags = await api
            .get('/api/tags')

        console.log(allTags.body)

        const tagID = allTags.body[0].id

        await api
            .put(`/api/notes/${allNotes.body[0].id}`)
            .set('Content-Type', 'application/json')
            .send({tags: [tagID]})
            .expect(200)

        const response = await api
            .get('/api/notes')

        expect(response.body[0].tags.find((tag: tag) => 
            tag.id === tagID)
        ).toBeDefined()
    })

    test('removing tag removes associated reference', async () => {
        const allNotes = await api
            .get('/api/notes')

        const allTags = await api
            .get('/api/tags')

        const selectedNote = allNotes.body[0].id

        const tagID1 = allTags.body[0].id
        const tagID2 = allTags.body[1].id
        const tagID3 = allTags.body[2].id

        // adding tag1 and tag 2
        
        const firstAction = [tagID1, tagID2]

        const firstActionResponse = await api
            .put(`/api/notes/${selectedNote}`)
            .set('Content-Type', 'application/json')
            .send({tags: firstAction})
            .expect(200)

        expect(firstActionResponse.body.tags.filter((tag: tag) => 
            firstAction.includes(tag)
        )).toHaveLength(2)

        // checking if note id is added to corresponding tag
        const tagPromiseArray = firstAction.map(async (tag) => {
            const response = await api
                .get(`/api/tags/${tag}`)
            expect(response.body.notes.find((note: notes) => 
                note.id === selectedNote)
            ).toBeDefined()
        })

        await Promise.all(tagPromiseArray)

        // adding tag3 and removing tag 2

        const secondAction = [tagID1, tagID3]

        const secondActionResponse = await api
            .put(`/api/notes/${selectedNote}`)
            .set('Content-Type', 'application/json')
            .send({tags: secondAction})
            .expect(200)

        expect(secondActionResponse.body.tags.filter((tag: tag) => 
            secondAction.includes(tag)
        )).toHaveLength(2)

        // checking if note id is added to new tag (tag3)
        const tagID3Response = await api
            .get(`/api/tags/${tagID3}`)
        expect(tagID3Response.body.notes.find((note: notes) => 
            note.id === selectedNote)
        ).toBeDefined()

        // checking if note id is removed from the removed tag (tag2)
        const tagID2Response = await api
            .get(`/api/tags/${tagID2}`)
        expect(tagID2Response.body.notes.find((note: notes) => 
            note.id === selectedNote)
        ).toBeUndefined()
    })
})

afterAll(() => {
    mongoose.connection.close()
})

// npm run test tests/note_api.test.js
// npm test -- -t "removing tag removes associated reference"
