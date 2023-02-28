import { useState, useEffect } from 'react'
import axios from 'axios';
import { note } from '../shared/interfaces/notes';

const useHttp = (url: string, dataHandler: (note: note) => void) => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        (async() => {
            try {
                setLoading(true)
                const response = await axios.get(url)
                dataHandler(response.data)
                setLoading(false)
            } catch(error: any) {
                setMessage(error)
            }
        })()
    }, [url, dataHandler])

    return { loading, message }
}
 
export default useHttp;