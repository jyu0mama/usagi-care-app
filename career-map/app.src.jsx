const { useState, useEffect, useMemo } = React;

/* ============================================================
   定数
   ============================================================ */
const KEY = 'careermap_v4';
const INDEX_START = 100;
const FOCUS_MAX = 3;
const TODAY_MAX = 3;

const OUTCOMES = [
  { id: 'career', name: 'CAREER', desc: '博報堂・電通を含め、コンサル・商社など複数の業界・企業を選択肢として持つ。' },
  { id: 'global', name: 'GLOBAL', desc: '交換留学を経験し、英語を使って生活・学習できる。' },
  { id: 'research', name: 'RESEARCH', desc: '論文執筆・学会発表。' },
  { id: 'project', name: 'PROJECT', desc: '継続的に動く組織・プロジェクトを作る。' },
];
const OUT_MAP = Object.fromEntries(OUTCOMES.map(o => [o.id, o]));

const ACTIONS = {
  english: ['Vocabulary', 'Reading', 'Listening', 'Writing', 'Mock Test', 'Other'],
  research: ['Reading', 'Research Design', 'Data Collection', 'Analysis', 'Writing', 'Presentation', 'Other'],
  project: ['Planning', 'Meeting', 'Fieldwork', 'Execution', 'Improvement', 'Other'],
  university: ['授業課題', '復習', '試験対策', 'レポート', 'Other'],
  career: ['自己分析', '業界研究', 'ES作成', 'Webテスト', '面接準備', 'Other'],
  study: ['情報収集', '書類準備', 'エッセイ', '手続き', 'Other'],
};

const ROADMAP = [
  { year: 2026, summary: '英語・GPA・研究', events: ['英語の現状把握', '英語試験 初回受験', '博報堂インターン', 'GPA維持', '自然環境音研究 開始'] },
  { year: 2027, summary: '留学出願・インターン', events: ['英語スコア確定', 'サマーインターン', '交換留学 出願', '留学先 決定'] },
  { year: 2028, summary: 'Exchange Study', events: ['渡航準備', '交換留学 開始'] },
  { year: 2029, summary: 'Job Hunting', events: ['留学経験の整理', 'インターン', '就職活動'] },
  { year: 2030, summary: 'Graduation', events: ['本選考', '卒業', '就職'] },
];
const MON3 = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/* ============================================================
   ユーティリティ（日付はローカル。toISOString()は使わない）
   ============================================================ */
const uid = () => 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const WD = ['日', '月', '火', '水', '木', '金', '土'];
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const r1 = (n) => Math.round(n * 10) / 10;

