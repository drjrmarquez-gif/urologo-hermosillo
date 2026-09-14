window.gtag_report_conversion=function(url){
  var completed=false;
  var callback=function(){if(completed)return;completed=true;if(typeof url!=="undefined")window.location.href=url;};
  if(typeof window.gtag==="function"){
    window.gtag("event","conversion",{send_to:"AW-10890424360/ydAMCOLfy4wcEKjg-sgo",event_callback:callback});
    window.setTimeout(callback,1200);
    return false;
  }
  callback();
  return false;
};
document.addEventListener("DOMContentLoaded",function(){
  var toggle=document.querySelector(".nav-toggle");
  var nav=document.getElementById("site-nav");
  if(toggle&&nav){
    toggle.addEventListener("click",function(){
      var open=toggle.getAttribute("aria-expanded")==="true";
      toggle.setAttribute("aria-expanded",String(!open));
      nav.classList.toggle("is-open",!open);
    });
  }
  var current=(window.location.pathname.split("/").pop()||"index.html");
  document.querySelectorAll("#site-nav a").forEach(function(link){
    if(link.getAttribute("href")===current)link.setAttribute("aria-current","page");
  });
  document.querySelectorAll("[data-current-year]").forEach(function(node){node.textContent=String(new Date().getFullYear());});
});