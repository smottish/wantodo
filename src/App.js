import React, { Component } from 'react';
import { ThemeProvider, useTheme } from 'emotion-theming';
import theme from '@rebass/preset';
import { Heading, Box, Flex, Text, Button, Link } from 'rebass';
import { User } from 'react-feather';

const myTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    muted: '#f8f8fc',
    lightGray: '#e8e8e8',
    darkGray: 'rgb(54, 55, 64)',
  },
  variants: {
    ...theme.variants,
    navBlock: {
      ...theme.variants.nav,
      display: "block",
      ':hover': {
        
      }
    }
  }
}

const CircleIcon = ({ text }) => (
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="4" fill="white" />
    <text x="50%" y="50%" text-anchor="middle" font-family="Arial" dy=".3em">{text}</text>
  </svg>
)

const Header = ({menuClick, isMobile, sidebarOpen, ...props}) => {
  let gridColumn
  const theme = useTheme()
  
  if (isMobile) {
    gridColumn = 'span 2'
  } else {
    gridColumn = sidebarOpen ? '2' : 'span 2'
  }
  return (
    <Flex justifyContent={isMobile ? "space-between" : "flex-end"} sx={{ gridColumn, backgroundColor: `${theme.colors.muted}`, borderBottom: `1px solid ${theme.colors.lightGray}` }}>
      {isMobile && <Button onClick={menuClick}>&#9776;</Button>}
      <CircleIcon text={"Profile"} />
    </Flex>
  )
}

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

const SidebarItem = ({ onClick, text, selected, Icon, }) => {
  // TODO: move styling below into a variant (maybe a selected an unselected variant)
  const theme = useTheme()
  const selectedProps = selected ? {
    backgroundColor: 'rgba(221, 226, 255, 0.08)',
    borderLeft: `5px solid ${theme.colors.gray}`,
  } : {}
  return (
    <Flex
      alignItems={"center"}
      onClick={onClick}
      height={'56px'}
      paddingLeft={'32px'}
      paddingRight={'32px'}
      sx={{
        ...selectedProps,
        cursor: 'pointer',
        ':hover': {
          backgroundColor: 'rgba(221, 226, 255, 0.08)',
        }
      }}
    >
      <Icon/>
      <span style={{ marginLeft: '24px' }}>{text}</span>
    </Flex>
  )
}

const Sidebar = ({open, isMobile, onClose, items, onSideBarSelect, ...props}) => {
  
  const theme = useTheme()
    
  const desktopProps = {
    position: 'static',
    width: 'auto',
    zIndex: 'auto',
    height: 'auto',
    top: 'auto',
    left: 'auto',
    gridColumn: '1',
    gridRowStart: '1',
    gridRowEnd: '3',
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
      <Box sx={{ backgroundColor: `${theme.colors.darkGray}`, color: 'rgb(221, 226, 255)', ...styleProps }}>
        <Flex justifyContent="space-between">
          <CircleIcon text={"Wantodo"} />
          {isMobile && <Button onClick={onClose}>X</Button>}
        </Flex>
        {items.map(({Icon, text, key}) => <SidebarItem Icon={Icon} />)}
        <SidebarItem Icon={User} selected={true} text="Contacts" onClick={ev => alert('clicked')} />
        <Link variant="navBlock" color="rgb(221, 226, 255)" href="#">Contacts</Link>
        <Link variant="navBlock" color="rgb(221, 226, 255)" href="#">Reports</Link>
      </Box>
    </>
  )
}

const Main = ({sidebarOpen, isMobile, ...props}) => {
  let gridColumn
  const theme = useTheme()

  if (isMobile) {
    gridColumn = 'span 2'
  } else {
    gridColumn = sidebarOpen ? '2' : 'span 2'
  }

  return (
    <Box sx={{ gridColumn, backgroundColor: `${theme.colors.muted}`, padding: '10px' }}>
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
    this.onSideBarSelect = this.onSideBarSelect.bind(this)
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
  
  onSideBarSelect(key) {
    alert(key)
  }

  render() {
    const { sidebarOpen, isMobile } = this.state
    const sidebarItems = [
      { Icon: User, text: 'Contacts', key: 'contacts' },
      { Icon: User, text: 'Reports', key: 'reports' },
    ]
    return (
      <ThemeProvider theme={myTheme}>
        <Box
          variant='styles.root'
          sx={{
            display: 'grid',
            gridTemplateColumns: '250px 1fr',
            gridTemplateRows: 'auto 1fr',
            height: '100vh',
          }}
        >
          <Header sidebarOpen={sidebarOpen} isMobile={isMobile} menuClick={() => this.setState({sidebarOpen: !sidebarOpen})}/>
          <Sidebar items={sidebarItems} onSideBarSelect={this.onSideBarSelect} onClose={() => this.setState({sidebarOpen: false})} open={sidebarOpen} isMobile={isMobile}/>
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
