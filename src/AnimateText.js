import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotateY = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`

const Letter = styled.span`
  animation: ${rotateY} 1s linear {props => props.delay}s;
  display: inline-block;
`

// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotateY} 2s linear ${props = props.delay}s infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

// const AnimateText = (props) => {
//   return <><Letter delay={0}>A</Letter><Letter delay={1}>B</Letter><Letter delay={2}>C</Letter></>
// }

const AnimateText = (props) => {
  return <Rotate delay={7}>A</Rotate>
}

export default AnimateText