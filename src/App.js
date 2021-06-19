import React, { Component, useContext } from 'react';
import { useTheme, withTheme } from 'emotion-theming';
import { Heading, Box, Button, Text } from 'rebass';
import { Home, CheckSquare } from 'react-feather';
import Sidebar from './Sidebar';
import Header from './Header';
import HomeContainer from './HomeContainer';
import WantsContainer from './WantsContainer';
import MediaQuery from './MediaQuery';
import Toast from './Toast.js';
import { ToastContext, HIDE_TOAST } from './ToastProvider.js'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalClose,
  ModalBody,
  ModalFooter,
} from './Modal.js'
import LoginModal from './LoginModal.js'
import { setToken, login } from './api'

const modalRoot = document.getElementById('modal-root')

const MOBILE_BREAKPOINT = 768

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

const ToastWrapper = (props) => {
  const [state, dispatch] = useContext(ToastContext);
  return <Toast
    open={state.show}
    autoHideDuration={5}
    onClose={() => dispatch({type: HIDE_TOAST})}
  >
    {state.message}
  </Toast>
}

const HelpContent = () => <>
  <p>Do you ever feel like sometimes when you have free time on your
  hands, you genuinely don't know what to do? So you end up
  browsing social media or binging Netflix only to later remember all
  the things you'd like to do, if only you had the time.</p>

  <p>This is not another "Todo" app to track all the things you "need"
  to do. This is a tool to provide inspiration for things you "want"
  to do during those fleeting and rare pockets of free time.</p>

  <h4>When you find yourself thinking "what should I do?"</h4>

  <p>Just click or tap "Tell me what to do!"</p>

  <h4>When inpsiration strikes...</h4>
  <p>...and you think of something you'd like to
  do, type it into where it says "Enter something you want to do" and
  click "Add." You can manage all the things you want to do from the
  "Wants" page.</p>

  <p>Are you ready to get started?</p>
</>

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
      showToast: false,
      showHelp: false,
      isLoggedIn: false,
      loginError: '',
    }

    this.onBreakPointMatch = this.onBreakPointMatch.bind(this)
    this.onSideBarSelect = this.onSideBarSelect.bind(this)
    this.onHelpClose = this.onHelpClose.bind(this)
    this.onLogin = this.onLogin.bind(this)
    this.onLoginChange = this.onLoginChange.bind(this)
  }

  onHelpClose() {
    this.setState({ showHelp: false })
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

  onLogin(code) {
    this.setState({ loginError: '' })
    login(code)
      .then(() => {
        window.localStorage.setItem('token', code)
        this.setState({ isLoggedIn: true })
      })
      .catch((err) => {
        this.setState({ loginError: 'Invalid code' })
      })
  }

  onLoginChange(ev) {
    if (this.state.loginError !== '') {
      this.setState({ loginError: '' })
    }
  }

  renderCurrentPage() {
    const page = this.state.sidebarSelected || 'default'
    const Page = pages[page]
    return <Page/>
  }

  componentWillMount() {
    const token = window.localStorage.getItem('token')
    if (token) {
      setToken(token)
      this.setState({ isLoggedIn: true })
    }
  }

  render() {
    const theme = this.props.theme
    const { sidebarOpen, isMobile } = this.state
    const sidebarItems = [
      { icon: <Home />, text: 'Home', key: 'home' },
      { icon: <CheckSquare/>, text: 'My Wants', key: 'wants' },
      // TODO: Add profile page
      // { icon: <User/>, text: 'Profile', key: 'profile' },
    ]
    let gridColumn

    if (isMobile) {
      gridColumn = 'span 2'
    } else {
      gridColumn = sidebarOpen ? '2' : 'span 2'
    }

    return <>
      <ToastWrapper />
      <LoginModal
        isOpen={!this.state.isLoggedIn}
        container={modalRoot}
        theme={theme}
        onLogin={this.onLogin}
        onChange={this.onLoginChange}
        error={this.state.loginError}
      />
      <Modal
        isOpen={this.state.showHelp}
        container={modalRoot}
        onClick={this.onHelpClose}
      >
        <MediaQuery
          query={`(max-width: ${MOBILE_BREAKPOINT}px)`}
        >{(matches) => (
          <ModalContent theme={theme} style={{ top: '20px', width: matches ? '80%' : '50%' }}>
            <ModalHeader theme={theme}>
              <span style={{fontSize: '1.5em'}}>How to use Wantodo</span>
              <ModalClose
                onClick={this.onHelpClose}
              >
                &times;
              </ModalClose>
            </ModalHeader>
            <ModalBody theme={theme}>
              <HelpContent />
            </ModalBody>
            <ModalFooter theme={theme}>
              <Button onClick={this.onHelpClose}>Yes!</Button>
            </ModalFooter>
          </ModalContent>
        )}</MediaQuery>
        </Modal>
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
              onHelpClick={() => this.setState({ showHelp: true })}
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
    </>;
  }
}

export default withTheme(App);
