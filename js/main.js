'use strict';

// Включаем активное состояние карты
document.querySelector(`.map`).classList.remove(`map--faded`);

// Создаем массив данных для объявления
const USER_AVATARMIN = 1;
const USER_AVATARMAX = 8;
const OFFER_TITLE = [`Только для семьи котов`, `Работающим котам`, `Студентам из Котакадемии`];
const OFFER_PRICE = [`100`, `150`, `500`, `750`, `1000`];
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
const TYPE_MAP = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

// Определяем куда отрисовать и шаблоны
const similarListElement = document.querySelector(`.map__pins`);
const similarUserTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const similarCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapElement = document.querySelector(`.map`);
const filtersElement = document.querySelector(`.map__filters-container`);

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
    author: {
      avatar: `img/avatars/user0${getRandomInteger(USER_AVATARMIN, USER_AVATARMAX)}.png`,
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLE),
      address: `${getRandomInteger(LOCATION_YMIN, LOCATION_YMAX)} ${getRandomInteger(LOCATION_XMIN, LOCATION_XMAX)}`,
      price: getRandomArrayElement(OFFER_PRICE),
      type: getRandomArrayElement(OFFER_TYPE),
      rooms: getRandomArrayElement(OFFER_ROOMS),
      guests: getRandomArrayElement(OFFER_GUESTS),
      checkin: getRandomArrayElement(OFFER_CHECKIN),
      checkout: getRandomArrayElement(OFFER_CHECKOUT),
      features: getRandomArrayStroke(OFFER_FEATURES),
      description: getRandomArrayElement(OFFER_DESCRIPTION),
      photos: getRandomArrayStroke(OFFER_PHOTOS)
    },
    location: {
      X: getRandomInteger(LOCATION_XMIN, LOCATION_XMAX),
      Y: getRandomInteger(LOCATION_YMIN, LOCATION_YMAX)
    }
  };
  dataArray.push(offer);
}

// Создаем фрагмет с аватаркой
const avatarFragment = document.createDocumentFragment();
for (let j = 0; j < dataArray.length; j++) {
  const offer = dataArray[j];
  const userElement = similarUserTemplate.cloneNode(true);
  userElement.querySelector(`img`).src = offer.author.avatar;
  userElement.querySelector(`img`).alt = offer.offer.title;

  userElement.style.left = `${offer.location.X - PIN_WIDTH / 2}px`;
  userElement.style.top = `${offer.location.Y - PIN_HEIGHT}px`;
  avatarFragment.appendChild(userElement);
}

similarListElement.appendChild(avatarFragment);

// Создаем метод map для фич
const featuresMap = getRandomArrayStroke(OFFER_FEATURES);
const featuresArr = OFFER_FEATURES.map((featuresMap, i) => {
  return `<li class="popup__feature popup__feature--${featuresMap}">${featuresMap}</li>`;
});
const featuresStr = featuresArr.join(``);

// Создаем метод map для фото
const photosMap = getRandomArrayStroke(OFFER_PHOTOS);
const photosArr = OFFER_PHOTOS.map((photosMap, i) => {
  return `<img src="${photosMap}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
});
const photosStr = photosArr.join(``);

// Создаем фрагмент с объявлением
const cardFragment = document.createDocumentFragment();
for (let j = 0; j < dataArray.length; j++) {
  const offer = dataArray[j];
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector(`.popup__title`).textContent = offer.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = offer.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${offer.offer.price}₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = TYPE_MAP[offer.offer.type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  cardElement.querySelector(`.popup__description`).textContent = offer.offer.description;
  cardElement.querySelector(`.popup__avatar`).src = offer.author.avatar;

  cardElement.querySelector(`.popup__features`).innerHTML = featuresStr;
  cardElement.querySelector(`.popup__photos`).innerHTML = photosStr;

  mapElement.insertBefore(cardElement, filtersElement);
}

filtersElement.appendChild(cardFragment);
