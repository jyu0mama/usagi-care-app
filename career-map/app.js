/* AUTO-GENERATED from app.src.jsx by @babel/standalone (react-classic). Edit app.src.jsx, then recompile. */
const {
  useState,
  useEffect,
  useMemo
} = React;
const KEY = 'careermap_v2';
const STALE_DAYS = 14;
const REVIEW_DUE_DAYS = 7;
const PASSIVE_DECAY = -0.5;
const ADV_CAP = 4;
const TREND_START = 100;
const TYPE_LABEL = {
  must: 'MUST',
  unlock: 'UNLOCK',
  bet: 'BET'
};
const TYPE_NOTE = {
  must: '達成しないと次の選択肢が閉じる',
  unlock: '達成すると次の選択肢が開く',
  bet: '必須ではないが、当たればリターンが大きい'
};
const PILLARS = [{
  id: 'career',
  name: 'CAREER'
}, {
  id: 'global',
  name: 'GLOBAL'
}, {
  id: 'research',
  name: 'RESEARCH'
}, {
  id: 'project',
  name: 'PROJECT'
}];
const PILLAR_MAP = Object.fromEntries(PILLARS.map(p => [p.id, p]));
function seedPhases() {
  return [{
    id: 'p1',
    label: '① 1年 秋〜春休み',
    period: '2026/9–2027/2',
    start: '2026-09-01',
    end: '2027-02-28',
    theme: '成績維持＋語学試験の初回受験'
  }, {
    id: 'p2',
    label: '② 2年 春学期',
    period: '2027/3–5',
    start: '2027-03-01',
    end: '2027-05-31',
    theme: '英語スコアを完全クリア、志望校を絞る'
  }, {
    id: 'p3',
    label: '③ 2年 夏休み',
    period: '2027/6–8',
    start: '2027-06-01',
    end: '2027-08-31',
    theme: 'サマーインターン×出願エッセイ（最過密期）'
  }, {
    id: 'p4',
    label: '④ 2年 秋学期',
    period: '2027/9–11',
    start: '2027-09-01',
    end: '2027-11-30',
    theme: '学内選考の出願と秋冬インターン'
  }, {
    id: 'p5',
    label: '⑤ 2年冬〜3年夏',
    period: '2027/12–2028/7',
    start: '2027-12-01',
    end: '2028-07-31',
    theme: '本出願・ビザ・渡航前最後の就活'
  }, {
    id: 'p6',
    label: '⑥ 3年 秋〜',
    period: '2028/8–2029/6',
    start: '2028-08-01',
    end: '2029-06-30',
    theme: '留学先へ出発（10ヶ月）'
  }];
}
function seedBands() {
  return [{
    id: 'b1',
    track: 'school',
    label: '1年',
    start: '2026-04',
    end: '2027-03'
  }, {
    id: 'b2',
    track: 'school',
    label: '2年',
    start: '2027-04',
    end: '2028-03'
  }, {
    id: 'b3',
    track: 'school',
    label: '3年',
    start: '2028-04',
    end: '2029-03'
  }, {
    id: 'b4',
    track: 'school',
    label: '4年',
    start: '2029-04',
    end: '2030-03'
  }, {
    id: 's1',
    track: 'study',
    label: '出願準備・情報収集',
    start: '2026-09',
    end: '2027-08'
  }, {
    id: 's2',
    track: 'study',
    label: '学内選考 出願',
    start: '2027-09',
    end: '2027-09',
    ms: true
  }, {
    id: 's3',
    track: 'study',
    label: '結果発表',
    start: '2027-11',
    end: '2027-11',
    ms: true
  }, {
    id: 's4',
    track: 'study',
    label: '本出願・ビザ・渡航準備',
    start: '2027-12',
    end: '2028-07'
  }, {
    id: 's5',
    track: 'study',
    label: '交換留学',
    start: '2028-09',
    end: '2029-06'
  }, {
    id: 'j1',
    track: 'job',
    label: '自己分析・業界研究',
    start: '2026-09',
    end: '2027-02'
  }, {
    id: 'j2',
    track: 'job',
    label: '博報堂IS〆',
    start: '2026-10',
    end: '2026-10',
    ms: true
  }, {
    id: 'j3',
    track: 'job',
    label: 'サマーIS選考',
    start: '2027-03',
    end: '2027-05'
  }, {
    id: 'j4',
    track: 'job',
    label: 'サマーインターン',
    start: '2027-06',
    end: '2027-08'
  }, {
    id: 'j5',
    track: 'job',
    label: '早期選考',
    start: '2027-09',
    end: '2028-03'
  }, {
    id: 'j6',
    track: 'job',
    label: '本選考',
    start: '2028-03',
    end: '2028-10'
  }, {
    id: 'j7',
    track: 'job',
    label: '内定',
    start: '2028-10',
    end: '2028-10',
    ms: true
  }];
}
function seedDeadlines() {
  return [{
    id: 'd1',
    text: '英語の過去問を解いて現状把握',
    date: '2026-09-07',
    done: false
  }, {
    id: 'd2',
    text: '博報堂インターン 申込〆切（適性テストあり）',
    date: '2026-10-02',
    done: false
  }, {
    id: 'd3',
    text: '英語試験の本試（2026年中／テストセンター型）',
    date: '2026-12-31',
    done: false
  }, {
    id: 'd4',
    text: '公式スコアレポートを用意（出願3ヶ月前）',
    date: '2027-06-30',
    done: false
  }, {
    id: 'd5',
    text: '学内選考 出願（KEIO IC-NET）',
    date: '2027-09-15',
    done: false
  }, {
    id: 'd6',
    text: '学内選考 結果発表',
    date: '2027-11-25',
    done: false
  }, {
    id: 'd7',
    text: '留学先大学へ出発',
    date: '2028-09-01',
    done: false
  }];
}
function defaultState() {
  const now = new Date().toISOString();
  const T = o => ({
    id: uid(),
    pillarId: 'career',
    phaseId: 'p1',
    weight: 2,
    status: 'active',
    progress: 0,
    createdAt: now,
    lastMovedAt: now,
    doneAt: null,
    droppedAt: null,
    note: '',
    gate: '',
    ret: 2,
    stalePen: false,
    ...o
  });
  return {
    version: 2,
    introDone: false,
    ideal: {
      headline: '2030年3月・電通／博報堂へ。30代前半で年収1000万、東京で20代を働き切る。',
      career: '電通・博報堂を第一に、コンサル・商社なども視野。職業選択で一番は年収。初任給30万以上で選べる状態に。',
      life: '欲しいタイミングで本を買える豊かさ。趣味にお金を使える。Jeepに乗る。',
      keep: '20代はしっかり働く（東京）。海外キャリアも選択肢に持てる。',
      targetStart: 3600000,
      target30s: 10000000,
      gradYM: '2030-03'
    },
    timeline: {
      startYM: '2026-04',
      endYM: '2030-03',
      bands: seedBands()
    },
    phases: seedPhases(),
    phaseDone: {},
    deadlines: seedDeadlines(),
    budget: {
      weekly: 6,
      reserveMust: 2,
      reserveUnlock: 1
    },
    weights: {
      advance: 1,
      stale: -2,
      review: 3,
      unlockDone: 5,
      mustDone: 4,
      betDone: 3,
      mustDropped: -6,
      betDropped: -1,
      deadlineHit: 3,
      deadlineMiss: -4
    },
    tasks: [T({
      title: '英語スコアで学内選考の出願資格を満たす',
      type: 'must',
      pillarId: 'global',
      phaseId: 'p1',
      weight: 3,
      progress: 10,
      gate: '未達だと交換留学の道が閉じる'
    }), T({
      title: '累積GPA 2.00以上を維持する',
      type: 'must',
      pillarId: 'career',
      phaseId: 'p1',
      weight: 2,
      progress: 40,
      gate: '未達だと出願そのものが不可'
    }), T({
      title: '里山再生プロジェクトを慶應公認団体化する',
      type: 'bet',
      pillarId: 'project',
      phaseId: 'p1',
      weight: 2,
      progress: 20,
      ret: 3,
      status: 'parked',
      gate: '人と被らない継続実績＝ESの主砲になりうる'
    })],
    dayTasks: [{
      id: uid(),
      taskId: null,
      text: '英語の過去問 Section1 を時間を計って解いて採点',
      date: todayISO(),
      done: false
    }],
    weekTasks: [{
      id: uid(),
      taskId: null,
      text: '申し込む奨学金を5件リストアップ',
      weekOf: mondayOf(todayISO()),
      done: false
    }],
    inbox: [{
      id: uid(),
      text: '博報堂インターンに参加する',
      type: 'unlock',
      pillarId: 'career',
      phaseId: 'p1',
      weight: 2,
      gate: '通ると早期選考ルートが開く',
      ret: 2,
      createdAt: now
    }],
    savings: {
      startYM: '2026-09',
      monthly: 50000,
      goalTotal: 1200000,
      entries: []
    },
    trend: {
      log: [],
      lastReview: null,
      incomeLog: []
    }
  };
}
const uid = () => 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const WD = ['日', '月', '火', '水', '木', '金', '土'];
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const yen = n => '¥' + Math.round(n).toLocaleString();
const man = n => (Math.round(n / 1000) / 10).toLocaleString() + '万';
function pad2(n) {
  return String(n).padStart(2, '0');
}
function isoOf(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function todayISO() {
  return isoOf(new Date());
}
function parseISO(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}
function addDaysISO(iso, n) {
  const d = parseISO(iso);
  d.setDate(d.getDate() + n);
  return isoOf(d);
}
function fmtDate(iso) {
  const d = parseISO(iso);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}（${WD[d.getDay()]}）`;
}
function fmtShort(iso) {
  const d = parseISO(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
function daysUntil(iso) {
  return Math.round((parseISO(iso) - parseISO(todayISO())) / 86400000);
}
function daysSince(isoDT) {
  if (!isoDT) return 999;
  return Math.floor((Date.now() - new Date(isoDT).getTime()) / 86400000);
}
function mondayOf(iso) {
  const d = parseISO(iso);
  const g = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - g);
  return isoOf(d);
}
function ymNow() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
function ymAdd(ym, n) {
  let [y, m] = ym.split('-').map(Number);
  m += n;
  while (m > 12) {
    m -= 12;
    y++;
  }
  while (m < 1) {
    m += 12;
    y--;
  }
  return `${y}-${String(m).padStart(2, '0')}`;
}
function monthsBetweenYM(a, b) {
  const [ay, am] = a.split('-').map(Number);
  const [by, bm] = b.split('-').map(Number);
  return (by - ay) * 12 + (bm - am);
}
function isStale(t) {
  return t.status === 'active' && daysSince(t.lastMovedAt) >= STALE_DAYS;
}
function currentPhase(phases) {
  const t = todayISO();
  for (const p of phases) if (t >= p.start && t <= p.end) return p;
  return t < phases[0].start ? phases[0] : phases[phases.length - 1];
}
function slope(ys) {
  const n = ys.length;
  if (n < 2) return 0;
  let sx = 0,
    sy = 0,
    sxy = 0,
    sxx = 0;
  ys.forEach((y, i) => {
    sx += i;
    sy += y;
    sxy += i * y;
    sxx += i * i;
  });
  const d = n * sxx - sx * sx;
  return d ? (n * sxy - sx * sy) / d : 0;
}
function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw);
    const d = defaultState();
    return {
      ...d,
      ...s,
      ideal: {
        ...d.ideal,
        ...(s.ideal || {})
      },
      timeline: {
        ...d.timeline,
        ...(s.timeline || {})
      },
      budget: {
        ...d.budget,
        ...(s.budget || {})
      },
      weights: {
        ...d.weights,
        ...(s.weights || {})
      },
      savings: {
        ...d.savings,
        ...(s.savings || {})
      },
      trend: {
        ...d.trend,
        ...(s.trend || {})
      }
    };
  } catch (e) {
    return defaultState();
  }
}
function saveState(s) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch (e) {}
}
function ensureTrend(s) {
  const log = [...(s.trend.log || [])];
  const start = log.length ? log[log.length - 1].date : addDaysISO(todayISO(), -1);
  let cursor = start;
  let score = log.length ? log[log.length - 1].score : TREND_START;
  const newLog = [...log];
  let guard = 0;
  while (cursor < todayISO() && guard++ < 800) {
    const next = addDaysISO(cursor, 1);
    if (next <= cursor) break;
    cursor = next;
    score = Math.max(0, score + PASSIVE_DECAY);
    newLog.push({
      date: cursor,
      delta: PASSIVE_DECAY,
      score,
      adv: 0
    });
  }
  if (!newLog.length) newLog.push({
    date: todayISO(),
    delta: 0,
    score: TREND_START,
    adv: 0
  });
  let extra = 0;
  const tasks = s.tasks.map(t => {
    if (t.status === 'active' && daysSince(t.lastMovedAt) >= STALE_DAYS && !t.stalePen) {
      extra += s.weights.stale || -2;
      return {
        ...t,
        stalePen: true
      };
    }
    return t;
  });
  if (extra !== 0) {
    const last = newLog[newLog.length - 1];
    const prev = newLog.length > 1 ? newLog[newLog.length - 2].score : TREND_START;
    last.delta += extra;
    last.score = Math.max(0, prev + last.delta);
  }
  return {
    ...s,
    tasks,
    trend: {
      ...s.trend,
      log: newLog.slice(-140)
    }
  };
}
function bumpTrend(s, amount, isAdvance) {
  const log = [...(s.trend.log || [])];
  if (!log.length || log[log.length - 1].date !== todayISO()) {
    const prev = log.length ? log[log.length - 1].score : TREND_START;
    log.push({
      date: todayISO(),
      delta: 0,
      score: prev,
      adv: 0
    });
  }
  const last = {
    ...log[log.length - 1]
  };
  let amt = amount;
  if (isAdvance) {
    if (last.adv >= ADV_CAP) amt = 0;else last.adv = (last.adv || 0) + 1;
  }
  last.delta += amt;
  const prevScore = log.length > 1 ? log[log.length - 2].score : TREND_START;
  last.score = Math.max(0, prevScore + last.delta);
  log[log.length - 1] = last;
  return {
    ...s,
    trend: {
      ...s.trend,
      log
    }
  };
}
function trendInfo(s) {
  const log = s.trend.log || [];
  const scores = log.map(e => e.score);
  const now = scores.length ? scores[scores.length - 1] : TREND_START;
  const window = scores.slice(-21);
  const sl = slope(window);
  const base = Math.max(1, now);
  const pct = sl / base * 100;
  let label = '横ばい',
    arrow = '→';
  if (pct > 0.15) {
    label = '上昇傾向';
    arrow = '↗';
  } else if (pct < -0.15) {
    label = '下降傾向';
    arrow = '↘';
  }
  const avg28 = (() => {
    const w = scores.slice(-28);
    return w.length ? w.reduce((a, b) => a + b, 0) / w.length : now;
  })();
  return {
    now,
    slopePctPerDay: pct,
    label,
    arrow,
    avg28
  };
}
function assetValue(t, s) {
  const cp = currentPhase(s.phases).id;
  const bd = [];
  let v = 0;
  const base = t.type === 'must' ? 40 : t.type === 'unlock' ? 30 : 15;
  bd.push([`種別 ${TYPE_LABEL[t.type]}`, base]);
  v += base;
  const prog = Math.round(t.progress / 100 * 25);
  bd.push(['これまでの進捗', prog]);
  v += prog;
  if (t.type === 'bet') {
    const r = (t.ret || 2) * 8;
    bd.push(['期待リターン', r]);
    v += r;
  } else if (t.gate && t.gate.trim()) {
    bd.push(['開閉する選択肢', 10]);
    v += 10;
  }
  const phasePts = t.phaseId === cp ? 15 : t.phaseId < cp ? -10 : 0;
  bd.push(['いまのフェーズとの一致', phasePts]);
  v += phasePts;
  const dls = s.deadlines.filter(d => !d.done);
  const near = dls.map(d => daysUntil(d.date)).filter(x => x >= 0);
  if (t.phaseId === cp && near.some(x => x <= 30)) {
    bd.push(['直近の締切が近い', 12]);
    v += 12;
  }
  v = clamp(Math.round(v), 0, 100);
  return {
    value: v,
    breakdown: bd
  };
}
function weeklyLoad(s) {
  return s.tasks.filter(t => t.status === 'active').reduce((a, t) => a + (t.weight || 1), 0);
}
function reductionPlan(s, addWeight) {
  const load = weeklyLoad(s);
  const over = load + addWeight - s.budget.weekly;
  if (over <= 0) return {
    ok: true,
    over: 0,
    freeNow: s.budget.weekly - load,
    candidates: []
  };
  const cand = s.tasks.filter(t => t.status === 'active').map(t => ({
    t,
    w: t.weight || 1,
    v: assetValue(t, s).value
  })).sort((a, b) => a.v - b.v || b.w - a.w);
  return {
    ok: false,
    over,
    freeNow: Math.max(0, s.budget.weekly - load),
    candidates: cand
  };
}
function computeIncome(s) {
  const tgt = s.ideal.targetStart || 3600000;
  const musts = s.tasks.filter(t => t.type === 'must' && t.status !== 'dropped');
  const unlocks = s.tasks.filter(t => t.type === 'unlock' && t.status !== 'dropped');
  const betsDone = s.tasks.filter(t => t.type === 'bet' && t.status === 'done');
  const rate = arr => {
    if (!arr.length) return null;
    let acc = 0;
    arr.forEach(t => {
      acc += t.status === 'done' ? 1 : (t.progress || 0) / 100 * 0.6;
    });
    return clamp(acc / arr.length, 0, 1);
  };
  const phTotalKeys = Object.keys(s.phaseDone || {});
  const phaseRate = (() => {
    const cp = currentPhase(s.phases);
    const doneCnt = phTotalKeys.filter(k => s.phaseDone[k]).length;
    return clamp(doneCnt / 12, 0, 1);
  })();
  const mustRate = rate(musts) != null ? rate(musts) : phaseRate;
  const unlockRate = rate(unlocks) != null ? rate(unlocks) : phaseRate * 0.7;
  let projected = tgt * 0.55;
  projected += mustRate * tgt * 0.25;
  projected += unlockRate * tgt * 0.12;
  projected += Math.min(betsDone.length * 0.5 + betsDone.reduce((a, t) => a + (t.ret || 2), 0) * 0.06, 1) * tgt * 0.05;
  projected += phaseRate * tgt * 0.06;
  const ti = trendInfo(s);
  const mo = clamp((ti.now / Math.max(1, ti.avg28) - 1) * 0.5, -0.08, 0.08);
  const withMomentum = projected * (1 + mo);
  const start = clamp(withMomentum, tgt * 0.4, tgt * 1.15);
  const ratio = start / tgt;
  const thirties = (s.ideal.target30s || 10000000) * ratio;
  return {
    target: tgt,
    projectedStart: start,
    projected30s: thirties,
    gap: start - tgt,
    mustRate,
    unlockRate,
    phaseRate,
    momentum: mo,
    unlockLift: tgt * 0.12 / Math.max(1, unlocks.length || 1),
    mustLift: tgt * 0.25 / Math.max(1, musts.length || 1)
  };
}
function Meter({
  v,
  max,
  neg
}) {
  return React.createElement("div", {
    className: `meter ${neg ? 'neg' : ''}`
  }, React.createElement("span", {
    style: {
      width: clamp(v / max * 100, 0, 100) + '%'
    }
  }));
}
function PillChips({
  t,
  phases
}) {
  const ph = phases.find(p => p.id === t.phaseId);
  return React.createElement("span", {
    className: "row wrap",
    style: {
      gap: 6,
      display: 'inline-flex'
    }
  }, React.createElement("span", {
    className: "tag"
  }, TYPE_LABEL[t.type]), React.createElement("span", {
    className: "tag tag-o"
  }, PILLAR_MAP[t.pillarId] ? PILLAR_MAP[t.pillarId].name : t.pillarId), ph && React.createElement("span", {
    className: "tag tag-o"
  }, ph.label.split(' ')[0]), React.createElement("span", {
    className: "tag tag-o"
  }, '•'.repeat(t.weight || 1), " ", t.weight, "pt/\u9031"));
}
function Line({
  data,
  h = 44,
  target
}) {
  if (!data || data.length < 2) return React.createElement("div", {
    className: "xs"
  }, "\u30C7\u30FC\u30BF\u84C4\u7A4D\u4E2D\u2026");
  const w = 280;
  const min = Math.min(...data, target != null ? target : Infinity);
  const max = Math.max(...data, target != null ? target : -Infinity);
  const rng = max - min || 1;
  const pts = data.map((v, i) => `${i / (data.length - 1) * w},${h - (v - min) / rng * h}`).join(' ');
  const ty = target != null ? h - (target - min) / rng * h : null;
  return React.createElement("svg", {
    viewBox: `0 0 ${w} ${h}`,
    width: "100%",
    height: h,
    preserveAspectRatio: "none"
  }, ty != null && React.createElement("line", {
    x1: "0",
    y1: ty,
    x2: w,
    y2: ty,
    stroke: "#B23B3B",
    strokeWidth: "1",
    strokeDasharray: "3 3"
  }), React.createElement("polyline", {
    points: pts,
    fill: "none",
    stroke: "#111",
    strokeWidth: "1.5"
  }));
}
function Timeline({
  s
}) {
  const {
    startYM,
    endYM,
    bands
  } = s.timeline;
  const total = monthsBetweenYM(startYM, endYM) + 1;
  const MW = 15;
  const rows = {
    school: 0,
    study: 1,
    job: 2
  };
  const rowY = {
    school: 4,
    study: 26,
    job: 48
  };
  const height = 74;
  const todayM = monthsBetweenYM(startYM, ymNow()) + new Date().getDate() / 30;
  const yrs = [];
  for (let i = 0; i < total; i++) {
    const ym = ymAdd(startYM, i);
    if (ym.endsWith('-01') || i === 0) yrs.push({
      i,
      y: ym.slice(0, 4)
    });
  }
  return React.createElement("div", {
    className: "tl-wrap"
  }, React.createElement("div", {
    className: "tl-inner",
    style: {
      width: total * MW,
      height
    }
  }, yrs.map(o => React.createElement("div", {
    key: o.i,
    className: "tl-yr",
    style: {
      left: o.i * MW,
      top: 62
    }
  }, o.y)), bands.map(b => {
    const left = monthsBetweenYM(startYM, b.start) * MW;
    const wdt = (monthsBetweenYM(b.start, b.end) + 1) * MW;
    return React.createElement("div", {
      key: b.id,
      className: `tl-band ${b.ms ? 'ms' : ''}`,
      style: {
        left,
        width: wdt,
        top: rowY[b.track]
      },
      title: b.label
    }, b.ms ? '' : b.label);
  }), React.createElement("div", {
    className: "tl-today",
    style: {
      left: todayM * MW
    }
  })));
}
function Home({
  s,
  set,
  go
}) {
  const phase = currentPhase(s.phases);
  const inc = useMemo(() => computeIncome(s), [s]);
  const ti = useMemo(() => trendInfo(s), [s]);
  const incHist = (s.trend.incomeLog || []).map(e => e.v);
  const today = todayISO();
  const dts = s.dayTasks.filter(d => d.date === today);
  const wk = mondayOf(today);
  const wts = s.weekTasks.filter(w => w.weekOf === wk);
  const wkDone = wts.filter(w => w.done).length;
  const reviewDue = !s.trend.lastReview || daysSince(s.trend.lastReview + 'T00:00:00') >= REVIEW_DUE_DAYS;
  const [dtText, setDtText] = useState('');
  function toggleDay(id) {
    set(p => {
      const dt = p.dayTasks.find(x => x.id === id);
      let np = {
        ...p,
        dayTasks: p.dayTasks.map(x => x.id === id ? {
          ...x,
          done: !x.done
        } : x)
      };
      if (dt && !dt.done) {
        np = bumpTrend(np, np.weights.advance, true);
        if (dt.taskId) np = {
          ...np,
          tasks: np.tasks.map(t => t.id === dt.taskId ? {
            ...t,
            lastMovedAt: new Date().toISOString(),
            stalePen: false
          } : t)
        };
      }
      return np;
    });
  }
  function addDay() {
    const v = dtText.trim();
    if (!v) return;
    set(p => ({
      ...p,
      dayTasks: [...p.dayTasks, {
        id: uid(),
        taskId: null,
        text: v,
        date: today,
        done: false
      }]
    }));
    setDtText('');
  }
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "kicker"
  }, "2026 \u2192 2030"), React.createElement("div", {
    className: "kicker"
  }, fmtDate(today))), React.createElement("div", {
    className: "display d-lg mt6"
  }, phase.label, React.createElement("span", {
    className: "sub"
  }, "\uFF0F", phase.theme)), !s.introDone && React.createElement("div", {
    className: "sec-line"
  }, React.createElement("div", {
    className: "kicker mb6"
  }, "\u8AAD\u3093\u3067\u304A\u304F"), React.createElement("div", {
    className: "sub"
  }, "\u30BF\u30B9\u30AF\uFF1D\u8CC7\u7523\u3002", React.createElement("b", null, "MUST"), "\uFF08\u3067\u304D\u306A\u3044\u3068\u9053\u304C\u9589\u3058\u308B\uFF09\uFF0F", React.createElement("b", null, "UNLOCK"), "\uFF08\u3067\u304D\u308B\u3068\u9053\u304C\u958B\u304F\uFF09\uFF0F", React.createElement("b", null, "BET"), "\uFF08\u5FC5\u9808\u3067\u306A\u3044\u304C\u5927\u304D\u3044\uFF09\u3002 1\u9031\u9593\u306B\u4F7F\u3048\u308B\u52B4\u529B\u306F ", React.createElement("b", null, s.budget.weekly, "pt"), "\u3002\u65B0\u3057\u304F\u59CB\u3081\u308B\u306B\u306F\u3001\u4F55\u304B\u3092\u624B\u653E\u3057\u3066\u67A0\u3092\u7A7A\u3051\u308B\u3002 \u958B\u304F\u305F\u3073\u306B\u300C4\u5E74\u306E\u4F4D\u7F6E\u300D\u300C\u4ECA\u65E5\u3084\u308B\u3053\u3068\u300D\u300C\u5E74\u53CE\u63DB\u7B97\u306E\u5DEE\u300D\u3092\u898B\u3066\u3001\u30BA\u30EC\u3092\u611F\u3058\u308B\u3002"), React.createElement("button", {
    className: "btn btn-sm mt10",
    onClick: () => set(p => ({
      ...p,
      introDone: true
    }))
  }, "\u9589\u3058\u308B")), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "4\u5E74\u9593\u306E\u30BF\u30A4\u30E0\u30E9\u30A4\u30F3"), React.createElement("div", {
    className: "mt10"
  }, React.createElement(Timeline, {
    s: s
  })), React.createElement("div", {
    className: "xs mt6"
  }, "\u4E0A\uFF1A\u5B66\u5E74\uFF0F\u4E2D\uFF1A\u7559\u5B66\u52DF\u96C6\uFF0F\u4E0B\uFF1A\u5C31\u6D3B\u3000\uFF5C\u3000\u7E26\u7DDA\uFF1D\u4ECA\u65E5")), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u73FE\u5728\u5730 \u2192 \u76EE\u6A19\uFF08\u5E74\u53CE\u63DB\u7B97\uFF09"), React.createElement("button", {
    className: "btn-bare",
    onClick: () => go('eval')
  }, "\u8A55\u4FA1\u3078")), React.createElement("div", {
    className: "row mt10",
    style: {
      alignItems: 'flex-end',
      gap: 16
    }
  }, React.createElement("div", null, React.createElement("div", {
    className: "xs"
  }, "\u4E88\u6E2C\u521D\u4EFB\u7D66\uFF08\u5E74\u53CE\uFF09"), React.createElement("div", {
    className: "display d-xl num"
  }, man(inc.projectedStart))), React.createElement("div", {
    style: {
      paddingBottom: 6
    }
  }, React.createElement("div", {
    className: "xs"
  }, "\u76EE\u6A19"), React.createElement("div", {
    className: "num",
    style: {
      fontSize: 15
    }
  }, man(inc.target)))), React.createElement("div", {
    className: `display d-md num mt6`,
    style: {
      color: inc.gap < 0 ? 'var(--accent)' : 'var(--ink)'
    }
  }, inc.gap < 0 ? '不足 ' : '超過 ', man(Math.abs(inc.gap)), " / \u5E74"), React.createElement("div", {
    className: "mt10"
  }, React.createElement(Line, {
    data: incHist.length >= 2 ? incHist : [inc.target * 0.7, inc.projectedStart],
    target: inc.target
  })), React.createElement("div", {
    className: "xs mt6"
  }, "\u50BE\u5411 ", React.createElement("b", null, ti.label), " ", ti.arrow, "\u3000\uFF5C\u300030\u4EE3\u524D\u534A\u306E\u4E88\u6E2C ", man(inc.projected30s), "\uFF08\u76EE\u6A19 ", man(s.ideal.target30s), "\uFF09")), reviewDue && React.createElement("div", {
    className: "sec-line"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", null, React.createElement("div", {
    className: "kicker"
  }, "\u9031\u6B21\u30EC\u30D3\u30E5\u30FC"), React.createElement("div", {
    className: "sub"
  }, s.trend.lastReview ? `前回から ${daysSince(s.trend.lastReview + 'T00:00:00')}日` : 'まだ一度もやっていません')), React.createElement("button", {
    className: "btn btn-fill btn-sm",
    onClick: () => go('review')
  }, "\u59CB\u3081\u308B"))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u4ECA\u65E5\u3084\u308B\u3053\u3068\uFF081DAY\uFF09"), React.createElement("div", {
    className: "xs"
  }, "\u4ECA\u9031 ", wkDone, "/", wts.length)), React.createElement("div", {
    className: "mt10"
  }, dts.length === 0 && React.createElement("div", {
    className: "sub"
  }, "\u4ECA\u65E5\u306E\u30BF\u30B9\u30AF\u306F\u672A\u8A2D\u5B9A\u30021\u3064\u3060\u3051\u6C7A\u3081\u308B\u3002"), dts.map(d => React.createElement("div", {
    key: d.id,
    className: "row",
    style: {
      padding: '8px 0',
      borderTop: '1px solid var(--line)'
    }
  }, React.createElement("div", {
    className: `tick ${d.done ? 'on' : ''}`,
    onClick: () => toggleDay(d.id)
  }, d.done ? '✓' : ''), React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 13.5,
      textDecoration: d.done ? 'line-through' : 'none',
      color: d.done ? 'var(--sub)' : 'var(--ink)'
    }
  }, d.text), React.createElement("button", {
    className: "btn-bare",
    onClick: () => set(p => ({
      ...p,
      dayTasks: p.dayTasks.filter(x => x.id !== d.id)
    }))
  }, "\u524A\u9664")))), React.createElement("div", {
    className: "row mt10",
    style: {
      gap: 8
    }
  }, React.createElement("input", {
    className: "input",
    placeholder: "\u4ECA\u65E5\u306E\u4E00\u6B69\u3092\u66F8\u304F",
    value: dtText,
    onChange: e => setDtText(e.target.value)
  }), React.createElement("button", {
    className: "btn btn-sm",
    onClick: addDay,
    disabled: !dtText.trim()
  }, "\u8FFD\u52A0"))), React.createElement("div", {
    className: "sec-line"
  }, React.createElement("button", {
    className: "btn btn-block",
    onClick: () => go('tasks')
  }, "\u30BF\u30B9\u30AF\uFF08\u8CC7\u7523\uFF09\u3092\u898B\u308B")));
}
function Tasks({
  s,
  set,
  go
}) {
  const load = weeklyLoad(s);
  const active = s.tasks.filter(t => t.status === 'active');
  const parked = s.tasks.filter(t => t.status === 'parked');
  const done = s.tasks.filter(t => t.status === 'done');
  const dropped = s.tasks.filter(t => t.status === 'dropped');
  const [adding, setAdding] = useState(false);
  const [quit, setQuit] = useState(null);
  const [starting, setStarting] = useState(null);
  const wk = mondayOf(todayISO());
  const wts = s.weekTasks.filter(w => w.weekOf === wk);
  const [wtText, setWtText] = useState('');
  const now = () => new Date().toISOString();
  function advance(id) {
    set(p => bumpTrend({
      ...p,
      tasks: p.tasks.map(t => t.id === id ? {
        ...t,
        progress: clamp((t.progress || 0) + 10, 0, 100),
        lastMovedAt: now(),
        stalePen: false
      } : t)
    }, p.weights.advance, true));
  }
  function touch(id) {
    set(p => bumpTrend({
      ...p,
      tasks: p.tasks.map(t => t.id === id ? {
        ...t,
        lastMovedAt: now(),
        stalePen: false
      } : t)
    }, p.weights.advance, true));
  }
  function complete(id) {
    set(p => {
      const t = p.tasks.find(x => x.id === id);
      if (!t) return p;
      const amt = t.type === 'must' ? p.weights.mustDone : t.type === 'unlock' ? p.weights.unlockDone : p.weights.betDone;
      return bumpTrend({
        ...p,
        tasks: p.tasks.map(x => x.id === id ? {
          ...x,
          status: 'done',
          progress: 100,
          doneAt: now(),
          lastMovedAt: now()
        } : x)
      }, amt, false);
    });
  }
  function park(id) {
    set(p => ({
      ...p,
      tasks: p.tasks.map(t => t.id === id ? {
        ...t,
        status: 'parked',
        lastMovedAt: now()
      } : t)
    }));
  }
  function resume(id) {
    const plan = reductionPlan(s, s.tasks.find(t => t.id === id).weight || 1);
    if (!plan.ok) {
      alert(`いま戻すと予算オーバー（${plan.over}pt）。先にどれかを手放すか保留に。`);
      return;
    }
    set(p => ({
      ...p,
      tasks: p.tasks.map(t => t.id === id ? {
        ...t,
        status: 'active',
        lastMovedAt: now(),
        stalePen: false
      } : t)
    }));
  }
  function doQuit(id, mode) {
    set(p => {
      const t = p.tasks.find(x => x.id === id);
      if (!t) return p;
      if (mode === 'park') return {
        ...p,
        tasks: p.tasks.map(x => x.id === id ? {
          ...x,
          status: 'parked',
          lastMovedAt: now()
        } : x)
      };
      const amt = t.type === 'must' ? p.weights.mustDropped : t.type === 'bet' ? p.weights.betDropped : 0;
      return bumpTrend({
        ...p,
        tasks: p.tasks.map(x => x.id === id ? {
          ...x,
          status: 'dropped',
          droppedAt: now(),
          lastMovedAt: now()
        } : x)
      }, amt, false);
    });
    setQuit(null);
  }
  function activateInbox(item, sacrificeId) {
    set(p => {
      let np = {
        ...p
      };
      if (sacrificeId) np = {
        ...np,
        tasks: np.tasks.map(t => t.id === sacrificeId ? {
          ...t,
          status: 'parked',
          lastMovedAt: now()
        } : t)
      };
      np = {
        ...np,
        tasks: [...np.tasks, {
          id: uid(),
          title: item.text,
          type: item.type,
          pillarId: item.pillarId,
          phaseId: item.phaseId,
          weight: item.weight,
          status: 'active',
          progress: 0,
          createdAt: item.createdAt,
          lastMovedAt: now(),
          doneAt: null,
          droppedAt: null,
          note: '',
          gate: item.gate || '',
          ret: item.ret || 2,
          stalePen: false
        }],
        inbox: np.inbox.filter(x => x.id !== item.id)
      };
      return np;
    });
    setStarting(null);
  }
  function addWeekTask() {
    const v = wtText.trim();
    if (!v) return;
    set(p => ({
      ...p,
      weekTasks: [...p.weekTasks, {
        id: uid(),
        taskId: null,
        text: v,
        weekOf: wk,
        done: false
      }]
    }));
    setWtText('');
  }
  function toggleWeek(id) {
    set(p => {
      const w = p.weekTasks.find(x => x.id === id);
      let np = {
        ...p,
        weekTasks: p.weekTasks.map(x => x.id === id ? {
          ...x,
          done: !x.done
        } : x)
      };
      if (w && !w.done) np = bumpTrend(np, np.weights.advance, true);
      return np;
    });
  }
  const Section = ({
    type
  }) => {
    const list = active.filter(t => t.type === type);
    return React.createElement("div", {
      className: "sec"
    }, React.createElement("div", {
      className: "between"
    }, React.createElement("div", {
      className: "kicker"
    }, TYPE_LABEL[type]), React.createElement("div", {
      className: "xs"
    }, TYPE_NOTE[type])), list.length === 0 && React.createElement("div", {
      className: "sub mt10"
    }, "\u306A\u3057"), list.map(t => {
      const av = assetValue(t, s);
      return React.createElement("div", {
        key: t.id,
        className: `task ${isStale(t) ? 'stale' : ''}`
      }, React.createElement("div", {
        className: "between"
      }, React.createElement("div", {
        className: "t-title",
        style: {
          fontSize: 14,
          fontWeight: 700,
          lineHeight: 1.55,
          flex: 1
        }
      }, t.title), React.createElement("div", {
        className: "num xs",
        style: {
          whiteSpace: 'nowrap'
        }
      }, "\u8CC7\u7523 ", av.value)), React.createElement("div", {
        className: "mt6"
      }, React.createElement(PillChips, {
        t: t,
        phases: s.phases
      })), t.gate && React.createElement("div", {
        className: "xs mt6"
      }, t.type === 'bet' ? 'リターン: ' : '開閉: ', t.gate), React.createElement("div", {
        className: "row mt6",
        style: {
          gap: 8
        }
      }, React.createElement("div", {
        style: {
          flex: 1
        }
      }, React.createElement(Meter, {
        v: t.progress || 0,
        max: 100
      })), React.createElement("div", {
        className: "num xs"
      }, t.progress || 0, "%")), React.createElement("div", {
        className: "xs mt6"
      }, daysSince(t.lastMovedAt) === 0 ? '今日動かした' : `${daysSince(t.lastMovedAt)}日 動いていない`), React.createElement("div", {
        className: "row wrap mt10",
        style: {
          gap: 6
        }
      }, React.createElement("button", {
        className: "btn btn-sm",
        onClick: () => advance(t.id)
      }, "+10% \u9032\u3081\u308B"), React.createElement("button", {
        className: "btn btn-sm",
        onClick: () => touch(t.id)
      }, "\u52D5\u304B\u3057\u305F"), React.createElement("button", {
        className: "btn btn-sm btn-fill",
        onClick: () => complete(t.id)
      }, "\u5B8C\u4E86"), React.createElement("button", {
        className: "btn btn-sm",
        onClick: () => setQuit(quit === t.id ? null : t.id)
      }, "\u624B\u653E\u3059\u2026")), quit === t.id && React.createElement(QuitPanel, {
        s: s,
        t: t,
        av: av,
        onDo: doQuit,
        onCancel: () => setQuit(null)
      }));
    }));
  };
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u30BF\u30B9\u30AF\uFF1D\u8CC7\u7523\u30DD\u30FC\u30C8\u30D5\u30A9\u30EA\u30AA"), React.createElement("div", {
    className: "display d-lg mt6"
  }, "\u9031\u306E\u52B4\u529B ", React.createElement("span", {
    className: "num"
  }, load), " / ", s.budget.weekly, " pt"), React.createElement("div", {
    className: "mt10"
  }, React.createElement(Meter, {
    v: load,
    max: s.budget.weekly,
    neg: load > s.budget.weekly
  })), load > s.budget.weekly ? React.createElement("div", {
    className: "xs mt6",
    style: {
      color: 'var(--accent)'
    }
  }, "\u4E88\u7B97\u30AA\u30FC\u30D0\u30FC ", load - s.budget.weekly, "pt\u3002\u3069\u308C\u304B\u3092\u624B\u653E\u3059\uFF0F\u4FDD\u7559\u306B\u3059\u308B\u3002") : React.createElement("div", {
    className: "xs mt6"
  }, "\u7A7A\u304D ", s.budget.weekly - load, "pt\uFF08MUST\u78BA\u4FDD ", s.budget.reserveMust, " / UNLOCK\u78BA\u4FDD ", s.budget.reserveUnlock, "\uFF09"), React.createElement(Section, {
    type: "must"
  }), React.createElement(Section, {
    type: "unlock"
  }), React.createElement(Section, {
    type: "bet"
  }), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u5019\u88DC\uFF08\u3059\u3050\u306B\u306F\u59CB\u3081\u306A\u3044\uFF09"), React.createElement("button", {
    className: "btn-bare",
    onClick: () => setAdding(a => !a)
  }, adding ? '閉じる' : '＋ 追加')), adding && React.createElement(AddPanel, {
    s: s,
    onAdd: item => {
      set(p => ({
        ...p,
        inbox: [item, ...p.inbox]
      }));
      setAdding(false);
    }
  }), s.inbox.length === 0 && !adding && React.createElement("div", {
    className: "sub mt10"
  }, "\u306A\u3057"), s.inbox.map(item => {
    const plan = reductionPlan(s, item.weight);
    return React.createElement("div", {
      key: item.id,
      className: "task"
    }, React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 1.55
      }
    }, item.text), React.createElement("div", {
      className: "xs mt6"
    }, React.createElement("span", {
      className: "tag"
    }, TYPE_LABEL[item.type]), " ", React.createElement("span", {
      className: "tag tag-o"
    }, item.weight, "pt/\u9031"), " ", item.gate ? '｜ ' + item.gate : ''), plan.ok ? React.createElement("div", {
      className: "row wrap mt10",
      style: {
        gap: 6
      }
    }, React.createElement("span", {
      className: "xs"
    }, "\u3044\u307E\u958B\u59CB\u3067\u304D\u307E\u3059\uFF08\u7A7A\u304D ", plan.freeNow, "pt\uFF09"), React.createElement("button", {
      className: "btn btn-sm btn-fill",
      onClick: () => activateInbox(item, null)
    }, "\u958B\u59CB\u3059\u308B"), React.createElement("button", {
      className: "btn-bare",
      onClick: () => set(p => ({
        ...p,
        inbox: p.inbox.filter(x => x.id !== item.id)
      }))
    }, "\u7834\u68C4")) : React.createElement("div", {
      className: "mt10"
    }, React.createElement("div", {
      className: "xs",
      style: {
        color: 'var(--accent)'
      }
    }, "\u958B\u59CB\u306B\u306F ", plan.over, "pt \u4E0D\u8DB3\u3002\u6B21\u306E\u3069\u308C\u304B\u3092\u624B\u653E\u3059\uFF0F\u4FDD\u7559\u306B\u3059\u308B\u3068\u59CB\u3081\u3089\u308C\u307E\u3059\uFF1A"), plan.candidates.map(c => React.createElement("div", {
      key: c.t.id,
      className: "between",
      style: {
        padding: '7px 0',
        borderTop: '1px solid var(--line)'
      }
    }, React.createElement("div", {
      className: "xs"
    }, c.t.title, React.createElement("br", null), "\u8CC7\u7523 ", c.v, "\uFF0F", c.w, "pt"), React.createElement("button", {
      className: "btn btn-sm",
      disabled: c.w < plan.over,
      onClick: () => activateInbox(item, c.t.id)
    }, "\u3053\u308C\u3092\u5916\u3057\u3066\u958B\u59CB"))), React.createElement("button", {
      className: "btn-bare mt6",
      onClick: () => set(p => ({
        ...p,
        inbox: p.inbox.filter(x => x.id !== item.id)
      }))
    }, "\u5019\u88DC\u3092\u7834\u68C4")));
  })), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u4ECA\u9031\u306E\u30BF\u30B9\u30AF\uFF08WEEKLY\uFF09"), React.createElement("div", {
    className: "mt10"
  }, wts.length === 0 && React.createElement("div", {
    className: "sub"
  }, "\u672A\u8A2D\u5B9A"), wts.map(w => React.createElement("div", {
    key: w.id,
    className: "row",
    style: {
      padding: '8px 0',
      borderTop: '1px solid var(--line)'
    }
  }, React.createElement("div", {
    className: `tick ${w.done ? 'on' : ''}`,
    onClick: () => toggleWeek(w.id)
  }, w.done ? '✓' : ''), React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 13,
      textDecoration: w.done ? 'line-through' : 'none',
      color: w.done ? 'var(--sub)' : 'var(--ink)'
    }
  }, w.text), React.createElement("button", {
    className: "btn-bare",
    onClick: () => set(p => ({
      ...p,
      weekTasks: p.weekTasks.filter(x => x.id !== w.id)
    }))
  }, "\u524A\u9664")))), React.createElement("div", {
    className: "row mt10",
    style: {
      gap: 8
    }
  }, React.createElement("input", {
    className: "input",
    placeholder: "\u4ECA\u9031\u3084\u308B\u3053\u3068",
    value: wtText,
    onChange: e => setWtText(e.target.value)
  }), React.createElement("button", {
    className: "btn btn-sm",
    onClick: addWeekTask,
    disabled: !wtText.trim()
  }, "\u8FFD\u52A0"))), (parked.length > 0 || done.length > 0 || dropped.length > 0) && React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u4FDD\u7559 / \u5B8C\u4E86 / \u624B\u653E\u3057\u305F"), parked.map(t => React.createElement("div", {
    key: t.id,
    className: "between",
    style: {
      padding: '8px 0',
      borderTop: '1px solid var(--line)'
    }
  }, React.createElement("div", {
    className: "xs"
  }, "\u4FDD\u7559\u30FB", t.title), React.createElement("button", {
    className: "btn btn-sm",
    onClick: () => resume(t.id)
  }, "\u623B\u3059"))), done.map(t => React.createElement("div", {
    key: t.id,
    className: "xs",
    style: {
      padding: '6px 0',
      borderTop: '1px solid var(--line)'
    }
  }, "\u5B8C\u4E86\u30FB", t.title)), dropped.map(t => React.createElement("div", {
    key: t.id,
    className: "xs",
    style: {
      padding: '6px 0',
      borderTop: '1px solid var(--line)',
      color: 'var(--faint)'
    }
  }, "\u624B\u653E\u3057\u305F\u30FB", t.title))));
}
function QuitPanel({
  s,
  t,
  av,
  onDo,
  onCancel
}) {
  const inc = computeIncome(s);
  const blocked = s.inbox.filter(it => !reductionPlan(s, it.weight).ok && it.weight <= (t.weight || 1));
  return React.createElement("div", {
    className: "mt10",
    style: {
      borderTop: '1px solid var(--ink)',
      paddingTop: 10
    }
  }, React.createElement("div", {
    className: "kicker"
  }, "\u3053\u306E\u8CC7\u7523\u3092\u624B\u653E\u3059"), React.createElement("div", {
    className: "mt6"
  }, av.breakdown.map(([k, v], i) => React.createElement("div", {
    key: i,
    className: "between",
    style: {
      padding: '3px 0'
    }
  }, React.createElement("span", {
    className: "xs"
  }, k), React.createElement("span", {
    className: "num xs"
  }, v > 0 ? '+' : '', v))), React.createElement("div", {
    className: "between",
    style: {
      padding: '4px 0',
      borderTop: '1px solid var(--line)'
    }
  }, React.createElement("span", {
    className: "xs",
    style: {
      fontWeight: 700
    }
  }, "\u8CC7\u7523\u4FA1\u5024"), React.createElement("span", {
    className: "num xs",
    style: {
      fontWeight: 700
    }
  }, av.value, " / 100"))), React.createElement("div", {
    className: "grid2 mt10"
  }, React.createElement("div", null, React.createElement("div", {
    className: "kicker"
  }, "\u624B\u653E\u3059\u30E1\u30EA\u30C3\u30C8"), React.createElement("div", {
    className: "xs mt6"
  }, "\u30FB\u9031\u306E\u52B4\u529B\u304C ", React.createElement("b", null, "+", t.weight, "pt"), " \u7A7A\u304F", React.createElement("br", null), "\u30FB\u4E2D\u9014\u534A\u7AEF\u304C1\u3064\u6E1B\u308B", isStale(t) ? '（停滞コストが消える）' : '', React.createElement("br", null), blocked.length > 0 && React.createElement(React.Fragment, null, "\u30FB\u5019\u88DC\u300C", blocked[0].text, "\u300D\u3092\u958B\u59CB\u3067\u304D\u308B", React.createElement("br", null)))), React.createElement("div", null, React.createElement("div", {
    className: "kicker"
  }, "\u624B\u653E\u3059\u30C7\u30E1\u30EA\u30C3\u30C8"), React.createElement("div", {
    className: "xs mt6"
  }, "\u30FB\u9032\u6357 ", React.createElement("b", null, t.progress || 0, "%"), " \u304C\u6D88\u3048\u308B", React.createElement("br", null), t.type === 'must' && React.createElement(React.Fragment, null, "\u30FB", React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "\u300C", t.gate || '次の選択肢', "\u300D\u304C\u9589\u3058\u308B"), "\uFF08\u50BE\u5411\u3078 ", s.weights.mustDropped, "\uFF09", React.createElement("br", null)), t.type === 'unlock' && React.createElement(React.Fragment, null, "\u30FB\u300C", t.gate || '開くはずの道', "\u300D\u304C\u958B\u304B\u306A\u3044", React.createElement("br", null)), t.type === 'bet' && React.createElement(React.Fragment, null, "\u30FB\u671F\u5F85\u30EA\u30BF\u30FC\u30F3\uFF08\xD7", t.ret || 2, "\uFF09\u3092\u6368\u3066\u308B\uFF08\u50BE\u5411\u3078 ", s.weights.betDropped, "\uFF09", React.createElement("br", null)), t.type === 'must' && React.createElement(React.Fragment, null, "\u30FB\u4E88\u6E2C\u521D\u4EFB\u7D66\u306E\u62BC\u4E0A\u3052\u5206 \u7D04 ", man(inc.mustLift), " \u3092\u5931\u3046", React.createElement("br", null)), t.type === 'unlock' && React.createElement(React.Fragment, null, "\u30FB\u4E88\u6E2C\u521D\u4EFB\u7D66\u306E\u62BC\u4E0A\u3052\u5206 \u7D04 ", man(inc.unlockLift), " \u3092\u5931\u3046", React.createElement("br", null))))), React.createElement("div", {
    className: "row wrap mt10",
    style: {
      gap: 6
    }
  }, React.createElement("button", {
    className: "btn btn-sm",
    onClick: () => onDo(t.id, 'park')
  }, "\u4FDD\u7559\u306B\u3059\u308B\uFF08\u9032\u6357\u306F\u6B8B\u3059\uFF09"), React.createElement("button", {
    className: "btn btn-sm tag-neg",
    style: {
      borderColor: 'var(--accent)',
      color: 'var(--accent)'
    },
    onClick: () => onDo(t.id, 'drop')
  }, "\u624B\u653E\u3059"), React.createElement("button", {
    className: "btn-bare",
    onClick: onCancel
  }, "\u3084\u3081\u308B")));
}
function AddPanel({
  s,
  onAdd
}) {
  const [f, setF] = useState({
    text: '',
    type: 'unlock',
    pillarId: 'career',
    phaseId: currentPhase(s.phases).id,
    weight: 2,
    gate: '',
    ret: 2
  });
  const plan = reductionPlan(s, f.weight);
  return React.createElement("div", {
    className: "mt10",
    style: {
      borderTop: '1px solid var(--line)',
      paddingTop: 10
    }
  }, React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u3084\u308B\u3053\u3068"), React.createElement("textarea", {
    className: "textarea",
    value: f.text,
    onChange: e => setF({
      ...f,
      text: e.target.value
    }),
    placeholder: "\u4F8B\uFF1A\u4EA4\u63DB\u7559\u5B66\u306E\u51FA\u9858\u30A8\u30C3\u30BB\u30A4\u3092\u5B8C\u6210\u3055\u305B\u308B"
  })), React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u30BF\u30A4\u30D7"), React.createElement("div", {
    className: "seg"
  }, ['must', 'unlock', 'bet'].map(tp => React.createElement("button", {
    key: tp,
    className: f.type === tp ? 'on' : '',
    onClick: () => setF({
      ...f,
      type: tp
    })
  }, TYPE_LABEL[tp]))), React.createElement("div", {
    className: "xs mt6"
  }, TYPE_NOTE[f.type])), React.createElement("div", {
    className: "grid2"
  }, React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u67F1"), React.createElement("select", {
    className: "input",
    value: f.pillarId,
    onChange: e => setF({
      ...f,
      pillarId: e.target.value
    })
  }, PILLARS.map(p => React.createElement("option", {
    key: p.id,
    value: p.id
  }, p.name)))), React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u30D5\u30A7\u30FC\u30BA"), React.createElement("select", {
    className: "input",
    value: f.phaseId,
    onChange: e => setF({
      ...f,
      phaseId: e.target.value
    })
  }, s.phases.map(p => React.createElement("option", {
    key: p.id,
    value: p.id
  }, p.label))))), React.createElement("div", {
    className: "grid2"
  }, React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u9031\u306E\u52B4\u529B"), React.createElement("div", {
    className: "seg"
  }, [1, 2, 3].map(w => React.createElement("button", {
    key: w,
    className: f.weight === w ? 'on' : '',
    onClick: () => setF({
      ...f,
      weight: w
    })
  }, w, "pt")))), React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, f.type === 'bet' ? '期待リターン' : '開閉する選択肢'), f.type === 'bet' ? React.createElement("div", {
    className: "seg"
  }, [1, 2, 3].map(r => React.createElement("button", {
    key: r,
    className: f.ret === r ? 'on' : '',
    onClick: () => setF({
      ...f,
      ret: r
    })
  }, "\xD7", r))) : React.createElement("input", {
    className: "input",
    value: f.gate,
    onChange: e => setF({
      ...f,
      gate: e.target.value
    }),
    placeholder: "\u4F8B\uFF1A\u7559\u5B66\u306E\u9053\u304C\u9589\u3058\u308B"
  }))), React.createElement("div", {
    className: "xs mb10"
  }, plan.ok ? `いまなら空き ${plan.freeNow}pt。候補に入れて、すぐ開始できます。` : `いま追加しても即開始は不可（${plan.over}pt 不足）。候補に入れて、タスク画面で何かを手放してから開始します。`), React.createElement("button", {
    className: "btn btn-block btn-fill",
    disabled: !f.text.trim(),
    onClick: () => onAdd({
      id: uid(),
      text: f.text.trim(),
      type: f.type,
      pillarId: f.pillarId,
      phaseId: f.phaseId,
      weight: f.weight,
      gate: f.gate.trim(),
      ret: f.ret,
      createdAt: new Date().toISOString()
    })
  }, "\u5019\u88DC\u306B\u5165\u308C\u308B"));
}
function Evaluation({
  s,
  set,
  go
}) {
  const ti = useMemo(() => trendInfo(s), [s]);
  const inc = useMemo(() => computeIncome(s), [s]);
  const log = s.trend.log || [];
  const scores = log.map(e => e.score).slice(-84);
  const wkDays = log.slice(-7);
  const w28 = log.slice(-28);
  const tally = arr => {
    let pos = 0,
      neg = 0;
    arr.forEach(e => {
      if (e.delta > 0) pos += e.delta;else neg += e.delta;
    });
    return {
      pos: Math.round(pos),
      neg: Math.round(neg)
    };
  };
  const t7 = tally(wkDays),
    t28 = tally(w28);
  const streak = (() => {
    let c = 0;
    for (let i = log.length - 1; i >= 0; i--) {
      if ((log[i].adv || 0) > 0) c++;else break;
    }
    return c;
  })();
  const proj90 = Math.max(0, ti.now + ti.slopePctPerDay / 100 * ti.now * 90);
  const momentum90 = clamp((proj90 / Math.max(1, ti.avg28) - 1) * 0.5, -0.08, 0.08);
  const incIfHold = inc.projectedStart / (1 + inc.momentum) * (1 + momentum90);
  const gapIfHold = incIfHold - inc.target;
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u8A55\u4FA1 \u2014 \u53D6\u308A\u7D44\u307F\u306E\u50BE\u5411"), React.createElement("div", {
    className: "row mt6",
    style: {
      alignItems: 'flex-end',
      gap: 12
    }
  }, React.createElement("div", {
    className: "display d-xl"
  }, ti.label), React.createElement("div", {
    className: "display d-lg"
  }, ti.arrow)), React.createElement("div", {
    className: "num xs mt6"
  }, "\u6307\u6570 ", ti.now.toFixed(1), "\uFF0828\u65E5\u5E73\u5747 ", ti.avg28.toFixed(1), "\uFF09\uFF0F \u50BE\u304D ", ti.slopePctPerDay.toFixed(2), "%/\u65E5"), React.createElement("div", {
    className: "mt10"
  }, React.createElement(Line, {
    data: scores.length >= 2 ? scores : [TREND_START, ti.now],
    h: 54
  })), React.createElement("div", {
    className: "xs mt6"
  }, "\u70BA\u66FF\u3068\u540C\u3058\u3002\u524D\u9032\u3067\u4E0A\u304C\u308A\u3001\u653E\u7F6E\u3067\u4E0B\u304C\u308B\u3002\u76F4\u8FD112\u9031\u3002"), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u3053\u306E\u50BE\u5411\u304C\u7D9A\u304F\u3068\uFF083\u30F6\u6708\u5F8C\uFF09"), React.createElement("div", {
    className: "sub mt6"
  }, "\u3044\u307E\u306E\u50BE\u5411\uFF08", React.createElement("b", null, ti.label), "\uFF09\u304C\u7D9A\u304F\u3068\u3001\u5352\u696D\u6642\u306E\u4E88\u6E2C\u521D\u4EFB\u7D66\u306F ", React.createElement("b", {
    className: "num"
  }, man(incIfHold)), "\u3002 \u76EE\u6A19 ", man(inc.target), " \u306B\u5BFE\u3057\u3066", React.createElement("b", {
    className: "num",
    style: {
      color: gapIfHold < 0 ? 'var(--accent)' : 'var(--ink)'
    }
  }, " ", gapIfHold < 0 ? '不足 ' : '超過 ', man(Math.abs(gapIfHold)), "\uFF0F\u5E74"), "\u3002"), React.createElement("div", {
    className: "sub mt6"
  }, "\u3044\u307E ", React.createElement("b", null, "UNLOCK"), " \u30921\u3064\u5B8C\u4E86\u3059\u308B\u3068\u3001\u4E88\u6E2C\u521D\u4EFB\u7D66\u306F\u7D04 ", React.createElement("b", {
    className: "num"
  }, "\uFF0B", man(inc.unlockLift)), "\u3002", React.createElement("b", null, "MUST"), " \u30921\u3064\u624B\u653E\u3059\u3068\u3001\u50BE\u5411\u306B ", React.createElement("b", {
    className: "num",
    style: {
      color: 'var(--accent)'
    }
  }, s.weights.mustDropped), "\u3001\u4E88\u6E2C\u521D\u4EFB\u7D66 \u7D04 ", React.createElement("b", {
    className: "num",
    style: {
      color: 'var(--accent)'
    }
  }, "\u2212", man(inc.mustLift)), "\u3002")), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u8981\u56E0\u306E\u5185\u8A33"), React.createElement("div", {
    className: "grid2 mt10"
  }, React.createElement("div", null, React.createElement("div", {
    className: "xs"
  }, "\u76F4\u8FD17\u65E5"), React.createElement("div", {
    className: "num d-md display"
  }, "\uFF0B", t7.pos, " / ", t7.neg)), React.createElement("div", null, React.createElement("div", {
    className: "xs"
  }, "\u76F4\u8FD128\u65E5"), React.createElement("div", {
    className: "num d-md display"
  }, "\uFF0B", t28.pos, " / ", t28.neg))), React.createElement("div", {
    className: "xs mt10"
  }, "\u524D\u9032 +", s.weights.advance, "\uFF081\u65E5\u6700\u5927+", ADV_CAP, "\uFF09\uFF0F 2\u9031\u9593\u653E\u7F6E ", s.weights.stale, " \uFF0F \u9031\u6B21\u30EC\u30D3\u30E5\u30FC +", s.weights.review, " \uFF0F UNLOCK\u5B8C\u4E86 +", s.weights.unlockDone, " \uFF0F MUST\u5B8C\u4E86 +", s.weights.mustDone, " \uFF0F BET\u56DE\u53CE +", s.weights.betDone, " \uFF0F MUST\u624B\u653E\u3057 ", s.weights.mustDropped, " \uFF0F \u4F55\u3082\u3057\u306A\u3044\u65E5 ", PASSIVE_DECAY)), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", null, React.createElement("div", {
    className: "kicker"
  }, "\u7D99\u7D9A\u529B"), React.createElement("div", {
    className: "display d-lg num mt6"
  }, streak, "\u65E5\u9023\u7D9A")), React.createElement("button", {
    className: "btn btn-fill",
    onClick: () => go('review')
  }, "\u9031\u6B21\u30EC\u30D3\u30E5\u30FC\u3092\u884C\u3046")), React.createElement("div", {
    className: "xs mt6"
  }, "\u6BCE\u65E5\u300C1\u3064\u3067\u3082\u524D\u9032\u300D\u3057\u305F\u65E5\u304C\u7D9A\u3044\u305F\u6570\u3002ES\u3067\u6700\u521D\u306B\u554F\u308F\u308C\u308B\u529B\u3002")));
}
function Review({
  s,
  set,
  go
}) {
  const since = s.trend.lastReview;
  const doneRecent = s.tasks.filter(t => t.status === 'done' && (!since || (t.doneAt || '').slice(0, 10) > since));
  const stale = s.tasks.filter(isStale);
  const load = weeklyLoad(s);
  const thisYM = ymNow();
  const savedThisMonth = s.savings.entries.some(e => e.ym === thisYM);
  const now = () => new Date().toISOString();
  function touch(id) {
    set(p => bumpTrend({
      ...p,
      tasks: p.tasks.map(t => t.id === id ? {
        ...t,
        lastMovedAt: now(),
        stalePen: false
      } : t)
    }, p.weights.advance, true));
  }
  function park(id) {
    set(p => ({
      ...p,
      tasks: p.tasks.map(t => t.id === id ? {
        ...t,
        status: 'parked',
        lastMovedAt: now()
      } : t)
    }));
  }
  function drop(id) {
    set(p => {
      const t = p.tasks.find(x => x.id === id);
      const amt = t && t.type === 'must' ? p.weights.mustDropped : t && t.type === 'bet' ? p.weights.betDropped : 0;
      return bumpTrend({
        ...p,
        tasks: p.tasks.map(x => x.id === id ? {
          ...x,
          status: 'dropped',
          droppedAt: now()
        } : x)
      }, amt, false);
    });
  }
  function addSaving() {
    set(p => ({
      ...p,
      savings: {
        ...p.savings,
        entries: [...p.savings.entries.filter(e => e.ym !== thisYM), {
          ym: thisYM,
          amount: p.savings.monthly
        }]
      }
    }));
  }
  function complete() {
    set(p => {
      let np = bumpTrend(p, p.weights.review, false);
      const v = computeIncome(np).projectedStart;
      const incomeLog = [...(np.trend.incomeLog || []).filter(e => e.ym !== thisYM), {
        ym: thisYM,
        v
      }].sort((a, b) => a.ym.localeCompare(b.ym));
      return {
        ...np,
        trend: {
          ...np.trend,
          lastReview: todayISO(),
          incomeLog
        }
      };
    });
    alert('週次レビュー完了。傾向に加点しました。');
    go('home');
  }
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u9031\u6B21\u30EC\u30D3\u30E5\u30FC"), React.createElement("button", {
    className: "btn-bare",
    onClick: () => go('home')
  }, "\u9589\u3058\u308B")), React.createElement("div", {
    className: "display d-lg mt6"
  }, since ? `前回 ${fmtDate(since)}` : 'はじめてのレビュー'), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "1. \u5B8C\u4E86\u3057\u305F\u3053\u3068\uFF08", doneRecent.length, "\uFF09"), doneRecent.length === 0 && React.createElement("div", {
    className: "sub mt10"
  }, "\u524D\u56DE\u304B\u3089\u306E\u5B8C\u4E86\u306F\u307E\u3060\u306A\u3057\u3002\u5C0F\u3055\u304F1\u3064\u3067\u3082\u7D42\u3048\u308B\u3002"), doneRecent.map(t => React.createElement("div", {
    key: t.id,
    className: "sub",
    style: {
      padding: '4px 0'
    }
  }, "\u2713 ", t.title))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "2. \u6B62\u307E\u3063\u3066\u3044\u308B\u3082\u306E\uFF08", stale.length, "\uFF09"), stale.length === 0 && React.createElement("div", {
    className: "sub mt10"
  }, STALE_DAYS, "\u65E5\u4EE5\u4E0A\u52D5\u3044\u3066\u3044\u306A\u3044\u9032\u884C\u4E2D\u306F\u306A\u3057\u3002"), stale.map(t => React.createElement("div", {
    key: t.id,
    className: "task stale"
  }, React.createElement("div", {
    className: "t-title",
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, t.title), React.createElement("div", {
    className: "xs mt6"
  }, daysSince(t.lastMovedAt), "\u65E5 \u52D5\u3044\u3066\u3044\u306A\u3044\u30FB\u8CC7\u7523 ", assetValue(t, s).value), React.createElement("div", {
    className: "row wrap mt10",
    style: {
      gap: 6
    }
  }, React.createElement("button", {
    className: "btn btn-sm",
    onClick: () => touch(t.id)
  }, "\u7D9A\u3051\u308B\uFF08\u52D5\u304B\u3059\u5BA3\u8A00\uFF09"), React.createElement("button", {
    className: "btn btn-sm",
    onClick: () => park(t.id)
  }, "\u4FDD\u7559"), React.createElement("button", {
    className: "btn btn-sm",
    style: {
      borderColor: 'var(--accent)',
      color: 'var(--accent)'
    },
    onClick: () => drop(t.id)
  }, "\u624B\u653E\u3059"))))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "3. \u5019\u88DC\u306E\u4ED5\u5206\u3051\uFF08", s.inbox.length, "\uFF09"), React.createElement("div", {
    className: "sub mt6"
  }, "\u300C2030\u5E74\u306E\u7406\u60F3\u300D\u3068\u300C\u2460\u301C\u2465\u300D\u306B\u7D10\u3065\u304D\u3001\u7A7A\u304D\u304C\u3042\u308B\u3082\u306E\u3060\u3051\u958B\u59CB\u3078\u3002"), s.inbox.map(item => React.createElement("div", {
    key: item.id,
    className: "between",
    style: {
      padding: '8px 0',
      borderTop: '1px solid var(--line)'
    }
  }, React.createElement("span", {
    className: "xs",
    style: {
      flex: 1
    }
  }, item.text), React.createElement("button", {
    className: "btn-bare",
    onClick: () => set(p => ({
      ...p,
      inbox: p.inbox.filter(x => x.id !== item.id)
    }))
  }, "\u6368\u3066\u308B"))), s.inbox.length > 0 && React.createElement("button", {
    className: "btn btn-sm mt10",
    onClick: () => go('tasks')
  }, "\u30BF\u30B9\u30AF\u753B\u9762\u3067\u958B\u59CB\u3059\u308B")), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "4. \u6765\u9031\u306E\u52B4\u529B"), React.createElement("div", {
    className: "display d-lg num mt6"
  }, load, " / ", s.budget.weekly, " pt"), load > s.budget.weekly ? React.createElement("div", {
    className: "xs mt6",
    style: {
      color: 'var(--accent)'
    }
  }, "\u4E88\u7B97\u30AA\u30FC\u30D0\u30FC\u3002\u30BF\u30B9\u30AF\u753B\u9762\u3067\u4FDD\u7559\u306B\u3057\u3066 ", s.budget.weekly, "pt \u4EE5\u5185\u3078\u3002") : React.createElement("div", {
    className: "xs mt6"
  }, "\u7A7A\u304D ", s.budget.weekly - load, "pt\u3002\u57CB\u3081\u306A\u304F\u3066\u3088\u3044\u3002")), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "5. \u4ECA\u6708\u306E\u8CAF\u91D1"), savedThisMonth ? React.createElement("div", {
    className: "sub mt10"
  }, thisYM.replace('-', '/'), " \u306F\u8A18\u9332\u6E08\u307F\uFF08", yen(s.savings.monthly), "\uFF09\u3002") : React.createElement("button", {
    className: "btn btn-sm mt10",
    onClick: addSaving
  }, thisYM.replace('-', '/'), " \u306B ", yen(s.savings.monthly), " \u3092\u8A18\u9332")), React.createElement("div", {
    className: "sec-line"
  }, React.createElement("button", {
    className: "btn btn-block btn-fill",
    onClick: complete
  }, "\u30EC\u30D3\u30E5\u30FC\u5B8C\u4E86\uFF08\u50BE\u5411\u306B +", s.weights.review, "\uFF09")));
}
function Settings({
  s,
  set
}) {
  const [imp, setImp] = useState('');
  const sv = s.savings;
  const total = sv.entries.reduce((a, e) => a + e.amount, 0);
  const elapsed = Math.max(0, monthsBetweenYM(sv.startYM, ymNow()) + 1);
  const expected = Math.min(sv.goalTotal, elapsed * sv.monthly);
  const setIdeal = (k, v) => set(p => ({
    ...p,
    ideal: {
      ...p.ideal,
      [k]: v
    }
  }));
  const setBudget = (k, v) => set(p => ({
    ...p,
    budget: {
      ...p.budget,
      [k]: Number(v) || 0
    }
  }));
  const setWeight = (k, v) => set(p => ({
    ...p,
    weights: {
      ...p.weights,
      [k]: Number(v) || 0
    }
  }));
  function setBand(id, k, v) {
    set(p => ({
      ...p,
      timeline: {
        ...p.timeline,
        bands: p.timeline.bands.map(b => b.id === id ? {
          ...b,
          [k]: v
        } : b)
      }
    }));
  }
  function delBand(id) {
    set(p => ({
      ...p,
      timeline: {
        ...p.timeline,
        bands: p.timeline.bands.filter(b => b.id !== id)
      }
    }));
  }
  function addBand() {
    set(p => ({
      ...p,
      timeline: {
        ...p.timeline,
        bands: [...p.timeline.bands, {
          id: uid(),
          track: 'job',
          label: '新規',
          start: ymNow(),
          end: ymNow()
        }]
      }
    }));
  }
  function months() {
    const arr = [];
    let ym = sv.startYM;
    const end = ymNow();
    for (let i = 0; i < 40; i++) {
      arr.push(ym);
      if (ym >= end) break;
      ym = ymAdd(ym, 1);
    }
    return arr;
  }
  function setMonth(ym, on) {
    set(p => ({
      ...p,
      savings: {
        ...p.savings,
        entries: on ? [...p.savings.entries.filter(e => e.ym !== ym), {
          ym,
          amount: p.savings.monthly
        }] : p.savings.entries.filter(e => e.ym !== ym)
      }
    }));
  }
  function exportJSON() {
    const txt = JSON.stringify(s);
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => alert('バックアップをコピーしました。'), () => prompt('コピー', txt));else prompt('コピー', txt);
  }
  function importJSON() {
    try {
      const o = JSON.parse(imp);
      set(() => ({
        ...defaultState(),
        ...o
      }));
      setImp('');
      alert('インポートしました。');
    } catch (e) {
      alert('読み取れませんでした。');
    }
  }
  function wipe() {
    if (confirm('すべて消して初期化します。よろしいですか？')) set(() => defaultState());
  }
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u8A2D\u5B9A"), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "2030\u5E74 \u308F\u305F\u3057\u306E\u7406\u60F3"), React.createElement("div", {
    className: "field mt10"
  }, React.createElement("label", null, "\u30D8\u30C3\u30C9\u30E9\u30A4\u30F3"), React.createElement("textarea", {
    className: "textarea",
    value: s.ideal.headline,
    onChange: e => setIdeal('headline', e.target.value)
  })), React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u30AD\u30E3\u30EA\u30A2"), React.createElement("textarea", {
    className: "textarea",
    value: s.ideal.career,
    onChange: e => setIdeal('career', e.target.value)
  })), React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u66AE\u3089\u3057"), React.createElement("textarea", {
    className: "textarea",
    value: s.ideal.life,
    onChange: e => setIdeal('life', e.target.value)
  })), React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u5927\u4E8B\u306B\u3057\u305F\u3044\u3053\u3068"), React.createElement("textarea", {
    className: "textarea",
    value: s.ideal.keep,
    onChange: e => setIdeal('keep', e.target.value)
  })), React.createElement("div", {
    className: "grid2"
  }, React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u76EE\u6A19 \u521D\u4EFB\u7D66\uFF08\u5E74\u53CE\u30FB\u5186\uFF09"), React.createElement("input", {
    className: "input num",
    value: s.ideal.targetStart,
    onChange: e => setIdeal('targetStart', Number(e.target.value) || 0)
  })), React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u76EE\u6A19 30\u4EE3\u524D\u534A\uFF08\u5E74\u53CE\u30FB\u5186\uFF09"), React.createElement("input", {
    className: "input num",
    value: s.ideal.target30s,
    onChange: e => setIdeal('target30s', Number(e.target.value) || 0)
  })))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u52B4\u529B\u306E\u4E88\u7B97\uFF08\u9031\uFF09"), React.createElement("div", {
    className: "grid2 mt10"
  }, React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u9031\u306E\u5408\u8A08pt"), React.createElement("input", {
    className: "input num",
    value: s.budget.weekly,
    onChange: e => setBudget('weekly', e.target.value)
  })), React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "MUST\u78BA\u4FDDpt"), React.createElement("input", {
    className: "input num",
    value: s.budget.reserveMust,
    onChange: e => setBudget('reserveMust', e.target.value)
  })))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u50BE\u5411\u30B0\u30E9\u30D5\u306E\u91CD\u307F"), React.createElement("div", {
    className: "grid2 mt10"
  }, Object.keys(s.weights).map(k => React.createElement("div", {
    className: "field",
    key: k
  }, React.createElement("label", null, k), React.createElement("input", {
    className: "input num",
    value: s.weights[k],
    onChange: e => setWeight(k, e.target.value)
  }))))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u30BF\u30A4\u30E0\u30E9\u30A4\u30F3\u306E\u5E2F"), React.createElement("button", {
    className: "btn-bare",
    onClick: addBand
  }, "\uFF0B \u8FFD\u52A0")), s.timeline.bands.map(b => React.createElement("div", {
    key: b.id,
    className: "task"
  }, React.createElement("div", {
    className: "row",
    style: {
      gap: 6
    }
  }, React.createElement("input", {
    className: "input",
    style: {
      flex: 2
    },
    value: b.label,
    onChange: e => setBand(b.id, 'label', e.target.value)
  }), React.createElement("select", {
    className: "input",
    style: {
      flex: 1
    },
    value: b.track,
    onChange: e => setBand(b.id, 'track', e.target.value)
  }, React.createElement("option", {
    value: "school"
  }, "\u5B66\u5E74"), React.createElement("option", {
    value: "study"
  }, "\u7559\u5B66"), React.createElement("option", {
    value: "job"
  }, "\u5C31\u6D3B"))), React.createElement("div", {
    className: "row mt6",
    style: {
      gap: 6
    }
  }, React.createElement("input", {
    className: "input",
    placeholder: "YYYY-MM",
    value: b.start,
    onChange: e => setBand(b.id, 'start', e.target.value)
  }), React.createElement("input", {
    className: "input",
    placeholder: "YYYY-MM",
    value: b.end,
    onChange: e => setBand(b.id, 'end', e.target.value)
  }), React.createElement("label", {
    className: "xs row",
    style: {
      gap: 4
    }
  }, React.createElement("input", {
    type: "checkbox",
    checked: !!b.ms,
    onChange: e => setBand(b.id, 'ms', e.target.checked)
  }), "\u70B9"), React.createElement("button", {
    className: "btn-bare",
    onClick: () => delBand(b.id)
  }, "\u524A\u9664"))))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u8CAF\u91D1\u30C8\u30E9\u30C3\u30AB\u30FC"), React.createElement("div", {
    className: "between mt10"
  }, React.createElement("div", {
    className: "display d-lg num"
  }, yen(total)), React.createElement("div", {
    className: "xs"
  }, "\u76EE\u6A19 ", yen(sv.goalTotal), "\uFF0F\u4E88\u5B9A ", yen(expected))), React.createElement("div", {
    className: "mt6"
  }, React.createElement(Meter, {
    v: total,
    max: sv.goalTotal
  })), React.createElement("div", {
    className: "mt10"
  }, months().map(ym => {
    const e = sv.entries.find(x => x.ym === ym);
    return React.createElement("div", {
      key: ym,
      className: "between",
      style: {
        padding: '5px 0'
      }
    }, React.createElement("span", {
      className: "xs num"
    }, ym.replace('-', '/')), React.createElement("button", {
      className: "btn btn-sm",
      onClick: () => setMonth(ym, !e)
    }, e ? `${yen(e.amount)} ✓` : '記録'));
  }))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u30C7\u30FC\u30BF"), React.createElement("button", {
    className: "btn btn-block mt10",
    onClick: exportJSON
  }, "JSON\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3092\u30B3\u30D4\u30FC"), React.createElement("textarea", {
    className: "textarea mt10",
    placeholder: "JSON\u3092\u8CBC\u3063\u3066\u30A4\u30F3\u30DD\u30FC\u30C8",
    value: imp,
    onChange: e => setImp(e.target.value)
  }), React.createElement("button", {
    className: "btn btn-block mt10",
    onClick: importJSON,
    disabled: !imp.trim()
  }, "\u30A4\u30F3\u30DD\u30FC\u30C8"), React.createElement("button", {
    className: "btn btn-block mt10",
    style: {
      borderColor: 'var(--accent)',
      color: 'var(--accent)'
    },
    onClick: wipe
  }, "\u3059\u3079\u3066\u6D88\u3057\u3066\u521D\u671F\u5316")), React.createElement("div", {
    className: "sec-line"
  }, React.createElement("div", {
    className: "xs"
  }, "\u306A\u3065\u306A\u306E\u30AD\u30E3\u30EA\u30A2MAP \uFF0F \u30C7\u30FC\u30BF\u306F\u3053\u306E\u7AEF\u672B\u306B\u306E\u307F\u4FDD\u5B58\u3002iPhone\u306ESafari\u3067\u300C\u30DB\u30FC\u30E0\u753B\u9762\u306B\u8FFD\u52A0\u300D\u3067\u30A2\u30D7\u30EA\u306E\u3088\u3046\u306B\u4F7F\u3048\u307E\u3059\u3002")));
}
function Nav({
  tab,
  go
}) {
  const items = [['home', 'ホーム'], ['tasks', 'タスク'], ['eval', '評価'], ['settings', '設定']];
  return React.createElement("div", {
    className: "nav"
  }, items.map(([id, label]) => React.createElement("button", {
    key: id,
    className: `nav-item ${tab === id ? 'active' : ''}`,
    onClick: () => go(id)
  }, React.createElement("span", null, label))));
}
function App() {
  const [s, setS] = useState(() => ensureTrend(loadState()));
  const [tab, setTab] = useState('home');
  useEffect(() => {
    saveState(s);
  }, [s]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab]);
  useEffect(() => {
    setS(p => {
      const ym = ymNow();
      if ((p.trend.incomeLog || []).some(e => e.ym === ym)) return p;
      const v = computeIncome(p).projectedStart;
      return {
        ...p,
        trend: {
          ...p.trend,
          incomeLog: [...(p.trend.incomeLog || []), {
            ym,
            v
          }].slice(-48)
        }
      };
    });
  }, []);
  const set = fn => setS(prev => typeof fn === 'function' ? fn(prev) : fn);
  const go = t => setTab(t);
  return React.createElement("div", null, tab === 'home' && React.createElement(Home, {
    s: s,
    set: set,
    go: go
  }), tab === 'tasks' && React.createElement(Tasks, {
    s: s,
    set: set,
    go: go
  }), tab === 'eval' && React.createElement(Evaluation, {
    s: s,
    set: set,
    go: go
  }), tab === 'review' && React.createElement(Review, {
    s: s,
    set: set,
    go: go
  }), tab === 'settings' && React.createElement(Settings, {
    s: s,
    set: set
  }), tab !== 'review' && React.createElement(Nav, {
    tab: tab,
    go: go
  }));
}
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));