document.addEventListener('DOMContentLoaded', function () {
    const pacientesBody = document.getElementById('pacientes-body');
    const medicosBody = document.getElementById('medicos-body');

    let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    let medicos = JSON.parse(localStorage.getItem('medicos')) || [];

    function guardarPacientesEnLocalStorage() {
        localStorage.setItem('pacientes',
        JSON.stringify(pacientes));
}

function guardarMedicosEnLocalStorage() {
    localStorage.setItem('medicos', JSON.stringify(medicos));
}

function renderizarTabla() {
    pacientesBody.innerHTML = '';
    medicosBody.innerHTML = '';

    pacientes.forEach((paciente, index) => {
        if (paciente.estado === 'pendiente') {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${paciente.nombre}</td>
                <td>${paciente.apellido}</td>
                <td>${paciente.email}</td>
                <td>${paciente.estado}</td>
                <td><button class="btn btn-success" onclick="autorizarPaciente(${index})">Autorizar</button></td>
            `;
            pacientesBody.appendChild(fila);
        }
    });

    medicos.forEach((medico, index) => {
        if (medico.estado === 'pendiente') {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${medico.nombre}</td>
                <td>${medico.apellido}</td>
                <td>${medico.email}</td>
                <td>${medico.estado}</td>
                <td><button class="btn btn-success" onclick="autorizarMedico(${index})">Autorizar</button></td>
            `;
            medicosBody.appendChild(fila);
        }
    });
}

window.autorizarPaciente = function (index) {
    pacientes[index].estado = 'autorizado';
    guardarPacientesEnLocalStorage();
    renderizarTabla();
};

window.autorizarMedico = function (index) {
    medicos[index].estado = 'autorizado';
    guardarMedicosEnLocalStorage();
    renderizarTabla();
};

renderizarTabla();
});
