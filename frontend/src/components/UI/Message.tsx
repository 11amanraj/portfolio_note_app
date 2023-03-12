import styles from './Message.module.css'
import ReactDOM from 'react-dom'

const MessageOverlay: React.FC<{error: boolean, message: string}> = ({error, message}) => {
    return (
        <div className={styles.container}>
            <div className={`${error ? styles.error : styles.message}`}>
                {message}
            </div>
            <div className={styles.bar}></div>
        </div>
    )
}

const Message: React.FC<{error: boolean, message: string}> = ({error, message}) => {
    const overlayRootEl = document.querySelector('#overlay-root');
    console.log(message)

    return (
        overlayRootEl 
        ? <>
            {ReactDOM.createPortal( <MessageOverlay error={error} message={message}/>, overlayRootEl)}
        </>
        : null
     );
}
 
export default Message;