import { useState, useEffect } from 'react'
import axios from 'axios';
import { note } from '../shared/interfaces/notes';

const useHttp = (url: string, dataHandler: (note: note) => void) => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        setLoading(true)
        axios
            .get<note>(url)
            .then(response => {
                dataHandler(response.data)
                // setData(response.data)
                setLoading(false)
            })
            .catch(error => setMessage(error))
    }, [dataHandler, url])

    return { loading, message }
}
 
export default useHttp;