// Arreglo para recibir los Ingresos
const ingresos = [];
// Arreglo para recibir los egresos
const egreso = [];
//## llama funciones como mostrar cabeceros
let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};
//######################################----------------------------------------------- .CARGAR CABECERO

//## llama funciones TOtal ingresos y total egresos, para mostrar en el cabecero. Los envía al HTML en sus respectivos ID
let cargarCabecero = () => {
  let presupuestoTotal = totalIngresos() - totalEgreso();
  let porcentajeEgreso = totalEgreso() / totalIngresos();
  //###### Mostrar cabecera
  document.getElementById("presupuestoTotal").innerHTML = `${formatoMoneda(
    presupuestoTotal
  )}`;
  document.getElementById("porcentajeEgreso").innerHTML = `${formatoPorcentaje(
    porcentajeEgreso
  )}`;
  document.getElementById("ingresoTotal").innerHTML = `${formatoMoneda(
    totalIngresos()
  )}`;
  document.getElementById("egresoTotal").innerHTML = `${formatoMoneda(
    totalEgreso()
  )}`;
};
//## arrow function para calcular el total de ingresos, devuelve el total
let totalIngresos = () => {
  let sumaingresos = 0;
  for (let e of ingresos) {
    sumaingresos += e.valor;
  }
  return sumaingresos;
};
//## arrow function para calcular el total de egresos, devuelve el total
let totalEgreso = () => {
  let sumaEgreso = 0;
  for (let e of egreso) {
    sumaEgreso += e.valor;
  }
  return sumaEgreso;
};
//######################################----------------------------------------------- .FIN CARGAR CABECERO

//######################################----------------------------------------------- INGRESO
//## Toma la descripción y valor de cada Ingreso, y los envía en orden al HTML en su respectivo ID. ESta funcion llama cargar Ingresos.
const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let e of ingresos) {
    ingresosHTML += crearIngresoHTML(e);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

//## Crea el código para el HTML para los INGRESOS.
const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
                <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(
                  ingreso.valor
                )}</div>
                <div class="elemento_eliminar--btn">
                        <button clas="elemento_eliminar--btn">                        
                            <ion-icon name="trash-outline" onclick='eliminarIngreso(${
                              ingreso.id
                            })'></ion-icon>
                            </button>
                    </div>
                </div>
                </div>              `;
  return ingresoHTML;
};
//######################################----------------------------------------------- FIN INGRESOS
//######################################------------------------------------------------- EGRESOS
//Toma la descripción y valor de cada Ingreso, y los envía en orden al HTML en su respectivo ID. ESta funcion llama cargar Egresos.
const cargarEgresos = () => {
  let egresoHTML = "";
  for (let e of egreso) {
    egresoHTML += crearEgresoHTML(e);
  }
  document.getElementById("lista-egresos").innerHTML = egresoHTML;
};
const crearEgresoHTML = (egreso) => {
  let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${
                      egreso.descripcion
                    }</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(
                          egreso.valor
                        )}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(
                          egreso.valor / totalEgreso()
                        )}</div>                        
                        <div class="elemento_eliminar--btn">
                            <button clas="elemento_eliminar--btn">
                                <ion-icon name="trash-outline" onclick='eliminarEgreso(${
                                  egreso.id
                                })'></ion-icon>
                            </button>
                        </div>
                    </div>
                    </div>
                    `;
  return egresoHTML;
};

//######################################------------------------------------------------- FIN EGRESOS
//######################################----------------------------------------------- .CAMBIAR FORMATOS
//#### Funcion para dar formato tipo moneda a un valor.
const formatoMoneda = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 1,
  });
};
//#### Funcion para dar formato de Porcentaje a un valor.
const formatoPorcentaje = (valor) => {
  if (valor == 0) {
    return 0;
  } else {
    return valor.toLocaleString("en-US", {
      style: "percent",
      minimumFractionDigits: 1,
    });
  }
};
//######################################----------------------------------------------- .FIN CAMBIAR FORMATOS
//############
let eliminarIngreso = (id) => {
  let indiceELiminar = ingresos.findIndex((idIngreso) => idIngreso.id === id);
  ingresos.splice(indiceELiminar, 1);
  cargarCabecero();
  cargarIngresos();
};

let eliminarEgreso = (id) => {
  let indiceEliminar = egreso.findIndex((idEgreso) => idEgreso === id);
  egreso.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarEgresos();
};

//###########################---------------------------------- EVENTO AGREGAR ELEMENTO INGRESO/EGRESO

let agregarDato = ()=>{
  let formulario = document.forms['forma'];
  let tipo =  formulario['tipo'];
  let descripcion = formulario['descripcion_formulario'];
  let valor = formulario['valor_formulario'];

  if(descripcion.value !== "" & valor.value !==""){
    if(tipo.value === 'ingreso'){
      ingresos.push(new Ingreso(descripcion.value,Number(valor.value)));
      formulario['descripcion_formulario'].value='';
      formulario['valor_formulario'].value ='';
      cargarCabecero();
      cargarIngresos();
    }
    else if  (tipo.value==='egreso'){
      egreso.push(new Egreso(descripcion.value,Number(valor.value)))
      formulario['descripcion_formulario'].value ='';
      formulario['valor_formulario'].value ='';
      cargarCabecero();
      cargarEgresos();
    }

  } else {
    alert('Diligencie todos los campos');
  }
}
