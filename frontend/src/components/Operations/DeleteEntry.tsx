import { useState } from "react"
import Modal from "../UI/Modal"
import { useNavigate } from "react-router-dom"

const DeleteEntry: React.FC<{
    onDelete: (id: string) => void, 
    id: string, 
    header: string}
> = ({onDelete, id, header}) => {
    
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    const deleteHandler = async () => {
        const response: any  = await onDelete(id)

        if(response.status === 200) {
            setShowModal(false)  
            navigate('/')
        }
    }

    const modalHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
        // e.stopPropagation()
        setShowModal(true)
    }

    const modalText = (
        <div>
            <h4>{header}</h4>
            <button onClick={deleteHandler}>Delete</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
    )

    return (
        <>
            {showModal && <Modal>{modalText}</Modal>}
            <span onClick={(e) => modalHandler(e)}>
                D
            </span>
        </>
    );
}

export default DeleteEntry;