//  src/compnents/navbar.js

import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { motion, useAnimationControls } from "framer-motion";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../js/setBlurry";
const logo = require("../images/logo.png");

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar(props) {
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
  const [click, setClick] = useState(false);

  const ref = useRef();

  const controls = useAnimationControls();
  const itemControls = useAnimationControls();
  const sequence = async () => {
    await controls.start(!click ? "animate" : "initial");
    return await itemControls.start(!click ? "show" : "hidden");
  };
  const variants_list = {
    initial: {
      opacity: 0,
      clipPath: "polygon(0 100%, 0 100%, 0 100%, 0 100%)",
    },
    animate: {
      opacity: 1,
      clipPath: "polygon(-100% 100%, 100% 100%, 100% 0, -100% -100%)",
      transition: {
        when: click ? "beforeChildren" : "afterChildren",
      },
    },
  };
  const listItem = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  const variants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, delay: 2 },
    exit: { opacity: 0 },
  };

  const handleClick = () => {
    setClick(!click);
    window.setBlurry.is = !click;
    sequence();
    gsap.to(document.querySelector("main").style, {
      opacity: click ? 1 : 0,
      ease: "Expo.easeOut",
    });
  };

  const closeMobileMenu = (e) => {
    window.setBlurry.is = !click;
    sequence();
    gsap.to(document.querySelector("main").style, {
      opacity: click ? 1 : 0,
      ease: "Expo.easeOut",
    });
    const attribute = e.currentTarget.getAttribute("href");
    gsap.to(window, {
      duration: 0.55,
      scrollTo: `${attribute.substring(0)}`,
      ease: "Expo.easeOut",
    });
    setClick(!click);
  };

  const defaultItems = [...Array(4)];
  const texts = ["Home", "Leistungen", "Portfolio", "Kontakt"];
  const links = ["#landing", "#cards", "#projects", "#contact"];
  const [items] = useState(defaultItems);
  const Item = ({
    index,
    dtl,
    to,
    pageTarget,
    className,
    text,
    scroll,
    animate,
  }) =>
    animate ? (
      <motion.li
        key={index}
        variants={listItem}
        initial="hidden"
        animate={itemControls}
        transition={{ type: "tween", duration: 0.25, delay: 0.2 + index * 0.2 }}
        className="navItem"
      >
        <div
          data-link-text={dtl}
          scroll={`${scroll ? true : false}`}
          href={to}
          data-attribute-page-target={pageTarget}
          className={className}
          onClick={closeMobileMenu}
        >
          {text}
        </div>
      </motion.li>
    ) : (
      <li key={index} className="navItem">
        <div
          data-link-text={dtl}
          scroll={`${scroll ? true : false}`}
          href={to}
          data-attribute-page-target={pageTarget}
          className={className}
          onClick={closeMobileMenu}
        >
          {text}
        </div>
      </li>
    );

  return (
    <>
      <motion.nav
        {...props}
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
          <div id="burgermenu" onClick={handleClick}>
            <div className="opened">
              <div></div>
              <div></div>
            </div>
            <div className="closed">
              <div></div>
              <div></div>
            </div>
          </div>
          <ul className="nav-items-desktop">
            {texts.map((_, index, item) => (
              <Item
                animate={false}
                key={index}
                index={index}
                scroll={true}
                to={links[index]}
                text={item[index]}
                pageTarget={item[index]}
                dtl={item[index]}
                onClick={closeMobileMenu}
                className="nav-link"
              />
            ))}
          </ul>
          <motion.ul
            ref={ref}
            variants={variants_list}
            initial="initial"
            animate={controls}
            className="nav-items-mobile"
          >
            {texts.map((_, index, item) => (
              <Item
                animate={true}
                key={index}
                index={index}
                scroll={true}
                to={links[index]}
                text={item[index]}
                pageTarget={item[index]}
                dtl={item[index]}
                onClick={closeMobileMenu}
                className="nav-link"
              />
            ))}
          </motion.ul>
        </div>
      </motion.nav>
    </>
  );
}
