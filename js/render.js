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

  const removePins = function () {
    const basicPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    basicPins.forEach(function (it) {
      it.remove();
    });
  };

  function filterItemsByType(type) {
    if (type === `any`) {
      window.renderAvatars(window.dataArray);
    }
    return window.dataArray.filter((rentItem) => rentItem.offer.type === type);
  }

  housingType.addEventListener(`change`, function (evt) {
    removePins();
    window.deletePopup();
    window.renderAvatars(filterItemsByType(evt.target.value));
  });
}
)();
