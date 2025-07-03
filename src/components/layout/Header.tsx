import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { switchRole } from '../../redux/slices/roleSlice';
import { UserRole } from '../../constants/enums';
import './Header.css';

const Header: React.FC = () => {
  const { currentRole, currentUser } = useSelector((state: RootState) => state.role);
  const dispatch = useDispatch();

  const handleRoleSwitch = () => {
    const newRole = currentRole === UserRole.LEAD ? UserRole.MEMBER : UserRole.LEAD;
    dispatch(switchRole(newRole));
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>Team Pulse Dashboard</h1>
        <div className="user-info">
          <span className="name">{currentUser}</span>
          <span className="designation">- {currentRole}</span>
        </div>
      </div>
      <button className="role-toggle" onClick={handleRoleSwitch}>
        Switch to {currentRole === UserRole.LEAD ? 'Member' : 'Lead'} View
      </button>
    </header>
  );
};

export default Header;