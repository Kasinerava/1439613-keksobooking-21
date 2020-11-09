'use strict';

(function () {
// Определяем константы
  window.similarListElement = document.querySelector(`.map__pins`);
  window.adForm = document.querySelector(`.ad-form`);
  window.adFormFields = window.adForm.querySelectorAll(`fieldset`);
  window.adFormAddress = window.adForm.querySelector(`#address`);
  window.mapFilters = document.querySelector(`.map__filters`);

  window.PIN_WIDTH = 65;
  window.PIN_HEIGHT = 65;
  window.PIN_TAIL = 20;
  window.LOCATION_YMIN = 130 - window.PIN_HEIGHT - window.PIN_TAIL;
  window.LOCATION_YMAX = 630 - window.PIN_HEIGHT - window.PIN_TAIL;

  // Создаем массив данных для объявления
  // const LOCATION_XMIN = 0;
  // const LOCATION_XMAX = 1200;

  // Переводим в неактивное состояние остальные элементы
  window.adForm.classList.add(`ad-form--disabled`);
  for (let field of window.adFormFields) {
    field.setAttribute(`disabled`, `disabled`);
  }
  window.mapFilters.setAttribute(`disabled`, `disabled`);
})();

// Создаем массив
// window.dataArray = [];
// for (let i = 0; i < 8; i++) {
//   const rentItem = {
//     author: {
//       avatar: `img/avatars/user0${getRandomInteger(USER_AVATARMIN, USER_AVATARMAX)}.png`,
//     },
//     offer: {
//       title: getRandomArrayElement(OFFER_TITLE),
//       address: `${getRandomInteger(window.LOCATION_YMIN, window.LOCATION_YMAX)} ${getRandomInteger(LOCATION_XMIN, LOCATION_XMAX)}`,
//       price: getRandomArrayElement(OFFER_PRICE),
//       type: getRandomArrayElement(OFFER_TYPE),
//       rooms: getRandomArrayElement(OFFER_ROOMS),
//       guests: getRandomArrayElement(OFFER_GUESTS),
//       checkin: getRandomArrayElement(OFFER_CHECKIN),
//       checkout: getRandomArrayElement(OFFER_CHECKOUT),
//       features: getRandomArrayStroke(OFFER_FEATURES),
//       description: getRandomArrayElement(OFFER_DESCRIPTION),
//       photos: getRandomArrayStroke(OFFER_PHOTOS)
//     },
//     location: {
//       X: getRandomInteger(LOCATION_XMIN, LOCATION_XMAX),
//       Y: getRandomInteger(window.LOCATION_YMIN, window.LOCATION_YMAX)
//     }
//   };
//   window.dataArray.push(rentItem);
// }

// Создаем функцию для рандомного элемента из массива
// function getRandomInteger(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
//
// function getRandomArrayElement(array) {
//   return array[getRandomInteger(0, array.length - 1)];
// }

// Создаем функцию рандомной строки из массива
// function getRandomArrayStroke(array) {
//   let arrayCopy = [...array];
//   const count = getRandomInteger(0, arrayCopy.length - 1);
//   const result = [];
//   for (let i = 0; i <= count; i++) {
//     const randomElement = getRandomArrayElement(arrayCopy);
//     arrayCopy = arrayCopy.filter((element) => element !== randomElement);
//     result.push(randomElement);
//   }
//   return result;
// }
