'use strict';

// Активное состояние карты
document.querySelector(`.map`).classList.remove(`map--faded`);

// Массив данных для объявления
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

const similarListElement = document.querySelector(`.map__pins`);
const similarUserTemplate = document.querySelector(`#pin`);

// Функции для рандомного элемента из массива
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

// Функция рандомной строки из массива (непонятно как вывести рандомное число элементов)
function getRandomArrayStroke(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Функция для создания похожих объявлений
const fragment = document.createDocumentFragment();

for (let i = 0; i < 8; i++) {
  const userElement = similarUserTemplate.cloneNode(true);
  const userAvatar = `img/avatars/user${getRandomInteger(USER_AVATARMIN, USER_AVATARMAX)}.png`;
  const offerTitle = getRandomArrayElement(OFFER_TITLE);
  const offerAddress = `${getRandomInteger(LOCATION_YMIN, LOCATION_YMAX)} ${getRandomInteger(LOCATION_XMIN, LOCATION_XMAX)}`;
  const offerPrice = getRandomArrayElement(OFFER_PRICE);
  const offerType = getRandomArrayElement(OFFER_TYPE);
  const offerRooms = getRandomArrayElement(OFFER_ROOMS);
  const offerGuests = getRandomArrayElement(OFFER_GUESTS);
  const offerCheckin = getRandomArrayElement(OFFER_CHECKIN);
  const offerCheckout = getRandomArrayElement(OFFER_CHECKOUT);
  const offerFeatures = getRandomArrayStroke(OFFER_FEATURES);
  const offerDescription = getRandomArrayElement(OFFER_DESCRIPTION);
  const offerPhotos = getRandomArrayStroke(OFFER_PHOTOS);

  userElement.querySelector(`#avatar`).src = userAvatar;
  userElement.querySelector(`#title`).textContent = offerTitle;
  userElement.querySelector(`#address`).textContent = offerAddress;
  userElement.querySelector(`#price`).textContent = offerPrice;
  userElement.querySelector(`#type`).textContent = offerType;
  userElement.querySelector(`#room_number`).textContent = offerRooms;
  userElement.querySelector(`#capacity`).textContent = offerGuests;
  userElement.querySelector(`#timein`).textContent = offerCheckin;
  userElement.querySelector(`#timeout`).textContent = offerCheckout;
  userElement.querySelector(`.features`).textContent = offerFeatures;
  userElement.querySelector(`#description`).textContent = offerDescription;
  userElement.querySelector(`#images`).textContent = offerPhotos;

  fragment.appendChild(userElement);
}
similarListElement.appendChild(fragment);
