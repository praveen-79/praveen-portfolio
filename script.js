const menuBtn=document.getElementById("menuBtn");
const nav=document.getElementById("navLinks");
const topBtn=document.getElementById("topBtn");
menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));

document.querySelectorAll("nav a").forEach(a=>{
  a.addEventListener("click",()=>nav.classList.remove("open"));
});

const sections=[...document.querySelectorAll("main section[id]")];
const navItems=[...document.querySelectorAll("nav a")];

const activeObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navItems.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px",threshold:0});

sections.forEach(section=>activeObserver.observe(section));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.1});

document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

window.addEventListener("scroll",()=>{
  topBtn.classList.toggle("show",window.scrollY>500);
});
topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

document.getElementById("year").textContent=new Date().getFullYear();
