// Inicializamos la lista de cursos desde localStorage si existe
let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

// Referencias a los elementos
const listaCursos = document.getElementById('lista-cursos');
const formCurso = document.getElementById('form-curso');

// Función para mostrar los cursos en recuadros
function mostrarCursos() {
  listaCursos.innerHTML = '';  // Limpiar lista

  cursos.forEach((curso, index) => {
    const div = document.createElement('div');
    div.classList.add('course-card');
    div.innerHTML = `
      <h3>${curso.nombre}</h3>
      <p><strong>Instructor:</strong> ${curso.instructor}</p>
      <p><strong>Fecha de inicio:</strong> ${curso.fecha}</p>
      <p><strong>Duración:</strong> ${curso.duracion} semanas</p>
      <button onclick="mostrarDetalles(${index})">Ver más detalles</button>
      <button onclick="eliminarCurso(${index})">Eliminar Curso</button>
      <p class="descripcion" id="descripcion-${index}" style="display: none;">${curso.descripcion}</p>
    `;
    listaCursos.appendChild(div);
  });
}

// Función para mostrar más detalles del curso
function mostrarDetalles(index) {
  const descripcion = document.getElementById(`descripcion-${index}`);
  if (descripcion.style.display === 'none') {
    descripcion.style.display = 'block';
  } else {
    descripcion.style.display = 'none';
  }
}

// Función para eliminar un curso
function eliminarCurso(index) {
  cursos.splice(index, 1);  // Eliminar curso de la lista
  localStorage.setItem('cursos', JSON.stringify(cursos));  // Actualizar localStorage
  mostrarCursos();  // Actualizar lista visual
}

// Evento para agregar un curso
formCurso.addEventListener('submit', function (event) {
  event.preventDefault();

  const nuevoCurso = {
    nombre: document.getElementById('nombre').value,
    instructor: document.getElementById('instructor').value,
    fecha: document.getElementById('fecha').value,
    duracion: document.getElementById('duracion').value,
    descripcion: document.getElementById('descripcion').value
  };

  cursos.push(nuevoCurso);
  localStorage.setItem('cursos', JSON.stringify(cursos));

  mostrarCursos();  // Actualizar lista de cursos

  // Limpiar el formulario
  formCurso.reset();
});

// Cargar los cursos al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCursos);
