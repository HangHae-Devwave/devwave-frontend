import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyles, theme } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AlertProvider } from './contexts/AlertProvider';
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
