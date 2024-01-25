import { useState } from 'react';

const useInput = (init = '') => {
  // state
  const [value, setValue] = useState(init);

  // handler
  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  return [value, onChangeHandler];
};

export default useInput;
