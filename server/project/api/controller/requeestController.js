import GrantRequest from '../models/requestModel.js'

// הגשת בקשה חדשה
export const createRequest = async (req, res) => {
    try {

        // 1. חילוץ האובייקטים שנשלחו כטקסט והפיכתם חזרה לאובייקטים
        const personal =req.body.personal? JSON.parse(req.body.personal):{};
        const family =req.body.family? JSON.parse(req.body.family):{};
        const learn = req.body.learn?JSON.parse(req.body.learn):{};
        const bank = req.body.bank?JSON.parse(req.body.bank):{};

        // 2.multer חילוץ נתיבי הקבצים שנשמרו על ידי 
        const documents = {
            tzScan: req.files?.['tzScan'] ? `uploads/${req.files['tzScan'][0].filename}` : null,
            studyApproval: req.files?.['studyApproval'] ? `uploads/${req.files['studyApproval'][0].filename}` : null,
            bankApproval: req.files?.['bankApproval'] ? `uploads/${req.files['bankApproval'][0].filename}` : null
        };

        const newRequest = new GrantRequest({personal,family,learn,bank,documents,status: 'waiting'});
        await newRequest.save();
        res.status(201).json({ message: 'הבקשה נקלטה בהצלחה במערכת!', data: newRequest });
    } 
    catch (error) {
        console.error(error);
        res.status(400).json({ message: 'חלה שגיאה בשמירת הבקשה', error: error.message });
    }
};

// שליפת כל הבקשות (עבור המנהל)
export const getAllRequests = async (req, res) => {
    try {
        const requests = await GrantRequest.find();
        res.status(200).json(requests);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error: error.message });
    }
};

// שליפת כל הבקשות הלא מאושרות (עבור המנהל)
export const getFilteredRequests = async (req, res) => {
    try {
        const { 
            tz, city, startDate, endDate, 
            minSiblings, maxSiblings, 
            minSalary, maxSalary, 
            sortBy, sortOrder 
        } = req.query;

        // סינון בסיסי: רק בקשות שטרם אושרו
        let query = { status: { $ne: 'allow' } };

        // חיפוש לפי ת.ז מסוים
        if (tz) query['personal.tz'] = tz;

        // חיפוש לפי עיר (חיפוש גמיש)
        if (city) query['personal.city'] = { $regex: city, $options: 'i' };

        // טווח תאריכים
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        // כמות אחים - מעלה/מטה
        if (minSiblings || maxSiblings) {
            query['family.numUnder18'] = {};
            if (minSiblings) query['family.numUnder18'].$gte = Number(minSiblings);
            if (maxSiblings) query['family.numUnder18'].$lte = Number(maxSiblings);
        }

        // שכר שנתי - מעלה/מטה
        if (minSalary || maxSalary) {
            query['learn.salary'] = {};
            if (minSalary) query['learn.salary'].$gte = Number(minSalary);
            if (maxSalary) query['learn.salary'].$lte = Number(maxSalary);
        }

        // מיון דינמי
        let sort = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        } else {
            sort['createdAt'] = -1;
        }

        const requests = await GrantRequest.find(query).sort(sort);
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error: error.message });
    }
};

// שליפת בקשה מלאה לפי ID (עבור דף פרטי בקשה)
export const getRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await GrantRequest.findById(id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching request details', error: error.message });
    }
};

// שליפת הבקשה האחרונה של משתמש לפי תעודת זהות
export const getLastRequestByTz = async (req, res) => {
    try {
        const { tz } = req.params;
        // מוצא בקשות עם הת"ז הזו, ממיין מהחדש לישן, ולוקח רק את הראשונה
        const lastRequest = await GrantRequest.findOne({ "personal.tz": tz })
                                              .sort({ createdAt: -1 });

        if (!lastRequest) {
            return res.status(200).json(null); // אין בקשות למשתמש זה
        }
        res.status(200).json(lastRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching last request', error: error.message });
    }
};

// עדכון סטטוס בקשה (אישור/דחייה)
export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await GrantRequest.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: 'Update failed', error: error.message });
    }

    
};
