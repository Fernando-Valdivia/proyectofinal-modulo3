document.addEventListener('DOMContentLoaded', function () {
  const validarLoginMedicos = document.querySelector("#validarLoginMedicos");
  validarLoginMedicos.addEventListener("submit", validarMedico);

  // Verificar si existen datos de médicos en el almacenamiento local
  let medicos = JSON.parse(localStorage.getItem("medicos"));
  if (!medicos) {
    // Si no hay datos de médicos, establecer un valor predeterminado
    medicos = [
      { id: 1, email: "medico@hospital.com", password: "medico123" }
      // Puedes agregar más médicos aquí si es necesario
    ];
    localStorage.setItem("medicos", JSON.stringify(medicos));
  }

  function validarMedico(e) {
    e.preventDefault();
  
    const emailMedico = document.querySelector("#emailMedicos").value;
    const passwordMedico = document.querySelector("#passwordMedicos").value;
  
    const emailExistenteMedico = medicos.find(usuario => emailMedico === usuario.email);
  
    if (emailExistenteMedico === undefined){
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
    }).then(() => {
      window.location.href = "./pages/medicos.html";
    });
  }
});
