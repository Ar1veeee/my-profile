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

document.addEventListener("DOMContentLoaded", () => {
  // Get all buttons and images
  const buttons = document.querySelectorAll(".button");
  const images = document.querySelectorAll(".img");
  const imageSlider = document.querySelector(".image-slider");
  buttons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      // Reset all images and buttons to default state
      images.forEach((img) => {
        img.style.transform = "scale(1)";
        img.style.filter = "saturate(10%)";
      });
      buttons.forEach((btn) => {
        btn.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
      });
      // Scale the clicked image
      images[index].style.transform = "scale(1.3)";
      images[index].style.filter = "saturate(100%)";
      // Remove background color from the clicked button
      button.style.backgroundColor = "transparent";
      // Move the image-slider based on which button is clicked
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

document.addEventListener("DOMContentLoaded", () => {
  const chatIcon = document.getElementById("chat-icon");
  const chatText = document.getElementById("chat-text");
  const notificationBadge = document.getElementById("notification-badge");
  const notificationSound = document.getElementById("notification-sound");

  let isTextVisible = false; // Status untuk mengecek apakah teks sedang ditampilkan

  // Tampilkan animasi ikon saat halaman dimuat
  setTimeout(() => {
    chatIcon.classList.remove("translate-x-full", "opacity-0");
    chatIcon.classList.add("translate-x-0", "opacity-100");
  }, 500);

  // Event klik pada ikon chat
  chatIcon.addEventListener("click", () => {
    if (!isTextVisible) {
      // Tampilkan teks chat
      chatText.classList.remove("hidden", "translate-x-full", "opacity-0");
      chatText.classList.add("translate-x-0", "opacity-100");

      // Putar audio (jika ada)
      if (notificationSound) {
        notificationSound.play().catch((error) => {
          console.log("Audio initialization failed:", error);
        });
      }

      // Hilangkan badge notifikasi
      if (notificationBadge) {
        notificationBadge.classList.add("hidden");
      }
    } else {
      // Sembunyikan teks chat
      chatText.classList.remove("translate-x-0", "opacity-100");
      chatText.classList.add("translate-x-full", "opacity-0");

      // Tambahkan kembali badge notifikasi jika diperlukan
      if (notificationBadge) {
        notificationBadge.classList.remove("hidden");
      }
    }

    // Ubah status visibilitas teks
    isTextVisible = !isTextVisible;
  });
});
