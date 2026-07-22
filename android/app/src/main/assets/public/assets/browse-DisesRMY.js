import {
  Q as e,
  _ as t,
  a as n,
  b as r,
  c as i,
  d as a,
  et as o,
  l as s,
  v as c,
  x as l,
} from "./utils-D7eUi7KG.js";
import { n as u, r as d, t as f } from "./cards-bOKhEVTn.js";
import { i as p, n as m, o as h, r as g, t as _ } from "./index-By-AziC4.js";
import { t as v } from "./SeeAllSheet-kEhUssIZ.js";
var y = o(e()),
  b = t(),
  x = `/app/applet/src/routes/browse.tsx?tsr-split=component`;
function S() {
  let [e, t] = (0, y.useState)([]),
    [o, S] = (0, y.useState)([]),
    { setTrack: C, openNowPlaying: w, setQueue: T } = n(),
    [E, D] = (0, y.useState)(null);
  return (
    (0, y.useEffect)(() => {
      async function e() {
        try {
          let [e, n] = await Promise.all([p(10), g(10)]);
          (e && e.length > 0 && t(e), n && n.length > 0 && S(n));
        } catch (e) {
          console.error(`Failed to load browse data:`, e);
        }
      }
      e();
    }, []),
    (0, b.jsxDEV)(
      `div`,
      {
        className: `pt-3`,
        children: [
          (0, b.jsxDEV)(
            m,
            { title: `Browse` },
            void 0,
            !1,
            { fileName: x, lineNumber: 38, columnNumber: 7 },
            this,
          ),
          (0, b.jsxDEV)(
            `section`,
            {
              className: `mt-4`,
              children: [
                (0, b.jsxDEV)(
                  d,
                  {
                    title: `New This Week`,
                    action: `See All`,
                    onActionClick: () => {
                      (c.light(), D({ id: `new_this_week`, title: `New This Week` }));
                    },
                  },
                  void 0,
                  !1,
                  { fileName: x, lineNumber: 42, columnNumber: 9 },
                  this,
                ),
                (0, b.jsxDEV)(
                  _,
                  {
                    children: (e.length > 0 ? e : i).map((e) =>
                      (0, b.jsxDEV)(
                        `div`,
                        {
                          className: `w-[42vw] max-w-[170px] shrink-0`,
                          children: (0, b.jsxDEV)(
                            f,
                            { album: e },
                            void 0,
                            !1,
                            { fileName: x, lineNumber: 51, columnNumber: 15 },
                            this,
                          ),
                        },
                        e.id,
                        !1,
                        { fileName: x, lineNumber: 50, columnNumber: 71 },
                        this,
                      ),
                    ),
                  },
                  void 0,
                  !1,
                  { fileName: x, lineNumber: 49, columnNumber: 9 },
                  this,
                ),
              ],
            },
            void 0,
            !0,
            { fileName: x, lineNumber: 41, columnNumber: 7 },
            this,
          ),
          (0, b.jsxDEV)(
            `section`,
            {
              className: `mt-8 px-4`,
              children: [
                (0, b.jsxDEV)(
                  d,
                  { title: `Moods & Genres` },
                  void 0,
                  !1,
                  { fileName: x, lineNumber: 58, columnNumber: 9 },
                  this,
                ),
                (0, b.jsxDEV)(
                  `div`,
                  {
                    className: `grid grid-cols-2 gap-3.5 mt-2 grid-flow-row-dense`,
                    children: s.map((e, t) => {
                      let n = t % 5 == 0;
                      return (0, b.jsxDEV)(
                        r.button,
                        {
                          initial: { opacity: 0, scale: 0.94 },
                          animate: { opacity: 1, scale: 1 },
                          transition: { delay: t * 0.02, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                          whileTap: { scale: 0.96 },
                          onClick: async () => {
                            try {
                              let t = await h(e.name, 20);
                              t.length > 0
                                ? (T(t), C(t[0]), w())
                                : (C({
                                    id: e.id + `-station`,
                                    title: `${e.name} Mix`,
                                    artist: `Sonora Station`,
                                    album: `${e.name} Radio`,
                                    duration: `3:45`,
                                    gradient: e.gradient,
                                  }),
                                  w());
                            } catch {
                              (C({
                                id: e.id + `-station`,
                                title: `${e.name} Mix`,
                                artist: `Sonora Station`,
                                album: `${e.name} Radio`,
                                duration: `3:45`,
                                gradient: e.gradient,
                              }),
                                w());
                            }
                          },
                          className: `relative overflow-hidden rounded-xl text-left album-shadow border border-white/5 cursor-pointer transition-all ${n ? `col-span-2 aspect-[21/9]` : `col-span-1 aspect-square`}`,
                          style: { background: e.gradient },
                          children: [
                            (0, b.jsxDEV)(
                              `div`,
                              {
                                className: `absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-black/45 z-10`,
                              },
                              void 0,
                              !1,
                              { fileName: x, lineNumber: 107, columnNumber: 17 },
                              this,
                            ),
                            (0, b.jsxDEV)(
                              `span`,
                              {
                                className: `absolute bottom-3.5 left-3.5 text-[14px] font-semibold tracking-tight text-white z-20`,
                                children: e.name,
                              },
                              void 0,
                              !1,
                              { fileName: x, lineNumber: 108, columnNumber: 17 },
                              this,
                            ),
                          ],
                        },
                        e.id,
                        !0,
                        { fileName: x, lineNumber: 62, columnNumber: 18 },
                        this,
                      );
                    }),
                  },
                  void 0,
                  !1,
                  { fileName: x, lineNumber: 59, columnNumber: 9 },
                  this,
                ),
              ],
            },
            void 0,
            !0,
            { fileName: x, lineNumber: 57, columnNumber: 7 },
            this,
          ),
          (0, b.jsxDEV)(
            `section`,
            {
              className: `mt-8 pb-32`,
              children: [
                (0, b.jsxDEV)(
                  d,
                  {
                    title: `Curated Collections`,
                    action: `See All`,
                    onActionClick: () => {
                      (c.light(), D({ id: `curated_collections`, title: `Curated Collections` }));
                    },
                  },
                  void 0,
                  !1,
                  { fileName: x, lineNumber: 118, columnNumber: 9 },
                  this,
                ),
                (0, b.jsxDEV)(
                  _,
                  {
                    children: (o.length > 0 ? o : a).map((e) =>
                      (0, b.jsxDEV)(
                        `div`,
                        {
                          className: `w-[62vw] max-w-[240px] shrink-0`,
                          children: (0, b.jsxDEV)(
                            u,
                            { playlist: e },
                            void 0,
                            !1,
                            { fileName: x, lineNumber: 127, columnNumber: 15 },
                            this,
                          ),
                        },
                        e.id,
                        !1,
                        { fileName: x, lineNumber: 126, columnNumber: 69 },
                        this,
                      ),
                    ),
                  },
                  void 0,
                  !1,
                  { fileName: x, lineNumber: 125, columnNumber: 9 },
                  this,
                ),
              ],
            },
            void 0,
            !0,
            { fileName: x, lineNumber: 117, columnNumber: 7 },
            this,
          ),
          (0, b.jsxDEV)(
            l,
            {
              children:
                E &&
                (0, b.jsxDEV)(
                  v,
                  { category: E.id, title: E.title, onClose: () => D(null) },
                  void 0,
                  !1,
                  { fileName: x, lineNumber: 134, columnNumber: 26 },
                  this,
                ),
            },
            void 0,
            !1,
            { fileName: x, lineNumber: 133, columnNumber: 7 },
            this,
          ),
        ],
      },
      void 0,
      !0,
      { fileName: x, lineNumber: 37, columnNumber: 10 },
      this,
    )
  );
}
export { S as component };
