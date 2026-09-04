// ====== LOGICA DE COMBO BOX DE COMUNA DE REGISTER.HTML ======
const comunasPorRegion = {
    "arica-parinacota": ["Arica", "Camarones", "General Lagos", "Putre"],
    "tarapaca": ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"],
    "antofagasta": ["Antofagasta", "Calama", "María Elena", "Ollagüe", "San Pedro de Atacama", "Sierra Gorda", "Taltal", "Tocopilla", "Mejillones"],
    "atacama": ["Chañaral", "Diego de Almagro", "Caldera", "Copiapó", "Tierra Amarilla", "Alto del Carmen", "Freirina", "Huasco", "Vallenar"],
    "coquimbo": ["Canela", "Illapel", "Los Vilos", "Salamanca", "Andacollo", "Coquimbo", "La Higuera", "La Serena", "Paihuano", "Vicuña", "Combarbalá", "Monte Patria", "Ovalle", "Punitaqui", "Río Hurtado"],
    "valparaiso": ["Isla de Pascua", "Calle Larga", "Los Andes", "Rinconada", "San Esteban", "Limache", "Olmué", "Quilpué", "Villa Alemana", "Cabildo", "La Ligua", "Papudo", "Petorca", "Zapallar", "Hijuelas"],
    "metropolitana": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "Santiago", "San Joaquín", "San Miguel", "San Ramón", "Vitacura"],
    "ohiggins": ["Rancagua", "Machalí", "Graneros", "Rengo", "San Fernando", "Pichilemu"],
    "maule": ["Talca", "Curicó", "Linares", "Constitución", "Cauquenes"],
    "nuble": ["Chillán", "Chillán Viejo", "Bulnes", "San Carlos"],
    "biobio": ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante", "Los Ángeles"],
    "araucania": ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol"],
    "los-rios": ["Valdivia", "La Unión", "Río Bueno", "Panguipulli"],
    "los-lagos": ["Puerto Montt", "Puerto Varas", "Osorno", "Castro", "Ancud"],
    "aysen": ["Coyhaique", "Puerto Aysén", "Chile Chico"],
    "magallanes": ["Punta Arenas", "Puerto Natales", "Porvenir"]
};

// ====== CARGA DE DATOS DE PRUEBA EN 'usuarios_db' ======
function cargarDatosDePrueba() {
    const usuariosExistentes = localStorage.getItem('usuarios_db');

    // Si la clave 'usuarios_db' está vacía, crea los usuarios iniciales
    if (!usuariosExistentes) {
        const usuariosIniciales = [
            {
                nombre: "Administrador",
                email: "admin@losmaestros.cl",
                password: "admin123",
                rol: "admin"
            },
            {
                nombre: "Cliente",
                email: "cliente@correo.com",
                password: "user123",
                rol: "cliente"
            }
        ];

        localStorage.setItem('usuarios_db', JSON.stringify(usuariosIniciales));
    }
}

function cerrarSesion() {
    // Elimina los datos guardados de la sesión
    localStorage.removeItem("adminToken");
    localStorage.removeItem("usuario");
    sessionStorage.clear();

    // Redirige fuera de la carpeta /admin/ hacia la raíz principal (index.html)
    window.location.href = "../index.html";
}

