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
      funcionalRFP: {
        id: "funcionalRFP",
        title: "Funcional",
        odoo: 0.92,
        dynamics: 0.75,
        subitems: [
          { name: "Módulo de Finanzas y contabilidad", odoo: 0.95, dynamics: 0.85 },
          { name: "Gestión de intermediación", odoo: 0.9, dynamics: 0.75 },
          { name: "Integraciones", odoo: 0.95, dynamics: 0.7 },
          { name: "Analisis de negocio", odoo: 0.9, dynamics: 0.8 },
          { name: "Módulo de Gestion del Personal", odoo: 0.9, dynamics: 0.65 },
        ],
      },
      economicoRFP: {
        id: "economicoRFP",
        title: "Económico",
        odoo: 0.95,
        dynamics: 0.65,
        subitems: [
          { name: "Costo inicial del producto", odoo: 0.98, dynamics: 0.6 },
          { name: "Modelo de licenciamiento", odoo: 0.95, dynamics: 0.65 },
          { name: "Financiamiento", odoo: 0.92, dynamics: 0.7 },
        ],
      },
      tecnicoRFP: {
        id: "tecnicoRFP",
        title: "Técnico",
        odoo: 0.88,
        dynamics: 0.82,
        subitems: [
          { name: "Arquitectura del sistema", odoo: 0.85, dynamics: 0.88 },
          { name: "Integración con aplicaciones", odoo: 0.92, dynamics: 0.85 },
          { name: "Gesión de datos y usuarios", odoo: 0.88, dynamics: 0.8 },
          { name: "Mantenibilidad y Soporte Técnico", odoo: 0.85, dynamics: 0.8 },
          { name: "Capacidades Analíticas y de Reportes Técnicos", odoo: 0.9, dynamics: 0.78 },
        ],
      },
      proveedorRFP: {
        id: "proveedorRFP",
        title: "Proveedor",
        odoo: 0.9,
        dynamics: 0.78,
        subitems: [
          { name: "Soporte", odoo: 0.88, dynamics: 0.82 },
          { name: "Plan de capacitación", odoo: 0.92, dynamics: 0.75 },
          { name: "Plan de migración", odoo: 0.9, dynamics: 0.8 },
          { name: "Certificaciones", odoo: 0.85, dynamics: 0.85 },
          { name: "Trayectoria", odoo: 0.95, dynamics: 0.7 },
        ],
      },
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

  // Datos para la tabla de costos por año (licencia y mantenimiento)
  cashflowTable: {
    years: 3,
    costs: {
      odoo: [32080, 22440, 22440], // Año 1: implementación + licencia, Año 2-3: solo licencia y mantenimiento
      dynamics: [65600, 42000, 42000], // Año 1: implementación + licencia, Año 2-3: solo licencia y mantenimiento
    },
    notes: "Costos para un paquete de 50 usuarios. Años 2 y 3 muestran solo licencia y mantenimiento.",
  },
};

// Exportar los datos para uso global
window.COMPARISON_DATA = COMPARISON_DATA;
