// Simple interactions for the portfolio

document.addEventListener('DOMContentLoaded', () => {
  
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('py-2');
      navbar.classList.remove('py-4');
    } else {
      navbar.classList.add('py-4');
      navbar.classList.remove('py-2');
    }
  });

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      
      if (isHidden) {
        // Open
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        // Slight delay for transition
        setTimeout(() => {
          mobileMenu.classList.remove('opacity-0');
          mobileMenu.classList.add('opacity-100');
        }, 10);
      } else {
        // Close
        mobileMenu.classList.remove('opacity-100');
        mobileMenu.classList.add('opacity-0');
        // Wait for transition before hiding
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('flex');
        }, 300);
      }
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('opacity-100');
        mobileMenu.classList.add('opacity-0');
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('flex');
        }, 300);
      });
    });
  }

  // ScrollSpy for Navigation Links
  const sections = document.querySelectorAll('header, section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= (sectionTop - window.innerHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    // If we're at the very bottom of the page, force the last section to be active
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      if (sections.length > 0) {
        current = sections[sections.length - 1].getAttribute('id');
      }
    }

    // Update Desktop Links
    navLinks.forEach(link => {
      link.classList.remove('text-[#e2f24d]');
      link.classList.add('text-white/70');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-[#e2f24d]');
        link.classList.remove('text-white/70');
      }
    });

    // Update Mobile Links
    mobileLinks.forEach(link => {
      link.classList.remove('text-[#e2f24d]');
      link.classList.add('text-white');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-[#e2f24d]');
        link.classList.remove('text-white');
      }
    });
  });
});
