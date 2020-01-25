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

/* todo (maybe): add withMediaQuery HOC so that we can replace the following code

<MediaQuery query={query} onChange={onChange}>
    {matches => { ... }}
</MediaQuery>

with something like this:

const MyWrappedComponent = withMediaQuery(query, onChange, MyComponent)

E.g. something like this:

function withMediaQuery(..., WrappedComponent) {
  return class extends Component { // or return class extends MediaComponent
    ...same as MediaQuery above (if not inheriting)?...
    
    render() {
      return <WrappedComponent
        matches={this.state.matches}
        onChange={this.props.onChange}
        {...this.props}
      />
    }
  }
}

Then instead of wrapping component with <MediaQuery> we'd just do this:

const WrappedComponent = withMediaQuery(..., MyComponent)

And then MyComponent will have a matches and onChange prop it can use to render accordingly
*/
export default MediaQuery