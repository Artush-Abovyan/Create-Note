import { createSlice } from "@reduxjs/toolkit";
import { addData, deleteData } from "./dataSlice";

const initialState = {
    categories: [
      { id: 0, name: 'Task', active: 0, archived: 0 },
      { id: 1, name: 'Random Thought', active: 0, archived: 0 },
      { id: 2, name: 'Idea', active: 0, archived: 0 },
      { id: 3, name: 'Quote', active: 0, archived: 0 },
    ],
};

const archivedSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
      incrementArchived: (state, action) => {
        const categoryId = action.payload.categoryId;
        const category = state.categories.find(cat => cat.id === +categoryId);
        console.log("categoryId archivedSlice:", typeof(categoryId));
        if (category) {
          category.archived += 1;
          category.active -= 1;
        }
      },  
    },
        extraReducers: (builder) => {
          builder
            .addCase(addData, (state, action) => {
              const category = state.categories.find(cat => cat.name === action.payload.categoryName);
              if (category) {
                category.active += 1;
              }
            })
            .addCase(deleteData, (state, action) => {
              const categoryId = action.payload.categoryId;
              const category = state.categories.find(cat => cat.id === +categoryId);
              if (category && category.active > 0) {
                category.active -= 1;
              }
            })
           
        },
});

export const {incrementArchived } = archivedSlice.actions;

export default archivedSlice.reducer;