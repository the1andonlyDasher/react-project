// src/App.js

import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { Window } from "./js/webGL";
import { DomGL } from "./js/DomGL";
export default function App() {
  const loader = document.querySelector(".loader");

  // if you want to show the loader when React loads data again
  const showLoader = () => loader.classList.remove("loader--hide");

  const hideLoader = () => loader.classList.add("loader--hide");

  const Loader = ({ hideLoader }) => {
    useEffect(hideLoader, []);
    return;
  };
  return (
    <>
      <Router>
        <Window />
        <Navbar />
        <DomGL>
          <AnimatedRoutes />
        </DomGL>
      </Router>
      <Loader hideLoader={hideLoader} showLoader={showLoader}></Loader>
    </>
  );
}
