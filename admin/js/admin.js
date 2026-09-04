// Escuchar los eventos del DOM
document.addEventListener("DOMContentLoaded", () => {

    // Función que elimina las credenciales y sale a la raíz
    function cerrarSesionAdmin() {
        // 1. Eliminar tokens y datos de la sesión guardados
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        sessionStorage.clear();

        // 2. Redirigir fuera de /admin/ hacia la raíz principal
        window.location.href = "../index.html";
    }

    // B. Capturar clic en el enlace de Cierre de Sesión de la Navbar
    const btnLogout = document.getElementById("user-trigger");
    if (btnLogout) {
        btnLogout.addEventListener("click", (e) => {
            e.preventDefault(); // Evita que el enlace recargue la página por defecto
            cerrarSesionAdmin();
        });
    }
});

//TODO arreglar logica de cerrar sesion , y direccionamiento al panel administrativo