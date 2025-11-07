import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Index";
import About from "../Pages/About/Index";
import NoFound from "../Pages/Nofound/Index";
import Layout from "../Layout/Index";
function Paths() {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sobre" element={<About />} />
                        <Route path="/*" element={<NoFound />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </>
    )
}

export default Paths;