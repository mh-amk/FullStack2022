import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getAllbyUserId = async (userid) => {
  console.log('getAllbyUserId_userid',userid)
  const blogs =  await axios.get(baseUrl)
    .then(response => response.data)
  return blogs.filter( blog => blog.user.id===userid)
}
const getBlogById = async (blogid) => {
  const blogs =  await axios.get(baseUrl)
    .then(response => response.data)
  return blogs.filter( blog => blog.id===blogid)
}
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  return await axios.post(baseUrl, newObject, config).data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then((response) => response.data)
}
const LikeBlogUpdate = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const blog =  (await axios.get(`${baseUrl}/${id}`)).data
  const  blogLiked= { ...blog, likes: blog.likes+1 }
  const response = await axios.put(`${baseUrl}/${id}`, blogLiked,config)
    .then(response => response.data)
  return response
}
const deleteBlogById = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
const createBlogComment = async (id,comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`,comment)
  return response.data
}

export default { getAll, create, update, LikeBlogUpdate,
  deleteBlogById, setToken,getAllbyUserId, createBlogComment,getBlogById }
