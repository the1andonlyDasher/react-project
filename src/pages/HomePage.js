import React, { useState } from "react";
import { HeroWrapper } from "../components/hero/HeroWrapper";
import { Services } from "../components/services/Services";
import { Portfolio2 } from "../components/portfolio/Portfolio2";
import { Footer } from "../components/footer/Footer";
import { motion } from "framer-motion";
import ContactForm from "../components/contact/ContactForm";
import Scrollbar from "../components/scrollbar";
import "../js/checkAnim";
import "../js/setBlurry";

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
      onAnimationComplete={() => {
        window.completedAnimation.status = true;
      }}
    ></motion.li>
  );
  return (
    <>
      <motion.ul className="transition">
        {items.map((_, index) => (
          <Item key={index} index={index} />
        ))}
      </motion.ul>
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        onAnimationStart={() => {
          window.setBlurry.is = true;
          setTimeout(() => {
            window.setBlurry.is = false;
            window.scrollTo(0, 0);
          }, 1000);
        }}
        onAnimationEnd={() => {}}
        //transition={{ type: "tween", duration: 1 }}
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
