import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole } from '../../constants/enums';
import { RoleState } from '../../types';
import { localStorage } from '../../utils/localStorage';

const initialState: RoleState = {
  currentRole: (localStorage.getRole() as UserRole) || UserRole.LEAD,
  currentUser: 'Aanchal Saxena'
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    switchRole: (state, action: PayloadAction<UserRole>) => {
      state.currentRole = action.payload;
      localStorage.saveRole(action.payload);
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
    }
  }
});

export const { switchRole, setUser } = roleSlice.actions;
export default roleSlice.reducer;