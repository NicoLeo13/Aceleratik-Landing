// Scroll para Aceleratik - maneja todo el movimiento suave y animaciones

// Función principal - arranca todo
function initScrollFunctions() {
  initSmoothScrolling();
  initScrollToTop();
  initScrollAnimations();
  initScrollIndicator();
}

// Navegación suave entre secciones
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  // Actualiza los enlaces activos
  function updateActiveLinks(sectionId) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    if (sectionId) {
      document.querySelectorAll(`a[href="#${sectionId}"]`).forEach((link) => {
        link.classList.add("active");
      });
      console.log("Sección activa:", sectionId);
    }
  }

  // Encuentra la sección según el scroll
  function findCurrentSection() {
    const scrollPosition = window.scrollY + 100; // Offset para detectar mejor la sección actual
    const sections = document.querySelectorAll("section[id]");
    const headerHeight = document.querySelector("header").offsetHeight;

    // Al inicio de la página
    if (scrollPosition <= headerHeight) {
      const firstSection = sections[0];
      return firstSection ? firstSection.getAttribute("id") : null;
    }

    // Al final de la página
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
      const lastSection = sections[sections.length - 1];
      return lastSection ? lastSection.getAttribute("id") : null;
    }

    // En el medio de la página
    for (const section of sections) {
      const sectionTop = section.offsetTop - headerHeight;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        return section.getAttribute("id");
      }
    }
    return null;
  }

  // Actualiza links al scrollear - con debounce pa q no se cague la performance
  const handleScroll = debounce(function () {
    const currentSectionId = findCurrentSection();
    updateActiveLinks(currentSectionId);
  }, 10);

  // Maneja clicks en los links
  function handleClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = document.querySelector("header").offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      history.pushState(null, null, targetId);

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      updateActiveLinks(targetSection.id);
    }
  }

  // Eventos
  window.addEventListener("scroll", handleScroll, { passive: true });
  navLinks.forEach((link) => link.addEventListener("click", handleClick));

  // Inicia al cargar la página
  handleScroll();
}

// Botón pa volver arriba
function initScrollToTop() {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  scrollBtn.className = "fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-secondary transition-all duration-300 opacity-0 pointer-events-none z-50";
  scrollBtn.id = "scroll-to-top";

  document.body.appendChild(scrollBtn);

  // Mostrar/ocultar según scroll
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.remove("opacity-0", "pointer-events-none");
      scrollBtn.classList.add("opacity-100");
    } else {
      scrollBtn.classList.add("opacity-0", "pointer-events-none");
      scrollBtn.classList.remove("opacity-100");
    }
  });

  // Funcionalidad - obvio
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Animaciones al scrollear - se ven re bien
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(".team-member, .value-card, .timeline-item");
  animatedElements.forEach((el) => observer.observe(el));
}

// Indicador de scroll - esa barrita arriba de todo
function initScrollIndicator() {
  if (!document.querySelector(".scroll-indicator")) {
    const scrollIndicator = document.createElement("div");
    scrollIndicator.className = "scroll-indicator";
    document.body.appendChild(scrollIndicator);
  }

  const scrollIndicator = document.querySelector(".scroll-indicator");

  // Actualizar el ancho del indicador basado en el scroll
  window.addEventListener("scroll", function () {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollIndicator.style.width = scrolled + "%";
  });
}

// Exportar todo
window.initScrollFunctions = initScrollFunctions;
window.initSmoothScrolling = initSmoothScrolling;
window.initScrollToTop = initScrollToTop;
window.initScrollAnimations = initScrollAnimations;
window.initScrollIndicator = initScrollIndicator;
