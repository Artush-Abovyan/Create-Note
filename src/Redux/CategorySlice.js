import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 0, name: "Task" },
    { id: 1, name: "Random Thought" },
    { id: 2, name: "Idea" },
    { id: 3, name: "Quote" },
]

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        
    }
})

export const selectAllCategory = (state) => state.category

export default categorySlice.reducer