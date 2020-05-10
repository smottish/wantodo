import styled, { keyframes } from 'styled-components'

const rotateY = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`

const Letter = styled.span`
  animation: ${rotateY} 1s linear {props => props.delay}s
`
export default () => {
  return <><Letter>A</Letter><Letter>B</Letter><Letter>C</Letter></undefined>
}

