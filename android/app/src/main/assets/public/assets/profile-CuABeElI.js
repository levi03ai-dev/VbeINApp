import {
  Q as e,
  _ as t,
  a as n,
  b as r,
  et as i,
  o as a,
  r as o,
  t as s,
  x as c,
  y as l,
} from "./utils-D7eUi7KG.js";
import { t as u } from "./check-DrbwkwmG.js";
import { b as d, m as f, v as p } from "./index-By-AziC4.js";
var m = l(`sparkles`, [
    [
      `path`,
      {
        d: `M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z`,
        key: `1s2grr`,
      },
    ],
    [`path`, { d: `M20 2v4`, key: `1rf3ol` }],
    [`path`, { d: `M22 4h-4`, key: `gwowj6` }],
    [`circle`, { cx: `4`, cy: `20`, r: `2`, key: `6kqj1y` }],
  ]),
  h = i(e()),
  g = t(),
  _ = `/app/applet/src/routes/profile.tsx?tsr-split=component`;
function v(e) {
  return `${Math.floor(e / 60)}:${(e % 60).toString().padStart(2, `0`)}`;
}
var ee = [
    { id: `grad-1`, label: `Sunset Glow`, class: `from-pink-500 to-orange-400` },
    { id: `grad-2`, label: `Neon Cyber`, class: `from-purple-600 to-cyan-400` },
    { id: `grad-3`, label: `Ocean Breeze`, class: `from-blue-600 to-teal-400` },
    { id: `grad-4`, label: `Forest Moss`, class: `from-emerald-500 to-teal-600` },
    { id: `grad-5`, label: `Solar Flare`, class: `from-yellow-400 to-orange-500` },
    { id: `grad-6`, label: `Amethyst Dream`, class: `from-indigo-500 to-purple-600` },
  ],
  y = [`Indie Pop`, `Lo-Fi`, `Electronic`, `Classical`, `Synthwave`, `Hip Hop`, `Jazz`],
  b = [
    { value: `low`, label: `96k`, desc: `Data Saver` },
    { value: `normal`, label: `160k`, desc: `Standard` },
    { value: `high`, label: `320k`, desc: `High Quality` },
    { value: `lossless`, label: `Hi-Res`, desc: `Lossless FLAC` },
  ],
  x = [
    { id: `flat`, label: `Flat`, desc: `Neutral soundstage`, values: [40, 40, 40, 40, 40] },
    { id: `bass`, label: `Bass Booster`, desc: `Thumping sub-bass`, values: [85, 75, 45, 40, 35] },
    {
      id: `vocal`,
      label: `Vocal Clarity`,
      desc: `Crisp mids & speech`,
      values: [30, 45, 75, 70, 50],
    },
    { id: `acoustic`, label: `Acoustic`, desc: `Warm live acoustic`, values: [60, 50, 45, 60, 65] },
    {
      id: `electronic`,
      label: `Electronic`,
      desc: `Vibrant club style`,
      values: [75, 55, 35, 65, 80],
    },
  ];
