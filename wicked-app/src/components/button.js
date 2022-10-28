import React from "react";
import { Link } from "react-router-dom";

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
  dl,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to={to} className="btn-mobile">
      <button
        data-link-text={dl}
        className={`${
          gl ? "btn" : "no-btn"
        } ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
