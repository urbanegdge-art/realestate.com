/* ========================= CONFIGURATION =================== */
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzb1Ve_6W6XVmGReDVqWvBQiEB-4Pw6vjAG3PjwJeBDaWEkZM40mfXojVHuyn7AFxoWaw/exec";

// Load saved registration data from browser storage if available
let currentRegistration = JSON.parse(localStorage.getItem("urbanEdgeRegistration")) || null;

// DOM Elements
const form = document.getElementById("realtorRegistrationForm");
const successModal = document.getElementById("successModal");
const emailBtn = document.getElementById("emailBtn");
const downloadPdf = document.getElementById("downloadPdf");
const printBtn = document.getElementById("printBtn");
const sharePdf = document.getElementById("sharePdf");
const whatsappBtn = document.getElementById("whatsappBtn");
const accountNumber = document.getElementById("accountNumber");
const confirmAccountNumber = document.getElementById("confirmAccountNumber");

/* ========================= HELPER: FILE TO BASE64 ========== */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

function escapeHtml(text) {
  if (!text) return "";
  return text.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function pdfRow(label, value) {
  return `<div class="row">
    <div class="label">${escapeHtml(label)}</div>
    <div class="value">${escapeHtml(value || "Not provided")}</div>
  </div>`;
}

/* ========================= FORM SUBMISSION ================= */

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting Application...";
    }

    try {
      const passportInput = document.getElementById("passport");
      const idDocInput = document.getElementById("idDocument");

      let passportBase64 = null;
      let idDocBase64 = null;

      if (passportInput && passportInput.files[0]) {
        passportBase64 = await fileToBase64(passportInput.files[0]);
      }
      if (idDocInput && idDocInput.files[0]) {
        idDocBase64 = await fileToBase64(idDocInput.files[0]);
      }

      const appNumber = "UE-RP-2026-" + Math.floor(10000 + Math.random() * 90000);
      const now = new Date();
      const formattedDate = now.toLocaleString();

      const formData = {
        applicationNumber: appNumber,
        submittedAt: now.toISOString(),
        submittedAtFormatted: formattedDate,
        fullName: document.getElementById("fullName")?.value || "",
        phone: document.getElementById("phone")?.value || "",
        whatsapp: document.getElementById("whatsapp")?.value || "",
        email: document.getElementById("email")?.value || "",
        gender: document.getElementById("gender")?.value || "",
        state: document.getElementById("state")?.value || "",
        lga: document.getElementById("lga")?.value || "",
        address: document.getElementById("address")?.value || "",
        realtorStatus: document.getElementById("realtorStatus")?.value || "",
        agency: document.getElementById("agency")?.value || "",
        accountName: document.getElementById("accountName")?.value || "",
        accountNumber: accountNumber?.value || "",
        bankName: document.getElementById("bankName")?.value || "",
        idType: document.getElementById("idType")?.value || "",
        idNumber: document.getElementById("idNumber")?.value || "",
        referralSource: document.getElementById("referralSource")?.value || "",
        referrerName: document.getElementById("referrerName")?.value || "",
        referrerPhone: document.getElementById("referrerPhone")?.value || "",
        passport: passportBase64,
        idDocument: idDocBase64
      };

      // Send to Google Apps Script Backend
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.status === "success") {
        currentRegistration = formData;
        localStorage.setItem("urbanEdgeRegistration", JSON.stringify(formData));
        form.reset();

        // Update modal reference text
        const regNumElem = document.getElementById("registrationNumber");
        const regDateElem = document.getElementById("registrationDate");
        if (regNumElem) regNumElem.textContent = appNumber;
        if (regDateElem) regDateElem.textContent = formattedDate;

        // Display Success Modal
        if (successModal) {
          successModal.style.display = "flex";
          successModal.style.visibility = "visible";
          successModal.style.opacity = "1";
          successModal.classList.add("active");
          successModal.setAttribute("aria-hidden", "false");
        }
      } else {
        alert("Submission failed: " + (result.message || "Unknown error"));
      }

    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting. Please check your internet connection.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = "<span>SUBMIT REALTOR APPLICATION</span><strong>→</strong>";
      }
    }
  });
}

