//Elementos html

const container = document.getElementById("contenedor");

//Funcion async que va encargarse de rellenar el html
const rellenaTienda = async () => {
  //variable que contiene la url que voy hacer el fetch
  const url = "https://www.cheapshark.com/api/1.0/deals?storeID=1";

  //manejo de la respuesta  de la peticion
  const response = await fetch(url);
  const data = await response.json();

  //Creo un contenedor principal para almacenar los datos
  const div = document.createElement("div");
  div.classList.add("row");

  //bucle que itera sobre los datos
  for (let index = 0; index < 12; index++) {
    const elemento = data[index];
    //Desestructuro los datos del elemento para que sea mas sencillo el guardar los datos en el html
    const { title, metacriticScore, thumb, normalPrice } = elemento;

    const cardContenedor = document.createElement("div");
    const card = document.createElement("div");

    //Manejo del css General para su correcta visualizacion

    card.classList.add(
      "col-4",
      "d-flex",
      "justify-content-center",
      "aling-items-center"
    );

    cardContenedor.innerHTML = `<img src=${thumb} class="mt-4"></img>`;
    cardContenedor.innerHTML += `<h3 class="text-light text-center mt-2">${title}</h3>`;
    cardContenedor.innerHTML += `
    <div class="text-light d-flex justify-content-center aling-items-center mt-2">
    <div class="mx-2">Critica=${metacriticScore}</div>
    <div>Precio=${normalPrice}</div>
    </div>
    <div class="d-flex justify-content-end my-3">
    <button class="my-2 btn btn-primary">Comprar</button>
    </div>
    `;
    card.append(cardContenedor);
    div.append(card);
  }
  container.append(div);
};

rellenaTienda();
