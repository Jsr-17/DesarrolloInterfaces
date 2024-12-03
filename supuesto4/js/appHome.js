const btnImg1 = document.querySelector("#img1");
const btnImg2 = document.querySelector("#img2");
const btnImg3 = document.querySelector("#img3");
const btnSig = document.querySelector("#siguiente");
const btnAnt = document.querySelector("#anterior");
const heroImg = document.querySelector(".hero");
const urlImg = {
  1: "url('./img/img1.jpg')",
  2: "url('./img/img2.jpg')",
  3: "url('./img/img3.jpg')",
};

heroImg.style.backgroundImage = urlImg[1];

btnImg1.addEventListener(
  "click",
  () => (heroImg.style.backgroundImage = "url('./img/img1.jpg')")
);
btnImg2.addEventListener(
  "click",
  () => (heroImg.style.backgroundImage = "url('./img/img2.jpg')")
);
btnImg3.addEventListener(
  "click",
  () => (heroImg.style.backgroundImage = "url('./img/img3.jpg')")
);

btnSig.addEventListener("click", () => {
  const img = [...heroImg.style.backgroundImage];
  img.map((letra) => {
    if (letra == 1) {
      heroImg.style.backgroundImage = urlImg[2];
      console.log(heroImg);
    } else if (letra == 2) {
      heroImg.style.backgroundImage = urlImg[3];
    } else if (letra == 3) {
      heroImg.style.backgroundImage = urlImg[1];
    }
  });
});

btnAnt.addEventListener("click", () => {
  const img = [...heroImg.style.backgroundImage];
  img.map((letra) => {
    if (letra == 1) {
      heroImg.style.backgroundImage = urlImg[3];
    } else if (letra == 2) {
      heroImg.style.backgroundImage = urlImg[1];
    } else if (letra == 3) {
      heroImg.style.backgroundImage = urlImg[2];
    }
  });
});
