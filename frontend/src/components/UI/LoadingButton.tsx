import styles from './LoadingButton.module.css'

const LoadingButton: React.FC<{loading: boolean, onSave: () => void}> = ({loading, onSave}) => {
    return ( 
        <button className={`${styles.btn} ${loading ? styles.loading : ''}`}>
            {loading ? <div></div>
                    : <div onClick={onSave}>Save Note</div>}
        </button>
     );
}
 
export default LoadingButton;