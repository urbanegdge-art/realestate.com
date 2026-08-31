/* =========================================================
   URBAN EDGE REAL ESTATE
   REALTOR / SALES PARTNER REGISTRATION
   JAVASCRIPT
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

// We will add your Google Apps Script URL here later.
//
// Example:
//
// const GOOGLE_SCRIPT_URL =
// "https://script.google.com/macros/s/XXXXXXXX/exec";

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyL9le9Pp-FgSumFQl4Q8WySTdYVL3uXjxAuEiwf7xYknM3OMpcoTdanyI62jEuPI2B/exec";
/* =========================================================
   ELEMENTS
========================================================= */

const form =
    document.getElementById("realtorRegistrationForm");

const successModal =
    document.getElementById("successModal");

const closeSuccess =
    document.getElementById("closeSuccess");

const registrationNumber =
    document.getElementById("registrationNumber");

const registrationDate =
    document.getElementById("registrationDate");

const downloadPdf =
    document.getElementById("downloadPdf");

const sharePdf =
    document.getElementById("sharePdf");

const whatsappBtn =
    document.getElementById("whatsappBtn");

const emailBtn =
    document.getElementById("emailBtn");

const printBtn =
    document.getElementById("printBtn");

const accountNumber =
    document.getElementById("accountNumber");

const confirmAccountNumber =
    document.getElementById("confirmAccountNumber");

    const passportInput =
    document.getElementById("passport");

const idDocumentInput =
    document.getElementById("idDocument");


/* =========================================================
   TEMPORARY APPLICATION DATA
========================================================= */

let currentRegistration = null;


/* =========================================================
   GENERATE APPLICATION REFERENCE
========================================================= */

function generateApplicationNumber() {

    const year =
        new Date().getFullYear();

    const random =
        Math.random()
            .toString(36)
            .substring(2, 7)
            .toUpperCase();

    return `UE-RP-${year}-${random}`;
}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(date) {

    return new Intl.DateTimeFormat(
        "en-NG",
        {
            dateStyle: "full",
            timeStyle: "short"
        }
    ).format(date);

}


/* =========================================================
   GET CHECKBOX VALUES
========================================================= */

function getCheckedValues(name) {

    const checked =
        document.querySelectorAll(
            `input[name="${name}"]:checked`
        );

    return Array.from(checked)
        .map(input => input.value)
        .join(", ");

}


/* =========================================================
   COLLECT FORM DATA
========================================================= */

function collectFormData() {

    const data = {

        applicationNumber:
            generateApplicationNumber(),

        submittedAt:
            new Date().toISOString(),

        submittedAtFormatted:
            formatDate(new Date()),

        fullName:
            document.getElementById("fullName").value.trim(),

        phone:
            document.getElementById("phone").value.trim(),

        whatsapp:
            document.getElementById("whatsapp").value.trim(),

        email:
            document.getElementById("email").value.trim(),

        gender:
            document.getElementById("gender").value,

        state:
            document.getElementById("state").value.trim(),

        lga:
            document.getElementById("lga").value.trim(),

        address:
            document.getElementById("address").value.trim(),

        realtorStatus:
            document.getElementById("realtorStatus").value,

        experience:
            document.getElementById("experience").value,

        agency:
            document.getElementById("agency").value.trim(),

        otherCompany:
            document.getElementById("otherCompany").value,

        areas:
            document.getElementById("areas").value.trim(),

        clientSource:
            document.getElementById("clientSource").value,

        marketingPlatforms:
            getCheckedValues("platforms"),

        facebook:
            document.getElementById("facebook").value.trim(),

        instagram:
            document.getElementById("instagram").value.trim(),

        tiktok:
            document.getElementById("tiktok").value.trim(),

        audience:
            document.getElementById("audience").value.trim(),

        accountName:
            document.getElementById("accountName").value.trim(),

        accountNumber:
            document.getElementById("accountNumber").value.trim(),

        bankName:
            document.getElementById("bankName").value,

        referralSource:
            document.getElementById("referralSource").value,

        referrerName:
            document.getElementById("referrerName").value.trim(),

        referrerPhone:
            document.getElementById("referrerPhone").value.trim(),

        propertyCategories:
            getCheckedValues("propertyCategories"),

        preferredLocations:
            document.getElementById("preferredLocations").value.trim(),

        idType:
            document.getElementById("idType").value,

        idNumber:
            document.getElementById("idNumber").value.trim()

    };

    return data;

}


/* =========================================================
   VALIDATE BANK ACCOUNT
========================================================= */

