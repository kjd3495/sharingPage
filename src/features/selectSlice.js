import { createSlice } from '@reduxjs/toolkit';

export const selectSlice = createSlice({
  name: 'select',
  initialState: {
    selecteduser: {
                    user_email: '',
                }
},
reducers: {
    selecting: (state, action)=> {
    state.selecteduser = action.payload;
    }

},
});

export const { selecting } = selectSlice.actions;



export const selectedUser = state => state.select.selecteduser;
export default selectSlice.reducer;