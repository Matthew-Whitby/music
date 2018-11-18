(function($) {
    var element = $('.subscribe_button'),
        originalY = element.offset().top;
    // Space between element and top of screen (when scrolling)
    var topMargin = (screen.height/2) - (screen.height/9);
    var screenright = screen.width - (screen.width/10);
    element.style.left = screenright;
    $(window).on('scroll', function(event) {
        var scrollTop = $(window).scrollTop();
        element.stop(false, false).animate({
            top: scrollTop < originalY
                    ? 0
                    : scrollTop - originalY + topMargin
        }, {duration:1000,queue: false});});
        $(window).on('scroll',function(event) {
          $({deg:0}).animate({deg:360},{
            duration: 1000,
            queue: false,
            step:function(now){
              element.css({
                transform: 'rotate(' + now + 'deg)'});}});})
              })(jQuery);
