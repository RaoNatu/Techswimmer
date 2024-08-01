// Showing Nav services
document.getElementById('serviceBtn').addEventListener('click', () => {
  const icon = document.getElementById('serviceBtn').querySelector('.fa-solid')
  icon.classList.toggle('fa-chevron-down')
  icon.classList.toggle('fa-chevron-up')
  document.getElementById('servicesSection').classList.toggle('hidden')
})

// Showing FAQ Section
const faqSection = Array.from(document.getElementsByClassName('faq-mainSection'))
faqSection.forEach((section) => {
    section.addEventListener('click', () => {
        section.nextElementSibling.classList.toggle('hidden')
        section.querySelector('i').classList.toggle('fa-chevron-down')
        section.querySelector('i').classList.toggle('fa-chevron-up')
    })
})

// For Hamburger menu
let menuDisplay = false

document.getElementById('menu-btn').addEventListener('click', () => {
  if (menuDisplay) {
    document.getElementById('menu-ham').classList.add('hidden')
    document.getElementById('menu-btn').innerHTML =
      '<i class="text-black text-2xl fa-solid fa-bars">'
    menuDisplay = false
  } else {
    document.getElementById('menu-ham').classList.remove('hidden')
    document.getElementById('menu-btn').innerHTML =
      '<i class="text-black text-2xl fa-solid fa-xmark"></i>'
    menuDisplay = true
  }
})

function handleOfferingBtnClick(event, sectionId) {
    const contentSections = document.querySelectorAll('.offeringSection');
    contentSections.forEach((element) => {
        if (element.id !== sectionId) {
            element.classList.add('lg:hidden');
        }
    });

    const offeringBtns = document.querySelectorAll('.offeringBtn');
    offeringBtns.forEach((btn) => {
        btn.classList.remove('bg-blue-700', 'shadow-lg', 'w-[400px]', 'rounded-lg');
    });

    const clickedButton = event.target.closest('.offeringBtn');
    clickedButton.classList.add('bg-blue-700', 'shadow-lg', 'w-[400px]', 'rounded-lg');

    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove('lg:hidden');
}


function handleTechBtnClick(event, sectionId) {
    const techStackSection = document.querySelectorAll('.techStackSection')
    techStackSection.forEach((section) => {
        if(section.id !== sectionId) {
            section.classList.add('hidden')
        }
    })

    const techStackBtn = document.querySelectorAll('.techStackBtn')
    techStackBtn.forEach((btn) => {
        btn.classList.add('text-gray-500')
    })

    document.getElementById(sectionId).classList.remove('hidden')
    event.target.classList.remove('text-gray-500')
}


const slides = document.querySelectorAll('.carousel-slide');
const container = document.querySelector('.carousel-container');
const bulletsContainer = document.querySelector('.carousel-bullets');
let currentSlide = 0;

function updateHeight() {
  const currentSlideElement = slides[currentSlide];
  container.style.height = `${currentSlideElement.offsetHeight + 25}px`;
}

// Function to update bullet points
function updateBullets() {
  const bullets = document.querySelectorAll('.carousel-bullet');
  bullets.forEach((bullet, index) => {
    if (index === currentSlide) {
      bullet.classList.add('active');
    } else {
      bullet.classList.remove('active');
    }
  });
}

// Function to initialize bullet points
function initializeBullets() {
  slides.forEach((slide, index) => {
    const bullet = document.createElement('div');
    bullet.classList.add('carousel-bullet');
    if (index === currentSlide) {
      bullet.classList.add('active');
    }
    bullet.addEventListener('click', () => {
      showSlide(index);
    });
    bulletsContainer.appendChild(bullet);
  });
}

// Function to update slide content and bullets
function showSlide(index) {
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }
  const offset = -currentSlide * 100;
  slides.forEach((slide) => {
    slide.style.transform = `translateX(${offset}%)`;
  });
  updateHeight();
  updateBullets();
}

// Event listeners for previous and next buttons
function prevSlide() {
  showSlide(currentSlide - 1);
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

// Event listener for touch swipe gestures
let startX, endX;

container.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

container.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50;
  if (startX - endX > threshold) {
    showSlide(currentSlide + 1);
  } else if (endX - startX > threshold) {
    showSlide(currentSlide - 1);
  }
}

// Initialize the carousel
window.onload = () => {
  initializeBullets();
  showSlide(currentSlide);
  updateHeight();
  toggleCarouselContainer();
};

// Function to check screen size and toggle carousel-container class
function toggleCarouselContainer() {
  const smScreen = window.matchMedia('(min-width: 640px)').matches; // sm: 640px
  const lgScreen = window.matchMedia('(min-width: 1024px)').matches; // lg: 1024px
  const container = document.querySelector('.carousel-container');

  if (container) {
    if (lgScreen) {
      // Remove the class if screen size is lg or larger
      container.style.removeProperty('height');
      container.classList.remove('carousel-container');
    } else if (smScreen) {
      // Add the class if screen size is between sm and lg
      container.classList.add('carousel-container');
    } else {
      // Handle the case for screens smaller than sm (if needed)
      container.classList.remove('carousel-container');
    }
  }
}

// Event listener for window resize
window.addEventListener('resize', toggleCarouselContainer);