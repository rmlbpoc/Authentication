$(function(){
    $(window).on('load resize',function(){
        $('.fill-screen').css("height",window.innerHeight);
    });

    $('body').scrollspy({
        target:'.navbar',
        offset: 110
    });

    //smooth scrolling
    $('#gallery').bind('click',function(){
        $('html body').stop().animate({
            scrollTop: $("#nano").offset().top
        },1500,'easeInOutExpo');
        event.preventDefault();
    });

    $("#login,#signup,#home").click(function() {
        $('html, body').animate({
            scrollTop: $("#top").offset().top
        }, 1000);
    });
    //$("#signupLink").click(function() {
    //    $("#login" ).hide( );
    //});

    //parallax scrolling with stellar.js
    $(window).stellar();

    //initialize wow
    new WOW().init();

    //initialize nano gallery
    $(document).ready(function(){
        $('#nanoGallery3').nanoGallery();
    })
});