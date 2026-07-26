import { useState } from "react"
import { useDispatch } from "react-redux"
import swal from "sweetalert"
import { add, setCurrent } from "../redux/UserSlice"
import { useNavigate } from "react-router"
import API from "../service/api.js" 

export const SignUp = () => {

    const [personal, setPersonal] = useState({})
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const checkTz = (value) => {
        if (value.length !== 9 || isNaN(value)) {
            setErrors({ ...errors, tz: 'tz length is too short!' })
            setPersonal({ ...personal, tz: '' })
        }
        else {
            let sum = 0, incNum;
            for (let i = 0; i < value.length; i++) {
                incNum = Number(value[i]) * ((i % 2) + 1);
                sum += (incNum > 9) ? incNum - 9 : incNum;
            }
            if (sum % 10 !== 0) {
                setErrors({ ...errors, tz: 'invalid tz!' })
                setPersonal({ ...personal, tz: '' })
            }
            else {
                setErrors({ ...errors, tz: '' })
                setPersonal({ ...personal, tz: value })
            }
        }
    }

    const checkName = (value) => {
        if (!/^(?:[א-ת]+|[A-Za-z]+)$/i.test(value)) {
            setErrors({ ...errors, firstName: 'invalid firstName!' })
        }
        else {
            setErrors({ ...errors, firstName: '' })
            setPersonal({ ...personal, firstName: value })
        }
    }

    const send = async () => {
        if (personal.tz && personal.firstName && personal.lastName && personal.password) {
            
            try {
                const response = await API.post('/users/register', personal);
                console.log('Server response:', response.data);
                dispatch(add(personal))
                dispatch(setCurrent(personal))
                
                swal('welcome!!', '!!נרשמת בהצלחה', 'success')
                navigate('/home')

            } catch (error) {
                const errorMessage = error.response?.data?.message || 'שגיאה ברישום למסד הנתונים';
                swal('Oopps!', errorMessage, 'error');
                console.error('Registration error:', error);
            }
        }
        else {
            swal('Oopps!', 'all fields are required!', 'info')
        }
    }

    return <>
        <div className="login-container">
            <h1>SignUp</h1>
            <div>
                <label> :הכנס ת.ז</label>
                <input placeholder="הכנס ת.ז" onBlur={(e) => checkTz(e.target.value)}></input>
                <p style={{ color: 'red' }}>{errors.tz}</p>
            </div>

            <div>
                <label> :הכנס שם</label>
                <input placeholder="הכנס שם" onBlur={(e) => checkName(e.target.value)}></input>
                <p style={{ color: 'red' }}>{errors.firstName}</p>
            </div>

            <div>
                <label> :הכנס שם משפחה</label>
                <input placeholder="הכנס שם משפחה" onBlur={(e) => { setPersonal({ ...personal, lastName: e.target.value }) }}></input>
            </div>

            <div>
                <label> :הכנס סיסמא</label>
                <input type="password" placeholder="הכנס סיסמא" onBlur={(e) => { setPersonal({ ...personal, password: e.target.value }) }}></input>
                <p style={{ color: 'red' }}>{errors.password}</p>
            </div>
            <button onClick={send}>send</button>
        </div>
    </>
}



