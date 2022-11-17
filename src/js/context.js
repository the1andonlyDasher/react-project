import React, { useState, createContext, useContext, useRef } from "react";
import { Button } from "../components/button";

const WebGLStateContext = createContext();
const WebGLDispatchContext = createContext();

export const WebGLProvider = ({ children }) => {
  const [state, dispatch] = useState([]);

  return (
    <WebGLStateContext.Provider value={state}>
      <WebGLDispatchContext.Provider value={dispatch}>
        {children}
      </WebGLDispatchContext.Provider>
    </WebGLStateContext.Provider>
  );
};

export function useWebGLState() {
  const context = useContext(WebGLStateContext);
  if (context === undefined) {
    throw new Error("useWebGLState must be used within a WebGLProvider");
  }
  return context;
}

export function useWebGLDispatch() {
  const context = useContext(WebGLDispatchContext);
  if (context === undefined) {
    throw new Error("useWebGLDispatch must be used within an WebGLProvider");
  }
  return context;
}

export const WebGLButton = (props) => {
  const ref = useRef();
  const dispatch = useWebGLDispatch();
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
    dispatch((images) => [...images, { props: ref.current }]);
  };

  return (
    <Button type={props.type}>
      <img
        alt=""
        className="btn__primary"
        src={props.src}
        ref={ref}
        onLoad={handleLoad}
        style={{
          opacity: loaded ? 0 : 1,
          position: "absolute",
        }}
      />
      {props.text}
    </Button>
  );
};
