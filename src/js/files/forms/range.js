import * as noUiSlider from 'nouislider';
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {
  const priceSlider1 = document.getElementById('slider-1');
  const priceInput1 = document.getElementById('price-input-1');

  const priceSlider2 = document.getElementById('slider-2');
  const priceInput2 = document.getElementById('price-input-2');

  if (priceSlider1) {
    noUiSlider.create(priceSlider1, {
      start: [4000000], // Начальное значение для первоначального взноса
      connect: [true, false],
      range: {
        'min': [0],
        'max': [9000000] // Максимальное значение для первоначального взноса
      },
      step: 100000 // Шаг
    });

    priceSlider1.noUiSlider.on('update', function (values) {
      priceInput1.value = formatNumber(Math.round(values[0])); // Обновляем инпут с форматированием
    });

    priceInput1.addEventListener('change', function () {
      const value = parseFloat(priceInput1.value.replace(/\s+/g, '')); // Убираем пробелы
      if (!isNaN(value)) {
        priceSlider1.noUiSlider.set(value); // Устанавливаем значение ползунка
      }
    });
  }

  if (priceSlider2) {
    noUiSlider.create(priceSlider2, {
      start: [6], // Начальное значение для срока кредита
      connect: [true, false],
      range: {
        'min': [6],
        'max': [96] // Максимальное значение в месяцах (8 лет)
      },
      step: 1 // Шаг в месяцах
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