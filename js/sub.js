// 혜림언니 ------
import { stn, ov, rpd } from './data.js';

// 인준님 ------------
import { lifeEleData, waterEleData, berexEleData, refurbData } from './products.js';
import { lifeEleOption, waterEleOption, berexEleOption } from './itemOption.js';

const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

// 데이터 객체
let objectData = [];
// 데이터 객체 연결 분기점
if (location.pathname.split('/').pop() === 'lifeelc.html') objectData = lifeEleData;
if (location.pathname.split('/').pop() === 'MoLifeElc.html') objectData = lifeEleData; // 모바일
if (location.pathname.split('/').pop() === 'waterelc.html') objectData = waterEleData;
if (location.pathname.split('/').pop() === 'berexelc.html') objectData = berexEleData;
if (location.pathname.split('/').pop() === 'refurb.html') objectData = refurbData;

// 서브 페이지의 공통부분

// 모달창
const showPopup = (text, text2) => {
    document.getElementById('popupTitle').textContent = text;
    document.getElementById('popupDesc').textContent = text2;
    document.getElementById('modal').style.opacity = '1';
    document.getElementById('modal').style.visibility = 'visible';
};
const closePopup = () => {
    document.getElementById('modal').style.opacity = '0';
    document.getElementById('modal').style.visibility = 'hidden';
};
get('#modal .close').addEventListener('click', closePopup);
get('#modal .sure').addEventListener('click', closePopup);

// 제품 사용 함수
// Hex to color
const hexToColor = (hex) => {
    if (hex === '#cddbe8') return '블루';
    if (hex === '#656667') return '그레이';
    if (hex === '#eae7e0') return '화이트';
    if (hex === '#eed4cf') return '핑크';
    if (hex === '#5c5858') return '페블 그레이';
    if (hex === '#d8b6ac') return '히말라얀 솔트 핑크';
    if (hex === '#e2dad1') return '오트밀 베이지';
    if (hex === 'black') return '블랙';
    if (hex === 'white') return '화이트';
    if (hex === '#C7C8C7') return '그레이';
    if (hex === '#CCBEB8') return '핑크';
    if (hex === '#A0A99F') return '그린';
    if (hex === '#ffffff') return '포슬린 화이트';
    if (hex === '#7a7a7a') return '페블 그레이';
    if (hex === '#a69e98') return '샴페인 베이지';
    if (hex === '#494a4e') return '잉크 블랙';
    if (hex === '#7C595E') return '로즈 브라운';
    if (hex === '#A4B2B6') return '아틱 그레이';
    if (hex === '#eae7db') return '크림 화이트';
    if (hex === '#997d65') return '모카 브라운';
    if (hex === '#d3d3d3') return '미스틱 그레이';
    if (hex === '#baa289') return '샌드 베이지';
    if (hex === '#c09885') return '테라코타 핑크';
    if (hex === '#8f9fb5') return '헤이지 블루';
};
// str을 숫자 단위로 변환 (쉼표 추가)
const strToNum = (str) => {
    const num = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return num;
};

// 서브 페이지별 함수 ---------------------------------