function validateBankAccount() {

    const account =
        accountNumber.value.trim();

    const confirm =
        confirmAccountNumber.value.trim();


    if (!/^\d{10}$/.test(account)) {

        alert(
            "Please enter a valid 10-digit bank account number."
        );

        accountNumber.focus();

        return false;

    }


    if (account !== confirm) {

        alert(
            "The bank account numbers do not match."
        );

        confirmAccountNumber.focus();

        return false;

    }


    return true;

}


/* =========================================================
   CONVERT FILE TO BASE64
========================================================= */

function fileToBase64(file) {

    return new Promise((resolve, reject) => {

        if (!file) {
            resolve("");
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {
            resolve(reader.result);
        };

        reader.onerror = function () {
            reject(
                new Error(
                    "Could not read the selected file."
                )
            );
        };

        reader.readAsDataURL(file);

    });

}


/* =========================================================
   SUBMIT FORM
========================================================= */

form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        /* ---------------------------------------------
           VALIDATE BANK ACCOUNT
        --------------------------------------------- */

        if (!validateBankAccount()) {

            return;

        }


        /* ---------------------------------------------
           CHECK PASSPORT
        --------------------------------------------- */

        const passportFile =
            passportInput.files[0];


        if (!passportFile) {

            alert(
                "Please upload your passport photograph."
            );

            passportInput.closest(
                ".upload-box"
            ).scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;

        }


        /* ---------------------------------------------
           CHECK IDENTIFICATION DOCUMENT
        --------------------------------------------- */

        const idDocumentFile =
            idDocumentInput.files[0];


        if (!idDocumentFile) {

            alert(
                "Please upload your identification document."
            );

            idDocumentInput.closest(
                ".upload-box"
            ).scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;

        }


        /* ---------------------------------------------
           CHECK PASSPORT FILE SIZE
           Maximum: 2MB
        --------------------------------------------- */

        const maxPassportSize =
            2 * 1024 * 1024;


        if (
            passportFile.size >
            maxPassportSize
        ) {

            alert(
                "Your passport photograph is too large. Please select an image of 2MB or less."
            );

            return;

        }


        /* ---------------------------------------------
           CHECK DOCUMENT FILE SIZE
           Maximum: 5MB
        --------------------------------------------- */

        const maxDocumentSize =
            5 * 1024 * 1024;


        if (
            idDocumentFile.size >
            maxDocumentSize
        ) {

            alert(
                "Your identification document is too large. Please select a file of 5MB or less."
            );

            return;

        }


        /* ---------------------------------------------
           COLLECT FORM INFORMATION
        --------------------------------------------- */

        currentRegistration =
            collectFormData();


        /* ---------------------------------------------
           CONVERT PASSPORT TO BASE64
        --------------------------------------------- */

        let passportBase64 = "";


        try {

            passportBase64 =
                await fileToBase64(
                    passportFile
                );

        } catch (error) {

            console.error(
                "Passport error:",
                error
            );

            alert(
                "We could not read the passport photograph. Please try again."
            );

            return;

        }


        /* ---------------------------------------------
           CONVERT ID DOCUMENT TO BASE64
        --------------------------------------------- */

        let idDocumentBase64 = "";


        try {

            idDocumentBase64 =
                await fileToBase64(
                    idDocumentFile
                );

        } catch (error) {

            console.error(
                "ID document error:",
                error
            );

            alert(
                "We could not read the identification document. Please try again."
            );

            return;

        }


        /* ---------------------------------------------
           ADD FILES TO APPLICATION DATA
        --------------------------------------------- */

        currentRegistration.passport =
            passportBase64;


        currentRegistration.idDocument =
            idDocumentBase64;


        /* ---------------------------------------------
           GET SUBMIT BUTTON
        --------------------------------------------- */

        const submitButton =
            document.getElementById(
                "submitRegistration"
            );


        /* ---------------------------------------------
           SHOW UPLOADING MESSAGE
        --------------------------------------------- */

        if (submitButton) {

            submitButton.disabled =
                true;

            submitButton.style.opacity =
                "0.7";


            const buttonText =
                submitButton.querySelector(
                    "span"
                );


            if (buttonText) {

                buttonText.textContent =
                    "UPLOADING APPLICATION...";
            }

        }


        /* ---------------------------------------------
           SEND EVERYTHING TO GOOGLE APPS SCRIPT
        --------------------------------------------- */

        try {

            await fetch(
                GOOGLE_SCRIPT_URL,
                {

                    method: "POST",

                    mode: "no-cors",

                    headers: {

                        "Content-Type":
                            "text/plain;charset=utf-8"

                    },

                    body:
                        JSON.stringify(
                            currentRegistration
                        )

                }
            );


            console.log(
                "Registration successfully sent to Google Apps Script."
            );


            /* -----------------------------------------
               UPDATE SUCCESS INFORMATION
            ----------------------------------------- */

            registrationNumber.textContent =
                currentRegistration.applicationNumber;


            registrationDate.textContent =
                currentRegistration.submittedAtFormatted;


            /* -----------------------------------------
               SHOW SUCCESS MODAL
            ----------------------------------------- */

            successModal.classList.add(
                "show"
            );


            successModal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";


        } catch (error) {

            console.error(
                "Google submission error:",
                error
            );


            alert(
                "The registration could not be submitted. Please check your internet connection and try again."
            );


        } finally {


            /* -----------------------------------------
               RESTORE BUTTON
            ----------------------------------------- */

            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.style.opacity =
                    "1";


                const buttonText =
                    submitButton.querySelector(
                        "span"
                    );


                if (buttonText) {

                    buttonText.textContent =
                        "SUBMIT REALTOR APPLICATION";

                }

            }

        }

    }
);

