//  src/compnents/navbar.js

import React, { createRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { motion, useAnimationControls } from "framer-motion";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../js/setBlurry";
import { DomGL } from "../js/DomGL";
const logo = require("../images/logo.png");

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
    //--------------------------------------------------------------------------------------- Mutation Observer
    // var observer = new MutationObserver(function (mutations) {
    //   mutations.forEach(function (mutation) {
    //     setChanged(true);
    //     console.log(changed);
    //   });
    // });

    // var config = { attributes: false, childList: true, characterData: false };

    // observer.observe(document.getElementById("data-scroll-content"), config);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const [isShrunk, setShrunk] = useState(false);
  const [changed, setChanged] = useState(false);
  const [click, setClick] = useState(false);
  const ref = React.createRef();
  const handleClick = () => {
    setClick(!click);
    window.setBlurry.is = !click;
    ref.current.style.opacity = 0;
  };
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
  const controls = useAnimationControls();
  const variants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, delay: 2 },
    exit: { opacity: 0 },
  };
  const menuVariants = {
    initial: {
      clipPath: "clip-path: polygon(0 100%, 0 100%, 0 100%, 0 100%)",
      filter: "sepia(1) hue-rotate(0deg)",
    },
    animate: {
      filter: [
        "sepia(1) hue-rotate(45deg)",
        "sepia(1) hue-rotate(90deg)",
        "sepia(1) hue-rotate(45deg)",
        "sepia(1) hue-rotate(65deg)",
        "sepia(1) hue-rotate(40deg)",
        "sepia(1) hue-rotate(55deg)",
        "sepia(1) hue-rotate(85deg)",
        "sepia(1) hue-rotate(55deg)",
        "sepia(1) hue-rotate(45deg)",
        "sepia(1) hue-rotate(77deg)",
        "sepia(1) hue-rotate(42deg)",
        "sepia(1) hue-rotate(65deg)",
        "sepia(1) hue-rotate(95deg)",
        "sepia(1) hue-rotate(45deg)",
        "sepia(1) hue-rotate(57deg)",
        "sepia(1) hue-rotate(63deg)",
        "sepia(1) hue-rotate(55deg)",
        "sepia(1) hue-rotate(75deg)",
        "sepia(0) hue-rotate(0deg)",
      ],
      clipPath: [
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 8% 100%, 7% 13%, 39% 13%, 40% 76%, 7% 76%, 8% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 25% 100%, 26% 0, 100% 0, 100% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 8% 100%, 7% 13%, 39% 13%, 40% 76%, 7% 76%, 8% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        " polygon( 0% 0%, 0% 100%, 23% 100%, 23% 33%, 100% 33%, 100% 100%, 25% 100%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        " polygon( 0% 0%, 0% 100%, 0 100%, 0 25%, 100% 25%, 100% 75%, 0 75%, 0 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        " polygon( 0% 0%, 0% 100%, 25% 100%, 25% 0, 74% 0, 75% 100%, 26% 100%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 8% 100%, 7% 13%, 39% 13%, 40% 76%, 7% 76%, 8% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 400%, 400% 300%, 400% 0, -100% -100%)",
      ],
    },
    exit: {
      clipPath: [
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 8% 100%, 7% 13%, 39% 13%, 40% 76%, 7% 76%, 8% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 25% 100%, 26% 0, 100% 0, 100% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 8% 100%, 7% 13%, 39% 13%, 40% 76%, 7% 76%, 8% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        " polygon( 0% 0%, 0% 100%, 23% 100%, 23% 33%, 100% 33%, 100% 100%, 25% 100%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        " polygon( 0% 0%, 0% 100%, 0 100%, 0 25%, 100% 25%, 100% 75%, 0 75%, 0 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        " polygon( 0% 0%, 0% 100%, 25% 100%, 25% 0, 74% 0, 75% 100%, 26% 100%, 25% 100%, 100% 100%, 100% 0% )",
        "polygon(-100% 300%, 400% 300%, 400% 0, -100% -100%)",
        "polygon( 0% 0%, 0% 100%, 8% 100%, 7% 13%, 39% 13%, 40% 76%, 7% 76%, 8% 100%, 100% 100%, 100% 0% )",
        "clip-path: unset",
      ],
    },
  };

  return (
    <>
      <motion.nav
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        className={isShrunk ? "navbar shrunk" : "navbar"}
      >
        <div className="navbar__container">
          <NavLink to="/wicked-hand" className="navbar__logo">
            <img src={logo} alt="" />
          </NavLink>
          <div
            id="burgermenu"
            onClick={handleClick}
            className={click ? "open" : "closed"}
          >
            <motion.div className="opened">
              <div></div>
              <div></div>
            </motion.div>
            <motion.div
              className="closed"
              variants={menuVariants}
              initial="initial"
              animate={controls}
              exit={controls}
              transition={{
                type: "spring",
                velocity: "10",
                stiffness: 1000,
                restSpeed: 0.5,
                duration: 1,
                delay: 1,
              }}
            >
              <div></div>
              <div></div>
            </motion.div>
          </div>
          <ul
            className={click ? "nav-items-desktop active" : "nav-items-desktop"}
          >
            <li className="nav-item">
              <NavLink
                scroll="false"
                data-link-text="Home"
                to={{
                  pathname: "/wicked-hand",
                  // search: "?sort=name",
                  // hash: "#landing",
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
      </motion.nav>
    </>
  );
}