// 제품 ---
// 주방/생활가전
const lifeElc = () => {
    // sub header 뒤로가기 -----
    const $prevBtn = get('#header .prev');
    $prevBtn.addEventListener('click', (e) => {
        history.back();
    });
    // ----------
    // 주방/생활가전 내 전역변수
    let pressBtnCnt = 0;
    let sortData = objectData;

    // 모달창2
    const showPopup2 = () => {
        document.getElementById('modal2').style.opacity = '1';
        document.getElementById('modal2').style.visibility = 'visible';
    };
    const closePopup2 = () => {
        document.getElementById('modal2').style.opacity = '0';
        document.getElementById('modal2').style.visibility = 'hidden';
    };
    get('#modal2 .close').addEventListener('click', closePopup2);

    const mainImgCss = () => {
        const h1 = get('#lifeElc .imgInfo .h1');
        const h2 = get('#lifeElc .imgInfo .h2');
        const div = get('#lifeElc .imgInfo div');
        setTimeout(() => {
            h1.classList.add('on');
        }, 200);
        setTimeout(() => {
            h2.classList.add('on');
        }, 400);
        setTimeout(() => {
            div.classList.add('on');
        }, 600);
    };

    const compareAllBtn = () => {
        const compareBtn = getAll('#lifeElc .contents .itemList ul .listLi .btm .compareBtn');
        const compareP = get('#lifeElc .compareDiv .compareCntDiv .compareP');

        // 배경 div css 처리
        const comDivs = getAll('#lifeElc .compareDiv .compareShowDiv ul li .divStep');
        const comPs = getAll('#lifeElc .compareDiv .compareShowDiv ul li .divStep .comment');
        comDivs.forEach((div, idx) => {
            div.classList.remove('Com');
            div.classList.add('noCom');
            comPs[idx].style.display = 'block';
        });

        // 태그 삭제 처리
        const compareCloseBtns = getAll('#lifeElc .compareDiv .compareShowDiv ul li .divStep .closeBtn');
        const compareDiv = get('#lifeElc .compareDiv');
        const compareShowDiv = get('#lifeElc .compareDiv .compareShowDiv');
        const compareImg = getAll('#lifeElc .compareDiv .compareShowDiv ul li .divStep img');
        const compareModel = getAll('#lifeElc .compareDiv .compareShowDiv ul li .divStep .model');
        const compareName = getAll('#lifeElc .compareDiv .compareShowDiv ul li .divStep .name');

        compareCloseBtns.forEach((btn) => btn.remove());
        compareImg.forEach((img) => img.remove());
        compareModel.forEach((model) => model.remove());
        compareName.forEach((name) => name.remove());

        pressBtnCnt = 0;

        // 비교담기 버튼 초기화
        compareBtn.forEach((comB) => {
            comB.classList.remove('active');
        });

        // text 및 div 높이 조정
        compareP.innerHTML = `비교하실 제품이 <span>${pressBtnCnt}</span> 개 담겼습니다.`;
        if (pressBtnCnt === 0) {
            if (compareDiv.style.height === '270px') {
                compareDiv.style.height = '70px';
                compareShowDiv.style.display = 'none';
            }
            compareDiv.style.height = '0px';
            compareDiv.style.transform = 'translateY(0)';
        }
    };

    const list = get('#lifeElc .contents .itemList');
    const total = get('#lifeElc .contents .itemList p');
    const sortBtn = get('#lifeElc .contents .itemList .sort');

    // 메인 이미지 배너 클릭
    const mainImage = get('#lifeElc .imgInfo div');
    mainImage.addEventListener('click', (e) => {
        location.href = '/page/products/lifeelc/lifeelcDetail.html';
        // 모바일 경로 지정
        if (location.pathname.split('/').pop() === 'MoLifeElc.html') location.href = './lifeelc/MoLifeElcDetail.html';
        // localstorage 사용
        if (location.pathname.split('/').pop() === 'lifeelc.html') localStorage.setItem('productDetail', JSON.stringify(objectData[7]));
        if (location.pathname.split('/').pop() === 'MoLifeElc.html') localStorage.setItem('productDetail', JSON.stringify(objectData[7])); // 모바일
        if (location.pathname.split('/').pop() === 'waterelc.html') localStorage.setItem('productDetail', JSON.stringify(objectData[2]));
        if (location.pathname.split('/').pop() === 'berexelc.html') localStorage.setItem('productDetail', JSON.stringify(objectData[5]));
        if (location.pathname.split('/').pop() === 'refurb.html') localStorage.setItem('productDetail', JSON.stringify(objectData[1]));
    });

    // 필터

    // 리퍼브 기획전은 필터 예외 처리
    if (location.pathname.split('/').pop() === 'refurb.html') {
        const filterHidden = get('#lifeElc .contents .filter');
        filterHidden.style.display = 'none';
    }

    const arrow = get('#lifeElc .contents .filter p .arrow');
    const arrowImg = get('#lifeElc .contents .filter .category p img');
    const defaultCate = get('#lifeElc .contents .filter .category ul');
    let category = false;
    arrow.addEventListener('click', (e) => {
        category = !category;
        if (category) {
            arrowImg.setAttribute('src', `/../images/common/arr_down1.png`);
            arrow.parentElement.parentElement.classList.add('active');
            defaultCate.classList.add('active');
        } else {
            arrowImg.setAttribute('src', `/../images/common/arr_up1.png`);
            arrow.parentElement.parentElement.classList.remove('active');
            defaultCate.classList.remove('active');
        }
    });
    // 필터 리셋
    const filterReset = document.querySelector('#lifeElc .contents .filter .filterReset');
    filterReset.addEventListener('click', (e) => {
        // console.log(1);
        let categoryArray = document.getElementsByName('lifeElc');
        categoryArray.forEach((item) => {
            item.checked = false;
        });

        // 기존 ul 삭제 & 제품 리셋 & 비교 제품 리셋
        const delUl = get('#lifeElc .contents .itemList .listUl');
        delUl.remove();
        const delCompare = get('#lifeElc .compareDiv');
        delCompare.remove();
        sortData = [...objectData].sort((a, b) => a.id - b.id); // 기존 배열 유지 처리
        showItem(sortData);
        compareAllBtn();
        // 건수 업데이트
        const filterCnt = get('#lifeElc .contents .itemList .totalcnt');
        filterCnt.textContent = `${sortData.length} 건`;
    });

    // 필터 기능
    let categoryArray = document.getElementsByName('lifeElc');
    categoryArray.forEach((cate, idx) => {
        cate.addEventListener('click', (e) => {
            const filterCnt = get('#lifeElc .contents .itemList .totalcnt');
            if (idx === 0) categoryArray[1].checked = false;
            if (idx === 1) categoryArray[0].checked = false;

            if (cate.checked) {
                const cateId = cate.getAttribute('id');
                sortData = objectData.filter((item) => item.category === cateId);

                // 기존 ul 삭제 & 제품 리셋 & 비교 제품 리셋
                const delUl = get('#lifeElc .contents .itemList .listUl');
                delUl.remove();
                const delCompare = get('#lifeElc .compareDiv');
                delCompare.remove();
                showItem(sortData);
                compareAllBtn();
                filterCnt.textContent = `${sortData.length} 건`;
            }

            // 둘다 체크 해제
            if (!categoryArray[0].checked && !categoryArray[1].checked) {
                // 기존 ul 삭제 & 제품 리셋 & 비교 제품 리셋
                const delUl = get('#lifeElc .contents .itemList .listUl');
                delUl.remove();
                const delCompare = get('#lifeElc .compareDiv');
                delCompare.remove();
                showItem(objectData);
                compareAllBtn();
                filterCnt.textContent = `${sortData.length} 건`;
            }
            if (!categoryArray[0].checked && !categoryArray[1].checked) {
                // 건수 업데이트
                filterCnt.textContent = `${objectData.length} 건`;
            }
        });
    });

    // 필터 div 상단 고정
    const filter = get('#lifeElc .contents .filter');
    const filterOffsetTop = filter.offsetTop;

    const handleScroll = () => {
        if (location.pathname.split('/').pop() !== 'MoLifeElc.html') {
            if (filter.style.display !== 'none') {
                const scrollPosition = window.pageYOffset;

                if (scrollPosition > filterOffsetTop) {
                    filter.style.position = 'fixed';
                    filter.style.top = '20px';
                    list.style.marginTop = '20px';
                    list.style.marginLeft = '200px';
                } else {
                    filter.style.position = 'static';
                    list.style.marginTop = '0';
                    list.style.marginLeft = '0';
                }
            } else {
                list.style.marginTop = '20px';
                list.style.marginLeft = '200px';
            }
        }
    };
    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', handleScroll);
    // 휠 이벤트 리스너
    window.addEventListener('wheel', handleScroll);

    // 정렬 div 생성
    const itemListNext = get('#lifeElc .contents .itemList ul');
    const div = document.createElement('div');
    div.classList.add('sortList');
    list.append(div);
    const ul = document.createElement('ul');
    const sortStr = ['신상품순', '판매순', '가격 낮은순', '가격 높은순'];
    sortStr.forEach((sort, idx) => {
        const li = document.createElement('li');
        li.textContent = sortStr[idx];
        ul.append(li);
    });
    total.textContent = `${objectData.length} 건`; // 노출될 건수
    div.prepend(ul);

    // 정렬
    const sortList = get('#lifeElc .contents .itemList .sortList');
    let sortFlag = false;
    sortBtn.addEventListener('click', (e) => {
        sortFlag = !sortFlag;
        if (sortFlag) sortList.style.display = 'block';
        else sortList.style.display = 'none';
        // 정렬 요소 클릭
        const lis = getAll('#lifeElc .contents .itemList .sortList ul li');
        lis.forEach((li, idx) => {
            li.addEventListener('click', (e) => {
                sortBtn.innerHTML = `${lis[idx].textContent} <img class="arrow" src="/../../images/common/arr_down1.png" alt="arrowDown" />`;
                // id 정렬
                if (idx === 0) sortData = [...objectData].sort((a, b) => a.id - b.id);
                // 판매순 정렬
                else if (idx === 1) sortData = [...objectData].sort((a, b) => b.starCnt - a.starCnt);
                // 낮은 가격순
                else if (idx === 2) sortData = [...objectData].sort((a, b) => a.purPrice - b.purPrice);
                // 높은 가격순
                else if (idx === 3) sortData = [...objectData].sort((a, b) => b.purPrice - a.purPrice);

                // // 기존 ul 삭제 & 필터리셋 & 제품 정렬 & 비교제품 리셋
                const delUl = get('#lifeElc .contents .itemList .listUl');
                delUl.remove();
                let categoryArray = document.getElementsByName('lifeElc');
                categoryArray.forEach((item) => {
                    item.checked = false;
                });
                const delCompare = get('#lifeElc .compareDiv');
                delCompare.remove();
                showItem(sortData);
                compareAllBtn();
                // 건수 업데이트
                const filterCnt = get('#lifeElc .contents .itemList .totalcnt');
                filterCnt.textContent = `${sortData.length} 건`;
            });
        });
    });

    const showItem = (data) => {
        // 아이템 리스트
        const listUl = document.createElement('ul');
        listUl.classList.add('listUl');
        sortList.before(listUl);
        data.forEach((data, idx) => {
            const listLi = document.createElement('li');
            listLi.classList.add('listLi');

            // top
            const top = document.createElement('div');
            top.classList.add('top');

            // NEW 문구 체크 (리퍼브 기획전 예외 처리)
            if (location.pathname.split('/').pop() !== 'refurb.html') {
                if (data.new) {
                    const newP = document.createElement('p');
                    newP.classList.add('new');
                    newP.textContent = 'NEW';
                    top.append(newP);
                }
                if (data.new && data.best) {
                    const pointSpan = document.createElement('span');
                    pointSpan.classList.add('point');
                    top.append(pointSpan);
                }

                // BEST 문구 체크
                if (data.best) {
                    const bestP = document.createElement('p');
                    bestP.classList.add('best');
                    bestP.textContent = 'BEST';
                    top.append(bestP);
                }
                const proP = document.createElement('p');
                proP.classList.add('pro');
                proP.textContent = '프로모션 진행중';
                top.append(proP);
            }

            // 리퍼브 문구 체크 (리퍼브 기획전 예외 처리)
            else if (location.pathname.split('/').pop() === 'refurb.html') {
                const refurbP = document.createElement('p');
                refurbP.classList.add('refurb');
                refurbP.textContent = '리퍼브';
                top.append(refurbP);
            }

            // mid - photo
            const midPhoto = document.createElement('div');
            midPhoto.classList.add('midPhoto');

            // 제품 사진
            const img = document.createElement('img');
            img.setAttribute('src', `${data.imgUrl}`);
            img.setAttribute('width', `290px`);
            const a = document.createElement('a');
            // 상세페이지 url 설정
            if (location.pathname.split('/').pop() === 'MoLifeElc.html') a.setAttribute('href', `./lifeelc/MoLifeElcDetail.html`);
            else a.setAttribute('href', `../products/lifeelc/lifeelcDetail.html`);
            a.addEventListener('click', (e) => {
                // localstorage 사용
                localStorage.setItem('productDetail', JSON.stringify(data));
            });

            a.append(img);
            midPhoto.append(a);

            // mid - color
            const midColor = document.createElement('div');
            midColor.classList.add('midColor');

            // 색상 여러개
            if (typeof data.color === 'object') {
                data.color.forEach((color, idx) => {
                    const circle = document.createElement('div');
                    circle.classList.add('circle');
                    circle.setAttribute('data-model', `${data.model[idx]}`);

                    const colors = document.createElement('div');
                    colors.classList.add('colors');
                    colors.style.backgroundColor = `${color}`;
                    if (idx === 0) circle.classList.add('active');
                    circle.append(colors);
                    midColor.append(circle);
                });
            }

            // 색상 한개
            else if (typeof data.color === 'string') {
                const circle = document.createElement('div');
                circle.classList.add('circle');
                circle.setAttribute('data-model', `${data.model}`);

                const color = document.createElement('div');
                color.classList.add('color');
                color.style.backgroundColor = `${data.color}`;
                circle.classList.add('active');
                circle.append(color);
                midColor.append(circle);
            }

            // bottom
            const btm = document.createElement('div');
            btm.classList.add('btm');

            // 모델명
            const model = document.createElement('p');
            model.classList.add('model');
            if (typeof data.model === 'object') {
                model.textContent = data.model[0];
                btm.setAttribute('data-model', `${data.model[0]}`);
            } else {
                model.textContent = data.model;
                btm.setAttribute('data-model', `${data.model}`);
            }
            btm.append(model);

            // 제품명
            const name = document.createElement('p');
            name.classList.add('name');
            name.textContent = data.name;
            btm.append(name);

            // 별점
            const starImg = document.createElement('img');
            starImg.setAttribute('src', `../../images/common/ico_star1.png`);
            const starPoint = document.createElement('span');
            starPoint.classList.add('starPoint');
            starPoint.textContent = data.starPoint;
            starPoint.prepend(starImg);
            btm.append(starPoint);
            // 구매 횟수
            const starCnt = document.createElement('span');
            starCnt.classList.add('starCnt');
            starCnt.textContent = `(${data.starCnt})`;
            btm.append(starCnt);

            // 구매가
            const buy = document.createElement('span');
            buy.classList.add('buy');
            buy.textContent = '구매';
            const purPrice = document.createElement('span');
            purPrice.classList.add('purPrice');
            purPrice.textContent = `${strToNum(data.purPrice)}원`;
            const buyDiv = document.createElement('div');
            buyDiv.classList.add('buyDiv');
            buyDiv.append(buy, purPrice);
            btm.append(buyDiv);

            // 렌탈가
            const rent = document.createElement('span');
            rent.classList.add('rent');
            rent.textContent = '렌탈';
            const rentPrice = document.createElement('span');
            rentPrice.classList.add('rentPrice');
            rentPrice.textContent = `월 ${strToNum(data.rentPrice)}원~`;
            const rentDiv = document.createElement('div');
            rentDiv.classList.add('rentDiv');
            rentDiv.append(rent, rentPrice);
            btm.append(rentDiv);

            //비교담기 버튼
            const compareBtn = document.createElement('button');
            compareBtn.classList.add('compareBtn');
            compareBtn.textContent = '비교담기';
            btm.append(compareBtn);
            listLi.append(top, midPhoto, midColor, btm);
            listUl.append(listLi);
        });

        // 비교 관리 div
        const lifeElc = get('#lifeElc');
        const compareDiv = document.createElement('div');
        compareDiv.classList.add('compareDiv');

        // 비교 관리 상단 div
        const compareCntDiv = document.createElement('div');
        compareCntDiv.classList.add('compareCntDiv');

        const compareP = document.createElement('p'); // 멘트
        compareP.classList.add('compareP');

        const compareSpan = document.createElement('span'); // 비교 개수
        compareSpan.classList.add('compareSpan');

        compareP.innerHTML = `비교하실 제품이 <span>${pressBtnCnt}</span> 개 담겼습니다.`;

        const compareArrow = document.createElement('img');
        compareArrow.setAttribute('src', `../../images/common/arr_up4.png`);
        compareArrow.classList.add('compareArrow');

        compareP.append(compareSpan);
        compareCntDiv.append(compareP, compareArrow);
        compareDiv.append(compareCntDiv);

        lifeElc.append(compareDiv);

        // 비교 관리 하단 div
        const compareShowDiv = document.createElement('div');
        compareShowDiv.classList.add('compareShowDiv');

        // 비어있는 비교 란 설정 (x4)
        const compareUl = document.createElement('ul');
        for (let i = 0; i < 4; i++) {
            const compareLi = document.createElement('li');
            const compareLiinnerdiv = document.createElement('div');
            compareLiinnerdiv.classList.add('divStep', 'noCom');
            const compareComment = document.createElement('p');
            compareComment.classList.add('comment');
            compareComment.innerHTML = `제품 리스트에서 '비교담기' <br>버튼을 눌러주세요.`;
            compareLiinnerdiv.append(compareComment);
            compareLi.append(compareLiinnerdiv);
            compareUl.append(compareLi);
        }
        // 비교하기 버튼
        const compareCompleBtn = document.createElement('button');
        compareCompleBtn.textContent = '비교하기';
        compareCompleBtn.addEventListener('click', (e) => {
            // 비교 모달창에 비교 데이터 전달
            const nameArray = getAll('#lifeElc .compareDiv .compareShowDiv ul li .divStep .name');
            const modal2 = get('#modal2 .popup2 .defualtInfo .compareInfo');
            modal2.innerHTML = '';
            // 주방 / 생활가전
            if (location.pathname.includes('lifeelc.html') || location.pathname.includes('MoLifeElc.html')) {
                let divArray = [];
                nameArray.forEach((name) => {
                    lifeEleOption.forEach((option) => {
                        if (name.textContent === option.name) {
                            divArray.push(option);
                        }
                    });
                });
                divArray.forEach((divData) => {
                    const lifeElcUl = document.createElement('ul');

                    // li - 모델명
                    const modelLi = document.createElement('li');
                    const modelH2 = document.createElement('h3');
                    const modelP = document.createElement('p');
                    modelH2.textContent = '모델명';
                    modelP.textContent = divData.model;
                    modelLi.append(modelH2, modelP);

                    // li - 크기
                    const sizeLi = document.createElement('li');
                    const sizeH2 = document.createElement('h3');
                    const sizeP = document.createElement('p');
                    sizeH2.textContent = '크기(가로 x 세로 x 높이)';
                    sizeP.textContent = divData.size;
                    sizeLi.append(sizeH2, sizeP);

                    // li - 스탠드 케이스 포함 크기
                    const standIncludesSizeLi = document.createElement('li');
                    const standIncludesSizeH2 = document.createElement('h3');
                    const standIncludesSizeP = document.createElement('p');
                    standIncludesSizeH2.textContent = '스탠드 케이스 포함 크기(가로 x 세로 x 높이)';
                    standIncludesSizeP.textContent = divData.standIncludesSize;
                    standIncludesSizeLi.append(standIncludesSizeH2, standIncludesSizeP);

                    // li - 무게
                    const weightLi = document.createElement('li');
                    const weightH2 = document.createElement('h3');
                    const weightP = document.createElement('p');
                    weightH2.textContent = '무게';
                    weightP.textContent = divData.weight;
                    weightLi.append(weightH2, weightP);

                    // li - 빌트인 권장 타공 크기(가로 x 세로)
                    const builtinSizeLi = document.createElement('li');
                    const builtinSizeH2 = document.createElement('h3');
                    const builtinSizeP = document.createElement('p');
                    builtinSizeH2.textContent = '빌트인 권장 타공 크기(가로 x 세로)';
                    builtinSizeP.textContent = divData.builtinSize;
                    builtinSizeLi.append(builtinSizeH2, builtinSizeP);

                    // li - 발열방식
                    const optionLi = document.createElement('li');
                    const optionH2 = document.createElement('h3');
                    const optionP = document.createElement('p');
                    optionH2.textContent = '발열방식';
                    optionP.textContent = divData.option;
                    optionLi.append(optionH2, optionP);

                    // li - 출시년월
                    const madeInDateLi = document.createElement('li');
                    const madeInDateH2 = document.createElement('h3');
                    const madeInDateP = document.createElement('p');
                    madeInDateH2.textContent = '출시년월';
                    madeInDateP.textContent = divData.madeInDate;
                    madeInDateLi.append(madeInDateH2, madeInDateP);

                    lifeElcUl.append(modelLi, sizeLi, standIncludesSizeLi, weightLi, builtinSizeLi, optionLi, madeInDateLi);
                    modal2.append(lifeElcUl);
                });
            }
            // 룰루비데/연수기
            else if (location.pathname.includes('waterelc.html')) {
                let divArray = [];
                nameArray.forEach((name) => {
                    waterEleOption.forEach((option) => {
                        if (name.textContent === option.name) {
                            divArray.push(option);
                        }
                    });
                });
                divArray.forEach((divData) => {
                    const waterElcUl = document.createElement('ul');

                    // li - 모델명
                    const modelLi = document.createElement('li');
                    const modelH2 = document.createElement('h3');
                    const modelP = document.createElement('p');
                    modelH2.textContent = '모델명';
                    modelP.textContent = divData.model;
                    modelLi.append(modelH2, modelP);

                    // li - 크기
                    const sizeLi = document.createElement('li');
                    const sizeH2 = document.createElement('h3');
                    const sizeP = document.createElement('p');
                    sizeH2.textContent = '크기(가로 x 세로 x 높이)';
                    sizeP.textContent = divData.size;
                    sizeLi.append(sizeH2, sizeP);

                    // li - 관리주기
                    const ManageCycleLi = document.createElement('li');
                    const ManageCycleH2 = document.createElement('h3');
                    const ManageCycleP = document.createElement('p');
                    ManageCycleH2.textContent = '관리주기';
                    ManageCycleP.textContent = divData.ManageCycle;
                    ManageCycleLi.append(ManageCycleH2, ManageCycleP);

                    // li - 부가기능
                    const optionLi = document.createElement('li');
                    const optionH2 = document.createElement('h3');
                    const optionP = document.createElement('p');
                    optionH2.textContent = '발열방식';
                    optionP.textContent = divData.option;
                    optionLi.append(optionH2, optionP);

                    // li - 출시년월
                    const madeInDateLi = document.createElement('li');
                    const madeInDateH2 = document.createElement('h3');
                    const madeInDateP = document.createElement('p');
                    madeInDateH2.textContent = '출시년월';
                    madeInDateP.textContent = divData.madeInDate;
                    madeInDateLi.append(madeInDateH2, madeInDateP);

                    waterElcUl.append(modelLi, sizeLi, optionLi, ManageCycleLi, madeInDateLi);
                    modal2.append(waterElcUl);
                });
            }
            // BEREX 매트리스/안마의자
            else if (location.pathname.includes('berexelc.html')) {
                let divArray = [];
                nameArray.forEach((name) => {
                    berexEleOption.forEach((option) => {
                        if (name.textContent === option.name) {
                            divArray.push(option);
                        }
                    });
                });
                divArray.forEach((divData) => {
                    const berexElcUl = document.createElement('ul');

                    // li - 모델명
                    const modelLi = document.createElement('li');
                    const modelH2 = document.createElement('h3');
                    const modelP = document.createElement('p');
                    modelH2.textContent = '모델명';
                    modelP.textContent = divData.model;
                    modelLi.append(modelH2, modelP);

                    // li - 크기
                    const sizeLi = document.createElement('li');
                    const sizeH2 = document.createElement('h3');
                    const sizeP = document.createElement('p');
                    sizeH2.textContent = '크기(가로 x 세로 x 높이)';
                    sizeP.textContent = divData.size;
                    sizeLi.append(sizeH2, sizeP);

                    // li - 무게
                    const weightLi = document.createElement('li');
                    const weightH2 = document.createElement('h3');
                    const weightP = document.createElement('p');
                    weightH2.textContent = '무게';
                    weightP.textContent = divData.weight;
                    weightLi.append(weightH2, weightP);

                    // li - 마사지볼
                    const optionLi = document.createElement('li');
                    const optionH2 = document.createElement('h3');
                    const optionP = document.createElement('p');
                    optionH2.textContent = '발열방식';
                    optionP.textContent = divData.option;
                    optionLi.append(optionH2, optionP);

                    // li - 출시년월
                    const madeInDateLi = document.createElement('li');
                    const madeInDateH2 = document.createElement('h3');
                    const madeInDateP = document.createElement('p');
                    madeInDateH2.textContent = '출시년월';
                    madeInDateP.textContent = divData.madeInDate;
                    madeInDateLi.append(madeInDateH2, madeInDateP);

                    berexElcUl.append(modelLi, sizeLi, optionLi, weightLi, madeInDateLi);
                    modal2.append(berexElcUl);
                });
            }
        });

        // 전체삭제 버튼
        const alldelDiv = document.createElement('div');
        alldelDiv.classList.add('alldelDiv');
        alldelDiv.textContent = '전체삭제';
        alldelDiv.addEventListener('click', (e) => {
            compareAllBtn();
            compareArray = []; // 선택된 배열의 비교 카테고리 항목 제거
            ArrayCnt = 0;
            if (compareDiv.style.height === '70px') compareArrow.setAttribute('src', `/../images/common/arr_down4.png`);
            else compareArrow.setAttribute('src', `../../images/common/arr_up4.png`);
        });

        compareShowDiv.append(compareUl, compareCompleBtn, alldelDiv);
        compareDiv.append(compareShowDiv);

        // 비교 관리 div 토글 처리
        compareCntDiv.addEventListener('click', (e) => {
            if (compareDiv.style.height === '70px') {
                compareArrow.setAttribute('src', `../images/common/arr_down4.png`);
                compareDiv.style.height = '270px';
                compareShowDiv.style.display = 'block';
            } else {
                compareArrow.setAttribute('src', `../../images/common/arr_up4.png`);
                compareDiv.style.height = '70px';
                compareShowDiv.style.display = 'none';
            }
        });

        // 비교담기 버튼 기능
        const compareBtn = getAll('#lifeElc .contents .itemList ul .listLi .btm .compareBtn');
        let compareArray = [];
        let ArrayCnt = 0;
        let compareCloseBtns = '';
        compareBtn.forEach((btn, idx) => {
            btn.addEventListener('click', (e) => {
                if (location.pathname.split('/').pop() !== 'MoLifeElc.html') {
                    const comDivs = getAll('#lifeElc .compareDiv .compareShowDiv ul li .divStep');
                    const comPs = getAll('#lifeElc .compareDiv .compareShowDiv ul li .divStep .comment');

                    // 카테고리 일치 여부를 확인하는 함수
                    compareArray[ArrayCnt] = sortData[idx].category;
                    ArrayCnt++;
                    const isCategoryMatched = () => {
                        if (compareArray.length === 0) return true; // 배열이 비어있으면 true 반환
                        return compareArray.every((cate) => cate === sortData[idx].category);
                    };

                    if (isCategoryMatched()) {
                        // 비교 제품 적재
                        if (pressBtnCnt < 4 && !btn.classList.contains('active')) {
                            // 비교 담는 순서대로 순차적으로 들어가도록 처리
                            comDivs[pressBtnCnt].classList.remove('noCom');
                            comDivs[pressBtnCnt].classList.add('Com');
                            comPs[pressBtnCnt].style.display = 'none';

                            // 비교 제품 삭제 버튼 미리 선언 처리
                            compareCloseBtns = [];
                            for (let i = 0; i < 4; i++) {
                                const btn = document.createElement('div');
                                btn.classList.add('closeBtn');
                                compareCloseBtns.push(btn);
                            }

                            // 비교 제품 제거 버튼 클릭
                            compareCloseBtns.forEach((close) => {
                                close.addEventListener('click', (e) => {
                                    compareBtn[idx].classList.remove('active');
                                    const choiceModel = btn.parentElement.dataset.model;
                                    // 담겨있는 비교 제품에 맞춰 해제 처리
                                    comDivs.forEach((div, i) => {
                                        if (!div.children[3] == '' && choiceModel === div.children[3].textContent) {
                                            // 배경 div css 처리
                                            comDivs[i].classList.remove('Com');
                                            comDivs[i].classList.add('noCom');
                                            comPs[i].style.display = 'block';
                                            if (compareArray.length > 0) {
                                                compareArray.splice(i, 1); // 선택된 배열의 비교 카테고리 항목 제거
                                                ArrayCnt--;
                                            }
                                        }
                                    });

                                    // 기존 태그 삭제 처리
                                    close.remove();
                                    compareImg.remove();
                                    compareModel.remove();
                                    compareName.remove();
                                    pressBtnCnt--;

                                    // text 및 div 높이 조정
                                    compareP.innerHTML = `비교하실 제품이 <span>${pressBtnCnt}</span> 개 담겼습니다.`;
                                    if (pressBtnCnt === 0) {
                                        if (compareDiv.style.height === '270px') {
                                            compareDiv.style.height = '70px';
                                            compareShowDiv.style.display = 'none';
                                            compareArrow.setAttribute('src', `../../images/common/arr_up4.png`);
                                        }
                                        compareDiv.style.height = '0px';
                                        compareDiv.style.transform = 'translateY(0)';
                                    }
                                });
                            });

                            const compareImg = document.createElement('img'); // 제품사진
                            compareImg.setAttribute('src', `${sortData[idx].imgUrl}`);

                            const compareModel = document.createElement('p'); // 모델명
                            compareModel.classList.add('model');
                            if (typeof sortData[idx].model === 'object') compareModel.textContent = sortData[idx].model[0];
                            else compareModel.textContent = sortData[idx].model;

                            const compareName = document.createElement('p'); // 제품명
                            compareName.classList.add('name');
                            compareName.textContent = sortData[idx].name;

                            comDivs[pressBtnCnt].append(compareCloseBtns[pressBtnCnt], compareImg, compareModel, compareName);

                            // 비교담기에 선택된 div 하위에 이름 가져오는 방법
                            console.log(comDivs[pressBtnCnt].querySelector('p.name').textContent);

                            pressBtnCnt++;
                            compareP.innerHTML = `비교하실 제품이 <span>${pressBtnCnt}</span> 개 담겼습니다.`;
                            btn.classList.add('active'); // css 미존재, 비교개수 파악을 위한 편법 사용

                            // 비교 div open 시에는 안닫히도록 처리
                            if (compareDiv.style.height !== '270px') {
                                compareDiv.style.height = '70px';
                                compareDiv.style.transform = 'translateY(0)';
                            }
                        }
                        // '비교담기' x버튼을 통한 비교 제품 제거 (미구현)

                        // 비교 제품 4개 이상일 때
                        else if (pressBtnCnt === 4 && !btn.classList.contains('active')) {
                            showPopup('최대 4개 제품까지 비교할 수 있습니다.');
                        }
                        // 비교담기 이미 클릭 시, 재클릭
                        else if (btn.classList.contains('active')) showPopup('비교담기 해제는 아래 비교하기 탭에서 가능합니다.');
                    } else {
                        // 카테고리가 일치하지 않는 경우
                        if (compareArray.length > 0) {
                            compareArray.pop(); // 마지막으로 추가된 항목 제거
                            ArrayCnt--;
                        }
                        showPopup('비교하기는 같은 카테고리의 제품끼리만 가능합니다. 기존 제품을 삭제하고, 비교제품을 다시 담아주세요.', '');
                    }
                }
            });
        });

        // 제품 색상 버튼 클릭
        const colorBtn = getAll('#lifeElc .contents .itemList ul .listLi .midColor .circle');
        colorBtn.forEach((model) => {
            model.addEventListener('click', (e) => {
                sortData.forEach((product, pdx) => {
                    if (model.dataset.model.includes(product.key)) {
                        if (typeof product.model === 'object') {
                            const midC = getAll('#lifeElc .contents .itemList ul .listLi .midColor');

                            // 클릭 css 비활성화
                            for (let i = 0; i < midC[pdx].children.length; i++) {
                                midC[pdx].children[i].classList.remove('active');
                            }

                            product.model.forEach((p, i) => {
                                if (p === model.dataset.model) {
                                    model.classList.add('active'); // 클릭 css 활성화
                                    const imgs = getAll('#lifeElc .contents .itemList ul .listLi .midPhoto a img');
                                    imgs[pdx].setAttribute('src', `../../images/products/lifeElc/${product.key}/${p}.png`); // 모델사진 수정
                                    const models = getAll('#lifeElc .contents .itemList ul .listLi .btm .model');
                                    models[pdx].textContent = `${product.model[i]}`; // 모델명 수정
                                }
                            });
                        }
                    }
                });
            });
        });

        // 리퍼브 할인 알림 신청 버튼
        if (location.pathname.split('/').pop() === 'refurb.html') {
            const refurbBtn = get('#lifeElc .refurbishment .aboutRefurb .refurbBtn');
            refurbBtn.addEventListener('click', (e) => {
                showPopup('리퍼브 할인 알림 신청이 완료되었습니다!', '');
            });
        }
    };

    // 이미지 css
    mainImgCss();

    // 메인 상품 list
    // 필터보다 먼저 상품리스트가 먼저 나오게 되면 필터가 이미지배너 위에 고정되는 문제로 인해서 0.5초 뒤에 함수 실행
    // 직접 닷홈에 올려서 테스트 필요
    setTimeout(() => {
        showItem(objectData);
    }, 500);
    // showItem(objectData);
};

