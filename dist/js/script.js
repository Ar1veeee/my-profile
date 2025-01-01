// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
  } else {
    header.classList.remove("navbar-fixed");
  }
};

// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

const checkbox = document.querySelector("#toggle");
const html = document.querySelector("html");
const header = document.querySelector("header");

checkbox.addEventListener("click", function () {
  if (checkbox.checked) {
    html.classList.add("dark");
    header.classList.remove("navbar-fixed");
    header.classList.add("navbar-fixed-dark");
  } else {
    html.classList.remove("dark");
    header.classList.remove("navbar-fixed-dark");
    header.classList.add("navbar-fixed");
  }
});

AOS.init({
  duration: 800,
  once: true,
});

// Image Slider
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button");
  const images = document.querySelectorAll(".img");
  const imageSlider = document.querySelector(".image-slider");
  buttons.forEach((button, index) => {
    button.addEventListener("mouseover", () => {
      images.forEach((img) => {
        img.style.transform = "scale(1)";
        img.style.filter = "saturate(10%)";
      });
      buttons.forEach((btn) => {
        btn.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
      });
      images[index].style.transform = "scale(1.3)";
      images[index].style.filter = "saturate(100%)";
      button.style.backgroundColor = "transparent";
      switch (index) {
        case 0:
          imageSlider.style.left = "25%";
          break;
        case 1:
          imageSlider.style.left = "20%";
          break;
        case 2:
          imageSlider.style.left = "15%";
          break;
        case 3:
          imageSlider.style.left = "10%";
          break;
        case 4:
          imageSlider.style.left = "5%";
          break;
        case 5:
          imageSlider.style.left = "-5%";
          break;
        case 6:
          imageSlider.style.left = "-10%";
          break;
        case 7:
          imageSlider.style.left = "-15%";
          break;
        case 8:
          imageSlider.style.left = "-20%";
          break;
        case 9:
          imageSlider.style.left = "-25%";
          break;
      }
    });
  });
});

// Notification
document.addEventListener("DOMContentLoaded", () => {
  const chatIcon = document.getElementById("chat-icon");
  const chatText = document.getElementById("chat-text");
  const notificationBadge = document.getElementById("notification-badge");
  const notificationSound = document.getElementById("notification-sound");

  let isTextVisible = false;

  setTimeout(() => {
    chatIcon.classList.remove("translate-x-full", "opacity-0");
    chatIcon.classList.add("translate-x-0", "opacity-100");
  }, 500);

  chatIcon.addEventListener("click", () => {
    if (!isTextVisible) {
      chatText.classList.remove("hidden", "translate-x-full", "opacity-0");
      chatText.classList.add("translate-x-0", "opacity-100");

      if (notificationSound) {
        notificationSound.play().catch((error) => {
          console.log("Audio initialization failed:", error);
        });
      }

      if (notificationBadge) {
        notificationBadge.classList.add("hidden");
      }
    } else {
      chatText.classList.remove("translate-x-0", "opacity-100");
      chatText.classList.add("translate-x-full", "opacity-0");

      if (notificationBadge) {
        notificationBadge.classList.remove("hidden");
      }
    }

    isTextVisible = !isTextVisible;
  });
});

// Recaptcha Handler
function showAlert(event) {
  event.preventDefault();
  grecaptcha.ready(function () {
    grecaptcha.execute("site-key", { action: "submit" }).then(function (token) {
      console.log("Token:", token);

      fetch("http://127.0.0.1:8080/verify-recaptcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "g-recaptcha-response": token }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Pesan berhasil dikirim!");
            document.forms["profile-contact-form"].submit();
          } else {
            alert("Verifikasi reCAPTCHA gagal: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error during verification:", error);
          alert("Terjadi kesalahan selama proses verifikasi.");
        });
    });
  });
}

// Contact Section
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwHpebIuLS8tdxeU5MhzraFT3zdMX78_krEqcBpwSaQ9NGQ-H_JsovCNQCAMUxqGuA45w/exec";
const form = document.forms["profile-contact-form"];

function submitForm(event) {
  event.preventDefault();

  const emailInput = form.email.value;

  // Validasi Email
  if (!validateEmail(emailInput)) {
    showFailedPopup(); // Tampilkan popup error
    return;
  }

  // Tampilkan loader
  showLoader();

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      console.log("Success!", response);
      showSuccessPopup();
      clearForm();
    })
    .catch((error) => {
      console.error("Error!", error.message);
      showFailedPopup(); // Tampilkan popup error jika gagal
    });
}

// Fungsi Validasi Email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org|net|io|gov|id|us|in|au|uk|de|ru|jp|cn|ca|fr)$/i;
  return emailRegex.test(email);
}

// Fungsi Menampilkan Loader
function showLoader() {
  const container = document.getElementById("popup-container");
  const loader = document.getElementById("loader");
  const successPopup = document.getElementById("popup-success");
  const failedPopup = document.getElementById("popup-failed");

  container.classList.remove("hidden-popup");
  loader.classList.remove("hidden-popup");
  successPopup.classList.add("hidden-popup");
  failedPopup.classList.add("hidden-popup");
}

// Fungsi Menampilkan Popup Sukses
function showSuccessPopup() {
  const loader = document.getElementById("loader");
  const successPopup = document.getElementById("popup-success");
  const successAudio = document.getElementById("success-audio");

  loader.classList.add("hidden-popup");
  successPopup.classList.remove("hidden-popup");

  successAudio.play().catch((error) => {
    console.error("Audio play failed:", error);
  });
}

// Fungsi Menampilkan Popup Gagal
function showFailedPopup() {
  const container = document.getElementById("popup-container");
  const loader = document.getElementById("loader");
  const failedPopup = document.getElementById("popup-failed");
  const failedAudio = document.getElementById("failed-audio");

  container.classList.remove("hidden-popup");
  loader.classList.add("hidden-popup");
  failedPopup.classList.remove("hidden-popup");

  failedAudio.play().catch((error) => {
    console.error("Audio play failed:", error);
  });
}

// Fungsi Menyembunyikan Popup
function hidePopupContainer() {
  const container = document.getElementById("popup-container");
  container.classList.add("hidden-popup");
  
}

// Fungsi Menutup Popup
function closePopup() {
  hidePopupContainer();
}

// Fungsi Membersihkan Form
function clearForm() {
  form.reset();
}
