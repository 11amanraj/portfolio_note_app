import { useParams } from 'react-router-dom'
import DetailedNote from '../components/DisplaySection/DetailedNote';
import EditNote from '../components/Operations/EditNote';

const Note = () => {
    const params = useParams()

    if(params.param === 'edit') {
        return (
            <EditNote id={params.noteid}/>
        )
    } else {
        return (
            <DetailedNote id={params.noteid}/>
        )
    }

}
 
export default Note;