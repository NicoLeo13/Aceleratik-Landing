/**
 * data.js
 * Archivo para comparativas entre Odoo y Dynamics 365
 */

// Datos unificados para todos los módulos de comparación
const COMPARISON_DATA = {
  // Datos para RFI (Request for Information)
  rfi: {
    categories: {
      funcional: {
        weight: 0.3,
        name: "Funcional",
        description: "Aspectos funcionales del sistema",
      },
      economico: {
        weight: 0.3,
        name: "Económico",
        description: "Costos y aspectos financieros",
      },
      tecnico: {
        weight: 0.25,
        name: "Técnico",
        description: "Aspectos técnicos y tecnológicos",
      },
      proveedor: {
        weight: 0.15,
        name: "Proveedor",
        description: "Evaluación del proveedor",
      },
    },
    providers: {
      odoo: {
        name: "Odoo",
        logo: "img/logos/odoo.png",
        color: {
          primary: "purple-600",
          gradient: { from: "purple-400", to: "purple-600" },
        },
        scores: {
          funcional: 0.85,
          economico: 0.9,
          tecnico: 0.75,
          proveedor: 0.8,
        },
      },
      dynamics: {
        name: "Dynamics 365",
        logo: "img/logos/dynamics365.png",
        color: {
          primary: "blue-600",
          gradient: { from: "blue-400", to: "blue-600" },
        },
        scores: {
          funcional: 0.75,
          economico: 0.7,
          tecnico: 0.9,
          proveedor: 0.85,
        },
      },
    },
  },

  // Datos para RFP (Request for Proposal)
  rfp: {
    categories: {
      arquitectura: {
        id: "arquitectura",
        title: "Arquitectura Tecnológica y Robustez",
        odoo: 0.75,
        dynamics: 0.9,
        subitems: [
          { name: "Robustez de la plataforma", odoo: 0.7, dynamics: 0.9 },
          { name: "Seguridad y conformidad", odoo: 0.75, dynamics: 0.85 },
          { name: "Escalabilidad técnica", odoo: 0.8, dynamics: 0.95 },
        ],
      },
      adaptabilidad: {
        id: "adaptabilidad",
        title: "Adaptabilidad y evolución (Integración)",
        odoo: 0.9,
        dynamics: 0.8,
        subitems: [
          { name: "Facilidad de personalización", odoo: 0.95, dynamics: 0.75 },
          { name: "Integraciones con otros sistemas", odoo: 0.85, dynamics: 0.85 },
          { name: "Extensibilidad del código", odoo: 0.9, dynamics: 0.8 },
        ],
      },
      escalabilidad: {
        id: "escalabilidad",
        title: "Escalabilidad y Evolución Futura",
        odoo: 0.75,
        dynamics: 0.85,
        subitems: [
          { name: "Crecimiento de usuarios", odoo: 0.7, dynamics: 0.9 },
          { name: "Rendimiento con grandes volúmenes", odoo: 0.75, dynamics: 0.85 },
          { name: "Roadmap de desarrollo", odoo: 0.8, dynamics: 0.8 },
        ],
      },
      usabilidad: {
        id: "usabilidad",
        title: "Usabilidad",
        odoo: 0.85,
        dynamics: 0.75,
        subitems: [
          { name: "Interfaz de usuario", odoo: 0.9, dynamics: 0.7 },
          { name: "Curva de aprendizaje", odoo: 0.85, dynamics: 0.75 },
          { name: "Experiencia móvil", odoo: 0.8, dynamics: 0.8 },
        ],
      },
    },
    totalScores: {
      odoo: 19.94,
      dynamics: 21.06,
      maxScore: 25,
    },
  },

  // Datos para flujo de caja
  cashflow: {
    years: 3,
    costs: {
      odoo: [32080, 54080, 76080],
      dynamics: [65600, 107600, 149600],
    },
    savings: {
      odoo: [50000, 75000, 100000],
      dynamics: [45000, 80000, 115000],
    },
  },
};

// Exportar los datos para uso global
window.COMPARISON_DATA = COMPARISON_DATA;
