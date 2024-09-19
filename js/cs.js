const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

// sub header 뒤로가기 -----
const $prevBtn = get('#header .prev');
$prevBtn.addEventListener('click', (e) => {
    history.back();
});
// ----------

const cs = () => {
    const faqSlide = () => {
        const $slideWrap = get('.cs-home .menu');
        const $slide = get('.cs-home .menu-slide');
        const $slides = getAll('.cs-home .menu-slide li');
        const slideHeight = 12.889;
        let currentIdx = 0,
            cnt = $slides.length;

        makeClone();
        $slides[currentIdx].classList.add('active');
        function makeClone() {
            for (let i = 0; i < cnt; i++) {
                let cloneSlide = $slides[i].cloneNode(true);
                cloneSlide.classList.add('clone');
                $slide.appendChild(cloneSlide);
            }
            for (let i = cnt - 1; i >= 0; i--) {
                let cloneSlide = $slides[i].cloneNode(true);
                cloneSlide.classList.add('clone');
                $slide.prepend(cloneSlide);
            }
            updateHeight();
            setInitialPos();

            setTimeout(function () {
                $slide.classList.add('animated');
            }, 100);
        }
        function updateHeight() {
            let $currentSlides = getAll('.cs-home .menu-slide li');
            let newSlideCnt = $currentSlides.length;

            let newHeight = slideHeight * newSlideCnt - 6.667 + 'vw';
            $slide.style.height = newHeight;
        }
        function setInitialPos() {
            let initialTranslateValue = -slideHeight * cnt;
            $slide.style.transform = `translateY(${initialTranslateValue}vw)`;
        }

        function moveSlide(num) {
            $slides[currentIdx].classList.remove('active');
            $slide.style.top = -num * slideHeight + 47.222 + 'vw';
            if (num < cnt) {
                $slides[num].classList.add('active');
            }
            currentIdx = num;
            if (currentIdx === cnt) {
                $slides[0].classList.add('active');
                setTimeout(function () {
                    $slide.classList.remove('animated');
                    $slide.style.top = '12.889vw';
                    currentIdx = 0;
                }, 500);
                setTimeout(function () {
                    $slide.classList.add('animated');
                }, 600);
            }
        }
        setInterval(() => {
            moveSlide(currentIdx + 1);
        }, 1500);
    };

    const noticeSlide = () => {
        const noticeArr = [
            { title: '안심번호서비스 서버 점검 안내', date: '2024.08.13' },
            { title: '코웨이닷컴 개인정보 처리방침 개정 고지', date: '2024.07.18' },
            { title: '코웨이 계약/멤버십 약관 개정 고지', date: '2024.07.16' },
            { title: '코웨이닷컴 개인정보 처리방침 개정 고지', date: '2024.06.27' },
            { title: '코웨이 계약/멤버십 약관 개정 고지', date: '2024.06.25' },
        ];

        const $title = get('.notice .box .slide strong');
        const $date = get('.notice .box .slide p');
        const $txtCount = get('.notice .box .right .count');
        const $txtTotal = get('.notice .box .right .total');
        const $btn = get('.notice .box .right button');
        const $btnIcon = get('.notice .box .right button i');
        const total = noticeArr.length;
        let cnt = 0,
            timer = null,
            isPlay = true;

        timer = setInterval(slider, 3000);
        /* $btn.addEventListener('click', (e) => {
            if (isPlay) {
                clearInterval(timer);
                isPlay = false;
                $btnIcon.className = 'xi-play';
            } else {
                timer = setInterval(slider, 2000);
                isPlay = true;
                $btnIcon.className = 'xi-pause';
            }
        }); */

        function slider() {
            cnt = (cnt + 1) % total;

            $title.classList.remove('fade-in');
            $date.classList.remove('fade-in');

            setTimeout(() => {
                $title.textContent = `${noticeArr[cnt].title}`;
                $date.textContent = `${noticeArr[cnt].date}`;
                $txtCount.textContent = `${cnt + 1}`;
                $txtTotal.textContent = `${total}`;

                $title.classList.add('fade-in');
                $date.classList.add('fade-in');
            }, 500);
        }
    };

    faqSlide();
    noticeSlide();
};

const subInit = () => {
    // 고객지원 홈
    if (location.pathname.split('/').pop() === 'csHome.html') {
        cs();
    }
    // -------------
};

(() => {
    subInit();
})();
