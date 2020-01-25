import React, { Component } from 'react'
import PropTypes from 'prop-types';

class MediaQuery extends Component {
  constructor() {
    this.state = {
      matches: false,
    }
    this.mql = null
    this.onMediaQuery = this.onMediaQuery.bind(this)
  }
  
  componentDidMount() {
    const mql = window.matchMedia(this.props.query)
    const matches = mql.matches
    
    mql.addListener(this.onMediaQuery)
    this.setState({ matches })
    if (this.props.onChange) {
      this.props.onChange(matches)
    }
    
    this.mql = mql
  }
  
  componentWillUnmount() {
    this.mql.removeListener(this.onMediaQuery)
  }
  
  onMediaQuery(mq) {
    const matches = mq.matches
    this.setState({ matches })
    if ((matches !== this.state.matches) && this.props.onChange) {
      this.props.onChange(matches)
    }
  }
  
  render() {
    return this.props.children(this.state.matches)
  }
}

MediaQuery.propTypes = {
  query: PropTypes.string,
  onChange: PropTypes.func,
}

export default MediaQuery