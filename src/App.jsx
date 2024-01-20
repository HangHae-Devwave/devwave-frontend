import React from 'react';
import Router from './routes/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AlertProvider } from './contexts/AlertProvider';
import { ChakraProvider } from '@chakra-ui/react';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AlertProvider>
          <Router />
        </AlertProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default React.memo(App);
