document.getElementById('actividades-form').onsubmit = function(event) {
    event.preventDefault();

    const actividad = document.getElementById('actividad').value;
    const nota = parseFloat(document.getElementById('nota').value).toFixed(2);

    if (actividad && nota !== 'NaN') {
        const tbody = document.getElementById('actividades').getElementsByTagName('tbody')[0];
        const newRow = tbody.insertRow();

        const cell1 = newRow.insertCell(0); 
        const cell2 = newRow.insertCell(1); 
        const cell3 = newRow.insertCell(2); 

        cell1.innerHTML = `
            <button class="ediboton">Editar</button>
            <button class="eliboton">Eliminar</button>`;
        cell2.textContent = actividad;
        cell3.textContent = nota;

        document.getElementById('actividad').value = '';
        document.getElementById('nota').value = '';

        agregarEventos(); 
        actualizarPromedio();
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
};

function agregarEventos() {
    const botonEditar = document.getElementsByClassName('ediboton');
    const botonEliminar = document.getElementsByClassName('eliboton');

    for (let i = 0; i < botonEditar.length; i++) {
        botonEditar[i].onclick = function() {
            const fila = this.parentElement.parentElement;
            document.getElementById('actividad').value = fila.cells[1].textContent; 
            document.getElementById('nota').value = fila.cells[2].textContent; 
            fila.remove();
            actualizarPromedio();
        };
    }

    for (let i = 0; i < botonEliminar.length; i++) {
        botonEliminar[i].onclick = function() {
            mostrarModal(this);
        };
    }
}

function mostrarModal(button) {
    const modal = document.getElementById('modal');
    const modalSi = document.getElementById('modalsi');
    const modalNo = document.getElementById('modalno');
    const fila = button.parentElement.parentElement;

    modal.style.display = 'block';

    modalSi.onclick = function() {
        fila.remove();
        modal.style.display = 'none';
        actualizarPromedio();
    };

    modalNo.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

function actualizarPromedio() {
    const tbody = document.getElementById('actividades').getElementsByTagName('tbody')[0];
    const filas = tbody.getElementsByTagName('tr');
    let total = 0;
    let contador = 0;

    for (let i = 0; i < filas.length; i++) {
        const nota = parseFloat(filas[i].cells[2].textContent); 
        if (nota === nota) {  
            total += nota;
            contador++;
        }
    }

    const promedio = contador > 0 ? Math.round((total / contador) * 100) / 100 : '0.00';
    document.getElementById('promedio').textContent = promedio;
    document.getElementById('estado').textContent = promedio >= 3.00 ? 'Aprobado' : 'No Aprobado';
}
