import axios from "axios";
import { useState, useEffect } from 'react'
import { note, tag } from "../../shared/interfaces/notes";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from "react-router-dom";
import LoadingButton from "../UI/LoadingButton";
import Loading from "../UI/Loading";
import TagSection from "../Tags/TagSection";
import styles from './DetailedNote.module.css'

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
        if(editNote) {
            setValue(note.content)
            note.tags && setSelectedTags(note.tags)
        }
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

    const selectTagHandler = (newTag: tag, editing: boolean) => {
        if(editing) {
            // check if active or inactive tag
            const isActive = selectedTags.map(eachTag => eachTag.id).includes(newTag.id)
            if (isActive) {
                const newTags = selectedTags.filter(tag => tag.id !== newTag.id)
                setSelectedTags([...newTags])
            } else {
                setSelectedTags(prev => [...prev, newTag])
            }
        } else {
            // add popup later
            console.log(newTag)
        }
    }

    const removeNoteHandler = (tag: tag) => {
        console.log(selectedTags.map(eachTag => eachTag.id).includes(tag.id))
        // const newTags = selectedTags.filter(selTag => selTag.id !== tag.id)
        // setSelectedTags([...newTags])
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
        const modules = {
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
          
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline"],
              [{ color: [] }, { background: [] }],
              // [{ script: 'sub' }, { script: 'super' }],
              [{ align: [] }],
              ["link", "blockquote", "emoji"],
              ["clean"],
            ],
            clipboard: {
              // toggle to add extra line breaks when pasting HTML:
              matchVisual: false,
            }
          };
          
        const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "mention",
        "emoji",
        ];

        return (
            <div>
                <TagSection onRemove={removeNoteHandler} onSelect={selectTagHandler} tags={selectedTags} editing={true} />
                <LoadingButton onSave={saveNoteHandler} loading={loading}/>
                <ReactQuill theme='snow' modules={modules} formats={formats} readOnly={false} value={value} onChange={setValue} />
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
            <div className={styles.container}>
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