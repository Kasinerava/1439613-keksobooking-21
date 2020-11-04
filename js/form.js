'use strict';

(function () {
  const guestsCapacity = window.adForm.querySelector(`#capacity`);
  const roomsForGuests = window.adForm.querySelector(`#room_number`);
  const typeHouse = window.adForm.querySelector(`#type`);
  const priceFields = window.adForm.querySelector(`#price`);
  const checkIn = window.adForm.querySelector(`#timein`);
  const checkOut = window.adForm.querySelector(`#timeout`);

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
})();
