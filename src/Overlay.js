import React from 'react'

// todo: add style prop or ...props to override default style
const Overlay = ({show, onClick}) => (
  <div
    style={{
      display: show ? 'block' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    }}
    onClick={onClick}
  >
  </div>
)

export default Overlay