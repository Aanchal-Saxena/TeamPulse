import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { UserRole } from '../../constants/enums';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { currentRole } = useSelector((state: RootState) => state.role);

  const leadMenuItems = [
    { icon: '📊', label: 'Dashboard', active: true },
    { icon: '👥', label: 'Team Management' },
    { icon: '📋', label: 'Task Overview' },
    { icon: '📈', label: 'Analytics' },
    { icon: '⚙️', label: 'Settings' }
  ];

  const memberMenuItems = [
    { icon: '📊', label: 'Dashboard', active: true },
    { icon: '✅', label: 'My Tasks' },
    { icon: '📅', label: 'Calendar' },
    { icon: '👤', label: 'Profile' },
    { icon: '⚙️', label: 'Settings' }
  ];

  const menuItems = currentRole === UserRole.LEAD ? leadMenuItems : memberMenuItems;

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h3>Team Pulse</h3>
          <button className="toggle-btn" onClick={onToggle}>
            {isOpen ? '◀' : '▶'}
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <div key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              {isOpen && <span className="nav-label">{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}
    </>
  );
};

export default Sidebar;