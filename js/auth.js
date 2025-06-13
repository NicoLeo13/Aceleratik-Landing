/**
 * Authentication module for Aceleratik Landing Page
 * Handles secure password verification using SHA-256 hashing
 */

// The hashed password (SHA-256)
const HASHED_PASSWORD = "7d82dd90ea5def395507acc71e503f4581280a28fee41cb7d7268a06e76d880a";

/**
 * Hashes a string using SHA-256 algorithm
 * @param {string} str - The string to hash
 * @returns {Promise<string>} - The hexadecimal hash
 */
async function hashString(str) {
  // Convert string to ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(str);

  // Hash the data using SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert ArrayBuffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hashHex;
}

/**
 * Verifies if the provided password matches the stored hash
 * @param {string} password - The password to verify
 * @returns {Promise<boolean>} - True if password is correct
 */
async function verifyPassword(password) {
  try {
    const hashedInput = await hashString(password);
    return hashedInput === HASHED_PASSWORD;
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
}

/**
 * Sets authentication status in localStorage
 * @param {boolean} isAuthenticated - Authentication status
 */
function setAuthStatus(isAuthenticated) {
  if (isAuthenticated) {
    localStorage.setItem("aceleratikDocsAuth", "true");
  } else {
    localStorage.removeItem("aceleratikDocsAuth");
  }
}

/**
 * Checks if user is currently authenticated
 * @returns {boolean} - True if authenticated
 */
function isAuthenticated() {
  return localStorage.getItem("aceleratikDocsAuth") === "true";
}

/**
 * Initializes the authentication system
 * @param {Object} options - Configuration options
 */
function initAuth(options = {}) {
  const { passwordModalId = "password-modal", passwordInputId = "password-input", passwordErrorId = "password-error", submitPasswordId = "submit-password", cancelPasswordId = "cancel-password", protectedDocsModalId = "protected-docs-modal", accessButtonId = "access-protected-docs", logoutButtonId = "logout-docs" } = options;

  // Get DOM elements
  const passwordModal = document.getElementById(passwordModalId);
  const passwordInput = document.getElementById(passwordInputId);
  const passwordError = document.getElementById(passwordErrorId);
  const submitPasswordButton = document.getElementById(submitPasswordId);
  const cancelPasswordButton = document.getElementById(cancelPasswordId);
  const protectedDocsModal = document.getElementById(protectedDocsModalId);
  const accessButton = document.getElementById(accessButtonId);
  const logoutButton = document.getElementById(logoutButtonId);

  if (!passwordModal || !passwordInput || !submitPasswordButton) {
    console.error("Required authentication elements not found in the DOM");
    return;
  }

  // Function to show password modal
  function showPasswordModal() {
    passwordModal.classList.remove("hidden");
    passwordInput.value = "";
    if (passwordError) passwordError.classList.add("hidden");
    passwordInput.focus();
  }

  // Function to hide password modal
  function hidePasswordModal() {
    passwordModal.classList.add("hidden");
  }

  // Function to show protected docs modal
  function showProtectedDocsModal() {
    if (protectedDocsModal) {
      protectedDocsModal.classList.remove("hidden");
      // If there's a function to render documents, call it here
      if (typeof renderDocuments === "function") {
        renderDocuments();
      }
    }
  }

  // Handle password submission
  async function handlePasswordSubmit() {
    const inputValue = passwordInput.value.trim();

    if (!inputValue) {
      if (passwordError) {
        passwordError.textContent = "Por favor ingrese la contraseña";
        passwordError.classList.remove("hidden");
      }
      return;
    }

    const isValid = await verifyPassword(inputValue);

    if (isValid) {
      setAuthStatus(true);
      hidePasswordModal();
      showProtectedDocsModal();
    } else {
      if (passwordError) {
        passwordError.textContent = "Contraseña incorrecta";
        passwordError.classList.remove("hidden");
      }
      passwordInput.focus();
    }
  }

  // Event listeners
  if (accessButton) {
    accessButton.addEventListener("click", function () {
      if (isAuthenticated()) {
        showProtectedDocsModal();
      } else {
        showPasswordModal();
      }
    });
  }

  if (submitPasswordButton) {
    submitPasswordButton.addEventListener("click", handlePasswordSubmit);
  }

  if (passwordInput) {
    passwordInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        handlePasswordSubmit();
      }
    });
  }

  if (cancelPasswordButton) {
    cancelPasswordButton.addEventListener("click", hidePasswordModal);
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      setAuthStatus(false);
      if (protectedDocsModal) {
        protectedDocsModal.classList.add("hidden");
      }
      // Show logout confirmation
      alert("Se ha cerrado la sesión correctamente");
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === passwordModal) {
      hidePasswordModal();
    }
  });
}

// Export functions for use in other modules
window.AuthModule = {
  init: initAuth,
  verify: verifyPassword,
  isAuthenticated: isAuthenticated,
  setAuthStatus: setAuthStatus,
};
