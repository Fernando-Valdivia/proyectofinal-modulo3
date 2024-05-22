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

  const emailExistentePaciente = pacientes.find(usuario => emailPaciente === usuario.email);
  
 if (emailExistentePaciente == undefined){
  return Swal.fire({
    icon: "error",
    title: "El correo o la contraseña es incorrecta",
    text: "Vuelva a intentarlo",
  });
}
if (emailExistentePaciente.password !== passwordPaciente){
  return Swal.fire({
    icon: "error",
    title: "El correo o la contraseña es incorrecta",
    text: "Vuelva a intentarlo",
  });

}

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

  }).then(() => {
    window.location.href = "./pages/panelClientes.html";
  });
}


