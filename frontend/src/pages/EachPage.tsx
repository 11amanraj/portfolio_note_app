import Navbar from "../components/Navigation/Navbar"
import SideBar from "../components/Navigation/Sidebar"
import Search from "../components/Operations/Search"
import { useMediaQuery } from '@react-hook/media-query'
import styles from './EachPage.module.css'

const EachPage: React.FC<{children: React.ReactNode}> = ({children}) => {
    const matches = useMediaQuery('only screen and (max-width: 800px)')

    if(matches) {
        return (
            <main className={styles.desktop}>
                <Navbar />
                {children}
            </main>
        )
    } else {
        return (
            <main className={styles.mobile}>
                <SideBar />
                <div>
                    <Search />
                    {children}
                </div>
            </main>
        )
    }
}

export default EachPage