// Hago las validaciones para el login de pacientes
const validarLoginPacientes = document.querySelector("#validarLoginPacientes");
validarLoginPacientes.addEventListener("submit", validarPaciente);
const pacientes = JSON.parse(localStorage.getItem("pacientes"));

function validarPaciente(e) {
  e.preventDefault();

  const id = Date.now();
  const emailPaciente = document.querySelector("#emailPacientes").value;
  const passwordPaciente = document.querySelector("#passwordPacientes").value;

  const validarEmailPaciente = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const resultadoValidacionPaciente = validarEmailPaciente.test(emailPaciente);

  

  if (!resultadoValidacionPaciente)
    return Swal.fire({
      icon: "error",
      title: "Ingrese un email valido!",
      text: "Vuelva a intentarlo",
    });

  if (emailPaciente === "" || passwordPaciente === "") {
    return Swal.fire({
      icon: "error",
      title: "Debes llenar todos los campos!",
      text: "Vuelva a intentarlo",
    });
  }

  Swal.fire({
    title: "Iniciaste sesion!",
    icon: "success",
    position: "center",
    showConfirmButton: false,
    timer: 1500,
  });
}


// Ahora las validaciones para el login de medicos
const validarLoginMedicos = document.querySelector("#validarLoginMedicos");
validarLoginMedicos.addEventListener("submit", validarMedico);

function validarMedico(e) {
  e.preventDefault();

  const id = Date.now();
  const emailMedico = document.querySelector("#emailMedicos").value;
  const passwordMedico = document.querySelector("#passwordMedicos").value;

  const validarEmailMedico = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const resultadoValidacionMedico = validarEmailMedico.test(emailMedico);
  if (!resultadoValidacionMedico)
    return Swal.fire({
      icon: "error",
      title: "Ingrese un email valido!",
      text: "Vuelva a intentarlo",
    });

  if (emailMedico === "" || passwordMedico === "") {
    return Swal.fire({
      icon: "error",
      title: "Debes llenar todos los campos!",
      text: "Vuelva a intentarlo",
    });
  }

  Swal.fire({
    title: "Iniciaste sesion!",
    icon: "success",
    position: "center",
    showConfirmButton: false,
    timer: 1500,
  });
}

// Por ultimo las validaciones para el login del admin
const validaLoginAdmin = document.querySelector("#validarLoginAdmin");
validarLoginAdmin.addEventListener("submit", validarAdmin);


function validarAdmin(e) {
  e.preventDefault();

  const id = Date.now();
  const emailAdmin = document.querySelector("#emailAdmin").value;
  const passwordAdmin = document.querySelector("#passwordAdmin").value;

  const validarEmailAdmin = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const resultadoValidacionAdmin = validarEmailAdmin.test(emailAdmin);
  if (!resultadoValidacionAdmin)
    return Swal.fire({
      icon: "error",
      title: "Ingrese un email valido!",
      text: "Vuelva a intentarlo",
    });

  if (emailAdmin === "" || passwordAdmin === "") {
    return Swal.fire({
      icon: "error",
      title: "Debes llenar todos los campos!",
      text: "Vuelva a intentarlo",
    });
  }

  Swal.fire({
    title: "Iniciaste sesion!",
    icon: "success",
    position: "center",
    showConfirmButton: false,
    timer: 1500,
  });
}