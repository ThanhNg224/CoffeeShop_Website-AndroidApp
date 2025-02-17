import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import logo from './UserPage/partial/images/logo.png'
import './UserPage/User.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8080/', { email, password })
      .then(res => {
        const userData = res.data;
        if (userData.length === 1) {
          const user = userData[0];
          if (user.email === email && user.password === password) {
            login(user);
            if (user.role === 'admin') {
              navigate('/admin');
            } else {
              navigate(`/user/${user.id}`);
            }
          } else {
            alert('Invalid credentials');
          }
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <div className='login-page'>
      <div className='login-form'>
        <img src={logo} alt="Logo" className='mb-4' style={{ width: '100px' }} />
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email">Username (Email)</label>
            <input
              type="email"
              placeholder='Enter Username'
              className='form-control'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder='Enter Password'
              className='form-control'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button className='detail-button'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
