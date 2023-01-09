import React from "react";
import { motion, useCycle } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BaseCover = ({ title, subtitle, backgroundImage, fa }) => {
  const [animate, cycle] = useCycle(
    {
      filter: [
        "sepia(1) hue-rotate(45deg)",
        `greyscale(${Math.random()})`,
        "sepia(1) hue-rotate(40deg)",
        "sepia(0) hue-rotate(55deg)",
        "sepia(1) hue-rotate(85deg)",
        `greyscale(${Math.random()})`,
        "sepia(0) hue-rotate(45deg)",
        "sepia(1) hue-rotate(77deg)",
        "sepia(0) hue-rotate(0deg)",
      ],
      clipPath: [
        "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
        "polygon(0% 100%, 100% 100%, 100% 90%, 0% 90%, 0% 81%, 100% 81%, 100% 70%, 0% 70%, 1% 38%, 100% 38%, 100% 26%, 0% 26%, 0% 16%, 100% 16%, 100% 10%, 0% 10%)",
        "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
        "polygon(0% 100%, 100% 100%, 100% 50%, 0% 50%, 0% 91%, 100% 91%, 100% 66%, 0% 66%, 1% 22%, 100% 22%, 100% 26%, 0% 26%, 0% 11%, 100% 11%, 100% 10%, 0% 10%)",
        "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
        "polygon(0% 100%, 100% 100%, 100% 550%, 0% 55%, 0% 77%, 100% 77%, 100% 70%, 0% 70%, 1% 45%, 100% 45%, 100% 26%, 0% 26%, 0% 51%, 100% 51%, 100% 5%, 0% 5%)",
        "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
        "polygon(0% 100%, 100% 100%, 100% 90%, 0% 90%, 0% 81%, 100% 81%, 100% 70%, 0% 70%, 1% 38%, 100% 38%, 100% 26%, 0% 26%, 0% 16%, 100% 16%, 100% 10%, 0% 10%)",
        "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
      ],

    },
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

    }
  );
  const variants = {
    start: { opacity: 1 },
    entered: { opacity: 1 },
    exit: { opacity: 0 },
    hover: {},
    hoverEnd: {},
  };
  return (
    <>
      <motion.div
        className="base__cover"
        onHoverStart={cycle}
        onHoverEnd={cycle}
      >
        <motion.div
          className="inner"
          variants={variants}
          animate={animate}
          transition={{
            type: "spring",
            velocity: "10",
            stiffness: 1000,
            restSpeed: 0.5,
            duration: (Math.random() + 0.1) * 0.5,
          }}
        >
          {fa ? (
            <div className="base__icon-bg">
              <FontAwesomeIcon icon={backgroundImage} />
            </div>
          ) : (
            <div
              className="base__icon-bg"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>
          )}

          <h4>{title}</h4>
          <h5>{subtitle}</h5>
        </motion.div>
      </motion.div>
    </>
  );
};
