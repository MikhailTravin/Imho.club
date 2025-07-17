
const account = document.querySelector('.header__account');
const author = document.querySelector('.header__author');

if (account) {
    // Функция открытия (добавление active и shadow-open)
    function openAccount() {
        account.classList.add('active');
        document.documentElement.classList.add('shadow-open');
    }

    // Функция закрытия (удаление active и shadow-open)
    function closeAccount() {
        account.classList.remove('active');
        document.documentElement.classList.remove('shadow-open');
    }

    // Открытие при клике на автора
    author.addEventListener('click', function (e) {
        e.stopPropagation(); // Останавливаем всплытие, чтобы не сработал глобальный обработчик
        account.classList.toggle('active');
        if (account.classList.contains('active')) {
            document.documentElement.classList.add('shadow-open');
        } else {
            document.documentElement.classList.remove('shadow-open');
        }
    });

    // Закрытие при клике вне account и author
    document.addEventListener('click', function (e) {
        if (!account.contains(e.target) && !author.contains(e.target)) {
            closeAccount();
        }
    });
}

//========================================================================================================================================================

const headerNotification = document.querySelector('.header__notification');
const notificationIcon = document.querySelector('.notification-header__icon');

if (headerNotification) {
    // Функция открытия (добавление active и shadow-open)
    function openAccount() {
        headerNotification.classList.add('active');
        document.documentElement.classList.add('shadow-open');
    }

    // Функция закрытия (удаление active и shadow-open)
    function closeAccount() {
        headerNotification.classList.remove('active');
        document.documentElement.classList.remove('shadow-open');
    }

    // Открытие при клике на автора
    notificationIcon.addEventListener('click', function (e) {
        e.stopPropagation(); // Останавливаем всплытие, чтобы не сработал глобальный обработчик
        headerNotification.classList.toggle('active');
        if (headerNotification.classList.contains('active')) {
            document.documentElement.classList.add('shadow-open');
        } else {
            document.documentElement.classList.remove('shadow-open');
        }
    });

    // Закрытие при клике вне account и author
    document.addEventListener('click', function (e) {
        if (!headerNotification.contains(e.target) && !notificationIcon.contains(e.target)) {
            closeAccount();
        }
    });
}

//========================================================================================================================================================

const settingsNotification = document.querySelector('.settings-notification__body');
const settingsIcon = document.querySelector('.settings-notification__icon');

if (settingsNotification) {
    // Функция открытия (добавление active и shadow-open)
    function openAccount() {
        settingsNotification.classList.add('active');
        document.documentElement.classList.add('shadow-open');
    }

    // Функция закрытия (удаление active и shadow-open)
    function closeAccount() {
        settingsNotification.classList.remove('active');
        document.documentElement.classList.remove('shadow-open');
    }

    // Открытие при клике на автора
    settingsIcon.addEventListener('click', function (e) {
        e.stopPropagation(); // Останавливаем всплытие, чтобы не сработал глобальный обработчик
        settingsNotification.classList.toggle('active');
        if (settingsNotification.classList.contains('active')) {
            document.documentElement.classList.add('shadow-open');
        } else {
            document.documentElement.classList.remove('shadow-open');
        }
    });

    // Закрытие при клике вне account и author
    document.addEventListener('click', function (e) {
        if (!settingsNotification.contains(e.target) && !settingsIcon.contains(e.target)) {
            closeAccount();
        }
    });
}

//========================================================================================================================================================

const addButton = document.querySelector('.add-header__plus');
const headerAdd = document.querySelector('.header__add');
const addHeaderBody = document.querySelector('.add-header__body');

if (headerAdd) {
    // Обработчик клика на кнопку
    addButton.addEventListener('click', function (e) {
        e.stopPropagation(); // Предотвращаем всплытие, чтобы не сработал document.click сразу
        headerAdd.classList.toggle('active');
        document.documentElement.classList.toggle('shadow-open');
    });

    // Обработчик клика по документу
    document.addEventListener('click', function (e) {
        // Если клик был не по кнопке и не по блоку add-header__body
        if (!addButton.contains(e.target) && !addHeaderBody.contains(e.target)) {
            headerAdd.classList.remove('active');
            document.documentElement.classList.remove('shadow-open');
        }
    });

    // Предотвращаем закрытие при клике внутри блока
    addHeaderBody.addEventListener('click', function (e) {
        e.stopPropagation();
    });
}

