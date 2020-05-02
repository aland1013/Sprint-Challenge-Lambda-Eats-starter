import React from "react";
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <Header />
      <Route path="/">
        <Home />
      </Route>
    </>
  );
};
export default App;
