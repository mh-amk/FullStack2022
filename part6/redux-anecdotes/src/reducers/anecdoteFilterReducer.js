import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

/*const anecdoteFilterReducer = (state='' , action) => {
    switch (action.type){
        case 'Set_Filter':
            return action.payload
        default: return state
    }
}
export const FilterAnecdotes = (filter) => {
    return {
        type: 'Set_Filter',
        payload: filter
    }
}*/
const anecdoteFilterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers:{
        FilterAnecdotes (state, action) {
            return action.payload
        }
    }
})
//export default anecdoteFilterReducer
export const { FilterAnecdotes } = anecdoteFilterSlice.actions
export default anecdoteFilterSlice.reducer
