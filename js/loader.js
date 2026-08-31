/* =========================================================
   URBAN EDGE REAL ESTATE
   PREMIUM LOADER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loader =
        document.getElementById("ue-loader");

    const progressBar =
        document.getElementById("ue-progress-bar");

    const progressText =
        document.getElementById("ue-progress");

    const loadingMessage =
        document.getElementById("ue-loading-message");


    /* -------------------------------------------------------
       SAFETY CHECK
    ------------------------------------------------------- */

    if (!loader) return;


    /* -------------------------------------------------------
       SETTINGS
    ------------------------------------------------------- */

    /*
     * The loader will remain visible for at least
     * 3.8 seconds so the architectural animation,
     * shimmer and branding have time to appear.
     */

    const minimumDisplayTime = 3800;


    /*
     * Absolute maximum.
     *
     * If something goes wrong while the website loads,
     * the visitor will still get into the website.
     */

    const maximumDisplayTime = 7000;


    const startTime = Date.now();


    /* -------------------------------------------------------
       LOADING MESSAGES
    ------------------------------------------------------- */

    const messages = [

        {
            progress: 0,
            text: "PREPARING YOUR EXPERIENCE"
        },

        {
            progress: 25,
            text: "DISCOVERING YOUR NEXT ADDRESS"
        },

        {
            progress: 50,
            text: "CURATING THE POSSIBILITIES"
        },

        {
            progress: 75,
            text: "OPENING THE DOOR"
        },

        {
            progress: 100,
            text: "WELCOME TO URBAN EDGE"
        }

    ];


    /* -------------------------------------------------------
       UPDATE PROGRESS
    ------------------------------------------------------- */

    function updateProgress(value) {

        value =
            Math.min(
                100,
                Math.max(0, value)
            );


        /* Update progress bar */

        progressBar.style.width =
            `${value}%`;


        /* Update percentage */

        progressText.textContent =
            `${Math.round(value)}%`;


        /* ---------------------------------------------------
           FIND CURRENT MESSAGE
        --------------------------------------------------- */

        let currentMessage =
            messages[0];


        messages.forEach(message => {

            if (
                value >= message.progress
            ) {

                currentMessage =
                    message;

            }

        });


        loadingMessage.textContent =
            currentMessage.text;

    }


    /* -------------------------------------------------------
       PROGRESS ANIMATION
    ------------------------------------------------------- */

    let progress = 0;


    const progressInterval =
        setInterval(() => {


            /*
             * Beginning:
             * slightly faster
             */

            if (progress < 25) {

                progress +=
                    Math.random() * 2.8;

            }


            /*
             * Middle:
             * smooth steady movement
             */

            else if (progress < 60) {

                progress +=
                    Math.random() * 1.8;

            }


            /*
             * Near the end:
             * slow down considerably
             */

            else if (progress < 85) {

                progress +=
                    Math.random() * 0.9;

            }


            /*
             * Final stage:
             * wait for the actual page load
             */

            else {

                progress +=
                    Math.random() * 0.25;

            }


            /*
             * Never reach 100% before
             * the page is actually ready.
             */

            progress =
                Math.min(
                    progress,
                    96
                );


            updateProgress(progress);


        }, 140);


    /* -------------------------------------------------------
       FINISH LOADER
    ------------------------------------------------------- */

    let loaderFinished = false;


    function finishLoader() {


        /*
         * Prevent this function from
         * running more than once.
         */

        if (loaderFinished) return;

        loaderFinished = true;


        clearInterval(progressInterval);


        /* Complete progress */

        updateProgress(100);


        /*
         * Allow the visitor to see
         * "WELCOME TO URBAN EDGE"
         */

        setTimeout(() => {


            loader.classList.add(
                "ue-loader-hidden"
            );


            document.body.classList.remove(
                "ue-loading"
            );


            /*
             * Remove loader from DOM after
             * the fade-out animation.
             */

            setTimeout(() => {

                if (loader) {

                    loader.remove();

                }

            }, 1200);


        }, 600);

    }


    /* -------------------------------------------------------
       WAIT FOR PAGE LOAD
    ------------------------------------------------------- */

    function attemptFinish() {


        const elapsed =
            Date.now() - startTime;


        const remaining =
            Math.max(
                0,
                minimumDisplayTime - elapsed
            );


        setTimeout(() => {

            finishLoader();

        }, remaining);

    }


    /* -------------------------------------------------------
       PAGE LOAD EVENT
    ------------------------------------------------------- */

    if (
        document.readyState ===
        "complete"
    ) {

        attemptFinish();

    } else {

        window.addEventListener(
            "load",
            attemptFinish,
            {
                once: true
            }
        );

    }


    /* -------------------------------------------------------
       SAFETY TIMEOUT
    ------------------------------------------------------- */

    setTimeout(() => {

        finishLoader();

    }, maximumDisplayTime);


});