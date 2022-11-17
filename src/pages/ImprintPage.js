import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Scrollbar from "../components/scrollbar";
import useDOMChange from "../js/pageState";

export default function ImprintPage(props) {
  useEffect(() => {
    state.action();
    console.log(state.toString());
  }, []);
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
  const state = useDOMChange();
  const status = state.toString();
  return (
    <>
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
        <section className="legal">
          {/* <h3>{status}</h3>
          <button onClick={state.action}>change state</button> */}
          <h2>Impressum</h2>
          <h3>Dienstanbieter</h3>
          <p>
            Wicked Hand Design Falko Puchalla, Jens Friedrich GbR 73230
            Kirchheim
          </p>
          <h3>Kontakt</h3>
          <p>
            Telefon: 089/1234567-8 <br></br>
            Telefax: 089/1234567-9 <br></br>
            E-Mail: kontakt@wickedhanddesign.de <br></br>
            Website: www.wickedhanddesign.de <br></br>
            Bei redaktionellen Inhalten: Verantwortlich nach § 55 Abs.2 RStV
            Falko Puchalla 73230 Kirchheim
          </p>
          <h3>Online-Streitbeilegung (OS)</h3>
          <p>
            Online-Streitbeilegung: Die Europäische Kommission stellt eine
            Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter
            https://ec.europa.eu/consumers/odr/ finden. Verbraucher haben die
            Möglichkeit, diese Plattform für die Beilegung ihrer Streitigkeiten
            zu nutzen.
          </p>
          <h3>Haftung- und Ureheberrechtshinweise</h3>
          <p>
            Links auf fremde Webseiten: Inhalte fremder Webseiten, auf die wir
            direkt oder indirekt verweisen, liegen außerhalb unseres
            Verantwortungsbereiches und machen wir uns nicht zu Eigen. Für alle
            Inhalte und insbesondere für Schäden, die aus der Nutzung der in den
            verlinkten Webseiten aufrufbaren Informationen entstehen, haftet
            allein der Anbieter der verlinkten Webseiten. Urheberrechte und
            Markenrechte: Alle auf dieser Website dargestellten Inhalte, wie
            Texte, Fotografien, Grafiken, Marken und Warenzeichen sind durch die
            jeweiligen Schutzrechte (Urheberrechte, Markenrechte) geschützt. Die
            Verwendung, Vervielfältigung usw. unterliegen unseren Rechten oder
            den Rechten der jeweiligen Urheber bzw. Rechteverwalter. Hinweise
            auf Rechtsverstöße: Sollten Sie innerhalb unseres Internetauftritts
            Rechtsverstöße bemerken, bitten wir Sie uns auf diese hinzuweisen.
            Wir werden rechtswidrige Inhalte und Links nach Kenntnisnahme
            unverzüglich entfernen.
          </p>
        </section>
      </motion.main>
    </>
  );
}
