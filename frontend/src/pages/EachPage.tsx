import SideBar from "../components/Navigation/Sidebar"
import Search from "../components/Operations/Search"
import { useMediaQuery } from '@react-hook/media-query'

const EachPage: React.FC<{children: React.ReactNode}> = ({children}) => {
    const matches = useMediaQuery('only screen and (max-width: 500px)')

    console.log(matches)

    if(matches) {
        return (
            <>
                <div>
                    Working
                </div>
            </>
        )
    } else {
        return (
            <>
                <SideBar />
                <div>
                    <Search />
                </div>
            </>
        )
    }
}

export default EachPage