const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter(function (item) {
    return item.dataset[dataSetValue];
  });

  if (media.length) {
    const breakpointsArray = media.map(item => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(",");
      return {
        value: paramsArray[0],
        type: paramsArray[1] ? paramsArray[1].trim() : "max",
        item: item
      };
    });

    const mdQueries = uniqArray(
      breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
    );

    const mdQueriesArray = mdQueries.map(breakpoint => {
      const [query, value, type] = breakpoint.split(",");
      const matchMedia = window.matchMedia(query);
      const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
      return { itemsArray, matchMedia };
    });

    return mdQueriesArray;
  }
}

function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

//========================================================================================================================================================

if (document.querySelector('.navigation-category__slider')) {
  const swiperCategory = new Swiper('.navigation-category__slider', {
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

if (document.querySelector('.category__slider')) {
  const category = new Swiper('.category__slider', {
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
    if (e.target.closest('.category__close')) {
      const slide = e.target.closest('.swiper-slide');
      const sliderWrapper = slide?.closest('.swiper-wrapper');
      const categoryBody = slide?.closest('.category__body'); 

      if (slide) {
        slide.remove();

        if (window.category) {
          window.category.update();
        }

        if (sliderWrapper && sliderWrapper.querySelectorAll('.swiper-slide').length === 0) {
          if (categoryBody) {
            categoryBody.remove();
          }
        }
      }
    };
  });
}

document.querySelectorAll('.post__slider').forEach(sliderElement => {
  const post = new Swiper(sliderElement, {
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

document.querySelectorAll('.navigation-category__slide').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const filter = this.getAttribute('data-filter');

    document.querySelectorAll('.navigation-category__slide').forEach(el => el.classList.remove('_active'));
    this.classList.add('_active');

    document.querySelectorAll('.category__slide').forEach(slide => {
      const category = slide.getAttribute('data-category');
      slide.classList.toggle('_hide', filter !== 'all' && category !== filter);
    });

    document.querySelectorAll('.posts__post').forEach(post => {
      const category = post.getAttribute('data-category');
      post.classList.toggle('_hide', filter !== 'all' && category !== filter);
    });

    if (window.categorySwiper) categorySwiper.update();
    if (window.postSwiper) postSwiper.update();
  });
});

//========================================================================================================================================================

Fancybox.bind("[data-fancybox]", {
  // опции
});

//========================================================================================================================================================

//Превью
document.addEventListener('DOMContentLoaded', function () {
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

      createPreview(file, type);

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
});

//========================================================================================================================================================

//Попап
class Popup {
  constructor(options) {
    let config = {
      logging: true,
      init: true,
      attributeOpenButton: "data-popup",
      attributeCloseButton: "data-close",
      fixElementSelector: "[data-lp]",
      youtubeAttribute: "data-popup-youtube",
      youtubePlaceAttribute: "data-popup-youtube-place",
      setAutoplayYoutube: true,
      classes: {
        popup: "popup",
        popupContent: "popup__content",
        popupActive: "popup_show",
        bodyActive: "popup-show"
      },
      focusCatch: true,
      closeEsc: true,
      bodyLock: true,
      hashSettings: {
        goHash: true
      },
      on: {
        beforeOpen: function () { },
        afterOpen: function () { },
        beforeClose: function () { },
        afterClose: function () { }
      }
    };
    this.youTubeCode;
    this.isOpen = false;
    this.targetOpen = {
      selector: false,
      element: false
    };
    this.previousOpen = {
      selector: false,
      element: false
    };
    this.lastClosed = {
      selector: false,
      element: false
    };
    this._dataValue = false;
    this.hash = false;
    this._reopen = false;
    this._selectorOpen = false;
    this.lastFocusEl = false;
    this._focusEl = ["a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'];
    this.options = {
      ...config,
      ...options,
      classes: {
        ...config.classes,
        ...options?.classes
      },
      hashSettings: {
        ...config.hashSettings,
        ...options?.hashSettings
      },
      on: {
        ...config.on,
        ...options?.on
      }
    };
    this.bodyLock = false;
    this.options.init ? this.initPopups() : null;
  }
  initPopups() {
    this.eventsPopup();
  }
  eventsPopup() {
    document.addEventListener("click", function (e) {
      const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
      if (buttonOpen) {
        e.preventDefault();
        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
        if ("error" !== this._dataValue) {
          if (!this.isOpen) this.lastFocusEl = buttonOpen;
          this.targetOpen.selector = `${this._dataValue}`;
          this._selectorOpen = true;
          this.open();
          return;
        }
        return;
      }
      const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
      if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
    }.bind(this));
    document.addEventListener("keydown", function (e) {
      if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
      if (this.options.focusCatch && 9 == e.which && this.isOpen) {
        this._focusCatch(e);
        return;
      }
    }.bind(this));
    if (this.options.hashSettings.goHash) {
      window.addEventListener("hashchange", function () {
        if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
      }.bind(this));
      window.addEventListener("load", function () {
        if (window.location.hash) this._openToHash();
      }.bind(this));
    }
  }
  open(selectorValue) {
    if (bodyLockStatus) {
      this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
      if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
        this.targetOpen.selector = selectorValue;
        this._selectorOpen = true;
      }
      if (this.isOpen) {
        this._reopen = true;
        this.close();
      }
      if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
      if (!this._reopen) this.previousActiveElement = document.activeElement;
      this.targetOpen.element = document.querySelector(this.targetOpen.selector);
      if (this.targetOpen.element) {
        if (this.youTubeCode) {
          const codeVideo = this.youTubeCode;
          const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
          const iframe = document.createElement("iframe");
          iframe.setAttribute("allowfullscreen", "");
          const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
          iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
          iframe.setAttribute("src", urlVideo);
          if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
          }
          this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
        }
        const videoElement = this.targetOpen.element.querySelector("video");
        if (videoElement) {
          videoElement.muted = true;
          videoElement.currentTime = 0;
          videoElement.play().catch((e => console.error("Autoplay error:", e)));
        }
        if (this.options.hashSettings.location) {
          this._getHash();
          this._setHash();
        }
        this.options.on.beforeOpen(this);
        document.dispatchEvent(new CustomEvent("beforePopupOpen", {
          detail: {
            popup: this
          }
        }));
        this.targetOpen.element.classList.add(this.options.classes.popupActive);
        document.documentElement.classList.add(this.options.classes.bodyActive);
        if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
        this.targetOpen.element.setAttribute("aria-hidden", "false");
        this.previousOpen.selector = this.targetOpen.selector;
        this.previousOpen.element = this.targetOpen.element;
        this._selectorOpen = false;
        this.isOpen = true;
        this.options.on.afterOpen(this);
        document.dispatchEvent(new CustomEvent("afterPopupOpen", {
          detail: {
            popup: this
          }
        }));
      }
    }
  }
  close(selectorValue) {
    if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
    if (!this.isOpen || !bodyLockStatus) return;
    this.options.on.beforeClose(this);
    document.dispatchEvent(new CustomEvent("beforePopupClose", {
      detail: {
        popup: this
      }
    }));
    if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
    this.previousOpen.element.classList.remove(this.options.classes.popupActive);
    const videoElement = this.previousOpen.element.querySelector("video");
    if (videoElement) videoElement.pause();
    this.previousOpen.element.setAttribute("aria-hidden", "true");
    if (!this._reopen) {
      document.documentElement.classList.remove(this.options.classes.bodyActive);
      !this.bodyLock ? bodyUnlock() : null;
      this.isOpen = false;
    }
    document.dispatchEvent(new CustomEvent("afterPopupClose", {
      detail: {
        popup: this
      }
    }));
  }
  _getHash() {
    if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
  }
  _openToHash() {
    let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
    const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
    if (buttons && classInHash) this.open(classInHash);
  }
  _setHash() {
    history.pushState("", "", this.hash);
  }
  _removeHash() {
    history.pushState("", "", window.location.href.split("#")[0]);
  }
  _focusCatch(e) {
    const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);
    if (e.shiftKey && 0 === focusedIndex) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }
}
modules_flsModules.popup = new Popup({});

function menuOpen() {
  bodyLock();
  document.documentElement.classList.add("menu-open");
}
function menuClose() {
  bodyUnlock();
  document.documentElement.classList.remove("menu-open");
}

//========================================================================================================================================================

const account = document.querySelector('.header__account');
const author = document.querySelector('.header__author');

if (account) {
  function openAccount() {
    account.classList.add('active');
    document.documentElement.classList.add('shadow-open');
  }

  function closeAccount() {
    account.classList.remove('active');
    document.documentElement.classList.remove('shadow-open');
  }

  author.addEventListener('click', function (e) {
    e.stopPropagation(); 
    account.classList.toggle('active');
    if (account.classList.contains('active')) {
      document.documentElement.classList.add('shadow-open');
    } else {
      document.documentElement.classList.remove('shadow-open');
    }
  });

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
  function openAccount() {
    headerNotification.classList.add('active');
  }

  function closeAccount() {
    headerNotification.classList.remove('active');
  }

  notificationIcon.addEventListener('click', function (e) {
    e.stopPropagation();
    headerNotification.classList.toggle('active');
  });

  document.addEventListener('click', function (e) {
    if (!headerNotification.contains(e.target) && !notificationIcon.contains(e.target)) {
      closeAccount();
    }
  });
}

//========================================================================================================================================================

const settingsNotification = document.querySelector('.settings-notification__body');
const settingsIcon = document.querySelector('.setting-icon');
const closeButton = document.querySelector('.settings-notification__close');

if (settingsNotification) {
  function openAccount() {
    settingsNotification.classList.add('active');
    document.documentElement.classList.add('shadow-open');
  }

  function closeAccount() {
    settingsNotification.classList.remove('active');
    document.documentElement.classList.remove('shadow-open');
  }

  settingsIcon.addEventListener('click', function (e) {
    e.stopPropagation();
    settingsNotification.classList.toggle('active');
    if (settingsNotification.classList.contains('active')) {
      document.documentElement.classList.add('shadow-open');
    } else {
      document.documentElement.classList.remove('shadow-open');
    }
  });

  if (closeButton) {
    closeButton.addEventListener('click', function (e) {
      e.stopPropagation();
      closeAccount();
    });
  }

  document.addEventListener('click', function (e) {
    if (!settingsNotification.contains(e.target) && !settingsIcon.contains(e.target)) {
      closeAccount();
    }
  });
}

//========================================================================================================================================================

const settingsUnread = document.querySelector('.settings-notification__unread');
const settingsAll = document.querySelector('.settings-notification__all');
const notifications = document.querySelectorAll('.notifications__column');

if (settingsUnread) {
  function updateButtonStates() {
    if (settingsUnread.classList.contains('_hidden')) {
      settingsAll.classList.add('_active');
    } else {
      settingsAll.classList.remove('_active');
    }
  }

  updateButtonStates();

  settingsUnread.addEventListener('click', function () {
    notifications.forEach(notif => {
      if (notif.getAttribute('data-filter') !== 'unread') {
        notif.classList.add('_hide');
      } else {
        notif.classList.remove('_hide');
      }
    });

    settingsUnread.classList.add('_hidden');
    settingsAll.classList.remove('_hidden');
    updateButtonStates();
  });

  settingsAll.addEventListener('click', function () {
    notifications.forEach(notif => {
      notif.classList.remove('_hide');
    });

    settingsAll.classList.add('_hidden');
    settingsAll.classList.remove('_active');
    settingsUnread.classList.remove('_hidden');
    updateButtonStates();
  });
}

//========================================================================================================================================================

const addButton = document.querySelector('.add-header__plus');
const headerAdd = document.querySelector('.header__add');
const addHeaderBody = document.querySelector('.add-header__body');

if (headerAdd) {
  addButton.addEventListener('click', function (e) {
    e.stopPropagation();
    headerAdd.classList.toggle('active');
    document.documentElement.classList.toggle('shadow-open');
  });

  document.addEventListener('click', function (e) {
    if (!addButton.contains(e.target) && !addHeaderBody.contains(e.target)) {
      headerAdd.classList.remove('active');
      document.documentElement.classList.remove('shadow-open');
    }
  });

  addHeaderBody.addEventListener('click', function (e) {
    e.stopPropagation();
  });
}

//========================================================================================================================================================

function indents() {
  const header = document.querySelector('.header');
  const page = document.querySelector('.main');

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
    if (document.documentElement.clientWidth < 992) {
      page.style.paddingBottom = hsidebar + 'px';
    }
  }

  let notificationHeader = document.querySelector('.notification-header__body');

  if (notificationHeader) {
    if (document.documentElement.clientWidth < 480) {
      notificationHeader.style.top = hHeader + 'px';
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

//Куки

let acceptCookies = document.querySelector('#acceptCookies');
if (acceptCookies) {
  acceptCookies.addEventListener("click", function () {
    document.cookie = "cookiesAccepted=true; max-age=" + (365 * 24 * 60 * 60) + "; path=/";

    document.getElementById("cookieNotice").style.display = "none";
  });
}

//========================================================================================================================================================

//Три точки
const dotsList = document.querySelectorAll('.dots');

dotsList.forEach(dots => {
  dots.addEventListener('click', function (e) {
    e.stopPropagation();

    dotsList.forEach(other => {
      if (other !== this) {
        other.classList.remove('active');
      }
    });

    this.classList.toggle('active');
  });
});

document.addEventListener('click', function (e) {
  dotsList.forEach(dots => {
    if (!dots.contains(e.target)) {
      dots.classList.remove('active');
    }
  });
});

//========================================================================================================================================================

let postLikes = document.querySelectorAll('.post__like');

if (postLikes.length > 0) {
  postLikes.forEach(like => {
    like.addEventListener('click', function () {
      this.classList.toggle('_active');
    });
  });
}

//========================================================================================================================================================

