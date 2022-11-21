import React, { useState, lazy } from "react";
import { motion } from "framer-motion";
// import ContactForm from "../components/contact/ContactForm";
import Scrollbar from "../components/scrollbar";
import Navbar from "../components/navbar";

const ContactForm = lazy(() => import("../components/contact/ContactForm"));
const HeroWrapper = lazy(() => import("../components/hero/HeroWrapper"));
const Services = lazy(() => import("../components/services/Services"));
const Portfolio2 = lazy(() => import("../components/portfolio/Portfolio2"));
const Footer = lazy(() => import("../components/footer/Footer"));

export default function Home_page() {
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const item = {
    hidden: { scaleY: 1 },
    animate: { scaleY: 0 },
    exit: { scaleY: 1 },
  };
  const defaultItems = [...Array(5)];
  const [items] = useState(defaultItems);
  const Item = ({ index }) => (
    <motion.li
      key={index}
      variants={item}
      initial="hidden"
      animate="animate"
      exit="exit"
      transition={{ type: "tween", duration: 0.75, delay: 0.2 + index * 0.2 }}
    ></motion.li>
  );
  return (
    <>
      <Navbar main={true} />
      {/* <motion.ul className="transition">
        {items.map((_, index) => (
          <Item key={index} index={index} />
        ))}
      </motion.ul> */}
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "tween", duration: 1 }}
        className="main"
      >
        <Scrollbar stiffness={50} restdelta={0.001} damping={20} />
        <HeroWrapper sectionName="Home" id="landing" />
        <Services
          title="Leistungen"
          subtitle="Ihre Werkzeuge für einen souveränen Auftritt"
          id="cards"
          sectionName="Leistungen"
        />
        <Portfolio2
          sectionName="Portfolio"
          id="projects"
          title="Unsere Projekte"
        />
        <ContactForm
          title="Kontakt"
          subtitle="Bringen Sie Ihre Ideen in die Realität"
          id="contact"
          sectionName="Kontakt"
        />
        <Footer />
      </motion.main>
    </>
  );
}
