import React, { useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
export const BaseContent = ({ title, subtitle, icon }) => {
  const [triggered, setTrigger] = useState(false);
  const item = useRef();

  function handleClick() {
    var panel = item.current.querySelector(".panel");
    var sH = panel.scrollHeight;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      const aH = document.body.offsetHeight - sH;
      document.body.style.height = `${aH}px`;
    } else {
      panel.style.maxHeight = sH + "px";
      const nH = document.body.offsetHeight + sH;
      document.body.style.height = `${nH}px`;
    }
    item.current.querySelector("svg").classList.toggle("close__toggle");
    //   item.classList.toggle("read");
    //   item.querySelector(".bg-img").classList.toggle("img__read");
    item.current.querySelector("p").classList.toggle("p__read");
    item.current
      .querySelector(".header__wrapper h5")
      .classList.toggle("h5__read");
    if (item.current.querySelector("p").classList.contains("p__read")) {
      function fadeIn() {
        item.current.querySelector("p").classList.add("fade-in");
      }
      setTimeout(fadeIn, 500);
    } else {
      function fadeOut() {
        item.current.querySelector("p").classList.remove("fade-in");
      }
      fadeOut();
    }
  }
  return (
    <>
      <div className="base__content" ref={item}>
        <div className="header__wrapper">
          <h4>{title}</h4>
          <h5>{subtitle}</h5>
          <div className="panel">
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.&nbsp;
            </p>
          </div>
        </div>
        <div className="base__icon">
          <img src={icon} width="47" height="34" alt="" />
        </div>
        <span onClick={handleClick}>
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </div>
    </>
  );
};
