import React from 'react'
import { Heading, Button } from 'rebass';
import { Edit } from 'react-feather';
import { Card, CardPrimary, CardActions } from './Card'

const WantsContainer = () => (
  <>
    <Card>
      <CardPrimary><Heading>Testing 123...</Heading></CardPrimary>
      <CardActions>
        <Edit />
        <Button>Delete</Button>
      </CardActions>
    </Card>
  </>
)

export default WantsContainer