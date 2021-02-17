import React from 'react';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import './Main.scss';

const Main = ({isOpenGame}) => {

  if(isOpenGame) return <Redirect to='/'/>

  return (
    <main className="main">
      Main
    </main>
  );
};

const mapStateToProps = ({isOpenGame}) => {
  return {isOpenGame};
};


export default connect(mapStateToProps)(Main);
