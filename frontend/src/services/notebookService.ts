import axios from "axios"

const url = 'http://localhost:8000/api/notebooks'

const createNew = async (title: string, token: string) => {
    try {
        const response = await axios.post(url, {
            title: title
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

const getOne = async (id: string, token: string) => {
    const response = await axios.get(`${url}/${id}`, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}

const getPinned = async (id: string, token: string) => {
    const response = await axios.get(`${url}/${id}/pinned`, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}

const getRecent = async (id: string, token: string) => {
    const response = await axios.get(`${url}/${id}/recent`, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}

const searchTitle = async (text: string, token: string) => {
    try {
        const response = await axios.get(`${url}/search/${text}`, {
            headers: {
                Authorization: token
            }
        })
        return response.data
    } catch(error: any) {
        return Promise.reject(error.response)
    }
}

const notebookService = {
    getAll,
    createNew,
    deleteOne,
    getOne,
    getPinned,
    getRecent,
    searchTitle
}

export default notebookService