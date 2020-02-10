import React, { Component } from 'react';
import { ThemeProvider, useTheme } from 'emotion-theming';
import theme from '@rebass/preset';
import { Heading, Box } from 'rebass';
import { User, Home, CheckSquare } from 'react-feather';
import Sidebar from './Sidebar';
import Header from './Header';
import HomeContainer from './HomeContainer';
import MediaQuery from './MediaQuery';

const MOBILE_BREAKPOINT = 768

const myTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    muted: '#f8f8fc',
    lightGray: '#e8e8e8',
    darkGray: 'rgb(54, 55, 64)',
    primary: 'rgb(54, 55, 64)',
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
    <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="4" fill="white" />
    <text x="50%" y="50%" textAnchor="middle" fontFamily="Arial" dy=".3em">{text}</text>
  </svg>
)

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

const PlaceholderPage = ({ title }) => (
  <>
    <Heading>{title}</Heading>
  </>
)

// TODO: Implement profile and wants containers/pages
const ProfileContainer = () => (
  <PlaceholderPage title={"Profile"}/>
)

const WantsContainer = () => (
  <PlaceholderPage title={"My Wants"}/>
)

const pages = {
  home: HomeContainer,
  profile: ProfileContainer,
  wants: WantsContainer,
  default: HomeContainer
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: true,
      isMobile: false,
      sidebarSelected: '',
    }

    this.onBreakPointMatch = this.onBreakPointMatch.bind(this)
    this.onSideBarSelect = this.onSideBarSelect.bind(this)
  }
  
  setMobileMode() {
    this.setState({ isMobile: true, sidebarOpen: false })
  }
  
  setDesktopMode() {
    this.setState({ isMobile: false, sidebarOpen: true })
  }
  
  onBreakPointMatch(matches) {
    if (matches) {
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
  
  renderCurrentPage() {
    const page = this.state.sidebarSelected || 'default'
    const Page = pages[page]
    return <Page/>
  }

  render() {
    const { sidebarOpen, isMobile } = this.state
    const sidebarItems = [
      { icon: <Home />, text: 'Home', key: 'home' },
      { icon: <CheckSquare/>, text: 'My Wants', key: 'wants' },
      { icon: <User/>, text: 'Profile', key: 'profile' },
    ]
    let gridColumn
    
    if (isMobile) {
      gridColumn = 'span 2'
    } else {
      gridColumn = sidebarOpen ? '2' : 'span 2'
    }

    return (
      <ThemeProvider theme={myTheme}>
        <MediaQuery
          query={`(max-width: ${MOBILE_BREAKPOINT}px)`}
          onChange={this.onBreakPointMatch}
        >
        {() => (
          <Box
            variant='styles.root'
            sx={{
              display: 'grid',
              gridTemplateColumns: '250px 1fr',
              gridTemplateRows: 'auto 1fr',
              height: '100vh',
            }}
          >
            <Header
              showMenuButton={isMobile}
              onMenuClick={() => this.setState({sidebarOpen: !sidebarOpen})}
              sx={{ gridColumn }}
            />
            <Sidebar
              selected={this.state.sidebarSelected}
              items={sidebarItems}
              onSelect={this.onSideBarSelect}
              onClose={() => this.setState({sidebarOpen: false})}
              isOpen={sidebarOpen}
              breakPoint={MOBILE_BREAKPOINT}
              logo={<CircleIcon text={"Wantodo"} />}
            />
            <Main isMobile={isMobile} sidebarOpen={sidebarOpen}>
              { this.renderCurrentPage() }
            </Main>
          </Box>
        )}
        </MediaQuery>
      </ThemeProvider>
    );
  }
}

export default App;
