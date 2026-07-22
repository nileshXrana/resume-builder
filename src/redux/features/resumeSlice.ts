import { createSlice } from '@reduxjs/toolkit';

// slice
export const resumeSlice = createSlice({
    name: 'resume',
    initialState: {
        resumes: [],
        currentResume: null,
    },
    reducers: {
        addResumes: (state: any, action) => {
            state.resumes.push(action.payload);
        },
        setCurrentResume: (state: any, action) => {
            state.currentResume = action.payload;
        },
    },
});

export const { addResumes, setCurrentResume } = resumeSlice.actions;

export default resumeSlice.reducer;