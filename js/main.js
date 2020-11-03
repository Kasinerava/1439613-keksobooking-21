'use strict';

// Определяем константы
window.similarListElement = document.querySelector(`.map__pins`);
window.adForm = document.querySelector(`.ad-form`);
window.adFormFields = window.adForm.querySelectorAll(`fieldset`);
window.adFormAddress = window.adForm.querySelector(`#address`);
window.mapFilters = document.querySelector(`.map__filters`);

// Создаем массив данных для объявления
const USER_AVATARMIN = 1;
const USER_AVATARMAX = 8;
const OFFER_TITLE = [`Для тех, кто любит приключения`, `Только работающим и одиноким душам`, `Для бесстрашных и отважных в самом центре`, `Поселившись однажды тут, не захочется уезжать из города вовсе`];
const OFFER_PRICE = [100, 150, 500, 750, 1000];
const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const OFFER_ROOMS = [1, 2, 3, 100];
const OFFER_GUESTS = [1, 2, 3, 0];
const OFFER_CHECKIN = [`12:00`, `13:00`, `14:00`];
const OFFER_CHECKOUT = [`12:00`, `13:00`, `14:00`];
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const OFFER_DESCRIPTION = [`Кроме вас тут живут несколько хоббитов. Они постоянно наводят порядок, поэтому у вас всегда будет светло, тепло и уютно. На глаза они не попадаются, поэтому ваше одиночество никто не потревожит`, `Чего здесь только не было: трое разбились, двое зарезали сами себя, четверо повесились и столько же отравилось. Но проклятие уже давно снято, поэтому заселяться может любой желающий. Шорохи в шкафу от соседского кота. Но на всякий случай лучше проверить`, `Тут жил экспедитор, поэтому то и дело везде лежат разные реликвии. Говорят, где-то тут спрятаны сокровища, но еще ни одни жильцы не смогли их найти. Надеюсь, вам повезет`];
const OFFER_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const LOCATION_XMIN = 0;
const LOCATION_XMAX = 1200;
const LOCATION_YMIN = 130;
const LOCATION_YMAX = 630;

// Переводим в неактивное состояние остальные элементы
window.adForm.classList.add(`ad-form--disabled`);
for (let field of window.adFormFields) {
  field.setAttribute(`disabled`, `disabled`);
}
window.mapFilters.setAttribute(`disabled`, `disabled`);

// Создаем массив
window.dataArray = [];
for (let i = 0; i < 8; i++) {
  const rentItem = {
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
  window.dataArray.push(rentItem);
}

// Создаем функцию для рандомного элемента из массива
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

// Создаем функцию рандомной строки из массива
function getRandomArrayStroke(array) {
  let arrayCopy = [...array];
  const count = getRandomInteger(0, arrayCopy.length - 1);
  const result = [];
  for (let i = 0; i <= count; i++) {
    const randomElement = getRandomArrayElement(arrayCopy);
    arrayCopy = arrayCopy.filter((element) => element !== randomElement);
    result.push(randomElement);
  }
  return result;
}
