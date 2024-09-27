document.addEventListener('DOMContentLoaded', () => {
    const listaCursos = document.getElementById('lista-cursos');
    const formularioCurso = document.getElementById('formulario-curso');

    // Cargar cursos guardados en localStorage
    let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

    // Función para renderizar la lista de cursos
    const renderizarCursos = () => {
        listaCursos.innerHTML = ''; // Limpiar la lista
        cursos.forEach((curso, index) => {
            const cursoDiv = document.createElement('div');
            cursoDiv.classList.add('curso');
            cursoDiv.innerHTML = `
                <h3>${curso.nombre}</h3>
                <p>Instructor: ${curso.instructor}</p>
                <p>Fecha de inicio: ${curso.fecha}</p>
                <p>Duración: ${curso.duracion} semanas</p>
                <button onclick="mostrarDetalles(${index})">Ver más detalles</button>
                <div class="descripcion" id="descripcion-${index}" style="display:none;">
                    <p>${curso.descripcion}</p>
                </div>
            `;
            listaCursos.appendChild(cursoDiv);
        });
    };

    // Mostrar detalles del curso
    window.mostrarDetalles = (index) => {
        const descripcion = document.getElementById(`descripcion-${index}`);
        descripcion.style.display = descripcion.style.display === 'none' ? 'block' : 'none';
    };

    // Agregar nuevo curso
    formularioCurso.addEventListener('submit', (e) => {
        e.preventDefault();

        const nuevoCurso = {
            nombre: document.getElementById('nombre').value,
            instructor: document.getElementById('instructor').value,
            fecha: document.getElementById('fecha').value,
            duracion: document.getElementById('duracion').value,
            descripcion: document.getElementById('descripcion').value,
        };

        cursos.push(nuevoCurso);
        localStorage.setItem('cursos', JSON.stringify(cursos));
        renderizarCursos();
        formularioCurso.reset();
    });

    // Renderizar los cursos al cargar la página
    renderizarCursos();   
});
