import { createSlice } from '@reduxjs/toolkit';

export const useCreateSlice = createSlice({
  name: 'create',
  initialState: {
    create:false
  },
  reducers: {
    useCreate:(state, action) => {
      state.create = action.payload;
    }
  },
});

export const { useCreate} = useCreateSlice.actions;



export const selectCreate = state => state.useCreate.create
export default useCreateSlice.reducer;