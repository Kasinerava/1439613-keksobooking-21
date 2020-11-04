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

  // const limits = {
  //   top: window.similarListElement.offsetTop,
  //   right: window.similarListElement.offsetWidth - 65,
  //   bottom: window.similarListElement.offsetHeight + window.similarListElement.offsetTop - pinMain.offsetHeight,
  //   left: window.similarListElement.offsetLeft
  // };

  pinMain.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // if (startCoords.x > limits.right){
      //   startCoords.x.value = limits.right;
      // }

      window.similarListElement.style.top = (window.similarListElement.offsetTop - shift.y) + `px`;
      window.similarListElement.style.left = (window.similarListElement.offsetLeft - shift.x) + `px`;
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.adFormAddress.value = `${startCoords.x}, ${startCoords.y - window.PIN_HEIGHT / 2}`;

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
