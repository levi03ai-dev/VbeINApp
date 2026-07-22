import {
  Q as e,
  X as t,
  Z as n,
  _ as r,
  a as i,
  b as a,
  et as o,
  n as s,
  y as c,
} from "./utils-D7eUi7KG.js";
import { t as l } from "./check-DrbwkwmG.js";
import { g as u, p as d, u as f } from "./index-By-AziC4.js";
var p = c(`chevron-right`, [[`path`, { d: `m9 18 6-6-6-6`, key: `mthhwq` }]]),
  m = c(`circle`, [[`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }]]),
  h = c(`play`, [
    [
      `path`,
      {
        d: `M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z`,
        key: `10ikf1`,
      },
    ],
  ]),
  g = o(e(), 1),
  _ = Object.defineProperty,
  v = (e, t) => _(e, `name`, { value: t, configurable: !0 }),
  y = !!(typeof window < `u` && window.document && window.document.createElement);
function b(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return v(function (r) {
    if ((e?.(r), n === !1 || !r || !r.defaultPrevented)) return t?.(r);
  }, `handleEvent`);
}
v(b, `composeEventHandlers`);
function x(e) {
  if (!y) throw Error(`Cannot access window outside of the DOM`);
  return e?.ownerDocument?.defaultView ?? window;
}
v(x, `getOwnerWindow`);
function S(e) {
  if (!y) throw Error(`Cannot access document outside of the DOM`);
  return e?.ownerDocument ?? document;
}
v(S, `getOwnerDocument`);
function C(e, t = !1) {
  let { activeElement: n } = S(e);
  if (!n?.nodeName) return null;
  if (w(n) && n.contentDocument) return C(n.contentDocument.body, t);
  if (t) {
    let e = n.getAttribute(`aria-activedescendant`);
    if (e) {
      let t = S(n).getElementById(e);
      if (t) return t;
    }
  }
  return n;
}
v(C, `getActiveElement`);
function w(e) {
  return e.tagName === `IFRAME`;
}
v(w, `isFrame`);
function T(e, t) {
  if (typeof e == `function`) return e(t);
  e != null && (e.current = t);
}
function E(...e) {
  return (t) => {
    let n = !1,
      r = e.map((e) => {
        let r = T(e, t);
        return (!n && typeof r == `function` && (n = !0), r);
      });
    if (n)
      return () => {
        for (let t = 0; t < r.length; t++) {
          let n = r[t];
          typeof n == `function` ? n() : T(e[t], null);
        }
      };
  };
}
function D(...e) {
  return g.useCallback(E(...e), e);
}
var O = t();
function k(e, t = []) {
  let n = [];
  function r(t, r) {
    let i = g.createContext(r);
    i.displayName = t + `Context`;
    let a = n.length;
    n = [...n, r];
    let o = (t) => {
      let { scope: n, children: r, ...o } = t,
        s = n?.[e]?.[a] || i,
        c = g.useMemo(() => o, Object.values(o));
      return (0, O.jsx)(s.Provider, { value: c, children: r });
    };
    o.displayName = t + `Provider`;
    function s(n, o, s = {}) {
      let { optional: c = !1 } = s,
        l = o?.[e]?.[a] || i,
        u = g.useContext(l);
      if (u) return u;
      if (r !== void 0) return r;
      if (!c) throw Error(`\`${n}\` must be used within \`${t}\``);
    }
    return [o, s];
  }
  let i = () => {
    let t = n.map((e) => g.createContext(e));
    return function (n) {
      let r = n?.[e] || t;
      return g.useMemo(() => ({ [`__scope${e}`]: { ...n, [e]: r } }), [n, r]);
    };
  };
  return ((i.scopeName = e), [r, A(i, ...t)]);
}
function A(...e) {
  let t = e[0];
  if (e.length === 1) return t;
  let n = () => {
    let n = e.map((e) => ({ useScope: e(), scopeName: e.scopeName }));
    return function (e) {
      let r = n.reduce((t, { useScope: n, scopeName: r }) => {
        let i = n(e)[`__scope${r}`];
        return { ...t, ...i };
      }, {});
      return g.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
var j = globalThis?.document ? g.useLayoutEffect : () => {},
  M = g.useEffectEvent,
  N = g.useInsertionEffect;
function ee(e) {
  if (typeof M == `function`) return M(e);
  let t = g.useRef(() => {
    throw Error(`Cannot call an event handler while rendering.`);
  });
  return (
    typeof N == `function`
      ? N(() => {
          t.current = e;
        })
      : j(() => {
          t.current = e;
        }),
    g.useMemo(
      () =>
        (...e) =>
          t.current?.(...e),
      [],
    )
  );
}
var te = Object.defineProperty,
  ne = (e, t) => te(e, `name`, { value: t, configurable: !0 }),
  re = g.useInsertionEffect || j;
function P({ prop: e, defaultProp: t, onChange: n = ne(() => {}, `onChange`), caller: r }) {
  let [i, a, o] = ie({ defaultProp: t, onChange: n }),
    s = e !== void 0,
    c = s ? e : i;
  {
    let t = g.useRef(e !== void 0);
    g.useEffect(() => {
      let e = t.current;
      (e !== s &&
        console.warn(
          `${r} is changing from ${e ? `controlled` : `uncontrolled`} to ${s ? `controlled` : `uncontrolled`}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (t.current = s));
    }, [s, r]);
  }
  return [
    c,
    g.useCallback(
      (t) => {
        if (s) {
          let n = ae(t) ? t(e) : t;
          n !== e && o.current?.(n);
        } else a(t);
      },
      [s, e, a, o],
    ),
  ];
}
ne(P, `useControllableState`);
function ie({ defaultProp: e, onChange: t }) {
  let [n, r] = g.useState(e),
    i = g.useRef(n),
    a = g.useRef(t);
  return (
    re(() => {
      a.current = t;
    }, [t]),
    g.useEffect(() => {
      i.current !== n && (a.current?.(n), (i.current = n));
    }, [n, i]),
    [n, r, a]
  );
}
ne(ie, `useUncontrolledState`);
function ae(e) {
  return typeof e == `function`;
}
ne(ae, `isFunction`);
var oe = Symbol(`RADIX:SYNC_STATE`);
function se(e, t, n, r) {
  let { prop: i, defaultProp: a, onChange: o, caller: s } = t,
    c = i !== void 0,
    l = ee(o);
  {
    let e = g.useRef(i !== void 0);
    g.useEffect(() => {
      let t = e.current;
      (t !== c &&
        console.warn(
          `${s} is changing from ${t ? `controlled` : `uncontrolled`} to ${c ? `controlled` : `uncontrolled`}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (e.current = c));
    }, [c, s]);
  }
  let u = [{ ...n, state: a }];
  r && u.push(r);
  let [d, f] = g.useReducer(
      (t, n) => {
        if (n.type === oe) return { ...t, state: n.state };
        let r = e(t, n);
        return (c && !Object.is(r.state, t.state) && l(r.state), r);
      },
      ...u,
    ),
    p = d.state,
    m = g.useRef(p);
  g.useEffect(() => {
    m.current !== p && ((m.current = p), c || l(p));
  }, [p, m, c]);
  let h = g.useMemo(() => (i === void 0 ? d : { ...d, state: i }), [d, i]);
  return (
    g.useEffect(() => {
      c && !Object.is(i, d.state) && f({ type: oe, state: i });
    }, [i, d.state, c]),
    [h, f]
  );
}
ne(se, `useControllableStateReducer`);
var ce = o(n(), 1);
function le(e) {
  let t = g.forwardRef((t, n) => {
    let { children: r, ...i } = t,
      a = null,
      o = !1,
      s = [];
    (ge(r) && typeof be == `function` && (r = be(r._payload)),
      g.Children.forEach(r, (e) => {
        if (me(e)) {
          o = !0;
          let t = e,
            n = `child` in t.props ? t.props.child : t.props.children;
          (ge(n) && typeof be == `function` && (n = be(n._payload)),
            (a = de(t, n)),
            s.push(a?.props?.children));
        } else s.push(e);
      }),
      a
        ? (a = g.cloneElement(a, void 0, s))
        : !o && g.Children.count(r) === 1 && g.isValidElement(r) && (a = r));
    let c = a ? pe(a) : void 0,
      l = D(n, c);
    if (!a) {
      if (r || r === 0) throw Error(o ? ye(e) : ve(e));
      return r;
    }
    let u = fe(i, a.props ?? {});
    return (a.type !== g.Fragment && (u.ref = n ? l : c), g.cloneElement(a, u));
  });
  return ((t.displayName = `${e}.Slot`), t);
}
var ue = Symbol.for(`radix.slottable`),
  de = (e, t) => {
    if (`child` in e.props) {
      let t = e.props.child;
      return g.isValidElement(t)
        ? g.cloneElement(t, void 0, e.props.children(t.props.children))
        : null;
    }
    return g.isValidElement(t) ? t : null;
  };
function fe(e, t) {
  let n = { ...t };
  for (let r in t) {
    let i = e[r],
      a = t[r];
    /^on[A-Z]/.test(r)
      ? i && a
        ? (n[r] = (...e) => {
            let t = a(...e);
            return (i(...e), t);
          })
        : i && (n[r] = i)
      : r === `style`
        ? (n[r] = { ...i, ...a })
        : r === `className` && (n[r] = [i, a].filter(Boolean).join(` `));
  }
  return { ...e, ...n };
}
function pe(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, `ref`)?.get,
    n = t && `isReactWarning` in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, `ref`)?.get),
      (n = t && `isReactWarning` in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function me(e) {
  return (
    g.isValidElement(e) &&
    typeof e.type == `function` &&
    `__radixId` in e.type &&
    e.type.__radixId === ue
  );
}
var he = Symbol.for(`react.lazy`);
function ge(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `$$typeof` in e &&
    e.$$typeof === he &&
    `_payload` in e &&
    _e(e._payload)
  );
}
function _e(e) {
  return typeof e == `object` && !!e && `then` in e;
}
var ve = (e) =>
    `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,
  ye = (e) =>
    `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
  be = g.use,
  F = [
    `a`,
    `button`,
    `div`,
    `form`,
    `h2`,
    `h3`,
    `img`,
    `input`,
    `label`,
    `li`,
    `nav`,
    `ol`,
    `p`,
    `select`,
    `span`,
    `svg`,
    `ul`,
  ].reduce((e, t) => {
    let n = le(`Primitive.${t}`),
      r = g.forwardRef((e, r) => {
        let { asChild: i, ...a } = e,
          o = i ? n : t;
        return (
          typeof window < `u` && (window[Symbol.for(`radix-ui`)] = !0),
          (0, O.jsx)(o, { ...a, ref: r })
        );
      });
    return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r });
  }, {});
function xe(e, t) {
  e && ce.flushSync(() => e.dispatchEvent(t));
}
function Se(e) {
  let t = e + `CollectionProvider`,
    [n, r] = k(t),
    [i, a] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    o = (e) => {
      let { scope: t, children: n } = e,
        r = g.useRef(null),
        a = g.useRef(new Map()).current;
      return (0, O.jsx)(i, { scope: t, itemMap: a, collectionRef: r, children: n });
    };
  o.displayName = t;
  let s = e + `CollectionSlot`,
    c = le(s),
    l = g.forwardRef((e, t) => {
      let { scope: n, children: r } = e,
        i = D(t, a(s, n).collectionRef);
      return (0, O.jsx)(c, { ref: i, children: r });
    });
  l.displayName = s;
  let u = e + `CollectionItemSlot`,
    d = `data-radix-collection-item`,
    f = le(u),
    p = g.forwardRef((e, t) => {
      let { scope: n, children: r, ...i } = e,
        o = g.useRef(null),
        s = D(t, o),
        c = a(u, n);
      return (
        g.useEffect(() => (c.itemMap.set(o, { ref: o, ...i }), () => void c.itemMap.delete(o))),
        (0, O.jsx)(f, { [d]: ``, ref: s, children: r })
      );
    });
  p.displayName = u;
  function m(t) {
    let n = a(e + `CollectionConsumer`, t);
    return g.useCallback(() => {
      let e = n.collectionRef.current;
      if (!e) return [];
      let t = Array.from(e.querySelectorAll(`[${d}]`));
      return Array.from(n.itemMap.values()).sort(
        (e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current),
      );
    }, [n.collectionRef, n.itemMap]);
  }
  return [{ Provider: o, Slot: l, ItemSlot: p }, m, r];
}
var Ce = g.createContext(void 0);
function we(e) {
  let t = g.useContext(Ce);
  return e || t || `ltr`;
}
function Te(e) {
  let t = g.useRef(e);
  return (
    g.useEffect(() => {
      t.current = e;
    }),
    g.useMemo(
      () =>
        (...e) =>
          t.current?.(...e),
      [],
    )
  );
}
var Ee = Object.defineProperty,
  I = (e, t) => Ee(e, `name`, { value: t, configurable: !0 }),
  De = `dismissableLayer.update`,
  Oe = `dismissableLayer.pointerDownOutside`,
  ke = `dismissableLayer.focusOutside`,
  Ae,
  je = g.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
    dismissableSurfaces: new Set(),
  }),
  Me = g.forwardRef(
    I(function (e, t) {
      let {
          disableOutsidePointerEvents: n = !1,
          deferPointerDownOutside: r = !1,
          onEscapeKeyDown: i,
          onPointerDownOutside: a,
          onFocusOutside: o,
          onInteractOutside: s,
          onDismiss: c,
          ...l
        } = e,
        u = g.useContext(je),
        [d, f] = g.useState(null),
        p = d?.ownerDocument ?? globalThis?.document,
        [, m] = g.useState({}),
        h = D(t, f),
        _ = Array.from(u.layers),
        [v] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1),
        y = v ? _.indexOf(v) : -1,
        x = d ? _.indexOf(d) : -1,
        S = u.layersWithOutsidePointerEventsDisabled.size > 0,
        C = x >= y,
        w = g.useRef(!1),
        T = Fe(
          (e) => {
            (a?.(e), s?.(e), e.defaultPrevented || c?.());
          },
          {
            ownerDocument: p,
            deferPointerDownOutside: r,
            isDeferredPointerDownOutsideRef: w,
            dismissableSurfaces: u.dismissableSurfaces,
            shouldHandlePointerDownOutside: g.useCallback(
              (e) => {
                if (!(e instanceof Node)) return !1;
                let t = [...u.branches].some((t) => t.contains(e));
                return C && !t;
              },
              [u.branches, C],
            ),
          },
        ),
        E = Ie((e) => {
          if (r && w.current) return;
          let t = e.target;
          [...u.branches].some((e) => e.contains(t)) ||
            (o?.(e), s?.(e), e.defaultPrevented || c?.());
        }, p),
        k = d ? x === _.length - 1 : !1,
        A = Te((e) => {
          e.key === `Escape` && (i?.(e), !e.defaultPrevented && c && (e.preventDefault(), c()));
        });
      return (
        g.useEffect(() => {
          if (k)
            return (
              p.addEventListener(`keydown`, A, { capture: !0 }),
              () => p.removeEventListener(`keydown`, A, { capture: !0 })
            );
        }, [p, k, A]),
        g.useEffect(() => {
          if (d)
            return (
              n &&
                (u.layersWithOutsidePointerEventsDisabled.size === 0 &&
                  ((Ae = p.body.style.pointerEvents), (p.body.style.pointerEvents = `none`)),
                u.layersWithOutsidePointerEventsDisabled.add(d)),
              u.layers.add(d),
              Le(),
              () => {
                n &&
                  (u.layersWithOutsidePointerEventsDisabled.delete(d),
                  u.layersWithOutsidePointerEventsDisabled.size === 0 &&
                    (p.body.style.pointerEvents = Ae));
              }
            );
        }, [d, p, n, u]),
        g.useEffect(
          () => () => {
            d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), Le());
          },
          [d, u],
        ),
        g.useEffect(() => {
          let e = I(() => m({}), `handleUpdate`);
          return (document.addEventListener(De, e), () => document.removeEventListener(De, e));
        }, []),
        (0, O.jsx)(F.div, {
          ...l,
          ref: h,
          style: { pointerEvents: S ? (C ? `auto` : `none`) : void 0, ...e.style },
          onFocusCapture: b(e.onFocusCapture, E.onFocusCapture),
          onBlurCapture: b(e.onBlurCapture, E.onBlurCapture),
          onPointerDownCapture: b(e.onPointerDownCapture, T.onPointerDownCapture),
        })
      );
    }, `DismissableLayer`),
  );
