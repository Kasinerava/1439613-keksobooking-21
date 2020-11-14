'use strict';

(function () {
  const MAX_SIMILAR_AD_COUNT = 5;
  window.similarUserTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  // Создаем фрагмент с аватаркой
  window.renderAvatars = function (data) {
    const avatarFragment = document.createDocumentFragment();
    const loopMax = data.length < MAX_SIMILAR_AD_COUNT ? data.length : MAX_SIMILAR_AD_COUNT;
    for (let j = 0; j < loopMax; j++) {
      const rentItem = data[j];
      const userElement = window.similarUserTemplate.cloneNode(true);
      userElement.querySelector(`img`).src = rentItem.author.avatar;
      userElement.querySelector(`img`).alt = rentItem.offer.title;

      userElement.style.left = `${rentItem.location.x - window.PIN_WIDTH / 2}px`;
      userElement.style.top = `${rentItem.location.y - window.PIN_HEIGHT}px`;
      userElement.dataset.id = rentItem.id;
      avatarFragment.appendChild(userElement);
    }

    window.similarListElement.appendChild(avatarFragment);
  };

  const filter = document.querySelector(`.map__filters`);
  const housingType = filter.querySelector(`#housing-type`);
  const housingPrice = filter.querySelector(`#housing-price`);
  const housingRooms = filter.querySelector(`#housing-rooms`);
  const housingGuests = filter.querySelector(`#housing-guests`);
  const housingFeatures = filter.querySelector(`#housing-features`);

  const removePins = function () {
    const basicPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    basicPins.forEach(function (it) {
      it.remove();
    });
  };

  // Фильтр для типа жилья
  function filterItemsByType(type) {
    if (type === `any`) {
      window.renderAvatars(window.dataArray);
    }
    return window.dataArray.filter((rentItem) => rentItem.offer.type === type);
  }

  // Фильтр для количества гостей
  function filterItemsByGuests(housingGuests) {
    if (housingGuests === `any`) {
      window.renderAvatars(window.dataArray);
    }
    return window.dataArray.filter((rentItem) => rentItem.offer.guests.toString() === housingGuests.value);
  }

  // Фильтр для цены
  function filterItemsByRooms(housingPrice) {
    if (housingPrice.value === `low`) {
      return window.dataArray.filter((rentItem) => rentItem.offer.price < 10000);
    } else if (housingPrice.value === `middle`) {
      return window.dataArray.filter((rentItem) => rentItem.offer.price >= 10000 && rentItem.offer.price <= 50000);
    } else if (housingPrice.value === `high`) {
      return window.dataArray.filter((rentItem) => rentItem.offer.price > 50000);
    } else {
      window.renderAvatars(window.dataArray);
    }
  }

  // Фильтр для количества комнат
  function filterItemsByRooms(housingRooms) {
    if (housingRooms === `any`) {
      window.renderAvatars(window.dataArray);
    }
    return window.dataArray.filter((rentItem) => rentItem.offer.rooms.toString() === housingRooms.value);
  }

  // Фильтр для фичей ??
  function filterItemsByFeatures(features) {
    const checkedElements = features.querySelectorAll(`input[type=checkbox]:checked`);
    return Array.from(checkedElements).every(function (element) {
      return features.offer.features.includes(element.value);
    });
  }

  filter.addEventListener(`change`, function (evt) {
    removePins();
    window.deletePopup();
    if (evt.target.value === `any`) {
      return window.renderAvatars(filterItemsByGuests(evt.target.value));
    } else {
      window.renderAvatars(filterItemsByGuests(evt.target));
    }
  });
})();
