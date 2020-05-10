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
      timestamp: null,
    }
    
    this.timer = null
  }
  
  startAnimationLoop() {
    const totalSeconds = ((this.props.text.length - 1) * 0.25) + 1
    
    if (this.timer) {
      clearInterval(this.timer)
    }

    const timer = setInterval(() => {
        console.log('tick')
        this.setState({ timestamp: Date.now() })
    }, totalSeconds * 1000)
    
    this.timer = timer
  }
  
  componentDidMount() {
    if (this.props.text) {
      this.startAnimationLoop()
    }
  }
  
  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer)
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.startAnimationLoop()
    }
  }

  render() {
    const charArray = this.props.text.split('')
    return <>{charArray.map((letter, index) => <Letter delay={index}>{letter}</Letter>)}</>
  }

}

export default AnimateText