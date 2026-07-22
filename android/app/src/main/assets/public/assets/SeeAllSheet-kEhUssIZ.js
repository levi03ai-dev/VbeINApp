import {
  Q as e,
  _ as t,
  b as n,
  et as r,
  g as i,
  m as a,
  p as o,
  u as s,
  v as c,
} from "./utils-D7eUi7KG.js";
import { i as l, n as u, t as d } from "./cards-bOKhEVTn.js";
import { d as f, f as p, v as m } from "./index-By-AziC4.js";
var h = r(e(), 1),
  g = t(),
  _ = `/app/applet/src/components/music/SeeAllSheet.tsx`;
function v({ category: e, title: t, onClose: r, popularTracks: v = [] }) {
  let [y, b] = (0, h.useState)(``),
    x = (() => {
      switch (e) {
        case `featured_albums`:
        case `new_releases`:
        case `new_this_week`:
          return o;
        case `jump_back_in`:
          return s;
        case `trending_now`:
          return v.length > 0 ? v : i;
        case `recently_added`:
        case `curated_collections`:
          return a;
        default:
          return [];
      }
    })().filter((e) => {
      let t = y.toLowerCase().trim();
      if (!t) return !0;
      let n = (`title` in e ? e.title : ``).toLowerCase(),
        r = (`artist` in e ? e.artist : ``).toLowerCase(),
        i = (`subtitle` in e ? e.subtitle : ``).toLowerCase();
      return n.includes(t) || r.includes(t) || i.includes(t);
    });
  return (0, g.jsxDEV)(
    n.div,
    {
      initial: { x: `100%`, opacity: 0.9 },
      animate: { x: 0, opacity: 1 },
      exit: { x: `100%`, opacity: 0.9 },
      transition: { type: `spring`, stiffness: 300, damping: 28 },
      className: `fixed inset-0 z-40 bg-background flex flex-col pt-safe overflow-hidden`,
      children: [
        (0, g.jsxDEV)(
          `div`,
          {
            className: `pt-12 px-4 pb-3 border-b border-white/5 bg-background/50 backdrop-blur-xl sticky top-0 z-10 flex flex-col gap-3`,
            children: [
              (0, g.jsxDEV)(
                `div`,
                {
                  className: `flex items-center gap-3`,
                  children: [
                    (0, g.jsxDEV)(
                      `button`,
                      {
                        onClick: () => {
                          (c.light(), r());
                        },
                        className: `h-9 w-9 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 active:scale-95 flex items-center justify-center transition-all cursor-pointer`,
                        children: (0, g.jsxDEV)(
                          m,
                          { className: `h-5 w-5 text-foreground` },
                          void 0,
                          !1,
                          { fileName: _, lineNumber: 75, columnNumber: 13 },
                          this,
                        ),
                      },
                      void 0,
                      !1,
                      { fileName: _, lineNumber: 68, columnNumber: 11 },
                      this,
                    ),
                    (0, g.jsxDEV)(
                      `h1`,
                      {
                        className: `text-[19px] font-bold text-foreground leading-none tracking-tight`,
                        children: t,
                      },
                      void 0,
                      !1,
                      { fileName: _, lineNumber: 77, columnNumber: 11 },
                      this,
                    ),
                  ],
                },
                void 0,
                !0,
                { fileName: _, lineNumber: 67, columnNumber: 9 },
                this,
              ),
              (0, g.jsxDEV)(
                `div`,
                {
                  className: `relative flex items-center`,
                  children: [
                    (0, g.jsxDEV)(
                      p,
                      {
                        className: `absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none`,
                      },
                      void 0,
                      !1,
                      { fileName: _, lineNumber: 84, columnNumber: 11 },
                      this,
                    ),
                    (0, g.jsxDEV)(
                      `input`,
                      {
                        type: `text`,
                        value: y,
                        onChange: (e) => {
                          (b(e.target.value), c.light());
                        },
                        placeholder: `Search in ${t.toLowerCase()}...`,
                        className: `w-full bg-white/[0.04] border border-white/5 hover:bg-white/[0.07] focus:bg-white/[0.07] focus:border-white/10 rounded-xl py-2 pl-9 pr-9 text-[13px] text-foreground placeholder-muted-foreground outline-none transition-all`,
                      },
                      void 0,
                      !1,
                      { fileName: _, lineNumber: 85, columnNumber: 11 },
                      this,
                    ),
                    y &&
                      (0, g.jsxDEV)(
                        `button`,
                        {
                          onClick: () => {
                            (b(``), c.light());
                          },
                          className: `absolute right-3 h-5 w-5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all cursor-pointer`,
                          children: (0, g.jsxDEV)(
                            f,
                            { className: `h-3 w-3 text-muted-foreground hover:text-foreground` },
                            void 0,
                            !1,
                            { fileName: _, lineNumber: 103, columnNumber: 15 },
                            this,
                          ),
                        },
                        void 0,
                        !1,
                        { fileName: _, lineNumber: 96, columnNumber: 13 },
                        this,
                      ),
                  ],
                },
                void 0,
                !0,
                { fileName: _, lineNumber: 83, columnNumber: 9 },
                this,
              ),
            ],
          },
          void 0,
          !0,
          { fileName: _, lineNumber: 66, columnNumber: 7 },
          this,
        ),
        (0, g.jsxDEV)(
          `div`,
          {
            className: `flex-1 overflow-y-auto no-scrollbar px-4 pb-24 pt-3`,
            children:
              x.length === 0
                ? (0, g.jsxDEV)(
                    `div`,
                    {
                      className: `flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-300`,
                      children: [
                        (0, g.jsxDEV)(
                          `div`,
                          {
                            className: `h-12 w-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-muted-foreground/60 mb-3`,
                            children: (0, g.jsxDEV)(
                              p,
                              { className: `h-5 w-5` },
                              void 0,
                              !1,
                              { fileName: _, lineNumber: 114, columnNumber: 15 },
                              this,
                            ),
                          },
                          void 0,
                          !1,
                          { fileName: _, lineNumber: 113, columnNumber: 13 },
                          this,
                        ),
                        (0, g.jsxDEV)(
                          `p`,
                          {
                            className: `text-[14px] font-medium text-foreground/80`,
                            children: `No results found`,
                          },
                          void 0,
                          !1,
                          { fileName: _, lineNumber: 116, columnNumber: 13 },
                          this,
                        ),
                        (0, g.jsxDEV)(
                          `p`,
                          {
                            className: `text-[11px] text-muted-foreground mt-1 max-w-[200px]`,
                            children: [`We couldn't find anything matching "`, y, `"`],
                          },
                          void 0,
                          !0,
                          { fileName: _, lineNumber: 117, columnNumber: 13 },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    !0,
                    { fileName: _, lineNumber: 112, columnNumber: 11 },
                    this,
                  )
                : (0, g.jsxDEV)(
                    `div`,
                    {
                      className: `animate-in fade-in duration-300`,
                      children:
                        e === `featured_albums` ||
                        e === `new_releases` ||
                        e === `recently_added` ||
                        e === `new_this_week` ||
                        e === `curated_collections`
                          ? (0, g.jsxDEV)(
                              `div`,
                              {
                                className: `grid grid-cols-2 gap-x-4 gap-y-5`,
                                children: x.map((t, r) =>
                                  (0, g.jsxDEV)(
                                    n.div,
                                    {
                                      initial: { opacity: 0, y: 15 },
                                      animate: { opacity: 1, y: 0 },
                                      transition: { delay: Math.min(0.2, r * 0.03), duration: 0.3 },
                                      children:
                                        e === `recently_added` || e === `curated_collections`
                                          ? (0, g.jsxDEV)(
                                              u,
                                              { playlist: t },
                                              void 0,
                                              !1,
                                              { fileName: _, lineNumber: 137, columnNumber: 23 },
                                              this,
                                            )
                                          : (0, g.jsxDEV)(
                                              d,
                                              { album: t },
                                              void 0,
                                              !1,
                                              { fileName: _, lineNumber: 139, columnNumber: 23 },
                                              this,
                                            ),
                                    },
                                    t.id,
                                    !1,
                                    { fileName: _, lineNumber: 130, columnNumber: 19 },
                                    this,
                                  ),
                                ),
                              },
                              void 0,
                              !1,
                              { fileName: _, lineNumber: 128, columnNumber: 15 },
                              this,
                            )
                          : (0, g.jsxDEV)(
                              `div`,
                              {
                                className: `space-y-1`,
                                children: x.map((e, t) =>
                                  (0, g.jsxDEV)(
                                    n.div,
                                    {
                                      initial: { opacity: 0, x: -10 },
                                      animate: { opacity: 1, x: 0 },
                                      transition: {
                                        delay: Math.min(0.2, t * 0.02),
                                        duration: 0.25,
                                      },
                                      children: (0, g.jsxDEV)(
                                        l,
                                        { track: e, index: t },
                                        void 0,
                                        !1,
                                        { fileName: _, lineNumber: 153, columnNumber: 21 },
                                        this,
                                      ),
                                    },
                                    e.id,
                                    !1,
                                    { fileName: _, lineNumber: 147, columnNumber: 19 },
                                    this,
                                  ),
                                ),
                              },
                              void 0,
                              !1,
                              { fileName: _, lineNumber: 145, columnNumber: 15 },
                              this,
                            ),
                    },
                    void 0,
                    !1,
                    { fileName: _, lineNumber: 122, columnNumber: 11 },
                    this,
                  ),
          },
          void 0,
          !1,
          { fileName: _, lineNumber: 110, columnNumber: 7 },
          this,
        ),
      ],
    },
    void 0,
    !0,
    { fileName: _, lineNumber: 58, columnNumber: 5 },
    this,
  );
}
export { v as t };