const lifeElcDetail = () => {
    // sub header 뒤로가기 -----
    const $prevBtn = get('#header .prev');
    $prevBtn.addEventListener('click', (e) => {
        history.back();
    });
    // ----------
    const detailData = JSON.parse(localStorage.getItem('productDetail'));
    if (detailData !== null) {
        //----------------------------------------------------------------------------------------
        // left

        // 메인 이미지
        const mainImg = get('#lifeElcDetail .detailDiv .leftDiv .mainImg');
        const subImg = get('#lifeElcDetail .detailDiv .leftDiv .subImg');
        mainImg.setAttribute('src', `../${detailData.imgUrl}`);

        // 서브 이미지 배열 선언 (메인 이미지 1 + 서브이미지)
        let subImgArray = [];
        for (let i = 0; i < detailData.displayImg + 1; i++) {
            const subDiv = document.createElement('div');
            subDiv.classList.add(`sub`, `subDiv${i + 1}`);
            const subImg = document.createElement('img');
            subDiv.append(subImg);
            subImgArray.push(subDiv);
        }
        subImgArray.forEach((img) => subImg.append(img));

        // 서브 이미지 - 1
        const subImg1 = get('#lifeElcDetail .detailDiv .leftDiv .subImg .subDiv1 img');
        subImg1.setAttribute('src', `../${detailData.imgUrl}`);
        subImg1.setAttribute('alt', `${detailData.key}`);
        subImg1.parentElement.classList.add('active');

        // 서브 이미지 - 2 ~ end
        const imgs = getAll('#lifeElcDetail .detailDiv .leftDiv .subImg .sub img');
        imgs.forEach((img, idx) => {
            if (idx >= 1) {
                // !CIR-F41, !CIR-F41, !BB17-A, !BB16-A, !MC-B02, !MC-B03, !MB-M02, !MB-C01, !MB-B01, !MC-C01
                if (
                    detailData.key !== 'CIR-F41' &&
                    detailData.key !== 'BAS41-A' &&
                    detailData.key !== 'BB17-A' &&
                    detailData.key !== 'BB16-A' &&
                    detailData.key !== 'MC-B02' &&
                    detailData.key !== 'MC-B03' &&
                    detailData.key !== 'MB-M02' &&
                    detailData.key !== 'MB-C01' &&
                    detailData.key !== 'MB-B01' &&
                    detailData.key !== 'MC-C01'
                ) {
                    imgs[idx].setAttribute('src', `../../../images/products/lifeElc/${detailData.key}/${detailData.key}_display0${idx}.png`);
                    imgs[idx].setAttribute('alt', `display0${idx}.png`);
                }
                // CIR-F41, BAS41-A, BB17-A, BB16-A, MC-B02, MC-B03, MB-M02, MB-C01, MB-B01, MC-C01
                else if (
                    detailData.key === 'CIR-F41' ||
                    detailData.key === 'BAS41-A' ||
                    detailData.key === 'BB17-A' ||
                    detailData.key === 'BB16-A' ||
                    detailData.key === 'MC-B02' ||
                    detailData.key === 'MC-B03' ||
                    detailData.key === 'MB-M02' ||
                    detailData.key === 'MB-C01' ||
                    detailData.key === 'MB-B01' ||
                    detailData.key === 'MC-C01'
                ) {
                    for (let i = 0; i < detailData.model.length; i++) {
                        imgs[idx].setAttribute('src', `../images/products/lifeElc/${detailData.key}/${detailData.model[0]}_display0${idx}.png`);
                    }
                    imgs[idx].setAttribute('alt', `display0${idx}.png`);
                }
            }
        });

        // 서브 이미지 클릭
        const subDivs = getAll('#lifeElcDetail .detailDiv .leftDiv .subImg .sub');
        subDivs.forEach((div, idx) => {
            div.addEventListener('click', (e) => {
                subDivs.forEach((d, i) => {
                    d.classList.remove('active');
                });
                div.classList.add('active');

                const src = imgs[idx].getAttribute('src');
                mainImg.setAttribute('src', src);
            });
        });

        //----------------------------------------------------------------------------------------
        // right - step1

        // New
        const newSpan = get('#lifeElcDetail .detailDiv .rightDiv .info .new');
        if (detailData.new) newSpan.textContent = 'NEW';

        // point
        const pointSpan = get('#lifeElcDetail .detailDiv .rightDiv .info .point');
        if (detailData.new && detailData.best) pointSpan.classList.add('on');

        // Best || 리퍼브 (리퍼브 기획전 예외 처리)
        const bestSpan = get('#lifeElcDetail .detailDiv .rightDiv .info .best');
        if (detailData.best) bestSpan.textContent = 'BEST';
        if (detailData.refurb) bestSpan.textContent = '리퍼브';

        // name
        const nameP = get('#lifeElcDetail .detailDiv .rightDiv .info .name');
        nameP.textContent = `${detailData.name}`;

        // model
        const modelP = get('#lifeElcDetail .detailDiv .rightDiv .info .model');
        if (typeof detailData.model === 'object') modelP.textContent = `${detailData.model[0]}`;
        else if (typeof detailData.model === 'string') modelP.textContent = `${detailData.model}`;

        // starPoint
        const starPoint = get('#lifeElcDetail .detailDiv .rightDiv .info .starPoint');
        starPoint.innerHTML = `<img />${detailData.starPoint}`;

        // starImg
        const starImg = get('#lifeElcDetail .detailDiv .rightDiv .info .starPoint img');
        starImg.setAttribute('src', `../../../images/common/ico_star1.png`);

        // starCnt
        const starCnt = get('#lifeElcDetail .detailDiv .rightDiv .info .starCnt');
        starCnt.textContent = `(${detailData.starCnt})`;

        // right - step2
        // color
        const color = get('#lifeElcDetail .detailDiv .rightDiv .option .color');
        if (typeof detailData.color === 'object') color.textContent = `${hexToColor(detailData.color[0])}`;
        else if (typeof detailData.color === 'string') color.textContent = `${hexToColor(detailData.color)}`;

        // 렌탈 탭
        const rentTabOpen = () => {
            // 렌탈 등록비
            const registPrice = get('#lifeElcDetail .detailDiv .rightDiv .rent .top1 .registRegist .registPrice');
            registPrice.textContent = `- ${strToNum(detailData.lenterDiscount)}원`;

            // 렌탈 등록비 안내
            const top1 = get('#lifeElcDetail .detailDiv .rightDiv .rent .top1');
            const rentRegistDiv = document.createElement('div');
            rentRegistDiv.classList.add('rentRegistDiv');
            const rentRegistP1 = document.createElement('p');
            const rentRegistP2 = document.createElement('p');
            const rentRegistCloseBtn = document.createElement('button');
            rentRegistDiv.append(rentRegistP1, rentRegistP2, rentRegistCloseBtn);
            rentRegistP1.textContent = `코웨이의 렌탈 등록비는 10만원이 부과되나, 기본적으로 'Pre-Pass' 프로모션을 통해 렌탈 등록비 10만원이 할인됩니다.`;
            rentRegistP2.textContent = `단, 렌탈등록비 할인 혜택을 받는 'Pre-Pass' 적용 후 약정기간내 중도해약시에는 위약금에 렌탈등록비 10만원이 합산 부과됩니다.`;
            top1.append(rentRegistDiv);

            // 렌탈 등록비 클릭
            const infoRent = get('#lifeElcDetail .detailDiv .rightDiv .rent .top1 .infoRent');
            infoRent.addEventListener('click', (e) => {
                rentRegistDiv.classList.add('active');
            });

            // 렌탈 등록비 안내 닫힘 버튼
            rentRegistCloseBtn.addEventListener('click', (e) => {
                rentRegistDiv.classList.remove('active');
            });

            // 프로모션 할인 혜택
            const promotionPrice = get('#lifeElcDetail .detailDiv .rightDiv .rent .top1 .promotion .promotionPrice');
            promotionPrice.textContent = `- ${strToNum(detailData.lenterDiscount)}원`;

            // 2대 이상 주문 시
            const twoMoreOrder = get('#lifeElcDetail .detailDiv .rightDiv .rent .top2 .twoMoreOrder .twoMoreOrderPrice');
            twoMoreOrder.textContent = `- ${strToNum(detailData.moreOrder)}원`;

            // 코웨이 제품 보유 시
            const haveCoway = get('#lifeElcDetail .detailDiv .rightDiv .rent .top2 .haveCoway .haveCowayPrice');
            haveCoway.textContent = `- ${strToNum(detailData.haveCoway)}원`;

            // 약정 최대 할인 총액 (초기)
            const disCountTotalPrice = get('#lifeElcDetail .detailDiv .rightDiv .rent .top2 .disCountTotal .disCountTotalPrice');
            disCountTotalPrice.textContent = `- ${strToNum(detailData.lenterDiscount)}원`;

            // 체크박스 클릭
            const top2Radios = getAll(`#lifeElcDetail .detailDiv .rightDiv .rent .top2 input[type='checkbox']`);
            top2Radios.forEach((checkbox, idx) => {
                checkbox.addEventListener('click', (e) => {
                    let discountCul = 0;

                    // 추가 할인 계산하기
                    const addDiscountPrice = get('#lifeElcDetail .detailDiv .rightDiv .rent .top2 .addDiscount .addDiscountPrice');

                    if (idx === 0) {
                        top2Radios[1].checked = false;
                        addDiscountPrice.textContent = `- ${strToNum(detailData.moreOrder)}원`;
                        discountCul = detailData.moreOrder;
                        disCountTotalPrice.textContent = `- ${strToNum(detailData.lenterDiscount + discountCul)}원`;
                    }
                    if (idx === 1) {
                        top2Radios[0].checked = false;
                        addDiscountPrice.textContent = `- ${strToNum(detailData.haveCoway)}원`;
                        discountCul = detailData.haveCoway;
                        disCountTotalPrice.textContent = `- ${strToNum(detailData.lenterDiscount + discountCul)}원`;
                    }
                    if (!top2Radios[0].checked && !top2Radios[1].checked) {
                        addDiscountPrice.textContent = '- 0원';
                        disCountTotalPrice.textContent = `- ${strToNum(detailData.lenterDiscount)}원`;
                    }
                });
            });

            // 예상 렌탈료
            const rentPrice = get('#lifeElcDetail .detailDiv .rightDiv .rent .rentPriceResult .rentTotal .rentPrice');
            rentPrice.textContent = `${strToNum(detailData.rentPrice)}`;

            // 렌탈 - 장바구니, 렌탈하기 버튼
            const rentBtns = getAll('#lifeElcDetail .detailDiv .rightDiv .rent .rentBtns button');
            rentBtns.forEach((btn, idx) => {
                btn.addEventListener('click', (e) => {
                    if (idx === 0) showPopup('장바구니에 담았습니다.');
                    if (idx === 1) showPopup('렌탈담당 상담사가 등록된 연락처로 연락을 드릴 예정입니다.');
                });
            });

            // 렌탈료 총합
            const totalUsePrice = get('#lifeElcDetail .detailDiv .rightDiv .rent .rentNotice .totalUsePrice');
            totalUsePrice.textContent = `6년(의무사용기간) ${strToNum(detailData.rentPrice * 72)}원`;
        };

        // 구매 탭
        const buyTabOpen = () => {
            // 예상 결제금액
            const buyTotal = get('#lifeElcDetail .detailDiv .rightDiv .buy .buyPriceResult .buyTotal .buyPrice');
            buyTotal.textContent = `${strToNum(detailData.purPrice)}`;

            // 구매 - 장바구니, 렌탈하기 버튼
            const buyBtns = getAll('#lifeElcDetail .detailDiv .rightDiv .buy .buyBtns button');
            buyBtns.forEach((btn, idx) => {
                btn.addEventListener('click', (e) => {
                    if (idx === 0) showPopup('장바구니에 담았습니다.');
                    if (idx === 1) showPopup('구매담당 상담사가 등록된 연락처로 연락을 드릴 예정입니다.');
                });
            });
        };

        // colorList
        const colorList = get('#lifeElcDetail .detailDiv .rightDiv .option .colorList');
        if (typeof detailData.color === 'object') {
            detailData.color.forEach((color, idx) => {
                const li = document.createElement('li');
                const div = document.createElement('div');
                div.classList.add('circle');
                if (idx === 0) li.classList.add('active');
                div.style.backgroundColor = color;
                li.append(div);
                colorList.append(li);
            });
        } else if (typeof detailData.color === 'string') {
            const li = document.createElement('li');
            const div = document.createElement('div');
            div.classList.add('circle');
            li.classList.add('active');
            div.style.backgroundColor = detailData.color;
            li.append(div);
            colorList.append(li);
        }

        // colorList click
        const colorlis = getAll('#lifeElcDetail .detailDiv .rightDiv .option .colorList li');
        colorlis.forEach((li, idx) => {
            li.addEventListener('click', (e) => {
                subDivs.forEach((l) => l.classList.remove('active'));
                subDivs[0].classList.add('active');

                colorlis.forEach((l) => l.classList.remove('active'));
                li.classList.add('active');

                // 메인사진, 서브사진, 색상 변경
                // !CIR-F41, !BAS41-A, !BB17-A, !BB16-A, !MC-B02, !MC-B03, !MB-M02, !MB-C01, !MB-B01, !MC-C01
                if (
                    detailData.key !== 'CIR-F41' &&
                    detailData.key !== 'BAS41-A' &&
                    detailData.key !== 'BB17-A' &&
                    detailData.key !== 'BB16-A' &&
                    detailData.key !== 'MC-B02' &&
                    detailData.key !== 'MC-B03' &&
                    detailData.key !== 'MB-M02' &&
                    detailData.key !== 'MB-C01' &&
                    detailData.key !== 'MB-B01' &&
                    detailData.key !== 'MC-C01'
                ) {
                    if (typeof detailData.model === 'object') {
                        mainImg.setAttribute('src', `../../../images/products/lifeElc/${detailData.key}/${detailData.model[idx]}.png`);
                        subImg1.setAttribute('src', `../../../images/products/lifeElc/${detailData.key}/${detailData.model[idx]}.png`);
                        color.textContent = `${hexToColor(detailData.color[idx])}`;
                    } else if (typeof detailData.model === 'string') {
                        mainImg.setAttribute('src', `../../../images/products/lifeElc/${detailData.key}/${detailData.model}.png`);
                        subImg1.setAttribute('src', `../../../images/products/lifeElc/${detailData.key}/${detailData.model}.png`);
                        color.textContent = `${hexToColor(detailData.color)}`;
                    }
                }
                // CIR-F41, BAS41-A
                else {
                    mainImg.setAttribute('src', `../../../images/products/lifeElc/${detailData.key}/${detailData.model[idx]}.png`);
                    const subImgs = getAll('#lifeElcDetail .detailDiv .leftDiv .subImg .sub img');
                    subImgs.forEach((img, i) => {
                        if (i === 0) img.setAttribute('src', `../../../images/products/lifeElc/${detailData.key}/${detailData.model[idx]}.png`);
                        else if (i >= 1)
                            img.setAttribute('src', `../../../images/products/lifeElc/${detailData.key}/${detailData.model[idx]}_display0${i}.png`);
                    });
                    color.textContent = `${hexToColor(detailData.color[idx])}`;
                }

                // 모델명 변경
                if (typeof detailData.model === 'object') modelP.textContent = detailData.model[idx];
                if (typeof detailData.model === 'string') modelP.textContent = detailData.model;
            });
        });

        // Tab default select
        const tab = get('#lifeElcDetail .detailDiv .rightDiv .Type .rentType');
        tab.classList.add('active');
        rentTabOpen();

        // Tab 선택
        const tabs = getAll('#lifeElcDetail .detailDiv .rightDiv .Type li');
        const rent = get('#lifeElcDetail .detailDiv .rightDiv .rent');
        const buy = get('#lifeElcDetail .detailDiv .rightDiv .buy');
        tabs.forEach((tab, idx) => {
            tab.addEventListener('click', (e) => {
                tab.classList.add('active');
                if (idx === 0) {
                    tabs[1].classList.remove('active');
                    tabs[idx].classList.add('active');
                    rent.style.display = 'block';
                    buy.style.display = 'none';
                    rentTabOpen();
                } else if (idx === 1) {
                    tabs[0].classList.remove('active');
                    tabs[idx].classList.add('active');
                    buy.style.display = 'block';
                    rent.style.display = 'none';
                    buyTabOpen();
                }
            });
        });
    }
};

