// Principal para Aceleratik - toda la interactividad y demás

document.addEventListener("DOMContentLoaded", function () {
  // Arrancar todo
  initMobileMenu();
  initScrollFunctions();
  initCalendar();
  initStepper();
  initContactForm();
  initTeamCarousel();
  initAccordion();
  initMobilePhases();
  initBudgetMobile();
  initContactSection();
  initFooterAccordion();
  initTabsNavigation();
  initPaymentTabs();
  initProblemasAccordion();
  initBudgetChart();
  initArchitectureSection();
  initAlcanceSwipe();
  initProveedoresSection();
  initDocumentacionSection();

  // Actualizar links activos después de cargar todo
  setTimeout(function () {
    const currentHash = window.location.hash;
    if (currentHash) {
      // Si hay hash en URL, activar ese link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
      });
      document.querySelectorAll(`a[href="${currentHash}"]`).forEach((link) => {
        link.classList.add("active");
      });
    } else {
      // Activar la primera sección si no hay hash
      const sections = document.querySelectorAll("section[id]");
      if (sections.length) {
        const firstSectionId = sections[0].getAttribute("id");
        document.querySelectorAll(`a[href="#${firstSectionId}"]`).forEach((link) => {
          link.classList.add("active");
        });
      }
    }
  }, 100);

  // Visualización responsive
  actualizarVisualizacionResponsiva();
});

// ===== MENÚ MÓVIL =====
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!menuToggle || !mobileMenu) {
    console.error("Faltan elementos del menú... xdxd");
    return;
  }

  // Cerrar el menú al inicio
  mobileMenu.classList.add("hidden");
  menuToggle.setAttribute("aria-expanded", "false");

  // Click en el botón del menú
  menuToggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    const newState = !isExpanded;

    menuToggle.setAttribute("aria-expanded", newState);

    // Animación para mostrar/ocultar
    if (newState) {
      mobileMenu.classList.remove("hidden");
      void mobileMenu.offsetWidth;
      mobileMenu.classList.add("open");
    } else {
      mobileMenu.classList.remove("open");
      setTimeout(() => {
        mobileMenu.classList.add("hidden");
      }, 300);
    }

    // Cambiar ícono
    const icon = menuToggle.querySelector("i");
    if (icon) {
      if (newState) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }

    // Controlar scroll
    document.body.style.overflow = newState ? "hidden" : "";
  });

  // Cerrar al hacer click en links
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");

      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }

      document.body.style.overflow = "";

      setTimeout(() => {
        mobileMenu.classList.add("hidden");
      }, 300);
    });
  });

  // Cerrar cuando se hace click afuera
  document.addEventListener("click", function (event) {
    if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target) && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");

      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }

      document.body.style.overflow = "";

      setTimeout(() => {
        mobileMenu.classList.add("hidden");
      }, 300);
    }
  });

  // Cerrar si la pantalla crece
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      mobileMenu.classList.remove("open");
      mobileMenu.classList.add("hidden");
      menuToggle.setAttribute("aria-expanded", "false");

      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }

      document.body.style.overflow = "";
    }
  });
}

// ===== CRONOGRAMA DE HITOS =====
function initCalendar() {
  // Ya no hay calendario interactivo, solo hitos estáticos
  const milestoneItems = document.querySelectorAll(".milestone-item");

  if (!milestoneItems.length) return;

  // Animaciones pa los hitos
  milestoneItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.classList.add("transform", "scale-105", "transition-all", "duration-300");
      const shadow = "shadow-lg";
      const card = this.querySelector("div.rounded-lg");
      if (card) {
        card.classList.add(shadow);
      }
    });

    item.addEventListener("mouseleave", function () {
      this.classList.remove("transform", "scale-105", "transition-all", "duration-300");
      const shadow = "shadow-lg";
      const card = this.querySelector("div.rounded-lg");
      if (card) {
        card.classList.remove(shadow);
      }
    });
  });
}

// ===== STEPPER DE METODOLOGÍA =====
function initStepper() {
  const stepItems = document.querySelectorAll(".step-item");
  const progressBar = document.getElementById("progress-bar");
  const prevStepBtn = document.getElementById("prev-step");
  const nextStepBtn = document.getElementById("next-step");

  if (!stepItems.length || !progressBar) return;

  let currentStep = 1;
  const totalSteps = stepItems.length;

  function updateStepper() {
    // Actualizar círculos
    stepItems.forEach((item, index) => {
      const stepNumber = index + 1;
      const circle = item.querySelector(".step-circle");

      if (stepNumber <= currentStep) {
        // Completado o actual
        circle.className = "w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 step-circle";
        item.classList.add("active");
      } else {
        // Pendiente
        circle.className = "w-16 h-16 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 step-circle";
        item.classList.remove("active");
      }
    });

    // Barra de progreso
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    // Botones
    if (prevStepBtn) {
      prevStepBtn.disabled = currentStep === 1;
      prevStepBtn.className = currentStep === 1 ? "bg-gray-200 text-gray-400 px-4 py-2 rounded cursor-not-allowed" : "bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400 transition-colors";
    }

    if (nextStepBtn) {
      nextStepBtn.disabled = currentStep === totalSteps;
      nextStepBtn.className = currentStep === totalSteps ? "bg-gray-200 text-gray-400 px-4 py-2 rounded cursor-not-allowed" : "bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors";
    }
  }

  // Click en botones
  if (prevStepBtn) {
    prevStepBtn.addEventListener("click", function () {
      if (currentStep > 1) {
        currentStep--;
        updateStepper();
      }
    });
  }

  if (nextStepBtn) {
    nextStepBtn.addEventListener("click", function () {
      if (currentStep < totalSteps) {
        currentStep++;
        updateStepper();
      }
    });
  }

  // Click directo en pasos
  stepItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      currentStep = index + 1;
      updateStepper();
    });
  });

  // Iniciar
  updateStepper();
}

// ===== FORMULARIO DE CONTACTO =====
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Datos del form
    const formData = new FormData(contactForm);
    const nombre = formData.get("nombre");
    const email = formData.get("email");
    const empresa = formData.get("empresa");
    const telefono = formData.get("telefono");
    const mensaje = formData.get("mensaje");

    // Validación básica
    if (!validarFormulario(nombre, email, mensaje)) {
      return;
    }

    // Enviamos y listo
    mostrarMensajeExito();
    contactForm.reset();
  });

  // Validar mientras escriben
  const inputs = contactForm.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validarCampo(this);
    });
  });
}

function validarFormulario(nombre, email, mensaje) {
  let esValido = true;

  // Nombre
  if (!nombre || nombre.trim().length < 2) {
    mostrarError("nombre", "El nombre debe tener al menos 2 caracteres");
    esValido = false;
  } else {
    limpiarError("nombre");
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    mostrarError("email", "Por favor ingresa un email válido");
    esValido = false;
  } else {
    limpiarError("email");
  }

  // Mensaje
  if (!mensaje || mensaje.trim().length < 10) {
    mostrarError("mensaje", "El mensaje debe tener al menos 10 caracteres");
    esValido = false;
  } else {
    limpiarError("mensaje");
  }

  return esValido;
}

function validarCampo(campo) {
  const valor = campo.value.trim();
  const nombre = campo.name;

  switch (nombre) {
    case "nombre":
      if (valor && valor.length < 2) {
        mostrarError(nombre, "El nombre debe tener al menos 2 caracteres");
      } else {
        limpiarError(nombre);
      }
      break;

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (valor && !emailRegex.test(valor)) {
        mostrarError(nombre, "Por favor ingresa un email válido");
      } else {
        limpiarError(nombre);
      }
      break;

    case "telefono":
      const telefonoRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (valor && !telefonoRegex.test(valor)) {
        mostrarError(nombre, "Por favor ingresa un teléfono válido");
      } else {
        limpiarError(nombre);
      }
      break;

    case "mensaje":
      if (valor && valor.length < 10) {
        mostrarError(nombre, "El mensaje debe tener al menos 10 caracteres");
      } else {
        limpiarError(nombre);
      }
      break;
  }
}

function mostrarError(campo, mensaje) {
  const input = document.getElementById(campo);
  if (!input) return;

  // Quitar error anterior
  limpiarError(campo);

  // Poner clase de error
  input.classList.add("border-red-500", "ring-red-500");
  input.classList.remove("border-gray-300");

  // Crear mensaje
  const errorDiv = document.createElement("div");
  errorDiv.className = "text-red-500 text-sm mt-1";
  errorDiv.textContent = mensaje;
  errorDiv.id = `error-${campo}`;

  input.parentNode.appendChild(errorDiv);
}

function limpiarError(campo) {
  const input = document.getElementById(campo);
  const errorDiv = document.getElementById(`error-${campo}`);

  if (input) {
    input.classList.remove("border-red-500", "ring-red-500");
    input.classList.add("border-gray-300");
  }

  if (errorDiv) {
    errorDiv.remove();
  }
}

