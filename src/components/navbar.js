//  src/compnents/navbar.js

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  useEffect(() => {
    const handler = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 100 ||
            document.documentElement.scrollTop > 100)
        ) {
          return true;
        }
        if (
          isShrunk &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }
        return isShrunk;
      });
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const [isShrunk, setShrunk] = useState(false);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = (e) => {
    const attribute = e.currentTarget.getAttribute("href");
    const el = document.getElementById(`${attribute.substring(2)}`);
    gsap.to(window, {
      duration: 0.55,
      scrollTo: `#${attribute.substring(2)}`,
      ease: "Expo.easeOut",
    });
    setClick(false);
  };

  return (
    <>
      <nav className={isShrunk ? "navbar shrunk" : "navbar"}>
        <div className="navbar__container">
          <NavLink to="/" className="navbar__logo">
            <img src="./logo.png" alt="" />
          </NavLink>
          <div
            id="burgermenu"
            onClick={handleClick}
            className={click ? "open" : "closed"}
          ></div>
          <ul
            className={click ? "nav-items-desktop active" : "nav-items-desktop"}
          >
            <li className="nav-item">
              <NavLink
                scroll="false"
                data-link-text="Home"
                to={{
                  pathname: "/",
                  // search: "?sort=name",
                  hash: "#landing",
                  // state: { fromDashboard: true }
                }}
                data-attribute-page-target="Home"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <div
                scroll="false"
                data-link-text="Leistungen"
                href="/#cards"
                data-attribute-page-target="Leistungen"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Leistungen
              </div>
            </li>
            <li className="nav-item">
              <div
                scroll="true"
                data-link-text="Portfolio"
                href="/#projects"
                data-attribute-page-target="Portfolio"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Portfolio
              </div>
            </li>
            <li className="nav-item">
              <div
                scroll="false"
                data-link-text="Kontakt"
                href="/#contact"
                data-attribute-page-target="Kontakt"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Kontakt
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
