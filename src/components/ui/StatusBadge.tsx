import React from 'react';
import { getStatusColor } from '../../constants/statusColors';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

// Reusable status badge component
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => (
  <div 
    className={`status-badge ${className}`}
    style={{ backgroundColor: getStatusColor(status) }}
  >
    {status}
  </div>
);