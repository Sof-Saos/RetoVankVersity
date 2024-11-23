let respuesta = showConfirm(`
    Bienvenido a nuestra aplicación sobre el cambio climático.
  
    El cambio climático es uno de los mayores desafíos globales de nuestro tiempo. Las emisiones de gases de efecto invernadero, la deforestación y el consumo excesivo están calentando nuestro planeta, poniendo en riesgo la biodiversidad y el bienestar humano.
  
    Esta aplicación tiene como propósito educar, concientizar y proponer acciones concretas para combatir el cambio climático. ¡Unidos podemos marcar la diferencia!
  `);

let resultados_huella = null; 

if (respuesta) {
  let validador = true;

  do {
    let opciones = prompt(
      "A cual seccion desea ingresar? \n\n Para escoger una seccion, ingrese el numero correspondiente de ella. \n 1. Introducción al Cambio Climático. \n 2.Huella de Carbono Personal. \n 3.Consejos Prácticos para Reducir tu Impacto. \n 4. Reporte final \n 5. Desea ingresar a otra opcion? \n 6. Salir"
    );

    validador = handleOption(opciones);

    if (opciones !== "6" && validador) {
      validador = confirm("¿Deseas volver a elegir una opción?");
    }
  } while (validador);
} else {
  alert("Gracias por usar nuestra aplicacion");
}



function handleOption(opcion) {
  switch (opcion) {
    case "1":
      alert(introductionTheme());
      break;

    case "2":
      resultados_huella = Carbon_Footprint();
      let resultadosHuellaTotal = resultados_huella[1];
      alert("Resultados de Huella de Carbono:", resultadosHuellaTotal);
      break;

    case "3":
      if (resultados_huella) {
        alert(tips(resultados_huella).join("\n"));
      } else {
        alert("Por favor, realiza primero el cálculo de la huella de carbono.");
      }
    break;

    case "4":
      if (resultados_huella) {
        alert((finalReport(resultados_huella))); // Pasamos todo el resultado al reporte
      } else {
        alert("Por favor, realiza primero el cálculo de la huella de carbono.");
      }
      break;

    case "5":
      // Esto permite reiniciar el ciclo sin pedir confirmación
      return true;

    case "6":
      alert("Gracias por usar nuestra aplicación.");
      return false; // Esto detiene el ciclo

    default:
      alert(
        "Ingresaste un valor no valido.\n Las opciones disponibles son:\n\n 1. Introducción al Cambio Climático. \n 2. Huella de Carbono Personal. \n 3. Consejos Prácticos para Reducir tu Impacto. \n 4. Reporte final \n 5. Desea ingresar a otra opción? \n 6. Salir"
      );
      break;
  }
  return true; // Retorna `true` por defecto para seguir el ciclo
}

