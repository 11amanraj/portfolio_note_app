import SideBar from "../components/Navigation/Sidebar"
import Search from "../components/Operations/Search"
import { useMediaQuery } from '@react-hook/media-query'
import styles from './EachPage.module.css'
import SearchBar from "../components/Navigation/SearchBar"
import Modal from "../components/UI/Modal"

const EachPage: React.FC<{children: React.ReactNode}> = ({children}) => {
    const matches = useMediaQuery('only screen and (max-width: 800px)')

    // const desktop = () => {
    //     return (

    //     )
    // }

    if(matches) {
        return (
            <main className={styles.mobile}>
                {/* <Navbar /> */}
                <Modal>
                    <SideBar />
                </Modal>
                <SearchBar fullsize={false}/>
                {children}
            </main>
        )
    } else {
        return (
            <main className={styles.desktop}>
                <SideBar />
                <div>
                    <SearchBar fullsize={true}/>
                    {/* <Search /> */}
                    {children}
                </div>
            </main>
        )
    }
}

export default EachPage