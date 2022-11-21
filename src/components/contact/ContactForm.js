import React, { useRef, useState } from "react";
import { useAnimationControls, motion, sequence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Button } from "../button_noLink";
const img = require("../../images/button.webp");

const ContactForm = ({ title, subtitle, sectionName, id }) => {
  const controlsForm = useAnimationControls();
  const messageControls = useAnimationControls();
  const formVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 0 },
    exit: { opacity: 0 },
  };
  const messageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, display: "flex" },
    exit: { opacity: 0 },
  };
  const sequence = async () => {
    await controlsForm.start("animate");
    return await messageControls.start("animate");
  };
  const form = useRef();
  const [status, setStatus] = useState("Abschicken");
  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sendet...");
    emailjs
      .sendForm(
        "service_svvit4h",
        "template_t5ebzez",
        form.current,
        "lPNDYXO-4WREGEgyS"
      )
      .then(
        (result) => {
          setStatus("Versandt!");
          setTimeout(() => {
            setStatus("Abschicken");
          }, 2000);
          sequence();
        },
        (error) => {
          setStatus("Ups...");
          alert("Konnte Nachricht nicht versenden...");
        }
      );
  };
  return (
    <section data-section-name={sectionName} id={id}>
      <div className="__s__b">
        <h2 data-before={title}>{title}</h2>
        <h3>{subtitle}</h3>
        <motion.div
          className="thanks__message"
          variants={messageVariants}
          initial="initial"
          animate={messageControls}
          exit="exit"
        >
          <h4>Vielen Dank!</h4>
          <h3>Wir werden Ihre Anfrage bearbeiten und Sie kontaktieren.</h3>
        </motion.div>
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          variants={formVariants}
          initial="initial"
          animate={controlsForm}
          exit="exit"
        >
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" required />
          </div>
          <div>
            <label htmlFor="email">E-Mail:</label>
            <input
              type="email"
              id="email"
              required
              aria-describedby="emailHelp"
            />
          </div>
          <div>
            <label htmlFor="message">Nachricht:</label>
            <textarea id="message" required rows="5" />
          </div>
          {/* <WebGLButton type={"submit"} src={img} text="Los geht's!" /> */}
          <Button noLink={true} type="submit" gl={true} to="/" inner={true}>
            {status}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactForm;
