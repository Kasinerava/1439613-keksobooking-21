'use strict';

(function () {
  const MAX_SIMILAR_AD_COUNT = 5;
  const similarUserTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  // Создаем фрагмент с аватаркой
  window.renderAvatars = function (data) {
    const avatarFragment = document.createDocumentFragment();
    for (let j = 0; j < MAX_SIMILAR_AD_COUNT; j++) {
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

  // let items = [];
  let typeHousing = `flat`;

  function filterItemsByType(type) {
    return window.dataArray.filter((rentItem) => rentItem.offer.type === typeHousing);
  }

  housingType.addEventListener(`click`, function (evt) {
    const type = housingType.value;
    this.value = type;
    // typeHousing = type;
    window.renderAvatars(filterItemsByType(evt.target.value));
  });

  // function filterItemsByType () {
  //   const sameTypeHousing = window.dataArray.filter(function (data) {
  //     return rentItem.offer.type === typeHousing;
  //   });
  //   window.renderAvatars(sameTypeHousing);
  // }
  //
  // housingType.addEventListener(`click`, function (evt) {
  //   const type = housingType.value;
  //   this.value = type;
  //   filterItemsByType();
  // });


})();
