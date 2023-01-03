import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { likeBlog, commentBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"
import { useState } from "react"
import styled from "styled-components"

const BlogSection = styled.div`
  background: #090909;
  background: -webkit-linear-gradient(to left, #444, #090909);
  background: linear-gradient(to left, #444, #090909);

  padding: 144px 32px;
`

const BlogTitle = styled.h1`
  font-size: 72px;
  color: #eee;
  margin-bottom: -18px;
`

const BlogAuthor = styled.h2`
  font-size: 24px;
  color: #999;
  font-weight: 400;
`

const BlogUrl = styled.a`
  color: #111;
`

const BlogLikes = styled.div`
  color: #fff;
  font-weight: 500;
  display: flex;
  align-items: end;
  gap: 18px;
`

const LikeButton = styled.button`
  padding: 4px 12px;
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
`

const BlogUser = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: 300;
  margin-top: 12px;
`

const CommentSection = styled.div`
  padding: 18px 32px;
  h3 {
    margin-bottom: 12px;
  }
`
const CommentForm = styled.form`
  width: max-content;

  background: #ddd;
  padding: 24px 16px;
  border-radius: 12px;

  h4 {
    font-weight: 400;
    margin-bottom: 12px;
  }

  div {
    display: flex;
    gap: 12px;
  }

  input {
    padding: 8px;
    border-radius: 8px;
    border: none;
    background-color: #eee;
  }

  button {
    padding: 4px;
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

const CommentList = styled.ul`
  list-style-type: none;

  li {
    padding: 14px 0;
    border-bottom: 1px solid #ddd;
  }
`

const BlogView = () => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState("")

  const id = useParams().id
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))

  if (!blog) return null

  const handleLike = () => {
    dispatch(likeBlog(blog.id))
  }

  const handleComment = async (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment))
    setComment("")
  }

  return (
    <div>
      <BlogSection>
        <BlogTitle>{blog.title}</BlogTitle>
        <BlogAuthor>By {blog.author}</BlogAuthor>
        <BlogUrl href={blog.url}>{blog.url}</BlogUrl>
        <BlogLikes>
          {blog.likes} likes{" "}
          <LikeButton id="like-button" onClick={handleLike}>
            Like
          </LikeButton>
        </BlogLikes>
        <BlogUser>added by {blog.user.username}</BlogUser>
      </BlogSection>

      <CommentSection>
        <h3>Comments</h3>
        <CommentForm onSubmit={handleComment}>
          <h4>Add new comment</h4>
          <div>
            <input
              name="comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            <button>Add comment</button>
          </div>
        </CommentForm>
        <CommentList>
          {blog.comments.map((c) => (
            <li key={c.id}>{c.content}</li>
          ))}
        </CommentList>
      </CommentSection>
    </div>
  )
}

export default BlogView
