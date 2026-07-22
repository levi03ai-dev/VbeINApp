import {
  Q as e,
  _ as t,
  a as n,
  b as r,
  c as i,
  et as a,
  h as o,
  l as s,
  x as c,
  y as l,
} from "./utils-D7eUi7KG.js";
import { a as u, i as d } from "./cards-bOKhEVTn.js";
import { d as f, f as p, o as m, s as h, y as g } from "./index-By-AziC4.js";
var _ = l(`mic`, [
    [`path`, { d: `M12 19v3`, key: `npa21l` }],
    [`path`, { d: `M19 10v2a7 7 0 0 1-14 0v-2`, key: `1vc78b` }],
    [`rect`, { x: `9`, y: `2`, width: `6`, height: `13`, rx: `3`, key: `s6n7sd` }],
  ]),
  v = a(e()),
  y = t(),
  b = `/app/applet/src/routes/search.tsx?tsr-split=component`,
  x = [
    { id: `top`, label: `Top` },
    { id: `songs`, label: `Songs` },
    { id: `albums`, label: `Albums` },
    { id: `artists`, label: `Artists` },
  ];
function S() {
  return (0, v.useMemo)(() => {
    let e = new Map();
    for (let t of o) {
      let n = e.get(t.artist);
      n ? n.count++ : e.set(t.artist, { name: t.artist, gradient: t.gradient, count: 1 });
    }
    for (let t of i) {
      let n = e.get(t.artist);
      n ? n.count++ : e.set(t.artist, { name: t.artist, gradient: t.gradient, count: 1 });
    }
    return Array.from(e.values());
  }, []);
}
function C() {
  let [e, t] = (0, v.useState)(``),
    [a, l] = (0, v.useState)(`top`),
    [u, C] = (0, v.useState)([]),
    [D, O] = (0, v.useState)(!1),
    k = S(),
    { setTrack: A, openNowPlaying: j, setQueue: M } = n();
  (0, v.useEffect)(() => {
    let t = e.trim();
    if (!t) {
      (C([]), O(!1));
      return;
    }
    O(!0);
    let n = setTimeout(async () => {
      try {
        let e = await h(t, 30);
        C(e);
      } catch (e) {
        console.error(`Failed to fetch Jamendo results:`, e);
      } finally {
        O(!1);
      }
    }, 400);
    return () => clearTimeout(n);
  }, [e]);
  let N = e.trim().toLowerCase(),
    P = (0, v.useMemo)(
      () =>
        N
          ? {
              songs:
                u.length > 0
                  ? u
                  : o.filter((e) => (e.title + e.artist + e.album).toLowerCase().includes(N)),
              albums: i.filter((e) => (e.title + e.artist).toLowerCase().includes(N)),
              artists: k.filter((e) => e.name.toLowerCase().includes(N)),
            }
          : null,
      [N, u, k],
    );
  return (0, y.jsxDEV)(
    `div`,
    {
      className: `pt-4`,
      children: [
        (0, y.jsxDEV)(
          `div`,
          {
            className: `px-4`,
            children: [
              (0, y.jsxDEV)(
                `h1`,
                {
                  className: `text-[24px] font-semibold tracking-tight text-foreground/90`,
                  children: `Search`,
                },
                void 0,
                !1,
                { fileName: b, lineNumber: 94, columnNumber: 9 },
                this,
              ),
              (0, y.jsxDEV)(
                `div`,
                {
                  className: `mt-3 flex items-center gap-2.5 rounded-xl border border-border bg-surface/40 px-3 py-2`,
                  children: [
                    (0, y.jsxDEV)(
                      p,
                      { className: `h-4 w-4 text-muted-foreground/60` },
                      void 0,
                      !1,
                      { fileName: b, lineNumber: 96, columnNumber: 11 },
                      this,
                    ),
                    (0, y.jsxDEV)(
                      `input`,
                      {
                        value: e,
                        onChange: (e) => t(e.target.value),
                        placeholder: `Artists, songs, albums`,
                        className: `w-full bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none`,
                      },
                      void 0,
                      !1,
                      { fileName: b, lineNumber: 97, columnNumber: 11 },
                      this,
                    ),
                    e
                      ? (0, y.jsxDEV)(
                          `button`,
                          {
                            onClick: () => t(``),
                            className: `text-muted-foreground/60 hover:text-foreground`,
                            children: (0, y.jsxDEV)(
                              f,
                              { className: `h-4 w-4` },
                              void 0,
                              !1,
                              { fileName: b, lineNumber: 99, columnNumber: 15 },
                              this,
                            ),
                          },
                          void 0,
                          !1,
                          { fileName: b, lineNumber: 98, columnNumber: 16 },
                          this,
                        )
                      : (0, y.jsxDEV)(
                          _,
                          { className: `h-4 w-4 text-muted-foreground/50` },
                          void 0,
                          !1,
                          { fileName: b, lineNumber: 100, columnNumber: 25 },
                          this,
                        ),
                  ],
                },
                void 0,
                !0,
                { fileName: b, lineNumber: 95, columnNumber: 9 },
                this,
              ),
              D &&
                (0, y.jsxDEV)(
                  `div`,
                  {
                    className: `mt-2 h-0.5 w-full overflow-hidden rounded bg-foreground/10 relative`,
                    children: (0, y.jsxDEV)(
                      r.div,
                      {
                        initial: { left: `-50%` },
                        animate: { left: `100%` },
                        transition: { repeat: 1 / 0, duration: 1.2, ease: `linear` },
                        className: `absolute h-full w-[50%] bg-foreground/30 rounded`,
                      },
                      void 0,
                      !1,
                      { fileName: b, lineNumber: 104, columnNumber: 13 },
                      this,
                    ),
                  },
                  void 0,
                  !1,
                  { fileName: b, lineNumber: 103, columnNumber: 25 },
                  this,
                ),
              P &&
                (0, y.jsxDEV)(
                  g,
                  {
                    children: (0, y.jsxDEV)(
                      `div`,
                      {
                        className: `no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1`,
                        children: x.map((e) => {
                          let t = a === e.id;
                          return (0, y.jsxDEV)(
                            `button`,
                            {
                              onClick: () => l(e.id),
                              className: `relative rounded-full px-4 py-1 text-[12px] font-medium transition ${t ? `text-background` : `text-foreground/80 hover:text-foreground`}`,
                              children: [
                                t &&
                                  (0, y.jsxDEV)(
                                    r.span,
                                    {
                                      layoutId: `cat-pill`,
                                      transition: {
                                        type: `spring`,
                                        stiffness: 180,
                                        damping: 26,
                                        mass: 1.1,
                                      },
                                      className: `absolute inset-0 -z-10 rounded-full bg-foreground`,
                                    },
                                    void 0,
                                    !1,
                                    { fileName: b, lineNumber: 120, columnNumber: 32 },
                                    this,
                                  ),
                                !t &&
                                  (0, y.jsxDEV)(
                                    `span`,
                                    {
                                      className: `absolute inset-0 -z-10 rounded-full border border-border bg-surface/30`,
                                    },
                                    void 0,
                                    !1,
                                    { fileName: b, lineNumber: 126, columnNumber: 33 },
                                    this,
                                  ),
                                e.label,
                              ],
                            },
                            e.id,
                            !0,
                            { fileName: b, lineNumber: 119, columnNumber: 20 },
                            this,
                          );
                        }),
                      },
                      void 0,
                      !1,
                      { fileName: b, lineNumber: 116, columnNumber: 13 },
                      this,
                    ),
                  },
                  void 0,
                  !1,
                  { fileName: b, lineNumber: 115, columnNumber: 21 },
                  this,
                ),
            ],
          },
          void 0,
          !0,
          { fileName: b, lineNumber: 93, columnNumber: 7 },
          this,
        ),
        (0, y.jsxDEV)(
          c,
          {
            mode: `wait`,
            initial: !1,
            children: P
              ? (0, y.jsxDEV)(
                  r.div,
                  {
                    initial: { opacity: 0, y: 18, filter: `blur(10px)` },
                    animate: { opacity: 1, y: 0, filter: `blur(0px)` },
                    exit: { opacity: 0, y: -14, filter: `blur(10px)` },
                    transition: { duration: 0.65, ease: [0.32, 0.72, 0, 1] },
                    className: `mt-5 px-4`,
                    children: [
                      (a === `top` || a === `artists`) &&
                        P.artists.length > 0 &&
                        (0, y.jsxDEV)(
                          w,
                          {
                            title: `Artists`,
                            children: (0, y.jsxDEV)(
                              `div`,
                              {
                                className: `no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1`,
                                children: P.artists.map((e) =>
                                  (0, y.jsxDEV)(
                                    T,
                                    {
                                      name: e.name,
                                      gradient: e.gradient,
                                      onPlay: () => {
                                        (A({
                                          id: e.name + `-top`,
                                          title: `Ultrawave`,
                                          artist: e.name,
                                          album: `Top Hits`,
                                          duration: `3:34`,
                                          gradient: e.gradient,
                                        }),
                                          j());
                                      },
                                    },
                                    e.name,
                                    !1,
                                    { fileName: b, lineNumber: 153, columnNumber: 45 },
                                    this,
                                  ),
                                ),
                              },
                              void 0,
                              !1,
                              { fileName: b, lineNumber: 152, columnNumber: 17 },
                              this,
                            ),
                          },
                          void 0,
                          !1,
                          { fileName: b, lineNumber: 151, columnNumber: 84 },
                          this,
                        ),
                      (a === `top` || a === `albums`) &&
                        P.albums.length > 0 &&
                        (0, y.jsxDEV)(
                          w,
                          {
                            title: `Albums`,
                            children: (0, y.jsxDEV)(
                              `div`,
                              {
                                className: `grid grid-cols-2 gap-3`,
                                children: P.albums.map((e) =>
                                  (0, y.jsxDEV)(
                                    E,
                                    {
                                      title: e.title,
                                      artist: e.artist,
                                      gradient: e.gradient,
                                      onPlay: () => {
                                        (A({
                                          id: e.id,
                                          title: e.title,
                                          artist: e.artist,
                                          album: e.title,
                                          duration: `3:42`,
                                          gradient: e.gradient,
                                        }),
                                          j());
                                      },
                                    },
                                    e.id,
                                    !1,
                                    { fileName: b, lineNumber: 168, columnNumber: 44 },
                                    this,
                                  ),
                                ),
                              },
                              void 0,
                              !1,
                              { fileName: b, lineNumber: 167, columnNumber: 17 },
                              this,
                            ),
                          },
                          void 0,
                          !1,
                          { fileName: b, lineNumber: 166, columnNumber: 82 },
                          this,
                        ),
                      (a === `top` || a === `songs`) &&
                        P.songs.length > 0 &&
                        (0, y.jsxDEV)(
                          w,
                          {
                            title: `Songs`,
                            children: (0, y.jsxDEV)(
                              `div`,
                              {
                                className: `space-y-0.5`,
                                children: P.songs.map((e, t) =>
                                  (0, y.jsxDEV)(
                                    d,
                                    { track: e, index: t },
                                    e.id,
                                    !1,
                                    { fileName: b, lineNumber: 183, columnNumber: 48 },
                                    this,
                                  ),
                                ),
                              },
                              void 0,
                              !1,
                              { fileName: b, lineNumber: 182, columnNumber: 17 },
                              this,
                            ),
                          },
                          void 0,
                          !1,
                          { fileName: b, lineNumber: 181, columnNumber: 80 },
                          this,
                        ),
                      P.songs.length + P.albums.length + P.artists.length === 0 &&
                        (0, y.jsxDEV)(
                          `p`,
                          {
                            className: `mt-8 text-center text-sm text-muted-foreground/60`,
                            children: [`No results for "`, e, `"`],
                          },
                          void 0,
                          !0,
                          { fileName: b, lineNumber: 186, columnNumber: 93 },
                          this,
                        ),
                    ],
                  },
                  `r-` + a,
                  !0,
                  { fileName: b, lineNumber: 135, columnNumber: 20 },
                  this,
                )
              : (0, y.jsxDEV)(
                  r.div,
                  {
                    initial: { opacity: 0, y: 18, filter: `blur(10px)` },
                    animate: { opacity: 1, y: 0, filter: `blur(0px)` },
                    exit: { opacity: 0, y: -14, filter: `blur(10px)` },
                    transition: { duration: 0.65, ease: [0.32, 0.72, 0, 1] },
                    children: (0, y.jsxDEV)(
                      `section`,
                      {
                        className: `mt-8 px-4`,
                        children: [
                          (0, y.jsxDEV)(
                            `h2`,
                            {
                              className: `text-[16px] font-semibold tracking-tight text-foreground/90 mb-3`,
                              children: `Genres`,
                            },
                            void 0,
                            !1,
                            { fileName: b, lineNumber: 206, columnNumber: 15 },
                            this,
                          ),
                          (0, y.jsxDEV)(
                            `div`,
                            {
                              className: `grid grid-cols-2 gap-3.5 mt-2 grid-flow-row-dense`,
                              children: s.map((e, t) => {
                                let n = t % 5 == 0;
                                return (0, y.jsxDEV)(
                                  r.button,
                                  {
                                    initial: { opacity: 0, y: 14, filter: `blur(6px)` },
                                    animate: { opacity: 1, y: 0, filter: `blur(0px)` },
                                    transition: {
                                      delay: t * 0.04,
                                      duration: 0.6,
                                      ease: [0.32, 0.72, 0, 1],
                                    },
                                    whileTap: { scale: 0.96 },
                                    onClick: async () => {
                                      try {
                                        let t = await m(e.name, 20);
                                        t.length > 0
                                          ? (M(t), A(t[0]), j())
                                          : (A({
                                              id: e.id + `-station`,
                                              title: `${e.name} Mix`,
                                              artist: `Sonora Station`,
                                              album: `${e.name} Radio`,
                                              duration: `3:45`,
                                              gradient: e.gradient,
                                            }),
                                            j());
                                      } catch {
                                        (A({
                                          id: e.id + `-station`,
                                          title: `${e.name} Mix`,
                                          artist: `Sonora Station`,
                                          album: `${e.name} Radio`,
                                          duration: `3:45`,
                                          gradient: e.gradient,
                                        }),
                                          j());
                                      }
                                    },
                                    className: `relative overflow-hidden rounded-xl text-left album-shadow border border-white/5 cursor-pointer transition-all ${n ? `col-span-2 aspect-[21/9]` : `col-span-1 aspect-square`}`,
                                    style: { background: e.gradient },
                                    children: [
                                      (0, y.jsxDEV)(
                                        `div`,
                                        {
                                          className: `absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-black/45 z-10`,
                                        },
                                        void 0,
                                        !1,
                                        { fileName: b, lineNumber: 259, columnNumber: 23 },
                                        this,
                                      ),
                                      (0, y.jsxDEV)(
                                        `span`,
                                        {
                                          className: `absolute bottom-3.5 left-3.5 text-[14px] font-semibold tracking-tight text-white z-20`,
                                          children: e.name,
                                        },
                                        void 0,
                                        !1,
                                        { fileName: b, lineNumber: 260, columnNumber: 23 },
                                        this,
                                      ),
                                    ],
                                  },
                                  e.id,
                                  !0,
                                  { fileName: b, lineNumber: 212, columnNumber: 22 },
                                  this,
                                );
                              }),
                            },
                            void 0,
                            !1,
                            { fileName: b, lineNumber: 209, columnNumber: 15 },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      { fileName: b, lineNumber: 205, columnNumber: 13 },
                      this,
                    ),
                  },
                  `discover`,
                  !1,
                  { fileName: b, lineNumber: 189, columnNumber: 27 },
                  this,
                ),
          },
          void 0,
          !1,
          { fileName: b, lineNumber: 134, columnNumber: 7 },
          this,
        ),
      ],
    },
    void 0,
    !0,
    { fileName: b, lineNumber: 92, columnNumber: 10 },
    this,
  );
}
function w({ title: e, children: t }) {
  return (0, y.jsxDEV)(
    `section`,
    {
      className: `mb-6`,
      children: [
        (0, y.jsxDEV)(
          `span`,
          {
            className: `mb-2.5 block text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground/50`,
            children: e,
          },
          void 0,
          !1,
          { fileName: b, lineNumber: 279, columnNumber: 7 },
          this,
        ),
        t,
      ],
    },
    void 0,
    !0,
    { fileName: b, lineNumber: 278, columnNumber: 10 },
    this,
  );
}
function T({ name: e, gradient: t, onPlay: n }) {
  return (0, y.jsxDEV)(
    r.button,
    {
      whileTap: { scale: 0.95 },
      onClick: n,
      className: `flex w-[84px] shrink-0 flex-col items-center gap-2 text-center`,
      children: [
        (0, y.jsxDEV)(
          `div`,
          {
            className: `h-20 w-20 rounded-full album-shadow border border-white/5 relative overflow-hidden`,
            style: { background: t },
            children: (0, y.jsxDEV)(
              `div`,
              {
                className: `absolute inset-0 bg-[radial-gradient(100%_50%_at_0%_0%,rgba(255,255,255,0.15),transparent_60%)]`,
              },
              void 0,
              !1,
              { fileName: b, lineNumber: 300, columnNumber: 9 },
              this,
            ),
          },
          void 0,
          !1,
          { fileName: b, lineNumber: 297, columnNumber: 7 },
          this,
        ),
        (0, y.jsxDEV)(
          `p`,
          {
            className: `line-clamp-1 text-[11px] font-medium text-foreground/85 tracking-tight`,
            children: e,
          },
          void 0,
          !1,
          { fileName: b, lineNumber: 302, columnNumber: 7 },
          this,
        ),
      ],
    },
    void 0,
    !0,
    { fileName: b, lineNumber: 294, columnNumber: 10 },
    this,
  );
}
function E({ title: e, artist: t, gradient: n, onPlay: i }) {
  return (0, y.jsxDEV)(
    r.button,
    {
      whileTap: { scale: 0.98 },
      onClick: i,
      className: `text-left w-full`,
      children: [
        (0, y.jsxDEV)(
          `div`,
          {
            className: `relative aspect-square overflow-hidden rounded-xl album-shadow border border-white/5`,
            style: { background: n },
            children: [
              (0, y.jsxDEV)(
                `div`,
                {
                  className: `absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/5`,
                },
                void 0,
                !1,
                { fileName: b, lineNumber: 324, columnNumber: 9 },
                this,
              ),
              (0, y.jsxDEV)(
                `span`,
                {
                  className: `absolute right-2.5 bottom-2.5 grid h-7 w-7 place-items-center rounded-full bg-white/95 text-black shadow-sm active:scale-90 transition-transform`,
                  children: (0, y.jsxDEV)(
                    u,
                    { className: `h-3 w-3 fill-current ml-0.5` },
                    void 0,
                    !1,
                    { fileName: b, lineNumber: 326, columnNumber: 11 },
                    this,
                  ),
                },
                void 0,
                !1,
                { fileName: b, lineNumber: 325, columnNumber: 9 },
                this,
              ),
            ],
          },
          void 0,
          !0,
          { fileName: b, lineNumber: 321, columnNumber: 7 },
          this,
        ),
        (0, y.jsxDEV)(
          `p`,
          {
            className: `mt-1.5 line-clamp-1 text-[13px] font-medium text-foreground tracking-tight`,
            children: e,
          },
          void 0,
          !1,
          { fileName: b, lineNumber: 329, columnNumber: 7 },
          this,
        ),
        (0, y.jsxDEV)(
          `p`,
          { className: `line-clamp-1 text-[11px] text-muted-foreground/80`, children: t },
          void 0,
          !1,
          { fileName: b, lineNumber: 332, columnNumber: 7 },
          this,
        ),
      ],
    },
    void 0,
    !0,
    { fileName: b, lineNumber: 318, columnNumber: 10 },
    this,
  );
}
export { C as component };
