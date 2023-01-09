import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <h5>Wicked Hand Design © 2022</h5>
        <ul className="footer-links">
          <li>
            <Link
              data-link-text="Impressum"
              className="btn__outline"
              to={"/Impressum"}
            >
              Impressum
            </Link>
          </li>
          <li>
            <Link
              data-link-text="Datenschutz"
              className="btn__outline"
              to={"/Datenschutz"}
            >
              Datenschutz
            </Link>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
