import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = ({ title, subtitle, sectionName, id }) => {
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
          alert("message sent succesfully");
        },
        (error) => {
          setStatus("Ups...");
          alert("failed to send message");
        }
      );
  };
  return (
    <section data-section-name={sectionName} id={id}>
      <h2 data-before={title}>{title}</h2>
      <h3>{subtitle}</h3>
      <form ref={form} onSubmit={sendEmail}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            aria-describedby="emailHelp"
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" required rows="5" />
        </div>
        <button className="btn btn__primary btn__medium" type="submit">
          {status}
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
