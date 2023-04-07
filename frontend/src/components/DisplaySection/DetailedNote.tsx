import { useState, useEffect } from 'react'
import { note, tag } from "../../shared/interfaces/notes";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from "react-router-dom";
import LoadingButton from "../UI/LoadingButton";
import Loading from "../UI/Loading";
import TagSection from "../Tags/TagSection";
import styles from './DetailedNote.module.css'
import { useAppDispatch, useAppSelector } from "../../store/storeHooks";
import noteService from "../../services/noteService";
import { updateOneNote } from "../../reducers/notebooksReducer";

const DetailedNote: React.FC<{id: string | undefined}> = ({id}) => {
    const [note, setNote] = useState<note>({
        title: '',
        content: '',
        id: '',
        dateCreated: new Date(0),
        dateModified: new Date(0),
        stringDateCreated: '',
        stringDateModified: '',
        pinned: false,
        tags: []
    })
    const [editNote, setEditNote] = useState(false)
    const [selectedTags, setSelectedTags] = useState<tag[]>([])

    // loading state for save note button
    const [buttonLoading, setButtonLoading] = useState(false)

    // loading state for fetching note
    const [fetchLoading, setFetchLoading] = useState(true)
    
    // react quill value
    const [value, setValue] = useState('')

    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const location = useLocation()

    useEffect(() => {
        // sets editNote to false when changing route        
        if(user.token && user.token?.length > 0) {
            if(location.state === null) {
                setEditNote(false)
            } else {
                if(location.state.edit) {
                    setEditNote(true)
                }
            }
            
            const fetchNote = async () => {
                setFetchLoading(true)
                const url = `http://localhost:8000/api/notes/${id}`
                const note = await noteService.getOne(url, user.token)
                setNote(note)
                setFetchLoading(false)
                setValue(note.content)
                setSelectedTags(note.tags)
            }
    
            fetchNote()
        }
    }, [id, location, user])

    const editToggler = () => {
        if(editNote) {
            // console.log(selectedTags)
            setValue(note.content)
            note.tags && setSelectedTags(note.tags)
        }
        setEditNote(prev => !prev)
    }

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
        }
    }

    const removeTagHandler = (tag: tag) => {
        const newTags = selectedTags.filter(setTag => setTag.id !== tag.id)
        setSelectedTags([...newTags])
    }

    const saveNoteHandler = async () => {
        try {
            const tagID = selectedTags.map(tag => tag.id) 
    
            const noteChanges = {
                content: value,
                tags: tagID,
                id: note.id
            }
    
            setButtonLoading(true)
            const savedNote = await noteService.editOne(noteChanges, user.token)
            dispatch(updateOneNote(savedNote))
            setNote(savedNote)
            setButtonLoading(false)
            setEditNote(false)
        } catch(error) {
            console.log(error)
        }
    }

    const editing = () => {
        const modules = {
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
          
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline"],
            //   [{ color: [] }, { background: [] }],
              // [{ script: 'sub' }, { script: 'super' }],
            //   [{ align: [] }],
              ["link"],
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
        // "link",
        // "mention",
        // "emoji",
        ];

        return (
            <div>
                <TagSection onRemove={removeTagHandler} onSelect={selectTagHandler} tags={selectedTags} editing={true} />
                <LoadingButton onSave={saveNoteHandler} loading={buttonLoading}/>
                <ReactQuill theme='snow' modules={modules} formats={formats} readOnly={false} value={value} onChange={setValue} />
            </div>
        )
    }

    const viewNote = () => {
        return (
            <div>
                <TagSection onSelect={() => console.log('viewing')} tags={selectedTags} editing={false} />
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