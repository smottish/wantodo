import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import { Heading, Box, Flex, Text } from 'rebass';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Box variant='styles.root'>
          <Flex>
            <Text>Wantodo</Text>
            <Text>Profile</Text>
          </Flex>
          <Heading>
            Hello, World
          </Heading>
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;
