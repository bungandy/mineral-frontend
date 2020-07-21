/* -------------------------------- global.js ------------------------------- */

window.addEventListener('load', function () {
    _nue.init()
})

window.addEventListener('resize', function () {
    _nue.sizing()
})

window.addEventListener('scroll', function () {
    _nue.scroll()
})






/* -------------------------------- Shop Menu ------------------------------- */
let shopMenuShow = false;
$('.shop-menu-btn').on('click',function(e){
    e.preventDefault()
    
    if(!menuStatus && !shopMenuShow){
        $('#shop-menu').addClass('active')
        shopMenuShow = true
    }else{
        _nue.resetMenus()
    }

    _nue.headerState()
})

let headerStatus = false;
let menuStatus = false;
/* ------------------------------- Search Menu ------------------------------ */
let searchMenuShow = false;
$('.search-menu-btn').on('click',function(e){
    e.preventDefault()

    if(!menuStatus && !shopMenuShow){
        $('#search-menu').addClass('active')
        shopMenuShow = true
    }else{
        _nue.resetMenus()
    }
    
    _nue.headerState()
})

/* ----------------------------- Close all menus ---------------------------- */
$('.close-header-btn').on('click',function(e){
    e.preventDefault()
    
    let _target = $(this).data('close')
    $('#'+_target).removeClass('active')
    menuStatus = false
    shopMenuShow = false
    searchMenuShow = false

    _nue.headerState()
})

/* -------------------------------- Mini cart ------------------------------- */
let miniCartShow = false
$('.minicart-btn').on('click',function(){
    if (!miniCartShow){
        $('#mini-cart').addClass('active')
        miniCartShow = true
    }else{
        $('#mini-cart').removeClass('active')
        miniCartShow = false
    }
})

/* ------------------------------ Color options ----------------------------- */
$('.color-option > *, .size-option > *').on('click',function(){
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
})

_nue = function(){
    let init = function(){
        console.log("Developed by: Mineral 2020 _nue.init()");
        if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
            console.log("🎉 Dark mode is supported");
        }
        sizing()
    }

    let sizing = function(){
        console.log("_nue.sizing()")
    }

    let scroll = function(){
        console.log("_nue.scroll()")

        if( window.pageYOffset > 0 ) {
            $('#header').addClass('active')
            headerStatus = true
        }else{
            $('#header').removeClass('active')
            headerStatus = false
        }
    }

    
    let headerState = function(){

        if(!headerStatus){
            $("body").addClass("disable-scroll");
            $("#header").addClass("active");
            $("#content").addClass("inactive");
            headerStatus = true;
        }else{
            $("body").removeClass("disable-scroll");
            $("#header").removeClass("active");
            $("#content").removeClass("inactive");
            headerStatus = false;
        }

        // console.log('headerStatus: ', headerStatus)
        // console.log('shopMenuShow: ', shopMenuShow)
        // console.log('searchMenuShow: ', searchMenuShow)
    }

    let resetMenus = function(){
        $('#shop-menu').removeClass('active')
        shopMenuShow = false

        $('#search-menu').removeClass('active')
        searchMenuShow = false

    }

    return{
        init: init,
        sizing: sizing,
        scroll: scroll,
        headerState: headerState,
        resetMenus: resetMenus
    }
}()