import React from 'react'
import styled, { keyframes } from 'styled-components'

const fadein = keyframes`
  from { transform: scale(.8); opacity: 0; } 
  to { transform: scale(1); opacity: 1; }
`

const fadeout = keyframes`
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(.8); opacity: 0; }
`

const ToastContainer = styled.div`
  z-index: 1;
  margin: 8px;
  display: flex;
  position: fixed;
  right: 0px;
  bottom: 0px;
  left: 0px;
  align-items: center;
  justify-content: flex-end;
`

const ToastMessage = styled.div`
  min-width: 344px;
  max-width: 672px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  font-size: 17px;
  animation: ${fadein} 0.5s, ${fadeout} 0.5s 2.5s;
`

const Toast = ({ animationLength, children }) => (
  <ToastContainer>
    <ToastMessage animationLength={animationLength}>
      {children}
    </ToastMessage>
  </ToastContainer>
)

export default Toast