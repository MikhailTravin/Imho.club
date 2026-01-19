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

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.post__slider').forEach(sliderElement => {
    const post = new Swiper(sliderElement, {
      observer: true,
      observeParents: true,
      slidesPerView: 2.8,
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
          slidesPerView: 2.8,
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
});

let navigationCategorySlide = document.querySelectorAll('.navigation-category__slide');
if (navigationCategorySlide) {
  navigationCategorySlide.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const filter = this.getAttribute('data-filter');
      const categorySlider = document.querySelector('.category__slider');

      if (categorySlider) {
        document.querySelectorAll('.navigation-category__slide').forEach(el => el.classList.remove('_active'));
        this.classList.add('_active');

        // Сначала скрываем/показываем слайды
        document.querySelectorAll('.category__slide').forEach(slide => {
          const category = slide.getAttribute('data-category');
          slide.classList.toggle('_hide', filter !== 'all' && category !== filter);
        });
        // Проверяем, есть ли видимые слайды
        const visibleSlides = document.querySelectorAll('.category__slide:not(._hide)');

        if (visibleSlides.length === 0) {
          categorySlider.classList.add('no-filter'); // Добавляем, если ничего не отображается
        } else {
          categorySlider.classList.remove('no-filter'); // Убираем, если есть видимые слайды
        }

        if (window.categorySwiper) categorySwiper.update();
      }

      document.querySelectorAll('.posts__post').forEach(post => {
        const category = post.getAttribute('data-category');
        post.classList.toggle('_hide', filter !== 'all' && category !== filter);
      });


    });
  });
}

const filterBlocks = document.querySelectorAll('.filter-block');
if (filterBlocks) {
  const categorySlides = document.querySelectorAll('.navigation-category__slide');
  function filterContent(filterValue) {
    filterBlocks.forEach(block => {
      block.classList.add('_hide');
    });

    const matchingBlocks = document.querySelectorAll(`[data-filter="${filterValue}"]`);
    matchingBlocks.forEach(block => {
      block.classList.remove('_hide');
    });
    categorySlides.forEach(slide => {
      slide.classList.remove('_active');
      if (slide.getAttribute('data-filter') === filterValue) {
        slide.classList.add('_active');
      }
    });
  }
  categorySlides.forEach(slide => {
    slide.addEventListener('click', function (e) {
      e.preventDefault();
      const filterValue = this.getAttribute('data-filter');
      filterContent(filterValue);
    });
  });
  const activeCategory = document.querySelector('.navigation-category__slide._active');
  if (activeCategory) {
    const defaultFilter = activeCategory.getAttribute('data-filter');
    filterContent(defaultFilter);
  }
}

//========================================================================================================================================================

Fancybox.bind("[data-fancybox]", {
  // опции
});

//========================================================================================================================================================

//Добавление заметки
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.popup__share-thoughts');
  if (!form) {
    console.error('Form element not found');
    return;
  }

  const textarea = form.querySelector('textarea');
  const publishBtn = form.querySelector('.popup-share-thoughts__public');
  const clearBtn = form.querySelector('.popup-share-thoughts__clear');
  const cancelBtn = form.querySelector('.popup-share-thoughts__cancel');
  const errorElement = document.querySelectorAll('.popup-share-thoughts__error');

  const imageInput = form.querySelector('input[accept="image/*"]');
  const videoInput = form.querySelector('input[accept="video/*"]');
  const imagePreviewContainer = form.querySelector(".previews");
  const videoPreviewContainer = form.querySelector(".previews-video");

  const coverFileInput = document.querySelector('.form-add-publication__file input[type="file"]');
  const coverFilesContainer = document.querySelector('.form-add-publication__files');
  const coverPreviewsContainer = document.querySelector('.form-add-publication__files .previews');
  const coverButton = document.querySelector('.form-add-publication__file .button');

  const bannerFileInput = document.querySelector('.design-myclub__column input[type="file"]');
  const bannerButton = document.querySelector('.design-myclub__column .button');
  const bannerPreviewsContainer = document.querySelector('.design-myclub__column .previews');
  const bannerFilesContainer = document.querySelector('.design-myclub__column .form-add-publication__files');
  const bannerRemoveBtn = document.querySelector('.design-myclub__column .form-add-publication-remove');

  const MAX_PHOTOS = 6;

  function checkFormState() {
    const hasText = textarea && textarea.value.trim() !== '';
    const hasPhotos = imagePreviewContainer && imagePreviewContainer.children.length > 0;
    const hasVideos = videoPreviewContainer && videoPreviewContainer.children.length > 0;
    const hasCover = coverPreviewsContainer && coverPreviewsContainer.children.length > 0;
    const hasBanner = bannerPreviewsContainer && bannerPreviewsContainer.querySelector('img') !== null;

    if (publishBtn && clearBtn) {
      if (hasText || hasPhotos || hasVideos || hasCover || hasBanner) {
        publishBtn.classList.remove('disabled');
        clearBtn.classList.remove('disabled');
      } else {
        publishBtn.classList.add('disabled');
        clearBtn.classList.add('disabled');
      }
    }
  }

  function toggleError(show) {
    if (errorElement) {
      errorElement.forEach(element => {
        if (show) {
          element.classList.add('_active');
        } else {
          element.classList.remove('_active');
        }
      });
    }
  }

  function createCoverPreview(file) {
    if (!coverPreviewsContainer || !coverFilesContainer) return;

    if (!file.type.match('image.*')) {
      alert('Пожалуйста, выберите файл изображения (PNG, JPG)');
      return;
    }

    if (file.size > 30 * 1024 * 1024) {
      alert('Файл слишком большой. Максимальный размер: 30 МБ');
      return;
    }

    coverFilesContainer.classList.add('active');

    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.alt = 'Превью обложки';

    const closeButton = document.createElement('button');
    closeButton.className = 'preview-remove';
    closeButton.type = 'button';

    const previewWrapper = document.createElement('div');
    previewWrapper.className = 'preview-item';
    previewWrapper.appendChild(img);
    previewWrapper.appendChild(closeButton);

    coverPreviewsContainer.innerHTML = '';
    coverPreviewsContainer.appendChild(previewWrapper);

    closeButton.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      previewWrapper.remove();
      if (coverFileInput) coverFileInput.value = '';
      coverFilesContainer.classList.remove('active');
      checkFormState();
    });

    img.onload = function () {
      URL.revokeObjectURL(this.src);
    };

    checkFormState();
  }

  function setupCoverInput() {
    if (!coverFileInput || !coverButton) return;

    coverButton.addEventListener('click', function (e) {
      e.preventDefault();
      coverFileInput.click();
    });

    coverFileInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file) {
        createCoverPreview(file);
      }
    });
  }

  function setupBannerInput() {
    if (!bannerFileInput || !bannerButton) return;

    bannerButton.addEventListener('click', function (e) {
      e.preventDefault();
      bannerFileInput.click();
    });

    bannerFileInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file) {
        createBannerPreview(file);
      }
    });

    if (bannerRemoveBtn) {
      bannerRemoveBtn.addEventListener('click', function (e) {
        e.preventDefault();
        removeBannerPreview();
      });
    }
  }

  function createBannerPreview(file) {
    if (!bannerPreviewsContainer || !bannerFilesContainer) return;

    if (!file.type.match('image.*')) {
      alert('Пожалуйста, выберите файл изображения (PNG, JPG)');
      return;
    }

    if (file.size > 30 * 1024 * 1024) {
      alert('Файл слишком большой. Максимальный размер: 30 МБ');
      return;
    }

    bannerFilesContainer.classList.add('active');

    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.alt = 'Превью баннера';

    bannerPreviewsContainer.innerHTML = '';
    bannerPreviewsContainer.appendChild(img);

    if (bannerRemoveBtn) {
      bannerRemoveBtn.style.display = 'block';
    }

    img.onload = function () {
      URL.revokeObjectURL(this.src);
    };

    checkFormState();
  }

  function removeBannerPreview() {
    if (bannerPreviewsContainer) {
      bannerPreviewsContainer.innerHTML = 'Добавьте изображение размером 1100 x 220 пикселей';
    }
    if (bannerFilesContainer) {
      bannerFilesContainer.classList.remove('active');
    }
    if (bannerFileInput) {
      bannerFileInput.value = '';
    }
    if (bannerRemoveBtn) {
      bannerRemoveBtn.style.display = 'none';
    }
    checkFormState();
  }

  function createPreview(file, type) {
    if (type === "image" && imagePreviewContainer && imagePreviewContainer.children.length >= MAX_PHOTOS) {
      toggleError(true);
      return;
    } else {
      toggleError(false);
    }

    const wrapper = document.createElement("div");
    wrapper.classList.add(type === "image" ? "preview-item" : "preview-item-video");

    if (type === "image" && imagePreviewContainer) {
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

      removeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        wrapper.remove();
        if (imagePreviewContainer.children.length === 0) {
          imagePreviewContainer.classList.remove("_active");
        }
        checkFormState();
        toggleError(false);
      }, true);

      wrapper.appendChild(img);
      wrapper.appendChild(removeBtn);
      imagePreviewContainer.appendChild(wrapper);
      imagePreviewContainer.classList.add("_active");
    }

    if (type === "video" && videoPreviewContainer) {
      const videoWrapper = document.createElement("div");
      videoWrapper.classList.add("preview-video");

      const thumbnail = document.createElement("img");
      thumbnail.classList.add("preview-video-thumbnail");
      thumbnail.alt = "Video preview";

      const videoURL = URL.createObjectURL(file);
      const video = document.createElement("video");

      video.addEventListener('loadeddata', function () {
        video.currentTime = Math.min(1, video.duration);
      });

      video.addEventListener('seeked', function () {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        thumbnail.src = canvas.toDataURL();
        URL.revokeObjectURL(videoURL);
      });

      video.addEventListener('error', function () {
        thumbnail.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23eee'/><text x='50%' y='50%' font-family='Arial' font-size='12' text-anchor='middle' dominant-baseline='middle'>Video</text></svg>";
      });

      video.src = videoURL;
      video.muted = true;
      video.playsInline = true;

      const playIcon = document.createElement("div");
      playIcon.classList.add("preview-video-icon");
      playIcon.innerHTML = `
            <svg width="23" height="27" viewBox="0 0 23 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.9906 14.3671C22.6598 13.9827 22.6598 13.0173 21.9906 12.6329L1.49812 0.860625C0.83146 0.477647 0 0.958891 0 1.72773V25.2723C0 26.0411 0.831459 26.5224 1.49812 26.1394L21.9906 14.3671Z" fill="white" />
            </svg>
        `;

      const fileName = document.createElement("div");
      fileName.textContent = file.name;
      fileName.classList.add("preview-video-name");

      const removeBtn = document.createElement("div");
      removeBtn.classList.add("preview-remove");
      removeBtn.innerHTML = `
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4.5L16 16.5" stroke="white" stroke-linecap="round" />
                <path d="M16 4.5L4 16.5" stroke="white" stroke-linecap="round" />
            </svg>
        `;

      removeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        wrapper.remove();
        if (videoPreviewContainer.children.length === 0) {
          videoPreviewContainer.classList.remove("_active");
        }
        checkFormState();
      }, true);

      videoWrapper.appendChild(thumbnail);
      videoWrapper.appendChild(playIcon);
      wrapper.appendChild(videoWrapper);
      wrapper.appendChild(fileName);
      wrapper.appendChild(removeBtn);
      videoPreviewContainer.appendChild(wrapper);
      videoPreviewContainer.classList.add("_active");
    }

    checkFormState();
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

  function setupTextarea() {
    if (!textarea) return;

    textarea.addEventListener('input', function () {
      this.style.height = 'auto';
      const newHeight = Math.min(this.scrollHeight, 611);
      this.style.height = `${newHeight}px`;

      if (newHeight > 123) {
        document.documentElement.classList.add('textarea-height');
      } else {
        document.documentElement.classList.remove('textarea-height');
      }

      checkFormState();
    });

    textarea.style.height = '123px';
  }

  function setupClearButton() {
    if (!clearBtn) return;

    clearBtn.addEventListener('click', function () {
      if (textarea) {
        textarea.value = '';
        textarea.style.height = '123px';
      }
      document.documentElement.classList.remove('textarea-height');

      if (imagePreviewContainer) {
        imagePreviewContainer.innerHTML = '';
        imagePreviewContainer.classList.remove("_active");
      }

      if (videoPreviewContainer) {
        videoPreviewContainer.innerHTML = '';
        videoPreviewContainer.classList.remove("_active");
      }

      if (coverPreviewsContainer && coverFilesContainer) {
        coverPreviewsContainer.innerHTML = '';
        coverFilesContainer.classList.remove('active');
      }

      removeBannerPreview();

      if (coverFileInput) {
        coverFileInput.value = '';
      }

      const imageInputs = form.querySelectorAll('input[accept="image/*"]');
      const videoInputs = form.querySelectorAll('input[accept="video/*"]');

      imageInputs.forEach(input => input.value = '');
      videoInputs.forEach(input => input.value = '');

      toggleError(false);
      checkFormState();
    });
  }

  if (form) {
    setupInput(imageInput, "image");
    setupInput(videoInput, "video");
    setupCoverInput();
    setupBannerInput();
    setupTextarea();
    setupClearButton();
    checkFormState();
  }
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

