//  src/components/home.js
import React from "react";
import { BaseItem } from "./baseItem/BaseItem";
import g7 from "../../images/Gruppe_7.svg"
import g1 from "../../images/Gruppe_1.svg"
import g3 from "../../images/Gruppe_3.svg"
import g6 from "../../images/Gruppe_6.svg"

export const Services = ({ title, subtitle, sectionName, id }) => {
  return (
    <>
      <section data-section-name={sectionName} id={id}>
        <h2 data-before={title}>{title}</h2>
        <h3>{subtitle}</h3>
        <div className="base__list">
          <BaseItem
            title="Webdesign"
            subtitle="Ihre digitale Visitenkarte"
            backgroundImage={g3}
            icon={g3}
          />
          <BaseItem
            title="Branding"
            subtitle="Das Gesicht ihres Unternehmens"
            backgroundImage={g6}
            icon={g6}
          />
          <BaseItem
            title="Printdesign"
            subtitle="Marketing - maßgeschneidert"
            backgroundImage={g1}
            icon={g1}
          />
          <BaseItem
            title="IT-Service"
            subtitle="Optimale Vernetzung"
            backgroundImage={g7}
            icon={g7}
          />
        </div>
      </section>
    </>
  );
};
