import { throttle } from "@scripts/utils/throttle.js";
import {
  clearCarousel,
  generateCarousel,
} from "@scripts/services/carouselLogic.js";

function carouselsBreakpoints() {
  if (window.innerWidth < 600) {
    generateCarousel("info-stages", {
      bullets: true,
      slideConfiguration: [2, 1, 2, 1, 1],
      additionalClass: "info-stages",
    });
    generateCarousel("participants", {
      counter: true,
      slideConfiguration: [1, 1, 1, 1, 1, 1],
      infinity: true,
      additionalClass: "participants",
      autoSlide: true,
      autoSlideInterval: 4000,
    });
  } else if (window.innerWidth < 1366) {
    generateCarousel("info-stages", {
      bullets: true,
      counter: false,
      slideConfiguration: [2, 2, 2, 1],
      additionalClass: "info-stages",
    });
    generateCarousel("participants", {
      counter: true,
      slideConfiguration: [2, 2, 2],
      infinity: true,
      additionalClass: "participants",
      autoSlide: true,
      autoSlideInterval: 4000,
    });
  } else {
    clearCarousel("info-stages");
    generateCarousel("participants", {
      counter: true,
      slideConfiguration: [3, 3],
      infinity: true,
      additionalClass: "participants",
      autoSlide: true,
      autoSlideInterval: 4000,
    });
  }
}

window.addEventListener("resize", throttle(carouselsBreakpoints, 100));

// Initialisation of the carousel on page load
carouselsBreakpoints();
