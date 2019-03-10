function customSlider() {
  const slides = document.querySelectorAll(".slider__item");
  const sliderWrap = document.querySelector('.slider');
  const next = document.getElementById('next');
  const previous = document.getElementById('prev');

  let currentSlide = 0;

  next.onclick = () => nextSlide();

  previous.onclick = () => previousSlide();

  const nextSlide = () => goToSlide(currentSlide+1);

  const previousSlide = () => goToSlide(currentSlide-1);

  const goToSlide = (n) => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n+slides.length)%slides.length;
    slides[currentSlide].classList.add('active');
    let pos = slides[currentSlide].getAttribute('data-pos');
    sliderWrap.style.backgroundImage = `url(./img/slide${pos}.png)`;
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

customSlider();
mobileNav();