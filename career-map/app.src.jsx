const { useState, useEffect, useMemo } = React;

/* ============================================================
   定数
   ============================================================ */
const KEY = 'careermap_v5';
const FOCUS_MAX = 3;
const TODAY_MAX = 3;

const ASSETS = [
  { id: 'academic', name: 'Academic', jp: '学業' },
  { id: 'englishGlobal', name: 'English / Global', jp: '英語・国際' },
  { id: 'research', name: 'Research', jp: '研究' },
  { id: 'leadership', name: 'Leadership', jp: 'リーダーシップ' },
  { id: 'business', name: 'Business', jp: 'ビジネス経験' },
  { id: 'coreSkills', name: 'Core Skills', jp: 'コアスキル' },
];
const ASSET_MAP = Object.fromEntries(ASSETS.map(a => [a.id, a]));

const PATHS = [
  { id: 'advertising', name: '広告（電通・博報堂）' },
  { id: 'consulting', name: 'コンサル' },
  { id: 'trading', name: '商社' },
  { id: 'other', name: 'その他 高年収' },
];
const OUTCOMES = [
  { id: 'career', name: 'CAREER', desc: '博報堂・電通を含め、コンサル・商社など複数の業界・企業を選択肢として持つ。' },
  { id: 'global', name: 'GLOBAL', desc: '交換留学を経験し、英語を使って生活・学習できる。' },
  { id: 'research', name: 'RESEARCH', desc: '論文執筆・学会発表。' },
  { id: 'project', name: 'PROJECT', desc: '継続的に動く組織・プロジェクトを作る。' },
];
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
   ユーティリティ（日付はローカル）
   ============================================================ */