function mostrarMensajeExito() {
  // Notificación de éxito
  const successDiv = document.createElement("div");
  successDiv.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
  successDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>¡Mensaje enviado correctamente! Te contactaremos pronto.</span>
        </div>
    `;

  document.body.appendChild(successDiv);

  // Quitar después de 5s
  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

// ===== UTILIDADES =====
// Movidas a utils.js:
// - formatearMoneda
// - esEmailValido
// - debounce
// - esMobile
// - esTablet
// - esDesktop
// - actualizarVisualizacionResponsiva

// ===== EVENTOS GLOBALES =====

// Resize
window.addEventListener(
  "resize",
  debounce(function () {
    if (esMobile()) {
      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    }

    actualizarVisualizacionResponsiva();

    if (typeof updateItemsPerView === "function") {
      updateItemsPerView();
    }
  }, 250)
);

// Lazy loading de imágenes
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img[src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
});

// Evitar que enlaces vacíos hagan scroll
document.addEventListener("click", function (e) {
  if (e.target.tagName === "A" && e.target.getAttribute("href") === "#") {
    e.preventDefault();
  }
});

// Carrusel del equipo
function initTeamCarousel() {
  const carousel = document.getElementById("team-carousel");
  const prevBtn = document.getElementById("prev-team");
  const nextBtn = document.getElementById("next-team");
  const carouselContainer = document.querySelector(".carousel-container");
  const indicatorsContainer = document.getElementById("carousel-indicators");

  if (!carousel || !prevBtn || !nextBtn || !carouselContainer || !indicatorsContainer) return;

  let currentIndex = 0;
  let itemsPerView = 1; // Mobile first
  let totalItems = carousel.children.length;
  let touchStartX = 0;
  let touchEndX = 0;
  let isSwiping = false;

  // Cuántos elementos mostrar según pantalla
  function updateItemsPerView() {
    const width = window.innerWidth;

    if (width < 768) {
      itemsPerView = 1; // Móvil: 1
    } else if (width < 1024) {
      itemsPerView = 2; // Tablet: 2
    } else {
      itemsPerView = 3; // Desktop: 3
    }

    // Ancho de items
    Array.from(carousel.children).forEach((item) => {
      item.style.width = `${100 / itemsPerView}%`;
    });

    // Crear indicadores
    generateIndicators();

    // Asegurar índice válido
    const maxIndex = Math.max(0, totalItems - itemsPerView);
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    // Actualizar posición
    updateCarouselPosition();
  }

  // Genera los indicadores
  function generateIndicators() {
    // Limpiar los que ya hay
    indicatorsContainer.innerHTML = "";

    // Calcular cuántos necesitamos
    const totalSlides = Math.ceil((totalItems - itemsPerView + 1) / 1);

    // Crear nuevos
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement("span");
      indicator.classList.add("carousel-indicator", "w-1", "h-1", "md:w-2", "md:h-2", "rounded-full", "cursor-pointer", "transform", "transition-all", "duration-300", "hover:scale-125", "touch-target", "mx-1");

      if (Math.floor(currentIndex) === i) {
        indicator.classList.add("bg-primary");
      } else {
        indicator.classList.add("bg-gray-300");
      }

      indicator.dataset.index = i;
      indicator.addEventListener("click", () => {
        goToSlide(i);
      });

      indicatorsContainer.appendChild(indicator);
    }
  }

  // Actualiza posición y estado
  function updateCarouselPosition() {
    // Mover el carrusel
    const translateValue = -currentIndex * (100 / itemsPerView);
    carousel.style.transform = `translateX(${translateValue}%)`;

    // Actualizar indicadores
    const indicators = indicatorsContainer.querySelectorAll(".carousel-indicator");
    indicators.forEach((indicator, index) => {
      if (Math.floor(currentIndex) === parseInt(indicator.dataset.index)) {
        indicator.classList.remove("bg-gray-300");
        indicator.classList.add("bg-primary");
      } else {
        indicator.classList.remove("bg-primary");
        indicator.classList.add("bg-gray-300");
      }
    });

    // Botones - disabled y estilos
    const maxIndex = Math.max(0, totalItems - itemsPerView);

    // Prev
    prevBtn.disabled = currentIndex <= 0;
    prevBtn.classList.toggle("opacity-50", currentIndex <= 0);
    prevBtn.classList.toggle("cursor-not-allowed", currentIndex <= 0);

    // Next
    nextBtn.disabled = currentIndex >= maxIndex;
    nextBtn.classList.toggle("opacity-50", currentIndex >= maxIndex);
    nextBtn.classList.toggle("cursor-not-allowed", currentIndex >= maxIndex);
  }

  // Ir a un slide específico
  function goToSlide(index) {
    const maxIndex = Math.max(0, totalItems - itemsPerView);
    currentIndex = Math.min(Math.max(0, index), maxIndex);
    updateCarouselPosition();
  }

  // Avanzar y retroceder
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarouselPosition();
    }
  }

  function nextSlide() {
    const maxIndex = totalItems - itemsPerView;
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarouselPosition();
    }
  }

  // Inicializar tactil
  function initTouchEvents() {
    carouselContainer.addEventListener("touchstart", handleTouchStart, { passive: true });
    carouselContainer.addEventListener("touchmove", handleTouchMove, { passive: true });
    carouselContainer.addEventListener("touchend", handleTouchEnd, { passive: true });
  }

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    isSwiping = true;
    carousel.style.transition = "none";
  }

  function handleTouchMove(e) {
    if (!isSwiping) return;

    touchEndX = e.touches[0].clientX;
    const diffX = touchStartX - touchEndX;
    const containerWidth = carouselContainer.offsetWidth;
    const movePercent = (diffX / containerWidth) * 100;

    // Posición base
    const baseTranslate = -currentIndex * (100 / itemsPerView);

    // Con resistencia en los extremos
    let translateValue = baseTranslate - movePercent;

    // Al inicio
    if (currentIndex === 0 && movePercent < 0) {
      translateValue = baseTranslate - movePercent * 0.2;
    }

    // Al final
    const maxIndex = totalItems - itemsPerView;
    if (currentIndex >= maxIndex && movePercent > 0) {
      translateValue = baseTranslate - movePercent * 0.2;
    }

    carousel.style.transform = `translateX(${translateValue}%)`;
  }

  function handleTouchEnd(e) {
    if (!isSwiping) return;

    carousel.style.transition = "transform 0.5s ease-in-out";

    touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    const containerWidth = carouselContainer.offsetWidth;

    // Swipe fuerte = cambio (20% del ancho)
    const threshold = containerWidth * 0.2;

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else {
      // No fue suficiente
      updateCarouselPosition();
    }

    isSwiping = false;
  }

  // Iniciar carrusel
  function init() {
    updateItemsPerView();
    initTouchEvents();

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    window.addEventListener("resize", debounce(updateItemsPerView, 150));
    updateCarouselPosition();
  }

  init();
}

// Acordeón para sección de presupuesto
function initAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  if (!accordionHeaders.length) return;

  // Abrir un panel
  function openAccordionPanel(header) {
    // Cerrar todo primero
    closeAllAccordionPanels();

    const content = header.nextElementSibling;
    if (!content || !content.classList.contains("accordion-content")) return;

    // Altura real
    content.style.maxHeight = `${content.scrollHeight}px`;

    // Girar icono
    const icon = header.querySelector(".accordion-icon");
    if (icon) {
      icon.style.transform = "rotate(180deg)";
    }

    // Clases activas
    header.classList.add("active");
    header.classList.add("bg-blue-50");
  }

  // Cerrar todos los paneles
  function closeAllAccordionPanels() {
    accordionHeaders.forEach((header) => {
      const content = header.nextElementSibling;
      const icon = header.querySelector(".accordion-icon");

      if (content && content.classList.contains("accordion-content")) {
        content.style.maxHeight = "0";
      }

      if (icon) {
        icon.style.transform = "rotate(0deg)";
      }

      header.classList.remove("active");
      header.classList.remove("bg-blue-50");
    });
  }

  // Click en headers
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      if (this.classList.contains("active")) {
        closeAllAccordionPanels();
      } else {
        openAccordionPanel(this);
      }
    });
  });

  // Inicialización según pantalla
  function initializeBasedOnSize() {
    // Cerrar todo primero
    closeAllAccordionPanels();

    // Abrir el primero
    if (accordionHeaders.length > 0) {
      openAccordionPanel(accordionHeaders[0]);
    }
  }

  // Arrancar
  initializeBasedOnSize();

  // Actualizar en resize
  window.addEventListener("resize", debounce(initializeBasedOnSize, 250));
}

// ===== PRESUPUESTO RESPONSIVO =====
function initBudgetMobile() {
  // Categorías y tabs
  const categoryBtns = document.querySelectorAll(".category-btn");
  const categoryContents = document.querySelectorAll(".category-content");

  // Activar una categoría
  function activateCategory(category) {
    // Botones móvil
    categoryBtns.forEach((b) => {
      b.classList.remove("bg-blue-500", "text-white");
      b.classList.add("bg-gray-200", "text-gray-700");
    });

    const activeBtn = document.querySelector(`.category-btn[data-category="${category}"]`);
    if (activeBtn) {
      activeBtn.classList.remove("bg-gray-200", "text-gray-700");
      activeBtn.classList.add("bg-blue-500", "text-white");
    }

    // Ocultar todo
    categoryContents.forEach((content) => {
      content.classList.add("hidden");
    });

    // Mostrar lo seleccionado
    const selectedContent = document.querySelector(`.category-content[data-category="${category}"]`);
    if (selectedContent) {
      selectedContent.classList.remove("hidden");

      // Expandir si está en acordeón
      if (selectedContent.classList.contains("accordion-item")) {
        const header = selectedContent.querySelector(".accordion-header");
        const content = selectedContent.querySelector(".accordion-content");
        const icon = header?.querySelector(".accordion-icon");

        if (content && !content.style.maxHeight) {
          content.style.maxHeight = content.scrollHeight + "px";
          if (icon) icon.style.transform = "rotate(180deg)";
        }
      }
    }
  }

  // Para que se use desde utils.js
  window.activateCategory = activateCategory;

  // Click en botones
  if (categoryBtns.length && categoryContents.length) {
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const category = this.getAttribute("data-category");
        activateCategory(category);
      });
    });
  }

  // Que no se abran todos al cargar
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
      const accordionItems = document.querySelectorAll("#detalles-inversion .accordion-item");

      // Cerrar todo
      accordionItems.forEach((item) => {
        const header = item.querySelector(".accordion-header");
        const content = item.querySelector(".accordion-content");
        const icon = header?.querySelector(".accordion-icon");

        if (content) content.style.maxHeight = "0";
        if (icon) icon.style.transform = "rotate(0deg)";
        if (header) header.classList.remove("active", "bg-blue-50");
      });
    }, 100);
  });

  // Tabs de pago
  const paymentTabs = document.querySelectorAll(".payment-tab");
  const paymentOptions = document.querySelectorAll(".payment-option");

  if (paymentTabs.length && paymentOptions.length) {
    // Estado inicial
    function initPaymentOptions() {
      if (window.innerWidth < 768) {
        // Móvil: solo la primera
        paymentOptions.forEach((option, index) => {
          if (index === 0) {
            option.classList.add("payment-active");
            option.classList.remove("payment-hidden");
            option.style.display = "block";
          } else {
            option.classList.remove("payment-active");
            option.classList.add("payment-hidden");
            option.style.display = "none";
          }
        });
      } else {
        // Desktop: todas
        paymentOptions.forEach((option) => {
          option.style.display = "block";
        });
      }
    }

    // Iniciar
    initPaymentOptions();

    paymentTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab");

        // Actualizar tabs
        paymentTabs.forEach((t) => {
          t.classList.remove("bg-primary", "text-white");
          t.classList.add("bg-gray-100", "text-gray-700");
        });
        this.classList.remove("bg-gray-100", "text-gray-700");
        this.classList.add("bg-primary", "text-white");

        // Actualizar opciones
        paymentOptions.forEach((option) => {
          option.classList.remove("payment-active");
          option.classList.add("payment-hidden");

          // En móvil solo mostrar la activa
          if (window.innerWidth < 768) {
            option.style.display = option.getAttribute("data-option") === tabId ? "block" : "none";
          }
        });

        // Mostrar lo seleccionado
        const selectedOption = document.querySelector(`.payment-option[data-option="${tabId}"]`);
        if (selectedOption) {
          selectedOption.classList.add("payment-active");
          selectedOption.classList.remove("payment-hidden");
          selectedOption.style.display = "block";
        }
      });
    });

    // Ajustar en resize
    window.addEventListener(
      "resize",
      debounce(function () {
        if (window.innerWidth >= 768) {
          // Desktop: mostrar todo
          paymentOptions.forEach((option) => {
            option.style.display = "block";
          });
        } else {
          // Móvil: solo la activa
          paymentOptions.forEach((option) => {
            const isActive = option.classList.contains("payment-active");
            option.style.display = isActive ? "block" : "none";
          });
        }
      }, 250)
    );
  }

  // Iniciar acordeones según pantalla
  function initializeAccordions() {
    // Cerrar todos los acordeones
    const allAccordionContents = document.querySelectorAll(".accordion-content");
    const allIcons = document.querySelectorAll(".accordion-icon");
    const allHeaders = document.querySelectorAll(".accordion-header");

    allAccordionContents.forEach((content) => {
      content.style.maxHeight = "0";
    });

    allIcons.forEach((icon) => {
      icon.style.transform = "rotate(0deg)";
    });

    allHeaders.forEach((header) => {
      header.classList.remove("active", "bg-blue-50");
    });

    // Ocultar todas las categorías
    categoryContents.forEach((content) => {
      content.classList.add("hidden");
    });

    // Activar la primera (análisis)
    activateCategory("analisis");
  }

  // Iniciar
  initializeAccordions();

  // Actualizar en resize
  window.addEventListener(
    "resize",
    debounce(function () {
      initializeAccordions();
    }, 250)
  );
}

// ===== CONTACTO RESPONSIVO =====
function initContactSection() {
  // Tabs principales (Mensaje / Ubicación) en móvil
  const contactTabs = document.querySelectorAll(".contact-tab");
  const contactContents = document.querySelectorAll(".contact-content");

  // Tabs de info (Contacto / Mapa) en móvil
  const contactInfoTabs = document.querySelectorAll(".contact-info-tab");
  const contactInfoContents = document.querySelectorAll(".contact-info-content");

  // Actualizar según tamaño
  function updateContactDisplay() {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Móvil: solo mostrar el contenido activo
      contactContents.forEach((content) => {
        const isActive = content.classList.contains("active-content");
        content.style.display = isActive ? "block" : "none";
      });

      // Asegurar que hay algo activo
      if (!document.querySelector(".contact-content.active-content")) {
        contactContents[0].classList.add("active-content");
        contactContents[0].style.display = "block";
      }

      // Control de pestañas de info
      contactInfoContents.forEach((content) => {
        const isActive = content.getAttribute("data-content") === "contact";
        content.style.display = isActive ? "block" : "none";
      });
    } else {
      // Desktop: mostrar todo
      contactContents.forEach((content) => {
        content.style.display = "block";
      });

      contactInfoContents.forEach((content) => {
        content.style.display = "block";
      });
    }
  }

  // Click en tabs principales
  if (contactTabs.length && contactContents.length) {
    contactTabs.forEach((tab) => {
      tab.addEventListener("click", function (e) {
        e.preventDefault();

        const tabId = this.getAttribute("data-tab");

        // Estilos de tabs
        contactTabs.forEach((t) => {
          if (t.getAttribute("data-tab") === "form") {
            t.classList.remove("bg-primary");
            t.classList.add("bg-gray-700");
          } else if (t.getAttribute("data-tab") === "info") {
            t.classList.remove("bg-gray-700");
            t.classList.add("bg-gray-700");
          }
        });

        // Tab activa
        this.classList.remove("bg-gray-700");
        this.classList.add("bg-primary");

        // Contenido visible
        contactContents.forEach((content) => {
          const contentId = content.getAttribute("data-content");
          content.classList.remove("active-content");

          if (contentId === tabId) {
            content.classList.add("active-content");
          }
        });

        updateContactDisplay();
      });
    });
  }

  // Click en tabs de info
  if (contactInfoTabs.length && contactInfoContents.length) {
    contactInfoTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab");

        // Estilos de tabs
        contactInfoTabs.forEach((t) => {
          t.classList.remove("active-tab", "bg-primary", "text-white");
          t.classList.add("bg-gray-200", "text-gray-700");
        });

        this.classList.remove("bg-gray-200", "text-gray-700");
        this.classList.add("active-tab", "bg-primary", "text-white");

        // Solo en móvil mostrar/ocultar
        if (window.innerWidth < 768) {
          contactInfoContents.forEach((content) => {
            const contentId = content.getAttribute("data-content");
            content.style.display = contentId === tabId ? "block" : "none";
          });
        }
      });
    });
  }

  // Iniciar
  updateContactDisplay();

  // Actualizar en resize
  window.addEventListener("resize", debounce(updateContactDisplay, 250));
}

// ===== ACORDEÓN FOOTER MÓVIL =====
function initFooterAccordion() {
  const accordionBtns = document.querySelectorAll(".footer-accordion-btn");

  accordionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const icon = this.querySelector("i");

      if (content.style.maxHeight) {
        // Cerrar
        content.style.maxHeight = null;
        icon.style.transform = "rotate(0deg)";
      } else {
        // Abrir
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(180deg)";
      }
    });
  });
}

// ===== TABS DE NAVEGACIÓN MÓVIL =====
function initTabsNavigation() {
  const tabs = document.querySelectorAll(".md\\:hidden .flex button");
  if (tabs.length > 0) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Quitar active de todos
        tabs.forEach((t) => t.classList.remove("active-tab", "bg-primary", "text-white"));
        tabs.forEach((t) => t.classList.add("bg-gray-200", "text-gray-700"));

        // Poner active al actual
        this.classList.add("active-tab", "bg-primary", "text-white");
        this.classList.remove("bg-gray-200", "text-gray-700");
      });
    });
  }
}

// ===== FASES EN MÓVIL =====
function initMobilePhases() {
  const container = document.getElementById("mobile-phases");
  if (!container) return;

  const slider = container.querySelector(".flex");
  const prevBtn = document.getElementById("prev-phase-mobile");
  const nextBtn = document.getElementById("next-phase-mobile");
  const progressBar = document.getElementById("mobile-progress");
  const faseIndicator = document.getElementById("fase-indicator");
  const dots = document.querySelectorAll("[data-phase]");

  if (!slider || !prevBtn || !nextBtn || !progressBar || !dots.length) return;

  let currentPhase = 0;
  const totalPhases = 4;

  function updatePhase(newPhase) {
    if (newPhase < 0 || newPhase >= totalPhases) return;

    currentPhase = newPhase;

    // Mover slider
    slider.style.transition = "transform 0.3s ease-in-out";
    slider.style.transform = `translateX(-${currentPhase * 100}%)`;

    // Barra de progreso
    const progress = ((currentPhase + 1) / totalPhases) * 100;
    progressBar.style.width = `${progress}%`;

    // Texto de fase
    faseIndicator.textContent = `Fase ${currentPhase + 1} de ${totalPhases}`;

    // Puntitos
    dots.forEach((dot, index) => {
      if (index === currentPhase) {
        dot.classList.remove("bg-gray-300");
        dot.classList.add("bg-primary");
      } else {
        dot.classList.remove("bg-primary");
        dot.classList.add("bg-gray-300");
      }
    });

    // Botones
    prevBtn.disabled = currentPhase === 0;
    prevBtn.classList.toggle("opacity-50", currentPhase === 0);
    nextBtn.disabled = currentPhase === totalPhases - 1;
    nextBtn.classList.toggle("opacity-50", currentPhase === totalPhases - 1);
  }

  // Botón anterior
  prevBtn.addEventListener("click", function () {
    if (currentPhase > 0) {
      updatePhase(currentPhase - 1);
    }
  });

  // Botón siguiente
  nextBtn.addEventListener("click", function () {
    if (currentPhase < totalPhases - 1) {
      updatePhase(currentPhase + 1);
    }
  });

  // Click en los puntitos
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      updatePhase(index);
    });
  });

  // Swipe pa móvil
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.touches[0].clientX;
      slider.style.transition = "none";
    },
    { passive: true }
  );

  container.addEventListener(
    "touchmove",
    function (e) {
      touchEndX = e.touches[0].clientX;
      const diff = touchEndX - touchStartX;
      const movePercent = (diff / container.offsetWidth) * 100;

      // Limitar en los extremos
      if (currentPhase === 0 && movePercent > 0) return;
      if (currentPhase === totalPhases - 1 && movePercent < 0) return;

      slider.style.transform = `translateX(calc(-${currentPhase * 100}% + ${movePercent}%))`;
    },
    { passive: true }
  );

  container.addEventListener("touchend", function () {
    slider.style.transition = "transform 0.3s ease-in-out";

    const diff = touchEndX - touchStartX;
    const threshold = container.offsetWidth * 0.2; // 20% del ancho

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentPhase > 0) {
        updatePhase(currentPhase - 1);
      } else if (diff < 0 && currentPhase < totalPhases - 1) {
        updatePhase(currentPhase + 1);
      } else {
        updatePhase(currentPhase);
      }
    } else {
      updatePhase(currentPhase);
    }
  });

  // Iniciar
  updatePhase(0);
}

function initPaymentTabs() {
  // Tabs de pago
  const paymentTabs = document.querySelectorAll(".payment-tab");
  const paymentContents = document.querySelectorAll(".payment-content");

  paymentTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Actualizar tabs
      paymentTabs.forEach((t) => {
        t.classList.remove("bg-primary", "text-white");
        t.classList.add("bg-gray-100", "text-gray-700");
      });
      this.classList.remove("bg-gray-100", "text-gray-700");
      this.classList.add("bg-primary", "text-white");

      // Actualizar contenido
      paymentContents.forEach((content) => {
        content.classList.remove("active");
        content.classList.add("hidden");
      });
      document.querySelector(`.payment-content[data-tab="${tabId}"]`).classList.remove("hidden");
      document.querySelector(`.payment-content[data-tab="${tabId}"]`).classList.add("active");
    });
  });
}

function initProblemasAccordion() {
  // Todos los acordeones
  const accordions = document.querySelectorAll(".accordion-problema");

  // Configurar cada uno
  accordions.forEach((accordion) => {
    const button = accordion.querySelector(".problema-btn");
    const content = accordion.querySelector(".problema-content");

    button.addEventListener("click", function () {
      // Ver si está activo
      const isActive = accordion.classList.contains("active");

      // Cerrar todos
      accordions.forEach((acc) => {
        acc.classList.remove("active");
        acc.querySelector(".problema-btn").classList.remove("active");
        acc.querySelector(".problema-content").style.maxHeight = "0px";
      });

      // Si no estaba activo, abrirlo
      if (!isActive) {
        accordion.classList.add("active");
        button.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // Abrir el primero por defecto
  if (accordions.length > 0) {
    const firstAccordion = accordions[0];
    const firstButton = firstAccordion.querySelector(".problema-btn");
    const firstContent = firstAccordion.querySelector(".problema-content");

    firstAccordion.classList.add("active");
    firstButton.classList.add("active");
    firstContent.style.maxHeight = firstContent.scrollHeight + "px";
  }
}

/**
 * Inicializa el gráfico del presupuesto dinámicamente
 */
function initBudgetChart() {
  // Constantes para las categorías y sus ítems
  const BUDGET_ITEMS = {
    analisis: {
      name: "Análisis",
      displayName: "Análisis y evaluación de ERP",
      color: "#2563eb", // blue-500
      items: [
        { name: "Diagnóstico de situación actual", value: 150000 },
        { name: "Evaluación comparativa de soluciones", value: 200000 },
        { name: "Selección de proveedores", value: 120000 },
        { name: "Informe técnico detallado", value: 95000 },
      ],
    },
    gestion: {
      name: "Gestión",
      displayName: "Gestión del cambio",
      color: "#10b981", // green-500
      items: [
        { name: "Mapeo de procesos actuales", value: 180000 },
        { name: "Diseño de procesos optimizados", value: 220000 },
        { name: "Plan de comunicación interna", value: 85000 },
        { name: "Gestión de resistencia al cambio", value: 90000 },
      ],
    },
    supervision: {
      name: "Supervisión",
      displayName: "Supervisión de implementación",
      color: "#8b5cf6", // purple-500
      items: [
        { name: "Control de calidad del proveedor", value: 175000 },
        { name: "Seguimiento de hitos del proyecto", value: 145000 },
        { name: "Validación de entregables", value: 120000 },
        { name: "Informes de avance periódicos", value: 95000 },
      ],
    },
    capacitacion: {
      name: "Capacitación",
      displayName: "Capacitación y documentación",
      color: "#f59e0b", // yellow-500
      items: [
        { name: "Plan de capacitación personalizado", value: 135000 },
        { name: "Materiales de capacitación", value: 85000 },
        { name: "Documentación de procesos", value: 110000 },
        { name: "Evaluación post-implementación", value: 95000 },
      ],
    },
  };

  // Funciones auxiliares
  function formatCurrency(amount) {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toLocaleString()}`;
  }

  // Cálculos generales - totales y porcentajes
  let totalBudget = 0;
  const categoryTotals = {};
  const categoryPercentages = {};

  Object.keys(BUDGET_ITEMS).forEach((category) => {
    const items = BUDGET_ITEMS[category].items;
    categoryTotals[category] = items.reduce((sum, item) => sum + item.value, 0);
    totalBudget += categoryTotals[category];
  });

  Object.keys(categoryTotals).forEach((category) => {
    categoryPercentages[category] = ((categoryTotals[category] / totalBudget) * 100).toFixed(1);
  });

  // Actualizar el gráfico SVG
  const svgCircumference = 2 * Math.PI * 45; // 2πr con r=45
  let cumulativeOffset = 0;

  Object.keys(BUDGET_ITEMS).forEach((category) => {
    const percentage = categoryPercentages[category];
    const dashLength = (percentage / 100) * svgCircumference;
    const remainingLength = svgCircumference - dashLength;

    const circle = document.getElementById(`chart-${category}`);
    if (circle) {
      circle.setAttribute("stroke-dasharray", `${dashLength} ${remainingLength}`);
      circle.setAttribute("stroke-dashoffset", `-${cumulativeOffset}`);
      circle.setAttribute("stroke", BUDGET_ITEMS[category].color);

      cumulativeOffset += dashLength;
    }
  });

  // Actualizar elementos del DOM

  // Texto central
  const totalDisplay = document.getElementById("total-budget");
  if (totalDisplay) {
    totalDisplay.textContent = formatCurrency(totalBudget);
  }

  // Actualizar el total de la consultoría en el encabezado
  const consultancyTotalDisplay = document.getElementById("consultancy-total");
  if (consultancyTotalDisplay) {
    consultancyTotalDisplay.textContent = `$${totalBudget.toLocaleString()}`;
  }

  // Leyenda con porcentajes
  const legendItems = document.querySelectorAll("#budget-legend > div");
  legendItems.forEach((item) => {
    const category = item.getAttribute("data-category");
    if (category && BUDGET_ITEMS[category]) {
      const span = item.querySelector("span");
      if (span) {
        span.textContent = `${BUDGET_ITEMS[category].name} (${categoryPercentages[category]}%)`;
      }
    }
  });

  // Desglose de categorías
  const breakdownItems = document.querySelectorAll("#budget-breakdown > div");
  breakdownItems.forEach((item) => {
    const category = item.getAttribute("data-category");
    if (category && BUDGET_ITEMS[category]) {
      const nameSpan = item.querySelector(".category-name");
      if (nameSpan) {
        nameSpan.textContent = BUDGET_ITEMS[category].displayName;
      }

      const amountSpan = item.querySelector(".category-total");
      if (amountSpan) {
        amountSpan.textContent = `$${categoryTotals[category].toLocaleString()}`;
      }
    }
  });

  // Acordeón con detalles
  const accordionItems = document.querySelectorAll(".accordion-item");
  accordionItems.forEach((item) => {
    const category = item.getAttribute("data-category");
    if (category && BUDGET_ITEMS[category]) {
      const titleSpan = item.querySelector(".category-title");
      if (titleSpan) {
        titleSpan.textContent = BUDGET_ITEMS[category].displayName;
      }

      const totalSpan = item.querySelector(".category-accordion-total");
      if (totalSpan) {
        totalSpan.textContent = formatCurrency(categoryTotals[category]);
      }

      const lineItems = item.querySelectorAll("li");
      const budgetItems = BUDGET_ITEMS[category].items;
      lineItems.forEach((li, idx) => {
        if (idx < budgetItems.length) {
          const nameSpan = li.querySelector("span:first-child");
          if (nameSpan) {
            nameSpan.textContent = budgetItems[idx].name;
          }

          const valueSpan = li.querySelector("span:last-child");
          if (valueSpan) {
            valueSpan.textContent = `$${budgetItems[idx].value.toLocaleString()}`;
          }
        }
      });
    }
  });

  // Opciones de pago
  const fullPayment = document.querySelector('[data-option="1"] .text-3xl');
  if (fullPayment) {
    const discountedTotal = Math.round(totalBudget * 0.95); // 5% de descuento
    fullPayment.textContent = `$${discountedTotal.toLocaleString()}`;
  }

  const threePayment = document.querySelector('[data-option="2"] .text-3xl');
  if (threePayment) {
    const paymentAmount = Math.round(totalBudget / 3);
    threePayment.textContent = `$${paymentAmount.toLocaleString()}`;
  }

  const fivePayment = document.querySelector('[data-option="3"] .text-3xl');
  if (fivePayment) {
    const paymentAmount = Math.round(totalBudget / 5);
    fivePayment.textContent = `$${paymentAmount.toLocaleString()}`;
  }
}

