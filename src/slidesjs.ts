import './slidesJS.css';
import EventEmitter from './EventEmitter';

class SlidesJS {
  container: HTMLElement;
  nextKeys: string[];
  previousKeys: string[];
  currentSlide: number;
  eventController: EventEmitter;
  effectName: { all?: string; previous?: string; next?: string };
  transition: number;
  slides: NodeListOf<HTMLElement>;
  lastSlide: HTMLElement;

  constructor(
    container: string,
    params: {
      nextKeys?: string[];
      previousKeys?: string[];
      effect?: { all?: string; previous?: string; next?: string };
      transition?: number;
    },
  ) {
    this.container = document.querySelector(container) as HTMLElement;
    this.nextKeys = params.nextKeys ? params.nextKeys : ['Space', 'ArrowRight', 'ArrowUp'];
    this.previousKeys = params.previousKeys ? params.previousKeys : ['ArrowLeft', 'ArrowDown'];
    this.currentSlide = 0;
    this.eventController = new EventEmitter();
    this.effectName = params.effect || { all: 'default' };
    this.transition = params.transition || 0;
    this.container.classList.add('slides-container');
    this.slides = this.container.querySelectorAll('section');

    this.slides.forEach((el) => {
      el.classList.add('s-effect-' + this.effectName.next);
      el.style.transition = this.transition + 's';
    });

    this.lastSlide = this.slides[0];
    this.slides[this.currentSlide].className = '';

    window.addEventListener('keydown', (e) => {
      switch (e.code) {
        case this.nextKeys.find((key) => key === e.code):
          this.next();
          break;
        case this.previousKeys.find((key) => key === e.code):
          this.previous();
          break;
      }
    });
  }

  on(eventName: string, listener: () => void) {
    this.eventController.on(eventName, listener);
  }

  next() {
    this.lastSlide = this.slides[this.currentSlide];
    this.currentSlide = this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
    this.applyEffect(this.effectName.all ? this.effectName.all : this.effectName.next);
    this.eventController.emit('change', {
      current: this.slides[this.currentSlide],
      last: this.lastSlide,
      index: this.currentSlide,
    });
  }

  previous() {
    this.lastSlide = this.slides[this.currentSlide];
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    this.applyEffect(this.effectName.all ? this.effectName.all : this.effectName.previous);
    this.eventController.emit('change', {
      current: this.slides[this.currentSlide],
      last: this.lastSlide,
      index: this.currentSlide,
    });
  }

  applyEffect(name = 'default') {
    removeClassByPrefix(this.lastSlide, 's-view');
    this.lastSlide.classList.add('s-effect-' + name);
    removeClassByPrefix(this.slides[this.currentSlide], 's-effect');
    this.slides[this.currentSlide].className = 's-view';
  }
}

function removeClassByPrefix(el: HTMLElement, prefix: string) {
  const regx = new RegExp('\\b' + prefix + '(.*)?\\b', 'g');
  el.className = el.className.replace(regx, '');
  return el;
}

export default SlidesJS;
