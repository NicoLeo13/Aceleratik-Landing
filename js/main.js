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

    // Alerta medio falopa
    item.addEventListener("click", function () {
      const title = this.querySelector("h4").textContent;
      const date = this.querySelector("p.text-sm").textContent;
      const description = this.querySelector("p.text-xs").textContent;

      alert(`${title}\n${date}\n\n${description}`);
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
      displayName: "Análisis y Evaluación de ERP",
      color: "#2563eb", // blue-500
      items: [
        { name: "Diagnóstico de situación actual", value: 25000 },
        { name: "Evaluación comparativa de soluciones", value: 35000 },
        { name: "Selección de proveedores", value: 20000 },
        { name: "Informe técnico detallado", value: 15000 },
      ],
    },
    gestion: {
      name: "Gestión",
      displayName: "Gestión del Cambio",
      color: "#10b981", // green-500
      items: [
        { name: "Mapeo de procesos actuales", value: 20000 },
        { name: "Diseño de procesos optimizados", value: 25000 },
        { name: "Plan de comunicación interna", value: 10000 },
        { name: "Gestión de resistencia al cambio", value: 10000 },
      ],
    },
    supervision: {
      name: "Supervisión",
      displayName: "Supervisión de Implementación",
      color: "#8b5cf6", // purple-500
      items: [
        { name: "Control de calidad del proveedor", value: 15000 },
        { name: "Seguimiento de hitos del proyecto", value: 12000 },
        { name: "Validación de entregables", value: 10000 },
        { name: "Informes de avance periódicos", value: 8000 },
      ],
    },
    capacitacion: {
      name: "Capacitación",
      displayName: "Capacitación y Documentación",
      color: "#f59e0b", // yellow-500
      items: [
        { name: "Plan de capacitación personalizado", value: 12000 },
        { name: "Materiales de capacitación", value: 8000 },
        { name: "Documentación de procesos", value: 12000 },
        { name: "Evaluación post-implementación", value: 8000 },
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
