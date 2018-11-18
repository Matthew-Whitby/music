$(function(){
  function e(){
    _ua.Mobile[0]?$("head").prepend('<meta name="viewport" content="width=750">'):$("head").prepend('<meta name="viewport" content="width=1260">') //if Mobile, set viewport width=750, else set viewport width=1260
  }
  function t(){
    m=u.scrollTop(),u.scrollTop(g),p.css({position:"fixed",top:-m})
  }
  function i(){
    g=u.scrollTop(),p.attr({style:""}),l.attr({style:""}),h.prop({scrollTop:m})
  }
  function o(e){
    e.data("src")&&(e.attr("src",e.data("src")),e.addClass("loaded"))
  }
  function n(motionclass,urlAnchor){
    if(urlAnchor){ //if there is a url anchor
      var fooUrlAnchor=$(urlAnchor); //sets variable to the url anchor
      if(void 0!==fooUrlAnchor.offset()){ //checks if the offset is not 0
        var distance=fooUrlAnchor.offset().top+.5*fooUrlAnchor.height(); //offset + 0.5*height
        motionclass.each(function(){ //for each motionclass
          $(this).offset().top<=distance&&$(this).addClass("reverse") //sets top of motionclass to value less than the distance and adds class reverse to it
        }
      )}
    }
  }
  function a(e){
    if(e){
      var t=$(e);
      void 0!==t.offset()&&setTimeout(function(){
        u.scrollTop(t.offset().top-.5*(u.height()-t.height()))
      },50)
    }
  }
  function r(e){
    }
    function s(e,t,i){
      var o=window.screenX+(window.innerWidth-t)/2,n=window.screenY+(window.innerHeight-i)/2,a=window.open(e,"sns","width="+t+", height="+i+", left="+o+", top="+n+"  menubar=no, toolbar=no, scrollbars=yes");
      a.focus()
    }
    function d(e,t,i){
      var o=e.getAttribute("id"),n=e.getAttribute("data-client"),a="https://share.sc",r=document.title,d=document.referrer||"",f=e.getAttribute("data-url")||encodeURIComponent(location.href),l=e.getAttribute("data-text")||r,c=e.getAttribute("data-hashtags")||"",h=e.getAttribute("data-referrer")||"";
      "twitter-share-button-cs"==o&&e.setAttribute("data-link",a+"/tweet/?key="+n+"&referrer="+d+"&url="+f+"&text="+l+"&hashtags="+c+"&sns=twitter"),"fb-share-button-cs"==o&&e.setAttribute("data-link",a+"/fb/?key="+n+"&referrer="+d+"&url="+f+"&text="+l+"&hashtags="+c+"&sns=facebook"),s(e.getAttribute("data-link"),t,i)
    }
    //sets f to the menu button div, sets l to the <header> <nav> element, sets c to the nav-bg div under header, sets h to the body, sets u to the window, sets p to main, sets b to unexistant element, sets m,g to 0,
    var f=$("header .menu-btn"),l=$("header nav"),c=$("header .nav-bg"),h=$("body, html"),u=$(window),p=$("main"),b=$("#modal"),m=0,g=0;
    //calls f(e) which sets up pc or mobile, calls f(n) which takes
    e(),n($(".motion-trigger"),location.hash),setTimeout(function(){ //timeout set to 100ms
      u.scrollTop(u.scrollTop()+1)},100),a(location.hash),"#deletecookie"==location.hash&&b.length>0&&$.removeCookie("firstmodal"),_ua.PC?(0==b.length||$.cookie("firstmodal"))&&r(location.pathname):r(location.pathname),f.on("click",function(){
        f.toggleClass("close"),l.toggleClass("show"),l.fadeToggle(),c.fadeToggle(),f.hasClass("close")?t():i()}),$("img").one("inview",function(){
          o($(this))
        }),
        /*$(".motion-trigger").one("inview",function(){
          $(this).parent().addClass("inviewed")
        }),*/
        $("body").on("click",".sns a",function(){
          return $(this).parent().hasClass("tw")?d(this,560,450):s(this.href,560,600),!1
        }),
        $("#modal, #modal .close").on("click",function(){
            r()
          })
        });
        var _ua=function(e){
          var t={
            0:e.indexOf("windows")!=-1&&e.indexOf("phone")!=-1||e.indexOf("iphone")!=-1||e.indexOf("ipod")!=-1||e.indexOf("android")!=-1&&e.indexOf("mobile")!=-1||e.indexOf("firefox")!=-1&&e.indexOf("mobile")!=-1||e.indexOf("blackberry")!=-1,iPhone:e.indexOf("iphone")!=-1,Android:e.indexOf("android")!=-1&&e.indexOf("mobile")!=-1},i=e.indexOf("windows")!=-1&&e.indexOf("touch")!=-1||e.indexOf("ipad")!=-1||e.indexOf("android")!=-1&&e.indexOf("mobile")==-1||e.indexOf("firefox")!=-1&&e.indexOf("tablet")!=-1||e.indexOf("kindle")!=-1||e.indexOf("silk")!=-1||e.indexOf("playbook")!=-1,o=!t[0]&&!i;return{Mobile:t,Tablet:i,PC:o
          }
        }
        (window.navigator.userAgent.toLowerCase());
