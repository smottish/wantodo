import React from 'react'
import styled, { keyframes } from 'styled-components'

const fadein = keyframes`
  from {top: 0; opacity: 0;}
  to {top: 30px; opacity: 1;}
`

const fadeout = keyframes`
  from {top: 30px; opacity: 1;}
  to {top: 0; opacity: 0;}
`

const ToastContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  visibility: ${props => props.show ? "visible" : "hidden"};
  position: fixed;
  z-index: 1;
  ${props => props.show ? `
    animation: ${fadein} 0.5s, ${fadeout} 0.5s 2.5s;` : ""
  }
`

const ToastMessage = styled.div`
  min-width: 250px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  font-size: 17px;
`

const Toast = ({ show, message }) => (
  <ToastContainer show={show}>
    <ToastMessage>
      {message}
    </ToastMessage>
  </ToastContainer>
)

export default Toast