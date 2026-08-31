/* =========================================================
   URBAN EDGE REAL ESTATE - MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------------------
    // 1. Header Scroll & Mobile Navigation
    // -----------------------------------------------------
    const header = document.querySelector(".site-header") || document.querySelector("header");
    const menuToggle = document.getElementById("menuToggle") || document.getElementById("mobileMenuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuClose = document.getElementById("mobileMenuClose");

    // Header scroll background effect
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // Open mobile menu drawer
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.add("active");
            document.body.style.overflow = "hidden"; // Disable background scrolling
        });
    }

    // Close mobile menu drawer
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = ""; // Restore background scrolling
        });
    }

    // Mobile Menu Accordion Dropdowns
    const mobileDropdowns = document.querySelectorAll(".mobile-menu .nav-dropdown-toggle");
    mobileDropdowns.forEach((toggleBtn) => {
        toggleBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const parentDropdown = this.parentElement;

            // Toggle selected submenu
            parentDropdown.classList.toggle("active");

            // Close other submenus
            document.querySelectorAll(".mobile-menu .nav-dropdown").forEach((item) => {
                if (item !== parentDropdown) {
                    item.classList.remove("active");
                }
            });
        });
    });

    // -----------------------------------------------------
    // 2. Section Scroll Animations (IntersectionObserver)
    // -----------------------------------------------------
    const animatedSelectors = [
        ".property-search",
        ".properties-section",
        ".about-section",
        ".services-section",
        ".testimonial-section",
        ".why-section",
        ".investment-section",
        ".vision-section",
        ".values-section",
        ".team-section",
        ".location-section",
        ".contact-section"
    ];

    const sectionObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    animatedSelectors.forEach((selector) => {
        const section = document.querySelector(selector);
        if (section) {
            sectionObserver.observe(section);
        }
    });

    // -----------------------------------------------------
    // 3. Back To Top Button
    // -----------------------------------------------------
    const backToTop = document.getElementById("backToTop");
    const heroSection = document.getElementById("home");

    if (backToTop) {
        window.addEventListener("scroll", () => {
            const scrollPosition = window.scrollY;
            const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (scrollPosition / pageHeight) * 100;

            if (scrollPercentage >= 20) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });

        backToTop.addEventListener("click", () => {
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    }

    // -----------------------------------------------------
    // 4. Promo Popup Modal
    // -----------------------------------------------------
    const promoPopup = document.getElementById("promoPopup");
    const promoClose = document.getElementById("promoClose");
    let promoShown = false;

    if (promoPopup && promoClose) {
        window.addEventListener("scroll", () => {
            if (promoShown) return;

            const scrollTop = window.scrollY;
            const pageHeight = document.documentElement.scrollHeight;
            const screenHeight = window.innerHeight;
            const scrollPercent = (scrollTop / (pageHeight - screenHeight)) * 100;

            if (scrollPercent >= 25) {
                promoShown = true;
                promoPopup.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });

        promoClose.addEventListener("click", () => {
            promoPopup.classList.remove("active");
            document.body.style.overflow = "";
        });
    }
});