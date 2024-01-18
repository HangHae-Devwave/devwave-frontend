import { useState } from 'react';

const useInput = () => {
  // state
  const [value, setValue] = useState('');

  // handler
  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const clearHandler = () => {
    setValue('');
  };

  return [value, onChangeHandler, clearHandler];
};

export default useInput;
