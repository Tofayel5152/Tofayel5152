// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", () => {
  const isExpanded = navLinks.classList.contains("active");
  navLinks.classList.toggle("active");

  // Update ARIA attributes
  mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
  mobileMenuBtn.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Scroll Effects (Header & Progress Bar)
window.addEventListener("scroll", () => {
  // Header
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Progress Bar
  const scrollProgress = document.getElementById("scrollProgress");
  if (scrollProgress) {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = progress + "%";
  }
});

// Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

if (themeToggle) {
  const icon = themeToggle.querySelector("i");
  
  // Check for saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    icon.classList.replace("fa-moon", "fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    
    if (body.classList.contains("dark-mode")) {
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    }
  });
}

// Gallery Modal
const galleryItems = document.querySelectorAll(".gallery-item");
const modal = document.getElementById("galleryModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const imgSrc = item.getAttribute("data-src");
    modalImage.src = imgSrc;
    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside the image
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Close modal with ESC key for keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
    }
});

// Gallery Filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const customSection = document.getElementById("customOrdersSection");
const mainGallery = document.getElementById("mainGallery");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active class from all
    filterBtns.forEach(b => b.classList.remove("active"));
    // Add active class to clicked
    btn.classList.add("active");
    
    const filterValue = btn.getAttribute("data-filter");
    
    // Filter all gallery items (both main and custom)
    galleryItems.forEach(item => {
      const category = item.getAttribute("data-category");
      if (filterValue === "all" || category === filterValue) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });

    // Show/hide the custom orders section based on filter
    if (customSection) {
      if (filterValue === "all" || filterValue === "custom") {
        customSection.style.display = "";
      } else {
        customSection.style.display = "none";
      }
    }

    // Hide main gallery container when only custom filter is selected
    if (mainGallery) {
      if (filterValue === "custom") {
        mainGallery.style.display = "none";
      } else {
        mainGallery.style.display = "";
      }
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Initialize header on page load
window.addEventListener("load", () => {
  if (window.scrollY > 50) {
    document.getElementById("header").classList.add("scrolled");
  }
});

// ===== PREMIUM FEATURES =====

// Loading Animation
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 1500); // Show loader for 1.5 seconds
});

// Typing Animation - REMOVED (user preference)


// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
  });
}

// Initialize Swiper for Specialties with Premium Effect
if (typeof Swiper !== 'undefined') {
  new Swiper(".specialty-swiper", {
    effect: "coverflow",
    speed: 1200, // Slower switching speed (1.2 seconds)
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: 1,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
      slideShadows: false, // Cleaner look without heavy shadows
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
       // when window width is >= 1024px
      1024: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Dynamic Copyright Year
const copyrightYear = document.getElementById("copyrightYear");
if (copyrightYear) {
  copyrightYear.textContent = new Date().getFullYear();
}

// ===== ORDER BUILDER (Cart with Quantity Editing) =====
let cartItems = {}; // { itemName: quantity }
const addToOrderBtns = document.querySelectorAll(".add-to-order-btn");
const floatingCart = document.getElementById("floatingCart");
const cartCount = document.getElementById("cartCount");

function getTotalCount() {
  return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
}

function updateCartCount() {
  const total = getTotalCount();
  cartCount.textContent = total;
  if (total > 0) {
    floatingCart.classList.add("show");
  } else {
    floatingCart.classList.remove("show");
  }
}

function renderCartModal() {
  const cartBody = document.getElementById("cartModalBody");
  const cartFooter = document.getElementById("cartModalFooter");
  const total = getTotalCount();

  if (total === 0) {
    cartBody.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-basket"></i><p>Your order is empty</p></div>';
    cartFooter.style.display = "none";
    return;
  }

  cartFooter.style.display = "flex";
  cartBody.innerHTML = Object.entries(cartItems).map(([name, qty]) => `
    <div class="cart-row" data-name="${name}">
      <span class="cart-item-name">${name}</span>
      <div class="cart-qty-controls">
        <button class="cart-qty-btn cart-minus" data-name="${name}" aria-label="Decrease quantity"><i class="fas fa-minus"></i></button>
        <span class="cart-qty">${qty}</span>
        <button class="cart-qty-btn cart-plus" data-name="${name}" aria-label="Increase quantity"><i class="fas fa-plus"></i></button>
      </div>
      <button class="cart-remove-btn" data-name="${name}" aria-label="Remove item"><i class="fas fa-trash"></i></button>
    </div>
  `).join("");

  // Attach qty btn events
  cartBody.querySelectorAll(".cart-minus").forEach(btn => {
    btn.addEventListener("click", () => {
      const n = btn.getAttribute("data-name");
      if (cartItems[n] > 1) {
        cartItems[n]--;
      } else {
        delete cartItems[n];
      }
      updateCartCount();
      renderCartModal();
    });
  });

  cartBody.querySelectorAll(".cart-plus").forEach(btn => {
    btn.addEventListener("click", () => {
      const n = btn.getAttribute("data-name");
      cartItems[n] = (cartItems[n] || 0) + 1;
      updateCartCount();
      renderCartModal();
    });
  });

  cartBody.querySelectorAll(".cart-remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const n = btn.getAttribute("data-name");
      delete cartItems[n];
      updateCartCount();
      renderCartModal();
    });
  });
}

