import styles from './Loading.module.css'

const Loading = () => {
    return ( 
        <div className={styles.bgd}>
            <div className={styles.spinner}>
            </div>
        </div>
     );
}
 
export default Loading;