const waterElc = () => {};
const berexElc = () => {};
const refurb = () => {};
const bestreview = () => {};
// ----------

// 매장 ---
const introduce = () => {
    // sub header 뒤로가기 -----
    const $prevBtn = get('#header .prev');
    $prevBtn.addEventListener('click', (e) => {
        history.back();
    });
    // data
    let store = [
        {
            id: 1,
            name: '가좌 직영점',
            address: '인천 서구 가재울로54번길 15 1층 코웨이',
            img: '../images/store/store0.png',
        },
        {
            id: 2,
            name: '울산 직영점',
            address: '울산 남구 삼산중로 65 1층 코웨이',
            img: '../images/store/store1.png',
        },
        {
            id: 3,
            name: '고양 직영점',
            address: '경기 고양시 덕양구 고양대로 1955 코웨이',
            img: '../images/store/store2.png',
        },
        {
            id: 4,
            name: '분당 직영점',
            address: '경기 성남시 분당구 황새울로 348 1층 코웨이',
            img: '../images/store/store3.png',
        },
        {
            id: 5,
            name: '구월 직영점',
            address: '인천 남동구 남동대로 767 코웨이',
            img: '../images/store/store4.png',
        },
        {
            id: 6,
            name: '노원 직영점',
            address: '서울 노원구 동일로 1091 코웨이',
            img: '../images/store/store5.png',
        },
        {
            id: 7,
            name: '용산 직영점',
            address: '서울 용산구 한강대로23길 55 5층 코웨이',
            img: '../images/store/store6.png',
        },
        {
            id: 8,
            name: '수원 직영점',
            address: '경기 수원시 영통구 덕영대로 1513 코웨이',
            img: '../images/store/store7.png',
        },
        {
            id: 9,
            name: '용인 직영점',
            address: '경기 용인시 기흥구 신고매로 59 리빙파워센터 지하 3층 코웨이',
            img: '../images/store/store8.png',
        },
        {
            id: 10,
            name: '구로 직영점',
            address: '서울 구로구 디지털로26길 38 G타워 3층 코웨이',
            img: '../images/store/store9.png',
        },
    ];
    // box4  slide  data 가져오기
    const $storName = getAll('.introduce .store-store .to-store li .to-store-name');
    const $storAddr = getAll('.introduce .store-store .to-store li .to-store-address');
    const $storimg = getAll('.introduce .store-store .to-store li img');

    $storName.forEach((name, idx) => {
        name.textContent = store[idx].name;
    });
    $storAddr.forEach((addr, idx) => {
        addr.textContent = store[idx].address;
    });
    $storimg.forEach((img, idx) => {
        img.setAttribute('src', store[idx].img);
    });
};
// 기타판매처
const otherVendor = () => {
    // li 값 변경
    const $stSpans = getAll('.other-vendor .inner .store-select li .store-title span');
    const $stNames = getAll('.other-vendor .inner .store-select li .store-title');
    const $stAddresss = getAll('.other-vendor .inner .store-select li .address-num .store-address');
    const $stNums = getAll('.other-vendor .inner .store-select li .address-num .store-num');
    const $exTimes = getAll('.other-vendor .inner .store-select li .store-explain .time-explain');
    const $exCloses = getAll('.other-vendor .inner .store-select li .store-explain .close-explain');
    const $exParkings = getAll('.other-vendor .inner .store-select li .store-explain .parking-explain');
    $stNames.forEach((name, idx) => {
        name.textContent = ov[idx].name;
    });
    $stAddresss.forEach((address, idx) => {
        address.textContent = ov[idx].address;
    });
    $stNums.forEach((num, idx) => {
        num.textContent = ov[idx].tel;
    });
    $exTimes.forEach((time, idx) => {
        time.textContent = ov[idx].time;
    });
    $exCloses.forEach((close, idx) => {
        close.textContent = ov[idx].closeDate;
    });
    $exParkings.forEach((pak, idx) => {
        pak.textContent = ov[idx].parking;
    });
    // span값 출력
    const $otherNum = get('.other-vendor .inner .sub-select .total-vendor .num');
    const $stLis = getAll('.other-vendor .inner .store-select li');
    let vendorNum = $stLis.length;
    if ($otherNum) {
        $otherNum.textContent = vendorNum;
    }
    //  지역 누르면 바뀌는거
    const $areaList = get('.other-vendor .inner .vendor-select .area-select .area-list');
    const $areaOptions = getAll('.other-vendor .inner .vendor-select .area-select .area-list option');
    $areaList.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        let spanNum = 0;
        if (selectedValue === 's0') {
            $stLis.forEach((li) => {
                li.style.display = 'block';
            });
            spanNum = $stLis.length;
        } else if (selectedValue === 's1') {
            $stLis.forEach((li, i) => {
                if (ov[i].address.includes('서울')) {
                    li.style.display = 'block';
                    spanNum++;
                } else {
                    li.style.display = 'none';
                }
            });
        } else if (selectedValue === 's2') {
            $stLis.forEach((li, i) => {
                if (ov[i].address.includes('인천')) {
                    li.style.display = 'block';
                    spanNum++;
                } else {
                    li.style.display = 'none';
                }
            });
        } else if (selectedValue === 's3') {
            $stLis.forEach((li, i) => {
                if (ov[i].address.includes('부산')) {
                    li.style.display = 'block';
                    spanNum++;
                } else {
                    li.style.display = 'none';
                }
            });
        } else if (selectedValue === 's4') {
            $stLis.forEach((li, i) => {
                if (ov[i].address.includes('경기')) {
                    li.style.display = 'block';
                    spanNum++;
                } else {
                    li.style.display = 'none';
                }
            });
        } else {
            $stLis.forEach((li) => {
                li.style.display = 'none';
            });
        }
        $otherNum.textContent = spanNum;
    });
    // value값 따오기
    const $areaBtn = get('.other-vendor .inner .area-btn');
    const $vendorInp = get('.other-vendor .inner .vendor-name-select input');
    const $areaSelect = get('.other-vendor .inner .vendor-select .area-select');
    $areaBtn.addEventListener('click', (e) => {
        const inputValue = $vendorInp.value.trim();
        const searchValue = inputValue || $vendorInp.placeholder;
        const selectedValue = $areaSelect.value;
        if (!inputValue) {
            $stLis.forEach((li) => {
                li.style.display = 'block';
            });
            let spanNum = $stLis.length;
            $otherNum.textContent = spanNum;
            // console.log($areaOptions.value);
        } else {
            const results = ov.filter((vendor) => vendor.name.includes(searchValue));
            const results1 = ov.filter((vendor) => vendor.address.includes(searchValue));
            $stLis.forEach((li) => {
                li.style.display = 'none';
            });
            // 검색 결과에 해당하는 li 요소만 보이게 하기
            results.forEach((result) => {
                $stLis.forEach((li) => {
                    if (li.textContent.includes(result.name)) {
                        li.style.display = 'block';
                    }
                });
            });
            results1.forEach((result) => {
                $stLis.forEach((li) => {
                    if (li.textContent.includes(result.address)) {
                        li.style.display = 'block';
                    }
                });
            });
        }
    });
};
// 체험 예약
const reservation = () => {
    //------- 매장 선택
    // 숫자 누르면 거기로 이동
    const $numBtns = getAll('.reservation .inner .reser-main .menuname li p '); // 숫자버튼 active
    const $numLis = getAll('.reservation .inner .reser-main .menuname li'); //글자 색 변경
    const $numPages = getAll('.reservation .inner .reser-main .reservation-page .page'); //글자 색 변경
    const $areaLis = getAll('.reservation .inner .reser-main .store-choice .contentbox .contentbox-menu li'); // 지역 고르기
    const $stNameNames = getAll('.reservation .inner .reser-main .store-choice .contentbox .content-choice .area-store strong'); // 매장이름
    const $stAddressAdds = getAll('.reservation .inner .reser-main .store-choice .contentbox .content-choice .area-store p'); // 매장주소
    const $areaStores = getAll('.reservation .inner .reser-main .store-choice .contentbox .content-choice .area-store'); // 매장 정보 li

    //    사이드 li 변경
    $numLis.forEach((numLi, idx) => {
        numLi.addEventListener('click', (e) => {
            $numLis.forEach((li) => {
                li.classList.remove('active');
            });
            numLi.classList.add('active');
        });
    });

    // 기본 보이기
    $numBtns[0].classList.add('active');
    $numLis[0].classList.add('active');
    $numPages[0].classList.add('active');

    //  숫자 누르면  내용 page 변경
    $numBtns.forEach((numBtn, idx) => {
        numBtn.style.cursor = `pointer`;
        numBtn.addEventListener('click', (e) => {
            $numBtns.forEach((btn) => {
                btn.classList.remove('active');
            });
            numBtn.classList.add('active');
            $numPages.forEach((page) => {
                page.classList.remove('active');
            });
            $numPages[idx].classList.add('active');
        });
    });

    // 지역버튼
    $areaLis.forEach((areaLi, idx) => {
        areaLi.addEventListener('click', (e) => {
            $areaLis.forEach((li) => {
                li.classList.remove('active');
            });
            areaLi.classList.add('active');

            // 지역버튼 누르면 해당지역만 나오기
            let selectClass = areaLi.dataset.value;
            if (selectClass === '0') {
                $areaStores.forEach((stst) => {
                    stst.style.display = 'block';
                    stst.style.display = 'flex';
                });
            } else if (selectClass === '1') {
                $areaStores.forEach((stst, i) => {
                    if (stn[i] && stn[i].address.includes('서울')) {
                        stst.style.display = 'block';
                        stst.style.display = 'flex';
                    } else {
                        stst.style.display = 'none';
                    }
                });
            } else if (selectClass === '2') {
                $areaStores.forEach((stst, i) => {
                    if (stn[i] && stn[i].address.includes('인천')) {
                        stst.style.display = 'block';
                        stst.style.display = 'flex';
                    } else {
                        stst.style.display = 'none';
                    }
                });
            } else if (selectClass === '3') {
                $areaStores.forEach((stst, i) => {
                    if (stn[i] && stn[i].address.includes('경기')) {
                        stst.style.display = 'block';
                        stst.style.display = 'flex';
                    } else {
                        stst.style.display = 'none';
                    }
                });
            } else if (selectClass === '4') {
                $areaStores.forEach((stst, i) => {
                    if (stn[i] && stn[i].address.includes('울산')) {
                        stst.style.display = 'block';
                        stst.style.display = 'flex';
                    } else {
                        stst.style.display = 'none';
                    }
                });
            } else {
                $areaStores.forEach((stst, i) => {
                    stst.style.display = `none`;
                });
            }
        });
    });

    // data 불러오기 stn
    $stNameNames.forEach((stName, i) => {
        stName.textContent = stn[i].name;
    });
    $stAddressAdds.forEach((stAdd, i) => {
        stAdd.textContent = stn[i].address;
    });

    // li 누르면 색 변경
    $areaStores.forEach((areaSt, idx) => {
        areaSt.addEventListener('click', (e) => {
            $areaStores.forEach((stItem) => {
                stItem.classList.remove('active');
            });
            areaSt.classList.add('active');
        });
    });
    // 고른 매장
    $areaStores.forEach((store, idx) => {
        store.addEventListener('click', () => {
            const storeInfo = stn[idx];
            if (storeInfo) {
                updateStoreInfo(storeInfo);
            }
        });
    });

    //-------------- 예약일시 선택

    // 고른 매장 내용
    const $getName = get('.reservation .inner .reser-main .date-choice .choice-store-name strong');
    const $getAdd = get('.reservation .inner .reser-main .page .date-box .choice-store-name .choiced-store-content .choice-store-text .st-add');
    const $getTime = get('.reservation .inner .reser-main .page .date-box .choice-store-name .choiced-store-content .choice-store-text .st-time');
    const $getCloe = get('.reservation .inner .reser-main .page .date-box .choice-store-name .choiced-store-content .choice-store-text .st-close');
    const $getPark = get('.reservation .inner .reser-main .page .date-box .choice-store-name .choiced-store-content .choice-store-text .st-park');
    const $getTel = get('.reservation .inner .reser-main .page .date-box .choice-store-name .choiced-store-content .choice-store-text .st-tel');

    // 기본
    $getName.textContent = stn[0].name;
    $getAdd.textContent = stn[0].address;
    $getTime.textContent = stn[0].time;
    $getCloe.textContent = stn[0].close;
    $getPark.textContent = stn[0].park;
    $getTel.textContent = stn[0].tel;

    function updateStoreInfo(store) {
        if ($getName && $getAdd && $getTime && $getCloe && $getPark && $getTel) {
            $getName.textContent = store.name;
            $getAdd.innerHTML = store.address;
            $getTime.textContent = store.time;
            $getCloe.textContent = store.close;
            $getPark.textContent = store.park;
            $getTel.textContent = store.tel;
        }
    }

    // 캘린더
    const $tableTds = getAll('.reservation .inner .reser-main .date-choice .date-box .choice-calendar table td');
    $tableTds.forEach((td) => {
        td.style.cursor = `pointer`;
        td.addEventListener('click', (e) => {
            $tableTds.forEach((tdItem) => {
                tdItem.classList.remove('active');
            });
            td.classList.add('active');
        });
    });

    //-------------- 예약시간 선택
    const $timeBlocks = getAll('.reservation .inner .reser-main .time-choice .time-table .time-block li');
    $timeBlocks.forEach((timeblock) => {
        timeblock.addEventListener('click', (e) => {
            $timeBlocks.forEach((time) => {
                time.classList.remove('active');
            });
            timeblock.classList.add('active');
        });
    });

    //-------------- 체험제품 선택
    const $proImgs = getAll('.reservation .inner .reser-main .product-choice .product-table .product-table-product img');
    const $proChks = getAll('.reservation .inner .reser-main .product-choice .product-table .product-table-product .product-click');
    const $proStrs = getAll('.reservation .inner .reser-main .product-choice .product-table .product-table-product strong');
    // 제품 data 가져오기
    $proImgs.forEach((img, idx) => {
        img.setAttribute('src', rpd[idx].img);
    });
    $proStrs.forEach((str, idx) => {
        str.textContent = rpd[idx].name;
    });

    // 제품 체크
    $proChks.forEach((chk, i) => {
        chk.addEventListener('click', (e) => {
            chk.classList.toggle('active');
        });
    });

    // 슬라이드
    const $preChPrev = get('.reservation .inner .reser-main .product-choice .product-choice-prev');
    const $preChNext = get('.reservation .inner .reser-main .product-choice .product-choice-next');
    const $proBoxs = getAll('.reservation .inner .reser-main .product-choice .product-table .product-table-product');
    // - 235px
    const addmove = 235;
    let currentwidth = 0;
    const visualItem = 4;
    const totalItem = $proBoxs.length;
    $preChPrev.addEventListener('click', (e) => {
        if (currentwidth > 0) {
            currentwidth--;
            const moveAmount = -addmove * currentwidth;
            $proBoxs.forEach((box, idx) => {
                box.style.transform = `translateX(${moveAmount}px)`;
            });
        }
    });
    $preChNext.addEventListener('click', (e) => {
        if (currentwidth < totalItem - visualItem) {
            currentwidth++;
            const moveAmount = -addmove * currentwidth;
            $proBoxs.forEach((box, idx) => {
                box.style.transform = `translateX(${moveAmount}px)`;
            });
        }
    });

    //-------------- 정보입력 예약신청
    const nameInp = document.getElementById('recheck-name');
    const telInp = document.getElementById('recheck-phone');
    // input
    nameInp.addEventListener('input', (e) => {
        const inpText = e.target.value;
        const nameText = inpText.replace(/[^a-zA-Zㄱ-ㅎ가-힣ㅏ-ㅣ\s]/g, '');
        if (inpText !== nameText) {
            e.target.value = nameText;
        }
    });
    // 이용동의 창
    // 동의체크
    const $lastchk = get('.reservation .data-reservation .personal-information .check-personal-information .click-check-personal');

    $lastchk.addEventListener('click', (e) => {
        $lastchk.classList.toggle('active');
    });
    // 상세내용
    const $infoExplain = get('.reservation .data-reservation .personal-information .information-explain');
    const $infoExplainI = get('.reservation .data-reservation .personal-information .check-personal-information i.xi-angle-down-min');
    $infoExplainI.addEventListener('click', (e) => {
        $infoExplain.classList.toggle('active');
    });
    // 예약버튼
    const $reserBtn = get('.reservation .data-reservation .reservation-click ');

    $reserBtn.addEventListener('click', (e) => {
        if (nameInp.value.trim() === '' || telInp.value.trim() === '') {
            alert('이름과 전화번호를 입력해주세요.');
            return;
        }
        if ($lastchk.classList.contains('active')) {
            showPopup('예약이 완료되었습니다.');
        } else {
            alert('개인정보 수집 및 이용 동의를 체크해주세요.');
        }
    });
};
// 체험 예약 조회  ok
const reserCheck = () => {
    const $popupCheck = get('.reser-check .inner .popup');
    const $reChkBtn = get('.reser-check .inner .reser-check-main .reser-place .check-btn');
    const $popclose = get('.popup .close');
    const $popcloseBtn = get(' .popup .sure');
    const $errorMessege = get('.reser-check .inner .reser-check-main .reser-place .error-message');
    const $reserChkPhone = get('.reser-check .inner .reser-check-main .reser-check-phone');
    const $inputNum = get('.reser-check .inner .reser-check-main .reser-place .reser-check-phone input');
    const $reserChkName = get('.reser-check .inner .reser-check-main .reser-check-name');
    const $errorMessegeName = get('.reser-check .inner .reser-check-main .reser-place .error-message-name');
    const $inputName = get('.reser-check .inner .reser-check-main .reser-place .reser-check-name input');

    const $header = get('#header');
    const $footer = get('#footer');
    const $pop = get('#pop');

    $reChkBtn.addEventListener('click', (e) => {
        if ($inputName.value.trim() === '' || $inputNum.value.trim() === '') {
            alert('이름과 연락처를 입력해주세요.');
            return;
        } else {
            $popupCheck.style.display = `block`;
            $pop.style.display = `block`;
            $footer.style.display = 'none';
        }
    });
    $popclose.addEventListener('click', (e) => {
        $popupCheck.style.display = ``;
        $pop.style.display = ``;
        $footer.style.display = '';
    });
    $popcloseBtn.addEventListener('click', (e) => {
        $popupCheck.style.display = ``;
        $pop.style.display = ``;
        $footer.style.display = '';
    });
    $inputName.addEventListener('input', (e) => {
        const inputValue = $inputName.value;
        // 숫자와 특수문자를 제외한 문자(한글, 영어)를 찾는 정규 표현식
        // 이거 다시 손보기
        const invalidPattern = /[ㄱ-ㅎ가-힣a-zA-Z]/;
        if (invalidPattern.test(inputValue)) {
            $errorMessegeName.style.display = ``;
            $reserChkName.classList.remove('active');
        } else {
            $errorMessegeName.style.display = `block`;
            $reserChkName.classList.add('active');
        }
        if (inputValue === '') {
            $errorMessegeName.style.display = ``;
            $reserChkName.classList.remove('active');
        }
    });
    $inputNum.addEventListener('input', (e) => {
        const inputValue = $inputNum.value;

        // 숫자 이외의 문자 또는 '-'를 검사하는 정규 표현식
        const invalidPattern = /[^0-9]/;
        if (invalidPattern.test(inputValue)) {
            $errorMessege.style.display = `block`;
            $reserChkPhone.classList.add('active');
        } else {
            $errorMessege.style.display = ``;
            $reserChkPhone.classList.remove('active');
        }
    });
};
// ----------

