import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer__year">&#169; 2021</span>
      <a
        className="link"
        href="https://github.com/musakius"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-github logoGit"></i>
        musakius
      </a>
      <a className="link" href="https://rs.school/js/" target="_blank" rel="noopener noreferrer">
        <img className="logoRSS" src="https://rs.school/images/rs_school-og.png" alt="rs_school" />
      </a>
    </footer>
  );
};

export default Footer;
