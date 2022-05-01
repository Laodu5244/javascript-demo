let slideWidth = 520;
const slides = document.querySelector('.slides');
let slidess = document.querySelectorAll('.slide');
let currentIndex = 1;
let showcase = document.querySelector('.showcase');
let preTime = 0;
let timer;
let spots = document.querySelectorAll('.spot');
/* 设置轮播图区域函数 */
function setSlides() {
    slides.style.width = slideWidth * slidess.length + 'px';
    slides.style.left = '-' + slideWidth * currentIndex + 'px';
    spots[0].classList.add('active');
}
/* 过渡移动函数 */
function transitionMove() {
    slides.style.left = '-' + slideWidth * currentIndex + 'px';
    slides.style.transition = 'left 0.5s';
}
/* 定时器移动函数 */
function timeoutMove() {
    slides.style.left = '-' + slideWidth * currentIndex + 'px';
    slides.style.transition = 'none';
}
/* 展示下一图片的函数 */
function showNextSlide() {
    currentIndex++;
    transitionMove();
    if (currentIndex == slidess.length - 1) {
        currentIndex = 1;
        setTimeout(function () {
            timeoutMove();
        }, 500)
    }
    setSpotActive();
}
/* 展示上一图片的函数 */
function showPrevslide() {
    currentIndex--;
    transitionMove();
    if (currentIndex == 0) {
        currentIndex = slidess.length - 2;
        setTimeout(function () {
            timeoutMove();
        }, 500);
    }
    setSpotActive();
}
/* 绑定事件函数 */
function eventBind() {
    showcase.addEventListener('click', function (e) {
        if (e.target.classList.contains('right')) {
            throttle(showNextSlide, 500);
        }
        else if (e.target.classList.contains('left')) {
            throttle(showPrevslide, 500);
        }
        else if (e.target.classList.contains('spot')) {
            let index = Array.prototype.indexOf.call(spots, e.target);
            currentIndex = index + 1;
            setSpotActive();
            transitionMove();
        }
    })
    showcase.addEventListener('mouseover', function () {
        pausePlay();
    })
    showcase.addEventListener('mouseout', function () {
        autoPlay();
    })
}
/* 自动轮播函数 */
function autoPlay() {
    timer = setInterval(function () {
        showNextSlide();
    }, 2000);
}
/* 暂停轮播函数 */
function pausePlay() {
    clearInterval(timer);
}
/* 防抖节流函数 */
function throttle(fn, delay) {
    let now = Date.now();
    if (now - preTime >= delay) {
        fn();
        preTime = Date.now();
    }
}
/* 小圆点选取函数 */
function setSpotActive() {
    for (let i = 0; i < spots.length; i++) {
        if (i == currentIndex - 1) {
            spots[i].classList.add('active');
        }
        else {
            spots[i].classList.remove('active');
        }
    }
}
/* 初始化函数 */
function init() {
    setSlides();
    eventBind();
    autoPlay()
}
init()