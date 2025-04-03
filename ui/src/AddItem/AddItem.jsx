import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddItem.css'

export default function AddItem() {
  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    quantity: 0,
  });
  const navigate = useNavigate();

  const handleChange = (elm) => {
    const { name, value } = elm.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (elm) => {
    elm.preventDefault();

     const sessionId = localStorage.getItem('session_id');

     if (
      formData.item_name.trim() === "" ||
      formData.description.trim() === "" ||
      formData.quantity === "" ||
      Number(formData.quantity) <= 0
    ) {
      alert("Please fill in all fields with valid values.");
      return;
    }

    if (!sessionId) {
      alert('You must be logged in to add an item!');
      return;
    }

    fetch('http://localhost:8081/my-items', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionId}`,
      },
      body: JSON.stringify({
        item_name: formData.item_name,
        description: formData.description,
        quantity: formData.quantity,
      })
    })
      .then(response => response.json())
      .then((data) => {
        if (data.success){
          console.log("items added:", data);
          navigate('/my-items');
          window.location.reload();
        } else {
          alert (data.message)
        }
      })
      .catch(err => console.error('Error adding item', err));

      setFormData({
        item_name: '',
        description: '',
        quantity: 0,
      });
  };

  return (
    <>
    <div className="add-item-container">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit} className="add-item-form">
        <div className="form-group">
          <label htmlFor="item_name">Item Name:</label>
          <input
            type="text"
            id="item_name"
            name="item_name"
            placeholder="Enter Item Name"
            value={formData.item_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter Item Description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Enter Quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
    </>
  );
}
