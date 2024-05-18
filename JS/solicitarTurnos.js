document.addEventListener('DOMContentLoaded', function () {
  const especialidadSelect = document.getElementById('especialidad');
  const turnoSelect = document.getElementById('turno');
  const solicitarTurnoForm = document.getElementById('solicitar-turno-form');
  const calendarioInput = document.getElementById('calendario');
  const motivoInput = document.getElementById('motivo');

  // Obtener especialidades y turnos del local storage
  let especialidades = JSON.parse(localStorage.getItem('especialidades')) || [];
  let turnos = JSON.parse(localStorage.getItem('turnos')) || [];

  function cargarEspecialidades() {
    especialidadSelect.innerHTML = '';
    especialidades.forEach(especialidad => {
      const option = document.createElement('option');
      option.value = especialidad.codigo;
      option.textContent = especialidad.descripcion;
      especialidadSelect.appendChild(option);
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

  solicitarTurnoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const especialidadSeleccionada = especialidadSelect.value;
    const fechaSeleccionada = calendarioInput.value;
    const turnoSeleccionado = turnoSelect.value;
    const motivoConsulta = motivoInput.value.trim();

    if (!especialidadSeleccionada || !fechaSeleccionada || !turnoSeleccionado || !motivoConsulta) {
      alert('Por favor complete todos los campos.');
      return;
    }

    // Crear un objeto turno para guardar la solicitud (puedes ajustarlo según tu estructura de datos)
    const solicitudTurno = {
      especialidad: especialidadSeleccionada,
      fecha: fechaSeleccionada,
      turno: turnoSeleccionado,
      motivo: motivoConsulta
    };

    // Guardar la solicitud en local storage (puedes ajustar la lógica según tus necesidades)
    let solicitudesTurnos = JSON.parse(localStorage.getItem('solicitudesTurnos')) || [];
    solicitudesTurnos.push(solicitudTurno);
    localStorage.setItem('solicitudesTurnos', JSON.stringify(solicitudesTurnos));

    alert('Turno solicitado con éxito.');
    solicitarTurnoForm.reset();
  });

  cargarEspecialidades();
  cargarTurnos();
});
