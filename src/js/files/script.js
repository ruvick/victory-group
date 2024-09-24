// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
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
toggleInputs.forEach(toggle => {
	toggle.addEventListener('change', updateBenefitPrice);
});