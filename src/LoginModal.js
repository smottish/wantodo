import React, { useState } from 'react'
import { Button, Text } from 'rebass'
import { Input } from '@rebass/forms'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './Modal.js'

export default function LoginModal({
  theme,
  isOpen,
  container,
  onLogin,
  onChange,
  error,
}) {
  const [ code, setCode ] = useState('')
  function _onChange(ev) {
    setCode(ev.target.value)
    onChange(ev)
  }

  return <Modal
    isOpen={isOpen}
    container={container}
  >
    <ModalContent theme={theme} style={{top: '10%', width: '50%'}}>
      <ModalHeader theme={theme}>
        <span style={{fontSize: '1.5em'}}>Please enter your access code</span>
      </ModalHeader>
      <ModalBody theme={theme}>
        <Input value={code} placeholder='E.g. nZFVdg12c' onChange={_onChange}/>
        {error && <Text color='error'>{error}</Text>}
      </ModalBody>
      <ModalFooter theme={theme}>
        <Button onClick={() => onLogin(code)}>OK</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
}
