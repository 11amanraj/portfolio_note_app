import SideBar from "../components/Navigation/Sidebar"
import { useState } from 'react'
import { useMediaQueries } from '@react-hook/media-query'
import styles from './EachPage.module.css'
import SearchBar from "../components/Navigation/SearchBar"
import Modal from "../components/UI/Modal"

const EachPage: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [showSidebar, setShowSidebar] = useState(false)
    const {matches} = useMediaQueries({
        screen: 'screen',
        mobile: '(max-width: 500px)',
        tablet: '(max-width: 1080px)'
      })

    if(matches.mobile) {
        return (
            <main className={styles.mobile}>
                {/* <Modal>
                    <SideBar />
                </Modal> */}
                <SearchBar fullsize={false}/>
                {children}
            </main>
        )
    } else if(matches.tablet) {
        return (
            <main className={styles.tablet}>
                {/* <Modal>
                    <SideBar />
                </Modal> */}
                <div>
                    <SearchBar fullsize={true}/>
                    {children}
                </div>
            </main>
        )
    } else {
        return (
            <main className={styles.desktop}>
                <SideBar />
                <div>
                    <SearchBar fullsize={true}/>
                    {children}
                </div>
            </main>
        )
    }
}

export default EachPage