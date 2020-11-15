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

  const removePins = function () {
    const basicPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    basicPins.forEach(function (it) {
      it.remove();
    });
  };

  // Новые отфильтрованные объявления
  const renderNewAvatars = function () {
    removePins();
    window.deletePopup();
    window.renderAvatars(filterAds(window.dataArray));
  };

  // Устранение дребезга
  filter.addEventListener(`change`, function () {
    window.backend.debounce(renderNewAvatars, 500);
  });

  // Фильтр для типа жилья
  function filterItemsByType(rentItem, type) {
    if (type === `any`) {
      return true;
    } else {
      return rentItem.offer.type === type;
    }
  }

  // Фильтр для количества гостей
  function filterItemsByGuests(rentItem, guests) {
    if (guests === `any`) {
      return true;
    }
    return rentItem.offer.guests === Number(guests);
  }

  // Фильтр для цены
  function filterItemsByPrice(rentItem, price) {
    if (price === `low`) {
      return rentItem.offer.price < 10000;
    } else if (price === `middle`) {
      return rentItem.offer.price >= 10000 && rentItem.offer.price <= 50000;
    } else if (price === `high`) {
      return rentItem.offer.price > 50000;
    } else {
      return true;
    }
  }

  // Фильтр для количества комнат
  function filterItemsByRooms(rentItem, rooms) {
    if (rooms === `any`) {
      return true;
    }
    return rentItem.offer.rooms.toString() === rooms;
  }

  // Фильтр для фичей
  function filterItemsByFeatures(rentItem, features) {
    if (features.length === 0) {
      return true;
    }
    return features.every((feature) => rentItem.offer.features.includes(feature));
  }

  function filterAds(data) {
    const mapFilter = new FormData(document.querySelector(`.map__filters`));

    const type = mapFilter.get(`housing-type`);
    const price = mapFilter.get(`housing-price`);
    const rooms = mapFilter.get(`housing-rooms`);
    const guests = mapFilter.get(`housing-guests`);
    const features = mapFilter.getAll(`features`);

    const newArray = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (
        filterItemsByType(item, type) &&
        filterItemsByPrice(item, price) &&
        filterItemsByRooms(item, rooms) &&
        filterItemsByGuests(item, guests) &&
        filterItemsByFeatures(item, features)
      ) {
        newArray.push(item);
      }
      if (newArray.length === MAX_SIMILAR_AD_COUNT) {
        break;
      }
    }
    return newArray;
  }
})();
