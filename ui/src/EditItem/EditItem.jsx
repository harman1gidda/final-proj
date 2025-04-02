// EditItem.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sessionId = localStorage.getItem('session_id');
  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    quantity: 0,
  });

  useEffect(() => {
    if (!sessionId) {
      navigate('/');
      return;
    }

    fetch(`http://localhost:8081/item/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionId}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setFormData({
            item_name: data[0].item_name,
            description: data[0].description,
            quantity: data[0].quantity,
          });
        }
      })
      .catch((err) => console.error('Error fetching item details', err));
  }, [id, sessionId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8081/item/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionId}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        navigate(`/item/${id}`);
      })
      .catch((err) => console.error('Error updating item', err));
  };

  return (
    <div>
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
