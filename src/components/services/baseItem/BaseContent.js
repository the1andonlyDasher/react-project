import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
export const BaseContent = ({ title, subtitle, icon, text, fa, lastItem }) => {
  const item = useRef();
  const panel = useRef();
  function goDown() {}
  function handleClick() {
    var sH = panel.current.scrollHeight;
    if (panel.current.style.maxHeight) {
      panel.current.style.maxHeight = null;
      // const aH = document.body.offsetHeight - sH;
      // document.body.style.height = `${aH}px`;
    } else {
      panel.current.style.maxHeight = sH + "px";
      // const nH = document.body.offsetHeight + sH;
      // document.body.style.height = `${nH}px`;
    }
    item.current.querySelector("span svg").classList.toggle("close__toggle");
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
          <div ref={panel} className={lastItem ? "panel last" : "panel"}>
            {lastItem ? (
              <span>
                <a href="#contact">Kontaktieren Sie uns!</a>
              </span>
            ) : (
              <p>{text}</p>
            )}
          </div>
        </div>
        <div className="base__icon">
          {fa ? (
            <FontAwesomeIcon icon={icon} />
          ) : (
            <img src={icon} width="47" height="34" alt="" />
          )}
        </div>
        {lastItem ? (
          <span>
            <a href="#contact">
              <FontAwesomeIcon icon={faChevronDown} />
            </a>
          </span>
        ) : (
          <span onClick={handleClick}>
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        )}
      </div>
    </>
  );
};
