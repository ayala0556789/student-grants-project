import React, { useState } from "react"
import { Link, NavLink } from 'react-router'



export const MultyForm = (props) => {

    let steps = React.Children.toArray(props.children)
    const [num, setNum] = useState(0)


    const currentChild = () => {
       
        return React.cloneElement(steps[num], {})
    }

    const next = () => {
        if (num < steps.length - 1)
            setNum(num + 1)

    }


    const prev = () => {
        if (num > 0)
            setNum(num - 1)
    }



    return <>
        <div className='stpDiv'>
            {steps.map((x, i) => <button onClick={() => setNum(i)} className='step'>{i + 1}</button>)}
        </div>

        <div>
            {/* {steps[num]} */}
            {currentChild()}
        </div>
        {num == 0 ?
            <button onClick={next}className="nextAndPrev">next</button>
            :
            num != steps.length-1 ? <>
                <button onClick={prev}className="nextAndPrev">prev</button>
                <button onClick={next}className="nextAndPrev">next</button>
            </>
                :
                <button onClick={prev} className="nextAndPrev">prev</button> // כפתור חזור גם בשלב האחרון
        }
    </>
}