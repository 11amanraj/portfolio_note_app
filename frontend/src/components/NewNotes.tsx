import { useEffect, useState } from 'react';
import axios from 'axios';

const SideBar = () => {
    
    interface notebooks {
        title: string;
        notes: string;
        id: string;
    }

    const [notebooks, setNotebooks] = useState<notebooks[] | null>(null)

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/notebooks')
            .then(response => 
                setNotebooks(response.data)
            )
    }, [])

    notebooks && notebooks.map(notebook => console.log(notebook.notes[0]))

    return ( 
        <div>
            {notebooks && notebooks.map(notebook => <p>{notebook.title}</p>)}
        </div>
     );
}
 
export default SideBar;
