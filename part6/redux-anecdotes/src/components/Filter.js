import {FilterAnecdotes} from '../reducers/anecdoteFilterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()
    const filterSelected = (event) => {
      dispatch(FilterAnecdotes(event.target.value))
    }
    const style = {
        marginBottom: 10
      }

    return (
        <div style = {style}>
            filter <input name="filterValue" onChange={filterSelected}/>
        </div>
    )

}
export default Filter
