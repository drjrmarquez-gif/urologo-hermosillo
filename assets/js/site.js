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
window.gtag_track_event=function(eventName,parameters){
  try{
    if(typeof window.gtag==="function")window.gtag("event",eventName,parameters||{});
  }catch(error){}
};
window.get_cta_tracking_context=function(link){
  var pagePath=window.location.pathname||"/";
  var pageName=(pagePath.split("/").pop()||"index.html").toLowerCase();
  var serviceByPage={
    "index.html":"home",
    "prostata.html":"prostata",
    "calculos.html":"calculos",
    "vasectomia.html":"vasectomia",
    "circuncision.html":"circuncision",
    "urologo-hermosillo.html":"urologia_general",
    "contacto.html":"contacto"
  };
  var ctaLocation="service_section";
  if(link.closest(".floating-actions"))ctaLocation="floating_bar";
  else if(link.closest(".site-footer"))ctaLocation="footer";
  else if(link.closest(".hero"))ctaLocation="hero";
  else if(link.closest(".contact-method"))ctaLocation="contact_card";
  return {
    page_path:pagePath,
    page_title:document.title,
    service:serviceByPage[pageName]||"urologia_general",
    cta_location:ctaLocation
  };
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
  document.querySelectorAll("a[href]").forEach(function(link){
    var href=link.getAttribute("href")||"";
    var eventName="";
    if(/^https:\/\/wa\.me\//i.test(href))eventName="whatsapp_click";
    else if(href.indexOf("tel:+526621682543")===0)eventName="phone_click";
    else if(href.indexOf("tel:+522227526728")===0)eventName="emergency_call_click";
    else if(/^https:\/\/(maps\.app\.goo\.gl|www\.google\.[^/]+\/maps)/i.test(href))eventName="maps_click";
    if(eventName){
      link.addEventListener("click",function(){
        var parameters=window.get_cta_tracking_context(link);
        parameters.link_url=href;
        parameters.link_text=(link.textContent||"").trim();
        window.gtag_track_event(eventName,parameters);
      },{passive:true});
    }
  });
});
