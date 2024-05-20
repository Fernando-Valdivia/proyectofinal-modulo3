document.addEventListener('DOMContentLoaded', function () {
  const especialidadSelect = document.getElementById('especialidad');
  const medicoSelect = document.getElementById('medico');
  const turnoSelect = document.getElementById('turno');
  const solicitarTurnoForm = document.getElementById('solicitar-turno-form');
  const fechaInput = document.getElementById('fecha');
  const motivoInput = document.getElementById('motivo');

  // Obtener datos del local storage
  let especialidades = JSON.parse(localStorage.getItem('especialidades')) || [];
  let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
  let registrados = JSON.parse(localStorage.getItem('registrados')) || [];

  function cargarEspecialidades() {
    especialidadSelect.innerHTML = '';
    especialidades.forEach(especialidad => {
      const option = document.createElement('option');
      option.value = especialidad.codigo;
      option.textContent = especialidad.descripcion;
      especialidadSelect.appendChild(option);
    });
    const especialidadSeleccionada = Number(especialidadSelect.value);
    cargarMedicos(especialidadSeleccionada);
  }

  function cargarMedicos(especialidadCodigo) {
    medicoSelect.innerHTML = '';
    registrados.forEach(medico => {
      if (Number(medico.especialidad) === Number(especialidadCodigo)) {
        const option = document.createElement('option');
        option.value = medico.id;
        option.textContent = `${medico.nombre} ${medico.apellido}`;
        medicoSelect.appendChild(option);
      }
    });
  }

  function cargarTurnos() {
    turnoSelect.innerHTML = '';
    turnos.forEach(turno => {
      const option = document.createElement('option');
      option.value = turno.codigo;
      option.textContent = turno.descripcion;
      turnoSelect.appendChild(option);
    });
  }

  especialidadSelect.addEventListener('change', function () {
    const especialidadSeleccionada = Number(especialidadSelect.value);
    cargarMedicos(especialidadSeleccionada);
  });

  solicitarTurnoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const especialidadSeleccionada = Number(especialidadSelect.value);
    const medicoSeleccionado = medicoSelect.value;
    const fechaSeleccionada = fechaInput.value;
    const turnoSeleccionado = turnoSelect.value;
    const motivoConsulta = motivoInput.value.trim();

    if (!especialidadSeleccionada || !medicoSeleccionado || !fechaSeleccionada || !turnoSeleccionado || !motivoConsulta) {
      alert('Por favor complete todos los campos.');
      return;
    }

    const solicitudTurno = {
      especialidad: especialidadSeleccionada,
      medico: medicoSeleccionado,
      fecha: fechaSeleccionada,
      turno: turnoSeleccionado,
      motivo: motivoConsulta
    };

    let solicitudesTurnos = JSON.parse(localStorage.getItem('solicitudesTurnos')) || [];
    solicitudesTurnos.push(solicitudTurno);
    localStorage.setItem('solicitudesTurnos', JSON.stringify(solicitudesTurnos));

    /*alert('Turno solicitado con éxito.');*/
    // Mostrar mensaje de éxito y redirigir
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Turno solicitado con éxito.',
      showConfirmButton: false,
      timer: 1500,
    });
    solicitarTurnoForm.reset();
  });

  cargarEspecialidades();
  cargarTurnos();

  // Configurar el datepicker
  $(document).ready(function(){
    $('#fecha').datepicker({
      format: 'dd-mm-yyyy',
      language: 'es',
      autoclose: true,
      todayHighlight: true,
      beforeShowDay: function(date) {
        var day = date.getDay();
        return [(day !== 0 && day !== 6), ''];
      }
    }).datepicker('setDate', new Date());
  });

  function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensaje,
    });
  };

});
