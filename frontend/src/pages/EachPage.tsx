import SideBar from "../components/Navigation/Sidebar"
import Search from "../components/Operations/Search"
import { useMediaQuery, useMediaQueries } from '@react-hook/media-query'
import styles from './EachPage.module.css'
import SearchBar from "../components/Navigation/SearchBar"
import Modal from "../components/UI/Modal"

const EachPage: React.FC<{children: React.ReactNode}> = ({children}) => {
    // const matches = useMediaQuery('only screen and (max-width: 800px)')

    const desktop = () => {
        return (
            <div>Desktop</div>
        )
    }

    const viewMobile = () => {
        return (
            <div>Mobile</div>
        )
    }

    const tablet = () => {
        return (
            <div>Tablet</div>
        )
    }

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
                    {/* <Search /> */}
                    {children}
                </div>
            </main>
        )
    }

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