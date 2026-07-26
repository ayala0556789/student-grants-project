import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import swal from 'sweetalert'
import { setMyFamily } from "../../redux/RequestSlice"

export const FamilyDatails = () => {
    // שליפת הנתונים הקיימים מהסטייט הגלובלי
    const MyFamily = useSelector(state => state.request.current.family)
    
    // אתחול הסטייט המקומי עם שדות האפיון החדשים
    const [family, setFamily] = useState({
        fatherName: '',
        fatherTz: '',
        motherName: '',
        motherTz: '',
        numUnder18: 0,
        numAbove21WithChild: 0,
        siblings: [], // מערך האחים הדינמי (האתגר)
        ...MyFamily
    })
    
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()

    // פונקציית עזר לעדכון שדה כללי בסטייט
    const updateField = (name, value) => {
        setFamily(prev => ({ ...prev, [name]: value }))
    }

    // --- לוגיקת האתגר: ניהול אחים דינמי ---
    
    const addSibling = () => {
        const newSibling = { tz: '', firstName: '', lastName: '', birthDate: '' }
        updateField('siblings', [...family.siblings, newSibling])
    }

    const removeSibling = (index) => {
        const updated = family.siblings.filter((_, i) => i !== index)
        updateField('siblings', updated)
    }

    const updateSibling = (index, field, value) => {
        const updated = family.siblings.map((sib, i) => 
            i === index ? { ...sib, [field]: value } : sib
        )
        updateField('siblings', updated)
    }

    // סנכרון ל-Redux בכל שינוי בסטייט המקומי
    useEffect(() => {
        dispatch(setMyFamily(family))
    }, [family, dispatch])

    return (
        <div className="form-box">
            <h1>פרטי משפחה</h1>

            {/* פרטי הורים (סעיף 20 באפיון) */}
            <div className="parents-section">
                <h2>פרטי אב:</h2>
                <input 
                    placeholder="שם האב" 
                    value={family.fatherName} 
                    onChange={(e) => updateField('fatherName', e.target.value)}
                />
                <input 
                    placeholder="מ.ז אב" 
                    value={family.fatherTz} 
                    onChange={(e) => updateField('fatherTz', e.target.value)}
                />

                <h2>פרטי אם:</h2>
                <input 
                    placeholder="שם האם" 
                    value={family.motherName} 
                    onChange={(e) => updateField('motherName', e.target.value)}
                />
                <input 
                    placeholder="מ.ז אם" 
                    value={family.motherTz} 
                    onChange={(e) => updateField('motherTz', e.target.value)}
                />
            </div>

            <hr />

            {/* נתונים מספריים (סעיף 20 באפיון) */}
            <div className="numbers-section">
                <h2>מספר אחים מתחת לגיל 18:</h2>
                <input 
                    type="number" 
                    value={family.numUnder18} 
                    onChange={(e) => updateField('numUnder18', e.target.value)}
                />

                <h2>מספר אחים מעל גיל 21 עם יותר מילד אחד:</h2>
                <input 
                    type="number" 
                    value={family.numAbove21WithChild} 
                    onChange={(e) => updateField('numAbove21WithChild', e.target.value)}
                />
            </div>

            <hr />

            {/* האתגר: רשימת אחים דינמית (סעיפים 21-22 באפיון) */}
            <div className="siblings-section">
                <h2>פרטי אחים :</h2>
                {family.siblings.map((sib, index) => (
                    <div key={index} className="sibling-row" style={{ border: '1px dotted gray', padding: '10px', marginBottom: '10px' }}>
                        <input 
                            placeholder="מ.ז אח" 
                            value={sib.tz} 
                            onChange={(e) => updateSibling(index, 'tz', e.target.value)}
                        />
                        <input 
                            placeholder="שם פרטי" 
                            value={sib.firstName} 
                            onChange={(e) => updateSibling(index, 'firstName', e.target.value)}
                        />
                        <input 
                            placeholder="שם משפחה" 
                            value={sib.lastName} 
                            onChange={(e) => updateSibling(index, 'lastName', e.target.value)}
                        />
                        <input 
                            type="date" 
                            value={sib.birthDate} 
                            onChange={(e) => updateSibling(index, 'birthDate', e.target.value)}
                        />
                        <button type="button" onClick={() => removeSibling(index)}>הסר אח</button>
                    </div>
                ))}
                <button type="button" onClick={addSibling}>+ הוסף אח</button>
            </div>
        </div>
    )
}
