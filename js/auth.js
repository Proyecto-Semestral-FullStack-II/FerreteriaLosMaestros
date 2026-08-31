//====== LOGICA DE COMBO BOX DE COMUNA DE REGISTER.HTML======
// Objeto que mapea cada región con sus respectivas comunas
const comunasPorRegion = {
    "arica-parinacota": ["Arica", "Camarones", "General Lagos", "Putre"],
    "tarapaca": ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"],
    "antofagasta": ["Antofagasta", "Calama", "María Elena", "Ollagüe", "San Pedro de Atacama", "Sierra Gorda", "Taltal", "Tocopilla", "Mejillones"],
    "atacama": ["Chañaral", "Diego de Almagro", "Caldera", "Copiapó", "Tierra Amarilla", "Alto del Carmen", "Freirina", "Huasco", "Vallenar"],
    "coquimbo": ["Canela", "Illapel", "Los Vilos", "Salamanca", "Andacollo", "Coquimbo", "La Higuera", "La Serena", "Paihuano", "Vicuña", "Combarbalá", "Monte Patria", "Ovalle", "Punitaqui", "Río Hurtado"],
    "valparaiso": ["Isla de Pascua", "Calle Larga", "Los Andes", "Rinconada", "San Esteban", "Limache", "Olmué", "Quilpué", "Villa Alemana", "Cabildo", "La Ligua", "Papudo", "Petorca", "Zapallar", "Hijuelas", "La Calera", "Nogales", "Quillota", "San Antonio", "Algarrobo", "El Quisco", "El Tabo", "Cartagena", "Santo Domingo", "Catemu", "Llay-Llay", "Panquehue", "Putaendo", "San Felipe", "Santa María", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Valparaíso", "Viña del Mar"],
    "metropolitana": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "ohiggins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchigüe", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
    "maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "nuble": ["Chillán", "Bulnes", "Chillán Viejo", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Quirihue", "Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Ránquil", "Trehuaco", "San Carlos", "Coihueco", "San Fabián", "San Nicolás"],
    "biobio": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualpén", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
    "araucania": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    "los-rios": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
    "los-lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
    "aysen": ["Coyhaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
    "magallanes": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
};

document.addEventListener('DOMContentLoaded', function () {

    // --- LÓGICA DE REGIONALIZACIÓN (Si existen los select) ---
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

    // --- LÓGICA DE REGISTRO (register.html) ---
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

            const email = document.getElementById("reg-email").value;
            const pass = password.value;
            const region = selectRegion ? selectRegion.value : '';
            const comuna = selectComuna ? selectComuna.value : '';

            // Obtener lista previa o inicializar
            let usuarios = JSON.parse(localStorage.getItem('usuarios_db')) || [];

            // Validar si el correo ya existe
            const existe = usuarios.find(u => u.email === email);
            if (existe) {
                alert('El correo electrónico ya se encuentra registrado.');
                return;
            }

            // Crear objeto de usuario
            const nuevoUsuario = {
                email: email,
                password: pass,
                region: region,
                comuna: comuna
            };

            // Guardar usuario en localStorage
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios_db', JSON.stringify(usuarios));

            alert('¡Registro realizado con éxito! Serás redirigido al Inicio de Sesión.');
            window.location.href = 'login.html';
        });
    }

    // --- LÓGICA DE LOGIN (login.html) ---
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const emailInput = document.getElementById("email").value;
            const passwordInput = document.getElementById("password").value;

            // Obtener usuarios guardados en localStorage
            const usuarios = JSON.parse(localStorage.getItem('usuarios_db')) || [];

            // Verificar credenciales
            const usuarioValido = usuarios.find(u => u.email === emailInput && u.password === passwordInput);

            if (usuarioValido) {
                // Guardar la sesión activa
                localStorage.setItem('usuario_logueado', JSON.stringify({ email: usuarioValido.email }));
                alert('¡Inicio de sesión correcto!');
                window.location.href = 'index.html'; // Redirige al menú principal
            } else {
                alert('Correo electrónico o contraseña incorrectos.');
            }
        });
    }
});
//TODO Arreglar logica de login y register