if (dotsList) {
  const updateBodyClass = () => {
    const hasActive = document.querySelector('.dots.active'); // ищем активные dots
    document.documentElement.classList.toggle('shadow-open', !!hasActive);
  };

  dotsList.forEach(dots => {
    dots.addEventListener('click', function (e) {
      e.stopPropagation();

      dotsList.forEach(other => {
        if (other !== this) {
          other.classList.remove('active');
        }
      });

      this.classList.toggle('active');
      updateBodyClass();
    });
  });

  document.addEventListener('click', function (e) {
    dotsList.forEach(dots => {
      if (!dots.contains(e.target)) {
        dots.classList.remove('active');
      }
    });
    updateBodyClass();
  });
}

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

//Карусель подсказки
document.addEventListener('DOMContentLoaded', function () {
  const triggers = document.querySelectorAll('[data-tippy]');
  const dropdowns = {};

  if (triggers) {
    document.querySelectorAll('.dropdown[data-tippy]').forEach(dropdown => {
      dropdowns[dropdown.getAttribute('data-tippy')] = dropdown;
    });

    function positionDropdown(trigger, dropdown) {
      const triggerRect = trigger.getBoundingClientRect();
      const dropdownRect = dropdown.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isMobile = window.matchMedia('(max-width: 480px)').matches;

      let top = triggerRect.bottom + window.scrollY;
      let right = isMobile ? 0 : (document.documentElement.clientWidth - triggerRect.right) - 50;

      if (top + dropdownRect.height > viewportHeight + window.scrollY) {
        top = triggerRect.top + window.scrollY - dropdownRect.height;
      }

      dropdown.style.top = `${top}px`;
      dropdown.style.right = `${right}px`;
      dropdown.style.left = 'auto';
    }

    function closeAllDropdowns() {
      document.querySelectorAll('.dropdown._tippy-open').forEach(dropdown => {
        dropdown.classList.remove('_tippy-open');
      });
      document.documentElement.classList.remove('tippy-active');
    }

    triggers.forEach(trigger => {
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const tippyId = this.getAttribute('data-tippy');
        const dropdown = dropdowns[tippyId];

        if (dropdown) {
          const wasOpen = dropdown.classList.contains('_tippy-open');
          closeAllDropdowns();

          if (!wasOpen) {
            positionDropdown(trigger, dropdown);
            dropdown.classList.add('_tippy-open');
            document.documentElement.classList.add('tippy-active');
          }
        }
      });
    });

    document.addEventListener('click', closeAllDropdowns);

    document.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    });

    window.addEventListener('resize', function () {
      document.querySelectorAll('.dropdown._tippy-open').forEach(dropdown => {
        const tippyId = dropdown.getAttribute('data-tippy');
        const trigger = document.querySelector(`[data-tippy="${tippyId}"]`);
        if (trigger) {
          positionDropdown(trigger, dropdown);
        }
      });
    });

    // Закрываем dropdown-меню при движении Swiper
    const swiper = document.querySelector('.category__slider');
    if (swiper) {
      const swiperInstance = swiper.swiper;
      if (swiperInstance) {
        swiperInstance.on('slideChange', closeAllDropdowns);
        swiperInstance.on('touchMove', closeAllDropdowns);
      }
    }
  }
});

//========================================================================================================================================================

// Обработка субвкладок
const subTabs = document.querySelectorAll('.tabs-history__subtitle');
subTabs.forEach(tab => {
  tab.addEventListener('click', function () {
    const parentTabBody = this.closest('.tabs-history__body');
    const subTabId = this.getAttribute('data-subhistory');

    parentTabBody.querySelectorAll('.tabs-history__subtitle').forEach(t => t.classList.remove('_tab-active'));
    this.classList.add('_tab-active');

    parentTabBody.querySelectorAll('[data-subhistory]').forEach(content => {
      content.classList.remove('_tab-active');
      if (content.getAttribute('data-subhistory') === subTabId) {
        content.classList.add('_tab-active');
      }
    });
  });
});

const activeMainTab = document.querySelector('.tabs-history__title._tab-active');
if (activeMainTab) {
  const tabId = activeMainTab.getAttribute('data-history');
  const activeMainContent = document.querySelector(`.tabs-history__body[data-history="${tabId}"]`);

  if (activeMainContent) {
    activeMainContent.classList.add('_tab-active');

    const hasActiveSubTab = activeMainContent.querySelector('.tabs-history__subtitle._tab-active');
    if (!hasActiveSubTab) {
      activateSubTabs(activeMainContent);
    }

    const hasRightBlock = activeMainContent.querySelector('.tabs-history__right');
    if (!hasRightBlock) {
      document.documentElement.classList.add('history-other');
    }
  }
}

