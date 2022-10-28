import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { images } from "./images";
import { icons } from "./icons";
import { useEffect } from "react";
import "../../js/checkAnim";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Tile = ({ i, children }) => {
  const tileVariants = {
    start: { scale: 0, opacity: 0 },
    entered: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        scale: {
          duration: 0.75,
          delay: i * 1.5,
        },
      },
    },
    exit: { scale: 0, opacity: 0 },
    hover: { scale: 1.2 },
    hoverEnd: { scale: 1 },
  };
  const tileControls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0 });
  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      tileControls.start("entered");
      setVisibility(true);
    }, 1500);
    if (inView && window.completedAnimation.status) {
      tileControls.start("entered");
    }

    // console.log(inView, window.completedAnimation.status);
  }, [tileControls, inView]);

  return (
    <motion.button
      ref={ref}
      variants={tileVariants}
      initial="start"
      animate={tileControls}
      exit="exit"
      style={{ backgroundImage: `url(${i})` }}
      onMouseEnter={() => tileControls.start("hover")}
      onMouseLeave={() => tileControls.start("hoverEnd")}
    >
      {children}
    </motion.button>
  );
};

const tiles = images.map((value, i) => {
  const iconNames = icons[i];
  return (
    <Tile key={value + i} id={value} i={value}>
      <FontAwesomeIcon key={iconNames} icon={iconNames} />
    </Tile>
  );
});

export default function Tiles() {
  return (
    <>
      <div className="container">
        <div className="feature-grid-container grid grid--columns">
          <motion.div
            className="grid feature-grid"
            variants={{ animate: { transition: { staggerChildren: 0.5 } } }}
          >
            {tiles}
          </motion.div>
        </div>
      </div>
      {/* <div className="nav__tiles">
        <div>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <div>Leistungen</div>
        <div>Kontakt</div>
        <div>Portfolio</div>
      </div> */}
    </>
  );
}
