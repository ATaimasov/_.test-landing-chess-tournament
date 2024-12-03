export function generateMarqueeContent(element, data) {
    const separator = document.createElement('span');
    separator.textContent = ' • ';
    separator.classList.add('marquee__separator');

    const content = data.reduce((acc, item, index) => {
        const textNode = document.createTextNode(item);
        acc.push(textNode);
        
        if (index < data.length - 1) {
            acc.push(separator.cloneNode(true));
        }
        
        return acc;
    }, []);

    const contentSpans = element.querySelectorAll('.marquee-content');
    contentSpans.forEach(span => {
        span.innerHTML = '';
        content.forEach(node => span.appendChild(node.cloneNode(true)));
    });
}