function initArchitectureSection() {
  // Elementos para las tarjetas de arquitectura
  const slider = document.getElementById("architecture-slider");
  const sliderContent = slider?.querySelector(".flex");
  const progressBar = document.getElementById("architecture-progress");
  const indicator = document.getElementById("architecture-indicator");
  const prevBtn = document.getElementById("prev-arch");
  const nextBtn = document.getElementById("next-arch");
  const dots = document.querySelectorAll(".architecture-dot");

  // Elementos para el modal de arquitectura
  const modal = document.getElementById("architecture-modal");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("architecture-image");
  const closeModalBtn = document.getElementById("close-modal");
  const closeModalBtnFooter = document.getElementById("close-modal-btn");
  const downloadBtn = document.getElementById("download-architecture");

  // Botones para mostrar imágenes de arquitectura
  const currentArchBtn = document.getElementById("btn-show-current-arch");
  const targetArchBtn = document.getElementById("btn-show-target-arch");
  const currentArchBtnDesktop = document.getElementById("btn-show-current-arch-desktop");
  const targetArchBtnDesktop = document.getElementById("btn-show-target-arch-desktop");

  // Imágenes de arquitectura
  const architectureImages = {
    current: "img/AE.webp",
    target: "img/AD.webp",
  };

  // Índice de la arquitectura actual (0: actual, 1: destino)
  let currentArchIndex = 0;

  // Variables para el swipe en móvil
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  // Inicializar componentes de arquitectura si existen
  if (!slider) return;

  // FUNCIONES

  // Ir a la arquitectura - actualizar todos los elementos de la interfaz
  function goToArchSlide(index) {
    if (!sliderContent) return;

    // Actualizar índice y limitar
    currentArchIndex = Math.max(0, Math.min(index, 1));

    // Actualizar transform para el movimiento de la tarjeta
    sliderContent.style.transform = `translateX(-${currentArchIndex * 100}%)`;

    // Actualizar ancho y color de la barra de progreso
    if (progressBar) {
      progressBar.style.width = currentArchIndex === 0 ? "50%" : "100%";

      if (currentArchIndex === 0) {
        progressBar.style.background = "linear-gradient(to right, #2563eb, #4f46e5)";
      } else {
        progressBar.style.background = "linear-gradient(to right, #10b981, #0d9488)";
      }
    }

    // Actualizar texto e estilo del indicador
    if (indicator) {
      if (currentArchIndex === 0) {
        indicator.textContent = "Actual";
        indicator.style.backgroundColor = "rgba(37, 99, 235, 0.1)";
        indicator.style.color = "#2563eb";
        indicator.style.borderColor = "#dbeafe";
      } else {
        indicator.textContent = "Destino";
        indicator.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
        indicator.style.color = "#10b981";
        indicator.style.borderColor = "#d1fae5";
      }
    }

    // Actualizar estado de los puntos
    updateDotsState();

    // Habilitar/deshabilitar botones de navegación
    if (prevBtn) prevBtn.disabled = currentArchIndex === 0;
    if (nextBtn) nextBtn.disabled = currentArchIndex === 1;
  }

  // Actualizar estado de los puntos
  function updateDotsState() {
    dots.forEach((dot, i) => {
      if (i === currentArchIndex) {
        dot.classList.add("bg-primary");
        dot.classList.remove("bg-gray-300");
      } else {
        dot.classList.remove("bg-primary");
        dot.classList.add("bg-gray-300");
      }
    });
  }

  // Mostrar modal con imagen de arquitectura
  function showArchitectureModal(type) {
    if (!modal || !modalImage || !modalTitle) return;

    // Configurar contenido del modal
    modalTitle.textContent = type === "current" ? "Arquitectura Actual" : "Arquitectura Destino";
    modalImage.src = architectureImages[type];
    modalImage.alt = type === "current" ? "Diagrama de arquitectura actual" : "Diagrama de arquitectura propuesta";

    // Configurar botón de descarga
    if (downloadBtn) {
      downloadBtn.onclick = () => {
        const link = document.createElement("a");
        link.href = architectureImages[type];
        link.download = type === "current" ? "arquitectura-actual.webp" : "arquitectura-destino.webp";
        link.click();
      };
    }

    // Mostrar modal con animación
    modal.classList.remove("hidden");

    // Agregar clase al body para evitar desplazamiento
    document.body.classList.add("overflow-hidden");

    // Activar animaciones después de un pequeño retraso para asegurar que el modal esté visible
    setTimeout(() => {
      if (modalBackdrop) modalBackdrop.classList.add("opacity-100");
      if (modal.querySelector(".relative")) {
        const modalContent = modal.querySelector(".relative");
        modalContent.classList.remove("scale-95", "opacity-0");
        modalContent.classList.add("scale-100", "opacity-100");
      }
    }, 10);
  }

  // Inicializar estilos y estados de los botones
  function setupButtonStyles() {
    // Obtener todos los botones de arquitectura
    const buttons = document.querySelectorAll(".architecture-btn");

    // Configurar estilos por defecto según su contenedor
    buttons.forEach((button) => {
      // Asegurar que los botones mantengan su fondo gradiente
      button.addEventListener("focus", (e) => {
        // Prevenir estilos de foco por defecto que puedan sobreescribir nuestros estilos personalizados
        e.preventDefault();
        e.target.blur();
      });

      // Forzar texto a ser siempre blanco independientemente del estado
      button.classList.add("text-white", "!text-white");

      // Agregar listener de clic para asegurar que los estilos se mantengan consistentes después de hacer clic
      button.addEventListener("click", () => {
        // Pequeño retraso para asegurar que el navegador tenga tiempo para aplicar cualquier estilo por defecto
        setTimeout(() => {
          // Para botones azules (arquitectura actual)
          if (button.id.includes("current")) {
            button.classList.remove("bg-white", "border-blue-200", "text-primary", "text-blue-600", "text-black", "text-gray-700", "text-gray-800");
            button.classList.add("bg-gradient-to-r", "from-blue-500", "to-indigo-600", "text-white", "!text-white");
          }

          // Para botones verdes (arquitectura destino)
          if (button.id.includes("target")) {
            button.classList.remove("bg-white", "border-green-200", "text-green-600", "text-black", "text-gray-700", "text-gray-800");
            button.classList.add("bg-gradient-to-r", "from-green-500", "to-teal-600", "text-white", "!text-white");
          }

          // Forzar todos los elementos de texto dentro del botón a ser blanco
          const textElements = button.querySelectorAll("span, i");
          textElements.forEach((el) => {
            el.classList.add("text-white", "!text-white");
          });
        }, 10);
      });

      // Para botones azules (arquitectura actual)
      if (button.id.includes("current")) {
        button.classList.remove("bg-white", "border-blue-200", "text-primary", "text-blue-600", "text-black", "text-gray-700", "text-gray-800");
        button.classList.add("bg-gradient-to-r", "from-blue-500", "to-indigo-600", "text-white", "!text-white");
      }

      // Para botones verdes (arquitectura destino)
      if (button.id.includes("target")) {
        button.classList.remove("bg-white", "border-green-200", "text-green-600", "text-black", "text-gray-700", "text-gray-800");
        button.classList.add("bg-gradient-to-r", "from-green-500", "to-teal-600", "text-white", "!text-white");
      }

      // Forzar todos los elementos de texto dentro del botón a ser blanco
      const textElements = button.querySelectorAll("span, i");
      textElements.forEach((el) => {
        el.classList.add("text-white", "!text-white");
      });
    });
  }

  // Ocultar modal
  function hideModal() {
    if (!modal) return;

    // Ocultar con animación
    if (modalBackdrop) modalBackdrop.classList.remove("opacity-100");
    if (modal.querySelector(".relative")) {
      const modalContent = modal.querySelector(".relative");
      modalContent.classList.remove("scale-100", "opacity-100");
      modalContent.classList.add("scale-95", "opacity-0");
    }

    // Después de la animación, ocultar completamente
    setTimeout(() => {
      modal.classList.add("hidden");
      // Eliminar clase del body para permitir el desplazamiento nuevamente
      document.body.classList.remove("overflow-hidden");

      updateDotsState();
    }, 300);
  }

  // Manejar inicio de swipe en móvil
  function handleTouchStart(e) {
    // No iniciar swipe si se toca un botón o elemento interactivo
    if (e.target.closest(".architecture-btn") || e.target.closest("button")) {
      return;
    }

    startX = e.touches[0].clientX;
    isDragging = true;

    // Stop any ongoing transition
    if (sliderContent) {
      sliderContent.style.transition = "none";
    }
  }

  // Manejar movimiento de swipe en móvil
  function handleTouchMove(e) {
    if (!isDragging) return;

    // No mover si se toca un botón
    if (e.target.closest(".architecture-btn") || e.target.closest("button")) {
      return;
    }

    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    const translateX = -currentArchIndex * 100 + (diffX / slider.offsetWidth) * 100;

    // Restringir movimiento dentro de los límites
    if (translateX <= 0 && translateX >= -100) {
      sliderContent.style.transform = `translateX(${translateX}%)`;
    }
  }

  // Manejar fin de swipe en móvil
  function handleTouchEnd(e) {
    if (!isDragging) return;

    // No procesar swipe si termina en un botón
    if (e.target.closest(".architecture-btn") || e.target.closest("button")) {
      isDragging = false;
      if (sliderContent) {
        sliderContent.style.transition = "transform 0.3s ease-out";
        // Restablecer a la posición actual
        sliderContent.style.transform = `translateX(-${currentArchIndex * 100}%)`;
      }
      return;
    }

    isDragging = false;

    // Restaurar transición
    if (sliderContent) {
      sliderContent.style.transition = "transform 0.3s ease-out";
    }

    // Calcular dirección y distancia del swipe
    const diffX = currentX - startX;
    const threshold = slider.offsetWidth * 0.2; // 20% del ancho del umbral para el swipe

    if (Math.abs(diffX) > threshold) {
      // Swipe suficientemente lejos para cambiar de tarjeta
      if (diffX > 0 && currentArchIndex > 0) {
        // Swipe hacia la derecha, ir a la tarjeta anterior
        goToArchSlide(currentArchIndex - 1);
      } else if (diffX < 0 && currentArchIndex < 1) {
        // Swipe hacia la izquierda, ir a la tarjeta siguiente
        goToArchSlide(currentArchIndex + 1);
      } else {
        // Restablecer a la posición actual
        goToArchSlide(currentArchIndex);
      }
    } else {
      goToArchSlide(currentArchIndex);
    }
  }

  // LISTENERS

  // Botones de navegación
  if (prevBtn) {
    prevBtn.addEventListener("click", () => goToArchSlide(currentArchIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => goToArchSlide(currentArchIndex + 1));
  }

  // Puntos de indicador
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToArchSlide(index));
  });

  // Botones de arquitectura
  if (currentArchBtn) {
    currentArchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showArchitectureModal("current");
    });

    // Prevenir eventos de toque que interfieran con los clics de los botones
    currentArchBtn.addEventListener("touchstart", (e) => e.stopPropagation());
    currentArchBtn.addEventListener("touchmove", (e) => e.stopPropagation());
    currentArchBtn.addEventListener("touchend", (e) => e.stopPropagation());
  }

  if (targetArchBtn) {
    targetArchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showArchitectureModal("target");
    });

    // Prevenir eventos de toque que interfieran con los clics de los botones
    targetArchBtn.addEventListener("touchstart", (e) => e.stopPropagation());
    targetArchBtn.addEventListener("touchmove", (e) => e.stopPropagation());
    targetArchBtn.addEventListener("touchend", (e) => e.stopPropagation());
  }

  if (currentArchBtnDesktop) {
    currentArchBtnDesktop.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showArchitectureModal("current");
    });
  }

  if (targetArchBtnDesktop) {
    targetArchBtnDesktop.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showArchitectureModal("target");
    });
  }

  // Botones de cierre del modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", hideModal);
  }

  if (closeModalBtnFooter) {
    closeModalBtnFooter.addEventListener("click", hideModal);
  }

  // Cerrar modal al hacer clic fuera
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        hideModal();
      }
    });
  }

  // Cerrar modal con la tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal?.classList.contains("hidden")) {
      hideModal();
    }
  });

  // Eventos de toque para el swipe en móvil
  if (slider) {
    slider.addEventListener("touchstart", handleTouchStart, { passive: true });
    slider.addEventListener("touchmove", handleTouchMove, { passive: true });
    slider.addEventListener("touchend", handleTouchEnd, { passive: true });
  }

  // Inicializar estado
  goToArchSlide(0);

  // Inicializar estilos y estados de los botones
  setupButtonStyles();
}

