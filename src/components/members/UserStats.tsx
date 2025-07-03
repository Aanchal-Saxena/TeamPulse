import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getTaskStats, getCurrentMember } from '../../utils';
import { StatusBadge } from '../ui/StatusBadge';
import './UserStats.css';

const UserStats: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.role);
  const { members } = useSelector((state: RootState) => state.members);
  
  // Use reusable utility to get current member
  const currentMember = getCurrentMember(members, currentUser);
  if (!currentMember) return null;
  
  // Use reusable task stats calculation
  const { totalTasks, activeTasks, completedTasks } = getTaskStats(currentMember);

  return (
    <div className="user-stats">
      <div className="card-header">
        <h3>My Performance</h3>
        <StatusBadge status={currentMember.status} />
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{totalTasks}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{activeTasks}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{completedTasks}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>
    </div>
  );
};

export default UserStats;