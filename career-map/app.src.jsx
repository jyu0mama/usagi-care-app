const { useState, useEffect, useMemo } = React;

/* ============================================================
   定数
   ============================================================ */
const KEY = 'careermap_v6';
const TODAY_MAX = 3;
const ROUTINE_MAX = 4;
const ACTIVE_PROJECT_MAX = 3;
const CONSISTENCY_TARGET_DAYS = 20; // 直近28日中の目標実行日数

/* 4つのキャリア資産領域（追補仕様 B） */
const ASSET_CATS = [
  { id: 'career', name: 'Career', jp: '継続力・行動力・主体性・挑戦力', emoji: '💼' },
  { id: 'global', name: 'Global', jp: '英語力・挑戦力・継続力', emoji: '🌏' },
  { id: 'research', name: 'Research', jp: '課題発見力・分析力・プレゼン力・改善力', emoji: '🔬' },
  { id: 'project', name: 'Project', jp: '企画力・発想力・巻き込み力・協働力・実行力', emoji: '🌿' },
];
const ASSET_CAT_MAP = Object.fromEntries(ASSET_CATS.map(a => [a.id, a]));

/* 職種プロファイル（本文 3.2）。Fit計算の重み（資産カテゴリごと） */
const ROLE_PROFILES = [
  { id: 'businessProduce', name: 'ビジネスプロデュース／企画', jp: '課題発見・企画・実行・チーム推進', weights: { career: 1.0, project: 0.9, global: 0.3, research: 0.4 } },
  { id: 'marketing', name: 'マーケティング／生活者理解', jp: '調査・分析・仮説・言語化', weights: { career: 0.7, project: 0.6, global: 0.3, research: 0.8 } },
  { id: 'creative', name: 'クリエイティブ', jp: '発想・表現・制作・改善', weights: { career: 0.6, project: 1.0, global: 0.2, research: 0.3 } },
  { id: 'media', name: 'メディア・コンテンツ', jp: '編集・企画・発信・運用', weights: { career: 0.7, project: 0.9, global: 0.3, research: 0.4 } },
  { id: 'global', name: 'グローバル', jp: '英語・異文化理解・発信', weights: { career: 0.5, project: 0.3, global: 1.0, research: 0.3 } },
  { id: 'research', name: 'BX/DX・研究', jp: 'テクノロジー・研究・社会実装', weights: { career: 0.5, project: 0.4, global: 0.3, research: 1.0 } },
];
const ROLE_MAP = Object.fromEntries(ROLE_PROFILES.map(r => [r.id, r]));

/* 就職準備レベル（本文 3.3）※ 採用確率・合格保証ではない */
const LEVELS = [
  { level: 0, name: '方向性を探索中', desc: '興味はあるが、重点職種・資産・完了条件が未設定' },
  { level: 1, name: '基礎を積み上げ中', desc: 'ルーティンを継続し、授業・学習タスクを完了している' },
  { level: 2, name: '応募準備中', desc: '関連プロジェクトを完了し、作品・研究・発表等の証拠がある' },
  { level: 3, name: '選考対応可能', desc: '志望職種に合わせたポートフォリオ、自己PR、面接材料を準備済み' },
  { level: 4, name: '第一候補接続', desc: '電通・博報堂の職種別イベント、インターン、応募等の具体的接点がある' },
  { level: 5, name: '実績で更新中', desc: '複数の外部成果・評価・選考経験をもとに、次の選択肢を更新できる' },
];

/* ============================================================
   ユーティリティ（日付はローカル基準）
   ============================================================ */
const uid = () => 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const WD = ['日', '月', '火', '水', '木', '金', '土'];
const MON3 = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const r1 = (n) => Math.round(n * 10) / 10;
const man = (n) => (n == null ? '—' : (Math.round(n / 10000)).toLocaleString() + '万');
const manD = (n) => (n >= 0 ? '+' : '−') + '¥' + Math.abs(Math.round(n / 10000)) + '万';

