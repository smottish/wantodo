import React from 'react';
import { useTheme } from 'emotion-theming';
import { Flex, Button, Text } from 'rebass';
import { HelpCircle } from 'react-feather';

// TODO: Pass in props for Avatar / Profile menu/button
const Header = ({onHelpClick, onMenuClick, showMenuButton, sx, user, ...props}) => {
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
        <Flex alignItems='center' justifyContent='flex-end'>
          {user && user.first_name &&
            <Text fontSize={3} sx={{ marginRight: '5px'}}>Hi, {user.first_name}!</Text>
          }
          <Button onClick={onHelpClick} variant='transparent' sx={{width: '38px', height: '38px', padding: 0}}>
            <HelpCircle size={38}/>
          </Button>
        </Flex>
        {/* TODO: Add a profile and/or settings menu */}
        {/*<Button variant='transparent' sx={{width: '38px', height: '38px', padding: 0, border: '2px solid black', borderRadius: '50%'}}>
          <User size={32}/>
        </Button>*/}
    </Flex>
  )
}

export default Header;