/**
 * Sección de Alcance del Proyecto en dispositivos móviles
 */
function initAlcanceSwipe() {
  const container = document.querySelector(".alcance-swipe-container");
  if (!container) return;

  const wrapper = container.querySelector(".alcance-swipe-wrapper");
  const indicators = container.querySelectorAll(".alcance-indicator");
  const cards = container.querySelectorAll(".alcance-card");
  const swipeHint = container.querySelector(".swipe-hint");
  const prevBtn = document.getElementById("prev-alcance");
  const nextBtn = document.getElementById("next-alcance");

  if (!wrapper || !cards.length || cards.length < 2) return;

  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isMobile = window.innerWidth < 768;
  let hasInteracted = false;

  function setupMobileSwipe() {
    isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Establecer ancho para swipe en móvil
      const cardWidth = container.offsetWidth - 32; // Restar el padding horizontal (16px * 2)
      cards.forEach((card) => {
        card.style.width = `${cardWidth}px`;
      });

      wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
      wrapper.addEventListener("touchmove", handleTouchMove, { passive: false });
      wrapper.addEventListener("touchend", handleTouchEnd, { passive: true });

      if (prevBtn) {
        prevBtn.style.display = "flex";
        prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
        prevBtn.style.pointerEvents = currentIndex === 0 ? "none" : "auto";
      }

      if (nextBtn) {
        nextBtn.style.display = "flex";
        nextBtn.style.opacity = currentIndex === cards.length - 1 ? "0.5" : "1";
        nextBtn.style.pointerEvents = currentIndex === cards.length - 1 ? "none" : "auto";
      }

      goToSlide(currentIndex);

      if (swipeHint) {
        swipeHint.style.display = hasInteracted ? "none" : "flex";
      }
    } else {
      // Resetear estilos en desktop
      cards.forEach((card) => {
        card.style.width = "";
      });
      wrapper.style.transform = "";

      // Ocultar botones de navegación e indicador de swipe en desktop
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      if (swipeHint) swipeHint.style.display = "none";
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      hideSwipeHint();
      if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      hideSwipeHint();
      if (currentIndex < cards.length - 1) {
        goToSlide(currentIndex + 1);
      }
    });
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      hideSwipeHint();
      goToSlide(index);
    });
  });

  function hideSwipeHint() {
    if (swipeHint && !hasInteracted) {
      hasInteracted = true;
      swipeHint.style.opacity = "0";
      setTimeout(() => {
        swipeHint.style.display = "none";
      }, 300);
    }
  }

  function updateNavigation() {
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add("opacity-100");
        indicator.classList.remove("opacity-50");
      } else {
        indicator.classList.add("opacity-50");
        indicator.classList.remove("opacity-100");
      }
    });

    if (prevBtn) {
      prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
      prevBtn.style.pointerEvents = currentIndex === 0 ? "none" : "auto";
    }

    if (nextBtn) {
      nextBtn.style.opacity = currentIndex === cards.length - 1 ? "0.5" : "1";
      nextBtn.style.pointerEvents = currentIndex === cards.length - 1 ? "none" : "auto";
    }
  }

  function handleTouchStart(e) {
    if (!isMobile) return;
    hideSwipeHint();
    startX = e.touches[0].clientX;
    isDragging = true;
    prevTranslate = currentTranslate;
  }

  function handleTouchMove(e) {
    if (!isMobile || !isDragging) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    // Prevenir scroll vertical mientras se hace swipe
    if (Math.abs(diff) > 5) {
      e.preventDefault();
    }

    currentTranslate = prevTranslate + diff;
    setWrapperPosition();
  }

  function handleTouchEnd() {
    if (!isMobile || !isDragging) return;
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;

    // Si el movimiento fue significativo, cambiar de slide
    if (movedBy < -50 && currentIndex < cards.length - 1) {
      currentIndex++;
    } else if (movedBy > 50 && currentIndex > 0) {
      currentIndex--;
    }

    goToSlide(currentIndex);
  }

  function goToSlide(index) {
    if (!isMobile) return;

    currentIndex = index;
    const cardWidth = container.offsetWidth - 32; // Restar el padding horizontal (16px * 2)
    currentTranslate = -index * cardWidth;
    setWrapperPosition();
    updateNavigation();
  }

  function setWrapperPosition() {
    if (isMobile) {
      wrapper.style.transform = `translateX(${currentTranslate}px)`;
    }
  }

  window.addEventListener("resize", setupMobileSwipe);

  setupMobileSwipe();
  updateNavigation();
}

