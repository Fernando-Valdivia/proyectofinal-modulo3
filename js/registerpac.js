document.addEventListener('DOMContentLoaded', () => {
	const validarRegistro = document.querySelector('#validarRegistro');
	const pacientesRegistrados = JSON.parse(localStorage.getItem('pacientes')) || [];
	const administradoresRegistrados = JSON.parse(localStorage.getItem('administradores')) || [];

	class Usuario {
		constructor(id, nombre, apellido, dni, genero, email, password, estado = null) {
			this.id = id;
			this.nombre = nombre;
			this.apellido = apellido;
			this.dni = dni;
			this.genero = genero;
			this.email = email;
			this.password = password;
			this.estado = estado; // Nuevo atributo opcional
		}
	}

	validarRegistro.addEventListener('submit', validarUsuario);

	function validarUsuario(e) {
		e.preventDefault();

		const inputs = {
			nombre: document.querySelector('#nombre').value.trim(),
			apellido: document.querySelector('#apellido').value.trim(),
			dni: document.querySelector('#dni').value.trim(),
			genero: document.querySelector('#genero').value.trim(),
			email: document.querySelector('#email').value.trim(),
			password: document.querySelector('#password').value.trim(),
			confirmPassword: document.querySelector('#confirmPassword').value.trim(),
		};

		const { nombre, apellido, dni, genero, email, password, confirmPassword } = inputs;

		if (!nombre || !apellido || !dni || !genero || !email || !password || !confirmPassword) {
			return mostrarError('Todos los campos son obligatorios');
		}
		if (password.length < 6) {
			return mostrarError('La contraseña debe ser mayor a 6 caracteres');
		}
		if (password !== confirmPassword) {
			return mostrarError('Las contraseñas deben ser iguales');
		}

		const validarEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
		if (!validarEmail.test(email)) {
			return mostrarError('El email no es válido');
		}

		const validarContrasena = /^(?=.[A-Z])(?=.\d).+/;
		if (!validarContrasena.test(password)) {
			return mostrarError('La contraseña debe contener al menos una mayúscula y un valor numérico');
		}

		const isAdmin = email.endsWith('@osdda.com');
		const usuariosRegistrados = isAdmin ? administradoresRegistrados : pacientesRegistrados;
		const usuarioExistente = usuariosRegistrados.find(usuario => email === usuario.email);

		if (usuarioExistente) {
			return mostrarError('El correo ya existe');
		}

		const estadoInicial = isAdmin ? null : 'Pendiente'; // Estado inicial solo para pacientes
		const nuevoUsuario = new Usuario(Date.now(), nombre, apellido, dni, genero, email, password, estadoInicial);

		usuariosRegistrados.push(nuevoUsuario);
		const storageKey = isAdmin ? 'administradores' : 'pacientes';
		localStorage.setItem(storageKey, JSON.stringify(usuariosRegistrados));

		const redirectURL = isAdmin ? 'http://127.0.0.1:5501/admin.html' : 'http://127.0.0.1:5501/pacientes.html';

		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Usuario Registrado Correctamente',
			showConfirmButton: false,
			timer: 1500,
		}).then(() => {
			window.location.href = redirectURL;
		});
	}

	function mostrarError(mensaje) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: mensaje,
		});
	}
})