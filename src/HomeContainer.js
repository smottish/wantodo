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
              <Box sx={{ flexGrow: 1 }}><Input defaultValue='Enter something you want to do!' onChange={this.onChangeWant}/></Box>
              <Box sx={{ flexGrow: 1 }}><Button sx={{ flexGrow: 1 }}>Add</Button></Box>
            </Flex>
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