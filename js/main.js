'use strict';

(function () {
// Определяем константы
  window.similarListElement = document.querySelector(`.map__pins`);
  window.adForm = document.querySelector(`.ad-form`);
  window.adFormFields = window.adForm.querySelectorAll(`fieldset`);
  window.adFormAddress = window.adForm.querySelector(`#address`);
  window.mapFilters = document.querySelector(`.map__filters`);

  window.PIN_WIDTH = 65;
  window.PIN_HEIGHT = 65;
  window.PIN_TAIL = 20;
  window.LOCATION_YMIN = 130 - window.PIN_HEIGHT - window.PIN_TAIL;
  window.LOCATION_YMAX = 630 - window.PIN_HEIGHT - window.PIN_TAIL;

  window.setFormFieldDisabled = function () {
    for (let field of window.adFormFields) {
      field.setAttribute(`disabled`, `disabled`);
    }
  };

  // Переводим в неактивное состояние остальные элементы
  window.adForm.classList.add(`ad-form--disabled`);
  window.mapFilters.setAttribute(`disabled`, `disabled`);
  window.setFormFieldDisabled();
})();
