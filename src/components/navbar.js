//  src/compnents/navbar.js

import React, { useEffect, useState, createContext } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { motion, useAnimationControls, useCycle } from "framer-motion";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
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

  const [animateItems, cycleItems] = useCycle({ opacity: 0 }, { opacity: 1 });
  const [animate, cycle] = useCycle(
    {
      filter: [
        "sepia(1) hue-rotate(40deg)",
        `greyscale(${Math.random()})`,
        "sepia(1) hue-rotate(65deg)",
        "sepia(1) hue-rotate(40deg)",
        "sepia(1) hue-rotate(85deg)",
        `greyscale(${Math.random()})`,
        "sepia(0) hue-rotate(45deg)",
        "sepia(1) hue-rotate(77deg)",
        "sepia(0) hue-rotate(0deg)",
      ],
      clipPath: [
        "polygon(0 100%, 0 100%, 0 100%, 0% 100%)",
        "polygon(0% 100%, 100% 100%, 100% 90%, 0% 90%, 0% 81%, 100% 81%, 100% 70%, 0% 70%, 1% 38%, 100% 38%, 100% 26%, 0% 26%, 0% 16%, 100% 16%, 100% 10%, 0% 10%)",
        "polygon(0 100%, 0 100%, 0 100%, 0% 100%)",
        "polygon(0% 100%, 100% 100%, 100% 50%, 0% 50%, 0% 91%, 100% 91%, 100% 66%, 0% 66%, 1% 22%, 100% 22%, 100% 26%, 0% 26%, 0% 11%, 100% 11%, 100% 10%, 0% 10%)",
        "polygon(0 100%, 0 100%, 0 100%, 0% 100%)",
        "polygon(0% 100%, 100% 100%, 100% 550%, 0% 55%, 0% 77%, 100% 77%, 100% 70%, 0% 70%, 1% 45%, 100% 45%, 100% 26%, 0% 26%, 0% 51%, 100% 51%, 100% 5%, 0% 5%)",
        "polygon(0 100%, 0 100%, 0 100%, 0% 100%)",
        "polygon(0% 100%, 100% 100%, 100% 90%, 0% 90%, 0% 81%, 100% 81%, 100% 70%, 0% 70%, 1% 38%, 100% 38%, 100% 26%, 0% 26%, 0% 16%, 100% 16%, 100% 10%, 0% 10%)",
        "polygon(0 100%, 0 100%, 0 100%, 0% 100%)",
      ],
    },
    {
      opacity: 1,
      filter: [
        "sepia(1) hue-rotate(45deg)",
        `greyscale(${Math.random()})`,
        "sepia(1) hue-rotate(45deg)",
        `greyscale(${Math.random()})`,
        "sepia(1) hue-rotate(40deg)",
        "sepia(0) hue-rotate(55deg)",
        "sepia(1) hue-rotate(40deg)",
        `greyscale(${Math.random()})`,
        "sepia(1) hue-rotate(85deg)",
        "sepia(0) hue-rotate(55deg)",
        "sepia(1) hue-rotate(65deg)",
        "sepia(1) hue-rotate(40deg)",
        `greyscale(${Math.random()})`,
        "sepia(1) hue-rotate(65deg)",
        "sepia(1) hue-rotate(40deg)",
        "sepia(1) hue-rotate(85deg)",
        `greyscale(${Math.random()})`,
        "sepia(0) hue-rotate(45deg)",
        "sepia(1) hue-rotate(77deg)",
        "sepia(0) hue-rotate(0deg)",
      ],
      clipPath: [
        "polygon(-100% 100%, 100% 100%, 100% 0, -100% -100%)",
        "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 100%, 26% 100%, 25% 100%, 100% 100%, 100% 0%)",
        "polygon(-100% 100%, 100% 100%, 100% 0, -100% -100%)",
        "polygon(0% 0%, 0 45%, 42% 45%, 43% 0, 69% 0, 69% 78%, 41% 78%, 41% 100%, 100% 100%, 100% 0)",
        "polygon(-100% 100%, 100% 100%, 100% 0, -100% -100%)",
        "polygon(0 79%, 0 45%, 41% 45%, 41% 61%, 71% 61%, 70% 0, 41% 0, 41% 100%, 100% 100%, 100% 79%)",
        "polygon(-100% 100%, 100% 100%, 100% 0, -100% -100%)",
        "polygon(100% 67%, 72% 67%, 71% 26%, 54% 26%, 53% 0, 0 0, 0 49%, 42% 49%, 42% 100%, 100% 100%)",
        "polygon(-100% 100%, 100% 100%, 100% 0, -100% -100%)",
        "polygon(49% 49%, 25% 49%, 25% 99%, 25% 25%, 49% 25%, 49% 76%, 0 76%, 0 100%, 100% 100%, 100% 49%)",
        "polygon(-100% 100%, 100% 100%, 100% 0, -100% -100%)",
        "polygon(0 79%, 0 45%, 41% 45%, 41% 61%, 71% 61%, 70% 0, 41% 0, 41% 100%, 100% 100%, 100% 79%)",
        "polygon(-100% 100%, 100% 100%, 100% 0, -100% -100%)",
        "polygon(49% 49%, 25% 49%, 25% 99%, 25% 25%, 49% 25%, 49% 76%, 0 76%, 0 100%, 100% 100%, 100% 49%)",
        "polygon(-100% 100%, 100% 100%, 100% 0, -100% -100%)",
        "polygon(0 79%, 0 45%, 41% 45%, 41% 61%, 71% 61%, 70% 0, 41% 0, 41% 100%, 100% 100%, 100% 79%)",
        "polygon(-100% 100%, 100% 100%, 100% 0, -100% -100%)",
        "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 100%, 26% 100%, 25% 100%, 100% 100%, 100% 0%)",
        "polygon(-100% 100%, 100% 100%, 100% 0, -100% -100%)",
        "polygon(0% 0%, 0 45%, 42% 45%, 43% 0, 69% 0, 69% 78%, 41% 78%, 41% 100%, 100% 100%, 100% 0)",
        "polygon(-100% 100%, 100% 100%, 100% 0, -100% -100%)",
      ],
    }
  );
  const variants_list = {
    start: { opacity: 0 },
    entered: { opacity: 1 },
    exit: { opacity: 0 },
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

  const sequence = async () => {
    if (click) {
      await cycle();
      return await cycleItems();
    } else {
      await cycleItems();
      return await cycle();
    }
  };

  const handleClick = () => {
    setClick(!click);
    sequence();
  };

  const closeMobileMenu = (e) => {
    sequence();
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
        animate={animateItems}
        transition={{ type: "tween", duration: 0.25, delay: 1 + index * 0.2 }}
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
            variants={variants_list}
            initial="start"
            animate={animate}
            transition={{
              type: "spring",
              velocity: "10",
              stiffness: 1000,
              restSpeed: 0.5,
              duration: 0.75,
              delay: click ? 0 : 0.5,
            }}
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
