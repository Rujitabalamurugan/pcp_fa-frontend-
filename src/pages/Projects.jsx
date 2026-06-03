import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { TaskContext } from '../context/TaskContext';

function Projects() {
  const { state, dispatch } = useContext(TaskContext);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/projects');
        dispatch({ type: 'SET_PROJECTS', payload: res.data.data });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, [dispatch]);

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {state.projects?.map(p => (
          <li key={p._id}>{p.title} - {p.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
