import React, { useEffect, useRef } from "react";
import gsap from "gsap";

let scrollProgress = {
  current: 0,
};

let lastKnownScrollPosition = 0;
let ticking = false;
let newc;

export const DomGL = ({ children }) => {
  const dom = useRef();

  useEffect(() => {
    document.body.style.height = `${dom.current.offsetHeight}px`;

    function doSomething() {
      const currentScroll = window.scrollY;
      newc = currentScroll;
      const tween = gsap.to(scrollProgress, {
        current: newc,
        duration: 1.5,
        ease: "power2.out",
      });
      tween.play();
    }

    document.addEventListener("scroll", function (e) {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(function () {
          doSomething(lastKnownScrollPosition);
          ticking = false;
        });

        ticking = true;
      }
    });
  });

  function render(time) {
    time = 0.01;
    dom.current.style.transform = `translate3d(0, -${scrollProgress.current}px, 0)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  return (
    <div id="data-scroll" className="main">
      <div id="data-scroll-content" ref={dom}>
        {children}
      </div>
    </div>
  );
};
