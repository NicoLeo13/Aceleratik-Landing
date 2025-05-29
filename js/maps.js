// Configuración de Google Maps para la web de Aceleratik

// Variables globales
let map, marker, infoWindow;

// Carga el script de Google Maps
function loadGoogleMapsScript() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${window.CONFIG.GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=places&v=weekly`;
  script.async = true;
  script.defer = true;
  script.referrerPolicy = "origin";

  script.onerror = function () {
    console.error("La API de Google Maps no cargó... fuckkkk");
    const mapContainer = document.getElementById("google-map");
    if (mapContainer) {
      mapContainer.innerHTML = '<div class="flex items-center justify-center h-full"><p class="text-red-500">No se pudo cargar el mapa</p></div>';
    }
  };

  document.body.appendChild(script);
}

// Inicializa el mapa
function initMap() {
  // Coordenadas de Económicas
  const ubaLocation = { lat: -34.599072, lng: -58.398537 };

  map = new google.maps.Map(document.getElementById("google-map"), {
    center: ubaLocation,
    zoom: 16,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    zoomControl: true,
    styles: [
      {
        featureType: "poi.business",
        stylers: [{ visibility: "simplified" }],
      },
    ],
  });

  // Marcador en la facu
  marker = new google.maps.Marker({
    position: ubaLocation,
    map: map,
    title: "Facultad de Ciencias Económicas, UBA",
    animation: google.maps.Animation.DROP,
  });

  // Ventana de info
  infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="padding: 8px; max-width: 200px;">
        <h3 style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">Facultad de Ciencias Económicas</h3>
        <p style="font-size: 12px; margin: 0;">Av. Córdoba 2122, C1113 CABA</p>
      </div>
    `,
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });

  // Abre la info por defecto
  infoWindow.open(map, marker);
}

// Maneja eventos para iniciar el mapa según el dispositivo
function initMapEvents() {
  // Para móvil
  const mapTab = document.querySelector('[data-tab="map"]');
  if (mapTab) {
    mapTab.addEventListener("click", function () {
      setTimeout(function () {
        if (window.google && window.google.maps) {
          initMap();
        }
      }, 100);
    });
  }

  // Para escritorio
  if (window.innerWidth >= 768 && window.google && window.google.maps) {
    initMap();
  }
}

// Inicia todo cuando el DOM carga
document.addEventListener("DOMContentLoaded", () => {
  // Verifica la configuración antes de cargar
  if (window.CONFIG && window.CONFIG.GOOGLE_MAPS_API_KEY) {
    loadGoogleMapsScript();
    initMapEvents();
  } else {
    console.error("La configuración no está disponible. Mal ahi.");
  }
});

// Para el callback de Google Maps API
window.initMap = initMap;
