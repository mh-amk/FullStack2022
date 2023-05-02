import { useState } from 'react'

export const useField = (type,InitailValue) => {
  const [value, setValue] = useState(InitailValue)

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}
export const useUserBlogs = (InitailValue) => {
  //const [value , setValue]= useState(InitailValue)
  const users = InitailValue
    .map(blog => blog.id) // get all media types
    .filter((users, index, array) => array.indexOf(users) === index) // filter out duplicates

  return users
    .map(user => ({
      type: user,
      count: InitailValue.filter(item => item.id === users).length
    }))

}
