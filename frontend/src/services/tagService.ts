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

const tagService = {
    getAll,
    createNew
}

export default tagService