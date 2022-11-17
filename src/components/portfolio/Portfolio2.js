import React, { useState, useRef, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../button";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../../js/hoverImg.js";
const image1 = require("../../images/page1.webp");
const image2 = require("../../images/page2.webp");
const image3 = require("../../images/page3.webp");
let canvas;

export const Portfolio2 = ({ title, subtitle, sectionName, id }) => {
  const ref = useRef([]);
  const pushRef = (el) => ref.current.push(el);
  const [show, isShown] = useState(false);
  const [dull, isDull] = useState(false);
  window.hoverItem.hovering = show;
  useEffect(() => {
    canvas = document.getElementById("c");
    return;
  }, []);

  function changeOpacity() {
    dull
      ? gsap.to(canvas.parentNode.style, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      : gsap.to(canvas.parentNode.style, {
          opacity: 0.2,
          duration: 0.3,
          ease: "power2.out",
        });
  }

  return (
    <>
      <section data-section-name={sectionName} id={id}>
        <h2 data-before={title}>{title}</h2>
        <h3>{subtitle}</h3>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          breakpoints={{
            1700: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 1,
            },
          }}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          //onSwiper={(swiper) => console.log(swiper)}
          //onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide>
            <div
              ref={pushRef}
              onMouseEnter={() => {
                isShown(true);
                isDull(true);
                changeOpacity();
                window.hoverItem.hoverImg = 1;
              }}
              onMouseLeave={() => {
                isShown(false);
                isDull(false);
                changeOpacity();
                window.hoverItem.hoverImg = 0;
              }}
              className="inner"
            >
              <Button
                gl={false}
                to="\\www.h-c-gebaeudereinigung.de"
                target="_blank"
                type="button"
                buttonSize={"btn__medium"}
                buttonStyle={"btn__outline"}
                dl="Anschauen"
              >
                Anschauen
              </Button>
            </div>
            <div
              className="bg"
              style={{ backgroundImage: `url(${image1})` }}
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              ref={pushRef}
              onMouseEnter={() => {
                isShown(true);
                isDull(true);
                changeOpacity();
                window.hoverItem.hoverImg = 2;
              }}
              onMouseLeave={() => {
                isShown(false);
                isDull(false);
                changeOpacity();
                window.hoverItem.hoverImg = 0;
              }}
              className="inner"
            >
              <Button
                gl={false}
                to="\\www.kammermieten.de"
                target="_blank"
                type="button"
                buttonSize={"btn__medium"}
                buttonStyle={"btn__outline"}
                dl="Anschauen"
              >
                Anschauen
              </Button>
            </div>
            <div
              className="bg"
              style={{ backgroundImage: `url(${image2})` }}
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              ref={pushRef}
              onMouseEnter={() => {
                isShown(true);
                isDull(true);
                changeOpacity();
                window.hoverItem.hoverImg = 3;
              }}
              onMouseLeave={() => {
                isShown(false);
                isDull(false);
                changeOpacity();
                window.hoverItem.hoverImg = 0;
              }}
              className="inner"
            >
              <Button
                gl={false}
                to="\\www.cr-jobtraining.de"
                target="_blank"
                type="button"
                buttonSize={"btn__medium"}
                buttonStyle={"btn__outline"}
                dl="Anschauen"
              >
                Anschauen
              </Button>
            </div>
            <div
              className="bg"
              style={{ backgroundImage: `url(${image3})` }}
            ></div>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
};
