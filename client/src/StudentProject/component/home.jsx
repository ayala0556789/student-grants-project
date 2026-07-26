import { useSelector } from "react-redux";
import React from 'react';
import { useNavigate } from "react-router";


export const Home = ()=>{
const navigate=useNavigate()
    const cu = useSelector(state => state.user.users);
    const cr = useSelector(state => state.request.listRequest);

const  t=()=>{
    console.log(cu);
    console.log(cr);
    
}


const login=()=>{
navigate('/login')
}

    return<>
    {t()}
    <div className="home-container">
      <header className="home-header">
        <h1>!!ברוכים הבאים לסטודנטק</h1>
        <p color="rgba(36, 138, 87, 0.548);">המרחב שלך ללמוד, ליצור ולצמוח בהייטק</p>
        <button onClick={login} className="cta-button">התחל עכשיו</button>
      </header>

      <section className="features">
        <div className="feature-card">
          <h2>קורסים</h2>
          <p>.למדו את הטכנולוגיות הכי חמות בהייטק עם מדריכים מובילים</p>
        </div>
        <div className="feature-card">
          <h2>מלגות</h2>
          <p>. קבלו את המלגות הכי שמנות ללומדי ההיטק</p>
        </div>
        <div className="feature-card">
          <h2>פרויקטים</h2>
          <p>.תרגלו בפועל וצרו תיק עבודות שירשים מעסיקים</p>
        </div>
        <div className="feature-card">
          <h2>קהילה</h2>
          <p>.התחברו לסטודנטים אחרים, שתפו ידע ותמכו אחד בשני</p>
        </div>
      </section>
    </div>
    </>
}