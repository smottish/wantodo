import React, { Component, useContext, useState } from 'react';
import { Heading, Flex, Box, Button } from 'rebass';
import { Input } from '@rebass/forms';
import { withTheme } from 'emotion-theming';
import SpinningText from './SpinningText';
import { ToastContext, SHOW_TOAST } from './ToastProvider.js'
import { create } from './api.js'

function createWant(dispatch, want) {
  dispatch({ type: 'CREATE_WANT_REQUEST' })
  return create(want)
    .then((want) => {
      dispatch({ type: 'CREATE_WANT_RECEIVED', want })
      dispatch({ type: SHOW_TOAST, message: "Want added!" })
    })
    .catch((error) => {
      dispatch({ type: 'CREATE_WANT_ERROR', error })
    })
}

const AddWant = () => {
  const [ toastState, toastDispatch ] = useContext(ToastContext);
  const [ wantsState, wantDispatch ] = useContext(WantContext);
  const [ value, setValue ] = useState('');
  
  return <Flex justifyContent='center'>
    <Box width={[1, 1, 2/3]}>
      <Flex>
        <Box flexGrow={4} m='3px'><Input value={value} placeholder='Enter something you want to do!' onChange={setValue}/></Box>
        <Box flexGrow={1} m='3px'><Button width="100%" onClick={onCreate}>Add</Button></Box>
      </Flex>
    </Box>
  </Flex>
}

class HomeContainer extends Component {
  constructor() {
    super()
    this.state = {
      want: null,
      newWant: '',
    }

    this.onChangeWant = this.onChangeWant.bind(this)
    this.onGetWant = this.onGetWant.bind(this)
    this.onCreateWant = this.onCreateWant.bind(this)
  }
  
  onChangeWant(ev) {
    this.setState({ newWant: ev.target.value })
  }
  
  onGetWant() {
    let url = '/api/random'
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
    
    // eslint-disable-next-line
    const [ state, dispatch ] = this.context
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
      .then(() => dispatch({ type: SHOW_TOAST, message: "Want added!" }))
  }

  render() {
    return (
      <>
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

// If I need to consume more than one context, then I'll need to use
// ToastContext.Provider above. See the following docs for more details:
// https://reactjs.org/docs/context.html#consuming-multiple-contexts
// Or I can convert HomeContainer to a function component and use
// useContext.
HomeContainer.contextType = ToastContext;

export default withTheme(HomeContainer);