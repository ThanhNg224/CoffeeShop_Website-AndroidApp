import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = ({ updateMenuItems }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    img: '',
    category: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/menu/add', formData)
      .then(response => {
        console.log('Product added successfully:', response.data);
        updateMenuItems();
        setFormData({
          name: '',
          price: '',
          img: '',
          category: '',
          description: ''
        });
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div className="add-product-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={formData.price} onChange={handleChange} required />
        </label>
        <label>
          Image URL:
          <input type="text" name="img" value={formData.img} onChange={handleChange} required />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
