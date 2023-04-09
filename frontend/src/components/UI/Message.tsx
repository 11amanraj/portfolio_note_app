import styles from './Message.module.css'
import ReactDOM from 'react-dom'

interface notification {
    error: boolean,
    message: string,
    id: string
}

const MessageOverlay: React.FC<{notification: notification[]}> = ({notification}) => {
    return (
        <div className={styles.container}>
            {notification && notification.map(notification => (
                <div key={notification.id} className={styles.notification}>
                    <div className={`${notification.error ? styles.error : styles.message}`}>
                        {notification.message}
                    </div>
                    <div className={styles.bar}></div>
                </div>
            ))}
        </div>
    )
}

const Message: React.FC<{notification: notification[]}> = ({notification}) => {
    const overlayRootEl = document.querySelector('#overlay-root');

    return (
        overlayRootEl 
        ? <>
                {ReactDOM.createPortal( 
                    <MessageOverlay notification={notification}/>, 
                    overlayRootEl
                )}
            {/* {ReactDOM.createPortal( <MessageOverlay notification={notification} error={error} message={message}/>, overlayRootEl)} */}
        </>
        : null
     );
}
 
export default Message;