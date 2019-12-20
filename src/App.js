import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import { Heading, Box, Flex, Text, Button } from 'rebass';

const Header = ({menuClick, ...props}) => (
  <Flex sx={{ gridColumn: 'span 12', backgroundColor: 'blue' }}>
    <Text>Wantodo</Text>
    <Text>Profile</Text>
    <Button onClick={menuClick}>&#9776;</Button>
  </Flex>
)

const Sidebar = ({open, ...props}) => {
    
  const desktopProps = {
    display: 'block',
    position: 'static',
    width: 'auto',
    zIndex: 'auto',
    height: 'auto',
    top: 'auto',
    left: 'auto',
  }
  
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
    
    this.mql = window.matchMedia('(max-width: 768px)');
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
          <Header menuClick={() => this.setState({sidebarOpen: !sidebarOpen})}/>
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