//========================================================================================================================================================

function indents() {
    const header = document.querySelector('.header');
    const page = document.querySelector('.page');

    //Оступ от шапки
    let hHeader = window.getComputedStyle(header, false).height;
    hHeader = Number(hHeader.slice(0, hHeader.length - 2));

    if (page) {
        page.style.paddingTop = hHeader + 'px';
    }

    const sidebar = document.querySelector('.sidebar');

    if (sidebar) {
        let hsidebar = window.getComputedStyle(sidebar, false).height;
        hsidebar = Number(hsidebar.slice(0, hsidebar.length - 2));
        if (document.documentElement.clientWidth < 991.98) {
            page.style.paddingBottom = hsidebar + 'px';
        }
    }

}

window.addEventListener('scroll', () => {
    indents();
});

window.addEventListener('resize', () => {
    indents();
});

indents();

//========================================================================================================================================================

//Превью
const imageInput = document.querySelector('.popup-share-thoughts__files input[type="file"][accept="image/*"]');
const videoInput = document.querySelector('.popup-share-thoughts__files input[type="file"][accept="video/*"]');
const previewContainer = document.querySelector(".previews");

function createPreview(file, type) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("preview-item");

    if (type === "image") {
        const img = document.createElement("img");
        img.classList.add("preview-img");

        const reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // Кнопка удаления
        const removeBtn = document.createElement("div");
        removeBtn.classList.add("preview-remove");
        removeBtn.innerHTML = "&times;";

        removeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            wrapper.remove();
        });

        wrapper.appendChild(img);
        wrapper.appendChild(removeBtn);
    }

    if (type === "video") {
        const videoWrapper = document.createElement("div");
        videoWrapper.classList.add("preview-video");

        const playIcon = `
                <svg class="preview-video-icon" viewBox="0 0 24 24" width="24" height="24">
                    <circle cx="12" cy="12" r="10" fill="#000" opacity="0.6"/>
                    <polygon points="10,8 16,12 10,16" fill="#fff"/>
                </svg>
            `;

        const fileName = document.createElement("div");
        fileName.textContent = file.name;
        fileName.classList.add("preview-video-name");

        const removeBtn = document.createElement("div");
        removeBtn.classList.add("preview-remove");
        removeBtn.innerHTML = "&times;";

        removeBtn.addEventListener("click", () => {
            wrapper.remove();
        });

        videoWrapper.innerHTML = playIcon;
        wrapper.appendChild(videoWrapper);
        wrapper.appendChild(fileName);
        wrapper.appendChild(removeBtn);
    }

    previewContainer.appendChild(wrapper);
}

function setupInput(input, type) {
    if (!input) return;

    let currentInput = input;

    function onChange() {
        const file = currentInput.files[0];
        if (!file) return;

        // Добавляем превью
        createPreview(file, type);

        // Сбрасываем значение инпута и заменяем
        currentInput.value = "";
        const newInput = currentInput.cloneNode(true);
        currentInput.replaceWith(newInput);
        currentInput = newInput;
        currentInput.addEventListener("change", onChange);
    }

    currentInput.addEventListener("change", onChange);
}

setupInput(imageInput, "image");
setupInput(videoInput, "video");

//========================================================================================================================================================

//Куки
document.getElementById("acceptCookies").addEventListener("click", function () {
    // Устанавливаем cookie на 365 дней
    document.cookie = "cookiesAccepted=true; max-age=" + (365 * 24 * 60 * 60) + "; path=/";

    // Скрываем блок
    document.getElementById("cookieNotice").style.display = "none";
});

//========================================================================================================================================================

//Дотс
const dotsList = document.querySelectorAll('.post__dots');

// Открытие/закрытие меню при клике на точки
dotsList.forEach(dots => {
    dots.addEventListener('click', function (e) {
        e.stopPropagation(); // Предотвращаем закрытие при клике внутри

        // Закрываем все другие меню
        dotsList.forEach(other => {
            if (other !== this) {
                other.classList.remove('active');
            }
        });

        // Переключаем текущее меню
        this.classList.toggle('active');
    });
});

// Закрытие меню при клике вне его
document.addEventListener('click', function (e) {
    dotsList.forEach(dots => {
        if (!dots.contains(e.target)) {
            dots.classList.remove('active');
        }
    });
});

//========================================================================================================================================================
