import SideBar from "../components/Navigation/Sidebar"
import { useState } from 'react'
import { useMediaQueries } from '@react-hook/media-query'
import styles from './EachPage.module.css'
import SearchBar from "../components/Navigation/SearchBar"
import Modal from "../components/UI/Modal"
import Search from "../components/Operations/Search"

const EachPage: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [showSidebar, setShowSidebar] = useState(false)
    const {matches} = useMediaQueries({
        screen: 'screen',
        mobile: '(max-width: 500px)',
        tablet: '(max-width: 1080px)'
      })

    const sidebarHandler = () => {
        setShowSidebar(prev => !prev)
    }

    if(matches.mobile) {
        return (
            <main className={styles.mobile}>
                {showSidebar ? 
                    <Modal closeModal={() => setShowSidebar(false)}>
                        <SideBar breakpoint="mobile" onClose={() => setShowSidebar(false)} />
                    </Modal>
                    : <>
                        <Search sidebarController={{isToggleVisible: true, handler: sidebarHandler}}/>
                        {children}
                    </>
                }
            </main>
        )
    } else if(matches.tablet) {
        return (
            <main className={styles.tablet}>
                {showSidebar && 
                    <Modal closeModal={() => setShowSidebar(false)}>
                        <SideBar breakpoint="tablet" onClose={() => setShowSidebar(false)} />
                    </Modal>
                }
                <div className={styles.workspace}>
                    <Search sidebarController={{isToggleVisible: true, handler: sidebarHandler}}/>
                    {children}
                </div>
            </main>
        )
    } else {
        return (
            <main className={styles.desktop}>
                <SideBar breakpoint="desktop" />
                <div className={styles.workspace}>
                    <SearchBar fullsize={true}/>
                    {children}
                </div>
            </main>
        )
    }
}

export default EachPage