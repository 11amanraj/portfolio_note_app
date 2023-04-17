import axios from "axios"

const url = 'http://localhost:8000/api/notes'

interface updateNote {
    content?: string,
    tags?: string[],
    id: string,
    pinned?: boolean
}

const createNew = async ({title, notebookID }: {title: string, notebookID: string}, token: string) => {
    try {
        const response = await axios.post(url, {
            title: title,
            content: '',
            notebookID: notebookID
        } , {
            headers: {
                Authorization: token
            }
        })
        return response.data
    } catch(error: any) {
        return Promise.reject(error.response)
    }
}

const deleteOne = async (id: string, token: string) => {
    try {
        const response = await axios.delete(`${url}/${id}`, {
            headers: {
                Authorization: token
            }
        })
        return response.data
    } catch(error: any) {
        return Promise.reject(error.response)
    }
}

const getAll = async (token: string) => {
    const response = await axios.get(url, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}

const getOne = async (url: string, token: string) => {
    const response = await axios.get(url, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}

const getPinned = async (token: string) => {
    const response = await axios.get(`${url}/pinned`, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}

const editOne = async (note: updateNote, token: string) => {
    try {
        const response = await axios.put(`${url}/${note.id}`, note , {
            headers: {
                Authorization: token
            }
        })
        return response.data
    } catch(error: any) {
        return Promise.reject(error.response)
    }
}

const noteService = {
    getAll,
    createNew,
    deleteOne,
    getOne,
    editOne,
    getPinned
}

export default noteService