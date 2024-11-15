const image = document.querySelectorAll("img");
const modalContainer = document.querySelector("#modalContainer");
const contenedor = document.querySelector("#contenedor");

let contenedorImagenes = [];
for (let index = 0; index < image.length; index++) {
  if (index == 0) {
    continue;
  }
  contenedorImagenes = [...contenedorImagenes, image[index]];
}
contenedorImagenes.forEach((el) =>
  el.addEventListener("click", (el) => muestraModal(el))
);

function muestraModal(elemento) {
  const {
    target: { src },
  } = elemento;
  contenedor.style.display = "none";
  modalContainer.style.display = "block";
}
