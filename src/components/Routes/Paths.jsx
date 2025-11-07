import { BrowserRouter, Routes, Route } from "react-router-dom";    
function Paths(){
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Formulario/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Paths;