import React, { Component } from 'react';
import { Heading, Flex, Box, Button } from 'rebass';
import { Input } from '@rebass/forms';
import { withTheme } from 'emotion-theming';
import SpinningText from './SpinningText';
import Toast from './Toast.js';

class HomeContainer extends Component {
  constructor() {
    super()
    this.state = {
      want: null,
      newWant: '',
      showToast: true,
    }

    this.onChangeWant = this.onChangeWant.bind(this)
    this.onGetWant = this.onGetWant.bind(this)
    this.onCreateWant = this.onCreateWant.bind(this)
  }
  
  onChangeWant(ev) {
    this.setState({ newWant: ev.target.value })
  }
  
  onGetWant() {
    let url = '/api/want'
    if (this.state.want) {
      url = url + `?exclude=${this.state.want.id}`
    }
    fetch(url)
      .then((response) => response.json())
      .then((want) => this.setState({ want }))
  }
  
  onCreateWant() {
    // See https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    // TODO: Consider using https://github.com/axios/axios instead of fetch
    const requestBody = JSON.stringify({ description: this.state.newWant })
    fetch('/api/want', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody,
    })
      .then((response) => response.json())
      .then((want) => console.log(want))
      .then(() => this.setState({ newWant: '' }))
  }

  render() {
    return (
      <>
        <Toast show={this.state.showToast} message={"Testing 123..."}/>
        <button style={{zIndex: 2}} onClick={() => this.setState({ showToast: true })}>Show</button>
        <button style={{zIndex: 2}} onClick={() => this.setState({ showToast: false })}>Hide</button>
        <Flex justifyContent='center'><Heading>I want to...</Heading></Flex>
        <Flex justifyContent='center'>
          <Box width={[1, 1, 2/3]}>
            <Flex>
              <Box flexGrow={4} m='3px'><Input value={this.state.newWant} placeholder='Enter something you want to do!' onChange={this.onChangeWant}/></Box>
              <Box flexGrow={1} m='3px'><Button width="100%" onClick={this.onCreateWant}>Add</Button></Box>
            </Flex>
          </Box>
        </Flex>
        <Flex marginTop="5px" justifyContent='center'>
          <Box width={[1, 1, 2/3]} m='3px'>
            <Button variant="secondary" width="100%" onClick={this.onGetWant}>Tell me what to do!</Button>
          </Box>
        </Flex>
        {this.state.want && <Flex marginTop="5px" justifyContent='center'>
          <SpinningText text={this.state.want.description} loop={false}/>
        </Flex>}
      </>
    )
  }
}

export default withTheme(HomeContainer);