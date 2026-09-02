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
const TYPE_MARK = {
  must: '●',
  unlock: '◆',
  bet: '▲'
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
    theme: '成績維持＋語学試験の初回受験',
    items: ['英語の過去問で現状把握（9/7）', '英語の本試を受ける（2026年中・テストセンター型のみ）', 'GPA 2.00以上を維持', '申し込む奨学金をリストアップ', '親と資金相談（学費は全額納入・生活費150〜300万）']
  }, {
    id: 'p2',
    label: '② 2年 春学期',
    period: '2027/3–5',
    start: '2027-03-01',
    end: '2027-05-31',
    theme: '英語スコアを確定、志望校を絞る',
    items: ['公式スコアレポートを用意（〜2027/6）', '協定校別の必要GPA・語学レベルを確認', '学事窓口で単位認定・4年卒業の条件を確認']
  }, {
    id: 'p3',
    label: '③ 2年 夏休み',
    period: '2027/6–8',
    start: '2027-06-01',
    end: '2027-08-31',
    theme: 'サマーインターン×出願エッセイ',
    items: ['慶應留学フェアに参加（6月）', '出願エッセイ下書き（日本語800字・現地語500w）', '証明書類をスキャンしてPDF化', 'サマーインターンに参加（電通・博報堂）']
  }, {
    id: 'p4',
    label: '④ 2年 秋学期',
    period: '2027/9–11',
    start: '2027-09-01',
    end: '2027-11-30',
    theme: '学内選考の出願と秋冬インターン',
    items: ['学内選考に出願（9月・KEIO IC-NET）', '結果発表（11月下旬）', '奨学金に応募（成績優秀枠）', '秋冬インターン・早期選考に挑戦']
  }, {
    id: 'p5',
    label: '⑤ 2年冬〜3年夏',
    period: '2027/12–2028/7',
    start: '2027-12-01',
    end: '2028-07-31',
    theme: '本出願・ビザ・渡航前最後の就活',
    items: ['候補生オリエン・異文化講座（12月・必須）', '留学先へ本出願・受入許可', 'ビザ申請・宿舎確保', '残高証明・海外保険の支払', '早期選考で内々定を狙う']
  }, {
    id: 'p6',
    label: '⑥ 3年 秋〜',
    period: '2028/8–2029/6',
    start: '2028-08-01',
    end: '2029-06-30',
    theme: '留学先へ出発（10ヶ月）',
    items: ['授業期間中の一時帰国は不可・現地バイト禁止', '毎月5万円の貯金を継続']
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
    label: '博報堂インターン〆',
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
    text: '英語の過去問で現状把握',
    date: '2026-09-07',
    done: false
  }, {
    id: 'd2',
    text: '博報堂インターン 申込〆切',
    date: '2026-10-02',
    done: false
  }, {
    id: 'd3',
    text: '英語 本試（2026年中・テストセンター型）',
    date: '2026-12-31',
    done: false
  }, {
    id: 'd4',
    text: '公式スコアレポートを用意',
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
    introSeen: false,
    ideal: {
      headline: '2030年3月・電通／博報堂へ。30代前半で年収1000万。',
      career: '電通・博報堂を第一に、コンサル・商社も視野。職業選択で一番は年収。',
      life: '欲しいときに本を買える。趣味にお金を使う。Jeepに乗る。',
      keep: '20代は東京でしっかり働く。海外キャリアも選択肢に。',
      targetStart: 3600000,
      target30s: 10000000,
      gradYM: '2030-03'
    },
    english: {
      current: '',
      target: 'TOEFL iBT 新4.0（旧72）／ IELTS 5.5',
      testDate: '',
      ready: false
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
      title: '自然環境音の研究を進める',
      type: 'bet',
      pillarId: 'research',
      phaseId: 'p1',
      weight: 2,
      progress: 15,
      ret: 2,
      gate: '論文・学会発表＝人と被らない実績'
    }), T({
      title: '里山再生プロジェクトを慶應公認団体化',
      type: 'bet',
      pillarId: 'project',
      phaseId: 'p1',
      weight: 2,
      progress: 20,
      ret: 3,
      status: 'parked',
      gate: '継続実績＝ESの主砲'
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
      priceLog: [],
      lastReview: null
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
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
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
  return `${y}-${pad2(m)}`;
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
      english: {
        ...d.english,
        ...(s.english || {})
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
  let ns = {
    ...s,
    tasks,
    trend: {
      ...s.trend,
      log: newLog.slice(-140)
    }
  };
  const pl = [...(ns.trend.priceLog || [])];
  const price = computeIncome(ns).projectedStart;
  let pcur = pl.length ? pl[pl.length - 1].date : addDaysISO(todayISO(), -1);
  let pv = pl.length ? pl[pl.length - 1].v : price;
  let g2 = 0;
  while (pcur < todayISO() && g2++ < 800) {
    const nx = addDaysISO(pcur, 1);
    if (nx <= pcur) break;
    pcur = nx;
    pl.push({
      date: pcur,
      v: pv
    });
  }
  if (pl.length && pl[pl.length - 1].date === todayISO()) pl[pl.length - 1] = {
    date: todayISO(),
    v: price
  };else pl.push({
    date: todayISO(),
    v: price
  });
  ns = {
    ...ns,
    trend: {
      ...ns.trend,
      priceLog: pl.slice(-600)
    }
  };
  return ns;
}
function snapPrice(s) {
  const v = computeIncome(s).projectedStart;
  const pl = [...(s.trend.priceLog || [])];
  const t = todayISO();
  if (pl.length && pl[pl.length - 1].date === t) pl[pl.length - 1] = {
    date: t,
    v
  };else pl.push({
    date: t,
    v
  });
  return {
    ...s,
    trend: {
      ...s.trend,
      priceLog: pl.slice(-600)
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
  return snapPrice({
    ...s,
    trend: {
      ...s.trend,
      log
    }
  });
}
function momentumFactor(s) {
  const scores = (s.trend.log || []).map(e => e.score);
  if (scores.length < 2) return 0;
  const now = scores[scores.length - 1];
  const w = scores.slice(-28);
  const avg = w.reduce((a, b) => a + b, 0) / w.length;
  return clamp((now / Math.max(1, avg) - 1) * 0.5, -0.08, 0.08);
}
function assetValue(t, s) {
  const cp = currentPhase(s.phases).id;
  const bd = [];
  let v = 0;
  const base = t.type === 'must' ? 40 : t.type === 'unlock' ? 30 : 15;
  bd.push([`種別 ${TYPE_LABEL[t.type]}`, base]);
  v += base;
  const prog = Math.round((t.progress || 0) / 100 * 25);
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
  const near = s.deadlines.filter(d => !d.done).map(d => daysUntil(d.date)).filter(x => x >= 0);
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
  const doneCnt = Object.keys(s.phaseDone || {}).filter(k => s.phaseDone[k]).length;
  const phaseRate = clamp(doneCnt / 12, 0, 1);
  const mustRate = rate(musts) != null ? rate(musts) : phaseRate;
  const unlockRate = rate(unlocks) != null ? rate(unlocks) : phaseRate * 0.7;
  let projected = tgt * 0.55;
  projected += mustRate * tgt * 0.25;
  projected += unlockRate * tgt * 0.12;
  projected += Math.min(betsDone.length * 0.5 + betsDone.reduce((a, t) => a + (t.ret || 2), 0) * 0.06, 1) * tgt * 0.05;
  projected += phaseRate * tgt * 0.06;
  const mo = momentumFactor(s);
  const withMomentum = projected * (1 + mo);
  const start = clamp(withMomentum, tgt * 0.4, tgt * 1.15);
  const ratio = start / tgt;
  return {
    target: tgt,
    projectedStart: start,
    projected30s: (s.ideal.target30s || 10000000) * ratio,
    gap: start - tgt,
    mustRate,
    unlockRate,
    phaseRate,
    unlockLift: tgt * 0.12 / Math.max(1, unlocks.length || 1),
    mustLift: tgt * 0.25 / Math.max(1, musts.length || 1)
  };
}
function Timeline({
  s,
  compact
}) {
  const [sel, setSel] = useState(null);
  const {
    startYM,
    endYM,
    bands
  } = s.timeline;
  const total = monthsBetweenYM(startYM, endYM) + 1;
  const MW = compact ? 12 : 15;
  const laneY = {
    school: 8,
    study: 34,
    job: 62
  };
  const BH = 18;
  const H = 92;
  const todayM = monthsBetweenYM(startYM, ymNow()) + new Date().getDate() / 30;
  const yrs = [];
  for (let i = 0; i < total; i++) {
    const ym = ymAdd(startYM, i);
    if (ym.endsWith('-04') || i === 0) yrs.push({
      i,
      y: '20' + ym.slice(2, 4)
    });
  }
  const selBand = sel && bands.find(b => b.id === sel);
  return React.createElement("div", null, React.createElement("div", {
    className: "tl2"
  }, React.createElement("div", {
    className: "tl2-labels",
    style: {
      height: H
    }
  }, React.createElement("div", {
    style: {
      top: laneY.school + 3
    }
  }, "\u5B66\u5E74"), React.createElement("div", {
    style: {
      top: laneY.study + 3
    }
  }, "\u7559\u5B66"), React.createElement("div", {
    style: {
      top: laneY.job + 3
    }
  }, "\u5C31\u6D3B")), React.createElement("div", {
    className: "tl2-wrap"
  }, React.createElement("div", {
    className: "tl2-inner",
    style: {
      width: total * MW,
      height: H
    }
  }, yrs.map(o => React.createElement("div", {
    key: o.i,
    className: "tl2-grid",
    style: {
      left: o.i * MW,
      height: H
    }
  }, React.createElement("span", null, o.y))), bands.map(b => {
    const left = monthsBetweenYM(startYM, b.start) * MW;
    const wdt = Math.max(MW, (monthsBetweenYM(b.start, b.end) + 1) * MW);
    const y = laneY[b.track];
    const here = todayISO() >= b.start + '-01' && todayISO() <= b.end + '-28';
    if (b.ms) return React.createElement("div", {
      key: b.id,
      className: `tl2-ms ${here ? 'on' : ''}`,
      style: {
        left: left - 5,
        top: y + BH / 2 - 5
      },
      onClick: () => setSel(sel === b.id ? null : b.id)
    });
    return React.createElement("div", {
      key: b.id,
      className: `tl2-band tl2-${b.track} ${here ? 'here' : ''} ${sel === b.id ? 'sel' : ''}`,
      style: {
        left,
        width: wdt,
        top: y,
        height: BH
      },
      onClick: () => setSel(sel === b.id ? null : b.id)
    });
  }), React.createElement("div", {
    className: "tl2-today",
    style: {
      left: todayM * MW,
      height: H
    }
  })))), React.createElement("div", {
    className: "tl2-cap"
  }, selBand ? React.createElement("span", null, React.createElement("b", null, selBand.label), "\u3000", selBand.start.replace('-', '/'), selBand.ms ? '' : `–${selBand.end.replace('-', '/')}`) : React.createElement("span", {
    className: "tl2-legend"
  }, React.createElement("i", {
    className: "k-study"
  }), "\u7559\u5B66\u3000", React.createElement("i", {
    className: "k-job"
  }), "\u5C31\u6D3B\u3000", React.createElement("i", {
    className: "k-ms"
  }, "\u25C6"), "\u7BC0\u76EE\u3000", React.createElement("i", {
    className: "k-now"
  }), "\u4ECA\u65E5\u3000", React.createElement("span", {
    className: "muted"
  }, "\uFF08\u5E2F\u3092\u30BF\u30C3\u30D7\u3067\u540D\u79F0\uFF09"))));
}
function StockChart({
  series,
  target
}) {
  const [range, setRange] = useState(90);
  const full = series && series.length ? series : [{
    date: todayISO(),
    v: target * 0.7
  }];
  const data = full.slice(-range);
  const pts = data.length >= 2 ? data : [{
    date: addDaysISO(data[0].date, -1),
    v: data[0].v * 0.98
  }, ...data];
  const vals = pts.map(p => p.v);
  const first = vals[0],
    last = vals[vals.length - 1];
  const up = last >= first;
  const col = up ? 'var(--up)' : 'var(--down)';
  const lo = Math.min(...vals, target) * 0.985;
  const hi = Math.max(...vals, target) * 1.015;
  const rng = hi - lo || 1;
  const W = 320,
    HT = 150;
  const x = i => i / (pts.length - 1) * W;
  const y = v => HT - (v - lo) / rng * HT;
  const line = pts.map((p, i) => `${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join(' ');
  const area = `0,${HT} ${line} ${W},${HT}`;
  const ty = y(target);
  const delta = last - first;
  const pctChg = first ? delta / first * 100 : 0;
  const ticks = [hi, (hi + lo) / 2, lo];
  const monLabels = [];
  let lastMon = '';
  pts.forEach((p, i) => {
    const m = p.date.slice(0, 7);
    if (m !== lastMon && i > 0) {
      monLabels.push({
        i,
        t: p.date.slice(5, 7) + '月'
      });
      lastMon = m;
    }
  });
  return React.createElement("div", null, React.createElement("div", {
    className: "stk-head"
  }, React.createElement("div", null, React.createElement("div", {
    className: "stk-price num"
  }, man(last)), React.createElement("div", {
    className: "stk-delta num",
    style: {
      color: col
    }
  }, up ? '▲' : '▼', " ", man(Math.abs(delta)), "\uFF08", delta >= 0 ? '+' : '−', Math.abs(pctChg).toFixed(1), "%\uFF09")), React.createElement("div", {
    className: "stk-meta num"
  }, React.createElement("div", null, "\u76EE\u6A19 ", man(target)), React.createElement("div", {
    style: {
      color: last - target >= 0 ? 'var(--up)' : 'var(--down)'
    }
  }, "\u5DEE ", last - target >= 0 ? '+' : '−', man(Math.abs(last - target))))), React.createElement("div", {
    className: "stk-chart"
  }, React.createElement("svg", {
    viewBox: `0 0 ${W} ${HT + 16}`,
    width: "100%",
    preserveAspectRatio: "none"
  }, ticks.map((t, i) => React.createElement("g", {
    key: i
  }, React.createElement("line", {
    x1: "0",
    x2: W,
    y1: y(t),
    y2: y(t),
    stroke: "var(--line)",
    strokeWidth: "1"
  }))), React.createElement("polygon", {
    points: area,
    fill: col,
    opacity: "0.08"
  }), React.createElement("line", {
    x1: "0",
    x2: W,
    y1: ty,
    y2: ty,
    stroke: "var(--ink)",
    strokeWidth: "1",
    strokeDasharray: "2 3"
  }), React.createElement("polyline", {
    points: line,
    fill: "none",
    stroke: col,
    strokeWidth: "1.6"
  }), React.createElement("circle", {
    cx: x(pts.length - 1),
    cy: y(last),
    r: "2.6",
    fill: col
  }), monLabels.map((m, i) => React.createElement("text", {
    key: i,
    x: x(m.i),
    y: HT + 12,
    fontSize: "8",
    fill: "var(--sub)",
    textAnchor: "middle"
  }, m.t))), React.createElement("div", {
    className: "stk-yaxis num"
  }, ticks.map((t, i) => React.createElement("div", {
    key: i
  }, man(t))))), React.createElement("div", {
    className: "seg stk-range"
  }, [[30, '1M'], [90, '3M'], [365, '1Y'], [9999, '全']].map(([r, l]) => React.createElement("button", {
    key: r,
    className: range === r ? 'on' : '',
    onClick: () => setRange(r)
  }, l))));
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
function Home({
  s,
  set,
  go
}) {
  const phase = currentPhase(s.phases);
  const inc = useMemo(() => computeIncome(s), [s]);
  const priceLog = s.trend.priceLog || [];
  const wkStart = priceLog.length ? priceLog[Math.max(0, priceLog.length - 8)].v : inc.projectedStart;
  const dW = inc.projectedStart - wkStart;
  const today = todayISO();
  const dts = s.dayTasks.filter(d => d.date === today);
  const wk = mondayOf(today);
  const wts = s.weekTasks.filter(w => w.weekOf === wk);
  const wkDone = wts.filter(w => w.done).length;
  const reviewDue = !s.trend.lastReview || daysSince(s.trend.lastReview + 'T00:00:00') >= REVIEW_DUE_DAYS;
  const [dt, setDt] = useState('');
  function toggleDay(id) {
    set(p => {
      const d0 = p.dayTasks.find(x => x.id === id);
      let np = {
        ...p,
        dayTasks: p.dayTasks.map(x => x.id === id ? {
          ...x,
          done: !x.done
        } : x)
      };
      if (d0 && !d0.done) {
        np = bumpTrend(np, np.weights.advance, true);
        if (d0.taskId) np = {
          ...np,
          tasks: np.tasks.map(t => t.id === d0.taskId ? {
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
    const v = dt.trim();
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
    setDt('');
  }
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "kicker"
  }, fmtShort(today), "\uFF08", WD[parseISO(today).getDay()], "\uFF09"), React.createElement("button", {
    className: "kicker",
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer'
    },
    onClick: () => set(p => ({
      ...p,
      introSeen: !p.introSeen
    }))
  }, "\uFF1F")), React.createElement("div", {
    className: "hero display d-lg"
  }, "\u3044\u307E \u25B8 ", phase.label), React.createElement("div", {
    className: "sub",
    style: {
      marginTop: 2
    }
  }, phase.theme), !s.introSeen && React.createElement("div", {
    className: "sec-line"
  }, React.createElement("div", {
    className: "sub"
  }, "\u30BF\u30B9\u30AF\uFF1D\u8CC7\u7523\u3002", React.createElement("b", null, TYPE_MARK.must, " MUST"), " \u9589\u3058\u308B\uFF0F", React.createElement("b", null, TYPE_MARK.unlock, " UNLOCK"), " \u958B\u304F\uFF0F", React.createElement("b", null, TYPE_MARK.bet, " BET"), " \u5927\u304D\u3044\u3002 \u9031\u306E\u52B4\u529B\u306F ", React.createElement("b", null, s.budget.weekly, "pt"), "\u3002\u59CB\u3081\u308B\u306B\u306F\u4F55\u304B\u3092\u624B\u653E\u3059\u3002")), React.createElement("div", {
    className: "sec"
  }, React.createElement(Timeline, {
    s: s,
    compact: true
  })), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u4E88\u6E2C\u5E74\u53CE\uFF08\u521D\u4EFB\u7D66\uFF09"), React.createElement("div", {
    className: "row",
    style: {
      alignItems: 'baseline',
      gap: 12,
      marginTop: 4
    }
  }, React.createElement("div", {
    className: "display d-xl num"
  }, man(inc.projectedStart)), React.createElement("div", {
    className: "num",
    style: {
      color: dW >= 0 ? 'var(--up)' : 'var(--down)',
      fontSize: 13
    }
  }, dW >= 0 ? '▲' : '▼', " ", man(Math.abs(dW)), "\uFF0F\u9031")), React.createElement("div", {
    className: "num",
    style: {
      fontSize: 13,
      color: inc.gap < 0 ? 'var(--down)' : 'var(--up)',
      marginTop: 2
    }
  }, "\u76EE\u6A19 ", man(inc.target), "\u3000", inc.gap < 0 ? '不足' : '超過', " ", man(Math.abs(inc.gap)), "\uFF0F\u5E74"), React.createElement("button", {
    className: "btn btn-sm",
    style: {
      marginTop: 10
    },
    onClick: () => go('eval')
  }, "\u30C1\u30E3\u30FC\u30C8\u3092\u898B\u308B \u2192")), reviewDue && React.createElement("div", {
    className: "sec-line"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "sub"
  }, "\u9031\u6B21\u30EC\u30D3\u30E5\u30FC\uFF1A", s.trend.lastReview ? `${daysSince(s.trend.lastReview + 'T00:00:00')}日 経過` : '未実施'), React.createElement("button", {
    className: "btn btn-fill btn-sm",
    onClick: () => go('review')
  }, "\u59CB\u3081\u308B"))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u4ECA\u65E5\u306E\u30BF\u30B9\u30AF"), React.createElement("div", {
    className: "num xs"
  }, "\u4ECA\u9031 ", wkDone, "/", wts.length)), React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, dts.length === 0 && React.createElement("div", {
    className: "sub"
  }, "\u672A\u8A2D\u5B9A\u30021\u3064\u3060\u3051\u6C7A\u3081\u308B\u3002"), dts.map(d => React.createElement("div", {
    key: d.id,
    className: "row chk"
  }, React.createElement("div", {
    className: `tick ${d.done ? 'on' : ''}`,
    onClick: () => toggleDay(d.id)
  }, d.done ? '✓' : ''), React.createElement("div", {
    className: "chk-t",
    style: {
      textDecoration: d.done ? 'line-through' : 'none',
      color: d.done ? 'var(--sub)' : 'var(--ink)'
    }
  }, d.text), React.createElement("button", {
    className: "btn-bare",
    onClick: () => set(p => ({
      ...p,
      dayTasks: p.dayTasks.filter(x => x.id !== d.id)
    }))
  }, "\xD7")))), React.createElement("div", {
    className: "row",
    style: {
      gap: 8,
      marginTop: 10
    }
  }, React.createElement("input", {
    className: "input",
    placeholder: "\u4ECA\u65E5\u306E\u4E00\u6B69",
    value: dt,
    onChange: e => setDt(e.target.value)
  }), React.createElement("button", {
    className: "btn btn-sm",
    onClick: addDay,
    disabled: !dt.trim()
  }, "\uFF0B"))), wts.length > 0 && React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u4ECA\u9031\u306E\u30BF\u30B9\u30AF"), React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, wts.map(w => React.createElement("div", {
    key: w.id,
    className: "row chk"
  }, React.createElement("div", {
    className: `tick ${w.done ? 'on' : ''}`,
    onClick: () => set(p => {
      const w0 = p.weekTasks.find(x => x.id === w.id);
      let np = {
        ...p,
        weekTasks: p.weekTasks.map(x => x.id === w.id ? {
          ...x,
          done: !x.done
        } : x)
      };
      if (w0 && !w0.done) np = bumpTrend(np, np.weights.advance, true);
      return np;
    })
  }, w.done ? '✓' : ''), React.createElement("div", {
    className: "chk-t",
    style: {
      textDecoration: w.done ? 'line-through' : 'none',
      color: w.done ? 'var(--sub)' : 'var(--ink)'
    }
  }, w.text))))));
}
function Efforts({
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
  const wk = mondayOf(todayISO());
  const [wt, setWt] = useState('');
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
  function resume(id) {
    const plan = reductionPlan(s, (s.tasks.find(t => t.id === id) || {}).weight || 1);
    if (!plan.ok) {
      alert(`いま戻すと予算オーバー（${plan.over}pt）。先に何かを手放すか保留に。`);
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
      return snapPrice(np);
    });
  }
  const Group = ({
    type
  }) => {
    const list = active.filter(t => t.type === type);
    if (!list.length) return null;
    return React.createElement("div", {
      className: "sec"
    }, React.createElement("div", {
      className: "kicker"
    }, TYPE_MARK[type], " ", TYPE_LABEL[type]), list.map(t => {
      const av = assetValue(t, s);
      const idle = daysSince(t.lastMovedAt);
      return React.createElement("div", {
        key: t.id,
        className: `task ${isStale(t) ? 'stale' : ''}`
      }, React.createElement("div", {
        className: "between"
      }, React.createElement("div", {
        className: "t-title"
      }, t.title), React.createElement("div", {
        className: "num xs nowrap"
      }, idle, "\u65E5")), React.createElement("div", {
        className: "row",
        style: {
          gap: 8,
          marginTop: 8
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
      }, t.progress || 0, "%"), React.createElement("div", {
        className: "num xs"
      }, '•'.repeat(t.weight || 1))), React.createElement("div", {
        className: "row wrap",
        style: {
          gap: 6,
          marginTop: 10
        }
      }, React.createElement("button", {
        className: "btn btn-sm",
        onClick: () => advance(t.id)
      }, "\uFF0B10%"), React.createElement("button", {
        className: "btn btn-sm",
        onClick: () => touch(t.id)
      }, "\u52D5\u304B\u3057\u305F"), React.createElement("button", {
        className: "btn btn-sm btn-fill",
        onClick: () => complete(t.id)
      }, "\u5B8C\u4E86"), React.createElement("button", {
        className: "btn btn-sm",
        onClick: () => setQuit(quit === t.id ? null : t.id)
      }, "\u624B\u653E\u3059")), quit === t.id && React.createElement(QuitPanel, {
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
  }, "\u9032\u884C\u4E2D\u306E\u53D6\u308A\u7D44\u307F"), React.createElement("div", {
    className: "row",
    style: {
      alignItems: 'baseline',
      gap: 10,
      marginTop: 4
    }
  }, React.createElement("div", {
    className: "display d-lg num"
  }, load, " / ", s.budget.weekly), React.createElement("div", {
    className: "xs"
  }, "pt\uFF0F\u9031")), React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, React.createElement(Meter, {
    v: load,
    max: s.budget.weekly,
    neg: load > s.budget.weekly
  })), load > s.budget.weekly && React.createElement("div", {
    className: "xs",
    style: {
      color: 'var(--down)',
      marginTop: 6
    }
  }, "\u4E88\u7B97\u30AA\u30FC\u30D0\u30FC ", load - s.budget.weekly, "pt"), React.createElement(Group, {
    type: "must"
  }), React.createElement(Group, {
    type: "unlock"
  }), React.createElement(Group, {
    type: "bet"
  }), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u5019\u88DC\uFF08\u3059\u3050\u59CB\u3081\u306A\u3044\uFF09"), React.createElement("button", {
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
  }), s.inbox.map(item => {
    const plan = reductionPlan(s, item.weight);
    return React.createElement("div", {
      key: item.id,
      className: "task"
    }, React.createElement("div", {
      className: "t-title"
    }, TYPE_MARK[item.type], " ", item.text), React.createElement("div", {
      className: "xs",
      style: {
        marginTop: 4
      }
    }, item.weight, "pt\uFF0F\u9031", item.gate ? '｜' + item.gate : ''), plan.ok ? React.createElement("div", {
      className: "row wrap",
      style: {
        gap: 6,
        marginTop: 10
      }
    }, React.createElement("span", {
      className: "xs"
    }, "\u7A7A\u304D ", plan.freeNow, "pt"), React.createElement("button", {
      className: "btn btn-sm btn-fill",
      onClick: () => activateInbox(item, null)
    }, "\u958B\u59CB"), React.createElement("button", {
      className: "btn-bare",
      onClick: () => set(p => ({
        ...p,
        inbox: p.inbox.filter(x => x.id !== item.id)
      }))
    }, "\u7834\u68C4")) : React.createElement("div", {
      style: {
        marginTop: 10
      }
    }, React.createElement("div", {
      className: "xs",
      style: {
        color: 'var(--down)'
      }
    }, "\u958B\u59CB\u306B ", plan.over, "pt \u4E0D\u8DB3\u30021\u3064\u5916\u3059\u3068\u59CB\u3081\u3089\u308C\u308B\uFF1A"), plan.candidates.map(c => React.createElement("div", {
      key: c.t.id,
      className: "between rowline"
    }, React.createElement("div", {
      className: "xs"
    }, c.t.title, React.createElement("br", null), React.createElement("span", {
      className: "num"
    }, "\u8CC7\u7523", c.v, "\u30FB", c.w, "pt")), React.createElement("button", {
      className: "btn btn-sm",
      disabled: c.w < plan.over,
      onClick: () => activateInbox(item, c.t.id)
    }, "\u5916\u3057\u3066\u958B\u59CB"))), React.createElement("button", {
      className: "btn-bare",
      style: {
        marginTop: 6
      },
      onClick: () => set(p => ({
        ...p,
        inbox: p.inbox.filter(x => x.id !== item.id)
      }))
    }, "\u5019\u88DC\u3092\u7834\u68C4")));
  })), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u4ECA\u9031\u306E\u30BF\u30B9\u30AF\u3092\u8DB3\u3059"), React.createElement("div", {
    className: "row",
    style: {
      gap: 8,
      marginTop: 8
    }
  }, React.createElement("input", {
    className: "input",
    placeholder: "\u4ECA\u9031\u3084\u308B\u3053\u3068",
    value: wt,
    onChange: e => setWt(e.target.value)
  }), React.createElement("button", {
    className: "btn btn-sm",
    onClick: () => {
      const v = wt.trim();
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
      setWt('');
    },
    disabled: !wt.trim()
  }, "\uFF0B")), React.createElement("div", {
    className: "xs",
    style: {
      marginTop: 6
    }
  }, "\u30C1\u30A7\u30C3\u30AF\u306F\u30DB\u30FC\u30E0\u3067\u3002")), parked.length + done.length + dropped.length > 0 && React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u4FDD\u7559 / \u5B8C\u4E86 / \u624B\u653E\u3057\u305F"), parked.map(t => React.createElement("div", {
    key: t.id,
    className: "between rowline"
  }, React.createElement("div", {
    className: "xs"
  }, "\u4FDD\u7559\u30FB", t.title), React.createElement("button", {
    className: "btn btn-sm",
    onClick: () => resume(t.id)
  }, "\u623B\u3059"))), done.map(t => React.createElement("div", {
    key: t.id,
    className: "xs rowline"
  }, "\u2713 ", t.title)), dropped.map(t => React.createElement("div", {
    key: t.id,
    className: "xs rowline muted"
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
  return React.createElement("div", {
    className: "quit"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u8CC7\u7523\u4FA1\u5024 ", av.value, "/100"), React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, av.breakdown.map(([k, v], i) => React.createElement("div", {
    key: i,
    className: "between",
    style: {
      padding: '2px 0'
    }
  }, React.createElement("span", {
    className: "xs"
  }, k), React.createElement("span", {
    className: "num xs"
  }, v > 0 ? '+' : '', v)))), React.createElement("div", {
    className: "grid2",
    style: {
      marginTop: 10
    }
  }, React.createElement("div", null, React.createElement("div", {
    className: "kicker"
  }, "\u624B\u653E\u3059\u3068"), React.createElement("div", {
    className: "xs",
    style: {
      marginTop: 4
    }
  }, "\u30FB\u52B4\u529B ", React.createElement("b", null, "+", t.weight, "pt"), " \u7A7A\u304F", React.createElement("br", null), "\u30FB\u4E2D\u9014\u534A\u7AEF\u304C1\u3064\u6E1B\u308B")), React.createElement("div", null, React.createElement("div", {
    className: "kicker"
  }, "\u5931\u3046\u3082\u306E"), React.createElement("div", {
    className: "xs",
    style: {
      marginTop: 4
    }
  }, "\u30FB\u9032\u6357 ", React.createElement("b", null, t.progress || 0, "%"), React.createElement("br", null), t.type === 'must' && React.createElement("span", {
    style: {
      color: 'var(--down)'
    }
  }, "\u30FB\u300C", t.gate || '次の選択肢', "\u300D\u304C\u9589\u3058\u308B", React.createElement("br", null), "\u30FB\u4E88\u6E2C\u5E74\u53CE \u7D04 \u2212", man(inc.mustLift), React.createElement("br", null)), t.type === 'unlock' && React.createElement("span", null, "\u30FB\u300C", t.gate || '開くはずの道', "\u300D\u304C\u958B\u304B\u306A\u3044", React.createElement("br", null), "\u30FB\u4E88\u6E2C\u5E74\u53CE \u7D04 \u2212", man(inc.unlockLift), React.createElement("br", null)), t.type === 'bet' && React.createElement("span", null, "\u30FB\u671F\u5F85\u30EA\u30BF\u30FC\u30F3 \xD7", t.ret || 2, React.createElement("br", null))))), React.createElement("div", {
    className: "row wrap",
    style: {
      gap: 6,
      marginTop: 10
    }
  }, React.createElement("button", {
    className: "btn btn-sm",
    onClick: () => onDo(t.id, 'park')
  }, "\u4FDD\u7559\uFF08\u9032\u6357\u306F\u6B8B\u3059\uFF09"), React.createElement("button", {
    className: "btn btn-sm",
    style: {
      borderColor: 'var(--down)',
      color: 'var(--down)'
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
    className: "quit"
  }, React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u3084\u308B\u3053\u3068"), React.createElement("textarea", {
    className: "textarea",
    value: f.text,
    onChange: e => setF({
      ...f,
      text: e.target.value
    }),
    placeholder: "\u4F8B\uFF1A\u51FA\u9858\u30A8\u30C3\u30BB\u30A4\u3092\u5B8C\u6210\u3055\u305B\u308B"
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
    className: "xs",
    style: {
      marginTop: 4
    }
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
    className: "xs",
    style: {
      marginBottom: 10
    }
  }, plan.ok ? `空き ${plan.freeNow}pt。候補に入れてすぐ開始できます。` : `即開始は不可（${plan.over}pt 不足）。候補に入れて、何かを手放してから開始。`), React.createElement("button", {
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
function Study({
  s,
  set
}) {
  const here = currentPhase(s.phases);
  const [open, setOpen] = useState(here.id);
  const eng = s.english;
  const setEng = (k, v) => set(p => ({
    ...p,
    english: {
      ...p.english,
      [k]: v
    }
  }));
  const dls = s.deadlines.slice().sort((a, b) => a.date.localeCompare(b.date));
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u7559\u5B66 \uFF0B \u82F1\u8A9E"), React.createElement("div", {
    className: "hero display d-lg"
  }, "\u3044\u307E \u25B8 ", here.label), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u82F1\u8A9E\u30B9\u30B3\u30A2"), React.createElement("div", {
    className: "sub",
    style: {
      marginTop: 6
    }
  }, "\u6700\u4F4E\u30E9\u30A4\u30F3\uFF1A", eng.target), React.createElement("div", {
    className: "grid2",
    style: {
      marginTop: 8
    }
  }, React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u73FE\u5728\u306E\u30B9\u30B3\u30A2"), React.createElement("input", {
    className: "input",
    value: eng.current,
    onChange: e => setEng('current', e.target.value),
    placeholder: "\u4F8B\uFF1AiBT 65 / IELTS 5.0"
  })), React.createElement("div", {
    className: "field"
  }, React.createElement("label", null, "\u672C\u8A66\u306E\u4E88\u5B9A\u65E5"), React.createElement("input", {
    className: "input",
    value: eng.testDate,
    onChange: e => setEng('testDate', e.target.value),
    placeholder: "YYYY-MM-DD"
  }))), React.createElement("label", {
    className: "row xs",
    style: {
      gap: 6
    }
  }, React.createElement("input", {
    type: "checkbox",
    checked: !!eng.ready,
    onChange: e => setEng('ready', e.target.checked)
  }), "\u516C\u5F0F\u30B9\u30B3\u30A2\u30EC\u30DD\u30FC\u30C8\u3092\u7528\u610F\u6E08\u307F")), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u7DE0\u5207"), dls.map(d => {
    const du = daysUntil(d.date);
    return React.createElement("div", {
      key: d.id,
      className: "row chk"
    }, React.createElement("div", {
      className: `tick ${d.done ? 'on' : ''}`,
      onClick: () => set(p => ({
        ...p,
        deadlines: p.deadlines.map(x => x.id === d.id ? {
          ...x,
          done: !x.done
        } : x)
      }))
    }, d.done ? '✓' : ''), React.createElement("div", {
      className: "chk-t",
      style: {
        textDecoration: d.done ? 'line-through' : 'none',
        color: d.done ? 'var(--sub)' : 'var(--ink)'
      }
    }, d.text), !d.done && React.createElement("div", {
      className: "num xs nowrap",
      style: {
        color: du <= 14 ? 'var(--down)' : 'var(--sub)'
      }
    }, du < 0 ? `${-du}日超` : `${du}日`));
  })), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u6E96\u5099\u30D5\u30A7\u30FC\u30BA \u2460\u301C\u2465"), s.phases.map(p => {
    const total = (p.items || []).length;
    const dc = (p.items || []).filter((_, i) => s.phaseDone[`${p.id}|${i}`]).length;
    const isHere = p.id === here.id;
    return React.createElement("div", {
      key: p.id,
      className: "phase"
    }, React.createElement("div", {
      className: "phase-h",
      onClick: () => setOpen(open === p.id ? null : p.id)
    }, React.createElement("span", {
      className: `pdot ${isHere ? 'here' : todayISO() > p.end ? 'past' : ''}`
    }), React.createElement("div", {
      style: {
        flex: 1
      }
    }, React.createElement("div", {
      className: "phase-t"
    }, p.label, isHere && React.createElement("span", {
      className: "now-tag"
    }, "\u73FE\u5728\u5730")), React.createElement("div", {
      className: "xs"
    }, p.period, "\u30FB", p.theme)), React.createElement("div", {
      className: "num xs"
    }, dc, "/", total), React.createElement("div", {
      className: "xs"
    }, open === p.id ? '−' : '＋')), open === p.id && React.createElement("div", {
      style: {
        marginTop: 6
      }
    }, (p.items || []).map((it, i) => {
      const k = `${p.id}|${i}`;
      const on = !!s.phaseDone[k];
      return React.createElement("div", {
        key: i,
        className: "row chk"
      }, React.createElement("div", {
        className: `tick ${on ? 'on' : ''}`,
        onClick: () => set(pr => snapPrice({
          ...pr,
          phaseDone: {
            ...pr.phaseDone,
            [k]: !on
          }
        }))
      }, on ? '✓' : ''), React.createElement("div", {
        className: "chk-t",
        style: {
          textDecoration: on ? 'line-through' : 'none',
          color: on ? 'var(--sub)' : 'var(--ink)'
        }
      }, it));
    })));
  })), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u5168\u4F53\u50CF"), React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, React.createElement(Timeline, {
    s: s
  }))));
}
function Evaluation({
  s
}) {
  const inc = useMemo(() => computeIncome(s), [s]);
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u8A55\u4FA1 \u2014 \u4E88\u6E2C\u5E74\u53CE\u306E\u63A8\u79FB"), React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, React.createElement(StockChart, {
    series: s.trend.priceLog || [],
    target: inc.target
  })), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u8AAD\u307F\u65B9"), React.createElement("div", {
    className: "sub",
    style: {
      marginTop: 6
    }
  }, "\u7DDA\uFF1D\u3044\u307E\u306E\u30DA\u30FC\u30B9\u304C\u7D9A\u3044\u305F\u3068\u304D\u306E", React.createElement("b", null, "\u521D\u4EFB\u7D66\uFF08\u5E74\u53CE\uFF09"), "\u306E\u4E88\u6E2C\u3002\u70B9\u7DDA\uFF1D\u76EE\u6A19\u3002 \u30BF\u30B9\u30AF\u3092\u5B8C\u4E86\u3059\u308B\u3068\u4E0A\u304C\u308A\u3001\u653E\u7F6E\u30FB\u624B\u653E\u3057\u3067\u4E0B\u304C\u308B\u3002"), React.createElement("div", {
    className: "grid2",
    style: {
      marginTop: 10
    }
  }, React.createElement("div", null, React.createElement("div", {
    className: "kicker"
  }, "30\u4EE3\u524D\u534A\u306E\u4E88\u6E2C"), React.createElement("div", {
    className: "display d-md num"
  }, man(inc.projected30s))), React.createElement("div", null, React.createElement("div", {
    className: "kicker"
  }, "\u305D\u306E\u76EE\u6A19"), React.createElement("div", {
    className: "display d-md num"
  }, man(s.ideal.target30s))))));
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
    set(p => snapPrice({
      ...bumpTrend(p, p.weights.review, false),
      trend: {
        ...bumpTrend(p, p.weights.review, false).trend,
        lastReview: todayISO()
      }
    }));
    alert('週次レビュー完了。');
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
    className: "display d-lg",
    style: {
      marginTop: 4
    }
  }, since ? `前回 ${fmtDate(since)}` : 'はじめて'), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "1. \u5B8C\u4E86\uFF08", doneRecent.length, "\uFF09"), doneRecent.length === 0 && React.createElement("div", {
    className: "sub",
    style: {
      marginTop: 8
    }
  }, "\u524D\u56DE\u304B\u3089\u306E\u5B8C\u4E86\u306A\u3057\u30021\u3064\u3067\u3082\u7D42\u3048\u308B\u3002"), doneRecent.map(t => React.createElement("div", {
    key: t.id,
    className: "xs rowline"
  }, "\u2713 ", t.title))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "2. \u6B62\u307E\u3063\u3066\u3044\u308B\uFF08", stale.length, "\uFF09"), stale.length === 0 && React.createElement("div", {
    className: "sub",
    style: {
      marginTop: 8
    }
  }, "\u306A\u3057\u3002"), stale.map(t => React.createElement("div", {
    key: t.id,
    className: "task stale"
  }, React.createElement("div", {
    className: "t-title"
  }, t.title), React.createElement("div", {
    className: "xs",
    style: {
      marginTop: 4
    }
  }, daysSince(t.lastMovedAt), "\u65E5 \u52D5\u3044\u3066\u3044\u306A\u3044"), React.createElement("div", {
    className: "row wrap",
    style: {
      gap: 6,
      marginTop: 8
    }
  }, React.createElement("button", {
    className: "btn btn-sm",
    onClick: () => touch(t.id)
  }, "\u7D9A\u3051\u308B"), React.createElement("button", {
    className: "btn btn-sm",
    onClick: () => park(t.id)
  }, "\u4FDD\u7559"), React.createElement("button", {
    className: "btn btn-sm",
    style: {
      borderColor: 'var(--down)',
      color: 'var(--down)'
    },
    onClick: () => drop(t.id)
  }, "\u624B\u653E\u3059"))))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "3. \u5019\u88DC\uFF08", s.inbox.length, "\uFF09"), s.inbox.map(item => React.createElement("div", {
    key: item.id,
    className: "between rowline"
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
    className: "btn btn-sm",
    style: {
      marginTop: 8
    },
    onClick: () => go('efforts')
  }, "\u53D6\u308A\u7D44\u307F\u3067\u958B\u59CB")), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "4. \u6765\u9031\u306E\u52B4\u529B"), React.createElement("div", {
    className: "display d-lg num",
    style: {
      marginTop: 4
    }
  }, load, " / ", s.budget.weekly), load > s.budget.weekly && React.createElement("div", {
    className: "xs",
    style: {
      color: 'var(--down)',
      marginTop: 4
    }
  }, "\u4E88\u7B97\u30AA\u30FC\u30D0\u30FC\u3002\u4FDD\u7559\u306B\u3057\u3066 ", s.budget.weekly, "pt \u4EE5\u5185\u3078\u3002")), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "5. \u4ECA\u6708\u306E\u8CAF\u91D1"), savedThisMonth ? React.createElement("div", {
    className: "sub",
    style: {
      marginTop: 8
    }
  }, thisYM.replace('-', '/'), " \u8A18\u9332\u6E08\u307F\uFF08", yen(s.savings.monthly), "\uFF09") : React.createElement("button", {
    className: "btn btn-sm",
    style: {
      marginTop: 8
    },
    onClick: addSaving
  }, thisYM.replace('-', '/'), " \u306B ", yen(s.savings.monthly), " \u3092\u8A18\u9332")), React.createElement("div", {
    className: "sec-line"
  }, React.createElement("button", {
    className: "btn btn-block btn-fill",
    onClick: complete
  }, "\u30EC\u30D3\u30E5\u30FC\u5B8C\u4E86")));
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
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => alert('コピーしました'), () => prompt('コピー', txt));else prompt('コピー', txt);
  }
  function importJSON() {
    try {
      const o = JSON.parse(imp);
      set(() => ({
        ...defaultState(),
        ...o
      }));
      setImp('');
      alert('インポートしました');
    } catch (e) {
      alert('読み取れませんでした');
    }
  }
  function wipe() {
    if (confirm('すべて消して初期化します。')) set(() => defaultState());
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
    className: "field",
    style: {
      marginTop: 10
    }
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
  }, React.createElement("label", null, "\u76EE\u6A19 30\u4EE3\u524D\u534A\uFF08\u5186\uFF09"), React.createElement("input", {
    className: "input num",
    value: s.ideal.target30s,
    onChange: e => setIdeal('target30s', Number(e.target.value) || 0)
  })))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u9031\u306E\u52B4\u529B\u4E88\u7B97"), React.createElement("div", {
    className: "grid2",
    style: {
      marginTop: 10
    }
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
    className: "between"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u30BF\u30A4\u30E0\u30E9\u30A4\u30F3\u306E\u5E2F"), React.createElement("button", {
    className: "btn-bare",
    onClick: addBand
  }, "\uFF0B")), s.timeline.bands.map(b => React.createElement("div", {
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
    className: "row",
    style: {
      gap: 6,
      marginTop: 6
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
    className: "row xs",
    style: {
      gap: 4
    }
  }, React.createElement("input", {
    type: "checkbox",
    checked: !!b.ms,
    onChange: e => setBand(b.id, 'ms', e.target.checked)
  }), "\u7BC0\u76EE"), React.createElement("button", {
    className: "btn-bare",
    onClick: () => delBand(b.id)
  }, "\u524A\u9664"))))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u8CAF\u91D1"), React.createElement("div", {
    className: "between",
    style: {
      marginTop: 10
    }
  }, React.createElement("div", {
    className: "display d-lg num"
  }, yen(total)), React.createElement("div", {
    className: "xs"
  }, "\u76EE\u6A19 ", yen(sv.goalTotal), "\uFF0F\u4E88\u5B9A ", yen(expected))), React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, React.createElement(Meter, {
    v: total,
    max: sv.goalTotal
  })), React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, months().map(ym => {
    const e = sv.entries.find(x => x.ym === ym);
    return React.createElement("div", {
      key: ym,
      className: "between",
      style: {
        padding: '4px 0'
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
    className: "btn btn-block",
    style: {
      marginTop: 10
    },
    onClick: exportJSON
  }, "JSON\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3092\u30B3\u30D4\u30FC"), React.createElement("textarea", {
    className: "textarea",
    style: {
      marginTop: 10
    },
    placeholder: "JSON\u3092\u8CBC\u3063\u3066\u30A4\u30F3\u30DD\u30FC\u30C8",
    value: imp,
    onChange: e => setImp(e.target.value)
  }), React.createElement("button", {
    className: "btn btn-block",
    style: {
      marginTop: 10
    },
    onClick: importJSON,
    disabled: !imp.trim()
  }, "\u30A4\u30F3\u30DD\u30FC\u30C8"), React.createElement("button", {
    className: "btn btn-block",
    style: {
      marginTop: 10,
      borderColor: 'var(--down)',
      color: 'var(--down)'
    },
    onClick: wipe
  }, "\u3059\u3079\u3066\u6D88\u3057\u3066\u521D\u671F\u5316")), React.createElement("div", {
    className: "sec-line"
  }, React.createElement("div", {
    className: "xs"
  }, "\u306A\u3065\u306A\u306E\u30AD\u30E3\u30EA\u30A2MAP \uFF0F \u30C7\u30FC\u30BF\u306F\u7AEF\u672B\u5185\u306E\u307F\u3002Safari\u3067\u300C\u30DB\u30FC\u30E0\u753B\u9762\u306B\u8FFD\u52A0\u300D\u3067\u30A2\u30D7\u30EA\u306B\u306A\u308A\u307E\u3059\u3002")));
}
function Nav({
  tab,
  go
}) {
  const items = [['home', 'ホーム'], ['efforts', '取り組み'], ['study', '留学'], ['eval', '評価'], ['settings', '設定']];
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
  const set = fn => setS(prev => typeof fn === 'function' ? fn(prev) : fn);
  const go = t => setTab(t);
  return React.createElement("div", null, tab === 'home' && React.createElement(Home, {
    s: s,
    set: set,
    go: go
  }), tab === 'efforts' && React.createElement(Efforts, {
    s: s,
    set: set,
    go: go
  }), tab === 'study' && React.createElement(Study, {
    s: s,
    set: set
  }), tab === 'eval' && React.createElement(Evaluation, {
    s: s
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
ReactDOM.render(React.createElement(App), document.getElementById('root'));
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));