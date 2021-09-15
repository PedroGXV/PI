const removeLike=document.querySelectorAll(".removeLike"),userDiv=document.querySelectorAll(".userCorner-userList-user");let cookies=document.cookie;cookies=cookies.split(/[=, ;]+/),removeLike.forEach((e,t)=>{e.addEventListener("click",()=>{e.disabled=!0;let t=new XMLHttpRequest;t?(t.addEventListener("readystatechange",function(){if(4===this.readyState){const t=JSON.parse(this.responseText);try{if(!t.length)throw""}catch(t){return e.disabled=!1,void alert("Erro na remoção. Recarregue a página ou faça login novamente.")}a(t)}}),t.open("GET",`https://pisample-250e.restdb.io/rest/userdata?q={"email":"${cookies[3]}","senha":"${cookies[5]}"}`),t.setRequestHeader("content-type","application/json"),t.setRequestHeader("x-apikey","6112d0b769fac573b50a540e"),t.setRequestHeader("cache-control","no-cache"),t.send(null)):alert("Erro na requisição! Recarregue a página.")});const a=a=>{let s=a[0].likes;"string"==typeof s&&(s=s.split(";")),s.splice(s.indexOf(e.value),1),s=s.join(";");let n=JSON.stringify({likes:s}),o=new XMLHttpRequest;o.withCredentials=!1,o.addEventListener("readystatechange",function(){4===this.readyState&&(e.disabled=!1,userDiv[t].remove())}),o.open("PUT",`https://pisample-250e.restdb.io/rest/userdata/${a[0]._id}`),o.setRequestHeader("content-type","application/json"),o.setRequestHeader("x-apikey","6112d0b769fac573b50a540e"),o.setRequestHeader("cache-control","no-cache"),o.send(n)}});const likeUp=document.querySelector("#target-action-up"),likeDown=document.querySelector("#target-action-down");likeUp.addEventListener("click",()=>{makeActionRequest(!0,likeUp.value)}),likeDown.addEventListener("click",()=>{makeActionRequest(!1,likeDown.value)});let browserCookies=document.cookie;browserCookies=browserCookies.split(/[=, ;]+/);const makeActionRequest=(e,t)=>{setLoading(!0);const a=reqHead("GET",`https://pisample-250e.restdb.io/rest/userdata?q={"email": "${browserCookies[3]}", "senha": "${browserCookies[5]}"}`);a.addEventListener("readystatechange",function(){if(4===this.readyState)try{const a=JSON.parse(this.responseText);console.log(a),request2(a,e,t)}catch(e){return setLoading(!1),void console.log(e)}}),a.send(null)},request2=(e,t,a)=>{let s=null,n=null;t?(s="likes",n=e[0].likes):(s="dislikes",n=e[0].dislikes),"string"==typeof n&&(n=n.split(";")),console.log(n),void 0!==a&&(""==n[0]?n[0]=a:n.push(a)),console.log(n),n=(n=n.join(";")).replace(";;",";"),(n+=";").startsWith(";")&&(n=n.substring(1));let o=JSON.stringify({[s]:n}),r=reqHead("PUT",`https://pisample-250e.restdb.io/rest/userdata/${e[0]._id}`);r.addEventListener("readystatechange",function(){if(4===this.readyState)try{const a=JSON.parse(this.responseText);if(t)setTargetData(likeUp.value);else{const t=e[0].dislikes.split(";");getDislikes(t.slice(-1))}atualizarCandidato(a)}catch(e){setLoading(!1),console.log(e),alert("Erro. Talvez seja necessário recarregar a página.")}}),r.send(o)},getDislikes=e=>{const t=reqHead("GET",`https://pisample-250e.restdb.io/rest/userdata?q={"_id": "${e}"}`);t.addEventListener("readystatechange",function(){if(4===this.readyState){const e=JSON.parse(this.responseText);atualizarCadastro(e)}}),t.send(null)},atualizarCandidato=e=>{let t=null,a=null;try{t=e.likes.split(";"),a=e.dislikes.split(";")}catch(e){setLoading(!1),console.log(e)}let s="";s+=`"_id": {"$not": {"$in": ["${e._id}"`,a&&t&&(a&&'"'===s.slice(-1)&&(s+=","),s+=`${a.map(e=>'"'+e+'"')}`,t&&('"'===s.slice(-1)&&(s+=","),s+=`${t.map(e=>'"'+e+'"')}`));let n=reqHead("GET",`https://pisample-250e.restdb.io/rest/userdata?q={${s+="]}}"}}&max=1`);n.addEventListener("readystatechange",function(){if(4===this.readyState){try{const e=JSON.parse(this.responseText),t=document.querySelectorAll(".target-info");if(void 0===e[0])return void window.location.reload(!1);t.forEach(t=>{let a=e[0][t.attributes.name.value];if("cursos"===t.attributes.name.value&&a&&(a=a.split(";")),"string"!=typeof a&&"number"!=typeof a||"links"==t.attributes.name.value||(t.innerHTML=a.toString(),"idade"==t.attributes.name.value&&(t.innerHTML+=" Anos")),"links"===t.attributes.name.value&&a){let e=[];(a=a.split(";")).forEach(t=>{const a=document.createElement("a");t.startsWith("http")||(a.href="http://"),a.href+=t,a.innerHTML=`${t}`,e.push(a)});const t=document.querySelector("ul.target-info[name='links']");e.forEach(e=>{t.appendChild(e)})}}),likeUp.value=e[0]._id,likeDown.value=e[0]._id}catch(e){setLoading(!1),alert("Houve um erro! Recarregue a página."),console.log(e)}setLoading(!1)}}),n.send(null)},setTargetData=e=>{let t=reqHead("GET",`https://pisample-250e.restdb.io/rest/userdata?q={"_id": "${e}"}`);t.addEventListener("readystatechange",function(){4===this.readyState&&createCornerUser(JSON.parse(this.responseText)[0])}),t.send(null)},createCornerUser=e=>{console.log(e);const t=document.createElement("div");t.className="userCorner-userList-user";const a=document.createElement("img");a.src="/userSamples/felipao.jpg",a.alt="User image";const s=document.createElement("div");s.className="userInfo";const n=document.createElement("h4");n.innerHTML=`${e.nome}`,s.appendChild(n);const o=document.createElement("p");o.innerHTML=`${e.idade} Anos`,s.appendChild(o);const r=document.createElement("a");r.className="btn btn-borderless btn-white bg-none btn-opacity no-link btn-chat btn-border-green",r.href="#chatPanel";const i=document.createElement("svg");i.className="iconBtn iconBtn-noradius",i.setAttribute("viewBox","0 0 16 16"),i.setAttribute("fill","currentColor"),i.setAttribute("xmlns","http://www.w3.org/2000/svg");const l=document.createElementNS("http://www.w3.org/svg","path");l.setAttribute("d","M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"),i.appendChild(l);const d=document.createElementNS("http://www.w3.org/svg","path");d.setAttribute("d","M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"),i.appendChild(d),r.appendChild(i);const c=document.createElement("button");c.className="btn btn-borderless btn-opacity bg-red btn-remover removeLike",c.value=`${e._id}`,t.appendChild(a),t.appendChild(s),t.appendChild(r),t.appendChild(c),document.querySelector(".userCorner-userList").appendChild(t),console.log(t)},setLoading=e=>{const t=document.querySelector("#candidatoLoading"),a=document.querySelectorAll("#candidatoPainel > *:not(.loading-div)");e?(t.style.display="block",console.log(t.style.display),a.forEach(e=>{e.style.display="none"})):(t.style.display="none",a.forEach(e=>{e.style.display="flex"}))},reqHead=(e,t)=>{let a=new XMLHttpRequest;return a.withCredentials=!1,a.open(e,t),a.setRequestHeader("content-type","application/json"),a.setRequestHeader("x-apikey","6112d0b769fac573b50a540e"),a.setRequestHeader("cache-control","no-cache"),a};