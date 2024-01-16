import React from 'react';
import Router from './routes/Router';
import { AlertProvider } from './contexts/AlertProvider';

const App = () => {
  return (
    <AlertProvider>
      <Router />
    </AlertProvider>
  );
};

export default React.memo(App);
