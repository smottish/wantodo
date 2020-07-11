import React, { Component, useState } from 'react';
import { Heading, Flex, Box, Button } from 'rebass';
import { Input } from '@rebass/forms';
import { withTheme } from 'emotion-theming';
import SpinningText from './SpinningText';
import { ToastContext, SHOW_TOAST } from './ToastProvider.js'
import { create } from './api.js'
import PropTypes from 'prop-types';

const AddWant = ({ onCreateSuccess, onCreateError }) => {
  const [ value, setValue ] = useState('');
  function onCreate() {
    const want = JSON.stringify({ description: value })
    return create(want)
      .then((want) => {
        onCreateSuccess(want)
        setValue('')
        return want
      })
      .catch(onCreateError)
  }
  
  function onChange(ev) {
    setValue(ev.target.value)
  }
  
  return <Flex justifyContent='center'>
    <Box width={[1, 1, 2/3]}>
      <Flex>
        <Box flexGrow={4} m='3px'><Input value={value} placeholder='Enter something you want to do!' onChange={onChange}/></Box>
        <Box flexGrow={1} m='3px'><Button width="100%" onClick={onCreate}>Add</Button></Box>
      </Flex>
    </Box>
  </Flex>
}

AddWant.propTypes = {
  onCreateSuccess: PropTypes.func,
  onCreateError: PropTypes.func,
}

AddWant.defaultProps = {
  onCreateSuccess: () => {},
  onCreateError: () => {},
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
    this.onCreateWantSuccess = this.onCreateWantSuccess.bind(this)
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
  
  onCreateWantSuccess(want) {
    // See https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    // TODO: Consider using https://github.com/axios/axios instead of fetch
    
    // eslint-disable-next-line
    const [ state, dispatch ] = this.context
    dispatch({ type: SHOW_TOAST, message: "Want added!" })
  }

  render() {
    return (
      <>
        <Flex justifyContent='center'><Heading>I want to...</Heading></Flex>
        <AddWant onCreateSuccess={this.onCreateWantSuccess} />
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