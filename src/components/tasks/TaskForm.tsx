import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { assignTask } from '../../redux/slices/membersSlice';
import { generateId } from '../../utils';
import { MESSAGES } from '../../constants';
import { Toast } from '../ui';
import './TaskForm.css';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  const { members } = useSelector((state: RootState) => state.members);
  const dispatch = useDispatch();

  // Form validation - all fields required
  const isFormValid = title.trim() && selectedMember && dueDate;

  // Reset form to initial state
  const resetForm = () => {
    setTitle('');
    setSelectedMember('');
    setDueDate('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Create and assign new task
    dispatch(assignTask({
      id: generateId(),
      title: title.trim(),
      dueDate,
      progress: 0,
      completed: false,
      assignedTo: selectedMember
    }));

    resetForm();
    setShowToast(true);
  };

  return (
    <>
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="card-header">
        <h3>Assign New Task</h3>
      </div>
      <div className="form-group">
        <label>Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>
      <div className="form-group">
        <label>Assign To</label>
        <select
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          required
        >
          <option value="">Select member</option>
          {members.map(member => (
            <option key={member.id} value={member.id}>{member.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]} // Prevent past dates
          required
        />
      </div>
      <button type="submit" disabled={!isFormValid}>Assign Task</button>
    </form>
    {/* Success notification */}
    {showToast && (
      <Toast 
        message={MESSAGES.TASK_ASSIGNED} 
        onClose={() => setShowToast(false)} 
      />
    )}
    </>
  );
};

export default TaskForm;