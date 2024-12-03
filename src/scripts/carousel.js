const infoStagesSection = document.getElementById('info-stages');


carousel(infoStagesSection, {
    // infinity: true
    bullets: true
});

function carousel(section, options = {
    infinity: false,
    bullets: false
}) {
    if (!section) {
        throw Error('section is not found');
    }

    const carousel = section.querySelector('.carousel');
    const controls = section.querySelector('.carousel__controls');
    const slides   = carousel.children;
    const prevButton = controls.querySelector('.carousel__control--prev');
    const nextButton = controls.querySelector('.carousel__control--next');

    const bullets  = controls.querySelectorAll('.carousel__bullet');


    let slideIndex = 0;

    function showSlide(index) {

        function checkInfinity() {
            if (options.infinity) {
                if (index < 0) {
                    index = slides.length - 1;
                } else if (index >= slides.length) {
                    index = 0;
                }
            } else {
                index = Math.max(0, Math.min(index, slides.length - 1));
            }
        }
        checkInfinity();

        slides[slideIndex].classList.remove('slide-active');
        slides[index].classList.add('slide-active');
        
        function checkBullets() {
            if(options.bullets) {
                bullets[slideIndex].classList.remove('carousel__bullet--active');
                bullets[index].classList.add('carousel__bullet--active');
            }
        }
        checkBullets();

        slideIndex = index;

        updateButtonStates();
    }


    function updateButtonStates() {
        if (options.infinity) {
            prevButton.classList.remove('carousel__control--disabled');
            nextButton.classList.remove('carousel__control--disabled');
        } else {
            prevButton.classList.toggle('carousel__control--disabled', slideIndex === 0);
            nextButton.classList.toggle('carousel__control--disabled', slideIndex === slides.length - 1);
        }
    }
    
    function handleControlClick(e) {
        if (e.currentTarget.classList.contains('carousel__control--prev')) {
            showSlide(slideIndex - 1);
        } else if (e.currentTarget.classList.contains('carousel__control--next')) {
            showSlide(slideIndex + 1);
        }
    }

    prevButton.addEventListener('click', handleControlClick);
    nextButton.addEventListener('click', handleControlClick);

    function interactionWithBullets() {
        if (options.bullets) {
            bullets.forEach((bullet, index) => {
                bullet.addEventListener('click', () => showSlide(index));
            });
        }
    }
    interactionWithBullets()
    
    showSlide(slideIndex);
}
