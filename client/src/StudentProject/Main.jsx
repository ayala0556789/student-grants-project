// import { Provider } from "react-redux"
import s from "./redux/store"
import { BrowserRouter } from "react-router"
import { Nav } from "./routing/Nav"
import { Routing } from "./routing/routing"
import { Provider } from "react-redux"



export const Main = () => {

    return <>
     
<Provider store={s}>
    

    <BrowserRouter>
    
            <Nav></Nav>
            <Routing></Routing>
    </BrowserRouter>
</Provider>
   
    </>
}
