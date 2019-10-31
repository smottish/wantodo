import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import { Heading, Box } from 'rebass';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Box variant='styles.root'>
          <Heading>
            Hello, World
          </Heading>
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;
