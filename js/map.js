'use strict';

window.PIN_WIDTH = 65;
window.PIN_HEIGHT = 65;

(function () {
  const button = window.similarListElement.querySelector(`.map__pin--main`);
  const PIN_TAIL = 20;
  const PIN_LOCATION_X = parseInt(button.style.left, 10) - window.PIN_WIDTH / 2;
  const PIN_LOCATION_Y = parseInt(button.style.top, 10) - window.PIN_HEIGHT / 2;

  // Функция вычисления адреса
  const getAddress = function () {
    window.adFormAddress.value = `${PIN_LOCATION_X}, ${PIN_LOCATION_Y}`;
  };
  getAddress();

  // Фунцкия разблокировки карты
  const getMapOpen = function () {
    document.querySelector(`.map`).classList.remove(`map--faded`);
  };

  // Функция активации полей
  const getFieldsetActive = function () {
    for (let field of window.adFormFields) {
      field.removeAttribute(`disabled`, `disabled`);
    }
    window.mapFilters.removeAttribute(`disabled`, `disabled`);
  };

  // Переводим по клику в активное состояние карту
  button.addEventListener(`mousedown`, function (event) {
    if (event.which === 1) {
      getMapOpen();
      window.adFormAddress.value = `${PIN_LOCATION_X}, ${PIN_LOCATION_Y + PIN_TAIL}`;
      window.adForm.classList.remove(`ad-form--disabled`);
      getFieldsetActive();
    }
  });

  // Переводим по нажатию клавиши в активное состояние карту
  button.addEventListener(`keydown`, function (event) {
    if (event.which === 13) {
      getMapOpen();
      window.adFormAddress.value = `${PIN_LOCATION_X}, ${PIN_LOCATION_Y + PIN_TAIL}`;
      window.adForm.classList.remove(`ad-form--disabled`);
      getFieldsetActive();
    }
  });
})();
