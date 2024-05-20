document.addEventListener('DOMContentLoaded', () => {
    const especialidades = JSON.parse(localStorage.getItem('especialidades')) || [];
    const especialidadSelect = document.getElementById('especialidad');

    especialidades.forEach(especialidad => {
        const option = document.createElement('option');
        option.value = especialidad.codigo;
        option.textContent = especialidad.descripcion;
        especialidadSelect.appendChild(option);
    });
});

const validarRegistro = document.querySelector('#validarRegistro');
validarRegistro.addEventListener('submit', validarUsuario);

const usuariosRegistrados = JSON.parse(localStorage.getItem('registrados')) || [];

class Usuario {
    constructor(id, nombre, apellido, especialidad, email, password) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.especialidad = especialidad;
        this.email = email;
        this.password = password;
    }
}

function validarUsuario(e) {
    e.preventDefault();

    // Obtener los valores de los input
    const id = Date.now();
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const especialidad = document.querySelector('#especialidad').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;

    // Validaciones
    if (nombre === '' || apellido === '' || especialidad === '' || email === '' || password === '' || confirmPassword === '') {
        return mostrarError('Todos los campos son obligatorios');
    } else if (password.length < 6) {
        return mostrarError('La contraseña debe ser mayor a 6 caracteres');
    } else if (password !== confirmPassword) {
        return mostrarError('Las contraseñas deben ser iguales');
    }

    // Validar formato de email
    const validarEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!validarEmail.test(email)) {
        return mostrarError('El email no es válido');
    }

    // Validar contraseña
    const validarContrasena = /^(?=.*[A-Z])(?=.*\d).+/;
    if (!validarContrasena.test(password)) {
        return mostrarError('La contraseña debe contener al menos una mayúscula y un valor numérico');
    }

    // Verificar si el correo ya está registrado
    const comprobandoEmail = usuariosRegistrados.find(usuario => email === usuario.email);
    if (comprobandoEmail !== undefined) {
        return mostrarError('El correo ya existe');
    }

    // Crear el objeto Usuario
    const nuevoUsuario = new Usuario(id, nombre, apellido, especialidad, email, password);

    // Guardar en la lista y en el localStorage
    usuariosRegistrados.push(nuevoUsuario);
    localStorage.setItem('registrados', JSON.stringify(usuariosRegistrados));

    // Mostrar mensaje de éxito y redirigir
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario Registrado Correctamente',
        showConfirmButton: false,
        timer: 1500,
    }).then(() => {
        // Redirigir a otra página
        window.location.href = 'http://127.0.0.1:5501/medicos.html';
    });
}

function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensaje,
    });
}
