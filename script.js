// Inicializamos la lista de cursos desde localStorage si existe
let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

// Referencias a los elementos
const listaCursos = document.getElementById('lista-cursos');
const formCurso = document.getElementById('form-curso');

// Función para mostrar los cursos
function mostrarCursos() {
  listaCursos.innerHTML = '';  // Limpiar lista

  cursos.forEach((curso, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${curso.nombre}</strong> - Instructor: ${curso.instructor} <br>
      Fecha de inicio: ${curso.fecha} - Duración: ${curso.duracion} semanas <br>
      <button onclick="mostrarDetalles(${index})">Ver más detalles</button>
      <p class="descripcion" id="descripcion-${index}" style="display: none;">${curso.descripcion}</p>
    `;
    listaCursos.appendChild(li);
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
