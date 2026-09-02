/* AUTO-GENERATED from app.src.jsx by @babel/standalone (react-classic). Edit app.src.jsx, then recompile. */
const {
  useState,
  useEffect,
  useMemo
} = React;
const KEY = 'careermap_v5';
const FOCUS_MAX = 3;
const TODAY_MAX = 3;
const ASSETS = [{
  id: 'academic',
  name: 'Academic',
  jp: '学業'
}, {
  id: 'englishGlobal',
  name: 'English / Global',
  jp: '英語・国際'
}, {
  id: 'research',
  name: 'Research',
  jp: '研究'
}, {
  id: 'leadership',
  name: 'Leadership',
  jp: 'リーダーシップ'
}, {
  id: 'business',
  name: 'Business',
  jp: 'ビジネス経験'
}, {
  id: 'coreSkills',
  name: 'Core Skills',
  jp: 'コアスキル'
}];
const ASSET_MAP = Object.fromEntries(ASSETS.map(a => [a.id, a]));
const PATHS = [{
  id: 'advertising',
  name: '広告（電通・博報堂）'
}, {
  id: 'consulting',
  name: 'コンサル'
}, {
  id: 'trading',
  name: '商社'
}, {
  id: 'other',
  name: 'その他 高年収'
}];
const OUTCOMES = [{
  id: 'career',
  name: 'CAREER',
  desc: '博報堂・電通を含め、コンサル・商社など複数の業界・企業を選択肢として持つ。'
}, {
  id: 'global',
  name: 'GLOBAL',
  desc: '交換留学を経験し、英語を使って生活・学習できる。'
}, {
  id: 'research',
  name: 'RESEARCH',
  desc: '論文執筆・学会発表。'
}, {
  id: 'project',
  name: 'PROJECT',
  desc: '継続的に動く組織・プロジェクトを作る。'
}];
const ACTIONS = {
  english: ['Vocabulary', 'Reading', 'Listening', 'Writing', 'Mock Test', 'Other'],
  research: ['Reading', 'Research Design', 'Data Collection', 'Analysis', 'Writing', 'Presentation', 'Other'],
  project: ['Planning', 'Meeting', 'Fieldwork', 'Execution', 'Improvement', 'Other'],
  university: ['授業課題', '復習', '試験対策', 'レポート', 'Other'],
  career: ['自己分析', '業界研究', 'ES作成', 'Webテスト', '面接準備', 'Other'],
  study: ['情報収集', '書類準備', 'エッセイ', '手続き', 'Other']
};
const ROADMAP = [{
  year: 2026,
  summary: '英語・GPA・研究',
  events: ['英語の現状把握', '英語試験 初回受験', '博報堂インターン', 'GPA維持', '自然環境音研究 開始']
}, {
  year: 2027,
  summary: '留学出願・インターン',
  events: ['英語スコア確定', 'サマーインターン', '交換留学 出願', '留学先 決定']
}, {
  year: 2028,
  summary: 'Exchange Study',
  events: ['渡航準備', '交換留学 開始']
}, {
  year: 2029,
  summary: 'Job Hunting',
  events: ['留学経験の整理', 'インターン', '就職活動']
}, {
  year: 2030,
  summary: 'Graduation',
  events: ['本選考', '卒業', '就職']
}];
const MON3 = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const uid = () => 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const WD = ['日', '月', '火', '水', '木', '金', '土'];
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const r1 = n => Math.round(n * 10) / 10;
const man = n => Math.round(n / 10000).toLocaleString() + '万';
const manD = n => (n >= 0 ? '+' : '−') + '¥' + Math.abs(Math.round(n / 10000)) + '万';
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
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}
function fmtFull(iso) {
  const d = parseISO(iso);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}
