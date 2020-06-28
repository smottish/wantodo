import React, { useEffect, useState } from 'react'
import { Heading } from 'rebass';
import { Edit, Trash2 } from 'react-feather';
import { Card, CardPrimary, CardActions } from './Card'

const WantCard = ({ title }) => (
  <Card css="margin:5px">
    <CardPrimary><Heading>{title}</Heading></CardPrimary>
    <CardActions>
      <Trash2 />
      <Edit />
    </CardActions>
  </Card>
)

function WantsContainer(props) {
  const [ wants, setWants ] = useState([])
  useEffect(() => {
    fetch('/api/want')
      .then((response) => response.json())
      .then((wants) => setWants(wants))
  }, [/* Only fire on mount */])

  return <>
     {wants.map((want) => <WantCard key={want.id} title={want.description}/>)} 
  </>
}

export default WantsContainer