import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dataReducer from '../Redux/dataSlice'
import CategoryReducer from "./CategorySlice";
import archivedReducer from "./archivedSlice";

const rootReducer = combineReducers({
  archived: archivedReducer,
  data: dataReducer,
  category: CategoryReducer
})

const store = configureStore({
    reducer: rootReducer
});
  
export default store;