/* ========================= EMAIL =========================== */

emailBtn?.addEventListener("click", function () {
  const activeData = currentRegistration || JSON.parse(localStorage.getItem("urbanEdgeRegistration"));
  if (!activeData) {
    alert("No registration details are available. Please submit the form first.");
    return;
  }

  const recipient = "urbanegdge@gmail.com"; 
  const subject = `Realtor Registration - ${activeData.applicationNumber}`;
  const body = [
    "Hello Urban Edge Real Estate,",
    "",
    "I have completed the Realtor / Sales Partner Registration form.",
    `Application Reference: ${activeData.applicationNumber}`,
    `Full Name: ${activeData.fullName}`,
    `Phone: ${activeData.phone}`,
    `WhatsApp: ${activeData.whatsapp}`,
    `Email: ${activeData.email}`,
    "",
    "Please confirm whether my application and documents were received.",
    "",
    "Thank you."
  ].join("\n");

  const gmailUrl =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    `&to=${encodeURIComponent(recipient)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.open(gmailUrl, "_blank", "noopener");
});

/* ========================= PDF DOCUMENT BUILDER ============ */

function createPdfDocument(data) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Urban Edge Realtor Registration - ${escapeHtml(data.applicationNumber)}</title>
<style>
@page{size:A4;margin:15mm}
*{box-sizing:border-box}
body{font-family:Arial,Helvetica,sans-serif;color:#26332f;margin:0;background:#fff}
.header{background:#0b3d2e;color:#fff;padding:25px;text-align:center;border-bottom:5px solid #c9a227}
.header h1{margin:0;font-size:22px;letter-spacing:2px}
.header p{margin:5px 0 0;color:#e7c85a;font-size:9px;letter-spacing:1px}
.reference{text-align:center;background:#f7f1dc;padding:12px;margin:15px 0;border:1px solid #eadca8}
.reference small{display:block;font-size:8px;color:#8b7c3c;letter-spacing:1px}
.reference strong{display:block;color:#0b3d2e;font-size:18px;margin-top:4px;overflow-wrap:anywhere}
.status{display:inline-block;margin-top:6px;padding:4px 8px;border-radius:15px;background:#fff2d6;color:#725800;font-size:8px;font-weight:bold}
.section{margin-top:15px;break-inside:avoid}
.section-title{background:#0b3d2e;color:#fff;padding:8px 10px;font-size:10px;font-weight:bold;letter-spacing:1px}
.row{display:grid;grid-template-columns:35% 65%;border-bottom:1px solid #e5e8e6;break-inside:avoid}
.label{background:#f5f7f5;padding:6px 8px;font-size:8px;font-weight:bold}
.value{padding:6px 8px;font-size:8px;word-break:break-word;white-space:pre-wrap}
.footer{margin-top:20px;padding-top:10px;border-top:2px solid #c9a227;font-size:7px;color:#777;text-align:center}
@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style>
</head>
<body>
<div class="header">
  <h1>URBANEGDGE REAL ESTATE</h1>
  <p>REALTOR / SALES PARTNER REGISTRATION RECEIPT</p>
</div>
<div class="reference">
  <small>APPLICATION REFERENCE</small>
  <strong>${escapeHtml(data.applicationNumber)}</strong>
  <div class="status">SUCCESSFULLY SUBMITTED</div>
</div>
<div class="section">
  <div class="section-title">PERSONAL INFORMATION</div>
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
  <div class="section-title">PROFESSIONAL & BANK DETAILS</div>
  ${pdfRow("Realtor Status", data.realtorStatus)}
  ${pdfRow("Referrer's Name", data.agency)}
  ${pdfRow("Account Name", data.accountName)}
  ${pdfRow("Account Number", data.accountNumber)}
  ${pdfRow("Bank Name", data.bankName)}
</div>
<div class="section">
  <div class="section-title">VERIFICATION INFORMATION</div>
  ${pdfRow("Referral Source", data.referralSource)}
  ${pdfRow("ID Type", data.idType)}
  ${pdfRow("ID Number", data.idNumber)}
  ${pdfRow("Passport Photograph", data.passport ? "Uploaded" : "Not provided")}
  ${pdfRow("ID Document", data.idDocument ? "Uploaded" : "Not provided")}
</div>
<div class="footer">
  <p>Submission date: ${escapeHtml(data.submittedAtFormatted)}</p>
  <p>1st Floor, Ebube Dike Plaza, Off Goodwill Junction, Okpuno, Awka, Anambra State.</p>
  <p>Building Wealth. Creating Communities. Securing Your Future.</p>
</div>
</body>
</html>`;
}

function openPrintWindow() {
  const activeData = currentRegistration || JSON.parse(localStorage.getItem("urbanEdgeRegistration"));
  if (!activeData) {
    alert("No registration details available to print or download.");
    return;
  }

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow pop-ups in your browser settings to download/print your application receipt.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(createPdfDocument(activeData));
  printWindow.document.close();

  printWindow.onload = function () {
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };
}

/* ========================= PDF / PRINT BUTTONS ============= */

downloadPdf?.addEventListener("click", openPrintWindow);
printBtn?.addEventListener("click", openPrintWindow);

/* ========================= SHARE DETAILS =================== */

function registrationShareText(data) {
  return [
    "URBANEGDGE REAL ESTATE",
    "Realtor / Sales Partner Application",
    "-----------------------------------",
    `Reference: ${data.applicationNumber}`,
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Submitted: ${data.submittedAtFormatted}`,
    "-----------------------------------",
    "Status: Application Received & Logged."
  ].join("\n");
}

sharePdf?.addEventListener("click", async function () {
  const activeData = currentRegistration || JSON.parse(localStorage.getItem("urbanEdgeRegistration"));
  if (!activeData) {
    alert("No registration details are available.");
    return;
  }

  const text = registrationShareText(activeData);

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Urbanegdge Realtor Registration",
        text: text
      });
    } catch (error) {
      if (error.name !== "AbortError") console.error("Share error:", error);
    }
  } else {
    // Fallback: Copy to clipboard if Web Share isn't supported on desktop browser
    try {
      await navigator.clipboard.writeText(text);
      alert("Registration details copied to clipboard!");
    } catch (err) {
      alert("Could not share automatically. Please use the Print/Download PDF option.");
    }
  }
});

/* ========================= WHATSAPP ======================== */

whatsappBtn?.addEventListener("click", function () {
  const activeData = currentRegistration || JSON.parse(localStorage.getItem("urbanEdgeRegistration"));
  if (!activeData) {
    alert("No registration details are available.");
    return;
  }

  const whatsappNumber = "2349011157594";
  const message = [
    "Hello Urbanegdge Real Estate,",
    "",
    "I have successfully submitted my Realtor / Sales Partner Registration form.",
    `*Application Reference:* ${activeData.applicationNumber}`,
    `*Full Name:* ${activeData.fullName}`,
    `*Phone:* ${activeData.phone}`,
    `*Email:* ${activeData.email}`,
    "",
    "Please confirm receipt of my application and documents."
  ].join("\n");

  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener"
  );
});

/* ========================= INPUT CLEANUP ================== */

accountNumber?.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "").slice(0, 10);
});

confirmAccountNumber?.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "").slice(0, 10);
});

document.querySelectorAll('input[type="tel"]').forEach(function (input) {
  input.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9+\-\s]/g, "");
  });
});

/* ========================= INITIALIZATION ================= */

console.log("Urban Edge Realtor Registration System loaded successfully.");