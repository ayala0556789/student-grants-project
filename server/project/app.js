import express from 'express'
import { userRouters } from './api/routers/userRoutes.js'
import { requestRouters } from './api/routers/requestRoutes.js'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()

app.use(express.json()) // חשוב מאוד כדי לקבל נתונים ב-POST
app.use(cors())         // מאפשר גישה לדפדפן

// גישה ישירה לתמונות
app.use('/uploads', express.static('project/uploads'))

const port = 3001

// חיבור למסד הנתונים (מומלץ לשחרר את ההערה)
mongoose.connect(`mongodb://localhost:27017/GrantDB`)
    .then(() => console.log('Connected to MongoDB ✅'))
    .catch(err => console.log('MongoDB connection error ❌:', err))

     // חיבור הראוטר
app.use('/requests',requestRouters)
app.use('/users', userRouters)

app.listen(port, () => {
    console.log(`My App is running on http://localhost:${port} 🏆💖💖`)
})