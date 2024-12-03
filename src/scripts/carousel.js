const infoStagesSection = document.getElementById('info-stages');


carousel(infoStagesSection, {
    bullets: true
});

function carousel(section, options = {
    infinity: false,
    bullets: true,
    slidesToShow: 1
}) {
    if (!section) {
        throw Error('section is not found');
    }

    const carousel = section.querySelector('.carousel');
    const controls = section.querySelector('.carousel__controls');
    const slides   = carousel.children;
    const prevButton = controls.querySelector('.carousel__control--prev');
    const nextButton = controls.querySelector('.carousel__control--next');

    let bullets = [];

    function generateBullets() {
        if (options.bullets) {
            const bulletsContainer = document.createElement('div');
            bulletsContainer.classList.add('carousel__bullets');

            for (let i = 0; i < slides.length; i++) {
                const bullet = document.createElement('span');
                bullet.classList.add('carousel__bullet');
                if (i === 0) {
                    bullet.classList.add('carousel__bullet--active');
                }
                bullet.addEventListener('click', () => showSlide(i));
                bulletsContainer.appendChild(bullet);
                bullets.push(bullet);
            }
            
            controls.insertBefore(bulletsContainer, nextButton);
        }
    }
    generateBullets();


    let slideIndex = 0;

    function showSlide(index) {

        function checkInfinity() {
            if (options.infinity) {
                index = (index + slides.length) % slides.length;
            } else {
                index = Math.max(0, Math.min(index, slides.length - 1));
            }
        }
        checkInfinity();

        slides[slideIndex].classList.remove('carousel__slide--active');

        slides[index].classList.add('carousel__slide--active');

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
    
    showSlide(slideIndex);
}
