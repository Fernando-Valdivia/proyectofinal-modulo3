document.addEventListener('DOMContentLoaded', function () {
  const validarLoginPacientes = document.querySelector("#validarLoginPacientes");
  validarLoginPacientes.addEventListener("submit", validarPaciente);

  // Verificar si existen datos de pacientes en el almacenamiento local
  let pacientes = JSON.parse(localStorage.getItem("pacientes"));
  if (!pacientes) {
    // Si no hay datos de pacientes, establecer un valor predeterminado
    pacientes = [
      { id: 1, email: "paciente@hospital.com", password: "paciente123" }
      // Puedes agregar más pacientes aquí si es necesario
    ];
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }

  function validarPaciente(e) {
    e.preventDefault();
  
    const emailPaciente = document.querySelector("#emailPacientes").value;
    const passwordPaciente = document.querySelector("#passwordPacientes").value;
  
    const emailExistentePaciente = pacientes.find(usuario => emailPaciente === usuario.email);
    
    if (emailExistentePaciente === undefined){
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
    }).then(() => {
      window.location.href = "./pages/panelClientes.html";
    });
  }
});
