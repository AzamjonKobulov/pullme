var swiper = new Swiper(".home-swiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  spaceBetween: 30,
});

var swiper = new Swiper(".reviews-swiper", {
  navigation: {
    nextEl: ".review-next",
    prevEl: ".review-prev",
  },
  slidesPerView: 4,
  spaceBetween: 20,
  centeredSlides: true,
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 2.5,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3.5,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
  on: {
    init: function () {
      setTimeout(updateSlideClasses, 100); // Delay to ensure Swiper initializes
    },
    slideChangeTransitionEnd: updateSlideClasses,
  },
});

// Force initial update after a slight delay to ensure Swiper is ready
setTimeout(updateSlideClasses, 100);

function updateSlideClasses() {
  const slides = swiper.slides;
  const totalSlides = slides.length;

  slides.forEach((slide, index) => {
    const isCurrent = index === swiper.activeIndex;
    const isAdjacent =
      index === (swiper.activeIndex - 1 + totalSlides) % totalSlides ||
      index === (swiper.activeIndex + 1) % totalSlides;

    if (isCurrent || isAdjacent) {
      slide.classList.remove("opacity-50");
      slide.classList.add("opacity-100");
    } else {
      slide.classList.add("opacity-50");
      slide.classList.remove("opacity-100");
    }

    if (isCurrent) {
      slide.classList.add("!scale-125", "!px-5", "lg:!px-8");
    } else {
      slide.classList.remove("!scale-125", "!px-5", "lg:!px-8");
    }
  });
}

window.addEventListener("resize", updateSlideClasses);

const accordionButtons = document.querySelectorAll(".faq-button");

// Handle click on the FAQ buttons
accordionButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const content = button.nextElementSibling;
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    // Close all other accordions
    document.querySelectorAll(".faq-content").forEach((faqContent) => {
      if (faqContent !== content) {
        faqContent.style.maxHeight = "0";
        faqContent.previousElementSibling.setAttribute(
          "aria-expanded",
          "false"
        );
        faqContent.previousElementSibling
          .querySelector("img")
          .classList.remove("rotate-45");
      }
    });

    // Toggle current accordion
    if (isExpanded) {
      button.setAttribute("aria-expanded", "false");
      content.style.maxHeight = "0";
      button.querySelector("img").classList.remove("rotate-45");
    } else {
      button.setAttribute("aria-expanded", "true");
      content.style.maxHeight = content.scrollHeight + "px";
      button.querySelector("img").classList.add("rotate-45");
    }
  });
});

// Close accordion when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".accordion-item")) {
    document.querySelectorAll(".faq-content").forEach((faqContent) => {
      faqContent.style.maxHeight = "0";
      faqContent.previousElementSibling.setAttribute("aria-expanded", "false");
      faqContent.previousElementSibling
        .querySelector("img")
        .classList.remove("rotate-45");
    });
  }
});

// Initialize select functionality
document.addEventListener("DOMContentLoaded", () => {
  const selects = document.querySelectorAll(".select");

  selects.forEach((select) => {
    const button = select.querySelector(".select-button");
    const list = select.querySelector(".select-list");
    const icon = select.querySelector(".select-icon");
    const label = select.querySelector(".select-label");

    // Toggle select
    button.addEventListener("click", (e) => {
      e.preventDefault();
      list.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");
    });

    // Select option
    list.addEventListener("click", (e) => {
      const target = e.target.closest("li");
      if (!target) return;

      // Remove 'text-black' class from previously selected item
      list.querySelectorAll("li").forEach((item) => {
        item.classList.remove("text-black");
      });

      // Update label and apply styles
      label.textContent = target.dataset.value;
      target.classList.add("text-black");

      // Hide dropdown
      list.classList.add("hidden");
      icon.classList.remove("rotate-180");
    });

    // Close select when clicking outside
    document.addEventListener("click", (e) => {
      if (!select.contains(e.target)) {
        list.classList.add("hidden");
        icon.classList.remove("rotate-180");
      }
    });
  });
});

// User ID Poppup
const userIdPoppup = document.getElementById("user-id-poppup");
const userIdOpenBtn = document.getElementById("user-id-open-btn");
const userIdCloseBtn = document.getElementById("user-id-close-btn");

if (userIdPoppup && userIdOpenBtn && userIdCloseBtn) {
  userIdOpenBtn.addEventListener("click", function () {
    userIdPoppup.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  });

  userIdCloseBtn.addEventListener("click", function () {
    userIdPoppup.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  });
} else {
  console.warn("One or more elements are missing on this page.");
}

// Product Poppup
const productPoppup = document.getElementById("product-poppup");
const productOpenBtns = document.querySelectorAll(".product-open-btn");
const productCloseBtns = document.querySelectorAll(".product-close-btn");

productOpenBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    productPoppup.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  });
});

productCloseBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    productPoppup.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  });
});

// Mobile Menu
const mobMenu = document.getElementById("mobile-menu");
const mobMenuBtn = document.getElementById("mobile-menu-btn");

mobMenuBtn.addEventListener("click", function () {
  mobMenu.classList.remove("-translate-x-full");
  document.body.classList.add("overflow-hidden");
});

mobMenu.querySelectorAll("a, button").forEach((item) =>
  item.addEventListener("click", function () {
    mobMenu.classList.add("-translate-x-full");
    document.body.classList.remove("overflow-hidden");
  })
);

document.addEventListener("DOMContentLoaded", function () {
  const catalog = document.getElementById("catalog");
  const scrollUpIcon = document.getElementById("scrollUpIcon");
  const scrollDownIcon = document.getElementById("scrollDownIcon");

  function updateScrollIndicators() {
    const isAtTop = catalog.scrollTop === 0;
    const isAtBottom =
      catalog.scrollHeight - catalog.scrollTop <= catalog.clientHeight + 1;

    scrollUpIcon.classList.toggle("opacity-20", isAtTop);
    scrollUpIcon.classList.toggle("opacity-60", !isAtTop);

    scrollDownIcon.classList.toggle("opacity-20", isAtBottom);
    scrollDownIcon.classList.toggle("opacity-60", !isAtBottom);
  }

  catalog.addEventListener("scroll", updateScrollIndicators);
  updateScrollIndicators(); // Initial check on page load
});

document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.split("/").pop(); // Get current page filename

  // Desktop Tabs
  document.querySelectorAll(".list a").forEach((link) => {
    link.classList.remove("text-black/80"); // Ensure no old classes exist
    link.classList.add("text-black/40"); // Set default state

    if (link.getAttribute("href") === `./${currentPath}`) {
      link.classList.remove("text-black/40");
      link.classList.add("text-brand-80"); // Set active state
    }
  });

  // Mobile Dropdown Tabs
  document.querySelectorAll(".list-mobile a").forEach((item) => {
    if (item.dataset.value === currentPath.replace(".html", "")) {
      item.classList.add("text-brand-80");

      // Update the dropdown label to match the active tab
      const selectLabel = document.querySelector(".select-label");
      if (selectLabel) selectLabel.textContent = item.dataset.value;
    }
  });
});
