import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (elm) => {
    const { name, value } = elm.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (elm) => {
    elm.preventDefault();

    fetch('http://localhost:8081/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('session_id', data.session_id);
          localStorage.setItem('username', formData.username);

          navigate('/my-items');
          window.location.reload();
        } else {
          setError(data.message || 'Invalid credentials');
        }
      })
      .catch(err => setError('Login failed:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <input
        type="text"
        name="username"
        placeholder="Enter Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Log In</button>
    </form>
  );
}
