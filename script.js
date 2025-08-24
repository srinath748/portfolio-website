document.addEventListener("DOMContentLoaded", () => {
  // // ===== Back to Top Button =====
  // const backToTop = document.getElementById("backToTop");
  // if (backToTop) {
  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY > 200) {
  //       backToTop.classList.add("show");
  //     } else {
  //       backToTop.classList.remove("show");
  //     }
  //   });

  //   backToTop.addEventListener("click", () => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   });
  // }

  // ===== Highlight Active Nav Link on Scroll =====
  const sections = document.querySelectorAll("section");
  const headerLinks = document.querySelectorAll(".header nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 70; // offset for header
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    headerLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  // ===== Mobile Hamburger Menu =====
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
      menuToggle.classList.toggle("active"); // animate ☰ ↔ X
    });

    const menuLinks = navMenu.querySelectorAll("a");
    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        menuToggle.classList.remove("active");
      });
    });
  }

  // ===== Night Mode Toggle =====
  const toggleBtn = document.getElementById("modeToggle");

  // Apply saved mode on load
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    toggleBtn.textContent = "🌙 Night Mode";
  }

  // Toggle on click
  toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-mode");

    if (document.documentElement.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "☀️ Light Mode";
    } else {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌙 Night Mode";
    }
  });

  // ===== Scroll-based Reveal Animation =====
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // run once on load
});
// ===== Contact Form Submission =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload

    const name = contactForm.elements['name'].value;
    const email = contactForm.elements['email'].value;
    const message = contactForm.elements['message'].value;

    // Log message in console
    console.log('Message Sent:', { name, email, message });

    // Optional: show an alert or confirmation on the page
    alert(`Thank you, ${name}! Your message has been sent.\n\nMessage: ${message}`);

    // Send form to Formspree
    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        contactForm.reset(); // clear form
      } else {
        alert('Oops! Something went wrong.');
      }
    }).catch(err => {
      console.error('Form submit error:', err);
      alert('Oops! Something went wrong.');
    });
  });
}
