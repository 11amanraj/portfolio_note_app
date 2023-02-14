const DeleteEntry: React.FC<{onDelete: (id: string) => void, id: string}> = ({onDelete, id}) => {
    
    const deleteHandler = () => {
        if (window.confirm('Delete this message')) {
            onDelete(id)
            console.log('deleted')
        }
    }

    return (
        <span onClick={deleteHandler}>
            D
        </span>
    );
}

export default DeleteEntry;