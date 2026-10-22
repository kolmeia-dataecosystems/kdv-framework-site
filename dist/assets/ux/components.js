/* KDV Framework — componentes de cada página (multilíngue). Tudo abre no lugar. */
(function () {
  "use strict";
  const U = () => window.KDVUI;
  const ETAPAS4 = ["cultivar", "governar", "compartilhar", "ativar"];

  /* ================= Visão geral ================= */
  function hexmap(host) {
    const { esc, K, T, fmt } = U();
    const pos = { dominio: [19, 1.4], subdominio: [50, 1.4], ecossistema: [3.5, 30.5], produto: [65.5, 30.5], agrupamento: [19, 59.7], ambiente: [50, 59.7] };
    host.innerHTML = K.conceitos.map((c) => `<button type="button" class="hex" style="left:${pos[c.id][0]}%;top:${pos[c.id][1]}%" data-ref="conceito:${c.id}" aria-label="${esc(fmt(T.home.hexAria, { c: c.cliente, k: c.kdv }))}"><span><b>${esc(c.cliente)}</b><small>${esc(c.kdv)}${c.opcional ? " · " + esc(T.painel.opcional) : ""}</small></span></button>`).join("")
      + `<div class="hex center" style="left:39%;top:36.2%" aria-hidden="true"><span><b>KDV</b><small>FRAMEWORK</small></span></div><p class="cap">${esc(T.home.hexCap)}</p>`;
  }

  function recognize(host) {
    const { esc, IDX, refBtn, store, guideHref, K, T } = U(); const H = T.home; const A = T.aspas || ["“", "”"];
    let mode = "persona"; let sel = store.get("perfil", null) || "gestor";
    function out() {
      if (mode === "persona") {
        const p = IDX.persona[sel] || K.personas[0];
        return `<span class="eyebrow">${esc(p.nome)}</span><blockquote>${A[0]}${esc(p.dor)}${A[1]}</blockquote>
          <dl class="kv"><dt>${esc(H.oQueMuda)}</dt><dd>${esc(p.muda)}</dd><dt>${esc(H.porOndeComecar)}</dt><dd>${esc(p.comeco)}</dd>
          <dt>${esc(H.leitura)}</dt><dd><div class="trail">${p.trilha.map((g) => `<a href="${guideHref(g)}">${esc(IDX.guia[g].titulo)}</a>`).join("")}</div></dd></dl>
          <div class="actions"><button type="button" class="btn-ghost" data-persona-set="${p.id}">${esc(T.painel.usarPerfil)}</button><a class="btn-line arrow" href="playbook.html">${esc(H.verPlaybook)}</a></div>`;
      }
      const n = IDX.nicho[sel] || K.nichos[0];
      return `<span class="eyebrow">${esc(H.tipoOrg)}</span><h3>${esc(n.nome)}</h3>
        <dl class="kv"><dt>${esc(H.dores)}</dt><dd>${n.dores.map(esc).join(" · ")}</dd><dt>${esc(H.responde)}</dt><dd>${esc(n.responde)}</dd>
        <dt>${esc(H.primeiroCaso)}</dt><dd>${esc(n.comeco)}</dd><dt>${esc(H.exemploProximo)}</dt><dd>${refBtn("caso:" + n.exemplo)}</dd></dl>
        <div class="actions"><a class="btn-line arrow" href="para-quem.html#${n.id}">${esc(H.verMaisOrg)}</a></div>`;
    }
    function draw() {
      const items = mode === "persona" ? K.personas : K.nichos;
      if (!items.some((i) => i.id === sel)) sel = items[0].id;
      host.innerHTML = `<div class="recog-pick">
          <div class="seg-ctrl" role="group" aria-label="${esc(H.modoAria)}"><button type="button" data-mode="persona" aria-pressed="${mode === "persona"}">${esc(H.porPapel)}</button><button type="button" data-mode="nicho" aria-pressed="${mode === "nicho"}">${esc(H.porOrg)}</button></div>
          <div class="recog-list">${items.map((i) => `<button type="button" data-pick="${i.id}" aria-pressed="${i.id === sel}" aria-controls="recog-out"><span class="s" aria-hidden="true">${i.sinal || "▢"}</span><span>${esc(i.nome)}</span></button>`).join("")}</div></div>
        <div class="recog-out" id="recog-out" aria-live="polite">${out()}</div>`;
    }
    host.addEventListener("click", (e) => {
      const m = e.target.closest("[data-mode]"); if (m) { mode = m.dataset.mode; sel = mode === "persona" ? (store.get("perfil", null) || "gestor") : "publico"; draw(); return; }
      const p = e.target.closest("[data-pick]"); if (p) { sel = p.dataset.pick; draw(); host.querySelector(`[data-pick="${sel}"]`).focus(); }
    });
    document.addEventListener("kdv:persona", (e) => { if (mode === "persona" && e.detail) { sel = e.detail; draw(); } });
    draw();
  }

  function stagesInline(host) {
    const { esc, IDX, refChip, T } = U(); const H = T.home;
    let open = "cultivar";
    function detail(s) {
      return `<div><h4>${esc(H.comecaQuando)}</h4><p>${esc(s.entrada)}</p></div>
        <div><h4>${esc(H.oQueFazer)}</h4><ul>${s.praticas.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>
        <div><h4>${esc(H.evidencia)}</h4><ul>${s.evidencia.map((p) => `<li>${esc(p)}</li>`).join("")}</ul><h4 style="margin-top:14px">${esc(H.quem)}</h4><div class="who">${s.participantes.map((p) => refChip("papel:" + p)).join("")}</div></div>
        <div class="stack" style="align-self:end"><button type="button" class="btn-ghost" data-ref="etapa:${s.id}">${esc(H.maisDetalhes)}</button><a class="btn-line arrow" href="playbook.html#${s.id}">${esc(H.abrirPlaybook)}</a></div>`;
    }
    function draw() {
      host.innerHTML = `<div class="stages" role="group" aria-label="${esc(H.etapasAria)}">${ETAPAS4.map((id) => { const s = IDX.etapa[id]; return `<button type="button" data-st="${id}" aria-expanded="${open === id}" aria-controls="stage-detail"><span class="n">0${s.n}</span><b>${esc(s.cliente)}</b><span class="k">${esc(s.kdv)} · ${esc(s.frase)}</span></button>`; }).join("")}</div>
        <div class="stage-detail" id="stage-detail">${detail(IDX.etapa[open])}</div>`;
    }
    host.addEventListener("click", (e) => { const b = e.target.closest("[data-st]"); if (b) { open = b.dataset.st; draw(); host.querySelector(`[data-st="${open}"]`).focus(); } });
    draw();
  }

  function baselineRow(host) {
    const { esc, K } = U();
    host.innerHTML = K.baseline.map((b, i) => `<button type="button" data-ref="base:${b.id}"><span class="n">0${i + 1}</span><b>${esc(b.nome)}</b><span class="why">${esc(b.porque)}</span></button>`).join("");
  }

  function translation(host) {
    const { esc, K, T } = U(); const H = T.home; let analog = false;
    function draw() {
      const L = H.linhaCiclo;
      host.innerHTML = `<div class="toolbar"><p class="muted small">${esc(H.tradDica)}</p>
        <div class="seg-ctrl" role="group" aria-label="${esc(H.colunasAria)}"><button type="button" data-an="0" aria-pressed="${!analog}">${esc(H.colExemplos)}</button><button type="button" data-an="1" aria-pressed="${analog}">${esc(H.colAnalogia)}</button></div></div>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th>${esc(H.thCliente)}</th><th>${esc(H.thKdv)}</th><th>${esc(analog ? H.thPorque : H.thExemplo)}</th></tr></thead><tbody>
        ${K.conceitos.map((c) => `<tr class="rowclick" data-ref="conceito:${c.id}" tabindex="0"><td class="first">${esc(c.cliente)}<br><span class="muted small">${esc(c.frase)}</span></td><td><span class="tag kdv">${esc(c.kdv)}</span></td><td>${esc(analog ? c.analogia : c.exemplo)}</td></tr>`).join("")}
        <tr><td class="first">${esc(L[0])}</td><td><span class="tag kdv">${esc(L[1])}</span></td><td>${esc(analog ? L[3] : L[2])}</td></tr></tbody></table></div>`;
    }
    host.addEventListener("click", (e) => { const b = e.target.closest("[data-an]"); if (b) { analog = b.dataset.an === "1"; draw(); } });
    host.addEventListener("keydown", (e) => { const r = e.target.closest("tr[data-ref]"); if (r && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); U().openRef(r.dataset.ref); } });
    draw();
  }

  function casesTabs(host) {
    const { esc, tabsHTML, IDX, refBtn, K, T } = U(); const H = T.home;
    host.innerHTML = tabsHTML(K.casos.map((c) => ({ label: c.rotulo, html: `<div class="two"><div class="stack"><h3>${esc(c.titulo)}</h3><p class="muted">${esc(c.texto)}</p><div class="row"><button type="button" class="btn-ghost" data-ref="caso:${c.id}">${esc(H.verEtapas)}</button><a class="btn-line arrow" href="documentacao.html#exemplo">${esc(H.lerExemplo)}</a></div></div>
      <ol style="list-style:none;padding:0;margin:0;border-top:1px solid var(--line)">${c.etapas.map((s, i) => `<li style="display:grid;grid-template-columns:120px minmax(0,1fr);gap:12px;padding:12px 0;border-bottom:1px solid var(--line)"><span>${refBtn("etapa:" + ETAPAS4[i], IDX.etapa[ETAPAS4[i]].kdv)}</span><span>${esc(s)}</span></li>`).join("")}</ol></div>` })), { label: H.casosAria })
      + `<p class="nota">${esc(H.casosNota)}</p>`;
  }

  function pathsMini(host) {
    const { esc, K, T } = U();
    host.innerHTML = K.caminhos.map((c, i) => `<div class="cell"><span class="n">0${i + 1}</span><h3>${esc(c.nome)}</h3><p class="muted small">${esc(c.como)}</p><a class="btn-line arrow" style="margin-top:auto;align-self:flex-start" href="playbook.html#etapas">${esc(T.home.compararCaminhos)}</a></div>`).join("");
  }

  /* ================= Para quem ================= */
  function nichosGrid(host) {
    const { esc, refBtn, K, T } = U(); const Q = T.paraQuem;
    host.innerHTML = `<div class="acc">${K.nichos.map((n, i) => `<details id="${n.id}"${location.hash === "#" + n.id ? " open" : ""}><summary><span class="n">0${i + 1}</span><h3>${esc(n.nome)}</h3><span class="plus" aria-hidden="true"></span></summary>
      <div class="acc-body"><div class="two"><div class="stack"><h4>${esc(Q.dores)}</h4><ul>${n.dores.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div>
      <div class="stack"><h4>${esc(Q.responde)}</h4><p>${esc(n.responde)}</p><h4>${esc(Q.primeiroCaso)}</h4><p>${esc(n.comeco)}</p><p>${esc(Q.exemploProximo)} ${refBtn("caso:" + n.exemplo)}</p></div></div></div></details>`).join("")}</div>`;
  }
  function personasGrid(host) {
    const { esc, store, K, T } = U(); const cur = store.get("perfil", null); const A = T.aspas || ["“", "”"];
    host.innerHTML = K.personas.map((p) => `<button type="button" class="cell click" data-ref="persona:${p.id}"><span class="n" aria-hidden="true">${p.sinal}</span><h3>${esc(p.nome)}</h3><p style="font-size:18px;letter-spacing:-.01em">${A[0]}${esc(p.dor)}${A[1]}</p><p class="muted small">${esc(p.comeco)}</p><span class="go">${cur === p.id ? esc(T.paraQuem.seuPerfil) : ""}${esc(T.paraQuem.verMuda)}</span></button>`).join("");
  }

  /* ================= Como funciona ================= */
  function explorer(host) {
    const { esc, detailHTML, K, T, ROOT } = U(); const E = T.explorer, N = E.nomes;
    let viewMode = "negocio"; let sel = "dominio";
    const kdvOf = (ref) => K.conceitos.find((c) => c.id === ref).kdv;
    const B = (ref, label, cls, inner) => `<div role="button" tabindex="0" class="box ${cls || ""} ${sel === ref ? "on" : ""}" data-sel="${ref}"><span class="lbl"><span>${esc(label)}</span><small>${esc(kdvOf(ref))}</small></span>${inner || ""}</div>`;
    function negocio() {
      const prod = (n) => B("produto", n, "prod");
      return B("ecossistema", `${E.ecossistema} · ${N.rede}`, "", `<div class="inner">
        ${B("dominio", `${E.dominio} · ${N.financeiro}`, "", `<div class="inner one">${B("subdominio", `${E.subdominio} · ${N.contas}`, "", prod(N.pagamentos))}${B("agrupamento", `${E.agrupamento} · ${N.receitas}`, "comb", `<div class="inner">${B("subdominio", N.cobranca)}${B("subdominio", N.faturamento)}</div>`)}</div>`)}
        ${B("dominio", `${E.dominio} · ${N.fiscalizacao}`, "", `<div class="inner one">${B("subdominio", `${E.subdominio} · ${N.autuacoes}`, "", prod(N.priorizacao))}${B("subdominio", `${E.subdominio} · ${N.planejamento}`, "", prod(N.agenda))}</div>`)}
      </div>`);
    }
    function execucao() {
      return B("ecossistema", `${E.ecossistema} · ${N.rede}`, "", `<div class="exec-plane">${[N.producao, N.homologacao, N.desenvolvimento].map((a) => B("ambiente", `${E.ambiente} · ${a}`, "", `<span class="small muted">${esc(N.financeiro)} · ${esc(N.fiscalizacao)}</span>`)).join("")}</div><p class="exec-note">${esc(E.execNota)}</p>`);
    }
    function draw() {
      host.innerHTML = `<div class="anat"><div class="anat-top"><span class="eyebrow">${esc(E.eyebrow)}</span>
          <div class="seg-ctrl" role="group" aria-label="${esc(E.vistaAria)}"><button type="button" data-view="negocio" aria-pressed="${viewMode === "negocio"}">${esc(E.negocio)}</button><button type="button" data-view="execucao" aria-pressed="${viewMode === "execucao"}">${esc(E.execucao)}</button></div></div>
          ${viewMode === "negocio" ? negocio() : execucao()}
          <button type="button" class="btn-line arrow" style="align-self:flex-start" data-lightbox="${ROOT}assets/ux/D2_anatomia_ecossistema_arquitetura.png" data-caption="${esc(E.diagramaLegenda)}">${esc(E.verDiagrama)}</button></div>
        <div class="detail" aria-live="polite">${detailHTML("conceito:" + sel, true)}</div>`;
    }
    function pick(ref) { sel = ref; draw(); const b = host.querySelector(`.box[data-sel="${ref}"]`); b && b.focus(); }
    host.addEventListener("click", (e) => {
      const v = e.target.closest("[data-view]"); if (v) { viewMode = v.dataset.view; if (viewMode === "execucao" && !["ecossistema", "ambiente"].includes(sel)) sel = "ambiente"; if (viewMode === "negocio" && sel === "ambiente") sel = "dominio"; draw(); return; }
      const b = e.target.closest("[data-sel]"); if (b && !e.target.closest(".detail")) { e.stopPropagation(); pick(b.dataset.sel); }
    });
    host.addEventListener("keydown", (e) => { const b = e.target.closest(".box[data-sel]"); if (b && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); e.stopPropagation(); pick(b.dataset.sel); } });
    draw();
  }

  function matrix(host) {
    const { esc, IDX, refBtn, K, T } = U(); const M = T.matriz;
    let cur = ["organizacao", "compartilhar"];
    function draw() {
      const c = IDX.camada[cur[0]]; const cell = c.celulas[cur[1]]; const et = IDX.etapa[cur[1]];
      host.innerHTML = `<div class="matrix"><table><thead><tr><th>${esc(M.canto)}</th>${ETAPAS4.map((e) => `<th class="${e === cur[1] ? "hl" : ""}">${esc(IDX.etapa[e].kdv)}<br><span style="text-transform:none;letter-spacing:0">${esc(IDX.etapa[e].cliente)}</span></th>`).join("")}</tr></thead><tbody>
        ${K.camadas.map((l) => `<tr class="${l.id === cur[0] ? "hl" : ""}"><th scope="row">${refBtn("camada:" + l.id, l.nome)}<br><span class="muted small">${esc(l.pergunta)}</span></th>${ETAPAS4.map((e) => `<td><button type="button" data-et="${esc(IDX.etapa[e].kdv)}" data-cell="${l.id}|${e}" aria-pressed="${l.id === cur[0] && e === cur[1]}">${esc(l.celulas[e][0])}</button></td>`).join("")}</tr>`).join("")}
        </tbody></table></div>
        <div class="matrix-out" aria-live="polite"><span class="eyebrow">${esc(c.nome)} × ${esc(et.kdv)}</span><div class="stack" style="gap:6px"><h3>${esc(cell[0])}</h3><p>${esc(cell[1])}</p><p class="small">${refBtn("camada:" + c.id, M.sobreCamada)} · ${refBtn("etapa:" + et.id, M.sobreEtapa)}</p></div></div>
        <div class="row mt-s"><span class="pill-note">${esc(M.apoio)}</span>${K.baseline.map((b) => `<button type="button" class="chip" data-ref="base:${b.id}">${esc(b.nome)}</button>`).join("")}</div>`;
    }
    host.addEventListener("click", (e) => { const b = e.target.closest("[data-cell]"); if (b) { cur = b.dataset.cell.split("|"); draw(); host.querySelector(`[data-cell="${cur.join("|")}"]`).focus(); } });
    draw();
  }

  function roles(host, initial) {
    const { esc, refBtn, IDX, K, T } = U(); const R = T.papeis;
    let mode = initial || "resp"; const cols = ["preparar"].concat(ETAPAS4);
    function draw() {
      const resp = `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>${esc(R.thPapel)}</th><th>${esc(R.thOnde)}</th><th>${esc(R.thResp)}</th><th>${esc(R.thInterface)}</th></tr></thead><tbody>
        ${K.papeis.map((p) => `<tr class="rowclick" data-ref="papel:${p.id}" tabindex="0"><td class="first">${esc(p.nome)}</td><td class="small">${esc(p.escopo)}</td><td>${esc(p.resp)}</td><td class="small mono">${esc(p.interface)}</td></tr>`).join("")}</tbody></table></div>`;
      const sq = (l, st) => `<span style="display:inline-grid;place-items:center;width:24px;height:24px;font:600 12px var(--mono);${st}">${l}</span>`;
      const raci = `<div class="tbl-wrap"><table class="tbl raci"><thead><tr><th>${esc(R.thPapel)}</th>${cols.map((c) => `<th style="text-align:center">${esc(IDX.etapa[c].kdv)}</th>`).join("")}</tr></thead><tbody>
        ${K.papeis.map((p) => `<tr><td>${refBtn("papel:" + p.id, p.nome)}</td>${cols.map((c) => `<td class="r">${p.raci[c] ? `<span class="${p.raci[c]}" title="${esc(T.raci[p.raci[c]])}">${p.raci[c]}</span>` : '<span class="I">·</span>'}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
        <div class="row mt-s small">${sq("A", "background:var(--invert);color:var(--on-invert)")} ${esc(R.legendaA)} ${sq("R", "border:1.5px solid var(--ink)")} ${esc(T.raci.R)} ${sq("C", "background:var(--soft)")} ${esc(T.raci.C)} ${sq("I", "color:var(--muted)")} ${esc(T.raci.I)}</div>
        <p class="nota">${esc(R.nota)}</p>`;
      host.innerHTML = `<div class="toolbar"><p class="muted small">${esc(R.dica)}</p>
        <div class="seg-ctrl" role="group" aria-label="${esc(R.vistaAria)}"><button type="button" data-rm="resp" aria-pressed="${mode === "resp"}">${esc(R.resp)}</button><button type="button" data-rm="raci" aria-pressed="${mode === "raci"}">${esc(R.raci)}</button></div></div>${mode === "resp" ? resp : raci}`;
    }
    host.addEventListener("click", (e) => { const b = e.target.closest("[data-rm]"); if (b) { mode = b.dataset.rm; draw(); } });
    host.addEventListener("keydown", (e) => { const r = e.target.closest("tr[data-ref]"); if (r && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); U().openRef(r.dataset.ref); } });
    draw();
  }

  function modulesGrid(host) {
    const { esc, K } = U();
    host.innerHTML = K.modulos.map((m) => `<button type="button" class="cell click" data-ref="modulo:${m.id}"><span class="n">${esc(m.etapa)}</span><h3>${esc(m.nome)}</h3><p class="small"><b>${esc(m.quem)}.</b> <span class="muted">${esc(m.faz)}</span></p></button>`).join("");
  }

  function referenciais(host) {
    const { esc, tabsHTML, K, T } = U(); const R = K.referenciais, L = T.refs;
    let filtro = "todas";
    function damaTable() {
      const opts = [["todas", L.todas], ["coberta", R.cobertura.coberta], ["parcial", R.cobertura.parcial], ["basica", R.cobertura.basica], ["evolucao", R.cobertura.evolucao]];
      const rows = R.dama.filter((r) => filtro === "todas" || r.cov === filtro || (filtro === "coberta" && r.cov === "nucleo"));
      return `<div class="chips" role="group" aria-label="${esc(L.filtroAria)}" style="margin-bottom:14px">${opts.map(([k, l]) => `<button type="button" class="chip" data-cov="${k}" aria-pressed="${filtro === k}">${esc(l)}</button>`).join("")}</div>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th>${esc(L.thArea)}</th><th>${esc(L.thComo)}</th><th>${esc(L.thCobertura)}</th></tr></thead><tbody>${rows.map((r) => `<tr><td class="first">${esc(r.area)}</td><td>${esc(r.como)}</td><td><span class="cov ${r.cov}">${esc(R.cobertura[r.cov])}</span></td></tr>`).join("")}</tbody></table></div>`;
    }
    const dcam = `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>${esc(L.thComp)}</th><th>${esc(L.thEvid)}</th><th>${esc(L.thFora)}</th></tr></thead><tbody>${R.dcam.map((r) => `<tr><td class="first">${esc(r.comp)}</td><td>${esc(r.evid)}</td><td class="muted">${esc(r.fora)}</td></tr>`).join("")}</tbody></table></div><p class="nota">${esc(R.dcamNota)}</p>`;
    const mesh = `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>${esc(L.thPrinc)}</th><th>${esc(L.thComo)}</th><th>${esc(L.thTrabalho)}</th></tr></thead><tbody>${R.mesh.map((r) => `<tr><td class="first">${esc(r.pri)}</td><td>${esc(r.como)}</td><td class="muted">${esc(r.fora)}</td></tr>`).join("")}</tbody></table></div>`;
    host.innerHTML = tabsHTML([{ label: L.abaDama, html: `<div class="dama">${damaTable()}</div>`, on: true }, { label: L.abaDcam, html: dcam }, { label: L.abaMesh, html: mesh }], { label: L.aba }) + `<p class="nota">${esc(R.aviso)}</p>`;
    host.addEventListener("click", (e) => { const b = e.target.closest("[data-cov]"); if (b) { filtro = b.dataset.cov; host.querySelector(".dama").innerHTML = damaTable(); host.querySelector(`[data-cov="${filtro}"]`).focus(); } });
  }

  /* ================= Playbook ================= */
  function stepsFull(host) {
    const { esc, view, tabsHTML, store, K, T } = U();
    const done = store.get("etapas-feitas", {});
    let open = location.hash.slice(1); if (!K.etapas.some((s) => s.id === open)) open = "preparar";
    host.innerHTML = `<div class="steps">${K.etapas.map((s) => { const v = view("etapa:" + s.id); return `<div class="step ${done[s.id] ? "done" : ""}" id="${s.id}">
      <div class="step-rail"><span class="dot">${s.n}</span></div>
      <div><button type="button" class="step-head" aria-expanded="${open === s.id}" aria-controls="body-${s.id}"><span class="t"><small>${s.n === "0" ? esc(T.playbook.antes) : esc(T.painel.etapa) + " " + s.n} · ${esc(s.kdv)}</small><h3>${esc(s.cliente)}</h3><span class="muted small">${esc(s.frase)} ${esc(s.entrada)}</span></span><span class="plus" aria-hidden="true"></span></button>
      <div class="step-body" id="body-${s.id}" ${open === s.id ? "" : "hidden"}>${tabsHTML(v.tabs, { label: s.cliente })}
        <label class="row mt-m small" style="cursor:pointer"><input type="checkbox" data-done="${s.id}" ${done[s.id] ? "checked" : ""} style="width:18px;height:18px;accent-color:var(--ink)"> ${esc(T.playbook.marcar)}</label></div></div></div>`; }).join("")}</div>`;
    host.addEventListener("click", (e) => {
      const h = e.target.closest(".step-head"); if (!h) return;
      const body = document.getElementById(h.getAttribute("aria-controls")); const on = h.getAttribute("aria-expanded") !== "true";
      h.setAttribute("aria-expanded", on); body.hidden = !on;
      if (on) try { history.replaceState(null, "", "#" + h.closest(".step").id); window.dispatchEvent(new HashChangeEvent("hashchange")); } catch (err) {}
    });
    host.addEventListener("change", (e) => { const c = e.target.closest("[data-done]"); if (!c) return; done[c.dataset.done] = c.checked; store.set("etapas-feitas", done); c.closest(".step").classList.toggle("done", c.checked); });
    if (location.hash && document.getElementById(open)) setTimeout(() => document.getElementById(open).scrollIntoView(), 50);
  }

  function accessSim(host) {
    const { esc, refBtn, IDX, K, T } = U(); const A = K.acesso, L = T.acesso;
    const passo = (id) => A.passos.find((p) => p.id === id);
    let cur = "aprovar";
    function draw() {
      const d = A.desfechos.find((x) => x.id === cur);
      host.innerHTML = `<div class="toolbar"><div class="chips" role="group" aria-label="${esc(L.escolhaAria)}">${A.desfechos.map((x) => `<button type="button" class="chip" data-out="${x.id}" aria-pressed="${x.id === cur}">${esc(x.nome)}</button>`).join("")}</div><span class="pill-note">${esc(L.dica)}</span></div>
        <div class="flow" aria-live="polite">${d.caminho.map(passo).map((p, i) => `<div class="fstep on"><span class="n">${String(i + 1).padStart(2, "0")} · ${refBtn("papel:" + p.papel, IDX.papel[p.papel].nome)}</span><b>${esc(p.titulo)}</b><small>${esc(p.texto)}</small></div>`).join("")}</div>
        <div class="flow-out"><div><span class="eyebrow">${esc(L.registro)}</span><p class="mt-s">${esc(d.registro)}</p></div><div><span class="eyebrow">${esc(L.porque)}</span><p class="mt-s">${esc(d.nota)}</p></div></div>
        <details class="mt-m"><summary class="btn-line" style="cursor:pointer">${esc(L.excecaoPergunta)}</summary><p class="mt-s" style="max-width:70ch">${esc(A.excecao)} ${refBtn("modelo:decisao", L.usarRegistro)}</p></details>`;
    }
    host.addEventListener("click", (e) => { const b = e.target.closest("[data-out]"); if (b) { cur = b.dataset.out; draw(); host.querySelector(`[data-out="${cur}"]`).focus(); } });
    draw();
  }

  function rhythm(host) { const { esc, K } = U(); host.innerHTML = K.ritmo.map((r) => `<div class="cell"><span class="n">${esc(r.quando)}</span><p>${esc(r.oque)}</p></div>`).join(""); }

  function checklist(host) {
    const { esc, store, copy, IDX, K, T, fmt } = U(); const C = T.check;
    const st = store.get("checklist2", {});
    function draw() {
      const n = K.checklist.length; const ok = K.checklist.filter((c) => st[c.id]).length; const next = K.checklist.filter((c) => !st[c.id]);
      host.innerHTML = `<div class="check-list">${K.checklist.map((c) => `<label><input type="checkbox" data-ck="${c.id}" ${st[c.id] ? "checked" : ""}><span>${esc(c.t)}<br><span class="muted small">${esc(IDX.etapa[c.etapa].cliente)}</span></span></label>`).join("")}</div>
        <div class="check-out" aria-live="polite"><span class="eyebrow">${esc(C.resumo)}</span><h3>${esc(fmt(C.itens, { ok, n }))}</h3><div class="meter" aria-hidden="true"><i style="width:${(ok / n) * 100}%"></i></div>
        ${next.length ? `<p class="small muted">${esc(C.proximas)}</p><ol>${next.slice(0, 4).map((c) => `<li>${esc(c.acao)}</li>`).join("")}</ol>${next.length > 4 ? `<p class="small muted">${esc(fmt(C.eMais, { n: next.length - 4 }))}</p>` : ""}` : `<p>${esc(C.tudo)}</p>`}
        <div class="row"><button type="button" class="btn" data-ck-copy>${esc(C.copiar)}</button><button type="button" class="btn-line" data-ck-clear>${esc(C.limpar)}</button></div>
        <p class="nota">${esc(C.nota)}</p></div>`;
    }
    function summary() {
      const lines = [C.titulo, ""]; K.checklist.forEach((c) => lines.push((st[c.id] ? "[x] " : "[ ] ") + c.t));
      const next = K.checklist.filter((c) => !st[c.id]); if (next.length) { lines.push("", C.proximasTxt); next.forEach((c, k) => lines.push(`${k + 1}. ${c.acao}`)); }
      return lines.join("\n");
    }
    host.addEventListener("change", (e) => { const c = e.target.closest("[data-ck]"); if (!c) return; st[c.dataset.ck] = c.checked; store.set("checklist2", st); const i = c.dataset.ck; draw(); host.querySelector(`[data-ck="${i}"]`).focus(); });
    host.addEventListener("click", (e) => {
      if (e.target.closest("[data-ck-copy]")) copy(summary(), T.toast.resumoCopiado);
      if (e.target.closest("[data-ck-clear]")) { Object.keys(st).forEach((k) => delete st[k]); store.set("checklist2", st); draw(); }
    });
    draw();
  }

  /* ================= Implementação ================= */
  function pathChooser(host) {
    const { esc, K, T } = U(); const C = T.caminho;
    let sel = null; const ans = {}; const keys = ["catalogo", "lakehouse", "pequeno"];
    const rec = () => ans.pequeno === "sim" ? "pequeno" : ans.lakehouse === "sim" ? "referencia" : ans.catalogo === "sim" ? "existente" : null;
    function draw() {
      const r = rec(); const show = sel || r; const c = K.caminhos.find((x) => x.id === show);
      host.innerHTML = `<div class="two"><div class="stack"><span class="eyebrow">${esc(C.eyebrow)}</span>
          ${keys.map((k, i) => `<div class="stack" style="gap:8px"><p>${esc(C.perguntas[i])}</p><div class="seg-ctrl" role="group" aria-label="${esc(C.perguntas[i])}">${["sim", "nao"].map((v) => `<button type="button" data-q="${k}" data-v="${v}" aria-pressed="${ans[k] === v}">${esc(C[v])}</button>`).join("")}</div></div>`).join("")}
          ${r ? `<p class="small">${esc(C.sugestao)} <b>${esc(K.caminhos.find((x) => x.id === r).nome)}</b>. ${esc(C.combinados)}</p>` : `<p class="small muted">${esc(C.responda)}</p>`}</div>
        <div class="stack"><div class="path-pick" style="grid-template-columns:minmax(0,1fr)">${K.caminhos.map((x, i) => `<button type="button" data-path="${x.id}" aria-pressed="${show === x.id}"><span class="mono">0${i + 1}${r === x.id ? " · " + esc(C.sugerido) : ""}</span><b style="font-weight:400;font-size:19px">${esc(x.nome)}</b><span class="muted small">${esc(x.quando)}</span></button>`).join("")}</div>
          ${c ? `<div class="panel stack" aria-live="polite"><p>${esc(c.como)}</p><p class="small"><b>${esc(C.cuidado)}</b> ${esc(c.cuidado)}</p></div>` : ""}</div></div>`;
    }
    host.addEventListener("click", (e) => {
      const q = e.target.closest("[data-q]"); if (q) { ans[q.dataset.q] = q.dataset.v; sel = null; draw(); return; }
      const p = e.target.closest("[data-path]"); if (p) { sel = p.dataset.path; draw(); host.querySelector(`[data-path="${sel}"]`).focus(); }
    });
    draw();
  }

  function architecture(host, onPick) {
    const { esc, IDX, K } = U(); let sel = null;
    function draw() {
      host.innerHTML = `<div class="arch">${K.camadasArq.map((l) => `<button type="button" data-layer="${l.id}" aria-pressed="${sel === l.id}"><span class="lyr">${esc(l.nome)}</span><span class="small">${esc(l.desc)}<span class="chips-mini mt-s">${l.tools.map((t) => `<span>${esc(IDX.ferramenta[t].nome)}</span>`).join("")}</span></span><span class="mono muted">${l.mods.map((m) => IDX.modulo[m].nome.replace("KDV ", "")).join(" · ")}</span></button>`).join("")}</div>`;
    }
    host.addEventListener("click", (e) => { const b = e.target.closest("[data-layer]"); if (!b) return; sel = sel === b.dataset.layer ? null : b.dataset.layer; draw(); const l = K.camadasArq.find((x) => x.id === sel); onPick(l ? l.tools : null, l ? l.nome : null); });
    document.addEventListener("kdv:layer-clear", () => { sel = null; draw(); });
    draw();
  }
  function toolsGrid(host) {
    const { esc, IDX, K, T } = U(); const F = T.ferramentas;
    let etapa = "todas", only = null, onlyName = "";
    const etapas = [["todas", F.todas]].concat(ETAPAS4.map((e) => [e, IDX.etapa[e].kdv])).concat([["base", F.baseComum]]);
    function draw() {
      const list = K.ferramentas.filter((f) => (etapa === "todas" || f.etapa === etapa) && (!only || only.includes(f.id)));
      host.innerHTML = `<div class="toolbar"><div class="chips" role="group" aria-label="${esc(F.etapaAria)}">${etapas.map(([k, l]) => `<button type="button" class="chip" data-fe="${k}" aria-pressed="${etapa === k}">${esc(l)}</button>`).join("")}</div></div>
        ${only ? `<p class="small mt-s">${esc(F.mostrando)} <b>${esc(onlyName)}</b>. <button type="button" class="ref" data-clear-layer>${esc(F.mostrarTodas)}</button></p>` : ""}
        <p class="small muted" aria-live="polite" style="margin:8px 0 14px">${list.length} ${esc(list.length === 1 ? F.um : F.varios)}</p>
        <div class="grid g3">${list.map((f) => `<button type="button" class="cell click tcard" data-ref="ferramenta:${f.id}"><b style="font-weight:500">${esc(f.nome)}</b><span class="small muted">${esc(f.funcao)}</span><span class="meta"><span class="tag">${esc(f.etapa === "base" ? F.baseComum : IDX.etapa[f.etapa].kdv)}</span></span></button>`).join("") || `<p class="cell muted">${esc(F.nenhum)}</p>`}</div>`;
    }
    host.addEventListener("click", (e) => {
      const a = e.target.closest("[data-fe]"); if (a) { etapa = a.dataset.fe; draw(); return; }
      if (e.target.closest("[data-clear-layer]")) { only = null; draw(); document.dispatchEvent(new CustomEvent("kdv:layer-clear")); }
    });
    draw();
    return { layer(ids, name) { only = ids; onlyName = name; draw(); } };
  }

  /* ================= Recursos ================= */
  function modelsGrid(host) {
    const { esc, IDX, filesHTML, K, T } = U(); const R = T.recursos;
    let f = "todas";
    function draw() {
      const list = K.modelos.filter((m) => f === "todas" || m.etapas.includes(f));
      host.innerHTML = `<div class="toolbar"><div class="chips" role="group" aria-label="${esc(R.filtroAria)}">${[["todas", R.todasEtapas]].concat(K.etapas.map((s) => [s.id, s.cliente])).map(([k, l]) => `<button type="button" class="chip" data-mf="${k}" aria-pressed="${f === k}">${esc(l)}</button>`).join("")}</div></div>
        <div class="grid g3">${list.map((m) => `<article class="cell"><span class="n">${m.n} · ${esc(IDX.camada[m.camada].nome)}</span><h3>${esc(m.nome)}</h3><p class="muted small">${esc(m.para)}</p>
          <div class="row">${m.etapas.map((e) => `<span class="tag">${esc(IDX.etapa[e].kdv)}</span>`).join("")}</div>
          ${filesHTML(m)}<button type="button" class="btn-line" style="align-self:flex-start;margin-top:auto" data-ref="modelo:${m.id}">${esc(R.verExemplo)}</button></article>`).join("")}</div>
        ${T.officeNota ? `<p class="nota">${esc(T.officeNota)}</p>` : ""}`;
    }
    host.addEventListener("click", (e) => { const b = e.target.closest("[data-mf]"); if (b) { f = b.dataset.mf; draw(); host.querySelector(`[data-mf="${f}"]`).focus(); } });
    draw();
  }
  function canvasGen(host) {
    const { esc, copy, toast, T } = U(); const C = T.canvas; const keys = Object.keys(C.campos);
    host.innerHTML = `<div class="two"><form class="canvas-form" id="cv-form" method="dialog" novalidate>${keys.map((k) => `<label for="cv-${k}">${esc(C.campos[k][0])}${k === "classificacao" ? `<select id="cv-${k}" name="${k}">${C.classes.map((c, i) => `<option${i === 1 ? " selected" : ""}>${esc(c)}</option>`).join("")}</select>` : `<input id="cv-${k}" name="${k}" type="text" placeholder="${esc(C.campos[k][1])}">`}</label>`).join("")}
      <div class="full row"><button type="submit" class="btn">${esc(C.baixar)}</button><button type="button" class="btn-line" id="cv-copy">${esc(C.copiar)}</button></div></form>
      <div class="panel stack" aria-live="polite"><span class="eyebrow">${esc(C.previa)}</span><pre id="cv-prev" style="white-space:pre-wrap;font:13.5px/1.6 var(--mono);margin:0"></pre></div></div>`;
    const form = host.querySelector("#cv-form");
    const text = () => { const d = Object.fromEntries(new FormData(form)); const v = (k) => d[k] || `${C.campos[k][1]} ${C.exemplo}`; return `# ${C.titulo} — ${v("nome")}\n\n${keys.filter((k) => k !== "nome").map((k) => `- ${C.campos[k][0]}: ${k === "classificacao" ? d[k] : v(k)}`).join("\n")}\n\n${C.proximo}\n${C.rodape}`; };
    const upd = () => { host.querySelector("#cv-prev").textContent = text(); };
    form.addEventListener("input", upd);
    form.addEventListener("submit", (e) => { e.preventDefault(); try { const a = document.createElement("a"); const downloadUrl=URL.createObjectURL(new Blob([text()], { type: "text/markdown;charset=utf-8" })); a.href=downloadUrl; a.download = C.arquivo; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(downloadUrl),1000); toast(T.toast.canvasBaixado); } catch (err) { copy(text(), T.toast.semDownload); } });
    host.querySelector("#cv-copy").addEventListener("click", () => copy(text(), T.toast.canvasCopiado));
    upd();
  }
  function diagramsGrid(host) {
    const { esc, K, T, ROOT } = U(); const D = T.diagramas;
    host.innerHTML = K.diagramas.filter(d=>K.ux.implementationEnabled||d.id!=="D5").map((d) => { const f = ROOT + "assets/ux/" + d.arquivo; const c = D[d.id]; return `<div class="cell"><button type="button" style="all:unset;cursor:zoom-in;display:block" data-lightbox="${f}.png" data-caption="${esc(c)}" aria-label="${esc(D.ampliar)} ${esc(c)}"><img src="${f}.png" alt="${esc(c)}" loading="lazy" style="border:1px solid var(--line);background:#fff;aspect-ratio:16/10;object-fit:contain;width:100%"></button><span class="n">${d.id}</span><p class="small">${esc(c)}</p><div class="files"><a href="${f}.svg" download>${esc(D.svg)}</a><a href="${f}.png" download>${esc(D.png)}</a></div></div>`; }).join("")
      + (D.nota ? `<p class="cell nota" style="grid-column:1/-1">${esc(D.nota)}</p>` : "");
  }

  /* ================= Documentação ================= */
  function reader(root) {
    const { esc, rich, IDX, store, refChip, tabsHTML, filesHTML, K, T, ROOT } = U(); const D = T.docs;
    const order = K.grupos.flatMap((g) => K.guias.filter((x) => x.grupo === g.id).map((x) => x.id));
    const read = store.get("lidos", {});
    const R = {
      preparacao: () => { const s = IDX.etapa.preparar; return `<section><h3>${esc(D.perguntasTitulo)}</h3><div class="grid g2">${s.perguntas.map((p, i) => `<div class="cell"><span class="n">P${i + 1}</span><h4>${esc(p[0])}</h4><p>${esc(p[1])}</p></div>`).join("")}</div></section>`; },
      glossario: () => `<section><label class="sr" for="gl-q">${esc(D.glossFiltro)}</label><input class="glossary-search" id="gl-q" type="search" placeholder="${esc(D.glossPlaceholder)}"><div class="tbl-wrap mt-s"><table class="tbl" id="gl-t"><thead><tr><th>${esc(D.thTermo)}</th><th>${esc(D.thKdvMercado)}</th><th>${esc(D.thOque)}</th></tr></thead><tbody>${[
          ...K.conceitos.map((c) => [`conceito:${c.id}`, c.cliente, `${c.kdv} · ${c.mercado}`, c.frase]),
          ...K.papeis.map((p) => [`papel:${p.id}`, p.nome, p.mercado, p.resp]),
          ...K.termos.map((t) => [`termo:${t.id}`, t.cliente, t.mercado, t.def])
        ].sort((a, b) => a[1].localeCompare(b[1], K.code)).map((r) => `<tr class="rowclick" data-ref="${r[0]}" tabindex="0"><td class="first">${esc(r[1])}</td><td class="small mono">${esc(r[2])}</td><td class="small">${esc(r[3])}</td></tr>`).join("")}</tbody></table></div></section>`,
      "baseline-camadas": () => `<section><h3>${esc(D.minimo)}</h3><div class="baseline">${K.baseline.map((b, i) => `<button type="button" data-ref="base:${b.id}"><span class="n">0${i + 1}</span><b>${esc(b.nome)}</b><span class="why">${esc(b.porque)}</span></button>`).join("")}</div></section>
        <section><h3>${esc(D.cinco)}</h3><div class="acc">${K.camadas.map((c, i) => `<details><summary><span class="n">0${i + 1}</span><span><b style="font-weight:500">${esc(c.nome)}</b> <span class="muted">· ${esc(c.pergunta)}</span></span><span class="plus" aria-hidden="true"></span></summary><div class="acc-body"><p>${esc(c.resumo)}</p><ul class="mt-s">${ETAPAS4.map((e) => `<li><b>${esc(IDX.etapa[e].kdv)}:</b> ${esc(c.celulas[e][1])}</li>`).join("")}</ul></div></details>`).join("")}</div></section>`,
      conceitos: () => `<section><h3>${esc(D.seisConceitos)}</h3><div class="grid g2">${K.conceitos.map((c) => `<button type="button" class="cell click" data-ref="conceito:${c.id}"><span class="row"><span class="tag kdv">${esc(c.kdv)}</span>${c.opcional ? `<span class="tag">${esc(T.painel.opcional)}</span>` : ""}</span><h4>${esc(c.cliente)}</h4><p class="small muted">${esc(c.frase)}</p><span class="go">${esc(D.verDetalhe)}</span></button>`).join("")}</div><button type="button" class="btn-line arrow mt-s" style="align-self:flex-start" data-lightbox="${ROOT}assets/ux/D2_anatomia_ecossistema_arquitetura.png" data-caption="${esc(T.diagramas.D2)}">${esc(D.verAnatomia)}</button></section>`,
      raci: () => `<section><h3>${esc(D.quemFaz)}</h3><div id="doc-raci"></div></section>`,
      etapas: () => `<section><h3>${esc(D.etapasUmaUma)}</h3><div class="acc">${K.etapas.map((s) => `<details><summary><span class="n">${s.n}</span><span><b style="font-weight:500">${esc(s.cliente)}</b> <span class="muted">· ${esc(s.kdv)}</span></span><span class="plus" aria-hidden="true"></span></summary><div class="acc-body">${tabsHTML(U().view("etapa:" + s.id).tabs, { label: s.cliente })}</div></details>`).join("")}</div><button type="button" class="btn-line arrow mt-s" style="align-self:flex-start" data-lightbox="${ROOT}assets/ux/D3_processo_jornada_do_dado.png" data-caption="${esc(T.diagramas.D3)}">${esc(D.verJornada)}</button></section>`,
      "modelo:contrato": () => `<section><h3>${esc(D.modeloBaixar)}</h3>${filesHTML(IDX.modelo.contrato)}<button type="button" class="btn-line" style="align-self:flex-start" data-ref="modelo:contrato">${esc(D.verContrato)}</button></section>`,
      acesso: () => `<section><h3>${esc(D.simule)}</h3><div id="doc-acesso"></div></section>`,
      ritmo: () => `<section><h3>${esc(D.ritmo)}</h3><div class="grid g3">${K.ritmo.map((r) => `<div class="cell"><span class="n">${esc(r.quando)}</span><p>${esc(r.oque)}</p></div>`).join("")}</div></section>`,
      caminhos: () => `<section><h3>${esc(D.tresPontos)}</h3><div class="grid g3">${K.caminhos.map((c) => `<div class="cell"><h4>${esc(c.nome)}</h4><p class="small">${esc(c.como)}</p><p class="small muted">${esc(c.cuidado)}</p></div>`).join("")}</div><a class="btn-line arrow" style="align-self:flex-start" href="implementacao.html">${esc(D.verImplementacao)}</a></section>`,
      "exemplo-etapas": () => `<section><h3>${esc(D.conselhoEtapas)}</h3><div class="acc">${K.etapas.map((s) => `<details><summary><span class="n">${s.n}</span><span>${esc(s.cliente)} <span class="muted">· ${esc(s.kdv)}</span></span><span class="plus" aria-hidden="true"></span></summary><div class="acc-body"><p>${esc(s.exemplo)}</p></div></details>`).join("")}</div></section>`,
      referenciais: () => `<section><div id="doc-refs"></div></section>`
    };
    const refsIn = (g) => Array.from(new Set(Array.from(JSON.stringify(g.secoes || "").matchAll(/\{\{([a-z]+:[a-z0-9-]+)\|/g)).map((m) => m[1])));
    function trilhaBar(gid) {
      const p = IDX.persona[store.get("perfil", null)];
      if (!p) return `<div class="trilha-bar"><div class="row"><b>${esc(D.leiaFuncao)}</b><span class="muted small">${esc(D.escolhaPerfil)}</span></div><div class="chips">${K.personas.map((x) => `<button type="button" class="chip" data-persona-set="${x.id}">${esc(x.curto)}</button>`).join("")}</div></div>`;
      const done = p.trilha.filter((g) => read[g]).length;
      return `<div class="trilha-bar"><div class="row"><b>${esc(D.trilha)} ${esc(p.curto)}</b><span class="mono muted">${done}/${p.trilha.length} ${esc(D.lidos)}</span></div><div class="meter" aria-hidden="true"><i style="width:${(done / p.trilha.length) * 100}%"></i></div><div class="trail">${p.trilha.map((g) => `<a href="#${g}"${g === gid ? ' aria-current="true" style="border-color:var(--ink)"' : ""}>${esc(IDX.guia[g].titulo)}${read[g] ? " ✓" : ""}</a>`).join("")}</div></div>`;
    }
    function show(gid, focus) {
      const g = IDX.guia[gid] || IDX.guia[order[0]];
      read[g.id] = true; store.set("lidos", read);
      const i = order.indexOf(g.id); const prev = order[i - 1], next = order[i + 1];
      const grupo = K.grupos.find((x) => x.id === g.grupo).nome;
      const secs = (g.secoes || []).map(([t, h], k) => `<section id="s-${k}"><h3>${esc(t)}</h3><div class="prose">${/^\s*</.test(h) ? rich(h) : `<p>${rich(h)}</p>`}</div></section>`).join("");
      const refs = refsIn(g);
      root.querySelector("#toc").innerHTML = K.grupos.map((gr) => `<div><h5>${esc(gr.nome)}</h5>${K.guias.filter((x) => x.grupo === gr.id).map((x) => `<a href="#${x.id}"${x.id === g.id ? ' aria-current="true"' : ""} class="${read[x.id] ? "read" : ""}">${esc(x.titulo)}</a>`).join("")}</div>`).join("");
      root.querySelector("#guide").innerHTML = `${trilhaBar(g.id)}<header class="guide-head"><span class="eyebrow">${esc(D.documentacao)} · ${esc(grupo)}</span><h2 id="guide-title" tabindex="-1">${esc(g.titulo)}</h2><p class="lead">${esc(g.resumo)}</p></header>
        ${secs}${g.render && R[g.render] ? R[g.render]() : ""}
        ${g.proximo ? `<section><h5 class="mono muted" style="margin:0;text-transform:uppercase">${esc(D.continuar)}</h5><div class="chips">${g.proximo.map((p) => `<a class="chip" href="#${p}" style="text-decoration:none">${esc(IDX.guia[p].titulo)} →</a>`).join("")}</div></section>` : ""}
        <nav class="guide-foot" aria-label="${esc(D.pagerAria)}">${prev ? `<a href="#${prev}"><small>${esc(D.anterior)}</small>${esc(IDX.guia[prev].titulo)}</a>` : "<span></span>"}${next ? `<a href="#${next}" style="text-align:right"><small>${esc(D.seguinte)}</small>${esc(IDX.guia[next].titulo)}</a>` : ""}</nav>`;
      root.querySelector("#aside").innerHTML = `${refs.length ? `<h5>${esc(D.citados)}</h5><p class="small muted">${esc(D.citadosDica)}</p><div class="chips">${refs.map((r) => refChip(r)).join("")}</div>` : ""}
        ${(g.secoes || []).length > 1 ? `<h5 class="mt-m">${esc(D.nestaPagina)}</h5>${g.secoes.map(([t], k) => `<a class="small" style="display:block;padding:3px 0" href="#s-${k}" data-inpage>${esc(t)}</a>`).join("")}` : ""}
        <h5 class="mt-m">${esc(D.fonte)}</h5><a class="small" href="${K.meta.github}" target="_blank" rel="noopener">${esc(D.verRepo)}</a>`;
      if (g.render === "raci") roles(root.querySelector("#doc-raci"), "raci");
      if (g.render === "acesso") accessSim(root.querySelector("#doc-acesso"));
      if (g.render === "referenciais") referenciais(root.querySelector("#doc-refs"));
      const q = root.querySelector("#gl-q");
      if (q) {
        const nz = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
        q.addEventListener("input", () => { const n = nz(q.value); root.querySelectorAll("#gl-t tbody tr").forEach((tr) => { tr.hidden = n && !nz(tr.textContent).includes(n); }); });
        root.querySelector("#gl-t").addEventListener("keydown", (e) => { const r = e.target.closest("tr[data-ref]"); if (r && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); U().openRef(r.dataset.ref); } });
      }
      document.title = g.titulo + D.tituloSufixo;
      if (focus) { window.scrollTo({ top: 0 }); root.querySelector("#guide-title").focus({ preventScroll: true }); }
    }
    function route(focus) {
      const h = decodeURIComponent(location.hash.slice(1));
      if (h.startsWith("ver=") || h.startsWith("s-")) return;
      const p = IDX.persona[store.get("perfil", null)];
      show(IDX.guia[h] ? h : (p ? p.trilha[0] : order[0]), focus);
    }
    const tocD = root.querySelector(".toc-d"); if (tocD) tocD.open = window.innerWidth > 780;
    root.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-inpage]"); if (a) { e.preventDefault(); const t = document.getElementById(a.getAttribute("href").slice(1)); t && t.scrollIntoView({ behavior: "smooth" }); }
      if (e.target.closest("#toc a") && window.innerWidth <= 780 && tocD) tocD.open = false;
    });
    window.addEventListener("hashchange", () => route(true));
    document.addEventListener("kdv:persona", () => route(false));
    route(false);
  }

  /* ================= registro das páginas ================= */
  const on = (id, fn) => { const el = document.getElementById(id); if (el) fn(el); return el; };
  window.KDVPages = {
    home() { on("hexmap", hexmap); on("recog", recognize); on("stages", stagesInline); on("baseline", baselineRow); on("translation", translation); on("cases", casesTabs); on("paths-mini", pathsMini); },
    "para-quem"() { on("nichos", nichosGrid); on("personas", personasGrid); document.addEventListener("kdv:persona", () => on("personas", personasGrid)); },
    modelo() { on("explorer", explorer); on("matrix", matrix); on("roles", (h) => roles(h)); on("modules", modulesGrid); on("refs", referenciais); },
    playbook() { on("steps", stepsFull); on("access", accessSim); on("rhythm", rhythm); on("check-ui", checklist); },
    implementacao() {
      on("chooser", pathChooser);
      let tg; on("tools", (h) => { tg = toolsGrid(h); });
      on("arch", (h) => architecture(h, (ids, name) => { tg && tg.layer(ids, name); if (ids) document.getElementById("ferramentas").scrollIntoView({ behavior: "smooth" }); }));
      on("modules", modulesGrid);
    },
    recursos() { on("models", modelsGrid); on("canvas-ui", canvasGen); on("diagrams", diagramsGrid); },
    documentacao() {},
    comunidade() { on("brands", (h) => { const { esc, K } = U(); h.innerHTML = K.marcas.map((m) => `<div><b style="font-weight:500">${esc(m.nome)}</b><span class="small muted">${esc(m.papel)}</span></div>`).join(""); }); },
    privacidade() {}
  };
})();
