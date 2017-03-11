jQuery(document).ready(function ($) {
  initBg();
});

jQuery(window).load(function () {
	
});


function initBg() {
  $(".main-header").backstretch([
      "../img/bg-image.jpg"
  ], {duration: 3000, fade: 750});
}