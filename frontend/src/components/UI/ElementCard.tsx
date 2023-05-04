import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from './ElementCard.module.css'

const ElementCard: React.FC<{to: string, children: ReactNode, className: string}> = ({to, children, className}) => {
    return ( 
        <Link to={to} className={`${styles.container} ${className ? className : ''}`}>
            {children}
        </Link>
     );
}
 
export default ElementCard;