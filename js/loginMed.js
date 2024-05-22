// Hago las validaciones para el login de medicos

const validarLoginMedicos = document.querySelector("#validarLoginMedicos");
validarLoginMedicos.addEventListener("submit", validarMedico);
const medicos = JSON.parse(localStorage.getItem("medicos"));
function validarMedico(e) {
  e.preventDefault();

  const id = Date.now();
  const emailMedico = document.querySelector("#emailMedicos").value;
  const passwordMedico = document.querySelector("#passwordMedicos").value;

  const validarEmailMedico = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const resultadoValidacionMedico = validarEmailMedico.test(emailMedico);

  const emailExistenteMedico = pacientes.find(usuario => emailMedico === usuario.email);

  if (emailExistenteMedico == undefined){
    return Swal.fire({
      icon: "error",
      title: "El correo o la contraseña es incorrecta",
      text: "Vuelva a intentarlo",
    });
  }   

  if (emailExistenteMedico.password !== passwordMedico){
    return Swal.fire({
      icon: "error",
      title: "El correo o la contraseña es incorrecta",
      text: "Vuelva a intentarlo",
    });
  }

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
  }).then(() => {
    window.location.href = "http://127.0.0.1:5501/pages/dashboard_med.html";
  });;
}