import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ImprintPage from "../pages/ImprintPage";
import DataPage from "../pages/DataPage";
import { AnimatePresence } from "framer-motion";
import ErrorPage from "../pages/ErrorPage";

function AnimatedRoutes(props) {
  const location = useLocation();

  // useEffect(() => {
  //   console.log("glitching!");
  // }, [location]);
  // console.log(window.completedAnimation.status);
  return (
    <>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          window.scrollTo({
            top: 0,
            left: 0,

            //behavior: 'smooth'
          });
        }}
        //initial={false}
      >
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/DataPage" element={<DataPage />}></Route>
          <Route exact path="/ImprintPage" element={<ImprintPage />}></Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default AnimatedRoutes;
