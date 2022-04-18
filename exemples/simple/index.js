const slides = new SlidesJS(".app", {
    nextKeys: ["Space", "ArrowRight", "ArrowUp"],
    previousKeys: ["ArrowLeft", "ArrowDown"],
    effect: {next: 'slide-out-left', previous: 'slide-out-right'},
    transition: 0.5
});

slides.on("change", e => console.log(e))