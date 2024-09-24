/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation,Pagination } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
	//BildSlider
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
	if (sliders) {
		sliders.forEach(slider => {
			slider.parentElement.classList.add('swiper');
			slider.classList.add('swiper-wrapper');
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide');
			}
		});
	}
}
// Инициализация слайдеров
function initSliders() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	// Перечень слайдеров
	if (document.querySelector('.slider-product')) {
		const swiper = new Swiper('.slider-product', {
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			autoHeight: true,
			speed: 1000,
			on: {
				slideChange: function() {
					// Обновляем состояние кнопок при смене слайда
					updateRadioButtons(this.activeIndex);
				}
			}
		});
	
		const radioButtons = document.querySelectorAll('.control-btn__input');
	
		// Обработчик клика на кнопки
		radioButtons.forEach((button, index) => {
			button.addEventListener('change', () => {
				if (button.checked) {
					swiper.slideTo(index); // Переключаем слайд при выборе кнопки
				}
			});
		});
	
		// Функция для обновления состояния кнопок
		function updateRadioButtons(activeIndex) {
			radioButtons.forEach((button, index) => {
				button.checked = index === activeIndex; // Устанавливаем checked для активного слайда
			});
		}
	}

	const comparisonSlider = document.querySelector('.comparison__slider');
	const itemEquipmentSliders = document.querySelectorAll('.item-equipment__slider');
	
	if (comparisonSlider) {
		const swiperComparison = new Swiper(comparisonSlider, {
			modules: [Navigation, Pagination],
			slidesPerView: 4,
			spaceBetween: 12,
			speed: 1000,
			navigation: {
				nextEl: '.comparison__arrow-prev',
				prevEl: '.comparison__arrow-next',
			},
			on: {
				slideChange() {
					// Получаем индекс активного слайда в comparisonSlider
					const activeIndex = this.activeIndex;
	
					// Перемещаем все itemEquipmentSliders на тот же индекс
					itemEquipmentSliders.forEach(slider => {
						if (slider.swiper) {
							slider.swiper.slideTo(activeIndex);
						}
					});
				}
			}
		});
	
		// Инициализируем каждый из item-equipment__slider
		itemEquipmentSliders.forEach(slider => {
			new Swiper(slider, {
				modules: [Navigation, Pagination],
				slidesPerView: 4,
				spaceBetween: 12,
				speed: 1000,
				allowTouchMove: false,
			});
		});
	}

}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});