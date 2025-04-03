import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditItem({ sessionId }) {
  const [status, setStatus] = useState(null);
  const { id } = useParams();
  //const navigate = useNavigate();
  const sessionId = localStorage.getItem('session_id');
  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    quantity: 0,
  });

  // useEffect(() => {
  //   if (!sessionId) {
  //     navigate('/');
  //     return;
  //   }

  //   fetch(`http://localhost:8081/item/${id}`, {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${sessionId}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.length > 0) {
  //         setFormData({
  //           item_name: data[0].item_name,
  //           description: data[0].description,
  //           quantity: data[0].quantity,
  //         });
  //       }
  //     })
  //     .catch((err) => console.error('Error fetching item details', err));
  // }, [id, sessionId, navigate]);

  const handleChange = (elm) => {
    const { name, value } = elm.target;
    setFormData({
      ...formData, // Spread the existing formData
      [name]: value
    });
  };

  const handleEdit = (elm) => {
    elm.preventDefault();

    fetch(`http://localhost:8081/item/${id}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionId}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success){
          window.location.reload();
          alert('Item updated successfully');
          setStatus('Item updated successfully'); // Optional: for user feedback
        }
        // navigate(`/my-items`);
      })
      .catch((error) => {
        setStatus('Failed to update item'); // Optional: for user feedback
        console.error(setStatus);
      })
  };

  return (
    <div>
      <h2>Edit Item</h2>
      <form onSubmit={handleEdit}>
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
        <button type="submit" onClick={handleEdit}>Save Changes</button>
      </form>
    </div>
  );
}
