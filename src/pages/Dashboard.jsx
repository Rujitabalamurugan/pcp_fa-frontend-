import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { TaskContext } from '../context/TaskContext';

function Dashboard() {
  const { state, dispatch } = useContext(TaskContext);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [issuesRes, projectsRes, devsRes] = await Promise.all([
          axios.get('http://localhost:5000/analytics/issues'),
          axios.get('http://localhost:5000/analytics/projects'),
          axios.get('http://localhost:5000/analytics/developers')
        ]);
        
        dispatch({
          type: 'SET_ANALYTICS',
          payload: {
            issues: issuesRes.data.data,
            projects: projectsRes.data.data,
            developers: devsRes.data.data
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    
    if (state.token) {
      fetchAnalytics();
    }
  }, [state.token, dispatch]);

  return (
    <div data-testid="analytics-container">
      <h2>Analytics Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div data-testid="total-issues-card" style={{ border: '1px solid #ccc', padding: '10px' }}>
          <h4>Total Issues</h4>
          <p>{state.analytics?.issues?.totalIssues || 0}</p>
        </div>
        <div data-testid="active-projects-card" style={{ border: '1px solid #ccc', padding: '10px' }}>
          <h4>Active Projects</h4>
          <p>{Array.isArray(state.analytics?.projects) ? state.analytics.projects.filter(p => p.status === 'active').length : 0}</p>
        </div>
        <div data-testid="open-issues-card" style={{ border: '1px solid #ccc', padding: '10px' }}>
          <h4>Open Issues</h4>
          <p>{state.analytics?.issues?.openIssues || 0}</p>
        </div>
        <div data-testid="closed-issues-card" style={{ border: '1px solid #ccc', padding: '10px' }}>
          <h4>Closed Issues</h4>
          <p>{state.analytics?.issues?.closedIssues || 0}</p>
        </div>
      </div>

      <div data-testid="issue-chart" style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
        <h4>Issue Chart Placeholder</h4>
        <pre>{JSON.stringify(state.analytics?.issues, null, 2)}</pre>
      </div>

      <div data-testid="recent-activity" style={{ border: '1px solid #ccc', padding: '20px' }}>
        <h4>Recent Activity</h4>
        <p>No recent activity...</p>
      </div>
    </div>
  );
}

export default Dashboard;