const uid = () => 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const WD = ['日', '月', '火', '水', '木', '金', '土'];
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const r1 = (n) => Math.round(n * 10) / 10;
const man = (n) => (Math.round(n / 10000)).toLocaleString() + '万';
const manD = (n) => (n >= 0 ? '+' : '−') + '¥' + Math.abs(Math.round(n / 10000)) + '万';

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
  const M = (label, big, evidence) => ({ id: uid(), label, done: false, doneAt: null, big: !!big, evidence: evidence || null });
  const P = (o) => ({ id: uid(), status: 'active', deadline: null, milestones: [], moveLog: [], nextActionText: '', assetTargets: [], ...o });
  return [
    P({ name: '英語', emoji: '🔤', kind: 'english', outcome: 'global', status: 'focus', assetTargets: ['englishGlobal'],
      goal: '交換留学の資格を取得し、英語を使える状態になる。',
      deadline: { label: '英語試験 初回受験', date: '2026-12-31' },
      milestones: [M('現状把握（過去問）'), M('英語試験を受験'), M('目標スコア達成', true), M('公式スコアレポート入手')] }),
    P({ name: '大学 / GPA', emoji: '🎓', kind: 'university', outcome: 'career', status: 'focus', assetTargets: ['academic'],
      goal: '留学と卒業に必要な学業成績を維持する。',
      milestones: [M('1年秋のGPAを2.0以上で確定', true), M('2年春までの累積GPAで協定校基準クリア', true)] }),
    P({ name: '自然環境音研究', emoji: '🔬', kind: 'research', outcome: 'research', status: 'focus', assetTargets: ['research', 'coreSkills'],
      goal: '論文執筆・学会発表。',
      milestones: [M('研究テーマ決定', true), M('データ収集を開始'), M('論文ドラフト完成', true, 'publication'), M('学会発表', true, 'conference')] }),
    P({ name: '交換留学', emoji: '✈️', kind: 'study', outcome: 'global', assetTargets: ['englishGlobal'],
      goal: '2028年秋から交換留学する。',
      deadline: { label: '学内選考 出願', date: '2027-09-15' },
      milestones: [M('英語資格取得'), M('GPA条件達成'), M('志望校決定'), M('出願書類準備'), M('学内選考 出願'), M('留学決定', true, 'studyAbroad'), M('渡航', true)] }),
    P({ name: '馬佐良プロジェクト', emoji: '🌿', kind: 'project', outcome: 'project', assetTargets: ['leadership', 'business', 'coreSkills'],
      goal: '慶應公認団体化・継続的な組織化。',
      milestones: [M('公認団体の要件を確認'), M('自分に依存しない運営体制'), M('慶應の公認団体になる', true)] }),
    P({ name: '就職準備', emoji: '💼', kind: 'career', outcome: 'career', assetTargets: ['business', 'coreSkills'],
      goal: '2030年の選考に向けて経験・スキルを蓄積する。',
      deadline: { label: '博報堂インターン 申込〆切', date: '2026-10-02' },
      milestones: [M('博報堂インターンに参加', false, 'internship'), M('サマーインターンに参加', false, 'internship'), M('早期選考で内々定', true)] }),
  ];
}
function defaultState() {
  const ps = seedProjects();
  const pid = (n) => (ps.find(p => p.name === n) || {}).id;
  const t = todayISO();
  return {
    version: 5, tipsSeen: false,
    profile: { university: '慶應SFC', faculty: '環境情報', gradYear: 2030, targetPath: 'advertising', english: 'Intermediate（≈ IELTS 5.5）', gpa: 3.2 },
    assets: { academic: 55, englishGlobal: 35, research: 22, leadership: 42, business: 32, coreSkills: 36 },
    assetTouch: Object.fromEntries(ASSETS.map(a => [a.id, t])),
    assetDay: { date: t, used: {} },
    weights: { dailyGrow: 1.3, milestoneGrow: 8, milestoneBigGrow: 16, focusMult: 1.6, decayPerWeek: 0.4, dailyCapPerAsset: 4 },
    fitMatrix: {
      academic: { advertising: 0.5, consulting: 0.6, trading: 0.6, other: 0.5 },
      englishGlobal: { advertising: 0.8, consulting: 0.8, trading: 1.0, other: 0.5 },
      research: { advertising: 0.5, consulting: 0.8, trading: 0.5, other: 0.4 },
      leadership: { advertising: 0.8, consulting: 0.8, trading: 0.8, other: 0.6 },
      business: { advertising: 0.8, consulting: 0.8, trading: 0.8, other: 0.7 },
      coreSkills: { advertising: 1.0, consulting: 0.9, trading: 0.7, other: 0.7 },
    },
    pathAnchors: { advertising: [4800000, 8500000], consulting: [5500000, 12000000], trading: [5500000, 11000000], other: [3800000, 6500000] },
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
    income: { log: [] },
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
      profile: { ...d.profile, ...(s.profile || {}) },
      assets: { ...d.assets, ...(s.assets || {}) },
      weights: { ...d.weights, ...(s.weights || {}) },
      fitMatrix: { ...d.fitMatrix, ...(s.fitMatrix || {}) },
      pathAnchors: { ...d.pathAnchors, ...(s.pathAnchors || {}) },
      income: { ...d.income, ...(s.income || {}) },
    };
  } catch (e) { return defaultState(); }
}
function saveState(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

/* ============================================================
   年収推定エンジン
   ============================================================ */
function fitScore(assets, fitMatrix, path) {
  let num = 0, den = 0;
  ASSETS.forEach(a => { const w = fitMatrix[a.id][path]; num += (assets[a.id] / 100) * w; den += w; });
  return den ? clamp(num / den, 0, 1) : 0;
}
function fitLabel(f) { return f >= 0.62 ? 'Strong' : f >= 0.42 ? 'Growing' : 'Developing'; }
function evidenceCount(s) {
  let c = 0;
  s.projects.forEach(p => (p.milestones || []).forEach(m => {
    if (m.done) { c += 1; if (m.evidence === 'studyAbroad') c += 3; else if (m.evidence === 'publication') c += 3; else if (m.evidence === 'conference') c += 2; else if (m.evidence === 'internship') c += 1; }
  }));
  return c;
}
function confidenceOf(s) {
  const c = evidenceCount(s);
  if (c < 4) return { label: 'Developing', band: 0.16 };
  if (c < 9) return { label: 'Growing', band: 0.11 };
  return { label: 'Solid', band: 0.07 };
}
function estimateFor(s, assets) {
  const fits = {}, ests = {};
  PATHS.forEach(p => {
    const f = fitScore(assets, s.fitMatrix, p.id);
    fits[p.id] = f;
    const [lo, hi] = s.pathAnchors[p.id];
    ests[p.id] = lo + (hi - lo) * f;
  });
  const tgt = s.profile.targetPath || 'advertising';
  let wsum = 0, blended = 0;
  PATHS.forEach(p => { const w = fits[p.id] * fits[p.id]; wsum += w; blended += ests[p.id] * w; });
  blended = wsum ? blended / wsum : ests[tgt];
  const main = 0.5 * ests[tgt] + 0.5 * blended;
  return { main, fits, ests };
}
function incomeNow(s) {
  const { main, fits, ests } = estimateFor(s, s.assets);
  const conf = confidenceOf(s);
  return { main, lo: main * (1 - conf.band), hi: main * (1 + conf.band), fits, ests, conf };
}
function growAssets(s, ids, per, cap) {
  const day = (s.assetDay && s.assetDay.date === todayISO()) ? { date: s.assetDay.date, used: { ...s.assetDay.used } } : { date: todayISO(), used: {} };
  const na = { ...s.assets }; const touch = { ...(s.assetTouch || {}) };
  ids.forEach(id => {
    let amt = per * (1 - na[id] / 125);
    if (cap) { const u = day.used[id] || 0; amt = Math.max(0, Math.min(amt, cap - u)); day.used[id] = u + amt; }
    na[id] = clamp(r1(na[id] + amt), 0, 100);
    touch[id] = todayISO();
  });
  return { ...s, assets: na, assetDay: day, assetTouch: touch };
}
function snapshotIncome(s, why) {
  const inc = incomeNow(s);
  const log = [...((s.income && s.income.log) || [])];
  const t = todayISO();
  const pt = { date: t, value: Math.round(inc.main), range: [Math.round(inc.lo), Math.round(inc.hi)], why: [] };
  if (log.length && log[log.length - 1].date === t) {
    const e = { ...log[log.length - 1] };
    e.value = pt.value; e.range = pt.range; e.why = [...(e.why || []), ...(why || [])];
    log[log.length - 1] = e;
  } else { pt.why = why || []; log.push(pt); }
  return { ...s, income: { ...s.income, log: log.slice(-620) } };
}
function actGrow(s, ids, per, label, cap) {
  const before = estimateFor(s, s.assets).main;
  const ns = growAssets(s, ids, per, cap);
  const after = estimateFor(ns, ns.assets).main;
  const d = Math.round((after - before) / 10000) * 10000;
  const why = [];
  if (Math.abs(d) >= 10000 && ids.length) {
    const a0 = ids[0];
    why.push({ reason: label, asset: a0, from: r1(s.assets[a0]), to: r1(ns.assets[a0]), incomeDelta: d, up: d >= 0 });
  }
  return snapshotIncome(ns, why);
}
function ensureIncome(s) {
  // 停滞資産の緩やかな減衰（7日以上 未活動）
  const na = { ...s.assets }; let decayed = false;
  ASSETS.forEach(a => {
    const last = (s.assetTouch || {})[a.id];
    if (last && daysSinceDate(last) >= 7) { na[a.id] = clamp(r1(na[a.id] - s.weights.decayPerWeek), 12, 100); decayed = true; }
  });
  let ns = decayed ? { ...s, assets: na } : s;
  const log = [...((ns.income && ns.income.log) || [])];
  let last = log.length ? log[log.length - 1].date : addDaysISO(todayISO(), -1);
  let val = log.length ? log[log.length - 1].value : Math.round(incomeNow(ns).main);
  let rng = log.length ? log[log.length - 1].range : [val, val];
  let g = 0;
  while (last < todayISO() && g++ < 800) { const nx = addDaysISO(last, 1); if (nx <= last) break; last = nx; log.push({ date: last, value: val, range: rng, why: [] }); }
  ns = { ...ns, income: { ...ns.income, log } };
  return snapshotIncome(ns, decayed ? [{ reason: '一部の資産が停滞（7日以上 未活動）', asset: null, incomeDelta: 0, up: false }] : []);
}
function incInfo(log, days) {
  const cut = addDaysISO(todayISO(), -days);
  const win = (log || []).filter(e => e.date >= cut);
  const series = win.length ? win : (log || []).slice(-2);
  const now = series.length ? series[series.length - 1].value : 0;
  const base = series.length ? (series.length === 1 ? Math.round(now - (series[0].why || []).reduce((a, w) => a + (w.incomeDelta || 0), 0)) : series[0].value) : now;
  const chg = now - base;
  const arrow = chg > 5000 ? '↗' : chg < -5000 ? '↘' : '→';
  return { now, base, chg, arrow, series };
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
function progressOf(p) { const ms = p.milestones || []; return ms.length ? Math.round(ms.filter(m => m.done).length / ms.length * 100) : 0; }
function nextActionOf(p) { const m = (p.milestones || []).find(x => !x.done); return (p.nextActionText && p.nextActionText.trim()) || (m ? m.label : '—'); }
function projById(s, id) { return (s.projects || []).find(p => p.id === id); }
function upcomingDeadlines(s, n) {
  return (s.projects || []).map(p => p.deadline && p.deadline.date ? { ...p.deadline, project: p.name, emoji: p.emoji } : null)
    .filter(Boolean).filter(d => daysUntil(d.date) >= -1).sort((a, b) => a.date.localeCompare(b.date)).slice(0, n || 3);
}

/* ============================================================
   What If シミュレーション
   ============================================================ */
function withOverrides(base, ov) {
  const a = { ...base };
  const eng = { '6.0': 58, '6.5': 68, '7.0': 80, '7.5': 90 };
  if (ov.english && eng[ov.english]) a.englishGlobal = Math.max(a.englishGlobal, eng[ov.english]);
  if (ov.abroad === '6m') { a.englishGlobal += 12; a.business += 6; }
  if (ov.abroad === '1y') { a.englishGlobal += 20; a.business += 10; a.leadership += 5; }
  if (ov.research === 'conf') a.research += 15;
  if (ov.research === 'pub') a.research += 25;
  if (ov.research === 'both') { a.research += 35; a.coreSkills += 10; }
  if (ov.project === '6m') { a.leadership += 8; a.business += 6; }
  if (ov.project === '1y') { a.leadership += 15; a.business += 12; }
  if (ov.project === '2y') { a.leadership += 24; a.business += 20; a.coreSkills += 8; }
  if (ov.intern === '1') a.business += 12;
  if (ov.intern === '2') { a.business += 22; a.coreSkills += 8; }
  if (ov.intern === 'long') { a.business += 32; a.leadership += 10; a.coreSkills += 12; }
  Object.keys(a).forEach(k => a[k] = clamp(a[k], 0, 100));
  return a;
}
function scenarioIncomes(s) {
  const cur = { ...s.assets };
  ASSETS.forEach(a => { if ((s.assetTouch || {})[a.id] && daysSinceDate(s.assetTouch[a.id]) < 21) cur[a.id] = clamp(cur[a.id] + 6, 0, 100); });
  const minimum = {}; ASSETS.forEach(a => minimum[a.id] = clamp(s.assets[a.id] - 8, 0, 100));
  const growth = withOverrides(s.assets, { english: '7.0', abroad: '1y', research: 'both', project: '2y', intern: 'long' });
  return {
    minimum: estimateFor(s, minimum).main,
    current: estimateFor(s, cur).main,
    growth: estimateFor(s, growth).main,
  };
}

/* ============================================================
   共通パーツ
   ============================================================ */
function Bar({ v }) { return <div className="bar"><span style={{ width: clamp(v, 0, 100) + '%' }} /></div>; }
function Trend({ p }) { const m = momentum(p); return <span className={`trend t-${m.l.toLowerCase()}`}>{m.a} {m.l}</span>; }

function IncomeChart({ log, days, showMarkers, onPick, h }) {
  const info = incInfo(log, days);
  const s = info.series;
  const pts = s.length >= 2 ? s : [{ date: addDaysISO((s[0] || { date: todayISO() }).date, -1), value: (s[0] || { value: 0 }).value * 0.98, why: [] }, ...s];
  const vals = pts.map(p => p.value);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const pad = (hi - lo || 200000) * 0.2;
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
          <stop offset="0" stopColor={up ? '#2FA35E' : '#E5484D'} stopOpacity="0.16" />
          <stop offset="1" stopColor={up ? '#2FA35E' : '#E5484D'} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#cig)" />
      <polyline points={line} fill="none" stroke={col} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {showMarkers && pts.map((p, i) => (p.why && p.why.length
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
  const impact = useMemo(() => {
    if (!proj || !proj.assetTargets.length) return null;
    const per = s.weights.dailyGrow * (proj.status === 'focus' ? s.weights.focusMult : 1);
    const proj3 = growAssets(growAssetsN(s, proj.assetTargets, per, 12), proj.assetTargets, per, 12); // rough
    return null;
  }, [pid]);
  function done() {
    set(p => {
      const pr = projById(p, pid); const w = p.weights;
      const per = w.dailyGrow * (pr.status === 'focus' ? w.focusMult : 1);
      let np = { ...p,
        projects: p.projects.map(x => x.id === pid ? { ...x, moveLog: [...(x.moveLog || []), { date: todayISO(), amt: 1 }] } : x),
        activity: [{ date: todayISO(), projectId: pid, action: action || '進捗', minutes: mins || null }, ...(p.activity || [])].slice(0, 200),
        today: p.today.map(t => (t.projectId === pid && !t.done && (t.action === action || !action)) ? { ...t, done: true, doneAt: new Date().toISOString() } : t),
      };
      np = actGrow(np, pr.assetTargets, per, `${pr.name} — ${action || '進捗'}`, w.dailyCapPerAsset);
      return np;
    });
    onClose();
  }
  return (
    <div className="sheet" onClick={e => { if (e.target.className === 'sheet') onClose(); }}>
      <div className="sheet-in">
        <div className="between"><div className="h2">Add Progress</div><button className="x" onClick={onClose}>✕</button></div>
        <div className="lbl">Project</div>
        <div className="chips">{s.projects.map(p => <button key={p.id} className={`chip ${pid === p.id ? 'on' : ''}`} onClick={() => { setPid(p.id); setAction(null); }}>{p.emoji} {p.name}</button>)}</div>
        <div className="lbl">Action</div>
        <div className="chips">{acts.map(a => <button key={a} className={`chip ${action === a ? 'on' : ''}`} onClick={() => setAction(a)}>{a}</button>)}</div>
        <div className="lbl">Time（任意）</div>
        <div className="chips">{[15, 30, 60, 90].map(m => <button key={m} className={`chip ${mins === m ? 'on' : ''}`} onClick={() => setMins(mins === m ? null : m)}>{m}min</button>)}</div>
        {proj && proj.assetTargets.length > 0 && (
          <div className="hint">育つ資産：{proj.assetTargets.map(a => ASSET_MAP[a].jp).join(' / ')}</div>
        )}
        <button className="btn btn-fill btn-block" style={{ marginTop: 14 }} onClick={done} disabled={!action}>Done</button>
      </div>
    </div>
  );
}
function growAssetsN(s, ids, per, times) { let ns = s; for (let i = 0; i < times; i++) ns = growAssets(ns, ids, per); return ns; }

/* ============================================================
   Task Impact モーダル
   ============================================================ */
function TaskImpact({ s, projId, action, onClose }) {
  const p = projById(s, projId);
  const per = s.weights.dailyGrow * (p.status === 'focus' ? s.weights.focusMult : 1);
  const a3 = growAssetsN(s, p.assetTargets, per, 12).assets;
  const a6 = growAssetsN(s, p.assetTargets, per, 26).assets;
  const cur = incomeNow(s).main;
  const inc6 = estimateFor(s, a6).main;
  const key = p.assetTargets[0];
  return (
    <div className="sheet" onClick={e => { if (e.target.className === 'sheet') onClose(); }}>
      <div className="sheet-in">
        <div className="between"><div className="h2">Task Impact</div><button className="x" onClick={onClose}>✕</button></div>
        <div className="sub" style={{ marginTop: 4 }}>{p.emoji} {p.name}{action ? ' — ' + action : ''}</div>
        {key && (
          <div className="card" style={{ marginTop: 12, boxShadow: 'none', border: '1px solid var(--line)' }}>
            <div className="lbl">{ASSET_MAP[key].name}（{ASSET_MAP[key].jp}）</div>
            <div className="row" style={{ gap: 14, marginTop: 8 }}>
              <div><div className="ts">now</div><div className="big-n">{Math.round(s.assets[key])}</div></div>
              <div><div className="ts">3ヶ月</div><div className="big-n">{Math.round(a3[key])}</div></div>
              <div><div className="ts">6ヶ月</div><div className="big-n">{Math.round(a6[key])}</div></div>
            </div>
          </div>
        )}
        <div className="card" style={{ boxShadow: 'none', border: '1px solid var(--line)' }}>
          <div className="lbl">Potential Career Impact（Model Estimate）</div>
          <div className="row" style={{ gap: 14, marginTop: 8 }}>
            <div><div className="ts">現在の想定</div><div className="big-n">{man(cur)}</div></div>
            <div><div className="ts">6ヶ月 続けた場合</div><div className="big-n" style={{ color: 'var(--up)' }}>{man(inc6)}</div></div>
          </div>
          <div className="ts" style={{ marginTop: 6 }}>「必ず上がる」ではなく、続けた場合のモデル推定です。</div>
        </div>
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
  const inc = useMemo(() => incomeNow(s), [s]);
  const info30 = useMemo(() => incInfo(s.income.log, 30), [s.income.log]);
  const focus = s.projects.filter(p => p.status === 'focus').slice(0, FOCUS_MAX);
  const today = s.today.slice(0, TODAY_MAX);
  const RANGES = [[7, '7D'], [30, '1M'], [90, '3M'], [365, '1Y'], [99999, 'ALL']];
  const whyRecent = (() => {
    const out = [];
    for (let i = s.income.log.length - 1; i >= 0 && out.length < 4; i--) {
      (s.income.log[i].why || []).slice().reverse().forEach(wv => { if (out.length < 4) out.push({ ...wv, date: s.income.log[i].date }); });
    }
    return out;
  })();

  function toggleToday(id) {
    set(p => {
      const t = p.today.find(x => x.id === id); if (!t || t.done) return p;
      const pr = projById(p, t.projectId); const w = p.weights;
      const per = w.dailyGrow * (pr && pr.status === 'focus' ? w.focusMult : 1);
      let np = { ...p,
        today: p.today.map(x => x.id === id ? { ...x, done: true, doneAt: new Date().toISOString() } : x),
        projects: p.projects.map(x => x.id === t.projectId ? { ...x, moveLog: [...(x.moveLog || []), { date: todayISO(), amt: 1 }] } : x),
        activity: [{ date: todayISO(), projectId: t.projectId, action: t.action, minutes: null }, ...(p.activity || [])].slice(0, 200),
      };
      if (pr) np = actGrow(np, pr.assetTargets, per, `${pr.name} — ${t.action}`, w.dailyCapPerAsset);
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

      {/* ① Estimated Income */}
      <div className="card">
        <div className="lbl">2030 想定初年度年収</div>
        <div className="idx-now">{man(inc.main)}<span className="yen">円</span></div>
        <div className="idx-sub" style={{ color: info30.chg >= 0 ? 'var(--up)' : 'var(--down)' }}>
          {info30.arrow} {manD(info30.chg)}　<span className="muted2">this month</span>
        </div>
        <div className="ts" style={{ marginTop: 8 }}>想定レンジ　{man(inc.lo)} — {man(inc.hi)}</div>
        <div className="ts">現在のキャリア資産にもとづく　・　Confidence: {inc.conf.label}</div>

        <div style={{ marginTop: 14 }}><IncomeChart log={s.income.log} days={days} showMarkers onPick={setPick} h={116} /></div>
        <div className="range">{RANGES.map(([d, l]) => <button key={d} className={days === d ? 'on' : ''} onClick={() => { setDays(d); setPick(null); }}>{l}</button>)}</div>
        {pick && (
          <div className="pick">
            <div className="lbl">{fmtFull(pick.date)}</div>
            <div className="pick-v">{man(pick.value)}円</div>
            {(pick.why || []).map((wv, i) => (
              <div key={i} className="pick-e">
                <span>{wv.up ? '↑' : '↓'} {wv.reason}{wv.asset ? `（${ASSET_MAP[wv.asset].jp} ${wv.from}→${wv.to}）` : ''}</span>
                {wv.incomeDelta ? <span className="pick-p">{manD(wv.incomeDelta)}</span> : null}
              </div>
            ))}
          </div>
        )}
      </div>

      {!s.tipsSeen && (
        <div className="card soft">
          <div className="sub">タスクは円に換算していません。行動で <b>キャリア資産</b>（英語・研究・実績…）が育ち、その結果として選べる企業群と想定年収レンジが変わります。</div>
          <button className="btn btn-sm" style={{ marginTop: 10 }} onClick={() => set(p => ({ ...p, tipsSeen: true }))}>OK</button>
        </div>
      )}

      {/* ③ Why it changed */}
      <div className="card">
        <div className="between"><div className="lbl">WHY IT CHANGED</div><button className="link" onClick={() => go('career')}>資産を見る</button></div>
        {whyRecent.length === 0 && <div className="sub" style={{ marginTop: 6 }}>まだ変化なし。Add Progress で記録すると動きます。</div>}
        {whyRecent.map((wv, i) => (
          <div key={i} className="why-row">
            <span className="why-a" style={{ color: wv.up ? 'var(--up)' : 'var(--down)' }}>{wv.up ? '↑' : '↓'}</span>
            <span style={{ flex: 1 }}>{wv.reason}</span>
            {wv.asset && <span className="ts">{ASSET_MAP[wv.asset].jp} {wv.from}→{wv.to}</span>}
          </div>
        ))}
      </div>

      {/* ④ Current Focus */}
      <div className="card">
        <div className="between"><div className="lbl">CURRENT FOCUS</div><button className="link" onClick={() => go('projects')}>変更</button></div>
        {focus.map(p => (
          <div key={p.id} className="focus" onClick={() => openProject(p.id)}>
            <span className="emo">{p.emoji}</span>
            <span className="fname">{p.name}</span>
            <span className="fpct">{(p.assetTargets || []).map(a => ASSET_MAP[a].jp).join('・')}</span>
          </div>
        ))}
      </div>

      {/* ⑤ Today */}
      <div className="card">
        <div className="lbl">TODAY</div>
        {today.length === 0 && <div className="sub" style={{ marginTop: 6 }}>ルーティンから追加、または Add Progress で記録。</div>}
        {today.map(t => {
          const pr = projById(s, t.projectId);
          return (
            <div key={t.id} className="todo">
              <button className={`ck ${t.done ? 'on' : ''}`} onClick={() => toggleToday(t.id)}>{t.done ? '✓' : ''}</button>
              <div style={{ flex: 1 }} onClick={() => setPick({ _impact: { projId: t.projectId, action: t.action } })}>
                <div className="tt" style={{ textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'var(--sub)' : 'var(--ink)' }}>{t.action}</div>
                <div className="ts">{pr ? `${pr.emoji} ${pr.name}` : '—'}　·　影響を見る</div>
              </div>
              <button className="x sm" onClick={() => set(p => ({ ...p, today: p.today.filter(x => x.id !== t.id) }))}>✕</button>
            </div>
          );
        })}
        <div className="rts">{s.routines.map(rt => <button key={rt.id} className="chip sm" onClick={() => addRoutine(rt)}>＋ {rt.name}</button>)}</div>
      </div>

      <button className="btn btn-fill btn-block big" onClick={() => setAdding(true)}>＋ Add Progress</button>

      {adding && <AddProgress s={s} set={set} onClose={() => setAdding(false)} />}
      {pick && pick._impact && <TaskImpact s={s} projId={pick._impact.projId} action={pick._impact.action} onClose={() => setPick(null)} />}
    </div>
  );
}

/* ============================================================
   ② ROADMAP
   ============================================================ */
function Roadmap({ s }) {
  const curYear = new Date().getFullYear();
  const [open, setOpen] = useState(curYear);
  const dls = upcomingDeadlines(s, 3);
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
          <div style={{ marginTop: 8 }}>{r.events.map((e, i) => <div key={i} className="rm-e">{r.year < curYear ? '◦' : '•'} {e}</div>)}</div>
        </div>
      ))}
      <div className="card">
        <div className="lbl">NEXT DEADLINE</div>
        {dls.length === 0 && <div className="sub" style={{ marginTop: 6 }}>設定なし</div>}
        {dls.map((d, i) => {
          const du = daysUntil(d.date);
          return (
            <div key={i} className="dl">
              <div className="dl-m">{MON3[parseISO(d.date).getMonth()]} {parseISO(d.date).getDate()}</div>
              <div style={{ flex: 1 }}><div className="dl-t">{d.label}</div><div className="ts">{d.emoji} {d.project}</div></div>
              <div className="dl-d" style={{ color: du <= 14 ? 'var(--down)' : 'var(--sub)' }}>{du < 0 ? 'now' : `${du}d`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   ③ PROJECTS
   ============================================================ */
function Projects({ s, set, sel, setSel, openProject }) {
  const [adding, setAdding] = useState(false);
  const [promo, setPromo] = useState(null);
  const [stopSim, setStopSim] = useState(null); // routine id
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
      const on = !ms.done;
      let np = { ...p, projects: p.projects.map(x => x.id === pid ? {
        ...x, moveLog: on ? [...(x.moveLog || []), { date: todayISO(), amt: 6 }] : x.moveLog,
        milestones: x.milestones.map(m => m.id === mid ? { ...m, done: on, doneAt: on ? new Date().toISOString() : null } : m),
      } : x) };
      if (on) np = actGrow(np, pr.assetTargets, ms.big ? p.weights.milestoneBigGrow : p.weights.milestoneGrow, `マイルストーン：${ms.label}（${pr.name}）`);
      else np = snapshotIncome(np, []);
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
      np = { ...np, projects: [...np.projects, { id: uid(), name: idea.text.slice(0, 18), emoji: '•', kind: 'project', outcome: 'career', goal: idea.text, status: 'active', deadline: null, milestones: [], moveLog: [], assetTargets: ['coreSkills'], nextActionText: '最初の一歩を決める' }], ideas: np.ideas.filter(x => x.id !== idea.id) };
      return np;
    });
    setPromo(null);
  }
  function doStop(rt) {
    set(p => ({ ...p, routines: p.routines.filter(x => x.id !== rt.id) }));
    setStopSim(null);
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
          <div className="row" style={{ gap: 12, marginTop: 12 }}>
            <div style={{ flex: 1 }}><Bar v={pct} /></div>
            <div className="big-n sm">{pct}%</div>
            <Trend p={p} />
          </div>
          <div className="ts" style={{ marginTop: 8 }}>育つ資産：{(p.assetTargets || []).map(a => ASSET_MAP[a].jp).join(' / ') || '—'}</div>
        </div>
        <div className="card"><div className="lbl">GOAL</div><textarea className="ta" value={p.goal || ''} onChange={e => setField(p.id, 'goal', e.target.value)} /></div>
        <div className="card">
          <div className="lbl">NEXT DEADLINE</div>
          <input className="in" placeholder="内容" value={(p.deadline || {}).label || ''} onChange={e => setDl(p.id, 'label', e.target.value)} />
          <input className="in" style={{ marginTop: 8 }} placeholder="YYYY-MM-DD" value={(p.deadline || {}).date || ''} onChange={e => setDl(p.id, 'date', e.target.value)} />
          {(p.deadline || {}).date && <div className="sub" style={{ marginTop: 6 }}>あと {daysUntil(p.deadline.date)}日</div>}
        </div>
        <div className="card">
          <div className="lbl">MILESTONES（達成で進捗と資産が伸びる）</div>
          {(p.milestones || []).map(ms => (
            <div key={ms.id} className="todo">
              <button className={`ck ${ms.done ? 'on' : ''}`} onClick={() => toggleMs(p.id, ms.id)}>{ms.done ? '✓' : ''}</button>
              <div className="tt" style={{ flex: 1, textDecoration: ms.done ? 'line-through' : 'none', color: ms.done ? 'var(--sub)' : 'var(--ink)' }}>{ms.label}{ms.big && <span className="sub"> ・大</span>}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="lbl">最近の記録</div>
          {(s.activity || []).filter(a => a.projectId === p.id).slice(0, 8).map((a, i) => <div key={i} className="ts" style={{ padding: '4px 0' }}>{fmtDate(a.date)}　{a.action}{a.minutes ? ` ・${a.minutes}min` : ''}</div>)}
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
          <div className="between" style={{ marginTop: 8 }}><Trend p={p} /><div className="ts">Next：{nextActionOf(p)}</div></div>
        </div>
      ))}

      <div className="card">
        <div className="lbl">ROUTINES</div>
        {s.routines.map(rt => (
          <div key={rt.id} className="todo" style={{ alignItems: 'center' }}>
            <div style={{ flex: 1 }}><div className="tt">{rt.name}</div><div className="ts">{rt.actions.join(' / ')}</div></div>
            <button className="btn btn-sm" onClick={() => setStopSim(rt)}>Stop</button>
          </div>
        ))}
        {stopSim && <StopSim s={s} rt={stopSim} onStop={() => doStop(stopSim)} onCancel={() => setStopSim(null)} />}
      </div>

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
function StopSim({ s, rt, onStop, onCancel }) {
  const p = projById(s, rt.projectId);
  const per = s.weights.dailyGrow * (p && p.status === 'focus' ? s.weights.focusMult : 1);
  const targets = (p && p.assetTargets) || [];
  const cont = growAssetsN(s, targets, per, 26).assets;
  const stop = {}; ASSETS.forEach(a => stop[a.id] = targets.includes(a.id) ? clamp(s.assets[a.id] + 2, 0, 100) : s.assets[a.id]);
  const key = targets[0];
  const curInc = incomeNow(s).main;
  const contInc = estimateFor(s, cont).main;
  const stopInc = estimateFor(s, stop).main;
  return (
    <div className="pick" style={{ marginTop: 10 }}>
      <div style={{ fontWeight: 700 }}>{rt.name} を止める前に</div>
      <div className="ts" style={{ marginTop: 4 }}>6ヶ月後の見込み（{key ? ASSET_MAP[key].jp : '資産'} ／ 想定年収）</div>
      <div className="scn" style={{ marginTop: 8 }}>
        <div><div className="ts">Continue</div><div className="big-n sm">{key ? `${Math.round(s.assets[key])}→${Math.round(cont[key])}` : '—'}</div><div className="ts" style={{ color: 'var(--up)' }}>{man(contInc)}</div></div>
        <div><div className="ts">Stop</div><div className="big-n sm">{key ? `${Math.round(s.assets[key])}→${Math.round(stop[key])}` : '—'}</div><div className="ts">{man(stopInc)}</div></div>
      </div>
      <div className="row" style={{ gap: 8, marginTop: 10 }}>
        <button className="btn btn-sm btn-fill" onClick={onCancel}>Continue</button>
        <button className="btn btn-sm danger" onClick={onStop}>Stop anyway</button>
      </div>
    </div>
  );
}
function IdeaAdd({ onAdd }) {
  const [v, setV] = useState('');
  return (<div style={{ marginTop: 8 }}>
    <textarea className="ta" value={v} onChange={e => setV(e.target.value)} placeholder="思いついたこと" />
    <button className="btn btn-sm" style={{ marginTop: 6 }} disabled={!v.trim()} onClick={() => onAdd(v.trim())}>IDEAに保存</button>
  </div>);
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
          <option value="">— 対象のProject —</option>{s.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
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
  const [wf, setWf] = useState(false);
  const inc = useMemo(() => incomeNow(s), [s]);
  const setP = (k, v) => set(p => ({ ...p, profile: { ...p.profile, [k]: v } }));
  const setOut = (k, v) => set(p => ({ ...p, ideal: { ...(p.ideal || {}), outcomes: { ...((p.ideal || {}).outcomes || {}), [k]: v } } }));
  const outcomes = (s.ideal && s.ideal.outcomes) || Object.fromEntries(OUTCOMES.map(o => [o.id, o.desc]));

  return (
    <div className="screen">
      <div className="lbl">CAREER</div>

      <div className="card">
        <div className="lbl">CAREER ASSETS</div>
        {ASSETS.map(a => (
          <div key={a.id} className="arow">
            <div className="aname">{a.name}<span className="ts"> {a.jp}</span></div>
            <div style={{ flex: 1 }}><Bar v={s.assets[a.id]} /></div>
            <div className="big-n sm">{Math.round(s.assets[a.id])}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="lbl">CAREER FIT</div>
        {PATHS.map(p => {
          const f = inc.fits[p.id];
          return (
            <div key={p.id} className="fit-row">
              <span style={{ flex: 1 }}>{p.name}</span>
              <span className={`fitb f-${fitLabel(f).toLowerCase()}`}>{fitLabel(f)}</span>
              <span className="ts num">{man(inc.ests[p.id])}</span>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="lbl">CAREER OPTIONS</div>
        {[['High', '700万〜'], ['Competitive', '550万〜700万'], ['Broad Range', '400万〜550万']].map(([k, v], i) => (
          <div key={i} className="opt-row"><span style={{ flex: 1, fontWeight: 700 }}>{k}</span><span className="ts">{v}</span></div>
        ))}
        <div className="ts" style={{ marginTop: 8 }}>いまの想定 {man(inc.main)}円 は「{inc.main >= 7000000 ? 'High' : inc.main >= 5500000 ? 'Competitive' : 'Broad Range'}」の水準に近づいています。内定確率などは表示しません。</div>
      </div>

      <button className="btn btn-fill btn-block big" onClick={() => setWf(true)}>What If? を試す</button>

      <div className="card">
        <div className="lbl">CAREER PROFILE</div>
        <div className="grid2" style={{ marginTop: 8 }}>
          <div className="fld"><label>大学</label><input className="in" value={s.profile.university} onChange={e => setP('university', e.target.value)} /></div>
          <div className="fld"><label>学部</label><input className="in" value={s.profile.faculty} onChange={e => setP('faculty', e.target.value)} /></div>
          <div className="fld"><label>卒業予定年</label><input className="in" value={s.profile.gradYear} onChange={e => setP('gradYear', Number(e.target.value) || 2030)} /></div>
          <div className="fld"><label>GPA</label><input className="in" value={s.profile.gpa} onChange={e => setP('gpa', e.target.value)} /></div>
          <div className="fld"><label>英語レベル</label><input className="in" value={s.profile.english} onChange={e => setP('english', e.target.value)} /></div>
          <div className="fld"><label>第一志望の業界</label>
            <select className="in" value={s.profile.targetPath} onChange={e => setP('targetPath', e.target.value)}>{PATHS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="lbl">2030年の理想</div>
        {OUTCOMES.map(o => (
          <div key={o.id} style={{ marginTop: 10 }}>
            <div className="h2">{o.name}</div>
            <textarea className="ta" style={{ marginTop: 4 }} value={outcomes[o.id] || ''} onChange={e => setOut(o.id, e.target.value)} />
            <div style={{ marginTop: 4 }}>{s.projects.filter(p => p.outcome === o.id).map(p => (
              <div key={p.id} className="map-proj" onClick={() => openProject(p.id)}><span style={{ flex: 1 }}>{p.emoji} {p.name}</span><span className="ts num">{progressOf(p)}%</span></div>
            ))}</div>
          </div>
        ))}
      </div>

      {wf && <WhatIf s={s} onClose={() => setWf(false)} />}
    </div>
  );
}
function WhatIf({ s, onClose }) {
  const [ov, setOv] = useState({ english: null, abroad: null, research: null, project: null, intern: null });
  const custom = estimateFor(s, withOverrides(s.assets, ov)).main;
  const cur = incomeNow(s).main;
  const scn = useMemo(() => scenarioIncomes(s), [s]);
  const Seg = ({ k, opts }) => (
    <div className="chips">
      {opts.map(([v, l]) => <button key={String(v)} className={`chip ${ov[k] === v ? 'on' : ''}`} onClick={() => setOv({ ...ov, [k]: ov[k] === v ? null : v })}>{l}</button>)}
    </div>
  );
  return (
    <div className="sheet" onClick={e => { if (e.target.className === 'sheet') onClose(); }}>
      <div className="sheet-in">
        <div className="between"><div className="h2">What If?</div><button className="x" onClick={onClose}>✕</button></div>

        <div className="scn" style={{ marginTop: 10 }}>
          <div><div className="ts">Minimum</div><div className="big-n sm">{man(scn.minimum)}</div></div>
          <div><div className="ts">Current</div><div className="big-n sm">{man(scn.current)}</div></div>
          <div><div className="ts">Growth</div><div className="big-n sm" style={{ color: 'var(--up)' }}>{man(scn.growth)}</div></div>
        </div>
        <div className="ts" style={{ marginTop: 6 }}>今の選択で、2030年の想定がどれだけ変わるか。</div>

        <div className="card" style={{ marginTop: 14, boxShadow: 'none', border: '1px solid var(--line)' }}>
          <div className="lbl">カスタム</div>
          <div className="idx-now" style={{ fontSize: 30, marginTop: 4 }}>{man(cur)} <span className="muted2" style={{ fontSize: 15 }}>→</span> <span style={{ color: custom >= cur ? 'var(--up)' : 'var(--down)' }}>{man(custom)}</span></div>
        </div>

        <div className="lbl" style={{ marginTop: 12 }}>English（目標スコア）</div>
        <Seg k="english" opts={[['6.0', '6.0'], ['6.5', '6.5'], ['7.0', '7.0'], ['7.5', '7.5']]} />
        <div className="lbl">Study Abroad</div>
        <Seg k="abroad" opts={[['6m', '6ヶ月'], ['1y', '1年']]} />
        <div className="lbl">Research</div>
        <Seg k="research" opts={[['conf', '学会発表'], ['pub', '論文'], ['both', '両方']]} />
        <div className="lbl">Project</div>
        <Seg k="project" opts={[['6m', '6ヶ月'], ['1y', '1年'], ['2y', '2年以上']]} />
        <div className="lbl">Internship</div>
        <Seg k="intern" opts={[['1', '1社'], ['2', '2社以上'], ['long', '長期']]} />
      </div>
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
        <div className="lbl">資産の成長・減衰（調整可）</div>
        <div className="grid2" style={{ marginTop: 10 }}>
          {[['dailyGrow', '1回の行動'], ['focusMult', 'Focus倍率'], ['milestoneGrow', 'マイルストーン'], ['milestoneBigGrow', 'マイルストーン(大)'], ['decayPerWeek', '週の減衰'], ['dailyCapPerAsset', '資産の日次上限']].map(([k, l]) => (
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
      <div className="sub">データは端末内のみ。想定年収は将来を断定するものではなく、現在のキャリア資産にもとづくモデル推定です。</div>
    </div>
  );
}

/* ============================================================
   NAV / APP
   ============================================================ */
function Nav({ tab, go }) {
  const items = [['home', 'Home'], ['roadmap', 'Roadmap'], ['projects', 'Projects'], ['career', 'Career']];
  return (
    <div className="nav">{items.map(([id, label]) => (
      <button key={id} className={`nav-item ${tab === id ? 'active' : ''}`} onClick={() => go(id)}><span>{label}</span></button>
    ))}</div>
  );
}
function App() {
  const [s, setS] = useState(() => ensureIncome(loadState()));
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
