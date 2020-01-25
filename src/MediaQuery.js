import { Component } from 'react'
import PropTypes from 'prop-types';

// todo: support more than one query
class MediaQuery extends Component {
  constructor() {
    super()
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

    if ((matches !== this.state.matches) && this.props.onChange) {
      this.props.onChange(matches)
    }
    
    this.setState({ matches })
  }
  
  render() {
    return this.props.children(this.state.matches)
  }
}

MediaQuery.propTypes = {
  query: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

MediaQuery.defaultProps = {
  onChange: null,
}

export default MediaQuery