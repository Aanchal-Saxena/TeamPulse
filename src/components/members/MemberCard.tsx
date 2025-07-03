import React, { memo } from 'react';
import { Member } from '../../types';
import { getActiveTasks } from '../../utils';
import { StatusBadge } from '../ui/StatusBadge';
import './MemberCard.css';

interface MemberCardProps {
  member: Member;
}

// Memoized component to prevent unnecessary re-renders
const MemberCard: React.FC<MemberCardProps> = memo(({ member }) => {
  const activeTasks = getActiveTasks(member);

  return (
    <div className="member-card">
      <div className="member-info">
        <img 
          src={member.avatar} 
          alt={member.name} 
          className="member-avatar"
          loading="lazy" // Lazy load images for performance
        />
        <div>
          <h3>{member.name}</h3>
          <p>{member.email}</p>
        </div>
      </div>
      <div className="member-status">
        <StatusBadge status={member.status} />
        <span className="task-count">{activeTasks.length} active tasks</span>
      </div>
    </div>
  );
});

MemberCard.displayName = 'MemberCard';
export default MemberCard;