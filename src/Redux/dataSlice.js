import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  
]

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.push(action.payload);
    },
    deleteData: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    updateData: (state, action) => {
      const updatedItem = action.payload; // The updated data with the same id
  const index = state.findIndex((item) => item.id === updatedItem.id);
  
  if (index !== -1) {
    state[index] = updatedItem; // Replace the item with the updated data
  }
    },
  },
});

export const { addData, deleteData, updateData } = dataSlice.actions;
export default dataSlice.reducer;