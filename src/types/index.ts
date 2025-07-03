import { MemberStatus, UserRole } from '../constants/enums';

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  progress: number;
  completed: boolean;
  assignedTo: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: MemberStatus;
  tasks: Task[];
}

export interface RoleState {
  currentRole: UserRole;
  currentUser: string;
}

export interface MembersState {
  members: Member[];
  loading: boolean;
  hasApiUsers: boolean;
}