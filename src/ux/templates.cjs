const {icon}=require('./icons.cjs');
const rich = s => String(s ?? '').replace(/\{\{([a-z]+:[a-z0-9-]+)\|([^}]+)\}\}/g, (_,ref,txt) => '<button type="button" class="ref" data-ref="'+ref+'">'+txt+'</button>');
const attr = s => String(s??'').replace(/[&"<]/g,c=>({'&':'&amp;','"':'&quot;','<':'&lt;'}[c]));
const strip = s => String(s??'').replace(/<[^>]+>/g,'');
function hero(H,extra=''){return '<header class="wrap page-hero"><p class="eyebrow">'+H.eb+'</p><h1>'+H.h1+'</h1><p class="lead">'+rich(H.lead)+'</p>'+extra+'</header>';}
const sectionIcons={organizacoes:'organizacao',perfis:'persona',perguntas:'documento',anatomia:'artefato',camadas:'pratica',papeis:'papel',modulos:'papel',referenciais:'pratica',ia:'risco',etapas:'estagio',acesso:'papel',ritmo:'pratica',checklist:'evidencia',caminhos:'estagio',arquitetura:'artefato',ferramentas:'artefato',interfaces:'papel',licencas:'documento',modelos:'template',canvas:'artefato',diagramas:'documento',fontes:'link-externo',contribuir:'comunidade',guardioes:'papel',roteiro:'estagio',marcas:'comunidade'};
function sec(id,S,body,tint){return '<section class="sec '+(tint?'tint':'')+'" id="'+id+'"'+(S.sub?' data-sub="'+attr(S.sub)+'"':'')+'><div class="wrap"><div class="sec-head"><p class="eyebrow">'+(sectionIcons[id]?icon(sectionIcons[id],20):'')+S.eb+'</p><h2>'+S.h2+'</h2><p class="muted">'+rich(S.p)+'</p></div>'+body+'</div></section>';}
const GH='https://github.com/kolmeia-dataecosystems/kdv-framework';
const PAGES = {
  home(P) {
    const H = P.hero, S = P.sec;
    return `  <section class="wrap hero" aria-labelledby="h1">
    <div>
      <span class="eyebrow">${H.eb}</span>
      <h1 id="h1" style="margin-top:24px">${H.h1}</h1>
      <p class="lead">${rich(H.lead)}</p>
      <div class="actions"><a class="btn" href="#voce">${H.cta1} <span aria-hidden="true">↓</span></a><a class="btn-line arrow" href="playbook.html">${H.cta2}</a></div>
      <p class="sub">${rich(H.sub)}</p>
    </div>
    <div class="hexmap" id="hexmap"></div>
  </section>
  <div class="wrap"><div class="marquee-refs">
    <span class="eyebrow">${P.refsLabel}</span>
    <a class="btn-line" style="border:0;justify-content:center;font-size:20px" href="modelo.html#referenciais">DAMA-DMBOK 2</a>
    <a class="btn-line" style="border:0;justify-content:center;font-size:20px" href="modelo.html#referenciais">DCAM</a>
    <a class="btn-line" style="border:0;justify-content:center;font-size:20px" href="modelo.html#referenciais">Data Mesh</a>
  </div></div>
` + sec("voce", S.voce, '<div class="recog" id="recog"></div>').replace('class="sec"', 'class="sec" style="border-top:0"')
      + sec("proposta", S.proposta, `<div class="grid g3">${P.propostaCells.map(([n, h, t]) => `<div class="cell"><span class="n">${n}</span><h3>${h}</h3><p class="muted small">${rich(t)}</p></div>`).join("")}</div>`, true)
      + sec("como", S.como, '<div id="stages"></div>')
      + sec("minimo", S.minimo, '<div class="baseline" id="baseline"></div>', true)
      + sec("colmeia", S.colmeia, '<div id="translation"></div>')
      + sec("aberto", S.aberto, `<div class="grid g3" id="paths-mini"></div><div class="row mt-m"><a class="btn-line arrow" href="implementacao.html">${P.abertoLinks[0]}</a><a class="btn-line arrow" href="comunidade.html#marcas">${P.abertoLinks[1]}</a></div>`, true)
      + sec("exemplos", S.exemplos, '<div id="cases"></div>');
  },
  homeAfter(P) {
    const C = P.cta;
    return `<section class="cta-band" aria-labelledby="cta-h"><div class="wrap">
  <div class="stack"><span class="eyebrow" style="color:inherit">${C.eb}</span><h2 id="cta-h">${C.h2}</h2></div>
  <div class="stack"><p class="muted">${C.p}</p><div class="actions"><a class="btn" href="playbook.html">${C.btn1}</a><a class="btn-line" href="comunidade.html">${C.btn2}</a></div></div>
</div></section>\n`;
  },
  "para-quem"(P) {
    const S = P.sec;
    return hero(P.hero)
      + sec("organizacoes", S.organizacoes, '<div id="nichos"></div>')
      + sec("perfis", S.perfis, '<div class="grid g3" id="personas"></div>', true)
      + sec("perguntas", S.perguntas, `<div class="acc">${P.faq.map(([q, a], i) => `<details><summary><span class="n">0${i + 1}</span><h3>${q}</h3><span class="plus" aria-hidden="true"></span></summary><div class="acc-body prose"><p>${rich(a)}</p></div></details>`).join("\n")}</div>`);
  },
  modelo(P) {
    const S = P.sec;
    return hero(P.hero)
      + sec("anatomia", S.anatomia, '<div class="explorer" id="explorer"></div>')
      + sec("camadas", S.camadas, '<div id="matrix"></div>', true)
      + sec("papeis", S.papeis, '<div id="roles"></div>')
      + sec("modulos", S.modulos, '<div class="grid g3" id="modules"></div>', true)
      + sec("referenciais", S.referenciais, '<div id="refs"></div>')
      + sec("ia", S.ia, `<div class="grid g2">${P.iaCards.map(([h, t], i) => `<div class="cell"><span class="n">0${i + 1}</span><h3>${h}</h3><p class="small muted">${rich(t)}</p></div>`).join("")}</div><div class="row mt-m"><a class="btn-line arrow" href="documentacao.html#ia-privacidade">${P.iaLink}</a><span class="pill-note">${P.iaNota}</span></div>`, true);
  },
  playbook(P) {
    const S = P.sec, H = P.hero;
    return hero(H, `<div class="actions mt-m"><a class="btn" href="#etapas">${H.cta1}</a><a class="btn-line arrow" href="documentacao.html#exemplo">${H.cta2}</a></div>`)
      + sec("etapas", S.etapas, '<div id="steps"></div>')
      + sec("acesso", S.acesso, `<div id="access"></div><button type="button" class="btn-line arrow mt-m" data-lightbox="../assets/ux/D4_processo_decisao_de_acesso.png" data-caption="${attr(strip(S.acesso.h2))}">${P.verFluxo}</button>`, true)
      + sec("ritmo", S.ritmo, '<div class="grid g3" id="rhythm"></div>')
      + sec("checklist", S.checklist, '<div class="check" id="check-ui"></div>', true);
  },
  implementacao(P) {
    const S = P.sec, X = P.licencas;
    return hero(P.hero)
      + sec("caminhos", S.caminhos, '<div id="chooser"></div>')
      + sec("arquitetura", S.arquitetura, `<div id="arch"></div><button type="button" class="btn-line arrow mt-m" data-lightbox="../assets/ux/D5_arquitetura_referencia_ferramentas.png" data-caption="${attr(P.diagramaLegenda)}">${P.verDiagrama}</button>`, true)
      + sec("ferramentas", S.ferramentas, '<div id="tools"></div>')
      + sec("interfaces", S.interfaces, '<div class="grid g3" id="modules"></div>', true)
      + sec("licencas", S.licencas, `<div class="two"><div class="prose"><h3>${X.h3a}</h3><ul>${X.criterios.map(p=>`<li>${p}</li>`).join("")}</ul></div><div class="prose"><h3>${X.h3b}</h3><p>${X.pb}</p></div></div>`);
  },
  recursos(P) {
    const S = P.sec;
    const links = ["https://dama.org/dama-dmbok2-revised-edition-faqs/", "https://edmcouncil.org/frameworks/dcam/", "https://martinfowler.com/articles/data-mesh-principles.html"];
    return hero(P.hero)
      + sec("modelos", S.modelos, '<div id="models"></div>')
      + sec("canvas", S.canvas, '<div id="canvas-ui"></div>', true)
      + sec("diagramas", S.diagramas, '<div class="grid g3" id="diagrams"></div>')
      + sec("fontes", S.fontes, `<div class="grid g3">${P.fontes.map(([h, t], i) => `<a class="cell click" style="text-decoration:none" href="${links[i]}" target="_blank" rel="noopener"><span class="n">0${i + 1}</span><h3>${h}</h3><p class="small muted">${t}</p><span class="go">${new URL(links[i]).hostname} ↗</span></a>`).join("")}</div>`, true);
  },
  documentacao(P) {
    return `  <div class="wrap reader" id="reader">
    <details class="toc-wrap toc-d" open><summary>${P.todosGuias}</summary><nav class="toc" id="toc"></nav></details>
    <article class="guide" id="guide" aria-live="polite"></article>
    <aside class="aside-r" id="aside"></aside>
  </div>\n`;
  },
  comunidade(P) {
    const S = P.sec, G = P.guardioes, H = P.hero;
    const links = [GH + "/issues/new?template=question.yml", GH + "/blob/main/CONTRIBUTING.md", GH + "/issues/new?template=example.yml", "https://github.com/kolmeia-dataecosystems/kdv-framework-site"];
    return hero(H, `<div class="actions mt-m"><a class="btn" href="${GH}" target="_blank" rel="noopener">${H.cta1}</a></div>`)
      + sec("contribuir", S.contribuir, `<div class="grid g2">${P.contribuir.map(([h, t, l], i) => `<a class="cell click" style="text-decoration:none" href="${links[i]}" target="_blank" rel="noopener"><span class="n">0${i + 1}</span><h3>${h}</h3><p class="small muted">${t}</p><span class="go">${l}</span></a>`).join("")}</div>`)
      + sec("guardioes", S.guardioes, `<div class="two"><div class="prose"><h3>${G.h3a}</h3><ol>${G.passos.map((p) => `<li>${p}</li>`).join("")}</ol></div><div class="prose"><h3>${G.h3b}</h3><p>${G.p1}</p><ul>${G.regras.map(p=>`<li>${p}</li>`).join("")}</ul></div></div>`, true)
      + sec("roteiro", S.roteiro, `<div class="grid g3">${P.roteiro.map(([h, t], i) => `<div class="cell"><span class="n">0${i + 1}</span><h3>${h}</h3><p class="small muted">${t}</p></div>`).join("")}</div><div class="panel mt-m prose"><h3>${P.versao.h3}</h3><p>${P.versao.p}</p></div>`)
      + sec("marcas", S.marcas, `<div class="brands" id="brands"></div><div class="two mt-m"><div class="prose"><h3>${P.licenca.h3}</h3><p>${P.licenca.p}</p></div><div class="prose"><h3>${P.contato.h3}</h3><p>${rich(P.contato.p)}</p></div></div>`, true);
  },
  privacidade(P) {
    const b = P.blocos; const blk = (x) => `<h3>${x[0]}</h3><p>${x[1]}</p>`;
    return hero(P.hero) + `  <section class="sec"><div class="wrap two"><div class="prose">${blk(b[0])}${blk(b[1])}</div><div class="prose">${blk(b[2])}${blk(b[3])}
      <p><a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank" rel="noopener">LGPD ↗</a> · <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener">GDPR ↗</a></p></div></div></section>\n`;
  }
};

module.exports=PAGES;
