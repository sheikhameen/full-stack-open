import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

describe("<BlogForm />", () => {
  test("calls onSubmit with the right details", () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const title = screen.getByPlaceholderText("title")
    const author = screen.getByPlaceholderText("author")
    const url = screen.getByPlaceholderText("url")

    const submitButton = screen.getByDisplayValue("create")

    userEvent.type(title, "some title here")
    userEvent.type(author, "some author here")
    userEvent.type(url, "some url here")
    userEvent.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe("some title here")
    expect(createBlog.mock.calls[0][0].author).toBe("some author here")
    expect(createBlog.mock.calls[0][0].url).toBe("some url here")
  })
})
