//variable que va a contener los datos de la api
let datos = [];
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
            categories = [...categories, "estrategia"];
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
  rellenaTienda();
};

//obtenerDatos();

const rellenaTienda = () => {
  const { storeID, storeName, juegos } = datos[0];

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

selectCategoria.addEventListener("change", () => {
  switch (selectCategoria.selectedIndex) {
    case 1:
      console.log("oa");
      categoriasBotones.classList.remove("categorias");
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;

    default:
      break;
  }
});
