import { createSlice, current } from "@reduxjs/toolkit";
import { setCurrent } from "./UserSlice";

const initialState = {
    listRequest: [],
    lastRequest: null,
    current: //JSON.parse(localStorage.getItem('scholarship_draft')) || {
    {
        personal: null,
        family: null,
        learn: null,
        bank: null,
        documents: null,
        status: 'waiting'
    }
}
const saveToLocalStorage = (state) => {
    const tz = state.current.personal?.tz;
    if (tz) {
        localStorage.setItem(`scholarship_draft_${tz}`, JSON.stringify(state.current));
    }
};

const RequestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {

        addRequest: (state, action) => {

            const newRequest = {
                ...action.payload,
                id: Date.now(),
                date: new Date().toLocaleDateString('he-IL'), // תאריך עכשווי
                status: "waiting"
            };
            state.listRequest.push(newRequest);

            // איפוס הנתונים ב-Redux כדי שהבקשה הבאה תתחיל מדף חלק
            state.current = {
                personal: null,
                family: null,
                learn: null,
                bank: null,
                documents: null,
                status: 'waiting'
            };
        },

        setCurrentRequest: (state) => {
            state.current = {};
        },

        setMyPersonal: (state, action) => {
            state.current.personal = action.payload;
            saveToLocalStorage(state);
        },


        setMyFamily: (state, action) => {
            state.current.family = action.payload;
            saveToLocalStorage(state);
        },

        setMyLearn: (state, action) => {
            state.current.learn = action.payload;
            saveToLocalStorage(state);
        },


        setMyBank: (state, action) => {
            state.current.bank = action.payload;
            saveToLocalStorage(state)
        },

        setMyDocuments: (state, action) => {
            state.current.documents = action.payload;
        },

        setLastRequest: (state, action) => {
            state.lastRequest = action.payload;
        },

        allow: (state, action) => {
            state.listRequest.map(item => {
                if (item.id == action.payload)
                    item.status = "allow"
            })
        },


        reject: (state, action) => {
            state.listRequest.map(item => {
                if (item.id == action.payload)
                    item.status = "reject"
            })
        },

        loadDraft: (state, action) => {
            const tz = action.payload;
            const savedDraft = localStorage.getItem(`scholarship_draft_${tz}`);
            if (savedDraft) {
                state.current = JSON.parse(savedDraft);
            }
        },
    }
})


export const SelectNotAlowed = state => state.request.listRequest.filter(y => y.status == "waiting")
// השורה הבאה
export const { addRequest, allow, reject, setMyPersonal, setMyFamily, setMyLearn, setMyBank, setMyDocuments, setCurrentRequest, loadDraft, setLastRequest } = RequestSlice.actions;
export default RequestSlice.reducer