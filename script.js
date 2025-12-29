const authBox=document.getElementById("authBox");
const site=document.getElementById("site");

// SIGNUP
function signup(){
  localStorage.setItem("user",authUser.value);
  localStorage.setItem("pass",authPass.value);
  alert("Signup Successful");
}

// LOGIN
function login(){
  if(authUser.value===localStorage.getItem("user") &&
     authPass.value===localStorage.getItem("pass")){
      localStorage.setItem("login","yes");
      showSite();
  }else alert("Wrong credentials");
}

function showSite(){
  authBox.style.display="none";
  site.classList.remove("hidden");
}

if(localStorage.getItem("login")==="yes") showSite();

// DARK MODE
modeBtn.onclick=()=>{
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
};

// ANIMATION
window.addEventListener("scroll",()=>{
  document.querySelectorAll(".animate").forEach(el=>{
    if(el.getBoundingClientRect().top<window.innerHeight-100)
      el.classList.add("show");
  });
});

// CONTACT
let msgs=JSON.parse(localStorage.getItem("msgs"))||[];
function renderMsgs(){
  msgTable.innerHTML="";
  msgs.forEach((m,i)=>{
    msgTable.innerHTML+=`
    <tr>
      <td>${m.n}</td><td>${m.e}</td><td>${m.m}</td>
      <td><button onclick="delMsg(${i})">❌</button></td>
    </tr>`;
  });
}
renderMsgs();

msgForm.onsubmit=e=>{
  e.preventDefault();
  msgs.push({n:mname.value,e:memail.value,m:mmsg.value});
  localStorage.setItem("msgs",JSON.stringify(msgs));
  renderMsgs(); msgForm.reset();
};
function delMsg(i){
  msgs.splice(i,1);
  localStorage.setItem("msgs",JSON.stringify(msgs));
  renderMsgs();
}

// PROJECTS
let projs=JSON.parse(localStorage.getItem("projs"))||[];
function renderProjs(){
  projList.innerHTML="";
  adminProj.innerHTML="";
  projs.forEach((p,i)=>{
    projList.innerHTML+=`
      <div class="card">
        <h4>${p.t}</h4>
        <a href="${p.l}" target="_blank">View</a>
      </div>`;
    adminProj.innerHTML+=`
      <li>${p.t} <button onclick="delProj(${i})">❌</button></li>`;
  });
}
renderProjs();

projForm.onsubmit=e=>{
  e.preventDefault();
  projs.push({t:ptitle.value,l:plink.value});
  localStorage.setItem("projs",JSON.stringify(projs));
  renderProjs(); projForm.reset();
};
function delProj(i){
  projs.splice(i,1);
  localStorage.setItem("projs",JSON.stringify(projs));
  renderProjs();
}
