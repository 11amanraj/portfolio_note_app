import { ReactNode } from "react";
import styles from './SectionCard.module.css'

const SectionCard: React.FC<{children: ReactNode, classes?: string}> = ({children, classes}) => {
    return ( 
        <section className={`${styles.container} ${classes}`}>
            {children}
        </section>
     );
}
 
export default SectionCard;