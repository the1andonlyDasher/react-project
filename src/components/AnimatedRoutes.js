import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Home = lazy(() => import("../pages/HomePage"));
const Footer = lazy(() => import("../components/footer/Footer"));
const Navbar = lazy(() => import("../components/navbar"));
const Imprint = lazy(() => import("../pages/ImprintPage"));
const Data = lazy(() => import("../pages/DataPage"));
const Error = lazy(() => import("../pages/ErrorPage"));
const ContactForm = lazy(() => import("../pages/ContactPage"));
const Portfolio = lazy(() => import("../pages/PortfolioPage"));
const Services = lazy(() => import("../pages/ServicesPage"));


function AnimatedRoutes(props) {
  const location = useLocation();
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          window.scrollTo(0, 0);
        }}
      >
        <Suspense fallback={null}>
        <Navbar main={true} />
        <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: "tween", duration: 1 }}
        className="main"
      >     
          <Routes location={location} key={location.pathname}>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/Leistungen" element={<Services />}></Route>
            <Route exact path="/Portfolio" element={<Portfolio />}></Route>
            <Route exact path="/Kontakt" element={<ContactForm />}></Route>
            <Route exact path="/Datenschutz" element={<Data />}></Route>
            <Route exact path="/Impressum" element={<Imprint />}></Route>
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
          </motion.main>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

export default AnimatedRoutes;
