import React, { useRef } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../button";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const image1 = require("../../images/page1.webp");
const image2 = require("../../images/page2.webp");
const image3 = require("../../images/page3.webp");

const Portfolio2 = ({ title, subtitle, sectionName, id }) => {
  const ref = useRef([]);
  const pushRef = (el) => ref.current.push(el);

  return (
    <>
      <section data-section-name={sectionName} id={id}>
        <div className="__s__b">
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
              900: {
                slidesPerView: 2,
              },
              700: {
                slidesPerView: 1,
              },
            }}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            preloadImages={true}
            rewind={true}
            //onSwiper={(swiper) => console.log(swiper)}
            //onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <div ref={pushRef} className="inner">
                <Button
                  target="_blank"
                  gl={false}
                  to="\\www.h-c-gebaeudereinigung.de"
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
              <div ref={pushRef} className="inner">
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
              <div ref={pushRef} className="inner">
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
        </div>
      </section>
    </>
  );
};

export default Portfolio2;
