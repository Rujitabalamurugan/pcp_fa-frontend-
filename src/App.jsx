import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Projects from './pages/Projects';
import Issues from './pages/Issues';
import Comments from './pages/Comments';
import Profile from './pages/Profile';
import { TaskContext } from './context/TaskContext';

function App() {
  const { state, dispatch } = useContext(TaskContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.token && window.location.pathname !== '/login') {
      navigate('/login');
    }
  }, [state.token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Issue / Bug Tracking System</h1>
      <nav data-testid="navbar" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <Link to="/dashboard" data-testid="dashboard-link">Dashboard</Link>
        <Link to="/users" data-testid="users-link">Users</Link>
        <Link to="/projects" data-testid="projects-link">Projects</Link>
        <Link to="/issues" data-testid="issues-link">Issues</Link>
        <Link to="/comments" data-testid="comments-link">Comments</Link>
        <Link to="/profile">Profile</Link>
        <button data-testid="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;