/* =========================================================
   CLOSE SUCCESS MODAL
========================================================= */

closeSuccess.addEventListener(
    "click",
    function() {

        closeSuccessModal();

    }
);


function closeSuccessModal() {

    successModal.classList.remove("show");

    successModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

}


/* =========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================================= */

successModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === successModal
        ) {

            closeSuccessModal();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            successModal.classList.contains("show")
        ) {

            closeSuccessModal();

        }

    }
);


/* =========================================================
   CREATE PDF DOCUMENT
========================================================= */

function createPdfDocument(data) {

    const platforms =
        data.marketingPlatforms || "None selected";

    const properties =
        data.propertyCategories || "None selected";


    return `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>
Urban Edge Realtor Registration
</title>

<style>

@page {

    size: A4;

    margin: 15mm;

}

* {

    box-sizing: border-box;

}

body {

    font-family:
        Arial,
        Helvetica,
        sans-serif;

    color: #26332f;

    margin: 0;

    background: white;

}

.header {

    background: #0b3d2e;

    color: white;

    padding: 25px;

    text-align: center;

    border-bottom:
        5px solid #c9a227;

}

.header h1 {

    margin: 0;

    font-size: 25px;

    letter-spacing: 3px;

}

.header p {

    margin: 7px 0 0;

    color: #e7c85a;

    font-size: 10px;

    letter-spacing: 2px;

}

.reference {

    text-align: center;

    background: #f7f1dc;

    padding: 15px;

    margin: 20px 0;

    border:
        1px solid #eadca8;

}

.reference small {

    display: block;

    font-size: 9px;

    color: #8b7c3c;

    letter-spacing: 2px;

}

.reference strong {

    display: block;

    color: #0b3d2e;

    font-size: 20px;

    margin-top: 5px;

}

.section {

    margin-top: 20px;

}

.section-title {

    background: #0b3d2e;

    color: white;

    padding: 9px 12px;

    font-size: 11px;

    font-weight: bold;

    letter-spacing: 1px;

}

.row {

    display: grid;

    grid-template-columns:
        35% 65%;

    border-bottom:
        1px solid #e5e8e6;

}

.label {

    background: #f5f7f5;

    padding: 8px;

    font-size: 9px;

    font-weight: bold;

}

.value {

    padding: 8px;

    font-size: 9px;

    word-break: break-word;

}

.footer {

    margin-top: 30px;

    padding-top: 15px;

    border-top:
        2px solid #c9a227;

    font-size: 8px;

    color: #777;

    text-align: center;

}

.status {

    display: inline-block;

    margin-top: 8px;

    padding: 5px 10px;

    border-radius: 20px;

    background: #e9f3ee;

    color: #0b3d2e;

    font-size: 9px;

    font-weight: bold;

}

</style>

</head>


<body>


<div class="header">

    <h1>
        URBAN EDGE REAL ESTATE
    </h1>

    <p>
        REALTOR / SALES PARTNER REGISTRATION
    </p>

</div>


<div class="reference">

    <small>
        APPLICATION REFERENCE
    </small>

    <strong>
        ${escapeHtml(data.applicationNumber)}
    </strong>

    <div class="status">
        APPLICATION RECEIVED
    </div>

</div>


<div class="section">

    <div class="section-title">
        PERSONAL INFORMATION
    </div>

    ${pdfRow("Full Name", data.fullName)}
    ${pdfRow("Phone Number", data.phone)}
    ${pdfRow("WhatsApp Number", data.whatsapp)}
    ${pdfRow("Email Address", data.email)}
    ${pdfRow("Gender", data.gender)}
    ${pdfRow("State", data.state)}
    ${pdfRow("LGA", data.lga)}
    ${pdfRow("Residential Address", data.address)}

</div>


<div class="section">

    <div class="section-title">
        PROFESSIONAL INFORMATION
    </div>

    ${pdfRow("Realtor Status", data.realtorStatus)}
    ${pdfRow("Experience", data.experience)}
    ${pdfRow("Company / Agency", data.agency)}
    ${pdfRow("Other Real Estate Company", data.otherCompany)}
    ${pdfRow("Areas Covered", data.areas)}
    ${pdfRow("Client Source", data.clientSource)}

</div>


<div class="section">

    <div class="section-title">
        MARKETING CAPACITY
    </div>

    ${pdfRow("Marketing Platforms", platforms)}
    ${pdfRow("Facebook", data.facebook)}
    ${pdfRow("Instagram", data.instagram)}
    ${pdfRow("TikTok", data.tiktok)}
    ${pdfRow("Audience / Network", data.audience)}

</div>


<div class="section">

    <div class="section-title">
        COMMISSION PAYMENT DETAILS
    </div>

    ${pdfRow("Account Name", data.accountName)}
    ${pdfRow("Account Number", data.accountNumber)}
    ${pdfRow("Bank Name", data.bankName)}

</div>


<div class="section">

    <div class="section-title">
        REFERRAL INFORMATION
    </div>

    ${pdfRow("Referral Source", data.referralSource)}
    ${pdfRow("Referrer Name", data.referrerName)}
    ${pdfRow("Referrer Phone", data.referrerPhone)}

</div>


<div class="section">

    <div class="section-title">
        PROPERTY INTEREST
    </div>

    ${pdfRow("Property Categories", properties)}
    ${pdfRow("Preferred Locations", data.preferredLocations)}

</div>


<div class="section">

    <div class="section-title">
        VERIFICATION INFORMATION
    </div>

    ${pdfRow("ID Type", data.idType)}
    ${pdfRow("ID Number", data.idNumber)}

</div>


<div class="footer">

    <p>
        Submitted on:
        ${escapeHtml(data.submittedAtFormatted)}
    </p>

    <p>
        1st Floor, Ebube Dike Plaza,
        Off Goodwill Junction,
        Okpuno, Awka, Anambra State.
    </p>

    <p>
        Building Wealth. Creating Communities.
        Securing Your Future.
    </p>

    <p>
        This document confirms receipt of an application.
        It does not constitute approval as an Urban Edge
        Real Estate Realtor or Sales Partner.
    </p>

</div>


</body>

</html>
    `;

}


