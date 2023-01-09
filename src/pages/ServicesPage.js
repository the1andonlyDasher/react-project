import React, { useState, lazy } from "react";
import { motion } from "framer-motion";
import Scrollbar from "../components/scrollbar";


const Services = lazy(() => import("../components/services/Services"));
const Footer = lazy(() => import("../components/footer/Footer"));

export default function Home_page() {
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
  
      <motion.div
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "tween", duration: 1 }}
        className="main"
      >
        <Scrollbar stiffness={50} restdelta={0.001} damping={20} />
        <Services
          title="Leistungen"
          subtitle="Ihre Werkzeuge für einen souveränen Auftritt"
          id="cards"
          sectionName="Leistungen"
        />
      </motion.div>
    </>
  );
}
