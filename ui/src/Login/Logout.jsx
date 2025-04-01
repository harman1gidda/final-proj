import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('http://localhost:8081/logout', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin', // Ensure cookies are sent
    })
      .then(response => response.json())
      .then(() => {
        navigate('/login'); // Redirect to the login page after logout
      })
      .catch(err => {
        console.error('Logout failed:', err);
      });
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  );
}
