'use strict';

(function () {
  const similarUserTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pinMain = window.similarListElement.querySelector(`.map__pin--main`);

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

  const limits = {
    right: window.similarListElement.offsetWidth + window.mapElement.offsetLeft,
    left: window.mapElement.offsetLeft
  };

  pinMain.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    // let startCoords = {
    //   x: evt.clientX,
    //   y: evt.clientY
    // };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const position = {
        x: moveEvt.clientX - limits.left - window.PIN_WIDTH / 2,
        y: moveEvt.pageY - window.PIN_HEIGHT / 2
      };
      // если вышли за левую границу
      if (moveEvt.pageX < limits.left) {
        position.x = -window.PIN_WIDTH / 2;
      } else if (moveEvt.pageX > limits.right) {
        position.x = window.similarListElement.offsetWidth - window.PIN_WIDTH / 2;
      }

      // если вышли за верхнюю границу
      if (position.y < window.LOCATION_YMIN) {
        position.y = window.LOCATION_YMIN;
      } else if (position.y > window.LOCATION_YMAX) {
        position.y = window.LOCATION_YMAX;
      }

      pinMain.style.top = position.y + `px`;
      pinMain.style.left = position.x + `px`;

      window.adFormAddress.value = `${moveEvt.clientX - limits.left - window.PIN_WIDTH / 2}, ${moveEvt.pageY - window.PIN_HEIGHT - window.PIN_TAIL}`;
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
