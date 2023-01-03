import { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Form = styled.form`
  width: max-content;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  label {
    font-size: 12px;
    color: #555;
  }

  input {
    padding: 8px;
    border-radius: 8px;
    border: none;
    background-color: #eee;
  }

  input[type="submit"] {
    /* padding: 4px; */
    border-radius: 8px;
    border: none;
    background-color: royalblue;
    color: #fff;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
    box-shadow: 0 8px 0 rgba(52, 82, 173, 1);
    cursor: pointer;

    :hover {
      transform: translateY(4px);
      box-shadow: 0 4px 0 rgba(52, 82, 173, 1);
    }
    :active {
      transform: translateY(8px);
      box-shadow: 0 0px 0 rgba(52, 82, 173, 1);
    }
    transition: all 50ms ease-out;
  }
`

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleCreate = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url,
    })

    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <Form onSubmit={handleCreate}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          placeholder="Author"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input
          type="text"
          id="url"
          placeholder="Url"
          name="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <input type="submit" id="create-button" value="Create" />
    </Form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
