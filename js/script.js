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

	function setClock(selector, endTime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			second = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			const t = getTimeRemaining(endTime);
			days.innerHTML = t.days;
			hours.innerHTML = t.hours;
			minutes.innerHTML = t.minutes;
			second.innerHTML = t.second;

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer', deadLine);

	//modal window
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalCloseBtn = document.querySelector('[data-close]');

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		//завиксируем страницу чтобы нельзя было скролить при модальном окне
		document.body.style.overflow = 'hidden';
		//если пользователь сам уже открыл окно, мы очистим интервал
		clearInterval(modalTimerId);
	}

	modalTrigger.forEach((btn) => {
		btn.addEventListener('click', openModal);
	});

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		//восстановим скрол
		document.body.style.overflow = '';
	}

	modalCloseBtn.addEventListener('click', closeModal);
	//закрытие кликом на подложку
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});
	//закрытие на ESC
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	//вызов модалки через время
	const modalTimerId = setTimeout(openModal, 5000);

	function showModalByScroll() {
		//Прокрученная часть+видимая часть которую мы прям сейчас видим на данный момент >=   полный сайт который у нас сейчас открыт (значит то что пользователь долистал до конца)
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight - 1
		) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	//вызов модалки, когда пользователь долистает до конца страници
	window.addEventListener('scroll', showModalByScroll);
});
