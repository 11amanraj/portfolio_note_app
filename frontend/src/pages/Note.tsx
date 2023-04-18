import { useParams } from 'react-router-dom'
import DetailedNote from '../components/DisplaySection/DetailedNote';
import SideBar from '../components/Navigation/Sidebar';
import EachPage from './EachPage';

const Note = () => {
    const params = useParams()

    // return (
    //     <>
    //         <SideBar />
    //         <DetailedNote id={params.noteid}/>
    //     </>
    // )

    return (
        <EachPage>
            <DetailedNote id={params.noteid}/>
        </EachPage>
    )

}
 
export default Note;