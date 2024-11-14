const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

// Loading Animation
function loadAnimation() {
    gsap.from(".page1 h1", {
        y: 30,
        opacity: 0,
        delay: 0.5,
        duration: 0.6,
        stagger: 0.2,
      });
    gsap.from(".page1 img", {
        scale:0.9,
        opacity: 0,
        delay: 1,
        duration: 0.6,
      });
}

loadAnimation();

document.addEventListener("mousemove", function(dets) {
  gsap.to(".cursor", {
    left:dets.x-20,
    top:dets.y-80
  })
}) 

document.querySelector("#child1").addEventListener("mouseenter", function() {
  gsap.to(".cursor", {
    transform: `translate(-50%, -50%) scale(1)`
  });
})