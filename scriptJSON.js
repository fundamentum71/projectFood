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

	//modal window
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');
	//modalCloseBtn = document.querySelector('[data-close]');

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

	//modalCloseBtn.addEventListener('click', closeModal);
	//закрытие кликом на подложку
	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			//кликаем на подложку или на какой то крестик, то унас закрывается модальное окно
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
			//window.removeEventListener('scroll', showModalByScroll);
		}
	}

	//вызов модалки, когда пользователь долистает до конца страници
	window.addEventListener('scroll', showModalByScroll);

	//Используем классы для карточек

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.parent = document.querySelector(parentSelector);
			this.price = price;
			//курс
			this.transfer = 27;
			this.changeToUAH();
		}
		//конвертация в гринвы
		changeToUAH() {
			this.price = +this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			element.innerHTML = `
			<div class="menu__item">
			<img src=${this.src} alt=${this.alt} />
			<h3 class="menu__item-subtitle">${this.title}</h3>
			<div class="menu__item-descr">${this.descr}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total">
					<span>${this.price}</span> грн/день
				</div>
			</div>`;
			this.parent.append(element);
		}
	}

	//const div = new MenuCard();
	//div.render ();                             //можно и так

	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		'.menu .container'
	).render();

	new MenuCard(
		'img/tabs/elite.jpg',
		'elite',
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		14,
		'.menu .container'
	).render();

	new MenuCard(
		'img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		21,
		'.menu .container'
	).render();

	//соберем данные с модального окна и с формы, и отправим на сервер

	//forms
	const forms = document.querySelectorAll('form'); //получим все формы
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо. Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...',
	};
	forms.forEach((item) => {
		postData(item);
	});

	function postData(form) {
		//функция отправки формы
		form.addEventListener('submit', (e) => {
			e.preventDefault(); //отмена стандартных действий

			//вывод сообщения пользователю
			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;
			`;
			//form.append(statusMessage);

			form.insertAdjacentElement('afterend', statusMessage); //вставляем спинер после блока с флексами

			const request = new XMLHttpRequest();
			request.open('POST', 'server.php'); //настраиваем запрос

			request.setRequestHeader('Content-type', 'application/json'); //настраиваем заголовки(что именно должно предти на сервер) здесь заголовок устанавливать не нужно
			const formData = new FormData(form); //отправка не в формате JSON//все данные которые заполнит пользователь, отправятся на сервер

			const object = {};
			formData.forEach(function (value, key) {
				object[key] = value;
			});

			const json = JSON.stringify(object);

			request.send(json); //отправка формы, которую заполнил пользователь

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					//statusMessage.textContent = message.success;
					showThanksModal(message.success);
					form.reset(); // форма очистится
					//setTimeout(() => {
					statusMessage.remove(); //удаляется текст
					//}, 2000);
				} else {
					//statusMessage.textContent = message.failure;
					showThanksModal(message.failure);
				}
			});
		});
	}

	//после отвпраки появится спинер, а когда отправка завершится появится модальное окно
	//окно благодарности, если что-то пойдет не так, так пользователю и напишем.
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('hide');
		openModal();
		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
		<div class= "modal__close" data-close>×</div>
		<div class="modal__title">${message}</div>
		</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}
});
