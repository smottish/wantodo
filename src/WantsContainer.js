import React, { useEffect, useState } from 'react'
import { Heading, Button } from 'rebass';
import { Edit, Trash2 } from 'react-feather';
import { Card, CardPrimary, CardActions } from './Card'

const WantCard = ({ title }) => (
  <Card>
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
     {wants.map((want) => )} 
  </>
}

export default WantsContainer