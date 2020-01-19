import React, { Component } from 'react';
import { ThemeProvider, useTheme } from 'emotion-theming';
import theme from '@rebass/preset';
import { Heading, Box, Flex, Text, Button, Link } from 'rebass';
import { User, PieChart } from 'react-feather';

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
  },
  buttons: {
    ...theme.buttons,
    transparent: {
      variant: 'buttons.primary',
      borderRadius: 0,
      bg: 'transparent',
      color: 'black',
      cursor: 'pointer',
      ':focus': {
        outline: 'none',
      },
      '-webkit-tap-highlight-color': 'transparent',
    }
  },
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
    <Flex
      alignItems='center'
      justifyContent={isMobile ? "space-between" : "flex-end"}
      sx={{
          gridColumn,
          backgroundColor: `${theme.colors.muted}`,
          borderBottom: `1px solid ${theme.colors.lightGray}`,
          padding: '5px',
      }}>
        {isMobile && <Button fontSize={4} variant='transparent' onClick={menuClick}>&#9776;</Button>}
        <Button variant='transparent' sx={{border: '2px solid black', borderRadius: '50%'}}>
          <User size={32}/>
        </Button>
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

const Sidebar = ({open, isMobile, onClose, items, onSideBarSelect, selected, ...props}) => {
  
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
          {isMobile && <Button fontSize={5} sx={{ color: theme.colors.gray }} variant='transparent' onClick={onClose}>&times;</Button>}
        </Flex>
        {items.map(({key, ...props}) => <SidebarItem {...props} selected={selected === key} onClick={ev => onSideBarSelect(ev, key)}/>)}
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
      sidebarSelected: '',
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
  
  onSideBarSelect(ev, key) {
    let newState = {
      sidebarSelected: key
    }
    
    if (this.state.isMobile) {
      newState = {
        ...newState,
        sidebarOpen: false,
      }
    }
    this.setState(newState)
  }

  render() {
    const { sidebarOpen, isMobile } = this.state
    const sidebarItems = [
      { Icon: User, text: 'Contacts', key: 'contacts' },
      { Icon: PieChart, text: 'Reports', key: 'reports' },
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
          <Sidebar selected={this.state.sidebarSelected} items={sidebarItems} onSideBarSelect={this.onSideBarSelect} onClose={() => this.setState({sidebarOpen: false})} open={sidebarOpen} isMobile={isMobile}/>
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
