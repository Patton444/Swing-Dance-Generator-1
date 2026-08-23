let database=null;let movesById=new Map();
const result=document.getElementById("result");
const generateButton=document.getElementById("generate");

fetch("country_swing_moves_clean.json")
.then(r=>{if(!r.ok)throw new Error("Could not load the move database.");return r.json();})
.then(data=>{database=data;movesById=new Map(database.moves.map(m=>[m.id,m]));result.innerHTML="<p>Ready. Choose your filters and generate a combo.</p>";})
.catch(error=>{result.innerHTML=`<p class="warning"><strong>Database error:</strong> ${error.message}</p><p>Run this app through a local web server rather than by double-clicking the file.</p>`;});

function filters(){return{dips:document.getElementById("dips").value==="yes",flips:document.getElementById("flips").value==="yes",lifts:document.getElementById("lifts").value==="yes"}}
function allowed(move,f){const t=move.tags||[];if(!f.dips&&t.includes("dip"))return false;if(!f.flips&&t.includes("flip"))return false;if(!f.lifts&&(t.includes("lift")||t.includes("carry")))return false;return true}
function options(currentId,f,used){const current=movesById.get(currentId);const all=(current.leads_to||[]).map(id=>movesById.get(id)).filter(Boolean).filter(m=>allowed(m,f));const unused=all.filter(m=>!used.has(m.id));return unused.length?unused:all}
function random(items){return items[Math.floor(Math.random()*items.length)]}

function generateCombo(){
 if(!database){result.innerHTML="<p>Move database is still loading.</p>";return}
 const length=Number(document.getElementById("length").value),f=filters();
 const combo=["open"],used=new Set(["open"]);let attempts=0;
 while(combo.length<length&&attempts<500){
   const nextOptions=options(combo[combo.length-1],f,used);
   if(!nextOptions.length){combo.length=1;used.clear();used.add("open");attempts++;continue}
   const next=random(nextOptions);combo.push(next.id);used.add(next.id);
 }
 if(combo.length<length){result.innerHTML=`<p class="warning">No combo of ${length} moves could be found with these filters.</p><p>Try allowing more move types or choosing a shorter combo.</p>`;return}
 result.innerHTML="<ol class=\"combo\">"+combo.map((id,i)=>`<li><strong>${i+1}.</strong> ${movesById.get(id).name}</li>`).join("")+"</ol>";
}
generateButton.addEventListener("click",generateCombo);