function Carbon_Footprint() {
  let resultados_huella = [];

  let electricidad = parseFloat(
    prompt("¿Cuántos kWh de electricidad consumes al mes?")
  );
  let gasNatural = parseFloat(
    prompt(
      "Si utilizas gas natural, carbón o leña, ¿cuánto consumes en m³ o kg al mes? (Si no usas, ingresa 0)"
    )
  );
  let tipoEnergia = prompt(
    "¿Qué tipo de energía utilizas? (Renovable, fósil, mixta)"
  ).toLowerCase();
  resultados_huella.push({
    categoria: "Energía",
    electricidad,
    gasNatural,
    tipoEnergia,
  });

  let kmRecorridos = parseFloat(
    prompt(
      "¿Cuántos kilómetros recorres al mes en coche, moto, o transporte público?"
    )
  );
  let tipoVehiculo = prompt(
    "¿Qué tipo de vehículo utilizas? (Gasolina, diésel, híbrido, eléctrico)"
  ).toLowerCase();
  let vuelosAnuales = parseInt(
    prompt("¿Cuántos vuelos tomas al año? (Si no tomas vuelos, ingresa 0)")
  );
  let horasPorVuelo = parseFloat(
    prompt("¿Cuántas horas dura cada vuelo promedio? (Si no aplica, ingresa 0)")
  );
  resultados_huella.push({
    categoria: "Transporte",
    kmRecorridos,
    tipoVehiculo,
    vuelosAnuales,
    horasPorVuelo,
  });

  let residuosGenerados = parseFloat(
    prompt("¿Cuántos kilogramos de residuos generas al mes?")
  );
  let porcentajeReciclaje = parseFloat(
    prompt("¿Qué porcentaje de tus residuos se reciclan? (0-100)")
  );
  resultados_huella.push({
    categoria: "Residuos",
    residuosGenerados,
    porcentajeReciclaje,
  });

  let frecuenciaCarne = prompt(
    "¿Con qué frecuencia consumes carne? (Diariamente, semanalmente, ocasionalmente)"
  ).toLowerCase();
  let productosLocales = prompt(
    "¿Consumes productos locales o importados? (Locales, importados)"
  ).toLowerCase();
  let gastoMensual = parseFloat(
    prompt(
      "¿Cuál es tu gasto mensual aproximado en bienes de consumo (ropa, tecnología, etc.)?"
    )
  );
  resultados_huella.push({
    categoria: "Consumo y Alimentación",
    frecuenciaCarne,
    productosLocales,
    gastoMensual,
  });

  alert(
    "Hemos terminado las preguntas. Puedes revisar los resultados en la consola."
  );

  let electricidadEmisiones = electricidad * 0.4; // 0.4 kgCO₂e/kWh
  let gasNaturalEmisiones = gasNatural * 2; // 2 kgCO₂e/m³
  let totalEnergia = electricidadEmisiones + gasNaturalEmisiones;

  let kmEmisiones = kmRecorridos * 0.2; // 0.2 kgCO₂e/km
  let vuelosEmisiones = vuelosAnuales * horasPorVuelo * 0.25; // 0.25 kgCO₂e/km por pasajero
  let totalTransporte = kmEmisiones + vuelosEmisiones;

  let residuosEmisiones =
    residuosGenerados * 1.5 * (1 - porcentajeReciclaje / 100); // 1.5 kgCO₂e/kg para residuos no reciclados
  let totalResiduos = residuosEmisiones;

  let carneEmisiones = 52 * 27; // 52 semanas comiendo carne roja
  let vegetalesEmisiones = 52 * 2; // 52 semanas comiendo vegetales
  let totalAlimentos = carneEmisiones + vegetalesEmisiones;

  let totalHuellaCarbono =
    totalEnergia + totalTransporte + totalResiduos + totalAlimentos;

  alert(
    "Tu huella de carbono total es: " +
      totalHuellaCarbono +
      " kgCO₂e al año."
  );
  let respuestass=[resultados_huella, totalHuellaCarbono];
  return respuestass;
}

function introductionTheme() {
  let msj;
  return (msj =
    "El cambio climático es una de las mayores amenazas globales de nuestro tiempo, caracterizado por cambios significativos en los patrones climáticos a largo plazo. Sus principales causas incluyen la quema de combustibles fósiles, la deforestación, y actividades humanas que liberan grandes cantidades de gases de efecto invernadero, como el dióxido de carbono (CO₂) y el metano (CH₄). Estas emisiones provocan un calentamiento global, que a su vez genera consecuencias como el aumento del nivel del mar, fenómenos meteorológicos extremos, pérdida de biodiversidad y impactos severos en los ecosistemas y las comunidades humanas.");
}


function tips(respuestas) {
  const tips = [
    "Reduce el uso de transporte motorizado, opta por caminar, usar bicicleta o transporte público.",
    "Ahorra energía en casa utilizando bombillas LED y desconectando dispositivos que no estés usando.",
    "Recicla y reutiliza materiales siempre que sea posible.",
    "Minimiza el consumo de carne y productos lácteos, optando por una dieta más basada en plantas, reduce el consumo de carne roja a una vez por semana puede disminuir tu huella de carbono en 0.8 toneladas al año",
  ];

  let respuestasTest = respuestas[0];
  
  // Devolver los consejos como arreglo
  let recomendaciones = [];
  
  // Verificamos si el arreglo de respuestas tiene valores
  if (!respuestasTest || respuestasTest.length === 0) {
    console.log("No se han recibido respuestas.");
    return recomendaciones; // Si no hay respuestas, devolver un arreglo vacío
  } else {
    // Iteramos sobre las respuestas para agregar los consejos correspondientes
    for (let i = 0; i < respuestasTest.length; i++) {
      if (respuestasTest[i]) { // Si la respuesta es 'true', agregar el consejo
        recomendaciones.push(tips[i]);
      }
    }
  }

  return recomendaciones;
}


function finalReport(resultados) {
  let totalHuellaCarbono = resultados[1]; // Total de la huella de carbono
  let respuestasTest = resultados[0]; // Respuestas del test

  let recomendaciones = tips(resultados); // Obtener recomendaciones

  let aciertos = 0;

  // Verificar respuestas correctas (asumiendo que las respuestas correctas son `true`)
  respuestasTest.forEach((respuesta) => {
    if (respuesta === true) {
      aciertos++;
    }
  });

  // Mostrar el resumen final con los resultados
  alert(`Resumen Final: 
     Huella de carbono: ${totalHuellaCarbono.toFixed(2)} toneladas de CO₂ al año
    ■ Aciertos en el test: ${aciertos}/5
    ¡Gracias por participar!`);
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
