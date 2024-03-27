import '../App.css'
import React, { useState } from 'react';
import { selectAllCategory } from '../Redux/CategorySlice';
import { useSelector } from 'react-redux';


const FormDataForm = ({ onSubmit }) => {
  const categories = useSelector(selectAllCategory)
  const [categoryid, setCategoryId] = useState()
  const onCategoryChanged = (e) => setCategoryId(e.target.value)
  const [formData, setFormData] = useState({
    Name: '',
    Created: '',
    Category: '',
    Content: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const category = categories.find(cat => cat.id === parseInt(categoryid, 10));
    if (category) {
        const submissionData = {
            ...formData,
            Category: categoryid,
            categoryName: category.name, 
        };

        onSubmit(submissionData);
        setFormData({
            Name: '',
            Created: '',
            Category: '',
            Content: '',
        });
    } else {
        console.error('Category is required');
    }
};
  

  const categoryOptions = categories.map((category) =>(
    <option key={category.id} value={category.id}>
        {category.name}
    </option>
  ));

  return (
    <div className='formdiv'>
        <form className='form' onSubmit={handleSubmit}>
      <label className='label'>
        Note name:<input type="text" name="Name" value={formData.Name} onChange={handleInputChange} />
      </label>
      <label htmlFor="postCategory" className='label'>
        Choose Category:
      </label>
      <select id='postCategory' value={categoryid} onChange={onCategoryChanged}>
        <option value=''></option>
        {categoryOptions}
      </select>
      <label className='label'>
        Note Content:<textarea name="Content" value={formData.Content} onChange={handleInputChange} />
      </label>
      <button type="submit">Add Data</button>
    </form>
    </div>
  );
};

export default FormDataForm;
