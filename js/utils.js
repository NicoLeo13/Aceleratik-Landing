// Utilidades - se usan por todos lados

// Para mostrar plata con formato correcto
function formatearMoneda(numero) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(numero);
}

// Chequea si un mail tiene pinta de ser posta
function esEmailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Debounce - no jode tanto al navegador con eventos que se disparan mil veces
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Checkeos de tamaño de pantalla
function esMobile() {
  return window.innerWidth <= 640;
}

function esTablet() {
  return window.innerWidth > 640 && window.innerWidth <= 1023;
}

function esDesktop() {
  return window.innerWidth > 1023;
}

// Hace magia para que el responsive funcione bien cuando cambia el tamaño
function actualizarVisualizacionResponsiva() {
  const responsiveElements = document.querySelectorAll('[class*="lg:hidden"], [class*="hidden"], [class*="lg:block"]');
  if (responsiveElements.length) {
    // Truco para que Tailwind se avive cuando hay cambios
    responsiveElements.forEach((el) => {
      el.classList.add("resize-check");
      setTimeout(() => el.classList.remove("resize-check"), 10);
    });
  }

  // Presupuesto - esa sección es un quilombo
  const presupuestoSection = document.getElementById("presupuesto");
  if (presupuestoSection) {
    const categoryContents = document.querySelectorAll(".category-content");
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    if (window.innerWidth >= 1024) {
      // En desktop muestra todo
      categoryContents.forEach((content) => {
        if (content.classList.contains("hidden")) {
          content.classList.remove("hidden");
          content.classList.add("lg:block");
        }
      });

      // Solo un acordeón abierto
      let hasOpenAccordion = false;
      accordionHeaders.forEach((header) => {
        if (header.classList.contains("active") && !hasOpenAccordion) {
          hasOpenAccordion = true;
        } else if (header.classList.contains("active") && hasOpenAccordion) {
          // Cerramos este
          const content = header.nextElementSibling;
          const icon = header.querySelector(".accordion-icon");
          if (content) content.style.maxHeight = "0";
          if (icon) icon.style.transform = "rotate(0deg)";
          header.classList.remove("active", "bg-blue-50");
        }
      });

      // Si no hay ninguno abierto, abre el primero
      if (!hasOpenAccordion && accordionHeaders.length > 0) {
        const header = accordionHeaders[0];
        const content = header.nextElementSibling;
        const icon = header.querySelector(".accordion-icon");

        if (content) content.style.maxHeight = `${content.scrollHeight}px`;
        if (icon) icon.style.transform = "rotate(180deg)";
        header.classList.add("active", "bg-blue-50");
      }
    } else {
      // En móvil solo muestra el seleccionado
      const activeCategory = document.querySelector(".category-btn.bg-blue-500")?.getAttribute("data-category") || "analisis";

      // Si no hay nada activo, activa el primero
      if (!document.querySelector(".category-btn.bg-blue-500") && typeof window.activateCategory === "function") {
        window.activateCategory("analisis");
      } else {
        // Actualiza manualmente lo que se ve
        categoryContents.forEach((content) => {
          if (content.getAttribute("data-category") === activeCategory) {
            content.classList.remove("hidden");

            // Asegura que el acordeón esté abierto
            const header = content.querySelector(".accordion-header");
            const accordionContent = content.querySelector(".accordion-content");
            const icon = header?.querySelector(".accordion-icon");

            if (accordionContent && header) {
              accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
              if (icon) icon.style.transform = "rotate(180deg)";
              header.classList.add("active", "bg-blue-50");
            }
          } else {
            content.classList.add("hidden");
          }
        });
      }
    }
  }
}

// Exportar al global para que main.js los use
window.formatearMoneda = formatearMoneda;
window.esEmailValido = esEmailValido;
window.debounce = debounce;
window.esMobile = esMobile;
window.esTablet = esTablet;
window.esDesktop = esDesktop;
window.actualizarVisualizacionResponsiva = actualizarVisualizacionResponsiva;
