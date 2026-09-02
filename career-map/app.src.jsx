const { useState, useEffect, useMemo } = React;

/* ============================================================
   定数
   ============================================================ */
const KEY = 'careermap_v3';
const INDEX_START = 100;
const FOCUS_MAX = 3;
const TODAY_MAX = 5;
const PROJECT_MAX = 6;

const OUTCOMES = [
  { id: 'career', name: 'CAREER' },
  { id: 'global', name: 'GLOBAL' },
  { id: 'research', name: 'RESEARCH' },
  { id: 'project', name: 'PROJECT' },
];
const OUT_MAP = Object.fromEntries(OUTCOMES.map(o => [o.id, o]));
const IMPACT = { high: '＋＋', med: '＋' };

/* ============================================================
   ユーティリティ（日付はすべてローカル。toISOString()は使わない）
   ============================================================ */
const uid = () => 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const WD = ['日','月','火','水','木','金','土'];
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const r1 = (n) => Math.round(n * 10) / 10;

function pad2(n) { return String(n).padStart(2, '0'); }
function isoOf(d) { return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`; }
function todayISO() { return isoOf(new Date()); }
function parseISO(s) { const [y,m,d] = s.split('-').map(Number); return new Date(y, (m||1)-1, d || 1); }
function addDaysISO(iso, n) { const d = parseISO(iso); d.setDate(d.getDate() + n); return isoOf(d); }
function fmtDate(iso) { const d = parseISO(iso); return `${d.getMonth()+1}月${d.getDate()}日`; }
function fmtFull(iso) { const d = parseISO(iso); return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}（${WD[d.getDay()]}）`; }
function daysUntil(iso) { return Math.round((parseISO(iso) - parseISO(todayISO())) / 86400000); }
function daysSince(isoDT) { if (!isoDT) return 9999; return Math.floor((Date.now() - new Date(isoDT).getTime()) / 86400000); }
function daysSinceDate(iso) { return Math.floor((parseISO(todayISO()) - parseISO(iso)) / 86400000); }

/* ============================================================
   シード
   ============================================================ */
function seedProjects() {
  const P = (o) => ({ id: uid(), progress: 0, status: 'active', milestones: [], moveLog: [], nextDeadline: null, nextAction: '', ...o });
  const M = (label, big) => ({ id: uid(), label, done: false, doneAt: null, big: !!big });
  return [
    P({ name: '英語', outcome: 'global', progress: 15, status: 'focus',
      goal: '交換留学の資格を取得し、英語を使える状態になる。',
      nextAction: '過去問で現在地を測る',
      nextDeadline: { label: '本試（2026年中・テストセンター型）', date: '2026-12-31' },
      milestones: [M('過去問で現在地を把握'), M('本試を受験'), M('出願基準スコアに到達', true), M('公式スコアレポートを入手')] }),
    P({ name: '大学・GPA', outcome: 'career', progress: 40, status: 'focus',
      goal: '留学と卒業に必要な学業成績を維持する。',
      nextAction: '秋学期の重い課題を洗い出す',
      milestones: [M('1年秋のGPAを2.0以上で確定', true), M('2年春までの累積GPAで協定校基準クリア', true)] }),
    P({ name: '自然環境音研究', outcome: 'research', progress: 10, status: 'focus',
      goal: '論文執筆・学会発表。',
      nextAction: '研究テーマを固める',
      milestones: [M('研究テーマを決定', true), M('データ収集を開始'), M('論文ドラフト完成', true), M('学会発表', true)] }),
    P({ name: '交換留学', outcome: 'global', progress: 35, status: 'active',
      goal: '2028年秋から交換留学する。',
      nextAction: '英語資格の現在地を確認する',
      nextDeadline: { label: '学内選考 出願（KEIO IC-NET）', date: '2027-09-15' },
      milestones: [M('英語スコアが出願資格に到達', true), M('学内選考に出願'), M('派遣候補生に内定', true), M('留学先へ出発', true)] }),
    P({ name: '馬佐良プロジェクト', outcome: 'project', progress: 20, status: 'active',
      goal: '慶應公認団体化・継続的な組織化。',
      nextAction: '公認団体の要件を調べる',
      milestones: [M('公認団体の要件を確認'), M('自分に依存しない運営体制'), M('慶應の公認団体になる', true)] }),
    P({ name: '就職準備', outcome: 'career', progress: 10, status: 'active',
      goal: '2030年の選考に向けて経験・スキルを蓄積する。',
      nextAction: '博報堂インターンに申し込む',
      nextDeadline: { label: '博報堂インターン 申込〆切', date: '2026-10-02' },
      milestones: [M('博報堂インターンに参加'), M('サマーインターンに参加'), M('早期選考で内々定', true)] }),
  ];
}
function defaultState() {
  const ps = seedProjects();
  const pid = (n) => (ps.find(p => p.name === n) || {}).id;
  return {
    version: 3,
    tipsSeen: false,
    ideal: {
      headline: '2030年3月・電通／博報堂へ。30代前半で年収1000万。',
      outcomes: {
        career: '複数の業界・企業から就職先を選べる。博報堂・電通を含め、コンサル・商社などの選考を受けられる。',
        global: '交換留学を経験し、英語を使える。海外キャリアも選択肢として持つ。',
        research: '論文執筆・学会発表。',
        project: '継続する組織・プロジェクトを作る。',
      },
    },
    weights: {
      taskMed: 1, taskHigh: 2, focusBonus: 2,
      milestone: 12, milestoneBig: 25,
      stall: -2, deadlineNoProgress: -4,
      stallDays: 4, deadlineWindow: 30, dailyOrdinaryCap: 6,
    },
    projects: ps,
    tasks: [
      { id: uid(), text: '英語の過去問 Reading を時間を計って解く', projectId: pid('英語'), importance: 'high', date: todayISO(), done: false, doneAt: null },
      { id: uid(), text: '統計分析の勉強', projectId: pid('自然環境音研究'), importance: 'med', date: todayISO(), done: false, doneAt: null },
      { id: uid(), text: '授業課題（重い方）', projectId: pid('大学・GPA'), importance: 'high', date: todayISO(), done: false, doneAt: null },
    ],
    ideas: [
      { id: uid(), text: '里山プロジェクトのInstagramを毎日更新する', createdAt: new Date().toISOString() },
    ],
    index: { start: INDEX_START, log: [] },
  };
}