function Ne() {
  let e = g.useContext(je),
    [t, n] = g.useState(null);
  return (
    g.useEffect(() => {
      if (t)
        return (
          e.dismissableSurfaces.add(t),
          () => {
            e.dismissableSurfaces.delete(t);
          }
        );
    }, [t, e.dismissableSurfaces]),
    n
  );
}
I(Ne, `useDismissableLayerSurface`);
var Pe = I(() => !0, `IS_TRUE`);
function Fe(e, t) {
  let {
      ownerDocument: n = globalThis?.document,
      deferPointerDownOutside: r = !1,
      isDeferredPointerDownOutsideRef: i,
      dismissableSurfaces: a,
      shouldHandlePointerDownOutside: o = Pe,
    } = t,
    s = Te(e),
    c = g.useRef(!1),
    l = g.useRef(!1),
    u = g.useRef(new Map()),
    d = g.useRef(() => {});
  return (
    g.useEffect(() => {
      function e() {
        ((l.current = !1), (i.current = !1), u.current.clear());
      }
      I(e, `resetOutsideInteraction`);
      function t() {
        return Array.from(u.current.values()).some(Boolean);
      }
      I(t, `isOutsideInteractionIntercepted`);
      function f(e) {
        if (!l.current) return;
        let t = e.target;
        ((t instanceof Node && [...a].some((e) => e.contains(t))) || u.current.set(e.type, !0),
          e.type === `click` &&
            window.setTimeout(() => {
              l.current && d.current();
            }, 0));
      }
      I(f, `handleInteractionCapture`);
      function p(e) {
        l.current && u.current.set(e.type, !1);
      }
      I(p, `handleInteractionBubble`);
      let m = I((a) => {
          if (a.target && !c.current) {
            let f = function () {
              n.removeEventListener(`click`, d.current);
              let r = t();
              (e(), r || Re(Oe, s, p, { discrete: !0 }));
            };
            if ((I(f, `handleAndDispatchPointerDownOutsideEvent`), !o(a.target))) {
              (n.removeEventListener(`click`, d.current), e(), (c.current = !1));
              return;
            }
            let p = { originalEvent: a };
            ((l.current = !0),
              (i.current = r && a.button === 0),
              u.current.clear(),
              !r || a.button !== 0
                ? f()
                : (n.removeEventListener(`click`, d.current),
                  (d.current = f),
                  n.addEventListener(`click`, d.current, { once: !0 })));
          } else (n.removeEventListener(`click`, d.current), e());
          c.current = !1;
        }, `handlePointerDown`),
        h = [`pointerup`, `mousedown`, `mouseup`, `touchstart`, `touchend`, `click`];
      for (let e of h) (n.addEventListener(e, f, !0), n.addEventListener(e, p));
      let g = window.setTimeout(() => {
        n.addEventListener(`pointerdown`, m);
      }, 0);
      return () => {
        (window.clearTimeout(g),
          n.removeEventListener(`pointerdown`, m),
          n.removeEventListener(`click`, d.current));
        for (let e of h) (n.removeEventListener(e, f, !0), n.removeEventListener(e, p));
      };
    }, [n, s, r, i, a, o]),
    { onPointerDownCapture: I(() => (c.current = !0), `onPointerDownCapture`) }
  );
}
I(Fe, `usePointerDownOutside`);
function Ie(e, t = globalThis?.document) {
  let n = Te(e),
    r = g.useRef(!1);
  return (
    g.useEffect(() => {
      let e = I((e) => {
        e.target && !r.current && Re(ke, n, { originalEvent: e }, { discrete: !1 });
      }, `handleFocus`);
      return (t.addEventListener(`focusin`, e), () => t.removeEventListener(`focusin`, e));
    }, [t, n]),
    {
      onFocusCapture: I(() => (r.current = !0), `onFocusCapture`),
      onBlurCapture: I(() => (r.current = !1), `onBlurCapture`),
    }
  );
}
I(Ie, `useFocusOutside`);
function Le() {
  let e = new CustomEvent(De);
  document.dispatchEvent(e);
}
I(Le, `dispatchUpdate`);
function Re(e, t, n, { discrete: r }) {
  let i = n.originalEvent.target,
    a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  (t && i.addEventListener(e, t, { once: !0 }), r ? xe(i, a) : i.dispatchEvent(a));
}
I(Re, `handleAndDispatchCustomEvent`);
var ze = 0,
  Be = null;
function Ve() {
  g.useEffect(() => {
    Be ||= { start: He(), end: He() };
    let { start: e, end: t } = Be;
    return (
      document.body.firstElementChild !== e && document.body.insertAdjacentElement(`afterbegin`, e),
      document.body.lastElementChild !== t && document.body.insertAdjacentElement(`beforeend`, t),
      ze++,
      () => {
        (ze === 1 && (Be?.start.remove(), Be?.end.remove(), (Be = null)),
          (ze = Math.max(0, ze - 1)));
      }
    );
  }, []);
}
function He() {
  let e = document.createElement(`span`);
  return (
    e.setAttribute(`data-radix-focus-guard`, ``),
    (e.tabIndex = 0),
    (e.style.outline = `none`),
    (e.style.opacity = `0`),
    (e.style.position = `fixed`),
    (e.style.pointerEvents = `none`),
    e
  );
}
var Ue = Object.defineProperty,
  L = (e, t) => Ue(e, `name`, { value: t, configurable: !0 }),
  We = `focusScope.autoFocusOnMount`,
  Ge = `focusScope.autoFocusOnUnmount`,
  Ke = { bubbles: !1, cancelable: !0 },
  qe = g.forwardRef(
    L(function (e, t) {
      let { loop: n = !1, trapped: r = !1, onMountAutoFocus: i, onUnmountAutoFocus: a, ...o } = e,
        [s, c] = g.useState(null),
        l = Te(i),
        u = Te(a),
        d = g.useRef(null),
        f = D(t, c),
        p = g.useRef({
          paused: !1,
          pause() {
            this.paused = !0;
          },
          resume() {
            this.paused = !1;
          },
        }).current;
      (g.useEffect(() => {
        if (r) {
          let e = function (e) {
              if (p.paused || !s) return;
              let t = e.target;
              s.contains(t) ? (d.current = t) : R(d.current, { select: !0 });
            },
            t = function (e) {
              if (p.paused || !s) return;
              let t = e.relatedTarget;
              t !== null && (s.contains(t) || R(d.current, { select: !0 }));
            },
            n = function (e) {
              if (document.activeElement === document.body)
                for (let t of e) t.removedNodes.length > 0 && R(s);
            };
          (L(e, `handleFocusIn`),
            L(t, `handleFocusOut`),
            L(n, `handleMutations`),
            document.addEventListener(`focusin`, e),
            document.addEventListener(`focusout`, t));
          let r = new MutationObserver(n);
          return (
            s && r.observe(s, { childList: !0, subtree: !0 }),
            () => {
              (document.removeEventListener(`focusin`, e),
                document.removeEventListener(`focusout`, t),
                r.disconnect());
            }
          );
        }
      }, [r, s, p.paused]),
        g.useEffect(() => {
          if (s) {
            et.add(p);
            let e = document.activeElement;
            if (!s.contains(e)) {
              let t = new CustomEvent(We, Ke);
              (s.addEventListener(We, l),
                s.dispatchEvent(t),
                t.defaultPrevented ||
                  (Je(rt(Xe(s)), { select: !0 }), document.activeElement === e && R(s)));
            }
            return () => {
              (s.removeEventListener(We, l),
                setTimeout(() => {
                  let t = new CustomEvent(Ge, Ke);
                  (s.addEventListener(Ge, u),
                    s.dispatchEvent(t),
                    t.defaultPrevented || R(e ?? document.body, { select: !0 }),
                    s.removeEventListener(Ge, u),
                    et.remove(p));
                }, 0));
            };
          }
        }, [s, l, u, p]));
      let m = g.useCallback(
        (e) => {
          if ((!n && !r) || p.paused) return;
          let t = e.key === `Tab` && !e.altKey && !e.ctrlKey && !e.metaKey,
            i = document.activeElement;
          if (t && i) {
            let t = e.currentTarget,
              [r, a] = Ye(t);
            r && a
              ? !e.shiftKey && i === a
                ? (e.preventDefault(), n && R(r, { select: !0 }))
                : e.shiftKey && i === r && (e.preventDefault(), n && R(a, { select: !0 }))
              : i === t && e.preventDefault();
          }
        },
        [n, r, p.paused],
      );
      return (0, O.jsx)(F.div, { tabIndex: -1, ...o, ref: f, onKeyDown: m });
    }, `FocusScope`),
  );
function Je(e, { select: t = !1 } = {}) {
  let n = document.activeElement;
  for (let r of e) if ((R(r, { select: t }), document.activeElement !== n)) return;
}
L(Je, `focusFirst`);
function Ye(e) {
  let t = Xe(e);
  return [Ze(t, e), Ze(t.reverse(), e)];
}
L(Ye, `getTabbableEdges`);
function Xe(e) {
  let t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: L((e) => {
        let t = e.tagName === `INPUT` && e.type === `hidden`;
        return e.disabled || e.hidden || t
          ? NodeFilter.FILTER_SKIP
          : e.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      }, `acceptNode`),
    });
  for (; n.nextNode();) t.push(n.currentNode);
  return t;
}
L(Xe, `getTabbableCandidates`);
function Ze(e, t) {
  let n = typeof t.checkVisibility == `function` && t.checkVisibility({ checkVisibilityCSS: !0 });
  for (let r of e)
    if (!(n ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : Qe(r, { upTo: t }))) return r;
}
L(Ze, `findVisible`);
function Qe(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === `hidden`) return !0;
  for (; e;) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === `none`) return !0;
    e = e.parentElement;
  }
  return !1;
}
L(Qe, `isHidden`);
function $e(e) {
  return e instanceof HTMLInputElement && `select` in e;
}
L($e, `isSelectableInput`);
function R(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    let n = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== n && $e(e) && t && e.select());
  }
}
L(R, `focus`);
var et = tt();
function tt() {
  let e = [];
  return {
    add(t) {
      let n = e[0];
      (t !== n && n?.pause(), (e = nt(e, t)), e.unshift(t));
    },
    remove(t) {
      ((e = nt(e, t)), e[0]?.resume());
    },
  };
}
L(tt, `createFocusScopesStack`);
function nt(e, t) {
  let n = [...e],
    r = n.indexOf(t);
  return (r !== -1 && n.splice(r, 1), n);
}
L(nt, `arrayRemove`);
function rt(e) {
  return e.filter((e) => e.tagName !== `A`);
}
L(rt, `removeLinks`);
var it = g.useId || (() => void 0),
  at = 0;
function ot(e) {
  let [t, n] = g.useState(it());
  return (
    j(() => {
      e || n((e) => e ?? String(at++));
    }, [e]),
    e || (t ? `radix-${t}` : ``)
  );
}
var st = [`top`, `right`, `bottom`, `left`],
  ct = Math.min,
  z = Math.max,
  lt = Math.round,
  ut = Math.floor,
  B = (e) => ({ x: e, y: e }),
  dt = { left: `right`, right: `left`, bottom: `top`, top: `bottom` };
function ft(e, t, n) {
  return z(e, ct(t, n));
}
function V(e, t) {
  return typeof e == `function` ? e(t) : e;
}
function pt(e) {
  return e.split(`-`)[0];
}
function mt(e) {
  return e.split(`-`)[1];
}
function ht(e) {
  return e === `x` ? `y` : `x`;
}
function gt(e) {
  return e === `y` ? `height` : `width`;
}
function H(e) {
  let t = e[0];
  return t === `t` || t === `b` ? `y` : `x`;
}
function _t(e) {
  return ht(H(e));
}
function vt(e, t, n) {
  n === void 0 && (n = !1);
  let r = mt(e),
    i = _t(e),
    a = gt(i),
    o =
      i === `x`
        ? r === (n ? `end` : `start`)
          ? `right`
          : `left`
        : r === `start`
          ? `bottom`
          : `top`;
  return (t.reference[a] > t.floating[a] && (o = Dt(o)), [o, Dt(o)]);
}
function yt(e) {
  let t = Dt(e);
  return [bt(e), t, bt(t)];
}
function bt(e) {
  return e.includes(`start`) ? e.replace(`start`, `end`) : e.replace(`end`, `start`);
}
var xt = [`left`, `right`],
  St = [`right`, `left`],
  Ct = [`top`, `bottom`],
  wt = [`bottom`, `top`];
function Tt(e, t, n) {
  switch (e) {
    case `top`:
    case `bottom`:
      return n ? (t ? St : xt) : t ? xt : St;
    case `left`:
    case `right`:
      return t ? Ct : wt;
    default:
      return [];
  }
}
function Et(e, t, n, r) {
  let i = mt(e),
    a = Tt(pt(e), n === `start`, r);
  return (i && ((a = a.map((e) => e + `-` + i)), t && (a = a.concat(a.map(bt)))), a);
}
function Dt(e) {
  let t = pt(e);
  return dt[t] + e.slice(t.length);
}
function Ot(e) {
  return { top: e.top ?? 0, right: e.right ?? 0, bottom: e.bottom ?? 0, left: e.left ?? 0 };
}
function kt(e) {
  return typeof e == `number` ? { top: e, right: e, bottom: e, left: e } : Ot(e);
}
function At(e) {
  let { x: t, y: n, width: r, height: i } = e;
  return { width: r, height: i, top: n, left: t, right: t + r, bottom: n + i, x: t, y: n };
}
function jt(e, t, n) {
  let { reference: r, floating: i } = e,
    a = H(t),
    o = _t(t),
    s = gt(o),
    c = pt(t),
    l = a === `y`,
    u = r.x + r.width / 2 - i.width / 2,
    d = r.y + r.height / 2 - i.height / 2,
    f = r[s] / 2 - i[s] / 2,
    p;
  switch (c) {
    case `top`:
      p = { x: u, y: r.y - i.height };
      break;
    case `bottom`:
      p = { x: u, y: r.y + r.height };
      break;
    case `right`:
      p = { x: r.x + r.width, y: d };
      break;
    case `left`:
      p = { x: r.x - i.width, y: d };
      break;
    default:
      p = { x: r.x, y: r.y };
  }
  let m = mt(t);
  return (m && (p[o] += f * (m === `end` ? 1 : -1) * (n && l ? -1 : 1)), p);
}
async function Mt(e, t) {
  t === void 0 && (t = {});
  let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e,
    {
      boundary: c = `clippingAncestors`,
      rootBoundary: l = `viewport`,
      elementContext: u = `floating`,
      altBoundary: d = !1,
      padding: f = 0,
    } = V(t, e),
    p = kt(f),
    m = o[d ? (u === `floating` ? `reference` : `floating`) : u],
    h = At(
      await i.getClippingRect({
        element:
          ((await (i.isElement == null ? void 0 : i.isElement(m))) ?? !0)
            ? m
            : m.contextElement ||
              (await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating))),
        boundary: c,
        rootBoundary: l,
        strategy: s,
      }),
    ),
    g =
      u === `floating`
        ? { x: n, y: r, width: a.floating.width, height: a.floating.height }
        : a.reference,
    _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)),
    v = ((await (i.isElement == null ? void 0 : i.isElement(_))) &&
      (await (i.getScale == null ? void 0 : i.getScale(_)))) || { x: 1, y: 1 },
    y = At(
      i.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: o,
            rect: g,
            offsetParent: _,
            strategy: s,
          })
        : g,
    );
  return {
    top: (h.top - y.top + p.top) / v.y,
    bottom: (y.bottom - h.bottom + p.bottom) / v.y,
    left: (h.left - y.left + p.left) / v.x,
    right: (y.right - h.right + p.right) / v.x,
  };
}
var Nt = 50,
  Pt = async (e, t, n) => {
    let { placement: r = `bottom`, strategy: i = `absolute`, middleware: a = [], platform: o } = n,
      s = o.detectOverflow ? o : { ...o, detectOverflow: Mt },
      c = await (o.isRTL == null ? void 0 : o.isRTL(t)),
      l = await o.getElementRects({ reference: e, floating: t, strategy: i }),
      { x: u, y: d } = jt(l, r, c),
      f = r,
      p = 0,
      m = {};
    for (let n = 0; n < a.length; n++) {
      let h = a[n];
      if (!h) continue;
      let { name: g, fn: _ } = h,
        {
          x: v,
          y,
          data: b,
          reset: x,
        } = await _({
          x: u,
          y: d,
          initialPlacement: r,
          placement: f,
          strategy: i,
          middlewareData: m,
          rects: l,
          platform: s,
          elements: { reference: e, floating: t },
        });
      ((u = v ?? u),
        (d = y ?? d),
        (m[g] = { ...m[g], ...b }),
        x &&
          p < Nt &&
          (p++,
          typeof x == `object` &&
            (x.placement && (f = x.placement),
            x.rects &&
              (l =
                x.rects === !0
                  ? await o.getElementRects({ reference: e, floating: t, strategy: i })
                  : x.rects),
            ({ x: u, y: d } = jt(l, f, c))),
          (n = -1)));
    }
    return { x: u, y: d, placement: f, strategy: i, middlewareData: m };
  },
  Ft = (e) => ({
    name: `arrow`,
    options: e,
    async fn(t) {
      let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t,
        { element: l, padding: u = 0 } = V(e, t) || {};
      if (l == null) return {};
      let d = kt(u),
        f = { x: n, y: r },
        p = _t(i),
        m = gt(p),
        h = await o.getDimensions(l),
        g = p === `y`,
        _ = g ? `top` : `left`,
        v = g ? `bottom` : `right`,
        y = g ? `clientHeight` : `clientWidth`,
        b = a.reference[m] + a.reference[p] - f[p] - a.floating[m],
        x = f[p] - a.reference[p],
        S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)),
        C = S ? S[y] : 0;
      (!C || !(await (o.isElement == null ? void 0 : o.isElement(S)))) &&
        (C = s.floating[y] || a.floating[m]);
      let w = b / 2 - x / 2,
        T = C / 2 - h[m] / 2 - 1,
        E = ct(d[_], T),
        D = ct(d[v], T),
        O = C - h[m] - D,
        k = C / 2 - h[m] / 2 + w,
        A = ft(E, k, O),
        j =
          !c.arrow &&
          mt(i) != null &&
          k !== A &&
          a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0,
        M = j ? (k < E ? k - E : k - O) : 0;
      return {
        [p]: f[p] + M,
        data: { [p]: A, centerOffset: k - A - M, ...(j && { alignmentOffset: M }) },
        reset: j,
      };
    },
  }),
  It = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: `flip`,
        options: e,
        async fn(t) {
          var n;
          let {
              placement: r,
              middlewareData: i,
              rects: a,
              initialPlacement: o,
              platform: s,
              elements: c,
            } = t,
            {
              mainAxis: l = !0,
              crossAxis: u = !0,
              fallbackPlacements: d,
              fallbackStrategy: f = `bestFit`,
              fallbackAxisSideDirection: p = `none`,
              flipAlignment: m = !0,
              ...h
            } = V(e, t);
          if ((n = i.arrow) != null && n.alignmentOffset) return {};
          let g = pt(r),
            _ = H(o),
            v = pt(o) === o,
            y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)),
            b = d || (v || !m ? [Dt(o)] : yt(o)),
            x = p !== `none`;
          !d && x && b.push(...Et(o, m, p, y));
          let S = [o, ...b],
            C = await s.detectOverflow(t, h),
            w = [],
            T = i.flip?.overflows || [];
          if ((l && w.push(C[g]), u)) {
            let e = vt(r, a, y);
            w.push(C[e[0]], C[e[1]]);
          }
          if (((T = [...T, { placement: r, overflows: w }]), !w.every((e) => e <= 0))) {
            let e = (i.flip?.index || 0) + 1,
              t = S[e];
            if (
              t &&
              (!(u === `alignment` && _ !== H(t)) ||
                T.every((e) => H(e.placement) !== _ || e.overflows[0] > 0))
            )
              return { data: { index: e, overflows: T }, reset: { placement: t } };
            let n = T.filter((e) => e.overflows[0] <= 0).sort(
              (e, t) => e.overflows[1] - t.overflows[1],
            )[0]?.placement;
            if (!n)
              switch (f) {
                case `bestFit`: {
                  let e = T.filter((e) => {
                    if (x) {
                      let t = H(e.placement);
                      return t === _ || t === `y`;
                    }
                    return !0;
                  })
                    .map((e) => [
                      e.placement,
                      e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0),
                    ])
                    .sort((e, t) => e[1] - t[1])[0]?.[0];
                  e && (n = e);
                  break;
                }
                case `initialPlacement`:
                  n = o;
                  break;
              }
            if (r !== n) return { reset: { placement: n } };
          }
          return {};
        },
      }
    );
  };
