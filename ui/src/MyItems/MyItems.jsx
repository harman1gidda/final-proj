import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddItem from '../AddItem/AddItem';
import DeleteItem from '../DeleteItem/DeleteItem';
import EditItem from '../EditItem/EditItem';

export default function MyItems() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const sessionId = localStorage.getItem('session_id');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (sessionId) {
      fetch('http://localhost:8081/item')
        .then((response) => response.json())
        .then((data) => {
          // Filter data based on the user ID for the logged-in user
          setList(data.filter((item) => item.user_id === userId));
        });
    }
  }, [sessionId, userId]);

  const filteredList = list.filter((item) =>
    item.item_name.toLowerCase().includes(search.toLowerCase())
  );

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
        <AddItem />
      </div>

      <div>
        <table className="item-table">
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
                <td>
                  {/* <Link to={`/item/${row.id}`}>View Details</Link> */}
                  <Link to={`/edit/${row.id}`}>Edit</Link>
                  <DeleteItem id={row.id} sessionId={sessionId} setList={setList} list={list} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
