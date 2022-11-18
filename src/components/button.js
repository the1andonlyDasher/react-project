import React from "react";
import { Link } from "react-router-dom";
import { motion, useAnimationControls, useCycle } from "framer-motion";

const STYLES = ["btn__primary", "btn__outline"];
const SIZES = ["btn__medium", "btn__large"];

export const Button = ({
  gl,
  to,
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  inner,
  dl,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const controls = useAnimationControls();
  const controlsInner = useAnimationControls();

  const variantsButton = {
    initial: {
      boxShadow: [
        "inset 0 0 0 3px hsla(144, 100%, 23%, 0)",
        "inset 0 0 0 2px hsla(144, 100%, 63%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 83%, 1)",
        "inset 0 0 0 3px hsla(144, 100%, 63%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 43%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 63%, 1)",
        "inset 0 0 0 1px hsla(144, 100%, 63%, 1)",
        "inset 0 0 0 1px hsla(144, 100%, 43%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 63%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 83%, 1)",
        "inset 0 0 0 5px hsla(144, 100%, 23%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 23%, 1)",
        "inset 0 0 0 5px hsla(144, 100%, 43%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 63%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 83%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 23%, 1)",
        "inset 0 0 0 1px hsla(144, 100%, 83%, 1)",
        "inset 0 0 0 1px hsla(144, 100%, 23%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 23%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 63%, 0)",
      ],
      transform: [
        "translate(0px, 0px)",
        "translate(-10px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, 10px)",
        "translate(0px, 0px)",
        "translate(10px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, -10px)",
        "translate(0px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, 0px)",
        "translate(10px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, 10px)",
        "translate(-10px, 10px)",
        "translate(0px, 0px)",
      ],
      clipPath: [
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(100% 66%, 0% 66%, 0% 100%, 100% 100%, 100% 44%, 0% 44%, 0% 0%, 100% 0%)",
        "polygon(100% 66%, 0% 66%, 0% 100%, 100% 100%, 100% 44%, 0% 44%, 0% 0%, 100% 0%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 100%, 100% 100%, 100% 88%, 0% 88%, 0% 65%, 100% 65%, 100% 22%, 0% 22%, 0% 15%, 100% 15%, 100% 0%, 0% 0%)",
        "polygon(0% 100%, 100% 100%, 100% 88%, 0% 88%, 0% 65%, 100% 65%, 100% 22%, 0% 22%, 0% 15%, 100% 15%, 100% 0%, 0% 0%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(100% 66%, 0% 66%, 0% 100%, 100% 100%, 100% 44%, 0% 44%, 0% 0%, 100% 0%)",
        "polygon(100% 66%, 0% 66%, 0% 100%, 100% 100%, 100% 44%, 0% 44%, 0% 0%, 100% 0%)",
        "polygon(100% 66%, 0% 66%, 0% 100%, 100% 100%, 100% 44%, 0% 44%, 0% 0%, 100% 0%)",
        "polygon(100% 66%, 0% 66%, 0% 100%, 100% 100%, 100% 44%, 0% 44%, 0% 0%, 100% 0%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 100%, 100% 100%, 100% 88%, 0% 88%, 0% 65%, 100% 65%, 100% 22%, 0% 22%, 0% 15%, 100% 15%, 100% 0%, 0% 0%)",
        "polygon(0% 100%, 100% 100%, 100% 88%, 0% 88%, 0% 65%, 100% 65%, 100% 22%, 0% 22%, 0% 15%, 100% 15%, 100% 0%, 0% 0%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ],
      transition: {
        type: "spring",
        velocity: "10",
        stiffness: 1000,
        repeat: 0,
        restSpeed: 0.5,
        duration: (Math.random() + 0.1) * 0.5,
      },
    },
    animate: {
      boxShadow: [
        "inset 0 0 0 3px hsla(144, 100%, 23%, 0)",
        "inset 0 0 0 2px hsla(144, 100%, 63%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 83%, 1)",
        "inset 0 0 0 3px hsla(144, 100%, 63%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 43%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 63%, 1)",
        "inset 0 0 0 1px hsla(144, 100%, 63%, 1)",
        "inset 0 0 0 1px hsla(144, 100%, 43%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 63%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 83%, 1)",
        "inset 0 0 0 5px hsla(144, 100%, 23%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 23%, 1)",
        "inset 0 0 0 5px hsla(144, 100%, 43%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 63%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 83%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 23%, 1)",
        "inset 0 0 0 1px hsla(144, 100%, 83%, 1)",
        "inset 0 0 0 1px hsla(144, 100%, 23%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 23%, 1)",
        "inset 0 0 0 2px hsla(144, 100%, 63%, 0)",
      ],
      transform: [
        "translate(0px, 0px)",
        "translate(-2px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, 10px)",
        "translate(0px, 0px)",
        "translate(10px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, -5px)",
        "translate(0px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, 0px)",
        "translate(2px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, 0px)",
        "translate(0px, 10px)",
        "translate(-5px, 10px)",
        "translate(0px, 0px)",
      ],
      clipPath: [
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(100% 66%, 0% 66%, 0% 100%, 100% 100%, 100% 44%, 0% 44%, 0% 0%, 100% 0%)",
        "polygon(100% 66%, 0% 66%, 0% 100%, 100% 100%, 100% 44%, 0% 44%, 0% 0%, 100% 0%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 100%, 100% 100%, 100% 88%, 0% 88%, 0% 65%, 100% 65%, 100% 22%, 0% 22%, 0% 15%, 100% 15%, 100% 0%, 0% 0%)",
        "polygon(0% 100%, 100% 100%, 100% 88%, 0% 88%, 0% 65%, 100% 65%, 100% 22%, 0% 22%, 0% 15%, 100% 15%, 100% 0%, 0% 0%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(100% 66%, 0% 66%, 0% 100%, 100% 100%, 100% 44%, 0% 44%, 0% 0%, 100% 0%)",
        "polygon(100% 66%, 0% 66%, 0% 100%, 100% 100%, 100% 44%, 0% 44%, 0% 0%, 100% 0%)",
        "polygon(100% 66%, 0% 66%, 0% 100%, 100% 100%, 100% 44%, 0% 44%, 0% 0%, 100% 0%)",
        "polygon(100% 66%, 0% 66%, 0% 100%, 100% 100%, 100% 44%, 0% 44%, 0% 0%, 100% 0%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 100%, 100% 100%, 100% 88%, 0% 88%, 0% 65%, 100% 65%, 100% 22%, 0% 22%, 0% 15%, 100% 15%, 100% 0%, 0% 0%)",
        "polygon(0% 100%, 100% 100%, 100% 88%, 0% 88%, 0% 65%, 100% 65%, 100% 22%, 0% 22%, 0% 15%, 100% 15%, 100% 0%, 0% 0%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ],
      transition: {
        type: "spring",
        velocity: "100",
        stiffness: 1000,
        repeat: Infinity,
        repeatType: "mirror",
        restSpeed: 0.5,
        repeatDelay: Math.random() + 0.25,
        duration: Math.random(),
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const [animate, cycle] = useCycle(
    {
      backgroundColor: "hsla(144, 100%, 63%, 1)",
      boxShadow: "inset 0 0 0 0 black",
    },
    {
      backgroundColor: "hsla(144, 100%, 43%, 0)",
      boxShadow: "inset 0 0 0 2px hsla(144, 100%, 63%, 1)",
    }
  );
  return (
    <Link to={to} className="btn-mobile">
      <motion.button
        animate={inner ? animate : undefined}
        onHoverStart={() => {
          controlsInner.start("animate");
          cycle();
        }}
        onHoverEnd={() => {
          cycle();
          controlsInner.start("initial");
        }}
        transition={{
          type: "tween",
          duration: 0.5,
        }}
        data-link-text={dl}
        className={`${
          gl ? "btn" : "no-btn"
        } ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
        {inner ? (
          <motion.div
            variants={variantsButton}
            initial={"initial"}
            animate={controlsInner}
            onHoverStart={() => {}}
            onHoverEnd={() => {}}
            className="btn-inner"
          >
            {children}
          </motion.div>
        ) : null}
      </motion.button>
    </Link>
  );
};