function Lt(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function Rt(e) {
  return st.some((t) => e[t] >= 0);
}
var zt = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: `hide`,
        options: e,
        async fn(t) {
          let { rects: n, platform: r } = t,
            { strategy: i = `referenceHidden`, ...a } = V(e, t);
          switch (i) {
            case `referenceHidden`: {
              let e = Lt(
                await r.detectOverflow(t, { ...a, elementContext: `reference` }),
                n.reference,
              );
              return { data: { referenceHiddenOffsets: e, referenceHidden: Rt(e) } };
            }
            case `escaped`: {
              let e = Lt(await r.detectOverflow(t, { ...a, altBoundary: !0 }), n.floating);
              return { data: { escapedOffsets: e, escaped: Rt(e) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  Bt = new Set([`left`, `top`]);
async function Vt(e, t) {
  let { placement: n, platform: r, elements: i } = e,
    a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)),
    o = pt(n),
    s = mt(n),
    c = H(n) === `y`,
    l = Bt.has(o) ? -1 : 1,
    u = a && c ? -1 : 1,
    d = V(t, e),
    {
      mainAxis: f,
      crossAxis: p,
      alignmentAxis: m,
    } = typeof d == `number`
      ? { mainAxis: d, crossAxis: 0, alignmentAxis: null }
      : { mainAxis: d.mainAxis || 0, crossAxis: d.crossAxis || 0, alignmentAxis: d.alignmentAxis };
  return (
    s && typeof m == `number` && (p = s === `end` ? m * -1 : m),
    c ? { x: p * u, y: f * l } : { x: f * l, y: p * u }
  );
}
var Ht = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: `offset`,
        options: e,
        async fn(t) {
          var n;
          let { x: r, y: i, placement: a, middlewareData: o } = t,
            s = await Vt(t, e);
          return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset
            ? {}
            : { x: r + s.x, y: i + s.y, data: { ...s, placement: a } };
        },
      }
    );
  },
  Ut = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: `shift`,
        options: e,
        async fn(t) {
          let { x: n, y: r, placement: i, platform: a } = t,
            {
              mainAxis: o = !0,
              crossAxis: s = !1,
              limiter: c = {
                fn: (e) => {
                  let { x: t, y: n } = e;
                  return { x: t, y: n };
                },
              },
              ...l
            } = V(e, t),
            u = { x: n, y: r },
            d = await a.detectOverflow(t, l),
            f = H(i),
            p = ht(f),
            m = u[p],
            h = u[f],
            g = (e, t) =>
              ft(t + d[e === `y` ? `top` : `left`], t, t - d[e === `y` ? `bottom` : `right`]);
          (o && (m = g(p, m)), s && (h = g(f, h)));
          let _ = c.fn({ ...t, [p]: m, [f]: h });
          return { ..._, data: { x: _.x - n, y: _.y - r, enabled: { [p]: o, [f]: s } } };
        },
      }
    );
  },
  Wt = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t,
            { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = V(e, t),
            u = { x: n, y: r },
            d = H(i),
            f = ht(d),
            p = u[f],
            m = u[d],
            h = V(s, t),
            g =
              typeof h == `number`
                ? { mainAxis: h, crossAxis: 0 }
                : { mainAxis: h.mainAxis ?? 0, crossAxis: h.crossAxis ?? 0 };
          if (c) {
            let e = f === `y` ? `height` : `width`,
              t = a.reference[f] - a.floating[e] + g.mainAxis,
              n = a.reference[f] + a.reference[e] - g.mainAxis;
            p < t ? (p = t) : p > n && (p = n);
          }
          if (l) {
            let e = f === `y` ? `width` : `height`,
              t = Bt.has(pt(i)),
              n =
                a.reference[d] -
                a.floating[e] +
                ((t && o.offset?.[d]) || 0) +
                (t ? 0 : g.crossAxis),
              r =
                a.reference[d] +
                a.reference[e] +
                (t ? 0 : o.offset?.[d] || 0) -
                (t ? g.crossAxis : 0);
            m < n ? (m = n) : m > r && (m = r);
          }
          return { [f]: p, [d]: m };
        },
      }
    );
  },
  Gt = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: `size`,
        options: e,
        async fn(t) {
          let { placement: n, rects: r, platform: i, elements: a } = t,
            { apply: o = () => {}, ...s } = V(e, t),
            c = await i.detectOverflow(t, s),
            l = pt(n),
            u = mt(n),
            d = H(n) === `y`,
            { width: f, height: p } = r.floating,
            m,
            h;
          l === `top` || l === `bottom`
            ? ((m = l),
              (h =
                u === ((await (i.isRTL == null ? void 0 : i.isRTL(a.floating))) ? `start` : `end`)
                  ? `left`
                  : `right`))
            : ((h = l), (m = u === `end` ? `top` : `bottom`));
          let g = p - c.top - c.bottom,
            _ = f - c.left - c.right,
            v = ct(p - c[m], g),
            y = ct(f - c[h], _),
            b = t.middlewareData.shift,
            x = !b,
            S = v,
            C = y;
          (b != null && b.enabled.x && (C = _),
            b != null && b.enabled.y && (S = g),
            x && !u && (d ? (C = f - 2 * z(c.left, c.right)) : (S = p - 2 * z(c.top, c.bottom))),
            await o({ ...t, availableWidth: C, availableHeight: S }));
          let w = await i.getDimensions(a.floating);
          return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
        },
      }
    );
  };
