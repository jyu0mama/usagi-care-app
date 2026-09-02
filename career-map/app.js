/* AUTO-GENERATED from app.src.jsx by @babel/standalone (react-classic). Edit app.src.jsx, then recompile. */
const {
  useState,
  useEffect,
  useMemo
} = React;
const KEY = 'careermap_v3';
const INDEX_START = 100;
const FOCUS_MAX = 3;
const TODAY_MAX = 5;
const PROJECT_MAX = 6;
const OUTCOMES = [{
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
const OUT_MAP = Object.fromEntries(OUTCOMES.map(o => [o.id, o]));
const IMPACT = {
  high: '＋＋',
  med: '＋'
};
const uid = () => 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const WD = ['日', '月', '火', '水', '木', '金', '土'];
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const r1 = n => Math.round(n * 10) / 10;
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
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}（${WD[d.getDay()]}）`;
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
function seedProjects() {
  const P = o => ({
    id: uid(),
    progress: 0,
    status: 'active',
    milestones: [],
    moveLog: [],
    nextDeadline: null,
    nextAction: '',
    ...o
  });
  const M = (label, big) => ({
    id: uid(),
    label,
    done: false,
    doneAt: null,
    big: !!big
  });
  return [P({
    name: '英語',
    outcome: 'global',
    progress: 15,
    status: 'focus',
    goal: '交換留学の資格を取得し、英語を使える状態になる。',
    nextAction: '過去問で現在地を測る',
    nextDeadline: {
      label: '本試（2026年中・テストセンター型）',
      date: '2026-12-31'
    },
    milestones: [M('過去問で現在地を把握'), M('本試を受験'), M('出願基準スコアに到達', true), M('公式スコアレポートを入手')]
  }), P({
    name: '大学・GPA',
    outcome: 'career',
    progress: 40,
    status: 'focus',
    goal: '留学と卒業に必要な学業成績を維持する。',
    nextAction: '秋学期の重い課題を洗い出す',
    milestones: [M('1年秋のGPAを2.0以上で確定', true), M('2年春までの累積GPAで協定校基準クリア', true)]
  }), P({
    name: '自然環境音研究',
    outcome: 'research',
    progress: 10,
    status: 'focus',
    goal: '論文執筆・学会発表。',
    nextAction: '研究テーマを固める',
    milestones: [M('研究テーマを決定', true), M('データ収集を開始'), M('論文ドラフト完成', true), M('学会発表', true)]
  }), P({
    name: '交換留学',
    outcome: 'global',
    progress: 35,
    status: 'active',
    goal: '2028年秋から交換留学する。',
    nextAction: '英語資格の現在地を確認する',
    nextDeadline: {
      label: '学内選考 出願（KEIO IC-NET）',
      date: '2027-09-15'
    },
    milestones: [M('英語スコアが出願資格に到達', true), M('学内選考に出願'), M('派遣候補生に内定', true), M('留学先へ出発', true)]
  }), P({
    name: '馬佐良プロジェクト',
    outcome: 'project',
    progress: 20,
    status: 'active',
    goal: '慶應公認団体化・継続的な組織化。',
    nextAction: '公認団体の要件を調べる',
    milestones: [M('公認団体の要件を確認'), M('自分に依存しない運営体制'), M('慶應の公認団体になる', true)]
  }), P({
    name: '就職準備',
    outcome: 'career',
    progress: 10,
    status: 'active',
    goal: '2030年の選考に向けて経験・スキルを蓄積する。',
    nextAction: '博報堂インターンに申し込む',
    nextDeadline: {
      label: '博報堂インターン 申込〆切',
      date: '2026-10-02'
    },
    milestones: [M('博報堂インターンに参加'), M('サマーインターンに参加'), M('早期選考で内々定', true)]
  })];
}
function defaultState() {
  const ps = seedProjects();
  const pid = n => (ps.find(p => p.name === n) || {}).id;
  return {
    version: 3,
    tipsSeen: false,
    ideal: {
      headline: '2030年3月・電通／博報堂へ。30代前半で年収1000万。',
      outcomes: {
        career: '複数の業界・企業から就職先を選べる。博報堂・電通を含め、コンサル・商社などの選考を受けられる。',
        global: '交換留学を経験し、英語を使える。海外キャリアも選択肢として持つ。',
        research: '論文執筆・学会発表。',
        project: '継続する組織・プロジェクトを作る。'
      }
    },
    weights: {
      taskMed: 1,
      taskHigh: 2,
      focusBonus: 2,
      milestone: 12,
      milestoneBig: 25,
      stall: -2,
      deadlineNoProgress: -4,
      stallDays: 4,
      deadlineWindow: 30,
      dailyOrdinaryCap: 6
    },
    projects: ps,
    tasks: [{
      id: uid(),
      text: '英語の過去問 Reading を時間を計って解く',
      projectId: pid('英語'),
      importance: 'high',
      date: todayISO(),
      done: false,
      doneAt: null
    }, {
      id: uid(),
      text: '統計分析の勉強',
      projectId: pid('自然環境音研究'),
      importance: 'med',
      date: todayISO(),
      done: false,
      doneAt: null
    }, {
      id: uid(),
      text: '授業課題（重い方）',
      projectId: pid('大学・GPA'),
      importance: 'high',
      date: todayISO(),
      done: false,
      doneAt: null
    }],
    ideas: [{
      id: uid(),
      text: '里山プロジェクトのInstagramを毎日更新する',
      createdAt: new Date().toISOString()
    }],
    index: {
      start: INDEX_START,
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
      ideal: {
        ...d.ideal,
        ...(s.ideal || {}),
        outcomes: {
          ...d.ideal.outcomes,
          ...((s.ideal || {}).outcomes || {})
        }
      },
      weights: {
        ...d.weights,
        ...(s.weights || {})
      },
      index: {
        ...d.index,
        ...(s.index || {})
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
function lastProgressAt(s) {
  let t = 0;
  (s.tasks || []).forEach(x => {
    if (x.done && x.doneAt) t = Math.max(t, new Date(x.doneAt).getTime());
  });
  (s.projects || []).forEach(p => {
    (p.moveLog || []).forEach(m => {
      t = Math.max(t, parseISO(m.date).getTime());
    });
    (p.milestones || []).forEach(m => {
      if (m.done && m.doneAt) t = Math.max(t, new Date(m.doneAt).getTime());
    });
  });
  return t ? new Date(t).toISOString() : null;
}
function ensureIndex(s) {
  const w = s.weights;
  const log = [...(s.index && s.index.log || [])];
  let last = log.length ? log[log.length - 1].date : addDaysISO(todayISO(), -1);
  let val = log.length ? log[log.length - 1].value : s.index.start || INDEX_START;
  const nl = [...log];
  let g = 0;
  while (last < todayISO() && g++ < 800) {
    const nx = addDaysISO(last, 1);
    if (nx <= last) break;
    last = nx;
    nl.push({
      date: last,
      value: val,
      delta: 0,
      events: []
    });
  }
  if (!nl.length) nl.push({
    date: todayISO(),
    value: s.index.start || INDEX_START,
    delta: 0,
    events: []
  });
  if (nl[nl.length - 1].date !== todayISO()) nl.push({
    date: todayISO(),
    value: nl[nl.length - 1].value,
    delta: 0,
    events: []
  });
  const today = {
    ...nl[nl.length - 1]
  };
  if (!today.checked && nl.length > w.stallDays) {
    let add = 0;
    const evs = [];
    const lp = lastProgressAt(s);
    const dsp = lp ? daysSince(lp) : 999;
    if (dsp >= w.stallDays && dsp < 900) {
      add += w.stall;
      evs.push({
        reason: `重要な活動が ${dsp}日 進んでいません`,
        amt: w.stall
      });
    }
    (s.projects || []).forEach(p => {
      if (p.nextDeadline && p.nextDeadline.date) {
        const du = daysUntil(p.nextDeadline.date);
        const recent = (p.moveLog || []).some(m => daysSinceDate(m.date) < w.stallDays);
        if (du >= 0 && du <= w.deadlineWindow && !recent) {
          add += w.deadlineNoProgress;
          evs.push({
            reason: `${p.name}：締切まで${du}日、進捗なし`,
            amt: w.deadlineNoProgress
          });
        }
      }
    });
    today.checked = true;
    if (add !== 0) {
      today.delta = r1(today.delta + add);
      today.events = [...(today.events || []), ...evs];
      const prev = nl.length > 1 ? nl[nl.length - 2].value : s.index.start || INDEX_START;
      today.value = r1(prev + today.delta);
    }
  }
  nl[nl.length - 1] = today;
  return {
    ...s,
    index: {
      ...s.index,
      log: nl.slice(-540)
    }
  };
}
function bumpIndex(s, amt, reason) {
  const log = [...(s.index && s.index.log || [])];
  if (!log.length || log[log.length - 1].date !== todayISO()) {
    const prev = log.length ? log[log.length - 1].value : s.index.start || INDEX_START;
    log.push({
      date: todayISO(),
      value: prev,
      delta: 0,
      events: [],
      checked: true
    });
  }
  const e = {
    ...log[log.length - 1]
  };
  e.delta = r1((e.delta || 0) + amt);
  e.events = [...(e.events || []), {
    reason,
    amt: r1(amt)
  }];
  const prev = log.length > 1 ? log[log.length - 2].value : s.index.start || INDEX_START;
  e.value = r1(prev + e.delta);
  log[log.length - 1] = e;
  return {
    ...s,
    index: {
      ...s.index,
      log
    }
  };
}
function ordinaryGainToday(s) {
  const log = s.index && s.index.log || [];
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
  return {
    now,
    base,
    chg,
    pct,
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
    l: 'Stable',
    note: 'これから'
  };
  if (r > q * 1.2 && r > 0) return {
    a: '↗',
    l: 'Accelerating',
    note: '最近30日で勢いが増加'
  };
  if (r < q * 0.6 || r === 0 && q > 0) return {
    a: '↘',
    l: 'Slowing',
    note: '最近、重要な進捗が少ない'
  };
  return {
    a: '→',
    l: 'Stable',
    note: '一定のペースで進行'
  };
}
function projById(s, id) {
  return (s.projects || []).find(p => p.id === id);
}
function nextDeadlineAcross(s) {
  const ds = (s.projects || []).map(p => p.nextDeadline && p.nextDeadline.date ? {
    ...p.nextDeadline,
    project: p.name
  } : null).filter(Boolean).sort((a, b) => a.date.localeCompare(b.date));
  return ds[0] || null;
}
function Meter({
  v
}) {
  return React.createElement("div", {
    className: "meter"
  }, React.createElement("span", {
    style: {
      width: clamp(v, 0, 100) + '%'
    }
  }));
}
function Mom({
  p
}) {
  const m = momentum(p);
  return React.createElement("span", {
    className: "mom"
  }, m.a, " ", m.l);
}
function IndexChart({
  log,
  days,
  showDots,
  onPick,
  h
}) {
  const info = indexInfo(log, days);
  const s = info.series;
  const pts = s.length >= 2 ? s : [{
    date: addDaysISO((s[0] || {
      date: todayISO()
    }).date, -1),
    value: (s[0] || {
      value: INDEX_START
    }).value,
    events: []
  }, ...s];
  const vals = pts.map(p => p.value);
  const lo = Math.min(...vals),
    hi = Math.max(...vals);
  const pad = (hi - lo || 4) * 0.15;
  const mn = lo - pad,
    mx = hi + pad,
    rng = mx - mn || 1;
  const W = 320,
    HT = h || 130;
  const x = i => i / (pts.length - 1) * W;
  const y = v => HT - (v - mn) / rng * HT;
  const line = pts.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `0,${HT} ${line} ${W},${HT}`;
  return React.createElement("svg", {
    viewBox: `0 0 ${W} ${HT + 2}`,
    width: "100%",
    preserveAspectRatio: "none",
    style: {
      display: 'block'
    }
  }, React.createElement("polygon", {
    points: area,
    fill: "#111",
    opacity: "0.05"
  }), React.createElement("polyline", {
    points: line,
    fill: "none",
    stroke: "#111",
    strokeWidth: "1.5"
  }), showDots && pts.map((p, i) => p.events && p.events.length ? React.createElement("circle", {
    key: i,
    cx: x(i),
    cy: y(p.value),
    r: "3.2",
    fill: "#111",
    style: {
      cursor: 'pointer'
    },
    onClick: () => onPick && onPick(p)
  }) : null), React.createElement("circle", {
    cx: x(pts.length - 1),
    cy: y(vals[vals.length - 1]),
    r: "2.6",
    fill: "#111"
  }));
}
function Home({
  s,
  set,
  go,
  openProject
}) {
  const info = useMemo(() => indexInfo(s.index.log, 30), [s.index.log]);
  const focus = s.projects.filter(p => p.status === 'focus');
  const today = todayISO();
  const tt = s.tasks.filter(t => t.date === today).slice(0, TODAY_MAX);
  const nd = nextDeadlineAcross(s);
  const [txt, setTxt] = useState('');
  const [pj, setPj] = useState((focus[0] || s.projects[0] || {}).id);
  function completeTask(id) {
    set(p => {
      const t = p.tasks.find(x => x.id === id);
      if (!t || t.done) return p;
      let np = {
        ...p,
        tasks: p.tasks.map(x => x.id === id ? {
          ...x,
          done: true,
          doneAt: new Date().toISOString()
        } : x)
      };
      const pr = projById(np, t.projectId);
      const w = np.weights;
      let amt = t.importance === 'high' ? w.taskHigh : w.taskMed;
      let ordinary = true;
      if (pr && pr.status === 'focus') {
        amt += w.focusBonus;
        ordinary = false;
      }
      if (ordinary) {
        amt = Math.max(0, Math.min(amt, w.dailyOrdinaryCap - ordinaryGainToday(np)));
      }
      if (pr) np = {
        ...np,
        projects: np.projects.map(x => x.id === pr.id ? {
          ...x,
          moveLog: [...(x.moveLog || []), {
            date: today,
            amt: 1
          }]
        } : x)
      };
      if (amt > 0) {
        np = bumpIndex(np, amt, `${t.text}${pr ? '（' + pr.name + '）' : ''}`);
        if (ordinary) {
          const lg = np.index.log;
          lg[lg.length - 1].events[lg[lg.length - 1].events.length - 1]._ord = true;
        }
      }
      return np;
    });
  }
  function addTask() {
    const v = txt.trim();
    if (!v) return;
    set(p => ({
      ...p,
      tasks: [...p.tasks, {
        id: uid(),
        text: v,
        projectId: pj,
        importance: 'med',
        date: today,
        done: false,
        doneAt: null
      }]
    }));
    setTxt('');
  }
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "kicker"
  }, fmtDate(today), "\uFF08", WD[parseISO(today).getDay()], "\uFF09"), React.createElement("button", {
    className: "btn-bare",
    onClick: () => go('settings')
  }, "\u2699")), React.createElement("div", {
    className: "idx-hero",
    onClick: () => go('index')
  }, React.createElement("div", {
    className: "kicker"
  }, "CAREER INDEX"), React.createElement("div", {
    className: "row",
    style: {
      alignItems: 'baseline',
      gap: 12,
      marginTop: 2
    }
  }, React.createElement("div", {
    className: "idx-now"
  }, info.now.toFixed(1)), React.createElement("div", {
    className: "idx-chg",
    style: {
      color: info.chg >= 0 ? 'var(--up)' : 'var(--down)'
    }
  }, info.arrow, " ", info.chg >= 0 ? '+' : '', info.pct.toFixed(1), "%")), React.createElement("div", {
    className: "xs"
  }, "\u76F4\u8FD130\u65E5\u3000", info.arrow === '↑' ? '上昇中' : info.arrow === '↓' ? '下降中' : '横ばい'), React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, React.createElement(IndexChart, {
    log: s.index.log,
    days: 30,
    h: 96
  }))), !s.tipsSeen && React.createElement("div", {
    className: "sec-line"
  }, React.createElement("div", {
    className: "sub"
  }, "\u6307\u6570\u306F\u300C\u682A\u4FA1\u300D\u3067\u306F\u306A\u304F ", React.createElement("b", null, "\u884C\u52D5\u306E\u6307\u6A19"), "\u30022030\u5E74\u306B\u52B9\u304F\u884C\u52D5\u3067\u4E0A\u304C\u308A\u3001\u91CD\u8981\u306A\u6D3B\u52D5\u304C\u6570\u65E5\u6B62\u307E\u308B\u3068\u7DE9\u304F\u4E0B\u304C\u308B\u3002 \u6570\u3092\u3053\u306A\u3057\u3066\u3082\u4E0A\u304C\u3089\u306A\u3044\u3002"), React.createElement("button", {
    className: "btn btn-sm",
    style: {
      marginTop: 8
    },
    onClick: () => set(p => ({
      ...p,
      tipsSeen: true
    }))
  }, "OK")), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "kicker"
  }, "CURRENT FOCUS"), React.createElement("button", {
    className: "btn-bare",
    onClick: () => go('projects')
  }, "\u5909\u66F4")), focus.length === 0 && React.createElement("div", {
    className: "sub",
    style: {
      marginTop: 6
    }
  }, "\u672A\u8A2D\u5B9A\u3002PROJECTS\u3067\u6700\u59273\u3064\u9078\u3076\u3002"), focus.map((p, i) => React.createElement("div", {
    key: p.id,
    className: "focus-row",
    onClick: () => openProject(p.id)
  }, React.createElement("span", {
    className: "num"
  }, i + 1), React.createElement("span", {
    style: {
      flex: 1,
      fontWeight: 700
    }
  }, p.name), React.createElement(Mom, {
    p: p
  })))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "TODAY"), React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, tt.length === 0 && React.createElement("div", {
    className: "sub"
  }, "\u4ECA\u65E5\u306E\u30BF\u30B9\u30AF\u306F\u672A\u8A2D\u5B9A\u3002"), tt.map(t => {
    const pr = projById(s, t.projectId);
    return React.createElement("div", {
      key: t.id,
      className: "chk"
    }, React.createElement("div", {
      className: `tick ${t.done ? 'on' : ''}`,
      onClick: () => completeTask(t.id)
    }, t.done ? '✓' : ''), React.createElement("div", {
      style: {
        flex: 1
      }
    }, React.createElement("div", {
      className: "chk-t",
      style: {
        textDecoration: t.done ? 'line-through' : 'none',
        color: t.done ? 'var(--sub)' : 'var(--ink)'
      }
    }, t.text), React.createElement("div", {
      className: "xs"
    }, pr ? pr.name : '—', "\u3000\u30FB\u3000\u91CD\u8981\u5EA6 ", t.importance === 'high' ? 'HIGH' : 'MED', "\u3000\u30FB\u3000\u6307\u6570 ", IMPACT[t.importance])), React.createElement("button", {
      className: "btn-bare",
      onClick: () => set(p => ({
        ...p,
        tasks: p.tasks.filter(x => x.id !== t.id)
      }))
    }, "\xD7"));
  })), React.createElement("div", {
    className: "row",
    style: {
      gap: 6,
      marginTop: 10
    }
  }, React.createElement("input", {
    className: "input",
    placeholder: "\u4ECA\u65E5\u3084\u308B\u3053\u3068",
    value: txt,
    onChange: e => setTxt(e.target.value)
  }), React.createElement("select", {
    className: "input",
    style: {
      width: 110
    },
    value: pj,
    onChange: e => setPj(e.target.value)
  }, s.projects.map(p => React.createElement("option", {
    key: p.id,
    value: p.id
  }, p.name))), React.createElement("button", {
    className: "btn btn-sm",
    onClick: addTask,
    disabled: !txt.trim()
  }, "\uFF0B"))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "NEXT DEADLINE"), nd ? React.createElement("div", {
    className: "row",
    style: {
      marginTop: 6,
      alignItems: 'baseline',
      gap: 10
    }
  }, React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14
    }
  }, nd.label), React.createElement("div", {
    className: "xs"
  }, nd.project)), React.createElement("div", {
    className: "num",
    style: {
      color: daysUntil(nd.date) <= 14 ? 'var(--down)' : 'var(--ink)'
    }
  }, daysUntil(nd.date) < 0 ? `${-daysUntil(nd.date)}日超` : `あと${daysUntil(nd.date)}日`)) : React.createElement("div", {
    className: "sub",
    style: {
      marginTop: 6
    }
  }, "\u8A2D\u5B9A\u306A\u3057")), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "PROJECT STATUS"), React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, s.projects.map(p => React.createElement("div", {
    key: p.id,
    className: "status-row",
    onClick: () => openProject(p.id)
  }, React.createElement("span", {
    style: {
      flex: 1
    }
  }, p.name, p.status === 'focus' && React.createElement("span", {
    className: "star"
  }, " \u2605")), React.createElement(Mom, {
    p: p
  }))))));
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
  const active = s.projects;
  const focusCount = active.filter(p => p.status === 'focus').length;
  const today = todayISO();
  const detail = sel && projById(s, sel);
  function toggleFocus(id) {
    set(p => {
      const pr = p.projects.find(x => x.id === id);
      if (pr.status !== 'focus' && p.projects.filter(x => x.status === 'focus').length >= FOCUS_MAX) {
        alert(`CURRENT FOCUS は最大 ${FOCUS_MAX} つ。先にどれかを外す。`);
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
  function bumpProgress(id, d) {
    set(p => {
      let np = {
        ...p,
        projects: p.projects.map(x => x.id === id ? {
          ...x,
          progress: clamp((x.progress || 0) + d, 0, 100),
          moveLog: [...(x.moveLog || []), {
            date: today,
            amt: 2
          }]
        } : x)
      };
      return bumpIndex(np, 1, `${projById(np, id).name} を前進`);
    });
  }
  function doneAction(id) {
    set(p => {
      const pr = p.projects.find(x => x.id === id);
      let np = {
        ...p,
        projects: p.projects.map(x => x.id === id ? {
          ...x,
          progress: clamp((x.progress || 0) + 5, 0, 100),
          moveLog: [...(x.moveLog || []), {
            date: today,
            amt: 2
          }]
        } : x)
      };
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
      let np = {
        ...p,
        projects: p.projects.map(x => x.id === pid ? {
          ...x,
          progress: clamp((x.progress || 0) + 12, 0, 100),
          moveLog: [...(x.moveLog || []), {
            date: today,
            amt: 6
          }],
          milestones: x.milestones.map(m => m.id === mid ? {
            ...m,
            done: true,
            doneAt: new Date().toISOString()
          } : m)
        } : x)
      };
      return bumpIndex(np, amt, `マイルストーン達成：${ms.label}（${pr.name}）`);
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
  function setDeadline(id, k, v) {
    set(p => ({
      ...p,
      projects: p.projects.map(x => x.id === id ? {
        ...x,
        nextDeadline: {
          ...(x.nextDeadline || {
            label: '',
            date: ''
          }),
          [k]: v
        }
      } : x)
    }));
  }
  function promoteIdea(idea, choice, sacrificeId) {
    set(p => {
      let np = {
        ...p
      };
      if (choice === 'end' && sacrificeId) np = {
        ...np,
        projects: np.projects.filter(x => x.id !== sacrificeId)
      };
      if (choice === 'reduce' && sacrificeId) np = {
        ...np,
        projects: np.projects.map(x => x.id === sacrificeId ? {
          ...x,
          status: 'active'
        } : x)
      };
      np = {
        ...np,
        projects: [...np.projects, {
          id: uid(),
          name: idea.text.slice(0, 20),
          outcome: 'career',
          goal: idea.text,
          nextAction: '最初の一歩を決める',
          nextDeadline: null,
          progress: 0,
          status: 'active',
          milestones: [],
          moveLog: []
        }],
        ideas: np.ideas.filter(x => x.id !== idea.id)
      };
      return np;
    });
    setPromo(null);
  }
  if (detail) {
    const p = detail;
    const m = momentum(p);
    return React.createElement("div", {
      className: "screen"
    }, React.createElement("button", {
      className: "btn-bare",
      onClick: () => setSel(null)
    }, "\u2039 PROJECTS"), React.createElement("div", {
      className: "display d-lg",
      style: {
        marginTop: 8
      }
    }, p.name), React.createElement("div", {
      className: "row",
      style: {
        gap: 8,
        marginTop: 6
      }
    }, React.createElement("span", {
      className: "tag"
    }, OUT_MAP[p.outcome] ? OUT_MAP[p.outcome].name : p.outcome), React.createElement("button", {
      className: `tag ${p.status === 'focus' ? 'tag-on' : ''}`,
      onClick: () => toggleFocus(p.id)
    }, p.status === 'focus' ? '★ FOCUS' : 'FOCUS にする')), React.createElement("div", {
      className: "sec"
    }, React.createElement("div", {
      className: "kicker"
    }, "GOAL"), React.createElement("textarea", {
      className: "textarea",
      style: {
        marginTop: 6
      },
      value: p.goal || '',
      onChange: e => setField(p.id, 'goal', e.target.value)
    })), React.createElement("div", {
      className: "sec"
    }, React.createElement("div", {
      className: "kicker"
    }, "NEXT DEADLINE"), React.createElement("input", {
      className: "input",
      style: {
        marginTop: 6
      },
      placeholder: "\u5185\u5BB9",
      value: (p.nextDeadline || {}).label || '',
      onChange: e => setDeadline(p.id, 'label', e.target.value)
    }), React.createElement("input", {
      className: "input",
      style: {
        marginTop: 6
      },
      placeholder: "YYYY-MM-DD",
      value: (p.nextDeadline || {}).date || '',
      onChange: e => setDeadline(p.id, 'date', e.target.value)
    }), (p.nextDeadline || {}).date && React.createElement("div", {
      className: "xs",
      style: {
        marginTop: 4
      }
    }, "\u3042\u3068 ", daysUntil(p.nextDeadline.date), "\u65E5")), React.createElement("div", {
      className: "sec"
    }, React.createElement("div", {
      className: "between"
    }, React.createElement("div", {
      className: "kicker"
    }, "PROGRESS"), React.createElement("div", {
      className: "num"
    }, p.progress || 0, "%\u3000", m.a, " ", m.l)), React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, React.createElement(Meter, {
      v: p.progress || 0
    })), React.createElement("div", {
      className: "xs",
      style: {
        marginTop: 4
      }
    }, m.note), React.createElement("div", {
      className: "row",
      style: {
        gap: 6,
        marginTop: 8
      }
    }, React.createElement("button", {
      className: "btn btn-sm",
      onClick: () => bumpProgress(p.id, 5)
    }, "\uFF0B5%"), React.createElement("button", {
      className: "btn btn-sm",
      onClick: () => bumpProgress(p.id, 10)
    }, "\uFF0B10%"))), React.createElement("div", {
      className: "sec"
    }, React.createElement("div", {
      className: "kicker"
    }, "NEXT ACTION"), React.createElement("input", {
      className: "input",
      style: {
        marginTop: 6
      },
      value: p.nextAction || '',
      onChange: e => setField(p.id, 'nextAction', e.target.value)
    }), React.createElement("button", {
      className: "btn btn-sm btn-fill",
      style: {
        marginTop: 8
      },
      onClick: () => doneAction(p.id)
    }, "\u3084\u3063\u305F\uFF08\u6307\u6570\u306B\u53CD\u6620\uFF09")), React.createElement("div", {
      className: "sec"
    }, React.createElement("div", {
      className: "kicker"
    }, "MILESTONES"), (p.milestones || []).map(ms => React.createElement("div", {
      key: ms.id,
      className: "chk"
    }, React.createElement("div", {
      className: `tick ${ms.done ? 'on' : ''}`,
      onClick: () => achieveMs(p.id, ms.id)
    }, ms.done ? '✓' : ''), React.createElement("div", {
      className: "chk-t",
      style: {
        textDecoration: ms.done ? 'line-through' : 'none',
        color: ms.done ? 'var(--sub)' : 'var(--ink)'
      }
    }, ms.label, " ", ms.big && React.createElement("span", {
      className: "xs"
    }, "\uFF08\u5927\uFF09")))), React.createElement("div", {
      className: "xs",
      style: {
        marginTop: 4
      }
    }, "\u9054\u6210\u3059\u308B\u3068\u6307\u6570\u304C\u5927\u304D\u304F\u4E0A\u304C\u308B\uFF08\u5927\uFF1D", s.weights.milestoneBig, " / \u901A\u5E38\uFF1D", s.weights.milestone, "\uFF09")), React.createElement("div", {
      className: "sec"
    }, React.createElement("div", {
      className: "kicker"
    }, "\u3053\u306EProject\u306E\u30BF\u30B9\u30AF"), s.tasks.filter(t => t.projectId === p.id && !t.done).map(t => React.createElement("div", {
      key: t.id,
      className: "rowline xs"
    }, "\u25A1 ", t.text)), s.tasks.filter(t => t.projectId === p.id && !t.done).length === 0 && React.createElement("div", {
      className: "sub",
      style: {
        marginTop: 6
      }
    }, "\u306A\u3057")));
  }
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "kicker"
  }, "PROJECTS"), React.createElement("div", {
    className: "sub",
    style: {
      marginTop: 4
    }
  }, "CURRENT FOCUS ", focusCount, "/", FOCUS_MAX, "\u3000\u30FB\u3000\u9032\u884C\u4E2D ", active.length, "/", PROJECT_MAX), React.createElement("div", {
    className: "sec"
  }, active.map(p => React.createElement("div", {
    key: p.id,
    className: "proj-row"
  }, React.createElement("button", {
    className: "star-btn",
    onClick: () => toggleFocus(p.id)
  }, p.status === 'focus' ? '★' : '☆'), React.createElement("div", {
    style: {
      flex: 1
    },
    onClick: () => openProject(p.id)
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, p.name), React.createElement(Mom, {
    p: p
  })), React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, React.createElement(Meter, {
    v: p.progress || 0
  })), React.createElement("div", {
    className: "xs",
    style: {
      marginTop: 3
    }
  }, p.progress || 0, "%\u3000", (p.nextDeadline || {}).date ? `／ 次の期限 あと${daysUntil(p.nextDeadline.date)}日` : ''))))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("div", {
    className: "kicker"
  }, "IDEA\uFF08\u3059\u3050Project\u306B\u3057\u306A\u3044\uFF09"), React.createElement("button", {
    className: "btn-bare",
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
    className: "task"
  }, React.createElement("div", {
    className: "t-title"
  }, idea.text), React.createElement("div", {
    className: "row wrap",
    style: {
      gap: 6,
      marginTop: 8
    }
  }, React.createElement("button", {
    className: "btn btn-sm",
    onClick: () => setPromo(idea)
  }, "Project\u306B\u6607\u683C"), React.createElement("button", {
    className: "btn-bare",
    onClick: () => set(p => ({
      ...p,
      ideas: p.ideas.filter(x => x.id !== idea.id)
    }))
  }, "\u6368\u3066\u308B")), promo && promo.id === idea.id && React.createElement(PromoteQ, {
    s: s,
    idea: idea,
    onDo: promoteIdea,
    onCancel: () => setPromo(null)
  })))));
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
    className: "textarea",
    value: v,
    onChange: e => setV(e.target.value),
    placeholder: "\u601D\u3044\u3064\u3044\u305F\u3053\u3068"
  }), React.createElement("button", {
    className: "btn btn-sm",
    style: {
      marginTop: 6
    },
    onClick: () => v.trim() && onAdd(v.trim()),
    disabled: !v.trim()
  }, "IDEA\u306B\u4FDD\u5B58"));
}
function PromoteQ({
  s,
  idea,
  onDo,
  onCancel
}) {
  const [choice, setChoice] = useState(null);
  const [sac, setSac] = useState('');
  return React.createElement("div", {
    className: "quit"
  }, React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14
    }
  }, "\u3053\u308C\u3092\u59CB\u3081\u308B\u306A\u3089\u3001\u4F55\u306E\u6642\u9593\u3092\u4F7F\u3046\uFF1F"), React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, [['reduce', '現在のProjectの時間を減らす'], ['free', '自由時間を使う'], ['end', '既存Projectを終了する']].map(([k, l]) => React.createElement("label", {
    key: k,
    className: "chk"
  }, React.createElement("input", {
    type: "radio",
    name: "pq",
    checked: choice === k,
    onChange: () => setChoice(k)
  }), React.createElement("span", {
    className: "chk-t"
  }, l))), (choice === 'reduce' || choice === 'end') && React.createElement("select", {
    className: "input",
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
  }, p.name)))), React.createElement("div", {
    className: "row",
    style: {
      gap: 6,
      marginTop: 10
    }
  }, React.createElement("button", {
    className: "btn btn-sm btn-fill",
    disabled: !choice || (choice === 'reduce' || choice === 'end') && !sac,
    onClick: () => onDo(idea, choice, sac)
  }, "\u6607\u683C\u3059\u308B"), React.createElement("button", {
    className: "btn-bare",
    onClick: onCancel
  }, "\u3084\u3081\u308B")));
}
function CareerMap({
  s,
  set,
  openProject
}) {
  const setOut = (k, v) => set(p => ({
    ...p,
    ideal: {
      ...p.ideal,
      outcomes: {
        ...p.ideal.outcomes,
        [k]: v
      }
    }
  }));
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "kicker"
  }, "CAREER MAP"), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "2030\u5E74\u306E\u7406\u60F3"), React.createElement("textarea", {
    className: "textarea",
    style: {
      marginTop: 6,
      fontSize: 15
    },
    value: s.ideal.headline,
    onChange: e => set(p => ({
      ...p,
      ideal: {
        ...p.ideal,
        headline: e.target.value
      }
    }))
  })), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u9054\u6210\u3057\u305F\u30444\u3064\u306E\u6210\u679C"), OUTCOMES.map(o => React.createElement("div", {
    key: o.id,
    style: {
      marginTop: 12
    }
  }, React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 13
    }
  }, o.name), React.createElement("textarea", {
    className: "textarea",
    style: {
      marginTop: 4
    },
    value: s.ideal.outcomes[o.id] || '',
    onChange: e => setOut(o.id, e.target.value)
  }), React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, s.projects.filter(p => p.outcome === o.id).map(p => React.createElement("div", {
    key: p.id,
    className: "map-proj",
    onClick: () => openProject(p.id)
  }, React.createElement("span", {
    style: {
      flex: 1
    }
  }, p.name), React.createElement("span", {
    className: "num xs"
  }, p.progress || 0, "%"), React.createElement(Mom, {
    p: p
  }))))))), React.createElement("div", {
    className: "sec-line"
  }, React.createElement("div", {
    className: "xs"
  }, "Project\u306E\u6210\u679C\u30AB\u30C6\u30B4\u30EA\u306FPROJECTS\u8A73\u7D30\u3067\u306F\u5909\u3048\u3089\u308C\u307E\u305B\u3093\uFF08\u3053\u306EMAP\u4E0A\u306E\u4E26\u3073\u3067\u7BA1\u7406\uFF09\u3002")));
}
function IndexScreen({
  s
}) {
  const [days, setDays] = useState(30);
  const [pick, setPick] = useState(null);
  const info = useMemo(() => indexInfo(s.index.log, days), [s.index.log, days]);
  const events = (s.index.log || []).filter(e => (e.events || []).length).slice().reverse();
  const RANGES = [[7, '7D'], [30, '30D'], [90, '3M'], [365, '1Y'], [99999, 'ALL']];
  return React.createElement("div", {
    className: "screen"
  }, React.createElement("div", {
    className: "kicker"
  }, "CAREER INDEX"), React.createElement("div", {
    className: "row",
    style: {
      alignItems: 'baseline',
      gap: 14,
      marginTop: 4
    }
  }, React.createElement("div", {
    className: "idx-now"
  }, info.now.toFixed(1)), React.createElement("div", {
    className: "idx-chg",
    style: {
      color: info.chg >= 0 ? 'var(--up)' : 'var(--down)'
    }
  }, info.arrow, " ", info.chg >= 0 ? '+' : '', info.pct.toFixed(1), "%")), React.createElement("div", {
    className: "xs"
  }, RANGES.find(r => r[0] === days)[1], " \u306E\u5909\u5316"), React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, React.createElement(IndexChart, {
    log: s.index.log,
    days: days,
    showDots: true,
    onPick: setPick,
    h: 150
  })), React.createElement("div", {
    className: "seg",
    style: {
      marginTop: 10
    }
  }, RANGES.map(([d, l]) => React.createElement("button", {
    key: d,
    className: days === d ? 'on' : '',
    onClick: () => setDays(d)
  }, l))), pick && React.createElement("div", {
    className: "quit"
  }, React.createElement("div", {
    className: "kicker"
  }, fmtFull(pick.date)), React.createElement("div", {
    className: "num",
    style: {
      marginTop: 4
    }
  }, r1(pick.value - pick.delta), " \u2192 ", pick.value, "\uFF08", pick.delta >= 0 ? '+' : '', pick.delta, "\uFF09"), React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, pick.events.map((e, i) => React.createElement("div", {
    key: i,
    className: "xs"
  }, "\u30FB", e.reason, "\uFF08", e.amt >= 0 ? '+' : '', e.amt, "\uFF09")))), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u306A\u305C\u52D5\u3044\u305F\u304B"), events.length === 0 && React.createElement("div", {
    className: "sub",
    style: {
      marginTop: 6
    }
  }, "\u307E\u3060\u8A18\u9332\u304C\u3042\u308A\u307E\u305B\u3093\u3002"), events.map((e, i) => React.createElement("div", {
    key: i,
    className: "rowline"
  }, React.createElement("div", {
    className: "between"
  }, React.createElement("span", {
    className: "xs num"
  }, fmtFull(e.date)), React.createElement("span", {
    className: "num xs",
    style: {
      color: e.delta >= 0 ? 'var(--up)' : 'var(--down)'
    }
  }, e.delta >= 0 ? '+' : '', e.delta, " \u2192 ", e.value)), e.events.map((x, j) => React.createElement("div", {
    key: j,
    className: "xs"
  }, "\u30FB", x.reason))))), React.createElement("div", {
    className: "sec-line"
  }, React.createElement("div", {
    className: "xs"
  }, "\u3053\u306E\u6570\u5024\u30FB\uFF05\u306F\u5E74\u53CE\u3084\u5C31\u8077\u53EF\u80FD\u6027\u3067\u306F\u306A\u304F\u3001\u300C\u8A2D\u5B9A\u3057\u305F\u30AD\u30E3\u30EA\u30A2\u76EE\u6A19\u306B\u5BFE\u3059\u308B\u81EA\u5206\u306E\u884C\u52D5\u91CF\u30FB\u9032\u6357\u306E\u5909\u5316\u300D\u3067\u3059\u3002")));
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
  function exportJSON() {
    const t = JSON.stringify(s);
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(() => alert('コピーしました'), () => prompt('コピー', t));else prompt('コピー', t);
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
    className: "between"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u8A2D\u5B9A"), React.createElement("button", {
    className: "btn-bare",
    onClick: () => go('home')
  }, "\u9589\u3058\u308B")), React.createElement("div", {
    className: "sec"
  }, React.createElement("div", {
    className: "kicker"
  }, "\u6307\u6570\u306E\u5909\u52D5\u5E45\uFF08\u8ABF\u6574\u53EF\uFF09"), React.createElement("div", {
    className: "grid2",
    style: {
      marginTop: 10
    }
  }, [['taskHigh', '重要タスク完了'], ['taskMed', '通常タスク完了'], ['focusBonus', 'FOCUS加算'], ['milestone', 'マイルストーン'], ['milestoneBig', 'マイルストーン(大)'], ['stall', '数日 進捗なし'], ['deadlineNoProgress', '締切近いのに進捗なし'], ['stallDays', '何日で下降開始'], ['deadlineWindow', '締切の警戒日数'], ['dailyOrdinaryCap', '通常タスクの日次上限']].map(([k, l]) => React.createElement("div", {
    className: "field",
    key: k
  }, React.createElement("label", null, l), React.createElement("input", {
    className: "input num",
    value: w[k],
    onChange: e => setW(k, e.target.value)
  }))))), React.createElement("div", {
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
  }, "\u30C7\u30FC\u30BF\u306F\u7AEF\u672B\u5185\u306E\u307F\u3002Safari\u3067\u300C\u30DB\u30FC\u30E0\u753B\u9762\u306B\u8FFD\u52A0\u300D\u3067\u30A2\u30D7\u30EA\u306B\u306A\u308A\u307E\u3059\u3002")));
}
function Nav({
  tab,
  go
}) {
  const items = [['home', 'ホーム'], ['projects', 'PROJECTS'], ['map', 'MAP'], ['index', '指数']];
  return React.createElement("div", {
    className: "nav"
  }, items.map(([id, label]) => React.createElement("button", {
    key: id,
    className: `nav-item ${tab === id || id === 'projects' && tab === 'projects' ? 'active' : ''}`,
    onClick: () => go(id)
  }, React.createElement("span", null, label))));
}
function App() {
  const [s, setS] = useState(() => ensureIndex(loadState()));
  const [tab, setTab] = useState('home');
  const [selProject, setSelProject] = useState(null);
  useEffect(() => {
    saveState(s);
  }, [s]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab, selProject]);
  const set = fn => setS(prev => typeof fn === 'function' ? fn(prev) : fn);
  const go = t => {
    setTab(t);
    if (t !== 'projects') setSelProject(null);
  };
  const openProject = id => {
    setSelProject(id);
    setTab('projects');
  };
  return React.createElement("div", null, tab === 'home' && React.createElement(Home, {
    s: s,
    set: set,
    go: go,
    openProject: openProject
  }), tab === 'projects' && React.createElement(Projects, {
    s: s,
    set: set,
    sel: selProject,
    setSel: setSelProject,
    openProject: openProject
  }), tab === 'map' && React.createElement(CareerMap, {
    s: s,
    set: set,
    openProject: openProject
  }), tab === 'index' && React.createElement(IndexScreen, {
    s: s
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