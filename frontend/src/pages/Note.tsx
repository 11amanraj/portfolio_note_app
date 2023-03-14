import { useParams } from 'react-router-dom'
import DetailedNote from '../components/DisplaySection/DetailedNote';
import SideBar from '../components/Navigation/Sidebar';

const Note = () => {
    const params = useParams()

    return (
        <>
            <DetailedNote id={params.noteid}/>
        </>
    )

}
 
export default Note;