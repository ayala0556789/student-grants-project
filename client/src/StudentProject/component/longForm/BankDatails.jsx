import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import swal from 'sweetalert'
import { setMyBank } from "../../redux/RequestSlice"

export const BankDatails = () => {
    const MyBank = useSelector(state => state.request.current.bank)
    const [bank, setBank] = useState({ ...MyBank })
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()

    // רשימת בנקים לפי האפיון
    const banksList = [
        { id: "11", name: "דיסקונט" },
        { id: "12", name: "הפועלים" },
        { id: "10", name: "לאומי" },
        { id: "20", name: "מזרחי טפחות" },
        { id: "31", name: "הבינלאומי" }
    ];

    const checkName = (value) => {
        if (!/^(?:[א-ת\s]+|[A-Za-z\s]+)$/i.test(value)) {
            setErrors({ ...errors, name: 'invalid name!' })
        } else {
            setErrors({ ...errors, name: '' })
            setBank({ ...bank, ownerTzName: value }) // שם בעל החשבון
        }
    }

    const checkTz = (value) => {
        if (value.length !== 9 || isNaN(value)) {
            setErrors({ ...errors, tz: 'tz length is too short!' })
            setBank({ ...bank, ownerTz: '' })
        } else {
            let sum = 0, incNum;
            for (let i = 0; i < value.length; i++) {
                incNum = Number(value[i]) * ((i % 2) + 1);
                sum += (incNum > 9) ? incNum - 9 : incNum;
            }
            if (sum % 10 !== 0) {
                setErrors({ ...errors, tz: 'invalid tz!' })
                setBank({ ...bank, ownerTz: '' })
            } else {
                setErrors({ ...errors, tz: '' })
                setBank({ ...bank, ownerTz: value })
            }
        }
    }

    useEffect(() => {
        dispatch(setMyBank(bank))
    }, [bank])

    return (
        <div className="form-box">
            <h1>פרטי בנק</h1>
            
            <h2> :שם בעל החשבון</h2>
            <input 
                placeholder="שם בעל החשבון" 
                defaultValue={bank.ownerTzName} 
                onBlur={(e) => checkName(e.target.value)} 
            />
            <p style={{ color: 'red' }}>{errors.name}</p>

            <h2> :ת.ז של בעל החשבון </h2>
            <input 
                placeholder="ת.ז של בעל החשבון" 
                defaultValue={bank.ownerTz}  
                onBlur={(e) => checkTz(e.target.value)} 
            />
            <p style={{ color: 'red' }}>{errors.tz}</p>

            <h2> :בחר בנק</h2>
            <select 
                defaultValue={bank.bankNumber}
                onChange={(e) => {
                    const selected = banksList.find(b => b.id === e.target.value);
                    setBank({ ...bank, bankNumber: e.target.value, bankName: selected.name });
                }}
            >
                <option value="">בחר בנק מהרשימה</option>
                {banksList.map(b => <option key={b.id} value={b.id}>{b.name} ({b.id})</option>)}
            </select>

            <h2> :מספר סניף</h2>
            <input 
                placeholder="מספר סניף" 
                defaultValue={bank.sniff} 
                onBlur={(e) => setBank({ ...bank, sniff: e.target.value })} 
            />

            <h2> :מספר חשבון</h2>
            <input 
                placeholder="מספר חשבון" 
                defaultValue={bank.cheshbon} 
                onBlur={(e) => setBank({ ...bank, cheshbon: e.target.value })} 
            />
        </div>
    )
}
 






// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import swal from 'sweetalert'
// import { setMyBank } from "../../redux/RequestSlice"


// export const BankDatails=()=>{
  
//     const MyBank=useSelector(state=>state.request.current.bank)
//     const [bank, setBank] = useState({...MyBank})
//     const [errors, setErrors] = useState({})
//     const dispatch=useDispatch()

//     const checkName = (value) => {
//         if (!/^(?:[א-ת]+|[A-Za-z]+)$/i.test(value)) {
//             setErrors({ ...errors, name: 'invalid name!' })
//         }
//         else {
//             setErrors({ ...errors, name: '' })
//             setBank({ ...bank, name: value })
//         }
//     }


//     const checkTz = (value) => {
//         // אם אורך לא תקין
//         if (value.length !== 9 || isNaN(value)) {  // Make sure ID is formatted properly
//             // שגיאה
//             setErrors({ ...errors, tz: 'tz length is too short!' })
//             // ריקון ערך מ.ז
//             setBank({ ...bank, tz: '' })
//         }
//         else {
//             let sum = 0, incNum;
//             for (let i = 0; i < value.length; i++) {
//                 incNum = Number(value[i]) * ((i % 2) + 1);  // Multiply number by 1 or 2
//                 sum += (incNum > 9) ? incNum - 9 : incNum;  // Sum the digits up and add to total
//             }
//             if (sum % 10 !== 0) {
//                 // שגיאה של תקינות מ.ז
//                 setErrors({ ...errors, tz: 'invalid tz!' })
//                 // ריקון ערך מ.ז
//                 setBank({ ...bank, tz: '' })
//             }
//             else {
//                 // מ.ז תקין
//                 // ריקון שגיאה
//                 setErrors({ ...errors, tz: '' })
//                 // הצבת מ.ז
//                 setBank({ ...bank, tz: value })
//             }
//         }

//     }


//     useEffect(()=>{
//         dispatch(setMyBank(bank))

//     },[bank])

// return<>
// <div className="form-box">
// <h1>פרטי בנק</h1>
// <h2> :שם בעל החשבון</h2>
// <input placeholder="שם בעל החשבון" defaultValue={MyBank ? MyBank.name : null} onBlur={(e) => checkName(e.target.value )}></input>
// <p style={{ color: 'red' }}>{errors.name}</p>

// <h2> :ת.ז של בעל החשבון </h2>
// <input placeholder="ת.ז של בעל החשבון" defaultValue={MyBank ? MyBank.tz : null}  onBlur={(e) => checkTz(e.target.value )}></input>
// <p style={{ color: 'red' }}>{errors.tz}</p>

// <h2> :שם בנק</h2>
// <input placeholder="שם בנק" defaultValue={MyBank ? MyBank.nameOfBank : null}  onBlur={(e) => {setBank({ ...bank, nameOfBank: e.target.value }) }}></input>
// <p style={{ color: 'red' }}>{errors.nameOfBank}</p>

// <h2> :מספר סניף</h2>
// <input placeholder="מספר סניף" defaultValue={MyBank ? MyBank.sniff : null}  onBlur={(e) => {setBank({ ...bank, sniff: e.target.value }) }}></input>
// <p style={{ color: 'red' }}>{errors.sniff}</p>

// <h2> :מספר חשבון</h2>
// <input placeholder="מספר חשבון" defaultValue={MyBank ? MyBank.cheshbon : null}  onBlur={(e) => {setBank({ ...bank, cheshbon: e.target.value }) }}></input>
// <p style={{ color: 'red' }}>{errors.cheshbon}</p>
// </div>
// </>
// }