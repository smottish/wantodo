import React, { useEffect, useState } from 'react'
import { Heading } from 'rebass';
import { Edit, Trash2 } from 'react-feather';
import { Card, CardPrimary, CardActions } from './Card'
import AddWant from './AddWant'

const WantCardReadOnly = ({ title, onEdit, onDelete }) => (
  <Card css="margin:10px">
    <CardPrimary><Heading>{title}</Heading></CardPrimary>
    <CardActions>
      <Trash2 size={32} style={{ cursor: 'pointer' }} onClick={onDelete}/>
      <Edit size={32} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={onEdit}/>
    </CardActions>
  </Card>
)

const WantCardEditable = ({ title }) => {
  const [ editableTitle, setEditableTitle ] = useState(title)
  useEffect(() => {
    // If title prop changes, update editable title
    setEditableTitle(title)
  }, [title] /* Only fire when title changes */)
  const changeTitle = (ev) => setEditableTitle(ev.target.value)
  
  return <Card css="margin:10px">
    <CardPrimary><input value={editableTitle} onChange={changeTitle} /></CardPrimary>
    <CardActions>
      <Trash2 size={32} style={{ cursor: 'pointer' }}/>
      <Edit size={32} style={{ cursor: 'pointer', marginRight: '10px' }}/>
    </CardActions>
  </Card>
  
}

const WantCardContainer = ({ id, editable, ...props }) => {
  if (id === editable) {
    return <WantCardEditable {...props}/>
  } else {
    return <WantCardReadOnly {...props}/>
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

  return <>
    <AddWant onCreateSuccess={onCreateSuccess} />
    {wants.map((want) => <WantCardContainer key={want.id} id={want.id} editable={editable} title={want.description} onEdit={() => setEditable(want.id)}/>)} 
  </>
}

export default WantsContainer