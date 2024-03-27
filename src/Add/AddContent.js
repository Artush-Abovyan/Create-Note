import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addData, deleteData, updateData } from '../Redux/dataSlice';
import { incrementArchived } from '../Redux/archivedSlice';
import { archiveData } from '../Redux/dataAction';
import FormDataForm from './FormData'
import Category from './Category'
import { v4 as uuidv4} from 'uuid'
import { FcIdea } from 'react-icons/fc';
import { BsBasketFill, BsPuzzle } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaEdit, FaDownload, FaTrashAlt } from "react-icons/fa";
import '../App.css'


const AddContent = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.data);


    const [showForm, setShowForm] = useState(false);
    const [editItemId, setEditItemId] = useState(null);

    const getFormattedDateAndTime = () => {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const formattedDate = now.toLocaleDateString('en-US', options);
    
        return { formattedDate}; 
    };

    const handleAddData = (formData) => {
        const newId =  uuidv4()
        const newFormData = {
            id: newId,
            ...formData,
            Created: getFormattedDateAndTime()
        };
    
        dispatch(addData(newFormData));
        setShowForm(false);
        console.log("new Data:",newFormData);
    };

    

    const truncateString = (str, num) => {
        if (str.length > num) {
          return str.slice(0, num) + '...';
        } else {
          return str;
        }
    };

    const categoryIdToName = {
        0: "Task",
        1: "Random Thought",
        2: "Idea",
        3: "Quote",
    };

    const categoryIcons = {
        "Task":<BsBasketFill size={19}/>,
        "Random Thought": <BsPuzzle size={19}/>,
        "Idea":<FcIdea size={19}/>,
        "Quote":<FaRegCommentDots size={19}/>,
    }
    
    const ActiveNotes = ({ id, onEdit, onDownload, onDelete }) => {
        return (
            <div className="note-icons">
                <FaEdit size={20} onClick={() => onEdit(id)} />
                <FaDownload size={20} onClick={() => onDownload(id)} />
                <FaTrashAlt size={20} onClick={() => onDelete(id)} />
            </div>
        );
    };

    const handleDownloadClick = (itemId, categoryId) => {
        dispatch(archiveData(itemId, +categoryId));
        console.log("categoryId for AddContent:",typeof(categoryId));
      };

    const handleDelete = (itemId, categoryId) => {
        console.log("Deleting item with ID:", itemId, "and Category ID:", categoryId);
        dispatch(deleteData({id:itemId, categoryId}));
    };
   
    const handleEditClick = (itemId) => {
        setEditItemId(itemId); // Set the edit state to the item's ID
    };
    
    const handleCloseModal = () => {
        setEditItemId(null); // Clear the edit state to exit edit mode
    };

    const handleUpdateItem = (updatedItem) => {
        dispatch(updateData(updatedItem)); // Dispatch an action to update the item
        handleCloseModal(); // Close the edit modal
    };

    return (
        <div className='add'>
            <div className='addnewNotes'>
                <table>
                    <thead className='listHeader'>
                        <tr >
                            <th className='logo'></th>
                            <th>Name</th>
                            <th className='created'>Created</th>
                            <th>Category</th>
                            <th>Content</th>
                            <th>Active Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            const categoryName = categoryIdToName[item.Category] || "Unknown Category";
                            const icon = categoryIcons[categoryName] || null;
                            const {formattedDate} = getFormattedDateAndTime()
                            return (
                                <tr className='it' key={index}>
                                    <td className='logoIcon'>{icon}</td>
                                    <td>{item.Name}</td>
                                    <td>{formattedDate}</td>
                                    <Category categoryId={item.Category} />
                                    <td>{truncateString(item.Content, 14)}</td>
                                    <td>
                                        <ActiveNotes
                                            id={item.id}
                                            onEdit={() => handleEditClick(item.id)}
                                            onDownload={() => handleDownloadClick(item.id, item.Category)}
                                            onDelete={() => handleDelete(item.id, item.Category)}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <button className='createNote' onClick={() => setShowForm(true)}>create Note</button>
            {showForm && (
                <div className="backdrop">
                    <FormDataForm onSubmit={handleAddData} />
                </div>
            )}

            {editItemId && (
                <div className="edit-modal">
                    <div className="edit-modal-content">
                        <h2>Edit Item</h2>
                        <div className="backdrop">
                    <FormDataForm onSubmit={handleAddData} />
                        </div>
                        <button onClick={handleCloseModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddContent