import { createSlice } from '@reduxjs/toolkit';


export const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    useTag:'false',
    selectTag :'',
},
reducers: {
    usingTag: (state, action)=>{
        state.useTag = action.payload
    },
    tag: (state, action)=> {
        state.selectTag = action.payload
    },

},
});

export const { usingTag, tag } = tagSlice.actions;



export const usedTag= state => state.tag.useTag;
export const selectedTag= state => state.tag.selectTag;
export default tagSlice.reducer;