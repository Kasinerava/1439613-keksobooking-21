'use strict';

// Включаем активное состояние карты
document.querySelector(`.map`).classList.remove(`map--faded`);

// Создаем массив данных для объявления
const USER_AVATARMIN = 1;
const USER_AVATARMAX = 8;
const OFFER_TITLE = [`Только для семьи котов`, `Работающим котам`, `Студентам из Котакадемии`];
const OFFER_PRICE = [`10`, `15`, `50`, `75`, `100`];
const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const OFFER_ROOMS = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`];
const OFFER_GUESTS = [`1`, `2`, `3`];
const OFFER_CHECKIN = [`12:00`, `13:00`, `14:00`];
const OFFER_CHECKOUT = [`12:00`, `13:00`, `14:00`];
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const OFFER_DESCRIPTION = [`самое лучшее предложение`, `только здесь и сейчас`, `вы будете тут счастливы`];
const OFFER_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const LOCATION_XMIN = 0;
const LOCATION_XMAX = 1200;
const LOCATION_YMIN = 130;
const LOCATION_YMAX = 630;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const X = getRandomInteger(LOCATION_XMIN, LOCATION_XMAX);
const Y = getRandomInteger(LOCATION_YMIN, LOCATION_YMAX);

const similarListElement = document.querySelector(`.map__pins`);
const similarUserTemplate = document.querySelector(`#pin`);

// Рассчитываем координаты для метки

map__pin.style.left = X - PIN_WIDTH / 2;
map__pin.style.top = Y - PIN_HEIGHT / 2;

// Создаем функцию для рандомного элемента из массива
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

// Создаем функцию рандомной строки из массива
function getRandomArrayStroke(array) {
  let newArray = [];
  for (let i = 1; i <= array.length; i++) {
    let rnd = Math.floor(Math.random() * array.length);
    newArray.push(array[rnd]);
    array.splice(rnd, Math.floor(Math.random() * array.length));
  }
}

// Создаем массив
const dataArray = [];
for (let i = 0; i < 8; i++) {
  const offer = {
    userAvatar: `img/avatars/user${getRandomInteger(USER_AVATARMIN, USER_AVATARMAX)}.png`,
    offerTitle: getRandomArrayElement(OFFER_TITLE),
    offerAddress: `${getRandomInteger(LOCATION_XMIN, LOCATION_XMAX)} ${getRandomInteger(LOCATION_YMIN, LOCATION_YMAX)}`,
    offerPrice: getRandomArrayElement(OFFER_PRICE),
    offerType: getRandomArrayElement(OFFER_TYPE),
    offerRooms: getRandomArrayElement(OFFER_ROOMS),
    offerGuests: getRandomArrayElement(OFFER_GUESTS),
    offerCheckin: getRandomArrayElement(OFFER_CHECKIN),
    offerCheckout: getRandomArrayElement(OFFER_CHECKOUT),
    offerFeatures: getRandomArrayStroke(OFFER_FEATURES),
    offerDescription: getRandomArrayElement(OFFER_DESCRIPTION),
    offerPhotos: getRandomArrayStroke(OFFER_PHOTOS)
  };
  dataArray.push(offer);
}

const fragment = document.createDocumentFragment();
for (let j = 0; j < dataArray.length; j++) {
  const userElement = similarUserTemplate.cloneNode(true);
  userElement.querySelector(`img`).src = offer.userAvatar;
  userElement.querySelector(`img`).alt = offer.offerTitle;
  fragment.appendChild(userElement);
}

similarListElement.appendChild(fragment);
