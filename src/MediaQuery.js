import React, { Component } from 'react'

class MediaQuery extends Component {
  constructor() {
    this.mql = null;
    this.onMediaQuery = this.onMediaQuery.bind(this)
  }
  
  componentDidMount() {
    this.mql = window.matchMedia(this.props.query)
  }
  
  onMediaQuery(match) {
    
  }
}

