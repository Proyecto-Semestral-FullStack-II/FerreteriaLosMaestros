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

// Referencias a los elementos del DOM
const regionSelect = document.getElementById("region");
const comunaSelect = document.getElementById("comuna");

// Escuchar los cambios en el select de regiones de forma limpia
regionSelect.addEventListener("change", function() {
    const regionSeleccionada = regionSelect.value;

    // Resetear el select de comunas con el mensaje inicial básico
    comunaSelect.innerHTML = '<option value="" disabled selected>Seleccione una comuna...</option>';

    if (regionSeleccionada && comunasPorRegion[regionSeleccionada]) {
        // Habilitar interacciones
        comunaSelect.disabled = false;

        // Poblar las nuevas opciones
        comunasPorRegion[regionSeleccionada].forEach(comuna => {
            const option = document.createElement("option");
            option.value = comuna.toLowerCase().replace(/\s+/g, '-');
            option.textContent = comuna;
            comunaSelect.appendChild(option);
        });
    } else {
        // Bloquear si no hay selección de región válida
        comunaSelect.disabled = true;
    }
});

//====== LOGICA VALIDACION DE CONTRASEÑA EN REGISTER.HTML======

//referencias a los elementos del formulario
const password = document.getElementById("password");
const confirmPassword = document.getElementById("password-2");
const errorMessage = document.getElementById("error-message");
const form = document.querySelector(".login-form");

// Función que compara ambas contraseñas
function validarContrasenas() {
    // Si la confirmación está vacía, ocultar mensaje
    if (confirmPassword.value === '') {
        errorMessage.style.display = 'none';
        confirmPassword.classList.remove('input-error');
        return true;
    }

    // Comparar valores
    if (password.value !== confirmPassword.value) {
        errorMessage.style.display = 'block'; // Muestra el mensaje
        confirmPassword.classList.add('input-error'); // Borde rojo
        return false;
    } else {
        errorMessage.style.display = 'none'; // Oculta el mensaje
        confirmPassword.classList.remove('input-error');
        return true;
    }
}

// Validar en tiempo real mientras el usuario escribe
password.addEventListener('input', validarContrasenas);
confirmPassword.addEventListener('input', validarContrasenas);

// Evitar que el formulario se envíe si no coinciden
form.addEventListener('submit', function(event) {
    if (password.value !== confirmPassword.value) {
        event.preventDefault(); // Detiene el envío del formulario
        alert('Por favor, asegúrate de que las contraseñas coincidan.');
    }
});



