


// document.addEventListener('DOMContentLoaded', () => {
//     const carousel = document.querySelector('.info-stages__list');
//     const items = carousel.querySelectorAll('.info-stages__item');
//     const prev = document.querySelector('.info-stages__control--prev');
//     const next = document.querySelector('.info-stages__control--next');
//     const pagination = document.querySelector('.info-stages__pagination');
//     const paginationItems = pagination.querySelectorAll('.info-stages__pagination-item');

//     let currentIndex = 0;
//     const itemsPerSlide = window.innerWidth >= 768 ? 2 : 1;

//     function updateCarousel() {
//         const offset = -currentIndex * (100 / itemsPerSlide);
//         carousel.style.transform = `translateX(${offset}%)`;
//     }

//     function nextSlide() {
//         currentIndex = (currentIndex + 1) % (items.length - itemsPerSlide + 1);
//         updateCarousel();
//     }

//     function prevSlide() {
//         currentIndex = (currentIndex - 1 + items.length) % (items.length - itemsPerSlide + 1);
//         updateCarousel();
//     }

//     next.addEventListener('click', nextSlide);
//     prev.addEventListener('click', prevSlide);


//     window.addEventListener('resize', () => {
//         const newItemsPerSlide = window.innerWidth >= 768 ? 2 : 1;
//         if (newItemsPerSlide !== itemsPerSlide) {
//             itemsPerSlide = newItemsPerSlide;
//             currentIndex = 0;
//             updateCarousel();
//         }
//     });

//     // Инициализация карусели
//     updateCarousel();


// });