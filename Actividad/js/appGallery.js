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

const muestraModal = (elemento) => {
  const {
    target: { src },
  } = elemento;
  contenedor.style.display = "none";
  let salir = document.createElement("div");
  salir.textContent = "x";
  salir.classList.add("cursor");
  salir.style.fontSize = "45px";
  let img = document.createElement("img");
  img.src = src;
  img.classList.add("img-fluid", "mx-3");
  modalContainer.append(img, salir);
  const btn = document.querySelector(".cursor");
  btn.addEventListener("click", () => cierraModal());
};

const cierraModal = () => {
  contenedor.style.display = "block";
  modalContainer.innerHTML = "";
};
