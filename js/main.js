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


/*
======================================================
PHOTOS
======================================================

Fade photos in once loaded; if one fails, keep the
branded placeholder instead of a broken image.
*/

document.querySelectorAll(".photo img").forEach(function(img) {

  const figure = img.closest(".photo");

  function loaded() { figure.classList.add("is-loaded"); }
  function failed() { figure.classList.add("is-broken"); }

  if (img.complete) {
    if (img.naturalWidth > 0) { loaded(); } else { failed(); }
  } else {
    img.addEventListener("load", loaded, { once: true });
    img.addEventListener("error", failed, { once: true });
  }
});


/*
======================================================
HERO BACKGROUND MOTION
======================================================

Pause control for the ambient background (WCAG 2.2.2),
remembered per visitor, plus an automatic pause while
the hero is off screen to save battery.
*/

(function() {

  const hero = document.querySelector(".hero");
  const toggle = hero && hero.querySelector(".motion-toggle");

  if (!toggle) return;

  function setPaused(paused) {
    hero.classList.toggle("is-paused", paused);
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.setAttribute(
      "aria-label",
      paused ? "Play background animation" : "Pause background animation"
    );
    try { localStorage.setItem("syslab-motion-paused", paused ? "1" : "0"); } catch (e) {}
  }

  let saved = null;
  try { saved = localStorage.getItem("syslab-motion-paused"); } catch (e) {}
  if (saved === "1") setPaused(true);

  toggle.addEventListener("click", function() {
    setPaused(!hero.classList.contains("is-paused"));
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function(entries) {
      hero.classList.toggle("is-offscreen", !entries[0].isIntersecting);
    }).observe(hero);
  }
})();


/*
======================================================
SERVICE DETAIL MODAL
======================================================

The hero pills stay plain links to #services (works
without JavaScript). With JavaScript they open a native
<dialog> describing the service. showModal() makes the
rest of the page inert; we add a focus loop, Escape and
click-outside closing, a closing animation, and return
focus to the pill that opened it.
*/

(function() {

  const modal = document.getElementById("serviceModal");

  if (!modal || typeof modal.showModal !== "function") return;

  const panels = modal.querySelectorAll(".modal-panel");
  const closeButton = modal.querySelector(".modal-close");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let opener = null;
  let closing = false;

  function focusables() {
    return Array.from(
      modal.querySelectorAll('a[href], button:not([disabled])')
    ).filter(function(el) {
      return !el.closest("[hidden]");
    });
  }

  function open(key, trigger) {
    let found = false;

    panels.forEach(function(panel) {
      const match = panel.dataset.panel === key;
      panel.hidden = !match;
      if (match) found = true;
    });

    if (!found) return false;

    opener = trigger;
    modal.setAttribute("aria-labelledby", "modal-title-" + key);
    modal.setAttribute("aria-describedby", "modal-desc-" + key);
    modal.classList.remove("is-closing");
    modal.showModal();
    modal.querySelector(".modal-body").scrollTop = 0;
    closeButton.focus();
    return true;
  }

  function finishClose() {
    modal.classList.remove("is-closing");
    modal.close();
    closing = false;
  }

  function close() {
    if (!modal.open || closing) return;

    if (reduceMotion.matches) {
      finishClose();
      return;
    }

    closing = true;
    modal.classList.add("is-closing");

    let done = false;
    const end = function() {
      if (done) return;
      done = true;
      finishClose();
    };

    modal.addEventListener("animationend", end, { once: true });
    setTimeout(end, 300);
  }

  // Open from the hero pills
  document.querySelectorAll(".pill[data-service]").forEach(function(pill) {
    pill.setAttribute("aria-haspopup", "dialog");
    pill.setAttribute("aria-controls", "serviceModal");

    pill.addEventListener("click", function(event) {
      if (open(pill.dataset.service, pill)) event.preventDefault();
    });
  });

  closeButton.addEventListener("click", close);

  // Escape: animate out instead of the instant native close
  modal.addEventListener("cancel", function(event) {
    event.preventDefault();
    close();
  });

  // Click on the backdrop (outside the panel) closes
  modal.addEventListener("click", function(event) {
    if (event.target === modal) close();
  });

  // Keep Tab / Shift+Tab inside the dialog
  modal.addEventListener("keydown", function(event) {
    if (event.key !== "Tab") return;

    const items = focusables();
    if (!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  // Return focus to the pill that opened the dialog
  modal.addEventListener("close", function() {
    if (opener && document.contains(opener)) {
      opener.focus({ preventScroll: true });
    }
  });

  // "Book Appointment": preselect the matching service, then go to the form
  modal.querySelectorAll("[data-book]").forEach(function(link) {
    link.addEventListener("click", function(event) {
      event.preventDefault();

      const select = document.getElementById("service");
      const option = Array.from(select.options).find(function(o) {
        return o.value === link.dataset.book;
      });

      if (option) {
        select.value = option.value;
        select.dispatchEvent(new Event("change"));
      }

      opener = select;
      finishClose();
      document.getElementById("appointment").scrollIntoView({
        behavior: reduceMotion.matches ? "auto" : "smooth"
      });
    });
  });

  // "Ask on WhatsApp": prefill the enquiry with the service name
  modal.querySelectorAll("[data-whatsapp]").forEach(function(link) {
    link.href =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(
        "Hello SysLab Diagnostics,\n\nI would like more information about: " +
        link.dataset.whatsapp +
        ".\n\nThank you."
      );
  });
})();
