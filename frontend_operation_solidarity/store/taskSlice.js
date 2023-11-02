// store/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'ReduxTasks',
  initialState: { list: [], selectedTask: null },
  reducers: {
    setTasks: (state, action) => {
      state.list = action.payload;
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
});

export const { setTasks, selectTask } = taskSlice.actions;
export default taskSlice.reducer;
