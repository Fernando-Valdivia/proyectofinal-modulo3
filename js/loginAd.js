// Hago las validaciones para el login de admin

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
  }).then(() => {
    window.location.href = "http://127.0.0.1:5501/pages/dashboard_admin.html";
  });;
}