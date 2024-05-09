const validarRegistro = document.querySelector('#validarRegistro');

validarRegistro.addEventListener('submit', validarUsuario);

const usuarioRegistrados = JSON.parse(localStorage.getItem('registrados')) || [];

class Usuario {
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

function validarUsuario(e) {
	e.preventDefault();

	//primer paso obtener los valores de los input
	const id = Date.now();
	const nombre = document.querySelector('#nombre').value;
	const apellido = document.querySelector('#apellido').value;
    const dni = document.querySelector('#dni').value;
    const genero = document.querySelector('#genero').value;
	const email = document.querySelector('#email').value;
	const password = document.querySelector('#password').value;
	const confirmPassword = document.querySelector('#confirmPassword').value;

	

	//Validaciones
	//validar que los campos no esten vacios, que la contraseña sea mayor a cierta cantidad de caracteres y que sean iguales la contraseña y confirmar contraseña
	
	if (nombre === '' || apellido === '' || dni === '' || genero === '' || email === '' || password === '' || confirmPassword === '') {
		return console.log('todos los campos son obligatorios');
	} else if (password.length < 6) {
		return console.log('la contraseña debe ser mayor a 6 caracteres');
	} else if (password !== confirmPassword) {
		return console.log('Las contraseñas deben ser iguales');
	}

	//validar si existe el email
	const validarEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	const resultadoValdacion = validarEmail.test(email);

	//validar que el email sea valido
	if (!resultadoValdacion) {
		return mostrarError('El email no es valido');
	} else if (nombre === '') {
		return mostrarError('El nombre es obligatorio');
	}

	//validar si el correo no existe en la lista
	const comprobandoEmail = usuarioRegistrados.find(function (usuario) {
		return email === usuario.email;
	});

	//verificamos si el correo ya existe
	if (comprobandoEmail !== undefined) {
		return mostrarError('El correo ya existe');
	}

	//creamos el objeto
	const nuevoUsuario = new Usuario(id, nombre, apellido, dni, genero, email, password);
	//lo guardamos en la lista
	usuarioRegistrados.push(nuevoUsuario);

	//lo guardamos en el localStorage
	localStorage.setItem('registrados', JSON.stringify(usuarioRegistrados));

	Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'Usuario Registrado Correctamente',
		showConfirmButton: false,
		timer: 1500,
	});
}

function mostrarError(mensaje) {
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: mensaje,
	});
}