import axios from "axios";
import { useState, useEffect } from 'react'
import { note, tag } from "../../shared/interfaces/notes";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from "react-router-dom";
import LoadingButton from "../UI/LoadingButton";
import Loading from "../UI/Loading";
import TagSection from "./TagSection";

const DetailedNote: React.FC<{id: string | undefined}> = ({id}) => {
    const [note, setNote] = useState<note>({
        title: '',
        content: '',
        author: '',
        id: '',
        dateCreated: new Date(0),
        dateModified: new Date(0),
        stringDateCreated: '',
        stringDateModified: '',
        pinned: false,
        tags: []
    })
    
    const [editNote, setEditNote] = useState(false)
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(true)
    const [selectedTags, setSelectedTags] = useState<tag[]>([])

    const editToggler = () => {
        setEditNote(prev => !prev)
    }

    const location = useLocation()

    useEffect(() => {
        // sets editNote to false when changing route

        if(location.state === null) {
            setEditNote(false)
        } else {
            if(location.state.edit) {
                setEditNote(true)
            }
        }

        setFetchLoading(true)

        axios
            .get(`http://localhost:8000/api/notes/${id}`)
            .then(response => {
                setFetchLoading(false)
                setNote(response.data)
                setValue(response.data.content)
                setSelectedTags(response.data.tags)
            })
    }, [id, location])

    const selectTagHandler = (newTag: tag) => {
        const checkDuplicate = selectedTags.filter(tag => tag.id === newTag.id)
        if(checkDuplicate.length === 0) {
            setSelectedTags(prev => [...prev, newTag])
        }
    }

    const removeNoteHandler = (tag: tag) => {
        const newTags = selectedTags.filter(selTag => selTag.id !== tag.id)
        setSelectedTags([...newTags])
    }

    const dummyRemoveTagHandler = () => {
        console.log('dummy')
    }

    const saveNoteHandler = () => {
        const tagID = selectedTags.map(tag => tag.id) 
        console.log(tagID)

        setLoading(true)
        axios
            .put(`http://localhost:8000/api/notes/${id}`, {
                content: value, tags: tagID
            })
            .then(response => {
                setLoading(false)
                console.log(response)
                setEditNote(false)
            })
    }

    const editing = () => {
        return (
            <div>
                <h1>Editing</h1>
                <TagSection onRemove={removeNoteHandler} onSelect={selectTagHandler} tags={selectedTags} editing={true} />
                <LoadingButton onSave={saveNoteHandler} loading={loading}/>
                <ReactQuill theme='snow' readOnly={false} value={value} onChange={setValue} />
            </div>
        )
    }

    const viewNote = () => {
        return (
            <div>
                <TagSection onRemove={dummyRemoveTagHandler} onSelect={selectTagHandler} tags={selectedTags} editing={false} />
                <ReactQuill theme='bubble' readOnly={true} value={value} onChange={setValue} />
            </div>
        )
    }

    if(fetchLoading) {
        return (
            <Loading />
        )
    } else {
        return ( 
            <div>
                <button onClick={editToggler}>{editNote ? 'Cancel Editing' : 'Edit Note'}</button>
                <h1>{note.title}</h1>
                {editNote 
                    ? editing()
                    : viewNote()
                }
            </div>
         );
    }

}
 
export default DetailedNote;