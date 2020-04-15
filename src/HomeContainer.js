import React, { Component } from 'react';
import { Heading, Flex, Box, Button, Text} from 'rebass';
import { Input } from '@rebass/forms';
import { withTheme } from 'emotion-theming';

class HomeContainer extends Component {
  constructor() {
    super()
    this.state = {
      want: null,
    }
    this.onChangeWant = this.onChangeWant.bind(this)
    this.onGetWant = this.onGetWant.bind(this)
  }
  
  // TODO: add handler for Add button to send POST /api/want
  // See https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  // for how to do POST with fetch
  // TODO: Consider using https://github.com/axios/axios instead of fetch
  
  onChangeWant(arg1, ...args) {
    console.log(arg1)
    console.log(args)
  }
  
  onGetWant() {
    fetch('/api/want')
      .then((response) => response.json())
      .then((want) => this.setState({ want }))
  }

  render() {
    return (
      <>
        <Flex justifyContent='center'><Heading>I want to...</Heading></Flex>
        <Flex justifyContent='center'>
          <Box width={[1, 1, 2/3]}>
            <Flex>
              <Box flexGrow={4} m='3px'><Input placeholder='Enter something you want to do!' onChange={this.onChangeWant}/></Box>
              <Box flexGrow={1} m='3px'><Button width="100%">Add</Button></Box>
            </Flex>
          </Box>
        </Flex>
        <Flex marginTop="5px" justifyContent='center'>
          <Box width={[1, 1, 2/3]} m='3px'>
            <Button variant="secondary" width="100%" onClick={this.onGetWant}>Tell me what to do!</Button>
          </Box>
        </Flex>
        {this.state.want && <Flex marginTop="5px" justifyContent='center'>
          <Text fontSize={[ 3, 4, 5 ]} fontWeight={"bold"}>{this.state.want.description}</Text>
        </Flex>}
      </>
    )
  }
}

export default withTheme(HomeContainer);