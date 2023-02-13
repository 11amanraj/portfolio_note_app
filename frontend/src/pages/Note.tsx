import { useParams } from 'react-router-dom'
import SingleNote from '../components/DisplaySection/SingleNote';

const Note = () => {
    const params = useParams()

    return ( 
        <SingleNote id={params.id}/>
     );
}
 
export default Note;