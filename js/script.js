

window.addEventListener('DOMContentLoaded',function(){
    //tabs
let tabs = document.querySelectorAll('.tabheader__item');
let tabsContent = document.querySelectorAll('.tabcontent');
let tabsParent = document.querySelector('.tabheader__items');

function hideTabContent(){
    tabsContent.forEach(item =>{
        item.classList.add('hide');
        item.classList.remove('show','fade');
        tabs.forEach(item =>{
    item.classList.remove('tabheader__item_active');
 });
        
    });
}

 function showTabContent(i = 0){
tabsContent[i].classList.add('show','fade');
tabsContent[i].classList.remove('hide');
tabs[i].classList.add('tabheader__item_active');

 }


hideTabContent();
showTabContent();

tabsParent.addEventListener('click',function(event){
let target = event.target;
if(target && target.classList.contains('tabheader__item')){
    tabs.forEach((item,i) =>{
        if (target == item) {
            hideTabContent();
            showTabContent([i]);
            

 } 
});
}
});



//timer
let deadline = '2023-01-01';
function getTImeRemaining(endTime){
    const t = Date.parse(endTime) - Date.parse(new Date());
    let days = Math.floor(t / (1000*60*60*24));
    let hours = Math.floor((t/(1000*60*60)) % 24);
    let minutes = Math.floor((t/(1000*60)) % 60);
    let seconds = Math.floor((t/1000)%60);
    return {
        'total' : t,
        'days': days,
        'hours': hours,
        'minutes':minutes,
        'seconds':seconds
    };
}


function setClock(selector,endTime){
    let timer = document.querySelector(selector);
    let days = document.querySelector('#days');
    let hours = document.querySelector('#hours');
    let minutes = document.querySelector('#minutes');
    let seconds = document.querySelector('#seconds');
    let timeInterval = setInterval(updateClock, 1000);
    updateClock();
        function updateClock(){
            let t = getTImeRemaining(endTime);
            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
        
}
setClock('.timer', deadline);

//modal



const modalTrigger = document.querySelectorAll('[data-modal]'),
modal = document.querySelector('.modal'),
modalCloseBtn = document.querySelector('[data-close]');
function openModal(){
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modelTimeID);
}

modalTrigger.forEach(btn => {
btn.addEventListener('click', openModal);
});

function closeModal() {
modal.classList.add('hide');
modal.classList.remove('show');
document.body.style.overflow = '';
}
modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click',(e)=> {
    if(e.target === modal){
        closeModal();
    }
}
);
document.addEventListener('keydown',(e)=>{
if(e.code ==='Escape' && modal.classList.contains('show')){
    closeModal();
}
});



//let modelTimeID = setTimeout(openModal, 3000);



function showModalByScroll(){
if(window.pageYOffset + document.documentElement.clientHeight>= document.documentElement.scrollHeight -1){
    openModal();
    window.removeEventListener('scroll',showModalByScroll);
}

}
window.addEventListener('scroll',showModalByScroll);

// class


let cards = document.querySelectorAll('.menu__item');
cards.forEach(item=>{
item.remove();
});


class MenuCard{
    constructor(src,alt,title,descr,price,parentSelector, ...clases){
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.clases = clases;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 1.2;
        this.changeToUAH();
    }
    
    changeToUAH(){
    this.price = Math.floor(this.price / this.transfer);
    }
    
    render(){
        let element = document.createElement('div');
        this.clases.forEach(className=> element.classList.add(className));
        element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}"</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">cena:</div>
            <div class="menu__item-total"><span>${this.price}</span> euro/day</div>
        </div>
        
