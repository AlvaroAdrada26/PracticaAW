const form = document.querySelector('#form-reserva');
const resetBtn = document.getElementById('reset-reserva');
const progreso = document.getElementById('progreso-form');

function setFieldState(input, isValid) {
    input.style.borderColor = isValid ? 'green' : 'red';
}

function validarNombre() {
    const input = form.nombre;
    const error = input.nextElementSibling;
    const valido = input.value.trim().length >= 3;
    setFieldState(input, valido);
    error.style.display = valido ? 'none' : 'inline';
    return valido;
}
function validarEmail() {
    const input = form.email;
    const error = input.nextElementSibling;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valido = regex.test(input.value);
    setFieldState(input, valido);
    error.style.display = valido ? 'none' : 'inline';
    return valido;
}
function validarFecha() {
    const input = form.fecha_inicio;
    const error = input.nextElementSibling;
    const hoy = new Date();
    hoy.setHours(0,0,0,0);
    const fechaSeleccionada = new Date(input.value);
    const valido = input.value && fechaSeleccionada >= hoy;
    setFieldState(input, valido);
    error.style.display = valido ? 'none' : 'inline';
    return valido;
}
function validarVehiculo() {
    const input = form.vehiculo;
    const error = input.nextElementSibling;
    const valido = input.value !== '';
    setFieldState(input, valido);
    error.style.display = valido ? 'none' : 'inline';
    return valido;
}
function validarDuracion() {
    const input = form.duracion;
    const error = input.nextElementSibling;
    const valido = input.value && Number(input.value) > 0;
    setFieldState(input, valido);
    error.style.display = valido ? 'none' : 'inline';
    return valido;
}

// Barra de progreso
function actualizarProgreso() {
    let total = 5;
    let validos = 0;
    if (validarNombre()) validos++;
    if (validarEmail()) validos++;
    if (validarFecha()) validos++;
    if (validarVehiculo()) validos++;
    if (validarDuracion()) validos++;
    const porcentaje = Math.round((validos / total) * 100);
    progreso.style.width = porcentaje + '%';
    progreso.setAttribute('aria-valuenow', porcentaje);
    progreso.textContent = porcentaje + '%';
}

// Eventos en tiempo real
form.nombre.addEventListener('input', () => { validarNombre(); actualizarProgreso(); });
form.email.addEventListener('input', () => { validarEmail(); actualizarProgreso(); });
form.fecha_inicio.addEventListener('input', () => { validarFecha(); actualizarProgreso(); });
form.vehiculo.addEventListener('change', () => { validarVehiculo(); actualizarProgreso(); });
form.duracion.addEventListener('input', () => { validarDuracion(); actualizarProgreso(); });

form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (
        validarNombre() &&
        validarEmail() &&
        validarFecha() &&
        validarVehiculo() &&
        validarDuracion()
    ) {
        alert('Formulario válido');
    }
});


resetBtn.addEventListener('click', function() {
    form.reset();
    [form.nombre, form.email, form.fecha_inicio, form.vehiculo, form.duracion].forEach(input => {
        input.style.borderColor = '';
        const error = input.nextElementSibling;
        error.style.display = 'none';
    });
    actualizarProgreso();
});


const formRegistro = document.querySelector('#form-registro');
if (formRegistro) {
    function validarEmailRegistro() {
        const input = formRegistro['reg-email'];
        const error = input.nextElementSibling;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valido = regex.test(input.value);
        input.style.borderColor = valido ? 'green' : 'red';
        error.style.display = valido ? 'none' : 'inline';
        return valido;
    }
    function validarPassword() {
        const input = formRegistro['reg-password'];
        const error = input.nextElementSibling;
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        const valido = regex.test(input.value);
        input.style.borderColor = valido ? 'green' : 'red';
        error.style.display = valido ? 'none' : 'inline';
        return valido;
    }
    formRegistro['reg-email'].addEventListener('input', validarEmailRegistro);
    formRegistro['reg-password'].addEventListener('input', validarPassword);
    formRegistro.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validarEmailRegistro() && validarPassword()) {
            alert('Registro válido');
        }
    });
}