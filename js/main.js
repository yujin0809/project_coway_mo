// 메인 함수
const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

const slide = () => {
    var swiper = new Swiper('.visual .mySwiper', {
        // pagination: {
        //     el: '.swiper-pagination',
        //     type: 'progressbar',
        // },
        autoplay: {
            delay: 3000,
            // disableOnInteraction: false,
        },
        loop: true,
        slidesPerView: 1,
        centeredSlides: true,
        freeMode: false,
    });
    var swiper = new Swiper('.recommend .mySwiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 1.4,
        spaceBetween: 6,
    });
    var swiper = new Swiper('.event .mySwiper', {
        autoplay: {
            delay: 3000,
            // disableOnInteraction: false,
        },
        loop: true,
        spaceBetween: 16,
    });
    var swiper = new Swiper('.service .mySwiper', {
        effect: 'fade',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
        autoplay: {
            delay: 3000,
            // disableOnInteraction: false,
        },
    });
};
const topBtnScroll = () => {
    const $topBtn = get('.main .top-btn');
    let sy = 0;
    window.addEventListener('scroll', (e) => {
        sy = window.scrollY;

        if (sy > 400) {
            $topBtn.classList.add('active');
            $topBtn.addEventListener('click', (e) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        } else {
            $topBtn.classList.remove('active');
        }
    });
};

const mainInit = () => {
    slide();
    topBtnScroll();
};

(() => {
    mainInit();
})();
