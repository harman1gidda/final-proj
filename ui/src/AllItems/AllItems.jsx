import { useEffect, useState } from 'react';
//import HandleDelete from './HandleDelete';

export default function AllItems() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const isAuthenticated = localStorage.getItem('session_id');

  useEffect(() => {
    fetch('http://localhost:8081/item')
      .then((response) => response.json())
      .then((data) => setList(data));
  }, []);


  const filteredList = list
    .filter((item) => item.item_name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search item by name..."
          value={search}
          onChange={(elm) => setSearch(elm.target.value)}
        />
      </div>

      <div>
        <table className="item-table">
          <tbody>
            {filteredList.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.item_name}</td>
                <td>{row.description > 100 ? row.description.substring(0, 100) + '...' : row.description}</td>
                <td>{row.quantity}</td>
                {/* <td>
                  <Link to={`/item/${row.id}`}>View Details</Link>
                  {isAuthenticated && (
                    <>
                      <Link to={`/edit/${row.id}`}>Edit</Link>
                      <button onClick={() => handleDelete(row.id)}>Delete</button>
                    </>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );


  function handleDelete(id) {
    fetch(`http://localhost:8081/item/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        setList(list.filter(item => item.id !== id));
      })
      .catch(err => console.error('Error deleting item', err));
  }
}