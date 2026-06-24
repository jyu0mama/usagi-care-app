# 複数アプリ共存リポジトリ — 既存アプリを絶対に壊さないためのルール

このリポジトリ（GitHub: `jyu0mama/usagi-care-app`）は、**複数の独立したアプリ**を1つのGitHub Pagesサイトに同居させています。
トップ階層の各フォルダ（`index.html` を持つもの）が、それぞれ別アプリです。

- `areruko/` … 「外ではいい子なのに、家では荒れる子」タイプ診断（React + ブラウザ内Babel）
- `kishitu/` … 気質チェック（React + ブラウザ内Babel）
- `flower-link-app/` … フラワーリンク
- ルートの `index.html` … 各アプリへのリンク集（トップページ）

公開URLは同一オリジン（`https://jyu0mama.github.io/usagi-care-app/<アプリ名>/`）。

---

## 🚫 最重要ルール：新しいアプリを作っても、既存アプリには一切影響を与えない

新規アプリの作成・既存アプリの編集をするときは、必ず以下を守ること。

### 1. 作業範囲は「そのアプリのフォルダの中だけ」
- 他アプリのフォルダ・ファイルには絶対に触れない（読むのはOK、変更・削除・移動は禁止）。
- 新しいアプリは**新しいフォルダ**を作ってその中だけで完結させる。

### 2. Git：そのアプリのフォルダだけをステージする
- `git add <アプリ名>/`（例：`git add areruko/`）のように**対象フォルダだけ**を指定する。
- **`git add -A` / `git add .` をリポジトリ直下で実行してはいけない**（他アプリの変更・削除まで巻き込み、既存アプリが消える原因になる）。
- コミットも `git commit -- <アプリ名>/...` のようにパスを限定する。

### 3. 既存アプリのファイルを削除しない
- 既存アプリの `index.html` / `sw.js` / `manifest.json` を削除しようとすると、pre-commitフックが自動でコミットを止める。
- これは安全装置。意図的な削除が本当に必要なときだけ `git commit --no-verify`。

### 4. 外部CDNはバージョンを固定する（勝手に壊れるのを防ぐ）
- React / Babel 等のCDNは**バージョンを固定**して読み込む（`@18`, `@7` のように）。無指定（最新）は将来の仕様変更で突然動かなくなる。
- **ブラウザ内Babel（`<script type="text/babel">`）を使うアプリは、必ずclassicランタイムを指定する**。指定しないと新しいBabelが `import` 文を挿入し、ブラウザ単体でReactが起動しなくなる。`areruko/index.html` の `react-classic` プリセット登録が手本：
  ```html
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <script>
    Babel.registerPreset('react-classic', {
      presets: [[Babel.availablePresets.react, { runtime: 'classic' }]]
    });
  </script>
  <script type="text/babel" data-presets="react-classic"> ... </script>
  ```

### 5. PWA（Service Worker / localStorage）は同一オリジンで衝突するので分離する
同じドメインに同居しているため、不用意な実装は他アプリを壊す。
- Service Worker は必ず `navigator.serviceWorker.register('./sw.js')`（**自分のフォルダscopeだけ**）。ルートscope `'/'` で登録しない。
- SWのキャッシュ名は**アプリ固有のプレフィックス**を付ける（例：`areruko-v1`）。**`caches.keys()` で全キャッシュを削除する処理は禁止**（他アプリのキャッシュまで消す）。自分のプレフィックスのものだけ消すこと。
- `localStorage` のキーも**アプリ固有のプレフィックス**を付ける（例：`areruko_answers`）。汎用的なキー名は使わない。

### 6. 「1つ直すために、別アプリを変更しないと動かない」状態を作らない
各アプリは完全に独立していること。共通ファイルの共有は避ける。

---

## デプロイ
- そのアプリのフォルダだけを `main` にコミット＆プッシュすれば、GitHub Pages が反映する。
- プッシュ後、`https://jyu0mama.github.io/usagi-care-app/<アプリ名>/` で表示確認する。
