import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditItem() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({ item_name: '', description: '', quantity: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8081/item/${id}`)
      .then((response) => response.json())
      .then((data) => setItem(data[0]));
  }, [id]);

  useEffect(() => {
    if (item) {
      setFormData({ item_name: item.item_name, description: item.description, quantity: item.quantity });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8081/item/${id}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        navigate('/item'); // Redirect to inventory page after edit
      })
      .catch(err => console.error('Error updating item', err));
  };

  return item ? (
    <form onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input
          type="text"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Item</button>
    </form>
  ) : (
    <p>Loading edit form...</p>
  );
}
