import styles from './DropDown.module.css'

const DropDown = () => {
    return ( 
        <div className={styles.container}>
            <input type='text' name='input-box' id='input-box'/>
        </div>
     );
}
 
export default DropDown;