import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { notesCollection } from '../shared/interfaces/notes'
import NotesGallery from '../components/DisplaySection/NotesGallery'

const Notebook = () => {
    // const [notes, setNotes] = useState<notesCollection[]>([
    //     {
    //         title: '',
    //         author: '',
    //         id: ''
    //     }
    // ])
    // const [loading, setLoading] = useState(false)
    const params = useParams()

    // useEffect(() => {
    //     setLoading(true)
    //     axios
    //         .get(`http://localhost:8000/api/notebooks/${params.id}`)
    //         .then(response => {
    //             setNotes(response.data.notes)
    //             setLoading(false)
    //         })
    // }, [params.id])

    return (
        <NotesGallery id={params.id}/>
    )

    // if(loading) {
    //     return (
    //         <div>
    //             Loading.....
    //         </div>
    //     )
    // } else {
    //     return ( 
    //         <div>
    //             {notes[0].title}
    //         </div>
    //      )
    // }

}
 
export default Notebook;