function S() {
  let { sleepTimerRemaining: e, setSleepTimer: t } = n(),
    [i, l] = (0, h.useState)(`Alex Rivera`),
    [S, C] = (0, h.useState)(`biyesh369@gmail.com`),
    [w, T] = (0, h.useState)(`Indie Pop`),
    [E, D] = (0, h.useState)(`from-pink-500 to-orange-400`),
    [O, k] = (0, h.useState)(!1),
    [A, j] = (0, h.useState)(!1),
    [M, N] = (0, h.useState)(!0),
    [P, F] = (0, h.useState)(!0),
    [I, L] = (0, h.useState)(`high`),
    [R, z] = (0, h.useState)(`flat`),
    [B, V] = (0, h.useState)(142.4),
    [H, U] = (0, h.useState)(!1),
    [W, G] = (0, h.useState)(`midnight`);
  (0, h.useEffect)(() => {
    let e = localStorage.getItem(`melody-stream-profile`);
    if (e)
      try {
        let t = JSON.parse(e);
        (t.name && l(t.name),
          t.email && C(t.email),
          t.favGenre && T(t.favGenre),
          t.avatarColor && D(t.avatarColor));
      } catch (e) {
        console.error(`Error loading profile:`, e);
      }
    let t = localStorage.getItem(`melody-stream-quality`);
    t && L(t);
    let n = localStorage.getItem(`melody-stream-eq`);
    n && z(n);
    let r = localStorage.getItem(`melody-stream-theme`);
    r && G(r);
    let i = localStorage.getItem(`melody-stream-cellular`);
    i && j(i === `true`);
    let a = localStorage.getItem(`melody-stream-autoplay`);
    a && N(a === `true`);
    let o = localStorage.getItem(`melody-stream-notifications`);
    o && F(o === `true`);
    let s = localStorage.getItem(`melody-stream-cache-size`);
    s && V(parseFloat(s));
  }, []);
  let K = (e) => {
      let t = { name: i, email: S, favGenre: w, avatarColor: E, ...e };
      (localStorage.setItem(`melody-stream-profile`, JSON.stringify(t)),
        window.dispatchEvent(new Event(`profile-updated`)));
    },
    q = (e) => {
      (l(e), K({ name: e }));
    },
    J = (e) => {
      (C(e), K({ email: e }));
    },
    Y = (e) => {
      (T(e), K({ favGenre: e }), a.success(`Favorite genre updated to ${e}`));
    },
    X = (e) => {
      (D(e), K({ avatarColor: e }), a.success(`Avatar style updated!`), k(!1));
    },
    Z = (e) => {
      (L(e), localStorage.setItem(`melody-stream-quality`, e));
      let t = b.find((t) => t.value === e)?.label;
      a.success(`Streaming quality set to ${t}`);
    },
    Q = (e) => {
      (z(e), localStorage.setItem(`melody-stream-eq`, e));
      let t = x.find((t) => t.id === e)?.label;
      a.success(`Equalizer preset changed to ${t}`);
    },
    te = (e) => {
      (G(e), localStorage.setItem(`melody-stream-theme`, e), s(e));
      let t = o.find((t) => t.id === e)?.name;
      a.success(`Theme switched to ${t}`);
    },
    ne = () => {
      let e = !A;
      (j(e),
        localStorage.setItem(`melody-stream-cellular`, String(e)),
        a.success(e ? `Streaming over cellular enabled` : `Streaming restricted to Wi-Fi`));
    },
    re = () => {
      let e = !M;
      (N(e),
        localStorage.setItem(`melody-stream-autoplay`, String(e)),
        a.success(e ? `Autoplay tracks turned on` : `Autoplay tracks disabled`));
    },
    ie = () => {
      let e = !P;
      (F(e),
        localStorage.setItem(`melody-stream-notifications`, String(e)),
        a.success(e ? `Push notifications active` : `Push notifications muted`));
    },
    ae = () => {
      (U(!0),
        setTimeout(() => {
          (V(0),
            localStorage.setItem(`melody-stream-cache-size`, `0`),
            U(!1),
            a.success(`Offline storage cache cleared successfully`));
        }, 1100));
    },
    $ = x.find((e) => e.id === R) ?? x[0];
  return (0, g.jsxDEV)(
    `div`,
    {
      className: `pt-3 pb-8`,
      children: [
        (0, g.jsxDEV)(
          `div`,
          {
            className: `mb-6 flex items-center gap-3 px-4 pt-4`,
            children: [
              (0, g.jsxDEV)(
                d,
                {
                  to: `/`,
                  className: `flex h-8.5 w-8.5 items-center justify-center rounded-full bg-surface border border-border text-foreground transition-transform active:scale-90 hover:bg-foreground/5`,
                  children: (0, g.jsxDEV)(
                    p,
                    { className: `h-4.5 w-4.5` },
                    void 0,
                    !1,
                    { fileName: _, lineNumber: 236, columnNumber: 11 },
                    this,
                  ),
                },
                void 0,
                !1,
                { fileName: _, lineNumber: 235, columnNumber: 9 },
                this,
              ),
              (0, g.jsxDEV)(
                `h1`,
                {
                  className: `text-[20px] font-semibold tracking-tight text-foreground/90`,
                  children: `Profile & Settings`,
                },
                void 0,
                !1,
                { fileName: _, lineNumber: 238, columnNumber: 9 },
                this,
              ),
            ],
          },
          void 0,
          !0,
          { fileName: _, lineNumber: 234, columnNumber: 7 },
          this,
        ),
        (0, g.jsxDEV)(
          `section`,
          {
            className: `px-4 mb-8`,
            children: (0, g.jsxDEV)(
              `div`,
              {
                className: `flex flex-col items-center justify-center rounded-xl border border-border bg-surface/25 p-5 text-center`,
                children: [
                  (0, g.jsxDEV)(
                    `div`,
                    {
                      className: `relative group`,
                      children: [
                        (0, g.jsxDEV)(
                          r.div,
                          {
                            whileHover: { scale: 1.04 },
                            whileTap: { scale: 0.96 },
                            onClick: () => k(!O),
                            className: `grid h-16 w-16 cursor-pointer place-items-center rounded-full bg-gradient-to-br ${E} text-2xl font-black text-white shadow-md`,
                            children: i.trim().charAt(0).toUpperCase() || `A`,
                          },
                          void 0,
                          !1,
                          { fileName: _, lineNumber: 248, columnNumber: 13 },
                          this,
                        ),
                        (0, g.jsxDEV)(
                          `button`,
                          {
                            onClick: () => k(!O),
                            className: `absolute -bottom-0.5 -right-0.5 rounded-full bg-foreground text-background p-1 shadow-sm hover:opacity-90 transition-opacity`,
                            children: (0, g.jsxDEV)(
                              m,
                              { className: `h-2.5 w-2.5` },
                              void 0,
                              !1,
                              { fileName: _, lineNumber: 256, columnNumber: 15 },
                              this,
                            ),
                          },
                          void 0,
                          !1,
                          { fileName: _, lineNumber: 255, columnNumber: 13 },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    !0,
                    { fileName: _, lineNumber: 247, columnNumber: 11 },
                    this,
                  ),
                  (0, g.jsxDEV)(
                    c,
                    {
                      children:
                        O &&
                        (0, g.jsxDEV)(
                          r.div,
                          {
                            initial: { opacity: 0, height: 0 },
                            animate: { opacity: 1, height: `auto` },
                            exit: { opacity: 0, height: 0 },
                            className: `mt-4 w-full overflow-hidden`,
                            children: (0, g.jsxDEV)(
                              `div`,
                              {
                                className: `rounded-xl border border-border bg-surface/40 p-3`,
                                children: [
                                  (0, g.jsxDEV)(
                                    `p`,
                                    {
                                      className: `text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/60 mb-2`,
                                      children: `Choose Avatar Gradient`,
                                    },
                                    void 0,
                                    !1,
                                    { fileName: _, lineNumber: 273, columnNumber: 19 },
                                    this,
                                  ),
                                  (0, g.jsxDEV)(
                                    `div`,
                                    {
                                      className: `grid grid-cols-6 gap-2`,
                                      children: ee.map((e) =>
                                        (0, g.jsxDEV)(
                                          `button`,
                                          {
                                            onClick: () => X(e.class),
                                            className: `h-7 w-7 rounded-full bg-gradient-to-br ${e.class} border-2 ${E === e.class ? `border-foreground scale-110 shadow-sm` : `border-transparent`} transition-transform active:scale-95`,
                                            title: e.label,
                                          },
                                          e.id,
                                          !1,
                                          { fileName: _, lineNumber: 277, columnNumber: 48 },
                                          this,
                                        ),
                                      ),
                                    },
                                    void 0,
                                    !1,
                                    { fileName: _, lineNumber: 276, columnNumber: 19 },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              !0,
                              { fileName: _, lineNumber: 272, columnNumber: 17 },
                              this,
                            ),
                          },
                          void 0,
                          !1,
                          { fileName: _, lineNumber: 262, columnNumber: 32 },
                          this,
                        ),
                    },
                    void 0,
                    !1,
                    { fileName: _, lineNumber: 261, columnNumber: 11 },
                    this,
                  ),
                  (0, g.jsxDEV)(
                    `div`,
                    {
                      className: `mt-5 w-full space-y-3 text-left`,
                      children: [
                        (0, g.jsxDEV)(
                          `div`,
                          {
                            children: [
                              (0, g.jsxDEV)(
                                `label`,
                                {
                                  className: `text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/50`,
                                  children: `Display Name`,
                                },
                                void 0,
                                !1,
                                { fileName: _, lineNumber: 286, columnNumber: 15 },
                                this,
                              ),
                              (0, g.jsxDEV)(
                                `input`,
                                {
                                  type: `text`,
                                  value: i,
                                  onChange: (e) => q(e.target.value),
                                  className: `mt-1 w-full rounded-xl border border-border bg-surface/30 px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:border-accent/40 focus:outline-none`,
                                  placeholder: `Your Name`,
                                },
                                void 0,
                                !1,
                                { fileName: _, lineNumber: 289, columnNumber: 15 },
                                this,
                              ),
                            ],
                          },
                          void 0,
                          !0,
                          { fileName: _, lineNumber: 285, columnNumber: 13 },
                          this,
                        ),
                        (0, g.jsxDEV)(
                          `div`,
                          {
                            children: [
                              (0, g.jsxDEV)(
                                `label`,
                                {
                                  className: `text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/50`,
                                  children: `Email Address`,
                                },
                                void 0,
                                !1,
                                { fileName: _, lineNumber: 293, columnNumber: 15 },
                                this,
                              ),
                              (0, g.jsxDEV)(
                                `input`,
                                {
                                  type: `email`,
                                  value: S,
                                  onChange: (e) => J(e.target.value),
                                  className: `mt-1 w-full rounded-xl border border-border bg-surface/30 px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:border-accent/40 focus:outline-none`,
                                  placeholder: `your.email@example.com`,
                                },
                                void 0,
                                !1,
                                { fileName: _, lineNumber: 296, columnNumber: 15 },
                                this,
                              ),
                            ],
                          },
                          void 0,
                          !0,
                          { fileName: _, lineNumber: 292, columnNumber: 13 },
                          this,
                        ),
                        (0, g.jsxDEV)(
                          `div`,
                          {
                            children: [
                              (0, g.jsxDEV)(
                                `label`,
                                {
                                  className: `text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/50`,
                                  children: `Favorite Music Genre`,
                                },
                                void 0,
                                !1,
                                { fileName: _, lineNumber: 300, columnNumber: 15 },
                                this,
                              ),
                              (0, g.jsxDEV)(
                                `div`,
                                {
                                  className: `relative mt-1`,
                                  children: [
                                    (0, g.jsxDEV)(
                                      `select`,
                                      {
                                        value: w,
                                        onChange: (e) => Y(e.target.value),
                                        className: `w-full appearance-none rounded-xl border border-border bg-surface/30 px-3 py-2 text-[13px] text-foreground focus:border-accent/40 focus:outline-none`,
                                        children: y.map((e) =>
                                          (0, g.jsxDEV)(
                                            `option`,
                                            {
                                              value: e,
                                              className: `bg-surface text-foreground`,
                                              children: e,
                                            },
                                            e,
                                            !1,
                                            { fileName: _, lineNumber: 305, columnNumber: 36 },
                                            this,
                                          ),
                                        ),
                                      },
                                      void 0,
                                      !1,
                                      { fileName: _, lineNumber: 304, columnNumber: 17 },
                                      this,
                                    ),
                                    (0, g.jsxDEV)(
                                      `div`,
                                      {
                                        className: `pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-muted-foreground/60 text-[9px]`,
                                        children: `▼`,
                                      },
                                      void 0,
                                      !1,
                                      { fileName: _, lineNumber: 309, columnNumber: 17 },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                !0,
                                { fileName: _, lineNumber: 303, columnNumber: 15 },
                                this,
                              ),
                            ],
                          },
                          void 0,
                          !0,
                          { fileName: _, lineNumber: 299, columnNumber: 13 },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    !0,
                    { fileName: _, lineNumber: 284, columnNumber: 11 },
                    this,
                  ),
                ],
              },
              void 0,
              !0,
              { fileName: _, lineNumber: 245, columnNumber: 9 },
              this,
            ),
          },
          void 0,
          !1,
          { fileName: _, lineNumber: 244, columnNumber: 7 },
          this,
        ),
        (0, g.jsxDEV)(
          `section`,
          {
            className: `px-4 mb-8`,
            children: [
              (0, g.jsxDEV)(
                `div`,
                {
                  className: `mb-2.5`,
                  children: [
                    (0, g.jsxDEV)(
                      `span`,
                      {
                        className: `text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground/50 block`,
                        children: `Analytics`,
                      },
                      void 0,
                      !1,
                      { fileName: _, lineNumber: 321, columnNumber: 11 },
                      this,
                    ),
                    (0, g.jsxDEV)(
                      `h2`,
                      {
                        className: `text-[15px] font-semibold tracking-tight text-foreground/90`,
                        children: `Activity`,
                      },
                      void 0,
                      !1,
                      { fileName: _, lineNumber: 324, columnNumber: 11 },
                      this,
                    ),
                  ],
                },
                void 0,
                !0,
                { fileName: _, lineNumber: 320, columnNumber: 9 },
                this,
              ),
              (0, g.jsxDEV)(
                `div`,
                {
                  className: `grid grid-cols-2 gap-3`,
                  children: [
                    (0, g.jsxDEV)(
                      `div`,
                      {
                        className: `rounded-xl border border-border bg-surface/25 p-3.5 text-left`,
                        children: [
                          (0, g.jsxDEV)(
                            `p`,
                            {
                              className: `text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/50`,
                              children: `Listening Time`,
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 328, columnNumber: 13 },
                            this,
                          ),
                          (0, g.jsxDEV)(
                            `h3`,
                            {
                              className: `mt-1 text-lg font-semibold text-foreground`,
                              children: `1,248m`,
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 331, columnNumber: 13 },
                            this,
                          ),
                          (0, g.jsxDEV)(
                            `div`,
                            {
                              className: `mt-3 h-1 w-full rounded-full bg-foreground/5 overflow-hidden`,
                              children: (0, g.jsxDEV)(
                                `div`,
                                { className: `h-full w-[78%] rounded-full bg-accent/80` },
                                void 0,
                                !1,
                                { fileName: _, lineNumber: 333, columnNumber: 15 },
                                this,
                              ),
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 332, columnNumber: 13 },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      { fileName: _, lineNumber: 327, columnNumber: 11 },
                      this,
                    ),
                    (0, g.jsxDEV)(
                      `div`,
                      {
                        className: `rounded-xl border border-border bg-surface/25 p-3.5 text-left`,
                        children: [
                          (0, g.jsxDEV)(
                            `p`,
                            {
                              className: `text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/50`,
                              children: `Saved Tracks`,
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 338, columnNumber: 13 },
                            this,
                          ),
                          (0, g.jsxDEV)(
                            `h3`,
                            {
                              className: `mt-1 text-lg font-semibold text-foreground`,
                              children: `87`,
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 341, columnNumber: 13 },
                            this,
                          ),
                          (0, g.jsxDEV)(
                            `div`,
                            {
                              className: `mt-3 flex items-center gap-1 text-[10px] text-accent/80 font-medium`,
                              children: [
                                (0, g.jsxDEV)(
                                  f,
                                  { className: `h-3 w-3`, strokeWidth: 2 },
                                  void 0,
                                  !1,
                                  { fileName: _, lineNumber: 343, columnNumber: 15 },
                                  this,
                                ),
                                ` HQ Audio`,
                              ],
                            },
                            void 0,
                            !0,
                            { fileName: _, lineNumber: 342, columnNumber: 13 },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      { fileName: _, lineNumber: 337, columnNumber: 11 },
                      this,
                    ),
                  ],
                },
                void 0,
                !0,
                { fileName: _, lineNumber: 326, columnNumber: 9 },
                this,
              ),
            ],
          },
          void 0,
          !0,
          { fileName: _, lineNumber: 319, columnNumber: 7 },
          this,
        ),
        (0, g.jsxDEV)(
          `section`,
          {
            className: `px-4 mb-8`,
            children: [
              (0, g.jsxDEV)(
                `div`,
                {
                  className: `mb-2.5 flex items-end justify-between`,
                  children: [
                    (0, g.jsxDEV)(
                      `div`,
                      {
                        children: [
                          (0, g.jsxDEV)(
                            `span`,
                            {
                              className: `text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground/50 block`,
                              children: `Soundboard`,
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 353, columnNumber: 13 },
                            this,
                          ),
                          (0, g.jsxDEV)(
                            `h2`,
                            {
                              className: `text-[15px] font-semibold tracking-tight text-foreground/90`,
                              children: `Equalizer`,
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 356, columnNumber: 13 },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      { fileName: _, lineNumber: 352, columnNumber: 11 },
                      this,
                    ),
                    (0, g.jsxDEV)(
                      `span`,
                      {
                        className: `rounded-full bg-accent/10 px-2.5 py-0.5 text-[9px] font-bold text-accent`,
                        children: $.label,
                      },
                      void 0,
                      !1,
                      { fileName: _, lineNumber: 360, columnNumber: 11 },
                      this,
                    ),
                  ],
                },
                void 0,
                !0,
                { fileName: _, lineNumber: 351, columnNumber: 9 },
                this,
              ),
              (0, g.jsxDEV)(
                `div`,
                {
                  className: `rounded-xl border border-border bg-surface/25 p-3.5`,
                  children: [
                    (0, g.jsxDEV)(
                      `div`,
                      {
                        className: `mb-4 flex h-14 items-end justify-center gap-1.5 rounded-lg bg-foreground/5 px-3 py-2 border border-border/30`,
                        children: $.values.map((e, t) => {
                          let n = 0.5 + (100 - e) * 0.015;
                          return (0, g.jsxDEV)(
                            `div`,
                            {
                              className: `flex flex-col items-center flex-1 h-full justify-end`,
                              children: [
                                (0, g.jsxDEV)(
                                  r.div,
                                  {
                                    animate: {
                                      height: [`${e * 0.3}%`, `${e * 0.95}%`, `${e * 0.3}%`],
                                    },
                                    transition: {
                                      repeat: 1 / 0,
                                      duration: n,
                                      ease: `easeInOut`,
                                      delay: t * 0.08,
                                    },
                                    className: `w-full rounded-full bg-accent/80`,
                                    style: { maxHeight: `100%` },
                                  },
                                  void 0,
                                  !1,
                                  { fileName: _, lineNumber: 370, columnNumber: 19 },
                                  this,
                                ),
                                (0, g.jsxDEV)(
                                  `span`,
                                  {
                                    className: `text-[8px] text-muted-foreground/50 mt-1`,
                                    children: [`32Hz`, `250Hz`, `1kHz`, `4kHz`, `16kHz`][t],
                                  },
                                  void 0,
                                  !1,
                                  { fileName: _, lineNumber: 380, columnNumber: 19 },
                                  this,
                                ),
                              ],
                            },
                            t,
                            !0,
                            { fileName: _, lineNumber: 369, columnNumber: 20 },
                            this,
                          );
                        }),
                      },
                      void 0,
                      !1,
                      { fileName: _, lineNumber: 366, columnNumber: 11 },
                      this,
                    ),
                    (0, g.jsxDEV)(
                      `div`,
                      {
                        className: `space-y-0.5`,
                        children: x.map((e) => {
                          let t = R === e.id;
                          return (0, g.jsxDEV)(
                            `button`,
                            {
                              onClick: () => Q(e.id),
                              className: `flex w-full items-center justify-between rounded-lg p-2 text-left transition-colors ${t ? `bg-accent/5` : `hover:bg-foreground/5`}`,
                              children: [
                                (0, g.jsxDEV)(
                                  `span`,
                                  {
                                    className: `text-[12px] font-medium ${t ? `text-accent` : `text-foreground/80`}`,
                                    children: e.label,
                                  },
                                  void 0,
                                  !1,
                                  { fileName: _, lineNumber: 391, columnNumber: 19 },
                                  this,
                                ),
                                t &&
                                  (0, g.jsxDEV)(
                                    u,
                                    { className: `h-3.5 w-3.5 text-accent`, strokeWidth: 2.5 },
                                    void 0,
                                    !1,
                                    { fileName: _, lineNumber: 394, columnNumber: 30 },
                                    this,
                                  ),
                              ],
                            },
                            e.id,
                            !0,
                            { fileName: _, lineNumber: 390, columnNumber: 20 },
                            this,
                          );
                        }),
                      },
                      void 0,
                      !1,
                      { fileName: _, lineNumber: 387, columnNumber: 11 },
                      this,
                    ),
                  ],
                },
                void 0,
                !0,
                { fileName: _, lineNumber: 365, columnNumber: 9 },
                this,
              ),
            ],
          },
          void 0,
          !0,
          { fileName: _, lineNumber: 350, columnNumber: 7 },
          this,
        ),
        (0, g.jsxDEV)(
          `section`,
          {
            className: `px-4 mb-8`,
            children: [
              (0, g.jsxDEV)(
                `div`,
                {
                  className: `mb-2.5`,
                  children: [
                    (0, g.jsxDEV)(
                      `span`,
                      {
                        className: `text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground/50 block`,
                        children: `Bandwidth`,
                      },
                      void 0,
                      !1,
                      { fileName: _, lineNumber: 404, columnNumber: 11 },
                      this,
                    ),
                    (0, g.jsxDEV)(
                      `h2`,
                      {
                        className: `text-[15px] font-semibold tracking-tight text-foreground/90`,
                        children: `Audio Quality`,
                      },
                      void 0,
                      !1,
                      { fileName: _, lineNumber: 407, columnNumber: 11 },
                      this,
                    ),
                  ],
                },
                void 0,
                !0,
                { fileName: _, lineNumber: 403, columnNumber: 9 },
                this,
              ),
              (0, g.jsxDEV)(
                `div`,
                {
                  className: `rounded-xl border border-border bg-surface/25 p-1`,
                  children: (0, g.jsxDEV)(
                    `div`,
                    {
                      className: `grid grid-cols-4 gap-1`,
                      children: b.map((e) =>
                        (0, g.jsxDEV)(
                          `button`,
                          {
                            onClick: () => Z(e.value),
                            className: `flex flex-col items-center justify-center rounded-lg py-1.5 px-1 text-center transition-all ${I === e.value ? `bg-foreground text-background font-semibold shadow-sm` : `hover:bg-foreground/5 text-foreground/80 font-medium`}`,
                            children: (0, g.jsxDEV)(
                              `span`,
                              { className: `text-[11px] tracking-tight`, children: e.label },
                              void 0,
                              !1,
                              { fileName: _, lineNumber: 417, columnNumber: 19 },
                              this,
                            ),
                          },
                          e.value,
                          !1,
                          { fileName: _, lineNumber: 416, columnNumber: 20 },
                          this,
                        ),
                      ),
                    },
                    void 0,
                    !1,
                    { fileName: _, lineNumber: 413, columnNumber: 11 },
                    this,
                  ),
                },
                void 0,
                !1,
                { fileName: _, lineNumber: 412, columnNumber: 9 },
                this,
              ),
            ],
          },
          void 0,
          !0,
          { fileName: _, lineNumber: 402, columnNumber: 7 },
          this,
        ),
        (0, g.jsxDEV)(
          `section`,
          {
            className: `px-4 mb-8`,
            children: [
              (0, g.jsxDEV)(
                `div`,
                {
                  className: `mb-2.5`,
                  children: [
                    (0, g.jsxDEV)(
                      `span`,
                      {
                        className: `text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground/50 block`,
                        children: `Visuals`,
                      },
                      void 0,
                      !1,
                      { fileName: _, lineNumber: 427, columnNumber: 11 },
                      this,
                    ),
                    (0, g.jsxDEV)(
                      `h2`,
                      {
                        className: `text-[15px] font-semibold tracking-tight text-foreground/90`,
                        children: `App Themes`,
                      },
                      void 0,
                      !1,
                      { fileName: _, lineNumber: 430, columnNumber: 11 },
                      this,
                    ),
                  ],
                },
                void 0,
                !0,
                { fileName: _, lineNumber: 426, columnNumber: 9 },
                this,
              ),
              (0, g.jsxDEV)(
                `div`,
                {
                  className: `grid grid-cols-2 gap-3`,
                  children: o.map((e) => {
                    let t = W === e.id;
                    return (0, g.jsxDEV)(
                      `button`,
                      {
                        onClick: () => te(e.id),
                        className: `relative flex items-center gap-2.5 rounded-xl border p-2 text-left transition-all ${t ? `border-accent bg-accent/5` : `border-border bg-surface/20 hover:bg-foreground/5`}`,
                        children: [
                          (0, g.jsxDEV)(
                            `div`,
                            {
                              className: `flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-border`,
                              style: { backgroundColor: e.background },
                              children: (0, g.jsxDEV)(
                                `div`,
                                {
                                  className: `h-1.5 w-1.5 rounded-full`,
                                  style: { backgroundColor: e.accent },
                                },
                                void 0,
                                !1,
                                { fileName: _, lineNumber: 442, columnNumber: 19 },
                                this,
                              ),
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 439, columnNumber: 17 },
                            this,
                          ),
                          (0, g.jsxDEV)(
                            `div`,
                            {
                              className: `flex-1 overflow-hidden pr-2`,
                              children: (0, g.jsxDEV)(
                                `h4`,
                                {
                                  className: `text-[11px] font-medium text-foreground truncate tracking-tight`,
                                  children: e.name,
                                },
                                void 0,
                                !1,
                                { fileName: _, lineNumber: 447, columnNumber: 19 },
                                this,
                              ),
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 446, columnNumber: 17 },
                            this,
                          ),
                          t &&
                            (0, g.jsxDEV)(
                              `div`,
                              {
                                className: `absolute right-2 top-2 rounded-full bg-accent p-0.5 text-white`,
                                children: (0, g.jsxDEV)(
                                  u,
                                  { className: `h-2 w-2`, strokeWidth: 3 },
                                  void 0,
                                  !1,
                                  { fileName: _, lineNumber: 452, columnNumber: 21 },
                                  this,
                                ),
                              },
                              void 0,
                              !1,
                              { fileName: _, lineNumber: 451, columnNumber: 28 },
                              this,
                            ),
                        ],
                      },
                      e.id,
                      !0,
                      { fileName: _, lineNumber: 438, columnNumber: 18 },
                      this,
                    );
                  }),
                },
                void 0,
                !1,
                { fileName: _, lineNumber: 435, columnNumber: 9 },
                this,
              ),
            ],
          },
          void 0,
          !0,
          { fileName: _, lineNumber: 425, columnNumber: 7 },
          this,
        ),
        (0, g.jsxDEV)(
          `section`,
          {
            className: `px-4 mb-8`,
            children: [
              (0, g.jsxDEV)(
                `div`,
                {
                  className: `mb-2.5`,
                  children: [
                    (0, g.jsxDEV)(
                      `span`,
                      {
                        className: `text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground/50 block`,
                        children: `Operations`,
                      },
                      void 0,
                      !1,
                      { fileName: _, lineNumber: 462, columnNumber: 11 },
                      this,
                    ),
                    (0, g.jsxDEV)(
                      `h2`,
                      {
                        className: `text-[15px] font-semibold tracking-tight text-foreground/90`,
                        children: `System`,
                      },
                      void 0,
                      !1,
                      { fileName: _, lineNumber: 465, columnNumber: 11 },
                      this,
                    ),
                  ],
                },
                void 0,
                !0,
                { fileName: _, lineNumber: 461, columnNumber: 9 },
                this,
              ),
              (0, g.jsxDEV)(
                `div`,
                {
                  className: `rounded-xl border border-border bg-surface/25 p-3.5 space-y-3`,
                  children: [
                    (0, g.jsxDEV)(
                      `div`,
                      {
                        className: `flex items-center justify-between border-b border-border pb-2.5`,
                        children: [
                          (0, g.jsxDEV)(
                            `div`,
                            {
                              children: (0, g.jsxDEV)(
                                `h4`,
                                {
                                  className: `text-[12px] font-medium text-foreground`,
                                  children: `Cellular Streaming`,
                                },
                                void 0,
                                !1,
                                { fileName: _, lineNumber: 471, columnNumber: 15 },
                                this,
                              ),
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 470, columnNumber: 13 },
                            this,
                          ),
                          (0, g.jsxDEV)(
                            `button`,
                            {
                              onClick: ne,
                              className: `relative h-4.5 w-8 rounded-full p-0.5 transition-colors duration-300 ${A ? `bg-accent` : `bg-foreground/10`}`,
                              children: (0, g.jsxDEV)(
                                r.div,
                                {
                                  layout: !0,
                                  className: `h-3.5 w-3.5 rounded-full bg-white shadow-sm`,
                                  animate: { x: A ? 14 : 0 },
                                  transition: { type: `spring`, stiffness: 500, damping: 30 },
                                },
                                void 0,
                                !1,
                                { fileName: _, lineNumber: 474, columnNumber: 15 },
                                this,
                              ),
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 473, columnNumber: 13 },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      { fileName: _, lineNumber: 469, columnNumber: 11 },
                      this,
                    ),
                    (0, g.jsxDEV)(
                      `div`,
                      {
                        className: `flex items-center justify-between border-b border-border pb-2.5`,
                        children: [
                          (0, g.jsxDEV)(
                            `div`,
                            {
                              children: (0, g.jsxDEV)(
                                `h4`,
                                {
                                  className: `text-[12px] font-medium text-foreground`,
                                  children: `Autoplay Next`,
                                },
                                void 0,
                                !1,
                                { fileName: _, lineNumber: 486, columnNumber: 15 },
                                this,
                              ),
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 485, columnNumber: 13 },
                            this,
                          ),
                          (0, g.jsxDEV)(
                            `button`,
                            {
                              onClick: re,
                              className: `relative h-4.5 w-8 rounded-full p-0.5 transition-colors duration-300 ${M ? `bg-accent` : `bg-foreground/10`}`,
                              children: (0, g.jsxDEV)(
                                r.div,
                                {
                                  layout: !0,
                                  className: `h-3.5 w-3.5 rounded-full bg-white shadow-sm`,
                                  animate: { x: M ? 14 : 0 },
                                  transition: { type: `spring`, stiffness: 500, damping: 30 },
                                },
                                void 0,
                                !1,
                                { fileName: _, lineNumber: 489, columnNumber: 15 },
                                this,
                              ),
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 488, columnNumber: 13 },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      { fileName: _, lineNumber: 484, columnNumber: 11 },
                      this,
                    ),
                    (0, g.jsxDEV)(
                      `div`,
                      {
                        className: `flex items-center justify-between border-b border-border pb-2.5`,
                        children: [
                          (0, g.jsxDEV)(
                            `div`,
                            {
                              children: (0, g.jsxDEV)(
                                `h4`,
                                {
                                  className: `text-[12px] font-medium text-foreground`,
                                  children: `Push Notifications`,
                                },
                                void 0,
                                !1,
                                { fileName: _, lineNumber: 501, columnNumber: 15 },
                                this,
                              ),
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 500, columnNumber: 13 },
                            this,
                          ),
                          (0, g.jsxDEV)(
                            `button`,
                            {
                              onClick: ie,
                              className: `relative h-4.5 w-8 rounded-full p-0.5 transition-colors duration-300 ${P ? `bg-accent` : `bg-foreground/10`}`,
                              children: (0, g.jsxDEV)(
                                r.div,
                                {
                                  layout: !0,
                                  className: `h-3.5 w-3.5 rounded-full bg-white shadow-sm`,
                                  animate: { x: P ? 14 : 0 },
                                  transition: { type: `spring`, stiffness: 500, damping: 30 },
                                },
                                void 0,
                                !1,
                                { fileName: _, lineNumber: 504, columnNumber: 15 },
                                this,
                              ),
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 503, columnNumber: 13 },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      { fileName: _, lineNumber: 499, columnNumber: 11 },
                      this,
                    ),
                    (0, g.jsxDEV)(
                      `div`,
                      {
                        className: `flex flex-col gap-2.5 border-b border-border pb-2.5`,
                        children: [
                          (0, g.jsxDEV)(
                            `div`,
                            {
                              className: `flex items-center justify-between`,
                              children: [
                                (0, g.jsxDEV)(
                                  `div`,
                                  {
                                    children: [
                                      (0, g.jsxDEV)(
                                        `h4`,
                                        {
                                          className: `text-[12px] font-medium text-foreground`,
                                          children: `Sleep Timer`,
                                        },
                                        void 0,
                                        !1,
                                        { fileName: _, lineNumber: 518, columnNumber: 17 },
                                        this,
                                      ),
                                      (0, g.jsxDEV)(
                                        `p`,
                                        {
                                          className: `text-[10px] text-muted-foreground/60 mt-0.5`,
                                          children:
                                            e === null
                                              ? `Automatically stop playback after countdown`
                                              : (0, g.jsxDEV)(
                                                  `span`,
                                                  {
                                                    className: `text-accent font-semibold animate-pulse`,
                                                    children: [`Active: `, v(e), ` left`],
                                                  },
                                                  void 0,
                                                  !0,
                                                  {
                                                    fileName: _,
                                                    lineNumber: 520,
                                                    columnNumber: 51,
                                                  },
                                                  this,
                                                ),
                                        },
                                        void 0,
                                        !1,
                                        { fileName: _, lineNumber: 519, columnNumber: 17 },
                                        this,
                                      ),
                                    ],
                                  },
                                  void 0,
                                  !0,
                                  { fileName: _, lineNumber: 517, columnNumber: 15 },
                                  this,
                                ),
                                e !== null &&
                                  (0, g.jsxDEV)(
                                    `button`,
                                    {
                                      onClick: () => t(null),
                                      className: `rounded-lg bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1 text-[11px] font-semibold text-red-400 transition`,
                                      children: `Cancel`,
                                    },
                                    void 0,
                                    !1,
                                    { fileName: _, lineNumber: 526, columnNumber: 48 },
                                    this,
                                  ),
                              ],
                            },
                            void 0,
                            !0,
                            { fileName: _, lineNumber: 516, columnNumber: 13 },
                            this,
                          ),
                          (0, g.jsxDEV)(
                            `div`,
                            {
                              className: `flex flex-wrap gap-1.5`,
                              children: [5, 15, 30, 45, 60].map((n) =>
                                (0, g.jsxDEV)(
                                  `button`,
                                  {
                                    onClick: () => t(n),
                                    className: `rounded-lg px-3 py-1 text-[11px] font-medium border transition-all ${e !== null && Math.ceil(e / 60) === n ? `bg-accent/15 border-accent text-accent shadow-sm font-semibold` : `border-border bg-foreground/5 hover:bg-foreground/10 text-foreground/80`}`,
                                    children: [n, `m`],
                                  },
                                  n,
                                  !0,
                                  { fileName: _, lineNumber: 534, columnNumber: 22 },
                                  this,
                                ),
                              ),
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 531, columnNumber: 13 },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      { fileName: _, lineNumber: 515, columnNumber: 11 },
                      this,
                    ),
                    (0, g.jsxDEV)(
                      `div`,
                      {
                        className: `flex items-center justify-between pt-1`,
                        children: [
                          (0, g.jsxDEV)(
                            `div`,
                            {
                              children: [
                                (0, g.jsxDEV)(
                                  `h4`,
                                  {
                                    className: `text-[12px] font-medium text-foreground`,
                                    children: `Music Cache`,
                                  },
                                  void 0,
                                  !1,
                                  { fileName: _, lineNumber: 544, columnNumber: 15 },
                                  this,
                                ),
                                (0, g.jsxDEV)(
                                  `p`,
                                  {
                                    className: `text-[10px] text-muted-foreground/60 mt-0.5`,
                                    children: [
                                      `Using `,
                                      (0, g.jsxDEV)(
                                        `span`,
                                        {
                                          className: `text-foreground font-medium`,
                                          children: [B.toFixed(1), ` MB`],
                                        },
                                        void 0,
                                        !0,
                                        { fileName: _, lineNumber: 546, columnNumber: 23 },
                                        this,
                                      ),
                                    ],
                                  },
                                  void 0,
                                  !0,
                                  { fileName: _, lineNumber: 545, columnNumber: 15 },
                                  this,
                                ),
                              ],
                            },
                            void 0,
                            !0,
                            { fileName: _, lineNumber: 543, columnNumber: 13 },
                            this,
                          ),
                          (0, g.jsxDEV)(
                            `button`,
                            {
                              onClick: ae,
                              disabled: H || B === 0,
                              className: `flex items-center gap-1.5 rounded-lg border border-border bg-foreground/5 px-2.5 py-1 text-[11px] font-medium text-foreground transition active:scale-95 disabled:pointer-events-none disabled:opacity-40 hover:bg-foreground/10`,
                              children: H ? `Clearing...` : `Clear`,
                            },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 549, columnNumber: 13 },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      { fileName: _, lineNumber: 542, columnNumber: 11 },
                      this,
                    ),
                  ],
                },
                void 0,
                !0,
                { fileName: _, lineNumber: 468, columnNumber: 9 },
                this,
              ),
            ],
          },
          void 0,
          !0,
          { fileName: _, lineNumber: 460, columnNumber: 7 },
          this,
        ),
        (0, g.jsxDEV)(
          `section`,
          {
            className: `px-4 text-center text-muted-foreground/50 mt-12 mb-6`,
            children: [
              (0, g.jsxDEV)(
                `p`,
                {
                  className: `text-[11px] font-semibold uppercase tracking-widest`,
                  children: `Sonora v1.4.2`,
                },
                void 0,
                !1,
                { fileName: _, lineNumber: 558, columnNumber: 9 },
                this,
              ),
              (0, g.jsxDEV)(
                `p`,
                { className: `text-[9px] mt-1`, children: `Crafted with precision & care` },
                void 0,
                !1,
                { fileName: _, lineNumber: 559, columnNumber: 9 },
                this,
              ),
            ],
          },
          void 0,
          !0,
          { fileName: _, lineNumber: 557, columnNumber: 7 },
          this,
        ),
      ],
    },
    void 0,
    !0,
    { fileName: _, lineNumber: 232, columnNumber: 10 },
    this,
  );
}
export { S as component };