/* ============================================================
   保存 / 読込
   ============================================================ */
function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw); const d = defaultState();
    return { ...d, ...s,
      ideal: { ...d.ideal, ...(s.ideal || {}), outcomes: { ...d.ideal.outcomes, ...((s.ideal || {}).outcomes || {}) } },
      weights: { ...d.weights, ...(s.weights || {}) },
      index: { ...d.index, ...(s.index || {}) },
    };
  } catch (e) { return defaultState(); }
}
function saveState(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

/* ============================================================
   Career Index エンジン
   ============================================================ */
function lastProgressAt(s) {
  let t = 0;
  (s.tasks || []).forEach(x => { if (x.done && x.doneAt) t = Math.max(t, new Date(x.doneAt).getTime()); });
  (s.projects || []).forEach(p => {
    (p.moveLog || []).forEach(m => { t = Math.max(t, parseISO(m.date).getTime()); });
    (p.milestones || []).forEach(m => { if (m.done && m.doneAt) t = Math.max(t, new Date(m.doneAt).getTime()); });
  });
  return t ? new Date(t).toISOString() : null;
}
function ensureIndex(s) {
  const w = s.weights;
  const log = [...((s.index && s.index.log) || [])];
  let last = log.length ? log[log.length - 1].date : addDaysISO(todayISO(), -1);
  let val = log.length ? log[log.length - 1].value : (s.index.start || INDEX_START);
  const nl = [...log];
  let g = 0;
  while (last < todayISO() && g++ < 800) {
    const nx = addDaysISO(last, 1); if (nx <= last) break; last = nx;
    nl.push({ date: last, value: val, delta: 0, events: [] });
  }
  if (!nl.length) nl.push({ date: todayISO(), value: s.index.start || INDEX_START, delta: 0, events: [] });
  if (nl[nl.length - 1].date !== todayISO()) nl.push({ date: todayISO(), value: nl[nl.length - 1].value, delta: 0, events: [] });

  const today = { ...nl[nl.length - 1] };
  // 使い始めて数日は、放置・締切による下降を適用しない（猶予期間）
  if (!today.checked && nl.length > w.stallDays) {
    let add = 0; const evs = [];
    const lp = lastProgressAt(s);
    const dsp = lp ? daysSince(lp) : 999;
    if (dsp >= w.stallDays && dsp < 900) { add += w.stall; evs.push({ reason: `重要な活動が ${dsp}日 進んでいません`, amt: w.stall }); }
    (s.projects || []).forEach(p => {
      if (p.nextDeadline && p.nextDeadline.date) {
        const du = daysUntil(p.nextDeadline.date);
        const recent = (p.moveLog || []).some(m => daysSinceDate(m.date) < w.stallDays);
        if (du >= 0 && du <= w.deadlineWindow && !recent) {
          add += w.deadlineNoProgress;
          evs.push({ reason: `${p.name}：締切まで${du}日、進捗なし`, amt: w.deadlineNoProgress });
        }
      }
    });
    today.checked = true;
    if (add !== 0) {
      today.delta = r1(today.delta + add);
      today.events = [...(today.events || []), ...evs];
      const prev = nl.length > 1 ? nl[nl.length - 2].value : (s.index.start || INDEX_START);
      today.value = r1(prev + today.delta);
    }
  }
  nl[nl.length - 1] = today;
  return { ...s, index: { ...s.index, log: nl.slice(-540) } };
}
function bumpIndex(s, amt, reason) {
  const log = [...((s.index && s.index.log) || [])];
  if (!log.length || log[log.length - 1].date !== todayISO()) {
    const prev = log.length ? log[log.length - 1].value : (s.index.start || INDEX_START);
    log.push({ date: todayISO(), value: prev, delta: 0, events: [], checked: true });
  }
  const e = { ...log[log.length - 1] };
  e.delta = r1((e.delta || 0) + amt);
  e.events = [...(e.events || []), { reason, amt: r1(amt) }];
  const prev = log.length > 1 ? log[log.length - 2].value : (s.index.start || INDEX_START);
  e.value = r1(prev + e.delta);
  log[log.length - 1] = e;
  return { ...s, index: { ...s.index, log } };
}
function ordinaryGainToday(s) {
  const log = (s.index && s.index.log) || [];
  if (!log.length || log[log.length - 1].date !== todayISO()) return 0;
  return (log[log.length - 1].events || []).filter(e => e._ord).reduce((a, e) => a + Math.max(0, e.amt), 0);
}
function indexInfo(log, days) {
  const cut = addDaysISO(todayISO(), -days);
  const win = (log || []).filter(e => e.date >= cut);
  const series = win.length ? win : (log || []).slice(-2);
  const now = series.length ? series[series.length - 1].value : INDEX_START;
  const base = series.length ? series[0].value : INDEX_START;
  const chg = now - base;
  const pct = base ? chg / base * 100 : 0;
  const arrow = chg > 0.4 ? '↑' : chg < -0.4 ? '↓' : '→';
  return { now, base, chg, pct, arrow, series };
}

/* ============================================================
   プロジェクトの勢い（過去30日）
   ============================================================ */
function momentum(p) {
  const ml = p.moveLog || [];
  const r = ml.filter(m => daysSinceDate(m.date) < 30).reduce((a, m) => a + m.amt, 0);
  const q = ml.filter(m => { const d = daysSinceDate(m.date); return d >= 30 && d < 60; }).reduce((a, m) => a + m.amt, 0);
  if (r === 0 && q === 0) return { a: '→', l: 'Stable', note: 'これから' };
  if (r > q * 1.2 && r > 0) return { a: '↗', l: 'Accelerating', note: '最近30日で勢いが増加' };
  if (r < q * 0.6 || (r === 0 && q > 0)) return { a: '↘', l: 'Slowing', note: '最近、重要な進捗が少ない' };
  return { a: '→', l: 'Stable', note: '一定のペースで進行' };
}
function projById(s, id) { return (s.projects || []).find(p => p.id === id); }
function nextDeadlineAcross(s) {
  const ds = (s.projects || []).map(p => p.nextDeadline && p.nextDeadline.date ? { ...p.nextDeadline, project: p.name } : null)
    .filter(Boolean).sort((a, b) => a.date.localeCompare(b.date));
  return ds[0] || null;
}

/* ============================================================
   共通パーツ
   ============================================================ */
function Meter({ v }) { return <div className="meter"><span style={{ width: clamp(v, 0, 100) + '%' }} /></div>; }
function Mom({ p }) { const m = momentum(p); return <span className="mom">{m.a} {m.l}</span>; }

function IndexChart({ log, days, showDots, onPick, h }) {
  const info = indexInfo(log, days);
  const s = info.series;
  const pts = s.length >= 2 ? s : [{ date: addDaysISO((s[0] || { date: todayISO() }).date, -1), value: (s[0] || { value: INDEX_START }).value, events: [] }, ...s];
  const vals = pts.map(p => p.value);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const pad = (hi - lo || 4) * 0.15;
  const mn = lo - pad, mx = hi + pad, rng = mx - mn || 1;
  const W = 320, HT = h || 130;
  const x = (i) => (i / (pts.length - 1)) * W;
  const y = (v) => HT - ((v - mn) / rng) * HT;
  const line = pts.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `0,${HT} ${line} ${W},${HT}`;
  return (
    <svg viewBox={`0 0 ${W} ${HT + 2}`} width="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
      <polygon points={area} fill="#111" opacity="0.05" />
      <polyline points={line} fill="none" stroke="#111" strokeWidth="1.5" />
      {showDots && pts.map((p, i) => (p.events && p.events.length
        ? <circle key={i} cx={x(i)} cy={y(p.value)} r="3.2" fill="#111" style={{ cursor: 'pointer' }} onClick={() => onPick && onPick(p)} />
        : null))}
      <circle cx={x(pts.length - 1)} cy={y(vals[vals.length - 1])} r="2.6" fill="#111" />
    </svg>
  );
}

/* ============================================================
   ① ホーム
   ============================================================ */
function Home({ s, set, go, openProject }) {
  const info = useMemo(() => indexInfo(s.index.log, 30), [s.index.log]);
  const focus = s.projects.filter(p => p.status === 'focus');
  const today = todayISO();
  const tt = s.tasks.filter(t => t.date === today).slice(0, TODAY_MAX);
  const nd = nextDeadlineAcross(s);
  const [txt, setTxt] = useState('');
  const [pj, setPj] = useState((focus[0] || s.projects[0] || {}).id);

  function completeTask(id) {
    set(p => {
      const t = p.tasks.find(x => x.id === id); if (!t || t.done) return p;
      let np = { ...p, tasks: p.tasks.map(x => x.id === id ? { ...x, done: true, doneAt: new Date().toISOString() } : x) };
      const pr = projById(np, t.projectId);
      const w = np.weights;
      let amt = t.importance === 'high' ? w.taskHigh : w.taskMed;
      let ordinary = true;
      if (pr && pr.status === 'focus') { amt += w.focusBonus; ordinary = false; }
      if (ordinary) { amt = Math.max(0, Math.min(amt, w.dailyOrdinaryCap - ordinaryGainToday(np))); }
      if (pr) np = { ...np, projects: np.projects.map(x => x.id === pr.id ? { ...x, moveLog: [...(x.moveLog || []), { date: today, amt: 1 }] } : x) };
      if (amt > 0) {
        np = bumpIndex(np, amt, `${t.text}${pr ? '（' + pr.name + '）' : ''}`);
        if (ordinary) { const lg = np.index.log; lg[lg.length - 1].events[lg[lg.length - 1].events.length - 1]._ord = true; }
      }
      return np;
    });
  }
  function addTask() {
    const v = txt.trim(); if (!v) return;
    set(p => ({ ...p, tasks: [...p.tasks, { id: uid(), text: v, projectId: pj, importance: 'med', date: today, done: false, doneAt: null }] }));
    setTxt('');
  }

  return (
    <div className="screen">
      <div className="between">
        <div className="kicker">{fmtDate(today)}（{WD[parseISO(today).getDay()]}）</div>
        <button className="btn-bare" onClick={() => go('settings')}>⚙</button>
      </div>

      {/* ① CAREER INDEX */}
      <div className="idx-hero" onClick={() => go('index')}>
        <div className="kicker">CAREER INDEX</div>
        <div className="row" style={{ alignItems: 'baseline', gap: 12, marginTop: 2 }}>
          <div className="idx-now">{info.now.toFixed(1)}</div>
          <div className="idx-chg" style={{ color: info.chg >= 0 ? 'var(--up)' : 'var(--down)' }}>
            {info.arrow} {info.chg >= 0 ? '+' : ''}{info.pct.toFixed(1)}%
          </div>
        </div>
        <div className="xs">直近30日　{info.arrow === '↑' ? '上昇中' : info.arrow === '↓' ? '下降中' : '横ばい'}</div>
        <div style={{ marginTop: 8 }}><IndexChart log={s.index.log} days={30} h={96} /></div>
      </div>

      {!s.tipsSeen && (
        <div className="sec-line">
          <div className="sub">
            指数は「株価」ではなく <b>行動の指標</b>。2030年に効く行動で上がり、重要な活動が数日止まると緩く下がる。
            数をこなしても上がらない。
          </div>
          <button className="btn btn-sm" style={{ marginTop: 8 }} onClick={() => set(p => ({ ...p, tipsSeen: true }))}>OK</button>
        </div>
      )}

      {/* ② CURRENT FOCUS */}
      <div className="sec">
        <div className="between"><div className="kicker">CURRENT FOCUS</div><button className="btn-bare" onClick={() => go('projects')}>変更</button></div>
        {focus.length === 0 && <div className="sub" style={{ marginTop: 6 }}>未設定。PROJECTSで最大3つ選ぶ。</div>}
        {focus.map((p, i) => (
          <div key={p.id} className="focus-row" onClick={() => openProject(p.id)}>
            <span className="num">{i + 1}</span>
            <span style={{ flex: 1, fontWeight: 700 }}>{p.name}</span>
            <Mom p={p} />
          </div>
        ))}
      </div>

      {/* ③ TODAY */}
      <div className="sec">
        <div className="kicker">TODAY</div>
        <div style={{ marginTop: 6 }}>
          {tt.length === 0 && <div className="sub">今日のタスクは未設定。</div>}
          {tt.map(t => {
            const pr = projById(s, t.projectId);
            return (
              <div key={t.id} className="chk">
                <div className={`tick ${t.done ? 'on' : ''}`} onClick={() => completeTask(t.id)}>{t.done ? '✓' : ''}</div>
                <div style={{ flex: 1 }}>
                  <div className="chk-t" style={{ textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'var(--sub)' : 'var(--ink)' }}>{t.text}</div>
                  <div className="xs">{pr ? pr.name : '—'}　・　重要度 {t.importance === 'high' ? 'HIGH' : 'MED'}　・　指数 {IMPACT[t.importance]}</div>
                </div>
                <button className="btn-bare" onClick={() => set(p => ({ ...p, tasks: p.tasks.filter(x => x.id !== t.id) }))}>×</button>
              </div>
            );
          })}
        </div>
        <div className="row" style={{ gap: 6, marginTop: 10 }}>
          <input className="input" placeholder="今日やること" value={txt} onChange={e => setTxt(e.target.value)} />
          <select className="input" style={{ width: 110 }} value={pj} onChange={e => setPj(e.target.value)}>
            {s.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <button className="btn btn-sm" onClick={addTask} disabled={!txt.trim()}>＋</button>
        </div>
      </div>

      {/* ④ NEXT DEADLINE */}
      <div className="sec">
        <div className="kicker">NEXT DEADLINE</div>
        {nd
          ? <div className="row" style={{ marginTop: 6, alignItems: 'baseline', gap: 10 }}>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14 }}>{nd.label}</div><div className="xs">{nd.project}</div></div>
              <div className="num" style={{ color: daysUntil(nd.date) <= 14 ? 'var(--down)' : 'var(--ink)' }}>
                {daysUntil(nd.date) < 0 ? `${-daysUntil(nd.date)}日超` : `あと${daysUntil(nd.date)}日`}
              </div>
            </div>
          : <div className="sub" style={{ marginTop: 6 }}>設定なし</div>}
      </div>

      {/* ⑤ PROJECT STATUS */}
      <div className="sec">
        <div className="kicker">PROJECT STATUS</div>
        <div style={{ marginTop: 6 }}>
          {s.projects.map(p => (
            <div key={p.id} className="status-row" onClick={() => openProject(p.id)}>
              <span style={{ flex: 1 }}>{p.name}{p.status === 'focus' && <span className="star"> ★</span>}</span>
              <Mom p={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ② PROJECTS
   ============================================================ */
function Projects({ s, set, sel, setSel, openProject }) {
  const [adding, setAdding] = useState(false);
  const [promo, setPromo] = useState(null); // idea being promoted
  const active = s.projects;
  const focusCount = active.filter(p => p.status === 'focus').length;
  const today = todayISO();
  const detail = sel && projById(s, sel);

  function toggleFocus(id) {
    set(p => {
      const pr = p.projects.find(x => x.id === id);
      if (pr.status !== 'focus' && p.projects.filter(x => x.status === 'focus').length >= FOCUS_MAX) {
        alert(`CURRENT FOCUS は最大 ${FOCUS_MAX} つ。先にどれかを外す。`); return p;
      }
      return { ...p, projects: p.projects.map(x => x.id === id ? { ...x, status: x.status === 'focus' ? 'active' : 'focus' } : x) };
    });
  }
  function bumpProgress(id, d) {
    set(p => {
      let np = { ...p, projects: p.projects.map(x => x.id === id ? { ...x, progress: clamp((x.progress || 0) + d, 0, 100), moveLog: [...(x.moveLog || []), { date: today, amt: 2 }] } : x) };
      return bumpIndex(np, 1, `${projById(np, id).name} を前進`);
    });
  }
  function doneAction(id) {
    set(p => {
      const pr = p.projects.find(x => x.id === id);
      let np = { ...p, projects: p.projects.map(x => x.id === id ? { ...x, progress: clamp((x.progress || 0) + 5, 0, 100), moveLog: [...(x.moveLog || []), { date: today, amt: 2 }] } : x) };
      np = bumpIndex(np, pr.status === 'focus' ? 2 : 1, `NEXT ACTION：${pr.nextAction || pr.name}`);
      return np;
    });
  }
  function achieveMs(pid, mid) {
    set(p => {
      const pr = p.projects.find(x => x.id === pid);
      const ms = pr.milestones.find(m => m.id === mid);
      if (ms.done) return p;
      const amt = ms.big ? p.weights.milestoneBig : p.weights.milestone;
      let np = { ...p, projects: p.projects.map(x => x.id === pid ? {
        ...x, progress: clamp((x.progress || 0) + 12, 0, 100),
        moveLog: [...(x.moveLog || []), { date: today, amt: 6 }],
        milestones: x.milestones.map(m => m.id === mid ? { ...m, done: true, doneAt: new Date().toISOString() } : m),
      } : x) };
      return bumpIndex(np, amt, `マイルストーン達成：${ms.label}（${pr.name}）`);
    });
  }
  function setField(id, k, v) { set(p => ({ ...p, projects: p.projects.map(x => x.id === id ? { ...x, [k]: v } : x) })); }
  function setDeadline(id, k, v) { set(p => ({ ...p, projects: p.projects.map(x => x.id === id ? { ...x, nextDeadline: { ...(x.nextDeadline || { label: '', date: '' }), [k]: v } } : x) })); }
  function promoteIdea(idea, choice, sacrificeId) {
    set(p => {
      let np = { ...p };
      if (choice === 'end' && sacrificeId) np = { ...np, projects: np.projects.filter(x => x.id !== sacrificeId) };
      if (choice === 'reduce' && sacrificeId) np = { ...np, projects: np.projects.map(x => x.id === sacrificeId ? { ...x, status: 'active' } : x) };
      np = { ...np,
        projects: [...np.projects, { id: uid(), name: idea.text.slice(0, 20), outcome: 'career', goal: idea.text, nextAction: '最初の一歩を決める', nextDeadline: null, progress: 0, status: 'active', milestones: [], moveLog: [] }],
        ideas: np.ideas.filter(x => x.id !== idea.id) };
      return np;
    });
    setPromo(null);
  }

  if (detail) {
    const p = detail; const m = momentum(p);
    return (
      <div className="screen">
        <button className="btn-bare" onClick={() => setSel(null)}>‹ PROJECTS</button>
        <div className="display d-lg" style={{ marginTop: 8 }}>{p.name}</div>
        <div className="row" style={{ gap: 8, marginTop: 6 }}>
          <span className="tag">{OUT_MAP[p.outcome] ? OUT_MAP[p.outcome].name : p.outcome}</span>
          <button className={`tag ${p.status === 'focus' ? 'tag-on' : ''}`} onClick={() => toggleFocus(p.id)}>{p.status === 'focus' ? '★ FOCUS' : 'FOCUS にする'}</button>
        </div>

        <div className="sec">
          <div className="kicker">GOAL</div>
          <textarea className="textarea" style={{ marginTop: 6 }} value={p.goal || ''} onChange={e => setField(p.id, 'goal', e.target.value)} />
        </div>
        <div className="sec">
          <div className="kicker">NEXT DEADLINE</div>
          <input className="input" style={{ marginTop: 6 }} placeholder="内容" value={(p.nextDeadline || {}).label || ''} onChange={e => setDeadline(p.id, 'label', e.target.value)} />
          <input className="input" style={{ marginTop: 6 }} placeholder="YYYY-MM-DD" value={(p.nextDeadline || {}).date || ''} onChange={e => setDeadline(p.id, 'date', e.target.value)} />
          {(p.nextDeadline || {}).date && <div className="xs" style={{ marginTop: 4 }}>あと {daysUntil(p.nextDeadline.date)}日</div>}
        </div>
        <div className="sec">
          <div className="between"><div className="kicker">PROGRESS</div><div className="num">{p.progress || 0}%　{m.a} {m.l}</div></div>
          <div style={{ marginTop: 8 }}><Meter v={p.progress || 0} /></div>
          <div className="xs" style={{ marginTop: 4 }}>{m.note}</div>
          <div className="row" style={{ gap: 6, marginTop: 8 }}>
            <button className="btn btn-sm" onClick={() => bumpProgress(p.id, 5)}>＋5%</button>
            <button className="btn btn-sm" onClick={() => bumpProgress(p.id, 10)}>＋10%</button>
          </div>
        </div>
        <div className="sec">
          <div className="kicker">NEXT ACTION</div>
          <input className="input" style={{ marginTop: 6 }} value={p.nextAction || ''} onChange={e => setField(p.id, 'nextAction', e.target.value)} />
          <button className="btn btn-sm btn-fill" style={{ marginTop: 8 }} onClick={() => doneAction(p.id)}>やった（指数に反映）</button>
        </div>
        <div className="sec">
          <div className="kicker">MILESTONES</div>
          {(p.milestones || []).map(ms => (
            <div key={ms.id} className="chk">
              <div className={`tick ${ms.done ? 'on' : ''}`} onClick={() => achieveMs(p.id, ms.id)}>{ms.done ? '✓' : ''}</div>
              <div className="chk-t" style={{ textDecoration: ms.done ? 'line-through' : 'none', color: ms.done ? 'var(--sub)' : 'var(--ink)' }}>
                {ms.label} {ms.big && <span className="xs">（大）</span>}
              </div>
            </div>
          ))}
          <div className="xs" style={{ marginTop: 4 }}>達成すると指数が大きく上がる（大＝{s.weights.milestoneBig} / 通常＝{s.weights.milestone}）</div>
        </div>
        <div className="sec">
          <div className="kicker">このProjectのタスク</div>
          {s.tasks.filter(t => t.projectId === p.id && !t.done).map(t => <div key={t.id} className="rowline xs">□ {t.text}</div>)}
          {s.tasks.filter(t => t.projectId === p.id && !t.done).length === 0 && <div className="sub" style={{ marginTop: 6 }}>なし</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="kicker">PROJECTS</div>
      <div className="sub" style={{ marginTop: 4 }}>CURRENT FOCUS {focusCount}/{FOCUS_MAX}　・　進行中 {active.length}/{PROJECT_MAX}</div>

      <div className="sec">
        {active.map(p => (
          <div key={p.id} className="proj-row">
            <button className="star-btn" onClick={() => toggleFocus(p.id)}>{p.status === 'focus' ? '★' : '☆'}</button>
            <div style={{ flex: 1 }} onClick={() => openProject(p.id)}>
              <div className="between"><div style={{ fontWeight: 700 }}>{p.name}</div><Mom p={p} /></div>
              <div style={{ marginTop: 6 }}><Meter v={p.progress || 0} /></div>
              <div className="xs" style={{ marginTop: 3 }}>{p.progress || 0}%　{(p.nextDeadline || {}).date ? `／ 次の期限 あと${daysUntil(p.nextDeadline.date)}日` : ''}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="sec">
        <div className="between"><div className="kicker">IDEA（すぐProjectにしない）</div><button className="btn-bare" onClick={() => setAdding(a => !a)}>{adding ? '閉じる' : '＋'}</button></div>
        {adding && <IdeaAdd onAdd={(t) => { set(p => ({ ...p, ideas: [{ id: uid(), text: t, createdAt: new Date().toISOString() }, ...p.ideas] })); setAdding(false); }} />}
        {s.ideas.map(idea => (
          <div key={idea.id} className="task">
            <div className="t-title">{idea.text}</div>
            <div className="row wrap" style={{ gap: 6, marginTop: 8 }}>
              <button className="btn btn-sm" onClick={() => setPromo(idea)}>Projectに昇格</button>
              <button className="btn-bare" onClick={() => set(p => ({ ...p, ideas: p.ideas.filter(x => x.id !== idea.id) }))}>捨てる</button>
            </div>
            {promo && promo.id === idea.id && <PromoteQ s={s} idea={idea} onDo={promoteIdea} onCancel={() => setPromo(null)} />}
          </div>
        ))}
      </div>
    </div>
  );
}
function IdeaAdd({ onAdd }) {
  const [v, setV] = useState('');
  return (
    <div style={{ marginTop: 8 }}>
      <textarea className="textarea" value={v} onChange={e => setV(e.target.value)} placeholder="思いついたこと" />
      <button className="btn btn-sm" style={{ marginTop: 6 }} onClick={() => v.trim() && onAdd(v.trim())} disabled={!v.trim()}>IDEAに保存</button>
    </div>
  );
}
function PromoteQ({ s, idea, onDo, onCancel }) {
  const [choice, setChoice] = useState(null);
  const [sac, setSac] = useState('');
  return (
    <div className="quit">
      <div style={{ fontWeight: 700, fontSize: 14 }}>これを始めるなら、何の時間を使う？</div>
      <div style={{ marginTop: 8 }}>
        {[['reduce', '現在のProjectの時間を減らす'], ['free', '自由時間を使う'], ['end', '既存Projectを終了する']].map(([k, l]) => (
          <label key={k} className="chk">
            <input type="radio" name="pq" checked={choice === k} onChange={() => setChoice(k)} />
            <span className="chk-t">{l}</span>
          </label>
        ))}
        {(choice === 'reduce' || choice === 'end') && (
          <select className="input" style={{ marginTop: 8 }} value={sac} onChange={e => setSac(e.target.value)}>
            <option value="">— 対象のProject —</option>
            {s.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        )}
      </div>
      <div className="row" style={{ gap: 6, marginTop: 10 }}>
        <button className="btn btn-sm btn-fill" disabled={!choice || ((choice === 'reduce' || choice === 'end') && !sac)} onClick={() => onDo(idea, choice, sac)}>昇格する</button>
        <button className="btn-bare" onClick={onCancel}>やめる</button>
      </div>
    </div>
  );
}

/* ============================================================
   ③ CAREER MAP
   ============================================================ */
function CareerMap({ s, set, openProject }) {
  const setOut = (k, v) => set(p => ({ ...p, ideal: { ...p.ideal, outcomes: { ...p.ideal.outcomes, [k]: v } } }));
  return (
    <div className="screen">
      <div className="kicker">CAREER MAP</div>
      <div className="sec">
        <div className="kicker">2030年の理想</div>
        <textarea className="textarea" style={{ marginTop: 6, fontSize: 15 }} value={s.ideal.headline} onChange={e => set(p => ({ ...p, ideal: { ...p.ideal, headline: e.target.value } }))} />
      </div>
      <div className="sec">
        <div className="kicker">達成したい4つの成果</div>
        {OUTCOMES.map(o => (
          <div key={o.id} style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 13 }}>{o.name}</div>
            <textarea className="textarea" style={{ marginTop: 4 }} value={s.ideal.outcomes[o.id] || ''} onChange={e => setOut(o.id, e.target.value)} />
            <div style={{ marginTop: 6 }}>
              {s.projects.filter(p => p.outcome === o.id).map(p => (
                <div key={p.id} className="map-proj" onClick={() => openProject(p.id)}>
                  <span style={{ flex: 1 }}>{p.name}</span><span className="num xs">{p.progress || 0}%</span><Mom p={p} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="sec-line"><div className="xs">Projectの成果カテゴリはPROJECTS詳細では変えられません（このMAP上の並びで管理）。</div></div>
    </div>
  );
}

/* ============================================================
   ④ CAREER INDEX
   ============================================================ */
function IndexScreen({ s }) {
  const [days, setDays] = useState(30);
  const [pick, setPick] = useState(null);
  const info = useMemo(() => indexInfo(s.index.log, days), [s.index.log, days]);
  const events = (s.index.log || []).filter(e => (e.events || []).length).slice().reverse();
  const RANGES = [[7, '7D'], [30, '30D'], [90, '3M'], [365, '1Y'], [99999, 'ALL']];
  return (
    <div className="screen">
      <div className="kicker">CAREER INDEX</div>
      <div className="row" style={{ alignItems: 'baseline', gap: 14, marginTop: 4 }}>
        <div className="idx-now">{info.now.toFixed(1)}</div>
        <div className="idx-chg" style={{ color: info.chg >= 0 ? 'var(--up)' : 'var(--down)' }}>
          {info.arrow} {info.chg >= 0 ? '+' : ''}{info.pct.toFixed(1)}%
        </div>
      </div>
      <div className="xs">{RANGES.find(r => r[0] === days)[1]} の変化</div>

      <div style={{ marginTop: 12 }}><IndexChart log={s.index.log} days={days} showDots onPick={setPick} h={150} /></div>
      <div className="seg" style={{ marginTop: 10 }}>
        {RANGES.map(([d, l]) => <button key={d} className={days === d ? 'on' : ''} onClick={() => setDays(d)}>{l}</button>)}
      </div>

      {pick && (
        <div className="quit">
          <div className="kicker">{fmtFull(pick.date)}</div>
          <div className="num" style={{ marginTop: 4 }}>{r1(pick.value - pick.delta)} → {pick.value}（{pick.delta >= 0 ? '+' : ''}{pick.delta}）</div>
          <div style={{ marginTop: 6 }}>
            {pick.events.map((e, i) => <div key={i} className="xs">・{e.reason}（{e.amt >= 0 ? '+' : ''}{e.amt}）</div>)}
          </div>
        </div>
      )}

      <div className="sec">
        <div className="kicker">なぜ動いたか</div>
        {events.length === 0 && <div className="sub" style={{ marginTop: 6 }}>まだ記録がありません。</div>}
        {events.map((e, i) => (
          <div key={i} className="rowline">
            <div className="between"><span className="xs num">{fmtFull(e.date)}</span><span className="num xs" style={{ color: e.delta >= 0 ? 'var(--up)' : 'var(--down)' }}>{e.delta >= 0 ? '+' : ''}{e.delta} → {e.value}</span></div>
            {e.events.map((x, j) => <div key={j} className="xs">・{x.reason}</div>)}
          </div>
        ))}
      </div>

      <div className="sec-line"><div className="xs">この数値・％は年収や就職可能性ではなく、「設定したキャリア目標に対する自分の行動量・進捗の変化」です。</div></div>
    </div>
  );
}

/* ============================================================
   設定
   ============================================================ */
function Settings({ s, set, go }) {
  const [imp, setImp] = useState('');
  const w = s.weights;
  const setW = (k, v) => set(p => ({ ...p, weights: { ...p.weights, [k]: Number(v) || 0 } }));
  function exportJSON() { const t = JSON.stringify(s); if (navigator.clipboard) navigator.clipboard.writeText(t).then(() => alert('コピーしました'), () => prompt('コピー', t)); else prompt('コピー', t); }
  function importJSON() { try { const o = JSON.parse(imp); set(() => ({ ...defaultState(), ...o })); setImp(''); alert('インポートしました'); } catch (e) { alert('読み取れませんでした'); } }
  function wipe() { if (confirm('すべて消して初期化します。')) set(() => defaultState()); }
  return (
    <div className="screen">
      <div className="between"><div className="kicker">設定</div><button className="btn-bare" onClick={() => go('home')}>閉じる</button></div>

      <div className="sec">
        <div className="kicker">指数の変動幅（調整可）</div>
        <div className="grid2" style={{ marginTop: 10 }}>
          {[['taskHigh','重要タスク完了'],['taskMed','通常タスク完了'],['focusBonus','FOCUS加算'],['milestone','マイルストーン'],['milestoneBig','マイルストーン(大)'],['stall','数日 進捗なし'],['deadlineNoProgress','締切近いのに進捗なし'],['stallDays','何日で下降開始'],['deadlineWindow','締切の警戒日数'],['dailyOrdinaryCap','通常タスクの日次上限']].map(([k, l]) => (
            <div className="field" key={k}><label>{l}</label><input className="input num" value={w[k]} onChange={e => setW(k, e.target.value)} /></div>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="kicker">データ</div>
        <button className="btn btn-block" style={{ marginTop: 10 }} onClick={exportJSON}>JSONバックアップをコピー</button>
        <textarea className="textarea" style={{ marginTop: 10 }} placeholder="JSONを貼ってインポート" value={imp} onChange={e => setImp(e.target.value)} />
        <button className="btn btn-block" style={{ marginTop: 10 }} onClick={importJSON} disabled={!imp.trim()}>インポート</button>
        <button className="btn btn-block" style={{ marginTop: 10, borderColor: 'var(--down)', color: 'var(--down)' }} onClick={wipe}>すべて消して初期化</button>
      </div>
      <div className="sec-line"><div className="xs">データは端末内のみ。Safariで「ホーム画面に追加」でアプリになります。</div></div>
    </div>
  );
}

/* ============================================================
   NAV / APP
   ============================================================ */
function Nav({ tab, go }) {
  const items = [['home','ホーム'],['projects','PROJECTS'],['map','MAP'],['index','指数']];
  return (
    <div className="nav">
      {items.map(([id, label]) => (
        <button key={id} className={`nav-item ${tab === id || (id === 'projects' && tab === 'projects') ? 'active' : ''}`} onClick={() => go(id)}><span>{label}</span></button>
      ))}
    </div>
  );
}
function App() {
  const [s, setS] = useState(() => ensureIndex(loadState()));
  const [tab, setTab] = useState('home');
  const [selProject, setSelProject] = useState(null);
  useEffect(() => { saveState(s); }, [s]);
  useEffect(() => { window.scrollTo(0, 0); }, [tab, selProject]);
  const set = (fn) => setS(prev => (typeof fn === 'function' ? fn(prev) : fn));
  const go = (t) => { setTab(t); if (t !== 'projects') setSelProject(null); };
  const openProject = (id) => { setSelProject(id); setTab('projects'); };
  return (
    <div>
      {tab === 'home' && <Home s={s} set={set} go={go} openProject={openProject} />}
      {tab === 'projects' && <Projects s={s} set={set} sel={selProject} setSel={setSelProject} openProject={openProject} />}
      {tab === 'map' && <CareerMap s={s} set={set} openProject={openProject} />}
      {tab === 'index' && <IndexScreen s={s} />}
      {tab === 'settings' && <Settings s={s} set={set} go={go} />}
      {tab !== 'settings' && <Nav tab={tab} go={go} />}
    </div>
  );
}
ReactDOM.render(React.createElement(App), document.getElementById('root'));
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
