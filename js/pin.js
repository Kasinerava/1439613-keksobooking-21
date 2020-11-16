'use strict';

(function () {
  window.pinMain = window.similarListElement.querySelector(`.map__pin--main`);
  window.shouldLoadData = true;

  function calculateLimits() {
    return {
      right: window.similarListElement.offsetWidth + window.mapElement.offsetLeft,
      left: window.mapElement.offsetLeft
    };
  }

  window.pinMain.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    const limits = calculateLimits();

    const onSuccess = function (response) {
      for (let i = 0; i < response.length; i++) {
        response[i].id = i;
      }
      window.dataArray = response;
      window.renderAvatars(response);
    };

    const onError = function (errorMessage) {
      const node = document.createElement(`div`);
      node.classList.add(`error`);
      node.textContent = errorMessage;
      node.style.color = `#fff`;
      window.shouldLoadData = true;
      document.body.insertAdjacentElement(`afterbegin`, node);
      setTimeout(function () {
        node.remove();
      }, 10000);
    };

    if (window.shouldLoadData) {
      window.shouldLoadData = false;
      window.backend.load(onSuccess, onError);
    }

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
