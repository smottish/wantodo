import React, { Component } from 'react'
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components'

// TODO: move this from a global to a prop or props
const ANIMATE_LETTER_DURATION = 0.4
const ANIMATE_LETTER_DELAY = 0.1

const rotateY = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`

const Letter = styled.span`
  display: inline-block;
  white-space: pre;
  font-size: 5vw;
  text-transform: uppercase;
  font-family: inherit;
`

const SpinningLetter = styled(Letter)`
  animation: ${rotateY} ${ANIMATE_LETTER_DURATION}s linear ${props => props.offset * ANIMATE_LETTER_DELAY}s;
`

const getTotalAnimationDuration = (text) => {
  const numNonWhiteSpace = text.match(/\S/g).length
  // The last letter will begin its animation after a delay
  // based on its zero-based index (excluding white-space)
  // and will finish after the animation duration has passed.
  return (( numNonWhiteSpace - 1 ) * ANIMATE_LETTER_DELAY) + ANIMATE_LETTER_DURATION
}

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
    const totalSeconds = getTotalAnimationDuration(this.props.text)
    
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
    let offset = 0
    return <>{charArray.map((letter, index) => {
        const key = index + this.state.timestamp
        // Don't animate white-space characters
        return /\s/.test(letter) ? (
          <Letter key={key}>{letter}</Letter>
        ) : (
          <SpinningLetter key={key} offset={offset++}>{letter}</SpinningLetter>
        )
      })
    }</>
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