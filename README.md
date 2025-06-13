# Sitio Web de Aceleratik

## Descripción

Sitio web oficial de **Aceleratik**
Aceleratik es un proyecto de la materia Actuación Profesional de la Licenciatura en Sistemas de Información de la UBA. El objetivo es crear la marca de una consultora y realizar un trabajo de consultoría sobre un cliente real, en este caso **deCampoaCampo**.

## Tecnologías Utilizadas

- HTML5 semántico
- Tailwind CSS
- JavaScript
- Font Awesome
- Google Fonts (Inter)

## Secciones del Sitio

1. **Inicio/About Aceleratik**

   - Descripción de la empresa
   - Valores corporativos
   - Trayectoria (timeline)

2. **Equipo/Our Team**

   - Perfiles del equipo
   - Roles y experiencia

3. **Proyecto Actual/Current Project**

   - Información sobre deCampoaCampo
   - Objetivos y problemas identificados
   - Solución IT propuesta

4. **Planificación/Planning**

   - Calendario del proyecto
   - Metodología ágil
   - Fases del proyecto

5. **Presupuesto/Budget**

   - Desglose de costos
   - Opciones de pago
   - Información de inversión

6. **Contacto/Contact**
   - Formulario de contacto
   - Información de la empresa
   - Redes sociales

## Estructura del Proyecto

```
/
├── index.html           # Archivo HTML principal
├── css/
│   └── tailwind.css     # Estilos y Tailwind
├── js/
│   ├── main.js          # JavaScript principal
│   ├── auth.js          # Sistema de autenticación
│   ├── utils.js         # Utilidades
│   ├── data.js          # Datos de la aplicación
│   ├── charts.js        # Gráficos y visualizaciones
│   ├── scroll.js        # Navegación por scroll
│   └── maps.js          # Integración con mapas
├── img/                 # Imágenes
├── LICENSE              # Licencia MIT
├── README.md            # Documentación
```

## Características de Diseño

### Diseño Responsivo

- Optimizado para móviles, tablets y desktop
- Menú tipo "sandwich" (hamburguesa) para navegación en celulares
- Layouts adaptables

### Accesibilidad

- HTML5 semántico
- Atributos ARIA
- Navegación por teclado
- Alt text para imágenes
- Contraste adecuado

### Interactividad

- Scroll suave entre secciones
- Calendario interactivo
- Stepper visual para metodología
- Validación de formularios
- Animaciones y transiciones

## Funcionalidades JavaScript

### Navegación

- Menú responsive
- Smooth scrolling
- Cierre automático del menú

### Calendario

- Navegación entre meses
- Eventos por colores
- Tooltips informativos

### Metodología Ágil

- Stepper con fases del proyecto
- Barra de progreso
- Información por fase

### Formulario

- Validación en tiempo real
- Mensajes de error
- Confirmación de envío

### Extras

- Botón "scroll to top"
- Lazy loading
- Manejo de resize

## Paleta de Colores

- Primario: `#2563eb` (Azul)
- Secundario: `#1e40af` (Azul oscuro)
- Acento: `#3b82f6` (Azul claro)
- Texto primario: `#1f2937` (Gris oscuro)
- Texto secundario: `#6b7280` (Gris medio)

## Compatibilidad

### Navegadores

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Dispositivos

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Móvil (320px - 767px)

## Uso

### Instalación

1. Clona o descarga el proyecto
2. Abri `index.html` en tu navegador
3. Listo

## Configuración de API Keys

Para configurar las API keys:

1. Copia `config.template.js` a `config.js`
2. Reemplaza los valores placeholder:

```javascript
const CONFIG = {
  GOOGLE_MAPS_API_KEY: "TU_CLAVE_DE_API_AQUI",
};
```

### Desarrollo Local

Para desarrollo local:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

### Personalización

#### Colores

Modifica las variables en `css/tailwind.css`:

```css
:root {
  --primary-color: #tu-color-primario;
  --secondary-color: #tu-color-secundario;
  --accent-color: #tu-color-acento;
}
```

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Sistema de Autenticación

El sitio incluye un sistema de autenticación seguro para acceder a documentos protegidos:

- Protección con contraseña utilizando hash SHA-256
- No se almacenan contraseñas en texto plano en el código
- Persistencia de sesión utilizando localStorage
- Compatible con GitHub Pages (sin necesidad de backend)

### Seguridad

- Las contraseñas nunca se transmiten en texto plano
- El hash SHA-256 protege contra la exposición de la contraseña en el repositorio
- La autenticación se realiza completamente en el lado del cliente

## Desarrollo

Para ejecutar el proyecto localmente:

1. Clona el repositorio
2. Abre `index.html` en tu navegador

## Despliegue

El sitio está diseñado para ser desplegado en GitHub Pages o cualquier servicio de hosting estático.
