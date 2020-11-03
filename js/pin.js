'use strict';

(function () {
  const similarUserTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  // Создаем фрагмент с аватаркой
  const getAvatarFragment = function (data) {
    data = window.dataArray;
    const avatarFragment = document.createDocumentFragment();
    for (let j = 0; j < data.length; j++) {
      const rentItem = data[j];
      const userElement = similarUserTemplate.cloneNode(true);
      userElement.querySelector(`img`).src = rentItem.author.avatar;
      userElement.querySelector(`img`).alt = rentItem.offer.title;

      userElement.style.left = `${rentItem.location.X - window.PIN_WIDTH / 2}px`;
      userElement.style.top = `${rentItem.location.Y - window.PIN_HEIGHT}px`;
      userElement.dataset.id = j;
      avatarFragment.appendChild(userElement);
    }

    window.similarListElement.appendChild(avatarFragment);
  };
  getAvatarFragment(window.dataArray);
})();
