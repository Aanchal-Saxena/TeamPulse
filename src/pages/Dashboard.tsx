import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { loadMembers } from '../redux/slices/membersSlice';
import { UserRole, MemberStatus } from '../constants/enums';
import { getActiveTasks, searchMembers } from '../utils';
import {
  Header,
  Sidebar,
  MemberCard,
  TaskForm,
  TaskList,
  StatusSelector,
  StatusSummary,
  ChartView,
  SearchBar,
  UserStats
} from '../components';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { currentRole } = useSelector((state: RootState) => state.role);
  const { members, loading } = useSelector((state: RootState) => state.members);
  const dispatch = useDispatch();
  
  const [statusFilter, setStatusFilter] = useState<MemberStatus | ''>('');
  const [sortByTasks, setSortByTasks] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load members on mount if only dummy users exist
  useEffect(() => {
    if (members.length <= 2) {
      dispatch(loadMembers());
    }
  }, [dispatch, members.length]);

  // Memoized member filtering and sorting for performance
  const sortedMembers = useMemo(() => {
    // Apply search filter
    const searchedMembers = searchMembers(members, searchTerm);
    
    // Apply status filter
    const filteredMembers = statusFilter 
      ? searchedMembers.filter(m => m.status === statusFilter)
      : searchedMembers;
    
    // Apply sorting by active tasks
    return sortByTasks
      ? [...filteredMembers].sort((a, b) => getActiveTasks(b).length - getActiveTasks(a).length)
      : filteredMembers;
  }, [members, searchTerm, statusFilter, sortByTasks]);

  // Memoized handlers
  const handleSidebarToggle = useCallback(() => setSidebarOpen(!sidebarOpen), [sidebarOpen]);
  const handleStatusFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as MemberStatus | '');
  }, []);
  const handleSortToggle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSortByTasks(e.target.checked);
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header />
      
      {currentRole === UserRole.LEAD ? (
        <div className="lead-view">
          <div className="summary-section">
            <StatusSummary />
            <ChartView />
          </div>

          <div className="controls-section">
            <div className="filters">
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search members..."
              />
              <div className="filter-controls">
                <div className="status-dropdown">
                  <select 
                    value={statusFilter} 
                    onChange={handleStatusFilterChange}
                    className="status-select"
                  >
                    <option value="">All Statuses</option>
                    <option value={MemberStatus.WORKING}>Working</option>
                    <option value={MemberStatus.BREAK}>Break</option>
                    <option value={MemberStatus.MEETING}>Meeting</option>
                    <option value={MemberStatus.OFFLINE}>Offline</option>
                  </select>
                </div>
                <div className="sort-toggle">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={sortByTasks}
                      onChange={handleSortToggle}
                      className="custom-checkbox"
                    />
                    <span className="checkbox-text">Sort by Active Tasks</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="content-grid">
            <div className="members-section">
              <div className="card-header">
                <h2>Team Members</h2>
                <span className="member-count">({sortedMembers.length} found)</span>
              </div>
              <div className="members-grid">
                {sortedMembers.length > 0 ? (
                  sortedMembers.map(member => (
                    <MemberCard key={member.id} member={member} />
                  ))
                ) : (
                  <div className="no-results">
                    <p>No members found matching your search criteria.</p>
                  </div>
                )}
              </div>
            </div>
            
            <TaskForm />
          </div>
        </div>
      ) : (
        <div className="member-view">
          <div className="member-content">
            <div className="member-top">
              <UserStats />
              <StatusSelector />
            </div>
            <TaskList />
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Dashboard;