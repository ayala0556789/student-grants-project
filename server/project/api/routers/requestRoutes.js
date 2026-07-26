import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRequestById,getFilteredRequests,createRequest, getAllRequests, updateStatus,getLastRequestByTz } from '../controller/requeestController.js'

// הגדרות לקבלת הנתיב הנוכחי בשימוש ב-ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
// הגדרת אחסון הקבצים
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../uploads');
         cb(null, uploadPath); },
    filename: (req, file, cb) => { cb(null, Date.now() + '-' + file.originalname); }
});
const upload = multer({ storage: storage });


// נתיב להגשת בקשה: http://localhost:5058/requests/add
router.post('/add',upload.fields([
    { name: 'tzScan', maxCount: 1 },
    { name: 'studyApproval', maxCount: 1 },
    { name: 'bankApproval', maxCount: 1 }
]), createRequest);

// נתיב לקבלת כל הבקשות: http://localhost:5058/requests/all
router.get('/all', getAllRequests);

//נתיב לקבלת כל הבקשות שלא אושרו
router.get('/not-allowed', getFilteredRequests);

// נתיב לעדכון סטטוס לפי ID: http://localhost:5058/requests/update/:id
router.put('/update/:id', updateStatus);

//נתיב לבדיקת בקשה בודדת לאישורה
router.get('/get-one/:id', getRequestById);

// נתיב לבדיקת סטטוס לפי ת"ז
router.get('/status/:tz', getLastRequestByTz);

export const requestRouters = router

