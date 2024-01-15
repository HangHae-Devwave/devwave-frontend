import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: '#007DFA',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    background: '#ecf0f1',
    text: '#2F3367',
  },

  fonts: {
    title: 'Poppins, sans-serif',
  },

  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
};

export { GlobalStyles, theme };
