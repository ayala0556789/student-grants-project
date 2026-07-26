import { NavLink } from "react-router"
import '../style.css'
import { useSelector } from "react-redux"

export const Nav=()=>{

  const current = useSelector(state => state.user.current_user)
    return<>
   
    {/* <h1>🤩😍🤣</h1> */}
    {current &&  current.tz==329383343 ? <>
    <div className="showCurrent">שלום ל{current.firstName}</div>
    <NavLink to='Home' className='link'>בית</NavLink>
    <NavLink to='Login' className='link'>כניסה</NavLink>
    <NavLink to='NewQuestion' className='link'>הגשת בקשה</NavLink>
    <NavLink to='ShowStatus' className='link'>סטטוס</NavLink>
    <NavLink to='ShowQuestions' className='link'>הצגת בקשות</NavLink>
    </>
    :
    <>
    <div className="showCurrent">שלום {current?current.firstName:""}</div>
    <NavLink to='Home' className='link'>בית</NavLink>
    <NavLink to='Login' className='link'>כניסה</NavLink>
    {current?
    <>
    <NavLink to='NewQuestion' className='link'>הגשת בקשה</NavLink>
    <NavLink to='ShowStatus' className='link'>סטטוס</NavLink>
    </>
    :
    null
}
  </>
  }
 
 <div className="div"></div>
    </>
}