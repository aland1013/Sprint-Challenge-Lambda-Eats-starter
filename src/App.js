import React from "react";
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import Form from './components/Form';

const H1 = styled.h1`
text-align: center;
`;

const App = () => {
  return (
    <>
      <H1>Lambda Eats</H1>
      <Header />
      <Switch>
        <Route path="/pizza">
          <Form />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      
    </>
  );
};
export default App;
