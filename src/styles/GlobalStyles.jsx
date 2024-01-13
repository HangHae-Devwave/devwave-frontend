import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  // ### Minji ###
  // 예시로 작성해놓은거라 같이 협의하에 수정하면 될 것 같아요!
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    background: '#ecf0f1',
    text: '#2c3e50',
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Roboto, sans-serif',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
};

export { GlobalStyles, theme };
