'use strict';

// Определяем константы
const similarListElement = document.querySelector(`.map__pins`);
const similarUserTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const similarCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapElement = document.querySelector(`.map`);
const filtersElement = document.querySelector(`.map__filters-container`);
const adForm = document.querySelector(`.ad-form`);
const adFormFields = adForm.querySelectorAll(`fieldset`);
const adFormAddress = adForm.querySelector(`#address`);
const mapFilters = document.querySelector(`.map__filters`);
const button = similarListElement.querySelector(`.map__pin--main`);
const adFormElement = document.querySelector(`.ad-form__element`);
const guestsCapacity = adForm.querySelector(`#capacity`);
const roomsForGuests = adForm.querySelector(`#room_number`);
const formSubmit = adFormElement.querySelector(`.ad-form__submit`);

// Создаем массив данных для объявления
const USER_AVATARMIN = 1;
const USER_AVATARMAX = 8;
const OFFER_TITLE = [`Для тех, кто любит приключения`, `Только работающим и одиноким душам`, `Для бесстрашных и отважных в самом центре`, `Поселившись однажды тут, не захочется уезжать из города вовсе`];
const OFFER_PRICE = [100, 150, 500, 750, 1000];
const OFFER_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const OFFER_ROOMS = [1, 2, 3, 100];
const OFFER_GUESTS = [1, 2, 3, 0];
const OFFER_CHECKIN = [`12:00`, `13:00`, `14:00`];
const OFFER_CHECKOUT = [`12:00`, `13:00`, `14:00`];
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const OFFER_DESCRIPTION = [`Кроме вас тут живут несколько хоббитов. Они постоянно наводят порядок, поэтому у вас всегда будет светло, тепло и уютно. На глаза они не попадаются, поэтому ваше одиночество никто не потревожит`, `Чего здесь только не было: трое разбились, двое зарезали сами себя, четверо повесились и столько же отравилось. Но проклятие уже давно снято, поэтому заселяться может любой желающий. Шорохи в шкафу от соседского кота. Но на всякий случай лучше проверить`, `Тут жил экспедитор, поэтому то и дело везде лежат разные реликвии. Говорят, где-то тут спрятаны сокровища, но еще ни одни жильцы не смогли их найти. Надеюсь, вам повезет`];
const OFFER_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const LOCATION_XMIN = 0;
const LOCATION_XMAX = 1200;
const LOCATION_YMIN = 130;
const LOCATION_YMAX = 630;
const ARROW_HEIGHT = 18;
const PIN_WIDTH = 65;
const PIN_HEIGHT = 65;
const PIN_TAIL = 20;
const TYPE_MAP = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

// Параметры главной метки
const mapPin = {
  PIN_WIDTH,
  PIN_HEIGHT,
  ARROW_HEIGHT,
  BLOCK: document.querySelector(`.map__pin--main`)
};

// Фунцкия разблокировки карты
const getMapOpen = function () {
  document.querySelector(`.map`).classList.remove(`map--faded`);
};

// Переводим в неактивное состояние остальные элементы
adForm.classList.add(`ad-form--disabled`);
for (let field of adFormFields) {
  field.setAttribute(`disabled`, `disabled`);
}
mapFilters.setAttribute(`disabled`, `disabled`);

// Вычисление серидины пина
const PIN_LOCATION_X = parseInt(button.style.left) - PIN_WIDTH / 2;
const PIN_LOCATION_Y = parseInt(button.style.top) - PIN_HEIGHT / 2;

// Функция вычисления адреса
const getAddress = function () {
  adFormAddress.value = `${PIN_LOCATION_X}, ${PIN_LOCATION_Y}`;
};
getAddress();

// Функция активации полей
const getFieldsetActive = function() {
  for (let field of adFormFields) {
    field.removeAttribute(`disabled`, `disabled`);
  }
  mapFilters.removeAttribute(`disabled`, `disabled`);
}

// Валидация комнат и гостей
roomsForGuests.addEventListener(`change`, function () {
  validateRooms();
});
guestsCapacity.addEventListener(`change`, function () {
  validateRooms();
});

// Переводим по клику в активное состояние карту
button.addEventListener(`mousedown`, function (event) {
  if (event.which === 1) {
    getMapOpen();
    adFormAddress.value = `${PIN_LOCATION_X}, ${PIN_LOCATION_Y + PIN_TAIL}`;
    adForm.classList.remove(`ad-form--disabled`);
    getFieldsetActive();
  }
});

// Переводим по нажатию клавиши в активное состояние карту
button.addEventListener(`keydown`, function (event) {
  if (event.which === 13) {
    getMapOpen();
    adFormAddress.value = `${PIN_LOCATION_X}, ${PIN_LOCATION_Y + PIN_TAIL}`;
    adForm.classList.remove(`ad-form--disabled`);
    getFieldsetActive();
  }
});

// Создаем массив
const dataArray = [];
for (let i = 0; i < 8; i++) {
  const rentItem = {
    author: {
      avatar: `img/avatars/user0${getRandomInteger(USER_AVATARMIN, USER_AVATARMAX)}.png`,
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLE),
      address: `${getRandomInteger(LOCATION_YMIN, LOCATION_YMAX)} ${getRandomInteger(LOCATION_XMIN, LOCATION_XMAX)}`,
      price: getRandomArrayElement(OFFER_PRICE),
      type: getRandomArrayElement(OFFER_TYPE),
      rooms: getRandomArrayElement(OFFER_ROOMS),
      guests: getRandomArrayElement(OFFER_GUESTS),
      checkin: getRandomArrayElement(OFFER_CHECKIN),
      checkout: getRandomArrayElement(OFFER_CHECKOUT),
      features: getRandomArrayStroke(OFFER_FEATURES),
      description: getRandomArrayElement(OFFER_DESCRIPTION),
      photos: getRandomArrayStroke(OFFER_PHOTOS)
    },
    location: {
      X: getRandomInteger(LOCATION_XMIN, LOCATION_XMAX),
      Y: getRandomInteger(LOCATION_YMIN, LOCATION_YMAX)
    }
  };
  dataArray.push(rentItem);
}