document.addEventListener('DOMContentLoaded', function () {

    // Cargar usuarios iniciales en 'usuarios_db'
    cargarDatosDePrueba();

    // ACTUALIZAR NOMBRE EN LA BARRA DE NAVEGACIÓN Y MENÚ DESPLEGABLE
    function actualizarNavUsuario() {
        const userTrigger = document.querySelector('.user-trigger');
        const dropdownContent = document.querySelector('.dropdown-content');
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuario_logueado'));

        if (usuarioLogueado && userTrigger) {
            // Muestra el nombre registrado o el correo
            const nombreMostrar = usuarioLogueado.nombre || usuarioLogueado.email.split('@')[0];
            userTrigger.innerHTML = `👤 ${nombreMostrar}`;

            if (dropdownContent) {
                let opcionesExtra = '';
                dropdownContent.innerHTML = `
                    ${opcionesExtra}
                    <a href="#" id="btn-logout" style="color: #d32f2f;">Cerrar sesión</a>
                `;

                // Listener para el botón Cerrar Sesión
                const btnLogout = document.getElementById('btn-logout');
                if (btnLogout) {
                    btnLogout.addEventListener('click', function (e) {
                        e.preventDefault();
                        localStorage.removeItem('usuario_logueado');
                        alert('Has cerrado sesión correctamente.');
                        window.location.href = 'index.html'; // Redirige a la portada pública
                    });
                }
            }
        }
    }

    actualizarNavUsuario();

    // --- LÓGICA DE COMBOBOX REGION / COMUNA ---
    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");

    if (selectRegion && selectComuna) {
        selectRegion.addEventListener("change", function () {
            const regionSeleccionada = this.value;
            selectComuna.innerHTML = '<option value="" disabled selected>---Seleccione una Comuna---</option>';

            if (regionSeleccionada && comunasPorRegion[regionSeleccionada]) {
                selectComuna.disabled = false;
                comunasPorRegion[regionSeleccionada].forEach(comuna => {
                    const option = document.createElement("option");
                    option.value = comuna.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = comuna;
                    selectComuna.appendChild(option);
                });
            } else {
                selectComuna.disabled = true;
            }
        });
    }

    // --- LÓGICA DE REGISTRO DE USUARIOS (GUARDA EN usuarios_db) ---
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("password-2");
        const errorMessage = document.getElementById("error-message");

        function validarContrasenas() {
            if (!confirmPassword || confirmPassword.value === '') {
                if (errorMessage) errorMessage.style.display = 'none';
                return true;
            }

            if (password.value !== confirmPassword.value) {
                if (errorMessage) errorMessage.style.display = 'block';
                return false;
            } else {
                if (errorMessage) errorMessage.style.display = 'none';
                return true;
            }
        }

        if (password && confirmPassword) {
            password.addEventListener('input', validarContrasenas);
            confirmPassword.addEventListener('input', validarContrasenas);
        }

        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            if (!validarContrasenas()) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            const nameInput = document.getElementById("name") ? document.getElementById("name").value : '';
            const emailInput = document.getElementById("reg-email").value;
            const passInput = password.value;
            const regionInput = selectRegion ? selectRegion.value : '';
            const comunaInput = selectComuna ? selectComuna.value : '';

            // Obtener el arreglo existente guardado bajo la clave 'usuarios_db'
            let usuarios = JSON.parse(localStorage.getItem('usuarios_db')) || [];

            // Verificar si el correo electrónico ya está registrado
            const existe = usuarios.find(u => u.email === emailInput);
            if (existe) {
                alert('El correo electrónico ya se encuentra registrado.');
                return;
            }

            // Crear el nuevo usuario cliente
            const nuevoUsuario = {
                nombre: nameInput,
                email: emailInput,
                password: passInput,
                region: regionInput,
                comuna: comunaInput,
                rol: "cliente" // usuario registrado por la web es cliente por defecto
            };

            // Agregar al arreglo y guardar en la clave 'usuarios_db'
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios_db', JSON.stringify(usuarios));

            alert('¡Registro realizado con éxito! Serás redirigido al Inicio de Sesión.');
            window.location.href = 'login.html';
        });
    }

    // --- LÓGICA DE INICIO DE SESIÓN CON REDIRECCIÓN SEGÚN ROL ---
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const emailInput = document.getElementById("email").value;
            const passwordInput = document.getElementById("password").value;

            // Leer los usuarios guardados en 'usuarios_db'
            const usuarios = JSON.parse(localStorage.getItem('usuarios_db')) || [];

            // Buscar coincidencia de credenciales
            const usuarioValido = usuarios.find(u => u.email === emailInput && u.password === passwordInput);

            if (usuarioValido) {
                // Guardar la sesión activa del usuario
                localStorage.setItem('usuario_logueado', JSON.stringify({
                    nombre: usuarioValido.nombre,
                    email: usuarioValido.email,
                    rol: usuarioValido.rol
                }));

                alert(`¡Bienvenido ${usuarioValido.nombre || ''}!`);

                // REDIRECCIÓN SEGÚN ROL
                if (usuarioValido.rol === 'admin') {
                    window.location.href = '../admin/admin.html'; // Redirige a la vista de Administrador
                } else {
                    window.location.href = 'index.html'; // Redirige al inicio de Clientes
                }
            } else {
                alert('Correo electrónico o contraseña incorrectos.');
            }
        });
    }
});