// Build cart modal HTML and inject into page
const cartModalHTML = `
<div class="cart-modal" id="cartModal" role="dialog" aria-modal="true" aria-label="Order cart">
  <div class="cart-modal-inner">
    <div class="cart-modal-header">
      <h3><i class="fas fa-shopping-cart"></i> My Order</h3>
      <button class="cart-modal-close" id="cartModalClose" aria-label="Close cart">&times;</button>
    </div>
    <div class="cart-modal-body" id="cartModalBody"></div>
    <div class="cart-modal-footer" id="cartModalFooter" style="display:none">
      <button class="cart-clear-btn" id="cartClearBtn"><i class="fas fa-trash-alt"></i> Clear All</button>
      <button class="cart-whatsapp-btn" id="cartWhatsappBtn"><i class="fab fa-whatsapp"></i> Send Order via WhatsApp</button>
    </div>
  </div>
</div>
`;
document.body.insertAdjacentHTML("beforeend", cartModalHTML);

const cartModal = document.getElementById("cartModal");
const cartModalClose = document.getElementById("cartModalClose");
const cartClearBtn = document.getElementById("cartClearBtn");
const cartWhatsappBtn = document.getElementById("cartWhatsappBtn");

function openCartModal() {
  renderCartModal();
  cartModal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCartModal() {
  cartModal.classList.remove("open");
  document.body.style.overflow = "";
}

cartModalClose.addEventListener("click", closeCartModal);
cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) closeCartModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && cartModal.classList.contains("open")) closeCartModal();
});

if (cartClearBtn) {
  cartClearBtn.addEventListener("click", () => {
    cartItems = {};
    updateCartCount();
    renderCartModal();
  });
}

if (cartWhatsappBtn) {
  cartWhatsappBtn.addEventListener("click", () => {
    const total = getTotalCount();
    if (total === 0) return;
    let message = "Hi Tasmin Desserts! 👋\nI would like to order the following items from your website:\n\n";
    for (const [item, count] of Object.entries(cartItems)) {
      message += `🛒 ${count}x ${item}\n`;
    }
    message += "\nPlease let me know the total price and delivery details. Thank you!";
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://api.whatsapp.com/send?phone=8801625225738&text=${encodedMessage}`;
    window.open(waUrl, "_blank");
  });
}

// Add to order buttons
addToOrderBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent opening gallery modal
    const itemName = btn.getAttribute("data-name");
    cartItems[itemName] = (cartItems[itemName] || 0) + 1;
    updateCartCount();

    // Feedback animation
    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
    btn.style.background = '#25D366';
    btn.style.borderColor = '#25D366';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Order';
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 1500);
  });
});

if (floatingCart) {
  floatingCart.addEventListener("click", openCartModal);
}