// Создаем фрагмет с аватаркой
const getAvatarFragment = function () {
  const avatarFragment = document.createDocumentFragment();
  for (let j = 0; j < dataArray.length; j++) {
    const rentItem = dataArray[j];
    const userElement = similarUserTemplate.cloneNode(true);
    userElement.querySelector(`img`).src = rentItem.author.avatar;
    userElement.querySelector(`img`).alt = rentItem.offer.title;

    userElement.style.left = `${rentItem.location.X - PIN_WIDTH / 2}px`;
    userElement.style.top = `${rentItem.location.Y - PIN_HEIGHT}px`;
    avatarFragment.appendChild(userElement);
  }

  similarListElement.appendChild(avatarFragment);
};
getAvatarFragment();

// Валидация комнат
function validateRooms () {
  const guestsCapacityNumber = Number(guestsCapacity.value);
  const roomsForGuestsNumber = Number(roomsForGuests.value);

  if (guestsCapacityNumber === 1 && roomsForGuestsNumber === 100) {
    roomsForGuests.setCustomValidity(`Слишком много комнат для одного человека. Выбери поменьше`);
  } else if (guestsCapacityNumber === 2 && roomsForGuestsNumber < 2) {
    roomsForGuests.setCustomValidity(`Вы не поместитесь, выбери больше комнат`);
  } else if (guestsCapacityNumber === 2 && roomsForGuestsNumber > 3) {
    roomsForGuests.setCustomValidity(`Слишком много комнат для такого количества людей, выбери местечко поменьше`);
  } else if (guestsCapacityNumber === 3 && roomsForGuestsNumber !== 3) {
    roomsForGuests.setCustomValidity(`Вам подойдет только место с тремя комнатами`);
  } else if (guestsCapacityNumber === 0 && roomsForGuestsNumber < 100) {
    roomsForGuests.setCustomValidity(`Этот замок не для гостей`);
  } else {
    roomsForGuests.setCustomValidity(``);
  }
}
validateRooms();

// Перетаскивание главного маркера
// window.ondragstart(mapPin.BLOCK, {
//   parentBlock: document.querySelector(`.map__pins`),
//   direction: `both`,
//   outputField: adFormAddress,
//   OffsetCoord: {
//     X: mapPin.PIN_WIDTH / 2,
//     Y: mapPin.PIN_HEIGHT + mapPin.ARROW_HEIGHT
//   },
//   AvailableCoord: {
//     X: {
//       MIN: LocationData.X.MIN,
//       MAX: LocationData.X.MAX
//     },
//     Y: {
//       MIN: LocationData.Y.LOCATION_XMIN - mapPin.PIN_HEIGHT - mapPin.ARROW_HEIGHT,
//       MAX: LocationData.Y.LOCATION_XMAX - mapPin.PIN_HEIGHT - mapPin.ARROW_HEIGHT,
//     }
//   }
// });

// Создаем функцию для рандомного элемента из массива
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

// Создаем функцию рандомной строки из массива
function getRandomArrayStroke(array) {
  let arrayCopy = [...array];
  const count = getRandomInteger(0, arrayCopy.length - 1);
  const result = [];
  for (let i = 0; i <= count; i++) {
    const randomElement = getRandomArrayElement(arrayCopy);
    arrayCopy = arrayCopy.filter((element) => element !== randomElement);
    result.push(randomElement);
  }
  return result;
}

// Функция для склонения
function declOfNum(n, textForms) {
  n = Math.abs(n) % 100; let n1 = n % 10;
  if (n > 10 && n < 20) {
    return textForms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return textForms[1];
  }
  if (n1 === 1) {
    return textForms[0];
  }
  return textForms[2];
}

// Объявление
// function renderPopup(rentItem) {
//   const featuresArr = rentItem.offer.features.map((feature) => {
//     return `<li class="popup__feature popup__feature--${feature}">${feature}</li>`;
//   });
//
//   const photosArr = rentItem.offer.photos.map((photo) => {
//     return `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
//   });
//
//   const cardElement = similarCardTemplate.cloneNode(true);
//   cardElement.querySelector(`.popup__title`).textContent = rentItem.offer.title;
//   cardElement.querySelector(`.popup__text--address`).textContent = rentItem.offer.address;
//   cardElement.querySelector(`.popup__text--price`).textContent = `${rentItem.offer.price}₽/ночь`;
//   cardElement.querySelector(`.popup__type`).textContent = TYPE_MAP[rentItem.offer.type];
//   cardElement.querySelector(`.popup__text--capacity`).textContent = `${rentItem.offer.rooms} ${declOfNum(rentItem.offer.rooms, [`комната`, `комнаты`, `комнат`])} для ${rentItem.offer.guests} ${declOfNum(rentItem.offer.guests, [`гостя`, `гостей`, `гостей`])}`;
//   cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${rentItem.offer.checkin}, выезд до ${rentItem.offer.checkout}`;
//   cardElement.querySelector(`.popup__description`).textContent = rentItem.offer.description;
//   cardElement.querySelector(`.popup__avatar`).src = rentItem.author.avatar;
//
//   cardElement.querySelector(`.popup__features`).innerHTML = featuresArr.join(``);
//   cardElement.querySelector(`.popup__photos`).innerHTML = photosArr.join(``);
//
//   return cardElement;
// }
// mapElement.insertBefore(renderPopup(dataArray[0]), filtersElement);

