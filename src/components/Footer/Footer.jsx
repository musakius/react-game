import React from 'react';
/* import { ReactComponent as RSschool } from '~public/rs_school'; */
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <span>&#169; 2021</span>
      <div>
        footer-user
      </div>
      <a href='https://rs.school/js/' target='_blank' rel='noopener noreferrer'>
        {/* <RSschool /> */}
      </a>
    </footer>
  );
};

export default Footer;
