import User from '../models/userModel.js'



// פונקציית הרשמה
export const register = async (req, res) => {
    try {
        const { tz, firstName, lastName, password } = req.body;
        
        // יצירת משתמש חדש לפי המודל
        const newUser = new User({ tz, firstName, lastName, password });
        
        // שמירה במסד הנתונים
        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } 
    catch (error) {
        // 1. שגיאת "מפתח כפול" (כמו תעודת זהות שקיימת כבר)
        if (error.code === 11000) {
            return res.status(400).json({ message: 'תעודת הזהות הזו כבר רשומה במערכת.' });
        }
        
        // 2. שגיאת תיקוף (שדות חסרים או לא תקינים)
        if (error.name === 'ValidationError') {
            const field = Object.keys(error.errors)[0]; // השדה הראשון שנכשל
            return res.status(400).json({ message: `אחד הפרטים אינו תקין: ${field}` });
        }

        // 3. כל שגיאה אחרת (למשל בעיית שרת)
        res.status(500).json({ message: 'חלה שגיאה בשרת, נסה שוב מאוחר יותר.' });
        
        // res.status(400).json({ message: 'הרשמה נכשלה ', error: error.message });
    }
};

// פונקציית התחברות
export const login = async (req, res) => {
    const { tz, password } = req.body;
    try {
        
        // חיפוש המשתמש לפי ת"ז וסיסמה
        const user = await User.findOne({ tz:tz});
        
        if (!user) {
            res.status(404).json({ message: 'משתמש לא נמצא במערכת', user });
        }
         if(user.password!=password) {
            res.status(401).json({ message: 'ססמא שגויה' });
        }
        
        const {password:_, ...userWihtoutPassword}=user._doc;
        res.status(200).json({
            message:"התחברת בהצלחה",
            user:userWihtoutPassword
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



// פונקציה לשליפת כל המשתמשים
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // שולף את כל המסמכים מאוסף המשתמשים
        res.status(200).json(users);    // מחזיר אותם כ-JSON
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};