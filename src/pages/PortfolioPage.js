import React, {  lazy } from "react";
import { motion } from "framer-motion";
import Scrollbar from "../components/scrollbar";


const Portfolio2 = lazy(() => import("../components/portfolio/Portfolio2"));


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
        <Portfolio2
          sectionName="Portfolio"
          id="projects"
          title="Unsere Projekte"
        />
      </motion.div>
    </>
  );
}
