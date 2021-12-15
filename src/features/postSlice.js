import { createSlice } from '@reduxjs/toolkit';
export const postSlice = createSlice({
    name: 'post',
    initialState: {
      post_id:0,
      keyword:''
    },
    reducers: {
      readPost: (state, action) => {
  
        state.post_id = action.payload;
      },
      useKeyword: (state, action) =>{
          state.keyword = action.payload;
      }
  
    },
  });
  
  export const { readPost, useKeyword } = postSlice.actions;
  
  
  
  export const selectPost = state => state.post.post_id;
  export const selectKeyword = state => state.post.keyword; 
  export default postSlice.reducer;