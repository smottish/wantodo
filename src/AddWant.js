import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Button } from 'rebass';
import { Input } from '@rebass/forms';
import { create } from './api.js'

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

export default AddWant;