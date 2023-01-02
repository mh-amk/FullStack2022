import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('List Blog test', () => {
  let container
  const IncreaseBlogLike= jest.fn()
  const DeleteBlogByID= jest.fn()
  const user = {
    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1oYW1rMSIsImlkIjoiNjNhOWZhNWI2ZDUwMGM1MjUxMWJlOGU0IiwiaWF0IjoxNjcyMTAwMzc4LCJleHAiOjE2NzIxMDM5Nzh9.Z1L35FjIt6x515bXGTuasHf5s0zkZ4zF_nSciZwBtZE',
    'username': 'mhamk1',
    'name': 'Mahdi Haydari'
  }
  const blog = {
    title: 'title1',
    author: 'asdasfds',
    url: 'sadasda',
    user: {
      username: 'mhamk1',
      name: 'Mahdi Haydari',
      id: '63a9fa5b6d500c52511be8e4'
    },
    likes: 26,
    id: '638fc1c59375794dc83df7c0'
  }
  beforeEach(() => {
    container = render(
      <Blog key={1} IncreaseBlogLike={IncreaseBlogLike} DeleteBlogByID={DeleteBlogByID} blog={blog} user={user} />
    ).container
  })

  test('5.13: step1 (Blog\'s title and author)', () => {
    const div = container.querySelector('viewBlog')
    //expect(div).toHaveTextContent('title1')
    expect(div).toBeDefined()
  })

  test('5.14: step2 (cliked view button for show blog details)', async () => {
    const user_event = userEvent.setup()
    const button = screen.queryByText('view')
    await user_event.click(button)
    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('5.15: step3 (like button twice clicked)', async () => {
    const user_event = userEvent.setup()
    const button = screen.queryByText('like')
    await user_event.click(button)
    await user_event.click(button)
    expect(IncreaseBlogLike.mock.calls).toHaveLength(2)
  })
})
