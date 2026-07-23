import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Resume {
    docId: string;
    ownerEmail: string;
    title: string;
    createdAt: number;
    data?: any;
}

export interface ResumeState {
    resumes: Resume[];
    currentResume: any;
}

const initialState: ResumeState = {
    resumes: [],
    currentResume: null,
};

// slice
export const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {
        addResumes: (state, action: PayloadAction<Resume>) => {
            state.resumes.push(action.payload);
        },
        setCurrentResume: (state, action: PayloadAction<any>) => {
            state.currentResume = action.payload;
        },
    },
});

export const { addResumes, setCurrentResume } = resumeSlice.actions;

export default resumeSlice.reducer;