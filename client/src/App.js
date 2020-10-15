import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Routes from './components/routing/Routes';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route component={Routes} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
