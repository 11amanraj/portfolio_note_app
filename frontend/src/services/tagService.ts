import axios from "axios"

const url = 'http://localhost:8000/api/tags'

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

const updateOne = async (id: string, title: string, token: string) => {
    try {
        const tagObject = { title: title }
        const response = await axios.put(`${url}/${id}`, tagObject, {
            headers: {
                Authorization: token
            }
        })
        return response
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
        return response
    } catch(error: any) {
        return Promise.reject(error.response)
    }
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

const tagService = {
    getAll,
    createNew,
    getOne,
    updateOne,
    deleteOne,
    searchTitle
}

export default tagService