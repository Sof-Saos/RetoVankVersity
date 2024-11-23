let respuesta = showConfirm(`
    Bienvenido a nuestra aplicación sobre el cambio climático.
  
    El cambio climático es uno de los mayores desafíos globales de nuestro tiempo. Las emisiones de gases de efecto invernadero, la deforestación y el consumo excesivo están calentando nuestro planeta, poniendo en riesgo la biodiversidad y el bienestar humano.
  
    Esta aplicación tiene como propósito educar, concientizar y proponer acciones concretas para combatir el cambio climático. ¡Unidos podemos marcar la diferencia!
  `);


if (respuesta) {
} else {

    alert("Gracias por usar nuestra aplicacion");
}

function showConfirm(message) {
  let msj = false;
  if (confirm(message)) {
    msj = true;
  } else {
    msj = false;
  }
  return msj;
}

// Ejemplo de uso
