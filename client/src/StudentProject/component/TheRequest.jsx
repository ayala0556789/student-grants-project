import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { allow, reject } from "../redux/RequestSlice"
import swal from 'sweetalert'
import API from '../service/api'


export const TheRequest = () => {
    const location = useLocation()
    // const dispatch = useDispatch()
    const navigate = useNavigate()

    // const listrequest = useSelector(state => state.request.listRequest)
    const requestId =  location.state
    const [current, setCurrent] = useState(null);
    const [loading, setLoading] = useState(true);


    const handleUpdateStatus = async (newStatus) => {
        try {
            await API.put(`/requests/update/${requestId}`, { status: newStatus });
            swal('עודכן!', `הבקשה הועברה לסטטוס: ${newStatus === 'allow' ? 'מאושר' : 'דחוי'}`, 'success');
            navigate('/showQuestions');
        } catch (err) {
            swal('שגיאה', 'עדכון הסטטוס נכשל', 'error');
        }
    };
    useEffect(() => {
        if (requestId) {
            API.get(`/requests/get-one/${requestId}`)
                .then(res => {
                    setCurrent(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("שגיאה בטעינת פרטי הבקשה:", err);
                    setLoading(false);
                });
        }
    }, [requestId]);

    if (loading) return <h1>טוען פרטי בקשה...</h1>;
    if (!current) return <h1>בקשה לא נמצאה</h1>;

    return <>
        <h1>שלום מנהל לפניך הבקשה</h1>
        <h1>בידך לאשרה או לדחותה</h1>

        {/* <p> {location.state} :מס בקשה</p> */}
        <p>מזהה מערכת: {requestId}</p>
        <p>{current.status} :סטטוס</p>

        <details open>
            <summary><b>פרטים אישיים</b></summary>
            
            <p><b>שם פרטי: </b>  {current.personal?.firstName}</p>
            <p><b>שם משפחה: </b>  {current.personal?.lastName}</p>
            <p><b>ת.ז: </b>  {current.personal?.tz}</p>
            <p><b>ת.לידה: </b>   {current.personal?.birthDay}</p>
            <p><b>פלאפון: </b>  {current.personal?.phone}</p>
            <p> {current.personal?.email}<b> :מייל </b> </p>
            <p><b>כתובת: </b>  {current.personal?.address}</p>

        </details>

        <details >
            <summary><b>פרטי משפחה</b></summary>
            <p><b>שם האב: </b>{current.family?.fatherName}</p>
            <p><b>שם האם: </b>{current.family?.motherName}</p>
            <p><b>מס ילדים במשפחה מתחת גיל 18: </b>{current.family?.numUnder18}</p>
        </details>

        <details >
            <summary><b>פרטי לימודים</b></summary>
            <p><b>מגמה: </b>{current.learn?.trend}</p>
            <p><b>שכר לימוד: </b>{current.learn?.salary}</p>
            <p><b>שנות לימוד: </b>{current.learn?.years}</p>
        </details>

        <details >
            <summary><b>פרטי בנק</b></summary>
            <p><b>שם בעל החשבון: </b>{current.bank?.ownerTzName}</p>
            <p><b>ת.ז של בעל החשבון: </b>{current.bank?.ownerTz}</p>
            <p><b>שם בנק: </b>{current.bank?.bankName}</p>
            <p><b>שם סניף: </b>{current.bank?.sniff}</p>
            <p><b>מס חשבון: </b>{current.bank?.cheshbon}</p>
            
        </details>

        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc' }}>
                <h3>צפייה במסמכים</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => window.open(`http://localhost:3001/${current.documents?.tzScan}`)}>צילום ת"ז</button>
                    <button onClick={() => window.open(`http://localhost:3001/${current.documents?.studyApproval}`)}>אישור לימודים</button>
                    <button onClick={() => window.open(`http://localhost:3001/${current.documents?.bankApproval}`)}>אישור בנק</button>
                </div>
            </div>




        <button onClick={() => handleUpdateStatus('allow')} className="allobtn">אשר</button>
        <button onClick={() => handleUpdateStatus('reject')} className="rejectbtn">דחה</button>


    </>
}