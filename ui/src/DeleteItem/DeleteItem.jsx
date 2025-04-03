import React, {useState} from 'react';

export default function DeleteItem({ id, sessionId }) {

  const [status, setStatus] = useState(null);

  const handleDelete = () => {
    if (!sessionId) {
      alert('You must be logged in to delete an item!');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this?')

    if (confirmDelete){
      fetch(`http://localhost:8081/item/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionId}`,
      },
    })
    .then((response) => {
      if (response.ok) {
        // Handle error response
        alert('Item deleted')
        window.location.reload();
      } else{
        setStatus ('Failed to delete')
      }
    })
  } else {
    console.log ('Delete action was cancelled')
  }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}
