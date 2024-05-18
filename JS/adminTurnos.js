document.addEventListener('DOMContentLoaded', function () {
    const addModal = new bootstrap.Modal(document.getElementById('add-modal'));
    const editModal = new bootstrap.Modal(document.getElementById('edit-modal'));
  
    const turnosBody = document.getElementById('turnos-body');
    const btnAgregarTurno = document.getElementById('btn-agregar-turno');
    const addDescripcionInput = document.getElementById('add-descripcion');
    const editDescripcionInput = document.getElementById('edit-descripcion');
    const editCodigoInput = document.getElementById('edit-codigo');
  
    // Obtener turnos del local storage
    let turnos = JSON.parse(localStorage.getItem('turnos')) || [];
  
    function guardarTurnosEnLocalStorage() {
      localStorage.setItem('turnos', JSON.stringify(turnos));
    }
  
    function renderTurnos() {
      turnosBody.innerHTML = '';
      turnos.forEach((turno, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${turno.codigo}</td>
          <td>${turno.descripcion}</td>
          <td class="text-center">
            <button class="btn btn-primary btn-editar" data-index="${index}" data-bs-toggle="modal" data-bs-target="#edit-modal">Editar</button>
            <button class="btn btn-danger btn-eliminar" data-index="${index}">Eliminar</button>
          </td>
        `;
        turnosBody.appendChild(row);
      });
    }
  
    function validarDescripcion(input) {
      const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s:]*$/;
      return regex.test(input);
    }
  
    function restringirInput(inputElement) {
      inputElement.addEventListener('input', function (event) {
        const valor = event.target.value;
        if (!validarDescripcion(valor)) {
          event.target.value = valor.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s:]/g, '');
        }
      });
    }
  
    turnosBody.addEventListener('click', function (event) {
      if (event.target.classList.contains('btn-eliminar')) {
        const index = event.target.dataset.index;
        turnos.splice(index, 1);
        guardarTurnosEnLocalStorage();
        renderTurnos();
      } else if (event.target.classList.contains('btn-editar')) {
        const index = event.target.dataset.index;
        const turno = turnos[index];
        editDescripcionInput.value = turno.descripcion;
        editCodigoInput.value = turno.codigo;
      }
    });
  
    document.getElementById('edit-turno-form').addEventListener('submit', function (event) {
      event.preventDefault();
      const codigo = editCodigoInput.value;
      const descripcion = editDescripcionInput.value;
      if (validarDescripcion(descripcion)) {
        const turno = turnos.find(e => e.codigo == codigo);
        turno.descripcion = descripcion;
        guardarTurnosEnLocalStorage();
        editModal.hide();
        renderTurnos();
      } else {
        alert('Por favor, ingrese una descripción válida con solo letras y acentos.');
      }
    });
  
    btnAgregarTurno.addEventListener('click', function () {
      const descripcion = addDescripcionInput.value;
      if (validarDescripcion(descripcion)) {
        if (descripcion.trim() !== '') {
          const codigo = turnos.length ? Math.max(...turnos.map(e => e.codigo)) + 1 : 1;
          turnos.push({ codigo, descripcion });
          guardarTurnosEnLocalStorage();
          addModal.hide();
          renderTurnos();
          addDescripcionInput.value = ''; // Limpiar el campo de entrada
        }
      } else {
        alert('Por favor, ingrese una descripción válida con solo letras y acentos.');
      }
    });
  
    // Aplicar restricción de input en tiempo real
    restringirInput(addDescripcionInput);
    restringirInput(editDescripcionInput);
  
    // Renderizar los turnos al cargar la página
    renderTurnos();
  });
  