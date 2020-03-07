$('.burger').click(function() {
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
    }
});