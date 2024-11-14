function loading() {
    var tl = gsap.timeline()

    tl.to(".yellow1", {
        top: "-100%",
        delay: 0.6,
        duration: 0.7,
        ease: "expo.out"
    })

    tl.from(".yellow2", {
        top: "100%",
        delay: 0.9,
        duration: 0.7,
        ease: "expo.out"
    }, "anim")

    tl.to(".loader h1", {
        delay: 0.6,
        duration: 0.7,
        color: "black"
    }, "anim")

    tl.to(".loader", {
        display: "none"
    })

    tl.to(".loader", {
        opacity: 0
    })
}
loading()

const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

var elems = document.querySelectorAll(".elem")
var main = document.querySelector(".main")
elems.forEach(function (elem) {
    elem.addEventListener('mouseenter', function () {
        var bgimg = elem.getAttribute("data-img")
        main.style.backgroundImage = `url(${bgimg})`
    })
})