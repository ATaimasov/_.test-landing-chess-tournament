function carousel(
  section,
  options = {
    additionalClass: "",
    infinity: false,
    bullets: true,
    counter: false,
    slideConfiguration: null,
    autoSlide: false,
    autoSlideInterval: 5000,
    countAllActiveSlidesWithSeparator: false,
    // countAllActiveSlides: false
  },
) {
  if (!section) {
    throw Error("section не найден");
  }

  if (!options.slideConfiguration) {
    throw Error("slideConfiguration не может быть пустым");
  }

  const carousel = section.querySelector(".carousel");
  const controls = section.querySelector(".carousel__controls");
  const items = Array.from(carousel.children);
  const prevButton = controls.querySelector(".carousel__control--prev");
  const nextButton = controls.querySelector(".carousel__control--next");

  let bullets = [];
  let counter;
  let slideIndex = 0;
  let totalSlides = options.slideConfiguration.length;
  let totalItems = items.length;

  function generateSlides() {
    carousel.innerHTML = "";
    let itemIndex = 0;
    for (let i = 0; i < options.slideConfiguration.length; i++) {
      const slide = document.createElement("div");
      slide.classList.add("carousel__slide");
      if (options.additionalClass) {
        slide.classList.add(`${options.additionalClass}__slide`);
      }

      for (
        let j = 0;
        j < options.slideConfiguration[i] && itemIndex < items.length;
        j++
      ) {
        slide.appendChild(items[itemIndex].cloneNode(true));
        itemIndex++;
      }
      carousel.appendChild(slide);
    }
  }

  function generateBullets() {
    if (options.bullets) {
      const existingBullets = controls.querySelector(".carousel__bullets");
      if (existingBullets) {
        existingBullets.remove();
      }

      const bulletsContainer = document.createElement("div");
      bulletsContainer.classList.add("carousel__bullets");
      if (options.additionalClass) {
        bulletsContainer.classList.add(`${options.additionalClass}__bullets`);
      }

      for (let i = 0; i < totalSlides; i++) {
        const bullet = document.createElement("span");
        bullet.classList.add("carousel__bullet");
        if (i === 0) {
          bullet.classList.add("carousel__bullet--active");
        }
        bullet.addEventListener("click", () => showSlide(i));
        bulletsContainer.appendChild(bullet);
        bullets.push(bullet);
      }

      controls.insertBefore(bulletsContainer, nextButton);
    }
  }

  function generateCounter() {
    if (options.counter) {
      const counterElement = document.createElement("div");
      counterElement.classList.add("carousel__counter");
      if (options.countAllActiveSlidesWithSeparator) {
        counterElement.textContent = `1/${totalItems}`;
      } else {
        counterElement.textContent = `1/${totalSlides}`;
      }
      controls.insertBefore(counterElement, nextButton);
      counter = counterElement;
    }
  }

  let autoSlideTimer;

  function startAutoSlide() {
    if (options.autoSlide && !autoSlideTimer) {
      autoSlideTimer = setInterval(() => {
        showSlide(slideIndex + 1);
      }, options.autoSlideInterval);
    }
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  function showSlide(index) {
    if (options.infinity) {
      index = (index + totalSlides) % totalSlides;
    } else {
      index = Math.max(0, Math.min(index, totalSlides - 1));
    }

    const slides = carousel.querySelectorAll(".carousel__slide");
    // update slides
    slides.forEach((slide, i) => {
      slide.classList.toggle("carousel__slide--active", i === index);
    });

    // update bullets if there are any
    if (options.bullets) {
      bullets.forEach((bullet, i) => {
        bullet.classList.toggle("carousel__bullet--active", i === index);
      });
    }

    // update counter if there is any
    if (options.counter) {
      if (options.countAllActiveSlidesWithSeparator) {
        const itemsPerSlide = options.slideConfiguration[index];
        const startItem = index * itemsPerSlide + 1;
        const endItem = Math.min(startItem + itemsPerSlide - 1, totalItems);
        counter.textContent = `${startItem}-${endItem} / ${totalItems}`;
      } else {
        counter.textContent = `${index + 1} / ${totalSlides}`;
      }
    }

    slideIndex = index;
    updateButtonStates();
    stopAutoSlide();
    startAutoSlide();
  }

  function updateButtonStates() {
    if (options.infinity) {
      prevButton.classList.remove("carousel__control--disabled");
      nextButton.classList.remove("carousel__control--disabled");
    } else {
      prevButton.classList.toggle(
        "carousel__control--disabled",
        slideIndex === 0,
      );
      nextButton.classList.toggle(
        "carousel__control--disabled",
        slideIndex === totalSlides - 1,
      );
    }
  }

  function handleControlClick(e) {
    if (e.currentTarget.classList.contains("carousel__control--prev")) {
      showSlide(slideIndex - 1);
    } else if (e.currentTarget.classList.contains("carousel__control--next")) {
      showSlide(slideIndex + 1);
    }
    stopAutoSlide();
  }

  function addEventListeners() {
    prevButton.addEventListener("click", handleControlClick);
    nextButton.addEventListener("click", handleControlClick);
    if (options.bullets) {
      bullets.forEach((bullet, index) => {
        bullet.addEventListener("click", () => {
          showSlide(index);
          stopAutoSlide();
        });
      });
    }
  }

  function removeEventListeners() {
    prevButton.removeEventListener("click", handleControlClick);
    nextButton.removeEventListener("click", handleControlClick);
  }

  function init() {
    generateSlides();
    generateBullets();
    generateCounter();
    showSlide(slideIndex);
    addEventListeners();
    if (options.autoSlide) {
      startAutoSlide();
    }
  }

  function destroy() {
    removeEventListeners();
    stopAutoSlide();
  }

  init();

  return {
    destroy,
  };
}

const carousels = new Map();

export function clearCarousel(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) {
    throw Error("section не найден", sectionId);
  }

  const currentCarousel = carousels.get(sectionId);

  if (currentCarousel) {
    currentCarousel.destroy();
    carousels.delete(sectionId);
  }

  const carouselElement = section.querySelector(".carousel");
  if (carouselElement) {
    // Restore the original structure
    const items = Array.from(
      carouselElement.querySelectorAll(".carousel__item"),
    );
    carouselElement.innerHTML = "";
    items.forEach((item) => carouselElement.appendChild(item));
  }

  const bulletsContainer = section.querySelector(".carousel__bullets");
  if (bulletsContainer) {
    bulletsContainer.remove();
  }

  const counterElement = section.querySelector(".carousel__counter");
  if (counterElement) {
    counterElement.remove();
  }
}

export function generateCarousel(sectionId, options) {
  clearCarousel(sectionId);

  const section = document.getElementById(sectionId);
  if (!section) {
    throw Error("section не найден", sectionId);
  }

  const newCarousel = carousel(section, options);
  carousels.set(sectionId, newCarousel);
}
