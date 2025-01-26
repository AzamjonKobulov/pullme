var swiper = new Swiper(".home-swiper", {
  pagination: {
    el: ".swiper-pagination",
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
  slidesPerView: 4, // Default for larger screens
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
    slideChangeTransitionEnd: () => updateSlideClasses(),
    init: () => updateSlideClasses(),
  },
});

function updateSlideClasses() {
  const slides = swiper.slides;
  const totalSlides = slides.length;
  const screenWidth = window.innerWidth;

  slides.forEach((slide, index) => {
    const reviewText = slide.querySelector(".review-text");

    // Determine if the slide is the most centered (active)
    const isCurrent = index === swiper.activeIndex;
    const isAdjacent =
      index === (swiper.activeIndex - 1 + totalSlides) % totalSlides ||
      index === (swiper.activeIndex + 1) % totalSlides;

    // Handle opacity: active and adjacent slides should be fully visible, others should be dimmed
    if (isCurrent || isAdjacent) {
      slide.classList.remove("opacity-50");
      slide.classList.add("opacity-100");
    } else {
      slide.classList.add("opacity-50");
      slide.classList.remove("opacity-100");
    }

    // Handle text size based on screen width
    if (reviewText) {
      if (screenWidth < 640) {
        // Under 640px: Active slide `text-sm`, others `text-[10px]`
        if (isCurrent) {
          reviewText.classList.add("text-sm");
          reviewText.classList.remove("text-[10px]");
        } else {
          reviewText.classList.add("text-[10px]");
          reviewText.classList.remove("text-sm");
        }
      } else {
        // Above 640px: Active slide `text-lg`, others `text-sm`
        if (isCurrent) {
          reviewText.classList.add("text-lg");
          reviewText.classList.remove("text-sm", "text-[10px]");
        } else {
          reviewText.classList.add("text-sm");
          reviewText.classList.remove("text-lg", "text-[10px]");
        }
      }
    }
  });
}

// Reapply classes on window resize to handle screen size changes
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
          .classList.remove("rotate-180");
      }
    });

    // Toggle current accordion
    if (isExpanded) {
      button.setAttribute("aria-expanded", "false");
      content.style.maxHeight = "0";
      button.querySelector("img").classList.remove("rotate-180");
    } else {
      button.setAttribute("aria-expanded", "true");
      content.style.maxHeight = content.scrollHeight + "px";
      button.querySelector("img").classList.add("rotate-180");
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
        .classList.remove("rotate-180");
    });
  }
});
