import React, { useEffect, useState } from "react";
import { BaseContent } from "./BaseContent";
import { BaseCover } from "./BaseCover";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const BaseItem = ({ title, subtitle, backgroundImage, icon, text }) => {
  const variants = {
    start: {
      opacity: 0,
      filter: "sepia(0) hue-rotate(0deg)",
    },
    entered: {
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
    },
    exit: {
      clipPath: "polygon(-100% 100%, 100% 100%, 100% 0, -100% -100%)",
    },
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  useEffect(() => {
    if (inView) {
      controls.start("entered");
    }
  }, [inView, controls]);
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="start"
      animate={controls}
      exit="exit"
      transition={{
        type: "spring",
        velocity: "10",
        stiffness: 1000,
        restSpeed: 0.5,
        delay: (Math.random() + 0.1) * 1,
        duration: (Math.random() + 0.1) * 1,
      }}
      className="base__item"
    >
      <BaseContent title={title} subtitle={subtitle} icon={icon} text={text} />
      <BaseCover
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
      />
    </motion.div>
  );
};
