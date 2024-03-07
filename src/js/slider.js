

const sliderInit = (perPage, slider, items, sliderLine, nextButton, prevButton, currentSlide, allSlides, maxWidth, autoPlay, bullets ) => {

    let width;
    let current = perPage;
    width = slider.offsetWidth;
    let timerId = 0;
    if(autoPlay) {
    window.addEventListener('resize', () => {
        init()
    });
    }

    function init() {
        sliderLine.style.width = width/perPage * items.length + 'px';
        items.forEach(item => {
            if(item.length > 1) {
                item.forEach(i => {
                    i.style.width = width + 'px';
                    i.style.height = 'auto';
                })
            } else {
                item.style.width = width + 'px';
                item.style.height = 'auto';
            }
       
        });
        currentSlide ? currentSlide.innerText = perPage : '';
        allSlides ? allSlides.innerText = items.length : '';

        if(bullets) {
            bullets.innerHTML = ''
            items.map((item) => {
                bullets.innerHTML = bullets.innerHTML + '<div class="bullet"></div>'
            })
            bullets.childNodes[current-1].classList.add('bullet-active')
        }
        if(autoPlay) {
            clearInterval(timerId);
            autoplay()
            rollSlider();
        } else {
            rollSlider();
        }
    }

    if(maxWidth) {
        if(width <= maxWidth) {
            init()
        }
    } else {
        init();
    }

    nextButton.addEventListener('click', function () {
        nextSlide();
    });

    function nextSlide () {
        current = current + perPage;
        currentSlide ? currentSlide.innerText = current : '';
      
        if (current > items.length ) {
            current = perPage;
            currentSlide ? currentSlide.innerText = current : '';
        }

        if(bullets) {
            bullets.childNodes.forEach((bullet) => {
                bullet.classList.remove('bullet-active')
            })
            bullets.childNodes[current-1].classList.add('bullet-active')
        }
        rollSlider();
    }
     
    prevButton.addEventListener('click', function () {
        clearInterval(timerId)
       
        if ( current / perPage * items.length  < items.length +1    ) {
            current = items.length;
            currentSlide ? currentSlide.innerText = current : '';
        } 
        
        else{
            current = current - perPage;
            currentSlide ? currentSlide.innerText = current : '';
        }
       
        if(bullets) {
            bullets.childNodes.forEach((bullet) => {
                bullet.classList.remove('bullet-active')
            })
            bullets.childNodes[current-1].classList.add('bullet-active')
        }
        
        rollSlider();
    });
    
    function rollSlider() {
       
        sliderLine.style.transform = 'translate(-' + ((current - perPage)/perPage * width) + 'px)'; 
    }

    function  autoplay ()  {
        timerId = setInterval(() => {
            nextSlide ()
           }, 4000);
    }

}

const sliderRemove = (sliderLine, items) => {
        
    sliderLine.removeAttribute("style");
        
    items.forEach(item => {
        if(item.length > 1) {
            item.forEach(i => {
                i.removeAttribute("style");
            })
        } else {
            item.removeAttribute("style");
        }
   
    });
}

const stagesSliderInit = () => {
    const slider = document.querySelector('.stages__slider');
    const items = document.querySelectorAll('.stages__item');
    const groupItems = [[items[0], items[1]], items[2], [items[3], items[4]], items[5], items[6]]
    const sliderLine = document.querySelector('.stages__items');
    const nextButton = document.querySelector('.stages__slider-next');
    const prevButton = document.querySelector('.stages__slider-prev');
    const bullets = document.querySelector('.stages__slider-bullets');
    const maxWidth = 767.98;
    sliderInit(1, slider, groupItems, sliderLine, nextButton, prevButton, null, null, maxWidth, false, bullets)
}

const stagesSlider = document.querySelector('.stages__slider');
const sliderLine = document.querySelector('.stages__items');
const items = document.querySelectorAll('.stages__item');
const stagesSliderWidth = stagesSlider.offsetWidth;

    if (stagesSliderWidth < 767.98) {
        stagesSliderInit()
    } else {
        sliderRemove(sliderLine, items)
    }

window.addEventListener('resize', () => {
    const stagesSlider = document.querySelector('.stages__slider');
    const width = stagesSlider.offsetWidth;
    if (width < 767.98) {
        stagesSliderInit()
    } else {
        sliderRemove(sliderLine, items)
    }
});


const participantsSliderInit = (perPage) => {
    const slider = document.querySelector('.participants__slider');
    const items = document.querySelectorAll('.participants__item');
    const sliderLine = document.querySelector('.participants__items');
    const currentSlide = document.querySelector('.participants__slider-current');
    const allSlides = document.querySelector('.participants__slider-all');
    const nextButton = document.querySelector('.participants__slider-next');
    const prevButton = document.querySelector('.participants__slider-prev');
    
    sliderInit(perPage, slider, items, sliderLine, nextButton, prevButton, currentSlide, allSlides, null, true, null)
}

const slider = document.querySelector('.participants__slider');
    
    const width = slider.offsetWidth;

    if(width < 800 && width >= 600) {
        participantsSliderInit(2)
    } else if (width < 600) {
        participantsSliderInit(1)
    } else {
        participantsSliderInit(3)
    }

window.addEventListener('resize', () => {
    const slider = document.querySelector('.participants__slider');
    
    const width = slider.offsetWidth;
    if(width < 800 && width >= 600) {
        participantsSliderInit(2)
    } else if (width < 600) {
        participantsSliderInit(1)
    } else {
        participantsSliderInit(3)
    }
});
