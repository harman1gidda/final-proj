import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/item/${id}`)
      .then((response) => response.json())
      .then((data) => setItem(data[0])); // Assuming single item returned
  }, [id]);

  return item ? (
    <div>
      <h1>{item.item_name}</h1>
      <p>{item.description}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  ) : (
    <p>Loading item details...</p>
  );
}
