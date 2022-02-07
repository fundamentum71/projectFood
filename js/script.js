window.addEventListener('DOMContentLoaded', () => {
	//табы первый урок
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	//Функция занимается скрытием табов
	function hideTabContent() {
		tabsContent.forEach((item) => {
			item.classList.add('hide');
			item.classList.remove('show');
		});
		tabs.forEach((item) => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	//timer

	const deadLine = '2022-04-26';

	function getTimeRemaining(endTime) {
		const t = Date.parse(endTime) - Date.parse(new Date()),
			//получаем часы
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((t / 1000 / 60) % 60),
			second = Math.floor((t / 1000) % 60);
		//создаем объект
		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			second: second,
		};
	}
	//функция для приписывания нулей
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else return num;
	}

	function setClock(selector, endTime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			second = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		//вызвали функцию чтобы сразу обновлось значение
		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endTime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			second.innerHTML = getZero(t.second);
			//после того как отсчет дойдет до нуля, счет остановится.
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer', deadLine);
});
