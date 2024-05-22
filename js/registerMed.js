document.addEventListener('DOMContentLoaded', () => {
    let especialidades = JSON.parse(localStorage.getItem('especialidades')) || [];

    // Agregar las especialidades por defecto si no existen
    if (especialidades.length === 0) {
        especialidades.push({ codigo: 1, descripcion: 'Cardiólogo' });
        especialidades.push({ codigo: 2, descripcion: 'Pediatra' });
        localStorage.setItem('especialidades', JSON.stringify(especialidades));
    }

    const especialidadSelect = document.getElementById('especialidad');

    especialidades.forEach(especialidad => {
        const option = document.createElement('option');
        option.value = especialidad.codigo;
        option.textContent = especialidad.descripcion;
        especialidadSelect.appendChild(option);
    });

    const validarRegistro = document.querySelector('#validarRegistro');
    validarRegistro.addEventListener('submit', validarUsuario);

    const usuariosRegistrados = JSON.parse(localStorage.getItem('medicos')) || [];

    class Usuario {
        constructor(id, nombre, apellido, especialidad, email, password, estado = 'pendiente') {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.especialidad = especialidad;
            this.email = email;
            this.password = password;
            this.estado = estado;
        }
    }

    function validarUsuario(e) {
        e.preventDefault();

        // Obtener los valores de los input
        const id = Date.now();
        const nombre = document.querySelector('#nombre').value.trim();
        const apellido = document.querySelector('#apellido').value.trim();
        const especialidad = document.querySelector('#especialidad').value;
        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#password').value.trim();
        const confirmPassword = document.querySelector('#confirmPassword').value.trim();

        // Validaciones
        if (!nombre || !apellido || !especialidad || !email || !password || !confirmPassword) {
            return mostrarError('Todos los campos son obligatorios');
        } 
        if (password.length < 6) {
            return mostrarError('La contraseña debe ser mayor a 6 caracteres');
        }
        if (password !== confirmPassword) {
            return mostrarError('Las contraseñas deben ser iguales');
        }

        // Validar formato de email
        const validarEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!validarEmail.test(email)) {
            return mostrarError('El email no es válido');
        }

        // Verificar si el correo ya está registrado
        const comprobandoEmail = usuariosRegistrados.find(usuario => usuario.email === email);
        if (comprobandoEmail) {
            return mostrarError('El correo ya existe');
        }

        // Crear el objeto Usuario con estado "pendiente"
        const nuevoUsuario = new Usuario(id, nombre, apellido, especialidad, email, password);

        // Guardar en el localStorage
        usuariosRegistrados.push(nuevoUsuario);
        localStorage.setItem('medicos', JSON.stringify(usuariosRegistrados));

        // Mostrar mensaje de éxito y redirigir
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario Registrado Correctamente',
            showConfirmButton: false,
            timer: 1500,
        }).then(() => {
            // Redirigir a otra página
            window.location.href = 'medicos.html';
        });
    }

    function mostrarError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje,
        });
    }
});
