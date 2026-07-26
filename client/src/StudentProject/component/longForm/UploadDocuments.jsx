import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyDocuments } from "../../redux/RequestSlice";

export const UploadDocuments = () => {
    const dispatch = useDispatch();
    
    // שליפת נתונים קיימים מה-Redux (אם חזרנו לשלב זה אחורה בטופס)
    const myDocs = useSelector(state => state.request.current.documents || {});

    const [docs, setDocs] = useState({
        tzScan: null,
        studyApproval: null,
        bankApproval: null,
        ...myDocs
    });

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            // בדיקת מקצועית: גודל קובץ מקסימלי 5MB
            if (file.size > 5 * 1024 * 1024) {
                alert("הקובץ גדול מדי! המקסימום המותר הוא 5MB");
                return;
            }
            // שמירת אובייקט הקובץ עצמו בסטייט
            setDocs(prev => {
                const updatedDocs = { ...prev, [fieldName]: file };
                // שליחה מיידית ל-Redux של האובייקט המעודכן במלואו
                //נכתב בשביל קבצים שהם מידי קטנים
                dispatch(setMyDocuments(updatedDocs));
                return updatedDocs;
            });
        
        }
    };

    useEffect(() => {
        // עדכון ה-Redux בכל פעם שקובץ נוסף
        dispatch(setMyDocuments(docs));
    }, [docs, dispatch]);

    return (
        <div className="form-box">
            <h1>העלאת מסמכים</h1>
            <p style={{ color: 'gray', fontSize: '0.9em' }}>
    או תמונות ברורות pdf העלאת קבצים בטוחה: אנא העלו קבצי   
            </p>

            <div style={{ marginBottom: '20px' }}>
                <h2>צילום ת.ז + ספח:</h2>
                <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'tzScan')} />
                {docs.tzScan && <span style={{ color: 'green', display: 'block' }}>✅ נבחר קובץ: {docs.tzScan.name}</span>}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>אישור לימודים:</h2>
                <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'studyApproval')} />
                {docs.studyApproval && <span style={{ color: 'green', display: 'block' }}>✅ נבחר קובץ: {docs.studyApproval.name}</span>}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>אישור ניהול חשבון בנק:</h2>
                <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'bankApproval')} />
                {docs.bankApproval && <span style={{ color: 'green', display: 'block' }}>✅ נבחר קובץ: {docs.bankApproval.name}</span>}
            </div>
        </div>
    );
};