function pad2(n) { return String(n).padStart(2, '0'); }
function isoOf(d) { return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; }
function todayISO() { return isoOf(new Date()); }
function parseISO(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1); }
function addDaysISO(iso, n) { const d = parseISO(iso); d.setDate(d.getDate() + n); return isoOf(d); }
function fmtDate(iso) { const d = parseISO(iso); return `${d.getMonth() + 1}月${d.getDate()}日`; }
function fmtFull(iso) { const d = parseISO(iso); return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`; }
function daysUntil(iso) { return Math.round((parseISO(iso) - parseISO(todayISO())) / 86400000); }
function daysSince(isoDT) { if (!isoDT) return 9999; return Math.floor((Date.now() - new Date(isoDT).getTime()) / 86400000); }
function daysSinceDate(iso) { return Math.floor((parseISO(todayISO()) - parseISO(iso)) / 86400000); }
function nowLabel() { const d = new Date(); return `${d.getFullYear()} ${MON3[d.getMonth()]}`; }

/* ============================================================
   シード
   ============================================================ */
function seedProjects() {
  const M = (label, big) => ({ id: uid(), label, done: false, doneAt: null, big: !!big });
  const P = (o) => ({ id: uid(), status: 'active', deadline: null, milestones: [], moveLog: [], nextActionText: '', ...o });
  return [
    P({ name: '英語', emoji: '🔤', kind: 'english', outcome: 'global', status: 'focus',
      goal: '交換留学の資格を取得し、英語を使える状態になる。',
      deadline: { label: '英語試験 初回受験', date: '2026-12-31' },
      milestones: [M('現状把握（過去問）'), M('英語試験を受験'), M('目標スコア達成', true), M('公式スコアレポート入手')] }),
    P({ name: '大学 / GPA', emoji: '🎓', kind: 'university', outcome: 'career', status: 'focus',
      goal: '留学と卒業に必要な学業成績を維持する。',
      milestones: [M('1年秋のGPAを2.0以上で確定', true), M('2年春までの累積GPAで協定校基準クリア', true)] }),
    P({ name: '自然環境音研究', emoji: '🔬', kind: 'research', outcome: 'research', status: 'focus',
      goal: '論文執筆・学会発表。',
      milestones: [M('研究テーマ決定', true), M('データ収集を開始'), M('論文ドラフト完成', true), M('学会発表', true)] }),
    P({ name: '交換留学', emoji: '✈️', kind: 'study', outcome: 'global',
      goal: '2028年秋から交換留学する。',
      deadline: { label: '学内選考 出願', date: '2027-09-15' },
      milestones: [M('英語資格取得'), M('GPA条件達成'), M('志望校決定'), M('出願書類準備'), M('学内選考 出願'), M('留学決定', true), M('渡航', true)] }),
    P({ name: '馬佐良プロジェクト', emoji: '🌿', kind: 'project', outcome: 'project',
      goal: '慶應公認団体化・継続的な組織化。',
      milestones: [M('公認団体の要件を確認'), M('自分に依存しない運営体制'), M('慶應の公認団体になる', true)] }),
    P({ name: '就職準備', emoji: '💼', kind: 'career', outcome: 'career',
      goal: '2030年の選考に向けて経験・スキルを蓄積する。',
      deadline: { label: '博報堂インターン 申込〆切', date: '2026-10-02' },
      milestones: [M('博報堂インターンに参加'), M('サマーインターンに参加'), M('早期選考で内々定', true)] }),
  ];
}
function defaultState() {
  const ps = seedProjects();
  const pid = (n) => (ps.find(p => p.name === n) || {}).id;
  return {
    version: 4,
    tipsSeen: false,
    ideal: { headline: '2030年3月・目指す企業・業界を選べる状態で就活する。', outcomes: Object.fromEntries(OUTCOMES.map(o => [o.id, o.desc])) },
    weights: { small: 1, focusBonus: 2, milestone: 12, milestoneBig: 25, stall: -2, deadlineNoProgress: -4, stallDays: 4, deadlineWindow: 30, dailyCap: 8 },
    projects: ps,
    today: [
      { id: uid(), projectId: pid('英語'), action: 'Reading', done: false, doneAt: null },
      { id: uid(), projectId: pid('自然環境音研究'), action: 'Research Design', done: false, doneAt: null },
      { id: uid(), projectId: pid('大学 / GPA'), action: '授業課題', done: false, doneAt: null },
    ],
    routines: [
      { id: uid(), name: 'English Routine', projectId: pid('英語'), actions: ['Vocabulary', 'Reading', 'Listening'] },
      { id: uid(), name: 'Research Routine', projectId: pid('自然環境音研究'), actions: ['Reading', 'Data Collection', 'Analysis'] },
      { id: uid(), name: 'University Routine', projectId: pid('大学 / GPA'), actions: ['授業課題', '復習', '試験対策'] },
    ],
    activity: [],
    ideas: [{ id: uid(), text: '里山プロジェクトのInstagramを毎日更新する', createdAt: new Date().toISOString() }],
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
function progressOf(p) {
  const ms = p.milestones || [];
  if (!ms.length) return 0;
  return Math.round(ms.filter(m => m.done).length / ms.length * 100);
}
function nextActionOf(p) {
  const m = (p.milestones || []).find(x => !x.done);
  return (p.nextActionText && p.nextActionText.trim()) || (m ? m.label : '—');
}
function lastProgressAt(s) {
  let t = 0;
  (s.activity || []).forEach(a => { t = Math.max(t, parseISO(a.date).getTime()); });
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
  if (!today.checked && nl.length > w.stallDays) {
    let add = 0; const evs = [];
    const lp = lastProgressAt(s);
    const dsp = lp ? daysSince(lp) : 999;
    if (dsp >= w.stallDays && dsp < 900) { add += w.stall; evs.push({ reason: `重要な活動が ${dsp}日 進んでいません`, amt: w.stall }); }
    (s.projects || []).forEach(p => {
      if (p.deadline && p.deadline.date) {
        const du = daysUntil(p.deadline.date);
        const recent = (p.moveLog || []).some(m => daysSinceDate(m.date) < w.stallDays);
        if (du >= 0 && du <= w.deadlineWindow && !recent) {
          add += w.deadlineNoProgress;
          evs.push({ reason: `${p.name}：締切まで${du}日、進捗なし`, amt: w.deadlineNoProgress, projectId: p.id });
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
  return { ...s, index: { ...s.index, log: nl.slice(-560) } };
}
function bumpIndex(s, amt, reason, projectId) {
  const log = [...((s.index && s.index.log) || [])];
  if (!log.length || log[log.length - 1].date !== todayISO()) {
    const prev = log.length ? log[log.length - 1].value : (s.index.start || INDEX_START);
    log.push({ date: todayISO(), value: prev, delta: 0, events: [], checked: true });
  }
  const e = { ...log[log.length - 1] };
  e.delta = r1((e.delta || 0) + amt);
  e.events = [...(e.events || []), { reason, amt: r1(amt), projectId }];
  const prev = log.length > 1 ? log[log.length - 2].value : (s.index.start || INDEX_START);
  e.value = r1(prev + e.delta);
  log[log.length - 1] = e;
  return { ...s, index: { ...s.index, log } };
}
function gainToday(s) {
  const log = (s.index && s.index.log) || [];
  if (!log.length || log[log.length - 1].date !== todayISO()) return 0;
  return (log[log.length - 1].events || []).filter(e => e._sm).reduce((a, e) => a + Math.max(0, e.amt), 0);
}
function indexInfo(log, days) {
  const cut = addDaysISO(todayISO(), -days);
  const win = (log || []).filter(e => e.date >= cut);
  const series = win.length ? win : (log || []).slice(-2);
  const now = series.length ? series[series.length - 1].value : INDEX_START;
  // データが1点しかない日でも、その日の変化を見せる（当日デルタ差し引きを基準に）
  const base = series.length
    ? (series.length === 1 ? r1(series[0].value - (series[0].delta || 0)) : series[0].value)
    : INDEX_START;
  const chg = r1(now - base);
  const pct = base ? chg / base * 100 : 0;
  const arrow = chg > 0.4 ? '↗' : chg < -0.4 ? '↘' : '→';
  return { now, base, chg, pct, arrow, series };
}
function momentum(p) {
  const ml = p.moveLog || [];
  const r = ml.filter(m => daysSinceDate(m.date) < 30).reduce((a, m) => a + m.amt, 0);
  const q = ml.filter(m => { const d = daysSinceDate(m.date); return d >= 30 && d < 60; }).reduce((a, m) => a + m.amt, 0);
  if (r === 0 && q === 0) return { a: '→', l: 'Stable' };
  if (r > q * 1.2 && r > 0) return { a: '↗', l: 'Growing' };
  if (r < q * 0.6 || (r === 0 && q > 0)) return { a: '↘', l: 'Slowing' };
  return { a: '→', l: 'Stable' };
}
function projById(s, id) { return (s.projects || []).find(p => p.id === id); }
function upcomingDeadlines(s, n) {
  return (s.projects || []).map(p => p.deadline && p.deadline.date ? { ...p.deadline, project: p.name, emoji: p.emoji } : null)
    .filter(Boolean).filter(d => daysUntil(d.date) >= -1).sort((a, b) => a.date.localeCompare(b.date)).slice(0, n || 3);
}

/* ============================================================
   共通パーツ
   ============================================================ */
function Ring({ v }) {
  const R = 15, C = 2 * Math.PI * R;
  return (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r={R} fill="none" stroke="var(--line)" strokeWidth="3.5" />
      <circle cx="18" cy="18" r={R} fill="none" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round"
        strokeDasharray={`${C * v / 100} ${C}`} transform="rotate(-90 18 18)" />
    </svg>
  );
}
function Bar({ v }) { return <div className="bar"><span style={{ width: clamp(v, 0, 100) + '%' }} /></div>; }
function Trend({ p }) { const m = momentum(p); return <span className={`trend t-${m.l.toLowerCase()}`}>{m.a} {m.l}</span>; }

function IndexChart({ log, days, showMarkers, onPick, h }) {
  const info = indexInfo(log, days);
  const s = info.series;
  const pts = s.length >= 2 ? s : [{ date: addDaysISO((s[0] || { date: todayISO() }).date, -1), value: (s[0] || { value: INDEX_START }).value, events: [] }, ...s];
  const vals = pts.map(p => p.value);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const pad = (hi - lo || 4) * 0.18;
  const mn = lo - pad, mx = hi + pad, rng = mx - mn || 1;
  const W = 320, HT = h || 120;
  const x = (i) => (i / (pts.length - 1)) * W;
  const y = (v) => HT - ((v - mn) / rng) * HT;
  const line = pts.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `0,${HT} ${line} ${W},${HT}`;
  const up = info.chg >= 0;
  const col = up ? 'var(--up)' : 'var(--down)';
  return (
    <svg viewBox={`0 0 ${W} ${HT + 4}`} width="100%" preserveAspectRatio="none" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="cig" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={up ? '#34A853' : '#E5484D'} stopOpacity="0.16" />
          <stop offset="1" stopColor={up ? '#34A853' : '#E5484D'} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#cig)" />
      <polyline points={line} fill="none" stroke={col} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {showMarkers && pts.map((p, i) => (p.events && p.events.length
        ? <circle key={i} cx={x(i)} cy={y(p.value)} r="3.4" fill="#fff" stroke={col} strokeWidth="2" style={{ cursor: 'pointer' }} onClick={() => onPick && onPick(p)} />
        : null))}
      <circle cx={x(pts.length - 1)} cy={y(vals[vals.length - 1])} r="3" fill={col} />
    </svg>
  );
}

/* ============================================================
   ＋ Add Progress
   ============================================================ */
function AddProgress({ s, set, onClose }) {
  const [pid, setPid] = useState((s.projects.find(p => p.status === 'focus') || s.projects[0] || {}).id);
  const [action, setAction] = useState(null);
  const [mins, setMins] = useState(null);
  const proj = projById(s, pid);
  const acts = (proj && ACTIONS[proj.kind]) || ACTIONS.project;

  function done() {
    set(p => {
      const pr = projById(p, pid); const w = p.weights;
      let amt = w.small + (pr.status === 'focus' ? w.focusBonus : 0);
      amt = Math.max(0, Math.min(amt, w.dailyCap - gainToday(p)));
      let np = { ...p,
        projects: p.projects.map(x => x.id === pid ? { ...x, moveLog: [...(x.moveLog || []), { date: todayISO(), amt: 1 }] } : x),
        activity: [{ date: todayISO(), projectId: pid, action: action || '進捗', minutes: mins || null }, ...(p.activity || [])].slice(0, 200),
        today: p.today.map(t => (t.projectId === pid && !t.done && (t.action === action || !action)) ? { ...t, done: true, doneAt: new Date().toISOString() } : t),
      };
      if (amt > 0) {
        np = bumpIndex(np, amt, `${pr.name} — ${action || '進捗'}${mins ? ' ' + mins + 'min' : ''}`, pid);
        const lg = np.index.log; lg[lg.length - 1].events[lg[lg.length - 1].events.length - 1]._sm = true;
      }
      return np;
    });
    onClose();
  }

  return (
    <div className="sheet">
      <div className="sheet-in">
        <div className="between"><div className="h2">Add Progress</div><button className="x" onClick={onClose}>✕</button></div>
        <div className="lbl">Project</div>
        <div className="chips">
          {s.projects.map(p => <button key={p.id} className={`chip ${pid === p.id ? 'on' : ''}`} onClick={() => { setPid(p.id); setAction(null); }}>{p.emoji} {p.name}</button>)}
        </div>
        <div className="lbl">Action</div>
        <div className="chips">
          {acts.map(a => <button key={a} className={`chip ${action === a ? 'on' : ''}`} onClick={() => setAction(a)}>{a}</button>)}
        </div>
        <div className="lbl">Time（任意）</div>
        <div className="chips">
          {[15, 30, 60, 90].map(m => <button key={m} className={`chip ${mins === m ? 'on' : ''}`} onClick={() => setMins(mins === m ? null : m)}>{m}min</button>)}
        </div>
        <button className="btn btn-fill btn-block" style={{ marginTop: 16 }} onClick={done} disabled={!action}>Done</button>
      </div>
    </div>
  );
}

/* ============================================================
   ① HOME
   ============================================================ */
function Home({ s, set, go, openProject }) {
  const [days, setDays] = useState(30);
  const [pick, setPick] = useState(null);
  const [adding, setAdding] = useState(false);
  const info = useMemo(() => indexInfo(s.index.log, days), [s.index.log, days]);
  const focus = s.projects.filter(p => p.status === 'focus').slice(0, FOCUS_MAX);
  const today = s.today.slice(0, TODAY_MAX);
  const dls = upcomingDeadlines(s, 3);
  const RANGES = [[7, '7D'], [30, '30D'], [90, '3M'], [365, '1Y'], [99999, 'ALL']];
  const info30 = useMemo(() => indexInfo(s.index.log, 30), [s.index.log]);

  function toggleToday(id) {
    set(p => {
      const t = p.today.find(x => x.id === id); if (!t || t.done) return p;
      const pr = projById(p, t.projectId); const w = p.weights;
      let amt = w.small + (pr && pr.status === 'focus' ? w.focusBonus : 0);
      amt = Math.max(0, Math.min(amt, w.dailyCap - gainToday(p)));
      let np = { ...p,
        today: p.today.map(x => x.id === id ? { ...x, done: true, doneAt: new Date().toISOString() } : x),
        projects: p.projects.map(x => x.id === t.projectId ? { ...x, moveLog: [...(x.moveLog || []), { date: todayISO(), amt: 1 }] } : x),
        activity: [{ date: todayISO(), projectId: t.projectId, action: t.action, minutes: null }, ...(p.activity || [])].slice(0, 200),
      };
      if (amt > 0 && pr) { np = bumpIndex(np, amt, `${pr.name} — ${t.action}`, t.projectId); const lg = np.index.log; lg[lg.length - 1].events[lg[lg.length - 1].events.length - 1]._sm = true; }
      return np;
    });
  }
  function addRoutine(rt) {
    set(p => {
      const room = TODAY_MAX - p.today.filter(t => !t.done).length;
      if (room <= 0) return p;
      const add = rt.actions.slice(0, room).map(a => ({ id: uid(), projectId: rt.projectId, action: a, done: false, doneAt: null }));
      return { ...p, today: [...p.today, ...add] };
    });
  }

  return (
    <div className="screen">
      <div className="between topbar">
        <div className="date">{fmtDate(todayISO())}（{WD[parseISO(todayISO()).getDay()]}）</div>
        <button className="gear" onClick={() => go('settings')}>⚙</button>
      </div>

      {/* Career Index */}
      <div className="card">
        <div className="lbl">CAREER INDEX</div>
        <div className="idx-now">{info30.now.toFixed(1)}</div>
        <div className="idx-sub" style={{ color: info30.chg >= 0 ? 'var(--up)' : 'var(--down)' }}>
          {info30.arrow} {info30.chg >= 0 ? '+' : ''}{info30.chg} this month
        </div>
        <div style={{ marginTop: 14 }}><IndexChart log={s.index.log} days={days} showMarkers onPick={setPick} h={116} /></div>
        <div className="range">
          {RANGES.map(([d, l]) => <button key={d} className={days === d ? 'on' : ''} onClick={() => { setDays(d); setPick(null); }}>{l}</button>)}
        </div>
        {pick && (
          <div className="pick">
            <div className="lbl">{fmtFull(pick.date)}</div>
            <div className="pick-v">{r1(pick.value - pick.delta)} → {pick.value}</div>
            {pick.events.map((e, i) => (
              <div key={i} className="pick-e">
                <span>{e.reason}</span>
                {e.projectId && projById(s, e.projectId) && <span className="pick-p">{projById(s, e.projectId).name}</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {!s.tipsSeen && (
        <div className="card soft">
          <div className="sub">指数は株価ではなく「2030年に向けて最近どれだけ前進できているか」。数をこなしても上がらない。重要な活動が数日止まると緩く下がる（1日の休みでは下げない）。</div>
          <button className="btn btn-sm" style={{ marginTop: 10 }} onClick={() => set(p => ({ ...p, tipsSeen: true }))}>OK</button>
        </div>
      )}

      {/* Current Focus */}
      <div className="card">
        <div className="between"><div className="lbl">CURRENT FOCUS</div><button className="link" onClick={() => go('projects')}>変更</button></div>
        {focus.length === 0 && <div className="sub" style={{ marginTop: 6 }}>PROJECTSで最大3つ選ぶ。</div>}
        {focus.map(p => (
          <div key={p.id} className="focus" onClick={() => openProject(p.id)}>
            <span className="emo">{p.emoji}</span>
            <span className="fname">{p.name}</span>
            <span className="fpct">{progressOf(p)}%</span>
          </div>
        ))}
      </div>

      {/* Today */}
      <div className="card">
        <div className="lbl">TODAY</div>
        {today.length === 0 && <div className="sub" style={{ marginTop: 6 }}>ルーティンから追加、または Add Progress で記録。</div>}
        {today.map(t => {
          const pr = projById(s, t.projectId);
          return (
            <div key={t.id} className="todo">
              <button className={`ck ${t.done ? 'on' : ''}`} onClick={() => toggleToday(t.id)}>{t.done ? '✓' : ''}</button>
              <div style={{ flex: 1 }}>
                <div className="tt" style={{ textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'var(--sub)' : 'var(--ink)' }}>{t.action}</div>
                <div className="ts">{pr ? `${pr.emoji} ${pr.name}` : '—'}</div>
              </div>
              <button className="x sm" onClick={() => set(p => ({ ...p, today: p.today.filter(x => x.id !== t.id) }))}>✕</button>
            </div>
          );
        })}
        <div className="rts">
          {s.routines.map(rt => <button key={rt.id} className="chip sm" onClick={() => addRoutine(rt)}>＋ {rt.name}</button>)}
        </div>
      </div>

      <button className="btn btn-fill btn-block big" onClick={() => setAdding(true)}>＋ Add Progress</button>

      {/* Next Deadline */}
      <div className="card">
        <div className="lbl">NEXT DEADLINE</div>
        {dls.length === 0 && <div className="sub" style={{ marginTop: 6 }}>設定なし</div>}
        {dls.map((d, i) => {
          const du = daysUntil(d.date);
          return (
            <div key={i} className="dl">
              <div className="dl-m">{MON3[parseISO(d.date).getMonth()]} {parseISO(d.date).getDate()}</div>
              <div style={{ flex: 1 }}>
                <div className="dl-t">{d.label}</div>
                <div className="ts">{d.emoji} {d.project}</div>
              </div>
              <div className="dl-d" style={{ color: du <= 14 ? 'var(--down)' : 'var(--sub)' }}>{du < 0 ? 'now' : `${du}d`}</div>
            </div>
          );
        })}
      </div>

      {adding && <AddProgress s={s} set={set} onClose={() => setAdding(false)} />}
    </div>
  );
}

/* ============================================================
   ② ROADMAP
   ============================================================ */
function Roadmap({ s }) {
  const curYear = new Date().getFullYear();
  const [open, setOpen] = useState(curYear);
  return (
    <div className="screen">
      <div className="lbl">ROADMAP</div>
      <div className="now-line">● NOW　{nowLabel()}</div>
      <div className="rm-strip">
        {ROADMAP.map(r => (
          <button key={r.year} className={`rm-yr ${r.year === open ? 'open' : ''} ${r.year < curYear ? 'past' : ''} ${r.year === curYear || r.year === curYear + 1 ? 'near' : ''}`} onClick={() => setOpen(r.year)}>
            <div className="rm-y">{r.year}</div>
            <div className="rm-s">{r.summary}</div>
            {r.year === curYear && <div className="rm-now">▲</div>}
          </button>
        ))}
      </div>
      {ROADMAP.filter(r => r.year === open).map(r => (
        <div key={r.year} className={`card ${r.year < curYear ? 'faint' : ''}`}>
          <div className="between"><div className="h2">{r.year}</div><div className="sub">{r.summary}</div></div>
          <div style={{ marginTop: 8 }}>
            {r.events.map((e, i) => <div key={i} className="rm-e">{r.year < curYear ? '◦' : '•'} {e}</div>)}
          </div>
        </div>
      ))}
      <div className="card soft"><div className="sub">日々のタスクは載せません。大きなイベントだけ。年をタップで切り替え。</div></div>
    </div>
  );
}

/* ============================================================
   ③ PROJECTS
   ============================================================ */
function Projects({ s, set, sel, setSel, openProject }) {
  const [adding, setAdding] = useState(false);
  const [promo, setPromo] = useState(null);
  const detail = sel && projById(s, sel);
  const focusCount = s.projects.filter(p => p.status === 'focus').length;

  function toggleFocus(id) {
    set(p => {
      const pr = p.projects.find(x => x.id === id);
      if (pr.status !== 'focus' && p.projects.filter(x => x.status === 'focus').length >= FOCUS_MAX) { alert(`Current Focus は最大 ${FOCUS_MAX} つ。`); return p; }
      return { ...p, projects: p.projects.map(x => x.id === id ? { ...x, status: x.status === 'focus' ? 'active' : 'focus' } : x) };
    });
  }
  function toggleMs(pid, mid) {
    set(p => {
      const pr = p.projects.find(x => x.id === pid);
      const ms = pr.milestones.find(m => m.id === mid);
      const turningOn = !ms.done;
      let np = { ...p, projects: p.projects.map(x => x.id === pid ? {
        ...x,
        moveLog: turningOn ? [...(x.moveLog || []), { date: todayISO(), amt: 6 }] : x.moveLog,
        milestones: x.milestones.map(m => m.id === mid ? { ...m, done: turningOn, doneAt: turningOn ? new Date().toISOString() : null } : m),
      } : x) };
      if (turningOn) {
        const amt = ms.big ? p.weights.milestoneBig : p.weights.milestone;
        np = bumpIndex(np, amt, `マイルストーン達成：${ms.label}（${pr.name}）`, pid);
      }
      return np;
    });
  }
  function setField(id, k, v) { set(p => ({ ...p, projects: p.projects.map(x => x.id === id ? { ...x, [k]: v } : x) })); }
  function setDl(id, k, v) { set(p => ({ ...p, projects: p.projects.map(x => x.id === id ? { ...x, deadline: { ...(x.deadline || { label: '', date: '' }), [k]: v } } : x) })); }
  function promote(idea, choice, sac) {
    set(p => {
      let np = { ...p };
      if (choice === 'end' && sac) np = { ...np, projects: np.projects.filter(x => x.id !== sac) };
      if (choice === 'reduce' && sac) np = { ...np, projects: np.projects.map(x => x.id === sac ? { ...x, status: 'active' } : x) };
      np = { ...np,
        projects: [...np.projects, { id: uid(), name: idea.text.slice(0, 18), emoji: '•', kind: 'project', outcome: 'career', goal: idea.text, status: 'active', deadline: null, milestones: [], moveLog: [], nextActionText: '最初の一歩を決める' }],
        ideas: np.ideas.filter(x => x.id !== idea.id) };
      return np;
    });
    setPromo(null);
  }

  if (detail) {
    const p = detail; const m = momentum(p); const pct = progressOf(p);
    return (
      <div className="screen">
        <button className="link" onClick={() => setSel(null)}>‹ Projects</button>
        <div className="card">
          <div className="between">
            <div className="h1">{p.emoji} {p.name}</div>
            <button className={`chip ${p.status === 'focus' ? 'on' : ''}`} onClick={() => toggleFocus(p.id)}>{p.status === 'focus' ? '★ Focus' : 'Focusにする'}</button>
          </div>
          <div className="row" style={{ gap: 12, marginTop: 12, alignItems: 'center' }}>
            <Ring v={pct} />
            <div><div className="big-n">{pct}%</div><Trend p={p} /></div>
          </div>
        </div>
        <div className="card">
          <div className="lbl">GOAL</div>
          <textarea className="ta" value={p.goal || ''} onChange={e => setField(p.id, 'goal', e.target.value)} />
        </div>
        <div className="card">
          <div className="lbl">NEXT DEADLINE</div>
          <input className="in" placeholder="内容" value={(p.deadline || {}).label || ''} onChange={e => setDl(p.id, 'label', e.target.value)} />
          <input className="in" style={{ marginTop: 8 }} placeholder="YYYY-MM-DD" value={(p.deadline || {}).date || ''} onChange={e => setDl(p.id, 'date', e.target.value)} />
          {(p.deadline || {}).date && <div className="sub" style={{ marginTop: 6 }}>あと {daysUntil(p.deadline.date)}日</div>}
        </div>
        <div className="card">
          <div className="lbl">MILESTONES（達成で進捗が自動計算）</div>
          {(p.milestones || []).map(ms => (
            <div key={ms.id} className="todo">
              <button className={`ck ${ms.done ? 'on' : ''}`} onClick={() => toggleMs(p.id, ms.id)}>{ms.done ? '✓' : ''}</button>
              <div className="tt" style={{ flex: 1, textDecoration: ms.done ? 'line-through' : 'none', color: ms.done ? 'var(--sub)' : 'var(--ink)' }}>{ms.label}{ms.big && <span className="sub"> ・大</span>}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="lbl">最近の記録</div>
          {(s.activity || []).filter(a => a.projectId === p.id).slice(0, 8).map((a, i) => (
            <div key={i} className="ts" style={{ padding: '4px 0' }}>{fmtDate(a.date)}　{a.action}{a.minutes ? ` ・${a.minutes}min` : ''}</div>
          ))}
          {(s.activity || []).filter(a => a.projectId === p.id).length === 0 && <div className="sub" style={{ marginTop: 6 }}>まだなし</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="lbl">PROJECTS</div>
      <div className="sub" style={{ marginTop: 4 }}>Current Focus {focusCount}/{FOCUS_MAX}</div>
      {s.projects.map(p => (
        <div key={p.id} className="pcard" onClick={() => openProject(p.id)}>
          <div className="between">
            <div className="pname">{p.emoji} {p.name}</div>
            <button className="star" onClick={e => { e.stopPropagation(); toggleFocus(p.id); }}>{p.status === 'focus' ? '★' : '☆'}</button>
          </div>
          <div className="row" style={{ gap: 10, marginTop: 10 }}>
            <div style={{ flex: 1 }}><Bar v={progressOf(p)} /></div>
            <div className="big-n sm">{progressOf(p)}%</div>
          </div>
          <div className="between" style={{ marginTop: 8 }}>
            <Trend p={p} />
            <div className="ts">Next：{nextActionOf(p)}</div>
          </div>
        </div>
      ))}

      <div className="card">
        <div className="between"><div className="lbl">IDEA（すぐProjectにしない）</div><button className="link" onClick={() => setAdding(a => !a)}>{adding ? '閉じる' : '＋'}</button></div>
        {adding && <IdeaAdd onAdd={t => { set(p => ({ ...p, ideas: [{ id: uid(), text: t, createdAt: new Date().toISOString() }, ...p.ideas] })); setAdding(false); }} />}
        {s.ideas.map(idea => (
          <div key={idea.id} className="todo" style={{ display: 'block' }}>
            <div className="tt">{idea.text}</div>
            <div className="row" style={{ gap: 8, marginTop: 8 }}>
              <button className="btn btn-sm" onClick={() => setPromo(idea)}>Projectに昇格</button>
              <button className="link" onClick={() => set(p => ({ ...p, ideas: p.ideas.filter(x => x.id !== idea.id) }))}>捨てる</button>
            </div>
            {promo && promo.id === idea.id && <PromoteQ s={s} idea={idea} onDo={promote} onCancel={() => setPromo(null)} />}
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
      <textarea className="ta" value={v} onChange={e => setV(e.target.value)} placeholder="思いついたこと" />
      <button className="btn btn-sm" style={{ marginTop: 6 }} disabled={!v.trim()} onClick={() => onAdd(v.trim())}>IDEAに保存</button>
    </div>
  );
}
function PromoteQ({ s, idea, onDo, onCancel }) {
  const [c, setC] = useState(null); const [sac, setSac] = useState('');
  return (
    <div className="pick" style={{ marginTop: 10 }}>
      <div style={{ fontWeight: 700 }}>これを始めるなら、何の時間を使う？</div>
      {[['reduce', '現在のProjectの時間を減らす'], ['free', '自由時間を使う'], ['end', '既存Projectを終了する']].map(([k, l]) => (
        <label key={k} className="opt"><input type="radio" name="pq" checked={c === k} onChange={() => setC(k)} /><span>{l}</span></label>
      ))}
      {(c === 'reduce' || c === 'end') && (
        <select className="in" style={{ marginTop: 8 }} value={sac} onChange={e => setSac(e.target.value)}>
          <option value="">— 対象のProject —</option>
          {s.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      )}
      <div className="row" style={{ gap: 8, marginTop: 10 }}>
        <button className="btn btn-sm btn-fill" disabled={!c || ((c === 'reduce' || c === 'end') && !sac)} onClick={() => onDo(idea, c, sac)}>昇格</button>
        <button className="link" onClick={onCancel}>やめる</button>
      </div>
    </div>
  );
}

/* ============================================================
   ④ CAREER
   ============================================================ */
function Career({ s, set, openProject }) {
  const [open, setOpen] = useState(null);
  const setOut = (k, v) => set(p => ({ ...p, ideal: { ...p.ideal, outcomes: { ...p.ideal.outcomes, [k]: v } } }));
  return (
    <div className="screen">
      <div className="lbl">CAREER — 2030年3月の理想</div>
      <textarea className="ta" style={{ marginTop: 8, fontSize: 15 }} value={s.ideal.headline} onChange={e => set(p => ({ ...p, ideal: { ...p.ideal, headline: e.target.value } }))} />
      {OUTCOMES.map(o => (
        <div key={o.id} className="card">
          <div className="between" onClick={() => setOpen(open === o.id ? null : o.id)} style={{ cursor: 'pointer' }}>
            <div className="h2">{o.name}</div>
            <div className="link">{open === o.id ? '−' : '関連Project'}</div>
          </div>
          <textarea className="ta" style={{ marginTop: 8 }} value={s.ideal.outcomes[o.id] || ''} onChange={e => setOut(o.id, e.target.value)} />
          {open === o.id && (
            <div style={{ marginTop: 8 }}>
              {s.projects.filter(p => p.outcome === o.id).map(p => (
                <div key={p.id} className="focus" onClick={() => openProject(p.id)}>
                  <span className="emo">{p.emoji}</span><span className="fname">{p.name}</span><span className="fpct">{progressOf(p)}%</span>
                </div>
              ))}
              {s.projects.filter(p => p.outcome === o.id).length === 0 && <div className="sub">関連Projectなし</div>}
            </div>
          )}
        </div>
      ))}
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
  function ex() { const t = JSON.stringify(s); if (navigator.clipboard) navigator.clipboard.writeText(t).then(() => alert('コピーしました'), () => prompt('コピー', t)); else prompt('コピー', t); }
  function im() { try { const o = JSON.parse(imp); set(() => ({ ...defaultState(), ...o })); setImp(''); alert('インポートしました'); } catch (e) { alert('読み取れませんでした'); } }
  function wipe() { if (confirm('すべて消して初期化します。')) set(() => defaultState()); }
  return (
    <div className="screen">
      <div className="between"><div className="lbl">設定</div><button className="link" onClick={() => go('home')}>閉じる</button></div>
      <div className="card">
        <div className="lbl">指数の変動幅（調整可）</div>
        <div className="grid2" style={{ marginTop: 10 }}>
          {[['small', '行動'], ['focusBonus', 'Focus加算'], ['milestone', 'マイルストーン'], ['milestoneBig', 'マイルストーン(大)'], ['stall', '数日 停滞'], ['deadlineNoProgress', '締切近いのに停滞'], ['stallDays', '停滞とみなす日数'], ['deadlineWindow', '締切の警戒日数'], ['dailyCap', '行動の日次上限']].map(([k, l]) => (
            <div className="fld" key={k}><label>{l}</label><input className="in" value={w[k]} onChange={e => setW(k, e.target.value)} /></div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="lbl">データ</div>
        <button className="btn btn-block" style={{ marginTop: 10 }} onClick={ex}>JSONバックアップをコピー</button>
        <textarea className="ta" style={{ marginTop: 10 }} placeholder="JSONを貼ってインポート" value={imp} onChange={e => setImp(e.target.value)} />
        <button className="btn btn-block" style={{ marginTop: 10 }} disabled={!imp.trim()} onClick={im}>インポート</button>
        <button className="btn btn-block danger" style={{ marginTop: 10 }} onClick={wipe}>すべて消して初期化</button>
      </div>
      <div className="sub">データは端末内のみ。Safariで「ホーム画面に追加」でアプリになります。</div>
    </div>
  );
}

/* ============================================================
   NAV / APP
   ============================================================ */
function Nav({ tab, go }) {
  const items = [['home', 'Home'], ['roadmap', 'Roadmap'], ['projects', 'Projects'], ['career', 'Career']];
  return (
    <div className="nav">
      {items.map(([id, label]) => (
        <button key={id} className={`nav-item ${tab === id ? 'active' : ''}`} onClick={() => go(id)}><span>{label}</span></button>
      ))}
    </div>
  );
}
function App() {
  const [s, setS] = useState(() => ensureIndex(loadState()));
  const [tab, setTab] = useState('home');
  const [sel, setSel] = useState(null);
  useEffect(() => { saveState(s); }, [s]);
  useEffect(() => { window.scrollTo(0, 0); }, [tab, sel]);
  const set = (fn) => setS(prev => (typeof fn === 'function' ? fn(prev) : fn));
  const go = (t) => { setTab(t); if (t !== 'projects') setSel(null); };
  const openProject = (id) => { setSel(id); setTab('projects'); };
  return (
    <div>
      {tab === 'home' && <Home s={s} set={set} go={go} openProject={openProject} />}
      {tab === 'roadmap' && <Roadmap s={s} />}
      {tab === 'projects' && <Projects s={s} set={set} sel={sel} setSel={setSel} openProject={openProject} />}
      {tab === 'career' && <Career s={s} set={set} openProject={openProject} />}
      {tab === 'settings' && <Settings s={s} set={set} go={go} />}
      {tab !== 'settings' && <Nav tab={tab} go={go} />}
    </div>
  );
}
ReactDOM.render(React.createElement(App), document.getElementById('root'));
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