        `;
        this.parent.append(element);
    }

}

new MenuCard(
    'img/tabs/vegy.jpg',
    "vegy",
    "Menu „Fitness” ",
    'Menu „Fitness” to nowe podejście do gotowania: więcej świeżych warzyw i owoców. Produkt osób aktywnych i zdrowych. To zupełnie nowy produkt w najlepszej cenie i wysokiej jakości!',
    9,
    '.menu .container',
    'menu__item'
).render();

new MenuCard(
    'img/tabs/elite.jpg',
    "elite",
    "Menu „Premium” ",
    'W menu „Premium” stosujemy nie tylko piękny design opakowań, ale również wysoką jakość wykonania dań. Czerwone ryby, owoce morza, owoce – menu restauracji bez wyjścia do restauracji!',
    15,
    '.menu .container',
    'menu__item'
).render();


new MenuCard(
    'img/tabs/post.jpg',
    "post",
    "Menu „Wielki Post”",
    'Wielkopostne menu to starannie dobrany wybór składników: żadnych produktów pochodzenia zwierzęcego, mleka z migdałów, owsa, kokosa czy kaszy gryczanej, tylko odpowiednia ilość białka z tofu i steków z importowanych warzyw.',
     7,
    '.menu .container',
    'menu__item'
).render();

//forms

let forms = document.querySelectorAll('form');
let messege ={
    loading: 'loading...',
    success: 'thank you',
    failure: 'whats wrong'

};


forms.forEach(item =>{
    postData(item);
});
function postData(form){
    form.addEventListener('submit',(e)=>{
e.preventDefault();

let statusMessege = document.createElement('div');
    statusMessege.classList.add('status');
    statusMessege.textContent=messege.loading;
    form.append(statusMessege);
let request = new XMLHttpRequest();
request.open('POST', 'server.php');
request.setRequestHeader('Content-type','multipart/form-data');
let formData = new FormData(form);
request.send(formData);

Request.addEventListener('load',()=>{
    if(request.status===200){
     console.log(request.response);
     statusMessege.textContent=messege.success;
    }
    else{
        statusMessege.textContent=messege.failure;
    }
});
    }
    );
}


let sliders = document.querySelectorAll('.offer__slide');
let prev = document.querySelector('.offer__slider-prev');
let next = document.querySelector('.offer__slider-next');
let current = document.getElementById('current');
let total = document.getElementById('total');
let slider =document.querySelector('.offer__slider');
total.textContent=sliders.length;
current.textContent = 1;
let slideIndex = current.textContent + 1 ;

showSlides(slideIndex);


 function showSlides(n){
if (n>sliders.length){
    slideIndex=1;
    
}
 else if(n<1){
    slideIndex=sliders.length;
}
sliders.forEach((item)=>{item.style.display='none';});
    sliders[slideIndex - 1].style.display='block';
}

function plusSlide(n){
    showSlides(slideIndex += n);
}
prev.addEventListener('click',()=>{
    plusSlide(-1);
    current.textContent -=1;
    if(current.textContent<1){
        current.textContent=total.textContent;}
        dots.forEach((dot)=>{
            dot.style.opacity='.5';
            dots[slideIndex-1].style.opacity ='1';
            });
            
    }
);
next.addEventListener('click',()=>{
    plusSlide(1);  
    current.textContent = +current.textContent + 1 ;
    if(current.textContent>total.textContent){
        current.textContent=1;
    }
    dots.forEach((dot)=>{
        dot.style.opacity='.5';
        dots[slideIndex-1].style.opacity ='1';
        });
        
});


slider.style.position = 'relative';


let indicators = document.createElement('ul');
let dots =[];
indicators.style.add='carousels';
indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;
slider.append(indicators);


for(let i = 0;i<sliders.length;i++){
    let dot = document.createElement('li');
    dot.setAttribute('data-slide-to',i + 1);
    dot.style.cssText=`
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px'
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease ;
    `;
    indicators.append(dot);
    dots.push(dot);
    if(i == 0 ){
 dot.style.opacity ='1';
    }

}



//calculator

let result = document.querySelector('.calculating__result');
let sex = 'female', height, weight, age, ratio='1.375';

function calcTotal(){
    if(!sex || !height || !weight || !age || !ratio){
        result.textContent = '_______';
        return;
    }
if(sex === 'female'){
    result.textContent = Math.round((447.6+(9.2*weight)+(3.1 * height)-(4.3*age))*ratio)+'ccal';

}
else{
    result.textContent = Math.round((88.36+(13.4*weight)+(4.8 * height)-(5.7*age))*ratio)+'ccal';
 
}
}
calcTotal();

function getStaticInformation(parentSelector, activeClass){
    let elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach((elem)=>{
     elem.addEventListener('click',(e)=>{
        if(e.target.getAttribute('data-ratio')){
            ratio = +e.target.getAttribute('data-ratio');
        }
        else{
            sex = e.target.getAttribute('id');
            
        }
        console.log(ratio,sex);
        elements.forEach((elem)=>{
            elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
    
        calcTotal();
        });
    });
}
    
   

getStaticInformation('#gender', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');


function getDynamicInformation(selector){
let input = document.querySelector(selector);
input.addEventListener('input', ()=>{
switch(input.getAttribute('id')){
    case 'height':
        height = +input.value;
    break;
    case 'weight':
        weight = +input.value;
    break;
    case 'age':
        age = +input.value;
    break;
    
}
calcTotal();
});

}
getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');
});


 










