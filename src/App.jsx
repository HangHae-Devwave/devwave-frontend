import React from 'react';
import Router from './routes/Router';
import { AlertProvider } from './contexts/AlertProvider';
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
  return (
    <ChakraProvider>
      <AlertProvider>
        <Router />
      </AlertProvider>
    </ChakraProvider>
  );
};

export default React.memo(App);
