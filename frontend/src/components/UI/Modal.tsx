import styles from './Modal.module.css'
import ReactDOM from 'react-dom'
import { ReactNode } from 'react'

const Backdrop: React.FC<{closeModal?: () => void}> = ({closeModal}) => {
    return (
        <div onClick={closeModal} className={styles.container}/>
    )
}

const ModalOverlay: React.FC<{children: ReactNode, closeModal?: () => void}> = ({children, closeModal}) => {
    return (
        <>
            <div className={styles.bgd}>
                {children}
            </div>
            <div onClick={closeModal} className={styles.container}/>
        </>
    )
}

const Modal: React.FC<{children: ReactNode, closeModal?: () => void}> = ({children, closeModal}) => {
    const backdropRootEl = document.querySelector('#backdrop-root');
    const overlayRootEl = document.querySelector('#overlay-root');

    if(backdropRootEl && overlayRootEl) {
        return (
            <>
                {ReactDOM.createPortal( <ModalOverlay closeModal={closeModal}>{children}</ModalOverlay>, overlayRootEl)}  
                {ReactDOM.createPortal( <Backdrop closeModal={closeModal} />, backdropRootEl)}
            </>
        )
    } else return null
}
 
export default Modal;