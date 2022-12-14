import React, { useEffect, useState } from 'react'
import { Heading } from 'rebass';
import { Input } from '@rebass/forms';
import { Edit, Trash2, Check, X } from 'react-feather';
import { Card, CardPrimary, CardActions } from './Card'
import { update, del, list } from './api';
import AddWant from './AddWant'

const WantCardReadOnly = ({ want, onEdit, onDelete }) => (
  <Card css="margin:10px">
    <CardPrimary><Heading>{want.description}</Heading></CardPrimary>
    <CardActions>
      <Trash2 size={32} style={{ cursor: 'pointer' }} onClick={() => onDelete(want._id)}/>
      <Edit size={32} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={onEdit}/>
    </CardActions>
  </Card>
)

const WantCardEditable = ({ want, onSave, onCancel, onChange }) => {
  const handleChange = (ev) => onChange(ev.target.name, ev.target.value)

  return <Card css="margin:10px">
    <CardPrimary>
      <Input name="description" value={want.description} onChange={handleChange} />
    </CardPrimary>
    <CardActions>
      <X size={32} style={{ cursor: 'pointer' }} onClick={() => onCancel()}/>
      <Check
        size={32}
        style={{ cursor: 'pointer', marginRight: '10px' }}
        onClick={() => onSave(want)}
      />
    </CardActions>
  </Card>

}

const WantCardContainer = ({ editable, want, ...props }) => {
  if (editable && want._id === editable._id) {
    return <WantCardEditable want={editable} {...props}/>
  } else {
    return <WantCardReadOnly want={want} {...props}/>
  }
}

function WantsContainer(props) {
  const [ wants, setWants ] = useState([])
  const [ editable, setEditable ] = useState(null)
  useEffect(() => {
    list().then((wants) => setWants(wants))
  }, [/* Only fire on mount */])

  function onCreateSuccess(want) {
    // TODO SM (2020-07-11): For now, just add the want to the end of the list
    setWants([ ...wants, want ])
  }

  function onChange(name, value) {
    setEditable({ ...editable, [name]: value })
  }

  function onSave(want) {
    // TODO SM (2020-08-02): Add error handling
    update(want)
      .then(onSaveSuccess)
      .catch((err) => console.log(err.response))
  }

  function onSaveSuccess(updatedWant) {
    const updatedWants = wants.map((want) => {
      if (want._id === updatedWant._id) {
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

  function onDelete(id) {
    // TODO SM (2020-09-24): Add error handling
    del(id)
      .then(() => {
        setWants(wants.filter((want) => (
          want._id !== id
        )))
      })
      .catch((err) => {
        err.response
          .json()
          .then((json) => console.log(json))
    })
  }

  return <>
    <AddWant onCreateSuccess={onCreateSuccess} />
    {wants.map((want) => (
      <WantCardContainer
        key={want._id}
        want={want}
        editable={editable}
        onEdit={() => setEditable({ ...want })}
        onSave={onSave}
        onCancel={onCancel}
        onChange={onChange}
        onDelete={onDelete}
      />
    ))}
  </>
}

export default WantsContainer