function daysUntil(iso) {
  return Math.round((parseISO(iso) - parseISO(todayISO())) / 86400000);
}
function daysSince(isoDT) {
  if (!isoDT) return 9999;
  return Math.floor((Date.now() - new Date(isoDT).getTime()) / 86400000);
}
function daysSinceDate(iso) {
  return Math.floor((parseISO(todayISO()) - parseISO(iso)) / 86400000);
}
function nowLabel() {
  const d = new Date();
  return `${d.getFullYear()} ${MON3[d.getMonth()]}`;
}
function seedProjects() {
  const M = (label, big, evidence) => ({
    id: uid(),
    label,
    done: false,
    doneAt: null,
    big: !!big,
    evidence: evidence || null
  });
  const P = o => ({
    id: uid(),
    status: 'active',
    deadline: null,
    milestones: [],
    moveLog: [],
    nextActionText: '',
    assetTargets: [],
    ...o
  });
  return [P({
    name: '英語',
    emoji: '🔤',
    kind: 'english',
    outcome: 'global',
    status: 'focus',
    assetTargets: ['englishGlobal'],
    goal: '交換留学の資格を取得し、英語を使える状態になる。',
    deadline: {
      label: '英語試験 初回受験',
      date: '2026-12-31'
    },
    milestones: [M('現状把握（過去問）'), M('英語試験を受験'), M('目標スコア達成', true), M('公式スコアレポート入手')]
  }), P({
    name: '大学 / GPA',
    emoji: '🎓',
    kind: 'university',
    outcome: 'career',
    status: 'focus',
    assetTargets: ['academic'],
    goal: '留学と卒業に必要な学業成績を維持する。',
    milestones: [M('1年秋のGPAを2.0以上で確定', true), M('2年春までの累積GPAで協定校基準クリア', true)]
  }), P({
    name: '自然環境音研究',
    emoji: '🔬',
    kind: 'research',
    outcome: 'research',
    status: 'focus',
    assetTargets: ['research', 'coreSkills'],
    goal: '論文執筆・学会発表。',
    milestones: [M('研究テーマ決定', true), M('データ収集を開始'), M('論文ドラフト完成', true, 'publication'), M('学会発表', true, 'conference')]
  }), P({
    name: '交換留学',
    emoji: '✈️',
    kind: 'study',
    outcome: 'global',
    assetTargets: ['englishGlobal'],
    goal: '2028年秋から交換留学する。',
    deadline: {
      label: '学内選考 出願',
      date: '2027-09-15'
    },
    milestones: [M('英語資格取得'), M('GPA条件達成'), M('志望校決定'), M('出願書類準備'), M('学内選考 出願'), M('留学決定', true, 'studyAbroad'), M('渡航', true)]
  }), P({
    name: '馬佐良プロジェクト',
    emoji: '🌿',
    kind: 'project',
    outcome: 'project',
    assetTargets: ['leadership', 'business', 'coreSkills'],
    goal: '慶應公認団体化・継続的な組織化。',
    milestones: [M('公認団体の要件を確認'), M('自分に依存しない運営体制'), M('慶應の公認団体になる', true)]
  }), P({
    name: '就職準備',
    emoji: '💼',
    kind: 'career',
    outcome: 'career',
    assetTargets: ['business', 'coreSkills'],
    goal: '2030年の選考に向けて経験・スキルを蓄積する。',
    deadline: {
      label: '博報堂インターン 申込〆切',
      date: '2026-10-02'
    },
    milestones: [M('博報堂インターンに参加', false, 'internship'), M('サマーインターンに参加', false, 'internship'), M('早期選考で内々定', true)]
  })];
}
function defaultState() {
  const ps = seedProjects();
  const pid = n => (ps.find(p => p.name === n) || {}).id;
  const t = todayISO();
  return {
    version: 5,
    tipsSeen: false,
    profile: {
      university: '慶應SFC',
      faculty: '環境情報',
      gradYear: 2030,
      targetPath: 'advertising',
      english: 'Intermediate（≈ IELTS 5.5）',
      gpa: 3.2
    },
    assets: {
      academic: 55,
      englishGlobal: 35,
      research: 22,
      leadership: 42,
      business: 32,
      coreSkills: 36
    },
    assetTouch: Object.fromEntries(ASSETS.map(a => [a.id, t])),
    assetDay: {
      date: t,
      used: {}
    },
    weights: {
      dailyGrow: 1.3,
      milestoneGrow: 8,
      milestoneBigGrow: 16,
      focusMult: 1.6,
      decayPerWeek: 0.4,
      dailyCapPerAsset: 4
    },
    fitMatrix: {
      academic: {
        advertising: 0.5,
        consulting: 0.6,
        trading: 0.6,
        other: 0.5
      },
      englishGlobal: {
        advertising: 0.8,
        consulting: 0.8,
        trading: 1.0,
        other: 0.5
      },
      research: {
        advertising: 0.5,
        consulting: 0.8,
        trading: 0.5,
        other: 0.4
      },
      leadership: {
        advertising: 0.8,
        consulting: 0.8,
        trading: 0.8,
        other: 0.6
      },
      business: {
        advertising: 0.8,
        consulting: 0.8,
        trading: 0.8,
        other: 0.7
      },
      coreSkills: {
        advertising: 1.0,
        consulting: 0.9,
        trading: 0.7,
        other: 0.7
      }
    },
    pathAnchors: {
      advertising: [4800000, 8500000],
      consulting: [5500000, 12000000],
      trading: [5500000, 11000000],
      other: [3800000, 6500000]
    },
    projects: ps,
    today: [{
      id: uid(),
      projectId: pid('英語'),
      action: 'Reading',
      done: false,
      doneAt: null
    }, {
      id: uid(),
      projectId: pid('自然環境音研究'),
      action: 'Research Design',
      done: false,
      doneAt: null
    }, {
      id: uid(),
      projectId: pid('大学 / GPA'),
      action: '授業課題',
      done: false,
      doneAt: null
    }],
    routines: [{
      id: uid(),
      name: 'English Routine',
      projectId: pid('英語'),
      actions: ['Vocabulary', 'Reading', 'Listening']
    }, {
      id: uid(),
      name: 'Research Routine',
      projectId: pid('自然環境音研究'),
      actions: ['Reading', 'Data Collection', 'Analysis']
    }, {
      id: uid(),
      name: 'University Routine',
      projectId: pid('大学 / GPA'),
      actions: ['授業課題', '復習', '試験対策']
    }],
    activity: [],
    ideas: [{
      id: uid(),
      text: '里山プロジェクトのInstagramを毎日更新する',
      createdAt: new Date().toISOString()
    }],
    income: {
      log: []
    }
  };
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
      profile: {
        ...d.profile,
        ...(s.profile || {})
      },
      assets: {
        ...d.assets,
        ...(s.assets || {})
      },
      weights: {
        ...d.weights,
        ...(s.weights || {})
      },
      fitMatrix: {
        ...d.fitMatrix,
        ...(s.fitMatrix || {})
      },
      pathAnchors: {
        ...d.pathAnchors,
        ...(s.pathAnchors || {})
      },
      income: {
        ...d.income,
        ...(s.income || {})
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
function fitScore(assets, fitMatrix, path) {
  let num = 0,
    den = 0;
  ASSETS.forEach(a => {
    const w = fitMatrix[a.id][path];
    num += assets[a.id] / 100 * w;
    den += w;
  });
  return den ? clamp(num / den, 0, 1) : 0;
}
function fitLabel(f) {
  return f >= 0.62 ? 'Strong' : f >= 0.42 ? 'Growing' : 'Developing';
}
function evidenceCount(s) {
  let c = 0;
  s.projects.forEach(p => (p.milestones || []).forEach(m => {
    if (m.done) {
      c += 1;
      if (m.evidence === 'studyAbroad') c += 3;else if (m.evidence === 'publication') c += 3;else if (m.evidence === 'conference') c += 2;else if (m.evidence === 'internship') c += 1;
    }
  }));
  return c;
}
function confidenceOf(s) {
  const c = evidenceCount(s);
  if (c < 4) return {
    label: 'Developing',
    band: 0.16
  };
  if (c < 9) return {
    label: 'Growing',
    band: 0.11
  };
  return {
    label: 'Solid',
    band: 0.07
  };
}
function estimateFor(s, assets) {
  const fits = {},
    ests = {};
  PATHS.forEach(p => {
    const f = fitScore(assets, s.fitMatrix, p.id);
    fits[p.id] = f;
    const [lo, hi] = s.pathAnchors[p.id];
    ests[p.id] = lo + (hi - lo) * f;
  });
  const tgt = s.profile.targetPath || 'advertising';
  let wsum = 0,
    blended = 0;
  PATHS.forEach(p => {
    const w = fits[p.id] * fits[p.id];
    wsum += w;
    blended += ests[p.id] * w;
  });
  blended = wsum ? blended / wsum : ests[tgt];
  const main = 0.5 * ests[tgt] + 0.5 * blended;
  return {
    main,
    fits,
    ests
  };
}
function incomeNow(s) {
  const {
    main,
    fits,
    ests
  } = estimateFor(s, s.assets);
  const conf = confidenceOf(s);
  return {
    main,
    lo: main * (1 - conf.band),
    hi: main * (1 + conf.band),
    fits,
    ests,
    conf
  };
}
function growAssets(s, ids, per, cap) {
  const day = s.assetDay && s.assetDay.date === todayISO() ? {
    date: s.assetDay.date,
    used: {
      ...s.assetDay.used
    }
  } : {
    date: todayISO(),
    used: {}
  };
  const na = {
    ...s.assets
  };
  const touch = {
    ...(s.assetTouch || {})
  };
  ids.forEach(id => {
    let amt = per * (1 - na[id] / 125);
    if (cap) {
      const u = day.used[id] || 0;
      amt = Math.max(0, Math.min(amt, cap - u));
      day.used[id] = u + amt;
    }
    na[id] = clamp(r1(na[id] + amt), 0, 100);
    touch[id] = todayISO();
  });
  return {
    ...s,
    assets: na,
    assetDay: day,
    assetTouch: touch
  };
}
function snapshotIncome(s, why) {
  const inc = incomeNow(s);
  const log = [...(s.income && s.income.log || [])];
  const t = todayISO();
  const pt = {
    date: t,
    value: Math.round(inc.main),
    range: [Math.round(inc.lo), Math.round(inc.hi)],
    why: []
  };
  if (log.length && log[log.length - 1].date === t) {
    const e = {
      ...log[log.length - 1]
    };
    e.value = pt.value;
    e.range = pt.range;
    e.why = [...(e.why || []), ...(why || [])];
    log[log.length - 1] = e;
  } else {
    pt.why = why || [];
    log.push(pt);
  }
  return {
    ...s,
    income: {
      ...s.income,
      log: log.slice(-620)
    }
  };
}
function actGrow(s, ids, per, label, cap) {
  const before = estimateFor(s, s.assets).main;
  const ns = growAssets(s, ids, per, cap);
  const after = estimateFor(ns, ns.assets).main;
  const d = Math.round((after - before) / 10000) * 10000;
  const why = [];
  if (Math.abs(d) >= 10000 && ids.length) {
    const a0 = ids[0];
    why.push({
      reason: label,
      asset: a0,
      from: r1(s.assets[a0]),
      to: r1(ns.assets[a0]),
      incomeDelta: d,
      up: d >= 0
    });
  }
  return snapshotIncome(ns, why);
}
function ensureIncome(s) {
  const na = {
    ...s.assets
  };
  let decayed = false;
  ASSETS.forEach(a => {
    const last = (s.assetTouch || {})[a.id];
    if (last && daysSinceDate(last) >= 7) {
      na[a.id] = clamp(r1(na[a.id] - s.weights.decayPerWeek), 12, 100);
      decayed = true;
    }
  });
  let ns = decayed ? {
    ...s,
    assets: na
  } : s;
  const log = [...(ns.income && ns.income.log || [])];
  let last = log.length ? log[log.length - 1].date : addDaysISO(todayISO(), -1);
  let val = log.length ? log[log.length - 1].value : Math.round(incomeNow(ns).main);
  let rng = log.length ? log[log.length - 1].range : [val, val];
  let g = 0;
  while (last < todayISO() && g++ < 800) {
    const nx = addDaysISO(last, 1);
    if (nx <= last) break;
    last = nx;
    log.push({
      date: last,
      value: val,
      range: rng,
      why: []
    });
  }
  ns = {
    ...ns,
    income: {
      ...ns.income,
      log
    }
  };
  return snapshotIncome(ns, decayed ? [{
    reason: '一部の資産が停滞（7日以上 未活動）',
    asset: null,
    incomeDelta: 0,
    up: false
  }] : []);
}
function incInfo(log, days) {
  const cut = addDaysISO(todayISO(), -days);
  const win = (log || []).filter(e => e.date >= cut);
  const series = win.length ? win : (log || []).slice(-2);
  const now = series.length ? series[series.length - 1].value : 0;
  const base = series.length ? series.length === 1 ? Math.round(now - (series[0].why || []).reduce((a, w) => a + (w.incomeDelta || 0), 0)) : series[0].value : now;
  const chg = now - base;
  const arrow = chg > 5000 ? '↗' : chg < -5000 ? '↘' : '→';
  return {
    now,
    base,
    chg,
    arrow,
    series
  };
}
function momentum(p) {
  const ml = p.moveLog || [];
  const r = ml.filter(m => daysSinceDate(m.date) < 30).reduce((a, m) => a + m.amt, 0);
  const q = ml.filter(m => {
    const d = daysSinceDate(m.date);
    return d >= 30 && d < 60;
  }).reduce((a, m) => a + m.amt, 0);
  if (r === 0 && q === 0) return {
    a: '→',
    l: 'Stable'
  };
  if (r > q * 1.2 && r > 0) return {
    a: '↗',
    l: 'Growing'
  };
  if (r < q * 0.6 || r === 0 && q > 0) return {
    a: '↘',
    l: 'Slowing'
  };
  return {
    a: '→',
    l: 'Stable'
  };
}
function progressOf(p) {
  const ms = p.milestones || [];
  return ms.length ? Math.round(ms.filter(m => m.done).length / ms.length * 100) : 0;
}
function nextActionOf(p) {
  const m = (p.milestones || []).find(x => !x.done);
  return p.nextActionText && p.nextActionText.trim() || (m ? m.label : '—');
}
function projById(s, id) {
  return (s.projects || []).find(p => p.id === id);
}
function upcomingDeadlines(s, n) {
  return (s.projects || []).map(p => p.deadline && p.deadline.date ? {
    ...p.deadline,
    project: p.name,
    emoji: p.emoji
  } : null).filter(Boolean).filter(d => daysUntil(d.date) >= -1).sort((a, b) => a.date.localeCompare(b.date)).slice(0, n || 3);
}
function withOverrides(base, ov) {
  const a = {
    ...base
  };
  const eng = {
    '6.0': 58,
    '6.5': 68,
    '7.0': 80,
    '7.5': 90
  };
  if (ov.english && eng[ov.english]) a.englishGlobal = Math.max(a.englishGlobal, eng[ov.english]);
  if (ov.abroad === '6m') {
    a.englishGlobal += 12;
    a.business += 6;
  }
  if (ov.abroad === '1y') {
    a.englishGlobal += 20;
    a.business += 10;
    a.leadership += 5;
  }
  if (ov.research === 'conf') a.research += 15;
  if (ov.research === 'pub') a.research += 25;
  if (ov.research === 'both') {
    a.research += 35;
    a.coreSkills += 10;
  }
  if (ov.project === '6m') {
    a.leadership += 8;
    a.business += 6;
  }
  if (ov.project === '1y') {
    a.leadership += 15;
    a.business += 12;
  }
  if (ov.project === '2y') {
    a.leadership += 24;
    a.business += 20;
    a.coreSkills += 8;
  }
  if (ov.intern === '1') a.business += 12;
  if (ov.intern === '2') {
    a.business += 22;
    a.coreSkills += 8;
  }
  if (ov.intern === 'long') {
    a.business += 32;
    a.leadership += 10;
    a.coreSkills += 12;
  }
  Object.keys(a).forEach(k => a[k] = clamp(a[k], 0, 100));
  return a;
}
function scenarioIncomes(s) {
  const cur = {
    ...s.assets
  };
  ASSETS.forEach(a => {
    if ((s.assetTouch || {})[a.id] && daysSinceDate(s.assetTouch[a.id]) < 21) cur[a.id] = clamp(cur[a.id] + 6, 0, 100);
  });
  const minimum = {};
  ASSETS.forEach(a => minimum[a.id] = clamp(s.assets[a.id] - 8, 0, 100));
  const growth = withOverrides(s.assets, {
    english: '7.0',
    abroad: '1y',
    research: 'both',
    project: '2y',
    intern: 'long'
  });
  return {
    minimum: estimateFor(s, minimum).main,
    current: estimateFor(s, cur).main,
    growth: estimateFor(s, growth).main
  };
}
function Bar({
  v
}) {
  return React.createElement("div", {
    className: "bar"
  }, React.createElement("span", {
    style: {
      width: clamp(v, 0, 100) + '%'
    }
  }));
}
function Trend({
  p
}) {
  const m = momentum(p);
  return React.createElement("span", {
    className: `trend t-${m.l.toLowerCase()}`
  }, m.a, " ", m.l);
}
function IncomeChart({
  log,
  days,
  showMarkers,
  onPick,
  h
}) {
  const info = incInfo(log, days);
  const s = info.series;
  const pts = s.length >= 2 ? s : [{
    date: addDaysISO((s[0] || {
      date: todayISO()
    }).date, -1),
    value: (s[0] || {
      value: 0
    }).value * 0.98,
    why: []
  }, ...s];
  const vals = pts.map(p => p.value);
  const lo = Math.min(...vals),
    hi = Math.max(...vals);
  const pad = (hi - lo || 200000) * 0.2;
  const mn = lo - pad,
    mx = hi + pad,
    rng = mx - mn || 1;
  const W = 320,
    HT = h || 120;
  const x = i => i / (pts.length - 1) * W;
  const y = v => HT - (v - mn) / rng * HT;
  const line = pts.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `0,${HT} ${line} ${W},${HT}`;
  const up = info.chg >= 0;
  const col = up ? 'var(--up)' : 'var(--down)';
  return React.createElement("svg", {
    viewBox: `0 0 ${W} ${HT + 4}`,
    width: "100%",
    preserveAspectRatio: "none",
    style: {
      display: 'block',
      overflow: 'visible'
    }
  }, React.createElement("defs", null, React.createElement("linearGradient", {
    id: "cig",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, React.createElement("stop", {
    offset: "0",
    stopColor: up ? '#2FA35E' : '#E5484D',
    stopOpacity: "0.16"
  }), React.createElement("stop", {
    offset: "1",
    stopColor: up ? '#2FA35E' : '#E5484D',
    stopOpacity: "0"
  }))), React.createElement("polygon", {
    points: area,
    fill: "url(#cig)"
  }), React.createElement("polyline", {
    points: line,
    fill: "none",
    stroke: col,
    strokeWidth: "2",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }), showMarkers && pts.map((p, i) => p.why && p.why.length ? React.createElement("circle", {
    key: i,
    cx: x(i),
    cy: y(p.value),
    r: "3.4",
    fill: "#fff",
    stroke: col,
    strokeWidth: "2",
    style: {
      cursor: 'pointer'
    },
    onClick: () => onPick && onPick(p)
  }) : null), React.createElement("circle", {
    cx: x(pts.length - 1),
    cy: y(vals[vals.length - 1]),
    r: "3",
    fill: col
  }));
}
function AddProgress({
  s,
  set,
  onClose
}) {
  const [pid, setPid] = useState((s.projects.find(p => p.status === 'focus') || s.projects[0] || {}).id);
  const [action, setAction] = useState(null);
  const [mins, setMins] = useState(null);
  const proj = projById(s, pid);
  const acts = proj && ACTIONS[proj.kind] || ACTIONS.project;
  const impact = useMemo(() => {
    if (!proj || !proj.assetTargets.length) return null;
    const per = s.weights.dailyGrow * (proj.status === 'focus' ? s.weights.focusMult : 1);
    const proj3 = growAssets(growAssetsN(s, proj.assetTargets, per, 12), proj.assetTargets, per, 12);
    return null;
  }, [pid]);
  function done() {
    set(p => {
      const pr = projById(p, pid);
      const w = p.weights;
      const per = w.dailyGrow * (pr.status === 'focus' ? w.focusMult : 1);
      let np = {
        ...p,
        projects: p.projects.map(x => x.id === pid ? {
          ...x,
          moveLog: [...(x.moveLog || []), {
            date: todayISO(),
            amt: 1
          }]
        } : x),
        activity: [{
          date: todayISO(),
          projectId: pid,
          action: action || '進捗',
          minutes: mins || null
        }, ...(p.activity || [])].slice(0, 200),
        today: p.today.map(t => t.projectId === pid && !t.done && (t.action === action || !action) ? {
          ...t,
          done: true,
          doneAt: new Date().toISOString()
        } : t)
      };
      np = actGrow(np, pr.assetTargets, per, `${pr.name} — ${action || '進捗'}`, w.dailyCapPerAsset);
      return np;
    });
    onClose();
  }
  return React.createElement("div", {
    className: "sheet",
    onClick: e => {
      if (e.target.className === 'sheet') onClose();
    }
  }, React.createElement("div", {
    className: "sheet-in"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "h2"
  }, "Add Progress"), React.createElement("button", {
    className: "x",
    onClick: onClose
  }, "\u2715")), React.createElement("div", {
    className: "lbl"
  }, "Project"), React.createElement("div", {
    className: "chips"
  }, s.projects.map(p => React.createElement("button", {
    key: p.id,
    className: `chip ${pid === p.id ? 'on' : ''}`,
    onClick: () => {
      setPid(p.id);
      setAction(null);
    }
  }, p.emoji, " ", p.name))), React.createElement("div", {
    className: "lbl"
  }, "Action"), React.createElement("div", {
    className: "chips"
  }, acts.map(a => React.createElement("button", {
    key: a,
    className: `chip ${action === a ? 'on' : ''}`,
    onClick: () => setAction(a)
  }, a))), React.createElement("div", {
    className: "lbl"
  }, "Time\uFF08\u4EFB\u610F\uFF09"), React.createElement("div", {
    className: "chips"
  }, [15, 30, 60, 90].map(m => React.createElement("button", {
    key: m,
    className: `chip ${mins === m ? 'on' : ''}`,
    onClick: () => setMins(mins === m ? null : m)
  }, m, "min"))), proj && proj.assetTargets.length > 0 && React.createElement("div", {
    className: "hint"
  }, "\u80B2\u3064\u8CC7\u7523\uFF1A", proj.assetTargets.map(a => ASSET_MAP[a].jp).join(' / ')), React.createElement("button", {
    className: "btn btn-fill btn-block",
    style: {
      marginTop: 14
    },
    onClick: done,
    disabled: !action
  }, "Done")));
}
function growAssetsN(s, ids, per, times) {
  let ns = s;
  for (let i = 0; i < times; i++) ns = growAssets(ns, ids, per);
  return ns;
}
function TaskImpact({
  s,
  projId,
  action,
  onClose
}) {
  const p = projById(s, projId);
  const per = s.weights.dailyGrow * (p.status === 'focus' ? s.weights.focusMult : 1);
  const a3 = growAssetsN(s, p.assetTargets, per, 12).assets;
  const a6 = growAssetsN(s, p.assetTargets, per, 26).assets;
  const cur = incomeNow(s).main;
  const inc6 = estimateFor(s, a6).main;
  const key = p.assetTargets[0];
  return React.createElement("div", {
    className: "sheet",
    onClick: e => {
      if (e.target.className === 'sheet') onClose();
    }
  }, React.createElement("div", {
    className: "sheet-in"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "h2"
  }, "Task Impact"), React.createElement("button", {
    className: "x",
    onClick: onClose
  }, "\u2715")), React.createElement("div", {
    className: "sub",
    style: {
      marginTop: 4
    }
  }, p.emoji, " ", p.name, action ? ' — ' + action : ''), key && React.createElement("div", {
    className: "card",
    style: {
      marginTop: 12,
      boxShadow: 'none',
      border: '1px solid var(--line)'
    }
  }, React.createElement("div", {
    className: "lbl"
  }, ASSET_MAP[key].name, "\uFF08", ASSET_MAP[key].jp, "\uFF09"), React.createElement("div", {
    className: "row",
    style: {
      gap: 14,
      marginTop: 8
    }
  }, React.createElement("div", null, React.createElement("div", {
    className: "ts"
  }, "now"), React.createElement("div", {
    className: "big-n"
  }, Math.round(s.assets[key]))), React.createElement("div", null, React.createElement("div", {
    className: "ts"
  }, "3\u30F6\u6708"), React.createElement("div", {
    className: "big-n"
  }, Math.round(a3[key]))), React.createElement("div", null, React.createElement("div", {
    className: "ts"
  }, "6\u30F6\u6708"), React.createElement("div", {
    className: "big-n"
  }, Math.round(a6[key]))))), React.createElement("div", {
    className: "card",
    style: {
      boxShadow: 'none',
      border: '1px solid var(--line)'
    }
  }, React.createElement("div", {
    className: "lbl"
  }, "Potential Career Impact\uFF08Model Estimate\uFF09"), React.createElement("div", {
    className: "row",
    style: {
      gap: 14,
      marginTop: 8
    }
  }, React.createElement("div", null, React.createElement("div", {
    className: "ts"
  }, "\u73FE\u5728\u306E\u60F3\u5B9A"), React.createElement("div", {
    className: "big-n"
  }, man(cur))), React.createElement("div", null, React.createElement("div", {
    className: "ts"
  }, "6\u30F6\u6708 \u7D9A\u3051\u305F\u5834\u5408"), React.createElement("div", {
    className: "big-n",
    style: {
      color: 'var(--up)'
    }
  }, man(inc6)))), React.createElement("div", {
    className: "ts",
    style: {
      marginTop: 6
    }
  }, "\u300C\u5FC5\u305A\u4E0A\u304C\u308B\u300D\u3067\u306F\u306A\u304F\u3001\u7D9A\u3051\u305F\u5834\u5408\u306E\u30E2\u30C7\u30EB\u63A8\u5B9A\u3067\u3059\u3002"))));
}
function Home({
  s,
  set,
  go,
  openProject
}) {
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
      (s.income.log[i].why || []).slice().reverse().forEach(wv => {
        if (out.length < 4) out.push({
          ...wv,
          date: s.income.log[i].date
        });
      });
    }
    return out;
  })();
  function toggleToday(id) {
    set(p => {
      const t = p.today.find(x => x.id === id);
      if (!t || t.done) return p;
      const pr = projById(p, t.projectId);
      const w = p.weights;
      const per = w.dailyGrow * (pr && pr.status === 'focus' ? w.focusMult : 1);
      let np = {
        ...p,
        today: p.today.map(x => x.id === id ? {
          ...x,
          done: true,
          doneAt: new Date().toISOString()
        } : x),
        projects: p.projects.map(x => x.id === t.projectId ? {
          ...x,
          moveLog: [...(x.moveLog || []), {
            date: todayISO(),
            amt: 1
          }]
        } : x),
        activity: [{
          date: todayISO(),
          projectId: t.projectId,
          action: t.action,
          minutes: null
        }, ...(p.activity || [])].slice(0, 200)
      };
      if (pr) np = actGrow(np, pr.assetTargets, per, `${pr.name} — ${t.action}`, w.dailyCapPerAsset);
      return np;
    });
  }
  function addRoutine(rt) {
    set(p => {
      const room = TODAY_MAX - p.today.filter(t => !t.done).length;
      if (room <= 0) return p;
      const add = rt.actions.slice(0, room).map(a => ({
        id: uid(),
        projectId: rt.projectId,
        action: a,
        done: false,
        doneAt: null
      }));
      return {
        ...p,
        today: [...p.today, ...add]
      };
    });
  }
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "between topbar"
  }, React.createElement("div", {
    className: "date"
  }, fmtDate(todayISO()), "\uFF08", WD[parseISO(todayISO()).getDay()], "\uFF09"), React.createElement("button", {
    className: "gear",
    onClick: () => go('settings')
  }, "\u2699")), React.createElement("div", {
    className: "card"
  }, React.createElement("div", {
    className: "lbl"
  }, "2030 \u60F3\u5B9A\u521D\u5E74\u5EA6\u5E74\u53CE"), React.createElement("div", {
    className: "idx-now"
  }, man(inc.main), React.createElement("span", {
    className: "yen"
  }, "\u5186")), React.createElement("div", {
    className: "idx-sub",
    style: {
      color: info30.chg >= 0 ? 'var(--up)' : 'var(--down)'
    }
  }, info30.arrow, " ", manD(info30.chg), "\u3000", React.createElement("span", {
    className: "muted2"
  }, "this month")), React.createElement("div", {
    className: "ts",
    style: {
      marginTop: 8
    }
  }, "\u60F3\u5B9A\u30EC\u30F3\u30B8\u3000", man(inc.lo), " \u2014 ", man(inc.hi)), React.createElement("div", {
    className: "ts"
  }, "\u73FE\u5728\u306E\u30AD\u30E3\u30EA\u30A2\u8CC7\u7523\u306B\u3082\u3068\u3065\u304F\u3000\u30FB\u3000Confidence: ", inc.conf.label), React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, React.createElement(IncomeChart, {
    log: s.income.log,
    days: days,
    showMarkers: true,
    onPick: setPick,
    h: 116
  })), React.createElement("div", {
    className: "range"
  }, RANGES.map(([d, l]) => React.createElement("button", {
    key: d,
    className: days === d ? 'on' : '',
    onClick: () => {
      setDays(d);
      setPick(null);
    }
  }, l))), pick && React.createElement("div", {
    className: "pick"
  }, React.createElement("div", {
    className: "lbl"
  }, fmtFull(pick.date)), React.createElement("div", {
    className: "pick-v"
  }, man(pick.value), "\u5186"), (pick.why || []).map((wv, i) => React.createElement("div", {
    key: i,
    className: "pick-e"
  }, React.createElement("span", null, wv.up ? '↑' : '↓', " ", wv.reason, wv.asset ? `（${ASSET_MAP[wv.asset].jp} ${wv.from}→${wv.to}）` : ''), wv.incomeDelta ? React.createElement("span", {
    className: "pick-p"
  }, manD(wv.incomeDelta)) : null)))), !s.tipsSeen && React.createElement("div", {
    className: "card soft"
  }, React.createElement("div", {
    className: "sub"
  }, "\u30BF\u30B9\u30AF\u306F\u5186\u306B\u63DB\u7B97\u3057\u3066\u3044\u307E\u305B\u3093\u3002\u884C\u52D5\u3067 ", React.createElement("b", null, "\u30AD\u30E3\u30EA\u30A2\u8CC7\u7523"), "\uFF08\u82F1\u8A9E\u30FB\u7814\u7A76\u30FB\u5B9F\u7E3E\u2026\uFF09\u304C\u80B2\u3061\u3001\u305D\u306E\u7D50\u679C\u3068\u3057\u3066\u9078\u3079\u308B\u4F01\u696D\u7FA4\u3068\u60F3\u5B9A\u5E74\u53CE\u30EC\u30F3\u30B8\u304C\u5909\u308F\u308A\u307E\u3059\u3002"), React.createElement("button", {
    className: "btn btn-sm",
    style: {
      marginTop: 10
    },
    onClick: () => set(p => ({
      ...p,
      tipsSeen: true
    }))
  }, "OK")), React.createElement("div", {
    className: "card"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "lbl"
  }, "WHY IT CHANGED"), React.createElement("button", {
    className: "link",
    onClick: () => go('career')
  }, "\u8CC7\u7523\u3092\u898B\u308B")), whyRecent.length === 0 && React.createElement("div", {
    className: "sub",
    style: {
      marginTop: 6
    }
  }, "\u307E\u3060\u5909\u5316\u306A\u3057\u3002Add Progress \u3067\u8A18\u9332\u3059\u308B\u3068\u52D5\u304D\u307E\u3059\u3002"), whyRecent.map((wv, i) => React.createElement("div", {
    key: i,
    className: "why-row"
  }, React.createElement("span", {
    className: "why-a",
    style: {
      color: wv.up ? 'var(--up)' : 'var(--down)'
    }
  }, wv.up ? '↑' : '↓'), React.createElement("span", {
    style: {
      flex: 1
    }
  }, wv.reason), wv.asset && React.createElement("span", {
    className: "ts"
  }, ASSET_MAP[wv.asset].jp, " ", wv.from, "\u2192", wv.to)))), React.createElement("div", {
    className: "card"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "lbl"
  }, "CURRENT FOCUS"), React.createElement("button", {
    className: "link",
    onClick: () => go('projects')
  }, "\u5909\u66F4")), focus.map(p => React.createElement("div", {
    key: p.id,
    className: "focus",
    onClick: () => openProject(p.id)
  }, React.createElement("span", {
    className: "emo"
  }, p.emoji), React.createElement("span", {
    className: "fname"
  }, p.name), React.createElement("span", {
    className: "fpct"
  }, (p.assetTargets || []).map(a => ASSET_MAP[a].jp).join('・'))))), React.createElement("div", {
    className: "card"
  }, React.createElement("div", {
    className: "lbl"
  }, "TODAY"), today.length === 0 && React.createElement("div", {
    className: "sub",
    style: {
      marginTop: 6
    }
  }, "\u30EB\u30FC\u30C6\u30A3\u30F3\u304B\u3089\u8FFD\u52A0\u3001\u307E\u305F\u306F Add Progress \u3067\u8A18\u9332\u3002"), today.map(t => {
    const pr = projById(s, t.projectId);
    return React.createElement("div", {
      key: t.id,
      className: "todo"
    }, React.createElement("button", {
      className: `ck ${t.done ? 'on' : ''}`,
      onClick: () => toggleToday(t.id)
    }, t.done ? '✓' : ''), React.createElement("div", {
      style: {
        flex: 1
      },
      onClick: () => setPick({
        _impact: {
          projId: t.projectId,
          action: t.action
        }
      })
    }, React.createElement("div", {
      className: "tt",
      style: {
        textDecoration: t.done ? 'line-through' : 'none',
        color: t.done ? 'var(--sub)' : 'var(--ink)'
      }
    }, t.action), React.createElement("div", {
      className: "ts"
    }, pr ? `${pr.emoji} ${pr.name}` : '—', "\u3000\xB7\u3000\u5F71\u97FF\u3092\u898B\u308B")), React.createElement("button", {
      className: "x sm",
      onClick: () => set(p => ({
        ...p,
        today: p.today.filter(x => x.id !== t.id)
      }))
    }, "\u2715"));
  }), React.createElement("div", {
    className: "rts"
  }, s.routines.map(rt => React.createElement("button", {
    key: rt.id,
    className: "chip sm",
    onClick: () => addRoutine(rt)
  }, "\uFF0B ", rt.name)))), React.createElement("button", {
    className: "btn btn-fill btn-block big",
    onClick: () => setAdding(true)
  }, "\uFF0B Add Progress"), adding && React.createElement(AddProgress, {
    s: s,
    set: set,
    onClose: () => setAdding(false)
  }), pick && pick._impact && React.createElement(TaskImpact, {
    s: s,
    projId: pick._impact.projId,
    action: pick._impact.action,
    onClose: () => setPick(null)
  }));
}
function Roadmap({
  s
}) {
  const curYear = new Date().getFullYear();
  const [open, setOpen] = useState(curYear);
  const dls = upcomingDeadlines(s, 3);
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "lbl"
  }, "ROADMAP"), React.createElement("div", {
    className: "now-line"
  }, "\u25CF NOW\u3000", nowLabel()), React.createElement("div", {
    className: "rm-strip"
  }, ROADMAP.map(r => React.createElement("button", {
    key: r.year,
    className: `rm-yr ${r.year === open ? 'open' : ''} ${r.year < curYear ? 'past' : ''} ${r.year === curYear || r.year === curYear + 1 ? 'near' : ''}`,
    onClick: () => setOpen(r.year)
  }, React.createElement("div", {
    className: "rm-y"
  }, r.year), React.createElement("div", {
    className: "rm-s"
  }, r.summary), r.year === curYear && React.createElement("div", {
    className: "rm-now"
  }, "\u25B2")))), ROADMAP.filter(r => r.year === open).map(r => React.createElement("div", {
    key: r.year,
    className: `card ${r.year < curYear ? 'faint' : ''}`
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "h2"
  }, r.year), React.createElement("div", {
    className: "sub"
  }, r.summary)), React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, r.events.map((e, i) => React.createElement("div", {
    key: i,
    className: "rm-e"
  }, r.year < curYear ? '◦' : '•', " ", e))))), React.createElement("div", {
    className: "card"
  }, React.createElement("div", {
    className: "lbl"
  }, "NEXT DEADLINE"), dls.length === 0 && React.createElement("div", {
    className: "sub",
    style: {
      marginTop: 6
    }
  }, "\u8A2D\u5B9A\u306A\u3057"), dls.map((d, i) => {
    const du = daysUntil(d.date);
    return React.createElement("div", {
      key: i,
      className: "dl"
    }, React.createElement("div", {
      className: "dl-m"
    }, MON3[parseISO(d.date).getMonth()], " ", parseISO(d.date).getDate()), React.createElement("div", {
      style: {
        flex: 1
      }
    }, React.createElement("div", {
      className: "dl-t"
    }, d.label), React.createElement("div", {
      className: "ts"
    }, d.emoji, " ", d.project)), React.createElement("div", {
      className: "dl-d",
      style: {
        color: du <= 14 ? 'var(--down)' : 'var(--sub)'
      }
    }, du < 0 ? 'now' : `${du}d`));
  })));
}
function Projects({
  s,
  set,
  sel,
  setSel,
  openProject
}) {
  const [adding, setAdding] = useState(false);
  const [promo, setPromo] = useState(null);
  const [stopSim, setStopSim] = useState(null);
  const detail = sel && projById(s, sel);
  const focusCount = s.projects.filter(p => p.status === 'focus').length;
  function toggleFocus(id) {
    set(p => {
      const pr = p.projects.find(x => x.id === id);
      if (pr.status !== 'focus' && p.projects.filter(x => x.status === 'focus').length >= FOCUS_MAX) {
        alert(`Current Focus は最大 ${FOCUS_MAX} つ。`);
        return p;
      }
      return {
        ...p,
        projects: p.projects.map(x => x.id === id ? {
          ...x,
          status: x.status === 'focus' ? 'active' : 'focus'
        } : x)
      };
    });
  }
  function toggleMs(pid, mid) {
    set(p => {
      const pr = p.projects.find(x => x.id === pid);
      const ms = pr.milestones.find(m => m.id === mid);
      const on = !ms.done;
      let np = {
        ...p,
        projects: p.projects.map(x => x.id === pid ? {
          ...x,
          moveLog: on ? [...(x.moveLog || []), {
            date: todayISO(),
            amt: 6
          }] : x.moveLog,
          milestones: x.milestones.map(m => m.id === mid ? {
            ...m,
            done: on,
            doneAt: on ? new Date().toISOString() : null
          } : m)
        } : x)
      };
      if (on) np = actGrow(np, pr.assetTargets, ms.big ? p.weights.milestoneBigGrow : p.weights.milestoneGrow, `マイルストーン：${ms.label}（${pr.name}）`);else np = snapshotIncome(np, []);
      return np;
    });
  }
  function setField(id, k, v) {
    set(p => ({
      ...p,
      projects: p.projects.map(x => x.id === id ? {
        ...x,
        [k]: v
      } : x)
    }));
  }
  function setDl(id, k, v) {
    set(p => ({
      ...p,
      projects: p.projects.map(x => x.id === id ? {
        ...x,
        deadline: {
          ...(x.deadline || {
            label: '',
            date: ''
          }),
          [k]: v
        }
      } : x)
    }));
  }
  function promote(idea, choice, sac) {
    set(p => {
      let np = {
        ...p
      };
      if (choice === 'end' && sac) np = {
        ...np,
        projects: np.projects.filter(x => x.id !== sac)
      };
      if (choice === 'reduce' && sac) np = {
        ...np,
        projects: np.projects.map(x => x.id === sac ? {
          ...x,
          status: 'active'
        } : x)
      };
      np = {
        ...np,
        projects: [...np.projects, {
          id: uid(),
          name: idea.text.slice(0, 18),
          emoji: '•',
          kind: 'project',
          outcome: 'career',
          goal: idea.text,
          status: 'active',
          deadline: null,
          milestones: [],
          moveLog: [],
          assetTargets: ['coreSkills'],
          nextActionText: '最初の一歩を決める'
        }],
        ideas: np.ideas.filter(x => x.id !== idea.id)
      };
      return np;
    });
    setPromo(null);
  }
  function doStop(rt) {
    set(p => ({
      ...p,
      routines: p.routines.filter(x => x.id !== rt.id)
    }));
    setStopSim(null);
  }
  if (detail) {
    const p = detail;
    const m = momentum(p);
    const pct = progressOf(p);
    return React.createElement("div", {
      className: "screen"
    }, React.createElement("button", {
      className: "link",
      onClick: () => setSel(null)
    }, "\u2039 Projects"), React.createElement("div", {
      className: "card"
    }, React.createElement("div", {
      className: "between"
    }, React.createElement("div", {
      className: "h1"
    }, p.emoji, " ", p.name), React.createElement("button", {
      className: `chip ${p.status === 'focus' ? 'on' : ''}`,
      onClick: () => toggleFocus(p.id)
    }, p.status === 'focus' ? '★ Focus' : 'Focusにする')), React.createElement("div", {
      className: "row",
      style: {
        gap: 12,
        marginTop: 12
      }
    }, React.createElement("div", {
      style: {
        flex: 1
      }
    }, React.createElement(Bar, {
      v: pct
    })), React.createElement("div", {
      className: "big-n sm"
    }, pct, "%"), React.createElement(Trend, {
      p: p
    })), React.createElement("div", {
      className: "ts",
      style: {
        marginTop: 8
      }
    }, "\u80B2\u3064\u8CC7\u7523\uFF1A", (p.assetTargets || []).map(a => ASSET_MAP[a].jp).join(' / ') || '—')), React.createElement("div", {
      className: "card"
    }, React.createElement("div", {
      className: "lbl"
    }, "GOAL"), React.createElement("textarea", {
      className: "ta",
      value: p.goal || '',
      onChange: e => setField(p.id, 'goal', e.target.value)
    })), React.createElement("div", {
      className: "card"
    }, React.createElement("div", {
      className: "lbl"
    }, "NEXT DEADLINE"), React.createElement("input", {
      className: "in",
      placeholder: "\u5185\u5BB9",
      value: (p.deadline || {}).label || '',
      onChange: e => setDl(p.id, 'label', e.target.value)
    }), React.createElement("input", {
      className: "in",
      style: {
        marginTop: 8
      },
      placeholder: "YYYY-MM-DD",
      value: (p.deadline || {}).date || '',
      onChange: e => setDl(p.id, 'date', e.target.value)
    }), (p.deadline || {}).date && React.createElement("div", {
      className: "sub",
      style: {
        marginTop: 6
      }
    }, "\u3042\u3068 ", daysUntil(p.deadline.date), "\u65E5")), React.createElement("div", {
      className: "card"
    }, React.createElement("div", {
      className: "lbl"
    }, "MILESTONES\uFF08\u9054\u6210\u3067\u9032\u6357\u3068\u8CC7\u7523\u304C\u4F38\u3073\u308B\uFF09"), (p.milestones || []).map(ms => React.createElement("div", {
      key: ms.id,
      className: "todo"
    }, React.createElement("button", {
      className: `ck ${ms.done ? 'on' : ''}`,
      onClick: () => toggleMs(p.id, ms.id)
    }, ms.done ? '✓' : ''), React.createElement("div", {
      className: "tt",
      style: {
        flex: 1,
        textDecoration: ms.done ? 'line-through' : 'none',
        color: ms.done ? 'var(--sub)' : 'var(--ink)'
      }
    }, ms.label, ms.big && React.createElement("span", {
      className: "sub"
    }, " \u30FB\u5927"))))), React.createElement("div", {
      className: "card"
    }, React.createElement("div", {
      className: "lbl"
    }, "\u6700\u8FD1\u306E\u8A18\u9332"), (s.activity || []).filter(a => a.projectId === p.id).slice(0, 8).map((a, i) => React.createElement("div", {
      key: i,
      className: "ts",
      style: {
        padding: '4px 0'
      }
    }, fmtDate(a.date), "\u3000", a.action, a.minutes ? ` ・${a.minutes}min` : '')), (s.activity || []).filter(a => a.projectId === p.id).length === 0 && React.createElement("div", {
      className: "sub",
      style: {
        marginTop: 6
      }
    }, "\u307E\u3060\u306A\u3057")));
  }
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "lbl"
  }, "PROJECTS"), React.createElement("div", {
    className: "sub",
    style: {
      marginTop: 4
    }
  }, "Current Focus ", focusCount, "/", FOCUS_MAX), s.projects.map(p => React.createElement("div", {
    key: p.id,
    className: "pcard",
    onClick: () => openProject(p.id)
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "pname"
  }, p.emoji, " ", p.name), React.createElement("button", {
    className: "star",
    onClick: e => {
      e.stopPropagation();
      toggleFocus(p.id);
    }
  }, p.status === 'focus' ? '★' : '☆')), React.createElement("div", {
    className: "row",
    style: {
      gap: 10,
      marginTop: 10
    }
  }, React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Bar, {
    v: progressOf(p)
  })), React.createElement("div", {
    className: "big-n sm"
  }, progressOf(p), "%")), React.createElement("div", {
    className: "between",
    style: {
      marginTop: 8
    }
  }, React.createElement(Trend, {
    p: p
  }), React.createElement("div", {
    className: "ts"
  }, "Next\uFF1A", nextActionOf(p))))), React.createElement("div", {
    className: "card"
  }, React.createElement("div", {
    className: "lbl"
  }, "ROUTINES"), s.routines.map(rt => React.createElement("div", {
    key: rt.id,
    className: "todo",
    style: {
      alignItems: 'center'
    }
  }, React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement("div", {
    className: "tt"
  }, rt.name), React.createElement("div", {
    className: "ts"
  }, rt.actions.join(' / '))), React.createElement("button", {
    className: "btn btn-sm",
    onClick: () => setStopSim(rt)
  }, "Stop"))), stopSim && React.createElement(StopSim, {
    s: s,
    rt: stopSim,
    onStop: () => doStop(stopSim),
    onCancel: () => setStopSim(null)
  })), React.createElement("div", {
    className: "card"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "lbl"
  }, "IDEA\uFF08\u3059\u3050Project\u306B\u3057\u306A\u3044\uFF09"), React.createElement("button", {
    className: "link",
    onClick: () => setAdding(a => !a)
  }, adding ? '閉じる' : '＋')), adding && React.createElement(IdeaAdd, {
    onAdd: t => {
      set(p => ({
        ...p,
        ideas: [{
          id: uid(),
          text: t,
          createdAt: new Date().toISOString()
        }, ...p.ideas]
      }));
      setAdding(false);
    }
  }), s.ideas.map(idea => React.createElement("div", {
    key: idea.id,
    className: "todo",
    style: {
      display: 'block'
    }
  }, React.createElement("div", {
    className: "tt"
  }, idea.text), React.createElement("div", {
    className: "row",
    style: {
      gap: 8,
      marginTop: 8
    }
  }, React.createElement("button", {
    className: "btn btn-sm",
    onClick: () => setPromo(idea)
  }, "Project\u306B\u6607\u683C"), React.createElement("button", {
    className: "link",
    onClick: () => set(p => ({
      ...p,
      ideas: p.ideas.filter(x => x.id !== idea.id)
    }))
  }, "\u6368\u3066\u308B")), promo && promo.id === idea.id && React.createElement(PromoteQ, {
    s: s,
    idea: idea,
    onDo: promote,
    onCancel: () => setPromo(null)
  })))));
}
function StopSim({
  s,
  rt,
  onStop,
  onCancel
}) {
  const p = projById(s, rt.projectId);
  const per = s.weights.dailyGrow * (p && p.status === 'focus' ? s.weights.focusMult : 1);
  const targets = p && p.assetTargets || [];
  const cont = growAssetsN(s, targets, per, 26).assets;
  const stop = {};
  ASSETS.forEach(a => stop[a.id] = targets.includes(a.id) ? clamp(s.assets[a.id] + 2, 0, 100) : s.assets[a.id]);
  const key = targets[0];
  const curInc = incomeNow(s).main;
  const contInc = estimateFor(s, cont).main;
  const stopInc = estimateFor(s, stop).main;
  return React.createElement("div", {
    className: "pick",
    style: {
      marginTop: 10
    }
  }, React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, rt.name, " \u3092\u6B62\u3081\u308B\u524D\u306B"), React.createElement("div", {
    className: "ts",
    style: {
      marginTop: 4
    }
  }, "6\u30F6\u6708\u5F8C\u306E\u898B\u8FBC\u307F\uFF08", key ? ASSET_MAP[key].jp : '資産', " \uFF0F \u60F3\u5B9A\u5E74\u53CE\uFF09"), React.createElement("div", {
    className: "scn",
    style: {
      marginTop: 8
    }
  }, React.createElement("div", null, React.createElement("div", {
    className: "ts"
  }, "Continue"), React.createElement("div", {
    className: "big-n sm"
  }, key ? `${Math.round(s.assets[key])}→${Math.round(cont[key])}` : '—'), React.createElement("div", {
    className: "ts",
    style: {
      color: 'var(--up)'
    }
  }, man(contInc))), React.createElement("div", null, React.createElement("div", {
    className: "ts"
  }, "Stop"), React.createElement("div", {
    className: "big-n sm"
  }, key ? `${Math.round(s.assets[key])}→${Math.round(stop[key])}` : '—'), React.createElement("div", {
    className: "ts"
  }, man(stopInc)))), React.createElement("div", {
    className: "row",
    style: {
      gap: 8,
      marginTop: 10
    }
  }, React.createElement("button", {
    className: "btn btn-sm btn-fill",
    onClick: onCancel
  }, "Continue"), React.createElement("button", {
    className: "btn btn-sm danger",
    onClick: onStop
  }, "Stop anyway")));
}
function IdeaAdd({
  onAdd
}) {
  const [v, setV] = useState('');
  return React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, React.createElement("textarea", {
    className: "ta",
    value: v,
    onChange: e => setV(e.target.value),
    placeholder: "\u601D\u3044\u3064\u3044\u305F\u3053\u3068"
  }), React.createElement("button", {
    className: "btn btn-sm",
    style: {
      marginTop: 6
    },
    disabled: !v.trim(),
    onClick: () => onAdd(v.trim())
  }, "IDEA\u306B\u4FDD\u5B58"));
}
function PromoteQ({
  s,
  idea,
  onDo,
  onCancel
}) {
  const [c, setC] = useState(null);
  const [sac, setSac] = useState('');
  return React.createElement("div", {
    className: "pick",
    style: {
      marginTop: 10
    }
  }, React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, "\u3053\u308C\u3092\u59CB\u3081\u308B\u306A\u3089\u3001\u4F55\u306E\u6642\u9593\u3092\u4F7F\u3046\uFF1F"), [['reduce', '現在のProjectの時間を減らす'], ['free', '自由時間を使う'], ['end', '既存Projectを終了する']].map(([k, l]) => React.createElement("label", {
    key: k,
    className: "opt"
  }, React.createElement("input", {
    type: "radio",
    name: "pq",
    checked: c === k,
    onChange: () => setC(k)
  }), React.createElement("span", null, l))), (c === 'reduce' || c === 'end') && React.createElement("select", {
    className: "in",
    style: {
      marginTop: 8
    },
    value: sac,
    onChange: e => setSac(e.target.value)
  }, React.createElement("option", {
    value: ""
  }, "\u2014 \u5BFE\u8C61\u306EProject \u2014"), s.projects.map(p => React.createElement("option", {
    key: p.id,
    value: p.id
  }, p.name))), React.createElement("div", {
    className: "row",
    style: {
      gap: 8,
      marginTop: 10
    }
  }, React.createElement("button", {
    className: "btn btn-sm btn-fill",
    disabled: !c || (c === 'reduce' || c === 'end') && !sac,
    onClick: () => onDo(idea, c, sac)
  }, "\u6607\u683C"), React.createElement("button", {
    className: "link",
    onClick: onCancel
  }, "\u3084\u3081\u308B")));
}
function Career({
  s,
  set,
  openProject
}) {
  const [wf, setWf] = useState(false);
  const inc = useMemo(() => incomeNow(s), [s]);
  const setP = (k, v) => set(p => ({
    ...p,
    profile: {
      ...p.profile,
      [k]: v
    }
  }));
  const setOut = (k, v) => set(p => ({
    ...p,
    ideal: {
      ...(p.ideal || {}),
      outcomes: {
        ...((p.ideal || {}).outcomes || {}),
        [k]: v
      }
    }
  }));
  const outcomes = s.ideal && s.ideal.outcomes || Object.fromEntries(OUTCOMES.map(o => [o.id, o.desc]));
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "lbl"
  }, "CAREER"), React.createElement("div", {
    className: "card"
  }, React.createElement("div", {
    className: "lbl"
  }, "CAREER ASSETS"), ASSETS.map(a => React.createElement("div", {
    key: a.id,
    className: "arow"
  }, React.createElement("div", {
    className: "aname"
  }, a.name, React.createElement("span", {
    className: "ts"
  }, " ", a.jp)), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(Bar, {
    v: s.assets[a.id]
  })), React.createElement("div", {
    className: "big-n sm"
  }, Math.round(s.assets[a.id]))))), React.createElement("div", {
    className: "card"
  }, React.createElement("div", {
    className: "lbl"
  }, "CAREER FIT"), PATHS.map(p => {
    const f = inc.fits[p.id];
    return React.createElement("div", {
      key: p.id,
      className: "fit-row"
    }, React.createElement("span", {
      style: {
        flex: 1
      }
    }, p.name), React.createElement("span", {
      className: `fitb f-${fitLabel(f).toLowerCase()}`
    }, fitLabel(f)), React.createElement("span", {
      className: "ts num"
    }, man(inc.ests[p.id])));
  })), React.createElement("div", {
    className: "card"
  }, React.createElement("div", {
    className: "lbl"
  }, "CAREER OPTIONS"), [['High', '700万〜'], ['Competitive', '550万〜700万'], ['Broad Range', '400万〜550万']].map(([k, v], i) => React.createElement("div", {
    key: i,
    className: "opt-row"
  }, React.createElement("span", {
    style: {
      flex: 1,
      fontWeight: 700
    }
  }, k), React.createElement("span", {
    className: "ts"
  }, v))), React.createElement("div", {
    className: "ts",
    style: {
      marginTop: 8
    }
  }, "\u3044\u307E\u306E\u60F3\u5B9A ", man(inc.main), "\u5186 \u306F\u300C", inc.main >= 7000000 ? 'High' : inc.main >= 5500000 ? 'Competitive' : 'Broad Range', "\u300D\u306E\u6C34\u6E96\u306B\u8FD1\u3065\u3044\u3066\u3044\u307E\u3059\u3002\u5185\u5B9A\u78BA\u7387\u306A\u3069\u306F\u8868\u793A\u3057\u307E\u305B\u3093\u3002")), React.createElement("button", {
    className: "btn btn-fill btn-block big",
    onClick: () => setWf(true)
  }, "What If? \u3092\u8A66\u3059"), React.createElement("div", {
    className: "card"
  }, React.createElement("div", {
    className: "lbl"
  }, "CAREER PROFILE"), React.createElement("div", {
    className: "grid2",
    style: {
      marginTop: 8
    }
  }, React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "\u5927\u5B66"), React.createElement("input", {
    className: "in",
    value: s.profile.university,
    onChange: e => setP('university', e.target.value)
  })), React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "\u5B66\u90E8"), React.createElement("input", {
    className: "in",
    value: s.profile.faculty,
    onChange: e => setP('faculty', e.target.value)
  })), React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "\u5352\u696D\u4E88\u5B9A\u5E74"), React.createElement("input", {
    className: "in",
    value: s.profile.gradYear,
    onChange: e => setP('gradYear', Number(e.target.value) || 2030)
  })), React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "GPA"), React.createElement("input", {
    className: "in",
    value: s.profile.gpa,
    onChange: e => setP('gpa', e.target.value)
  })), React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "\u82F1\u8A9E\u30EC\u30D9\u30EB"), React.createElement("input", {
    className: "in",
    value: s.profile.english,
    onChange: e => setP('english', e.target.value)
  })), React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "\u7B2C\u4E00\u5FD7\u671B\u306E\u696D\u754C"), React.createElement("select", {
    className: "in",
    value: s.profile.targetPath,
    onChange: e => setP('targetPath', e.target.value)
  }, PATHS.map(p => React.createElement("option", {
    key: p.id,
    value: p.id
  }, p.name)))))), React.createElement("div", {
    className: "card"
  }, React.createElement("div", {
    className: "lbl"
  }, "2030\u5E74\u306E\u7406\u60F3"), OUTCOMES.map(o => React.createElement("div", {
    key: o.id,
    style: {
      marginTop: 10
    }
  }, React.createElement("div", {
    className: "h2"
  }, o.name), React.createElement("textarea", {
    className: "ta",
    style: {
      marginTop: 4
    },
    value: outcomes[o.id] || '',
    onChange: e => setOut(o.id, e.target.value)
  }), React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, s.projects.filter(p => p.outcome === o.id).map(p => React.createElement("div", {
    key: p.id,
    className: "map-proj",
    onClick: () => openProject(p.id)
  }, React.createElement("span", {
    style: {
      flex: 1
    }
  }, p.emoji, " ", p.name), React.createElement("span", {
    className: "ts num"
  }, progressOf(p), "%"))))))), wf && React.createElement(WhatIf, {
    s: s,
    onClose: () => setWf(false)
  }));
}
function WhatIf({
  s,
  onClose
}) {
  const [ov, setOv] = useState({
    english: null,
    abroad: null,
    research: null,
    project: null,
    intern: null
  });
  const custom = estimateFor(s, withOverrides(s.assets, ov)).main;
  const cur = incomeNow(s).main;
  const scn = useMemo(() => scenarioIncomes(s), [s]);
  const Seg = ({
    k,
    opts
  }) => React.createElement("div", {
    className: "chips"
  }, opts.map(([v, l]) => React.createElement("button", {
    key: String(v),
    className: `chip ${ov[k] === v ? 'on' : ''}`,
    onClick: () => setOv({
      ...ov,
      [k]: ov[k] === v ? null : v
    })
  }, l)));
  return React.createElement("div", {
    className: "sheet",
    onClick: e => {
      if (e.target.className === 'sheet') onClose();
    }
  }, React.createElement("div", {
    className: "sheet-in"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "h2"
  }, "What If?"), React.createElement("button", {
    className: "x",
    onClick: onClose
  }, "\u2715")), React.createElement("div", {
    className: "scn",
    style: {
      marginTop: 10
    }
  }, React.createElement("div", null, React.createElement("div", {
    className: "ts"
  }, "Minimum"), React.createElement("div", {
    className: "big-n sm"
  }, man(scn.minimum))), React.createElement("div", null, React.createElement("div", {
    className: "ts"
  }, "Current"), React.createElement("div", {
    className: "big-n sm"
  }, man(scn.current))), React.createElement("div", null, React.createElement("div", {
    className: "ts"
  }, "Growth"), React.createElement("div", {
    className: "big-n sm",
    style: {
      color: 'var(--up)'
    }
  }, man(scn.growth)))), React.createElement("div", {
    className: "ts",
    style: {
      marginTop: 6
    }
  }, "\u4ECA\u306E\u9078\u629E\u3067\u30012030\u5E74\u306E\u60F3\u5B9A\u304C\u3069\u308C\u3060\u3051\u5909\u308F\u308B\u304B\u3002"), React.createElement("div", {
    className: "card",
    style: {
      marginTop: 14,
      boxShadow: 'none',
      border: '1px solid var(--line)'
    }
  }, React.createElement("div", {
    className: "lbl"
  }, "\u30AB\u30B9\u30BF\u30E0"), React.createElement("div", {
    className: "idx-now",
    style: {
      fontSize: 30,
      marginTop: 4
    }
  }, man(cur), " ", React.createElement("span", {
    className: "muted2",
    style: {
      fontSize: 15
    }
  }, "\u2192"), " ", React.createElement("span", {
    style: {
      color: custom >= cur ? 'var(--up)' : 'var(--down)'
    }
  }, man(custom)))), React.createElement("div", {
    className: "lbl",
    style: {
      marginTop: 12
    }
  }, "English\uFF08\u76EE\u6A19\u30B9\u30B3\u30A2\uFF09"), React.createElement(Seg, {
    k: "english",
    opts: [['6.0', '6.0'], ['6.5', '6.5'], ['7.0', '7.0'], ['7.5', '7.5']]
  }), React.createElement("div", {
    className: "lbl"
  }, "Study Abroad"), React.createElement(Seg, {
    k: "abroad",
    opts: [['6m', '6ヶ月'], ['1y', '1年']]
  }), React.createElement("div", {
    className: "lbl"
  }, "Research"), React.createElement(Seg, {
    k: "research",
    opts: [['conf', '学会発表'], ['pub', '論文'], ['both', '両方']]
  }), React.createElement("div", {
    className: "lbl"
  }, "Project"), React.createElement(Seg, {
    k: "project",
    opts: [['6m', '6ヶ月'], ['1y', '1年'], ['2y', '2年以上']]
  }), React.createElement("div", {
    className: "lbl"
  }, "Internship"), React.createElement(Seg, {
    k: "intern",
    opts: [['1', '1社'], ['2', '2社以上'], ['long', '長期']]
  })));
}
function Settings({
  s,
  set,
  go
}) {
  const [imp, setImp] = useState('');
  const w = s.weights;
  const setW = (k, v) => set(p => ({
    ...p,
    weights: {
      ...p.weights,
      [k]: Number(v) || 0
    }
  }));
  function ex() {
    const t = JSON.stringify(s);
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(() => alert('コピーしました'), () => prompt('コピー', t));else prompt('コピー', t);
  }
  function im() {
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
    className: "between"
  }, React.createElement("div", {
    className: "lbl"
  }, "\u8A2D\u5B9A"), React.createElement("button", {
    className: "link",
    onClick: () => go('home')
  }, "\u9589\u3058\u308B")), React.createElement("div", {
    className: "card"
  }, React.createElement("div", {
    className: "lbl"
  }, "\u8CC7\u7523\u306E\u6210\u9577\u30FB\u6E1B\u8870\uFF08\u8ABF\u6574\u53EF\uFF09"), React.createElement("div", {
    className: "grid2",
    style: {
      marginTop: 10
    }
  }, [['dailyGrow', '1回の行動'], ['focusMult', 'Focus倍率'], ['milestoneGrow', 'マイルストーン'], ['milestoneBigGrow', 'マイルストーン(大)'], ['decayPerWeek', '週の減衰'], ['dailyCapPerAsset', '資産の日次上限']].map(([k, l]) => React.createElement("div", {
    className: "fld",
    key: k
  }, React.createElement("label", null, l), React.createElement("input", {
    className: "in",
    value: w[k],
    onChange: e => setW(k, e.target.value)
  }))))), React.createElement("div", {
    className: "card"
  }, React.createElement("div", {
    className: "lbl"
  }, "\u30C7\u30FC\u30BF"), React.createElement("button", {
    className: "btn btn-block",
    style: {
      marginTop: 10
    },
    onClick: ex
  }, "JSON\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u3092\u30B3\u30D4\u30FC"), React.createElement("textarea", {
    className: "ta",
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
    disabled: !imp.trim(),
    onClick: im
  }, "\u30A4\u30F3\u30DD\u30FC\u30C8"), React.createElement("button", {
    className: "btn btn-block danger",
    style: {
      marginTop: 10
    },
    onClick: wipe
  }, "\u3059\u3079\u3066\u6D88\u3057\u3066\u521D\u671F\u5316")), React.createElement("div", {
    className: "sub"
  }, "\u30C7\u30FC\u30BF\u306F\u7AEF\u672B\u5185\u306E\u307F\u3002\u60F3\u5B9A\u5E74\u53CE\u306F\u5C06\u6765\u3092\u65AD\u5B9A\u3059\u308B\u3082\u306E\u3067\u306F\u306A\u304F\u3001\u73FE\u5728\u306E\u30AD\u30E3\u30EA\u30A2\u8CC7\u7523\u306B\u3082\u3068\u3065\u304F\u30E2\u30C7\u30EB\u63A8\u5B9A\u3067\u3059\u3002"));
}
function Nav({
  tab,
  go
}) {
  const items = [['home', 'Home'], ['roadmap', 'Roadmap'], ['projects', 'Projects'], ['career', 'Career']];
  return React.createElement("div", {
    className: "nav"
  }, items.map(([id, label]) => React.createElement("button", {
    key: id,
    className: `nav-item ${tab === id ? 'active' : ''}`,
    onClick: () => go(id)
  }, React.createElement("span", null, label))));
}
function App() {
  const [s, setS] = useState(() => ensureIncome(loadState()));
  const [tab, setTab] = useState('home');
  const [sel, setSel] = useState(null);
  useEffect(() => {
    saveState(s);
  }, [s]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab, sel]);
  const set = fn => setS(prev => typeof fn === 'function' ? fn(prev) : fn);
  const go = t => {
    setTab(t);
    if (t !== 'projects') setSel(null);
  };
  const openProject = id => {
    setSel(id);
    setTab('projects');
  };
  return React.createElement("div", null, tab === 'home' && React.createElement(Home, {
    s: s,
    set: set,
    go: go,
    openProject: openProject
  }), tab === 'roadmap' && React.createElement(Roadmap, {
    s: s
  }), tab === 'projects' && React.createElement(Projects, {
    s: s,
    set: set,
    sel: sel,
    setSel: setSel,
    openProject: openProject
  }), tab === 'career' && React.createElement(Career, {
    s: s,
    set: set,
    openProject: openProject
  }), tab === 'settings' && React.createElement(Settings, {
    s: s,
    set: set,
    go: go
  }), tab !== 'settings' && React.createElement(Nav, {
    tab: tab,
    go: go
  }));
}
ReactDOM.render(React.createElement(App), document.getElementById('root'));
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));