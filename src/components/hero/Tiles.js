import React, { useRef } from "react";
import { motion, useAnimation, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { icons } from "./icons";
import { mainTexts } from "./mainTexts";
import { useEffect } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const bg = require("../../images/bg.png");

const Tile = ({ i, id, children, mainText, fallbacksrc }) => {
  const tileVariants = {
    start: { scale: 0, opacity: 0 },
    entered: {
      scale: 1,
      opacity: 1,
    },
    exit: { scale: 0, opacity: 0 },
    hover: { scale: 1.2, zIndex: 10 },
    hoverEnd: { scale: 1, zIndex: 1 },
  };
  const tileControls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0 });

  useEffect(() => {
    setTimeout(() => {
      tileControls.start("entered");
    }, 1500);
    if (inView) {
      tileControls.start("entered");
    }

    // console.log(inView, window.completedAnimation.status);
  }, [tileControls, inView]);

  return (
    <motion.div
      ref={ref}
      variants={tileVariants}
      initial="start"
      animate={tileControls}
      exit="exit"
      maintext={mainText}
      fallbacksrc={fallbacksrc}
      id={id}
      style={{ backgroundImage: `url(${bg})` }}
      onError={(e) =>
        e.currentTarget.style.backgroundImage(`url(${fallbacksrc})`)
      }
      onMouseEnter={(e) => {
        tileControls.start("hover");
        document.querySelector("#" + id + "hero").style.display = "block";
        setTimeout(() => {
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
        }, 100);
      }}
      onMouseLeave={() => {
        tileControls.start("hoverEnd");

        setTimeout(() => {
          document.querySelector("#" + id + "hero").style.display = "none";
        }, 300);
        gsap.to(document.querySelector("#" + id + "hero"), {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        setTimeout(() => {
          gsap.to(document.querySelector("#mainHero"), {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }, 100);
      }}
    >
      {children}
    </motion.div>
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
            duration: Math.random() * i,
            delay: Math.random() * i,
          },
        },
      }}
    >
      <FontAwesomeIcon key={i} icon={icons[i]} />
    </Tile>
  );
});

export default function Tiles() {
  const ref = useRef();
  const { scrollXProgress } = useScroll({ container: ref });
  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <>
      <div className="h__scroller__wrapper">
        <motion.div className="p__bar" style={{ scaleX }} />
        <div ref={ref} className="container container__features">
          <div
            style={{ width: defaultItems.length * 150 + "px" }}
            className="horizontal__features"
          >
            {tiles}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="feature-grid-container grid grid--columns">
          <motion.div className="grid feature-grid">{tiles}</motion.div>
        </div>
      </div>
    </>
  );
}
