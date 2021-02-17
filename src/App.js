import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/game" render={() => <Main />} />
        <Route path="/" exact render={() => <Settings />} />
      </Switch>
      <Footer />
    </>
  );
}

export default connect(null, null)(App);
