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
          {
            name: "Módulo de finanzas y contabilidad",
            odoo: 0.7,
            dynamics: 1.0,
            improvements: {
              odoo: "Odoo podría mejorar su módulo financiero con más funcionalidades avanzadas de contabilidad, mejor integración con sistemas bancarios locales y reportes financieros más personalizables. Dynamics destaca por su robustez en esta área.",
              dynamics: "Dynamics 365 ya ofrece un sistema financiero completo y robusto con capacidades avanzadas de contabilidad y cumplimiento normativo.",
            },
          },
          {
            name: "Gestión de intermediación",
            odoo: 0.93,
            dynamics: 0.85,
            improvements: {
              odoo: "Odoo ya ofrece una solución muy completa para la gestión de intermediación con alta personalización.",
              dynamics: "Dynamics podría mejorar su flexibilidad para adaptarse a procesos específicos de intermediación y ofrecer más opciones de personalización sin necesidad de desarrollo adicional.",
            },
          },
          {
            name: "Integraciones",
            odoo: 0.7,
            dynamics: 0.35,
            improvements: {
              odoo: "Odoo podría ampliar su ecosistema de integraciones nativas con más servicios de terceros y mejorar la documentación para desarrolladores.",
              dynamics: "Dynamics necesita mejorar significativamente sus capacidades de integración con sistemas externos, simplificar las APIs y reducir la complejidad técnica para conectar con otras plataformas.",
            },
          },
          {
            name: "Análisis de negocio",
            odoo: 1.0,
            dynamics: 1.0,
            improvements: {
              odoo: "Odoo ofrece capacidades completas de análisis de negocio con informes personalizables y dashboards interactivos.",
              dynamics: "Dynamics 365 cuenta con Power BI integrado que proporciona análisis avanzados y visualizaciones potentes.",
            },
          },
          {
            name: "Módulo de gestión del personal",
            odoo: 1.0,
            dynamics: 0.84,
            improvements: {
              odoo: "Odoo ofrece una solución completa de RRHH con funcionalidades avanzadas de gestión de personal.",
              dynamics: "Dynamics podría mejorar sus capacidades de autoservicio para empleados y ofrecer más herramientas de planificación de carrera y desarrollo profesional.",
            },
          },
        ],
      },
      economicoRFP: {
        id: "economicoRFP",
        title: "Económico",
        odoo: 0.83,
        dynamics: 0.44,
        subitems: [
          {
            name: "Financiamiento",
            odoo: 0.9,
            dynamics: 0.75,
            improvements: {
              odoo: "Odoo ofrece opciones de financiamiento flexibles con costos iniciales bajos.",
              dynamics: "Dynamics podría mejorar ofreciendo planes de financiamiento más flexibles y reduciendo los costos iniciales de implementación para empresas medianas.",
            },
          },
          {
            name: "Costos generales",
            odoo: 0.8,
            dynamics: 0.3,
            improvements: {
              odoo: "Odoo podría reducir aún más los costos de personalización y desarrollo a medida para implementaciones complejas.",
              dynamics: "Dynamics necesita revisar significativamente su estructura de costos para ser más competitivo, especialmente en licenciamiento por usuario y costos de implementación.",
            },
          },
          // { name: "Modelo de licenciamiento", odoo: 0.95, dynamics: 0.65 },
        ],
      },
      tecnicoRFP: {
        id: "tecnicoRFP",
        title: "Técnico",
        odoo: 0.82,
        dynamics: 0.89,
        subitems: [
          {
            name: "Arquitectura del sistema",
            odoo: 0.93,
            dynamics: 1.0,
            improvements: {
              odoo: "Odoo podría mejorar su arquitectura con mayor escalabilidad horizontal y mejor gestión de microservicios para implementaciones muy grandes.",
              dynamics: "Dynamics 365 ofrece una arquitectura robusta basada en la nube de Microsoft Azure con alta disponibilidad y escalabilidad.",
            },
          },
          {
            name: "Integración con aplicaciones",
            odoo: 0.75,
            dynamics: 0.88,
            improvements: {
              odoo: "Odoo podría mejorar sus conectores nativos con más aplicaciones empresariales y simplificar el proceso de desarrollo de integraciones personalizadas.",
              dynamics: "Dynamics tiene buena integración con el ecosistema Microsoft, pero podría mejorar la documentación y reducir la complejidad de integración con sistemas no-Microsoft.",
            },
          },
          {
            name: "Gestión de datos y usuarios",
            odoo: 0.8,
            dynamics: 0.9,
            improvements: {
              odoo: "Odoo podría mejorar sus capacidades de gestión de datos masivos y ofrecer más herramientas avanzadas de administración de permisos y roles.",
              dynamics: "Dynamics ofrece gestión avanzada de datos y usuarios con integración completa con Azure Active Directory.",
            },
          },
          {
            name: "Mantenibilidad",
            odoo: 0.68,
            dynamics: 1.0,
            improvements: {
              odoo: "Odoo necesita mejorar la documentación técnica, simplificar las actualizaciones entre versiones y reducir la complejidad de mantenimiento para implementaciones personalizadas.",
              dynamics: "Dynamics 365 ofrece excelente mantenibilidad con actualizaciones automáticas gestionadas por Microsoft y clara documentación técnica.",
            },
          },
          {
            name: "Escalabilidad y evolución futura",
            odoo: 0.9,
            dynamics: 0.75,
            improvements: {
              odoo: "Odoo ofrece buena escalabilidad con su arquitectura modular y desarrollo constante de nuevas funcionalidades.",
              dynamics: "Dynamics podría mejorar su flexibilidad para adaptarse a necesidades cambiantes sin depender tanto de consultores especializados y reducir la complejidad de personalización.",
            },
          },
        ],
      },
      proveedorRFP: {
        id: "proveedorRFP",
        title: "Proveedor",
        odoo: 0.74,
        dynamics: 0.88,
        subitems: [
          {
            name: "Trayectoria",
            odoo: 0.88,
            dynamics: 1.0,
            improvements: {
              odoo: "Odoo tiene buena trayectoria pero podría fortalecer su presencia en ciertos sectores específicos y aumentar casos de éxito en grandes empresas.",
              dynamics: "Microsoft Dynamics cuenta con una extensa trayectoria y presencia global consolidada en el mercado empresarial.",
            },
          },
          {
            name: "Soporte y mantenimiento",
            odoo: 0.88,
            dynamics: 0.88,
            improvements: {
              odoo: "Odoo podría mejorar los tiempos de respuesta para soporte técnico avanzado y ampliar la disponibilidad de soporte 24/7 para todos los planes.",
              dynamics: "Dynamics ofrece buen soporte pero podría mejorar la accesibilidad y reducir la dependencia de partners para resolver problemas técnicos básicos.",
            },
          },
          {
            name: "Plan de implementación y migración",
            odoo: 0.4,
            dynamics: 0.6,
            improvements: {
              odoo: "Odoo necesita mejorar significativamente su metodología de implementación y ofrecer herramientas más robustas para migración de datos desde sistemas legacy.",
              dynamics: "Dynamics podría simplificar sus procesos de implementación para reducir tiempos y costos, y mejorar las herramientas de migración para sistemas no-Microsoft.",
            },
          },
          {
            name: "Certificaciones",
            odoo: 0.65,
            dynamics: 1.0,
            improvements: {
              odoo: "Odoo debería obtener más certificaciones de seguridad y cumplimiento normativo internacional para competir en sectores altamente regulados.",
              dynamics: "Microsoft Dynamics cuenta con numerosas certificaciones de seguridad, cumplimiento y calidad reconocidas internacionalmente.",
            },
          },
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
