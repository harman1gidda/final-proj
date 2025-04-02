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
    fetch('http://localhost:8081/item')
    .then((response) => response.json())
      .then((data) => {
        setList(data); // Set all items, no filtering based on user ID
      });
  }, []);

  const filteredList = list
    .filter((item) => item.item_name.toLowerCase().includes(search.toLowerCase()))

  // function handleDelete(id) {
  //   if (!sessionId) {
  //     alert("You must be logged in to delete an item!");
  //     return;
  //   }

  //   fetch(`http://localhost:8081/item/${id}`, {
  //     method: 'DELETE',
  //     mode: 'cors',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${isAuthenticated}`,
  //       },
  //     })
  //     .then(() => {
  //       setList(list.filter(item => item.id !== id));
  //     })
  //     .catch(err => console.error('Error deleting item', err));
  //   }

  //   function handleAdd() {
  //     // Navigate to the add item page (you can create a form for this)
  //     window.location.href = "/add-item"; // or use navigate('/add-item') if you're using useNavigate
  //   }

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

      {/* {sessionId && ( */}
        {/* <div> */}
          {/* <button onClick={handleAdd}> Add New Item</button> */}
          {/* <AddItem /> */}
        {/* </div> */}
      {/* )} */}

      <div>
        <table className="item-table">
          <tbody>
            {filteredList.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.item_name}</td>
                <td>{row.description > 100 ? row.description.substring(0, 100) + '...' : row.description}</td>
                <td>{row.quantity}</td>
                {/* <td> */}
                  {/* <Link to={`/item/${row.id}`}>View Details</Link> */}
                  {/* {sessionId && ( */}

                      {/* <Link to={`/edit/${row.id}`}>Edit</Link> */}
                      {/* <button onClick={() => handleDelete(row.id)}>Delete</button> */}
                      {/* <DeleteItem id={row.id} sessionId={sessionId} list={list} setList={setList} /> */}

                  {/* )} */}
                {/* </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}