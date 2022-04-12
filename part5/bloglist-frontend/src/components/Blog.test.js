import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const user = { username: 'Test user username', name: 'Test user name' }
    const blog = {
      title: 'Test title',
      author: 'Test author',
      url: 'Test url',
      likes: 123,
      user
    }

    container = render(<Blog blog={blog} currentUser={user} />).container
  })

  test('renders title and author by default and does not render url and likes by default', () => {
    const title = container.querySelector('.title')
    const author = container.querySelector('.author')
    expect(title).not.toHaveStyle('display: none')
    expect(author).not.toHaveStyle('display: none')

    const details = container.querySelector('.details')
    expect(details).toHaveStyle('display: none')
  })

  test('shows url and likes when view button clicked', () => {
    const button = screen.getByText('view')
    userEvent.click(button)

    const details = container.querySelector('.details')
    expect(details).not.toHaveStyle('display: none')

  })

})