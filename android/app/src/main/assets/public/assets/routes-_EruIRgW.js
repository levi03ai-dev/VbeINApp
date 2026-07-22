import {
  Q as e,
  _ as t,
  a as n,
  b as r,
  c as i,
  et as a,
  f as o,
  g as s,
  h as c,
  o as l,
  u,
  v as d,
  x as f,
} from "./utils-D7eUi7KG.js";
import { a as p, i as m, n as h, r as g, t as _ } from "./cards-bOKhEVTn.js";
import { a as v, b as y, i as b, r as x } from "./index-By-AziC4.js";
import { t as S } from "./SeeAllSheet-kEhUssIZ.js";
var C = a(e(), 1),
  w = t(),
  T = `/app/applet/src/components/music/ScrollCarousel.tsx`;
function E({ children: e, autoplayInterval: t = 4e3, className: n = `` }) {
  let [r, i] = (0, C.useState)(0),
    a = (0, C.useRef)(null),
    [o, s] = (0, C.useState)(!1),
    c = (0, C.useRef)(!1),
    l = (0, C.useRef)(null),
    u = e.length,
    d = u > 1,
    f = d
      ? [
          ...e.map((e, t) => (C.isValidElement(e) ? C.cloneElement(e, { key: `set-0-${t}` }) : e)),
          ...e.map((e, t) => (C.isValidElement(e) ? C.cloneElement(e, { key: `set-1-${t}` }) : e)),
          ...e.map((e, t) => (C.isValidElement(e) ? C.cloneElement(e, { key: `set-2-${t}` }) : e)),
        ]
      : e,
    p = C.useCallback(() => {
      let e = a.current;
      if (!e || !d) return;
      let t = Array.from(e.children);
      if (t.length < u * 3) return;
      let n = t[u];
      if (n) {
        let t = e.clientWidth,
          r = n.clientWidth;
        e.scrollLeft = n.offsetLeft - (t - r) / 2;
      }
    }, [u, d]);
  ((0, C.useEffect)(() => {
    let e = setTimeout(() => {
      p();
    }, 50);
    return () => clearTimeout(e);
  }, [p]),
    (0, C.useEffect)(() => {
      if (!d) return;
      let e = () => {
        p();
      };
      return (window.addEventListener(`resize`, e), () => window.removeEventListener(`resize`, e));
    }, [d, p]));
  let m = C.useCallback(() => {
      let e = a.current;
      if (!e || !d) return;
      let t = Array.from(e.children);
      if (t.length < u * 3) return;
      let n = t[u],
        r = t[2 * u - 1],
        i = t[0];
      if (!n || !r || !i) return;
      let o = n.offsetLeft - i.offsetLeft;
      if (o <= 0) return;
      let s = e.scrollLeft,
        c = n.offsetLeft - (e.clientWidth - n.clientWidth) / 2,
        l = r.offsetLeft - (e.clientWidth - r.clientWidth) / 2,
        f = c - o / 2,
        p = l + o / 2;
      s < f
        ? e.scrollTo({ left: s + o, behavior: `auto` })
        : s > p && e.scrollTo({ left: s - o, behavior: `auto` });
    }, [u, d]),
    h = C.useCallback(
      (e) => {
        let t = a.current;
        if (!t) return;
        let n = Array.from(t.children);
        if (e < 0 || e >= n.length) return;
        let r = n[e];
        if (r) {
          let e = t.clientWidth,
            n = r.clientWidth,
            i = r.offsetLeft - (e - n) / 2;
          ((c.current = !0),
            t.scrollTo({ left: i, behavior: `smooth` }),
            setTimeout(() => {
              ((c.current = !1), m());
            }, 600));
        }
      },
      [m],
    ),
    g = () => {
      let e = a.current;
      if (!e) return;
      c.current || m();
      let t = e.scrollLeft,
        n = e.clientWidth,
        o = Array.from(e.children);
      if (o.length === 0) return;
      let s = 0,
        l = 1 / 0;
      for (let e = 0; e < o.length; e++) {
        let r = o[e],
          i = r.offsetLeft + r.clientWidth / 2,
          a = t + n / 2,
          c = Math.abs(i - a);
        c < l && ((l = c), (s = e));
      }
      let f = d ? s % u : s;
      f !== r && i(f);
    };
  (0, C.useEffect)(() => {
    if (o || !d) return;
    let e = setInterval(() => {
      let e = u + r + 1;
      h(e);
    }, t);
    return () => clearInterval(e);
  }, [r, o, u, t, d, h]);
  let _ = () => {
      (s(!0), l.current && clearTimeout(l.current));
    },
    v = () => {
      l.current = setTimeout(() => {
        s(!1);
      }, 8e3);
    };
  return (
    (0, C.useEffect)(
      () => () => {
        l.current && clearTimeout(l.current);
      },
      [],
    ),
    (0, w.jsxDEV)(
      `div`,
      {
        className: `w-full relative group/carousel`,
        children: [
          (0, w.jsxDEV)(
            `div`,
            {
              ref: a,
              onScroll: g,
              onTouchStart: _,
              onTouchEnd: v,
              onMouseDown: _,
              onMouseUp: v,
              onMouseEnter: _,
              onMouseLeave: v,
              className: `no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-1 ${n}`,
              children: f,
            },
            void 0,
            !1,
            { fileName: T, lineNumber: 218, columnNumber: 7 },
            this,
          ),
          u > 1 &&
            (0, w.jsxDEV)(
              `div`,
              {
                className: `flex justify-center gap-1.5 mt-3`,
                children: e.map((e, t) =>
                  (0, w.jsxDEV)(
                    `button`,
                    {
                      onClick: () => {
                        (_(), h(d ? u + t : t), v());
                      },
                      className: `h-1.5 rounded-full transition-all duration-300 ${r === t ? `w-5 bg-accent` : `w-1.5 bg-white/20`}`,
                      "aria-label": `Go to slide ${t + 1}`,
                    },
                    t,
                    !1,
                    { fileName: T, lineNumber: 236, columnNumber: 13 },
                    this,
                  ),
                ),
              },
              void 0,
              !1,
              { fileName: T, lineNumber: 234, columnNumber: 9 },
              this,
            ),
        ],
      },
      void 0,
      !0,
      { fileName: T, lineNumber: 216, columnNumber: 5 },
      this,
    )
  );
}
var D = `/app/applet/src/routes/index.tsx?tsr-split=component`;
function O() {
  let { setTrack: e, openNowPlaying: t } = n(),
    [a, y] = (0, C.useState)([]),
    [T, O] = (0, C.useState)([]),
    [j, M] = (0, C.useState)([]),
    [N, P] = (0, C.useState)(null);
  return (
    (0, C.useEffect)(() => {
      async function e() {
        try {
          let [e, t, n] = await Promise.all([v(15), b(10), x(10)]);
          (e && e.length > 0 && y(e), t && t.length > 0 && O(t), n && n.length > 0 && M(n));
        } catch (e) {
          console.error(`Failed to load homepage data:`, e);
        }
      }
      e();
    }, []),
    (0, w.jsxDEV)(
      `div`,
      {
        className: `pt-3`,
        children: [
          (0, w.jsxDEV)(
            k,
            { title: `Listen Now` },
            void 0,
            !1,
            { fileName: D, lineNumber: 39, columnNumber: 7 },
            this,
          ),
          (0, w.jsxDEV)(
            `div`,
            {
              className: `px-4`,
              children: (0, w.jsxDEV)(
                g,
                {
                  title: `Top Picks For You`,
                  subtitle: `Curated · Just now`,
                  action: `See All`,
                  onActionClick: () => {
                    (d.light(), P({ id: `featured_albums`, title: `Featured Albums` }));
                  },
                },
                void 0,
                !1,
                { fileName: D, lineNumber: 43, columnNumber: 9 },
                this,
              ),
            },
            void 0,
            !1,
            { fileName: D, lineNumber: 42, columnNumber: 7 },
            this,
          ),
          (0, w.jsxDEV)(
            E,
            {
              className: `px-[7vw]`,
              children: (T.length > 0 ? T : i).map((n) =>
                (0, w.jsxDEV)(
                  r.div,
                  {
                    whileTap: { scale: 0.98 },
                    onClick: () => {
                      (e({
                        id: n.id,
                        title: n.title,
                        artist: n.artist,
                        album: n.title,
                        duration: `3:42`,
                        gradient: n.gradient,
                        coverUrl: n.coverUrl,
                      }),
                        t());
                    },
                    className: `relative aspect-[16/10] w-[86vw] max-w-[450px] shrink-0 snap-center overflow-hidden rounded-2xl album-shadow cursor-pointer border border-white/5 bg-cover bg-center`,
                    style: {
                      backgroundImage: n.coverUrl ? `url(${n.coverUrl})` : void 0,
                      background: n.coverUrl ? void 0 : n.gradient,
                    },
                    children: [
                      (0, w.jsxDEV)(
                        `div`,
                        {
                          className: `absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-white/10`,
                        },
                        void 0,
                        !1,
                        { fileName: D, lineNumber: 70, columnNumber: 13 },
                        this,
                      ),
                      (0, w.jsxDEV)(
                        `div`,
                        {
                          className: `relative flex h-full flex-col justify-between p-5 text-white z-10`,
                          children: [
                            (0, w.jsxDEV)(
                              `div`,
                              {
                                children: [
                                  (0, w.jsxDEV)(
                                    `span`,
                                    {
                                      className: `text-[9px] font-bold uppercase tracking-[0.16em] text-white/70 block mb-1`,
                                      children: `Spotlight`,
                                    },
                                    void 0,
                                    !1,
                                    { fileName: D, lineNumber: 73, columnNumber: 17 },
                                    this,
                                  ),
                                  (0, w.jsxDEV)(
                                    `h3`,
                                    {
                                      className: `text-[17px] font-semibold leading-tight tracking-tight`,
                                      children: n.title,
                                    },
                                    void 0,
                                    !1,
                                    { fileName: D, lineNumber: 76, columnNumber: 17 },
                                    this,
                                  ),
                                  (0, w.jsxDEV)(
                                    `p`,
                                    {
                                      className: `mt-0.5 text-xs text-white/80 font-light`,
                                      children: n.artist,
                                    },
                                    void 0,
                                    !1,
                                    { fileName: D, lineNumber: 79, columnNumber: 17 },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              !0,
                              { fileName: D, lineNumber: 72, columnNumber: 15 },
                              this,
                            ),
                            (0, w.jsxDEV)(
                              `div`,
                              {
                                className: `flex items-center gap-1.5`,
                                children: [
                                  (0, w.jsxDEV)(
                                    `button`,
                                    {
                                      onClick: (r) => {
                                        (r.stopPropagation(),
                                          e({
                                            id: n.id,
                                            title: n.title,
                                            artist: n.artist,
                                            album: n.title,
                                            duration: `3:42`,
                                            gradient: n.gradient,
                                            coverUrl: n.coverUrl,
                                          }),
                                          t());
                                      },
                                      className: `rounded-full bg-white text-black px-4 py-1.5 text-[10px] font-semibold tracking-tight hover:bg-white/90 active:scale-95 transition-all`,
                                      children: `Play`,
                                    },
                                    void 0,
                                    !1,
                                    { fileName: D, lineNumber: 82, columnNumber: 17 },
                                    this,
                                  ),
                                  (0, w.jsxDEV)(
                                    `button`,
                                    {
                                      onClick: (e) => {
                                        (e.stopPropagation(), l.success(`"${n.title}" saved`));
                                      },
                                      className: `rounded-full bg-white/10 border border-white/10 text-white px-3.5 py-1.5 text-[10px] font-medium tracking-tight hover:bg-white/20 active:scale-95 transition-all`,
                                      children: `Save`,
                                    },
                                    void 0,
                                    !1,
                                    { fileName: D, lineNumber: 97, columnNumber: 17 },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              !0,
                              { fileName: D, lineNumber: 81, columnNumber: 15 },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        !0,
                        { fileName: D, lineNumber: 71, columnNumber: 13 },
                        this,
                      ),
                    ],
                  },
                  n.id,
                  !0,
                  { fileName: D, lineNumber: 53, columnNumber: 69 },
                  this,
                ),
              ),
            },
            void 0,
            !1,
            { fileName: D, lineNumber: 52, columnNumber: 7 },
            this,
          ),
          (0, w.jsxDEV)(
            `section`,
            {
              className: `mt-8 animate-in fade-in duration-300`,
              children: [
                (0, w.jsxDEV)(
                  g,
                  {
                    title: `Jump Back In`,
                    action: `See All`,
                    onActionClick: () => {
                      (d.light(), P({ id: `jump_back_in`, title: `Jump Back In` }));
                    },
                  },
                  void 0,
                  !1,
                  { fileName: D, lineNumber: 110, columnNumber: 9 },
                  this,
                ),
                (0, w.jsxDEV)(
                  `div`,
                  {
                    className: `grid grid-cols-2 gap-3 px-4 mt-2`,
                    children: (a.length > 0 ? a.slice(0, 4) : u).map((n) =>
                      (0, w.jsxDEV)(
                        r.div,
                        {
                          whileTap: { scale: 0.98 },
                          onClick: () => {
                            (d.light(), e(n), t());
                          },
                          className: `group relative flex items-center gap-3 rounded-2xl bg-white/[0.02] border border-white/5 p-3 cursor-pointer hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300`,
                          children: [
                            (0, w.jsxDEV)(
                              `div`,
                              {
                                className: `h-12 w-12 shrink-0 rounded-xl relative overflow-hidden shadow-md border border-white/10 bg-cover bg-center`,
                                style: {
                                  backgroundImage: n.coverUrl ? `url(${n.coverUrl})` : void 0,
                                  background: n.coverUrl ? void 0 : n.gradient,
                                },
                                children: (0, w.jsxDEV)(
                                  `div`,
                                  {
                                    className: `absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10`,
                                  },
                                  void 0,
                                  !1,
                                  { fileName: D, lineNumber: 130, columnNumber: 17 },
                                  this,
                                ),
                              },
                              void 0,
                              !1,
                              { fileName: D, lineNumber: 126, columnNumber: 15 },
                              this,
                            ),
                            (0, w.jsxDEV)(
                              `div`,
                              {
                                className: `min-w-0 flex-1 flex flex-col justify-center`,
                                children: [
                                  (0, w.jsxDEV)(
                                    `p`,
                                    {
                                      className: `truncate text-[13.5px] font-semibold text-white tracking-tight group-hover:text-accent-pink transition-colors`,
                                      children: n.title,
                                    },
                                    void 0,
                                    !1,
                                    { fileName: D, lineNumber: 135, columnNumber: 17 },
                                    this,
                                  ),
                                  (0, w.jsxDEV)(
                                    `p`,
                                    {
                                      className: `truncate text-[11px] text-white/50 mt-0.5 font-medium leading-none`,
                                      children: n.artist,
                                    },
                                    void 0,
                                    !1,
                                    { fileName: D, lineNumber: 138, columnNumber: 17 },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              !0,
                              { fileName: D, lineNumber: 134, columnNumber: 15 },
                              this,
                            ),
                            (0, w.jsxDEV)(
                              `div`,
                              {
                                className: `h-8 w-8 rounded-full bg-white/10 border border-white/5 group-hover:bg-white/20 flex items-center justify-center shrink-0 transition-all duration-300`,
                                children: (0, w.jsxDEV)(
                                  p,
                                  {
                                    className: `h-3 w-3 fill-white text-white translate-x-[0.5px]`,
                                  },
                                  void 0,
                                  !1,
                                  { fileName: D, lineNumber: 145, columnNumber: 17 },
                                  this,
                                ),
                              },
                              void 0,
                              !1,
                              { fileName: D, lineNumber: 144, columnNumber: 15 },
                              this,
                            ),
                          ],
                        },
                        n.id,
                        !0,
                        { fileName: D, lineNumber: 118, columnNumber: 95 },
                        this,
                      ),
                    ),
                  },
                  void 0,
                  !1,
                  { fileName: D, lineNumber: 117, columnNumber: 9 },
                  this,
                ),
              ],
            },
            void 0,
            !0,
            { fileName: D, lineNumber: 109, columnNumber: 7 },
            this,
          ),
          (0, w.jsxDEV)(
            `section`,
            {
              className: `mt-8`,
              children: [
                (0, w.jsxDEV)(
                  g,
                  {
                    title: `Trending Now`,
                    action: `See All`,
                    onActionClick: () => {
                      (d.light(), P({ id: `trending_now`, title: `Trending Now` }));
                    },
                  },
                  void 0,
                  !1,
                  { fileName: D, lineNumber: 153, columnNumber: 9 },
                  this,
                ),
                (0, w.jsxDEV)(
                  A,
                  {
                    children: (a.length > 6 ? a.slice(6, 14) : s).map((n, i) =>
                      (0, w.jsxDEV)(
                        r.div,
                        {
                          whileTap: { scale: 0.98 },
                          onClick: () => {
                            (e(n), t());
                          },
                          className: `group flex flex-col w-[44vw] max-w-[170px] shrink-0 snap-center cursor-pointer`,
                          children: [
                            (0, w.jsxDEV)(
                              `div`,
                              {
                                className: `relative aspect-square w-full rounded-[20px] overflow-hidden shadow-lg border border-white/5 bg-cover bg-center`,
                                style: {
                                  backgroundImage: n.coverUrl ? `url(${n.coverUrl})` : void 0,
                                  background: n.coverUrl ? void 0 : n.gradient,
                                },
                                children: [
                                  (0, w.jsxDEV)(
                                    `div`,
                                    {
                                      className: `absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/5`,
                                    },
                                    void 0,
                                    !1,
                                    { fileName: D, lineNumber: 172, columnNumber: 19 },
                                    this,
                                  ),
                                  (0, w.jsxDEV)(
                                    `div`,
                                    {
                                      className: `absolute top-3 left-3 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-black text-accent-pink shadow-md`,
                                      children: [`#`, i + 1],
                                    },
                                    void 0,
                                    !0,
                                    { fileName: D, lineNumber: 175, columnNumber: 19 },
                                    this,
                                  ),
                                  (0, w.jsxDEV)(
                                    `div`,
                                    {
                                      className: `absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 group-hover:bg-accent-pink group-hover:border-accent-pink flex items-center justify-center transition-all duration-300 shadow-md`,
                                      children: (0, w.jsxDEV)(
                                        p,
                                        {
                                          className: `h-3 w-3 fill-white text-white translate-x-[0.5px]`,
                                        },
                                        void 0,
                                        !1,
                                        { fileName: D, lineNumber: 181, columnNumber: 21 },
                                        this,
                                      ),
                                    },
                                    void 0,
                                    !1,
                                    { fileName: D, lineNumber: 180, columnNumber: 19 },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              !0,
                              { fileName: D, lineNumber: 168, columnNumber: 17 },
                              this,
                            ),
                            (0, w.jsxDEV)(
                              `div`,
                              {
                                className: `mt-2.5 px-0.5`,
                                children: [
                                  (0, w.jsxDEV)(
                                    `p`,
                                    {
                                      className: `truncate text-[13.5px] font-semibold text-white tracking-tight group-hover:text-accent-pink transition-colors`,
                                      children: n.title,
                                    },
                                    void 0,
                                    !1,
                                    { fileName: D, lineNumber: 187, columnNumber: 19 },
                                    this,
                                  ),
                                  (0, w.jsxDEV)(
                                    `p`,
                                    {
                                      className: `truncate text-[11px] text-white/50 mt-0.5 font-medium`,
                                      children: n.artist,
                                    },
                                    void 0,
                                    !1,
                                    { fileName: D, lineNumber: 190, columnNumber: 19 },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              !0,
                              { fileName: D, lineNumber: 186, columnNumber: 17 },
                              this,
                            ),
                          ],
                        },
                        n.id,
                        !0,
                        { fileName: D, lineNumber: 161, columnNumber: 101 },
                        this,
                      ),
                    ),
                  },
                  void 0,
                  !1,
                  { fileName: D, lineNumber: 160, columnNumber: 9 },
                  this,
                ),
              ],
            },
            void 0,
            !0,
            { fileName: D, lineNumber: 152, columnNumber: 7 },
            this,
          ),
          (0, w.jsxDEV)(
            `section`,
            {
              className: `mt-8`,
              children: [
                (0, w.jsxDEV)(
                  g,
                  {
                    title: `New Releases`,
                    subtitle: `This week`,
                    action: `See All`,
                    onActionClick: () => {
                      (d.light(), P({ id: `new_releases`, title: `New Releases` }));
                    },
                  },
                  void 0,
                  !1,
                  { fileName: D, lineNumber: 200, columnNumber: 9 },
                  this,
                ),
                (0, w.jsxDEV)(
                  A,
                  {
                    children: (T.length > 0 ? T : i).map((e) =>
                      (0, w.jsxDEV)(
                        `div`,
                        {
                          className: `w-[42vw] max-w-[170px] shrink-0`,
                          children: (0, w.jsxDEV)(
                            _,
                            { album: e },
                            void 0,
                            !1,
                            { fileName: D, lineNumber: 209, columnNumber: 15 },
                            this,
                          ),
                        },
                        e.id,
                        !1,
                        { fileName: D, lineNumber: 208, columnNumber: 71 },
                        this,
                      ),
                    ),
                  },
                  void 0,
                  !1,
                  { fileName: D, lineNumber: 207, columnNumber: 9 },
                  this,
                ),
              ],
            },
            void 0,
            !0,
            { fileName: D, lineNumber: 199, columnNumber: 7 },
            this,
          ),
          (0, w.jsxDEV)(
            `section`,
            {
              className: `mt-8 px-4`,
              children: [
                (0, w.jsxDEV)(
                  g,
                  { title: `Top Charts`, subtitle: `Global · Today` },
                  void 0,
                  !1,
                  { fileName: D, lineNumber: 216, columnNumber: 9 },
                  this,
                ),
                (0, w.jsxDEV)(
                  `div`,
                  {
                    className: `space-y-0.5 mt-2`,
                    children: (a.length > 0 ? a.slice(0, 6) : c.slice(0, 6)).map((e, t) =>
                      (0, w.jsxDEV)(
                        m,
                        { track: e, index: t },
                        e.id,
                        !1,
                        { fileName: D, lineNumber: 218, columnNumber: 105 },
                        this,
                      ),
                    ),
                  },
                  void 0,
                  !1,
                  { fileName: D, lineNumber: 217, columnNumber: 9 },
                  this,
                ),
              ],
            },
            void 0,
            !0,
            { fileName: D, lineNumber: 215, columnNumber: 7 },
            this,
          ),
          (0, w.jsxDEV)(
            `section`,
            {
              className: `mt-8`,
              children: [
                (0, w.jsxDEV)(
                  g,
                  {
                    title: `Recently Added`,
                    subtitle: `Your library`,
                    action: `See All`,
                    onActionClick: () => {
                      (d.light(), P({ id: `recently_added`, title: `Recently Added` }));
                    },
                  },
                  void 0,
                  !1,
                  { fileName: D, lineNumber: 224, columnNumber: 9 },
                  this,
                ),
                (0, w.jsxDEV)(
                  A,
                  {
                    children: (j.length > 0 ? j : o).map((e) =>
                      (0, w.jsxDEV)(
                        `div`,
                        {
                          className: `w-[42vw] max-w-[170px] shrink-0`,
                          children: (0, w.jsxDEV)(
                            h,
                            { playlist: e },
                            void 0,
                            !1,
                            { fileName: D, lineNumber: 233, columnNumber: 15 },
                            this,
                          ),
                        },
                        e.id,
                        !1,
                        { fileName: D, lineNumber: 232, columnNumber: 72 },
                        this,
                      ),
                    ),
                  },
                  void 0,
                  !1,
                  { fileName: D, lineNumber: 231, columnNumber: 9 },
                  this,
                ),
              ],
            },
            void 0,
            !0,
            { fileName: D, lineNumber: 223, columnNumber: 7 },
            this,
          ),
          (0, w.jsxDEV)(
            f,
            {
              children:
                N &&
                (0, w.jsxDEV)(
                  S,
                  { category: N.id, title: N.title, onClose: () => P(null), popularTracks: a },
                  void 0,
                  !1,
                  { fileName: D, lineNumber: 240, columnNumber: 26 },
                  this,
                ),
            },
            void 0,
            !1,
            { fileName: D, lineNumber: 239, columnNumber: 7 },
            this,
          ),
        ],
      },
      void 0,
      !0,
      { fileName: D, lineNumber: 38, columnNumber: 10 },
      this,
    )
  );
}
function k({ title: e, avatar: t = !1 }) {
  let [n, r] = (0, C.useState)(`A`),
    [i, a] = (0, C.useState)(`from-pink-500 to-orange-400`);
  return (
    (0, C.useEffect)(() => {
      if (!t) return;
      let e = () => {
        let e = localStorage.getItem(`melody-stream-profile`);
        if (e)
          try {
            let t = JSON.parse(e);
            (t.name && r(t.name.trim().charAt(0).toUpperCase() || `A`),
              t.avatarColor && a(t.avatarColor));
          } catch (e) {
            console.error(`Error parsing profile in Header:`, e);
          }
      };
      return (
        e(),
        window.addEventListener(`profile-updated`, e),
        () => window.removeEventListener(`profile-updated`, e)
      );
    }, [t]),
    (0, w.jsxDEV)(
      `div`,
      {
        className: `mb-4 flex items-center justify-between px-4 pt-4`,
        children: [
          (0, w.jsxDEV)(
            `h1`,
            { className: `text-[22px] font-bold tracking-tight text-foreground/95`, children: e },
            void 0,
            !1,
            { fileName: D, lineNumber: 277, columnNumber: 7 },
            this,
          ),
          t &&
            (0, w.jsxDEV)(
              y,
              {
                to: `/profile`,
                className: `grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${i} text-xs font-semibold text-white transition-transform active:scale-90 hover:scale-105`,
                children: n,
              },
              void 0,
              !1,
              { fileName: D, lineNumber: 278, columnNumber: 18 },
              this,
            ),
        ],
      },
      void 0,
      !0,
      { fileName: D, lineNumber: 276, columnNumber: 10 },
      this,
    )
  );
}
function A({ children: e }) {
  return (0, w.jsxDEV)(
    `div`,
    { className: `no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1`, children: e },
    void 0,
    !1,
    { fileName: D, lineNumber: 288, columnNumber: 10 },
    this,
  );
}
export { A as HScroll, k as Header, O as component };
