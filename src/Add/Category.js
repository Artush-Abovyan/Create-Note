import { useSelector } from "react-redux"
import { selectAllCategory } from "../Redux/CategorySlice"

const Category = ({ categoryId }) => {
    const categories = useSelector(selectAllCategory);
    const categoryIdAsNumber = parseInt(categoryId, 10);
    const category = categories.find((cat) => cat.id === categoryIdAsNumber )
    return <td>{category ? category.name : 'Unknown Author'}</td>
}

export default Category;