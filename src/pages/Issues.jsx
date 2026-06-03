import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { TaskContext } from '../context/TaskContext';

function Issues() {
  const { state, dispatch } = useContext(TaskContext);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get('http://localhost:5000/issues');
        dispatch({ type: 'SET_ISSUES', payload: res.data.data });
      } catch (err) {
        console.error(err);
      }
    };
    fetchIssues();
  }, [dispatch]);

  return (
    <div>
      <h2>Issues</h2>
      <ul>
        {state.issues?.map(i => (
          <li key={i._id}>{i.title} - {i.status} [{i.priority}]</li>
        ))}
      </ul>
    </div>
  );
}

export default Issues;
