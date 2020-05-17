import React, { Component } from 'react'
import PropTypes from 'prop-types';
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
  white-space: pre;
`

class SpinningText extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timestamp: 0,
    }
    
    this.timer = null
  }
  
  updateAnimationLoop() {
    const totalSeconds = ((this.props.text.length - 1) * 0.25) + 1
    
    console.log(`Updating animation loop with text: ${this.props.text}`)
    if (this.timer) {
      clearInterval(this.timer)
    }
    
    if (!this.props.text) {
      return;
    }

    const newTime = Date.now()
    console.log(`Update timestamp to ${newTime}`)
    this.setState({ timestamp: newTime })
    if (this.props.loop) {
      this.timer = setInterval(() => {
          console.log('tick')
          this.setState({ timestamp: Date.now() })
      }, totalSeconds * 1000)
    }
  }
  
  componentDidMount() {
    this.updateAnimationLoop()
  }
  
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text || prevProps.loop !== this.props.loop) {
      this.updateAnimationLoop()
    }
  }

  render() {
    const charArray = this.props.text.split('')
    return <>{charArray.map((letter, index) => <Letter key={index + this.state.timestamp} delay={index}>{letter}</Letter>)}</>
  }

}

SpinningText.propTypes = {
  text: PropTypes.string,
  loop: PropTypes.bool,
}

SpinningText.defaultProps = {
  text: '',
  loop: true,
}

export default SpinningText