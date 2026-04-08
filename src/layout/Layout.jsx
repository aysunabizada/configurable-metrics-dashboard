import { Outlet } from "react-router-dom"
import Header from "../component/Header"
import ThemeContex from "../data/ThemeContext"
import DataContext from "../data/DataContext"

function Layout() {
    return (
        <>
            <DataContext>
                <ThemeContex>
                    <Header />
                    <Outlet />
                </ThemeContex>
            </DataContext>
        </>
    )
}

export default Layout