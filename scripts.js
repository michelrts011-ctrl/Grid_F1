"use strict";

/* ==========================================================================
   Dados
   ========================================================================== */

const CARS = [
  {
    id: "720s",
    name: "720S",
    tag: "Papaya orange",
    alt: "Orange McLaren 720S",
    img: "img/720s.webp",
    power: "720 PS",
    accel: "2.9 s",
    top: "341 km/h",
    video: "https://www.tiktok.com/@ransrgg/video/7458972895503453448?_r=1&_t=ZS-91miEYPkonF",
  },
  {
    id: "765lt",
    name: "765LT",
    tag: "Purple",
    alt: "Purple McLaren 765LT",
    img: "img/765lt.webp",
    power: "765 PS",
    accel: "2.8 s",
    top: "330 km/h",
    video: "https://www.tiktok.com/@yannsilva100/video/7485847508963314974?q=mclaren%20765lt%20roxa&t=1764450936835",
  },
  {
    id: "p1",
    name: "P1",
    tag: "Black",
    alt: "Black McLaren P1",
    img: "img/p1.webp",
    power: "916 PS",
    accel: "2.8 s",
    top: "350 km/h",
    video: "https://www.tiktok.com/@dbmp4_/video/7407614092552326442?q=mclaren%20p1%20preta&t=1764450882687",
  },
];

/* Tempo (ms) até trocar o conteúdo, enquanto o carro atual sai de cena */
const SWAP_DELAY = 260;

/* ==========================================================================
   Elementos
   ========================================================================== */

const $ = (id) => document.getElementById(id);

const el = {
  picker: $("picker"),
  stage: $("stage"),
  car: $("car"),
  name: $("name"),
  power: $("s-power"),
  accel: $("s-accel"),
  top: $("s-top"),
  video: $("video"),
};

/* ==========================================================================
   Estado
   ========================================================================== */

let current = 0;
let isSwapping = false;

/* ==========================================================================
   Seletor de carros
   ========================================================================== */

function createPickerButton(car, index) {
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-pressed", String(index === current));

  const thumb = document.createElement("img");
  thumb.src = car.img;
  thumb.alt = "";

  const label = document.createElement("span");
  label.textContent = car.name;

  const tag = document.createElement("em");
  tag.textContent = car.tag;
  label.appendChild(tag);

  button.append(thumb, label);
  button.addEventListener("click", () => show(index));
  return button;
}

CARS.forEach((car, index) => el.picker.appendChild(createPickerButton(car, index)));

/* ==========================================================================
   Renderização
   ========================================================================== */

function render(index) {
  const car = CARS[index];

  el.car.src = car.img;
  el.car.alt = car.alt;
  el.name.textContent = car.name;
  el.power.textContent = car.power;
  el.accel.textContent = car.accel;
  el.top.textContent = car.top;

  document.body.dataset.car = car.id;

  [...el.picker.children].forEach((button, i) => {
    button.setAttribute("aria-pressed", String(i === index));
  });
}

function show(index) {
  if (index === current || isSwapping) return;

  isSwapping = true;
  current = index;

  el.stage.classList.add("swap");
  document.body.dataset.car = CARS[index].id; // o tema muda já, junto com a saída do carro

  setTimeout(() => {
    render(index);
    requestAnimationFrame(() => {
      el.stage.classList.remove("swap");
      isSwapping = false;
    });
  }, SWAP_DELAY);
}

/* ==========================================================================
   Eventos
   ========================================================================== */

el.video.addEventListener("click", () => {
  window.open(CARS[current].video, "_blank", "noopener,noreferrer");
});

render(current);