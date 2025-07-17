/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation } from 'swiper';
/*
Основные модули слайдера:
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

// Список слайдеров

//Навигация категории
if (document.querySelector('.navigation-category__slider')) {
	const swiperCategory = new Swiper('.navigation-category__slider', {
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		spaceBetween: 5,
		speed: 800,
		watchOverflow: true,
		navigation: {
			prevEl: '.navigation-category__arrow-prev',
			nextEl: '.navigation-category__arrow-next',
		},
		// Брейкпоинты
		breakpoints: {
			0: {
				spaceBetween: 3,
			},
			480: {
				spaceBetween: 5,
			},
		},
		on: {
			init: function () {
				updateSliderShadow(this);
			},
			slideChange: function () {
				updateSliderShadow(this);
			},
			transitionEnd: function () {
				updateSliderShadow(this);
			},
			resize: function () {
				updateSliderShadow(this);
			}
		}
	});

	function updateSliderShadow(swiper) {
		const isEnd = swiper.isEnd;
		const slider = swiper.el;

		if (isEnd) {
			slider.classList.add('_end');
		} else {
			slider.classList.remove('_end');
		}
	}
}

//Категории
if (document.querySelector('.category__slider')) {
	const category = new Swiper('.category__slider', {
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 5,
		spaceBetween: 18,
		speed: 800,
		watchOverflow: true,
		navigation: {
			prevEl: '.category__arrow-prev',
			nextEl: '.category__arrow-next',
		},
		// Брейкпоинты
		breakpoints: {
			0: {
				slidesPerView: 1.1,
			},
			480: {
				slidesPerView: 1.5,
			},
			550: {
				slidesPerView: 2.2,
			},
			767.98: {
				slidesPerView: 3.2,
			},
			991.98: {
				slidesPerView: 3.5,
			},
			1400: {
				slidesPerView: 5,
			},
		},
		on: {
		}
	});

	document.addEventListener('click', function (e) {
		// Проверяем, что клик был по кнопке .category__close или её SVG
		if (e.target.closest('.category__close')) {
			const slide = e.target.closest('.swiper-slide');
			const sliderWrapper = slide?.closest('.swiper-wrapper');
			const categoryBody = slide?.closest('.category__body'); // или другой селектор

			if (slide) {
				slide.remove(); // Удаляем слайд

				// Если у вас есть экземпляр Swiper, обновите его
				if (window.category) {
					window.category.update();
				}

				// Проверяем, остались ли слайды
				if (sliderWrapper && sliderWrapper.querySelectorAll('.swiper-slide').length === 0) {
					// Удаляем родительский блок, например .category__body
					if (categoryBody) {
						categoryBody.remove();
					}
				}
			}
		};
	});
}

//Пост
document.querySelectorAll('.post__slider').forEach(sliderElement => {
	const post = new Swiper(sliderElement, {
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 2.6,
		spaceBetween: 15,
		speed: 800,
		watchOverflow: true,
		navigation: {
			prevEl: sliderElement.closest('.post__sliders')?.querySelector('.post__arrow-prev'),
			nextEl: sliderElement.closest('.post__sliders')?.querySelector('.post__arrow-next'),
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			479.98: {
				slidesPerView: 1.5,
				spaceBetween: 15,
			},
			550: {
				slidesPerView: 2.1,
				spaceBetween: 15,
			},
			767.98: {
				slidesPerView: 2.6,
				spaceBetween: 15,
			},
		},
		on: {
			init: function () {
				this.update();
			},
		}
	});
});

//Фильтр
document.querySelectorAll('.navigation-category__slide').forEach(link => {
	link.addEventListener('click', function (e) {
		e.preventDefault();

		const filter = this.getAttribute('data-filter');

		// Удаляем active у всех ссылок и добавляем текущей
		document.querySelectorAll('.navigation-category__slide').forEach(el => el.classList.remove('_active'));
		this.classList.add('_active');

		// Фильтруем .category__slide
		document.querySelectorAll('.category__slide').forEach(slide => {
			const category = slide.getAttribute('data-category');
			slide.classList.toggle('_hide', filter !== 'all' && category !== filter);
		});

		// Фильтруем .posts__post
		document.querySelectorAll('.posts__post').forEach(post => {
			const category = post.getAttribute('data-category');
			post.classList.toggle('_hide', filter !== 'all' && category !== filter);
		});

		// Обновляем все Swiper-слайдеры
		if (window.categorySwiper) categorySwiper.update();
		if (window.postSwiper) postSwiper.update();
	});
});
