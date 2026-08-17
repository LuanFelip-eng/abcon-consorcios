const data={
types:[
{id:"imovel",label:"Imóvel",icon:"⌂",min:80000,max:900000,step:5000,prazos:[120,150,180,200]},
{id:"auto",label:"Automóvel",icon:"🚗",min:30000,max:250000,step:2000,prazos:[48,60,72,80]},
{id:"moto",label:"Moto",icon:"🏍",min:8000,max:60000,step:1000,prazos:[36,48,60]}
],
steps:[["01","⌕","Escolha o crédito","Imóvel, automóvel ou moto."],["02","◎","Faça sua simulação","Valor e prazo sob medida."],["03","☎","Receba atendimento","Consultoria especializada."],["04","♙","Entre no grupo","Formalização simples e rápida."],["05","★","Seja contemplado","Por sorteio ou lance."],["06","✦","Realize seu sonho","Retire seu bem sem juros."]],
benefits:[["✓","Sem juros","Você paga apenas correção monetária e taxa de administração."],["▣","Parcelas acessíveis","Planos que cabem no seu orçamento mensal."],["↗","Planejamento financeiro","Organize sua conquista com previsibilidade total."],["★","Contemplação por lance","Antecipe seu bem com estratégias de lance."],["♢","Consultoria especializada","Time dedicado a encontrar o melhor plano para você."],["☎","Atendimento personalizado","Suporte humano do início até a contemplação."]],
testimonials:[
["MS","Marina Souza","Contemplada em imóvel","Consegui as chaves do meu apartamento em 14 meses, com lance planejado. A consultoria foi essencial em cada etapa."],
["RA","Rafael Andrade","Contemplado em automóvel","Simulei em minutos e tive atendimento humano no mesmo dia. Hoje já estou no meu carro novo, sem juros no bolso."],
["JP","Juliana Prado","Contemplada em imóvel","O acompanhamento próximo fez toda a diferença. Sabia exatamente em que etapa do grupo eu estava a cada mês."]
],
faq:[
["O consórcio cobra juros?","Não. Você paga apenas a taxa de administração e a correção monetária do valor do bem, sem incidência de juros como em um financiamento."],
["Como funciona o lance para ser contemplado?","Além do sorteio mensal, você pode ofertar um lance (parte do valor do crédito) para concorrer à contemplação antecipada do seu bem."],
["Posso desistir do consórcio?","Sim. Você pode solicitar a desistência a qualquer momento; os valores pagos são devolvidos conforme regras do grupo e da administradora."],
["Quanto tempo até ser contemplado?","Varia por grupo e estratégia de lance, mas muitos clientes são contemplados entre 6 e 24 meses após a adesão."],
["Preciso de aprovação de crédito para entrar?","A adesão ao grupo não exige aprovação de crédito. A análise cadastral acontece apenas no momento da contemplação, para liberação do bem."],
["Quais bens posso adquirir com o consórcio?","Imóveis residenciais e comerciais, automóveis novos ou seminovos e motocicletas, conforme o plano escolhido."]
]};
let selected="imovel",value=250000,term=150,testIdx=0;

const brl=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0});
const $=s=>document.querySelector(s);

