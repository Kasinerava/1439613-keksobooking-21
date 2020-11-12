'use strict';

(function () {
  const MAX_SIMILAR_AD_COUNT = 5;
  const similarUserTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  // Создаем фрагмент с аватаркой
  window.renderAvatars = function (data) {
    const avatarFragment = document.createDocumentFragment();
    const loopMax = data.length < MAX_SIMILAR_AD_COUNT ? data.length : MAX_SIMILAR_AD_COUNT;
    for (let j = 0; j < loopMax; j++) {
      const rentItem = data[j];
      const userElement = similarUserTemplate.cloneNode(true);
      userElement.querySelector(`img`).src = rentItem.author.avatar;
      userElement.querySelector(`img`).alt = rentItem.offer.title;

      userElement.style.left = `${rentItem.location.x - window.PIN_WIDTH / 2}px`;
      userElement.style.top = `${rentItem.location.y - window.PIN_HEIGHT}px`;
      userElement.dataset.id = j;
      avatarFragment.appendChild(userElement);
    }

    window.similarListElement.appendChild(avatarFragment);
  };


  const onSuccess = function (response) {
    window.dataArray = response;
    window.renderAvatars(response);
  };

  const onError = function (errorMessage) {
    const node = document.createElement(`div`);
    node.classList.add(`error`);
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
    setTimeout(function () {
      node.remove();
    }, 10000);
  };
  window.backend.load(onSuccess, onError);

  const filter = document.querySelector(`.map__filters`);
  const housingType = filter.querySelector(`#housing-type`);

  const removePins = function () {
    const basicPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    basicPins.forEach(function (it) {
      it.remove();
    });
  };

  function filterItemsByType(type) {
    return window.dataArray.filter((rentItem) => rentItem.offer.type === type);
  }

  housingType.addEventListener(`change`, function (evt) {
    removePins();
    window.deletePopup();
    window.renderAvatars(filterItemsByType(evt.target.value));
  });
}
)();
