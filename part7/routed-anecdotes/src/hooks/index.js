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
