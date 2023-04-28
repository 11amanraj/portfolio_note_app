import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from './ElementCard.module.css'

const ElementCard: React.FC<{to: string, children: ReactNode}> = ({to, children}) => {
    return ( 
        <Link to={to} className={styles.container}>
            {children}
        </Link>
     );
}
 
export default ElementCard;