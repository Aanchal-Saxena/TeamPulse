import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Member, Task, MembersState } from '../../types';
import { MemberStatus, DUMMY_MEMBER, DUMMY_MEMBER_2 } from '../../constants';
import { fetchRandomUsers } from '../../services/api';

// Async thunk to load members from API
export const loadMembers = createAsyncThunk('members/loadMembers', async () => {
  const users = await fetchRandomUsers();
  const apiMembers = users.map((user: any, index: number) => ({
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    avatar: user.picture.medium,
    status: Object.values(MemberStatus)[index % 4], // Cycle through statuses
    tasks: []
  }));
  
  return [DUMMY_MEMBER, DUMMY_MEMBER_2, ...apiMembers];
});

import { localStorage } from '../../utils/localStorage';

// Initialize members with dummy users or from localStorage
const getInitialMembers = () => {
  const savedMembers = localStorage.getMembers();
  if (savedMembers?.length > 2) {
    const hasBothDummies = savedMembers.some(m => m.id === 'aanchal-001') && 
                          savedMembers.some(m => m.id === 'john-002');
    if (hasBothDummies) return savedMembers;
  }
  return [DUMMY_MEMBER, DUMMY_MEMBER_2];
};

const initialState: MembersState = {
  members: getInitialMembers(),
  loading: false
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    updateMemberStatus: (state, action: PayloadAction<{id: string, status: MemberStatus}>) => {
      const member = state.members.find(m => m.id === action.payload.id);
      if (member) {
        member.status = action.payload.status;
        localStorage.saveMembers(state.members);
      }
    },
    assignTask: (state, action: PayloadAction<Task>) => {
      const member = state.members.find(m => m.id === action.payload.assignedTo);
      if (member) {
        member.tasks.push(action.payload);
        localStorage.saveMembers(state.members);
      }
    },
    updateTaskProgress: (state, action: PayloadAction<{memberId: string, taskId: string, progress: number}>) => {
      const member = state.members.find(m => m.id === action.payload.memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === action.payload.taskId);
        if (task) {
          task.progress = action.payload.progress;
          task.completed = action.payload.progress >= 100;
          localStorage.saveMembers(state.members);
        }
      }
    },
    resetMembers: (state) => {
      localStorage.removeItem('members');
      state.members = [DUMMY_MEMBER, DUMMY_MEMBER_2];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
        localStorage.saveMembers(action.payload);
      });
  }
});

export const { updateMemberStatus, assignTask, updateTaskProgress, resetMembers } = membersSlice.actions;
export default membersSlice.reducer;