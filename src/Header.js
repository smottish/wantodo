import React from 'react';
import { useTheme } from 'emotion-theming';

const Header = ({onMenuClick, isMobile, sidebarOpen, ...props}) => {
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
        {isMobile && <Button fontSize={4} variant='transparentNoOutline' onClick={onMenuClick}>&#9776;</Button>}
        <Button variant='transparent' sx={{width: '38px', height: '38px', padding: 0, border: '2px solid black', borderRadius: '50%'}}>
          <User size={32}/>
        </Button>
    </Flex>
  )
}

export default Header;