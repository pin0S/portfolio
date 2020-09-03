const slideshow = document.querySelector('.slide-wrap');

if (slideshow != null ) { //make sure we don't run this script if the slideshow is not present

}

let slides = document.querySelectorAll('.slide-entry'), // grab all slides
slideCount = slides.length, //count slides
currentSlide = 0, // find a starting place for the current slide
slideHeight = null, // we'll need this later for height calculation
initialHeight = slides[0].clientHeight; // find the height of the first slide

slides[0].classList.add('active');
slideshow.style.height = initialHeight + 'px';

function moveToSlide(n) { // declare our slide navigation function
    slides[currentSlide].className = 'slide-entry'; // assign the slide HTML element
    currentSlide = (n+slideCount)%slideCount; // determine current slide (for prev/next functions)
    slides[currentSlide].className = 'slide-entry active'; //if it's the current slide, add active class
    slideHeight = slides[currentSlide].clientHeight; // get the height of the current slide
    slideshow.style.height = slideHeight + 'px'; // set the height of the slides
    window.addEventListener('resize', function(){ // if the browser resizes
      resizedSlideHeight = slides[currentSlide].clientHeight; // get current slide height
      slideshow.style.height = resizedSlideHeight + 'px'; // update the height of the slideshow
    });
}

function nextSlide(e){
    moveToSlide(currentSlide+1); // add one to index, move to the next
};
function prevSlide(e){
    moveToSlide(currentSlide+-1); //remove one from index, move to the last
};

const slideHandlers = {
    nextSlide: function(element){ // establish the method to accept any HTML element
      document.querySelector(element).addEventListener('click',nextSlide); // hook up the selector
    },
    prevSlide: function(element){
      document.querySelector(element).addEventListener('click',prevSlide);
    }
  }
  
  /* Hook up the individual HTML elements to the functions */
  
  slideHandlers.nextSlide('#next-slide');
  slideHandlers.prevSlide('#prev-slide');

  setInterval(function(){ // note: using setInterval vs. setTimeout
    nextSlide(); // run our nextSlide() function from above
  },5000); // change this timing function to change the slideshow speed (currently 8s)


  let initialX = null;
  let initialY = null;
  function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  };
  function moveTouch(e) {
    if (initialX === null) {
      return;
    }
    if (initialY === null) {
      return;
    }
    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;
    let diffX = initialX - currentX;
    let diffY = initialY - currentY;
  if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) { // swiped left
        moveToSlide(currentSlide+1); // hooking up our next slide function
      } 
  else { // swiped right
        moveToSlide(currentSlide+-1); // hooking up our prev slide function
      }
  }
    initialX = null;
    initialY = null;
    e.preventDefault();
  };