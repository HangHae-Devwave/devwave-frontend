import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

const useAlert = () => {
  return useContext(AlertContext);
};

const AlertProvider = ({ children }) => {
  const [alertVal, setAlertVal] = useState({
    message: '',
    status: '',
    isOn: false,
  });

  const showAlert = (message, status) => {
    setAlertVal({ message, status, isOn: true });
  };

  const hideAlert = () => {
    setAlertVal({ message: '', status: '', isOn: false });
  };

  return <AlertContext.Provider value={{ alertVal, showAlert, hideAlert }}>{children}</AlertContext.Provider>;
};

export { AlertProvider, useAlert };