/**
 * Sección de proveedores con gráficos y comparativas
 */
function initProveedoresSection() {
  initRfiChart();
  initRfpCharts();
  initComparisonBars();
  initCashflowChart();
  initTabNavigation();

  function initComparisonBars() {
    console.log("Iniciando creación de componentes de gráficos comparativos...");

    if (!window.COMPARISON_DATA || !window.COMPARISON_DATA.rfp) {
      console.error("No se encontraron los datos de comparación");
      return;
    }

    const categories = Object.values(COMPARISON_DATA.rfp.categories);

    // Función para actualizar las barras
    const updateBars = () => {
      categories.forEach((category, index) => {
        const chartContainer = document.getElementById(`chart-${category.id}`);
        if (!chartContainer) return;

        // Crear el componente si no existe
        if (!chartContainer.hasChildNodes()) {
          const component = ChartUtils.createChartComponent("comparison-chart-template", `chart-${category.id}`, {
            customize: (content, data) => {
              const odooBar = content.querySelector(".bar-odoo");
              const dynamicsBar = content.querySelector(".bar-dynamics");

              if (odooBar) {
                odooBar.id = `odoo-${category.id}-bar`;
                odooBar.dataset.value = category.odoo * 100;
              }

              if (dynamicsBar) {
                dynamicsBar.id = `dynamics-${category.id}-bar`;
                dynamicsBar.dataset.value = category.dynamics * 100;
              }
            },
          });
        }

        // Actualizar las barras
        const odooBar = document.getElementById(`odoo-${category.id}-bar`);
        const dynamicsBar = document.getElementById(`dynamics-${category.id}-bar`);

        if (odooBar) {
          ChartUtils.animateBar(odooBar, category.odoo * 100, 300);
        }

        if (dynamicsBar) {
          ChartUtils.animateBar(dynamicsBar, category.dynamics * 100, 450);
        }
      });
    };

    // Actualizar barras inicialmente
    updateBars();

    // Actualizar barras cuando cambie el tamaño de la ventana
    window.addEventListener(
      "resize",
      debounce(() => {
        updateBars();
      }, 250)
    );

    console.log("Componentes de gráficos de barras inicializados");
  }

  // ----- Funciones para RFI -----
  function initRfiChart() {
    if (!window.COMPARISON_DATA || !window.COMPARISON_DATA.rfi) {
      console.error("No se encontraron los datos de RFI");
      return;
    }

    const { categories } = COMPARISON_DATA.rfi;

    // Verificar si tenemos datos de RFP
    const hasRfpData = window.COMPARISON_DATA && window.COMPARISON_DATA.rfp && window.COMPARISON_DATA.rfp.categories;

    let dynamicsTotal = 0;
    let odooTotal = 0;

    Object.keys(categories).forEach((categoryKey) => {
      const category = categories[categoryKey];
      const categoryWeight = category.weight;

      // Usar los datos de RFP si están disponibles, de lo contrario usar los de RFI
      let dynamicsScore, odooScore;

      if (hasRfpData && window.COMPARISON_DATA.rfp.categories[categoryKey + "RFP"]) {
        const rfpCategory = window.COMPARISON_DATA.rfp.categories[categoryKey + "RFP"];
        dynamicsScore = rfpCategory.dynamics;
        odooScore = rfpCategory.odoo;
      } else {
        // Usar datos de RFI como respaldo
        dynamicsScore = COMPARISON_DATA.rfi.providers.dynamics.scores[categoryKey];
        odooScore = COMPARISON_DATA.rfi.providers.odoo.scores[categoryKey];
      }

      const dynamicsWeightedScore = dynamicsScore * categoryWeight * 100;
      const odooWeightedScore = odooScore * categoryWeight * 100;

      dynamicsTotal += dynamicsWeightedScore;
      odooTotal += odooWeightedScore;

      const dynamicsCell = document.getElementById(`dynamics-${categoryKey}`);
      const odooCell = document.getElementById(`odoo-${categoryKey}`);

      if (dynamicsCell) dynamicsCell.textContent = `${(dynamicsScore * 100).toFixed(0)}%`;
      if (odooCell) odooCell.textContent = `${(odooScore * 100).toFixed(0)}%`;
    });

    const dynamicsTotalCell = document.getElementById("dynamics-total");
    const odooTotalCell = document.getElementById("odoo-total");

    if (dynamicsTotalCell) dynamicsTotalCell.textContent = `${dynamicsTotal.toFixed(1)}%`;
    if (odooTotalCell) odooTotalCell.textContent = `${odooTotal.toFixed(1)}%`;

    // Actualizar los totales en la sección de Proveedor Elegido
    updateProviderScores(odooTotal, dynamicsTotal);

    const svgCircumference = 2 * Math.PI * 45; // 2πr con r=45
    let cumulativeOffset = 0;

    // Mapa de colores para categorías
    const categoryColors = {
      funcional: "#2563eb", // blue-500
      economico: "#10b981", // green-500
      tecnico: "#8b5cf6", // purple-500
      proveedor: "#f59e0b", // yellow-500
    };

    Object.keys(categories).forEach((categoryKey) => {
      const category = categories[categoryKey];
      const percentage = category.weight * 100;
      const dashLength = (percentage / 100) * svgCircumference;
      const remainingLength = svgCircumference - dashLength;

      const circle = document.getElementById(`chart-${categoryKey}`);
      if (circle) {
        const color = categoryColors[categoryKey] || "#6b7280"; // gray-500 por defecto

        circle.setAttribute("stroke-dasharray", `${dashLength} ${remainingLength}`);
        circle.setAttribute("stroke-dashoffset", `-${cumulativeOffset}`);
        circle.setAttribute("stroke", color);

        cumulativeOffset += dashLength;
      }
    });

    console.log("Gráfico RFI inicializado");
  }

  function updateProviderScores(odooScore, dynamicsScore, costSavings, costPercentage) {
    const odooTotalProveedorElegido = document.getElementById("odoo-total-proveedor");
    const dynamicsTotalProveedorElegido = document.getElementById("dynamics-total-proveedor");

    if (odooTotalProveedorElegido && odooScore !== undefined) {
      odooTotalProveedorElegido.textContent = `${odooScore.toFixed(1)}%`;
    }

    if (dynamicsTotalProveedorElegido && dynamicsScore !== undefined) {
      dynamicsTotalProveedorElegido.textContent = `${dynamicsScore.toFixed(1)}%`;
    }

    const odooFuncionalElement = document.getElementById("odoo-funcional-score");
    if (odooFuncionalElement && window.COMPARISON_DATA && window.COMPARISON_DATA.rfp && window.COMPARISON_DATA.rfp.categories.funcionalRFP) {
      const funcionalScore = window.COMPARISON_DATA.rfp.categories.funcionalRFP.odoo * 100;
      odooFuncionalElement.textContent = `${funcionalScore.toFixed(0)}%`;
    }

    const odooEscalabilidadElement = document.getElementById("odoo-escalabilidad-score");
    if (odooEscalabilidadElement && window.COMPARISON_DATA && window.COMPARISON_DATA.rfp && window.COMPARISON_DATA.rfp.categories.tecnicoRFP) {
      const escalabilidadScore = window.COMPARISON_DATA.rfp.categories.tecnicoRFP.subitems[4].odoo * 100;
      odooEscalabilidadElement.textContent = `${escalabilidadScore.toFixed(0)}%`;
    }

    if (costSavings !== undefined && costPercentage !== undefined) {
      const costPercentageElement = document.getElementById("odoo-cost-percentage");
      const costSavingsElement = document.getElementById("odoo-cost-savings");

      if (costPercentageElement) {
        costPercentageElement.textContent = `${costPercentage}%`;
      }

      if (costSavingsElement) {
        costSavingsElement.textContent = `$${costSavings.toLocaleString()}`;
      }
    }
  }

  // ----- Funciones para RFP -----
  function initRfpCharts() {
    if (!window.COMPARISON_DATA || !window.COMPARISON_DATA.rfp) {
      console.error("No se encontraron los datos de RFP");
      return;
    }

    const { categories } = COMPARISON_DATA.rfp;

    // Inicializar todos los contenidos de categorías
    Object.entries(categories).forEach(([categoryKey, categoryData]) => {
      const categoryContainer = document.querySelector(`.rfp-content[data-category="${categoryKey}"]`);
      if (!categoryContainer) return;

      createSubitems(categoryContainer, categoryData);
    });

    // Agregar listeners para los botones de pestañas para reinicializar los event listeners
    const tabButtons = document.querySelectorAll(".rfp-tab-btn");
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        const categoryData = categories[category];
        const categoryContainer = document.querySelector(`.rfp-content[data-category="${category}"]`);

        if (categoryContainer && categoryData) {
          // Asegurarse de que los event listeners estén correctamente configurados
          const toggleButtons = categoryContainer.querySelectorAll(".improvement-toggle");
          toggleButtons.forEach((button) => {
            // Eliminar listeners existentes para evitar duplicados
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);

            // Agregar nuevo listener
            newButton.addEventListener("click", function () {
              const targetId = this.getAttribute("data-target");
              const targetContent = document.getElementById(targetId);
              const icon = this.querySelector("i");
              const allSubitemsContainer = this.closest(".bg-white.rounded-lg");

              if (targetContent) {
                // Toggle content visibility with animation
                if (targetContent.classList.contains("hidden")) {
                  // Close any other open dropdowns in the same category
                  if (allSubitemsContainer) {
                    const openContents = allSubitemsContainer.querySelectorAll(".improvement-content:not(.hidden)");
                    openContents.forEach((content) => {
                      const openButton = allSubitemsContainer.querySelector(`[data-target="${content.id}"]`);
                      if (openButton && content.id !== targetId) {
                        content.classList.add("hidden");
                        content.classList.remove("visible");
                        openButton.setAttribute("aria-expanded", "false");
                        const openIcon = openButton.querySelector("i");
                        if (openIcon) openIcon.classList.remove("transform", "rotate-180");
                      }
                    });
                  }

                  // Open this dropdown
                  targetContent.classList.remove("hidden");
                  targetContent.classList.add("visible");
                  this.setAttribute("aria-expanded", "true");
                  icon.classList.add("transform", "rotate-180");
                } else {
                  // Close this dropdown
                  targetContent.classList.add("hidden");
                  targetContent.classList.remove("visible");
                  this.setAttribute("aria-expanded", "false");
                  icon.classList.remove("transform", "rotate-180");
                }
              }
            });
          });
        }
      });
    });

    console.log("Gráficos RFP inicializados");
  }

  /**
   * Crea los elementos de subitems para una categoría
   * @param {HTMLElement} categoryContainer
   * @param {Object} categoryData
   */
  function createSubitems(categoryContainer, categoryData) {
    const subitemsContainer = categoryContainer.querySelector(".subitems-container");
    if (!subitemsContainer || !categoryData.subitems || !categoryData.subitems.length) return;

    subitemsContainer.innerHTML = "";

    const titleSection = document.createElement("div");
    titleSection.className = "text-center mb-2";
    titleSection.innerHTML = `<h5 class="text-sm md:text-base font-medium text-gray-800">Comparativas detalladas</h5>`;
    subitemsContainer.appendChild(titleSection);

    // Leyenda común
    const legendContainer = document.createElement("div");
    legendContainer.className = "flex justify-center text-xs md:text-sm mb-2 gap-4";
    legendContainer.innerHTML = `
      <div class="flex items-center">
        <div class="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 mr-1"></div>
        <span class="text-gray-700">Odoo</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 mr-1"></div>
        <span class="text-gray-700">Dynamics 365</span>
      </div>
    `;
    subitemsContainer.appendChild(legendContainer);

    // Contenedor principal para todos los subitems
    const allSubitemsContainer = document.createElement("div");
    allSubitemsContainer.className = "bg-white rounded-lg p-3 shadow-sm";

    // Crear un prefijo único para los IDs basado en la categoría
    const categoryPrefix = categoryData.id || "category";

    // Crear elementos para cada subitem
    categoryData.subitems.forEach((subitem, index) => {
      const isLast = index === categoryData.subitems.length - 1;
      const subitemElement = document.createElement("div");
      subitemElement.className = `mb-3 ${!isLast ? "border-b border-gray-100 pb-2" : ""}`;

      // Crear IDs únicos usando el prefijo de categoría
      const odooImprovementId = `${categoryPrefix}-odoo-improvement-${index}`;
      const dynamicsImprovementId = `${categoryPrefix}-dynamics-improvement-${index}`;

      // Crear el HTML para el subitem con dropdowns
      subitemElement.innerHTML = `
        <h5 class="text-sm font-medium text-gray-800 mb-1">${subitem.name}</h5>
        <div class="space-y-3">
          <!-- Barra Odoo -->
          <div class="space-y-1">
            <div class="flex justify-between items-center text-xs">
              <span class="font-medium text-purple-600">Odoo</span>
              <span class="font-bold text-purple-600">${(subitem.odoo * 100).toFixed(0)}%</span>
            </div>
            <div class="h-4 bg-gray-100 rounded-md overflow-hidden">
              <div class="h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-500 rounded-l-md odoo-progress-bar" 
                   data-value="${subitem.odoo * 100}" style="width: 0%"></div>
            </div>
            ${
              subitem.improvements && subitem.improvements.odoo
                ? `
              <div class="mt-2">
                <button class="improvement-toggle w-full text-left" data-target="${odooImprovementId}" aria-expanded="false">
                  <span>${subitem.odoo < 1.0 ? "¿Qué podría mejorar?" : "Detalles"}</span>
                  <i class="fas fa-chevron-down"></i>
                </button>
                <div id="${odooImprovementId}" class="improvement-content hidden">
                  ${subitem.improvements.odoo}
                </div>
              </div>
            `
                : ""
            }
          </div>
          
          <!-- Barra Dynamics -->
          <div class="space-y-1">
            <div class="flex justify-between items-center text-xs">
              <span class="font-medium text-blue-600">Dynamics 365</span>
              <span class="font-bold text-blue-600">${(subitem.dynamics * 100).toFixed(0)}%</span>
            </div>
            <div class="h-4 bg-gray-100 rounded-md overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 rounded-l-md dynamics-progress-bar" 
                   data-value="${subitem.dynamics * 100}" style="width: 0%"></div>
            </div>
            ${
              subitem.improvements && subitem.improvements.dynamics
                ? `
              <div class="mt-2">
                <button class="improvement-toggle w-full text-left" data-target="${dynamicsImprovementId}" aria-expanded="false">
                  <span>${subitem.dynamics < 1.0 ? "¿Qué podría mejorar?" : "Detalles"}</span>
                  <i class="fas fa-chevron-down"></i>
                </button>
                <div id="${dynamicsImprovementId}" class="improvement-content hidden">
                  ${subitem.improvements.dynamics}
                </div>
              </div>
            `
                : ""
            }
          </div>
        </div>
      `;

      allSubitemsContainer.appendChild(subitemElement);
    });

    // Añadir todos los subitems al contenedor principal
    subitemsContainer.appendChild(allSubitemsContainer);

    // Animar las barras de progreso
    setTimeout(() => {
      const progressBars = allSubitemsContainer.querySelectorAll(".odoo-progress-bar, .dynamics-progress-bar");
      progressBars.forEach((bar) => {
        bar.style.width = `${bar.dataset.value}%`;
      });
    }, 100);

    // Añadir event listeners para los toggles de mejoras
    const toggleButtons = allSubitemsContainer.querySelectorAll(".improvement-toggle");
    toggleButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");
        const targetContent = document.getElementById(targetId);
        const icon = this.querySelector("i");

        // Visualizar contenido
        if (targetContent.classList.contains("hidden")) {
          // Cerrar otros dropdowns si se esta en la misma categoria
          const openContents = allSubitemsContainer.querySelectorAll(".improvement-content:not(.hidden)");
          openContents.forEach((content) => {
            const openButton = allSubitemsContainer.querySelector(`[data-target="${content.id}"]`);
            if (openButton && content.id !== targetId) {
              content.classList.add("hidden");
              content.classList.remove("visible");
              openButton.setAttribute("aria-expanded", "false");
              const openIcon = openButton.querySelector("i");
              if (openIcon) openIcon.classList.remove("transform", "rotate-180");
            }
          });

          // Abrir
          targetContent.classList.remove("hidden");
          targetContent.classList.add("visible");
          this.setAttribute("aria-expanded", "true");
          icon.classList.add("transform", "rotate-180");
        } else {
          // Cerrar
          targetContent.classList.add("hidden");
          targetContent.classList.remove("visible");
          this.setAttribute("aria-expanded", "false");
          icon.classList.remove("transform", "rotate-180");
        }
      });
    });
  }

  // ----- Funciones para Flujo de Caja -----
  function initCashflowChart() {
    if (!window.COMPARISON_DATA || !window.COMPARISON_DATA.cashflow) {
      console.error("No se encontraron los datos de flujo de caja");
      return;
    }

    // Usar datos específicos para la tabla
    const tableData = window.COMPARISON_DATA.cashflowTable || window.COMPARISON_DATA.cashflow;
    const { years, costs: tableCosts } = tableData;

    // Actualizar la tabla con los datos de licencia y mantenimiento
    for (let i = 0; i < years; i++) {
      const year = i + 1;
      const odooAmount = tableCosts.odoo[i];
      const dynamicsAmount = tableCosts.dynamics[i];

      const odooCell = document.getElementById(`odoo-year${year}`);
      const dynamicsCell = document.getElementById(`dynamics-year${year}`);

      if (odooCell) odooCell.textContent = ChartUtils.formatCurrency(odooAmount);
      if (dynamicsCell) dynamicsCell.textContent = ChartUtils.formatCurrency(dynamicsAmount);
    }

    // Actualizar el total
    const odooTotal = document.getElementById("odoo-total-3y");
    const dynamicsTotal = document.getElementById("dynamics-total-3y");

    const odooTotalValue = tableCosts.odoo.reduce((sum, cost) => sum + cost, 0);
    const dynamicsTotalValue = tableCosts.dynamics.reduce((sum, cost) => sum + cost, 0);

    if (odooTotal) odooTotal.textContent = ChartUtils.formatCurrency(odooTotalValue);
    if (dynamicsTotal) dynamicsTotal.textContent = ChartUtils.formatCurrency(dynamicsTotalValue);

    createCashflowChart();

    console.log("Gráfico de flujo de caja inicializado");
  }

  /**
   * Crea el gráfico de líneas para el flujo de caja
   * Versión responsive y optimizada para móviles
   */
  function createCashflowChart() {
    const chartContainer = document.getElementById("cashflow-chart");
    if (!chartContainer) {
      console.error("No se encontró el contenedor del gráfico de flujo de caja");
      return;
    }

    if (!window.COMPARISON_DATA || !window.COMPARISON_DATA.cashflow) {
      console.error("No se encontraron los datos de flujo de caja");
      return;
    }

    const { years, costs } = COMPARISON_DATA.cashflow;

    // Limpiar el contenedor antes de crear el nuevo gráfico
    chartContainer.innerHTML = "";

    // Obtener dimensiones reales del contenedor
    const containerWidth = chartContainer.clientWidth;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // Configuración responsive
    const containerHeight = isMobile ? 300 : isTablet ? 340 : 380;
    const paddingX = isMobile ? 40 : isTablet ? 50 : 70;
    const paddingY = isMobile ? 20 : isTablet ? 30 : 40;
    const paddingBottom = isMobile ? 50 : isTablet ? 60 : 70;
    const chartWidth = containerWidth - paddingX * 2;
    const chartHeight = containerHeight - paddingY - paddingBottom;

    // Calcular valores máximos para escala dinámica
    const allValues = [...costs.odoo, ...costs.dynamics];
    const maxValue = Math.max(...allValues) * 1.2; // 20% de margen

    // Crear elementos SVG con viewBox para escalado automático
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("width", "100%");
    svgElement.setAttribute("height", containerHeight);
    svgElement.setAttribute("viewBox", `0 0 ${containerWidth} ${containerHeight}`);
    svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

    // Definir filtro de sombra
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.setAttribute("id", "shadow");
    filter.setAttribute("x", "-50%");
    filter.setAttribute("y", "-50%");
    filter.setAttribute("width", "200%");
    filter.setAttribute("height", "200%");

    const feDropShadow = document.createElementNS("http://www.w3.org/2000/svg", "feDropShadow");
    feDropShadow.setAttribute("dx", "0");
    feDropShadow.setAttribute("dy", "1");
    feDropShadow.setAttribute("stdDeviation", "2");
    feDropShadow.setAttribute("flood-color", "rgba(0,0,0,0.3)");
    feDropShadow.setAttribute("flood-opacity", "0.5");

    filter.appendChild(feDropShadow);
    defs.appendChild(filter);
    svgElement.appendChild(defs);

    // Función para convertir valores a coordenadas Y
    const getYCoordinate = (value) => {
      return paddingY + chartHeight - (value / maxValue) * chartHeight;
    };

    // Función para generar path de la línea
    const generateLinePath = (dataArray) => {
      let path = "";
      for (let i = 0; i < years; i++) {
        const x = paddingX + i * (chartWidth / (years - 1));
        const y = getYCoordinate(dataArray[i]);

        if (i === 0) {
          path += `M ${x} ${y}`;
        } else {
          path += ` L ${x} ${y}`;
        }
      }
      return path;
    };

    // Determinar número de pasos en el eje Y basado en el tamaño
    const steps = isMobile ? 3 : isTablet ? 4 : 5;

    // Eje X (años)
    for (let i = 0; i < years; i++) {
      const x = paddingX + i * (chartWidth / (years - 1));
      const y = containerHeight - paddingBottom;

      // Línea vertical (opcional)
      const verticalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      verticalLine.setAttribute("x1", x);
      verticalLine.setAttribute("y1", paddingY);
      verticalLine.setAttribute("x2", x);
      verticalLine.setAttribute("y2", y);
      verticalLine.setAttribute("stroke", "#e5e7eb");
      verticalLine.setAttribute("stroke-width", "1");
      svgElement.appendChild(verticalLine);

      // Etiqueta de año - ajustada para móvil
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", x);
      text.setAttribute("y", y + (isMobile ? 15 : 20));
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-size", isMobile ? "10" : "12");
      text.setAttribute("fill", "#6b7280");
      text.textContent = isMobile ? `A${i + 1}` : `Año ${i + 1}`;
      svgElement.appendChild(text);
    }

    // Eje Y (valores) - Optimizado para móvil
    for (let i = 0; i <= steps; i++) {
      const value = (maxValue / steps) * i;
      const y = getYCoordinate(value);

      // Línea horizontal
      const horizontalLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      horizontalLine.setAttribute("x1", paddingX);
      horizontalLine.setAttribute("y1", y);
      horizontalLine.setAttribute("x2", paddingX + chartWidth);
      horizontalLine.setAttribute("y2", y);
      horizontalLine.setAttribute("stroke", "#e5e7eb");
      horizontalLine.setAttribute("stroke-width", "1");
      svgElement.appendChild(horizontalLine);

      // Etiqueta de valor - optimizada para móvil
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", paddingX - (isMobile ? 8 : 15));
      text.setAttribute("y", y + 4);
      text.setAttribute("text-anchor", "end");
      text.setAttribute("font-size", isMobile ? "9" : "11");
      text.setAttribute("fill", "#6b7280");
      text.setAttribute("font-weight", i === 0 ? "normal" : "bold");

      // Usar el formateador de ChartUtils
      const formattedValue = ChartUtils.formatCurrency(value, true);

      text.textContent = formattedValue;
      svgElement.appendChild(text);
    }

    // Crear líneas de costos
    // Odoo
    const odooCostLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
    odooCostLine.setAttribute("d", generateLinePath(costs.odoo));
    odooCostLine.setAttribute("stroke", "#8b5cf6");
    odooCostLine.setAttribute("stroke-width", isMobile ? "2" : "3");
    odooCostLine.setAttribute("fill", "none");
    odooCostLine.setAttribute("stroke-linecap", "round");
    odooCostLine.setAttribute("stroke-linejoin", "round");
    svgElement.appendChild(odooCostLine);

    // Dynamics
    const dynamicsCostLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
    dynamicsCostLine.setAttribute("d", generateLinePath(costs.dynamics));
    dynamicsCostLine.setAttribute("stroke", "#3b82f6");
    dynamicsCostLine.setAttribute("stroke-width", isMobile ? "2" : "3");
    dynamicsCostLine.setAttribute("fill", "none");
    dynamicsCostLine.setAttribute("stroke-linecap", "round");
    dynamicsCostLine.setAttribute("stroke-linejoin", "round");
    svgElement.appendChild(dynamicsCostLine);

    // Función para formatear valores de manera óptima según el tamaño
    const getOptimalValueFormat = (value) => {
      return ChartUtils.formatCurrency(value, isMobile);
    };

    // Añadir puntos para cada año con posicionamiento optimizado
    for (let i = 0; i < years; i++) {
      const x = paddingX + i * (chartWidth / (years - 1));
      const pointRadius = isMobile ? 3 : 5;
      const labelFontSize = isMobile ? 8 : 9;

      // Calcular posición vertical para cada punto
      const odooY = getYCoordinate(costs.odoo[i]);
      const dynamicsY = getYCoordinate(costs.dynamics[i]);

      // Determinar si hay suficiente espacio entre puntos para mostrar etiquetas
      const verticalDistance = Math.abs(odooY - dynamicsY);
      const minDistance = isMobile ? 30 : 40;
      const showBothLabels = verticalDistance >= minDistance;

      // Punto para Odoo
      const odooPoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      odooPoint.setAttribute("cx", x);
      odooPoint.setAttribute("cy", odooY);
      odooPoint.setAttribute("r", pointRadius);
      odooPoint.setAttribute("fill", "#8b5cf6");
      odooPoint.setAttribute("stroke", "white");
      odooPoint.setAttribute("stroke-width", isMobile ? "1" : "2");
      odooPoint.setAttribute("filter", "url(#shadow)");
      svgElement.appendChild(odooPoint);

      // Etiqueta de valor para Odoo - solo si hay espacio o es el primer/último punto
      if (showBothLabels || i === 0 || i === years - 1) {
        const odooValue = getOptimalValueFormat(costs.odoo[i]);
        const labelWidth = isMobile ? 50 : costs.odoo[i] < 100000 ? 70 : 80;

        // Fondo blanco para la etiqueta
        const odooLabelBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        odooLabelBg.setAttribute("x", x - labelWidth / 2);
        odooLabelBg.setAttribute("y", odooY - (isMobile ? 18 : 24));
        odooLabelBg.setAttribute("width", labelWidth);
        odooLabelBg.setAttribute("height", isMobile ? 14 : 16);
        odooLabelBg.setAttribute("rx", 4);
        odooLabelBg.setAttribute("fill", "white");
        odooLabelBg.setAttribute("opacity", "0.9");
        svgElement.appendChild(odooLabelBg);

        // Texto de la etiqueta
        const odooLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        odooLabel.setAttribute("x", x);
        odooLabel.setAttribute("y", odooY - (isMobile ? 8 : 12));
        odooLabel.setAttribute("text-anchor", "middle");
        odooLabel.setAttribute("font-size", labelFontSize);
        odooLabel.setAttribute("fill", "#8b5cf6");
        odooLabel.setAttribute("font-weight", "bold");
        odooLabel.textContent = odooValue;
        svgElement.appendChild(odooLabel);
      }

      // Punto para Dynamics
      const dynamicsPoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dynamicsPoint.setAttribute("cx", x);
      dynamicsPoint.setAttribute("cy", dynamicsY);
      dynamicsPoint.setAttribute("r", pointRadius);
      dynamicsPoint.setAttribute("fill", "#3b82f6");
      dynamicsPoint.setAttribute("stroke", "white");
      dynamicsPoint.setAttribute("stroke-width", isMobile ? "1" : "2");
      dynamicsPoint.setAttribute("filter", "url(#shadow)");
      svgElement.appendChild(dynamicsPoint);

      // Etiqueta de valor para Dynamics - solo si hay espacio o es el primer/último punto
      if (showBothLabels || i === 0 || i === years - 1) {
        const dynamicsValue = getOptimalValueFormat(costs.dynamics[i]);
        const labelWidth = isMobile ? 50 : costs.dynamics[i] < 100000 ? 70 : 80;

        // Fondo blanco para la etiqueta
        const dynamicsLabelBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        dynamicsLabelBg.setAttribute("x", x - labelWidth / 2);
        dynamicsLabelBg.setAttribute("y", dynamicsY + (isMobile ? 4 : 8));
        dynamicsLabelBg.setAttribute("width", labelWidth);
        dynamicsLabelBg.setAttribute("height", isMobile ? 14 : 16);
        dynamicsLabelBg.setAttribute("rx", 4);
        dynamicsLabelBg.setAttribute("fill", "white");
        dynamicsLabelBg.setAttribute("opacity", "0.9");
        svgElement.appendChild(dynamicsLabelBg);

        // Texto de la etiqueta
        const dynamicsLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        dynamicsLabel.setAttribute("x", x);
        dynamicsLabel.setAttribute("y", dynamicsY + (isMobile ? 14 : 20));
        dynamicsLabel.setAttribute("text-anchor", "middle");
        dynamicsLabel.setAttribute("font-size", labelFontSize);
        dynamicsLabel.setAttribute("fill", "#3b82f6");
        dynamicsLabel.setAttribute("font-weight", "bold");
        dynamicsLabel.textContent = dynamicsValue;
        svgElement.appendChild(dynamicsLabel);
      }
    }

    // Removed top-right legend identifiers as requested

    // Agregar el SVG al contenedor
    chartContainer.appendChild(svgElement);

    // Calcular y mostrar ahorros
    // const odooTotalChart = costs.odoo.reduce((sum, cost) => sum + cost, 0);
    // const dynamicsTotalChart = costs.dynamics.reduce((sum, cost) => sum + cost, 0);
    // const savingsAmount = dynamicsTotalChart - odooTotalChart;
    // const savingsPercentage = (((dynamicsTotalChart - odooTotalChart) / dynamicsTotalChart) * 100).toFixed(0);
    const savingsAmount = costs.dynamics[2] - costs.odoo[2];
    const savingsPercentage = (((costs.dynamics[2] - costs.odoo[2]) / costs.dynamics[2]) * 100).toFixed(0);

    // const totalOdooElement = document.getElementById("odoo-total-3y");
    // const totalDynamicsElement = document.getElementById("dynamics-total-3y");
    const savingsElement = document.getElementById("cost-savings");
    const percentageElement = document.getElementById("cost-difference-percentage");

    // Actualizar elementos con los valores calculados
    // if (totalOdooElement) totalOdooElement.textContent = ChartUtils.formatCurrency(odooTotal, false);
    // if (totalDynamicsElement) totalDynamicsElement.textContent = ChartUtils.formatCurrency(dynamicsTotal, false);
    if (savingsElement) savingsElement.textContent = ChartUtils.formatCurrency(savingsAmount, false);
    if (percentageElement) percentageElement.textContent = `${savingsPercentage}%`;

    // Actualizar los datos de costo-beneficio en la sección de Proveedor Elegido
    updateProviderScores(undefined, undefined, savingsAmount, savingsPercentage);
  }

  // ----- Navegación por pestañas para RFP -----
  function initTabNavigation() {
    const tabButtons = document.querySelectorAll(".rfp-tab-btn");
    const tabContents = document.querySelectorAll(".rfp-content");
    const dynamicsTotal = document.getElementById("dynamics-rfp-total");
    const odooTotal = document.getElementById("odoo-rfp-total");

    // Inicializar los botones de resumen de categorías
    const summaryButtons = document.querySelectorAll(".rfp-summary-btn");
    summaryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const category = this.getAttribute("data-category");
        const targetTabButton = document.querySelector(`.rfp-tab-btn[data-category="${category}"]`);

        if (targetTabButton) {
          // Simular clic en el botón de pestaña correspondiente
          targetTabButton.click();

          // Desplazarse suavemente hasta la sección de contenido
          const contentSection = document.querySelector(`.rfp-content[data-category="${category}"]`);
          if (contentSection) {
            contentSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });

    // Función para actualizar los totales según la categoría seleccionada
    function updateTotalScores(categoryKey) {
      if (!window.COMPARISON_DATA || !window.COMPARISON_DATA.rfp || !window.COMPARISON_DATA.rfp.categories) {
        console.error("No se encontraron los datos de categorías RFP");
        return;
      }

      const categoryData = window.COMPARISON_DATA.rfp.categories[categoryKey];

      if (!categoryData) {
        document.getElementById("dynamic-category-points").style.display = "none";
        document.getElementById("category-footer").style.display = "none";
        console.error(`No se encontraron datos para la categoría: ${categoryKey}`);
        return;
      }

      document.getElementById("dynamic-category-points").style.display = "flex";
      document.getElementById("category-footer").style.display = "block";

      // Obtener el peso de la categoría desde los datos RFI
      let categoryWeight = 0.25; // Valor por defecto en caso de error

      // Mapear las categorías RFP a las categorías RFI (quitando el sufijo "RFP")
      const rfiCategoryKey = categoryKey.replace("RFP", "");

      if (window.COMPARISON_DATA.rfi && window.COMPARISON_DATA.rfi.categories && window.COMPARISON_DATA.rfi.categories[rfiCategoryKey]) {
        categoryWeight = window.COMPARISON_DATA.rfi.categories[rfiCategoryKey].weight;
      }

      const maxPoints = Math.round(100 * categoryWeight);

      if (dynamicsTotal) {
        const dynamicsScore = (categoryData.dynamics * maxPoints).toFixed(2);
        dynamicsTotal.textContent = dynamicsScore;
      }

      if (odooTotal) {
        const odooScore = (categoryData.odoo * maxPoints).toFixed(2);
        odooTotal.textContent = odooScore;
      }

      const dynamicsMaxPoints = document.getElementById("dynamics-max-points");
      const odooMaxPoints = document.getElementById("odoo-max-points");

      if (dynamicsMaxPoints) {
        dynamicsMaxPoints.textContent = `sobre ${maxPoints} puntos`;
      }

      if (odooMaxPoints) {
        odooMaxPoints.textContent = `sobre ${maxPoints} puntos`;
      }

      const categoryIndicator = document.getElementById("category-indicator");
      if (categoryIndicator) {
        categoryIndicator.textContent = `Categoría: ${categoryData.title} (${(categoryWeight * 100).toFixed(0)}%)`;
      }
    }

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");

        // Desactivar todos los botones y contenidos
        tabButtons.forEach((btn) => {
          btn.classList.remove("bg-indigo-600", "text-white");
          btn.classList.add("bg-gray-200", "text-gray-700");
        });

        tabContents.forEach((content) => {
          content.classList.add("hidden");
        });

        // Activar el botón y contenido seleccionado
        button.classList.remove("bg-gray-200", "text-gray-700");
        button.classList.add("bg-indigo-600", "text-white");

        // Mostrar el contenido correspondiente
        const activeContent = document.querySelector(`.rfp-content[data-category="${category}"]`);
        if (activeContent) {
          activeContent.classList.remove("hidden");
        }

        // Actualizar los totales según la categoría seleccionada
        updateTotalScores(category);
      });
    });

    // Activar la primera pestaña por defecto
    if (tabButtons.length > 0) {
      const firstCategory = tabButtons[0].getAttribute("data-category");

      // Activar visualmente el primer botón
      tabButtons[0].classList.remove("bg-gray-200", "text-gray-700");
      tabButtons[0].classList.add("bg-indigo-600", "text-white");

      // Mostrar el primer contenido
      const firstContent = document.querySelector(`.rfp-content[data-category="${firstCategory}"]`);
      if (firstContent) {
        firstContent.classList.remove("hidden");
      }

      // Actualizar los totales para la primera categoría
      updateTotalScores(firstCategory);
    }
  }

  // Agregar listener para redimensionar el gráfico cuando cambia el tamaño de la ventana
  let resizeTimeout;
  window.addEventListener("resize", function () {
    // Usar debounce para evitar múltiples renderizados
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      // Volver a crear el gráfico con las nuevas dimensiones
      createCashflowChart();
    }, 250); // Esperar 250ms después del último evento de resize
  });
}

