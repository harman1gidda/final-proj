import { useEffect, useState } from 'react';
import './AllItem.css'

export default function AllItems() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const sessionId = localStorage.getItem('session_id');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    fetch('http://localhost:8081/item',{
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionId}`,
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setList(data);
    });
  }, []);

  const filteredList = list.filter((item) => item.item_name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <div className="search-container">
        <label htmlFor="search" className="search-label">Search Items:</label>
        <input
          id="search"
          type="text"
          placeholder="Search item by name..."
          value={search}
          onChange={(elm) => setSearch(elm.target.value)}
        />
      </div>

      <div className="all-items-container">
        <table className="item-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item Name</th>
              <th>Description</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.item_name}</td>
                <td>
                  {row.description.length > 100
                    ? row.description.substring(0, 100) + '...'
                    : row.description}
                </td>
                <td>{row.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

}