// 공통으로 한번. common.js
const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

const preventDefaultAnchor = () => {
    const $links = getAll('a[href="#"]');
    $links.forEach((link) => {
        link.addEventListener('click', (e) => e.preventDefault());
    });
};

const header = () => {
    // 메뉴 active
    const $headerMenu = get('.header_menu');
    const $menuBtn = get('#header .bar');
    const $menuCloseBtn = get('.header_menu .top button');

    $menuBtn.addEventListener('click', (e) => {
        $headerMenu.classList.add('active');
    });
    $menuCloseBtn.addEventListener('click', (e) => {
        $headerMenu.classList.remove('active');
    });

    // 메뉴 탭
    const $lLis = getAll('.header_menu nav .left ul li');
    const $rLis = getAll('.header_menu nav .right ul');

    $lLis.forEach((li, idx) => {
        li.addEventListener('click', (e) => {
            $lLis.forEach((item) => {
                item.classList.remove('active');
            });
            $rLis.forEach((item) => {
                item.classList.remove('active');
            });
            e.target.classList.add('active');
            $rLis[idx].classList.add('active');
        });
    });

    // 메뉴 공지사항
    let swiper = new Swiper('.header_menu .mySwiper', {
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        loop: true,
    });
};
const footer = () => {
    const $descBtn = get('#footer .desc');
    $descBtn.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('active');
    });
};

const comInit = () => {
    header();
    footer();
};

(() => {
    preventDefaultAnchor();
    comInit();
})();
