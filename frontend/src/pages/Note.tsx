import { useParams } from 'react-router-dom'
import DetailedNote from '../components/DisplaySection/DetailedNote';
import EditNote from '../components/Operations/EditNote';

const Note = () => {
    const params = useParams()

    return (
        // <DetailedNote id={params.noteid}/>
        <EditNote id={params.noteid}/>
     );
}
 
export default Note;