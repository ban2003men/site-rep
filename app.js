let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let item = "";
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Загрузка корзины из localStorage

let cartItemsElement = document.getElementById('cart-items');

// Функция для обновления корзины на экране и в localStorage
function updateCart() {
    cartItemsElement.innerHTML = ''; // Очищаем текущие элементы корзины
    cart.forEach((cartItem) => {
        let li = document.createElement('li');
        li.textContent = `Товар ${cartItem}`;
        cartItemsElement.appendChild(li);
    });
    localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем корзину в localStorage
}

// Функция для очистки корзины
function clearCart() {
    cart = []; // Очищаем массив корзины
    localStorage.removeItem('cart'); // Удаляем данные корзины из localStorage
    cartItemsElement.innerHTML = ''; // Очищаем отображаемую корзину
    tg.MainButton.hide(); // Скрываем основную кнопку
    console.log("Корзина очищена");
}

// Обработчик события закрытия приложения
Telegram.WebApp.onEvent("close", function() {
    clearCart(); // Очищаем корзину при закрытии приложения
});

// Подписываемся на событие закрытия приложения
window.addEventListener('beforeunload', function() {
    clearCart(); // Очищаем корзину при закрытии вкладки браузера или приложения
});

// Функция для добавления товаров в корзину
function addItemToCart(itemNumber) {
    cart.push(itemNumber); // Добавляем товар в корзину
    updateCart(); // Обновляем корзину на экране
}

// Пример работы кнопок
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5 = document.getElementById("btn5");
let btn6 = document.getElementById("btn6");

// Обработчики кнопок выбора товара
btn1.addEventListener("click", function() {
    item = "1";
    tg.MainButton.setText("Вы выбрали товар 1!");
    tg.MainButton.show();
    addItemToCart(item); // Добавляем товар в корзину
});

btn2.addEventListener("click", function() {
    item = "2";
    tg.MainButton.setText("Вы выбрали товар 2!");
    tg.MainButton.show();
    addItemToCart(item);
});

btn3.addEventListener("click", function() {
    item = "3";
    tg.MainButton.setText("Вы выбрали товар 3!");
    tg.MainButton.show();
    addItemToCart(item);
});

btn4.addEventListener("click", function() {
    item = "4";
    tg.MainButton.setText("Вы выбрали товар 4!");
    tg.MainButton.show();
    addItemToCart(item);
});

btn5.addEventListener("click", function() {
    item = "5";
    tg.MainButton.setText("Вы выбрали товар 5!");
    tg.MainButton.show();
    addItemToCart(item);
});

btn6.addEventListener("click", function() {
    item = "6";
    tg.MainButton.setText("Вы выбрали товар 6!");
    tg.MainButton.show();
    addItemToCart(item);
});

// Событие для отправки данных о выбранном товаре
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.sendData(item);
});

// Отображаем информацию о пользователе
let usercard = document.getElementById("usercard");

let p = document.createElement("p");

p.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;

usercard.appendChild(p);

// Обновляем корзину при загрузке страницы (если что-то было в localStorage)
updateCart();









