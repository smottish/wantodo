import React from 'react'
import styled, { keyframes } from 'styled-components'

const ToastContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  visibility: hidden;
  position: fixed;
  z-index: 1
`

const ToastMessage = styled.div`
  min-width: 250px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  font-size: 17px;
  ${props => props.show ? }
`