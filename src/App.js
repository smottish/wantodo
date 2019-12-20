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

const Overlay = ({show, onClick}) => (
  <div
    style={{
      display: show ? 'block' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    }}
    onClick={onClick}
  >
  </div>
)

const Sidebar = ({open, isMobile, onClose, ...props}) => {
    
  const desktopProps = {
    position: 'static',
    width: 'auto',
    zIndex: 'auto',
    height: 'auto',
    top: 'auto',
    left: 'auto',
  }
  
  const mobileProps = {
    position: 'fixed',
    width: '250px',
    zIndex: '1',
    height: '100vh',
    top: '0',
    left: '0',
  }
  
  const styleProps = isMobile ? mobileProps : desktopProps

  if (!open) {
    styleProps.display = 'none'
  } else {
    styleProps.display = 'block'
  }

  return (
    <>
      <Overlay show={open && isMobile} onClick={onClose} />
      <Box sx={{ gridColumn: 'span 2', backgroundColor: 'red', ...styleProps }}>
        {isMobile && <Button onClick={onClose}>X</Button>}
        <Text>Sidebar</Text>
      </Box>
    </>
  )
}

const Main = ({sidebarOpen, isMobile, ...props}) => {
  let numCols

  if (isMobile) {
    numCols = '12'
  } else {
    numCols = sidebarOpen ? '10' : '12'
  }

  return (
    <Box sx={{ gridColumn: `span ${numCols}`, backgroundColor: 'green' }}>
      {props.children}
    </Box>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: true,
      isMobile: false,
    }
    
    this.mql = null;
    this.onMediaQuery = this.onMediaQuery.bind(this)
  }
  
  setMobileMode() {
    this.setState({ isMobile: true, sidebarOpen: false })
  }
  
  setDesktopMode() {
    this.setState({ isMobile: false, sidebarOpen: true })
  }
  
  componentDidMount() {
    this.mql = window.matchMedia('(max-width: 768px)')
    if(this.mql.matches) {
      this.setMobileMode()
    } else {
      this.setDesktopMode()
    }
    this.mql.addListener(this.onMediaQuery)
  }
  
  componentWillUnmount() {
    this.mql.removeListener(this.onMediaQuery)
  }
  
  onMediaQuery(mq) {
    if (mq.matches) {
      this.setMobileMode()
    } else {
      this.setDesktopMode()
    }
  }

  render() {
    const { sidebarOpen, isMobile } = this.state
    return (
      <ThemeProvider theme={theme}>
        <Box
          variant='styles.root'
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: '50px 1fr',
            height: '100vh',
          }}
        >
          <Header menuClick={() => this.setState({sidebarOpen: !sidebarOpen})}/>
          <Sidebar onClose={() => this.setState({sidebarOpen: false})} open={sidebarOpen} isMobile={isMobile}/>
          <Main isMobile={isMobile} sidebarOpen={sidebarOpen}>
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
