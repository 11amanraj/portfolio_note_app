import axios from "axios"

const url = 'http://localhost:8000/api/tags'

const getAll = async (token: string) => {
    const response = await axios.get(url, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}

const tagService = {
    getAll
}

export default tagService