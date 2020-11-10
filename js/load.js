'use strict';

(function () {
  window.URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;
  window.URL_SEND = `https://21.javascript.pages.academy/keksobooking`;
  window.TIMEOUT_IN_MS = 10000;


  const setup = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });
    xhr.timeout = window.TIMEOUT_IN_MS;
    return xhr;

    // xhr.open(`GET`, URL);
    // xhr.send();
  };

  const load = function (onSuccess, onError) {
    const xhr = setup(onSuccess, onError);
    xhr.open(`GET`, window.URL_LOAD);
    xhr.send();
  };

  const send = function (data, onSuccess, onError) {
    const xhr = setup(onSuccess, onError);
    xhr.open(`POST`, window.URL_SEND);
    xhr.send(data);
  };

  window.backend = {
    load,
    send
  };
})();

