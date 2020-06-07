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
  position: fixed;
  animation: ${fadein} 0.5s, ${fadeout} 0.5s 2.5s;
  z-index: 1;
  top: 30px;
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
  show ? (
    <ToastContainer>
      <ToastMessage>
        {message}
      </ToastMessage>
    </ToastContainer>
  ) : null
)

export default Toast