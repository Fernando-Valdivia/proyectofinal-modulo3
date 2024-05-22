document.addEventListener('DOMContentLoaded', function () {
  const especialidadSelect = document.getElementById('especialidad');
  const medicoSelect = document.getElementById('medico');
  const fechaSelect = document.getElementById('fecha');
  const horaInput = document.getElementById('hora');
  const motivoInput = document.getElementById('motivo');
  const turnosList = document.getElementById('turnos-list');
  const solicitarTurnoForm = document.getElementById('solicitar-turno-form');

  // Obtener datos del local storage
  let especialidades = JSON.parse(localStorage.getItem('especialidades')) || [];
  let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
  let registrados = JSON.parse(localStorage.getItem('medicos')) || [];
  let solicitudesTurnos = JSON.parse(localStorage.getItem('solicitudesTurnos')) || [];

  function cargarEspecialidades() {
      especialidadSelect.innerHTML = '';
      especialidades.forEach(especialidad => {
          const option = document.createElement('option');
          option.value = especialidad.codigo;
          option.textContent = especialidad.descripcion;
          especialidadSelect.appendChild(option);
      });
      cargarMedicos(Number(especialidadSelect.value));
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
      // No es necesario modificar esta función si no se está utilizando el elemento "turnoSelect"
  }

  especialidadSelect.addEventListener('change', function () {
      cargarMedicos(Number(especialidadSelect.value));
  });

  solicitarTurnoForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const especialidadSeleccionada = Number(especialidadSelect.value);
      const medicoSeleccionado = Number(medicoSelect.value);
      const fechaSeleccionada = fechaSelect.value;
      const horaSeleccionada = horaInput.value;
      const motivoConsulta = motivoInput.value.trim();

      if (!especialidadSeleccionada || !medicoSeleccionado || !fechaSeleccionada || !horaSeleccionada || !motivoConsulta) {
          alert('Por favor complete todos los campos.');
          return;
      }

      const solicitudTurno = {
          especialidad: especialidadSeleccionada,
          medico: medicoSeleccionado,
          fecha: fechaSeleccionada,
          hora: horaSeleccionada,
          motivo: motivoConsulta
      };

      solicitudesTurnos.push(solicitudTurno);
      localStorage.setItem('solicitudesTurnos', JSON.stringify(solicitudesTurnos));

      Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Turno solicitado con éxito.',
          showConfirmButton: false,
          timer: 1500,
      });
  });

  cargarEspecialidades();

  // No es necesario cargar los turnos si no se utiliza el elemento "turnoSelect"
});
