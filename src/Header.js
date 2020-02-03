import React from 'react';
import { useTheme } from 'emotion-theming';

// TODO: Pass in props for Avatar / Profile menu/button
const Header = ({onMenuClick, showMenuButton, sx, ...props}) => {
  const theme = useTheme()

  return (
    <Flex
      alignItems='center'
      justifyContent={showMenuButton ? "space-between" : "flex-end"}
      sx={{
          ...sx,
          backgroundColor: `${theme.colors.muted}`,
          borderBottom: `1px solid ${theme.colors.lightGray}`,
          padding: '5px',
      }}>
        {showMenuButton && <Button fontSize={4} variant='transparentNoOutline' onClick={onMenuClick}>&#9776;</Button>}
        <Button variant='transparent' sx={{width: '38px', height: '38px', padding: 0, border: '2px solid black', borderRadius: '50%'}}>
          <User size={32}/>
        </Button>
    </Flex>
  )
}

export default Header;