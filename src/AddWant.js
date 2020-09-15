import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Button } from 'rebass';
import { Input } from '@rebass/forms';
import { create } from './api.js'

// TODO SM (2020-07-11): Consider refactoring this module after looking at examples of how others
// have used Hooks to do what I'm trying to do here. Objective: Try not to just replicate what I
// would do in React (e.g. use thunk middleware and dispatch an async action that returns a function
// that does a fetch and dispatches actions on request, receive and failure).

const AddWant = ({ onCreateSuccess, onCreateError }) => {
  const [ value, setValue ] = useState('');
  function onCreate() {
    const newWant = { description: value }
    return create(newWant)
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

export default AddWant;