function Kt() {
  return typeof window < `u`;
}
function qt(e) {
  return Yt(e) ? (e.nodeName || ``).toLowerCase() : `#document`;
}
function U(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Jt(e) {
  return ((Yt(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Yt(e) {
  return Kt() ? e instanceof Node || e instanceof U(e).Node : !1;
}
function W(e) {
  return Kt() ? e instanceof Element || e instanceof U(e).Element : !1;
}
function Xt(e) {
  return Kt() ? e instanceof HTMLElement || e instanceof U(e).HTMLElement : !1;
}
function Zt(e) {
  return !Kt() || typeof ShadowRoot > `u`
    ? !1
    : e instanceof ShadowRoot || e instanceof U(e).ShadowRoot;
}
function Qt(e) {
  let { overflow: t, overflowX: n, overflowY: r, display: i } = G(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== `inline` && i !== `contents`;
}
function $t(e) {
  return /^(table|td|th)$/.test(qt(e));
}
function en(e) {
  try {
    if (e.matches(`:popover-open`)) return !0;
  } catch {}
  try {
    return e.matches(`:modal`);
  } catch {
    return !1;
  }
}
var tn = /transform|translate|scale|rotate|perspective|filter/,
  nn = /paint|layout|strict|content/,
  rn = (e) => !!e && e !== `none`,
  an;
function on(e) {
  let t = W(e) ? G(e) : e;
  return (
    rn(t.transform) ||
    rn(t.translate) ||
    rn(t.scale) ||
    rn(t.rotate) ||
    rn(t.perspective) ||
    (!cn() && (rn(t.backdropFilter) || rn(t.filter))) ||
    tn.test(t.willChange || ``) ||
    nn.test(t.contain || ``)
  );
}
function sn(e) {
  let t = dn(e);
  for (; Xt(t) && !ln(t);) {
    if (on(t)) return t;
    if (en(t)) return null;
    t = dn(t);
  }
  return null;
}
function cn() {
  return (
    (an ??= typeof CSS < `u` && CSS.supports && CSS.supports(`-webkit-backdrop-filter`, `none`)),
    an
  );
}
function ln(e) {
  return /^(html|body|#document)$/.test(qt(e));
}
function G(e) {
  return U(e).getComputedStyle(e);
}
function un(e) {
  return W(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function dn(e) {
  if (qt(e) === `html`) return e;
  let t = e.assignedSlot || e.parentNode || (Zt(e) && e.host) || Jt(e);
  return Zt(t) ? t.host : t;
}
function fn(e) {
  let t = dn(e);
  return ln(t) ? (e.ownerDocument || e).body : Xt(t) && Qt(t) ? t : fn(t);
}
function pn(e, t, n) {
  (t === void 0 && (t = []), n === void 0 && (n = !0));
  let r = fn(e),
    i = r === e.ownerDocument?.body,
    a = U(r);
  if (i) {
    let e = mn(a);
    return t.concat(a, a.visualViewport || [], Qt(r) ? r : [], e && n ? pn(e) : []);
  } else return t.concat(r, pn(r, [], n));
}
function mn(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function hn(e) {
  let t = G(e),
    n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0,
    i = Xt(e),
    a = i ? e.offsetWidth : n,
    o = i ? e.offsetHeight : r,
    s = lt(n) !== a || lt(r) !== o;
  return (s && ((n = a), (r = o)), { width: n, height: r, $: s });
}
function gn(e) {
  return W(e) ? e : e.contextElement;
}
function _n(e) {
  let t = gn(e);
  if (!Xt(t)) return B(1);
  let n = t.getBoundingClientRect(),
    { width: r, height: i, $: a } = hn(t),
    o = (a ? lt(n.width) : n.width) / r,
    s = (a ? lt(n.height) : n.height) / i;
  return (
    (!o || !Number.isFinite(o)) && (o = 1),
    (!s || !Number.isFinite(s)) && (s = 1),
    { x: o, y: s }
  );
}
var vn = B(0);
function yn(e) {
  let t = U(e);
  return !cn() || !t.visualViewport
    ? vn
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function bn(e, t, n) {
  return (t === void 0 && (t = !1), !!n && t && n === U(e));
}
function xn(e, t, n, r) {
  (t === void 0 && (t = !1), n === void 0 && (n = !1));
  let i = e.getBoundingClientRect(),
    a = gn(e),
    o = B(1);
  t && (r ? W(r) && (o = _n(r)) : (o = _n(e)));
  let s = bn(a, n, r) ? yn(a) : B(0),
    c = (i.left + s.x) / o.x,
    l = (i.top + s.y) / o.y,
    u = i.width / o.x,
    d = i.height / o.y;
  if (a && r) {
    let e = U(a),
      t = W(r) ? U(r) : r,
      n = e,
      i = mn(n);
    for (; i && t !== n;) {
      let e = _n(i),
        t = i.getBoundingClientRect(),
        r = G(i),
        a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x,
        o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
      ((c *= e.x), (l *= e.y), (u *= e.x), (d *= e.y), (c += a), (l += o), (n = U(i)), (i = mn(n)));
    }
  }
  return At({ width: u, height: d, x: c, y: l });
}
function Sn(e, t) {
  let n = un(e).scrollLeft;
  return t ? t.left + n : xn(Jt(e)).left + n;
}
function Cn(e, t) {
  let n = e.getBoundingClientRect();
  return { x: n.left + t.scrollLeft - Sn(e, n), y: n.top + t.scrollTop };
}
function wn(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: i } = e,
    a = i === `fixed`,
    o = Jt(r),
    s = t ? en(t.floating) : !1;
  if (r === o || (s && a)) return n;
  let c = { scrollLeft: 0, scrollTop: 0 },
    l = B(1),
    u = B(0),
    d = Xt(r);
  if ((d || !a) && ((qt(r) !== `body` || Qt(o)) && (c = un(r)), d)) {
    let e = xn(r);
    ((l = _n(r)), (u.x = e.x + r.clientLeft), (u.y = e.y + r.clientTop));
  }
  let f = o && !d && !a ? Cn(o, c) : B(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + f.y,
  };
}
function Tn(e) {
  return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function En(e) {
  let t = un(e),
    n = e.ownerDocument.body,
    r = z(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth),
    i = z(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight),
    a = -t.scrollLeft + Sn(e),
    o = -t.scrollTop;
  return (
    G(n).direction === `rtl` && (a += z(e.clientWidth, n.clientWidth) - r),
    { width: r, height: i, x: a, y: o }
  );
}
var Dn = 25;
function On(e, t, n) {
  n === void 0 && (n = `viewport`);
  let r = n === `layoutViewport`,
    i = U(e),
    a = Jt(e),
    o = i.visualViewport,
    s = a.clientWidth,
    c = a.clientHeight,
    l = 0,
    u = 0;
  if (o) {
    let e = !cn() || t === `fixed`;
    r
      ? e || ((l = -o.offsetLeft), (u = -o.offsetTop))
      : ((s = o.width), (c = o.height), e && ((l = o.offsetLeft), (u = o.offsetTop)));
  }
  if (Sn(a) <= 0) {
    let e = a.ownerDocument,
      t = e.body,
      n = getComputedStyle(t),
      r =
        (e.compatMode === `CSS1Compat` && parseFloat(n.marginLeft) + parseFloat(n.marginRight)) ||
        0,
      i = Math.abs(a.clientWidth - t.clientWidth - r),
      o = getComputedStyle(a).scrollbarGutter === `stable both-edges` ? i / 2 : i;
    o <= Dn && (s -= o);
  }
  return { width: s, height: c, x: l, y: u };
}
function kn(e, t) {
  let n = xn(e, !0, t === `fixed`),
    r = n.top + e.clientTop,
    i = n.left + e.clientLeft,
    a = _n(e);
  return { width: e.clientWidth * a.x, height: e.clientHeight * a.y, x: i * a.x, y: r * a.y };
}
function An(e, t, n) {
  let r;
  if (t === `viewport` || t === `layoutViewport`) r = On(e, n, t);
  else if (t === `document`) r = En(Jt(e));
  else if (W(t)) r = kn(t, n);
  else {
    let n = yn(e);
    r = { x: t.x - n.x, y: t.y - n.y, width: t.width, height: t.height };
  }
  return At(r);
}
function jn(e, t) {
  let n = t.get(e);
  if (n) return n;
  let r = pn(e, [], !1).filter((e) => W(e) && qt(e) !== `body`),
    i = null,
    a = G(e).position === `fixed`,
    o = a ? dn(e) : e;
  for (; W(o) && !ln(o);) {
    let e = G(o),
      t = on(o),
      n = i ? i.position : a ? `fixed` : ``;
    (!t && (n === `fixed` || (n === `absolute` && e.position === `static`))
      ? (r = r.filter((e) => e !== o))
      : (i = e),
      (o = dn(o)));
  }
  return (t.set(e, r), r);
}
function Mn(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: i } = e,
    a = [...(n === `clippingAncestors` ? (en(t) ? [] : jn(t, this._c)) : [].concat(n)), r],
    o = An(t, a[0], i),
    s = o.top,
    c = o.right,
    l = o.bottom,
    u = o.left;
  for (let e = 1; e < a.length; e++) {
    let n = An(t, a[e], i);
    ((s = z(n.top, s)), (c = ct(n.right, c)), (l = ct(n.bottom, l)), (u = z(n.left, u)));
  }
  return { width: c - u, height: l - s, x: u, y: s };
}
function Nn(e) {
  let { width: t, height: n } = hn(e);
  return { width: t, height: n };
}
function Pn(e, t, n) {
  let r = Xt(t),
    i = Jt(t),
    a = n === `fixed`,
    o = xn(e, !0, a, t),
    s = { scrollLeft: 0, scrollTop: 0 },
    c = B(0);
  if ((r || !a) && ((qt(t) !== `body` || Qt(i)) && (s = un(t)), r)) {
    let e = xn(t, !0, a, t);
    ((c.x = e.x + t.clientLeft), (c.y = e.y + t.clientTop));
  }
  !r && i && (c.x = Sn(i));
  let l = i && !r && !a ? Cn(i, s) : B(0);
  return {
    x: o.left + s.scrollLeft - c.x - l.x,
    y: o.top + s.scrollTop - c.y - l.y,
    width: o.width,
    height: o.height,
  };
}
function Fn(e) {
  return G(e).position === `static`;
}
function In(e, t) {
  if (!Xt(e) || G(e).position === `fixed`) return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return (Jt(e) === n && (n = n.ownerDocument.body), n);
}
function Ln(e, t) {
  let n = U(e);
  if (en(e)) return n;
  if (!Xt(e)) {
    let t = dn(e);
    for (; t && !ln(t);) {
      if (W(t) && !Fn(t)) return t;
      t = dn(t);
    }
    return n;
  }
  let r = In(e, t);
  for (; r && $t(r) && Fn(r);) r = In(r, t);
  return r && ln(r) && Fn(r) && !on(r) ? n : r || sn(e) || n;
}
var Rn = async function (e) {
  let t = this.getOffsetParent || Ln,
    n = this.getDimensions,
    r = await n(e.floating);
  return {
    reference: Pn(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  };
};
function zn(e) {
  return G(e).direction === `rtl`;
}
var Bn = {
  convertOffsetParentRelativeRectToViewportRelativeRect: wn,
  getDocumentElement: Jt,
  getClippingRect: Mn,
  getOffsetParent: Ln,
  getElementRects: Rn,
  getClientRects: Tn,
  getDimensions: Nn,
  getScale: _n,
  isElement: W,
  isRTL: zn,
};
function Vn(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Hn(e, t, n) {
  let r = null,
    i,
    a = Jt(e);
  function o() {
    var e;
    (clearTimeout(i), (e = r) == null || e.disconnect(), (r = null));
  }
  function s(n, c) {
    (n === void 0 && (n = !1), c === void 0 && (c = 1), o());
    let l = e.getBoundingClientRect(),
      { left: u, top: d, width: f, height: p } = l;
    if ((n || t(), !f || !p)) return;
    let m = ut(d),
      h = ut(a.clientWidth - (u + f)),
      g = ut(a.clientHeight - (d + p)),
      _ = ut(u),
      v = {
        rootMargin: -m + `px ` + -h + `px ` + -g + `px ` + -_ + `px`,
        threshold: z(0, ct(1, c)) || 1,
      },
      y = !0;
    function b(t) {
      let n = t[0].intersectionRatio;
      if (!Vn(l, e.getBoundingClientRect())) return s();
      if (n !== c) {
        if (!y) return s();
        n
          ? s(!1, n)
          : (i = setTimeout(() => {
              s(!1, 1e-7);
            }, 1e3));
      }
      y = !1;
    }
    try {
      r = new IntersectionObserver(b, { ...v, root: a.ownerDocument });
    } catch {
      r = new IntersectionObserver(b, v);
    }
    r.observe(e);
  }
  let c = U(e),
    l = () => s(n);
  return (
    c.addEventListener(`resize`, l),
    s(!0),
    () => {
      (c.removeEventListener(`resize`, l), o());
    }
  );
}
function Un(e, t, n, r) {
  r === void 0 && (r = {});
  let {
      ancestorScroll: i = !0,
      ancestorResize: a = !0,
      elementResize: o = typeof ResizeObserver == `function`,
      layoutShift: s = typeof IntersectionObserver == `function`,
      animationFrame: c = !1,
    } = r,
    l = gn(e),
    u = i || a ? [...(l ? pn(l) : []), ...(t ? pn(t) : [])] : [];
  u.forEach((e) => {
    (i && e.addEventListener(`scroll`, n), a && e.addEventListener(`resize`, n));
  });
  let d = l && s ? Hn(l, n, a) : null,
    f = -1,
    p = null;
  o &&
    ((p = new ResizeObserver((e) => {
      let [r] = e;
      (r &&
        r.target === l &&
        p &&
        t &&
        (p.unobserve(t),
        cancelAnimationFrame(f),
        (f = requestAnimationFrame(() => {
          var e;
          (e = p) == null || e.observe(t);
        }))),
        n());
    })),
    l && !c && p.observe(l),
    t && p.observe(t));
  let m,
    h = c ? xn(e) : null;
  c && g();
  function g() {
    let t = xn(e);
    (h && !Vn(h, t) && n(), (h = t), (m = requestAnimationFrame(g)));
  }
  return (
    n(),
    () => {
      var e;
      (u.forEach((e) => {
        (i && e.removeEventListener(`scroll`, n), a && e.removeEventListener(`resize`, n));
      }),
        d?.(),
        (e = p) == null || e.disconnect(),
        (p = null),
        c && cancelAnimationFrame(m));
    }
  );
}
var Wn = Ht,
  Gn = Ut,
  Kn = It,
  qn = Gt,
  Jn = zt,
  Yn = Ft,
  Xn = Wt,
  Zn = (e, t, n) => {
    let r = new Map(),
      i = n ?? {},
      a = { ...Bn, ...i.platform, _c: r };
    return Pt(e, t, { ...i, platform: a });
  },
  Qn = typeof document < `u` ? g.useLayoutEffect : function () {};
function $n(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == `function` && e.toString() === t.toString()) return !0;
  let n, r, i;
  if (e && t && typeof e == `object`) {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0;) if (!$n(e[r], t[r])) return !1;
      return !0;
    }
    if (((i = Object.keys(e)), (n = i.length), n !== Object.keys(t).length)) return !1;
    for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
    for (r = n; r-- !== 0;) {
      let n = i[r];
      if (!(n === `_owner` && e.$$typeof) && !$n(e[n], t[n])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function er(e) {
  return typeof window > `u` ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function tr(e, t) {
  let n = er(e);
  return Math.round(t * n) / n;
}
function nr(e) {
  let t = g.useRef(e);
  return (
    Qn(() => {
      t.current = e;
    }),
    t
  );
}
function rr(e) {
  e === void 0 && (e = {});
  let {
      placement: t = `bottom`,
      strategy: n = `absolute`,
      middleware: r = [],
      platform: i,
      elements: { reference: a, floating: o } = {},
      transform: s = !0,
      whileElementsMounted: c,
      open: l,
    } = e,
    [u, d] = g.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [f, p] = g.useState(r);
  $n(f, r) || p(r);
  let [m, h] = g.useState(null),
    [_, v] = g.useState(null),
    y = g.useCallback((e) => {
      e !== C.current && ((C.current = e), h(e));
    }, []),
    b = g.useCallback((e) => {
      e !== w.current && ((w.current = e), v(e));
    }, []),
    x = a || m,
    S = o || _,
    C = g.useRef(null),
    w = g.useRef(null),
    T = g.useRef(u),
    E = c != null,
    D = nr(c),
    O = nr(i),
    k = nr(l),
    A = g.useCallback(() => {
      if (!C.current || !w.current) return;
      let e = { placement: t, strategy: n, middleware: f };
      (O.current && (e.platform = O.current),
        Zn(C.current, w.current, e).then((e) => {
          let t = { ...e, isPositioned: k.current !== !1 };
          j.current &&
            !$n(T.current, t) &&
            ((T.current = t),
            ce.flushSync(() => {
              d(t);
            }));
        }));
    }, [f, t, n, O, k]);
  Qn(() => {
    l === !1 &&
      T.current.isPositioned &&
      ((T.current.isPositioned = !1), d((e) => ({ ...e, isPositioned: !1 })));
  }, [l]);
  let j = g.useRef(!1);
  (Qn(
    () => (
      (j.current = !0),
      () => {
        j.current = !1;
      }
    ),
    [],
  ),
    Qn(() => {
      if ((x && (C.current = x), S && (w.current = S), x && S)) {
        if (D.current) return D.current(x, S, A);
        A();
      }
    }, [x, S, A, D, E]));
  let M = g.useMemo(() => ({ reference: C, floating: w, setReference: y, setFloating: b }), [y, b]),
    N = g.useMemo(() => ({ reference: x, floating: S }), [x, S]),
    ee = g.useMemo(() => {
      let e = { position: n, left: 0, top: 0 };
      if (!N.floating) return e;
      let t = tr(N.floating, u.x),
        r = tr(N.floating, u.y);
      return s
        ? {
            ...e,
            transform: `translate(` + t + `px, ` + r + `px)`,
            ...(er(N.floating) >= 1.5 && { willChange: `transform` }),
          }
        : { position: n, left: t, top: r };
    }, [n, s, N.floating, u.x, u.y]);
  return g.useMemo(
    () => ({ ...u, update: A, refs: M, elements: N, floatingStyles: ee }),
    [u, A, M, N, ee],
  );
}
var ir = (e) => {
    function t(e) {
      return {}.hasOwnProperty.call(e, `current`);
    }
    return {
      name: `arrow`,
      options: e,
      fn(n) {
        let { element: r, padding: i } = typeof e == `function` ? e(n) : e;
        return r && t(r)
          ? r.current == null
            ? {}
            : Yn({ element: r.current, padding: i }).fn(n)
          : r
            ? Yn({ element: r, padding: i }).fn(n)
            : {};
      },
    };
  },
  ar = (e, t) => {
    let n = Wn(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  or = (e, t) => {
    let n = Gn(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  sr = (e, t) => ({ fn: Xn(e).fn, options: [e, t] }),
  cr = (e, t) => {
    let n = Kn(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  lr = (e, t) => {
    let n = qn(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  ur = (e, t) => {
    let n = Jn(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  dr = (e, t) => {
    let n = ir(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  };
function fr(e) {
  let [t, n] = g.useState(void 0);
  return (
    j(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        let t = new ResizeObserver((t) => {
          if (!Array.isArray(t) || !t.length) return;
          let r = t[0],
            i,
            a;
          if (`borderBoxSize` in r) {
            let e = r.borderBoxSize,
              t = Array.isArray(e) ? e[0] : e;
            ((i = t.inlineSize), (a = t.blockSize));
          } else ((i = e.offsetWidth), (a = e.offsetHeight));
          n({ width: i, height: a });
        });
        return (t.observe(e, { box: `border-box` }), () => t.unobserve(e));
      } else n(void 0);
    }, [e]),
    t
  );
}
var pr = Object.defineProperty,
  mr = (e, t) => pr(e, `name`, { value: t, configurable: !0 }),
  hr = `Popper`,
  [gr, _r] = k(hr),
  [vr, yr] = gr(hr),
  br = mr((e) => {
    let { __scopePopper: t, children: n } = e,
      [r, i] = g.useState(null),
      [a, o] = g.useState(void 0);
    return (0, O.jsx)(vr, {
      scope: t,
      anchor: r,
      onAnchorChange: i,
      placementState: a,
      setPlacementState: o,
      children: n,
    });
  }, `Popper`),
  xr = `PopperAnchor`,
  Sr = g.forwardRef(
    mr(function (e, t) {
      let { __scopePopper: n, virtualRef: r, ...i } = e,
        a = yr(xr, n),
        o = g.useRef(null),
        s = a.onAnchorChange,
        c = D(
          t,
          g.useCallback(
            (e) => {
              ((o.current = e), e && s(e));
            },
            [s],
          ),
        ),
        l = g.useRef(null);
      g.useEffect(() => {
        if (!r) return;
        let e = l.current;
        ((l.current = r.current), e !== l.current && s(l.current));
      });
      let u = a.placementState && kr(a.placementState),
        d = u?.[0],
        f = u?.[1];
      return r
        ? null
        : (0, O.jsx)(F.div, {
            "data-radix-popper-side": d,
            "data-radix-popper-align": f,
            ...i,
            ref: c,
          });
    }, `PopperAnchor`),
  ),
  Cr = `PopperContent`,
  [wr, Tr] = gr(Cr),
  Er = g.forwardRef(
    mr(function (e, t) {
      let {
          __scopePopper: n,
          side: r = `bottom`,
          sideOffset: i = 0,
          align: a = `center`,
          alignOffset: o = 0,
          arrowPadding: s = 0,
          avoidCollisions: c = !0,
          collisionBoundary: l = [],
          collisionPadding: u = 0,
          sticky: d = `partial`,
          hideWhenDetached: f = !1,
          updatePositionStrategy: p = `optimized`,
          onPlaced: m,
          ...h
        } = e,
        _ = yr(Cr, n),
        [v, y] = g.useState(null),
        b = D(t, y),
        [x, S] = g.useState(null),
        C = fr(x),
        w = C?.width ?? 0,
        T = C?.height ?? 0,
        E = r + (a === `center` ? `` : `-` + a),
        k = typeof u == `number` ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u },
        A = Array.isArray(l) ? l : [l],
        M = A.length > 0,
        N = { padding: k, boundary: A.filter(Dr), altBoundary: M },
        {
          refs: ee,
          floatingStyles: te,
          placement: ne,
          isPositioned: re,
          middlewareData: P,
        } = rr({
          strategy: `fixed`,
          placement: E,
          whileElementsMounted: mr(
            (...e) => Un(...e, { animationFrame: p === `always` }),
            `whileElementsMounted`,
          ),
          elements: { reference: _.anchor },
          middleware: [
            ar({ mainAxis: i + T, alignmentAxis: o }),
            c &&
              or({ mainAxis: !0, crossAxis: !1, limiter: d === `partial` ? sr() : void 0, ...N }),
            c && cr({ ...N }),
            lr({
              ...N,
              apply: mr(({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
                let { width: i, height: a } = t.reference,
                  o = e.floating.style;
                (o.setProperty(`--radix-popper-available-width`, `${n}px`),
                  o.setProperty(`--radix-popper-available-height`, `${r}px`),
                  o.setProperty(`--radix-popper-anchor-width`, `${i}px`),
                  o.setProperty(`--radix-popper-anchor-height`, `${a}px`));
              }, `apply`),
            }),
            x && dr({ element: x, padding: s }),
            Or({ arrowWidth: w, arrowHeight: T }),
            f && ur({ strategy: `referenceHidden`, ...N, boundary: M ? N.boundary : void 0 }),
          ],
        }),
        ie = _.setPlacementState;
      j(
        () => (
          ie(ne),
          () => {
            ie(void 0);
          }
        ),
        [ne, ie],
      );
      let [ae, oe] = kr(ne),
        se = Te(m);
      j(() => {
        re && se?.();
      }, [re, se]);
      let ce = P.arrow?.x,
        le = P.arrow?.y,
        ue = P.arrow?.centerOffset !== 0,
        [de, fe] = g.useState();
      return (
        j(() => {
          v && fe(window.getComputedStyle(v).zIndex);
        }, [v]),
        (0, O.jsx)(`div`, {
          ref: ee.setFloating,
          "data-radix-popper-content-wrapper": ``,
          style: {
            ...te,
            transform: re ? te.transform : `translate(0, -200%)`,
            minWidth: `max-content`,
            zIndex: de,
            "--radix-popper-transform-origin": [P.transformOrigin?.x, P.transformOrigin?.y].join(
              ` `,
            ),
            ...(P.hide?.referenceHidden && { visibility: `hidden`, pointerEvents: `none` }),
          },
          dir: e.dir,
          children: (0, O.jsx)(wr, {
            scope: n,
            placedSide: ae,
            placedAlign: oe,
            onArrowChange: S,
            arrowX: ce,
            arrowY: le,
            shouldHideArrow: ue,
            children: (0, O.jsx)(F.div, {
              "data-side": ae,
              "data-align": oe,
              ...h,
              ref: b,
              style: { ...h.style, animation: re ? h.style?.animation : `none` },
            }),
          }),
        })
      );
    }, `PopperContent`),
  );
function Dr(e) {
  return e !== null;
}
mr(Dr, `isNotNull`);
var Or = mr(
  (e) => ({
    name: `transformOrigin`,
    options: e,
    fn(t) {
      let { placement: n, rects: r, middlewareData: i } = t,
        a = i.arrow?.centerOffset !== 0,
        o = a ? 0 : e.arrowWidth,
        s = a ? 0 : e.arrowHeight,
        [c, l] = kr(n),
        u = { start: `0%`, center: `50%`, end: `100%` }[l],
        d = (i.arrow?.x ?? 0) + o / 2,
        f = (i.arrow?.y ?? 0) + s / 2,
        p = ``,
        m = ``;
      return (
        c === `bottom`
          ? ((p = a ? u : `${d}px`), (m = `${-s}px`))
          : c === `top`
            ? ((p = a ? u : `${d}px`), (m = `${r.floating.height + s}px`))
            : c === `right`
              ? ((p = `${-s}px`), (m = a ? u : `${f}px`))
              : c === `left` && ((p = `${r.floating.width + s}px`), (m = a ? u : `${f}px`)),
        { data: { x: p, y: m } }
      );
    },
  }),
  `transformOrigin`,
);
function kr(e) {
  let [t, n = `center`] = e.split(`-`);
  return [t, n];
}
mr(kr, `getSideAndAlignFromPlacement`);
var Ar = br,
  jr = Sr,
  Mr = Er,
  Nr = Object.defineProperty,
  Pr = g.forwardRef(
    ((e, t) => Nr(e, `name`, { value: t, configurable: !0 }))(function (e, t) {
      let { container: n, ...r } = e,
        [i, a] = g.useState(!1);
      j(() => a(!0), []);
      let o = n || (i && globalThis?.document?.body);
      return o ? ce.createPortal((0, O.jsx)(F.div, { ...r, ref: t }), o) : null;
    }, `Portal`),
  ),
  Fr = Object.defineProperty,
  Ir = (e, t) => Fr(e, `name`, { value: t, configurable: !0 });
function Lr(e, t) {
  return g.useReducer((e, n) => t[e][n] ?? e, e);
}
Ir(Lr, `useStateMachine`);
var Rr = Ir((e) => {
  let { present: t, children: n } = e,
    r = zr(t),
    i = typeof n == `function` ? n({ present: r.isPresent }) : g.Children.only(n),
    a = Vr(r.ref, Ur(i));
  return typeof n == `function` || r.isPresent ? g.cloneElement(i, { ref: a }) : null;
}, `Presence`);
function zr(e) {
  let [t, n] = g.useState(),
    r = g.useRef(null),
    i = g.useRef(e),
    a = g.useRef(`none`),
    o = g.useRef(void 0),
    [s, c] = Lr(e ? `mounted` : `unmounted`, {
      mounted: { UNMOUNT: `unmounted`, ANIMATION_OUT: `unmountSuspended` },
      unmountSuspended: { MOUNT: `mounted`, ANIMATION_END: `unmounted` },
      unmounted: { MOUNT: `mounted` },
    });
  return (
    g.useEffect(() => {
      s === `mounted`
        ? ((a.current = o.current ?? Hr(r.current)), (o.current = void 0))
        : (a.current = `none`);
    }, [s]),
    j(() => {
      let t = r.current,
        n = i.current;
      if (n !== e) {
        let r = a.current,
          s = Hr(t);
        (e
          ? ((o.current = s), c(`MOUNT`))
          : s === `none` || t?.display === `none`
            ? c(`UNMOUNT`)
            : c(n && r !== s ? `ANIMATION_OUT` : `UNMOUNT`),
          (i.current = e));
      }
    }, [e, c]),
    j(() => {
      if (t) {
        let e,
          n = t.ownerDocument.defaultView ?? window,
          o = Ir((a) => {
            let o = Hr(r.current).includes(CSS.escape(a.animationName));
            if (a.target === t && o && (c(`ANIMATION_END`), !i.current)) {
              let r = t.style.animationFillMode;
              ((t.style.animationFillMode = `forwards`),
                (e = n.setTimeout(() => {
                  t.style.animationFillMode === `forwards` && (t.style.animationFillMode = r);
                })));
            }
          }, `handleAnimationEnd`),
          s = Ir((e) => {
            e.target === t && (a.current = Hr(r.current));
          }, `handleAnimationStart`);
        return (
          t.addEventListener(`animationstart`, s),
          t.addEventListener(`animationcancel`, o),
          t.addEventListener(`animationend`, o),
          () => {
            (n.clearTimeout(e),
              t.removeEventListener(`animationstart`, s),
              t.removeEventListener(`animationcancel`, o),
              t.removeEventListener(`animationend`, o));
          }
        );
      } else c(`ANIMATION_END`);
    }, [t, c]),
    {
      isPresent: [`mounted`, `unmountSuspended`].includes(s),
      ref: g.useCallback((e) => {
        if (e) {
          let t = getComputedStyle(e);
          ((r.current = t), (o.current = Hr(t)));
        } else r.current = null;
        n(e);
      }, []),
    }
  );
}
Ir(zr, `usePresence`);
function Br(e, t) {
  if (typeof e == `function`) return e(t);
  e != null && (e.current = t);
}
Ir(Br, `setRef`);
function Vr(...e) {
  let t = g.useRef(e);
  return (
    (t.current = e),
    g.useCallback((e) => {
      let n = t.current,
        r = !1,
        i = n.map((t) => {
          let n = Br(t, e);
          return (!r && typeof n == `function` && (r = !0), n);
        });
      if (r)
        return () => {
          for (let e = 0; e < i.length; e++) {
            let t = i[e];
            typeof t == `function` ? t() : Br(n[e], null);
          }
        };
    }, [])
  );
}
Ir(Vr, `useStableComposedRefs`);
function Hr(e) {
  return e?.animationName || `none`;
}
Ir(Hr, `getAnimationName`);
function Ur(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, `ref`)?.get,
    n = t && `isReactWarning` in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, `ref`)?.get),
      (n = t && `isReactWarning` in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
Ir(Ur, `getElementRef`);
var Wr = !1;
function Gr() {
  let [e, t] = g.useState(Wr);
  return (
    g.useEffect(() => {
      Wr || ((Wr = !0), t(!0));
    }, []),
    e
  );
}
var Kr = g.useSyncExternalStore;
function qr() {
  return () => {};
}
function Jr() {
  return Kr(
    qr,
    () => !0,
    () => !1,
  );
}
var Yr = typeof Kr == `function` ? Jr : Gr,
  Xr = Object.defineProperty,
  Zr = (e, t) => Xr(e, `name`, { value: t, configurable: !0 }),
  Qr = `rovingFocusGroup.onEntryFocus`,
  $r = { bubbles: !1, cancelable: !0 },
  ei = `RovingFocusGroup`,
  [ti, ni, ri] = Se(ei),
  [ii, ai] = k(ei, [ri]),
  [oi, si] = ii(ei),
  ci = g.forwardRef(
    Zr(function (e, t) {
      return (0, O.jsx)(ti.Provider, {
        scope: e.__scopeRovingFocusGroup,
        children: (0, O.jsx)(ti.Slot, {
          scope: e.__scopeRovingFocusGroup,
          children: (0, O.jsx)(li, { ...e, ref: t }),
        }),
      });
    }, `RovingFocusGroup`),
  ),
  li = g.forwardRef(
    Zr(function (e, t) {
      let {
          __scopeRovingFocusGroup: n,
          orientation: r,
          loop: i = !1,
          dir: a,
          currentTabStopId: o,
          defaultCurrentTabStopId: s,
          onCurrentTabStopIdChange: c,
          onEntryFocus: l,
          preventScrollOnEntryFocus: u = !1,
          ...d
        } = e,
        f = g.useRef(null),
        p = D(t, f),
        m = we(a),
        [h, _] = P({ prop: o, defaultProp: s ?? null, onChange: c, caller: ei }),
        [v, y] = g.useState(!1),
        x = Te(l),
        S = ni(n),
        C = g.useRef(!1),
        [w, T] = g.useState(0);
      return (
        g.useEffect(() => {
          let e = f.current;
          if (e) return (e.addEventListener(Qr, x), () => e.removeEventListener(Qr, x));
        }, [x]),
        (0, O.jsx)(oi, {
          scope: n,
          orientation: r,
          dir: m,
          loop: i,
          currentTabStopId: h,
          onItemFocus: g.useCallback((e) => _(e), [_]),
          onItemShiftTab: g.useCallback(() => y(!0), []),
          onFocusableItemAdd: g.useCallback(() => T((e) => e + 1), []),
          onFocusableItemRemove: g.useCallback(() => T((e) => e - 1), []),
          children: (0, O.jsx)(F.div, {
            tabIndex: v || w === 0 ? -1 : 0,
            "data-orientation": r,
            ...d,
            ref: p,
            style: { outline: `none`, ...e.style },
            onMouseDown: b(e.onMouseDown, () => {
              C.current = !0;
            }),
            onFocus: b(e.onFocus, (e) => {
              let t = !C.current;
              if (e.target === e.currentTarget && t && !v) {
                let t = new CustomEvent(Qr, $r);
                if ((e.currentTarget.dispatchEvent(t), !t.defaultPrevented)) {
                  let e = S().filter((e) => e.focusable);
                  hi(
                    [e.find((e) => e.active), e.find((e) => e.id === h), ...e]
                      .filter(Boolean)
                      .map((e) => e.ref.current),
                    u,
                  );
                }
              }
              C.current = !1;
            }),
            onBlur: b(e.onBlur, () => y(!1)),
          }),
        })
      );
    }, `RovingFocusGroupImpl`),
  ),
  ui = `RovingFocusGroupItem`,
  di = g.forwardRef(
    Zr(function (e, t) {
      let {
          __scopeRovingFocusGroup: n,
          focusable: r = !0,
          active: i = !1,
          tabStopId: a,
          children: o,
          ...s
        } = e,
        c = ot(),
        l = a || c,
        u = si(ui, n),
        d = u.currentTabStopId === l,
        f = ni(n),
        { onFocusableItemAdd: p, onFocusableItemRemove: m, currentTabStopId: h } = u,
        _ = Yr();
      return (
        j(() => {
          if (!(!_ || !r)) return (p(), () => m());
        }, [_, r, p, m]),
        g.useEffect(() => {
          if (!(_ || !r)) return (p(), () => m());
        }, [_, r, p, m]),
        (0, O.jsx)(ti.ItemSlot, {
          scope: n,
          id: l,
          focusable: r,
          active: i,
          children: (0, O.jsx)(F.span, {
            tabIndex: d ? 0 : -1,
            "data-orientation": u.orientation,
            ...s,
            ref: t,
            onMouseDown: b(e.onMouseDown, (e) => {
              r ? u.onItemFocus(l) : e.preventDefault();
            }),
            onFocus: b(e.onFocus, () => u.onItemFocus(l)),
            onKeyDown: b(e.onKeyDown, (e) => {
              if (e.key === `Tab` && e.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (e.target !== e.currentTarget) return;
              let t = mi(e, u.orientation, u.dir);
              if (t !== void 0) {
                if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
                e.preventDefault();
                let n = f()
                  .filter((e) => e.focusable)
                  .map((e) => e.ref.current);
                if (t === `last`) n.reverse();
                else if (t === `prev` || t === `next`) {
                  t === `prev` && n.reverse();
                  let r = n.indexOf(e.currentTarget);
                  n = u.loop ? gi(n, r + 1) : n.slice(r + 1);
                }
                setTimeout(() => hi(n));
              }
            }),
            children:
              typeof o == `function` ? o({ isCurrentTabStop: d, hasTabStop: h != null }) : o,
          }),
        })
      );
    }, `RovingFocusGroupItem`),
  ),
  fi = {
    ArrowLeft: `prev`,
    ArrowUp: `prev`,
    ArrowRight: `next`,
    ArrowDown: `next`,
    PageUp: `first`,
    Home: `first`,
    PageDown: `last`,
    End: `last`,
  };
function pi(e, t) {
  return t === `rtl`
    ? e === `ArrowLeft`
      ? `ArrowRight`
      : e === `ArrowRight`
        ? `ArrowLeft`
        : e
    : e;
}
Zr(pi, `getDirectionAwareKey`);
function mi(e, t, n) {
  let r = pi(e.key, n);
  if (
    !(t === `vertical` && [`ArrowLeft`, `ArrowRight`].includes(r)) &&
    !(t === `horizontal` && [`ArrowUp`, `ArrowDown`].includes(r))
  )
    return fi[r];
}
Zr(mi, `getFocusIntent`);
function hi(e, t = !1) {
  let n = document.activeElement;
  for (let r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
Zr(hi, `focusFirst`);
function gi(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
Zr(gi, `wrapArray`);
var _i = ci,
  vi = di,
  yi = function (e) {
    return typeof document > `u` ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
  },
  bi = new WeakMap(),
  xi = new WeakMap(),
  Si = {},
  Ci = 0,
  wi = function (e) {
    return e && (e.host || wi(e.parentNode));
  },
  Ti = function (e, t) {
    return t
      .map(function (t) {
        if (e.contains(t)) return t;
        var n = wi(t);
        return n && e.contains(n)
          ? n
          : (console.error(`aria-hidden`, t, `in not contained inside`, e, `. Doing nothing`),
            null);
      })
      .filter(function (e) {
        return !!e;
      });
  },
  Ei = function (e, t, n, r) {
    var i = Ti(t, Array.isArray(e) ? e : [e]);
    Si[n] || (Si[n] = new WeakMap());
    var a = Si[n],
      o = [],
      s = new Set(),
      c = new Set(i),
      l = function (e) {
        !e || s.has(e) || (s.add(e), l(e.parentNode));
      };
    i.forEach(l);
    var u = function (e) {
      !e ||
        c.has(e) ||
        Array.prototype.forEach.call(e.children, function (e) {
          if (s.has(e)) u(e);
          else
            try {
              var t = e.getAttribute(r),
                i = t !== null && t !== `false`,
                c = (bi.get(e) || 0) + 1,
                l = (a.get(e) || 0) + 1;
              (bi.set(e, c),
                a.set(e, l),
                o.push(e),
                c === 1 && i && xi.set(e, !0),
                l === 1 && e.setAttribute(n, `true`),
                i || e.setAttribute(r, `true`));
            } catch (t) {
              console.error(`aria-hidden: cannot operate on `, e, t);
            }
        });
    };
    return (
      u(t),
      s.clear(),
      Ci++,
      function () {
        (o.forEach(function (e) {
          var t = bi.get(e) - 1,
            i = a.get(e) - 1;
          (bi.set(e, t),
            a.set(e, i),
            t || (xi.has(e) || e.removeAttribute(r), xi.delete(e)),
            i || e.removeAttribute(n));
        }),
          Ci--,
          Ci || ((bi = new WeakMap()), (bi = new WeakMap()), (xi = new WeakMap()), (Si = {})));
      }
    );
  },
  Di = function (e, t, n) {
    n === void 0 && (n = `data-aria-hidden`);
    var r = Array.from(Array.isArray(e) ? e : [e]),
      i = t || yi(e);
    return i
      ? (r.push.apply(r, Array.from(i.querySelectorAll(`[aria-live], script`))),
        Ei(r, i, n, `aria-hidden`))
      : function () {
          return null;
        };
  },
  K = function () {
    return (
      (K =
        Object.assign ||
        function (e) {
          for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var i in ((t = arguments[n]), t))
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e;
        }),
      K.apply(this, arguments)
    );
  };
function Oi(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == `function`)
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
}
function ki(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, a; r < i; r++)
      (a || !(r in t)) && ((a ||= Array.prototype.slice.call(t, 0, r)), (a[r] = t[r]));
  return e.concat(a || Array.prototype.slice.call(t));
}
var Ai = `right-scroll-bar-position`,
  ji = `width-before-scroll-bar`,
  Mi = `with-scroll-bars-hidden`,
  Ni = `--removed-body-scroll-bar-size`;
function Pi(e, t) {
  return (typeof e == `function` ? e(t) : e && (e.current = t), e);
}
function Fi(e, t) {
  var n = (0, g.useState)(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(e) {
          var t = n.value;
          t !== e && ((n.value = e), n.callback(e, t));
        },
      },
    };
  })[0];
  return ((n.callback = t), n.facade);
}
var Ii = typeof window < `u` ? g.useLayoutEffect : g.useEffect,
  Li = new WeakMap();
function Ri(e, t) {
  var n = Fi(t || null, function (t) {
    return e.forEach(function (e) {
      return Pi(e, t);
    });
  });
  return (
    Ii(
      function () {
        var t = Li.get(n);
        if (t) {
          var r = new Set(t),
            i = new Set(e),
            a = n.current;
          (r.forEach(function (e) {
            i.has(e) || Pi(e, null);
          }),
            i.forEach(function (e) {
              r.has(e) || Pi(e, a);
            }));
        }
        Li.set(n, e);
      },
      [e],
    ),
    n
  );
}
function zi(e) {
  return e;
}
function Bi(e, t) {
  t === void 0 && (t = zi);
  var n = [],
    r = !1;
  return {
    read: function () {
      if (r)
        throw Error(
          "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
        );
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function (e) {
      var i = t(e, r);
      return (
        n.push(i),
        function () {
          n = n.filter(function (e) {
            return e !== i;
          });
        }
      );
    },
    assignSyncMedium: function (e) {
      for (r = !0; n.length;) {
        var t = n;
        ((n = []), t.forEach(e));
      }
      n = {
        push: function (t) {
          return e(t);
        },
        filter: function () {
          return n;
        },
      };
    },
    assignMedium: function (e) {
      r = !0;
      var t = [];
      if (n.length) {
        var i = n;
        ((n = []), i.forEach(e), (t = n));
      }
      var a = function () {
          var n = t;
          ((t = []), n.forEach(e));
        },
        o = function () {
          return Promise.resolve().then(a);
        };
      (o(),
        (n = {
          push: function (e) {
            (t.push(e), o());
          },
          filter: function (e) {
            return ((t = t.filter(e)), n);
          },
        }));
    },
  };
}
function Vi(e) {
  e === void 0 && (e = {});
  var t = Bi(null);
  return ((t.options = K({ async: !0, ssr: !1 }, e)), t);
}
var Hi = function (e) {
  var t = e.sideCar,
    n = Oi(e, [`sideCar`]);
  if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r) throw Error(`Sidecar medium not found`);
  return g.createElement(r, K({}, n));
};
Hi.isSideCarExport = !0;
function Ui(e, t) {
  return (e.useMedium(t), Hi);
}
var Wi = Vi(),
  Gi = function () {},
  Ki = g.forwardRef(function (e, t) {
    var n = g.useRef(null),
      r = g.useState({ onScrollCapture: Gi, onWheelCapture: Gi, onTouchMoveCapture: Gi }),
      i = r[0],
      a = r[1],
      o = e.forwardProps,
      s = e.children,
      c = e.className,
      l = e.removeScrollBar,
      u = e.enabled,
      d = e.shards,
      f = e.sideCar,
      p = e.noRelative,
      m = e.noIsolation,
      h = e.inert,
      _ = e.allowPinchZoom,
      v = e.as,
      y = v === void 0 ? `div` : v,
      b = e.gapMode,
      x = Oi(e, [
        `forwardProps`,
        `children`,
        `className`,
        `removeScrollBar`,
        `enabled`,
        `shards`,
        `sideCar`,
        `noRelative`,
        `noIsolation`,
        `inert`,
        `allowPinchZoom`,
        `as`,
        `gapMode`,
      ]),
      S = f,
      C = Ri([n, t]),
      w = K(K({}, x), i);
    return g.createElement(
      g.Fragment,
      null,
      u &&
        g.createElement(S, {
          sideCar: Wi,
          removeScrollBar: l,
          shards: d,
          noRelative: p,
          noIsolation: m,
          inert: h,
          setCallbacks: a,
          allowPinchZoom: !!_,
          lockRef: n,
          gapMode: b,
        }),
      o
        ? g.cloneElement(g.Children.only(s), K(K({}, w), { ref: C }))
        : g.createElement(y, K({}, w, { className: c, ref: C }), s),
    );
  });
((Ki.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
  (Ki.classNames = { fullWidth: ji, zeroRight: Ai }));
var qi,
  Ji = function () {
    if (qi) return qi;
    if (typeof __webpack_nonce__ < `u`) return __webpack_nonce__;
  };
function Yi() {
  if (!document) return null;
  var e = document.createElement(`style`);
  e.type = `text/css`;
  var t = Ji();
  return (t && e.setAttribute(`nonce`, t), e);
}
function Xi(e, t) {
  e.styleSheet ? (e.styleSheet.cssText = t) : e.appendChild(document.createTextNode(t));
}
function Zi(e) {
  (document.head || document.getElementsByTagName(`head`)[0]).appendChild(e);
}
var Qi = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        (e == 0 && (t = Yi()) && (Xi(t, n), Zi(t)), e++);
      },
      remove: function () {
        (e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  $i = function () {
    var e = Qi();
    return function (t, n) {
      g.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n],
      );
    };
  },
  ea = function () {
    var e = $i();
    return function (t) {
      var n = t.styles,
        r = t.dynamic;
      return (e(n, r), null);
    };
  },
  ta = { left: 0, top: 0, right: 0, gap: 0 },
  na = function (e) {
    return parseInt(e || ``, 10) || 0;
  },
  ra = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === `padding` ? `paddingLeft` : `marginLeft`],
      r = t[e === `padding` ? `paddingTop` : `marginTop`],
      i = t[e === `padding` ? `paddingRight` : `marginRight`];
    return [na(n), na(r), na(i)];
  },
  ia = function (e) {
    if ((e === void 0 && (e = `margin`), typeof window > `u`)) return ta;
    var t = ra(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, r - n + t[2] - t[0]) };
  },
  aa = ea(),
  oa = `data-scroll-locked`,
  sa = function (e, t, n, r) {
    var i = e.left,
      a = e.top,
      o = e.right,
      s = e.gap;
    return (
      n === void 0 && (n = `margin`),
      `
  .${Mi} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${oa}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
      t && `position: relative ${r};`,
      n === `margin` &&
        `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
      n === `padding` && `padding-right: ${s}px ${r};`,
    ]
      .filter(Boolean)
      .join(``)}
  }
  
  .${Ai} {
    right: ${s}px ${r};
  }
  
  .${ji} {
    margin-right: ${s}px ${r};
  }
  
  .${Ai} .${Ai} {
    right: 0 ${r};
  }
  
  .${ji} .${ji} {
    margin-right: 0 ${r};
  }
  
  body[${oa}] {
    ${Ni}: ${s}px;
  }
`
    );
  },
  ca = function () {
    var e = parseInt(document.body.getAttribute(`data-scroll-locked`) || `0`, 10);
    return isFinite(e) ? e : 0;
  },
  la = function () {
    g.useEffect(function () {
      return (
        document.body.setAttribute(oa, (ca() + 1).toString()),
        function () {
          var e = ca() - 1;
          e <= 0 ? document.body.removeAttribute(oa) : document.body.setAttribute(oa, e.toString());
        }
      );
    }, []);
  },
  ua = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      i = r === void 0 ? `margin` : r;
    la();
    var a = g.useMemo(
      function () {
        return ia(i);
      },
      [i],
    );
    return g.createElement(aa, { styles: sa(a, !t, i, n ? `` : `!important`) });
  },
  da = !1;
if (typeof window < `u`)
  try {
    var fa = Object.defineProperty({}, "passive", {
      get: function () {
        return ((da = !0), !0);
      },
    });
    (window.addEventListener(`test`, fa, fa), window.removeEventListener(`test`, fa, fa));
  } catch {
    da = !1;
  }
var pa = da ? { passive: !1 } : !1,
  ma = function (e) {
    return e.tagName === `TEXTAREA`;
  },
  ha = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return n[t] !== `hidden` && !(n.overflowY === n.overflowX && !ma(e) && n[t] === `visible`);
  },
  ga = function (e) {
    return ha(e, `overflowY`);
  },
  _a = function (e) {
    return ha(e, `overflowX`);
  },
  va = function (e, t) {
    var n = t.ownerDocument,
      r = t;
    do {
      if ((typeof ShadowRoot < `u` && r instanceof ShadowRoot && (r = r.host), xa(e, r))) {
        var i = Sa(e, r);
        if (i[1] > i[2]) return !0;
      }
      r = r.parentNode;
    } while (r && r !== n.body);
    return !1;
  },
  ya = function (e) {
    return [e.scrollTop, e.scrollHeight, e.clientHeight];
  },
  ba = function (e) {
    return [e.scrollLeft, e.scrollWidth, e.clientWidth];
  },
  xa = function (e, t) {
    return e === `v` ? ga(t) : _a(t);
  },
  Sa = function (e, t) {
    return e === `v` ? ya(t) : ba(t);
  },
  Ca = function (e, t) {
    return e === `h` && t === `rtl` ? -1 : 1;
  },
  wa = function (e, t, n, r, i) {
    var a = Ca(e, window.getComputedStyle(t).direction),
      o = a * r,
      s = n.target,
      c = t.contains(s),
      l = !1,
      u = o > 0,
      d = 0,
      f = 0;
    do {
      if (!s) break;
      var p = Sa(e, s),
        m = p[0],
        h = p[1] - p[2] - a * m;
      (m || h) && xa(e, s) && ((d += h), (f += m));
      var g = s.parentNode;
      s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
    } while ((!c && s !== document.body) || (c && (t.contains(s) || t === s)));
    return (
      ((u && ((i && Math.abs(d) < 1) || (!i && o > d))) ||
        (!u && ((i && Math.abs(f) < 1) || (!i && -o > f)))) &&
        (l = !0),
      l
    );
  },
  Ta = function (e) {
    return `changedTouches` in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  Ea = function (e) {
    return [e.deltaX, e.deltaY];
  },
  Da = function (e) {
    return e && `current` in e ? e.current : e;
  },
  Oa = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  ka = function (e) {
    return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
  },
  Aa = 0,
  ja = [];
function Ma(e) {
  var t = g.useRef([]),
    n = g.useRef([0, 0]),
    r = g.useRef(),
    i = g.useState(Aa++)[0],
    a = g.useState(ea)[0],
    o = g.useRef(e);
  (g.useEffect(
    function () {
      o.current = e;
    },
    [e],
  ),
    g.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add(`block-interactivity-${i}`);
          var t = ki([e.lockRef.current], (e.shards || []).map(Da), !0).filter(Boolean);
          return (
            t.forEach(function (e) {
              return e.classList.add(`allow-interactivity-${i}`);
            }),
            function () {
              (document.body.classList.remove(`block-interactivity-${i}`),
                t.forEach(function (e) {
                  return e.classList.remove(`allow-interactivity-${i}`);
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var s = g.useCallback(function (e, t) {
      if ((`touches` in e && e.touches.length === 2) || (e.type === `wheel` && e.ctrlKey))
        return !o.current.allowPinchZoom;
      var i = Ta(e),
        a = n.current,
        s = `deltaX` in e ? e.deltaX : a[0] - i[0],
        c = `deltaY` in e ? e.deltaY : a[1] - i[1],
        l,
        u = e.target,
        d = Math.abs(s) > Math.abs(c) ? `h` : `v`;
      if (`touches` in e && d === `h` && u.type === `range`) return !1;
      var f = window.getSelection(),
        p = f && f.anchorNode;
      if (p && (p === u || p.contains(u))) return !1;
      var m = va(d, u);
      if (!m) return !0;
      if ((m ? (l = d) : ((l = d === `v` ? `h` : `v`), (m = va(d, u))), !m)) return !1;
      if ((!r.current && `changedTouches` in e && (s || c) && (r.current = l), !l)) return !0;
      var h = r.current || l;
      return wa(h, t, e, h === `h` ? s : c, !0);
    }, []),
    c = g.useCallback(function (e) {
      var n = e;
      if (!(!ja.length || ja[ja.length - 1] !== a)) {
        var r = `deltaY` in n ? Ea(n) : Ta(n),
          i = t.current.filter(function (e) {
            return (
              e.name === n.type &&
              (e.target === n.target || n.target === e.shadowParent) &&
              Oa(e.delta, r)
            );
          })[0];
        if (i && i.should) {
          n.cancelable && n.preventDefault();
          return;
        }
        if (!i) {
          var c = (o.current.shards || [])
            .map(Da)
            .filter(Boolean)
            .filter(function (e) {
              return e.contains(n.target);
            });
          (c.length > 0 ? s(n, c[0]) : !o.current.noIsolation) &&
            n.cancelable &&
            n.preventDefault();
        }
      }
    }, []),
    l = g.useCallback(function (e, n, r, i) {
      var a = { name: e, delta: n, target: r, should: i, shadowParent: Na(r) };
      (t.current.push(a),
        setTimeout(function () {
          t.current = t.current.filter(function (e) {
            return e !== a;
          });
        }, 1));
    }, []),
    u = g.useCallback(function (e) {
      ((n.current = Ta(e)), (r.current = void 0));
    }, []),
    d = g.useCallback(function (t) {
      l(t.type, Ea(t), t.target, s(t, e.lockRef.current));
    }, []),
    f = g.useCallback(function (t) {
      l(t.type, Ta(t), t.target, s(t, e.lockRef.current));
    }, []);
  g.useEffect(function () {
    return (
      ja.push(a),
      e.setCallbacks({ onScrollCapture: d, onWheelCapture: d, onTouchMoveCapture: f }),
      document.addEventListener(`wheel`, c, pa),
      document.addEventListener(`touchmove`, c, pa),
      document.addEventListener(`touchstart`, u, pa),
      function () {
        ((ja = ja.filter(function (e) {
          return e !== a;
        })),
          document.removeEventListener(`wheel`, c, pa),
          document.removeEventListener(`touchmove`, c, pa),
          document.removeEventListener(`touchstart`, u, pa));
      }
    );
  }, []);
  var p = e.removeScrollBar,
    m = e.inert;
  return g.createElement(
    g.Fragment,
    null,
    m ? g.createElement(a, { styles: ka(i) }) : null,
    p ? g.createElement(ua, { noRelative: e.noRelative, gapMode: e.gapMode }) : null,
  );
}
function Na(e) {
  for (var t = null; e !== null;)
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode));
  return t;
}
var Pa = Ui(Wi, Ma),
  Fa = g.forwardRef(function (e, t) {
    return g.createElement(Ki, K({}, e, { ref: t, sideCar: Pa }));
  });
Fa.classNames = Ki.classNames;
var Ia = Object.defineProperty,
  q = (e, t) => Ia(e, `name`, { value: t, configurable: !0 }),
  La = [`Enter`, ` `],
  Ra = [`ArrowDown`, `PageUp`, `Home`],
  za = [`ArrowUp`, `PageDown`, `End`],
  Ba = [...Ra, ...za],
  Va = { ltr: [...La, `ArrowRight`], rtl: [...La, `ArrowLeft`] },
  Ha = { ltr: [`ArrowLeft`], rtl: [`ArrowRight`] },
  Ua = `Menu`,
  [Wa, Ga, Ka] = Se(Ua),
  [qa, Ja] = k(Ua, [Ka, _r, ai]),
  Ya = _r(),
  Xa = ai(),
  [Za, Qa] = qa(Ua),
  [$a, eo] = qa(Ua),
  to = q((e) => {
    let { __scopeMenu: t, open: n = !1, children: r, dir: i, onOpenChange: a, modal: o = !0 } = e,
      s = Ya(t),
      [c, l] = g.useState(null),
      u = g.useRef(!1),
      d = Te(a),
      f = we(i);
    return (
      g.useEffect(() => {
        let e = q(() => {
            ((u.current = !0),
              document.addEventListener(`pointerdown`, t, { capture: !0, once: !0 }),
              document.addEventListener(`pointermove`, t, { capture: !0, once: !0 }));
          }, `handleKeyDown`),
          t = q(() => (u.current = !1), `handlePointer`);
        return (
          document.addEventListener(`keydown`, e, { capture: !0 }),
          () => {
            (document.removeEventListener(`keydown`, e, { capture: !0 }),
              document.removeEventListener(`pointerdown`, t, { capture: !0 }),
              document.removeEventListener(`pointermove`, t, { capture: !0 }));
          }
        );
      }, []),
      g.useEffect(() => {
        if (!n) return;
        let e = q(() => d(!1), `handleBlur`);
        return (window.addEventListener(`blur`, e), () => window.removeEventListener(`blur`, e));
      }, [n, d]),
      (0, O.jsx)(Ar, {
        ...s,
        children: (0, O.jsx)(Za, {
          scope: t,
          open: n,
          onOpenChange: d,
          content: c,
          onContentChange: l,
          children: (0, O.jsx)($a, {
            scope: t,
            onClose: g.useCallback(() => d(!1), [d]),
            isUsingKeyboardRef: u,
            dir: f,
            modal: o,
            children: r,
          }),
        }),
      })
    );
  }, `Menu`),
  no = g.forwardRef(
    q(function (e, t) {
      let { __scopeMenu: n, ...r } = e,
        i = Ya(n);
      return (0, O.jsx)(jr, { ...i, ...r, ref: t });
    }, `MenuAnchor`),
  ),
  ro = `MenuPortal`,
  [io, ao] = qa(ro, { forceMount: void 0 }),
  oo = q((e) => {
    let { __scopeMenu: t, forceMount: n, children: r, container: i } = e,
      a = Qa(ro, t);
    return (0, O.jsx)(io, {
      scope: t,
      forceMount: n,
      children: (0, O.jsx)(Rr, {
        present: n || a.open,
        children: (0, O.jsx)(Pr, { asChild: !0, container: i, children: r }),
      }),
    });
  }, `MenuPortal`),
  J = `MenuContent`,
  [so, co] = qa(J),
  lo = g.forwardRef(
    q(function (e, t) {
      let n = ao(J, e.__scopeMenu),
        { forceMount: r = n.forceMount, ...i } = e,
        a = Qa(J, e.__scopeMenu),
        o = eo(J, e.__scopeMenu);
      return (0, O.jsx)(Wa.Provider, {
        scope: e.__scopeMenu,
        children: (0, O.jsx)(Rr, {
          present: r || a.open,
          children: (0, O.jsx)(Wa.Slot, {
            scope: e.__scopeMenu,
            children: o.modal ? (0, O.jsx)(uo, { ...i, ref: t }) : (0, O.jsx)(fo, { ...i, ref: t }),
          }),
        }),
      });
    }, `MenuContent`),
  ),
  uo = g.forwardRef(
    q(function (e, t) {
      let n = Qa(J, e.__scopeMenu),
        r = g.useRef(null),
        i = D(t, r);
      return (
        g.useEffect(() => {
          let e = r.current;
          if (e) return Di(e);
        }, []),
        (0, O.jsx)(mo, {
          ...e,
          ref: i,
          trapFocus: n.open,
          disableOutsidePointerEvents: n.open,
          disableOutsideScroll: !0,
          onFocusOutside: b(e.onFocusOutside, (e) => e.preventDefault(), {
            checkForDefaultPrevented: !1,
          }),
          onDismiss: () => n.onOpenChange(!1),
        })
      );
    }, `MenuRootContentModal`),
  ),
  fo = g.forwardRef(
    q(function (e, t) {
      let n = Qa(J, e.__scopeMenu);
      return (0, O.jsx)(mo, {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        onDismiss: () => n.onOpenChange(!1),
      });
    }, `MenuRootContentNonModal`),
  ),
  po = le(`MenuContent.ScrollLock`),
  mo = g.forwardRef(
    q(function (e, t) {
      let {
          __scopeMenu: n,
          loop: r = !1,
          trapFocus: i,
          onOpenAutoFocus: a,
          onCloseAutoFocus: o,
          disableOutsidePointerEvents: s,
          onEntryFocus: c,
          onEscapeKeyDown: l,
          onPointerDownOutside: u,
          onFocusOutside: d,
          onInteractOutside: f,
          onDismiss: p,
          disableOutsideScroll: m,
          ...h
        } = e,
        _ = Qa(J, n),
        v = eo(J, n),
        y = Ya(n),
        x = Xa(n),
        S = Ga(n),
        [C, w] = g.useState(null),
        T = g.useRef(null),
        E = D(t, T, _.onContentChange),
        k = g.useRef(0),
        A = g.useRef(``),
        j = g.useRef(0),
        M = g.useRef(null),
        N = g.useRef(`right`),
        ee = g.useRef(0),
        te = m ? Fa : g.Fragment,
        ne = m ? { as: po, allowPinchZoom: !0 } : void 0,
        re = q((e) => {
          let t = A.current + e,
            n = S().filter((e) => !e.disabled),
            r = document.activeElement,
            i = n.find((e) => e.ref.current === r)?.textValue,
            a = Vo(
              n.map((e) => e.textValue),
              t,
              i,
            ),
            o = n.find((e) => e.textValue === a)?.ref.current;
          (q(function e(t) {
            ((A.current = t),
              window.clearTimeout(k.current),
              t !== `` && (k.current = window.setTimeout(() => e(``), 1e3)));
          }, `updateSearch`)(t),
            o && setTimeout(() => o.focus()));
        }, `handleTypeaheadSearch`);
      (g.useEffect(() => () => window.clearTimeout(k.current), []), Ve());
      let P = g.useCallback((e) => N.current === M.current?.side && Uo(e, M.current?.area), []);
      return (0, O.jsx)(so, {
        scope: n,
        searchRef: A,
        onItemEnter: g.useCallback(
          (e) => {
            P(e) && e.preventDefault();
          },
          [P],
        ),
        onItemLeave: g.useCallback(
          (e) => {
            P(e) || (T.current?.focus(), w(null));
          },
          [P],
        ),
        onTriggerLeave: g.useCallback(
          (e) => {
            P(e) && e.preventDefault();
          },
          [P],
        ),
        pointerGraceTimerRef: j,
        onPointerGraceIntentChange: g.useCallback((e) => {
          M.current = e;
        }, []),
        children: (0, O.jsx)(te, {
          ...ne,
          children: (0, O.jsx)(qe, {
            asChild: !0,
            trapped: i,
            onMountAutoFocus: b(a, (e) => {
              (e.preventDefault(), T.current?.focus({ preventScroll: !0 }));
            }),
            onUnmountAutoFocus: o,
            children: (0, O.jsx)(Me, {
              asChild: !0,
              disableOutsidePointerEvents: s,
              onEscapeKeyDown: l,
              onPointerDownOutside: u,
              onFocusOutside: d,
              onInteractOutside: f,
              onDismiss: p,
              children: (0, O.jsx)(_i, {
                asChild: !0,
                ...x,
                dir: v.dir,
                orientation: `vertical`,
                loop: r,
                currentTabStopId: C,
                onCurrentTabStopIdChange: w,
                onEntryFocus: b(c, (e) => {
                  v.isUsingKeyboardRef.current || e.preventDefault();
                }),
                preventScrollOnEntryFocus: !0,
                children: (0, O.jsx)(Mr, {
                  role: `menu`,
                  "aria-orientation": `vertical`,
                  "data-state": Io(_.open),
                  "data-radix-menu-content": ``,
                  dir: v.dir,
                  ...y,
                  ...h,
                  ref: E,
                  style: { outline: `none`, ...h.style },
                  onKeyDown: b(h.onKeyDown, (e) => {
                    let t = e.target.closest(`[data-radix-menu-content]`) === e.currentTarget,
                      n = e.ctrlKey || e.altKey || e.metaKey,
                      r = e.key.length === 1;
                    t && (e.key === `Tab` && e.preventDefault(), !n && r && re(e.key));
                    let i = T.current;
                    if (e.target !== i || !Ba.includes(e.key)) return;
                    e.preventDefault();
                    let a = S()
                      .filter((e) => !e.disabled)
                      .map((e) => e.ref.current);
                    (za.includes(e.key) && a.reverse(), zo(a));
                  }),
                  onBlur: b(e.onBlur, (e) => {
                    e.currentTarget.contains(e.target) ||
                      (window.clearTimeout(k.current), (A.current = ``));
                  }),
                  onPointerMove: b(
                    e.onPointerMove,
                    Wo((e) => {
                      let t = e.target,
                        n = ee.current !== e.clientX;
                      if (e.currentTarget.contains(t) && n) {
                        let t = e.clientX > ee.current ? `right` : `left`;
                        ((N.current = t), (ee.current = e.clientX));
                      }
                    }),
                  ),
                }),
              }),
            }),
          }),
        }),
      });
    }, `MenuContentImpl`),
  ),
  ho = g.forwardRef(
    q(function (e, t) {
      let { __scopeMenu: n, ...r } = e;
      return (0, O.jsx)(F.div, { ...r, ref: t });
    }, `MenuLabel`),
  ),
  go = `MenuItem`,
  _o = `menu.itemSelect`,
  vo = g.forwardRef(
    q(function (e, t) {
      let { disabled: n = !1, onSelect: r, ...i } = e,
        a = g.useRef(null),
        o = eo(go, e.__scopeMenu),
        s = co(go, e.__scopeMenu),
        c = D(t, a),
        l = g.useRef(!1),
        u = q(() => {
          let e = a.current;
          if (!n && e) {
            let t = new CustomEvent(_o, { bubbles: !0, cancelable: !0 });
            (e.addEventListener(_o, (e) => r?.(e), { once: !0 }),
              xe(e, t),
              t.defaultPrevented ? (l.current = !1) : o.onClose());
          }
        }, `handleSelect`);
      return (0, O.jsx)(yo, {
        ...i,
        ref: c,
        disabled: n,
        onClick: b(e.onClick, u),
        onPointerDown: (t) => {
          (e.onPointerDown?.(t), (l.current = !0));
        },
        onPointerUp: b(e.onPointerUp, (e) => {
          l.current || e.currentTarget?.click();
        }),
        onKeyDown: b(e.onKeyDown, (e) => {
          n ||
            e.target !== e.currentTarget ||
            (s.searchRef.current !== `` && e.key === ` `) ||
            (La.includes(e.key) && (e.currentTarget.click(), e.preventDefault()));
        }),
      });
    }, `MenuItem`),
  ),
  yo = g.forwardRef(
    q(function (e, t) {
      let { __scopeMenu: n, disabled: r = !1, textValue: i, ...a } = e,
        o = co(go, n),
        s = Xa(n),
        c = g.useRef(null),
        l = D(t, c),
        [u, d] = g.useState(!1),
        [f, p] = g.useState(``);
      return (
        g.useEffect(() => {
          let e = c.current;
          e && p((e.textContent ?? ``).trim());
        }, [a.children]),
        (0, O.jsx)(Wa.ItemSlot, {
          scope: n,
          disabled: r,
          textValue: i ?? f,
          children: (0, O.jsx)(vi, {
            asChild: !0,
            ...s,
            focusable: !r,
            children: (0, O.jsx)(F.div, {
              role: `menuitem`,
              "data-highlighted": u ? `` : void 0,
              "aria-disabled": r || void 0,
              "data-disabled": r ? `` : void 0,
              ...a,
              ref: l,
              onPointerMove: b(
                e.onPointerMove,
                Wo((e) => {
                  r
                    ? o.onItemLeave(e)
                    : (o.onItemEnter(e),
                      e.defaultPrevented || e.currentTarget.focus({ preventScroll: !0 }));
                }),
              ),
              onPointerLeave: b(
                e.onPointerLeave,
                Wo((e) => o.onItemLeave(e)),
              ),
              onFocus: b(e.onFocus, () => d(!0)),
              onBlur: b(e.onBlur, () => d(!1)),
            }),
          }),
        })
      );
    }, `MenuItemImpl`),
  ),
  bo = g.forwardRef(
    q(function (e, t) {
      let { checked: n = !1, onCheckedChange: r, ...i } = e;
      return (0, O.jsx)(Eo, {
        scope: e.__scopeMenu,
        checked: n,
        children: (0, O.jsx)(vo, {
          role: `menuitemcheckbox`,
          "aria-checked": Lo(n) ? `mixed` : n,
          ...i,
          ref: t,
          "data-state": Ro(n),
          onSelect: b(i.onSelect, () => r?.(Lo(n) ? !0 : !n), { checkForDefaultPrevented: !1 }),
        }),
      });
    }, `MenuCheckboxItem`),
  ),
  [xo, So] = qa(`MenuRadioGroup`, { value: void 0, onValueChange: q(() => {}, `onValueChange`) }),
  Co = `MenuRadioItem`,
  wo = g.forwardRef(
    q(function (e, t) {
      let { value: n, ...r } = e,
        i = So(Co, e.__scopeMenu),
        a = n === i.value;
      return (0, O.jsx)(Eo, {
        scope: e.__scopeMenu,
        checked: a,
        children: (0, O.jsx)(vo, {
          role: `menuitemradio`,
          "aria-checked": a,
          ...r,
          ref: t,
          "data-state": Ro(a),
          onSelect: b(r.onSelect, () => i.onValueChange?.(n), { checkForDefaultPrevented: !1 }),
        }),
      });
    }, `MenuRadioItem`),
  ),
  To = `MenuItemIndicator`,
  [Eo, Do] = qa(To, { checked: !1 }),
  Oo = g.forwardRef(
    q(function (e, t) {
      let { __scopeMenu: n, forceMount: r, ...i } = e,
        a = Do(To, n);
      return (0, O.jsx)(Rr, {
        present: r || Lo(a.checked) || a.checked === !0,
        children: (0, O.jsx)(F.span, { ...i, ref: t, "data-state": Ro(a.checked) }),
      });
    }, `MenuItemIndicator`),
  ),
  ko = g.forwardRef(
    q(function (e, t) {
      let { __scopeMenu: n, ...r } = e;
      return (0, O.jsx)(F.div, {
        role: `separator`,
        "aria-orientation": `horizontal`,
        ...r,
        ref: t,
      });
    }, `MenuSeparator`),
  ),
  [Ao, jo] = qa(`MenuSub`),
  Mo = `MenuSubTrigger`,
  No = g.forwardRef(
    q(function (e, t) {
      let n = Qa(Mo, e.__scopeMenu),
        r = eo(Mo, e.__scopeMenu),
        i = jo(Mo, e.__scopeMenu),
        a = co(Mo, e.__scopeMenu),
        o = g.useRef(null),
        { pointerGraceTimerRef: s, onPointerGraceIntentChange: c } = a,
        l = { __scopeMenu: e.__scopeMenu },
        u = g.useCallback(() => {
          (o.current && window.clearTimeout(o.current), (o.current = null));
        }, []);
      (g.useEffect(() => u, [u]),
        g.useEffect(() => {
          let e = s.current;
          return () => {
            (window.clearTimeout(e), c(null));
          };
        }, [s, c]));
      let d = D(t, i.onTriggerChange);
      return (0, O.jsx)(no, {
        asChild: !0,
        ...l,
        children: (0, O.jsx)(yo, {
          id: i.triggerId,
          "aria-haspopup": `menu`,
          "aria-expanded": n.open,
          "aria-controls": n.open ? i.contentId : void 0,
          "data-state": Io(n.open),
          ...e,
          ref: d,
          onClick: (t) => {
            (e.onClick?.(t),
              !(e.disabled || t.defaultPrevented) &&
                (t.currentTarget.focus(), n.open || n.onOpenChange(!0)));
          },
          onPointerMove: b(
            e.onPointerMove,
            Wo((t) => {
              (a.onItemEnter(t),
                !t.defaultPrevented &&
                  !e.disabled &&
                  !n.open &&
                  !o.current &&
                  (a.onPointerGraceIntentChange(null),
                  (o.current = window.setTimeout(() => {
                    (n.onOpenChange(!0), u());
                  }, 100))));
            }),
          ),
          onPointerLeave: b(
            e.onPointerLeave,
            Wo((e) => {
              u();
              let t = n.content?.getBoundingClientRect();
              if (t) {
                let r = n.content?.dataset.side,
                  i = r === `right`,
                  o = i ? -5 : 5,
                  c = t[i ? `left` : `right`],
                  l = t[i ? `right` : `left`];
                (a.onPointerGraceIntentChange({
                  area: [
                    { x: e.clientX + o, y: e.clientY },
                    { x: c, y: t.top },
                    { x: l, y: t.top },
                    { x: l, y: t.bottom },
                    { x: c, y: t.bottom },
                  ],
                  side: r,
                }),
                  window.clearTimeout(s.current),
                  (s.current = window.setTimeout(() => a.onPointerGraceIntentChange(null), 300)));
              } else {
                if ((a.onTriggerLeave(e), e.defaultPrevented)) return;
                a.onPointerGraceIntentChange(null);
              }
            }),
          ),
          onKeyDown: b(e.onKeyDown, (t) => {
            e.disabled ||
              t.target !== t.currentTarget ||
              (a.searchRef.current !== `` && t.key === ` `) ||
              (Va[r.dir].includes(t.key) &&
                (n.onOpenChange(!0), n.content?.focus(), t.preventDefault()));
          }),
        }),
      });
    }, `MenuSubTrigger`),
  ),
  Po = `MenuSubContent`,
  Fo = g.forwardRef(
    q(function (e, t) {
      let n = ao(J, e.__scopeMenu),
        { forceMount: r = n.forceMount, align: i = `start`, ...a } = e,
        o = Qa(J, e.__scopeMenu),
        s = eo(J, e.__scopeMenu),
        c = jo(Po, e.__scopeMenu),
        l = g.useRef(null),
        u = D(t, l);
      return (0, O.jsx)(Wa.Provider, {
        scope: e.__scopeMenu,
        children: (0, O.jsx)(Rr, {
          present: r || o.open,
          children: (0, O.jsx)(Wa.Slot, {
            scope: e.__scopeMenu,
            children: (0, O.jsx)(mo, {
              id: c.contentId,
              "aria-labelledby": c.triggerId,
              ...a,
              ref: u,
              align: i,
              side: s.dir === `rtl` ? `left` : `right`,
              disableOutsidePointerEvents: !1,
              disableOutsideScroll: !1,
              trapFocus: !1,
              onOpenAutoFocus: (e) => {
                (s.isUsingKeyboardRef.current && l.current?.focus(), e.preventDefault());
              },
              onCloseAutoFocus: (e) => e.preventDefault(),
              onFocusOutside: b(e.onFocusOutside, (e) => {
                e.target !== c.trigger && o.onOpenChange(!1);
              }),
              onEscapeKeyDown: b(e.onEscapeKeyDown, (e) => {
                (s.onClose(), e.preventDefault());
              }),
              onKeyDown: b(e.onKeyDown, (e) => {
                let t = e.currentTarget.contains(e.target),
                  n = Ha[s.dir].includes(e.key);
                t && n && (o.onOpenChange(!1), c.trigger?.focus(), e.preventDefault());
              }),
            }),
          }),
        }),
      });
    }, `MenuSubContent`),
  );
function Io(e) {
  return e ? `open` : `closed`;
}
q(Io, `getOpenState`);
function Lo(e) {
  return e === `indeterminate`;
}
q(Lo, `isIndeterminate`);
function Ro(e) {
  return Lo(e) ? `indeterminate` : e ? `checked` : `unchecked`;
}
q(Ro, `getCheckedState`);
function zo(e) {
  let t = document.activeElement;
  for (let n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
q(zo, `focusFirst`);
function Bo(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
q(Bo, `wrapArray`);
function Vo(e, t, n) {
  let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t,
    i = n ? e.indexOf(n) : -1,
    a = Bo(e, Math.max(i, 0));
  r.length === 1 && (a = a.filter((e) => e !== n));
  let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
  return o === n ? void 0 : o;
}
q(Vo, `getNextMatch`);
function Ho(e, t) {
  let { x: n, y: r } = e,
    i = !1;
  for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
    let o = t[e],
      s = t[a],
      c = o.x,
      l = o.y,
      u = s.x,
      d = s.y;
    l > r != d > r && n < ((u - c) * (r - l)) / (d - l) + c && (i = !i);
  }
  return i;
}
q(Ho, `isPointInPolygon`);
function Uo(e, t) {
  return t ? Ho({ x: e.clientX, y: e.clientY }, t) : !1;
}
q(Uo, `isPointerInGraceArea`);
function Wo(e) {
  return (t) => (t.pointerType === `mouse` ? e(t) : void 0);
}
q(Wo, `whenMouse`);
var Go = to,
  Ko = no,
  qo = oo,
  Jo = lo,
  Yo = ho,
  Xo = vo,
  Zo = bo,
  Qo = wo,
  $o = Oo,
  es = ko,
  ts = No,
  ns = Fo,
  rs = Object.defineProperty,
  Y = (e, t) => rs(e, `name`, { value: t, configurable: !0 }),
  is = `DropdownMenu`,
  [as, os] = k(is, [Ja]),
  X = Ja(),
  [ss, cs] = as(is),
  ls = Y((e) => {
    let {
        __scopeDropdownMenu: t,
        children: n,
        dir: r,
        open: i,
        defaultOpen: a,
        onOpenChange: o,
        modal: s = !0,
      } = e,
      c = X(t),
      l = g.useRef(null),
      [u, d] = P({ prop: i, defaultProp: a ?? !1, onChange: o, caller: is });
    return (0, O.jsx)(ss, {
      scope: t,
      triggerId: ot(),
      triggerRef: l,
      contentId: ot(),
      open: u,
      onOpenChange: d,
      onOpenToggle: g.useCallback(() => d((e) => !e), [d]),
      modal: s,
      children: (0, O.jsx)(Go, { ...c, open: u, onOpenChange: d, dir: r, modal: s, children: n }),
    });
  }, `DropdownMenu`),
  us = `DropdownMenuTrigger`,
  ds = g.forwardRef(
    Y(function (e, t) {
      let { __scopeDropdownMenu: n, disabled: r = !1, ...i } = e,
        a = cs(us, n),
        o = X(n),
        s = D(t, a.triggerRef);
      return (0, O.jsx)(Ko, {
        asChild: !0,
        ...o,
        children: (0, O.jsx)(F.button, {
          type: `button`,
          id: a.triggerId,
          "aria-haspopup": `menu`,
          "aria-expanded": a.open,
          "aria-controls": a.open ? a.contentId : void 0,
          "data-state": a.open ? `open` : `closed`,
          "data-disabled": r ? `` : void 0,
          disabled: r,
          ...i,
          ref: s,
          onPointerDown: b(e.onPointerDown, (e) => {
            !r &&
              e.button === 0 &&
              e.ctrlKey === !1 &&
              (a.onOpenToggle(), a.open || e.preventDefault());
          }),
          onKeyDown: b(e.onKeyDown, (e) => {
            r ||
              ([`Enter`, ` `].includes(e.key) && a.onOpenToggle(),
              e.key === `ArrowDown` && a.onOpenChange(!0),
              [`Enter`, ` `, `ArrowDown`].includes(e.key) && e.preventDefault());
          }),
        }),
      });
    }, `DropdownMenuTrigger`),
  ),
  fs = Y((e) => {
    let { __scopeDropdownMenu: t, ...n } = e,
      r = X(t);
    return (0, O.jsx)(qo, { ...r, ...n });
  }, `DropdownMenuPortal`),
  ps = `DropdownMenuContent`,
  ms = g.forwardRef(
    Y(function (e, t) {
      let { __scopeDropdownMenu: n, ...r } = e,
        i = cs(ps, n),
        a = X(n),
        o = g.useRef(!1);
      return (0, O.jsx)(Jo, {
        id: i.contentId,
        "aria-labelledby": i.triggerId,
        ...a,
        ...r,
        ref: t,
        onCloseAutoFocus: b(e.onCloseAutoFocus, (e) => {
          (o.current || i.triggerRef.current?.focus(), (o.current = !1), e.preventDefault());
        }),
        onInteractOutside: b(e.onInteractOutside, (e) => {
          let t = e.detail.originalEvent,
            n = t.button === 0 && t.ctrlKey === !0,
            r = t.button === 2 || n;
          (!i.modal || r) && (o.current = !0);
        }),
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin": `var(--radix-popper-transform-origin)`,
          "--radix-dropdown-menu-content-available-width": `var(--radix-popper-available-width)`,
          "--radix-dropdown-menu-content-available-height": `var(--radix-popper-available-height)`,
          "--radix-dropdown-menu-trigger-width": `var(--radix-popper-anchor-width)`,
          "--radix-dropdown-menu-trigger-height": `var(--radix-popper-anchor-height)`,
        },
      });
    }, `DropdownMenuContent`),
  ),
  hs = g.forwardRef(
    Y(function (e, t) {
      let { __scopeDropdownMenu: n, ...r } = e,
        i = X(n);
      return (0, O.jsx)(Yo, { ...i, ...r, ref: t });
    }, `DropdownMenuLabel`),
  ),
  gs = g.forwardRef(
    Y(function (e, t) {
      let { __scopeDropdownMenu: n, ...r } = e,
        i = X(n);
      return (0, O.jsx)(Xo, { ...i, ...r, ref: t });
    }, `DropdownMenuItem`),
  ),
  _s = g.forwardRef(
    Y(function (e, t) {
      let { __scopeDropdownMenu: n, ...r } = e,
        i = X(n);
      return (0, O.jsx)(Zo, { ...i, ...r, ref: t });
    }, `DropdownMenuCheckboxItem`),
  ),
  vs = g.forwardRef(
    Y(function (e, t) {
      let { __scopeDropdownMenu: n, ...r } = e,
        i = X(n);
      return (0, O.jsx)(Qo, { ...i, ...r, ref: t });
    }, `DropdownMenuRadioItem`),
  ),
  ys = g.forwardRef(
    Y(function (e, t) {
      let { __scopeDropdownMenu: n, ...r } = e,
        i = X(n);
      return (0, O.jsx)($o, { ...i, ...r, ref: t });
    }, `DropdownMenuItemIndicator`),
  ),
  bs = g.forwardRef(
    Y(function (e, t) {
      let { __scopeDropdownMenu: n, ...r } = e,
        i = X(n);
      return (0, O.jsx)(es, { ...i, ...r, ref: t });
    }, `DropdownMenuSeparator`),
  ),
  xs = g.forwardRef(
    Y(function (e, t) {
      let { __scopeDropdownMenu: n, ...r } = e,
        i = X(n);
      return (0, O.jsx)(ts, { ...i, ...r, ref: t });
    }, `DropdownMenuSubTrigger`),
  ),
  Ss = g.forwardRef(
    Y(function (e, t) {
      let { __scopeDropdownMenu: n, ...r } = e,
        i = X(n);
      return (0, O.jsx)(ns, {
        ...i,
        ...r,
        ref: t,
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin": `var(--radix-popper-transform-origin)`,
          "--radix-dropdown-menu-content-available-width": `var(--radix-popper-available-width)`,
          "--radix-dropdown-menu-content-available-height": `var(--radix-popper-available-height)`,
          "--radix-dropdown-menu-trigger-width": `var(--radix-popper-anchor-width)`,
          "--radix-dropdown-menu-trigger-height": `var(--radix-popper-anchor-height)`,
        },
      });
    }, `DropdownMenuSubContent`),
  ),
  Cs = ls,
  ws = ds,
  Ts = fs,
  Es = ms,
  Ds = hs,
  Os = gs,
  ks = _s,
  As = vs,
  js = ys,
  Ms = bs,
  Ns = xs,
  Ps = Ss,
  Z = r(),
  Q = `/app/applet/src/components/ui/dropdown-menu.tsx`,
  Fs = Cs,
  Is = ws,
  Ls = g.forwardRef(({ className: e, inset: t, children: n, ...r }, i) =>
    (0, Z.jsxDEV)(
      Ns,
      {
        ref: i,
        className: s(
          `flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,
          t && `pl-8`,
          e,
        ),
        ...r,
        children: [
          n,
          (0, Z.jsxDEV)(
            p,
            { className: `ml-auto` },
            void 0,
            !1,
            { fileName: Q, lineNumber: 37, columnNumber: 5 },
            void 0,
          ),
        ],
      },
      void 0,
      !0,
      { fileName: Q, lineNumber: 27, columnNumber: 3 },
      void 0,
    ),
  );
Ls.displayName = Ns.displayName;
var Rs = g.forwardRef(({ className: e, ...t }, n) =>
  (0, Z.jsxDEV)(
    Ps,
    {
      ref: n,
      className: s(
        `z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)`,
        e,
      ),
      ...t,
    },
    void 0,
    !1,
    { fileName: Q, lineNumber: 46, columnNumber: 3 },
    void 0,
  ),
);
Rs.displayName = Ps.displayName;
var zs = g.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) =>
  (0, Z.jsxDEV)(
    Ts,
    {
      children: (0, Z.jsxDEV)(
        Es,
        {
          ref: r,
          sideOffset: t,
          className: s(
            `z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md`,
            `data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)`,
            e,
          ),
          ...n,
        },
        void 0,
        !1,
        { fileName: Q, lineNumber: 62, columnNumber: 5 },
        void 0,
      ),
    },
    void 0,
    !1,
    { fileName: Q, lineNumber: 61, columnNumber: 3 },
    void 0,
  ),
);
zs.displayName = Es.displayName;
var Bs = g.forwardRef(({ className: e, inset: t, ...n }, r) =>
  (0, Z.jsxDEV)(
    Os,
    {
      ref: r,
      className: s(
        `relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0`,
        t && `pl-8`,
        e,
      ),
      ...n,
    },
    void 0,
    !1,
    { fileName: Q, lineNumber: 82, columnNumber: 3 },
    void 0,
  ),
);
Bs.displayName = Os.displayName;
var Vs = g.forwardRef(({ className: e, children: t, checked: n, ...r }, i) =>
  (0, Z.jsxDEV)(
    ks,
    {
      ref: i,
      className: s(
        `relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
        e,
      ),
      checked: n,
      ...r,
      children: [
        (0, Z.jsxDEV)(
          `span`,
          {
            className: `absolute left-2 flex h-3.5 w-3.5 items-center justify-center`,
            children: (0, Z.jsxDEV)(
              js,
              {
                children: (0, Z.jsxDEV)(
                  l,
                  { className: `h-4 w-4` },
                  void 0,
                  !1,
                  { fileName: Q, lineNumber: 109, columnNumber: 9 },
                  void 0,
                ),
              },
              void 0,
              !1,
              { fileName: Q, lineNumber: 108, columnNumber: 7 },
              void 0,
            ),
          },
          void 0,
          !1,
          { fileName: Q, lineNumber: 107, columnNumber: 5 },
          void 0,
        ),
        t,
      ],
    },
    void 0,
    !0,
    { fileName: Q, lineNumber: 98, columnNumber: 3 },
    void 0,
  ),
);
Vs.displayName = ks.displayName;
var Hs = g.forwardRef(({ className: e, children: t, ...n }, r) =>
  (0, Z.jsxDEV)(
    As,
    {
      ref: r,
      className: s(
        `relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
        e,
      ),
      ...n,
      children: [
        (0, Z.jsxDEV)(
          `span`,
          {
            className: `absolute left-2 flex h-3.5 w-3.5 items-center justify-center`,
            children: (0, Z.jsxDEV)(
              js,
              {
                children: (0, Z.jsxDEV)(
                  m,
                  { className: `h-2 w-2 fill-current` },
                  void 0,
                  !1,
                  { fileName: Q, lineNumber: 131, columnNumber: 9 },
                  void 0,
                ),
              },
              void 0,
              !1,
              { fileName: Q, lineNumber: 130, columnNumber: 7 },
              void 0,
            ),
          },
          void 0,
          !1,
          { fileName: Q, lineNumber: 129, columnNumber: 5 },
          void 0,
        ),
        t,
      ],
    },
    void 0,
    !0,
    { fileName: Q, lineNumber: 121, columnNumber: 3 },
    void 0,
  ),
);
Hs.displayName = As.displayName;
var Us = g.forwardRef(({ className: e, inset: t, ...n }, r) =>
  (0, Z.jsxDEV)(
    Ds,
    { ref: r, className: s(`px-2 py-1.5 text-sm font-semibold`, t && `pl-8`, e), ...n },
    void 0,
    !1,
    { fileName: Q, lineNumber: 145, columnNumber: 3 },
    void 0,
  ),
);
Us.displayName = Ds.displayName;
var Ws = g.forwardRef(({ className: e, ...t }, n) =>
  (0, Z.jsxDEV)(
    Ms,
    { ref: n, className: s(`-mx-1 my-1 h-px bg-muted`, e), ...t },
    void 0,
    !1,
    { fileName: Q, lineNumber: 157, columnNumber: 3 },
    void 0,
  ),
);
Ws.displayName = Ms.displayName;
var Gs = ({ className: e, ...t }) =>
  (0, Z.jsxDEV)(
    `span`,
    { className: s(`ml-auto text-xs tracking-widest opacity-60`, e), ...t },
    void 0,
    !1,
    { fileName: Q, lineNumber: 167, columnNumber: 5 },
    void 0,
  );
Gs.displayName = `DropdownMenuShortcut`;
var $ = `/app/applet/src/components/music/cards.tsx`;
function Ks({ gradient: e, coverUrl: t, className: n = ``, children: r }) {
  return (0, Z.jsxDEV)(
    a.div,
    {
      whileTap: { scale: 0.95 },
      whileHover: { scale: 1.02 },
      transition: f.gentle,
      className: `relative aspect-square overflow-hidden rounded-xl album-shadow bg-cover bg-center ${n}`,
      style: { backgroundImage: t ? `url(${t})` : void 0, background: t ? void 0 : e },
      children: [
        (0, Z.jsxDEV)(
          `div`,
          {
            className: `absolute inset-0 bg-[radial-gradient(120%_60%_at_10%_0%,rgba(255,255,255,0.35),transparent_50%)]`,
          },
          void 0,
          !1,
          { fileName: $, lineNumber: 35, columnNumber: 7 },
          this,
        ),
        r,
      ],
    },
    void 0,
    !0,
    { fileName: $, lineNumber: 25, columnNumber: 5 },
    this,
  );
}
function qs({ album: e, wide: t = !1 }) {
  let { setTrack: n, openNowPlaying: r } = i();
  return (0, Z.jsxDEV)(
    `button`,
    {
      onClick: () => {
        (n({
          id: e.id,
          title: e.title,
          artist: e.artist,
          album: e.title,
          duration: `3:42`,
          gradient: e.gradient,
          coverUrl: e.coverUrl,
        }),
          r());
      },
      className: `group flex flex-col text-left ${t ? `w-[78vw] max-w-[320px]` : `w-full`}`,
      children: [
        (0, Z.jsxDEV)(
          Ks,
          { gradient: e.gradient, coverUrl: e.coverUrl },
          void 0,
          !1,
          { fileName: $, lineNumber: 59, columnNumber: 7 },
          this,
        ),
        (0, Z.jsxDEV)(
          `p`,
          {
            className: `mt-2 line-clamp-1 text-[13px] font-medium text-foreground tracking-tight`,
            children: e.title,
          },
          void 0,
          !1,
          { fileName: $, lineNumber: 60, columnNumber: 7 },
          this,
        ),
        (0, Z.jsxDEV)(
          `p`,
          { className: `line-clamp-1 text-[11px] text-muted-foreground/80`, children: e.artist },
          void 0,
          !1,
          { fileName: $, lineNumber: 63, columnNumber: 7 },
          this,
        ),
      ],
    },
    void 0,
    !0,
    { fileName: $, lineNumber: 44, columnNumber: 5 },
    this,
  );
}
function Js({ playlist: e }) {
  let { setTrack: t, openNowPlaying: n } = i();
  return (0, Z.jsxDEV)(
    `button`,
    {
      onClick: () => {
        (t({
          id: e.id,
          title: e.title,
          artist: e.subtitle,
          album: e.title,
          duration: `3:20`,
          gradient: e.gradient,
          coverUrl: e.coverUrl,
        }),
          n());
      },
      className: `w-full text-left`,
      children: (0, Z.jsxDEV)(
        Ks,
        {
          gradient: e.gradient,
          coverUrl: e.coverUrl,
          children: (0, Z.jsxDEV)(
            `div`,
            {
              className: `absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent`,
              children: (0, Z.jsxDEV)(
                `p`,
                {
                  className: `text-[13px] font-bold leading-tight text-white tracking-tight`,
                  children: e.title,
                },
                void 0,
                !1,
                { fileName: $, lineNumber: 88, columnNumber: 11 },
                this,
              ),
            },
            void 0,
            !1,
            { fileName: $, lineNumber: 87, columnNumber: 9 },
            this,
          ),
        },
        void 0,
        !1,
        { fileName: $, lineNumber: 86, columnNumber: 7 },
        this,
      ),
    },
    void 0,
    !1,
    { fileName: $, lineNumber: 71, columnNumber: 5 },
    this,
  );
}
function Ys({ track: e, index: t }) {
  let { setTrack: n, openNowPlaying: r, addToPlayNext: a, addToQueue: o } = i();
  return (0, Z.jsxDEV)(
    `div`,
    {
      className: `flex w-full items-center gap-3 rounded-xl py-1 px-2 hover:bg-foreground/5 transition-colors duration-200 group`,
      children: [
        (0, Z.jsxDEV)(
          `button`,
          {
            onClick: () => {
              (n(e), r());
            },
            className: `flex flex-1 items-center gap-3 text-left min-w-0`,
            children: [
              (0, Z.jsxDEV)(
                `div`,
                {
                  className: `h-9 w-9 shrink-0 rounded-lg overflow-hidden relative bg-cover bg-center animate-fade-in`,
                  style: {
                    backgroundImage: e.coverUrl ? `url(${e.coverUrl})` : void 0,
                    background: e.coverUrl ? void 0 : e.gradient,
                  },
                  children: (0, Z.jsxDEV)(
                    `div`,
                    {
                      className: `absolute inset-0 bg-[radial-gradient(100%_50%_at_0%_0%,rgba(255,255,255,0.2),transparent_60%)]`,
                    },
                    void 0,
                    !1,
                    { fileName: $, lineNumber: 115, columnNumber: 11 },
                    this,
                  ),
                },
                void 0,
                !1,
                { fileName: $, lineNumber: 108, columnNumber: 9 },
                this,
              ),
              (0, Z.jsxDEV)(
                `div`,
                {
                  className: `min-w-0 flex-1`,
                  children: [
                    (0, Z.jsxDEV)(
                      `p`,
                      {
                        className: `truncate text-[13px] font-semibold text-foreground tracking-tight`,
                        children: e.title,
                      },
                      void 0,
                      !1,
                      { fileName: $, lineNumber: 118, columnNumber: 11 },
                      this,
                    ),
                    (0, Z.jsxDEV)(
                      `p`,
                      {
                        className: `truncate text-[11px] text-muted-foreground mt-0.5`,
                        children: e.artist,
                      },
                      void 0,
                      !1,
                      { fileName: $, lineNumber: 121, columnNumber: 11 },
                      this,
                    ),
                  ],
                },
                void 0,
                !0,
                { fileName: $, lineNumber: 117, columnNumber: 9 },
                this,
              ),
              (0, Z.jsxDEV)(
                `span`,
                {
                  className: `text-[11px] tabular-nums text-muted-foreground/60 mr-1 shrink-0`,
                  children: e.duration,
                },
                void 0,
                !1,
                { fileName: $, lineNumber: 123, columnNumber: 9 },
                this,
              ),
            ],
          },
          void 0,
          !0,
          { fileName: $, lineNumber: 101, columnNumber: 7 },
          this,
        ),
        (0, Z.jsxDEV)(
          Fs,
          {
            children: [
              (0, Z.jsxDEV)(
                Is,
                {
                  asChild: !0,
                  children: (0, Z.jsxDEV)(
                    `button`,
                    {
                      className: `h-8 w-8 rounded-full flex items-center justify-center hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-colors shrink-0`,
                      children: (0, Z.jsxDEV)(
                        u,
                        { className: `h-4 w-4` },
                        void 0,
                        !1,
                        { fileName: $, lineNumber: 131, columnNumber: 13 },
                        this,
                      ),
                    },
                    void 0,
                    !1,
                    { fileName: $, lineNumber: 130, columnNumber: 11 },
                    this,
                  ),
                },
                void 0,
                !1,
                { fileName: $, lineNumber: 129, columnNumber: 9 },
                this,
              ),
              (0, Z.jsxDEV)(
                zs,
                {
                  align: `end`,
                  className: `w-48 bg-background/95 backdrop-blur-md border border-border`,
                  children: [
                    (0, Z.jsxDEV)(
                      Bs,
                      {
                        onClick: () => a(e),
                        className: `flex items-center gap-2 text-[12px] cursor-pointer`,
                        children: [
                          (0, Z.jsxDEV)(
                            h,
                            { className: `h-3.5 w-3.5 text-rose-500` },
                            void 0,
                            !1,
                            { fileName: $, lineNumber: 142, columnNumber: 13 },
                            this,
                          ),
                          (0, Z.jsxDEV)(
                            `span`,
                            { children: `Play Next` },
                            void 0,
                            !1,
                            { fileName: $, lineNumber: 143, columnNumber: 13 },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      { fileName: $, lineNumber: 138, columnNumber: 11 },
                      this,
                    ),
                    (0, Z.jsxDEV)(
                      Bs,
                      {
                        onClick: () => o(e),
                        className: `flex items-center gap-2 text-[12px] cursor-pointer`,
                        children: [
                          (0, Z.jsxDEV)(
                            d,
                            { className: `h-3.5 w-3.5 text-rose-500` },
                            void 0,
                            !1,
                            { fileName: $, lineNumber: 149, columnNumber: 13 },
                            this,
                          ),
                          (0, Z.jsxDEV)(
                            `span`,
                            { children: `Add to Queue` },
                            void 0,
                            !1,
                            { fileName: $, lineNumber: 150, columnNumber: 13 },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      !0,
                      { fileName: $, lineNumber: 145, columnNumber: 11 },
                      this,
                    ),
                  ],
                },
                void 0,
                !0,
                { fileName: $, lineNumber: 134, columnNumber: 9 },
                this,
              ),
            ],
          },
          void 0,
          !0,
          { fileName: $, lineNumber: 128, columnNumber: 7 },
          this,
        ),
      ],
    },
    void 0,
    !0,
    { fileName: $, lineNumber: 100, columnNumber: 5 },
    this,
  );
}
function Xs({ title: e, subtitle: t, action: n = null, onActionClick: r }) {
  return (0, Z.jsxDEV)(
    `div`,
    {
      className: `mb-2.5 flex items-end justify-between px-4 pt-1`,
      children: [
        (0, Z.jsxDEV)(
          `div`,
          {
            children: [
              (0, Z.jsxDEV)(
                `h2`,
                {
                  className: `text-[16px] font-semibold tracking-tight text-foreground/90`,
                  children: e,
                },
                void 0,
                !1,
                { fileName: $, lineNumber: 172, columnNumber: 9 },
                this,
              ),
              t &&
                (0, Z.jsxDEV)(
                  `p`,
                  {
                    className: `text-[11px] text-muted-foreground mt-0.5 font-medium leading-none`,
                    children: t,
                  },
                  void 0,
                  !1,
                  { fileName: $, lineNumber: 174, columnNumber: 11 },
                  this,
                ),
            ],
          },
          void 0,
          !0,
          { fileName: $, lineNumber: 171, columnNumber: 7 },
          this,
        ),
        n &&
          (0, Z.jsxDEV)(
            `button`,
            {
              onClick: r,
              className: `text-[11px] font-semibold text-accent-pink transition active:scale-95 hover:text-accent-pink/80 cursor-pointer`,
              children: n,
            },
            void 0,
            !1,
            { fileName: $, lineNumber: 180, columnNumber: 9 },
            this,
          ),
      ],
    },
    void 0,
    !0,
    { fileName: $, lineNumber: 170, columnNumber: 5 },
    this,
  );
}
export { h as a, Ys as i, Js as n, p as o, Xs as r, qs as t };
