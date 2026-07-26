import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setCurrent } from '../redux/UserSlice';
import { setCurrentRequest } from "../redux/RequestSlice"

import swal from "sweetalert"
import API from '../service/api';

export const Login = () => {
    const [tz, setTz] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (tz && password) {
            try {
                const response = await API.post('/users/login', { tz, password })
                const userFromServer = response.data.user;
                dispatch(setCurrent(userFromServer))
                swal('ברוכים הבאים', `שלום ${userFromServer.firstName}`, 'success')
                navigate('/home')
            }

            catch (error) {
                const message = error.response?.data?.massage || 'שגיאת התחברות'
                if (error.response?.status === 404) {
                    swal('אופס', 'עדיין לא נרשמת,עבור לעמוד ההרשמה', 'info')
                    navigate('/signUp')
                }
                else {
                    swal('אופס', message, 'error')
                }

            }
        }
        else {

            swal('שימו לב', 'חובה למלא את כל השדות', 'warning')
            
        }
    }

    const moveSignUp = (e) => {
        e.preventDefault();

        navigate('/signUp')
    }


    //כל כניסה הוא מרוקן בקשה נוכחית
    //כדי שאם אחד התחיל להכניס  בקשה ולא סיים 
    //( מילא את הבקשה הנוכחית ולא רוקן עי הגשת בקשה )
    // ועושה כניסה למשתמש אחר
    // אז לא יוצג למשתמש החדש כל הפרטים של הבקשה הנל
    useEffect(() => {
        dispatch(setCurrentRequest())
    }, [dispatch])


    return (

        <div className="login-container">
            <h2>Login</h2>
            <form >

                <div>
                    <label>:תעודת זהות</label>
                    <input
                        type="text"
                        id="username"
                        value={tz}
                        onChange={(e) => setTz(e.target.value)}
                    />
                </div>

                <div>
                    <label>:סיסמא</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" onClick={handleLogin}>Login</button>
                <div></div>
                <button onClick={moveSignUp}>אין לך חשבון צור אותו עכשיו</button>
            </form>
        </div>
    );
}