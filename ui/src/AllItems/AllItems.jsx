import { useEffect, useState } from 'react';
//import HandleDelete from './HandleDelete';
// import { Link } from 'react-router-dom';
// import AddItem from '../AddItem/AddItem';
// import DeleteItem from '../DeleteItem/DeleteItem';
// import EditItem from '../EditItem/EditItem';

export default function AllItems() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const sessionId = localStorage.getItem('session_id');
  const userId = localStorage.getItem('user_id');

  // useEffect(() => {
  //   fetch('http://localhost:8081/item')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (sessionId){
  //         // Filter data based on userId if authenticated
  //         setList(data.filter(item => item.user_id === userId));
  //       } else{
  //         setList(data);
  //       }
  //     });
  // }, [sessionId, userId]); // Re-fetch when authentication status or userId changes

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
        setList(data); // Set all items, no filtering based on user ID
      });
  }, []);

  const filteredList = list.filter((item) => item.item_name.toLowerCase().includes(search.toLowerCase()))


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

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}