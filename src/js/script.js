var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");
var newsOpenAll = document.querySelector(".news__to-all");
var sectionNews = document.querySelector(".news__items");
var linkToSign = document.querySelector(".main-nav__sign-page-button");

navMain.classList.remove('main-nav--nojs');
sectionNews.classList.remove('news__items--nojs');

navToggle.addEventListener("click", function(){
    if(navMain.classList.contains("main-nav--closed")){
        navMain.classList.remove("main-nav--closed");
        navMain.classList.add("main-nav--opened");
    }else{
        navMain.classList.remove("main-nav--opened");
        navMain.classList.add("main-nav--closed");
    }
})

newsOpenAll.addEventListener("click", function(){
    event.preventDefault();
    
    if(sectionNews.classList.contains("news__items--closed")){
        newsOpenAll.innerHTML = "Скрыть";
        sectionNews.classList.remove("news__items--closed");
        sectionNews.classList.add("news__items--opened");
    }else{
        newsOpenAll.innerHTML = "Показать все";
        sectionNews.classList.remove("news__items--opened");
        sectionNews.classList.add("news__items--closed");
    }
})


linkToSign.addEventListener("click", function(event){
    event.preventDefault();

    window.location.href = "../sign.html";
})