import React, { Component } from 'react';
import { Heading, Flex, Box, Button } from 'rebass';
import { withTheme } from 'emotion-theming';
import SpinningText from './SpinningText';
import { ToastContext, SHOW_TOAST } from './ToastProvider'
import AddWant from './AddWant';
import { random } from './api';

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
    this.onCreateWantError = this.onCreateWantError.bind(this)
  }

  onChangeWant(ev) {
    this.setState({ newWant: ev.target.value })
  }

  onGetWant() {
    let exclude = null
    if (this.state.want) {
      exclude = this.state.want._id
    }

    random(exclude)
      .then((want) => this.setState({ want }))
  }

  onCreateWantSuccess(want) {
    // See https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    // TODO: Consider using https://github.com/axios/axios instead of fetch

    // eslint-disable-next-line
    const [ state, dispatch ] = this.context
    dispatch({ type: SHOW_TOAST, message: "Want added!" })
  }

  onCreateWantError(err) {
      // TODO: error handling
      console.error(err)
      console.error(err.response)
  }

  render() {
    return (
      <>
        <Flex justifyContent='center'><Heading>I want to...</Heading></Flex>
        <AddWant
          onCreateSuccess={this.onCreateWantSuccess}
          onCreateError={this.onCreateWantError}
        />
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