function pad2(n) { return String(n).padStart(2, '0'); }
function isoOf(d) { return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; }
function todayISO() { return isoOf(new Date()); }
function parseISO(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1); }
function addDaysISO(iso, n) { const d = parseISO(iso); d.setDate(d.getDate() + n); return isoOf(d); }
function fmtDate(iso) { const d = parseISO(iso); return `${d.getMonth() + 1}月${d.getDate()}日`; }
function fmtFull(iso) { const d = parseISO(iso); return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`; }
function daysUntil(iso) { return Math.round((parseISO(iso) - parseISO(todayISO())) / 86400000); }
function daysSinceDate(iso) { return Math.floor((parseISO(todayISO()) - parseISO(iso)) / 86400000); }

/* ============================================================
   初期データ（楠なづなさん専用｜追補仕様 A〜E）
   ============================================================ */
function seedProfile() {
  return {
    name: '楠なづな', school: '慶應義塾大学', faculty: '環境情報学部', grade: '学部1年',
    gradMonth: '2030-03', targetYear: 2030,
    location: '東京', minSalary: 300000,
    longtermIncome: 10000000, longtermAge: '30代前半',
    globalOption: true, lifeGoal: '本・趣味に使える余裕、Jeep',
    baseIncome: 4000000, targetIncome: 8500000,
    primaryRoleId: 'businessProduce', secondaryRoleIds: ['global', 'research'],
    wake: '07:00', sleep: '24:00', classHours: 6, partTimeHours: 0,
  };
}
function seedTargetProfiles() {
  return [
    { id: uid(), company: '電通', role: 'ビジネスプロデュース／総合職', location: '東京', priority: 'primary',
      requiredAssetWeights: { career: 1.0, project: 0.7, global: 0.4, research: 0.3 },
      referenceUrl: 'https://www.career.dentsu.jp/recruit/2028/', lastCheckedAt: null },
    { id: uid(), company: '博報堂', role: '総合職（職種別コース）', location: '東京', priority: 'primary',
      requiredAssetWeights: { career: 1.0, project: 0.7, global: 0.4, research: 0.3 },
      referenceUrl: 'https://hakusuku.jp/recruit/', lastCheckedAt: null },
    { id: uid(), company: 'コンサルティングファーム', role: '未定', location: '東京', priority: 'secondary',
      requiredAssetWeights: { career: 0.9, project: 0.4, global: 0.5, research: 0.6 }, referenceUrl: '', lastCheckedAt: null },
    { id: uid(), company: '商社', role: '未定', location: '東京', priority: 'secondary',
      requiredAssetWeights: { career: 0.8, project: 0.4, global: 0.9, research: 0.2 }, referenceUrl: '', lastCheckedAt: null },
  ];
}
function seedCareerAssets() {
  return ASSET_CATS.map(c => ({ id: c.id, name: c.name, jp: c.jp, category: c.id, score: c.id === 'career' ? 28 : c.id === 'global' ? 22 : c.id === 'research' ? 30 : 32, completedCount: 0 }));
}
function seedProjects() {
  return [
    { id: uid(), title: '自然環境音研究', emoji: '🔬', category: 'research', status: 'active',
      purpose: '愛媛県森の国バレーでの自然環境音研究を完遂する。', completionDefinition: '論文執筆、可能なら学会発表まで完了する。',
      assetIds: ['research'], dueDate: null },
    { id: uid(), title: '里山再生型観光（南部町馬佐良）', emoji: '🌿', category: 'project', status: 'active',
      purpose: '里山再生型観光を継続し、組織化・事業化する。', completionDefinition: '慶應公認団体化、運営が自走、事業として継続する状態。',
      assetIds: ['project', 'career'], dueDate: null },
    { id: uid(), title: '交換留学', emoji: '✈️', category: 'global', status: 'active',
      purpose: '2028年からの交換留学と、海外キャリアの選択肢を得る。', completionDefinition: '出願〜留学決定〜渡航まで完了する。',
      assetIds: ['global'], dueDate: '2028-07-01' },
  ];
}
/* Task: layer = mustdo | routine | inbox | today(単発adhoc) */
function seedTasks() {
  const T = (o) => ({ id: uid(), state: 'active', projectId: null, dueDate: null, estimatedMinutes: null, assetIds: [], note: '', createdAt: new Date().toISOString(), ...o });
  const list = [];
  /* ── ルーティン（追補仕様 C）：通常/短縮の2モード、休むも可 ── */
  list.push(T({ title: 'TOEFLに向けた勉強', layer: 'routine', assetIds: ['global'], routineRule: { normal: 30, short: 10 }, note: '交換留学の出願資格と英語力。指定した学習メニューを実施し、学習記録を保存。' }));
  list.push(T({ title: 'コピーライティング練習', layer: 'routine', assetIds: ['project'], routineRule: { normal: 20, short: 5 }, note: '企画力・発想力・言語化力。1本のコピーを書き、良かった点・改善点を1つ記録。' }));
  list.push(T({ title: 'ISP勉強', layer: 'routine', assetIds: ['career'], routineRule: { normal: 30, short: 10 }, note: '大学・専門領域の基礎力。指定範囲を学習し、理解度または疑問点を記録。' }));

  /* ── Must Do（追補仕様 D、代表的なマイルストーンの抜粋）── */
  const proj = (title) => (p) => p; // placeholder, resolved after projects created in defaultState()
  list.push(T({ title: 'TOEFL 過去問で現状把握（自宅で実施）', layer: 'mustdo', dueDate: '2026-09-07', estimatedMinutes: 90, assetIds: ['global'],
    note: '自宅受験型・TOEIC・英検は出願資格の判定対象にしない、という留学プロジェクトの制約あり。' }));
  list.push(T({ title: '博報堂 冬インターン 申込み', layer: 'mustdo', dueDate: '2026-10-02', estimatedMinutes: 60, assetIds: ['career'],
    note: '応募完了まではCareer Valueに加算しない。応募完了後に「応募を完了した」を記録する。' }));
  list.push(T({ title: '秋学期 定期試験対策', layer: 'mustdo', dueDate: '2026-12-15', estimatedMinutes: 180, assetIds: ['career'], note: '締切のある学業タスクとして最優先。' }));
  list.push(T({ title: 'GPA 2.00以上を確認（秋学期成績確定）', layer: 'mustdo', dueDate: '2027-01-31', estimatedMinutes: 30, assetIds: ['career'], note: '累積GPA 2.00以上を最低条件として登録。上位協定校の条件は学校別に別タスク化する。' }));
  list.push(T({ title: '親との資金相談・奨学金候補リストアップ', layer: 'mustdo', dueDate: '2026-10-31', estimatedMinutes: 60, assetIds: ['global'], note: '' }));
  list.push(T({ title: '協定校別 募集要項の確認・GPA/語学条件の比較', layer: 'mustdo', dueDate: '2027-03-31', estimatedMinutes: 90, assetIds: ['global'], note: '学事担当窓口への確認、単位認定・ゼミ選考の確認を含む。' }));
  list.push(T({ title: 'サマーインターン：自己分析・ガクチカ・ES準備', layer: 'mustdo', dueDate: '2027-05-31', estimatedMinutes: 120, assetIds: ['career'], note: '留学タスクと就活タスクは別Projectで管理する。' }));
  list.push(T({ title: '出願用 公式英語スコアレポート準備', layer: 'mustdo', dueDate: '2027-06-30', estimatedMinutes: 60, assetIds: ['global'], note: '出願締切の3か月前までに用意する。' }));
  list.push(T({ title: '留学フェア参加・エッセイ下書き（動機／努力／キャリア接続）', layer: 'mustdo', dueDate: '2027-08-15', estimatedMinutes: 240, assetIds: ['global'], note: '日本語800字程度・留学先使用言語500words程度。3チェック項目を満たして完了。' }));
  list.push(T({ title: '成績証明書・語学証明書・誓約書のPDF化', layer: 'mustdo', dueDate: '2027-08-31', estimatedMinutes: 60, assetIds: ['global'], note: '' }));
  list.push(T({ title: '学内選考 出願', layer: 'mustdo', dueDate: '2027-09-15', estimatedMinutes: 90, assetIds: ['global'], note: '' }));
  list.push(T({ title: '博報堂 本選考 応募（ES提出）', layer: 'mustdo', dueDate: '2027-10-31', estimatedMinutes: 120, assetIds: ['career'], note: '応募・適性検査・面接・参加・振り返りは別々に完了記録する。' }));
  list.push(T({ title: '学内選考 結果確認', layer: 'mustdo', dueDate: '2027-11-30', estimatedMinutes: 15, assetIds: ['global'], note: '' }));
  list.push(T({ title: '留学先への本出願・ビザ申請・宿舎確保', layer: 'mustdo', dueDate: '2028-05-31', estimatedMinutes: 180, assetIds: ['global'], note: '候補生オリエンテーション、異文化理解講座、保険・危機管理サポート、残高証明書を含む。' }));

  return list;
}
/* 過去の活動（追補仕様 E）：仮登録として表示のみ。スコアには自動加算しない */
function seedPastActivities() {
  return [
    { id: uid(), title: 'リザプロ 学生インターン', state: '継続中', note: '期間・担当・具体的な成果・役割を、証拠として追記すると確定実績にできます。' },
    { id: uid(), title: 'ネイチャープレナー ジャパン フェロー', state: '継続中', note: '採択記録・活動内容・学びを追記すると確定実績にできます。' },
    { id: uid(), title: 'YAMAHA発動機 リジェラボ登壇', state: '完了候補', note: '登壇日・役割・資料・振り返りを追記すると完了記録にできます。' },
    { id: uid(), title: '愛媛県 森の国バレー 自然環境音研究', state: '進行中', note: '「自然環境音研究」プロジェクトに接続済み。調査記録・分析・発表を進めてください。' },
    { id: uid(), title: '南部町 馬佐良 里山再生型観光', state: '進行中', note: '「里山再生型観光」プロジェクトに接続済み。現地活動・協力者・企画・継続運営を進めてください。' },
  ];
}

function defaultState() {
  const profile = seedProfile();
  const targetProfiles = seedTargetProfiles();
  const careerAssets = seedCareerAssets();
  const projects = seedProjects();
  const tasks = seedTasks();
  return {
    version: 6,
    onboarded: false, onboardStep: 1,
    profile, targetProfiles, careerAssets, projects, tasks,
    actionLogs: [],
    evidence: [],
    dailyPlans: {}, // date -> { todayTaskIds:[], routineChoices:{taskId:'normal'|'short'|'rest'} }
    weeklyReviews: [],
    careerSnapshots: [],
    pastActivities: seedPastActivities(),
    lastSeenDate: todayISO(),
  };
}

/* ============================================================
   保存 / 読込 / エクスポート
   ============================================================ */
function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw);
    if (!s || s.version !== 6) return defaultState();
    const d = defaultState();
    return { ...d, ...s,
      profile: { ...d.profile, ...(s.profile || {}) },
      dailyPlans: { ...(s.dailyPlans || {}) },
    };
  } catch (e) { return defaultState(); }
}
function saveState(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

/* ============================================================
   Task / DailyPlan ヘルパー
   ============================================================ */
function taskById(s, id) { return (s.tasks || []).find(t => t.id === id); }
function projById(s, id) { return (s.projects || []).find(p => p.id === id); }
function mustDoTasks(s) { return s.tasks.filter(t => t.layer === 'mustdo' && t.state === 'active').sort((a, b) => (a.dueDate || '9999').localeCompare(b.dueDate || '9999')); }
function routineTasks(s) { return s.tasks.filter(t => t.layer === 'routine' && t.state === 'active').slice(0, ROUTINE_MAX); }
function inboxTasks(s) { return s.tasks.filter(t => t.layer === 'inbox' && t.state === 'active'); }
function planFor(s, date) { return s.dailyPlans[date] || { todayTaskIds: [], routineChoices: {} }; }
function todayTasks(s, date) {
  const plan = planFor(s, date);
  return plan.todayTaskIds.map(id => taskById(s, id)).filter(Boolean);
}
function ensureTodayPlan(s) {
  const t = todayISO();
  if (s.lastSeenDate === t && s.dailyPlans[t]) return s;
  // 日が変わったら Today 選択は空に戻す（AC-07：自動繰り越ししない）。Must Do はそのまま残る。
  return { ...s, lastSeenDate: t, dailyPlans: { ...s.dailyPlans, [t]: s.dailyPlans[t] || { todayTaskIds: [], routineChoices: {} } } };
}
function isRoutineDoneToday(s, taskId, date) {
  return (s.actionLogs || []).some(l => l.taskId === taskId && l.date === date && l.completionLevel !== 'missed');
}

/* 優先度スコア（9.1）：Today候補の並び替えに使用 */
function priorityOf(t) {
  const urgency = t.dueDate ? clamp(1 - clamp(daysUntil(t.dueDate), 0, 60) / 60, 0, 1) : 0.2;
  const importance = t.layer === 'mustdo' ? 0.8 : 0.5;
  const feasibility = t.estimatedMinutes ? clamp(1 - t.estimatedMinutes / 180, 0, 1) : 0.6;
  return 0.45 * urgency + 0.35 * importance + 0.20 * feasibility;
}

/* ============================================================
   完了記録（ActionLog）／ キャリア資産の更新
   ============================================================ */
const LEVEL_PORTION = { done: 1, partial: 0.5, missed: 0 };
function completeTask(s, taskId, level, opts) {
  opts = opts || {};
  const date = todayISO();
  const t = taskById(s, taskId);
  if (!t) return s;
  const portion = level === 'partial' ? (opts.partialPct || 50) / 100 : LEVEL_PORTION[level];
  const log = { id: uid(), taskId, date, completionLevel: level, partialPct: level === 'partial' ? (opts.partialPct || 50) : null,
    actualMinutes: opts.actualMinutes || null, note: opts.note || '', createdAt: new Date().toISOString() };

  // 同一タスク・同一日は1件に統合（二重加算防止）。より高い実行レベルを採用。
  const rank = { done: 2, partial: 1, missed: 0 };
  const existingIdx = s.actionLogs.findIndex(l => l.taskId === taskId && l.date === date);
  let actionLogs = [...s.actionLogs];
  if (existingIdx >= 0) {
    if (rank[level] >= rank[actionLogs[existingIdx].completionLevel]) actionLogs[existingIdx] = log;
  } else {
    actionLogs = [log, ...actionLogs];
  }

  // 「実行できなかった」は資産に反映しない（AC-04：年収を減額しない）
  let careerAssets = s.careerAssets;
  if (portion > 0 && (t.assetIds || []).length) {
    careerAssets = s.careerAssets.map(a => {
      if (!t.assetIds.includes(a.id)) return a;
      const gain = 1.4 * portion * (1 - a.score / 130); // 逓減
      return { ...a, score: clamp(r1(a.score + gain), 0, 100), completedCount: level === 'done' ? a.completedCount + 1 : a.completedCount };
    });
  }

  // 完了扱いの Must Do / Inbox発 単発タスクはアーカイブ（一覧から消す）。ルーティンは毎日残す。
  let tasks = s.tasks;
  if (level === 'done' && (t.layer === 'mustdo' || t.layer === 'inbox')) {
    tasks = s.tasks.map(x => x.id === taskId ? { ...x, state: 'archived' } : x);
  }

  let ns = { ...s, actionLogs, careerAssets, tasks };
  ns = pushCareerSnapshot(ns, buildReasons(ns, t, level, portion));
  return ns;
}

/* ============================================================
   キャリア株価スコア（本文 4.1 / 4.2）
   ============================================================ */
function completion28d(s) {
  const cut = addDaysISO(todayISO(), -28);
  let planned = 0, done = 0;
  Object.entries(s.dailyPlans).forEach(([date, plan]) => {
    if (date < cut) return;
    const ids = new Set([...(plan.todayTaskIds || []), ...Object.keys(plan.routineChoices || {}).filter(k => plan.routineChoices[k] !== 'rest')]);
    ids.forEach(taskId => {
      planned += 1;
      const log = s.actionLogs.find(l => l.taskId === taskId && l.date === date);
      if (log && log.completionLevel !== 'missed') done += (log.completionLevel === 'done' ? 1 : 0.5);
    });
  });
  return planned ? clamp(done / planned, 0, 1) : 0;
}
function consistency28d(s) {
  const cut = addDaysISO(todayISO(), -28);
  const days = new Set(s.actionLogs.filter(l => l.date >= cut && l.completionLevel !== 'missed').map(l => l.date));
  return clamp(days.size / CONSISTENCY_TARGET_DAYS, 0, 1);
}
function fitScore(s) {
  const role = ROLE_MAP[s.profile.primaryRoleId] || ROLE_PROFILES[0];
  let num = 0, den = 0;
  s.careerAssets.forEach(a => { const w = role.weights[a.category] || 0; num += (a.score / 100) * w; den += w; });
  return den ? clamp(num / den, 0, 1) : 0;
}
function evidenceScore(s) {
  const verified = (s.evidence || []).filter(e => e.verified).length;
  return clamp(verified / 6, 0, 1);
}
function careerScoreOf(s) {
  const completion = completion28d(s), consistency = consistency28d(s), fit = fitScore(s), evidence = evidenceScore(s);
  const score = 100 * (0.40 * completion + 0.25 * consistency + 0.20 * fit + 0.15 * evidence);
  return { score: clamp(score, 0, 100), completion, consistency, fit, evidence };
}
function incomeFromScore(s, score) {
  const { baseIncome, targetIncome } = s.profile;
  if (baseIncome == null || targetIncome == null) return null;
  const center = baseIncome + (targetIncome - baseIncome) * score / 100;
  const confidence = 30 + 0.70 * score;
  const rangeWidth = Math.max(300000, 2000000 - 12000 * confidence);
  return { center, lower: center - rangeWidth / 2, upper: center + rangeWidth / 2, confidence };
}
function levelOf(s, breakdown) {
  const evidenceVerified = (s.evidence || []).filter(e => e.verified);
  const hasPrimaryContact = evidenceVerified.some(e => e.type === 'primary_contact');
  const hasPortfolio = evidenceVerified.some(e => e.type === 'portfolio' || e.type === 'self_pr');
  const completedProjects = s.projects.filter(p => p.status === 'completed').length;
  let level = 0;
  if (s.profile.primaryRoleId && s.careerAssets.some(a => a.completedCount > 0)) level = 1;
  if (breakdown.consistency >= 0.5 && breakdown.completion >= 0.3) level = Math.max(level, 1);
  if (completedProjects >= 1 || evidenceVerified.length >= 2) level = Math.max(level, 2);
  if (hasPortfolio) level = Math.max(level, 3);
  if (hasPrimaryContact) level = Math.max(level, 4);
  if (evidenceVerified.length >= 6) level = Math.max(level, 5);
  return { ...LEVELS[level], progressToNext: level < 5 ? Math.round(clamp(breakdown.score - level * 20, 0, 20) / 20 * 100) : 100 };
}
function buildReasons(s, task, level, portion) {
  if (portion <= 0) return [];
  const reasons = [];
  reasons.push(`${task.title} を${level === 'done' ? '完了' : '一部完了'}`);
  const cut = addDaysISO(todayISO(), -7);
  const days7 = new Set(s.actionLogs.filter(l => l.date >= cut && l.completionLevel !== 'missed').map(l => l.date)).size;
  if (days7 >= 2) reasons.push(`直近7日で${days7}日実行`);
  if (task.layer === 'routine') reasons.push('ルーティンを継続');
  return reasons.slice(0, 3);
}
function pushCareerSnapshot(s, reasons) {
  const b = careerScoreOf(s);
  // 日次の変化は「当日の完了による小幅な変動」に限定する（本文 4.2）。
  // 生スコア（比率ベース）へ一気に飛ばず、直近スナップショットから緩やかに近づける。
  const prevScore = s.careerSnapshots.length ? s.careerSnapshots[s.careerSnapshots.length - 1].score : b.score;
  const alpha = 0.18;
  const score = clamp(r1(prevScore + (b.score - prevScore) * alpha), 0, 100);
  const level = levelOf(s, { ...b, score });
  const inc = incomeFromScore(s, score);
  const date = todayISO();
  const snap = { date, score, centerIncome: inc ? Math.round(inc.center) : null, lower: inc ? Math.round(inc.lower) : null, upper: inc ? Math.round(inc.upper) : null, level: level.level, reasons: reasons || [] };
  const list = [...s.careerSnapshots];
  const idx = list.findIndex(x => x.date === date);
  if (idx >= 0) list[idx] = { ...list[idx], ...snap, reasons: [...(reasons || []), ...list[idx].reasons].slice(0, 3) };
  else list.push(snap);
  return { ...s, careerSnapshots: list.slice(-800) };
}
function ensureSnapshotToday(s) {
  const date = todayISO();
  if (s.careerSnapshots.some(x => x.date === date)) return s;
  return pushCareerSnapshot(s, []);
}
function snapshotChange(list, days) {
  if (!list.length) return { chg: 0, pct: 0 };
  const cut = addDaysISO(todayISO(), -days);
  const past = [...list].reverse().find(x => x.date <= cut) || list[0];
  const now = list[list.length - 1];
  const chg = (now.centerIncome || 0) - (past.centerIncome || 0);
  const pct = past.centerIncome ? (chg / past.centerIncome) * 100 : 0;
  return { chg, pct };
}

/* ============================================================
   休息時間（本文 6）
   ============================================================ */
function minutesBetween(a, b) {
  const [ah, am] = a.split(':').map(Number), [bh, bm] = b.split(':').map(Number);
  let start = ah * 60 + am, end = bh * 60 + bm;
  if (end <= start) end += 24 * 60;
  return end - start;
}
function restBudget(s, date) {
  const available = minutesBetween(s.profile.wake || '07:00', s.profile.sleep || '24:00') - (s.profile.classHours || 0) * 60 - (s.profile.partTimeHours || 0) * 60;
  const plan = planFor(s, date);
  const mustToday = todayTasks(s, date).reduce((sum, t) => sum + (t.estimatedMinutes || 30), 0);
  const routineMin = routineTasks(s).reduce((sum, t) => {
    const mode = plan.routineChoices[t.id];
    if (mode === 'rest' || !mode) return sum;
    return sum + (mode === 'short' ? t.routineRule.short : t.routineRule.normal);
  }, 0);
  const workload = mustToday + routineMin;
  const buffer = available * 0.15;
  const recommendedRest = Math.max(0, available - workload - buffer);
  const overloaded = available - workload - buffer < 0;
  return { available: Math.max(0, available), workload, buffer: Math.max(0, buffer), recommendedRest, overloaded };
}

/* ============================================================
   共通パーツ
   ============================================================ */
function Bar({ v }) { return <div className="bar"><span style={{ width: clamp(v, 0, 100) + '%' }} /></div>; }
function fmtMin(m) { if (m == null) return '—'; const h = Math.floor(m / 60), mm = m % 60; return h ? `${h}時間${mm ? mm + '分' : ''}` : `${mm}分`; }

function ValueChart({ log, days, h }) {
  const cut = addDaysISO(todayISO(), -days);
  const win = log.filter(e => e.date >= cut);
  const pts = win.length >= 2 ? win : (log.length ? [{ date: addDaysISO(log[0].date, -1), centerIncome: log[0].centerIncome }, ...log] : []);
  if (pts.length < 2) return <div className="sub">記録が増えるとグラフが出ます。</div>;
  const vals = pts.map(p => p.centerIncome || 0);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const pad = (hi - lo || 200000) * 0.2;
  const mn = lo - pad, mx = hi + pad, rng = mx - mn || 1;
  const W = 320, HT = h || 110;
  const x = (i) => (i / (pts.length - 1)) * W;
  const y = (v) => HT - ((v - mn) / rng) * HT;
  const line = pts.map((p, i) => `${x(i).toFixed(1)},${y(p.centerIncome || 0).toFixed(1)}`).join(' ');
  const area = `0,${HT} ${line} ${W},${HT}`;
  const up = vals[vals.length - 1] >= vals[0];
  const col = up ? 'var(--up)' : 'var(--down)';
  return (
    <svg viewBox={`0 0 ${W} ${HT + 4}`} width="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs><linearGradient id="cvg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={col} stopOpacity="0.16" /><stop offset="1" stopColor={col} stopOpacity="0" /></linearGradient></defs>
      <polygon points={area} fill="url(#cvg)" />
      <polyline points={line} fill="none" stroke={col} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(pts.length - 1)} cy={y(vals[vals.length - 1])} r="3" fill={col} />
    </svg>
  );
}

/* Done ボタン共通の完了記録シート */
function CompleteSheet({ task, onDone, onClose }) {
  const [level, setLevel] = useState(null);
  const [pct, setPct] = useState(50);
  const [mins, setMins] = useState(task.estimatedMinutes || null);
  return (
    <div className="sheet" onClick={e => { if (e.target.className === 'sheet') onClose(); }}>
      <div className="sheet-in">
        <div className="between"><div className="h2">記録する</div><button className="x" onClick={onClose}>✕</button></div>
        <div className="sub" style={{ marginTop: 4 }}>{task.title}</div>
        <div className="chips" style={{ marginTop: 12 }}>
          {[['done', '完了'], ['partial', '一部完了'], ['missed', '実行できなかった']].map(([k, l]) => (
            <button key={k} className={`chip ${level === k ? 'on' : ''}`} onClick={() => setLevel(k)}>{l}</button>
          ))}
        </div>
        {level === 'partial' && (
          <>
            <div className="lbl" style={{ marginTop: 10 }}>どこまで</div>
            <div className="chips">{[25, 50, 75].map(p => <button key={p} className={`chip ${pct === p ? 'on' : ''}`} onClick={() => setPct(p)}>{p}%</button>)}</div>
          </>
        )}
        {level === 'missed' && <div className="hint" style={{ marginTop: 10 }}>年収は下がりません。休息・再計画の参考にだけ使います。</div>}
        <button className="btn btn-fill btn-block" style={{ marginTop: 14 }} disabled={!level} onClick={() => onDone(level, { partialPct: pct, actualMinutes: mins })}>保存</button>
      </div>
    </div>
  );
}

/* ============================================================
   オンボーディング（本文 F）
   ============================================================ */
function Onboarding({ s, set }) {
  const step = s.onboardStep || 1;
  const setP = (k, v) => set(p => ({ ...p, profile: { ...p.profile, [k]: v } }));
  const next = () => set(p => ({ ...p, onboardStep: step + 1 }));
  const prev = () => set(p => ({ ...p, onboardStep: Math.max(1, step - 1) }));
  const finish = () => set(p => ({ ...p, onboarded: true }));
  const [todaySel, setTodaySel] = useState([]);

  return (
    <div className="screen">
      <div className="lbl">はじめに（{step}/6）</div>
      {step === 1 && (
        <div className="card" style={{ marginTop: 10 }}>
          <div className="h2">2030年の理想</div>
          <div className="grid2" style={{ marginTop: 10 }}>
            <div className="fld"><label>卒業予定</label><input className="in" value={s.profile.gradMonth} onChange={e => setP('gradMonth', e.target.value)} /></div>
            <div className="fld"><label>就職地</label><input className="in" value={s.profile.location} onChange={e => setP('location', e.target.value)} /></div>
            <div className="fld"><label>初任給の希望（円/月）</label><input className="in" value={s.profile.minSalary} onChange={e => setP('minSalary', Number(e.target.value) || 0)} /></div>
            <div className="fld"><label>中長期目標（円）</label><input className="in" value={s.profile.longtermIncome} onChange={e => setP('longtermIncome', Number(e.target.value) || 0)} /></div>
            <div className="fld"><label>現在の基準年収（円）</label><input className="in" value={s.profile.baseIncome} onChange={e => setP('baseIncome', Number(e.target.value) || 0)} /></div>
            <div className="fld"><label>2030 目標年収（円）</label><input className="in" value={s.profile.targetIncome} onChange={e => setP('targetIncome', Number(e.target.value) || 0)} /></div>
          </div>
          <div className="fld" style={{ marginTop: 6 }}><label>暮らしの目標</label><input className="in" value={s.profile.lifeGoal} onChange={e => setP('lifeGoal', e.target.value)} /></div>
          <div className="hint">年収は採用結果や実際の給与を保証するものではなく、行動を続けるための参考指標です。未定でも仮の値で進められます。</div>
        </div>
      )}
      {step === 2 && (
        <div className="card" style={{ marginTop: 10 }}>
          <div className="h2">電通・博報堂と職種プロファイル</div>
          <div className="sub" style={{ marginTop: 4 }}>第一候補の職種プロファイルを1つ選んでください。</div>
          <div className="chips" style={{ marginTop: 8 }}>
            {ROLE_PROFILES.map(r => <button key={r.id} className={`chip ${s.profile.primaryRoleId === r.id ? 'on' : ''}`} onClick={() => setP('primaryRoleId', r.id)}>{r.name}</button>)}
          </div>
          <div className="sub" style={{ marginTop: 10 }}>その他候補（最大2つ）</div>
          <div className="chips" style={{ marginTop: 6 }}>
            {ROLE_PROFILES.filter(r => r.id !== s.profile.primaryRoleId).map(r => {
              const on = (s.profile.secondaryRoleIds || []).includes(r.id);
              return <button key={r.id} className={`chip ${on ? 'on' : ''}`} onClick={() => {
                const cur = s.profile.secondaryRoleIds || [];
                const next2 = on ? cur.filter(x => x !== r.id) : (cur.length < 2 ? [...cur, r.id] : cur);
                setP('secondaryRoleIds', next2);
              }}>{r.name}</button>;
            })}
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="card" style={{ marginTop: 10 }}>
          <div className="h2">TOEFL・コピー・ISPのルーティン</div>
          {routineTasks(s).map(rt => (
            <div key={rt.id} className="todo" style={{ alignItems: 'center' }}>
              <div style={{ flex: 1 }}><div className="tt">{rt.title}</div><div className="ts">通常{rt.routineRule.normal}分／短縮{rt.routineRule.short}分</div></div>
            </div>
          ))}
          <div className="hint">授業・締切・体調で負荷が高い日は「通常版／短縮版／休む」を選べます。</div>
        </div>
      )}
      {step === 4 && (
        <div className="card" style={{ marginTop: 10 }}>
          <div className="h2">留学・就活ロードマップ</div>
          {mustDoTasks(s).slice(0, 5).map(t => (
            <div key={t.id} className="dl">
              <div className="dl-m">{t.dueDate ? `${MON3[parseISO(t.dueDate).getMonth()]} ${parseISO(t.dueDate).getDate()}` : '—'}</div>
              <div style={{ flex: 1 }}><div className="dl-t">{t.title}</div></div>
            </div>
          ))}
          <div className="hint">未来の予定は「計画」です。今日のタスクへは自動で入りません。</div>
        </div>
      )}
      {step === 5 && (
        <div className="card" style={{ marginTop: 10 }}>
          <div className="h2">今日の計画</div>
          <div className="sub" style={{ marginTop: 4 }}>まずは短縮版のルーティンから、今日やる分を選んでください（最大3件）。</div>
          <div className="chips" style={{ marginTop: 8 }}>
            {routineTasks(s).map(rt => (
              <button key={rt.id} className={`chip ${todaySel.includes(rt.id) ? 'on' : ''}`}
                onClick={() => setTodaySel(cur => cur.includes(rt.id) ? cur.filter(x => x !== rt.id) : (cur.length < TODAY_MAX ? [...cur, rt.id] : cur))}>
                {rt.title}（短縮{rt.routineRule.short}分）
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 6 && (
        <div className="card" style={{ marginTop: 10 }}>
          <div className="h2">休息時間</div>
          <div className="grid2" style={{ marginTop: 10 }}>
            <div className="fld"><label>起床</label><input className="in" value={s.profile.wake} onChange={e => setP('wake', e.target.value)} /></div>
            <div className="fld"><label>就寝</label><input className="in" value={s.profile.sleep} onChange={e => setP('sleep', e.target.value)} /></div>
            <div className="fld"><label>授業（時間/日）</label><input className="in" value={s.profile.classHours} onChange={e => setP('classHours', Number(e.target.value) || 0)} /></div>
            <div className="fld"><label>アルバイト（時間/日）</label><input className="in" value={s.profile.partTimeHours} onChange={e => setP('partTimeHours', Number(e.target.value) || 0)} /></div>
          </div>
          <div className="hint">断定はしません。「今日の計画上、確保できそうな休息時間」の目安です。</div>
        </div>
      )}
      <div className="row" style={{ gap: 8, marginTop: 14 }}>
        {step > 1 && <button className="btn" onClick={prev}>戻る</button>}
        {step < 6 && <button className="btn btn-fill" style={{ flex: 1 }} onClick={next}>次へ</button>}
        {step === 6 && <button className="btn btn-fill" style={{ flex: 1 }} onClick={() => {
          const date = todayISO();
          set(p => ({ ...p, onboarded: true, dailyPlans: { ...p.dailyPlans, [date]: { todayTaskIds: [], routineChoices: Object.fromEntries(todaySel.map(id => [id, 'short'])) } } }));
        }}>はじめる</button>}
      </div>
    </div>
  );
}

/* ============================================================
   ① HOME（今日の操縦席）
   ============================================================ */
function Home({ s, set, go, openComplete }) {
  const [days, setDays] = useState(30);
  const date = todayISO();
  const breakdown = useMemo(() => careerScoreOf(s), [s]);
  const smoothedScore = s.careerSnapshots.length ? s.careerSnapshots[s.careerSnapshots.length - 1].score : breakdown.score;
  const inc = useMemo(() => incomeFromScore(s, smoothedScore), [s, smoothedScore]);
  const level = useMemo(() => levelOf(s, { ...breakdown, score: smoothedScore }), [s, breakdown, smoothedScore]);
  const chg1 = snapshotChange(s.careerSnapshots, 1);
  const chgN = snapshotChange(s.careerSnapshots, days);
  const rest = useMemo(() => restBudget(s, date), [s, date]);
  const one = mustDoTasks(s)[0];
  const plan = planFor(s, date);
  const today = todayTasks(s, date);
  const roomToday = TODAY_MAX - today.length;
  const RANGES = [[7, '7D'], [30, '1M'], [90, '3M']];
  const primary = s.targetProfiles.find(t => t.priority === 'primary');
  const diffToPrimary = primary && inc ? Math.max(0, Math.round((s.profile.targetIncome - (inc.center || 0)) / 10000)) : null;

  function addToToday(taskId) {
    set(p => ({ ...p, dailyPlans: { ...p.dailyPlans, [date]: { ...planFor(p, date), todayTaskIds: [...new Set([...planFor(p, date).todayTaskIds, taskId])].slice(0, TODAY_MAX) } } }));
  }
  function removeFromToday(taskId) {
    set(p => ({ ...p, dailyPlans: { ...p.dailyPlans, [date]: { ...planFor(p, date), todayTaskIds: planFor(p, date).todayTaskIds.filter(x => x !== taskId) } } }));
  }
  function setRoutineMode(taskId, mode) {
    set(p => ({ ...p, dailyPlans: { ...p.dailyPlans, [date]: { ...planFor(p, date), routineChoices: { ...planFor(p, date).routineChoices, [taskId]: mode } } } }));
  }

  return (
    <div className="screen">
      <div className="between topbar">
        <div className="date">{fmtDate(date)}（{WD[parseISO(date).getDay()]}）</div>
        <div className="row" style={{ gap: 12 }}>
          <button className="link" onClick={() => go('review')}>週次レビュー</button>
          <button className="gear" onClick={() => go('settings')}>⚙</button>
        </div>
      </div>

      {/* Career Value ticker */}
      <div className="card">
        <div className="lbl">2030 Career Value</div>
        <div className="idx-now">{inc ? man(inc.center) : '未設定'}<span className="yen">円</span></div>
        <div className="idx-sub" style={{ color: chg1.chg >= 0 ? 'var(--up)' : 'var(--down)' }}>
          {chg1.chg >= 0 ? '↗' : '↘'} {manD(chg1.chg)}　<span className="muted2">前日比</span>
        </div>
        {inc && <div className="ts" style={{ marginTop: 8 }}>想定レンジ　{man(inc.lower)} — {man(inc.upper)}</div>}
        <div className="ts">現在地：<b>Level {level.level} {level.name}</b></div>
        {diffToPrimary != null && <div className="ts">第一候補まで：あと {diffToPrimary}万円相当</div>}
        <div style={{ marginTop: 14 }}><ValueChart log={s.careerSnapshots} days={days} h={110} /></div>
        <div className="range">{RANGES.map(([d, l]) => <button key={d} className={days === d ? 'on' : ''} onClick={() => setDays(d)}>{l}</button>)}</div>
        <div className="ts" style={{ marginTop: 8 }}>7日 {chgN.pct >= 0 ? '+' : ''}{r1(chgN.pct)}%</div>
        {s.careerSnapshots.length > 0 && s.careerSnapshots[s.careerSnapshots.length - 1].reasons.length > 0 && (
          <div className="hint">変化理由：{s.careerSnapshots[s.careerSnapshots.length - 1].reasons.join('、')}</div>
        )}
      </div>

      {/* Today's One Step */}
      {one && (
        <div className="card">
          <div className="lbl">TODAY'S ONE STEP</div>
          <div className="tt" style={{ marginTop: 6 }}>{one.title}</div>
          <div className="ts">{one.dueDate ? `締切 ${fmtDate(one.dueDate)}（${daysUntil(one.dueDate)}日）` : ''}</div>
          <div className="row" style={{ gap: 8, marginTop: 10 }}>
            {roomToday > 0 && !today.some(x => x.id === one.id) && <button className="btn btn-sm" onClick={() => addToToday(one.id)}>今日やる に追加</button>}
            <button className="btn btn-sm btn-fill" onClick={() => openComplete(one)}>記録する</button>
          </div>
        </div>
      )}

      {/* Today */}
      <div className="card">
        <div className="between"><div className="lbl">TODAY（{today.length}/{TODAY_MAX}）</div><button className="link" onClick={() => go('mustdo')}>Must Doから選ぶ</button></div>
        {today.length === 0 && <div className="sub" style={{ marginTop: 6 }}>Must Doやルーティンから、今日やる分を選んでください。</div>}
        {today.map(t => (
          <div key={t.id} className="todo">
            <div style={{ flex: 1 }} onClick={() => openComplete(t)}>
              <div className="tt">{t.title}</div>
              <div className="ts">{projById(s, t.projectId) ? projById(s, t.projectId).title : (t.layer === 'mustdo' ? 'Must Do' : 'Inbox')}　・　タップで記録</div>
            </div>
            <button className="x sm" onClick={() => removeFromToday(t.id)}>✕</button>
          </div>
        ))}
      </div>

      {/* Must Do 予告 */}
      <div className="card">
        <div className="between"><div className="lbl">MUST DO</div><button className="link" onClick={() => go('mustdo')}>すべて見る</button></div>
        {mustDoTasks(s).slice(0, 3).map(t => {
          const du = t.dueDate ? daysUntil(t.dueDate) : null;
          return (
            <div key={t.id} className="dl">
              <div className="dl-m">{t.dueDate ? `${MON3[parseISO(t.dueDate).getMonth()]} ${parseISO(t.dueDate).getDate()}` : '—'}</div>
              <div style={{ flex: 1 }}><div className="dl-t">{t.title}</div></div>
              <div className="dl-d" style={{ color: du != null && du <= 7 ? 'var(--down)' : 'var(--sub)' }}>{du == null ? '' : du < 0 ? '再計画' : `${du}d`}</div>
            </div>
          );
        })}
      </div>

      {/* Rest Budget */}
      <div className="card">
        <div className="lbl">REST BUDGET</div>
        <div className="ts" style={{ marginTop: 6 }}>今日の予定負荷：{fmtMin(rest.workload)}</div>
        <div className="tt" style={{ marginTop: 2 }}>推奨休息：{fmtMin(rest.recommendedRest)}</div>
        <div className="ts">余白：{fmtMin(Math.max(0, rest.available - rest.workload - rest.recommendedRest))}</div>
        {rest.overloaded && <div className="hint">予定を詰めすぎています。ルーティンを1件、休む／短縮版にする提案があります。</div>}
      </div>

      {/* Routine */}
      <div className="card">
        <div className="lbl">ROUTINE（最大{ROUTINE_MAX}）</div>
        {routineTasks(s).map(rt => {
          const mode = plan.routineChoices[rt.id];
          const done = isRoutineDoneToday(s, rt.id, date);
          return (
            <div key={rt.id} className="todo" style={{ alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div className="tt" style={{ color: done ? 'var(--sub)' : 'var(--ink)' }}>{rt.title}{done ? '　✓' : ''}</div>
                <div className="chips" style={{ marginTop: 6 }}>
                  {[['normal', `通常${rt.routineRule.normal}分`], ['short', `短縮${rt.routineRule.short}分`], ['rest', '休む']].map(([k, l]) => (
                    <button key={k} className={`chip sm ${mode === k ? 'on' : ''}`} disabled={done} onClick={() => {
                      setRoutineMode(rt.id, k);
                      if (k === 'rest') return;
                      set(p => completeTask(p, rt.id, 'done', { actualMinutes: k === 'short' ? rt.routineRule.short : rt.routineRule.normal }));
                    }}>{l}</button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <QuickAdd set={set} />
    </div>
  );
}
function QuickAdd({ set }) {
  const [v, setV] = useState(''); const [open, setOpen] = useState(false);
  function add() {
    if (!v.trim()) return;
    set(p => ({ ...p, tasks: [...p.tasks, { id: uid(), title: v.trim(), layer: 'inbox', state: 'active', projectId: null, dueDate: null, estimatedMinutes: null, assetIds: [], note: '', createdAt: new Date().toISOString() }] }));
    setV(''); setOpen(false);
  }
  return (
    <div className="card">
      <div className="between"><div className="lbl">QUICK ADD</div><button className="link" onClick={() => setOpen(o => !o)}>{open ? '閉じる' : '＋ Inboxに保存'}</button></div>
      {open && (
        <div style={{ marginTop: 8 }}>
          <input className="in" placeholder="思いついたこと" value={v} onChange={e => setV(e.target.value)} />
          <button className="btn btn-sm btn-fill" style={{ marginTop: 8 }} disabled={!v.trim()} onClick={add}>Inboxに保存</button>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   ② MUST DO
   ============================================================ */
function MustDo({ s, set, openComplete }) {
  const list = mustDoTasks(s);
  const date = todayISO();
  const today = planFor(s, date).todayTaskIds;
  function addToday(id) {
    set(p => {
      const cur = planFor(p, date).todayTaskIds;
      if (cur.length >= TODAY_MAX || cur.includes(id)) return p;
      return { ...p, dailyPlans: { ...p.dailyPlans, [date]: { ...planFor(p, date), todayTaskIds: [...cur, id] } } };
    });
  }
  return (
    <div className="screen">
      <div className="lbl">MUST DO</div>
      <div className="sub" style={{ marginTop: 4 }}>締切順。過ぎたものは失敗ではなく「再計画が必要」と表示します。</div>
      {list.length === 0 && <div className="sub" style={{ marginTop: 10 }}>登録なし。</div>}
      {list.map(t => {
        const du = t.dueDate ? daysUntil(t.dueDate) : null;
        const overdue = du != null && du < 0;
        return (
          <div key={t.id} className="pcard" style={{ cursor: 'default' }}>
            <div className="between">
              <div className="pname">{t.title}</div>
              <div className="dl-d" style={{ color: overdue ? 'var(--down)' : (du != null && du <= 7 ? 'var(--down)' : 'var(--sub)') }}>
                {t.dueDate ? (overdue ? '再計画が必要' : `あと${du}日`) : '期限なし'}
              </div>
            </div>
            {t.note && <div className="sub" style={{ marginTop: 6 }}>{t.note}</div>}
            <div className="ts" style={{ marginTop: 6 }}>{t.dueDate ? fmtFull(t.dueDate) : ''}　{t.estimatedMinutes ? `・約${fmtMin(t.estimatedMinutes)}` : ''}</div>
            <div className="row" style={{ gap: 8, marginTop: 10 }}>
              {!today.includes(t.id) ? <button className="btn btn-sm" onClick={() => addToday(t.id)}>今日やる に追加</button> : <span className="ts">今日やる に追加済み</span>}
              <button className="btn btn-sm btn-fill" onClick={() => openComplete(t)}>記録する</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   ③ INBOX
   ============================================================ */
function Inbox({ s, set }) {
  const list = inboxTasks(s);
  function act(id, kind) {
    set(p => {
      if (kind === 'delete') return { ...p, tasks: p.tasks.filter(x => x.id !== id) };
      if (kind === 'hold') return p;
      if (kind === 'mustdo') return { ...p, tasks: p.tasks.map(x => x.id === id ? { ...x, layer: 'mustdo', dueDate: x.dueDate || addDaysISO(todayISO(), 14) } : x) };
      if (kind === 'thisweek') return { ...p, tasks: p.tasks.map(x => x.id === id ? { ...x, layer: 'mustdo', dueDate: addDaysISO(todayISO(), 7) } : x) };
      if (kind === 'smaller') return { ...p, tasks: p.tasks.map(x => x.id === id ? { ...x, estimatedMinutes: 15, note: (x.note ? x.note + '　' : '') + '（最初の一歩に分割）' } : x) };
      return p;
    });
  }
  return (
    <div className="screen">
      <div className="lbl">INBOX</div>
      <div className="sub" style={{ marginTop: 4 }}>思いつきは、必ずここに入ります。計画確認を経てから今日のタスクへ。</div>
      {list.length === 0 && <div className="sub" style={{ marginTop: 10 }}>Inboxは空です。</div>}
      {list.map(t => (
        <div key={t.id} className="pcard" style={{ cursor: 'default' }}>
          <div className="tt">{t.title}</div>
          <div className="ts" style={{ marginTop: 4 }}>{fmtDate(t.createdAt.slice(0, 10))}に追加{t.estimatedMinutes ? `・想定${fmtMin(t.estimatedMinutes)}` : ''}</div>
          <div className="chips" style={{ marginTop: 8 }}>
            <button className="chip sm" onClick={() => act(t.id, 'thisweek')}>今週やる</button>
            <button className="chip sm" onClick={() => act(t.id, 'mustdo')}>Must Doにする</button>
            <button className="chip sm" onClick={() => act(t.id, 'smaller')}>小さくする</button>
            <button className="chip sm" onClick={() => act(t.id, 'hold')}>保留</button>
            <button className="chip sm" onClick={() => act(t.id, 'delete')}>削除</button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   ④ PROJECTS
   ============================================================ */
function Projects({ s, set, sel, setSel }) {
  const [tab, setTabP] = useState('active');
  const detail = sel && projById(s, sel);
  const groups = { active: s.projects.filter(p => p.status === 'active'), paused: s.projects.filter(p => p.status === 'paused'), completed: s.projects.filter(p => p.status === 'completed') };
  function setStatus(id, status) {
    set(p => {
      if (status === 'active' && p.projects.filter(x => x.status === 'active').length >= ACTIVE_PROJECT_MAX && p.projects.find(x => x.id === id).status !== 'active') {
        alert(`Active は最大 ${ACTIVE_PROJECT_MAX} 件までです。`); return p;
      }
      return { ...p, projects: p.projects.map(x => x.id === id ? { ...x, status } : x) };
    });
  }
  function setField(id, k, v) { set(p => ({ ...p, projects: p.projects.map(x => x.id === id ? { ...x, [k]: v } : x) })); }
  const lastLogDate = (pid) => {
    const logs = s.actionLogs.filter(l => { const t = taskById(s, l.taskId); return t && t.projectId === pid; });
    return logs.length ? logs.map(l => l.date).sort().slice(-1)[0] : null;
  };

  if (detail) {
    const p = detail;
    const related = s.tasks.filter(t => t.projectId === p.id);
    const last = lastLogDate(p.id);
    return (
      <div className="screen">
        <button className="link" onClick={() => setSel(null)}>‹ Projects</button>
        <div className="card">
          <div className="between"><div className="h1">{p.emoji} {p.title}</div>
            <select className="in" style={{ width: 110 }} value={p.status} onChange={e => setStatus(p.id, e.target.value)}>
              <option value="active">Active</option><option value="paused">Paused</option><option value="completed">Completed</option>
            </select>
          </div>
          <div className="ts" style={{ marginTop: 8 }}>育つ資産：{(p.assetIds || []).map(a => ASSET_CAT_MAP[a].name).join(' / ') || '—'}</div>
          <div className="ts">最後の実行：{last ? fmtDate(last) : 'まだなし'}</div>
        </div>
        <div className="card"><div className="lbl">目的</div><textarea className="ta" value={p.purpose || ''} onChange={e => setField(p.id, 'purpose', e.target.value)} /></div>
        <div className="card"><div className="lbl">完了条件</div><textarea className="ta" value={p.completionDefinition || ''} onChange={e => setField(p.id, 'completionDefinition', e.target.value)} /></div>
        <div className="card">
          <div className="lbl">関連タスク</div>
          {related.length === 0 && <div className="sub" style={{ marginTop: 6 }}>まだなし</div>}
          {related.map(t => <div key={t.id} className="ts" style={{ padding: '4px 0' }}>{t.layer === 'mustdo' ? '📌' : t.layer === 'routine' ? '🔁' : '•'} {t.title}{t.state === 'archived' ? '（完了）' : ''}</div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="lbl">PROJECTS</div>
      <div className="range" style={{ marginTop: 8 }}>
        {[['active', `Active (${groups.active.length}/${ACTIVE_PROJECT_MAX})`], ['paused', `Paused (${groups.paused.length})`], ['completed', `Completed (${groups.completed.length})`]].map(([k, l]) => (
          <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTabP(k)}>{l}</button>
        ))}
      </div>
      {groups[tab].length === 0 && <div className="sub" style={{ marginTop: 10 }}>該当なし</div>}
      {groups[tab].map(p => {
        const last = lastLogDate(p.id);
        return (
          <div key={p.id} className="pcard" onClick={() => setSel(p.id)}>
            <div className="pname">{p.emoji} {p.title}</div>
            <div className="ts" style={{ marginTop: 6 }}>{p.completionDefinition}</div>
            <div className="between" style={{ marginTop: 8 }}>
              <span className="ts">{(p.assetIds || []).map(a => ASSET_CAT_MAP[a].name).join(' / ')}</span>
              <span className="ts">最終実行：{last ? fmtDate(last) : '—'}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   ⑤ CAREER
   ============================================================ */
function Career({ s, set }) {
  const breakdown = useMemo(() => careerScoreOf(s), [s]);
  const smoothedScore = s.careerSnapshots.length ? s.careerSnapshots[s.careerSnapshots.length - 1].score : breakdown.score;
  const inc = useMemo(() => incomeFromScore(s, smoothedScore), [s, smoothedScore]);
  const level = useMemo(() => levelOf(s, { ...breakdown, score: smoothedScore }), [s, breakdown, smoothedScore]);
  const primaries = s.targetProfiles.filter(t => t.priority === 'primary');
  const setP = (k, v) => set(p => ({ ...p, profile: { ...p.profile, [k]: v } }));
  return (
    <div className="screen">
      <div className="lbl">CAREER</div>
      <div className="card">
        <div className="idx-now" style={{ fontSize: 32 }}>{inc ? man(inc.center) : '—'}<span className="yen">円</span></div>
        <div className="ts">レンジ {inc ? `${man(inc.lower)} — ${man(inc.upper)}` : '—'}</div>
        <div className="ts" style={{ marginTop: 4 }}>Level {level.level}：{level.name}</div>
        <div className="sub" style={{ marginTop: 4 }}>{level.desc}</div>
        <div className="hint">採用確率・合格保証ではなく、行動証拠にもとづく準備段階の目安です。</div>
      </div>

      <div className="card">
        <div className="lbl">第一候補（TARGET PROFILE）</div>
        {primaries.map(t => (
          <div key={t.id} className="fit-row">
            <span style={{ flex: 1 }}>{t.company}　{t.role}</span>
            <span className="ts">{t.location}</span>
          </div>
        ))}
        <div className="ts" style={{ marginTop: 6 }}>職種プロファイル：{ROLE_MAP[s.profile.primaryRoleId]?.name}</div>
      </div>

      <div className="card">
        <div className="lbl">SCORE 内訳</div>
        {[['Completion', breakdown.completion, 40], ['Consistency', breakdown.consistency, 25], ['Fit', breakdown.fit, 20], ['Evidence', breakdown.evidence, 15]].map(([n, v, w]) => (
          <div key={n} className="arow">
            <div className="aname">{n}<span className="ts"> {w}%</span></div>
            <div style={{ flex: 1 }}><Bar v={v * 100} /></div>
            <div className="big-n sm">{Math.round(v * 100)}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="lbl">CAREER ASSETS</div>
        {s.careerAssets.map(a => (
          <div key={a.id} className="todo" style={{ display: 'block' }}>
            <div className="between">
              <div className="tt">{ASSET_CAT_MAP[a.category].emoji} {a.name}</div>
              <div className="big-n sm">{Math.round(a.score)}</div>
            </div>
            <div className="ts" style={{ margin: '2px 0 8px' }}>{a.jp}</div>
            <Bar v={a.score} />
          </div>
        ))}
      </div>

      <div className="card">
        <div className="lbl">HISTORY</div>
        <ValueChart log={s.careerSnapshots} days={90} h={110} />
      </div>

      <div className="card">
        <div className="between"><div className="lbl">過去の活動（仮登録）</div></div>
        {s.pastActivities.map(a => (
          <div key={a.id} className="todo" style={{ display: 'block' }}>
            <div className="tt">{a.title}<span className="ts"> ・{a.state}</span></div>
            <div className="ts" style={{ marginTop: 2 }}>{a.note}</div>
          </div>
        ))}
        <div className="hint">証拠が確認できるまで、Career Valueには全量加算しません。</div>
      </div>

      <div className="card">
        <div className="lbl">プロフィール</div>
        <div className="grid2" style={{ marginTop: 8 }}>
          <div className="fld"><label>大学</label><input className="in" value={s.profile.school} onChange={e => setP('school', e.target.value)} /></div>
          <div className="fld"><label>学部</label><input className="in" value={s.profile.faculty} onChange={e => setP('faculty', e.target.value)} /></div>
          <div className="fld"><label>学年</label><input className="in" value={s.profile.grade} onChange={e => setP('grade', e.target.value)} /></div>
          <div className="fld"><label>卒業予定</label><input className="in" value={s.profile.gradMonth} onChange={e => setP('gradMonth', e.target.value)} /></div>
          <div className="fld"><label>基準年収（円）</label><input className="in" value={s.profile.baseIncome} onChange={e => setP('baseIncome', Number(e.target.value) || 0)} /></div>
          <div className="fld"><label>2030 目標年収（円）</label><input className="in" value={s.profile.targetIncome} onChange={e => setP('targetIncome', Number(e.target.value) || 0)} /></div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ⑥ WEEKLY REVIEW
   ============================================================ */
function WeeklyReview({ s, set, go }) {
  const cut = addDaysISO(todayISO(), -7);
  const logs7 = s.actionLogs.filter(l => l.date >= cut);
  const completed = logs7.filter(l => l.completionLevel !== 'missed').length;
  const activeDays = new Set(logs7.filter(l => l.completionLevel !== 'missed').map(l => l.date)).size;
  const missed = logs7.filter(l => l.completionLevel === 'missed');
  const [obstacles, setObstacles] = useState('');
  const [restDays, setRestDays] = useState(1);
  function save() {
    set(p => ({ ...p, weeklyReviews: [...p.weeklyReviews, { id: uid(), weekStart: cut, completedCount: completed, obstacles, restDays, nextFocus: '' }] }));
    alert('週次レビューを保存しました。');
    go('home');
  }
  const bestAsset = [...s.careerAssets].sort((a, b) => b.score - a.score)[0];
  return (
    <div className="screen">
      <div className="lbl">WEEKLY REVIEW</div>
      <div className="card">
        <div className="grid2">
          <div><div className="ts">完了数</div><div className="big-n">{completed}</div></div>
          <div><div className="ts">実行日数</div><div className="big-n">{activeDays}/7</div></div>
        </div>
        <div className="ts" style={{ marginTop: 10 }}>未完了：{missed.length}件（減点はしません。理由を振り返るだけです）</div>
        <div className="ts">最も進んだ資産：{bestAsset ? `${bestAsset.name}（${Math.round(bestAsset.score)}）` : '—'}</div>
      </div>
      <div className="card">
        <div className="lbl">今週、進まなかった理由（任意）</div>
        <textarea className="ta" value={obstacles} onChange={e => setObstacles(e.target.value)} />
      </div>
      <div className="card">
        <div className="lbl">来週、休む日（日数）</div>
        <div className="chips">{[0, 1, 2].map(n => <button key={n} className={`chip ${restDays === n ? 'on' : ''}`} onClick={() => setRestDays(n)}>{n}日</button>)}</div>
      </div>
      <button className="btn btn-fill btn-block big" onClick={save}>保存する</button>
    </div>
  );
}

/* ============================================================
   設定
   ============================================================ */
function Settings({ s, set, go }) {
  const [imp, setImp] = useState('');
  function ex() {
    const t = JSON.stringify(s, null, 2);
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(() => alert('コピーしました'), () => prompt('コピー', t));
    else prompt('コピー', t);
  }
  function im() { try { const o = JSON.parse(imp); set(() => ({ ...defaultState(), ...o, version: 6 })); setImp(''); alert('インポートしました'); } catch (e) { alert('読み取れませんでした'); } }
  function wipe() { if (confirm('すべて消して初期化します。')) set(() => defaultState()); }
  return (
    <div className="screen">
      <div className="between"><div className="lbl">設定</div><button className="link" onClick={() => go('home')}>閉じる</button></div>
      <div className="card">
        <div className="lbl">データ（端末内のみ保存）</div>
        <button className="btn btn-block" style={{ marginTop: 10 }} onClick={ex}>JSONバックアップをコピー</button>
        <textarea className="ta" style={{ marginTop: 10 }} placeholder="JSONを貼ってインポート" value={imp} onChange={e => setImp(e.target.value)} />
        <button className="btn btn-block" style={{ marginTop: 10 }} disabled={!imp.trim()} onClick={im}>インポート</button>
        <button className="btn btn-block danger" style={{ marginTop: 10 }} onClick={wipe}>すべて消して初期化</button>
      </div>
      <div className="sub">想定年収・準備レベルは、採用結果や実際の年収・合格可能性を保証するものではありません。</div>
    </div>
  );
}

/* ============================================================
   NAV / APP
   ============================================================ */
function Nav({ tab, go }) {
  const items = [['home', 'Home'], ['mustdo', 'Must Do'], ['inbox', 'Inbox'], ['projects', 'Projects'], ['career', 'Career']];
  return (
    <div className="nav">{items.map(([id, label]) => (
      <button key={id} className={`nav-item ${tab === id ? 'active' : ''}`} onClick={() => go(id)}><span>{label}</span></button>
    ))}</div>
  );
}
function App() {
  const [s, setS] = useState(() => ensureSnapshotToday(ensureTodayPlan(loadState())));
  const [tab, setTab] = useState('home');
  const [sel, setSel] = useState(null);
  const [completing, setCompleting] = useState(null);
  useEffect(() => { saveState(s); }, [s]);
  useEffect(() => { window.scrollTo(0, 0); }, [tab, sel]);
  const set = (fn) => setS(prev => (typeof fn === 'function' ? fn(prev) : fn));
  const go = (t) => { setTab(t); if (t !== 'projects') setSel(null); };
  const openComplete = (task) => setCompleting(task);

  if (!s.onboarded) return <Onboarding s={s} set={set} />;

  return (
    <div>
      {tab === 'home' && <Home s={s} set={set} go={go} openComplete={openComplete} />}
      {tab === 'mustdo' && <MustDo s={s} set={set} openComplete={openComplete} />}
      {tab === 'inbox' && <Inbox s={s} set={set} />}
      {tab === 'projects' && <Projects s={s} set={set} sel={sel} setSel={setSel} />}
      {tab === 'career' && <Career s={s} set={set} />}
      {tab === 'review' && <WeeklyReview s={s} set={set} go={go} />}
      {tab === 'settings' && <Settings s={s} set={set} go={go} />}
      {tab !== 'settings' && tab !== 'review' && <Nav tab={tab} go={go} />}
      {tab === 'review' && <div className="row" style={{ position: 'fixed', bottom: 'calc(16px + env(safe-area-inset-bottom))', left: '50%', transform: 'translateX(-50%)' }}><button className="link" onClick={() => go('home')}>‹ Home</button></div>}
      {completing && (
        <CompleteSheet task={completing} onClose={() => setCompleting(null)}
          onDone={(level, opts) => { set(p => completeTask(p, completing.id, level, opts)); setCompleting(null); }} />
      )}
    </div>
  );
}
ReactDOM.render(React.createElement(App), document.getElementById('root'));
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
