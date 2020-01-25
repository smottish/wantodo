import React, { Component } from 'react';
import { ThemeProvider, useTheme } from 'emotion-theming';
import theme from '@rebass/preset';
import { Heading, Box, Flex, Button } from 'rebass';
import { User, PieChart } from 'react-feather';
import Sidebar from './Sidebar'

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
    },
    transparentNoOutline: {
      variant: 'buttons.transparent',
      ':focus': {
        outline: 'none',
      },
      '-webkit-tap-highlight-color': 'transparent',
    },
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
        {isMobile && <Button fontSize={4} variant='transparentNoOutline' onClick={menuClick}>&#9776;</Button>}
        <Button variant='transparent' sx={{width: '38px', height: '38px', padding: 0, border: '2px solid black', borderRadius: '50%'}}>
          <User size={32}/>
        </Button>
    </Flex>
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
      { icon: <User/>, text: 'Contacts', key: 'contacts' },
      { icon: <PieChart/>, text: 'Reports', key: 'reports' },
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
          <Sidebar
            selected={this.state.sidebarSelected}
            items={sidebarItems}
            onSelect={this.onSideBarSelect}
            onClose={() => this.setState({sidebarOpen: false})}
            isOpen={sidebarOpen}
            breakPoint={768}
            logo={<CircleIcon text={"Wantodo"} />}
          />
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
