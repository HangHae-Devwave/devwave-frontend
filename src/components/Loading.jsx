import React from 'react';
import spinner from '../assets/loading-spinner.gif';
import styled from 'styled-components';

const Loading = () => {
  return (
    <Spinner>
      <img src={spinner} alt="" />
    </Spinner>
  );
};

const Spinner = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 40px;
  }
`;

export default Loading;
