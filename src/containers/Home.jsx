import React from 'react';
import Button from '../components/Button';

const Home = () => {
  return (
    <div>
      <Button size="medium" primary>
        버튼
      </Button>
    </div>
  );
};

export default React.memo(Home);
