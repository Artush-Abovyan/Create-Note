import { addData, deleteData } from "./dataSlice";
import { incrementArchived } from "./archivedSlice";
import Category from "../Add/Category";

export const archiveData = (itemId, categoryId) => (dispatch) => {
    dispatch(deleteData({ id: itemId }));
    dispatch(incrementArchived({ categoryId}))
    console.log("CategoryId for increment:",typeof(categoryId) );
}