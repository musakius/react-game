import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact render={() => <Main />} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
