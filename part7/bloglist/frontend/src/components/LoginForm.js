import { useState } from "react"
import styled from "styled-components"

const Page = styled.div`
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const LoginCard = styled.div`
  background-color: #fff;
  padding: 32px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 8px 0 rgba(0, 0, 0, 0.1);
  /* box-shadow: 0 8px 0 rgba(0, 0, 0, 0.1), 0 12px 8px rgba(0, 0, 0, 0.1); */

  h1 {
    font-size: 24px;
    font-weight: 400;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;

  div {
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: 12px;
  }

  input {
    padding: 8px;
    border-radius: 8px;
    border: none;
    background-color: #eee;
  }

  button {
    padding: 8px;
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

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin(username, password)
  }

  return (
    <Page>
      <LoginCard>
        <h1>Log in to application</h1>

        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              id="username"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              id="password"
            />
          </div>
          <button id="login-button" type="submit">
            Login
          </button>
        </Form>
      </LoginCard>
    </Page>
  )
}

export default LoginForm
