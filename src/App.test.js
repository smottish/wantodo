import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './theme.js'
import { ThemeProvider } from 'emotion-theming';
import { ToastProvider } from './ToastProvider.js'

const mockLocalStorage = (function () {
  const store = { token: "abcd" };
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
  }
})();

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: false,
    value: () => ({
      matches: true,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }),
  })

  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
  });

})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