//========================================================================================================================================================

//Цитирование
class TextSelectionMenu {
  constructor() {
    this.menu = document.querySelector('.text-selection-menu');
    this.selectedText = '';
    this.sourceElement = null;

    if (this.menu) {
      this.init();
    }
  }

  init() {
    document.addEventListener('mouseup', this.handleSelection.bind(this));
    document.addEventListener('mousedown', this.handleClickOutside.bind(this));
    this.setupButtonHandlers();
    this.setupCitationCloseHandlers();
  }

  setupButtonHandlers() {
    const copyBtn = this.menu.querySelector('.copy-btn');
    const quoteBtn = this.menu.querySelector('.quote-btn');

    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.copyText();
        this.hideMenu();
      });
    }

    if (quoteBtn) {
      quoteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.quoteText();
        this.hideMenu();
      });
    }
  }

  setupCitationCloseHandlers() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.post-answer__close')) {
        this.closeCitation();
      }

      if (e.target.closest('.citation__close')) {
        this.closeCitationNotice();
      }
    });
  }

  closeCitation() {
    const citationBlock = document.querySelector('.post-answer-citation');
    if (citationBlock) {
      citationBlock.style.display = 'none';
    }
  }

  closeCitationNotice() {
    const citationNotice = document.querySelector('.citation');
    if (citationNotice) {
      citationNotice.style.display = 'none';
    }
  }

  handleSelection(event) {
    const selection = window.getSelection();
    this.selectedText = selection.toString().trim();

    if (this.selectedText && this.isInsideComment(selection)) {
      this.sourceElement = this.findParentComment(selection);
      this.showMenu(selection);
    } else {
      this.hideMenu();
    }
  }

  isInsideComment(selection) {
    if (selection.rangeCount === 0) return false;

    const range = selection.getRangeAt(0);
    const commonAncestor = range.commonAncestorContainer;

    const commentElement = this.findClosestComment(commonAncestor);

    return commentElement !== null;
  }

  findClosestComment(node) {
    let current = node.nodeType === 3 ? node.parentNode : node;

    while (current && current !== document.body) {
      if (current.classList && current.classList.contains('comment')) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
  }

  findParentComment(selection) {
    if (selection.rangeCount === 0) return null;

    const range = selection.getRangeAt(0);
    const commonAncestor = range.commonAncestorContainer;
    return this.findClosestComment(commonAncestor);
  }

  showMenu(selection) {
    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    this.menu.style.display = 'flex';

    const menuTop = rect.top + window.scrollY - this.menu.offsetHeight - 10;
    const menuLeft = rect.left + window.scrollX;

    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let finalTop = menuTop;
    if (menuTop < window.scrollY) {
      finalTop = rect.bottom + window.scrollY + 10;
    }

    let finalLeft = menuLeft;
    const menuWidth = this.menu.offsetWidth;

    if (menuLeft + menuWidth > viewport.width + window.scrollX) {
      finalLeft = viewport.width + window.scrollX - menuWidth - 10;
    }
    if (finalLeft < window.scrollX) {
      finalLeft = window.scrollX + 10;
    }

    this.menu.style.top = `${finalTop}px`;
    this.menu.style.left = `${finalLeft}px`;
  }

  hideMenu() {
    this.menu.style.display = 'none';
    this.selectedText = '';
    this.sourceElement = null;

    const selection = window.getSelection();
    if (selection.toString().trim()) {
      selection.removeAllRanges();
    }
  }

  handleClickOutside(event) {
    if (this.menu.style.display === 'flex' && !this.menu.contains(event.target)) {
      this.hideMenu();
    }
  }

  copyText() {
    if (!this.selectedText) return;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.selectedText)
        .then(() => {
          this.showNotification('Текст скопирован в буфер обмена');
        })
        .catch(err => {
          this.fallbackCopyText();
        });
    } else {
      this.fallbackCopyText();
    }
  }

  fallbackCopyText() {
    const textArea = document.createElement('textarea');
    textArea.value = this.selectedText;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        this.showNotification('Текст скопирован в буфер обмена');
      }
    } catch (err) {
      this.showNotification('Ошибка копирования текста', 'error');
    }

    document.body.removeChild(textArea);
  }

  quoteText() {
    if (!this.selectedText) return;

    const authorName = this.getAuthorName();
    const citationBlock = document.querySelector('.post-answer-citation');

    if (citationBlock) {
      const citationName = citationBlock.querySelector('.post-answer__name');
      const citationText = citationBlock.querySelector('p');

      if (citationName) citationName.textContent = `@ ${authorName}`;
      if (citationText) citationText.textContent = this.selectedText;

      citationBlock.style.display = 'flex';

      const citationNotice = document.querySelector('.citation');
      if (citationNotice) {
        citationNotice.style.display = 'flex';
      }
    }
  }

  getAuthorName() {
    if (!this.sourceElement) return 'Автор';

    const post = this.sourceElement.closest('.post');
    if (post) {
      const nameElement = post.querySelector('.post__name span');
      if (nameElement) {
        return nameElement.textContent.trim();
      }
    }

    return 'Автор';
  }

  showNotification(message, type = 'success') {
    let notification = document.querySelector('.copy-notification');

    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'copy-notification';
      document.body.appendChild(notification);
    }

    notification.className = `copy-notification ${type}`;
    notification.textContent = message;

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }
}

class CitationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.post-answer__close')) {
        this.closeCitationBlock();
      }

      if (e.target.closest('.citation__close')) {
        this.closeCitationNotice();
      }

      if (e.target.closest('[data-close]') || e.target.hasAttribute('data-close')) {
        this.closePopup();
      }
    });
  }

  closeCitationBlock() {
    const citationBlock = document.querySelector('.post-answer-citation');
    if (citationBlock) {
      citationBlock.style.display = 'none';
    }
  }

  closeCitationNotice() {
    const citationNotice = document.querySelector('.citation');
    if (citationNotice) {
      citationNotice.style.display = 'none';
    }
  }

  closePopup() {
    const popup = document.querySelector('.popup.popup_show');
    if (popup) {
      popup.classList.remove('popup_show');
      popup.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TextSelectionMenu();
  new CitationManager();
});

//========================================================================================================================================================

//Показать еще
let showmoreButtons = document.querySelectorAll('[data-showmore-button]');

if (showmoreButtons) {
  showmoreButtons.forEach(button => {
    button.addEventListener('click', function () {
      const showmoreBlock = this.closest('[data-showmore]');
      const content = showmoreBlock.querySelector('.showmore__content');
      content.classList.toggle('active');
    });
  });
}

//========================================================================================================================================================

//Сортировка
document.addEventListener('click', function (event) {
  if (event.target.closest('.select1__title')) {
    event.preventDefault();
    event.stopPropagation();

    const selectTitle = event.target.closest('.select1__title');
    const selectElement = selectTitle.closest('.select1');

    if (!selectElement) return;

    const allSelects = document.querySelectorAll('.select1');
    allSelects.forEach(otherSelect => {
      if (otherSelect !== selectElement && otherSelect.classList.contains('active')) {
        otherSelect.classList.remove('active');
      }
    });

    selectElement.classList.toggle('active');
    return;
  }

  const clickedItem = event.target.closest('.options__item');
  if (clickedItem) {
    const input = clickedItem.querySelector('.options__input');
    if (!input) return;

    input.checked = true;

    const selectElement = clickedItem.closest('.select1');
    if (!selectElement) return;

    const titleSpan = selectElement.querySelector('.select1__title span:first-child');
    if (!titleSpan) return;

    const optionText = clickedItem.querySelector('.options__text');
    if (!optionText) return;

    titleSpan.innerHTML = optionText.innerHTML;

    selectElement.classList.remove('active');
    return;
  }

  if (!event.target.closest('.select1')) {
    document.querySelectorAll('.select1.active').forEach(select => {
      select.classList.remove('active');
    });
  }
});

const selectElements2 = document.querySelectorAll('.select2');

if (selectElements2) {
  selectElements2.forEach(selectElement => {
    const selectTitle = selectElement.querySelector('.select2__title');
    const optionInputs = selectElement.querySelectorAll('.options__input');

    selectTitle.addEventListener('click', function () {
      selectElement.classList.toggle('active');
    });

    optionInputs.forEach(input => {
      input.addEventListener('change', function () {
        const checkedCount = selectElement.querySelectorAll('.options__input:checked').length;

        if (checkedCount > 2) {
          this.checked = false;
          return;
        }
      });
    });

    document.addEventListener('click', function (event) {
      if (!selectElement.contains(event.target)) {
        selectElement.classList.remove('active');
      }
    });
  });
}

const selectElements3 = document.querySelectorAll('.select3');

