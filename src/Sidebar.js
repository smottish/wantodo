import React from 'react';
import PropTypes from 'prop-types'
import { useTheme } from 'emotion-theming'
import { Box, Flex, Button } from 'rebass'
import MediaQuery from './MediaQuery'
import Overlay from './Overlay'

// todo: add prop types
const SidebarItem = ({ onClick, text, selected, icon }) => {
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
      {icon}
      <span style={{ marginLeft: '24px' }}>{text}</span>
    </Flex>
  )
}

// todo: allow desktop and mobile props to be overridden
// todo: allow more style props, like backgroundColor, to be overridden / themed
// (e.g. maybe add sidebarBackgroundColor to the theme)
const Sidebar = ({isOpen, isMobile, onClose, items, onSelect, selected, logo, ...props}) => {

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

  if (!isOpen) {
    styleProps.display = 'none'
  } else {
    styleProps.display = 'block'
  }

  return (
    <>
      <Overlay show={isOpen && isMobile} onClick={onClose} />
      <Box sx={{ backgroundColor: `${theme.colors.darkGray}`, color: 'rgb(221, 226, 255)', ...styleProps }}>
        <Flex justifyContent="space-between">
          {logo}
          {isMobile && <Button fontSize={5} sx={{ color: theme.colors.gray }} variant='transparentNoOutline' onClick={onClose}>&times;</Button>}
        </Flex>
        {items.map(({key, ...props}) => <SidebarItem key={key} {...props} selected={selected === key} onClick={ev => onSelect(ev, key)}/>)}
      </Box>
    </>
  )
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element,
      text: PropTypes.string,
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
    })
  ),
  onSelect: PropTypes.func,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  isMobile: PropTypes.bool,
  logo: PropTypes.element,
}

Sidebar.defaultProps = {
  isOpen: true,
  onClose: () => {},
  items: [],
  onSelect: () => {},
  selected: '',
  isMobile: false,
  logo: null,
}

const SidebarWrapper = ({breakPoint, ...props}) => {
  return (
    <MediaQuery query={`(max-width: ${breakPoint}px)`}>
      {matches => <Sidebar isMobile={matches} {...props} />}
    </MediaQuery>
  )
}

SidebarWrapper.propTypes = {
  breakPoint: PropTypes.number,
}

SidebarWrapper.defaultProps = {
  breakPoint: 768,
}

export default SidebarWrapper