import axios from "axios"

const url = 'http://localhost:8000/api/notebooks'

const getAll = async (token: string) => {
    const response = await axios.get(url, {
        headers: {
            Authorization: token
        }
    })
    return response.data
}

const notebookService = {
    getAll
}

export default notebookService