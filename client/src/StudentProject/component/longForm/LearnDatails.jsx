import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMyLearn } from "../../redux/RequestSlice"

export const LearnDatails = () => {
    const MyLearn = useSelector(state => state.request.current.learn)
    const [learn, setLearn] = useState({ 
        trend: '', 
        otherTrend: '', // שדה עזר למקרה של "אחר"
        institutionName: '', 
        salary: '', 
        years: '', 
        ...MyLearn 
    })
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()

    const trends = ["מדעי המחשב", "הנדסה", "סיעוד", "הוראה", "חשבונאות", "אדריכלות"];

    // בכל פעם ש-learn משתנה, אנחנו מעדכנים את ה-Redux
    useEffect(() => {
        // לוגיקה קטנה: אם נבחר "אחר", נשלח ל-Redux את מה שכתוב ב-otherTrend
        const trendToSave = learn.trend === 'אחר' ? learn.otherTrend : learn.trend;
        dispatch(setMyLearn({ ...learn, trend: trendToSave }));
    }, [learn, dispatch])

    const checkSalary = (value) => {
        if (!/^(?:[1-9]\d{2,})$/i.test(value)) {
            setErrors({ ...errors, salary: 'invalid salary!' })
        } else {
            setErrors({ ...errors, salary: '' })
            setLearn({ ...learn, salary: value })
        }
    }

    return (
        <div className="form-box">
            <h1>פרטי לימודים</h1>

            <h2> :מגמה</h2>
            <select 
                value={learn.trend} 
                onChange={(e) => setLearn({ ...learn, trend: e.target.value })}
            >
                <option value="">בחר מגמה מהרשימה</option>
                {trends.map(t => <option key={t} value={t}>{t}</option>)}
                <option value="אחר">אחר...</option>
            </select>

            {/* הצגת שדה טקסט רק אם המשתמש בחר "אחר" */}
            {learn.trend === 'אחר' && (
                <div style={{ marginTop: '10px' }}>
                    <input 
                        placeholder="פרט מהי המגמה" 
                        value={learn.otherTrend}
                        onChange={(e) => setLearn({ ...learn, otherTrend: e.target.value })}
                        style={{ borderColor: '#007bff' }}
                    />
                </div>
            )}
            
            <p style={{ color: 'red' }}>{errors.trend}</p>

            <h2> :שם מוסד הלימודים</h2>
            <input 
                placeholder="שם המוסד" 
                defaultValue={learn.institutionName} 
                onBlur={(e) => setLearn({ ...learn, institutionName: e.target.value })} 
            />

            <h2> :שכר לימוד שנתי </h2>
            <input 
                placeholder="שכר לימוד שנתי" 
                defaultValue={learn.salary} 
                onBlur={(e) => checkSalary(e.target.value)} 
            />
            <p style={{ color: 'red' }}>{errors.salary}</p>

            <h2> :שנות לימוד </h2>
            <input 
                placeholder="שנות לימוד" 
                defaultValue={learn.years} 
                onBlur={(e) => {
                    if (/^\d$/.test(e.target.value)) {
                        setErrors({...errors, years: ''});
                        setLearn({ ...learn, years: e.target.value });
                    } else {
                        setErrors({...errors, years: 'invalid years!'});
                    }
                }} 
            />
            <p style={{ color: 'red' }}>{errors.years}</p>
        </div>
    )
}
