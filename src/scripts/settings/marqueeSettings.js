import { generateMarqueeContent } from '@scripts/services/marqueeLogic.js';
import { marqueeData } from '@scripts/data/marquee-data.js';

const headerMarquee = document.getElementById('header-marquee');
const footerMarquee = document.getElementById('footer-marquee');

function setupMarquee(element) {
    const content = element.querySelector('.marquee-content');
    let animationDuration = content.offsetWidth / 50;

    element.style.animationDuration = `${animationDuration}s`;
}

if (headerMarquee) {
    generateMarqueeContent(headerMarquee, marqueeData);
    setupMarquee(headerMarquee);
}

if (footerMarquee) {
    generateMarqueeContent(footerMarquee, marqueeData);
    setupMarquee(footerMarquee);
}