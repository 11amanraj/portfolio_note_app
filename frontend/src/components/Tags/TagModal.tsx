import styles from './TagModal.module.css'
import ReactDOM from 'react-dom'
import { ReactNode } from 'react'

const ModalOverlay: React.FC<{children: ReactNode}> = ({children}) => {
    return ( 
        <div className={styles.container}>
            {children}
        </div>
     );
}

const TagModal: React.FC<{children: ReactNode}> = ({children}) => {
    const modalElement = document.querySelector('#tag-section-modal')

    if(modalElement) {
        return (
                <>
                    {ReactDOM.createPortal( <ModalOverlay>{children}</ModalOverlay>, modalElement)}
                </>
                )
    } else return null
    
}

// const Backdrop = () => {
//     return (
//         <div className={styles.container}/>
//     )
// }

// const ModalOverlay: React.FC<{children: ReactNode}> = ({children}) => {
//     return (
//         <div className={styles.bgd}>
//             <div className={styles.modal}>
//                 {children}
//             </div>
//         </div>
//     )
// }

// const Modal: React.FC<{children: ReactNode}> = ({children}) => {
//     const backdropRootEl = document.querySelector('#backdrop-root');
//     const overlayRootEl = document.querySelector('#overlay-root');

//     if(backdropRootEl && overlayRootEl) {
//         return (
//             <>
//                 {ReactDOM.createPortal( <ModalOverlay>{children}</ModalOverlay>, overlayRootEl)}  
//                 {ReactDOM.createPortal( <Backdrop />, backdropRootEl)}
//             </>
//         )
//     } else return null
// }
 
export default TagModal;