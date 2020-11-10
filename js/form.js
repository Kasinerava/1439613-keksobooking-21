'use strict';

(function () {
  const guestsCapacity = window.adForm.querySelector(`#capacity`);
  const roomsForGuests = window.adForm.querySelector(`#room_number`);
  const typeHouse = window.adForm.querySelector(`#type`);
  const priceFields = window.adForm.querySelector(`#price`);
  const checkIn = window.adForm.querySelector(`#timein`);
  const checkOut = window.adForm.querySelector(`#timeout`);
  const notice = document.querySelector(`.notice`);
  const adForm = notice.querySelector(`.ad-form`);
  const resetButton = adForm.querySelector(`.ad-form__reset`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const successPopup = successTemplate.cloneNode(true);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorPopup = errorTemplate.cloneNode(true);
  const errorButton = errorPopup.querySelector(`.error__button`);
  const filterCheckboxes = document.querySelectorAll(`input[type=checkbox]`);

  const FLAT_INDEX = 1;
  const BUNGALOW_INDEX = 0;
  const HOUSE_INDEX = 2;
  const PALACE_INDEX = 3;

  const BUNGALOW_MIN_PRICE = 0;
  const FLAT_MIN_PRICE = 1000;
  const HOUSE_MIN_PRICE = 5000;
  const PALACE_MIN_PRICE = 10000;

  const MAX_PRICE = 1000000;

  // Валидация комнат и гостей
  roomsForGuests.addEventListener(`change`, function () {
    validateRooms();
  });
  guestsCapacity.addEventListener(`change`, function () {
    validateRooms();
  });

  // Валидация комнат
  function validateRooms() {
    const guestsCapacityNumber = Number(guestsCapacity.value);
    const roomsForGuestsNumber = Number(roomsForGuests.value);

    if (guestsCapacityNumber === 1 && roomsForGuestsNumber === 100) {
      roomsForGuests.setCustomValidity(`Слишком много комнат для одного человека. Выбери поменьше`);
    } else if (guestsCapacityNumber === 2 && roomsForGuestsNumber < 2) {
      roomsForGuests.setCustomValidity(`Вы не поместитесь, выбери больше комнат`);
    } else if (guestsCapacityNumber === 2 && roomsForGuestsNumber > 3) {
      roomsForGuests.setCustomValidity(`Слишком много комнат для такого количества людей, выбери местечко поменьше`);
    } else if (guestsCapacityNumber === 3 && roomsForGuestsNumber !== 3) {
      roomsForGuests.setCustomValidity(`Вам подойдет только место с тремя комнатами`);
    } else if (guestsCapacityNumber === 0 && roomsForGuestsNumber < 100) {
      roomsForGuests.setCustomValidity(`Этот замок не для гостей`);
    } else {
      roomsForGuests.setCustomValidity(``);
    }
  }

  validateRooms();

  // Установление минимальной цены при выбранном типе жилья
  const priceChangeHandler = function () {
    if (typeHouse.selectedIndex === BUNGALOW_INDEX) {
      priceFields.setAttribute(`min`, String(BUNGALOW_MIN_PRICE));
      priceFields.placeholder = `0`;
    }
    if (typeHouse.selectedIndex === FLAT_INDEX) {
      priceFields.setAttribute(`min`, String(FLAT_MIN_PRICE));
      priceFields.placeholder = `1 000`;
    }
    if (typeHouse.selectedIndex === HOUSE_INDEX) {
      priceFields.setAttribute(`min`, String(HOUSE_MIN_PRICE));
      priceFields.placeholder = `5 000`;
    }
    if (typeHouse.selectedIndex === PALACE_INDEX) {
      priceFields.setAttribute(`min`, String(PALACE_MIN_PRICE));
      priceFields.placeholder = `10 000`;
    }
  };
  typeHouse.addEventListener(`input`, priceChangeHandler);

  // Установление максимальной цены за ночь
  priceFields.setAttribute(`max`, String(MAX_PRICE));
  priceFields.addEventListener(`input`, function (evt) {
    const target = evt.target;
    if (target.value > MAX_PRICE) {
      target.setCustomValidity(`Невозможно установить цену больше, чем ` + MAX_PRICE);
    } else {
      target.setCustomValidity(``);
    }
  });

  // Синхронизация времени въезда и выезда
  checkIn.addEventListener(`change`, function (evt) {
    checkOut.value = evt.target.value;
  });
  checkOut.addEventListener(`change`, function (evt) {
    checkIn.value = evt.target.value;
  });

  // Сброс после успешного заполнения формы
  const resetForm = function () {
    filterCheckboxes.forEach(function (element) {
      if (element.checked) {
        element.checked = false;
      }
    });

    adForm.reset();

    document.querySelector(`.map`).classList.add(`map--faded`);
    window.adForm.classList.add(`ad-form--disabled`);
    guestsCapacity.selectedIndex = 0;
    roomsForGuests.selectedIndex = 0;
    checkIn.selectedIndex = 0;
    checkOut.selectedIndex = 0;

    resetMainPin();
    window.deletePopup();
  };

  const successHandler = function () {
    window.mapElement.appendChild(successPopup);
    resetForm();
  };

  // Возвращение пина на свое место
  const resetMainPin = function () {
    window.pinMain.style.top = 375 + `px`;
    window.pinMain.style.left = 570 + `px`;
    window.adFormAddress.value = `${570 - Math.round(window.PIN_WIDTH / 2)}, ${375 - Math.round(window.PIN_HEIGHT / 2)}`;
  };

  // Удалить окно успешной загрузки
  const removeSuccessPopup = function () {
    if (window.mapElement.contains(successPopup)) {
      window.mapElement.removeChild(successPopup);
    }
  };

  // Удалить окно ошибки
  const removeErrorPopup = function () {
    if (window.mapElement.contains(errorPopup)) {
      window.mapElement.removeChild(errorPopup);
    }
  };

  document.addEventListener(`click`, function () {
    if (window.mapElement.contains(successPopup)) {
      removeSuccessPopup();
      resetForm();
    }
  });

  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape` && window.mapElement.contains(successPopup)) {
      removeSuccessPopup();
      resetForm();
    }
  });

  // Окно ошибки
  const errorHandler = function () {
    window.mapElement.appendChild(errorPopup);
  };

  errorButton.addEventListener(`click`, function () {
    if (window.mapElement.contains(errorPopup)) {
      removeErrorPopup();
      resetForm();
    }
  });

  document.addEventListener(`click`, function () {
    if (window.mapElement.contains(errorPopup)) {
      removeErrorPopup();
      resetForm();
    }
  });

  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape` && window.mapElement.contains(errorPopup)) {
      removeErrorPopup();
      resetForm();
    }
  });

  resetButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    resetForm();
  });

  resetButton.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape` && window.mapElement.contains(successPopup)) {
      resetForm();
    }
  });

  adForm.addEventListener(`submit`, function (evt) {
    window.backend.send(new FormData(adForm), successHandler, errorHandler);
    evt.preventDefault();
  });
})();
