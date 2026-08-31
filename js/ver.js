/* =========================================================
URBAN EDGE REAL ESTATE
PROPERTY VERIFICATION JAVASCRIPT
========================================================= */

/* =========================================================
PAGE LOADER
========================================================= */

window.addEventListener(
"load",
function() {

    const pageLoader =
        document.getElementById(
            "pageLoader"
        );


    setTimeout(
        function() {

            pageLoader.classList.add(
                "hide"
            );

        },
        700
    );

}

);

/* =========================================================
HEADER SCROLL EFFECT
========================================================= */

const siteHeader =
document.getElementById(
"siteHeader"
);

window.addEventListener(
"scroll",
function() {

    if (
        window.scrollY > 50
    ) {

        siteHeader.classList.add(
            "scrolled"
        );

    } else {

        siteHeader.classList.remove(
            "scrolled"
        );

    }

}

);

/* =========================================================
MOBILE MENU
========================================================= */

const menuToggle =
document.getElementById(
"menuToggle"
);

const mainNav =
document.getElementById(
"mainNav"
);

if (
menuToggle &&
mainNav
) {

menuToggle.addEventListener(
    "click",
    function() {

        mainNav.classList.toggle(
            "open"
        );

        menuToggle.classList.toggle(
            "active"
        );

    }
);


const navLinks =
    mainNav.querySelectorAll(
        "a"
    );


navLinks.forEach(
    function(link) {

        link.addEventListener(
            "click",
            function() {

                mainNav.classList.remove(
                    "open"
                );

                menuToggle.classList.remove(
                    "active"
                );

            }
        );

    }
);

}

/* =========================================================
SCROLL REVEAL
========================================================= */

const revealElements =
document.querySelectorAll(
".reveal"
);

const revealObserver =
new IntersectionObserver(
function(entries) {

        entries.forEach(
            function(entry) {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            }
        );

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(
function(element) {

    revealObserver.observe(
        element
    );

}

);

/* =========================================================
FAQ ACCORDION
========================================================= */

const faqItems =
document.querySelectorAll(
".faq-item"
);

faqItems.forEach(
function(item) {

    const question =
        item.querySelector(
            ".faq-question"
        );


    question.addEventListener(
        "click",
        function() {


            const alreadyOpen =
                item.classList.contains(
                    "open"
                );


            faqItems.forEach(
                function(otherItem) {

                    otherItem.classList.remove(
                        "open"
                    );

                }
            );


            if (!alreadyOpen) {

                item.classList.add(
                    "open"
                );

            }

        }
    );

}

);

/* =========================================================
SMOOTH INTERNAL LINKS
========================================================= */

document.querySelectorAll(
'a[href^="#"]'
).forEach(
function(link) {

    link.addEventListener(
        "click",
        function(event) {

            const targetId =
                this.getAttribute(
                    "href"
                );


            if (
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (target) {

                event.preventDefault();


                const headerHeight =
                    siteHeader
                        ? siteHeader.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    headerHeight
                    -
                    15;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });

            }

        }
    );

}

);

/* =========================================================
CARD MOUSE EFFECT
========================================================= */

const verificationCard =
document.querySelector(
".verification-card"
);

if (
verificationCard &&
window.innerWidth > 900
) {

verificationCard.addEventListener(
    "mousemove",
    function(event) {

        const rect =
            verificationCard.getBoundingClientRect();


        const x =
            event.clientX
            -
            rect.left;


        const y =
            event.clientY
            -
            rect.top;


        const centerX =
            rect.width / 2;


        const centerY =
            rect.height / 2;


        const rotateX =
            (
                y - centerY
            ) / 25;


        const rotateY =
            (
                centerX - x
            ) / 25;


        verificationCard.style.transform =
            `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-5px)
            `;

    }
);


verificationCard.addEventListener(
    "mouseleave",
    function() {

        verificationCard.style.transform =
            "rotate(-3deg)";

    }
);

}

/* =========================================================
ACTIVE NAVIGATION
========================================================= */

const sections =
document.querySelectorAll(
"section[id]"
);

const navigationLinks =
document.querySelectorAll(
".main-nav a[href^='#']"
);

window.addEventListener(
"scroll",
function() {

    let currentSection =
        "";


    sections.forEach(
        function(section) {

            const sectionTop =
                section.offsetTop
                -
                180;


            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );

            }

        }
    );


    navigationLinks.forEach(
        function(link) {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href ===
                "#" +
                currentSection
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}

);

/* =========================================================
PARALLAX HERO GLOW
========================================================= */

const hero =
document.querySelector(
".verification-hero"
);

const heroGlows =
document.querySelectorAll(
".hero-glow"
);

if (
hero &&
heroGlows.length
) {

window.addEventListener(
    "mousemove",
    function(event) {

        if (
            window.innerWidth < 800
        ) {

            return;

        }


        const x =
            (
                event.clientX
                /
                window.innerWidth
            )
            -
            0.5;


        const y =
            (
                event.clientY
                /
                window.innerHeight
            )
            -
            0.5;


        heroGlows.forEach(
            function(glow, index) {

                const movement =
                    (
                        index + 1
                    )
                    *
                    20;


                glow.style.transform =
                    `
                    translate(
                        ${x * movement}px,
                        ${y * movement}px
                    )
                    `;

            }
        );

    }
);

}

/* =========================================================
PAGE READY
========================================================= */

console.log(
"Urban Edge Property Verification Page loaded successfully."
);
