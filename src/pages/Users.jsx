import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { TaskContext } from '../context/TaskContext';

function Users() {
  const { state, dispatch } = useContext(TaskContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/users');
        dispatch({ type: 'SET_USERS', payload: res.data.data });
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [dispatch]);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {state.users?.map(u => (
          <li key={u._id}>{u.name} - {u.role}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
