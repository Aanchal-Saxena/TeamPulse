import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateMemberStatus } from '../../redux/slices/membersSlice';
import { MemberStatus } from '../../constants/enums';
import { getStatusColor } from '../../constants/statusColors';
import { getCurrentMember } from '../../utils';
import './StatusSelector.css';

const StatusSelector: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.role);
  const { members } = useSelector((state: RootState) => state.members);
  const dispatch = useDispatch();

  // Use reusable utility to get current member
  const currentMember = getCurrentMember(members, currentUser);
  if (!currentMember) return null;

  const handleStatusChange = (status: MemberStatus) => {
    dispatch(updateMemberStatus({ id: currentMember.id, status }));
  };

  return (
    <div className="status-selector">
      <div className="card-header">
        <h3>Update Your Status</h3>
      </div>
      <div className="status-buttons">
        {Object.values(MemberStatus).map(status => (
          <button
            key={status}
            className={`status-btn ${currentMember.status === status ? 'active' : ''}`}
            onClick={() => handleStatusChange(status)}
            style={{
              backgroundColor: currentMember.status === status ? getStatusColor(status) : 'white',
              borderColor: getStatusColor(status),
              color: currentMember.status === status ? 'white' : getStatusColor(status)
            }}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusSelector;