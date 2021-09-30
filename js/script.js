// =================  поиск  ===================

const searchIcon = document.querySelector('.search__icon');
const searchInput = document.querySelector('.search__input');

searchIcon.addEventListener("click", function() {
   searchInput.classList.toggle('active');
   searchInput.focus();
});



// =================  слайдер  =================== //

// ============  слайдер при прокрутке мыши  ============ 

const slider = document.querySelector('.slider');
const sliderItems = document.querySelectorAll('.slider-item');
const totalSlide = document.querySelector('.total-slide');
const current = document.querySelector('.current-slide');
let currentSlide = 0;

// определяет общее к-во слайдов и записывает в html 
totalSlide.innerHTML = '0' + String(sliderItems.length);

// запускаем сначала до любых действий со слайдером, чтобы
// определить начальный первый слайд
checkCurrentSLide();

document.querySelector('.slider').addEventListener("mousewheel", moveSlider);
document.querySelector('.slider').addEventListener("mousewheel", checkCurrentSLide);


// ============  слайдер на тачскрине  ============ //

slider.addEventListener('touchstart', handleTouchStart, false);
slider.addEventListener('touchmove', handleTouchMove, false);
slider.addEventListener('touchend', checkCurrentSLide, false);

let x1 = null;
let y1 = null;

function handleTouchStart(event) {
   // определяет координаты touchstart
   const firstTouch = event.touches[0];
   x1 = firstTouch.clientX;
   y1 = firstTouch.clientY;
};

function handleTouchMove(event) {
   // находит координаты touchsmove и в зависимости от них, 
   // опеделяет, влево или вправо свайпим
   if (!x1 || !y1) {
      return false;
   }
   let x2 = event.touches[0].clientX;
   let y2 = event.touches[0].clientY;

   let xDifference = x2 - x1;
   let yDifference = y2 - y1;

   if (Math.abs(xDifference) > Math.abs(yDifference)) {
      // влево - вправо
      if (xDifference > 0) {
         // если свайпаем вправо
         switchPrevSlide();
      } else {
         // если свайпаем вправо
         switchNextSlide();
      }
   } else {
      // если свайпаем строго вниз или вверх - ничего не произойдет
      return;
   }
   x1 = 0;
   y1 = 0;
};

function checkCurrentSLide() {
   // проверяет номер текущего слайда и записывает в html
   for (let i = 0; i < sliderItems.length; i++) {
      if (sliderItems[i].classList.contains('active')) {
         current.innerHTML = '0' + String(i+1) + '/';
      }
   }  
}

function moveSlider(event) {
   // проверяет, куда скролится колесико мыши
   let scroll = event.deltaY;

   // скролл вперед
   if (scroll > 0) {
      // перключаем следующий слайд
      switchNextSlide();

      // скролл назад
   } else if (scroll < 0) {
      // перключаем предыдущий слайд
      switchPrevSlide();
   }  
}

function switchNextSlide() {
   // перключаем следующий слайд
   if (currentSlide == sliderItems.length-1) {
      currentSlide = 0;
   } else {
      currentSlide++;
   }
   showSlide();
};

function switchPrevSlide() {
   // перключаем предыдущий слайд
   if (currentSlide == 0) {
      currentSlide = sliderItems.length-1;
   } else {
      --currentSlide;
   }
   showSlide();
}

function showSlide() {
   // добавляет активному слайду класс active
   sliderItems.forEach(slide => {
      slide.classList.remove('active');
   });
   sliderItems[currentSlide].classList.add('active');
};

// =================  слайдер - конец  =================== //



// =================  попап  ================= //

const playButtons = document.querySelectorAll('.play-button');
const body = document.querySelector('body');
const wrapper = document.querySelector('.wrapper');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup-close');
let videoSrc = document.querySelector('.iframe').getAttribute('src');

playButtons.forEach(playButton => {
   playButton.addEventListener("click", function(e) {
      bodyLock();
      popup.classList.add('open');
      wrapper.classList.add('blur');
   
      // закрывает попап
      popup.addEventListener("click", function(e) {
         if (!e.target.closest('.popup-inner') || e.target == popupClose) {
            bodyUnlock();
            this.classList.remove('open');
            wrapper.classList.remove('blur');
   
            // чтобы воспроизведение видео прекращалось при закрытии попапа
            document.querySelector('.iframe').setAttribute('src', videoSrc);
         }
      })
   })
})


function bodyLock() {
   // узнаем ширину правого скролла и при открытом попапе устанавливаем padding-right такого же размера,
   // чтобы не дергалось при открытии попапа, добавляем body класс lock
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('lock');
}

function bodyUnlock() {
   // убираем у body класс lock
   body.classList.remove('lock');
   body.style.paddingRight = '0px';
}



// ============  бургер-меню  ============ 

const burger = document.querySelector('.burger');
const nav = document.querySelector('.sidebar-menu');
const navLinks = document.querySelectorAll('.sidebar-menu__link');

burger.addEventListener('click', function(e) {
   document.body.classList.toggle('lock');
   nav.classList.toggle('active');
   burger.classList.toggle('active');
})

navLinks.forEach(navLink => {
   navLink.addEventListener('click', onNavLinkClick);
})

function onNavLinkClick(e) {
   const navLink = e.target;
   if (burger.classList.contains('active')) {
      document.body.classList.remove('lock');
      nav.classList.remove('active');
      burger.classList.remove('active');
   }
}



