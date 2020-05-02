import React from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

const Div = styled.div`
  width: 50%;
  margin: 30px auto;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 150px;
  display: inline-block;
  padding: 8px 11px;
  font-size: 16px;
  border: 0;
  border-radius: 5px;
  background-color: blue;
  color: white;
  cursor: pointer;
`;

const Home = () => {
  const history = useHistory();

  const routeToForm = (e) => {
    history.push('/pizza');
  }
  return (
    <Div>
      <Button onClick={routeToForm}>Pizza?</Button>
    </Div>
  );
}

export default Home;