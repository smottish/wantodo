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

const WantCardEditable = ({ title, onChange }) => {
  [ ]
}

function WantsContainer(props) {
  const [ wants, setWants ] = useState([])
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
    {wants.map((want) => <WantCardReadOnly key={want.id} title={want.description} onEdit={() => alert('test')}/>)} 
  </>
}

export default WantsContainer