if (selectElements3) {
  selectElements3.forEach(selectElement => {
    const selectTitle = selectElement.querySelector('.select3__title');
    const titleSpan = selectTitle.querySelector('span');
    const optionsContainer = selectElement.querySelector('.select3__options');
    const optionInputs = selectElement.querySelectorAll('.options__input');

    function applyCheckedStyles(checkedInput) {
      if (!checkedInput) return;

      const optionItem = checkedInput.closest('.options__item');
      const optionText = optionItem.querySelector('.options__text');

      optionItem.classList.add('selected');

      if (selectElement.classList.contains('select3-color')) {
        const colorElement = optionText.querySelector('.color');
        const colorTextElement = optionText.querySelector('.color-text');

        const titleColor = titleSpan.querySelector('.color');
        const titleColorText = titleSpan.querySelector('.color-text') || titleSpan;

        if (colorElement && titleColor) {
          titleColor.style.cssText = colorElement.style.cssText;
        }

        if (colorTextElement) {
          if (titleColorText.classList.contains('color-text')) {
            titleColorText.textContent = colorTextElement.textContent;
          } else {
            titleSpan.innerHTML = `<span class="color" style="${colorElement.style.cssText}"></span> ${colorTextElement.textContent}`;
          }
        }
      }
      else {
        const optionTextContent = optionText.textContent;
        titleSpan.textContent = optionTextContent;
        titleSpan.style.cssText = optionText.style.cssText;

        optionInputs.forEach(option => {
          const item = option.closest('.options__item');
          item.style.display = option.checked ? 'none' : 'block';
        });
      }
    }

    function removeCheckedStyles() {
      optionInputs.forEach(input => {
        input.closest('.options__item').classList.remove('selected');
      });
    }

    optionInputs.forEach(input => {
      if (input.checked) {
        applyCheckedStyles(input);
      }
    });

    selectTitle.addEventListener('click', function () {
      selectElement.classList.toggle('active');
    });

    optionInputs.forEach(input => {
      input.addEventListener('change', function () {
        if (this.checked) {
          removeCheckedStyles();
          applyCheckedStyles(this);
          selectElement.classList.remove('active');
        }
      });
    });

    document.addEventListener('click', function (event) {
      if (!selectElement.contains(event.target)) {
        selectElement.classList.remove('active');
      }
    });
  });
}

//========================================================================================================================================================

function getSimplebarContainer() {
  const simplebar = document.querySelector('[data-simplebar]');
  if (simplebar) {
    const contentWrapper = simplebar.querySelector('.simplebar-content-wrapper');
    return contentWrapper || simplebar;
  }
  return null;
}

//Наблюдатель
class ScrollWatcher {
  constructor(props) {
    let defaultConfig = {
      logging: true,
    }
    this.config = Object.assign(defaultConfig, props);
    this.observer;
    !document.documentElement.classList.contains('watcher') ? this.scrollWatcherRun() : null;
  }
  scrollWatcherUpdate() {
    this.scrollWatcherRun();
  }
  scrollWatcherRun() {
    document.documentElement.classList.add('watcher');
    this.scrollWatcherConstructor(document.querySelectorAll('[data-watch]'));
  }
  scrollWatcherConstructor(items) {
    if (items.length) {
      let uniqParams = uniqArray(Array.from(items).map(function (item) {
        if (item.dataset.watch === 'navigator' && !item.dataset.watchThreshold) {
          let valueOfThreshold;
          if (item.clientHeight > 2) {
            valueOfThreshold =
              window.innerHeight / 2 / (item.clientHeight - 1);
            if (valueOfThreshold > 1) {
              valueOfThreshold = 1;
            }
          } else {
            valueOfThreshold = 1;
          }
          item.setAttribute(
            'data-watch-threshold',
            valueOfThreshold.toFixed(2)
          );
        }
        return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : '0px'}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
      }));
      uniqParams.forEach(uniqParam => {
        let uniqParamArray = uniqParam.split('|');
        let paramsWatch = {
          root: uniqParamArray[0],
          margin: uniqParamArray[1],
          threshold: uniqParamArray[2]
        }
        let groupItems = Array.from(items).filter(function (item) {
          let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
          let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : '0px';
          let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
          if (
            String(watchRoot) === paramsWatch.root &&
            String(watchMargin) === paramsWatch.margin &&
            String(watchThreshold) === paramsWatch.threshold
          ) {
            return item;
          }
        });

        let configWatcher = this.getScrollWatcherConfig(paramsWatch);

        this.scrollWatcherInit(groupItems, configWatcher);
      });
    }
  }
  getScrollWatcherConfig(paramsWatch) {
    let configWatcher = {}
    if (document.querySelector(paramsWatch.root)) {
      configWatcher.root = document.querySelector(paramsWatch.root);
    }
    configWatcher.rootMargin = paramsWatch.margin;
    if (paramsWatch.margin.indexOf('px') < 0 && paramsWatch.margin.indexOf('%') < 0) {
      return
    }
    if (paramsWatch.threshold === 'prx') {
      paramsWatch.threshold = [];
      for (let i = 0; i <= 1.0; i += 0.005) {
        paramsWatch.threshold.push(i);
      }
    } else {
      paramsWatch.threshold = paramsWatch.threshold.split(',');
    }
    configWatcher.threshold = paramsWatch.threshold;

    return configWatcher;
  }
  scrollWatcherCreate(configWatcher) {
    console.log(configWatcher);
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        this.scrollWatcherCallback(entry, observer);
      });
    }, configWatcher);
  }
  scrollWatcherInit(items, configWatcher) {
    this.scrollWatcherCreate(configWatcher);
    items.forEach(item => this.observer.observe(item));
  }
  scrollWatcherIntersecting(entry, targetElement) {
    if (entry.isIntersecting) {
      !targetElement.classList.contains('_watcher-view') ? targetElement.classList.add('_watcher-view') : null;
    } else {
      targetElement.classList.contains('_watcher-view') ? targetElement.classList.remove('_watcher-view') : null;
    }
  }
  scrollWatcherOff(targetElement, observer) {
    observer.unobserve(targetElement);
  }
  scrollWatcherCallback(entry, observer) {
    const targetElement = entry.target;
    this.scrollWatcherIntersecting(entry, targetElement);
    targetElement.hasAttribute('data-watch-once') && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
    document.dispatchEvent(new CustomEvent("watcherCallback", {
      detail: {
        entry: entry
      }
    }));
  }
}
modules_flsModules.watcher = new ScrollWatcher({});

//========================================================================================================================================================

