import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useContext(TaskContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        dispatch({ type: 'SET_AUTH', payload: { user: res.data.data, token: res.data.token } });
        navigate('/dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed.');
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/auth/register', { 
        userId: email.split('@')[0], 
        name: email.split('@')[0], 
        email, 
        role: 'admin' 
      });
      if (res.data.success) {
        alert('Registration successful! You can now login.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div>
      <h2>Login / Register</h2>
      <form data-testid="login-form" onSubmit={handleLogin}>
        <input 
          type="email" 
          data-testid="email-input" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          data-testid="password-input" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button type="submit" data-testid="login-btn">Login</button>
        <button type="button" onClick={handleRegister} style={{ marginLeft: '10px' }}>Register</button>
      </form>
    </div>
  );
}

export default Login;