// ===== DOCUMENTACIÓN =====
function initDocumentacionSection() {
  const shareButton = document.getElementById("share-document");
  const closeProtectedDocsButton = document.getElementById("close-protected-docs");

  // Inicializar el módulo de autenticación
  if (window.AuthModule) {
    window.AuthModule.init();
  }

  // Datos de los documentos (en una aplicación real, estos vendrían de una API o base de datos)
  const documents = [
    {
      title: "Selección del Caso",
      icon: "fas fa-hand-pointer",
      iconColor: "#f59e0b",
      link: "https://drive.google.com/file/d/1CgV4BhWHv3Ud5N4-jpEywcSR7dFidaoS/view?usp=drive_link",
    },
    {
      title: "Requerimientos y funcionalidades",
      icon: "fas fa-cogs",
      iconColor: "#10b981",
      link: "https://drive.google.com/file/d/1LOoZT2WW2CC--ERXRzVa166Hd3YdYrb8/view?usp=drive_link",
    },
    {
      title: "Arquitectura Empresarial Base",
      icon: "fas fa-hard-hat",
      iconColor: "#ef4444",
      link: "https://drive.google.com/file/d/1Nj_9stmPySVqevvH1D4G50kjudgbQ-Dj/view?usp=drive_link",
    },
    {
      title: "Innovación Tecnológica",
      icon: "fas fa-lightbulb",
      iconColor: "#f59e0b",
      link: "https://drive.google.com/file/d/12wIiA-J7ANYaDGyiwSH-U1It3HEXYO3u/view?usp=drive_link",
    },
    {
      title: "Arquitectura Empresarial Destino",
      icon: "fas fa-sitemap",
      iconColor: "#3b82f6",
      link: "https://drive.google.com/file/d/1ud5mUGt97j7jDGRS3LTKs1uNRkG6SHgT/view?usp=drive_link",
    },
    {
      title: "Brechas y Escenarios",
      icon: "fas fa-chart-bar",
      iconColor: "#10b981",
      link: "https://drive.google.com/file/d/1d9PdQ7EOtZ2SWi2iy43xUBiwu4_zAQw9/view?usp=drive_link",
    },
    {
      title: "Alcance",
      icon: "fas fa-bullseye",
      iconColor: "#10b981",
      link: "https://drive.google.com/file/d/1mvloKk0R8RXy3tkSFfH0xEdaGFiqQmFh/view?usp=drive_link",
    },
    {
      title: "Análisis de soluciones y RFI",
      icon: "fas fa-search",
      iconColor: "#f59e0b",
      link: "https://drive.google.com/file/d/1QGBgUWnJAHyKhLwPjucKYKGAoF4w5RSP/view?usp=drive_link",
    },
    {
      title: "Matriz RFP",
      icon: "fas fa-tools",
      iconColor: "#6b7280",
      link: "https://drive.google.com/file/d/1uNQHGmiytoaqnaHbjdqdt8Le7BwaGuZ-/view?usp=drive_link",
    },
    {
      title: "Comparación de cumplimiento y evaluación económica",
      icon: "fas fa-chart-line",
      iconColor: "#10b981",
      link: "https://drive.google.com/file/d/1LGxt1oAYmzmuoL2IVkA3JYD-rGjS6Nzb/view?usp=drive_link",
    },
    {
      title: "Análisis de propuesta y conclusiones",
      icon: "fas fa-handshake",
      iconColor: "#3b82f6",
      link: "https://drive.google.com/file/d/1aT379LZmVsXiQplZKogp8G-1caUgJleu/view?usp=drive_link",
    },
    {
      title: "Carpeta de cierre de proyecto",
      icon: "fas fa-folder",
      iconColor: "#f59e0b",
      link: "https://drive.google.com/file/d/1YJwbIcwFs9J1HPxDTBRY7Av4exarroXo/view?usp=drive_link",
    },
  ];

  // Función para ocultar el modal de documentos protegidos
  function hideProtectedDocsModal() {
    const protectedDocsModal = document.getElementById("protected-docs-modal");
    if (protectedDocsModal) {
      protectedDocsModal.classList.add("hidden");
    }
  }

  // Función para renderizar los documentos en grid (desktop) y swiper (mobile)
  window.renderDocuments = function () {
    // Renderizar grid para desktop
    const gridContainer = document.querySelector("#protected-docs-modal .grid");
    gridContainer.innerHTML = "";

    documents.forEach((doc) => {
      const docElement = document.createElement("div");
      docElement.className = "bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center text-center";
      docElement.innerHTML = `
        <div class="w-16 h-16 mb-3 rounded-full flex items-center justify-center" style="background-color: ${doc.iconColor}20;">
          <i class="${doc.icon} text-2xl" style="color: ${doc.iconColor};"></i>
        </div>
        <h4 class="font-medium text-gray-800 mb-2">${doc.title}</h4>
        <a href="${doc.link}" target="_blank" class="mt-auto text-primary hover:text-secondary text-sm flex items-center">
          <i class="fas fa-external-link-alt mr-1"></i> Ver documento
        </a>
      `;
      gridContainer.appendChild(docElement);
    });

    // Renderizar swiper para móvil
    const swiperContainer = document.querySelector(".docs-swiper-wrapper");
    const navigationContainer = document.querySelector(".docs-navigation");
    swiperContainer.innerHTML = "";
    navigationContainer.innerHTML = "";

    documents.forEach((doc, index) => {
      // Crear slide
      const slide = document.createElement("div");
      slide.className = "docs-slide absolute inset-0 transition-opacity duration-300";
      slide.style.opacity = index === 0 ? "1" : "0";
      slide.style.pointerEvents = index === 0 ? "auto" : "none";
      slide.setAttribute("data-index", index);

      slide.innerHTML = `
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col items-center text-center h-full">
          <div class="w-20 h-20 mb-4 rounded-full flex items-center justify-center" style="background-color: ${doc.iconColor}20;">
            <i class="${doc.icon} text-3xl" style="color: ${doc.iconColor};"></i>
          </div>
          <h4 class="font-medium text-gray-800 mb-3 text-lg">${doc.title}</h4>
          <a href="${doc.link}" target="_blank" class="mt-auto py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors text-sm flex items-center">
            <i class="fas fa-external-link-alt mr-1"></i> Ver documento
          </a>
        </div>
      `;

      swiperContainer.appendChild(slide);

      // Crear indicador
      const indicator = document.createElement("button");
      indicator.className = `w-2 h-2 rounded-full ${index === 0 ? "bg-primary" : "bg-gray-300"}`;
      indicator.setAttribute("data-index", index);
      indicator.setAttribute("aria-label", `Ver documento ${index + 1}`);
      indicator.addEventListener("click", () => goToSlide(index));

      navigationContainer.appendChild(indicator);
    });

    // Inicializar eventos táctiles para swiper móvil
    initDocsSwiperTouchEvents();
  };

  // Función para navegar entre slides en móvil
  function goToSlide(index) {
    const slides = document.querySelectorAll(".docs-slide");
    const indicators = document.querySelectorAll(".docs-navigation button");
    const currentDocIndex = document.getElementById("current-doc-index");
    const totalDocsCount = document.getElementById("total-docs-count");

    // Validar que el índice esté dentro del rango
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;

    // Actualizar slides
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.style.opacity = "1";
        slide.style.pointerEvents = "auto";
      } else {
        slide.style.opacity = "0";
        slide.style.pointerEvents = "none";
      }
    });

    // Actualizar indicadores
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.remove("bg-gray-300");
        indicator.classList.add("bg-primary");
      } else {
        indicator.classList.remove("bg-primary");
        indicator.classList.add("bg-gray-300");
      }
    });

    // Actualizar contador
    if (currentDocIndex) currentDocIndex.textContent = index + 1;
    if (totalDocsCount && !totalDocsCount.textContent) totalDocsCount.textContent = slides.length;

    // Actualizar el estado de los botones de navegación
    updateNavButtons(index, slides.length);

    // Guardar el índice actual para el swiper táctil
    currentIndex = index;
  }

  // Función para actualizar el estado de los botones de navegación
  function updateNavButtons(currentIndex, totalSlides) {
    const prevButton = document.getElementById("prev-doc");
    const nextButton = document.getElementById("next-doc");

    if (prevButton && nextButton) {
      // Habilitar/deshabilitar botón anterior
      if (currentIndex === 0) {
        prevButton.classList.add("opacity-50", "cursor-not-allowed");
        prevButton.disabled = true;
      } else {
        prevButton.classList.remove("opacity-50", "cursor-not-allowed");
        prevButton.disabled = false;
      }

      // Habilitar/deshabilitar botón siguiente
      if (currentIndex === totalSlides - 1) {
        nextButton.classList.add("opacity-50", "cursor-not-allowed");
        nextButton.disabled = true;
      } else {
        nextButton.classList.remove("opacity-50", "cursor-not-allowed");
        nextButton.disabled = false;
      }
    }
  }

  // Variable global para el índice actual
  let currentIndex = 0;

  // Inicializar eventos táctiles para el swiper de documentos en móvil
  function initDocsSwiperTouchEvents() {
    const swiperContainer = document.querySelector(".docs-swiper");
    let startX, moveX;
    const slides = document.querySelectorAll(".docs-slide");
    const prevButton = document.getElementById("prev-doc");
    const nextButton = document.getElementById("next-doc");

    // Inicializar el contador total
    const totalDocsCount = document.getElementById("total-docs-count");
    if (totalDocsCount) totalDocsCount.textContent = slides.length;

    // Eventos táctiles
    swiperContainer.addEventListener("touchstart", handleTouchStart, { passive: true });
    swiperContainer.addEventListener("touchmove", handleTouchMove, { passive: true });
    swiperContainer.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Eventos de botones de navegación
    if (prevButton) {
      prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
          currentIndex--;
          goToSlide(currentIndex);
        }
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        if (currentIndex < slides.length - 1) {
          currentIndex++;
          goToSlide(currentIndex);
        }
      });
    }

    // Inicializar estado de los botones
    updateNavButtons(currentIndex, slides.length);

    function handleTouchStart(e) {
      startX = e.touches[0].clientX;
    }

    function handleTouchMove(e) {
      moveX = e.touches[0].clientX;
    }

    function handleTouchEnd() {
      if (startX && moveX) {
        const diff = startX - moveX;
        const threshold = 50;

        if (diff > threshold) {
          // Deslizar a la derecha (siguiente)
          if (currentIndex < slides.length - 1) {
            currentIndex++;
            goToSlide(currentIndex);
          }
        } else if (diff < -threshold) {
          // Deslizar a la izquierda (anterior)
          if (currentIndex > 0) {
            currentIndex--;
            goToSlide(currentIndex);
          }
        }
      }

      startX = null;
      moveX = null;
    }
  }

  // Event listeners
  if (closeProtectedDocsButton) {
    closeProtectedDocsButton.addEventListener("click", hideProtectedDocsModal);
  }

  // Cerrar modal al hacer clic fuera
  window.addEventListener("click", function (e) {
    const protectedDocsModal = document.getElementById("protected-docs-modal");
    if (e.target === protectedDocsModal) {
      hideProtectedDocsModal();
    }
  });

  // Compartir documento
  if (shareButton) {
    shareButton.addEventListener("click", function () {
      // Chequear si el navegador soporta la API de Web Share
      if (navigator.share) {
        navigator
          .share({
            title: "Análisis Completo del Proyecto - Aceleratik",
            text: "Te comparto el documento de análisis detallado del proyecto.",
            url: window.location.href + "#documentacion",
          })
          .then(() => console.log("Compartido exitosamente"))
          .catch((error) => console.log("Error al compartir:", error));
      } else {
        // Fallback para navegadores que no soportan la API de Web Share
        prompt("Copia este enlace para compartir el documento:", window.location.href + "#documentacion");
      }
    });
  }

  // Añadir tracking para descargas
  const downloadLinks = document.querySelectorAll("#documentacion a[download]");
  downloadLinks.forEach((link) => {
    link.addEventListener("click", function () {
      console.log(`Usuario descargó: ${this.textContent.trim()}`);
    });
  });

  // Añadir tracking para el PDF
  const pdfLink = document.querySelector("#documentacion a:not([download])");
  if (pdfLink) {
    pdfLink.addEventListener("click", function (e) {
      e.preventDefault();
      alert(`La descarga de PDF estará disponible próximamente.`);
      console.log("Usuario intentó descargar PDF");
    });
  }
}