// 서비스 -----
// 서비스 -----
const productService = () => {
    const tap1 = () => {
        const $tap1 = getAll('.service_tap ul li');
        $tap1[0].classList.add('on'); // 초기 설정: 첫 번째 요소에 'on' 클래스 추가
        let clickedIndex = 0; // 기본적으로 첫 번째 요소가 클릭된 상태로 설정

        $tap1.forEach((tapli, index) => {
            // 클릭 시 'on' 클래스 토글 및 클릭된 요소 추적
            tapli.addEventListener('click', () => {
                if (clickedIndex !== null) {
                    $tap1[clickedIndex].classList.remove('on'); // 이전에 클릭된 요소의 'on' 클래스 제거
                }
                tapli.classList.add('on'); // 현재 클릭된 요소에 'on' 클래스 추가
                clickedIndex = index; // 현재 클릭된 요소의 인덱스 업데이트
            });

            // 마우스 오버 시 'on' 클래스 추가
            tapli.addEventListener('mouseover', () => {
                if (index !== clickedIndex) {
                    tapli.classList.add('on');
                }
            });

            // 마우스 아웃 시 'on' 클래스 제거
            tapli.addEventListener('mouseout', () => {
                if (index !== clickedIndex) {
                    tapli.classList.remove('on'); // 클릭된 요소가 아닐 경우에만 'on' 클래스 제거
                }
            });
        });
    };

    const slide1 = () => {
        const $slider = get('.pro_service_sec1 .slider');
        const $slideImg = getAll('.pro_service_sec1 .slider .slide_img');
        let sliderWidth = $slideImg[0].clientWidth; //slide_img 하나 크기
        let currentslide = 0;

        const $prev = get('.pro_service_sec1 .btn_wrap2 .prev');
        const $next = get('.pro_service_sec1 .btn_wrap2 .next');

        //showslide 함수 만들어서 스와이프 할 수 있게 한다
        const showSlide = (i) => {
            if (i < 0) {
                currentslide = 0;
            } else if (i >= $slideImg.length - 1) {
                currentslide = 0;
            } else {
                currentslide = i;
            }
            $slider.style.transform = `translateX(-${currentslide * sliderWidth}px)`;
            $slider.style.transition = `0.5s ease`;
            btnupdate();
        };
        //왼쪽 화살표 버튼이 처음에는 안보이게
        const btnupdate = () => {
            if (currentslide === 0) {
                $prev.style.display = 'none';
            } else {
                $prev.style.display = 'block';
            }
        };
        $prev.addEventListener('click', (e) => {
            showSlide(currentslide - 1);
            // console.log(currentslide);
        });

        $next.addEventListener('click', (e) => {
            showSlide(currentslide + 1);
            // console.log(currentslide);
        });
        btnupdate();
    };

    const moveBanner = () => {
        const $srcollImg = get('.pro_service_sec3 .gray_box .scroll');
        const $srcollImgs = getAll('.pro_service_sec3 .gray_box .scroll .scroll_img');

        const srcollcnt = $srcollImgs.length;
        const srcollWidth = $srcollImgs[0].clientWidth;

        let currentImg = 0;

        const move = (index) => {
            currentImg = index;
            $srcollImg.style.transform = `translateX(-${currentImg * srcollWidth}px)`;
            $srcollImg.style.transition = `0.8s ease`;
        };

        const counts = () => {
            const index = currentImg + 1 < srcollcnt ? currentImg + 1 : 0;
            move(index);
        };

        setInterval(counts, 3000);
    };
    tap1();
    slide1();
    moveBanner();
};
//productService end
const heartService = () => {
    const tap1 = () => {
        const $tap1 = getAll('.service_tap ul li');
        $tap1[1].classList.add('on'); // 초기 설정: 두 번째 요소에 'on' 클래스 추가
        let clickedIndex = 1; // 기본적으로 두 번째 요소가 클릭된 상태로 설정

        $tap1.forEach((tapli, index) => {
            // 클릭 시 'on' 클래스 토글 및 클릭된 요소 추적
            tapli.addEventListener('click', () => {
                if (clickedIndex !== null) {
                    $tap1[clickedIndex].classList.remove('on'); // 이전에 클릭된 요소의 'on' 클래스 제거
                }
                tapli.classList.add('on'); // 현재 클릭된 요소에 'on' 클래스 추가
                clickedIndex = index; // 현재 클릭된 요소의 인덱스 업데이트
            });

            // 마우스 오버 시 'on' 클래스 추가
            tapli.addEventListener('mouseover', () => {
                if (index !== clickedIndex) {
                    tapli.classList.add('on');
                }
            });

            // 마우스 아웃 시 'on' 클래스 제거
            tapli.addEventListener('mouseout', () => {
                if (index !== clickedIndex) {
                    tapli.classList.remove('on'); // 클릭된 요소가 아닐 경우에만 'on' 클래스 제거
                }
            });
        });
    };

    const hearttap3 = () => {
        const $htLis = getAll('.heartService_tap2 ul li');
        const $taps = getAll('.heartservice > section');
        let clickedIndex = null; // 클릭된 요소의 인덱스를 추적하는 변수
        $htLis.forEach((li, i) => {
            // 마우스 오버 시 'on' 클래스 추가
            li.addEventListener('mouseover', (e) => {
                e.currentTarget.classList.add('on');
            });
            // 마우스 아웃 시 'on' 클래스 제거
            li.addEventListener('mouseout', (e) => {
                if (i !== clickedIndex) {
                    // 클릭된 요소가 아닐 경우에만 'on' 클래스를 제거
                    e.currentTarget.classList.remove('on');
                }
            });
            // 클릭 시 해당 탭 콘텐츠 표시 및 다른 콘텐츠 숨기기
            li.addEventListener('click', (e) => {
                // 모든 탭 항목과 콘텐츠를 숨기고 비활성화
                $htLis.forEach((item, idx) => {
                    item.classList.remove('on');
                    if (idx === clickedIndex) clickedIndex = null; // 이전 클릭 상태 초기화
                });
                $taps.forEach((tap) => (tap.style.display = 'none'));
                // 클릭된 탭 항목을 활성화하고 해당 콘텐츠를 표시
                e.currentTarget.classList.add('on');
                $taps[i].style.display = 'block';
                clickedIndex = i; // 클릭된 요소의 인덱스 업데이트
            });
        });
        $htLis[0].classList.add('on');
        $taps[1].style.display = 'none';
    };
    tap1();
    hearttap3();
};
//heartService end
const iocareService = () => {
    const iocEvent1 = () => {
        // 관찰할 UL 요소를 가져옴
        const animatedUl = document.querySelector('.iocare_service_sec2 .iocService_list');

        // IntersectionObserver 콜백 함수
        const iocEventHandler = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // ul 요소가 뷰포트에 닿으면 내부 li 요소에 active 클래스 추가
                    const liElements = entry.target.querySelectorAll('li .ioc_list .img_warp');
                    liElements.forEach((li) => {
                        li.classList.add('active');
                    });
                } else {
                    // ul 요소가 뷰포트를 벗어나면 내부 li 요소에서 active 클래스 제거
                    const liElements = entry.target.querySelectorAll('li .ioc_list .img_warp');
                    liElements.forEach((li) => {
                        li.classList.remove('active');
                    });
                }
            });
        };

        // IntersectionObserver 설정
        const observer = new IntersectionObserver(iocEventHandler, {
            root: null, // 뷰포트를 기준으로 감지
            rootMargin: '0px', // 뷰포트 경계에서 0px
            threshold: 0, // ul 요소가 화면에 살짝이라도 보이면 감지
        });

        // ul 요소를 감지 대상으로 등록
        observer.observe(animatedUl);
    };

    const iocEvent2 = () => {
        // IntersectionObserver 콜백 함수
        const iocEventHandler2 = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const textElement = entry.target;
                    const index = Array.from(textElement.parentNode.children).indexOf(textElement);
                    const delay = index * 0.2;

                    // 애니메이션 적용
                    setTimeout(() => {
                        textElement.style.animation = `leftToRight ease 1.5s ${delay}s forwards`;
                        textElement.style.opacity = 1;
                    }, 200);

                    // 애니메이션이 한 번 실행되면 다시 관찰하지 않음
                    observer.unobserve(textElement);
                }
            });
        };

        // IntersectionObserver 설정
        const observer = new IntersectionObserver(iocEventHandler2, {
            root: null, // 뷰포트를 기준으로 감지
            rootMargin: '0px', // 뷰포트 경계에서 0px
            threshold: 0.1, // 10% 이상 화면에 보여야 작동
        });

        // 모든 대상 요소 가져오기
        const textElements = getAll('.iocare_service_sec3 .service_list li');

        // 각 텍스트 요소에 대해 Observer를 등록
        textElements.forEach((textElement) => {
            textElement.style.opacity = 0; // 초기 상태로 투명하게 설정
            observer.observe(textElement);
        });
    };

    const iocEvent3 = () => {
        const iocEventHandler3 = () => {
            const animatedSections = getAll('.iocare_service_sec4 .service_list li');

            animatedSections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // 애니메이션이 실행될 때
                if (rect.top <= windowHeight && rect.bottom >= 0) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        };

        // 스크롤 이벤트에 대한 리스너 추가
        window.addEventListener('scroll', iocEventHandler3);

        // 페이지 로드 시 처음으로 이벤트 핸들러 호출
        iocEventHandler3();
    };

    iocEvent1();
    iocEvent2();
    iocEvent3();
};
// iocareService end
const totalCareService = () => {
    const tap1 = () => {
        const $tap1 = getAll('.service_tap ul li');
        $tap1[2].classList.add('on'); // 초기 설정: 두 번째 요소에 'on' 클래스 추가
        let clickedIndex = 2; // 기본적으로 두 번째 요소가 클릭된 상태로 설정

        $tap1.forEach((tapli, index) => {
            // 클릭 시 'on' 클래스 토글 및 클릭된 요소 추적
            tapli.addEventListener('click', () => {
                if (clickedIndex !== null) {
                    $tap1[clickedIndex].classList.remove('on'); // 이전에 클릭된 요소의 'on' 클래스 제거
                }
                tapli.classList.add('on'); // 현재 클릭된 요소에 'on' 클래스 추가
                clickedIndex = index; // 현재 클릭된 요소의 인덱스 업데이트
            });

            // 마우스 오버 시 'on' 클래스 추가
            tapli.addEventListener('mouseover', () => {
                if (index !== clickedIndex) {
                    tapli.classList.add('on');
                }
            });

            // 마우스 아웃 시 'on' 클래스 제거
            tapli.addEventListener('mouseout', () => {
                if (index !== clickedIndex) {
                    tapli.classList.remove('on'); // 클릭된 요소가 아닐 경우에만 'on' 클래스 제거
                }
            });
        });
    };
    tap1();
};
//totalService end
const filterService = () => {
    const slide1 = () => {
        const $slide = get('.filter_service_sec1 .slide_wrap .slide_con');
        const $slides = getAll('.filter_service_sec1 .slide_wrap .slide_con .slide');
        let sliderWidth = $slides[0].clientWidth;
        let totalslides = $slides.length;
        let currentslide = 0;

        const $prev = get('.filter_service_sec1 .btn_wrap2 .prev');
        const $next = get('.filter_service_sec1 .btn_wrap2 .next');

        const showSlide = (i) => {
            if (i < 0) {
                currentslide = 0;
            } else if (i >= totalslides - 1) {
                currentslide = 0;
            } else {
                currentslide = i;
            }
            $slide.style.transform = `translateX(-${currentslide * sliderWidth}px)`;
            $slide.style.transition = `0.5s ease`;
            btnupdate();
        };
        $prev.addEventListener('click', (e) => {
            showSlide(currentslide - 1);
            // console.log(currentslide);
        });

        $next.addEventListener('click', (e) => {
            showSlide(currentslide + 1);
            // console.log(currentslide);
        });
        const btnupdate = () => {
            if (currentslide === 0) {
                $prev.style.display = 'none';
            } else {
                $prev.style.display = 'block';
            }
        };

        btnupdate();
    };

    const filterAni1 = () => {
        const elements = document.querySelectorAll('.filter_service_sec2 ul li');

        // Intersection Observer 설정
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const textElement = entry.target;
                        const index = Array.from(elements).indexOf(textElement);
                        const delay = index * 0.2;

                        // 애니메이션 클래스 추가
                        textElement.style.animation = `leftToRight ease 1.5s ${delay}s forwards`;
                        textElement.style.opacity = 1; // 애니메이션이 끝난 후 보이도록 설정

                        // 애니메이션 적용 후 옵저버에서 제거
                        observer.unobserve(textElement);
                    }
                });
            },
            {
                threshold: 0.1, // 요소가 10% 보일 때 콜백 호출
            }
        );

        // 모든 요소를 옵저버에 추가
        elements.forEach((element) => observer.observe(element));
    };

    // 페이지 로드 시 filterAni1 함수 호출
    document.addEventListener('DOMContentLoaded', filterAni1);
    const filterAni2 = () => {
        // IntersectionObserver 콜백 함수
        const iocEventHandler = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const textElement = entry.target;

                    // 애니메이션 적용
                    textElement.style.animation = `appear_from_bottom ease 1.5s forwards`;
                    textElement.style.opacity = 1;

                    // 애니메이션이 적용된 후에는 더 이상 감시하지 않음
                    observer.unobserve(textElement);
                }
            });
        };

        // IntersectionObserver 설정
        const observer = new IntersectionObserver(iocEventHandler, {
            root: null, // 뷰포트를 기준으로 감지
            rootMargin: '0px', // 뷰포트 경계에서 0px
            threshold: 0.1, // 요소가 10% 이상 보이면 감지
        });

        // 모든 대상 요소 가져오기
        const textElements = getAll('.filter_service_sec3 .filter_faq ul li');

        // 각 텍스트 요소에 대해 Observer를 등록
        textElements.forEach((textElement) => {
            // 초기 상태로 opacity를 0으로 설정
            textElement.style.opacity = 0;
            observer.observe(textElement);
        });
    };

    // 페이지 로드 시 이벤트 핸들러 호출
    filterAni2();

    slide1();
    filterAni1();
    filterAni2();
};
//filterService end
const codymatching = () => {
    const cntUp = () => {
        const $count1 = get('.cody_service_sec1 .title_wrap .tit2 h2 .count1');
        let start = 0,
            end = 0,
            speed = 10,
            current = 0,
            step = 0;

        $count1.textContent = start;
        const countup = () => {
            end = Number($count1.dataset.max);
            current = Number($count1.textContent.replace(/,/g, ''));
            //정규식 표현 1000단위 에 , 넣기
            step = Math.floor(end / speed);

            // console.log(step);

            if (current <= end) {
                current += step;
                $count1.textContent = new Intl.NumberFormat().format(current);
                setTimeout(countup, 60);
            } else {
                $count1.textContent = new Intl.NumberFormat().format(end);
            }
        };
        countup();
    };

    const moveBanner = () => {
        const $srcollImg = get('.cody_service_sec2 .imgscroll');
        const $srcollImgs = getAll('.cody_service_sec2 .imgscroll .scroll');
        const srcollcnt = $srcollImgs.length;
        const srcollWidth = $srcollImgs[0].clientWidth;

        let currentImg = 0;

        const move = (index) => {
            currentImg = index;
            $srcollImg.style.transform = `translateX(-${currentImg * srcollWidth}px)`;
            $srcollImg.style.transition = `0.5s ease`;
        };

        const counts = () => {
            const index = currentImg + 1 < srcollcnt ? currentImg + 1 : 0;
            move(index);
        };

        setInterval(counts, 3000);
    };

    const btnToggle = () => {
        const $togglebtn = get('.cody_service_sec3 .noti_wrap .noti_text .btn_toggle ');
        const $notiText = get('.cody_service_sec3 .noti_wrap .noti_text ');
        const $codylist3 = get('.cody_service_sec3 .noti_wrap .cody_list3 ');
        $codylist3.style.display = 'none';
        $togglebtn.addEventListener('click', (e) => {
            $notiText.classList.toggle('on');
            if ($codylist3.style.display === 'block') {
                $codylist3.style.display = 'none';
                $codylist3.style.transition = '0.3s';
            } else {
                $codylist3.style.display = 'block';
            }
        });
    };

    const bannerTopMove = () => {
        const bannerTop = get('.cody_tap1 .service_tap2');
        const banneroffsetTop = bannerTop.offsetTop;

        window.addEventListener('scroll', (e) => {
            if (window.scrollY > banneroffsetTop) {
                bannerTop.classList.add('fixed');
            } else {
                bannerTop.classList.remove('fixed');
            }
        });
    };

    const bannerBottomMove = () => {
        document.addEventListener('DOMContentLoaded', (e) => {
            const bannerbottom = get('.codybtn');
            const cody = get('.cody_service_sec8');
            const codyOffsetTop = cody.offsetTop;

            window.addEventListener('scroll', (e) => {
                const scrollPosition = window.scrollY;

                if (scrollPosition >= codyOffsetTop) {
                    bannerbottom.classList.add('notfixed');
                } else {
                    bannerbottom.classList.remove('notfixed');
                }
            });
        });
    };

    const mouseMoveSlide = () => {
        document.addEventListener('DOMContentLoaded', function () {
            const $reviewScroll = get('.cody_service_sec4 .text_review .review_scroll');
            let isDragging = false;
            let startPos = 0;
            let currentTranslate = 0;
            let prevTranslate = 0;
            let animationID;

            // 마우스 또는 터치 시작 이벤트 핸들러
            $reviewScroll.addEventListener('mousedown', touchStart);
            $reviewScroll.addEventListener('touchstart', touchStart);

            // 마우스 또는 터치 이동 이벤트 핸들러
            $reviewScroll.addEventListener('mousemove', touchMove);
            $reviewScroll.addEventListener('touchmove', touchMove);

            // 마우스 또는 터치 종료 이벤트 핸들러
            $reviewScroll.addEventListener('mouseup', touchEnd);
            $reviewScroll.addEventListener('mouseleave', touchEnd);
            $reviewScroll.addEventListener('touchend', touchEnd);
            $reviewScroll.addEventListener('touchcancel', touchEnd);

            function touchStart(e) {
                isDragging = true;
                startPos = getPositionX(e);
                animationID = requestAnimationFrame(animation);
                $reviewScroll.style.cursor = 'grabbing';
            }

            function touchMove(e) {
                if (!isDragging) return;
                const currentPosition = getPositionX(e);
                currentTranslate = prevTranslate + (currentPosition - startPos);
            }

            function touchEnd() {
                isDragging = false;
                cancelAnimationFrame(animationID);
                prevTranslate = currentTranslate; // 현재 위치를 prevTranslate에 저장하여 유지
                $reviewScroll.style.cursor = 'grab';
            }

            function getPositionX(e) {
                return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            }

            function animation() {
                setSliderPosition();
                if (isDragging) requestAnimationFrame(animation);
            }

            function setSliderPosition() {
                $reviewScroll.style.transform = `translateX(${currentTranslate}px)`;
            }
        });
    };

    cntUp();
    moveBanner();
    btnToggle();
    bannerTopMove();
    bannerBottomMove();
    mouseMoveSlide();
};
// 코드부분만 수정

