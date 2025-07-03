import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateTaskProgress } from '../../redux/slices/membersSlice';
import { getCurrentMember } from '../../utils';
import { TASK_PROGRESS_STEP, TASK_PROGRESS_MAX, TASK_PROGRESS_MIN, MESSAGES } from '../../constants';
import './TaskList.css';

const TaskList: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.role);
  const { members } = useSelector((state: RootState) => state.members);
  const dispatch = useDispatch();

  // Use reusable utility to get current member
  const currentMember = getCurrentMember(members, currentUser);
  if (!currentMember) return <div>{MESSAGES.NO_TASKS_FOUND}</div>;

  const handleProgressChange = (taskId: string, increment: boolean) => {
    const task = currentMember.tasks.find(t => t.id === taskId);
    if (!task) return;

    const newProgress = increment 
      ? Math.min(TASK_PROGRESS_MAX, task.progress + TASK_PROGRESS_STEP)
      : Math.max(TASK_PROGRESS_MIN, task.progress - TASK_PROGRESS_STEP);

    dispatch(updateTaskProgress({
      memberId: currentMember.id,
      taskId,
      progress: newProgress
    }));
  };

  return (
    <div className="task-list">
      <h3>Your Tasks ({currentMember.tasks.length})</h3>
      {currentMember.tasks.length === 0 ? (
        <p className="no-tasks">{MESSAGES.NO_TASKS}</p>
      ) : (
        currentMember.tasks.map(task => (
          <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-header">
              <h4>{task.title}</h4>
              <span className="due-date">Due: {task.dueDate}</span>
            </div>
            <div className="progress-section">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${task.progress}%` }}
                />
              </div>
              <span className="progress-text">{task.progress}%</span>
            </div>
            <div className="task-controls">
              <button 
                onClick={() => handleProgressChange(task.id, false)}
                disabled={task.progress === TASK_PROGRESS_MIN}
              >
                -10%
              </button>
              <button 
                onClick={() => handleProgressChange(task.id, true)}
                disabled={task.progress === TASK_PROGRESS_MAX}
              >
                +10%
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;