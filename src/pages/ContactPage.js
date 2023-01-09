import React, { lazy } from "react";
import { motion } from "framer-motion";
import Scrollbar from "../components/scrollbar";


const ContactForm = lazy(() => import("../components/contact/ContactForm"));


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
        <ContactForm
          title="Kontakt"
          subtitle="Bringen Sie Ihre Ideen in die Realität"
          id="contact"
          sectionName="Kontakt"
        />
      </motion.div>
    </>
  );
}
