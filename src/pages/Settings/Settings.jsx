import React from 'react';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import './Settings.scss';

const Settings = ({isOpenGame}) => {

  if(!isOpenGame) return <Redirect to='/game'/>

  return (
    <main className="main">
      Settings
    </main>
  );
};

const mapStateToProps = ({isOpenGame}) => {
  return {isOpenGame};
};

export default connect(mapStateToProps)(Settings);
