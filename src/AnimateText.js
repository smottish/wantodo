import React, { Component } from 'react'
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
  animation: ${rotateY} 1s linear ${props => props.delay * 0.25}s;
  display: inline-block;
`

class AnimateText extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
    }
  }
  
  componentDidMount() {
    if (this.props.text) {
      
    }
  }

  render() {
    const charArray = this.props.text.split('')
    return <>{charArray.map((letter, index) => <Letter delay={index}>{letter}</Letter>)}</>
  }

}

export default AnimateText