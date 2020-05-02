import React from "react";
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Form from './components/Form';

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
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
