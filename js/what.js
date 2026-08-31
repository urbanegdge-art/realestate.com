/* =========================================================
   BACK TO TOP BUTTON
   APPEARS AFTER 25% PAGE SCROLL
========================================================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", function () {

    const scrollTop =
        window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const scrollPercentage =
        (scrollTop / pageHeight) * 100;


    if (scrollPercentage >= 25) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


/* =========================================================
   SMOOTH SCROLL TO TOP
========================================================= */

backToTop.addEventListener(
    "click",
    function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);