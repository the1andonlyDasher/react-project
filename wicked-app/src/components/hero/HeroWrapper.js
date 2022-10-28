import React from "react";
import Hero from "./Hero";
import Tiles from "./Tiles";

export const HeroWrapper = ({ title, subtitle, sectionName, id }) => {
  return (
    <>
      <section data-section-name={sectionName} id={id}>
        <div className="lr__wrapper">
          <div id="left-wrapper">
            <Hero />
          </div>
          <div id="right-wrapper">
            <Tiles />
          </div>
        </div>
      </section>
    </>
  );
};
