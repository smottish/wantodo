import React, { useRef } from 'react'
import ReactDOM from 'react-dom';
import styled from "styled-components"

const defaultTheme = {
  colors: {
    lightGray: 'gray'
  }
}

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
`

const ModalContent = styled.div`
  background-color: ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.darkGray};
  font-family: ${props => props.theme.fonts.default};
  position: relative;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2)
`

// Not sure &:focus is necessary or if it does anything
const ModalClose = styled.span`
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }

  &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`

const ModalHeader = styled.div`
  padding: 2px 16px;
`
const ModalBody = styled.div`
  padding: 2px 16px;
`
const ModalFooter = styled.div`
  padding: 2px 16px;
  color: white;
`

const Modal = (props) => {
  const node = useRef(null)
  const handleClick = (e) => {
    if (node.current === e.target) {
      props.onClick && props.onClick(e)
    }
  }

  return props.isOpen && ReactDOM.createPortal(
    <ModalBackdrop onClick={handleClick} ref={node}>
      {props.children}
    </ModalBackdrop>,
    props.container
  )
}

export {
  Modal,
  ModalContent,
  ModalClose,
  ModalHeader,
  ModalBody,
  ModalFooter,
}
