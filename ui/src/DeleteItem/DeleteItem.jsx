import React, {useState} from 'react';

export default function DeleteItem({ id }) {

  const [status, setStatus] = useState(null);
  const sessionId = localStorage.getItem('session_id');

  const handleDelete = () => {
    if (!sessionId) {
      alert('You must be logged in to delete an item!');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this?')
    if (!confirmDelete) {
      console.log('Delete action was cancelled');
      return;
    }

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
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('Item deleted');
        window.location.reload();
      } else {
        setStatus('Failed to delete: ' + data.message);
      }
    })
    .catch((err) => {
      console.error('Error deleting item', err);
      setStatus('Failed to delete');
      });
    }
  }

  return (
    <>
    <button onClick={handleDelete}>Delete</button>
    {status && <p>{status}</p>}
    </>
  );
}
