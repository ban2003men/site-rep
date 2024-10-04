let isOrderPlaced = false;

// Обработка формы адреса
document.getElementById('address-form2').addEventListener('submit', function(event) {
    event.preventDefault();
    const street = document.getElementById('street').value.trim();
    const entrance = document.getElementById('entrance').value.trim();
    const apartment = document.getElementById('apartment').value.trim();
    const floor = document.getElementById('floor').value.trim();

    if (!street || !entrance || !apartment || !floor) {
        document.getElementById('error-message').textContent = 'Пожалуйста, заполните все обязательные поля: Улица, Подъезд, Квартира, Этаж.';
        document.getElementById('error-modal').style.display = 'block';
        return;
    }

    const intercom = document.getElementById('intercom').value.trim();
    const comment = document.getElementById('comment').value.trim();
    const deliveryAddress = `Улица: ${street}, Подъезд: ${entrance}, Этаж: ${floor}, Квартира: ${apartment}, Домофон: ${intercom}, Комментарий: ${comment}`;

    document.getElementById('address-modal2').style.display = 'none';
    document.getElementById('view-order-button').click();

    const cartItemsElement = document.getElementById('cart-items');
    const addressElement = document.createElement('li');
    addressElement.textContent = `Адрес доставки: ${deliveryAddress}`;
    cartItemsElement.appendChild(addressElement);

    document.getElementById('address-form2').reset();
    document.getElementById('checkout-button').textContent = 'Оплатить';
    isOrderPlaced = true;
});

document.getElementById('checkout-button').addEventListener('click', function() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (!savedCart || savedCart.length === 0) {
        alert('Ваша корзина пуста. Пожалуйста, добавьте товары в корзину перед оформлением заказа.');
        return;
    }

    // if (!isOrderPlaced) {
    //     alert('Пожалуйста, оформите заказ перед оплатой.');
    //     return;
    // }

    if (isOrderPlaced) {
        document.getElementById('cart-items').innerHTML = '';
        localStorage.removeItem('cart');
        localStorage.setItem('orderSuccess', 'true');
        window.location.href = 'index.html';
        isOrderPlaced = false;
        this.textContent = 'Оформить заказ';
    }
});

document.getElementById('cart-items').innerHTML = '';
document.querySelector('.close-error-modal').addEventListener('click', function() {
    document.getElementById('error-modal').style.display = 'none';
});

document.getElementById('address-modal2').style.display = 'none';

document.addEventListener('DOMContentLoaded', function () {

    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const orderSummaryElement = document.getElementById('order-summary');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach((item) => {
            total += item.price * item.quantity;
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price} ₽ x ${item.quantity}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Удалить';
            removeButton.onclick = () => {
                cart.splice(cart.indexOf(item), 1);
                updateCart();
                updateBadge(item.name);
            };
            li.appendChild(removeButton);
            cartItemsElement.appendChild(li);
        });

        cartTotalElement.textContent = `${total} ₽`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateBadge(itemName) {
        const itemCards = document.querySelectorAll('.item-card');
        itemCards.forEach(card => {
            if (card.querySelector('h3').textContent === itemName) {
                const badge = card.querySelector('.item-quantity-badge');
                const cartItem = cart.find(item => item.name === itemName);
                const quantity = cartItem ? cartItem.quantity : 0;

                if (quantity > 0) {
                    badge.textContent = quantity;
                    badge.style.display = 'flex';
                } else {
                    badge.style.display = 'none';
                }

                const decreaseButton = card.querySelector('.item-controls');
                decreaseButton.style.display = quantity > 0 ? 'flex' : 'none';
            }
        });
    }

    function updateBadgeOnLoad() {
        cart.forEach(item => {
            updateBadge(item.name);
        });
    }


    function decreaseQuantity(itemName) {
        const cartItem = cart.find(item => item.name === itemName);
        if (cartItem) {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            } else {
                cart.splice(cart.indexOf(cartItem), 1);
            }
            updateCart();
            updateBadge(itemName);
        }
    }

    document.querySelectorAll('.item-card').forEach(card => {
        card.addEventListener('click', function () {
            const itemName = card.querySelector('h3').textContent;
            const itemPrice = parseInt(card.querySelector('p').textContent.replace('Цена: ', '').replace(' ₽', ''));
            // Проверка на наличие имени и цены
        if (!itemName || isNaN(itemPrice)) {
            console.error('Ошибка: некорректные данные товара');
            return;
        }
            const cartItem = cart.find(item => item.name === itemName);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            updateCart();
            updateBadge(itemName);
        });

        card.querySelector('.item-controls').addEventListener('click', function (event) {
            event.stopPropagation();
            const itemName = card.querySelector('h3').textContent;
            decreaseQuantity(itemName);
        });
    });
window.addEventListener('click', function (event) {
        if (window.innerWidth <= 480) {  // Проверка на ширину экрана
            const isClickInsideCart = orderSummaryElement.contains(event.target);
            const isClickViewOrderButton = viewOrderButton.contains(event.target);

            if (!isClickInsideCart && !isClickViewOrderButton) {
                hideCart();
            }
        }
    });
    // document.getElementById('view-order-button').addEventListener('click', function () {
    //     orderSummaryElement.style.display = orderSummaryElement.style.display === 'none' || orderSummaryElement.style.display === '' ? 'block' : 'none';
    // });
    function showCart() {
    document.querySelector('.order-summary').style.display = 'block';
}

function hideCart() {
    document.querySelector('.order-summary').style.display = 'none';
}
    document.getElementById('view-order-button').addEventListener('click', function () {
    const orderSummaryElement = document.getElementById('order-summary');
    orderSummaryElement.style.display = orderSummaryElement.style.display === 'none' || orderSummaryElement.style.display === '' ? 'block' : 'none';

});


    // window.addEventListener('click', function (event) {
    //     const isClickInsideCart = orderSummaryElement.contains(event.target);
    //     const isClickViewOrderButton = document.getElementById('view-order-button').contains(event.target);

    //     if (!isClickInsideCart && !isClickViewOrderButton) {
    //         orderSummaryElement.style.display = 'none';
    //     }
       
    // });

    updateCart();
    updateBadgeOnLoad();

    if (localStorage.getItem('orderSuccess')) {
        const thankYouMessage = document.getElementById('thank-you-message');
        thankYouMessage.style.display = 'block';

        setTimeout(function() {
            thankYouMessage.style.display = 'none';
            localStorage.removeItem('orderSuccess');
        }, 3000);
    }
});
