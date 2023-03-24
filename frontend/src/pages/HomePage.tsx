import { useContext, useState, useRef, useEffect } from 'react'
import NotesCollection from '../components/NotesGallery/NotesCollection';
import Search from '../components/Operations/Search';
import { CollectionType } from '../shared/interfaces/notes';
import styles from './Style.module.css'
import { NotebooksContext } from '../store/NotebooksContextProvider';
import { useInView } from 'react-intersection-observer';

const HomePage = () => {
    const importantUrl = 'http://localhost:8000/api/notes/important'

    const [renderItem, setRenderItem] = useState<number>(0)
    const { notebooks } =  useContext(NotebooksContext)

    const [ref, inView] = useInView({triggerOnce: true})

    useEffect(() => {
        if(inView) {
            setRenderItem(prev => prev + 1)
        }
    }, [inView])

    return (
        <section className={styles.container}>
            <Search />
            <NotesCollection
                description={{title: 'Important Notes'}}  
                renderComponent={true} 
                type={CollectionType.IMPORTANT} 
                url={importantUrl} 
            />
            {notebooks && notebooks.length > 0 && notebooks.map((notebook, i) => {
                if(renderItem === i) {
                    return <div key={notebook.id} ref={ref} >
                                <NotesCollection
                                    key={notebook.id}
                                    renderComponent={i < renderItem-1}
                                    description={{title: notebook.title}} 
                                    type={CollectionType.NOTEBOOK}
                                    url={`http://localhost:8000/api/notebooks/${notebook.id}`}
                                />
                            </div>
                } else {
                    return  <NotesCollection
                                key={notebook.id}
                                renderComponent={i < renderItem}
                                description={{title: notebook.title}} 
                                type={CollectionType.NOTEBOOK}
                                url={`http://localhost:8000/api/notebooks/${notebook.id}`} 
                            />
                }
            })}
        </section> 
     );
}
 
export default HomePage;