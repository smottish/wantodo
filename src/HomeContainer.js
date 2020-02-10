import React, { Component } from 'react';
import { Heading, Flex } from 'rebass';
import { Input } from '@rebass/forms';

class HomeContainer extends Component {
  constructor() {
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
        <Input defaultValue='Enter something you want to do!' onChange={this.onChangeWant}/>
      </>
    )
  }
}

export default HomeContainer;