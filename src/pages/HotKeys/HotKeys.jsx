import React from 'react';
import {Link} from 'react-router-dom';
import './HotKeys.scss';

const HotKeys = ({styleApp}) => {
  return (
    <main className="main main-hot-keys">
      <h1 className="title">Hot Keys</h1>
      <div className="container">
        <div className="content">
          <div className="block d-flex w-100 justify-content-between align-items-center">
            <h4>move up</h4>
            <button type="button" className="btn btn-primary">
              &#8593;
            </button>
          </div>
          <div className="block d-flex w-100 justify-content-between align-items-center">
            <h4>move down</h4>
            <button type="button" className="btn btn-primary">
              &#8595;
            </button>
          </div>
          <div className="block d-flex w-100 justify-content-between align-items-center">
            <h4>move right</h4>
            <button type="button" className="btn btn-primary">
              &#8594;
            </button>
          </div>
          <div className="block d-flex w-100 justify-content-between align-items-center">
            <h4>move left</h4>
            <button type="button" className="btn btn-primary">
              &#8592;
            </button>
          </div>
          <div className="block d-flex w-100 justify-content-between align-items-center">
            <h4>add symbol</h4>
            <button type="button" className="btn btn-primary">
              Enter
            </button>
          </div>
          <div className="block d-flex w-100 justify-content-between align-items-center">
            <h4>Lose focus</h4>
            <button type="button" className="btn btn-primary">
              Esc
            </button>
          </div>
        </div>
        <div className="content-bottom w-100">
          <Link to="/" className={`btn btn-${styleApp}`}>
            Back
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HotKeys;
