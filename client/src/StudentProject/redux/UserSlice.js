import { createSlice } from "@reduxjs/toolkit";

// import axios from 'axios';
// axios.defaults.baseURL= "http://localhost:5058"

const initialState = {
    users: [
        // { tz: '326598874', firstName: "שושנה", lastName: "ישראלי", password: 10 },
        // { tz: '123546879', firstName: "אילה", lengthastName: "קשאני", password: 17 },
        // { tz: '854697123', firstName: "אסתר", lastName: "כהן", password: 8 },
        { tz: '854217963', firstName: "רות", lastName: "לוי", password: 0 },
        { tz: '123456', firstName: "ברכי", lastName: "וינגרטן", password: 3 }
    ],
    current_user: null//{ tz: '123456', firstName: "ברכי", lastName: "וינגרטן", password: 3 }
}

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        add: (state, action) => {
            let find = false
            state.users.map(item => {
                if (item.tz == action.payload.tz)
                    find = true
            })
            if (!find)
                //לדעתי כאן לא צריך PAYLOAD מה את אומרת?
                state.users.push(action.payload)
        },

        setCurrent: (state, action) => {
            state.current_user = action.payload

        }
    }
})

export const { add, setCurrent } = userSlice.actions
export default userSlice.reducer

