$(function(){
    $(window).on('load resize',function(){
        $('.fill-screen').css("height",window.innerHeight);
    });

    $('body').scrollspy({
        target:'.navbar',
        offset: 110
    });

    //smooth scrolling
    $('nav a,.down-button a').bind('click',function(){
        $('html body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top -110
        },1500,'easeInOutExpo');
        event.preventDefault();
    })

    //parallax scrolling with stellar.js
    $(window).stellar();

    //initialize wow
    new WOW().init();

    //initialize nano gallery
    $(document).ready(function(){
        $('#nanoGallery3').nanoGallery();
    })
});