/* =========================================================
   PDF ROW
========================================================= */

function pdfRow(label, value) {

    return `

        <div class="row">

            <div class="label">
                ${escapeHtml(label)}
            </div>

            <div class="value">
                ${escapeHtml(value || "Not provided")}
            </div>

        </div>

    `;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    if (value === undefined || value === null) {

        return "";

    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   DOWNLOAD PDF
========================================================= */

downloadPdf.addEventListener(
    "click",
    function() {

        if (!currentRegistration) {

            alert(
                "No registration data available."
            );

            return;

        }


        const pdfWindow =
            window.open(
                "",
                "_blank"
            );


        if (!pdfWindow) {

            alert(
                "Please allow pop-ups in your browser to generate the PDF."
            );

            return;

        }


        pdfWindow.document.open();

        pdfWindow.document.write(
            createPdfDocument(
                currentRegistration
            )
        );

        pdfWindow.document.close();


        setTimeout(
            function() {

                pdfWindow.focus();

                pdfWindow.print();

            },
            700
        );

    }
);


/* =========================================================
   SHARE PDF / REGISTRATION
========================================================= */

sharePdf.addEventListener(
    "click",
    async function() {

        if (!currentRegistration) {

            return;

        }


        const data =
            currentRegistration;


        const shareText = `

Urban Edge Real Estate

Realtor / Sales Partner Application

Application Reference:
${data.applicationNumber}

Name:
${data.fullName}

Phone:
${data.phone}

Email:
${data.email}

Status:
APPLICATION RECEIVED

        `.trim();


        if (
            navigator.share
        ) {

            try {

                await navigator.share({

                    title:
                        "Urban Edge Realtor Registration",

                    text:
                        shareText

                });

            } catch (error) {

                console.log(
                    "Share cancelled."
                );

            }

        } else {

            await copyToClipboard(
                shareText
            );

            alert(
                "Registration details copied. You can now paste them into WhatsApp, email or another app."
            );

        }

    }
);


/* =========================================================
   WHATSAPP
========================================================= */

whatsappBtn.addEventListener(
    "click",
    function() {

        if (!currentRegistration) {

            return;

        }


        const data =
            currentRegistration;


        const message = `

Hello Urban Edge Real Estate,

I have completed my Realtor / Sales Partner Registration.

Application Reference:
${data.applicationNumber}

Full Name:
${data.fullName}

Phone:
${data.phone}

Email:
${data.email}

Status:
APPLICATION RECEIVED

I have attached/saved my registration proof for your records.

Thank you.

        `.trim();


        const whatsappNumber =
    "2349011157594";

const whatsappUrl =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent(message);


window.open(
    whatsappUrl,
    "_blank"
);

    }
);


/* =========================================================
   EMAIL
========================================================= */

emailBtn.addEventListener(
    "click",
    function() {

        if (!currentRegistration) {
            return;
        }

        const data =
            currentRegistration;

        const urbanEdgeEmail =
            "urbanegdge@gmail.com";

        const subject =
            `Realtor Registration - ${data.applicationNumber}`;

        const body = `
Hello Urban Edge Real Estate,

I have completed the Realtor / Sales Partner Registration Form.

Application Reference:
${data.applicationNumber}

Full Name:
${data.fullName}

Phone:
${data.phone}

WhatsApp:
${data.whatsapp}

Email:
${data.email}

Bank Name:
${data.bankName}

Account Name:
${data.accountName}

Status:
APPLICATION RECEIVED

Thank you.
        `.trim();

        const gmailUrl =
            "https://mail.google.com/mail/?view=cm" +
            "&fs=1" +
            "&to=" +
            encodeURIComponent(urbanEdgeEmail) +
            "&su=" +
            encodeURIComponent(subject) +
            "&body=" +
            encodeURIComponent(body);

        window.open(
            gmailUrl,
            "_blank"
        );

    }
);

/* =========================================================
   PRINT
========================================================= */

printBtn.addEventListener(
    "click",
    function() {

        if (!currentRegistration) {

            return;

        }


        const printWindow =
            window.open(
                "",
                "_blank"
            );


        if (!printWindow) {

            alert(
                "Please allow pop-ups to print your registration."
            );

            return;

        }


        printWindow.document.open();

        printWindow.document.write(
            createPdfDocument(
                currentRegistration
            )
        );

        printWindow.document.close();


        setTimeout(
            function() {

                printWindow.focus();

                printWindow.print();

            },
            700
        );

    }
);


/* =========================================================
   COPY TO CLIPBOARD
========================================================= */

async function copyToClipboard(text) {

    try {

        await navigator.clipboard.writeText(
            text
        );

    } catch (error) {

        console.error(
            "Clipboard error:",
            error
        );

    }

}


/* =========================================================
   ACCOUNT NUMBER - ONLY NUMBERS
========================================================= */

accountNumber.addEventListener(
    "input",
    function() {

        this.value =
            this.value.replace(
                /\D/g,
                ""
            );

    }
);


confirmAccountNumber.addEventListener(
    "input",
    function() {

        this.value =
            this.value.replace(
                /\D/g,
                ""
            );

    }
);


/* =========================================================
   PHONE NUMBER - CLEAN INPUT
========================================================= */

const phoneInputs =
    document.querySelectorAll(
        'input[type="tel"]'
    );


phoneInputs.forEach(
    function(input) {

        input.addEventListener(
            "input",
            function() {

                this.value =
                    this.value.replace(
                        /[^0-9+\-\s]/g,
                        ""
                    );

            }
        );

    }
);


/* =========================================================
   PREVENT DOUBLE SUBMISSION
========================================================= */

let isSubmitting = false;


form.addEventListener(
    "submit",
    function() {

        if (isSubmitting) {

            return;

        }

        isSubmitting = true;


        const button =
            document.getElementById(
                "submitRegistration"
            );


        button.disabled = true;

        button.style.opacity = "0.7";

        button.querySelector(
            "span"
        ).textContent =
            "PROCESSING APPLICATION...";


        setTimeout(
            function() {

                button.disabled = false;

                button.style.opacity = "1";

                button.querySelector(
                    "span"
                ).textContent =
                    "SUBMIT REALTOR APPLICATION";

                isSubmitting = false;

            },
            2500
        );

    }
);


/* =========================================================
   PAGE INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "Urban Edge Realtor Registration System Loaded."
        );

    }
);