const validarRegistro = document.querySelector('#validarRegistro');

validarRegistro.addEventListener('submit', validarPaciente);

const pacientesRegistrados = JSON.parse(localStorage.getItem('pacientes')) || [];

class Paciente {
	constructor(id, nombre, apellido, dni, genero, email, password) {
		this.id = id;
		this.nombre = nombre;
		this.apellido = apellido;
		this.dni = dni;
        this.genero = genero;
		this.email = email;
		this.password = password;
	}
}

function validarPaciente(e) {
	e.preventDefault();

	// Obtener los valores de los input
	const id = Date.now();
	const nombre = document.querySelector('#nombre').value;
	const apellido = document.querySelector('#apellido').value;
    const dni = document.querySelector('#dni').value;
    const genero = document.querySelector('#genero').value;
	const email = document.querySelector('#email').value;
	const password = document.querySelector('#password').value;
	const confirmPassword = document.querySelector('#confirmPassword').value;

	// Validaciones
	if (nombre === '' || apellido === '' || dni === '' || genero === '' || email === '' || password === '' || confirmPassword === '') {
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
	const comprobandoEmail = pacientesRegistrados.find(paciente => email === paciente.email);
	if (comprobandoEmail !== undefined) {
		return mostrarError('El correo ya existe');
	}

	// Crear el objeto Paciente
	const nuevoPaciente = new Paciente(id, nombre, apellido, dni, genero, email, password);

	// Guardar en la lista y en el localStorage
	pacientesRegistrados.push(nuevoPaciente);
	localStorage.setItem('pacientes', JSON.stringify(pacientesRegistrados));

	// Mostrar mensaje de éxito y redirigir
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'Paciente Registrado Correctamente',
		showConfirmButton: false,
		timer: 1500,
	}).then(() => {
		// Redirigir a otra página
		window.location.href = 'http://127.0.0.1:5501/pacientes.html';
	});
}

function mostrarError(mensaje) {
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: mensaje,
	});
}
