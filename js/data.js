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
        odoo: 0.86,
        dynamics: 0.74,
        subitems: [
          { name: "Módulo de Finanzas y Contabilidad", odoo: 0.7, dynamics: 1.0 },
          { name: "Gestión de Intermediación", odoo: 0.93, dynamics: 0.85 },
          { name: "Integraciones", odoo: 0.7, dynamics: 0.35 },
          { name: "Análisis de Negocio", odoo: 1.0, dynamics: 1.0 },
          { name: "Módulo de Gestión del Personal", odoo: 1.0, dynamics: 0.84 },
        ],
      },
      economicoRFP: {
        id: "economicoRFP",
        title: "Económico",
        odoo: 0.83,
        dynamics: 0.44,
        subitems: [
          { name: "Financiamiento", odoo: 0.9, dynamics: 0.75 },
          { name: "Costos Generales", odoo: 0.8, dynamics: 0.3 },
          // { name: "Modelo de licenciamiento", odoo: 0.95, dynamics: 0.65 },
        ],
      },
      tecnicoRFP: {
        id: "tecnicoRFP",
        title: "Técnico",
        odoo: 0.82,
        dynamics: 0.89,
        subitems: [
          { name: "Arquitectura del Sistema", odoo: 0.93, dynamics: 1.0 },
          { name: "Integración con Aplicaciones", odoo: 0.75, dynamics: 0.88 },
          { name: "Gestión de Datos y Usuarios", odoo: 0.8, dynamics: 0.9 },
          { name: "Mantenibilidad", odoo: 0.68, dynamics: 1.0 },
          { name: "Escalabilidad y Evolución Futura", odoo: 0.9, dynamics: 0.75 },
        ],
      },
      proveedorRFP: {
        id: "proveedorRFP",
        title: "Proveedor",
        odoo: 0.74,
        dynamics: 0.88,
        subitems: [
          { name: "Trayectoria", odoo: 0.88, dynamics: 1.0 },
          { name: "Soporte y Mantenimiento", odoo: 0.88, dynamics: 0.88 },
          { name: "Plan de Implementación y Migración", odoo: 0.4, dynamics: 0.6 },
          { name: "Certificaciones", odoo: 0.65, dynamics: 1.0 },
          // { name: "Plan de capacitación", odoo: 0.92, dynamics: 0.75 },
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
