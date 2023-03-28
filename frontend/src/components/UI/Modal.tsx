import styles from './Modal.module.css'
import ReactDOM from 'react-dom'
import { ReactNode } from 'react'

const Backdrop = () => {
    return (
        <div className={styles.container}/>
    )
}

const ModalOverlay: React.FC<{children: ReactNode}> = ({children}) => {
    return (
        <div className={styles.bgd}>
                {children}
            {/* <div className={styles.modal}>
            </div> */}
        </div>
    )
}

const Modal: React.FC<{children: ReactNode}> = ({children}) => {
    const backdropRootEl = document.querySelector('#backdrop-root');
    const overlayRootEl = document.querySelector('#overlay-root');

    if(backdropRootEl && overlayRootEl) {
        return (
            <>
                {ReactDOM.createPortal( <ModalOverlay>{children}</ModalOverlay>, overlayRootEl)}  
                {ReactDOM.createPortal( <Backdrop />, backdropRootEl)}
            </>
        )
    } else return null
}
 
export default Modal;