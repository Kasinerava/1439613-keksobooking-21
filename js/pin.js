'use strict';

(function () {
  const similarUserTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pinMain = window.similarListElement.querySelector(`.map__pin--main`);
  // const MAX_SIMILAR_AVATARS = 8;

  // Создаем фрагмент с аватаркой
  const renderAvatars = function (data) {
    // data = window.dataArray;
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
  // renderAvatars(window.dataArray);

  const onSuccess = function (response) {
    // console.log(response);
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

  window.load(onSuccess, onError);

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
        x: moveEvt.clientX - limits.left - Math.round(window.PIN_WIDTH / 2),
        y: moveEvt.pageY - Math.round(window.PIN_HEIGHT / 2)
      };
      window.adFormAddress.value = `${moveEvt.clientX - limits.left - Math.round(window.PIN_WIDTH / 2)}, ${moveEvt.pageY - Math.round(window.PIN_HEIGHT) - Math.round(window.PIN_TAIL)}`;

      // если вышли за левую границу
      if (moveEvt.pageX < limits.left) {
        position.x = -Math.round(window.PIN_WIDTH / 2);
        window.adFormAddress.value = `${position.x}, ${moveEvt.pageY - Math.round(window.PIN_HEIGHT) - Math.round(window.PIN_TAIL)}`;
      } else if (moveEvt.pageX > limits.right) {
        position.x = window.similarListElement.offsetWidth - Math.round(window.PIN_WIDTH / 2);
        window.adFormAddress.value = `${position.x}, ${moveEvt.pageY - Math.round(window.PIN_HEIGHT) - Math.round(window.PIN_TAIL)}`;
      }

      // если вышли за верхнюю границу
      if (position.y < window.LOCATION_YMIN) {
        position.y = window.LOCATION_YMIN;
        window.adFormAddress.value = `${position.x}, ${position.y - window.PIN_HEIGHT - window.PIN_TAIL}`;
      } else if (position.y > window.LOCATION_YMAX) {
        position.y = window.LOCATION_YMAX;
        window.adFormAddress.value = `${position.x}, ${position.y}`;
      }

      pinMain.style.top = position.y + `px`;
      pinMain.style.left = position.x + `px`;


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
