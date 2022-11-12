import gsap from "gsap";

window.scrollProgress = {
  current: 0,
};

let lastKnownScrollPosition = 0;
let ticking = false;
let newc;

function doSomething() {
  const currentScroll = window.scrollY;
  newc = currentScroll;
  const tween = gsap.to(window.scrollProgress, {
    current: newc,
    duration: 1,
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

var checkScrollSpeed = (function (settings) {
  settings = settings || {};

  window.delta = {
    speed: 0,
  };

  var lastPos,
    newPos,
    timer,
    delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

  function clear() {
    lastPos = null;
    window.delta.speed = 0;
  }

  clear();

  return function () {
    newPos = window.scrollY;
    if (lastPos != null) {
      // && newPos < maxScroll
      window.delta.speed = newPos - lastPos;
    }
    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(clear, delay);
    return window.delta.speed;
  };
})();

// listen to "scroll" event
window.onscroll = function () {
  checkScrollSpeed();
  // console.log(window.delta.speed);
};
