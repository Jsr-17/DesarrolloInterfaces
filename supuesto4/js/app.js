//variable que va a contener los datos de la api
let datos = [];
let tiendaActual = 0;
//variable contenedora
let contenedor = document.querySelector("#contenedor");
let categoriasBotones = document.querySelector("#categoriasBotones");

const selectCategoria = document.querySelector("#tipoFiltro");

const obtenerDatos = async () => {
  //variables encargadas de las peticiones asincronas
  const resp = await fetch("https://www.cheapshark.com/api/1.0/stores");
  const data = await resp.json();
  //
  for (let index = 0; index < 3; index++) {
    //Cambiarlo luego por el total
    const { storeID, storeName, isActive } = data[index];

    //Si la tienda no esta activa
    if (isActive == 1) {
      //vuelvo a hacer una peticion a la api pero esta vez a la tienda
      const respGames = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?storeID=${storeID}`
      );

      const dataGames = await respGames.json();

      //Aqui voy a guardar los juegos
      let juegos = [];

      //Recorro los datos de la respuesta de la peticion
      for (let index = 0; index < dataGames.length; index++) {
        //Desestructuro la peticion

        const {
          dealRating,
          title,
          normalPrice,
          salePrice,
          steamRatingPercent,
          thumb,
        } = dataGames[index];

        //Array que va a contener las categorias
        let categories = [];
        //Arrays que van a funcionar como filtro
        let accion = [
          "Collapse!",
          "Half-Life",
          "Metro",
          "Battlefield",
          "Suicide Squad",
          "Hitman",
          "Deus Ex",
          "Dishonored",
          "BioShock",
          "Assassins",
          "Tomb Raider",
          "Dungeon Siege",
          "The Witcher",
          "Just Cause",
          "Thief",
          "Borderlands",
        ];

        let shooter = [
          "Collapse!",
          "Metro",
          "Battlefield",
          "Hitman",
          "Deus Ex",
          "BioShock",
          "Assassins",
          "Tomb Raider",
          "Just Cause",
          "Sniper",
          "Borderlands",
          "Back 4 Blood",
          "Destiny",
          "Far Cry",
          "Tom Clancys",
        ];
        let estrategia = [
          "Sid Meier's Civilization IV",
          "Battlefield",
          "Hitman",
          "Prison Architect",
          "Cities: Skylines",
        ];
        let peleas = [
          "Marvels",
          "Komba",
          "Gotham Knights",
          "One Punch Man",
          "ONE PIECE",
          "NARUTO",
          "Injustice",
        ];

        let rol = ["Dungeon Siege", "Warhammer", "The Witcher", "Borderlands"];

        for (let index = 0; index < accion.length; index++) {
          if (title.includes(accion[index])) {
            categories = [...categories, "accion"];
          }
        }
        for (let index = 0; index < shooter.length; index++) {
          if (title.includes(shooter[index])) {
            categories = [...categories, "shooter"];
          }
        }
        for (let index = 0; index < estrategia.length; index++) {
          if (title.includes(estrategia[index])) {
            categories = [...categories, "estrategia"];
          }
        }
        for (let index = 0; index < peleas.length; index++) {
          if (title.includes(peleas[index])) {
            categories = [...categories, "peleas"];
          }
        }
        for (let index = 0; index < peleas.length; index++) {
          if (title.includes(rol[index])) {
            categories = [...categories, "rol"];
          }
        }

        //creo un objeto donde guardo los datos del resultado de la peticion
        let datos = {
          CalificacionDeTrato: dealRating,
          Titulo: title,
          Precio: normalPrice,
          PrecioRebajado: salePrice,
          Puntuacion: steamRatingPercent,
          Imagen: thumb,
          categorias: categories,
        };
        //Guardo en el array de los juegos un nuevo juego con los datos
        juegos.push(datos);
      }
      //guardo una nueva tienda con los datos de las diferentes peticiones y desestructuraciones
      datos.push({
        storeID,
        storeName,
        juegos,
      });
    }
  }
  //Con todos los datos rellenamos la tienda
  rellenaTienda();
};
//Llama a la funcion que hace la peticion a la api y deja cargado en memoria el resultado

obtenerDatos();

//Funcion que rellena la tienda segun la tienda actual

const rellenaTienda = () => {
  //Desestructura los datos segun la tienda que es una variable global

  const { storeID, storeName, juegos } = datos[tiendaActual];

  //recorre los juegos de la tienda
  juegos.forEach(
    ({
      CalificacionDeTrato,
      Titulo,
      Precio,
      PrecioRebajado,
      Puntuacion,
      Imagen,
      categorias,
    }) => {
      //creacion del html con los datos
      const contenedorDiv = document.createElement("div");
      const contenedorImg = document.createElement("div");
      const contenedorBtn = document.createElement("div");

      const carta = document.createElement("div");
      const div = document.createElement("div");
      const p = document.createElement("p");
      const img = document.createElement("img");
      const h6 = document.createElement("h6");
      const span = document.createElement("span");
      const btn = document.createElement("btn");

      contenedorDiv.classList.add(
        "d-flex",
        "justify-content-center",
        "align-items-center"
      );
      contenedorDiv.classList.add("col-sm-6", "col-12");
      contenedorImg.classList.add(
        "d-flex",
        "justify-content-center",
        "aling-items-center"
      );
      contenedorBtn.classList.add("d-flex", "justify-content-end");
      span.classList.add("text-center");
      carta.classList.add("border", "border-2", "border-grey", "my-2", "px-2");
      btn.classList.add("btn", "btn-secondary", "mb-2");
      h6.classList.add("text-light", "mb-2", "text-center");
      div.classList.add("text-light", "my-2");
      img.classList.add("my-4", "image");

      img.src = Imagen;
      h6.textContent = Titulo;
      span.innerHTML =
        "Precio anterior: " +
        Precio +
        "$<br> Precio rebajado " +
        PrecioRebajado +
        "$" +
        "<br>Porcentaje de ahorro  " +
        parseInt(((Precio - PrecioRebajado) / Precio) * 100);
      p.textContent = "Las criticas le dan una puntuacion de  " + Puntuacion;
      btn.textContent = "Comprar";
      contenedorBtn.append(btn);
      contenedorImg.append(img);
      div.append(span, p);
      carta.append(contenedorImg, h6, div, contenedorBtn);
      contenedorDiv.append(carta);
      contenedor.append(contenedorDiv);
    }
  );
};

//eventos para aplicar los filtros de la web

selectCategoria.addEventListener("change", () => {
  //Primera condicion que recoge los datos del indice seleccionado del select
  switch (selectCategoria.selectedIndex) {
    case 0:
      //caso neutro
      categoriasBotones.classList.add("categorias");
      contenedor.innerHTML = "";
      rellenaTienda();
      break;

    case 1:
      //caso de filtro por categorias

      //selecciona los botones
      categoriasBotones.classList.remove("categorias");
      const btnAccion = document.getElementById("btnAccion");
      const btnRol = document.getElementById("btnRol");
      const btnShooter = document.getElementById("btnShooter");
      const btnPeleas = document.getElementById("btnPeleas");
      const btnEstrategia = document.getElementById("btnEstrategia");

      //Anyade eventos a cada boton y ejecita el filtro para cada uno

      btnAccion.addEventListener("click", () => filtraPorCategoria("accion"));
      btnRol.addEventListener("click", () => filtraPorCategoria("rol"));
      btnShooter.addEventListener("click", () => filtraPorCategoria("shooter"));
      btnPeleas.addEventListener("click", () => filtraPorCategoria("peleas"));
      btnEstrategia.addEventListener("click", () =>
        filtraPorCategoria("estrategia")
      );

      break;
    case 2:
      //filtro por precio ascendente
      categoriasBotones.classList.add("categorias");
      filtradoRestante("precio", "asc");
      break;
    case 3:
      //filtro por precio descendente

      filtradoRestante("precio", "desc");

      categoriasBotones.classList.add("categorias");
      break;
    case 4:
      //filtro por calificaciones descendente
      filtradoRestante("cal", "asc");

      categoriasBotones.classList.add("categorias");
      break;
    case 5:
      //filtro de calificaciones descendente
      filtradoRestante("cal", "desc");

      categoriasBotones.classList.add("categorias");
      break;

    default:
      break;
  }
});

//funcion que filtra
const filtraPorCategoria = (categoria) => {
  contenedor.innerHTML = "";
  const { juegos } = datos[tiendaActual];

  switch (categoria) {
    case "accion":
      juegos.forEach(
        ({
          CalificacionDeTrato,
          Titulo,
          Precio,
          PrecioRebajado,
          Puntuacion,
          Imagen,
          categorias,
        }) => {
          const elementoAccion = categorias.indexOf("accion");

          if (elementoAccion != -1) {
            rellenaHtml(
              CalificacionDeTrato,
              Titulo,
              Precio,
              PrecioRebajado,
              Puntuacion,
              Imagen,
              categorias
            );
          }
        }
      );
      break;
    case "rol":
      juegos.forEach(
        ({
          CalificacionDeTrato,
          Titulo,
          Precio,
          PrecioRebajado,
          Puntuacion,
          Imagen,
          categorias,
        }) => {
          const elementoAccion = categorias.indexOf("rol");

          if (elementoAccion != -1) {
            rellenaHtml(
              CalificacionDeTrato,
              Titulo,
              Precio,
              PrecioRebajado,
              Puntuacion,
              Imagen,
              categorias
            );
          }
        }
      );
      break;
    case "shooter":
      juegos.forEach(
        ({
          CalificacionDeTrato,
          Titulo,
          Precio,
          PrecioRebajado,
          Puntuacion,
          Imagen,
          categorias,
        }) => {
          const elementoAccion = categorias.indexOf("shooter");

          if (elementoAccion != -1) {
            rellenaHtml(
              CalificacionDeTrato,
              Titulo,
              Precio,
              PrecioRebajado,
              Puntuacion,
              Imagen,
              categorias
            );
          }
        }
      );
      break;
    case "peleas":
      juegos.forEach(
        ({
          CalificacionDeTrato,
          Titulo,
          Precio,
          PrecioRebajado,
          Puntuacion,
          Imagen,
          categorias,
        }) => {
          const elementoAccion = categorias.indexOf("peleas");

          if (elementoAccion != -1) {
            rellenaHtml(
              CalificacionDeTrato,
              Titulo,
              Precio,
              PrecioRebajado,
              Puntuacion,
              Imagen,
              categorias
            );
          }
        }
      );
      break;
    case "estrategia":
      juegos.forEach(
        ({
          CalificacionDeTrato,
          Titulo,
          Precio,
          PrecioRebajado,
          Puntuacion,
          Imagen,
          categorias,
        }) => {
          const elementoAccion = categorias.indexOf("estrategia");

          if (elementoAccion != -1) {
            rellenaHtml(
              CalificacionDeTrato,
              Titulo,
              Precio,
              PrecioRebajado,
              Puntuacion,
              Imagen,
              categorias
            );
          }
        }
      );
      break;

    default:
      break;
  }
};
const filtradoRestante = (tipo, modo) => {
  contenedor.innerHTML = "";
  const { juegos } = datos[tiendaActual];
  let arrayOrdenado = [];

  juegos.forEach(
    ({
      CalificacionDeTrato,
      Titulo,
      Precio,
      PrecioRebajado,
      Puntuacion,
      Imagen,
      categorias,
    }) => {
      const juego = {
        cal: parseInt(CalificacionDeTrato),
        tit: Titulo,
        prec: parseFloat(Precio),
        precRej: PrecioRebajado,
        punt: Puntuacion,
        img: Imagen,
        cat: categorias,
      };
      arrayOrdenado = [juego, ...arrayOrdenado];

      switch (tipo) {
        case "precio":
          switch (modo) {
            case "asc":
              for (let i = 0; i < arrayOrdenado.length; i++) {
                for (let j = 0; j < arrayOrdenado.length - i - 1; j++) {
                  if (arrayOrdenado[j].prec > arrayOrdenado[j + 1].prec) {
                    const temp = arrayOrdenado[j];
                    arrayOrdenado[j] = arrayOrdenado[j + 1];
                    arrayOrdenado[j + 1] = temp;
                  }
                }
              }

              break;
            case "desc":
              for (let i = 0; i < arrayOrdenado.length; i++) {
                for (let j = 0; j < arrayOrdenado.length - i - 1; j++) {
                  if (arrayOrdenado[j].prec < arrayOrdenado[j + 1].prec) {
                    const temp = arrayOrdenado[j];
                    arrayOrdenado[j] = arrayOrdenado[j + 1];
                    arrayOrdenado[j + 1] = temp;
                  }
                }
              }
              break;
            default:
              break;
          }

          break;
        case "cal":
          switch (modo) {
            case "asc":
              for (let i = 0; i < arrayOrdenado.length; i++) {
                for (let j = 0; j < arrayOrdenado.length - i - 1; j++) {
                  if (arrayOrdenado[j].cal > arrayOrdenado[j + 1].cal) {
                    const temp = arrayOrdenado[j];
                    arrayOrdenado[j] = arrayOrdenado[j + 1];
                    arrayOrdenado[j + 1] = temp;
                  }
                }
              }

              break;
            case "desc":
              for (let i = 0; i < arrayOrdenado.length; i++) {
                for (let j = 0; j < arrayOrdenado.length - i - 1; j++) {
                  if (arrayOrdenado[j].cal < arrayOrdenado[j + 1].cal) {
                    const temp = arrayOrdenado[j];
                    arrayOrdenado[j] = arrayOrdenado[j + 1];
                    arrayOrdenado[j + 1] = temp;
                  }
                }
              }
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    }
  );
  arrayOrdenado.forEach(({ cal, tit, prec, precRej, punt, img, cat }) =>
    rellenaHtml(cal, tit, prec, precRej, punt, img, cat)
  );
};

const rellenaHtml = (cal, tit, prec, precRej, punt, img, cat) => {
  const contenedorDiv = document.createElement("div");
  const contenedorImg = document.createElement("div");
  const contenedorBtn = document.createElement("div");

  const carta = document.createElement("div");
  const div = document.createElement("div");
  const p = document.createElement("p");
  const imge = document.createElement("img");
  const h6 = document.createElement("h6");
  const span = document.createElement("span");
  const btn = document.createElement("btn");

  contenedorDiv.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  contenedorDiv.classList.add("col-sm-6", "col-12");
  contenedorImg.classList.add(
    "d-flex",
    "justify-content-center",
    "aling-items-center"
  );
  contenedorBtn.classList.add("d-flex", "justify-content-end");
  span.classList.add("text-center");
  carta.classList.add("border", "border-2", "border-grey", "my-2", "px-2");
  btn.classList.add("btn", "btn-secondary", "mb-2");
  h6.classList.add("text-light", "mb-2", "text-center");
  div.classList.add("text-light", "my-2");
  imge.classList.add("my-4", "image");

  imge.src = img;
  h6.textContent = tit;
  span.innerHTML =
    "Precio anterior: " +
    prec +
    "$<br> Precio rebajado " +
    precRej +
    "$" +
    "<br>Porcentaje de ahorro  " +
    parseInt(((prec - precRej) / prec) * 100);
  p.textContent = "Las criticas le dan una puntuacion de  " + cal;
  btn.textContent = "Comprar";
  contenedorBtn.append(btn);
  contenedorImg.append(imge);
  div.append(span, p);
  carta.append(contenedorImg, h6, div, contenedorBtn);
  contenedorDiv.append(carta);
  contenedor.append(contenedorDiv);
};

//crearemos un entrono de trabajo entornoRequestin dentro creamos tres colecciones get post y auth  enviaremos un get a httbin coje un usuario  get a reqress usuario 10  get consuma get list todos los datos
//host tiene que estar en una variable para cada web  post registro usuario reqres  api testing scrip compruebe 200 ms por debajo o igual  otra que  compruebe la cabecera
// tercer devuelva https captura de pantalla con resultados
