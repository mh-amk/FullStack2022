import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'

describe('<Togglable />', () => {
  let container
  const addBlog = jest.fn()
  const UpdateBlog = jest.fn()
  const blogs = [
    {
      title: 'title1',
      author: 'asdasfds',
      url: 'sadasda',
      user: {
        username: 'mhamk1',
        name: 'Mahdi Haydari',
        id: '63a9fa5b6d500c52511be8e4',
      },
      likes: 26,
      id: '638fc1c59375794dc83df7c0',
    },
    {
      title: 'title2',
      author: 'Salam',
      url: '11111',
      likes: 16,
      user: {
        username: 'root',
        name: 'Superuser',
        id: '639c88c303e9c97c319d155c',
      },
      id: '638fc1dcb00a0f03a6db4f67',
    },
    {
      title: 'book2',
      author: 'authpr',
      url: 'asda',
      likes: 4,
      user: {
        username: 'root',
        name: 'Superuser',
        id: '639c88c303e9c97c319d155c',
      },
      id: '63a2dff4588bbd2ec466847c',
    },
    {
      title: 'book3',
      author: 'mhamk',
      url: 'http://www.mhamk.ir',
      likes: 17,
      user: {
        username: 'root',
        name: 'Superuser',
        id: '639c88c303e9c97c319d155c',
      },
      id: '63a2e50c588bbd2ec46684b5',
    },
    {
      title: 'book4',
      author: 'Book Author',
      url: 'http://book.com',
      likes: 4,
      user: {
        username: 'root',
        name: 'Superuser',
        id: '639c88c303e9c97c319d155c',
      },
      id: '63a2e75f588bbd2ec46684cd',
    },
    {
      title: 'vali',
      author: 'Ali',
      url: 'url',
      likes: 4,
      user: {
        username: 'root',
        name: 'Superuser',
        id: '639c88c303e9c97c319d155c',
      },
      id: '63a626ba657e42bf5cb5d6de',
    },
    {
      title: 'Aliiiiii',
      author: 'valiiiiiiiiii',
      url: 'url344',
      likes: 4,
      user: {
        username: 'root',
        name: 'Superuser',
        id: '639c88c303e9c97c319d155c',
      },
      id: '63a6270c657e42bf5cb5d6e7',
    },
    {
      title: 'asdad',
      author: 'asda',
      url: 'sdaa',
      likes: 4,
      user: {
        username: 'root',
        name: 'Superuser',
        id: '639c88c303e9c97c319d155c',
      },
      id: '63a62794657e42bf5cb5d6f2',
    },
    {
      title: 'sali',
      author: 'salivan',
      url: 'asdas.com',
      likes: 5,
      user: {
        username: 'root',
        name: 'Superuser',
        id: '639c88c303e9c97c319d155c',
      },
      id: '63a6282e657e42bf5cb5d705',
    },
    {
      title: 'sali',
      author: 'Salivan',
      url: 'www.com',
      likes: 4,
      user: {
        username: 'root',
        name: 'Superuser',
        id: '639c88c303e9c97c319d155c',
      },
      id: '63a6281d657e42bf5cb5d700',
    },
    {
      title: 'React Book',
      author: 'Petros',
      url: 'www.petrosbook.com',
      likes: 6,
      user: {
        username: 'root',
        name: 'Superuser',
        id: '639c88c303e9c97c319d155c',
      },
      id: '63a715fbbc7af20e32c78abd',
    },
    {
      title: 'React for live',
      author: 'mhamk',
      url: 'http://mhamk.com',
      likes: 4,
      user: {
        username: 'mhamk1',
        name: 'Mahdi Haydari',
        id: '63a9fa5b6d500c52511be8e4',
      },
      id: '63aa26452b2b80fef13de47e',
    },
  ]

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel='New Blog'>
        <NewBlogForm
          CreateBlog={addBlog}
          UpdateBlog={UpdateBlog}
          blogs={blogs}
        />
      </Togglable>,
    ).container
  })

  test('renders its children', async () => {
    //await screen.queryByText('title')
    await screen.findAllByText('title:')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user_event = userEvent.setup()
    const button = screen.queryByText('New Blog')
    await user_event.click(button)
    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user_event = userEvent.setup()
    const button = screen.getByText('New Blog')
    await user_event.click(button)

    const closeButton = screen.getByText('cancel')
    await user_event.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})
