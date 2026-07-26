

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from '../service/api';
import './ShowQuestions.css';

export const ShowQuestions = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        tz: '', city: '', startDate: '', endDate: '',
        minSiblings: '', maxSiblings: '',
        minSalary: '', maxSalary: '',
        sortBy: 'createdAt', sortOrder: 'desc'
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await API.get('/requests/not-allowed', { params: filters });
            setList(response.data);
        } catch (err) {
            console.error("שגיאה:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters.sortBy, filters.sortOrder]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="page-wrapper">
          
            
            <p className="subtitle">שלום מנהל נחמד לפניך הבקשות</p>

            {/* כרטיסיית סינונים מעוצבת */}
            <div className="filter-section card-style">
                <div className="filter-row">
                    <input name="tz" placeholder="ת.ז:" onChange={handleInputChange} />
                    <input name="city" placeholder="עיר מגורים:" onChange={handleInputChange} />
                    <input name="startDate" type="date" placeholder="מתאריך" onChange={handleInputChange} />
                    <input name="endDate" type="date" placeholder="עד תאריך" onChange={handleInputChange} />
                </div>
                <div className="filter-row">
                    <input name="minSiblings" type="number" placeholder="מאחים (כמות):" onChange={handleInputChange} />
                    <input name="maxSiblings" type="number" placeholder="עד אחים:" onChange={handleInputChange} />
                    <input name="minSalary" type="number" placeholder="משכר שנתי:" onChange={handleInputChange} />
                    <button className="search-button" onClick={fetchData}>חפש 🔍</button>
                </div>
            </div>

            {loading ? (
                <div className="status-msg">טוען נתונים...</div>
            ) : list.length === 0 ? (
                <div className="status-msg">כל הבקשות טופלו ✅</div>
            ) : (
                <div className="table-container card-style">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>ת.ז:</th>
                                <th>שם פרטי</th>
                                <th>שם משפחה</th>
                                <th>מגמה</th>
                                <th>סטטוס</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.personal?.tz}</td>
                                    <td>{item.personal?.firstName}</td>
                                    <td>{item.personal?.lastName}</td>
                                    <td>{item.learn?.trend}</td>
                                    <td>
                                        <Link to='/TheRequest' state={item._id} className={`status-link ${item.status}`}>
                                            {item.status}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};







// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import API from '../service/api';
// import './ShowQuestions.css'; // ייבוא העיצוב החדש

// export const ShowQuestions = () => {
//     const [list, setList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [filters, setFilters] = useState({
//         tz: '',
//         city: '',
//         startDate: '',
//         endDate: '',
//         minSiblings: '',
//         minSalary: '',
//         sortBy: 'createdAt',
//         sortOrder: 'desc'
//     });

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const response = await API.get('/requests/not-allowed', { params: filters });
//             setList(response.data);
//         } catch (err) {
//             console.error("שגיאה בטעינת בקשות:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, [filters.sortBy, filters.sortOrder]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFilters(prev => ({ ...prev, [name]: value }));
//     };

//     return (
//         <div className="admin-container">
//             <header className="admin-header">
//                 <h1>ניהול בקשות מלגות</h1>
//                 <p>מערכת סינון ומיון מתקדמת למנהל</p>
//             </header>

//             {/* פאנל סינון מעוצב */}
//             <section className="filter-panel">
//                 <div className="filter-grid">
//                     <div className="filter-group">
//                         <label>חיפוש חופשי</label>
//                         <input name="tz" placeholder="לפי ת.ז..." onChange={handleInputChange} />
//                         <input name="city" placeholder="לפי עיר..." onChange={handleInputChange} />
//                     </div>

//                     <div className="filter-group">
//                         <label>טווח תאריכים</label>
//                         <div className="range-inputs">
//                             <input name="startDate" type="date" onChange={handleInputChange} />
//                             <input name="endDate" type="date" onChange={handleInputChange} />
//                         </div>
//                     </div>

//                     <div className="filter-group">
//                         <label>נתונים כמותיים</label>
//                         <input name="minSiblings" type="number" placeholder="מינימום אחים" onChange={handleInputChange} />
//                         <input name="minSalary" type="number" placeholder="משכר שנתי מעל..." onChange={handleInputChange} />
//                     </div>

//                     <div className="filter-group">
//                         <label>סדר תצוגה</label>
//                         <select name="sortBy" onChange={handleInputChange}>
//                             <option value="createdAt">תאריך הגשה</option>
//                             <option value="family.numUnder18">כמות אחים</option>
//                             <option value="learn.salary">גובה שכר</option>
//                         </select>
//                         <select name="sortOrder" onChange={handleInputChange}>
//                             <option value="desc">מהגבוה לנמוך</option>
//                             <option value="asc">מהנמוך לגבוה</option>
//                         </select>
//                     </div>
//                 </div>
//                 <button className="search-btn" onClick={fetchData}>עדכן תוצאות 🔍</button>
//             </section>

//             {loading ? (
//                 <div className="loader">טוען נתונים...</div>
//             ) : list.length === 0 ? (
//                 <div className="no-results">לא נמצאו בקשות הממתינות לטיפול ✅</div>
//             ) : (
//                 <div className="table-wrapper">
//                     <table className="styled-table">
//                         <thead>
//                             <tr>
//                                 <th>ת.ז</th>
//                                 <th>שם מלא</th>
//                                 <th>עיר</th>
//                                 <th>אחים</th>
//                                 <th>שכר</th>
//                                 <th>מגמה</th>
//                                 <th>סטטוס</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {list.map((x) => (
//                                 <tr key={x._id}>
//                                     <td>{x.personal?.tz}</td>
//                                     <td><b>{x.personal?.firstName} {x.personal?.lastName}</b></td>
//                                     <td>{x.personal?.city}</td>
//                                     <td>{x.family?.numUnder18}</td>
//                                     <td>{x.learn?.salary?.toLocaleString()} ₪</td>
//                                     <td>{x.learn?.trend}</td>
//                                     <td>
//                                         <Link to='/TheRequest' state={x._id} className="status-link">
//                                             {x.status === 'waiting' ? 'ממתין לבדיקה' : x.status}
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };






// import { useSelector } from "react-redux";
// import { SelectNotAlowed } from '../redux/RequestSlice'
// import { useState } from "react";
// import swal from "sweetalert"
// import { Link } from "react-router";
// import API from '../service/api';
// import React, { useEffect } from "react";


// export const ShowQuestions = () => {

//     const [list, setList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     //  const list = useSelector(SelectNotAlowed)

//     useEffect(() => {
//         // שליפת הנתונים מהשרת בטעינת הדף
//         API.get('/requests/not-allowed')
//             .then(res => {
//                 setList(res.data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error("שגיאה בטעינת בקשות:", err);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) return <h1>טוען נתונים...</h1>;

//     return <>

//         {list.length == 0 ?  //אם אין לפחות בקשה אחת שמחכה
//             <h1>כל הבקשות טופלו ✅</h1>
//             :  //אם יש לפחות בקשה אחת שמחכה
//             <>
//                 <p>שלום מנהל נחמד לפניך הבקשות</p>
//                 <table>
//                     <thead>
//                         <tr>
//                             <td><b>ת.ז:</b></td>
//                             <td><b>שם פרטי</b></td>
//                             <td><b>שם משפחה</b></td>
//                             <td><b>מגמה</b></td>
//                             <td><b>סטטוס</b></td>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {list.map((x) => (

//                             <>

                               
//                                     <tr key={x._id}>
//                                         <td>{x.personal?.tz}</td>
//                                         <td>{x.personal?.firstName}</td>
//                                         <td>{x.personal?.lastName}</td>
//                                         <td>{x.learn?.trend}</td>
//                                         <td><Link to='/TheRequest' state={x._id}>{x.status}</Link></td>  
//                                     </tr>
                               
//                             </>

//                         ))}
//                     </tbody>
//                 </table>

//             </>
//         }
//     </>
// }
