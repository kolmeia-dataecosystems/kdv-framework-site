/* KDV Framework — núcleo de interação (multilíngue).
   O detalhe abre no lugar (painel lateral, abas, sanfonas).
   Só se troca de página quando o visitante pede o guia completo. */
(function () {
  "use strict";

  /* ---------- mescla: estrutura comum + textos do idioma ---------- */
  function merge(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length && a[0] && typeof a[0] === "object" && "id" in a[0]) {
        const m = Object.fromEntries(b.filter((x) => x && x.id).map((x) => [x.id, x]));
        return a.map((x) => (m[x.id] ? merge(x, m[x.id]) : x));
      }
      return b;
    }
    if (a && b && typeof a === "object" && typeof b === "object" && !Array.isArray(a)) {
      const o = Object.assign({}, a);
      for (const k in b) o[k] = k in a ? merge(a[k], b[k]) : b[k];
      return o;
    }
    return b === undefined ? a : b;
  }
  const K = (window.KDV = window.KDV_DATA);
  const T = K.ui;
  const LANG = K.code;
  const ROOT = "/";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmt = (s, o) => String(s).replace(/\{(\w+)\}/g, (_, k) => (k in o ? o[k] : ""));
  const memory = {};
  const store = {
    get(k, d) { if (!["tema", "perfil"].includes(k)) return memory[k] ?? d; try { const v = localStorage.getItem("kdv:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { if (!["tema", "perfil"].includes(k)) { memory[k]=v; return; } try { localStorage.setItem("kdv:" + k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------- índices ---------- */
  const by = (arr) => Object.fromEntries(arr.map((x) => [x.id, x]));
  const IDX = {
    conceito: by(K.conceitos), papel: by(K.papeis), etapa: by(K.etapas), camada: by(K.camadas), base: by(K.baseline),
    termo: by(K.termos), ferramenta: by(K.ferramentas), modulo: by(K.modulos), modelo: by(K.modelos),
    persona: by(K.personas), nicho: by(K.nichos), caso: by(K.casos), guia: by(K.guias)
  };
  function get(ref) { const [t, id] = String(ref).split(":"); return { t, id, x: IDX[t] && IDX[t][id] }; }
  function titleOf(ref) {
    const { t, x } = get(ref); if (t === "contato") return T.contato.titulo; if (!x) return ref;
    return x.cliente || x.nome || x.titulo || x.rotulo || x.id;
  }
  function shortOf(ref) {
    const { x } = get(ref); if (!x) return "";
    return x.frase || x.def || x.resp || x.porque || x.funcao || x.faz || x.para || x.resumo || x.dor || x.responde || x.texto || "";
  }
  const guideHref = (id) => `/${LANG}/docs/${K.ux.slugs[id] || id}/`;
  const empresaHref = () => K.meta.siteEmpresa[LANG] || K.meta.siteEmpresa.en;

  function rich(s) {
    return String(s ?? "").replace(/\{\{([a-z]+:[a-z0-9-]+)\|([^}]+)\}\}/g, (_, ref, txt) => `<button type="button" class="ref" data-ref="${ref}">${txt}</button>`);
  }
  function refBtn(ref, label) { return `<button type="button" class="ref" data-ref="${ref}">${esc(label || titleOf(ref))}</button>`; }
  function refChip(ref, label) { return `<button type="button" class="chip" data-ref="${ref}">${esc(label || titleOf(ref))}</button>`; }
  function list(arr) { return "<ul>" + arr.map((x) => `<li>${rich(x)}</li>`).join("") + "</ul>"; }

  /* arquivos dos modelos: Markdown e CSV no idioma; Word e Excel em PT-BR */
  function modelFiles(m) {
    const f = { md: `/templates/${LANG}/${m.md}.md`, docx: `/templates/office/pt-br/${m.office}.docx`, xlsx: `/templates/office/pt-br/${m.office}.xlsx` };
    if (m.csv) f.csv = `/templates/${LANG}/evidence-worksheet.csv`;
    return f;
  }
  function filesHTML(m) {
    const a = modelFiles(m); const suf = LANG === "pt-br" ? "" : " · PT-BR";
    return `<div class="files">${Object.keys(a).map((k) => `<a href="${a[k]}" download>${esc(T.arquivos[k])}${["docx", "xlsx"].includes(k) ? suf : ""} ↓</a>`).join("")}</div>`;
  }

  /* ---------- abas ---------- */
  let tabSeq = 0;
  function tabsHTML(items, opts = {}) {
    const id = "tb" + (++tabSeq);
    const sel = Math.max(0, items.findIndex((t) => t.on));
    const head = items.map((t, i) => `<button type="button" role="tab" id="${id}-t${i}" aria-controls="${id}-p${i}" aria-selected="${i === sel}" tabindex="${i === sel ? 0 : -1}">${esc(t.label)}</button>`).join("");
    const body = items.map((t, i) => `<div role="tabpanel" class="tabpanel" id="${id}-p${i}" aria-labelledby="${id}-t${i}" ${i === sel ? "" : "hidden"}>${t.html}</div>`).join("");
    return `<div class="tabset ${opts.cls || ""}"><div class="tabs" role="tablist" aria-label="${esc(opts.label || "")}">${head}</div>${body}</div>`;
  }
  function selectTab(btn) {
    const set = btn.closest(".tabset"); if (!set) return;
    $$(':scope > .tabs [role="tab"]', set).forEach((b) => { const on = b === btn; b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1; $("#" + b.getAttribute("aria-controls")).hidden = !on; });
  }
  document.addEventListener("click", (e) => { const b = e.target.closest('[role="tab"]'); if (b && b.closest(".tabset")) selectTab(b); });
  document.addEventListener("keydown", (e) => {
    const b = e.target.closest && e.target.closest('[role="tab"]'); if (!b || !b.closest(".tabset")) return;
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    const all = $$('[role="tab"]', b.parentElement); let i = all.indexOf(b);
    i = e.key === "ArrowRight" ? (i + 1) % all.length : e.key === "ArrowLeft" ? (i - 1 + all.length) % all.length : e.key === "Home" ? 0 : all.length - 1;
    all[i].focus(); selectTab(all[i]); e.preventDefault();
  });

  /* ---------- conteúdo do painel ---------- */
  const P = T.painel;
  const ETAPAS5 = ["preparar", "cultivar", "governar", "compartilhar", "ativar"];
  const VIEW = {
    conceito(x) {
      return { kicker: `<span class="tag kdv">${esc(x.kdv)}</span>${x.opcional ? `<span class="tag">${esc(P.opcional)}</span>` : ""}`, title: x.cliente, one: x.frase,
        tabs: [
          { label: P.comoFunciona, html: `<p>${rich(x.como)}</p><h5>${esc(P.exemplo)}</h5><p>${esc(x.exemplo)}</p>` },
          { label: P.quemResponde, html: x.papeis.map((p) => `<p>${refBtn("papel:" + p)} — ${esc(IDX.papel[p].resp)}</p>`).join("") },
          { label: P.evidencias, html: `<p class="muted small">${esc(P.evidenciasIntro)}</p>${list(x.evidencias)}` },
          { label: P.termos, html: `<p><b>${esc(P.noMercado)}</b> ${esc(x.mercado)}</p><p><b>${esc(P.noKdv)}</b> ${esc(x.kdv)}</p><div class="analogy"><b>${esc(P.porQueNome)}</b> ${esc(x.analogia)}</div>` }
        ], related: x.relacionados, guide: "anatomia" };
    },
    papel(x) {
      return { kicker: `<span class="tag">${esc(x.escopo)}</span>`, title: x.nome, one: x.resp,
        tabs: [
          { label: P.emCadaEtapa, html: `<table class="tbl" style="min-width:0"><tbody>${ETAPAS5.map((e) => `<tr><td>${refBtn("etapa:" + e)}</td><td><b>${x.raci[e] || "—"}</b> ${x.raci[e] ? "· " + esc(T.raci[x.raci[e]]) : ""}</td></tr>`).join("")}</tbody></table><p class="nota">${esc(T.raciNota)}</p>` },
          { label: P.ondeTrabalha, html: `<p><b>${esc(P.escopo)}</b> ${esc(x.escopo)}</p><p><b>${esc(P.interfaceRef)}</b> ${refBtn("modulo:" + x.modulo, x.interface)}</p><p class="muted small">${esc(P.interfaceNota)}</p>` },
          { label: P.noMercadoAba, html: `<p>${esc(x.mercado)}</p>` }
        ], related: K.conceitos.filter((c) => c.papeis.includes(x.id)).map((c) => "conceito:" + c.id), guide: "papeis" };
    },
    etapa(x) {
      const t = [];
      if (x.perguntas) t.push({ label: P.perguntas, html: x.perguntas.map((p, i) => `<p><span class="mono">P${i + 1}</span> <b>${esc(p[0])}.</b> ${esc(p[1])}</p>`).join("") + `<h5>${esc(P.criterios)}</h5>${list(x.criterios)}` });
      if (x.praticas) t.push({ label: P.oQueFazer, html: `<p><b>${esc(P.comecaQuando)}</b> ${esc(x.entrada)}</p>${list(x.praticas)}` });
      t.push({ label: P.quem, html: `<div class="who">${x.participantes.map((p) => refChip("papel:" + p)).join("")}</div>` });
      t.push({ label: P.evidencia, html: `${list(x.evidencia)}<p><b>${esc(P.pontoDecisao)}</b> ${esc(x.decisao)}</p><p><b>${esc(P.medidas)}</b> ${esc(x.medidas)}</p>` });
      t.push({ label: P.modelos, html: x.modelos.map((m) => `<p>${refBtn("modelo:" + m)}</p>${filesHTML(IDX.modelo[m])}`).join("") });
      t.push({ label: P.naImplementacao, html: `<p>${rich(x.impl)}</p>` });
      t.push({ label: P.noExemplo, html: `<p>${esc(x.exemplo)}</p>` });
      return { kicker: `<span class="tag">${esc(P.etapa)} ${x.n}</span><span class="tag kdv">${esc(x.kdv)}</span>`, title: x.cliente, one: x.frase, tabs: t, related: [], guide: "ciclo",
        extra: `<a class="btn-line arrow" href="playbook.html#${x.id}">${esc(P.verNoPlaybook)}</a>` };
    },
    camada(x) {
      return { kicker: "", title: x.nome, one: x.pergunta + " " + x.resumo,
        tabs: [{ label: P.emCadaEtapa, html: Object.entries(x.celulas).map(([e, c]) => `<p>${refBtn("etapa:" + e)} · <b>${esc(c[0])}</b><br><span class="muted">${esc(c[1])}</span></p>`).join("") }],
        related: K.baseline.filter((b) => b.camada === x.id).map((b) => "base:" + b.id), guide: "principios" };
    },
    base(x) {
      return { kicker: "", title: x.nome, one: x.porque,
        tabs: [{ label: P.comoVerificar, html: `<p>${esc(x.verificar)}</p>` }, { label: P.evidencia, html: `<p>${esc(x.evidencia)}</p>` }, { label: P.modelo, html: `<p>${refBtn("modelo:" + x.modelo)}</p>${filesHTML(IDX.modelo[x.modelo])}` }],
        related: ["camada:" + x.camada, "termo:baseline"], guide: "principios" };
    },
    termo(x) { return { kicker: "", title: x.cliente, one: x.def, tabs: [{ label: P.noMercadoAba, html: `<p>${esc(x.mercado)}</p>` }], related: x.rel || [], guide: "glossario" }; },
    ferramenta(x) {
      return { kicker: `<span class="tag">${esc(x.licenca)}</span>`, title: x.nome, one: x.funcao,
        tabs: [{ label: P.funcao, html: `<p><b>${esc(P.etapaLbl)}</b> ${IDX.etapa[x.etapa] ? refBtn("etapa:" + x.etapa) : esc(P.baseComum)}</p><p><b>${esc(P.licenca)}</b> ${esc(x.licenca)}</p><p class="nota">${esc(P.ferramentaNota)}</p>` }],
        related: [], guide: "implementacao", extra: `<a class="btn-line arrow" href="implementacao.html#ferramentas">${esc(P.verFerramentas)}</a>` };
    },
    modulo(x) { return { kicker: `<span class="tag">${esc(P.implementacaoRef)}</span>`, title: x.nome, one: x.faz, tabs: [{ label: P.paraQuem, html: `<p>${esc(x.quem)}</p><p><b>${esc(P.etapasMod)}</b> ${esc(x.etapa)}</p>` }], related: [], guide: "implementacao" }; },
    modelo(x) {
      return { kicker: `<span class="tag">${esc(P.modelo)} ${x.n}</span>`, title: x.nome, one: x.para,
        tabs: [
          { label: P.baixar, html: `${filesHTML(x)}<p class="nota">${esc(T.arquivosNota)} ${esc(T.officeNota)}</p>` },
          { label: P.exemploPreenchido, html: `<table class="tbl" style="min-width:0"><tbody>${x.exemplo.map((r) => `<tr><td class="muted small" style="width:38%">${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join("")}</tbody></table><p class="nota">${esc(P.exemploNota)}</p>` },
          { label: P.quandoUsar, html: `<p><b>${esc(P.etapasLbl)}</b> ${x.etapas.map((e) => refBtn("etapa:" + e)).join(", ")}</p><p><b>${esc(P.camadaLbl)}</b> ${refBtn("camada:" + x.camada)}</p><p><b>${esc(P.quemPreenche)}</b> ${esc(x.quem)}</p>` }
        ], related: [], guide: null, extra: `<a class="btn-line arrow" href="recursos.html">${esc(P.todosModelos)}</a>` };
    },
    persona(x) {
      const A = T.aspas || ["“", "”"]; return { kicker: "", title: x.nome, one: A[0] + x.dor + A[1],
        tabs: [
          { label: P.oQueMuda, html: `<p>${esc(x.muda)}</p><p><b>${esc(P.precisaVer)}</b> ${esc(x.quer)}</p>` },
          { label: P.porOndeComecar, html: `<p>${esc(x.comeco)}</p><div class="trail">${x.trilha.map((g) => `<a href="${guideHref(g)}">${esc(IDX.guia[g].titulo)}</a>`).join("")}</div>` }
        ], related: [], guide: null, extra: `<button type="button" class="btn-ghost" data-persona-set="${x.id}">${esc(P.usarPerfil)}</button>` };
    },
    nicho(x) {
      return { kicker: "", title: x.nome, one: x.responde,
        tabs: [{ label: P.doresTipicas, html: list(x.dores) }, { label: P.porOndeComecar, html: `<p>${esc(x.comeco)}</p><p>${esc(P.exemploProximo)} ${refBtn("caso:" + x.exemplo)}</p>` }], related: [], guide: null };
    },
    caso(x) {
      return { kicker: `<span class="tag">${esc(x.rotulo)}</span><span class="tag">${esc(P.ficticio)}</span>`, title: x.titulo, one: x.texto,
        tabs: [{ label: P.nasQuatro, html: x.etapas.map((s, i) => `<p>${refBtn("etapa:" + ETAPAS5[i + 1], IDX.etapa[ETAPAS5[i + 1]].kdv)} · ${esc(s)}</p>`).join("") }], related: [], guide: "exemplo" };
    },
    contato() {
      const C = T.contato;
      return { kicker: '<span class="tag">KDV Ecosystems</span>', title: C.titulo, one: C.texto,
        tabs: [
          { label: C.aba1, html: `<p><b>${esc(C.email)}</b> <span class="mono" style="font-size:14px;user-select:all">${esc(K.meta.email)}</span> <button type="button" class="btn-ghost" data-copy="${esc(K.meta.email)}">${esc(C.copiar)}</button></p><p><a class="btn-line arrow" href="${empresaHref()}" target="_blank" rel="noopener">${esc(C.site)}</a></p>` },
          { label: C.aba2, html: list(C.levar) + `<p class="nota">${esc(C.nota)}</p>` }
        ], related: [], guide: null };
    }
  };
  function view(ref) { const { t, x } = get(ref); return t === "contato" ? VIEW.contato() : x && VIEW[t] ? VIEW[t](x) : null; }

  /* ---------- painel lateral ---------- */
  let hist = [], lastFocus = null, prevHash = "";
  function detailHTML(ref, inline) {
    const v = view(ref); if (!v) return null; const { t } = get(ref);
    const rel = (v.related || []).filter((r) => get(r).x);
    return `<div class="kind"><span class="eyebrow">${esc(T.tipos[t])}</span>${v.kicker || ""}</div>
      ${inline ? `<h3 style="font-size:clamp(26px,2.6vw,34px)">${esc(v.title)}</h3>` : `<h2 id="drawer-title" tabindex="-1">${esc(v.title)}</h2>`}<p class="one">${esc(v.one)}</p>
      ${tabsHTML(v.tabs, { label: P.detalhesDe + " " + v.title })}
      ${rel.length ? `<div class="related"><h5>${esc(P.relacionados)}</h5><div class="chips">${rel.map((r) => refChip(r)).join("")}</div></div>` : ""}
      <div class="row">${v.extra || ""}${v.guide ? `<a class="btn-line arrow" href="${guideHref(v.guide)}">${esc(P.abrirGuia)}</a>` : ""}</div>`;
  }
  function openRef(ref, opts = {}) {
    const html = detailHTML(ref); if (!html) return;
    const d = $("#drawer");
    if (!d.classList.contains("on")) { lastFocus = document.activeElement; hist = []; prevHash = location.hash.startsWith("#ver=") ? "" : location.hash; }
    if (!opts.back) hist.push(ref);
    $(".drawer-body", d).innerHTML = html; $(".drawer-body", d).scrollTop = 0;
    $("#drawer-back").hidden = hist.length < 2;
    $(".crumbs", d).textContent = hist.map(titleOf).join(" › ");
    if (!d.open && d.showModal) d.showModal(); d.classList.add("on"); $("#scrim").classList.add("on"); d.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    try { history.replaceState(null, "", "#ver=" + ref); } catch (e) {}
    updateLangLinks();
    setTimeout(() => { const h = $("#drawer #drawer-title"); h && h.focus(); }, 30);
    hideTip();
  }
  function closeDrawer() {
    const d = $("#drawer"); if (!d.classList.contains("on")) return;
    d.classList.remove("on"); if (d.open && d.close) d.close(); $("#scrim").classList.remove("on"); d.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    try { if (location.hash.startsWith("#ver=")) history.replaceState(null, "", location.pathname + location.search + prevHash); } catch (e) {}
    updateLangLinks();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function back() { if (hist.length > 1) { hist.pop(); openRef(hist[hist.length - 1], { back: true }); } }

  /* ---------- dica de termo ---------- */
  let tipEl, tipTimer;
  function showTip(el) {
    const ref = el.dataset.ref; const txt = shortOf(ref); if (!txt) return;
    tipEl.innerHTML = `<b>${esc(titleOf(ref))}</b>${esc(txt)}<small>${esc(T.dicaClique)}</small>`; tipEl.hidden = false;
    const r = el.getBoundingClientRect(); const w = tipEl.offsetWidth, h = tipEl.offsetHeight;
    const left = Math.min(Math.max(8, r.left), window.innerWidth - w - 8); let top = r.bottom + 8; if (top + h > window.innerHeight - 8) top = r.top - h - 8;
    tipEl.style.left = left + "px"; tipEl.style.top = top + "px";
  }
  function hideTip() { if (tipEl) tipEl.hidden = true; clearTimeout(tipTimer); }

  /* ---------- busca rápida ---------- */
  let palItems = [], palSel = 0, SIDX;
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  function searchIndex() {
    const out = [];
    for (const t of ["conceito", "papel", "etapa", "camada", "base", "termo", "ferramenta", "modulo", "modelo", "persona", "nicho", "caso"]) {
      for (const id in IDX[t]) { const ref = t + ":" + id; const x = IDX[t][id]; out.push({ ref, k: T.tipos[t], title: titleOf(ref), sub: shortOf(ref), extra: [x.kdv, x.mercado].filter(Boolean).join(" ") }); }
    }
    K.guias.forEach((g) => out.push({ href: guideHref(g.id), k: T.tipos.guia, title: g.titulo, sub: g.resumo, extra: "" }));
    K.paginas.forEach((p) => out.push({ href: p.href, k: T.tipos.pagina, title: p.nome, sub: p.pergunta, extra: "" }));
    return out;
  }
  function renderPalette(q) {
    SIDX = SIDX || searchIndex(); const n = norm(q.trim());
    palItems = !n ? SIDX.filter((i) => [T.tipos.conceito, T.tipos.etapa, T.tipos.pagina].includes(i.k)) :
      SIDX.map((i) => { const a = norm(i.title), b = norm(i.sub + " " + i.extra); return [a.startsWith(n) ? 3 : a.includes(n) ? 2 : b.includes(n) ? 1 : 0, i]; })
        .filter((p) => p[0]).sort((x, y) => y[0] - x[0]).map((p) => p[1]);
    palItems = palItems.slice(0, 40); palSel = 0;
    $("#pal-list").innerHTML = palItems.length ? palItems.map((i, k) => `<li role="option" id="pal-o${k}" aria-selected="${k === 0}"><button type="button" data-k="${k}" tabindex="-1"><span class="k">${esc(i.k)}</span><span>${esc(i.title)}<small>${esc(i.sub)}</small></span></button></li>`).join("") : `<li class="empty">${esc(fmt(T.busca.vazio, { q }))}</li>`;
    if(palItems.length)$("#pal-in").setAttribute("aria-activedescendant","pal-o0");else $("#pal-in").removeAttribute("aria-activedescendant");
  }
  function palMove(d) { if (!palItems.length) return; palSel = (palSel + d + palItems.length) % palItems.length; $$("#pal-list [role=option]").forEach((b, k) => b.setAttribute("aria-selected", k === palSel)); $("#pal-in").setAttribute("aria-activedescendant","pal-o"+palSel);const el = $("#pal-o" + palSel); el && el.scrollIntoView({ block: "nearest" }); }
  function palGo(k) { const i = palItems[k]; if (!i) return; closePalette(); if (i.ref) openRef(i.ref); else location.href = i.href; }
  let paletteFocus; function openPalette() { paletteFocus=document.activeElement; const palette=$("#palette"); if(!palette.open) palette.showModal(); palette.classList.add("on"); const inp = $("#pal-in"); inp.value = ""; renderPalette(""); inp.focus(); }
  function closePalette() { const palette=$("#palette"); palette.classList.remove("on"); if(palette.open)palette.close(); paletteFocus?.focus(); }

  /* ---------- perfil ---------- */
  function setPersona(id) {
    store.set("perfil", id || null);
    const chip = $("#persona-chip"); const p = id && IDX.persona[id];
    chip.classList.toggle("on", !!p); if (p) $("#persona-name").textContent = p.curto;
    document.dispatchEvent(new CustomEvent("kdv:persona", { detail: id }));
  }

  /* ---------- tema claro / escuro ---------- */
  const mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function themeNow() { return document.documentElement.dataset.theme || (mq && mq.matches ? "dark" : "light"); }
  function paintThemeBtn() {
    const b = $("#theme-btn"); if (!b) return; const dark = themeNow() === "dark";
    b.setAttribute("aria-pressed", dark); b.querySelector(".ico").textContent = dark ? "☾" : "☀";
    b.querySelector(".lbl").textContent = dark ? T.temaEscuro : T.temaClaro;
    b.title = T.temaAria; b.setAttribute("aria-label", T.temaAria + " · " + (dark ? T.temaEscuro : T.temaClaro));
  }
  function toggleTheme() {
    const next = themeNow() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next; store.set("tema", next); paintThemeBtn();
  }

  /* ---------- idiomas ---------- */
  function pageFile() { return location.pathname.replace(/^\/(en|pt-br|pt|es)\//, ""); }
  function updateLangLinks() { $$("[data-lang-to]").forEach((a) => { a.href = `/${a.dataset.langTo}/${pageFile()}${location.hash}`; }); }

  /* ---------- toast e copiar ---------- */
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("on"), 2200); }
  function copy(text, ok) {
    const done = () => toast(ok || T.toast.copiado);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done)); else fallbackCopy(text, done);
  }
  function fallbackCopy(text, done) { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); done(); } catch (e) { toast(T.toast.copieManual); } ta.remove(); }

  /* ---------- casca ---------- */
  function shell() {
    const page = document.body.dataset.page;
    const nav = K.paginas.map((p) => `<a href="${p.href}"${p.id === page ? ' aria-current="page"' : ""}>${esc(p.nome)}</a>`).join("");
    const langs = (cls) => `<div class="langs ${cls}" role="group" aria-label="${esc(T.idioma)}">${K.idiomas.map((l) => `<a data-lang-to="${l.code}" hreflang="${l.html}" lang="${l.html}" title="${esc(l.nome)}"${l.code === LANG ? ' aria-current="true"' : ""}>${l.label}</a>`).join("")}</div>`;
    const logo = `<img class="logo-b" src="${ROOT}assets/img/kdv-black.png" alt="KDV" width="111" height="23"><img class="logo-w" src="${ROOT}assets/img/kdv-white.png" alt="" width="111" height="23"><span>/ framework</span>`;
    $("#site-header").outerHTML = `<header class="site-header"><div class="wrap hdr">
      <a class="brand" href="index.html" aria-label="${esc(T.marcaAria)}">${logo}</a>
      <nav class="nav" id="nav" aria-label="${esc(T.navAria)}">${nav}${langs("langs-m")}</nav>
      <div class="hdr-actions">
        <button type="button" class="icon-btn persona-chip" id="persona-chip" title="${esc(T.removerPerfil)}"><span>${esc(T.perfil)}</span> <b id="persona-name"></b> ✕</button>
        ${langs("langs-d")}
        <button type="button" class="icon-btn" id="theme-btn" aria-pressed="false"><span class="ico" aria-hidden="true">☀</span><span class="lbl"></span></button>
        <button type="button" class="icon-btn" id="search-btn" aria-label="${esc(T.buscarAria)}"><span aria-hidden="true">⌕</span><span class="lbl">${esc(T.buscar)}</span><span class="kbd">Ctrl K</span></button>
        <button type="button" class="icon-btn menu-btn" id="menu-btn" aria-expanded="false" aria-controls="nav">${esc(T.menu)}</button>
      </div></div></header>`;
    const R = T.rodape; const nome = (id) => esc(K.paginas.find((p) => p.id === id).nome);
    $("#site-footer").outerHTML = `<footer class="site-footer"><div class="wrap">
      <div class="ft">
        <div class="stack"><a class="brand" href="index.html">${logo}</a><p class="muted small" style="max-width:40ch">${esc(R.blurb)}</p></div>
        <div><h5>${esc(R.entender)}</h5><a href="index.html">${nome("home")}</a><a href="para-quem.html">${nome("para-quem")}</a><a href="modelo.html">${nome("modelo")}</a><a href="implementacao.html">${nome("implementacao")}</a></div>
        <div><h5>${esc(R.aplicar)}</h5><a href="playbook.html">${nome("playbook")}</a><a href="recursos.html">${nome("recursos")}</a><a href="documentacao.html">${nome("documentacao")}</a></div>
        <div><h5>${esc(R.sobre)}</h5><a href="comunidade.html">${nome("comunidade")}</a><a href="comunidade.html#marcas">${esc(R.marcas)}</a><a href="privacidade.html">${esc(R.privacidade)}</a><a href="${K.meta.github}" target="_blank" rel="noopener">GitHub ↗</a></div>
      </div>
      <div class="ft-bottom"><span>${esc(K.meta.versao)}</span><span>${esc(R.licenca)}</span><span>${esc(R.semRastreio)}</span></div>
      </div></footer>
      <button type="button" class="btn fab" data-ref="contato:kdv">${esc(T.fab)}</button>
      <div class="scrim" id="scrim"></div>
      <aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" aria-hidden="true">
        <div class="drawer-bar"><button type="button" class="icon-btn" id="drawer-back" hidden>${esc(P.voltar)}</button><span class="crumbs"></span>
          <button type="button" class="icon-btn" id="drawer-link" title="${esc(P.copiarLinkTitulo)}">${esc(P.copiarLink)}</button>
          <button type="button" class="icon-btn" id="drawer-close" aria-label="${esc(P.fechar)}">✕</button></div>
        <div class="drawer-body" tabindex="-1"></div></aside>
      <div class="palette" id="palette" role="dialog" aria-modal="true" aria-label="${esc(T.busca.aria)}"><div class="palette-box">
        <label class="sr" for="pal-in">${esc(T.busca.label)}</label>
        <input id="pal-in" type="search" placeholder="${esc(T.busca.placeholder)}" autocomplete="off" role="combobox" aria-controls="pal-list" aria-expanded="true">
        <ul id="pal-list" role="listbox"></ul>
        <div class="hint"><span>${esc(T.busca.navegar)}</span><span>${esc(T.busca.abrir)}</span><span>${esc(T.busca.fechar)}</span></div></div></div>
      <div class="tip" id="tip" role="tooltip" hidden></div>
      <div class="toast" id="toast" role="status" aria-live="polite"></div>
      <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="${esc(T.lightbox.aria)}"><button type="button" class="btn close" id="lb-close">${esc(T.lightbox.fechar)}</button><figure><img id="lb-img" alt=""><figcaption id="lb-cap"></figcaption></figure></div>`;
    tipEl = $("#tip");
    const skip = document.createElement("a"); skip.className = "skip"; skip.href = "#main"; skip.textContent = T.skip; document.body.prepend(skip);
  }

  function subnav() {
    const secs = $$("[data-sub]"); const host = $("#subnav"); if (!host || !secs.length) return;
    host.outerHTML = `<nav class="subnav" id="subnav" aria-label="${esc(T.subnavAria)}"><div class="wrap">${secs.map((s) => `<a href="#${s.id}">${esc(s.dataset.sub)}</a>`).join("")}</div></nav>`;
    const links = $$("#subnav a");
    const io = new IntersectionObserver((ents) => { ents.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id)); }); }, { rootMargin: "-40% 0px -55% 0px" });
    secs.forEach((s) => io.observe(s));
  }

  function closeLightbox() { const lb=$("#lightbox"); lb.classList.remove("on"); if(lb.open)lb.close(); }
  function wire() {
    $("#drawer").addEventListener("cancel", e=>{e.preventDefault();closeDrawer();});
    $("#palette").addEventListener("cancel", e=>{e.preventDefault();closePalette();});
    $("#lightbox").addEventListener("cancel", e=>{e.preventDefault();closeLightbox();});
    document.addEventListener("click", (e) => {
      const r = e.target.closest("[data-ref]"); if (r && !r.closest("#pal-list")) { e.preventDefault(); openRef(r.dataset.ref); return; }
      const c = e.target.closest("[data-copy]"); if (c) { copy(c.dataset.copy); return; }
      const ps = e.target.closest("[data-persona-set]"); if (ps) { setPersona(ps.dataset.personaSet); toast(T.toast.perfilGuardado); return; }
      const lb = e.target.closest("[data-lightbox]"); if (lb) { $("#lb-img").src = lb.dataset.lightbox; $("#lb-img").alt = lb.dataset.caption || ""; $("#lb-cap").textContent = lb.dataset.caption || ""; $("#lightbox").classList.add("on"); $("#lightbox").showModal(); $("#lb-close").focus(); return; }
      const pb = e.target.closest("#pal-list button"); if (pb) { palGo(+pb.dataset.k); return; }
      const lg = e.target.closest("[data-lang-to]"); if (lg) { store.set("idioma", lg.dataset.langTo); updateLangLinks(); }
    });
    $("#scrim").addEventListener("click", closeDrawer);
    $("#drawer-close").addEventListener("click", closeDrawer);
    $("#drawer-back").addEventListener("click", back);
    $("#drawer-link").addEventListener("click", () => copy(location.href, T.toast.linkCopiado));
    $("#search-btn").addEventListener("click", openPalette);
    $("#theme-btn").addEventListener("click", toggleTheme);
    if (mq && mq.addEventListener) mq.addEventListener("change", paintThemeBtn);
    $("#palette").addEventListener("click", (e) => { if (e.target.id === "palette") closePalette(); });
    $("#pal-in").addEventListener("input", (e) => renderPalette(e.target.value));
    $("#pal-in").addEventListener("keydown", (e) => { if (e.key === "ArrowDown") { palMove(1); e.preventDefault(); } else if (e.key === "ArrowUp") { palMove(-1); e.preventDefault(); } else if (e.key === "Enter") { palGo(palSel); e.preventDefault(); } });
    $("#lb-close").addEventListener("click", () => closeLightbox());
    $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });
    $("#menu-btn").addEventListener("click", (e) => { const n = $("#nav"); const on = n.classList.toggle("open"); e.currentTarget.setAttribute("aria-expanded", on); });
    $("#persona-chip").addEventListener("click", () => { setPersona(null); toast(T.toast.perfilRemovido); });
    window.addEventListener("hashchange", updateLangLinks);
    document.addEventListener("keydown", (e) => {
      const typing = /input|textarea|select/i.test(document.activeElement.tagName);
      if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) { e.preventDefault(); openPalette(); return; }
      if (e.key === "Escape") { if ($("#lightbox").classList.contains("on")) closeLightbox(); else if ($("#palette").classList.contains("on")) closePalette(); else if($("#drawer").classList.contains("on"))closeDrawer();else if($("#nav").classList.contains("open")){ $("#nav").classList.remove("open");$("#menu-btn").setAttribute("aria-expanded","false");$("#menu-btn").focus();} }
      if (e.key === "Tab" && $("#drawer").classList.contains("on")) {
        const f = $$('#drawer button:not([hidden]), #drawer a[href], #drawer [tabindex="0"]').filter((x) => x.offsetParent !== null);
        if (!f.length) return; const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); } else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    });
    document.addEventListener("pointerover", (e) => { const r = e.target.closest(".ref"); if (r && r.dataset.ref) { clearTimeout(tipTimer); tipTimer = setTimeout(() => showTip(r), 220); } });
    document.addEventListener("pointerout", (e) => { if (e.target.closest(".ref")) hideTip(); });
    document.addEventListener("focusin", (e) => { const r = e.target.closest && e.target.closest(".ref"); if (r) showTip(r); else hideTip(); });
    window.addEventListener("scroll", hideTip, { passive: true });
  }

  window.KDVUI = { shell,  K, T, LANG, ROOT, fmt, view, detailHTML, get, $, $$, esc, rich, refBtn, refChip, list, tabsHTML, selectTab, openRef, closeDrawer, IDX, titleOf, shortOf, store, setPersona, toast, copy, guideHref, filesHTML, empresaHref };

  document.addEventListener("DOMContentLoaded", () => {
    if (!window.KDV_SERVER_RENDERED) shell(); else tipEl = $("#tip"); wire(); paintThemeBtn(); updateLangLinks();
    store.set("idioma", LANG);
    setPersona(store.get("perfil", null));
    if (window.KDVPages && window.KDVPages[document.body.dataset.page]) window.KDVPages[document.body.dataset.page]();
    subnav();
    document.documentElement.classList.add("ux-ready");
    const m = location.hash.match(/^#ver=([a-z]+:[a-z0-9-]+)$/); if (m) openRef(m[1]);
  });
})();
