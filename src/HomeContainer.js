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
            <Box sx={{ display: 'inline-block' }} width={[9/10, 9/10, 8/10]}>
              <Input defaultValue='Enter something you want to do!' onChange={this.onChangeWant}/>
            </Box>
            <Box paddingLeft="5px" sx={{ display: 'inline-block' }} width={[1/10, 1/10, 2/10]}>
              <Button width="100%">Add</Button>
            </Box>
          </Box>
        </Flex>
        <Flex marginTop="5px" justifyContent='center'>
          <Box width={[1, 1, 2/3]}>
            <Button variant="secondary" width="100%">Tell me what to do!</Button>
          </Box>
        </Flex>
      </>
    )
  }
}

export default withTheme(HomeContainer);