import styled, { createGlobalStyle } from 'styled-components';

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
    button: {
      primary: '#007DFA',
      secondary: '#2ecc71',
      accent: '#e74c3c',
      background: '#ecf0f1',
    },
    text: {
      common: '#2F3367',
    },
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

const MainLayout = styled.div`
  padding: 15vh 0;
`;

export { GlobalStyles, theme, MainLayout };