//Прокрутка к блоку
let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
  const targetBlockElement = document.querySelector(targetBlock);
  if (targetBlockElement) {
    let headerItem = '';
    let headerItemHeight = 0;

    if (noHeader) {
      headerItem = 'header.header';
      const headerElement = document.querySelector(headerItem);
      if (!headerElement.classList.contains('_header-scroll')) {
        headerElement.style.cssText = `transition-duration: 0s;`;
        headerElement.classList.add('_header-scroll');
        headerItemHeight = headerElement.offsetHeight;
        headerElement.classList.remove('_header-scroll');
        setTimeout(() => {
          headerElement.style.cssText = ``;
        }, 0);
      } else {
        headerItemHeight = headerElement.offsetHeight;
      }
    }

    const simplebarContainer = getSimplebarContainer();

    if (simplebarContainer && simplebarContainer.contains(targetBlockElement)) {
      scrollInSimplebar(targetBlockElement, simplebarContainer, offsetTop, speed);
    } else {
      let options = {
        speedAsDuration: true,
        speed: speed,
        header: headerItem,
        offset: offsetTop,
        easing: 'easeOutQuad',
      };

      document.documentElement.classList.contains("menu-open") ? menuClose() : null;

      if (typeof SmoothScroll !== 'undefined') {
        new SmoothScroll().animateScroll(targetBlockElement, '', options);
      } else {
        let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
        targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
        targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
        window.scrollTo({
          top: targetBlockElementPosition,
          behavior: "smooth"
        });
      }
    }
  }
};
function scrollInSimplebar(targetElement, container, offset = 0, duration = 500) {
  const containerRect = container.getBoundingClientRect();
  const elementRect = targetElement.getBoundingClientRect();

  const scrollPosition = elementRect.top - containerRect.top + container.scrollTop - offset;

  smoothScrollTo(container, scrollPosition, duration);
}
function smoothScrollTo(element, to, duration) {
  const start = element.scrollTop;
  const change = to - start;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easeProgress = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;

    element.scrollTop = start + change * easeProgress;

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}
function pageNavigation() {
  document.addEventListener("click", pageNavigationAction);
  document.addEventListener("watcherCallback", pageNavigationAction);
  function pageNavigationAction(e) {
    if (e.type === "click") {
      const targetElement = e.target;
      if (targetElement.closest('[data-goto]')) {
        const gotoLink = targetElement.closest('[data-goto]');
        const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
        const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
        const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
        const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
        if (modules_flsModules.fullpage) {
          const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest('[data-fp-section]');
          const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
          if (fullpageSectionId !== null) {
            modules_flsModules.fullpage.switchingSection(fullpageSectionId);
            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
          }
        } else {
          gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
        }
        e.preventDefault();
      }
    } else if (e.type === "watcherCallback" && e.detail) {
      const entry = e.detail.entry;
      const targetElement = entry.target;
      if (targetElement.dataset.watch === 'navigator') {
        const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
        let navigatorCurrentItem;
        if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
          navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`);
        } else if (targetElement.classList.length) {
          for (let index = 0; index < targetElement.classList.length; index++) {
            const element = targetElement.classList[index];
            if (document.querySelector(`[data-goto=".${element}"]`)) {
              navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
              break;
            }
          }
        }
        if (entry.isIntersecting) {
          navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null;
        } else {
          navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null;
        }
      }
    }
  }
}
pageNavigation()

//========================================================================================================================================================

const menuPublication = document.querySelector('.menu-publication');

if (menuPublication) {
  menuPublication.querySelector('.menu-publication__button').addEventListener('click', function (e) {
    e.stopPropagation();
    menuPublication.classList.toggle('active');
  });

  menuPublication.querySelector('.menu-publication__content').addEventListener('click', function (e) {
    e.stopPropagation();
    menuPublication.classList.add('active');
  });

  document.addEventListener('click', function (e) {
    if (!menuPublication.contains(e.target)) {
      menuPublication.classList.remove('active');
    }
  });

  const menuLinks = menuPublication.querySelectorAll('a[data-goto]');
  menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('data-goto'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

//========================================================================================================================================================

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      const commentsSection = mutation.target;

      if (commentsSection.classList.contains('_watcher-view')) {
        const bottomBlock = document.querySelector('.block-view-publication__bottom');
        if (bottomBlock) {
          bottomBlock.classList.add('hidden');
        }
      } else {
        const bottomBlock = document.querySelector('.block-view-publication__bottom');
        if (bottomBlock) {
          bottomBlock.classList.remove('hidden');
        }
      }
    }
  });
});
const commentsSection = document.querySelector('.comments-view-publication');
if (commentsSection) {
  observer.observe(commentsSection, {
    attributes: true,
    attributeFilter: ['class']
  });

  // Проверяем начальное состояние
  if (commentsSection.classList.contains('_watcher-view')) {
    const bottomBlock = document.querySelector('.block-view-publication__bottom');
    if (bottomBlock) {
      bottomBlock.classList.add('hidden');
    }
  }
}

//========================================================================================================================================================

// Проверяем есть ли класс tarif и блокируем скролл
if (document.querySelector('.block-view-publication__content')) {
  document.body.classList.add('no-scroll');
}

//========================================================================================================================================================

const closeButtonPublication = document.querySelector('.block-publication__text-close');
if (closeButtonPublication) {
  const publicationText = document.querySelector('.block-publication__text');
  closeButtonPublication.addEventListener('click', function () {
    publicationText.classList.add('hidden');
  });
}

//========================================================================================================================================================

const button = document.querySelector('.right-all-publication__button');
if (button) {
  button.addEventListener('click', function () {
    document.documentElement.classList.add('authors-open');
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.right-all-publication__sticky') &&
      !e.target.closest('.sidebar') &&
      !e.target.closest('.right-all-publication__button')) {

      document.documentElement.classList.remove('authors-open');
    }
  });
}

//========================================================================================================================================================

//Табы
function tabs() {
  const tabs = document.querySelectorAll('[data-tabs]');
  let tabsActiveHash = [];

  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith('tab-')) {
      tabsActiveHash = hash.replace('tab-', '').split('-');
    }
    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add('_tab-init');
      tabsBlock.setAttribute('data-tabs-index', index);
      tabsBlock.addEventListener("click", setTabsAction);
      initTabs(tabsBlock);
    });

    let mdQueriesArray = dataMediaQueries(tabs, "tabs");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach(mdQueriesItem => {
        mdQueriesItem.matchMedia.addEventListener("change", function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }

  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach(tabsMediaItem => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
      let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
      let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
      let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
      tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
      tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add('_tab-spoller');
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove('_tab-spoller');
        }
      });
    });
  }

  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
      tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
    }
    if (tabsContent.length) {
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-title', '');
        tabsContentItem.setAttribute('data-tabs-item', '');

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add('_tab-active');
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
      });
    }
    setTabsStatus(tabsBlock);
  }

  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

    function isTabsAnimate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
      }
      return false;
    }
    const tabsBlockAnimate = isTabsAnimate(tabsBlock);

    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute('data-tabs-hash');
      tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('_tab-active')) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = false;
          }
          if (isHash && !tabsContentItem.closest('.popup')) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }

  function setTabsAction(e) {
    const el = e.target;
    if (el.closest('[data-tabs-title]')) {
      const tabTitle = el.closest('[data-tabs-title]');
      const tabsBlock = tabTitle.closest('[data-tabs]');
      if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
        let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
        tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock);
        if (tabActiveTitle.length) tabActiveTitle[0].classList.remove('_tab-active');
        tabTitle.classList.add('_tab-active');
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}
tabs();

//========================================================================================================================================================

//инфо
const spollerInfo = document.querySelector('.form-spoller__info');

if (spollerInfo) {
  const spollerIcon = spollerInfo.querySelector('.form-spoller__icon');
  spollerIcon.addEventListener('click', function (e) {
    spollerInfo.classList.toggle('active');
  });

  document.addEventListener('click', function (e) {
    if (!spollerInfo.contains(e.target) && spollerInfo.classList.contains('active')) {
      spollerInfo.classList.remove('active');
    }
  });

  spollerInfo.addEventListener('click', function (e) {
    if (spollerInfo.classList.contains('active') && e.target === spollerInfo) {
      spollerInfo.classList.remove('active');
    }
  });
}

const spollerTitles = document.querySelectorAll('.form-spoller__title');

if (spollerTitles) {
  spollerTitles.forEach(title => {
    title.addEventListener('click', function () {
      const spoller = this.closest('.form-spoller');

      if (spoller) {
        spoller.classList.toggle('open');
      }
    });
  });
}

//========================================================================================================================================================

function formFieldsInit(options = { viewPass: true, autoHeight: false }) {
  document.body.addEventListener("focusin", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.add('_form-focus');
        targetElement.parentElement.classList.add('_form-focus');
      }
      formValidate.removeError(targetElement);
      targetElement.hasAttribute('data-validate') ? formValidate.removeError(targetElement) : null;
    }
  });
  document.body.addEventListener("focusout", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.remove('_form-focus');
        targetElement.parentElement.classList.remove('_form-focus');
      }
      targetElement.hasAttribute('data-validate') ? formValidate.validateInput(targetElement) : null;
    }
  });
  if (options.viewPass) {
    document.addEventListener("click", function (e) {
      const targetElement = e.target;
      if (targetElement.closest('.form__viewpass')) {
        const viewpassBlock = targetElement.closest('.form__viewpass');
        const input = viewpassBlock.closest('.form__input').querySelector('input');

        if (input) {
          const isActive = viewpassBlock.classList.contains('_viewpass-active');
          input.setAttribute("type", isActive ? "password" : "text");
          viewpassBlock.classList.toggle('_viewpass-active');
        } else {
          console.error('Input не найден!');
        }
      }
    });
  }
  if (options.autoHeight) {
    const textareas = document.querySelectorAll('textarea[data-autoheight]');
    if (textareas.length) {
      textareas.forEach(textarea => {
        const startHeight = textarea.hasAttribute('data-autoheight-min') ?
          Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
        const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
          Number(textarea.dataset.autoheightMax) : Infinity;
        setHeight(textarea, Math.min(startHeight, maxHeight))
        textarea.addEventListener('input', () => {
          if (textarea.scrollHeight > startHeight) {
            textarea.style.height = `auto`;
            setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
          }
        });
      });
      function setHeight(textarea, height) {
        textarea.style.height = `${height}px`;
      }
    }
  }
}
formFieldsInit({
  viewPass: true,
  autoHeight: false
});
let formValidate = {
  getErrors(form) {
    let error = 0;
    let formRequiredItems = form.querySelectorAll('*[data-required]');
    if (formRequiredItems.length) {
      formRequiredItems.forEach(formRequiredItem => {
        if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
          error += this.validateInput(formRequiredItem);
        }
      });
    }
    return error;
  },
  validateInput(formRequiredItem) {
    let error = 0;

    if (formRequiredItem.dataset.required === "email") {
      formRequiredItem.value = formRequiredItem.value.replace(" ", "");
      if (this.emailTest(formRequiredItem)) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
      this.addError(formRequiredItem);
      this.removeSuccess(formRequiredItem);
      error++;
    } else if (formRequiredItem.dataset.validate === "password-confirm") {
      // Проверяем, совпадает ли пароль с полем #password
      const passwordInput = document.getElementById('password');
      if (!passwordInput) return error;

      if (formRequiredItem.value !== passwordInput.value) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else {
      if (!formRequiredItem.value.trim()) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    }

    return error;
  },
  addError(formRequiredItem) {
    formRequiredItem.classList.add('_form-error');
    formRequiredItem.parentElement.classList.add('_form-error');
    let inputError = formRequiredItem.parentElement.querySelector('.form__error');
    if (inputError) formRequiredItem.parentElement.removeChild(inputError);
    if (formRequiredItem.dataset.error) {
      formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
    }
  },
  removeError(formRequiredItem) {
    formRequiredItem.classList.remove('_form-error');
    formRequiredItem.parentElement.classList.remove('_form-error');
    if (formRequiredItem.parentElement.querySelector('.form__error')) {
      formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
    }
  },
  addSuccess(formRequiredItem) {
    formRequiredItem.classList.add('_form-success');
    formRequiredItem.parentElement.classList.add('_form-success');
  },
  removeSuccess(formRequiredItem) {
    formRequiredItem.classList.remove('_form-success');
    formRequiredItem.parentElement.classList.remove('_form-success');
  },
  formClean(form) {
    form.reset();
    setTimeout(() => {
      let inputs = form.querySelectorAll('input,textarea');
      for (let index = 0; index < inputs.length; index++) {
        const el = inputs[index];
        el.parentElement.classList.remove('_form-focus');
        el.classList.remove('_form-focus');
        formValidate.removeError(el);
      }
      let checkboxes = form.querySelectorAll('.checkbox__input');
      if (checkboxes.length > 0) {
        for (let index = 0; index < checkboxes.length; index++) {
          const checkbox = checkboxes[index];
          checkbox.checked = false;
        }
      }
      if (flsModules.select) {
        let selects = form.querySelectorAll('div.select');
        if (selects.length) {
          for (let index = 0; index < selects.length; index++) {
            const select = selects[index].querySelector('select');
            flsModules.select.selectBuild(select);
          }
        }
      }
    }, 0);
  },
  emailTest(formRequiredItem) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
  }
};
function formSubmit() {
  const forms = document.forms;
  if (forms.length) {
    for (const form of forms) {
      form.addEventListener('submit', function (e) {
        const form = e.target;
        formSubmitAction(form, e);
      });
      form.addEventListener('reset', function (e) {
        const form = e.target;
        formValidate.formClean(form);
      });
    }
  }
  async function formSubmitAction(form, e) {
    const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
    if (error === 0) {
      const ajax = form.hasAttribute('data-ajax');
      if (ajax) {
        e.preventDefault();
        const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
        const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
        const formData = new FormData(form);

        form.classList.add('_sending');
        const response = await fetch(formAction, {
          method: formMethod,
          body: formData
        });
        if (response.ok) {
          let responseResult = await response.json();
          form.classList.remove('_sending');
          formSent(form, responseResult);
        } else {
          alert("Помилка");
          form.classList.remove('_sending');
        }
      } else if (form.hasAttribute('data-dev')) {
        e.preventDefault();
        formSent(form);
      }
    } else {
      e.preventDefault();
      if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
        const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
        gotoBlock(formGoToErrorClass, true, 1000);
      }
    }
  }
  function formSent(form, responseResult = ``) {
    document.dispatchEvent(new CustomEvent("formSent", {
      detail: {
        form: form
      }
    }));
    setTimeout(() => {
      if (flsModules.popup) {
        const popup = form.dataset.popupMessage;
        popup ? flsModules.popup.open(popup) : null;
      }
    }, 0);
    formValidate.formClean(form);
    formLogging(`Форма отправлена!`);
  }
  function formLogging(message) {
    FLS(`[Форма]: ${message}`);
  }
}
formSubmit()

function initPinCodeInput() {
  const pinCodeBlock = document.querySelector('.form__pin-code');
  if (!pinCodeBlock) return;

  const inputs = pinCodeBlock.querySelectorAll('.input');
  let currentInputIndex = 0;

  inputs.forEach(input => {
    input.maxLength = 1;
  });

  if (inputs.length > 0) {
    inputs[0].focus();
  }

  inputs.forEach((input, index) => {
    input.addEventListener('input', function (e) {
      this.value = this.value.replace(/\D/g, '');

      if (this.value.length >= 1) {
        moveToNextInput(index);
      }
    });

    input.addEventListener('keydown', function (e) {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          moveToNextInput(index);
          break;

        case 'ArrowLeft':
          e.preventDefault();
          moveToPreviousInput(index);
          break;

        case 'Backspace':
          handleBackspace(index);
          break;

        case 'Delete':
          e.preventDefault();
          handleDelete(index);
          break;

        case 'Tab':
          e.preventDefault();
          moveToNextInput(index);
          break;

        case 'Enter':
          e.preventDefault();
          moveToNextInput(index);
          break;

        // Блокируем ввод не-цифр
        default:
          if (e.key.length === 1 && !/\d/.test(e.key)) {
            e.preventDefault();
          }
          break;
      }
    });

    input.addEventListener('paste', function (e) {
      e.preventDefault();
      const pastedText = (e.clipboardData || window.clipboardData).getData('text');
      const digits = pastedText.replace(/\D/g, '').split('');

      digits.forEach((digit, i) => {
        if (index + i < inputs.length) {
          inputs[index + i].value = digit;
        }
      });

      const lastFilledIndex = Math.min(index + digits.length - 1, inputs.length - 1);
      if (lastFilledIndex < inputs.length - 1) {
        inputs[lastFilledIndex + 1].focus();
        currentInputIndex = lastFilledIndex + 1;
      } else {
        inputs[lastFilledIndex].focus();
        currentInputIndex = lastFilledIndex;
      }
    });

    input.addEventListener('click', function () {
      currentInputIndex = index;
    });
  });

  function handleBackspace(currentIndex) {
    const input = inputs[currentIndex];

    if (input.value !== '') {
      input.value = '';
    } else if (currentIndex > 0) {
      moveToPreviousInput(currentIndex);
      inputs[currentInputIndex].value = '';
    }
  }

  function handleDelete(currentIndex) {
    for (let i = currentIndex; i < inputs.length; i++) {
      inputs[i].value = '';
    }
    inputs[currentIndex].focus();
  }

  function moveToNextInput(currentIndex) {
    if (currentIndex < inputs.length - 1) {
      currentInputIndex = currentIndex + 1;
      inputs[currentInputIndex].focus();
    }
  }

  function moveToPreviousInput(currentIndex) {
    if (currentIndex > 0) {
      currentInputIndex = currentIndex - 1;
      inputs[currentInputIndex].focus();
    }
  }
}

initPinCodeInput();

//========================================================================================================================================================

const filterButton = document.querySelector('.center-block-myclub__filter-button');
const filterContainer = document.querySelector('.center-block-myclub__filter');

if (filterButton && filterContainer) {
  filterButton.addEventListener('click', function (event) {
    event.stopPropagation();
    filterContainer.classList.toggle('active');
    document.documentElement.classList.add('shadow-open');
  });

  document.addEventListener('click', function (event) {
    if (!filterContainer.contains(event.target)) {
      filterContainer.classList.remove('active');
      document.documentElement.classList.remove('shadow-open');
    }
  });
}

const publicationBlock = document.querySelector('.info-publication');
if (publicationBlock) {
  const button = document.querySelector('.info-publication__button');

  button.addEventListener('click', function (e) {
    e.stopPropagation();
    publicationBlock.classList.toggle('active');
  });

  document.addEventListener('click', function (e) {
    if (!publicationBlock.contains(e.target)) {
      publicationBlock.classList.remove('active');
    }
  });

  publicationBlock.addEventListener('click', function (e) {
    e.stopPropagation();
  });
}

//Радиокнопка
const targetRadios = document.querySelectorAll('.options2-check2');
const radioButtons = document.querySelectorAll('.options2__input');
const checkboxesBlock = document.querySelector('.form-settings-publication__checkboxes');

if (targetRadios.length > 0 && checkboxesBlock) {
  function toggleCheckboxes() {
    let isAnyTargetRadioChecked = false;

    targetRadios.forEach(radio => {
      if (radio.checked) {
        isAnyTargetRadioChecked = true;
      }
    });

    if (isAnyTargetRadioChecked) {
      checkboxesBlock.classList.add("active");
    } else {
      checkboxesBlock.classList.remove("active");
    }
  }

  radioButtons.forEach(radio => {
    radio.addEventListener('change', toggleCheckboxes);
  });

  toggleCheckboxes();
}

//Копировать
const copyButtons = document.querySelectorAll('.copy-btn');
if (copyButtons) {
  copyButtons.forEach(button => {
    button.addEventListener('click', function () {
      const input = this.closest('.form-settings-publication__inputs').querySelector('input[type="text"]');

      const textToCopy = input.value;

      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          const originalText = this.textContent;

          this.textContent = 'Скопировано!';

          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        })
        .catch(err => {
          console.error('Ошибка при копировании: ', err);

          fallbackCopyTextToClipboard(textToCopy);
        });
    });
  });
}

function autoResizeTextarea(textarea) {
  const currentScroll = textarea.scrollTop;

  textarea.style.height = '0px';

  const scrollHeight = textarea.scrollHeight;
  const minHeight = parseInt(textarea.style.minHeight);
  const newHeight = Math.max(scrollHeight, minHeight);

  textarea.style.height = newHeight + 'px';

  textarea.scrollTop = currentScroll;
}
function initAutoResizeTextareas() {
  document.querySelectorAll('.textarea').forEach(textarea => {
    textarea.style.overflowY = 'hidden';
    textarea.style.resize = 'none';

    if (textarea.classList.contains('textarea-title')) {
      textarea.style.minHeight = (window.innerWidth <= 650 ? 49 : 54) + 'px';
    } else if (textarea.classList.contains('textarea-main')) {
      textarea.style.minHeight = (window.innerWidth <= 650 ? 100 : 336) + 'px';
    } else {
      textarea.style.minHeight = '100px';
    }

    autoResizeTextarea(textarea);

    textarea.addEventListener('input', function () {
      autoResizeTextarea(this);
    });
  });
}
window.addEventListener('resize', function () {
  document.querySelectorAll('.textarea').forEach(textarea => {
    const currentValue = textarea.value;

    if (textarea.classList.contains('textarea-title')) {
      textarea.style.minHeight = (window.innerWidth <= 650 ? 49 : 54) + 'px';
    } else if (textarea.classList.contains('textarea-main')) {
      textarea.style.minHeight = (window.innerWidth <= 650 ? 100 : 336) + 'px';
    } else {
      textarea.style.minHeight = '100px';
    }

    textarea.value = '';
    textarea.value = currentValue;

    autoResizeTextarea(textarea);
  });
});
document.addEventListener('DOMContentLoaded', initAutoResizeTextareas);


const icons = document.querySelectorAll('.info-myclub__icon');
if (icons) {
  icons.forEach(icon => {
    icon.addEventListener('click', function () {
      icons.forEach(item => {
        item.classList.remove('active');
      });

      this.classList.add('active');
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.info-myclub__icon')) {
      icons.forEach(icon => {
        icon.classList.remove('active');
      });
    }
  });
}

const searchIcon = document.querySelector('.popup-pin-publication__search-icon');
const searchBlock = document.querySelector('.popup-pin-publication__search');
if (searchBlock) {
  searchIcon.addEventListener('click', function () {
    searchBlock.classList.toggle('active');
  });

  document.addEventListener('click', function (event) {
    if (!searchBlock.contains(event.target) && event.target !== searchIcon) {
      searchBlock.classList.remove('active');
    }
  });
}

const checkboxes = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
if (checkboxes) {
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      const parentColumn = this.closest('.form-settings-publication__column');
      if (parentColumn) {
        if (this.checked) {
          parentColumn.classList.add('active');
        } else {
          parentColumn.classList.remove('active');
        }
      }
    });

    const toggleSwitch = checkbox.closest('.toggle-switch');
  });
}

const btn = document.querySelector('.btn-settings-publication');
const closeBtn = document.querySelector('.arrow-next-close');
if (btn) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    document.documentElement.classList.add('open-settings');
  });
}
if (closeBtn) {
  closeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    document.documentElement.classList.remove('open-settings');
  });
}

const tables = document.querySelectorAll('.tables-block-myclub__table');

if (tables) {
  let activeTable = null;

  function calculatePopupPosition(table) {
    const popup = table.querySelector('.subscribers-block-myclub__popup');
    if (!popup) return;

    const tableRect = table.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const bottomPosition = viewportHeight - tableRect.top - 10;

    popup.style.bottom = `${bottomPosition}px`;
    popup.style.right = '0px';
  }

  function resetPopupPosition(table) {
    const popup = table.querySelector('.subscribers-block-myclub__popup');
    if (popup) {
      popup.style.bottom = '';
      popup.style.right = '';
    }
  }

  tables.forEach(table => {
    table.addEventListener('click', function (e) {
      if (e.target.closest('.subscribers-block-myclub__buttons')) {
        return;
      }

      if (this === activeTable) {
        this.classList.remove('active');
        resetPopupPosition(this);
        activeTable = null;
        return;
      }

      if (activeTable) {
        activeTable.classList.remove('active');
        resetPopupPosition(activeTable);
      }

      this.classList.add('active');
      activeTable = this;

      if (window.innerWidth <= 1300) {
        calculatePopupPosition(this);
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.tables-block-myclub__table') && activeTable) {
      activeTable.classList.remove('active');
      resetPopupPosition(activeTable);
      activeTable = null;
    }
  });

  document.querySelectorAll('.subscribers-block-myclub__buttons .button').forEach(button => {
    button.addEventListener('click', function () {
      const table = this.closest('.tables-block-myclub__table');
      if (table) {
        table.classList.remove('active');
        resetPopupPosition(table);
        if (table === activeTable) {
          activeTable = null;
        }
      }
    });
  });

  window.addEventListener('resize', function () {
    if (activeTable && window.innerWidth <= 1300) {
      calculatePopupPosition(activeTable);
    } else if (activeTable) {
      resetPopupPosition(activeTable);
    }
  });

  window.addEventListener('scroll', function () {
    if (activeTable && window.innerWidth <= 1300) {
      calculatePopupPosition(activeTable);
    }
  });
}

function handleDotsTables() {
  document.addEventListener('click', function (e) {
    const dotsTables = e.target.closest('.dots-tables');

    if (dotsTables && document.querySelector('.tables-block-myclub__table.open-chart')) {
      const table = dotsTables.closest('.tables-block-myclub__table');
      if (table) {
        table.classList.remove('open-chart');
      }
    }

    if (!dotsTables) {
      document.querySelectorAll('.dots-tables.active').forEach(item => {
        item.classList.remove('active');
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
          dropdown.style.top = '';
          dropdown.style.bottom = '';
        }
      });
      return;
    }

    document.querySelectorAll('.dots-tables.active').forEach(item => {
      if (item !== dotsTables) {
        item.classList.remove('active');
        const dropdown = item.querySelector('.dropdown');
        if (dropdown) {
          dropdown.style.top = '';
          dropdown.style.bottom = '';
        }
      }
    });

    const isNowActive = dotsTables.classList.toggle('active');

    if (isNowActive && window.innerWidth <= 1160) {
      const dropdown = dotsTables.querySelector('.dropdown');
      const parentItem = dotsTables.closest('.tables-block-myclub__item');

      if (dropdown && parentItem) {
        const itemRect = parentItem.getBoundingClientRect();
        const topPosition = itemRect.bottom;
        dropdown.style.top = `${topPosition}px`;
        dropdown.style.bottom = 'auto';
      }
    } else {
      const dropdown = dotsTables.querySelector('.dropdown');
      if (dropdown) {
        dropdown.style.top = '';
        dropdown.style.bottom = '';
      }
    }
  });

  function updateChartPosition() {
    if (window.innerWidth <= 1160) {
      document.querySelectorAll('.tables-block-myclub__table.open-chart').forEach(table => {
        const chart = table.querySelector('.chart-tables-myclub');
        const dotsTables = table.querySelector('.dots-tables');
        const parentItem = dotsTables ? dotsTables.closest('.tables-block-myclub__item') : null;

        if (chart && parentItem) {
          const itemRect = parentItem.getBoundingClientRect();
          const topPosition = itemRect.bottom;
          chart.style.top = `${topPosition}px`;
          chart.style.bottom = 'auto';
        }
      });
    } else {
      document.querySelectorAll('.chart-tables-myclub').forEach(chart => {
        chart.style.top = '';
        chart.style.bottom = '';
      });
    }
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth <= 1160) {
      document.querySelectorAll('.dots-tables.active').forEach(dotsTables => {
        const dropdown = dotsTables.querySelector('.dropdown');
        const parentItem = dotsTables.closest('.tables-block-myclub__item');

        if (dropdown && parentItem) {
          const itemRect = parentItem.getBoundingClientRect();
          const topPosition = itemRect.bottom;
          dropdown.style.top = `${topPosition}px`;
          dropdown.style.bottom = 'auto';
        }
      });

      updateChartPosition();
    } else {
      document.querySelectorAll('.dots-tables.active').forEach(dotsTables => {
        const dropdown = dotsTables.querySelector('.dropdown');
        if (dropdown) {
          dropdown.style.top = '';
          dropdown.style.bottom = '';
        }
      });

      document.querySelectorAll('.chart-tables-myclub').forEach(chart => {
        chart.style.top = '';
        chart.style.bottom = '';
      });
    }
  });

  window.addEventListener('scroll', function () {
    if (window.innerWidth <= 1160) {
      document.querySelectorAll('.dots-tables.active').forEach(dotsTables => {
        const dropdown = dotsTables.querySelector('.dropdown');
        const parentItem = dotsTables.closest('.tables-block-myclub__item');

        if (dropdown && parentItem) {
          const itemRect = parentItem.getBoundingClientRect();
          const topPosition = itemRect.bottom;
          dropdown.style.top = `${topPosition}px`;
          dropdown.style.bottom = 'auto';
        }
      });

      updateChartPosition();
    }
  });
}
handleDotsTables();

const chartButtons = document.querySelectorAll('.chart-button');
if (chartButtons) {
  chartButtons.forEach(button => {
    button.addEventListener('click', function () {
      const table = this.closest('.tables-block-myclub__table');
      if (table) {
        table.classList.add('open-chart');

        document.querySelectorAll('.dots-tables.active').forEach(dotsTables => {
          dotsTables.classList.remove('active');
          const dropdown = dotsTables.querySelector('.dropdown');
          if (dropdown) {
            dropdown.style.top = '';
            dropdown.style.bottom = '';
          }
        });

        if (window.innerWidth <= 1160) {
          const chart = table.querySelector('.chart-tables-myclub');
          const dotsTables = table.querySelector('.dots-tables');
          const parentItem = dotsTables ? dotsTables.closest('.tables-block-myclub__item') : null;

          if (chart && parentItem) {
            const itemRect = parentItem.getBoundingClientRect();
            const topPosition = itemRect.bottom;
            chart.style.top = `${topPosition}px`;
            chart.style.bottom = 'auto';
          }
        }
      }
    });
  });
}

const closeButtons = document.querySelectorAll('.chart-tables-myclub__close');
if (closeButtons) {
  closeButtons.forEach(button => {
    button.addEventListener('click', function () {
      const table = this.closest('.tables-block-myclub__table');
      if (table) {
        table.classList.remove('open-chart');

        const chart = table.querySelector('.chart-tables-myclub');
        if (chart) {
          chart.style.top = '';
          chart.style.bottom = '';
        }
      }
    });
  });
}

// Находим кнопки
const pcButton = document.querySelector('.orientation-pc');
const mobButton = document.querySelector('.orientation-mob');

if (mobButton) {
  mobButton.addEventListener('click', function () {
    document.documentElement.classList.add('editor-myclub-mob');

    mobButton.classList.add('active');
    pcButton.classList.remove('active');
  });
}

if (pcButton) {
  pcButton.addEventListener('click', function () {
    document.documentElement.classList.remove('editor-myclub-mob');

    pcButton.classList.add('active');
    mobButton.classList.remove('active');
  });
}

const buttonsClubAbout = document.querySelectorAll('.buttons-club-about__button');

if (buttonsClubAbout) {
  const updateBodyClass = () => {
    const hasActive = document.querySelector('.dots.active');
  };

  buttonsClubAbout.forEach(button => {
    button.addEventListener('click', function (e) {
      e.stopPropagation();

      buttonsClubAbout.forEach(other => {
        if (other !== this) {
          other.classList.remove('active');
        }
      });

      this.classList.toggle('active');
      updateBodyClass();
    });
  });

  document.addEventListener('click', function (e) {
    buttonsClubAbout.forEach(button => {
      if (!button.contains(e.target)) {
        button.classList.remove('active');
      }
    });
    updateBodyClass();
  });
}

//Спойлер
function spollers() {
  const spollersArray = document.querySelectorAll("[data-spollers]");
  if (spollersArray.length > 0) {
    const spollersRegular = Array.from(spollersArray).filter((function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    }));
    if (spollersRegular.length) initSpollers(spollersRegular);

    spollersArray.forEach(spollersBlock => {
      const mediaQuery = spollersBlock.dataset.spollers;
      if (mediaQuery) {
        const [maxWidth, type] = mediaQuery.split(",");
        const width = parseInt(maxWidth);

        if (type === "max" && window.innerWidth <= width) {
          if (!spollersBlock.classList.contains("_spoller-init")) {
            initSpollers([spollersBlock]);
          }
        } else if (type === "max" && window.innerWidth > width) {
          if (spollersBlock.classList.contains("_spoller-init")) {
            spollersBlock.classList.remove("_spoller-init");
            initSpollerBody(spollersBlock, false);
            spollersBlock.removeEventListener("click", setSpollerAction);
          }
        }
      }
    });

    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("_spoller-init");
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);
        } else {
          spollersBlock.classList.remove("_spoller-init");
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      }));
    }

    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
        spollerTitles.forEach((spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            if (!spollerTitle.classList.contains("_spoller-active")) {
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            spollerTitle.nextElementSibling.hidden = false;
          }
        }));
      }
    }

    function setSpollerAction(e) {
      const el = e.target;
      if (el.closest("[data-spoller]")) {
        const spollerTitle = el.closest("[data-spoller]");

        const spollerItem = spollerTitle.closest(".spollers__item, .menu__item");
        const spollersBlock = spollerTitle.closest("[data-spollers]");

        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

        if (!spollersBlock.querySelectorAll("._slide").length) {
          if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
            hideSpollersBody(spollersBlock);
          }

          spollerTitle.classList.toggle("_spoller-active");
          if (spollerItem) spollerItem.classList.toggle("_spoller-active");

          const contentBlock = spollerTitle.nextElementSibling;
          _slideToggle(contentBlock, spollerSpeed);

          e.preventDefault();
        }
      }
    }

    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
      if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
        const spollerItem = spollerActiveTitle.closest(".spollers__item, .menu__item");

        spollerActiveTitle.classList.remove("_spoller-active");
        if (spollerItem) spollerItem.classList.remove("_spoller-active");
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
    }

    const spollersClose = document.querySelectorAll("[data-spoller-close]");
    if (spollersClose.length) {
      document.addEventListener("click", (function (e) {
        const el = e.target;
        if (!el.closest("[data-spollers]")) {
          spollersClose.forEach((spollerClose => {
            const spollersBlock = spollerClose.closest("[data-spollers]");
            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
            spollerClose.classList.remove("_spoller-active");

            const spollerItem = spollerClose.closest(".spollers__item, .menu__item");
            if (spollerItem) spollerItem.classList.remove("_spoller-active");

            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
          }));
        }
      }));
    }
  }
}
spollers();
window.addEventListener('resize', function () {
  spollers();
});

const closeButtonWelcome = document.querySelector('.block-custom-club-welcome__close');
const welcomeBlock = document.querySelector('.block-custom-club-welcome');

if (closeButtonWelcome && welcomeBlock) {
  closeButtonWelcome.addEventListener('click', function (e) {
    e.preventDefault();
    welcomeBlock.classList.add('hidden');
  });
}

const subscribersFilterButton = document.querySelector('.subscribers-myclub-filter_button .center-block-myclub__filter-button');

if (subscribersFilterButton) {
  subscribersFilterButton.addEventListener('click', function () {
    document.documentElement.classList.toggle('subscribers-filter-open');

    document.documentElement.classList.remove('shadow-open');
  });
}

//========================================================================================================================================================

const tariffBlocks = document.querySelectorAll('.tarrifs-design-myclub');

if (tariffBlocks) {
  tariffBlocks.forEach(function (tariffBlock) {
    const toggleSwitch = tariffBlock.querySelector('.design-myclub__title .toggle-switch input[type="checkbox"]');

    if (toggleSwitch) {
      toggleSwitch.addEventListener('change', function () {
        if (this.checked) {
          tariffBlock.classList.add('active');
        } else {
          tariffBlock.classList.remove('active');
        }
      });

      if (toggleSwitch.checked) {
        tariffBlock.classList.add('active');
      } else {
        tariffBlock.classList.remove('active');
      }
    }
  });
}

//========================================================================================================================================================

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('change-email')) {
    const parentInputs = e.target.closest('.block-setting-profile__inputs');
    if (parentInputs) {
      parentInputs.classList.add('active');
    }
  }

  if (e.target.classList.contains('undo-changes-email')) {
    const parentInputs = e.target.closest('.block-setting-profile__inputs');
    if (parentInputs) {
      parentInputs.classList.remove('active');
    }
  }
});

const tablesItems = document.querySelectorAll('.tables-block-myclub__item.main-title');

if (tablesItems) {
  tablesItems.forEach(item => {
    item.addEventListener('click', function () {
      const hasActiveUp = this.classList.contains('active-up');
      const hasActiveDown = this.classList.contains('active-down');

      this.classList.remove('active-up', 'active-down');

      if (!hasActiveUp && !hasActiveDown) {
        this.classList.add('active-up');
      } else if (hasActiveUp) {
        this.classList.add('active-down');
      }
    });
  });
}

//========================================================================================================================================================

document.addEventListener('click', function (event) {
  const toggleButton = event.target.closest('.search-popup-filter__button');

  if (toggleButton) {
    event.stopPropagation();
    const filterElement = toggleButton.closest('.search-popup-filter');

    if (filterElement) {
      const filterBody = filterElement.querySelector('.search-popup-filter__body');

      if (filterBody) {
        const isActive = filterElement.classList.contains('active');

        if (isActive) {
          // Закрываем блок
          _slideUp(filterBody, 300);
          filterElement.classList.remove('active');

          // Поворачиваем иконку обратно
          const icon = toggleButton.querySelector('svg');
          if (icon) {
            icon.style.transform = 'rotate(0deg)';
          }
        } else {
          // Открываем блок
          _slideDown(filterBody, 300);
          filterElement.classList.add('active');

          // Поворачиваем иконку
          const icon = toggleButton.querySelector('svg');
          if (icon) {
            icon.style.transform = 'rotate(-180deg)';
          }
        }
      }
    }
  }
});