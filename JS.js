document.getElementById('actividades-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const actividad = document.getElementById('actividad').value;
    const nota = parseFloat(document.getElementById('nota').value).toFixed(2);

    if (actividad && !isNaN(nota)) {
        const tbody = document.getElementById('actividades-table').getElementsByTagName('tbody')[0];
        const newRow = tbody.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);

        cell1.textContent = actividad;
        cell2.textContent = nota;
        cell3.innerHTML = `
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Eliminar</button>
        `;

        document.getElementById('actividad').value = '';
        document.getElementById('nota').value = '';

        addEventListeners();
        updateAverage();
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
});

function addEventListeners() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.parentElement.parentElement;
            const actividad = row.cells[0].textContent;
            const nota = row.cells[1].textContent;

            document.getElementById('actividad').value = actividad;
            document.getElementById('nota').value = nota;

            row.remove();
            updateAverage();
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            showModal(this);
        });
    });
}

function showModal(button) {
    const modal = document.getElementById('modal');
    const modalSi = document.getElementById('modalsi');
    const modalNo = document.getElementById('modalno');
    const row = button.parentElement.parentElement;

    modal.style.display = 'block';

    modalSi.onclick = function() {
        row.remove();
        modal.style.display = 'none';
        updateAverage();
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

function updateAverage() {
    const tbody = document.getElementById('actividades-table').getElementsByTagName('tbody')[0];
    const rows = tbody.getElementsByTagName('tr');
    let total = 0;
    let count = 0;

    for (const row of rows) {
        const nota = parseFloat(row.cells[1].textContent);
        if (!isNaN(nota)) {
            total += nota;
            count++;
        }
    }

    const promedio = count > 0 ? (total / count).toFixed(2) : '0.00';
    document.getElementById('promedio').textContent = promedio;
    document.getElementById('estado').textContent = promedio >= 3.00 ? 'Aprobado' : 'No Aprobado';
}
