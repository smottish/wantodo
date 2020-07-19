import React, { useEffect, useState } from 'react'
import { Heading } from 'rebass';
import { Input } from '@rebass/forms';
import { Edit, Trash2, Check, X } from 'react-feather';
import { Card, CardPrimary, CardActions } from './Card'
import AddWant from './AddWant'

const WantCardReadOnly = ({ want, onEdit, onDelete }) => (
  <Card css="margin:10px">
    <CardPrimary><Heading>{want.description}</Heading></CardPrimary>
    <CardActions>
      <Trash2 size={32} style={{ cursor: 'pointer' }} onClick={onDelete}/>
      <Edit size={32} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={onEdit}/>
    </CardActions>
  </Card>
)

const WantCardEditable = ({ want, onSave, onCancel }) => {
  const [ editableWant, setEditableWant ] = useState(want)
  useEffect(() => {
    // If want prop changes, update editable title
    setEditableWant(want)
  }, [want] /* Only fire when title changes */)
  const changeDesc = (ev) => 
    setEditableWant({ ...editableWant, description: ev.target.value})
  
  return <Card css="margin:10px">
    <CardPrimary><Input value={editableWant.description} onChange={changeDesc} /></CardPrimary>
    <CardActions>
      <X size={32} style={{ cursor: 'pointer' }} onClick={() => onCancel()}/>
      <Check
        size={32}
        style={{ cursor: 'pointer', marginRight: '10px' }}
        onClick={() => onSave(editableWant)}
      />
    </CardActions>
  </Card>
  
}

const WantCardContainer = ({ editable, want, ...props }) => {
  if (want.id === editable) {
    return <WantCardEditable want={want} {...props}/>
  } else {
    return <WantCardReadOnly want={want} {...props}/>
  }
}

function WantsContainer(props) {
  const [ wants, setWants ] = useState([])
  const [ editable, setEditable ] = useState(null)
  useEffect(() => {
    fetch('/api/want')
      .then((response) => response.json())
      .then((wants) => setWants(wants))
  }, [/* Only fire on mount */])
  
  function onCreateSuccess(want) {
    // TODO SM (2020-07-11): For now, just add the want to the end of the list
    setWants([ ...wants, want ])
  }
  
  function onSave(updatedWant) {
    // TODO SM (2020-07-18): Call API to update want, and only update local wants
    // if we succeed.
    const updatedWants = wants.map((want) => {
      if (want.id === updatedWant.id) {
        return updatedWant
      } else {
        return want
      }
    })
    
    setWants(updatedWants)
    setEditable(null)
  }
  
  function onCancel() {
    setEditable(null)
  }

  return <>
    <AddWant onCreateSuccess={onCreateSuccess} />
    {wants.map((want) => (
      <WantCardContainer
        key={want.id}
        want={want}
        editable={editable}
        onEdit={() => setEditable(want.id)}
        onSave={onSave} onCancel={onCancel}
      />
    )} 
  </>
}

export default WantsContainer