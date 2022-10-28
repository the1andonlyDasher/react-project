import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ImprintPage() {
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1, delay: 1, duration: 1 },
    exit: { opacity: 1 },
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
        transition={{ type: "tween", duration: 1 }}
        onAnimationStart={() => {
          window.setBlurry.is = true;
          setTimeout(() => {
            window.setBlurry.is = false;
          }, 2000);
        }}
      >
        <section>
          <h2>Impressum</h2>
          <h3>Untertitel</h3>
          <p>
            Anbieter: Max Mustermann Musterstraße 1 80999 München Kontakt:
            Telefon: 089/1234567-8 Telefax: 089/1234567-9 E-Mail:
            mail@mustermann.de Website: www.mustermann.de Bei redaktionellen
            Inhalten: Verantwortlich nach § 55 Abs.2 RStV Moritz Schreiberling
            Musterstraße 2 80999 München
          </p>
        </section>
      </motion.main>
    </>
  );
}
