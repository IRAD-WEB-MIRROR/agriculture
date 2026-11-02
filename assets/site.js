/* Ministry of Agriculture and Water Resources - site script */
(function(){
var T={
en:{t1:"Ministry of Agriculture and Water Resources",t2:"Irad Special Economic Zone",m_home:"Home",m_about:"Ministry",m_water:"Irrigation",m_vet:"Veterinary",m_sub:"State support",m_pot:"Potato order",m_news:"News",m_docs:"Documents",m_cont:"Contacts",w_h:"Water situation",w_more:"Schedules by canal »",p_h:"Potato imports",cal_h:"Farm calendar: November",poll_h:"Poll",links_h:"Useful links",cnt_h:"Visitors today:",menu_h:"Menu",rec_h:"Reception of citizens",
days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],months:["January","February","March","April","May","June","July","August","September","October","November","December"]},
ir:{t1:"Ayıl charba jana suu baylıktarı ministrligi",t2:"Irad Atayın Ekonomikalık Zonası",m_home:"Bashkı bet",m_about:"Ministrlik",m_water:"Sugat",m_vet:"Veterinariya",m_sub:"Mamlekettik koldoo",m_pot:"Kartoshka buyrugu",m_news:"Jañılıktar",m_docs:"Dokumentter",m_cont:"Baylanısh",w_h:"Suu abalı",w_more:"Kanaldar boyuncha grafik »",p_h:"Kartoshka importu",cal_h:"Dıykan kalendarı: noyabr",poll_h:"Suramjıloo",links_h:"Paydaluu shiltemeler",cnt_h:"Bügün kirgender:",menu_h:"Menyu",rec_h:"Jarandardı kabıl aluu",
days:["Jekshembi","Düyshömbü","Sheyshembi","Sharshembi","Beyshembi","Juma","Ishembi"],months:["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr"]},
ru:{t1:"Министерство сельского хозяйства и водных ресурсов",t2:"Ирадская особая экономическая зона",m_home:"Главная",m_about:"Министерство",m_water:"Орошение",m_vet:"Ветеринария",m_sub:"Господдержка",m_pot:"Приказ о картофеле",m_news:"Новости",m_docs:"Документы",m_cont:"Контакты",w_h:"Водная обстановка",w_more:"Графики по каналам »",p_h:"Ввоз картофеля",cal_h:"Календарь работ: ноябрь",poll_h:"Опрос",links_h:"Полезные ссылки",cnt_h:"Посетителей сегодня:",menu_h:"Меню",rec_h:"Приём граждан",
days:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],months:["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"]}};
function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var q=location.search.match(/[?&]lang=(en|ir|ru)\b/);if(q)set("moa_lang",q[1]);
var lang=get("moa_lang")||"en";if(!T[lang])lang="en";
/* the period mobile version: ?pda=1 / ?pda=0, remembered */
var root=document.documentElement,pq=location.search.match(/[?&]pda=([01])\b/);if(pq)set("wave_pda",pq[1]);
if(root.classList.contains("wave-1")&&get("wave_pda")==="1"){root.classList.add("pda");var vp=document.querySelector('meta[name="viewport"]');if(vp)vp.setAttribute("content","width=device-width, initial-scale=1");
  var mb=document.querySelector(".w1-bar a.mob");if(mb){mb.href="?pda=0";mb.textContent="Full version"}}
function $(id){return document.getElementById(id)}
function apply(){var t=T[lang],els=document.querySelectorAll("[data-i]");
  for(var i=0;i<els.length;i++){var k=els[i].getAttribute("data-i");if(t[k])els[i].textContent=t[k]}
  var d=new Date(),el=$("today");
  if(el)el.textContent=lang==="en"?t.days[d.getDay()]+", "+d.getDate()+" "+t.months[d.getMonth()]+" "+d.getFullYear():
    lang==="ru"?t.days[d.getDay()]+", "+d.getDate()+" "+t.months[d.getMonth()]+" "+d.getFullYear()+" г.":d.getFullYear()+"-jılı "+d.getDate()+"-"+t.months[d.getMonth()]+", "+t.days[d.getDay()].toLowerCase();
  document.documentElement.lang=lang==="ir"?"ky":lang;
  var lg=document.querySelectorAll("a.lg");for(var j=0;j<lg.length;j++){var on=lg[j].getAttribute("data-lang")===lang;lg[j].style.fontWeight=on?"bold":"";lg[j].style.textDecoration=on?"none":"";if(on)lg[j].setAttribute("aria-current","true");else lg[j].removeAttribute("aria-current")}}
var ls=document.querySelectorAll("[data-lang]");
for(var i=0;i<ls.length;i++)ls[i].onclick=function(e){e.preventDefault();lang=this.getAttribute("data-lang");set("moa_lang",lang);apply()};
apply();
/* TOP-100 counter: total hits, grows with the date */
var c=$("cnt");if(c){var n=new Date(),day=Math.floor(n.getTime()/864e5),mins=n.getHours()*60+n.getMinutes();c.textContent=("0000000"+(187340+(day-20759)*263+Math.floor(mins/6))).slice(-7)}
/* Toktogul from the government daily figures */
try{fetch("https://iradgov.org/data/today.json",{cache:"no-store"}).then(function(r){return r.json()}).then(function(d){var w=d.water&&d.water.toktogul;if(!w)return;
  $("tok").textContent=w.storage_km3.toFixed(1)+" km³";$("tokp").textContent=w.fill_pct.toFixed(1)+"%";
  var tl=w.trend_label||{};$("tokt").textContent=(tl[lang]||tl.en||w.trend||"").toLowerCase()}).catch(function(){})}catch(e){}
/* canal filter */
var ff=$("ff");if(ff)ff.oninput=function(){var q=ff.value.toLowerCase(),r=document.querySelectorAll("table.ft tr[data-f]");for(var i=0;i<r.length;i++)r[i].style.display=!q||r[i].getAttribute("data-f").toLowerCase().indexOf(q)>=0?"":"none"};
})();
