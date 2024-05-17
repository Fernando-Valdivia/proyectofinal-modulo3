document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('solicitud-turno-form');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Obtener valores del formulario
      const especialidad = document.getElementById('especialidad').value;
      const horario = document.getElementById('horario').value;
      const motivo = document.getElementById('motivo').value;
  
      // Validar campos
      if (especialidad.trim() === '' || horario.trim() === '' || motivo.trim() === '') {
        alert('Por favor complete todos los campos.');
        return;
      }
  
      // Enviar solicitud al médico (simulado)
      const solicitud = {
        especialidad,
        horario,
        motivo
      };
  
      console.log('Solicitud de turno enviada:', solicitud);
      
      // Aquí podrías enviar la solicitud al médico utilizando AJAX o Fetch
      // y manejar la respuesta para mostrar un mensaje al usuario.
      // Por simplicidad, solo se muestra la solicitud en la consola en este ejemplo.
    });
  });
  