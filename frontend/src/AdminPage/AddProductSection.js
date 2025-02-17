import React from 'react';
import './Admin.css';

const AddProductSection = ({ newProductData, handleInputChange, handleAddProduct, handleCancel }) => (
  <section className="add-product-section">
    <h2>Add New Product</h2>
    <form className="add-product-form" onSubmit={handleAddProduct}>
      <div className="form-group">
        <label>
          Name:
          <input type="text" name="name" value={newProductData.name} onChange={handleInputChange} required />
        </label>
      </div>
      <div className="form-group">
        <label>
          Price:
          <input type="text" name="price" value={newProductData.price} onChange={handleInputChange} required />
        </label>
      </div>
      <div className="form-group">
        <label>
          Image URL:
          <input type="text" name="img" value={newProductData.img} onChange={handleInputChange} required />
        </label>
      </div>
      <div className="form-group">
        <label>
          Category:
          <input type="text" name="category" value={newProductData.category} onChange={handleInputChange} required />
        </label>
      </div>
      <div className="form-group">
        <label>
          Description:
          <textarea name="description" value={newProductData.description} onChange={handleInputChange} required />
        </label>
      </div>
      <div className="form-group">
        <button type="submit">Add Product</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  </section>
);

export default AddProductSection;
