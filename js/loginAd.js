// Hago las validaciones para el login de admin

const validaLoginAdmin = document.querySelector("#validarLoginAdmin");
validarLoginAdmin.addEventListener("submit", validarAdmin);
const administradores = JSON.parse(localStorage.getItem("administradores"));

function validarAdmin(e) {
  e.preventDefault();

  const id = Date.now();
  const emailAdmin = document.querySelector("#emailAdmin").value;
  const passwordAdmin = document.querySelector("#passwordAdmin").value;

  const validarEmailAdmin = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const resultadoValidacionAdmin = validarEmailAdmin.test(emailAdmin);

  const emailExistenteAdministrador = administradores.find(usuario => emailAdmin === usuario.email);

  if (emailExistenteAdministrador === undefined){
    return Swal.fire({
      icon: "error",
      title: "El correo o la contraseña es incorrecta",
      text: "Vuelva a intentarlo",
    });
  }
  if (emailExistenteAdministrador.password !== passwordAdmin){
    return Swal.fire({
      icon: "error",
      title: "El correo o la contraseña es incorrecta",
      text: "Vuelva a intentarlo",
    });
  
  }


  const dominio = emailAdmin.split('@')[1];
  
  

  if(dominio !== "osdda.com"){
    return Swal.fire({
      icon: "error",
      title: "El correo o la contraseña es incorrecta",
      text: "Vuelva a intentarlo",
    });

  }

  if (!resultadoValidacionAdmin){
    return Swal.fire({
      icon: "error",
      title: "Ingrese un email valido!",
      text: "Vuelva a intentarlo",
    });
  }
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
  }).then(() => {
    window.location.href = "./pages/panelAdministracion.html";
  });;
}