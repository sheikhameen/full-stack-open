import { useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Main = styled.div`
  background: #ddd;
  padding: 16px;
  border-radius: 12px;
`

const TogglableButton = styled.button`
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  background-color: limegreen;
  color: #fff;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  box-shadow: 0 8px 0 rgb(30, 123, 30);
  cursor: pointer;

  :hover {
    transform: translateY(4px);
    box-shadow: 0 4px 0 rgb(30, 123, 30);
  }
  :active {
    transform: translateY(8px);
    box-shadow: 0 0px 0 rgb(30, 123, 30);
  }
  transition: all 50ms ease-out;
`

const CancelButton = styled.button`
  padding: 4px 16px;
  border-radius: 8px;
  border: none;
  background-color: #f33;
  color: #fff;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  /* font-size: 20px; */
  box-shadow: 0 8px 0 #a00;
  margin-bottom: 12px;
  cursor: pointer;

  :hover {
    transform: translateY(4px);
    box-shadow: 0 4px 0 #a00;
  }
  :active {
    transform: translateY(8px);
    box-shadow: 0 0px 0 #a00;
  }
  transition: all 50ms ease-out;
`

const Header = styled.h2`
  font-size: 24px;
  font-weight: 400;
`

const Togglable = forwardRef((props, ref) => {
  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  const hideWhenVisible = { display: visibility ? "none" : "" }
  const showWhenVisible = { display: visibility ? "" : "none" }

  return (
    <Main>
      <div style={hideWhenVisible}>
        <TogglableButton onClick={toggleVisibility}>
          {props.buttonLabel}
        </TogglableButton>
      </div>
      <div style={showWhenVisible}>
        <CancelButton onClick={toggleVisibility}>Cancel</CancelButton>
        <Header>{props.header}</Header>
        {props.children}
      </div>
    </Main>
  )
})

Togglable.displayName = "Togglable"

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
