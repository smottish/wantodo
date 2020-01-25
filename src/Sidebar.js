import React, { Component } from 'react';
import { withTheme } from 'emotion-theming';

class Sidebar extends Component {
    
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
          {isMobile && <Button fontSize={5} sx={{ color: theme.colors.gray }} variant='transparentNoOutline' onClick={onClose}>&times;</Button>}
        </Flex>
        {items.map(({key, ...props}) => <SidebarItem {...props} selected={selected === key} onClick={ev => onSideBarSelect(ev, key)}/>)}
      </Box>
    </>
  )
}

Sidebar.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.object,
  }),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.insanceOf(Component),
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
}

const SidebarWithTheme = withTheme(Sidebar)