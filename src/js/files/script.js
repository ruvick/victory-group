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
		if (this.checked) {
			parentItem.classList.add('_active');
		} else {
			parentItem.classList.remove('_active');
		}
	});
});