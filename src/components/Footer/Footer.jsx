import React from 'react';
import rssLogo from './rs_school_js.png'; // relative path to image
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
        <i className="fab fa-github logo-git"></i>
        musakius
      </a>
      <a className="link" href="https://rs.school/js/" target="_blank" rel="noopener noreferrer">
        <img className="logo-rss" src={rssLogo} alt="rs_school" />
      </a>
    </footer>
  );
};

export default Footer;
