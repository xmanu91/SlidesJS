
# SlidesJS

SlidesJS is open source library for create slides (presentations) with HTML/CSS/JS.![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2Fxmanu91%2FSlidesJS%2F&color=blue)

## Installation

Install slidesJS with npm

```bash
  npm install @xmanu91/slidesjs
```

or with cdn import
```HTML
  <script src="https://cdn.jsdelivr.net/npm/@xmanu91/slidesjs@1.0.2/lib/1.0.0/slidesjs-1.0.0.min.js"></script>
```

## Usage/Examples

Create a ```div``` for container and insert your slides with ```section``` tag

```HTML
    <div class="app">
        <section>test</section>
        <section>test 2</section>
        <section>test 3</section>
    </div>
```

In your js, create an instance of SlidesJS and put in parameters the selecotr of the container and the parameters of the presentation in an ```Object```

```Javascript
    const slides = new SlidesJS(".app", {
        nextKeys: ["Space", "ArrowRight", "ArrowUp"],
        previousKeys: ["ArrowLeft", "ArrowDown"],
        effect: {next: 'slide-out-left', previous: 'slide-out-right'},
        transition: 0.5
    });

```

You can view the list of parameters in the documentation.

And you can view exemples at [exemples](https://github.com/xmanu91/SlidesJS/tree/v1.0.2/exemples)