import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import { Heading, Box, Flex, Text, Button } from 'rebass';

const Header = ({onClick, ...props}) => (
  <Flex sx={{ gridColumn: 'span 12', backgroundColor: 'blue' }}>
    <Text>Wantodo</Text>
    <Text>Profile</Text>
    <Button onClick={onClick}>X</Button>
  </Flex>
)

const Sidebar = ({open, ...props}) => {
  if (!open) {
    return null
  }

  return (
    <Box sx={{ gridColumn: 'span 2', backgroundColor: 'red' }}>
      <Text>Sidebar</Text>
    </Box>
  )
}

const Main = ({sidebarOpen, ...props}) => (
  <Box sx={{ gridColumn: `span ${sidebarOpen ? '10' : '12'}`, backgroundColor: 'green' }}>
    {props.children}
  </Box>
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: true,
    }
  }

  render() {
    const { sidebarOpen } = this.state
    return (
      <ThemeProvider theme={theme}>
        <Box
          variant='styles.root'
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: '50px 350px 50px',
          }}
        >
          <Header onClick={() => this.setState({sidebarOpen: !sidebarOpen})}/>
          <Sidebar open={sidebarOpen}/>
          <Main sidebarOpen={sidebarOpen}>
            <Heading>
              Hello, World
            </Heading>
          </Main>
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;
