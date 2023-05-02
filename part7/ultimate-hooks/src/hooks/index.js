import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
      setValue(event.target.value)
    }

    return {
      type,
      value,
      onChange
    }
  }

  export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        axios.get(baseUrl)
        .then(response => setResources(response.data))
    },[baseUrl])


    const getId = () => (100000 * Math.random()).toFixed(0)

    const create = async (resource) => {
        const object = resource
        object.id = getId
        await axios.post(baseUrl,object)
        .then((response) => setResources(resources.concat(response.data)))
        .catch((error) => console.log(error))
    }

    const service = {
      create
    }

    return [
      resources, service
    ]
  }