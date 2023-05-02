import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    LikeBlog (state, action) {
      const changedBlog = action.payload
      return state.map(blog => blog.id !== changedBlog.id? blog: changedBlog)
        .sort((a,b) => a.likes<b.likes?1:-1)
    },
    appendBlog (state,action) {
      state.push(action.payload)
    },
    deleteBlog (state,action) {
      state.pop(action.payload)
    },
    SetBlogs (state, action) {
      const blogs = action.payload
      return blogs.sort((a,b) => a.likes<b.likes?1:-1)
    },
    getBlog (state, action) {
      const user = action.payload
      console.log('user_getBlog',user)
      return state.map(blog => blog.user.id === user.id)
    }
  },
})

export const { LikeBlog, appendBlog, deleteBlog, SetBlogs } = blogSlice.actions
export default blogSlice.reducer

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(SetBlogs(blogs))
  }
}

export const createBlogs = content => {
  return async dispatch => {
    const blog = await blogService.create(content)
    dispatch(appendBlog(blog))
  }
}

export const BlogLike = id => {
  return async dispatch => {
    const blog = await blogService.LikeBlogUpdate(id)
    dispatch(LikeBlog(blog))
  }
}
export const DeleteBlog = id => {
  return async dispatch => {
    const blog = await blogService.deleteBlogById(id)
    dispatch(deleteBlog(blog))
  }
}
export const UpdateBlogs = content => {
  return async dispatch => {
    const blog = await blogService.update(content.id,content)
    dispatch(LikeBlog(blog))
  }
}
export const createblogComment =async (id,comment) => {
  return async dispatch => {
    const savedComment = await blogService.createBlogComment(id,comment)
    const blog= await blogService.getBlogById(id)
    dispatch(LikeBlog({ ...blog,
      comments: blog.comments?blog.comments.concat(savedComment.id):savedComment.id } ))
  }

}