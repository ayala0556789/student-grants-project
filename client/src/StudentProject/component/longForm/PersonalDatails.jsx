import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMyPersonal,loadDraft } from '../../redux/RequestSlice'

export const PersonalDatails = () => {
    const dispatch = useDispatch();
    const current_user = useSelector(state => state.user.current_user)
    const myPersonal = useSelector(state => state.request.current.personal)

    // const [personal, setPersonal] = useState({
    //     tz: current_user.tz,
    //     firstName: current_user.firstName,
    //     lastName: current_user.lastName,
    //     city: '',
    //     phone: '',
    //     homePhone: '',
    //     ...myPersonal
    // })

    const [personal, setPersonal] = useState({
        tz: current_user?.tz || '',
        firstName: current_user?.firstName || '',
        lastName: current_user?.lastName || '',
        city: myPersonal?.city || '',
        phone: myPersonal?.phone || '',
        homePhone: myPersonal?.homePhone || '',
        address: myPersonal?.address || '',
        email: myPersonal?.email || '',
        birthDay: myPersonal?.birthDay || ''
    });


    const [errors, setErrors] = useState({})

    const checkPhone = (value) => {
        if (!/^(?:\+972[-\s]?|0)(?:[23489]\d{1}|5[0-9])[-\s]?\d{3}[-\s]?\d{4}$/i.test(value)) {
            setErrors(prev => ({ ...prev, phone: 'טלפון לא תקין!' }));
        } else {
            setErrors(prev => ({ ...prev, phone: '' }));
        }
    };
    
    const checkEmail = (value) => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value)) {
            setErrors(prev => ({ ...prev, email: 'מייל לא תקין!' }));
        } else {
            setErrors(prev => ({ ...prev, email: '' }));
        }
    };

    const checkLetters = (value) => {
        // הבדיקה רק מעדכנת אם יש שגיאה או אין שגיאה
        if (!/^(?:[א-ת\s]+|[A-Za-z\s]+)$/i.test(value)) {
            setErrors(prev => ({ ...prev, city: 'שם עיר לא תקין!' }));
        }
        else {
            setErrors(prev => ({ ...prev, city: '' }));
        }
    };

    // 1. טעינה מהלוקאל סטורג' ל-Redux (קורה רק פעם אחת בטעינה)
useEffect(() => {
    if (current_user?.tz) {
        dispatch(loadDraft(current_user.tz));
    }
}, [current_user.tz, dispatch]);

// 2. עדכון ה-State המקומי מה-Redux (רק אם הוא היה ריק)
useEffect(() => {
    if (myPersonal && Object.keys(myPersonal).length > 0) {
        // בודקים אם הנתונים בסטייט שונים מהנתונים ב-Redux כדי למנוע לופ
        if (JSON.stringify(myPersonal) !== JSON.stringify(personal)) {
            setPersonal(prev => ({ ...prev, ...myPersonal }));
        }
    }
}, [myPersonal]); 

// 3. שמירה ל-Redux - רק אם המשתמש הקליד משהו חדש
const handleChange = (field, value) => {
    const updated = { ...personal, [field]: value };
    setPersonal(updated);
    dispatch(setMyPersonal(updated)); // שומרים ל-Redux בזמן אמת בשינוי
};

//     // קודם כל - טעינת הטיוטה מה-LocalStorage ל-Redux (קורה פעם אחת בטעינה)
//     useEffect(() => {
//         if (current_user?.tz) {
//             dispatch(loadDraft(current_user.tz));
//         }
//     }, [current_user.tz, dispatch]);
// // עדכון ה-Redux בכל פעם שהסטייט המקומי משתנה 
//     useEffect(() => {
//         // אנחנו שומרים ל-Redux רק אם המשתמש התחיל להקליד משהו
//     // זה מונע מהסטייט הריק של ההתחלה לדרוס את מה שנטען מהלוקאל סטורג'
//     if (personal.city || personal.address || personal.phone || personal.email) {
//         dispatch(setMyPersonal(personal));
//     }
//     }, [personal, dispatch])

//     useEffect(() => {
//         if (myPersonal && Object.keys(myPersonal).length > 0) {
//             setPersonal(prev => ({
//                 ...prev,
//                 ...myPersonal
//             }));
//         }
//     }, [myPersonal]);

    return (
        <div className="form-box">
            <h1>פרטים אישיים</h1>
            <p style={{ fontSize: '0.8em' }}>* פרטים אלו נמשכים מהמערכת ולא ניתן לשנותם</p>

            <h2>ת.ז:</h2>
            <input value={personal.tz} readOnly style={{ backgroundColor: '#f0f0f0' }} />

            <h2>שם פרטי:</h2>
            <input value={personal.firstName} readOnly style={{ backgroundColor: '#f0f0f0' }} />

            <h2>שם משפחה:</h2>
            <input value={personal.lastName} readOnly style={{ backgroundColor: '#f0f0f0' }} />

            <h2>תאריך לידה:</h2>
            <input type='date' value={personal.birthDay || ''} onChange={(e) => handleChange('birthDay', e.target.value)} />

            <h2>עיר מגורים:</h2>
            <input placeholder="עיר מגורים" value={personal.city || ''} onChange={(e) => handleChange('city', e.target.value)} onBlur={(e) => checkLetters(e.target.value)} />
            <p style={{ color: 'red' }}>{errors.city}</p>
            
            <h2>כתובת:</h2>

            <input placeholder="רחוב ומספר בית" value={personal.address || ''} onChange={(e) => handleChange('address', e.target.value)}/>

            <h2>טלפון נייד:</h2>
            <input placeholder="נייד" value={personal.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} onBlur={(e) => checkPhone(e.target.value)} />
            <p style={{ color: 'red' }}>{errors.phone}</p>

            <h2>טלפון נייח (אופציונאלי):</h2>
            <input placeholder="נייח" value={personal.homePhone} onChange={(e) => handleChange('homePhone', e.target.value)} />

            <h2> <label htmlFor="E"> :הכנס מייל</label>  </h2>
            <input id="E" placeholder="input email" value={personal.email || ''} onChange={(e) => handleChange('email', e.target.value)} onBlur={(e) => checkEmail(e.target.value)}></input><br></br>
            <p style={{ color: 'red' }}>{errors.email}</p>
        </div>
    )
}




