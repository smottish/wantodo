import React, { Component } from 'react';
import { Heading, Flex, Box, Button } from 'rebass';
import { Input } from '@rebass/forms';
import { withTheme } from 'emotion-theming';

class HomeContainer extends Component {
  constructor() {
    super()
    this.onChangeWant = this.onChangeWant.bind(this)
  }
  
  onChangeWant(arg1, ...args) {
    console.log(arg1)
    console.log(args)
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
            <Button variant="secondary" width="100%">Tell me what to do!</Button>
          </Box>
        </Flex>
      </>
    )
  }
}

export default withTheme(HomeContainer);