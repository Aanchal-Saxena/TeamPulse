import { Member } from '../types';
import { MemberStatus, APP_CONFIG } from '../constants';

// Count members by status for dashboard summary
export const getStatusCounts = (members: Member[]) => {
  return members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {} as Record<MemberStatus, number>);
};

// Get incomplete tasks for a member
export const getActiveTasks = (member: Member) => {
  return member.tasks.filter(task => !task.completed);
};

// Get completed tasks for a member
export const getCompletedTasks = (member: Member) => {
  return member.tasks.filter(task => task.completed);
};

// Calculate task statistics for a member or team
export const getTaskStats = (members: Member | Member[]) => {
  const memberArray = Array.isArray(members) ? members : [members];
  
  const totalTasks = memberArray.reduce((sum, member) => sum + member.tasks.length, 0);
  const activeTasks = memberArray.reduce((sum, member) => sum + getActiveTasks(member).length, 0);
  const completedTasks = totalTasks - activeTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * APP_CONFIG.PERCENTAGE_MULTIPLIER) : 0;
  
  return { totalTasks, activeTasks, completedTasks, completionRate };
};

// Generate unique ID using timestamp and random string
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get current member from Redux state (reusable logic)
export const getCurrentMember = (members: Member[], currentUser: string) => {
  return members.find(m => m.name === currentUser);
};

export * from './searchUtils';