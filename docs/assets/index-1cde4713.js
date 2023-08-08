var B=Object.defineProperty;var C=(l,t,e)=>t in l?B(l,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[t]=e;var a=(l,t,e)=>(C(l,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}})();const p=class p{constructor(t,e){this.image=p.IMG_PATH+t+".png",this.value=e}};a(p,"IMG_PATH","assets/img/"),a(p,"BACK",p.IMG_PATH+"red_back.png");let f=p;const y=class y{constructor(){this.cards=[],y.clubs.forEach(t=>y.values.forEach(e=>{const s=e+t,r=e==="A"?11:isNaN(parseInt(e))?10:parseInt(e);this.cards.push(new f(s,r))}))}shuffle(){for(let t=this.cards.length-1;t>0;t--){const e=Math.floor(Math.random()*(t+1));[this.cards[t],this.cards[e]]=[this.cards[e],this.cards[t]]}}getCard(){return this.cards.pop()}};a(y,"clubs",["H","C","S","D"]),a(y,"values",["2","3","4","5","6","7","8","9","10","J","Q","K","A"]);let P=y;const m=class m{constructor(){a(this,"nPlayers",1);a(this,"players",[]);a(this,"deck",null);a(this,"activePlayer",null)}static getInstance(){return m.instance||(m.instance=new m),m.instance}prepare(t){this.nPlayers=t,this.players=[];for(let e=0;e<=t;e++){const s=new I;s.isPlaying=!0,this.players.push(new I)}this.deck=new P,this.deck.shuffle()}start(){this.players.forEach(t=>{t.hand.reset(),t.hand.addCard(this.deck.getCard()),t.hand.addCard(this.deck.getCard())}),this.activePlayer=0}getCard(){const t=this.players[this.activePlayer],e=this.deck.getCard();return t.hand.addCard(e),e}stand(){return this.players[this.activePlayer].isPlaying=!1,this.activePlayer++,null}computerTurn(t){switch(t(this)){case g.STAND:return this.stand();default:return this.getCard()}}getResult(){const t=this.players[this.nPlayers].hand.getScore(),e=[];for(let s=0;s<this.nPlayers;s++)this.players[s].getScore()>21?e.push(-1):t>21?e.push(1):this.players[s].getScore()<t?e.push(-1):this.players[s].getScore()===t?e.push(0):e.push(1);return e}};a(m,"instance",null);let S=m;class L{constructor(){this.cards=[]}addCard(t){this.cards.push(t)}reset(){this.cards=[]}getScore(){return this.cards.reduce((t,e)=>t+e.value,0)}}class I{constructor(){this.hand=new L,this.isPlaying=!0}getScore(){return this.hand.getScore()}}const o=class o{static beatAll(t){const e=t.nPlayers,r=t.players.slice(0,-1).map(c=>c.hand.getScore()).filter(c=>c<=21).reduce((c,h)=>Math.max(c,h),0),i=t.players[e].hand.getScore();return i>19||i>r?o.STAND:o.HIT}static conservative(t){let e=o.beatAll(t);if(e===o.HIT){const s=t.nPlayers;if(t.players[s].hand.getScore()>15)return o.STAND}return e}static dynamicDealerStrategy(t){const e=t.nPlayers,s=t.players[e].hand.getScore(),r=t.players.slice(0,-1).map(d=>d.hand.getScore()),i=r.filter(d=>d>21||d<=s).length,c=s+7;let h;return c>21?h=r.filter(d=>d>21).length:h=r.filter(d=>d<=c).length,h>i||s<=11?o.HIT:o.STAND}};a(o,"STAND",0),a(o,"HIT",1);let g=o;const n=class n{constructor(){a(this,"playerDivs",[]);a(this,"mat",null);a(this,"hitButton",null);a(this,"standButton",null);a(this,"startButton",null);a(this,"restartButton",null);this.mat=document.querySelector(n.matId),this.hitButton=document.querySelector(n.hitButtonId),this.standButton=document.querySelector(n.standButtonId),this.startButton=document.querySelector(n.startButtonId),this.restartButton=document.querySelector(n.restartButtonId)}static getInstance(){return n.instance||(n.instance=new n),n.instance}prepareGame(t){this.clearContainer(this.mat),this.playerDivs=[];const e=t.nPlayers;for(let s=0;s<=e;s++){const r=document.createElement("DIV");r.classList.add("player");const i=document.createElement("H2");i.classList.add("player_name"),s===e?i.innerText="Computer":i.innerText="Player "+(s+1);const c=document.createElement("DIV");c.classList.add("hand_div");const h=document.createElement("DIV");h.classList.add("hand");const d=document.createElement("DIV");d.classList.add("message"),r.appendChild(i),r.appendChild(c),c.appendChild(h),c.appendChild(d),this.playerDivs.push(r),this.mat.appendChild(r)}this.setButtons(n.PLAYING)}setButtons(t){t===n.WAITING?(this.hitButton.disabled=!0,this.standButton.disabled=!0,this.startButton.disabled=!1,this.restartButton.disabled=!1,this.restartButton.classList.remove("hidden")):t===n.PLAYING&&(this.hitButton.disabled=!1,this.standButton.disabled=!1,this.startButton.disabled=!0,this.restartButton.disabled=!0,this.restartButton.classList.add("hidden"))}startGame(t){const e=t.players;for(let s=0;s<e.length;s++)e[s].hand.cards.forEach(r=>{this.renderCard(r,s),this.renderScore(e[s].hand.getScore(),s)});this.renderFrame(t.activePlayer),this.setButtons(n.PLAYING)}renderCard(t,e){const s=document.createElement("IMG");s.src=t.image,s.classList.add("card"),this.playerDivs[e].querySelector(".hand").appendChild(s)}renderFrame(t){for(let e=0;e<this.playerDivs.length;e++)e===t?this.playerDivs[e].classList.add("active"):this.playerDivs[e].classList.remove("active")}renderScore(t,e){const s=t===21?"Blackjack!":t>21?"Bust!":t;this.renderMessage(s,e)}renderMessage(t,e){const s=this.playerDivs[e].querySelector(".message");s.innerText=t}renderResult(t){for(let e=0;e<t.length;e++){const s=t[e]===0?"Draw!":t[e]===1?"Win!":"Lose!";this.renderMessage(s,e)}this.setButtons(n.WAITING)}clearContainer(t){t.innerHTML=""}};a(n,"WAITING",0),a(n,"PLAYING",1),a(n,"instance",null),a(n,"matId","#mat"),a(n,"hitButtonId","#hit"),a(n,"standButtonId","#stand"),a(n,"startButtonId","#start"),a(n,"restartButtonId","#restart");let v=n;class D{constructor(t){a(this,"strategy");a(this,"renderer");a(this,"game");this.renderer=v.getInstance(),this.game=S.getInstance(),this.strategy=t}prepareGame(t=1){this.game.prepare(t),this.renderer.prepareGame(this.game)}startGame(){this.game.start(),this.renderer.startGame(this.game)}getCard(){const t=this.game.getCard(),e=this.game.activePlayer,s=this.game.players[e].hand.getScore();return this.renderer.renderCard(t,e),this.renderer.renderScore(s,e),s>=21&&this.stand(),t}stand(){this.game.players[this.game.activePlayer].isPlaying=!1,this.game.activePlayer++,this.renderer.renderFrame(this.game.activePlayer),this.game.activePlayer===this.game.nPlayers&&this.computerTurn()}computerTurn(){const t=this.game.nPlayers;let e=null;do e=this.game.computerTurn(this.strategy),e&&(this.renderer.renderCard(e,t),this.renderer.renderScore(this.game.players[t].hand.getScore(),t));while(e);this.renderer.renderResult(this.game.getResult())}}const u=new D(g.dynamicDealerStrategy);document.addEventListener("DOMContentLoaded",function(){document.querySelector("#start").addEventListener("click",function(){const l=prompt("How many players?");u.prepareGame(Math.max(l??1,1)),u.startGame()}),document.querySelector("#hit").addEventListener("click",function(){u.getCard()}),document.querySelector("#stand").addEventListener("click",function(){u.stand()}),document.querySelector("#restart").addEventListener("click",function(){const l=u.game.nPlayers;u.prepareGame(Math.max(l??1,1)),u.startGame()})});