$('.burger').click(function () {
    if ($('.burger-one').hasClass('nav-open-one')) {
        // Navigation closed
        $('.burger-one').removeClass('nav-open-one')
        $('.burger-one').addClass('nav-close-one')

        $('.burger-two').removeClass('nav-open-two')
        $('.burger-two').addClass('nav-close-two')

        $('.burger-three').removeClass('nav-open-three')
        $('.burger-three').addClass('nav-close-three')

        $('.nav-list-mobile').removeClass('nav-open')
        $('.nav-list-mobile').addClass('nav-close')

        $('.page-wrapper').removeClass('overlay')
        $('.page-wrapper').css('filter', 'blur(0px)')
        $('.title-container').css('filter', 'blur(0px)')
    } else {
        // Navigation open
        $('.burger-one').removeClass('nav-close-one')
        $('.burger-one').addClass('nav-open-one')

        $('.burger-two').removeClass('nav-close-two')
        $('.burger-two').addClass('nav-open-two')

        $('.burger-three').removeClass('nav-close-three')
        $('.burger-three').addClass('nav-open-three')

        $('.nav-list-mobile').removeClass('nav-close')
        $('.nav-list-mobile').addClass('nav-open')

        $('.page-wrapper').addClass('overlay')
        $('.page-wrapper').css('filter', 'blur(5px)')
        $('.title-container').css('filter', 'blur(5px)')
    }
});

function addTabFix() {
    
}