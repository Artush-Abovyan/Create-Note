import React from 'react';
import { useSelector } from 'react-redux';
import { FcIdea,} from 'react-icons/fc';
import { BsPuzzle, BsBasketFill } from 'react-icons/bs';
import { FaRegCommentDots } from 'react-icons/fa';
import './CategoryTable.css'

const DefaultIcon = () => <span>No Icon</span>;

const CategoryTable = () => {
    const categories = useSelector(state => state.archived.categories);
    const categoryIcons = {
        'Task': <BsBasketFill />,
        'Random Thought': <BsPuzzle />,
        'Idea': <FcIdea />,
        'Quote': <FaRegCommentDots />,
      };

  return (
    <div className='Alltable'>
        <table className='table'>
           <thead className='items'>
             <tr className='item'>
               <th>Category</th>
               <th>Active</th>
               <th>Archived</th>
             </tr>
           </thead>
           <tbody className='categories'>
               {categories.map(category => (
                 <tr  className='Task' key={category.id}>
                     <td > {categoryIcons[category.name] || <DefaultIcon />} {category.name}</td>
                     <td>{category.active}</td>
                     <td>{category.archived}</td>
                </tr>
            ))}
           </tbody>
        </table>
    </div>
    
    );
};

export default CategoryTable