function customSlider() {
  const slides = document.querySelectorAll(".slider__item");
  const sliderWrap = document.querySelector('.slider');
  const next = document.getElementById('next');
  const previous = document.getElementById('prev');

  let currentSlide = 0;

  next.onclick = (e) =>  {
    e.preventDefault();
    nextSlide();
  }

  previous.onclick = (e) => {
    e.preventDefault();
    previousSlide();
  }

  const nextSlide = () => goToSlide(currentSlide+1);

  const previousSlide = () => goToSlide(currentSlide-1);

  const goToSlide = (n) => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].classList.add('active');
    let pos = slides[currentSlide].getAttribute('data-pos');
    sliderWrap.style.backgroundImage = `url(./img/slide${pos}.png)`;
    document.querySelector('.slider__nav span.active').classList.remove('active');
    document.querySelector(`.slider__nav span[data-slide="${pos}"]`).classList.add('active');
  }

  const sliderDots = document.querySelectorAll('.slider__nav span');

  for (let dot of sliderDots) {
    dot.onclick = () => {

      document.querySelector('.slider__nav span.active').classList.remove('active');
      
      dot.classList.add('active');
      const slideNumber = dot.getAttribute('data-slide');

      goToSlide(slideNumber-1);
    }
  }
}


function mobileNav() {
  const navBtn = document.querySelector('.header__btn');
  const overlay = document.querySelector('.overlay');
  const nav = document.querySelector('.nav');

  navBtn.onclick = () => {
    document.querySelector('body').classList.toggle('stop-scroll');
    overlay.classList.toggle('active');
    navBtn.classList.toggle('active');
    nav.classList.toggle('mobile');
  }
}

function anchorScroll() {
  const links = document.querySelectorAll('.nav__link');

  for (let link of links) {
    link.onclick = e => {
      e.preventDefault();
      
      const blockID = link.getAttribute('href');
      
      document.querySelector(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });


      // for mobile nav
      if (document.body.clientWidth <= 1360) {
        document.querySelector('body').classList.remove('stop-scroll');
        document.querySelector('.overlay').classList.remove('active');
        document.querySelector('.header__btn').classList.remove('active');
        document.querySelector('.nav').classList.remove('mobile');
      }
    }
  }
}


function animateOnScroll() {
  const elements = document.querySelectorAll('*[data-animate]');

  for (let element of elements) {
    window.addEventListener("scroll", scrolling, false);
    
    function scrolling(e) {

      if (isVisible(element)) {
        element.classList.add("animate");
      }
    }
    
    function isVisible(el) {
      const elementBoundary = el.getBoundingClientRect();

      let top = elementBoundary.top;
      let bottom = elementBoundary.bottom;

      return ((top >= 0) && (bottom <= window.innerHeight));
    }
  }
}

function shareDynamicColor() {
  const share = document.querySelector('.share');

  window.addEventListener("scroll", scroll, false);

  function scroll() {
    if (window.pageYOffset > 150 && window.pageYOffset < 3700 || window.pageYOffset > 4320) {
      share.classList.add('share_dark');
    } else {
      share.classList.remove('share_dark');
    }
  }
}

customSlider();
mobileNav();
anchorScroll();
animateOnScroll();
shareDynamicColor()