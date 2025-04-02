import React from 'react';

export default function DeleteItem({ id, sessionId, list, setList }) {
  const handleDelete = () => {
    if (!sessionId) {
      alert('You must be logged in to delete an item!');
      return;
    }

    fetch(`http://localhost:8081/item/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionId}`,
      },
    })
      .then(() => {
        setList(list.filter(item => item.id !== id));
      })
      .catch(err => console.error('Error deleting item', err));
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}
