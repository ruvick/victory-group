// Импорт функционала
import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";

// Активация Toggle
const toggles = document.querySelectorAll('.switch-block__input');

// Добавляем обработчик события для каждого переключателя
toggles.forEach(toggle => {
  toggle.addEventListener('change', function() {
    // Находим родительский элемент с классом item-actions-product
    const parentItem = this.closest('.item-actions-product');

    // Проверяем состояние переключателя и добавляем/удаляем класс _active
    parentItem.classList.toggle('_active', this.checked);
  });
});

//========================================================================================================================================================

const toggleInputs = document.querySelectorAll('.switch-block__input');
const benefitPriceElement = document.querySelector('.benefit-product__price');
const totalPriceElement = document.querySelector('.result-product__total'); // Получаем элемент с общей ценой
const startPriceElement = document.querySelector('.result-product__start'); // Получаем элемент, куда будем записывать итоговую цену

// Функция для обновления цены выгоды
function updateBenefitPrice() {
  const totalDiscount = [...toggleInputs].filter(toggle => toggle.checked).reduce((acc, toggle) => {
    const itemActionsProduct = toggle.closest('.item-actions-product');
    const priceText = itemActionsProduct.querySelector('.item-actions-product__price').textContent;
    const priceValue = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
    return acc + priceValue;
  }, 0);

  // Форматируем число с пробелами
  benefitPriceElement.textContent = `${totalDiscount.toLocaleString('ru-RU')} ₽`;
}

// Функция для обновления стартовой цены
function updateStartPrice() {
    // Получаем фиксированную цену из блока result-product__total
    const totalPriceText = totalPriceElement.textContent.match(/от ([\d\s]+) ₽/);
    const totalPrice = totalPriceText ? parseInt(totalPriceText[1].replace(/\s/g, ''), 10) : 0;

    // Получаем цену со скидкой из блока benefit-product__price
    const benefitPriceText = benefitPriceElement.textContent.replace(/[^0-9]/g, '');
    const benefitPrice = parseInt(benefitPriceText, 10) || 0;

    // Вычисляем итоговую цену
    const finalPrice = totalPrice - benefitPrice;

    // Обновляем значение в блоке result-product__start
    startPriceElement.textContent = `от ${finalPrice.toLocaleString('ru-RU')} ₽`;
}

// Обработчик событий для переключателей
toggleInputs.forEach(toggle => {
  toggle.addEventListener('change', () => {
      updateBenefitPrice(); // Обновляем цену со скидкой
      updateStartPrice(); // Обновляем итоговую цену
  });
});

// Также вызываем функции при инициализации
updateBenefitPrice();
updateStartPrice();