document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const header = document.getElementById('main-header');
    const heroSection = document.getElementById('home');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    if (heroSection && header) {
        const headerHeightOnLoad = header.offsetHeight;
        heroSection.style.paddingTop = `${headerHeightOnLoad}px`;
    }

    const updateHeaderAndNav = () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }

        let currentActiveSectionId = 'home';

        sections.forEach(section => {
            if (section.id) {
                const sectionTop = section.offsetTop - (header ? header.offsetHeight : 0) - 50;

                if (window.scrollY >= sectionTop) {
                    currentActiveSectionId = section.id;
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentActiveSectionId) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateHeaderAndNav);
    updateHeaderAndNav();

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - (header ? header.offsetHeight : 0);
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                const burger = document.querySelector('.burger');
                const navLinksContainer = document.querySelector('.nav-links');
                const navLinksList = document.querySelectorAll('.nav-links li');

                if (navLinksContainer.classList.contains('nav-active')) {
                    navLinksContainer.classList.remove('nav-active');
                    if (burger) burger.classList.remove('toggle');
                    document.body.style.overflow = 'auto';
                    navLinksList.forEach(item => item.style.animation = '');
                }
            }
        });
    });


    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        }
    });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const burger = document.querySelector('.burger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinksList = document.querySelectorAll('.nav-links li');

    if (burger && navLinksContainer && navLinksList.length > 0) {
        burger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('nav-active');
            burger.classList.toggle('toggle');

            if (navLinksContainer.classList.contains('nav-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }

            navLinksList.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });

        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinksContainer.classList.contains('nav-active')) {
                    navLinksContainer.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    document.body.style.overflow = 'auto';
                    navLinksList.forEach(item => {
                        item.style.animation = '';
                    });
                }
            });
        });
    }

    const revealElements = document.querySelectorAll('.reveal-section, .reveal-left, .reveal-right, .reveal-bottom');

    if (revealElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        revealElements.forEach(element => {
            observer.observe(element);
        });
    }
});