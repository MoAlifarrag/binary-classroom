import{firebaseConfig}from"./firebase-config.js";
import{initializeApp}from"https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import{getAuth,signInAnonymously}from"https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import{getFirestore,collection,onSnapshot}from"https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
const app=initializeApp(firebaseConfig),db=getFirestore(app),auth=getAuth(app),$=x=>document.getElementById(x);let data=[];
function esc(s){let d=document.createElement("div");d.textContent=s;return d.innerHTML}
function draw(){let f=$("filter").value,a=data.filter(x=>!f||x.className===f).sort((a,b)=>(b.score||0)-(a.score||0));$("rows").innerHTML="";$("empty").style.display=a.length?"none":"block";a.forEach((p,i)=>{let tr=document.createElement("tr");tr.innerHTML="<td class=rank>"+(i<3?["🥇","🥈","🥉"][i]:i+1)+"</td><td>"+esc(p.name||"")+"</td><td>"+esc(p.className||"")+"</td><td><b>"+(p.score||0)+"</b></td><td>"+(p.finished?"Finished":Math.min(p.question||1,10)+"/10")+"</td>";$("rows").appendChild(tr)})}
$("filter").onchange=draw;
await signInAnonymously(auth);
onSnapshot(collection(db,"players"),s=>{data=s.docs.map(d=>d.data());draw()});