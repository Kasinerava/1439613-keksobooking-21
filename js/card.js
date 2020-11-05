'use strict';

window.mapElement = document.querySelector(`.map`);

(function () {
  const similarCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const filtersElement = document.querySelector(`.map__filters-container`);

  const TYPE_MAP = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  // Функция для склонения
  function declOfNum(n, textForms) {
    n = Math.abs(n) % 100; let n1 = n % 10;
    if (n > 10 && n < 20) {
      return textForms[2];
    }
    if (n1 > 1 && n1 < 5) {
      return textForms[1];
    }
    if (n1 === 1) {
      return textForms[0];
    }
    return textForms[2];
  }

  function renderPopup(rentItem) {
    const featuresArr = rentItem.offer.features.map((feature) => {
      return `<li class="popup__feature popup__feature--${feature}">${feature}</li>`;
    });

    const photosArr = rentItem.offer.photos.map((photo) => {
      return `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
    });

    const cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector(`.popup__title`).textContent = rentItem.offer.title;
    cardElement.querySelector(`.popup__text--address`).textContent = rentItem.offer.address;
    cardElement.querySelector(`.popup__text--price`).textContent = `${rentItem.offer.price}₽/ночь`;
    cardElement.querySelector(`.popup__type`).textContent = TYPE_MAP[rentItem.offer.type];
    cardElement.querySelector(`.popup__text--capacity`).textContent = `${rentItem.offer.rooms} ${declOfNum(rentItem.offer.rooms, [`комната`, `комнаты`, `комнат`])} для ${rentItem.offer.guests} ${declOfNum(rentItem.offer.guests, [`гостя`, `гостей`, `гостей`])}`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${rentItem.offer.checkin}, выезд до ${rentItem.offer.checkout}`;
    cardElement.querySelector(`.popup__description`).textContent = rentItem.offer.description;
    cardElement.querySelector(`.popup__avatar`).src = rentItem.author.avatar;

    cardElement.querySelector(`.popup__features`).innerHTML = featuresArr.join(``);
    cardElement.querySelector(`.popup__photos`).innerHTML = photosArr.join(``);

    return cardElement;
  }

  // Функция отрисовки объявления под соответсвующий аватар
  function appendPopup(popupElement) {
    window.mapElement.insertBefore(popupElement, filtersElement);
  }

  function deletePopup(popupElement) {
    window.mapElement.removeChild(popupElement);
  }

  let popupElement = null;

  const popupOpenHandler = function (evt) {
    const buttonElement = evt.target.closest(`.map__pin:not(.map__pin--main)`);
    if (buttonElement) {
      if (popupElement || evt.key === `Enter`) {
        popupElement.remove();
      }
      const newElement = window.dataArray[Number(buttonElement.dataset.id)];
      popupElement = renderPopup(newElement);
      appendPopup(popupElement);
    }
  };

  window.mapElement.addEventListener(`click`, popupOpenHandler);

  const popupCloseHandler = function (evt) {
    const buttonElement = evt.target.closest(`.popup__close`);
    if (buttonElement) {
      deletePopup(popupElement);
      popupElement = null;
    }
  };

  window.mapElement.addEventListener(`click`, popupCloseHandler);
  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape` && popupElement) {
      deletePopup(popupElement);
      popupElement = null;
    }
  });
})();