// 모바일 추가 js
// 서비스 -----
const codymatchingMobile = () => {
    // sub header 뒤로가기 -----
    const $prevBtn = get('#header .prev');
    $prevBtn.addEventListener('click', (e) => {
        history.back();
    });
    // ----------
    const cntUp1 = () => {
        const $count1 = get('.cody_service_sec1_m .title_wrap .tit2 h2 .count1');

        let start = 0,
            end = 0,
            speed = 10,
            current = 0,
            step = 0;

        $count1.textContent = start;
        const countup = () => {
            end = Number($count1.dataset.max);
            current = Number($count1.textContent.replace(/,/g, ''));
            //정규식 표현 1000단위 에 , 넣기
            step = Math.floor(end / speed);

            console.log(step);

            if (current <= end) {
                current += step;
                $count1.textContent = new Intl.NumberFormat().format(current);
                setTimeout(countup, 60);
            } else {
                $count1.textContent = new Intl.NumberFormat().format(end);
            }
        };
        countup();
    };

    const bannerTopMove = () => {
        const bannerTop = get('.cody_tap1 .service_tap2');
        const banneroffsetTop = bannerTop.offsetTop;

        window.addEventListener('scroll', (e) => {
            if (window.scrollY > banneroffsetTop) {
                bannerTop.classList.add('fixed');
            } else {
                bannerTop.classList.remove('fixed');
            }
        });
    };

    cntUp1();
    bannerTopMove();
};
//--------------

