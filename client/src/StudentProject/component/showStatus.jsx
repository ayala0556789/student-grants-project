import { useSelector } from "react-redux"
import React,{ useEffect } from "react";
import { useDispatch } from "react-redux";
import API from '../service/api';
import { setLastRequest } from "../redux/RequestSlice";



export const ShowStatus = () => {
    const dispatch = useDispatch();
    const tz = useSelector(state => state.user.current_user?.tz);
    const lastRequest = useSelector(state => state.request.lastRequest);


    const name = useSelector(state => state.user.current_user.firstName)


    const idUser = useSelector(state => state.user.current_user.tz)//מחפש את התז של המשתמש הנוכחי

    const requests = useSelector(state => state.request.listRequest)//מבקש את רשימת הבקשות

    const userRequests = requests.filter(x => x.personal.tz == idUser)//מסנן את רשימת הבקשות של המשתמש הנוכחי ויוצר מהם מערך

    const id = userRequests.map(item => item.id)//יוצר מערך של אידי של הבקשות

    const maxId = Math.max(...id)//מבקש מהמערך את האידי המקסימאלי-הבקשה האחרונה

    const statusRequest = requests.find(x => x.id == maxId)//מבקש את הבקשה ברשימת הבקשות שהאידי שלה הוא כמו האידי שמצאנו


    useEffect(() => {
        // ביצוע הקריאה רק אם יש לנו תעודת זהות של משתמש מחובר
        if (tz) {
            API.get(`/requests/status/${tz}`)
                .then(res => {
                    // עדכון הבקשה האחרונה ב-Redux
                    dispatch(setLastRequest(res.data));
                })
                .catch(err => {
                    console.error("שגיאה בשליפת סטטוס הבקשה:", err);
                });
        }
    }, [tz, dispatch]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', direction: 'rtl' }}>
            <h1>שלום {name}</h1>
            
            {!lastRequest ? (
                <p className="status">עדיין לא הוגשה בקשה במערכת.</p>
            ) : (
                <div style={{ marginTop: '20px' }}>
                    <p className="status">
                        סטטוס בקשתך האחרונה 
                        (מיום {new Date(lastRequest.createdAt).toLocaleDateString('he-IL')}):
                    </p>
                    
                    <div style={{ marginTop: '30px' }}>
                        {lastRequest.status === 'waiting' && (
                            <h2 className="status" style={{ color: 'orange' }}>⏳ הבקשה בטיפול / בהמתנה</h2>
                        )}
                        
                        {lastRequest.status === 'reject' && (
                            <h2 className="badstatus" style={{ color: 'red' }}>❌ הבקשה נדחתה</h2>
                        )}
                        
                        {lastRequest.status === 'allow' && (
                            <h2 className="goodstatus" style={{ color: 'green' }}>
                                ✅ הבקשה אושרה בהצלחה!
                                <br />
                                !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            </h2>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    // return <>
    //     <h1>שלום {name}</h1>
    //     <p className="status">:סטטוס בקשתך היא</p>
    //     {userRequests.length == 0 ?//אם אין למשתמש רשימת בקשות
    //         <p className="status">עדיין לא הוגשה בקשה</p>
    //         :
    //         statusRequest.status == 'waiting' ?//מבקשים את סטטוס הבקשה
    //             <p className="status">הבקשה בהמתנה</p>
    //             :
    //             statusRequest.status == 'reject' ?
    //                 <p className="badstatus">הבקשה נדחתה</p>
    //                 :
    //                 <p className="goodstatus">!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!הבקשה אושרה</p>

    //     }
    // </>
}