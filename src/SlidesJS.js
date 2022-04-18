import './slidesJS.css'

class EventEmitter {
    constructor() {
      this.events = {};
    }
    on(event, listener) {
        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return () => this.removeListener(event, listener);
    }
    removeListener(event, listener) {
      if (typeof this.events[event] === 'object') {
          const idx = this.events[event].indexOf(listener);
          if (idx > -1) {
            this.events[event].splice(idx, 1);
          }
      }
    }
    emit(event, ...args) {
      if (typeof this.events[event] === 'object') {
        this.events[event].forEach(listener => listener.apply(this, args));
      }
    }
    once(event, listener) {
      const remove = this.on(event, (...args) => {
          remove();
          listener.apply(this, args);
      });
    }
  };

class SlidesJS {

    constructor(container, params ) {

        this.container = document.querySelector(container);
        this.nextKeys = params.nextKeys ? params.nextKeys : ["Space", "ArrowRight", "ArrowUp"];
        this.previousKeys = params.previousKeys ? params.previousKeys : ["ArrowLeft", "ArrowDown"];
        this.currentSlide = 0;
        this.eventController = new EventEmitter();
        this.effectName = params.effect
        this.transition = params.transition;
    
        this.container.classList.add('slides-container');
    
        if(this.container == null) {
            console.error('Invalid element')
        }else{
            this.slides = this.container.querySelectorAll('section')
        }

        this.slides.forEach(el => {
            el.classList.add("s-effect-" + this.effectName.next)
            el.style.transition = this.transition + "s";
        });

        this.lastSlide = this.slides[0];
        this.slides[this.currentSlide].classList = '';

        window.addEventListener('keydown', e => {
    
            switch (e.code) {
                case this.nextKeys.find(key => key === e.code): 
                    this.next();
                    break;
                case this.previousKeys.find(key => key === e.code):
                    this.previous();
                    break;
            }
    
        });
    }

    on(event, listener) {
        this.eventController.on(event, listener);
    }

    next() {
        this.lastSlide = this.slides[this.currentSlide];
        this.currentSlide = this.currentSlide == (this.slides.length - 1) ? 0 :  this.currentSlide + 1;
        this.applyEffect(this.effectName.all ? this.effectName.all : this.effectName.next)
        this.eventController.emit("change", {
            current: this.slides[this.currentSlide],
            last: this.lastSlide,
            index: this.currentSlide
        });
    }

    previous() {   
        this.lastSlide = this.slides[this.currentSlide];
        this.currentSlide = this.currentSlide == 0 ? this.slides.length - 1 :  this.currentSlide - 1;
        this.applyEffect(this.effectName.all ? this.effectName.all : this.effectName.previous)
        this.eventController.emit("change", {
            current: this.slides[this.currentSlide],
            last: this.lastSlide,
            index: this.currentSlide
        });
    }

    applyEffect(name="default"){
        removeClassByPrefix(this.lastSlide, "s-view");
        this.lastSlide.classList.add("s-effect-" + name);
        removeClassByPrefix(this.slides[this.currentSlide], "s-effect");
        this.slides[this.currentSlide].className = "s-view"
    }
}

function removeClassByPrefix(el, prefix) {
    var regx = new RegExp('\\b' + prefix + '(.*)?\\b', 'g');
    el.className = el.className.replace(regx, '');
    return el;
}

module.exports = SlidesJS;