// 고객지원 ---
// 고객지원 홈
const csHome = () => {
    // 상단 무한슬라이드
    const faqSlide = () => {
        const $slideWrap = get('.cs-home .menu');
        const $slide = get('.cs-home .menu-slide');
        const $slides = getAll('.cs-home .menu-slide li');
        const slideHeight = 56;
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

            let newHeight = slideHeight * newSlideCnt - 24 + 'px';
            $slide.style.height = newHeight;
        }
        function setInitialPos() {
            let initialTranslateValue = -slideHeight * cnt;
            $slide.style.transform = `translateY(${initialTranslateValue}px)`;
        }

        function moveSlide(num) {
            $slides[currentIdx].classList.remove('active');
            $slide.style.top = -num * slideHeight + 170 + 'px';
            if (num < cnt) {
                $slides[num].classList.add('active');
            }
            currentIdx = num;
            if (currentIdx === cnt) {
                $slides[0].classList.add('active');
                setTimeout(function () {
                    $slide.classList.remove('animated');
                    $slide.style.top = '170px';
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

    // 자주 찾는 질문 탭
    const faqTab = () => {
        const faqArr = [
            {
                title: '다중이용시설의 기준 및 무상 AS 내용은 어떻게 되나요?',
                desc: '가정 (거주용 주택) 외 모든 장소는 다중이용시설로 설치장소가 구분됩니다. 모든 다중이용시설에 제품 설치가 가능하나, 안전사고의 위험이 있는 장소(사우나, 목욕탕, 찜질방, 놀이방 등 어린이 관련 시설)는 설치 불가합니다.',
                url: './csProduct/csFaqPost/fPost_02.html',
            },
            {
                title: '하트서비스 일정확인 및 변경하고 싶어요',
                desc: `[마이코웨이>제품관리>사용중인 제품] 내 하트서비스 메뉴에서 하트서비스 일정 확인 및 변경이 가능합니다. 하트서비스 메뉴의 '날짜변경 요청'을 선택하시면 원하시는 날짜로 하트서비스 일정을 변경요청 하실 수 있습니다.`,
                url: './csProduct/csFaqPost/fPost_03.html',
            },
            {
                title: '내 정보 조회 및 변경이 가능한가요',
                desc: '[마이코웨이>정보관리>회원정보 관리]에서 회원정보 조회 및 변경이 가능합니다.',
                url: './csProduct/csFaqPost/fPost_05.html',
            },
        ];

        const $faqList = getAll('.faq .con-wrap .left ul li');
        const $title = get('.faq .con-wrap .right .tit');
        const $desc = get('.faq .con-wrap .right .desc');
        const $url = get('.faq .con-wrap .right .plus a');

        $title.textContent = `${faqArr[0].title}`;
        $desc.textContent = `${faqArr[0].desc}`;
        $url.setAttribute('href', `${faqArr[0].url}`);

        $faqList.forEach((li, idx) => {
            li.addEventListener('click', (e) => {
                $faqList.forEach((item) => {
                    item.classList.remove('active');
                });
                li.classList.add('active');
                $title.textContent = `${faqArr[idx].title}`;
                $desc.textContent = `${faqArr[idx].desc}`;
                $url.setAttribute('href', `${faqArr[idx].url}`);
            });
        });
    };

    // 공지사항 슬라이드, 재생 및 일시정지
    const noticeSlide = () => {
        const noticeArr = [
            { title: '안심번호서비스 서버 점검 안내', date: '2024.08.13' },
            { title: '코웨이닷컴 개인정보 처리방침 개정 고지', date: '2024.07.18' },
            { title: '코웨이 계약/멤버십 약관 개정 고지', date: '2024.07.16' },
            { title: '코웨이닷컴 개인정보 처리방침 개정 고지', date: '2024.06.27' },
            { title: '코웨이 계약/멤버십 약관 개정 고지', date: '2024.06.25' },
        ];

        const $title = get('.notice .con-box .slide strong');
        const $date = get('.notice .con-box .slide p');
        const $txtCount = get('.notice .con-box .right .count');
        const $txtTotal = get('.notice .con-box .right .total');
        const $btn = get('.notice .con-box .right button');
        const $btnIcon = get('.notice .con-box .right button i');
        const total = noticeArr.length;
        let cnt = 0,
            timer = null,
            isPlay = true;

        timer = setInterval(slider, 3000);
        $btn.addEventListener('click', (e) => {
            if (isPlay) {
                clearInterval(timer);
                isPlay = false;
                $btnIcon.className = 'xi-play';
            } else {
                timer = setInterval(slider, 2000);
                isPlay = true;
                $btnIcon.className = 'xi-pause';
            }
        });

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

    // 실행
    faqSlide();
    faqTab();
    noticeSlide();
};
// 제품 사용설명서 찾기
const manual = () => {
    const berexArr = [
        {
            title: 'BEREX 마인 플러스',
            subTitle: '',
            imgUrl: '../../../images/cs/manual_berex_mineplus.png',
            fileUrl: '../../../images/cs/manualFile/berex/MC-B02 마인 플러스 사용설명서_내수_002_(24.05.13).pdf',
        },
        {
            title: 'BEREX 리클라이닝 안마베드',
            subTitle: '',
            imgUrl: '../../../images/cs/manual_berex_reclebed.png',
            fileUrl: '../../../images/cs/manualFile/berex/MB-M02 리클라이닝 안마베드 사용설명서_내수용_001_(24.04.15)-1.pdf',
        },
        {
            title: '더블 사이드 매트리스',
            subTitle: 'CMK-SE01s',
            imgUrl: '../../../images/cs/manual_berex_doublesidemat.png',
            fileUrl: '../../../images/cs/manualFile/berex/9243842 더블 사이드 매트리스 CMK_CMQ_CMSS-SE01 사용설명서_내수용_002_(23.10.30).pdf',
        },
        {
            title: '안마의자 페블체어',
            subTitle: '',
            imgUrl: '../../../images/cs/manual_berex_feblechair.png',
            fileUrl: '../../../images/cs/manualFile/berex/MC-C01 페블체어 사용설명서_내수용_001_(23.08.08).pdf',
        },
        {
            title: '시그니처 매트리스',
            subTitle: '',
            imgUrl: '../../../images/cs/manual_berex_sigmat.png',
            fileUrl: '../../../images/cs/manualFile/berex/9244059 시그니처 매트리스 CMLK_CMK_CMQ_CMSS-SP01SC_SP01S 사용설명서_내수용_001_(23.10.31).pdf',
        },
    ];
    const bathArr = [
        {
            title: '더블케어 비데',
            subTitle: 'BAS37-A',
            imgUrl: '../../../images/cs/manual_bath_doublecare.png',
            fileUrl: '../../../images/cs/manualFile/bath/1233540 BAS37-A 더블케어 비데 사용설명서_내수용_003_(23.01.10).pdf',
        },
        {
            title: '더블케어 플러스 비데',
            subTitle: 'BAS38-B',
            imgUrl: '../../../images/cs/manual_bath_doublecareplus.png',
            fileUrl: '../../../images/cs/manualFile/bath/1237467 BAS38-B 더블케어 플러스 비데 사용설명서_내수용_003_(24.05.20).pdf',
        },
        {
            title: '스스로케어 비데(일반형)',
            subTitle: 'BAS40-A',
            imgUrl: '../../../images/cs/manual_bath_selfcaredefault.png',
            fileUrl: '../../../images/cs/manualFile/bath/1236844 BAS40-A 스스로케어 비데(일반형) 사용설명서_내수용_004_(24.05.20).pdf',
        },
        {
            title: '인텔리케어 비데',
            subTitle: 'BASH30-A',
            imgUrl: '../../../images/cs/manual_bath_intelicare.png',
            fileUrl: '../../../images/cs/manualFile/bath/1227938 BASH30-A 인텔리케어 비데 사용설명서_내수용_009_(23.01.10).pdf',
        },
        {
            title: '코웨이 연수기',
            subTitle: 'BB15-A',
            imgUrl: '../../../images/cs/manual_bath_coway.png',
            fileUrl: '../../../images/cs/manualFile/bath/1228395 BB15-A 코웨이 연수기 사용설명서_내수용_006_(21.08.19).pdf',
        },
    ];
    const inductionArr = [
        {
            title: '프라임S 하이브리드 (인덕션 2구+ 하이라이트 1구)',
            subTitle: 'CHR-04',
            imgUrl: '../../../images/cs/manual_induction_primeshi.png',
            fileUrl: '../../../images/cs/manualFile/induction/9243462 CER-04 하이라이트 프라임S 사용설명서_내수용_001_(23.07.13).pdf',
        },
        {
            title: '프라임S 인덕션 (3구)',
            subTitle: 'CIR-303',
            imgUrl: '../../../images/cs/manual_induction_primes.png',
            fileUrl: '../../../images/cs/manualFile/induction/9243360 CIR-303 인덕션 프라임S 사용설명서_내수용_001_(23.07.12).pdf',
        },
        {
            title: '코웨이 인덕션 W (전기레인지)',
            subTitle: 'CIP-30WWS',
            imgUrl: '../../../images/cs/manual_induction_inductionw.png',
            fileUrl: '../../../images/cs/manualFile/induction/P9206250 CIP-30W 인덕션 W 사용설명서(홈페이지용)_내수용_001_(23.09.15).pdf',
        },
        {
            title: '노블 인덕션 프리덤 Wide (최대 출력형)',
            subTitle: 'CIR-F60GS',
            imgUrl: '../../../images/cs/manual_induction_noblemaxwide.png',
            fileUrl: '../../../images/cs/manualFile/induction/9238376 CIR-F60GS 노블와이드최대출력 사용설명서_내수용_002_(22.05.09)_2.pdf',
        },
        {
            title: '노블 인덕션 프리덤 (최대 출력형)',
            subTitle: 'CIR-F40PS',
            imgUrl: '../../../images/cs/manual_induction_noblemax.png',
            fileUrl: '../../../images/cs/manualFile/induction/9238379 CIR-F40GS_CIR-F41GS 노블 인덕션 프리덤 사용설명서_내수용_002_(22.05.09)_2.pdf',
        },
    ];

    const $tabs = getAll('.manual .con-tab ul li');
    const $txtCount = get('.manual .con-board .count span');
    const $list = get('.manual .con-board ul');
    const $lis = getAll('.manual .con-board ul li');
    const $searchInp = get('.manual .con-search .search-inp');
    const $searchBtn = get('.manual .con-search button');

    let num = 0,
        result = '',
        total = 0;

    // 리스트 탭 불러오기
    const listOn = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            result += `
            <li>
                <div class="desc">
                    <div class="pic">
                        <img
                            src="${arr[i].imgUrl}"
                            alt="${arr[i].title}" />
                    </div>
                    <div class="txt">
                        <span>${arr[i].subTitle}</span>
                        <p>${arr[i].title}</p>
                    </div>
                </div>
                <a
                    href="${arr[i].fileUrl}"
                    download>
                    <button type="button">제품 사용설명서 받기<i class="xi-download"></i></button>
                </a>
            </li>
            `;
        }
        total = Number(arr.length) + Number(total);
        $txtCount.textContent = total;
        $list.innerHTML = result;
    };

    // 리스트 전체 불러오기
    const listOnAll = () => {
        total = '';
        listOn(berexArr);
        listOn(bathArr);
        listOn(inductionArr);
    };

    // 페이지 접속시 전체 탭
    listOnAll();

    // 제품명 검색
    const search = () => {
        let inpVal = $searchInp.value;
        let mergeArr = [];

        switch (num) {
            case 0:
                mergeArr = berexArr.concat(bathArr, inductionArr);
                break;
            case 1:
                mergeArr = berexArr.concat();
                break;
            case 2:
                mergeArr = bathArr.concat();
                break;
            case 3:
                mergeArr = inductionArr.concat();
                break;
        }

        const searchListOn = (arr) => {
            let searchArr = arr.filter((item) => {
                return item.title.includes(inpVal);
            });

            total = '';
            result = '';
            listOn(searchArr);
        };

        searchListOn(mergeArr);
    };

    // tab 클릭시 active
    $tabs.forEach((li, idx) => {
        li.addEventListener('click', (e) => {
            $searchInp.value = '';
            $tabs.forEach((item) => {
                item.classList.remove('active');
            });
            li.classList.add('active');
            num = idx;

            switch (num) {
                case 0:
                    result = '';
                    listOnAll();
                    break;
                case 1:
                    result = '';
                    total = '';
                    listOn(berexArr);
                    break;
                case 2:
                    result = '';
                    total = '';
                    listOn(bathArr);
                    break;
                case 3:
                    result = '';
                    total = '';
                    listOn(inductionArr);
                    break;
            }
        });
    });

    // 검색
    $searchBtn.addEventListener('click', (e) => {
        search();
    });
};
// 자주 찾는 질문
const faq = () => {
    const faqArr = [
        { title: '안마베드, 척추베드 사용 강도 안내', group: '제품', url: './csFaqPost/fPost_01.html' },
        { title: '다중이용시설의 기준 및 무상 AS 내용은 어떻게 되나요?', group: '제품', url: './csFaqPost/fPost_02.html' },
        { title: '하트서비스 일정확인 및 변경하고 싶어요', group: '서비스', url: './csFaqPost/fPost_03.html' },
        { title: '안마의자를 사용하다가 오염이 되었어요. 어떻게 해야하나요?', group: '서비스', url: './csFaqPost/fPost_04.html' },
        { title: '내 정보 조회 및 변경이 가능한가요', group: '사이트이용', url: './csFaqPost/fPost_05.html' },
        { title: 'A/S신청방법이 궁금해요', group: '사이트이용', url: './csFaqPost/fPost_06.html' },
        { title: '부정제보는 어떻게 하나요', group: '기타', url: './csFaqPost/fPost_07.html' },
        { title: '콜센터에서 주문하면서 전자계약서 서명 알림톡을 받았는데 서명은 어떻게 하나요', group: '기타', url: './csFaqPost/fPost_08.html' },
    ];
    const addArr = [];

    const $faqUl = get('.faq .con-board ul');
    const $countTxt = get('.faq .con-board .count span');
    const $searchInp = get('.faq .con-search .search-inp');
    const $searchBtn = get('.faq .con-search button');
    const $moreBtn = get('.faq .con-board .more');
    const $select = get('.faq select');
    let result = '',
        cnt = 0,
        num = 4,
        total = 0;

    // 질문 불러오기
    const faqListOn = () => {
        if (cnt < faqArr.length) {
            for (let i = cnt; i < cnt + num; i++) {
                addArr.push(faqArr[i]);
            }
            // console.log(addArr);

            total += 4;
            $countTxt.textContent = total;

            for (let i = cnt; i < cnt + num; i++) {
                result += `
                <li>
                    <a href="${addArr[i].url}">
                        <p class="title">${addArr[i].title}</p>
                        <p class="cate"><span class="best">BEST</span>${addArr[i].group}</p>
                    </a>
                </li>
                `;
            }
            $faqUl.innerHTML = result;

            cnt += num;
        }
    };

    // 질문 검색
    const faqSearch = () => {
        let selVal = $select.options[$select.selectedIndex].value;
        let inpVal = $searchInp.value;
        // console.log(inpVal);

        let searchArr = addArr.filter((item) => {
            return item.title.includes(inpVal) && item.group.includes(selVal);
        });

        total = searchArr.length;
        $countTxt.textContent = total;

        result = '';
        searchArr.forEach((item) => {
            result += `
                <li>
                    <a href="${item.url}">
                        <p class="title">${item.title}</p>
                        <p class="cate"><span class="best">BEST</span>${item.group}</p>
                    </a>
                </li>
                `;
        });

        $faqUl.innerHTML = result;
    };

    // 버튼 클릭 시 검색
    $searchBtn.addEventListener('click', (e) => {
        faqSearch();
    });

    $moreBtn.addEventListener('click', (e) => {
        faqListOn();
    });

    // 기본
    faqListOn();
};
/* // 자주 찾는 질문
const faq = () => {
    const faqArr = [
        { title: '안마베드, 척추베드 사용 강도 안내', group: '제품', url: './csFaqPost/fPost_01.html' },
        { title: '다중이용시설의 기준 및 무상 AS 내용은 어떻게 되나요?', group: '제품', url: './csFaqPost/fPost_02.html' },
        { title: '하트서비스 일정확인 및 변경하고 싶어요', group: '서비스', url: './csFaqPost/fPost_03.html' },
        { title: '안마의자를 사용하다가 오염이 되었어요. 어떻게 해야하나요?', group: '서비스', url: './csFaqPost/fPost_04.html' },
        { title: '내 정보 조회 및 변경이 가능한가요', group: '사이트이용', url: './csFaqPost/fPost_05.html' },
        { title: 'A/S신청방법이 궁금해요', group: '사이트이용', url: './csFaqPost/fPost_06.html' },
        { title: '부정제보는 어떻게 하나요', group: '기타', url: './csFaqPost/fPost_07.html' },
        { title: '콜센터에서 주문하면서 전자계약서 서명 알림톡을 받았는데 서명은 어떻게 하나요', group: '기타', url: './csFaqPost/fPost_08.html' },
    ];

    const $faqUl = get('.faq .con-board ul');
    const $countTxt = get('.faq .con-board .count span');
    const $searchInp = get('.faq .con-search .search-inp');
    const $searchBtn = get('.faq .con-search button');
    const $select = get('.faq select');
    let result = '',
        total = 0;

    // 질문 불러오기
    const faqListOn = (arr) => {
        result = '';
        total = arr.length;
        $countTxt.textContent = total;

        for (let i = 0; i < total; i++) {
            result += `
            <li>
                <a href="${arr[i].url}">
                    <p class="title">${arr[i].title}</p>
                    <p class="cate"><span class="best">BEST</span>${arr[i].group}</p>
                </a>
            </li>
            `;
        }
        $faqUl.innerHTML = result;
    };

    // 질문 검색
    const faqSearch = () => {
        let selVal = $select.options[$select.selectedIndex].value;
        let inpVal = $searchInp.value;
        console.log(inpVal);

        let searchArr = faqArr.filter((item) => {
            return item.title.includes(inpVal) && item.group.includes(selVal);
        });

        faqListOn(searchArr);
    };

    // 버튼 클릭 시 검색
    $searchBtn.addEventListener('click', (e) => {
        faqSearch();
    });

    // 기본
    faqListOn(faqArr);
}; */
// 공지사항
const notice = () => {
    const noticeArr = [
        { title: '안심번호서비스 서버 점검 안내', date: '2024.08.13', url: './csNoticePost/nPost_01.html' },
        { title: '코웨이닷컴 개인정보 처리방침 개정 고지', date: '2024.07.18', url: './csNoticePost/nPost_02.html' },
        { title: '코웨이 계약/멤버십 약관 개정 고지', date: '2024.07.16', url: './csNoticePost/nPost_03.html' },
        { title: '코웨이닷컴 개인정보 처리방침 개정 고지', date: '2024.06.27', url: './csNoticePost/nPost_04.html' },
        { title: '코웨이 계약/멤버십 약관 개정 고지', date: '2024.06.25', url: './csNoticePost/nPost_05.html' },
        { title: '코웨이 계약/멤버십 약관 개정 고지', date: '2024.05.31', url: './csNoticePost/nPost_06.html' },
        { title: '사업자 마이코웨이 이용 제한 안내', date: '2024.05.14', url: './csNoticePost/nPost_07.html' },
        { title: '코웨이닷컴 개인정보 처리방침 개정 고지', date: '2024.05.13', url: './csNoticePost/nPost_08.html' },
    ];
    const addArr = [];

    const $noticeUl = get('.notice .con-board ul');
    const $countTxt = get('.notice .con-board .count span');
    const $searchInp = get('.notice .con-search .search-inp');
    const $searchBtn = get('.notice .con-search button');
    const $moreBtn = get('.notice .con-board .more');
    let result = '',
        cnt = 0,
        num = 4,
        total = 0;

    // 공지 불러오기
    const noticeListOn = () => {
        if (cnt < noticeArr.length) {
            for (let i = cnt; i < cnt + num; i++) {
                addArr.push(noticeArr[i]);
            }
            // console.log(addArr);

            total += 4;
            $countTxt.textContent = total;

            for (let i = cnt; i < cnt + num; i++) {
                result += `
                <li>
                    <a href="${addArr[i].url}">
                        <p class="title">${addArr[i].title}</p>
                        <p class="date">${addArr[i].date}</p>
                    </a>
                </li>
                `;
            }
            $noticeUl.innerHTML = result;

            cnt += num;
        }
    };

    // 공지 검색
    const noticeSearch = () => {
        let inpVal = $searchInp.value;
        // console.log(inpVal);

        let searchArr = addArr.filter((item) => {
            return item.title.includes(inpVal);
        });

        total = searchArr.length;
        $countTxt.textContent = total;

        result = '';
        searchArr.forEach((item) => {
            result += `
                <li>
                    <a href="${item.url}">
                        <p class="title">${item.title}</p>
                        <p class="date">${item.date}</p>
                    </a>
                </li>
                `;
        });

        $noticeUl.innerHTML = result;
    };

    // 버튼 클릭 시 검색
    $searchBtn.addEventListener('click', (e) => {
        noticeSearch();
    });

    // 버튼 클릭 시 더보기
    $moreBtn.addEventListener('click', (e) => {
        noticeListOn();
    });

    // 기본
    noticeListOn();
};
/* // 공지사항
const notice = () => {
    const noticeArr = [
        { title: '안심번호서비스 서버 점검 안내', date: '2024.08.13', url: './csNoticePost/nPost_01.html' },
        { title: '코웨이닷컴 개인정보 처리방침 개정 고지', date: '2024.07.18', url: './csNoticePost/nPost_02.html' },
        { title: '코웨이 계약/멤버십 약관 개정 고지', date: '2024.07.16', url: './csNoticePost/nPost_03.html' },
        { title: '코웨이닷컴 개인정보 처리방침 개정 고지', date: '2024.06.27', url: './csNoticePost/nPost_04.html' },
        { title: '코웨이 계약/멤버십 약관 개정 고지', date: '2024.06.25', url: './csNoticePost/nPost_05.html' },
        { title: '코웨이 계약/멤버십 약관 개정 고지', date: '2024.05.31', url: './csNoticePost/nPost_06.html' },
        { title: '사업자 마이코웨이 이용 제한 안내', date: '2024.05.14', url: './csNoticePost/nPost_07.html' },
        { title: '코웨이닷컴 개인정보 처리방침 개정 고지', date: '2024.05.13', url: './csNoticePost/nPost_08.html' },
    ];

    const $noticeUl = get('.notice .con-board ul');
    const $countTxt = get('.notice .con-board .count span');
    const $searchInp = get('.notice .con-search .search-inp');
    const $searchBtn = get('.notice .con-search button');
    let result = '',
        total = 0;

    // 공지 불러오기
    const noticeListOn = (arr) => {
        result = '';
        total = arr.length;
        $countTxt.textContent = total;

        for (let i = 0; i < total; i++) {
            result += `
            <li>
                <a href="${arr[i].url}">
                    <p class="title">${arr[i].title}</p>
                    <p class="date">${arr[i].date}</p>
                </a>
            </li>
            `;
        }
        $noticeUl.innerHTML = result;
    };

    // 공지 검색
    const noticeSearch = () => {
        let inpVal = $searchInp.value;
        console.log(inpVal);

        let searchArr = noticeArr.filter((item) => {
            return item.title.includes(inpVal);
        });

        noticeListOn(searchArr);
    };

    // 버튼 클릭 시 검색
    $searchBtn.addEventListener('click', (e) => {
        noticeSearch();
    });

    // 기본
    noticeListOn(noticeArr);
}; */
// 양도양수 서비스
const transfer = () => {
    const $btn = get('.transfer .con-box .btn');

    $btn.addEventListener('click', (e) => {
        showPopup('로그인 후 이용해주세요.');
    });

    get('#modal .close').addEventListener('click', (e) => {
        setTimeout(() => {
            // 로그인html로 경로 수정
            window.location.href = '/page/login/login.html';
        }, 300);
    });
    get('#modal .sure').addEventListener('click', (e) => {
        setTimeout(() => {
            // 로그인html로 경로 수정
            window.location.href = '/page/login/login.html';
        }, 300);
    });
};
const transferNow = () => {
    setTimeout(() => {
        showPopup('로그인 후 이용해주세요.');
    }, 100);

    get('#modal .close').addEventListener('click', (e) => {
        setTimeout(() => {
            // 로그인html로 경로 수정
            window.location.href = '/page/login/login.html';
        }, 300);
    });
    get('#modal .sure').addEventListener('click', (e) => {
        setTimeout(() => {
            // 로그인html로 경로 수정
            window.location.href = '/page/login/login.html';
        }, 300);
    });
};
// 1:1 문의
const contact = () => {
    const $btn = get('.contact .con-box .btn');

    $btn.addEventListener('click', (e) => {
        showPopup('로그인 후 이용해주세요.');
    });

    get('#modal .close').addEventListener('click', (e) => {
        setTimeout(() => {
            // 로그인html로 경로 수정
            window.location.href = '/page/login/login.html';
        }, 300);
    });
    get('#modal .sure').addEventListener('click', (e) => {
        setTimeout(() => {
            // 로그인html로 경로 수정
            window.location.href = '/page/login/login.html';
        }, 300);
    });
};
// ----------

// 로그인, 회원가입  ---
// 회원가입
const join = () => {
    const $label = get('.join .all-agree label');
    const $labels = getAll('.join .agree-box label');
    const $allAgreeBtn = get('.join  .all-agree .all-agree-btn');
    const $agreeBtns = getAll('.join .agree-box .box .agree-btn');
    const $span = getAll('.join  .agree-box .box span');
    const $nextBtn = get('.join  .agree .page-next');
    const $email = get('.join  .email');

    // sub header 뒤로가기 -----
    const $prevBtn = get('#header .prev');
    $prevBtn.addEventListener('click', (e) => {
        history.back();
    });

    const chk = () => {
        const allActive = Array.from($agreeBtns).every((btn) => btn.classList.contains('active'));
        if (allActive) {
            $allAgreeBtn.classList.add('active');
            $label.classList.add('active');
        } else {
            $allAgreeBtn.classList.remove('active');
            $label.classList.remove('active');
        }
    };

    const nextBtn = () => {
        let agActive = true;
        $span.forEach((span, i) => {
            if (span.dataset.value === '필수' && !$agreeBtns[i].classList.contains('active')) {
                agActive = false;
            }
        });
        if (agActive) {
            $nextBtn.style.cursor = 'pointer';
            $nextBtn.style.background = '#1b2529';
        } else {
            $nextBtn.style.cursor = 'not-allowed';
            $nextBtn.style.background = '#a0a0a0';
        }
    };

    // 전체 동의
    $allAgreeBtn.addEventListener('click', (e) => {
        const isActive = !$allAgreeBtn.classList.contains('active');
        $allAgreeBtn.classList.toggle('active', isActive);
        $label.classList.toggle('active', isActive);
        $agreeBtns.forEach((btn, i) => {
            btn.classList.toggle('active', isActive);
            $labels[i].classList.toggle('active', isActive);
        });
        nextBtn();
    });
    $label.addEventListener('click', (e) => {
        const isActive = !$allAgreeBtn.classList.contains('active');
        $allAgreeBtn.classList.toggle('active', isActive);
        $label.classList.toggle('active', isActive);
        $agreeBtns.forEach((btn, i) => {
            btn.classList.toggle('active', isActive);
            $labels[i].classList.toggle('active', isActive);
        });
        nextBtn();
    });

    // 개별 동의
    $agreeBtns.forEach((btn, i) => {
        btn.addEventListener('click', (e) => {
            btn.classList.toggle('active');
            $labels[i].classList.toggle('active');
            chk();
            nextBtn();
        });
    });

    // 개별 라벨
    $labels.forEach((label, i) => {
        label.addEventListener('click', (e) => {
            $agreeBtns[i].classList.toggle('active');
            $labels[i].classList.toggle('active');
            chk();
            nextBtn();
        });
    });

    // 다음 버튼
    $nextBtn.addEventListener('click', (e) => {
        if ($nextBtn.style.cursor === 'pointer') {
            $email.classList.add('active');
        }
    });

    // 이메일 버튼
    const $emailError = get('.join .email p');
    const $emailInp = get('.join .email input[type="email"]');
    const $emailNextBtn = get('.join .email .page-next');

    $emailInp.addEventListener('input', (e) => {
        const inpValue = $emailInp.value;
        if (!inpValue.includes('@') || !inpValue.includes('.com')) {
            $emailError.classList.add('active');
            $emailNextBtn.classList.remove('active');
            $emailNextBtn.style.cursor = `not-allowed`;
        } else {
            $emailError.classList.remove('active');
            $emailNextBtn.style.cursor = `pointer`;
            $emailNextBtn.classList.add('active');

            // 팝업창 오픈
            const $joinModalBg = get('#modal .background');
            const $joinPopup = get('#modal .popup');
            $emailNextBtn.addEventListener('click', (e) => {
                $joinModalBg.style.display = 'block';
                $joinPopup.style.display = 'block';
            });

            // 팝업끄기
            const $joinClose = get('#modal .popup .close');
            $joinClose.addEventListener('click', (e) => {
                $joinModalBg.style.display = 'none';
                $joinPopup.style.display = 'none';
            });
        }
    });
};

// ----------

// 합치기
const subInit = () => {
    // 공통

    //페이지별 함수호출

    // 제품 -----
    // 주방/생활가전
    if (location.pathname.split('/').pop() === 'lifeelc.html' || location.pathname.split('/').pop() === 'MoLifeElc.html') {
        lifeElc();
    }
    // 주방/생활가전 - 상세페이지
    if (location.pathname.split('/').pop() === 'lifeelcDetail.html' || location.pathname.split('/').pop() === 'MoLifeElcDetail.html') {
        lifeElcDetail();
    }
    // 룰루비데/연수기
    if (location.pathname.split('/').pop() === 'waterelc.html') {
        // waterElc();
        lifeElc();
    }
    // BEREX 매트리스/안마의자
    if (location.pathname.split('/').pop() === 'berexelc.html') {
        // berexElc();
        lifeElc();
    }
    // 리퍼브 기획전
    if (location.pathname.split('/').pop() === 'refurb.html') {
        // refurb();
        lifeElc();
    }
    // -------------

    // 매장 -----
    if (location.pathname.split('/').pop() === 'introduce.html') {
        introduce();
    }
    if (location.pathname.split('/').pop() === 'otherVendor.html') {
        otherVendor();
    }
    if (location.pathname.split('/').pop() === 'reservation.html') {
        reservation();
    }
    if (location.pathname.split('/').pop() === 'reserCheck.html') {
        reserCheck();
    }
    // -------------

    // 서비스 -----
    if (location.pathname.split('/').pop() === 'productService.html') {
        productService();
    }
    if (location.pathname.split('/').pop() === 'filterService.html') {
        filterService();
    }
    if (location.pathname.split('/').pop() === 'heartService.html') {
        heartService();
    }
    if (location.pathname.split('/').pop() === 'bidet.html') {
        heartService();
    }
    if (location.pathname.split('/').pop() === 'airCare.html') {
        heartService();
    }
    if (location.pathname.split('/').pop() === 'iocareService.html') {
        iocareService();
    }
    if (location.pathname.split('/').pop() === 'totalCareService.html') {
        totalCareService();
    }
    if (location.pathname.split('/').pop() === 'codymatching.html') {
        codymatching();
    }
    if (location.pathname.split('/').pop() === 'codymatchingMobile.html') {
        codymatchingMobile();
    }
    if (location.pathname.split('/').pop() === 'productServiceMobile.html') {
        // sub header 뒤로가기 -----
        const $prevBtn = get('#header .prev');
        $prevBtn.addEventListener('click', (e) => {
            history.back();
        });
        // ----------
    }
    // -------------

    // 고객지원 -----
    // 고객지원 홈
    if (location.pathname.split('/').pop() === 'csHome.html') {
        csHome();
    }
    // 제품 사용설명서 찾기
    if (location.pathname.split('/').pop() === 'manual.html') {
        manual();
    }
    // 자주 찾는 질문
    if (location.pathname.split('/').pop() === 'faq.html') {
        faq();
    }
    // 양도양수 서비스
    if (location.pathname.split('/').pop() === 'transfer_step1.html') {
        transfer();
    }
    if (location.pathname.split('/').pop() === 'transfer_step2.html') {
        transfer();
    }
    if (location.pathname.split('/').pop() === 'transfer_step3.html') {
        transferNow();
    }
    // 1:1 문의
    if (location.pathname.split('/').pop() === 'contact.html') {
        contact();
    }
    // 공지사항
    if (location.pathname.split('/').pop() === 'notice.html') {
        notice();
    }
    // -------------

    // 로그인, 회원가입, 마이페이지 -----
    if (location.pathname.split('/').pop() === 'myPage.html') {
        myPage();
    }
    if (location.pathname.split('/').pop() === 'joinPage1.html') {
        joinPage1();
    }
    if (location.pathname.split('/').pop() === 'joinPage2.html') {
        joinPage2();
    }
    if (location.pathname.split('/').pop() === 'joinPage3.html') {
        joinPage3();
    }
    if (location.pathname.split('/').pop() === 'join.html') {
        join();
    }
    // -------------
};

// 실행
(() => {
    subInit();
})();
