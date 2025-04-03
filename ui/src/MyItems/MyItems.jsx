import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddItem from '../AddItem/AddItem';
import DeleteItem from '../DeleteItem/DeleteItem';
import EditItem from '../EditItem/EditItem';

export default function MyItems() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const sessionId = localStorage.getItem('session_id');
  const [editingItem, setEditingItem] = useState(null);

  //const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (sessionId) {
      fetch('http://localhost:8081/my-items',{
        method: 'GET',
        mode: 'cors',
        //credentials: "include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionId}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log('Fetched Data:', data);
          if (Array.isArray(data)){
            setList(data);
          } else {
            //console.log ('Fetche data is not an array');
            setList([]);
          }
        })
        .catch((err)=> console.log('error fetching items', err));
    }
  }, [sessionId]);

  const filteredList = Array.isArray(list) ? list.filter((item) =>
    item.item_name.toLowerCase().includes(search.toLowerCase())
  ) : [];

  // Callback to refresh list after an update
  const refreshList = () => {
    fetch('http://localhost:8081/my-items', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionId}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setList(data);
        } else {
          setList([]);
        }
      })
      .catch((err) => console.log('error fetching items', err));
  };

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
                  <DeleteItem id={row.id}/>
                  {/* <EditItem id={row.id} currentData ={{...row}}/> */}
                  <button onClick={() => setEditingItem(row)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingItem && (
        <EditItem
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdate={refreshList}
        />
      )}

    </>
  );
}
