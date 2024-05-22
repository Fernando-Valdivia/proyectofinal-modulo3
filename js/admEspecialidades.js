document.addEventListener('DOMContentLoaded', function () {
  const addModal = new bootstrap.Modal(document.getElementById('add-modal'));
  const editModal = new bootstrap.Modal(document.getElementById('edit-modal'));

  const especialidadesBody = document.getElementById('especialidades-body');
  const btnAgregarEspecialidad = document.getElementById('btn-agregar-especialidad');
  const addDescripcionInput = document.getElementById('add-descripcion');
  const editDescripcionInput = document.getElementById('edit-descripcion');
  const editCodigoInput = document.getElementById('edit-codigo');

  // Obtener especialidades del local storage
  let especialidades = JSON.parse(localStorage.getItem('especialidades')) || [];

  function guardarEspecialidadesEnLocalStorage() {
    localStorage.setItem('especialidades', JSON.stringify(especialidades));
  }

  function renderEspecialidades() {
    especialidadesBody.innerHTML = '';
    especialidades.forEach((especialidad, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${especialidad.codigo}</td>
        <td>${especialidad.descripcion}</td>
        <td class="text-center">
          <button class="btn btn-primary btn-editar" data-index="${index}" data-bs-toggle="modal" data-bs-target="#edit-modal">Editar</button>
          <button class="btn btn-danger btn-eliminar" data-index="${index}">Eliminar</button>
        </td>
      `;
      especialidadesBody.appendChild(row);
    });
  }

  function validarDescripcion(input) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    return regex.test(input);
  }

  function restringirInput(inputElement) {
    inputElement.addEventListener('input', function (event) {
      const valor = event.target.value;
      if (!validarDescripcion(valor)) {
        event.target.value = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
      }
    });
  }

  especialidadesBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-eliminar')) {
      const index = event.target.dataset.index;
      especialidades.splice(index, 1);
      guardarEspecialidadesEnLocalStorage();
      renderEspecialidades();
    } else if (event.target.classList.contains('btn-editar')) {
      const index = event.target.dataset.index;
      const especialidad = especialidades[index];
      editDescripcionInput.value = especialidad.descripcion;
      editCodigoInput.value = especialidad.codigo;
    }
  });

  document.getElementById('edit-especialidad-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const codigo = editCodigoInput.value;
    const descripcion = editDescripcionInput.value;
    if (validarDescripcion(descripcion)) {
      const especialidad = especialidades.find(e => e.codigo == codigo);
      especialidad.descripcion = descripcion;
      guardarEspecialidadesEnLocalStorage();
      editModal.hide();
      renderEspecialidades();
    } else {
      alert('Por favor, ingrese una descripción válida con solo letras y acentos.');
    }
  });

  btnAgregarEspecialidad.addEventListener('click', function () {
    const descripcion = addDescripcionInput.value;
    if (validarDescripcion(descripcion)) {
      if (descripcion.trim() !== '') {
        const codigo = especialidades.length ? Math.max(...especialidades.map(e => e.codigo)) + 1 : 1;
        especialidades.push({ codigo, descripcion });
        guardarEspecialidadesEnLocalStorage();
        addModal.hide();
        renderEspecialidades();
        addDescripcionInput.value = ''; // Limpiar el campo de entrada
      }
    } else {
      alert('Por favor, ingrese una descripción válida con solo letras y acentos.');
    }
  });

  // Aplicar restricción de input en tiempo real
  restringirInput(addDescripcionInput);
  restringirInput(editDescripcionInput);

  // Renderizar las especialidades al cargar la página
  renderEspecialidades();
});
