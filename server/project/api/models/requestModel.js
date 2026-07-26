import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    personal: {
        tz: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        birthDay: String,
        city: String,
        address: String,
        phone: String,
        homePhone: String,
        email: String
    },
    family: {
        fatherTz: String,
        fatherName: String,
        motherTz: String, 
        motherName: String,
        numUnder18: Number,
        numAbove21WithChild: Number,
           siblings: [{
            tz: String,
            firstName: String,
            lastName: String,
            birthDate: String
        }]
    },
    learn: {
        trend: String, 
        institutionName: String,
        years: String,
        salary: Number 
    },
    bank: {
        ownerTz: String,
        ownerTzName:String,
        bankName: String,
        bankNumber: String, 
        sniff: String,
        cheshbon: String
    },
    documents: {
        tzScan: { type: String },        // נתיב לקובץ ת"ז
        studyApproval: { type: String }, // נתיב לאישור לימודים
        bankApproval: { type: String }   // נתיב לאישור בנק
    },
    status: { 
        type: String, 
        enum: ['waiting', 'allow', 'reject'], 
        default: 'waiting' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const GrantRequest = mongoose.model('GrantRequest', requestSchema);
export default GrantRequest;