function renderTypes(){
 $("#types").innerHTML=data.types.map(t=>`<button class="type-btn ${t.id===selected?"active":""}" data-type="${t.id}"><span>${t.icon}</span><br>${t.label}</button>`).join("");
 document.querySelectorAll("[data-type]").forEach(b=>b.onclick=()=>{selected=b.dataset.type;let t=data.types.find(x=>x.id===selected);value=Math.round((t.min+t.max)/2);term=t.prazos[Math.floor(t.prazos.length/2)];renderSimulation()});
}
function renderSimulation(){
 let t=data.types.find(x=>x.id===selected);
 $("#valueRange").min=t.min;$("#valueRange").max=t.max;$("#valueRange").step=t.step;$("#valueRange").value=value;
 $("#valueDisplay").textContent=brl(value);$("#minDisplay").textContent=brl(t.min);$("#maxDisplay").textContent=brl(t.max);
 $("#terms").innerHTML=t.prazos.map(p=>`<button class="term ${p===term?"active":""}" data-term="${p}">${p} meses</button>`).join("");
 document.querySelectorAll("[data-term]").forEach(b=>b.onclick=()=>{term=+b.dataset.term;renderSimulation()});
}
$("#valueRange").oninput=e=>{value=+e.target.value;$("#valueDisplay").textContent=brl(value)};
function openModal(){
 let t=data.types.find(x=>x.id===selected);
 $("#modalSubtitle").textContent=`Para visualizar sua simulação de ${t.label.toLowerCase()}, precisamos de alguns dados.`;
 $("#modalBody").innerHTML=`<form id="leadForm"><input id="nome" placeholder="Nome completo"><input id="telefone" placeholder="Telefone / WhatsApp"><input id="email" placeholder="E-mail"><button class="submit">Ver Minha Simulação</button><p style="font-size:11px;text-align:center;color:#8B96AC">Seus dados são usados apenas para contato sobre sua simulação.</p></form>`;
 $("#modal").classList.add("show");
 $("#leadForm").onsubmit=e=>{e.preventDefault();let n=$("#nome"),p=$("#telefone"),em=$("#email");if(n.value.trim().length<3||p.value.replace(/\D/g,"").length<10||!/^\S+@\S+\.\S+$/.test(em.value)){[n,p,em].forEach(x=>x.classList.remove("error"));if(n.value.trim().length<3)n.classList.add("error");if(p.value.replace(/\D/g,"").length<10)p.classList.add("error");if(!/^\S+@\S+\.\S+$/.test(em.value))em.classList.add("error");return}let parcela=Math.round(value*1.16/term);$("#modalTitle").textContent="Simulação gerada com sucesso";$("#modalSubtitle").textContent="Confira uma estimativa para o seu planejamento.";$("#modalBody").innerHTML=`<div class="result"><div class="result-row"><span>Tipo</span><strong>${t.label}</strong></div><div class="result-row"><span>Crédito</span><strong>${brl(value)}</strong></div><div class="result-row"><span>Prazo</span><strong>${term} meses</strong></div><hr><div class="result-row"><span>Parcela estimada</span><strong style="font-size:22px">${brl(parcela)}</strong></div></div><p style="color:#5B6B85;font-size:14px">✓ Recebemos seus dados, ${n.value.split(" ")[0]}. Um consultor especializado entrará em contato para refinar sua proposta.</p><button id="finish" class="submit">Fechar</button>`;$("#finish").onclick=closeModal};
}
function closeModal(){$("#modal").classList.remove("show")}
$("#simulateBtn").onclick=openModal;$("#closeModal").onclick=closeModal;$("#modal").onclick=e=>{if(e.target.id==="modal")closeModal()};

function renderSteps(){$("#steps").innerHTML=data.steps.map(s=>`<div class="step reveal"><div class="step-icon">${s[1]}<small style="position:absolute"></small></div><b>${s[2]}</b><small>${s[3]}</small></div>`).join("")}
function renderBenefits(){$("#benefits").innerHTML=data.benefits.map(b=>`<div class="benefit reveal"><div class="benefit-icon">${b[0]}</div><h3>${b[1]}</h3><p>${b[2]}</p></div>`).join("")}
function renderTestimonial(){let t=data.testimonials[testIdx];$("#testimonial").innerHTML=`<div class="stars">★★★★★</div><blockquote>“${t[3]}”</blockquote><div class="person"><div class="avatar">${t[0]}</div><div><b>${t[1]}</b><small>${t[2]}</small></div></div>`;$("#dots").innerHTML=data.testimonials.map((_,i)=>`<button class="dot ${i===testIdx?"active":""}" data-dot="${i}"></button>`).join("");document.querySelectorAll("[data-dot]").forEach(b=>b.onclick=()=>{testIdx=+b.dataset.dot;renderTestimonial()})}
function renderFaq(){$("#faq").innerHTML=data.faq.map((f,i)=>`<div class="faq-item ${i===0?"open":""}"><button class="faq-q">${f[0]} <span>⌄</span></button><div class="faq-a">${f[1]}</div></div>`).join("");document.querySelectorAll(".faq-q").forEach(b=>b.onclick=()=>b.parentElement.classList.toggle("open"))}

document.querySelectorAll("[data-scroll]").forEach(b=>b.onclick=()=>{document.getElementById(b.dataset.scroll).scrollIntoView({behavior:"smooth"});$("#mobileMenu").classList.remove("open")});
$("#menuBtn").onclick=()=>$("#mobileMenu").classList.toggle("open");
window.addEventListener("scroll",()=>{$("#navbar").classList.toggle("scrolled",scrollY>24)});
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.12});
function observe(){document.querySelectorAll(".reveal").forEach(e=>observer.observe(e))}
$("#year").textContent=new Date().getFullYear();
renderTypes();renderSimulation();renderSteps();renderBenefits();renderTestimonial();renderFaq();setTimeout(observe,50);
setInterval(()=>{testIdx=(testIdx+1)%data.testimonials.length;renderTestimonial();observe()},6000);
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});