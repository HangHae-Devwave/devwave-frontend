import React from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const params = useParams();
  console.log(params);
  return <div>Detail</div>;
};

export default React.memo(Detail);
