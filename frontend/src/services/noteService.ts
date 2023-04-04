import axios from "axios"

const url = 'http://localhost:8000/api/notes'

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

const noteService = {
    getAll,
    createNew,
    deleteOne
}

export default noteService