$(window).scroll(function(){
    changeClipPath('.first-wrapper')
});

function changeClipPath(name){
    var scroll = $(window).scrollTop();


        if (scroll >= 800) {
            $(name).addClass("clip-path-flat");
        } else {
            $(name).removeClass("clip-path-flat");
        }
}