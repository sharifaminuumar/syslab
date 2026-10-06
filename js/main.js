/*
======================================================
WHATSAPP NUMBER
======================================================

This is your WhatsApp number.

IMPORTANT:
Do not put +, spaces or brackets here.

Correct:
233209600738
*/

const WHATSAPP_NUMBER = "233209600738";

document.documentElement.classList.add("js");


/*
======================================================
APPOINTMENT DATE
======================================================

Earliest selectable date is today (in the visitor's
local time zone).
*/

const dateInput =
  document.getElementById("date");

const now = new Date();

const today =
  new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

dateInput.min = today;


/*
======================================================
OPEN WHATSAPP
======================================================
*/

function openWhatsApp(text, form) {

  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(text);

  const opened =
    window.open(
      whatsappURL,
      "_blank"
    );

  // Popup blocked: open in the same tab instead
  if (!opened) {
    window.location.href = whatsappURL;
    return;
  }

  setStatus(
    form,
    "WhatsApp opened with your details. Tap Send in WhatsApp to deliver it."
  );
}


/*
======================================================
VALIDATION
======================================================
*/

function fieldMessage(control) {

  const v = control.validity;

  if (v.valueMissing) {
    return control.dataset.error || "This field is required.";
  }

  if (v.typeMismatch && control.type === "email") {
    return "Enter a valid email address, like name@example.com.";
  }

  if (v.patternMismatch && control.type === "tel") {
    return "Enter a valid phone number using digits, spaces or +.";
  }

  if (v.rangeUnderflow) {
    return "Choose today or a later date.";
  }

  return control.validationMessage;
}

function validateControl(control) {

  const field = control.closest(".field");

  if (!field) return true;

  const error = field.querySelector(".field-error");
  const valid = control.checkValidity();

  field.classList.toggle("is-invalid", !valid);
  field.classList.toggle("is-valid", valid && control.value.trim() !== "");

  if (valid) {
    control.removeAttribute("aria-invalid");
  } else {
    control.setAttribute("aria-invalid", "true");
  }

  if (error) {
    error.textContent = valid ? "" : fieldMessage(control);
  }

  return valid;
}

function validateForm(form) {

  const controls =
    Array.from(form.querySelectorAll("input, select, textarea"));

  let firstInvalid = null;

  controls.forEach(function(control) {
    if (!validateControl(control) && !firstInvalid) {
      firstInvalid = control;
    }
  });

  if (firstInvalid) {
    firstInvalid.focus();
    setStatus(form, "Please check the highlighted fields.", true);
    return false;
  }

  return true;
}

function setStatus(form, text, isError) {

  const status = form.querySelector(".form-status");

  if (!status) return;

  status.textContent = text;
  status.classList.toggle("is-error", Boolean(isError));
}

function trimValue(control) {
  if (control.tagName !== "SELECT" && control.type !== "date") {
    control.value = control.value.trim();
  }
}

function bindLiveValidation(form) {

  form.querySelectorAll("input, select, textarea").forEach(function(control) {

    control.addEventListener("blur", function() {
      if (control.value !== "" || control.closest(".field").classList.contains("is-invalid")) {
        trimValue(control);
        validateControl(control);
      }
    });

    const revalidate = function() {
      if (control.closest(".field").classList.contains("is-invalid")) {
        validateControl(control);
      }
    };

    control.addEventListener("input", revalidate);
    control.addEventListener("change", revalidate);
  });
}


/*
======================================================
APPOINTMENT FORM
======================================================
*/

const appointmentForm =
  document.getElementById("appointmentForm");

bindLiveValidation(appointmentForm);

appointmentForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    appointmentForm
      .querySelectorAll("input, textarea")
      .forEach(trimValue);

    if (!validateForm(appointmentForm)) return;


    const service =
      document.getElementById("service").value;

    const name =
      document.getElementById("name").value;

    const phone =
      document.getElementById("phone").value;

    const email =
      document.getElementById("email").value;

    const date =
      document.getElementById("date").value;

    const time =
      document.getElementById("time").value;

    const notes =
      document.getElementById("notes").value;


    const formattedDate =
      new Date(date + "T00:00:00")
        .toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          }
        );


    /*
    Create WhatsApp message
    */

    const message =
`Hello SysLab Diagnostics,

I would like to book an appointment.

Name: ${name}

Phone: ${phone}

Email: ${email || "Not provided"}

Service: ${service}

Preferred Date: ${formattedDate}

Preferred Time: ${time}

Additional Information:
${notes || "None"}

Thank you.`;


    openWhatsApp(message, appointmentForm);

  }
);


/*
======================================================
ASK FOR HELP FORM
======================================================
*/

const helpForm =
  document.getElementById("helpForm");

bindLiveValidation(helpForm);

helpForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    helpForm
      .querySelectorAll("input, textarea")
      .forEach(trimValue);

    if (!validateForm(helpForm)) return;


    const name =
      document.getElementById("helpName").value;

    const phone =
      document.getElementById("helpPhone").value;

    const topic =
      document.getElementById("helpTopic").value;

    const message =
      document.getElementById("helpMessage").value;


    /*
    Create WhatsApp message
    */

    const whatsappMessage =
`Hello SysLab Diagnostics,

I need some assistance.

Name: ${name}

Phone: ${phone}

Topic: ${topic}

My message:

${message}

Thank you.`;


    openWhatsApp(whatsappMessage, helpForm);

  }
);


/*
======================================================
NAVIGATION
======================================================
*/

const header = document.getElementById("siteHeader");
const navToggle = header.querySelector(".nav-toggle");
const navMenu = document.getElementById("navMenu");

function setMenu(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  navMenu.classList.toggle("is-open", open);
}

navToggle.addEventListener("click", function() {
  setMenu(navToggle.getAttribute("aria-expanded") !== "true");
});

navMenu.addEventListener("click", function(event) {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
    setMenu(false);
    navToggle.focus();
  }
});

document.addEventListener("click", function(event) {
  if (navMenu.classList.contains("is-open") && !header.contains(event.target)) {
    setMenu(false);
  }
});

window.matchMedia("(min-width: 1041px)").addEventListener("change", function(mq) {
  if (mq.matches) setMenu(false);
});

function onScroll() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();


/*
======================================================
ACTIVE SECTION + REVEAL
======================================================
*/

if ("IntersectionObserver" in window) {

  const navLinks =
    Array.from(document.querySelectorAll(".nav-links a"));

  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function(link) {
        const match = link.getAttribute("href") === "#" + entry.target.id;
        if (match) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  document.querySelectorAll("main > section[id]").forEach(function(section) {
    sectionObserver.observe(section);
  });

  const revealTargets =
    document.querySelectorAll(".service-card, .support-card, .contact-card, .form-card, .info-panel");

  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add("is-visible");
        revealObserver.unobserve(el);
        // Hand transitions back to the component once revealed
        setTimeout(function() {
          el.classList.remove("reveal", "is-visible");
        }, 650);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });

  revealTargets.forEach(function(el) {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
}
