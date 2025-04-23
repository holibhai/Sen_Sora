import React, { useState } from 'react';

const AddProductForm = () => {
  const [type, setType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    flavor: '',
    category: '',
    price: '',
    description: '',
    imageUrl: '',
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'type') {
      setType(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted:', formData);
    
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Add Product</h2>

      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Type:</label>
      <select name="type" value={formData.type} onChange={handleChange} required>
        <option value="">Select type</option>
        <option value="cake">Cake</option>
        <option value="gift">Gift</option>
      </select>

      {type === 'cake' && (
        <>
          <label>Flavor:</label>
          <input type="text" name="flavor" value={formData.flavor} onChange={handleChange} />
          <label>Size:</label>
          <input type="text" name="size" value={formData.size} onChange={handleChange} />
        </>
      )}

      {type === 'gift' && (
        <>
          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} />

        </>
      )}

      <label>Price:</label>
      <input type="number" name="price" value={formData.price} onChange={handleChange} required />

      <label>Description:</label>
      <textarea name="description" value={formData.description} onChange={handleChange} />

      <label>Image URL:</label>
      <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

      <label>Stock:</label>
      <input type="number" name="stock" value={formData.stock} onChange={handleChange} />

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
