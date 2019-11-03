import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import { Heading, Box, Flex, Text } from 'rebass';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Box
          variant='styles.root'
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: '50px 350px 50px',
          }}
        >
          <Flex sx={{ gridColumn: 'span 12' }}>
            <Text>Wantodo</Text>
            <Text>Profile</Text>
          </Flex>
          <Box sx={{ gridColumn: 'span 2' }}><Text>Sidebar</Text></Box>
          <Box sx={{ gridColumn: 'span 10' }}>
            <Heading>
              Hello, World
            </Heading>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;
