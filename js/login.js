const validarLoginPacientes = document.querySelector("#validarLoginPacientes");
validarLoginPacientes.addEventListener("submit", validarPaciente);

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
