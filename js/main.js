/**
 * DAA English - Main JavaScript
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove loader when page is fully loaded
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader-container');
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('.site-header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    function setActiveNavLink() {
        let scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href="#' + sectionId + '"]')?.classList.add('active');
            } else {
                document.querySelector('.nav-link[href="#' + sectionId + '"]')?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);

    // Counter animation for stats
    const statValues = document.querySelectorAll('.stat-value');

    function animateCounter(element) {
        const targetValue = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        let currentNumber = 0;

        function updateCount(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            currentNumber = Math.floor(progress * targetValue);
            element.textContent = currentNumber;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = targetValue;
            }
        }

        requestAnimationFrame(updateCount);
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    function handleScroll() {
        statValues.forEach(statValue => {
            if (isElementInViewport(statValue) && !statValue.classList.contains('animated')) {
                statValue.classList.add('animated');
                animateCounter(statValue);
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    // Course tabs
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Get active tab ID
            const tabId = this.getAttribute('data-tab');

            // Get all tabs in the same container
            const tabContainer = this.closest('.course-tabs');
            const contentContainer = tabContainer.nextElementSibling;

            // Remove active class from all buttons
            tabContainer.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active');
            });

            // Remove active class from all content
            contentContainer.querySelectorAll('.tab-content').forEach(c => {
                c.classList.remove('active');
            });

            // Add active class to clicked button
            this.classList.add('active');

            // Add active class to corresponding content
            document.getElementById(tabId)?.classList.add('active');
        });
    });

    // Results slider
    const sliderDots = document.querySelectorAll('.slider-dot');
    const resultCards = document.querySelectorAll('.result-card');

    sliderDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));

            // Remove active class from all dots and cards
            sliderDots.forEach(d => d.classList.remove('active'));
            resultCards.forEach(c => c.classList.remove('active'));

            // Add active class to clicked dot and corresponding card
            this.classList.add('active');
            resultCards[index]?.classList.add('active');
        });
    });

    // FAQ accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;

            // Toggle active class
            accordionItem.classList.toggle('active');

            // Toggle content height
            if (accordionItem.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = 0;
            }

            // Close other open accordions
            accordionHeaders.forEach(h => {
                if (h !== this) {
                    const item = h.parentElement;
                    const content = h.nextElementSibling;

                    item.classList.remove('active');
                    content.style.maxHeight = 0;
                }
            });
        });
    });

    // Open first accordion by default
    if (accordionHeaders.length > 0) {
        accordionHeaders[0].click();
    }
});