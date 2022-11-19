//  src/components/home.js
import React from "react";
import { BaseItem } from "./baseItem/BaseItem";
import { web } from "../../texts/web";
import { brand } from "../../texts/brand";
import { print } from "../../texts/print";
import g7 from "../../images/Gruppe_7.svg";
import g1 from "../../images/Gruppe_1.svg";
import g3 from "../../images/Gruppe_3.svg";
import g6 from "../../images/Gruppe_6.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAllergies,
  faAngleRight,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";

export const Services = ({ title, subtitle, sectionName, id }) => {
  return (
    <>
      <section data-section-name={sectionName} id={id}>
        <div className="__s__b">
          <h2 data-before={title}>{title}</h2>
          <h3>{subtitle}</h3>
          <div className="base__list">
            <BaseItem
              fa={false}
              title="Webdesign"
              subtitle="Ihre digitale Visitenkarte"
              text={web}
              backgroundImage={g3}
              icon={g3}
            />
            <BaseItem
              fa={false}
              title="Branding"
              subtitle="Das Gesicht ihres Unternehmens"
              text={brand}
              backgroundImage={g6}
              icon={g6}
            />
            <BaseItem
              fa={false}
              title="Printdesign"
              text={print}
              subtitle="Marketing - maßgeschneidert"
              backgroundImage={g1}
              icon={g1}
            />
            <BaseItem
              fa={true}
              lastItem={true}
              title=""
              subtitle="Haben Sie ein Projekt?"
              backgroundImage={faHandshake}
              icon={faHandshake}
            />
            {/* <BaseItem
              title="IT-Service"
              subtitle="Optimale Vernetzung"
              backgroundImage={g7}
              icon={g7}
            /> */}
          </div>
        </div>
      </section>
    </>
  );
};
