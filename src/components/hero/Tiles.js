import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { icons } from "./icons";
import { mainTexts } from "./mainTexts";
import { useEffect } from "react";
import gsap from "gsap";
import "../../js/checkAnim";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const bg = require("../../images/bg.png");

const Tile = ({ i, id, children, mainText }) => {
  const tileVariants = {
    start: { scale: 0, opacity: 0 },
    entered: {
      scale: 1,
      opacity: 1,
    },
    exit: { scale: 0, opacity: 0 },
    hover: { scale: 1.2 },
    hoverEnd: { scale: 1 },
  };
  const tileControls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0 });

  useEffect(() => {
    setTimeout(() => {
      tileControls.start("entered");
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
      maintext={mainText}
      id={id}
      style={{ backgroundImage: `url(${bg})` }}
      onMouseEnter={(e) => {
        tileControls.start("hover");
        gsap.to(document.querySelector("#" + id + "hero"), {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(document.querySelector("#mainHero"), {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }}
      onMouseLeave={() => {
        tileControls.start("hoverEnd");
        gsap.to(document.querySelector("#" + id + "hero"), {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(document.querySelector("#mainHero"), {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }}
    >
      {children}
    </motion.button>
  );
};

const defaultItems = [...Array(8)];

const tiles = defaultItems.map((value, i) => {
  return (
    <Tile
      key={i}
      id={"tile" + i}
      i={value}
      mainText={mainTexts[i]}
      animate={{
        transition: {
          type: "srping",
          scale: {
            duration: 0.75,
            delay: i + 1.5,
          },
        },
      }}
    >
      <FontAwesomeIcon key={i} icon={icons[i]} />
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
    </>
  );
}
