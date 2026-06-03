import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { TaskContext } from '../context/TaskContext';

function Comments() {
  const { state, dispatch } = useContext(TaskContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/comments');
        dispatch({ type: 'SET_COMMENTS', payload: res.data.data });
      } catch (err) {
        console.error(err);
      }
    };
    fetchComments();
  }, [dispatch]);

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {state.comments?.map(c => (
          <li key={c._id}>{c.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
