import { useContext } from 'react';
import styles from './Sidebar.module.css'
import NotebookTitles from './NotebookTitles';
import { Link } from 'react-router-dom';
import AddEntry from '../Operations/AddEntry';
import Filter from '../Operations/Filter';
import Message from '../UI/Message';
import EveryTag from './EveryTag';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { addNewNotebook } from '../../reducers/notebooksReducer';
import NotebookAccordion from './NotebookAccordion';

const SideBar = () => {
    const notebooks = useAppSelector(state => state.notebooks)
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const saveNotebook = async (title: string) => {
        const result = await dispatch(addNewNotebook(title, user.token))
        return result
    }
 

    // Add loading component here

    // return (
    //     <div id="accordionGroup" class="accordion">
    //         <h3>
    //             <button type="button" aria-expanded="true" class="accordion-trigger" aria-controls="sect1" id="accordion1id">
    //             <span class="accordion-title">
    //                 Personal Information
    //                 <span class="accordion-icon"></span>
    //             </span>
    //             </button>
    //         </h3>
    //         <div id="sect1" role="region" aria-labelledby="accordion1id" class="accordion-panel">
    //             <div>
                
    //             <fieldset>
    //                 <p>
    //                 <label for="cufc1">Name<span aria-hidden="true">*</span>:</label>
    //                 <input type="text" value="" name="Name" id="cufc1" class="required" aria-required="true">
    //                 </p>
    //                 <p>
    //                 <label for="cufc2">Email<span aria-hidden="true">*</span>:</label>
    //                 <input type="text" value="" name="Email" id="cufc2" aria-required="true">
    //                 </p>
    //                 <p>
    //                 <label for="cufc3">Phone:</label>
    //                 <input type="text" value="" name="Phone" id="cufc3">
    //                 </p>
    //                 <p>
    //                 <label for="cufc4">Extension:</label>
    //                 <input type="text" value="" name="Ext" id="cufc4">
    //                 </p>
    //                 <p>
    //                 <label for="cufc5">Country:</label>
    //                 <input type="text" value="" name="Country" id="cufc5">
    //                 </p>
    //                 <p>
    //                 <label for="cufc6">City/Province:</label>
    //                 <input type="text" value="" name="City_Province" id="cufc6">
    //                 </p>
    //             </fieldset>
    //             </div>
    //         </div>

    //         <h3>
    //             <button type="button" aria-expanded="false" class="accordion-trigger" aria-controls="sect2" id="accordion2id">
    //             <span class="accordion-title">
    //                 Billing Address
    //                 <span class="accordion-icon"></span>
    //             </span>
    //             </button>
    //         </h3>
    //         <div id="sect2" role="region" aria-labelledby="accordion2id" class="accordion-panel" hidden="">
    //             <div>
    //             <fieldset>
    //                 <p>
    //                 <label for="b-add1">Address 1:</label>
    //                 <input type="text" name="b-add1" id="b-add1">
    //                 </p>
    //                 <p>
    //                 <label for="b-add2">Address 2:</label>
    //                 <input type="text" name="b-add2" id="b-add2">
    //                 </p>
    //                 <p>
    //                 <label for="b-city">City:</label>
    //                 <input type="text" name="b-city" id="b-city">
    //                 </p>
    //                 <p>
    //                 <label for="b-state">State:</label>
    //                 <input type="text" name="b-state" id="b-state">
    //                 </p>
    //                 <p>
    //                 <label for="b-zip">Zip Code:</label>
    //                 <input type="text" name="b-zip" id="b-zip">
    //                 </p>
    //             </fieldset>
    //             </div>
    //         </div>

    //         <h3>
    //             <button type="button" aria-expanded="false" class="accordion-trigger" aria-controls="sect3" id="accordion3id">
    //             <span class="accordion-title">
    //                 Shipping Address
    //                 <span class="accordion-icon"></span>
    //             </span>
    //             </button>
    //         </h3>
    //         <div id="sect3" role="region" aria-labelledby="accordion3id" class="accordion-panel" hidden="">
    //             <div>
    //             <fieldset>
    //                 <p>
    //                 <label for="m-add1">Address 1:</label>
    //                 <input type="text" name="m-add1" id="m-add1">
    //                 </p>
    //                 <p>
    //                 <label for="m-add2">Address 2:</label>
    //                 <input type="text" name="m-add2" id="m-add2">
    //                 </p>
    //                 <p>
    //                 <label for="m-city">City:</label>
    //                 <input type="text" name="m-city" id="m-city">
    //                 </p>
    //                 <p>
    //                 <label for="m-state">State:</label>
    //                 <input type="text" name="m-state" id="m-state">
    //                 </p>
    //                 <p>
    //                 <label for="m-zip">Zip Code:</label>
    //                 <input type="text" name="m-zip" id="m-zip">
    //                 </p>
    //             </fieldset>
    //             </div>
    //         </div>
    //     </div>
    // )

    return ( 
        <nav className={styles.container}>
            {/* {showMessage && <Message error={error} message={title}/>} */}
            {/* <Link to={'/'}><h2>TheNotesApp</h2></Link>
            <AddEntry addEntry={saveNotebook}/>
            <Filter /> */}
            <div id='notebookAccordion'>
                {notebooks.map(notebook => (
                    <NotebookTitles key={notebook.id} notebook={notebook}/>
                ))}
            </div>
            <ul className={styles.accordion}>
                <NotebookAccordion />
                <NotebookAccordion />
            </ul>
            {/* <EveryTag /> */}
        </nav>
     );
}
 
export default SideBar;
