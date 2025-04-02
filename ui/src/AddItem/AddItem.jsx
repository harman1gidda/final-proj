import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddItem() {
  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    quantity: 0,
  });
  const navigate = useNavigate();
  const sessionId = localStorage.getItem('session_id');  // Ensure session_id exists
  const userId = localStorage.getItem('user_id');  // Assuming user_id is stored on login

  const handleChange = (elm) => {
    const { name, value } = elm.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (elm) => {
    elm.preventDefault();

   // const sessionId = localStorage.getItem('session_id');

    if (!sessionId || !userId) {
      alert('You must be logged in to add an item!');
      return;
    }

    fetch('http://localhost:8081/item', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionId}`, // Include session id for auth
      },
      body: JSON.stringify({
        item_name: formData.item_name,
        description: formData.description,
        quantity: formData.quantity,
        user_id: userId }) // Include user_id in the request body,
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        navigate('/item'); // Redirect to items page after adding
      })
      .catch(err => console.error('Error adding item', err));

      setFormData({ // Reset form after submission
        item_name: '',
        description: '',
        quantity: 0,
      }); // Clear the form data after submission
  };

  return (
    <div>
      <h2>Add New Item</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="item_name"
        placeholder="Enter Item Name"
        value={formData.item_name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Enter Item Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Enter Quantity"
        value={formData.quantity}
        onChange={handleChange}
      />
      <button type="submit">Add Item</button>
    </form>
    </div>
  );
}
