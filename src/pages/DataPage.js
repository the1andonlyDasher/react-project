import React from "react";
import { motion } from "framer-motion";
import Scrollbar from "../components/scrollbar.js";

export default function DataPage() {
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
        <Scrollbar stiffness={50} restdelta={0.001} damping={20} />
        <section>
          <h2>Datenschutz</h2>
          <h3>Datenverwertung & Cookies</h3>
          <p>
            Für die Besucher von "Wicked Hand Design" verwenden wir keine
            Cookies und erheben keine personenbezogenen Daten.
          </p>
          <ul className="legal-list">
            <li>Es werden keine persönlichen Daten erhoben</li>
            <li>Es werden keine persönlichen Daten gespeichert</li>
            <li>Es weredn keine Informationen an Werbefimen weitergegeben</li>
            <li>
              Es werden keinbe Informationen über persönliche und
              verhaltensbezogene Trends gesammelt und ausgewertet
            </li>
          </ul>
        </section>

    </>
  );
}
