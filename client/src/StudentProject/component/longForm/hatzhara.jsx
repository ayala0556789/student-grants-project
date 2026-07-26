import { useDispatch, useSelector } from "react-redux"
import swal from 'sweetalert'
import { addRequest, setCurrentRequest } from "../../redux/RequestSlice"
import { useNavigate } from "react-router"
import API from '../../service/api';



export const Hatzhara = () => {
    const dispatch = useDispatch()
    const current = useSelector(state => state.request.current)
    const navigate = useNavigate()

    const  save  =async () => {
        let full = true

        // בדיקה על הפרטים אישיים
        if (!current.personal) {
            swal('אופס', 'פרטים אישיים ריקים', 'error')
            full = false
        }
        else {
            if (!current.personal.birthDay || !current.personal.address || !current.personal.phone || !current.personal.email) {
                swal('אופס', '!!יש למלא את כל הפרטים בפרטים אישיים', 'error')
                full = false
            }
        }


        // בדיקה על הפרטי לימוד
        if (!current.learn) {
            swal('אופס', 'פרטי לימודים ריקים', 'error')
            full = false
        }
        else {
            if (!current.learn.trend || !current.learn.salary || !current.learn.years) {
                swal('אופס', '!!יש למלא את כל הפרטים בפרטי לימוד', 'error')
                full = false
            }
        }

        // בדיקה על הפרטי משפחה
        if (!current.family) {
            swal('אופס', 'פרטי משפחה ריקים', 'error')
            full = false
        }
        else {
            if (!current.family.fatherName || !current.family.motherName) {
                swal('אופס', '!!יש למלא את כל הפרטים בפרטי משפחה', 'error')
                full = false
            }
        }

        // בדיקה על הפרטי בנק
        if (!current.bank) {
            swal('אופס', 'פרטי בנק ריקים', 'error')
            full = false
        }
        else {
            if (!current.bank.ownerTzName || !current.bank.ownerTz || !current.bank.bankNumber || !current.bank.sniff || !current.bank.cheshbon) {
                swal('אופס', '!!יש למלא את כל הפרטים בפרטי בנק', 'error')
                full = false
            }
        }

        // בדיקה על הפרטי המסמכים
        if (!current.documents) {
            swal('אופס', 'לא הועלו מסמכים', 'error')
            full = false
        }
        else {
            if (!current.documents.tzScan || !current.documents.studyApproval || !current.documents.bankApproval ) {
                swal('אופס', '!!יש להעלות את כל המסמכים ', 'error')
                full = false
            }
        }

        // אם כל הפרטים מלאים

        if (full) {
            try {
                // א. הכנת ה-FormData 
                const formData = new FormData();
                formData.append('personal', JSON.stringify(current.personal));
                formData.append('family', JSON.stringify(current.family));
                formData.append('learn', JSON.stringify(current.learn));
                formData.append('bank', JSON.stringify(current.bank));
                
                // ב. הוספת הקבצים 
                 formData.append('tzScan', current.documents.tzScan);
                 formData.append('studyApproval', current.documents.studyApproval);
                 formData.append('bankApproval', current.documents.bankApproval);
                

                //שליחה האמיתית לשרת**
                
                const response = await API.post('/requests/add', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                // ד. אם השליחה לשרת הצליחה, עוברים לניקוי המקומי
                if (response.status === 201) {
                    const { documents, ...serializableData } = current
                    dispatch(addRequest(serializableData))
                    
                    const tz = current.personal?.tz||'';
                    localStorage.removeItem(`scholarship_draft_${tz}`);
                    dispatch(setCurrentRequest());

                    swal('מצוין', 'הבקשה נשמרה בהצלחה במסד הנתונים', 'success');
                    navigate('../home');
                }
            } 
            catch (error) {
                console.error("שגיאה בשליחת הבקשה:", error);
                swal('אופס', 'חלה שגיאה בחיבור לשרת. ודא שהשרת פועל.', 'error');
            }
        }

    }


    const cancel = () => {
        swal('oops', 'you cancel', 'info')
    }

    
    return <>
    <div className="form-box">
        <h1>הריני מצהיר שכל הפרטים שהזנתי נכונים</h1>
        <button onClick={save} className="cancelOrApproval">אישור</button>
        <button onClick={cancel} className="canceltOrApproval">ביטול</button>
</div>
    </>
}