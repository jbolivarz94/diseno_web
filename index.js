var form = document.getElementById("formulario");
var tabla = document.getElementById("tabla-estudiantes");
var perdieron = document.getElementById("perdedores");
var ganaron = document.getElementById("ganadores");
var promedioAlto = document.getElementById("promedio-mas-alto");

let estudiantes = [];

function agregarEstudiante() {
  let nombre = document.getElementById("nombre").value;
  let identificacion = document.getElementById("identificacion").value;
  let nota1 = parseFloat(document.getElementById("nota1").value);
  let nota2 = parseFloat(document.getElementById("nota2").value);
  let nota3 = parseFloat(document.getElementById("nota3").value);
  let promedio = (nota1 + nota2 + nota3) / 3;
  promedio = promedio.toFixed(2);
  let calificacion = (promedio >= 3.5?'APROBO':'PERDIÓ')
  let estudiante = {
    nombre,
    identificacion,
    nota1,
    nota2,
    nota3,
    promedio,
    calificacion
  };
  estudiantes.push(estudiante);
  console.log(estudiantes);
  actualizarTabla(estudiante);  
  form.reset();
  actualizarResultados();
}

function actualizarTabla(estudiante) {
  const fila = document.createElement("tr");
  if(estudiante.promedio > 3.5){
    fila.classList.add("row-green")
  }else{
    fila.classList.add("row-red")
  }
  const celdaNombre = document.createElement("td");
  celdaNombre.innerHTML = estudiante.nombre;
  fila.appendChild(celdaNombre);
  const celdaIdentificacion = document.createElement("td");
  celdaIdentificacion.innerHTML = estudiante.identificacion;
  fila.appendChild(celdaIdentificacion);
  const celdaNota1 = document.createElement("td");
  celdaNota1.innerHTML = estudiante.nota1;
  fila.appendChild(celdaNota1);
  const celdaNota2 = document.createElement("td");
  celdaNota2.innerHTML = estudiante.nota2;
  fila.appendChild(celdaNota2);
  const celdaNota3 = document.createElement("td");
  celdaNota3.innerHTML = estudiante.nota3;
  fila.appendChild(celdaNota3);
  const celdaPromedio = document.createElement("td");
  celdaPromedio.innerHTML = estudiante.promedio;
  fila.appendChild(celdaPromedio);
  const celdaCali = document.createElement("td");
  celdaCali.innerHTML = estudiante.calificacion;
  fila.appendChild(celdaCali);
  const celdaOpcion = document.createElement("td");
  const btn = document.createElement("button");
  btn.innerHTML = "Eliminar";
  btn.addEventListener('click', eliminar.bind(null, btn));
  celdaOpcion.appendChild(btn);
  fila.appendChild(celdaOpcion);
  tabla.appendChild(fila);
}

function eliminar(NodoBoton) {
  var TR = NodoBoton.parentNode.parentNode;
  tabla.removeChild(TR);
}

function actualizarResultados() {
  const resultado = estudiantes.reduce(
    (contador, estudiante) => {
      if (estudiante.promedio > 3.5) {
        contador.aprobados++;
      } else {
        contador.reprobados++;
      }
      
      if (estudiante.promedio > contador.promedioMaximo) {
        contador.promedioMaximo = estudiante.promedio;
        contador.estudianteMaximo = estudiante;
      }
      return contador;
    },
    {
      aprobados: 0,
      reprobados: 0,
      promedioMaximo: -Infinity,
      estudianteMaximo: null,
    }
  );
  ganaron.innerHTML = resultado.aprobados;
  perdieron.innerHTML = resultado.reprobados;
  promedioAlto.innerHTML = resultado.estudianteMaximo.nombre + "  promedio de: "+resultado.estudianteMaximo.promedio;
}
