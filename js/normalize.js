/**
 * DAA English - Premium Landing Page
 * Normalize JavaScript - Polyfills and Browser Compatibility
 */

// Polyfill for Element.prototype.closest
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (Element.prototype.matches.call(el, s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// Polyfill for Element.prototype.matches
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

// Polyfill for forEach on NodeList
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// Polyfill for IntersectionObserver
if (!('IntersectionObserver' in window)) {
    // Simple fallback for older browsers
    // In a real project, consider adding a proper polyfill
    document.addEventListener('DOMContentLoaded', function() {
        console.log('IntersectionObserver not supported in this browser. Using fallback.');

        function checkElementsInView() {
            const elements = document.querySelectorAll('[class*="reveal-"]');

            elements.forEach(function(element) {
                const position = element.getBoundingClientRect();

                // Check if element is in viewport
                if (position.top < window.innerHeight && position.bottom >= 0) {
                    element.style.visibility = 'visible';
                }
            });
        }

        window.addEventListener('scroll', checkElementsInView);
        window.addEventListener('resize', checkElementsInView);

        // Initial check
        checkElementsInView();
    });
}

// Smooth Scroll Polyfill for Safari and older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    // This is a simplified version
    // In a real project, consider adding a proper polyfill

    document.addEventListener('DOMContentLoaded', function() {
        console.log('Smooth Scroll not supported in this browser. Using fallback.');

        const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

        function smoothScroll(targetPosition, duration) {
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }

        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    smoothScroll(targetPosition, 1000);
                }
            });
        });
    });
}

// Detect Internet Explorer
function detectIE() {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');
    const trident = ua.indexOf('Trident/');

    if (msie > 0 || trident > 0) {
        document.documentElement.classList.add('ie');

        // Add warning for IE users
        const body = document.body;
        const warning = document.createElement('div');
        warning.className = 'browser-warning';
        warning.innerHTML = `
      <div class="browser-warning-inner">
        <h2>Ескі браузер қолданылуда</h2>
        <p>Сіз Internet Explorer браузерін қолдануда. Жақсы тәжірибе үшін Chrome, Firefox, Edge немесе Safari сияқты жаңа браузерді қолданыңыз.</p>
        <a href="https://browsehappy.com/" target="_blank" class="btn btn-primary">Жаңа браузер алу</a>
        <button class="warning-close">Жабу</button>
      </div>
    `;

        body.insertBefore(warning, body.firstChild);

        // Close warning
        const closeButton = warning.querySelector('.warning-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                warning.style.display = 'none';
            });
        }

        return true;
    }

    return false;
}

document.addEventListener('DOMContentLoaded', detectIE);

// Add support for object-fit in IE
if ('objectFit' in document.documentElement.style === false) {
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('.hero-img, .about-img, .team-img, .member-image img, .testimonial-image img, .free-trial-image img');

        images.forEach(function(image) {
            const container = image.parentElement;

            // Skip if image is not loaded
            if (!image.complete) {
                image.addEventListener('load', function() {
                    applyObjectFit(image, container);
                });
            } else {
                applyObjectFit(image, container);
            }
        });

        function applyObjectFit(image, container) {
            // Get image source and container dimensions
            const imageUrl = image.src;
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;

            // Hide the image
            image.style.display = 'none';

            // Set container position relative if not already
            const containerPosition = window.getComputedStyle(container).getPropertyValue('position');
            if (containerPosition !== 'relative' && containerPosition !== 'absolute') {
                container.style.position = 'relative';
            }

            // Add background image to container
            container.style.backgroundImage = `url(${imageUrl})`;
            container.style.backgroundSize = 'cover';
            container.style.backgroundPosition = 'center center';
        }
    });
}