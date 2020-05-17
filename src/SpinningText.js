import React, { Component } from 'react'
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components'

// TODO: move this from a global to a prop or props
const ANIMATE_ONE_LETTER_DURATION = 0.25

const rotateY = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`

const Letter = styled.span`
  animation: ${rotateY} 1s linear ${props => props.delay * ANIMATE_ONE_LETTER_DURATION}s;
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
  
  // Call this function everytime we want the animation to run
  // (e.g. when the component mounts or when its props change)
  runAnimationLoop() {
    const totalSeconds = ((this.props.text.length - 1) * ANIMATE_ONE_LETTER_DURATION) + 1
    
    if (this.timer) {
      clearInterval(this.timer)
    }
    
    if (!this.props.text) {
      return;
    }

    // Changing the timestamp will cause components to unmount/mount,
    // Which will cause the CSS animation to run.
    this.setState({ timestamp: Date.now() })

    if (this.props.loop) {
      // Loop the animation by changing the timestamp every `totalSeconds`
      this.timer = setInterval(() => {
          this.setState({ timestamp: Date.now() })
      }, totalSeconds * 1000)
    }
  }
  
  componentDidMount() {
    this.runAnimationLoop()
  }
  
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text || prevProps.loop !== this.props.loop) {
      this.runAnimationLoop()
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