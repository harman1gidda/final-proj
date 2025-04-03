import React, { useState } from 'react';

export default function EditItem({ item, onClose, onUpdate }) {
  const sessionId = localStorage.getItem('session_id');
  const [formData, setFormData] = useState({
    item_name: item.item_name,
    description: item.description,
    quantity: item.quantity,
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8081/item/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionId}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setStatus('Item updated successfully');
          onUpdate(); // callback to refresh parent list
          onClose(); // close the modal
        } else {
          setStatus('Failed to update item: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating item', error);
        setStatus('Failed to update item');
      });
  };

  return (
    <div className="modal-overlay" style={modalOverlayStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <h2>Edit Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="item_name"
            value={formData.item_name}
            onChange={handleChange}
            placeholder="Item Name"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Item Description"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
        {status && <p>{status}</p>}
      </div>
    </div>
  );
}

// Simple inline styles for modal (you can replace with your own CSS)
const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: '#fff', padding: '20px', borderRadius: '4px',
  width: '300px',
};
