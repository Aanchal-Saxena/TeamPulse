import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getStatusCounts, getTaskStats } from '../../utils';
import { getStatusColor } from '../../constants/statusColors';
import './StatusSummary.css';

const StatusSummary: React.FC = () => {
  const { members } = useSelector((state: RootState) => state.members);
  const statusCounts = getStatusCounts(members);
  // Use reusable task stats calculation
  const { totalTasks, activeTasks, completedTasks, completionRate } = getTaskStats(members);

  return (
    <div className="status-summary">
      <div className="card-header">
        <h2>Team Status Overview</h2>
        <div className="completion-badge">
          {completionRate}% Complete
        </div>
      </div>
      <div className="summary-grid">
        <div className="status-section">
          <h4>Team Status</h4>
          <div className="status-counts">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="status-count">
                <div 
                  className="status-icon"
                  style={{ backgroundColor: getStatusColor(status) }}
                ></div>
                <span className="count">{count}</span>
                <span className="label">{status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="stats-section">
          <h4>Task Statistics</h4>
          <div className="task-stats">
            <div className="stat-item">
              <span className="stat-number">{totalTasks}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{activeTasks}</span>
              <span className="stat-label">Active Tasks</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{completedTasks}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusSummary;