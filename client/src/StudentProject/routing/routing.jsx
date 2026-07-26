import { Route, Routes, useNavigate } from "react-router"
import { Home } from "../component/home"
import { Login } from "../component/login"
import { NewQuestion } from "../component/newQuestion"
import { ShowStatus } from "../component/showStatus"
import { SignUp } from "../component/signUp"
import { ShowQuestions } from "../component/showQuestions"
import { TheRequest } from "../component/TheRequest"



export const Routing = () => {
    return <>
        <Routes>
            <Route path="" element={<Home></Home>}></Route>
            <Route path="Home" element={<Home></Home>}></Route>
            <Route path="Login" element={<Login></Login>}></Route>
            <Route path="NewQuestion" element={<NewQuestion></NewQuestion>}></Route>
            <Route path="ShowQuestions" element={<ShowQuestions></ShowQuestions>}></Route>
            <Route path="ShowStatus" element={<ShowStatus></ShowStatus>}></Route>
            <Route path="SignUp" element={<SignUp></SignUp>}></Route>
            <Route path="TheRequest" element={<TheRequest></TheRequest>}></Route>

        </Routes>
    </>
}