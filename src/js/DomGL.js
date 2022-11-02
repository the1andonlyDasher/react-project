import React, { useEffect, useRef } from "react";

import "../js/scroll";

export const DomGL = React.forwardRef((props, ref) => {
  const dom = useRef();

  useEffect(() => {
    document.body.style.height = `${dom.current.offsetHeight}px`;

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        //console.log(mutation.type);
        document.body.style.height = `${dom.current.offsetHeight}px`;
        // window.scrollTo(0, 0);
      });
    });

    var config = { attributes: false, childList: true, characterData: false };

    observer.observe(document.getElementById("data-scroll-content"), config);

    function render(time) {
      time = 0.01;
      dom.current.style.transform = `translate3d(0, -${window.scrollProgress.current}px, 0)`;
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  });

  return (
    <>
      <div id="data-scroll" className="main">
        <div id="data-scroll-content" ref={dom}>
          {props.children}
        </div>
      </div>
    </>
  );
});
