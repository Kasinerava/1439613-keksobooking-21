'use strict';

(function () {
  const similarUserTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  window.pinMain = window.similarListElement.querySelector(`.map__pin--main`);

  // Создаем фрагмент с аватаркой
  const renderAvatars = function (data) {
    const avatarFragment = document.createDocumentFragment();
    for (let j = 0; j < data.length; j++) {
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
    renderAvatars(response);
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

  const limits = {
    right: window.similarListElement.offsetWidth + window.mapElement.offsetLeft,
    left: window.mapElement.offsetLeft
  };

  window.pinMain.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const position = {
        x: moveEvt.clientX - limits.left - Math.round(window.PIN_WIDTH / 2),
        y: moveEvt.pageY - Math.round(window.PIN_HEIGHT / 2)
      };

      // если вышли за левую границу
      if (moveEvt.pageX < limits.left) {
        position.x = -Math.round(window.PIN_WIDTH / 2);
      } else if (moveEvt.pageX > limits.right) {
        position.x = window.similarListElement.offsetWidth - Math.round(window.PIN_WIDTH / 2);
      }

      // если вышли за верхнюю границу
      if (position.y < window.LOCATION_YMIN) {
        position.y = window.LOCATION_YMIN;
      } else if (position.y > window.LOCATION_YMAX) {
        position.y = window.LOCATION_YMAX;
      }

      window.pinMain.style.top = position.y + `px`;
      window.pinMain.style.left = position.x + `px`;

      window.adFormAddress.value = `${position.x + Math.round(window.PIN_WIDTH / 2)}, ${position.y + window.PIN_HEIGHT + window.PIN_TAIL}`;
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
