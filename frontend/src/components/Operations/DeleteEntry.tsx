import { useState } from "react"
import Modal from "../UI/Modal"

const DeleteEntry: React.FC<{onDelete: (id: string) => void, id: string}> = ({onDelete, id}) => {
    const [showModal, setShowModal] = useState(false)

    const deleteHandler = () => {
        onDelete(id)
        setShowModal(false)
    }

    const modalHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
        // e.stopPropagation()
        setShowModal(true)
    }

    const modalText = (
        <>
            <h2>Delete Notebook ? </h2>
            <button onClick={deleteHandler}>Delete</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
        </>
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