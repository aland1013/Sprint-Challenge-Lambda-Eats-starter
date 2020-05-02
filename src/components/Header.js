import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  text-align: center;
`;

const Header = () => {
  return (
    <Div>
      <Link to='/'>
        Home
      </Link>
    </Div>

  );
}

export default Header;