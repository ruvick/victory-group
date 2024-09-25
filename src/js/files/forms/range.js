import * as noUiSlider from 'nouislider';
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {
  const priceSlider1 = document.getElementById('slider-1');
  const priceInput1 = document.getElementById('price-input-1');

  const priceSlider2 = document.getElementById('slider-2');
  const priceInput2 = document.getElementById('price-input-2');

  if (priceSlider1) {
    noUiSlider.create(priceSlider1, {
      start: [4000000], 
      connect: [true, false],
      range: {
        'min': [0],
        'max': [9000000] 
      },
      step: 100000 
    });

    priceSlider1.noUiSlider.on('update', function (values) {
      priceInput1.value = formatNumber(Math.round(values[0])); 
    });

    priceInput1.addEventListener('change', function () {
      const value = parseFloat(priceInput1.value.replace(/\s+/g, '')); 
      if (!isNaN(value)) {
        priceSlider1.noUiSlider.set(value); 
      }
    });
  }

  if (priceSlider2) {
    noUiSlider.create(priceSlider2, {
      start: [6], 
      connect: [true, false],
      range: {
        'min': [6],
        'max': [96] 
      },
      step: 1 
    });

    priceSlider2.noUiSlider.on('update', function (values) {
      priceInput2.value = Math.round(values[0]); // Обновляем инпут
    });

    priceInput2.addEventListener('change', function () {
      const value = parseInt(priceInput2.value); // Преобразуем в целое число
      if (!isNaN(value)) {
        priceSlider2.noUiSlider.set(value); // Устанавливаем значение ползунка
      }
    });
  }
}

// Функция для форматирования числа с пробелами
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

rangeInit();

// Функция для инициализации кнопок
function initQuantityButtons() {
  const minusButton = document.querySelector('.quantity__button_minus');
  const plusButton = document.querySelector('.quantity__button_plus');
  const priceSlider2 = document.getElementById('slider-2');

  // Получаем текущее значение ползунка
  let currentValue = 6; 

  // Обработчик для кнопки уменьшения
  minusButton.addEventListener('click', function () {
    if (currentValue > 6) { 
      currentValue -= 1; 
      priceSlider2.noUiSlider.set(currentValue); 
    }
  });

  // Обработчик для кнопки увеличения
  plusButton.addEventListener('click', function () {
    if (currentValue < 96) { 
      currentValue += 1; 
      priceSlider2.noUiSlider.set(currentValue);
    }
  });
}

initQuantityButtons();