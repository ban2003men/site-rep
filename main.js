    // Получаем элементы иконки профиля и выпадающего меню
    const profileIcon = document.getElementById('profile-icon');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // Функция для переключения видимости меню
    function toggleDropdown() {
        dropdownMenu.classList.toggle('show');
    }

    // Скрыть меню при клике вне его области
    function closeDropdown(event) {
        if (!dropdownMenu.contains(event.target) && !profileIcon.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    }

    // Открытие меню по клику на иконку
    profileIcon.addEventListener('click', function(event) {
        event.preventDefault(); // Отключаем стандартное поведение ссылки
        toggleDropdown();
    });

    // Закрытие меню при клике вне его области
    window.addEventListener('click', function(event) {
        closeDropdown(event);
    });

    // Открытие модального окна для ввода адреса
document.getElementById('checkout-button').addEventListener('click', function() {
    document.getElementById('address-modal2').style.display = 'block';
});

// Закрытие модального окна
document.getElementById('close-address-modal2').addEventListener('click', function() {
    document.getElementById('address-modal2').style.display = 'none';
});

