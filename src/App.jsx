import { Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./component/Home"
import { Toaster } from "react-hot-toast"

function App() {
    return (
        <>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
