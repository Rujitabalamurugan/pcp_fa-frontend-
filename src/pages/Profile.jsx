import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { TaskContext } from '../context/TaskContext';

function Profile() {
  const { state, dispatch } = useContext(TaskContext);
  const [profile, setProfile] = useState(state.authUser);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth/me', {
          headers: { Authorization: `Bearer ${state.token}` }
        });
        setProfile(res.data.data);
        dispatch({ type: 'SET_AUTH', payload: { user: res.data.data, token: state.token } });
      } catch (err) {
        console.error(err);
      }
    };
    if (state.token && !profile) {
      fetchProfile();
    }
  }, [state.token, profile, dispatch]);

  return (
    <div>
      <h2>Profile</h2>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
