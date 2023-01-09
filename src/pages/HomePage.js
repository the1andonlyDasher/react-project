import React, { lazy } from "react";

import Scrollbar from "../components/scrollbar";


const HeroWrapper = lazy(() => import("../components/hero/HeroWrapper"));


export default function Home_page() {

  return (
    <>

        <Scrollbar stiffness={50} restdelta={0.001} damping={20} />
        <HeroWrapper sectionName="Home" id="landing" />
   

    </>
  );
}
