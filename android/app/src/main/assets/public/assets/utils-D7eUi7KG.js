var e = Object.create,
  t = Object.defineProperty,
  n = Object.getOwnPropertyDescriptor,
  r = Object.getOwnPropertyNames,
  i = Object.getPrototypeOf,
  a = Object.prototype.hasOwnProperty,
  o = (e, t, n) => () => {
    if (n) throw n[0];
    try {
      return (e && (t = e((e = 0))), t);
    } catch (e) {
      throw ((n = [e]), e);
    }
  },
  s = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), (e = null)), t.exports),
  c = (e, n) => {
    let r = {};
    for (var i in e) t(r, i, { get: e[i], enumerable: !0 });
    return (n || t(r, Symbol.toStringTag, { value: `Module` }), r);
  },
  l = (e, i, o, s) => {
    if ((i && typeof i == `object`) || typeof i == `function`)
      for (var c = r(i), l = 0, u = c.length, d; l < u; l++)
        ((d = c[l]),
          !a.call(e, d) &&
            d !== o &&
            t(e, d, {
              get: ((e) => i[e]).bind(null, d),
              enumerable: !(s = n(i, d)) || s.enumerable,
            }));
    return e;
  },
  u = (n, r, a) => (
    (a = n == null ? {} : e(i(n))),
    l(r || !n || !n.__esModule ? t(a, `default`, { value: n, enumerable: !0 }) : a, n)
  ),
  d = (e) =>
    a.call(e, `module.exports`) ? e[`module.exports`] : l(t({}, `__esModule`, { value: !0 }), e),
  f = s((e, t) => {
    (function () {
      function n(e, t) {
        Object.defineProperty(a.prototype, e, {
          get: function () {
            console.warn(`%s(...) is deprecated in plain JavaScript React classes. %s`, t[0], t[1]);
          },
        });
      }
      function r(e) {
        return typeof e != `object` || !e
          ? null
          : ((e = (ce && e[ce]) || e[`@@iterator`]), typeof e == `function` ? e : null);
      }
      function i(e, t) {
        e = ((e = e.constructor) && (e.displayName || e.name)) || `ReactClass`;
        var n = e + `.` + t;
        le[n] ||
          (console.error(
            "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
            t,
            e,
          ),
          (le[n] = !0));
      }
      function a(e, t, n) {
        ((this.props = e), (this.context = t), (this.refs = fe), (this.updater = n || ue));
      }
      function o() {}
      function s(e, t, n) {
        ((this.props = e), (this.context = t), (this.refs = fe), (this.updater = n || ue));
      }
      function c() {}
      function l(e) {
        return `` + e;
      }
      function u(e) {
        try {
          l(e);
          var t = !1;
        } catch {
          t = !0;
        }
        if (t) {
          t = console;
          var n = t.error,
            r =
              (typeof Symbol == `function` && Symbol.toStringTag && e[Symbol.toStringTag]) ||
              e.constructor.name ||
              `Object`;
          return (
            n.call(
              t,
              `The provided key is an unsupported type %s. This value must be coerced to a string before using it here.`,
              r,
            ),
            l(e)
          );
        }
      }
      function d(e) {
        if (e == null) return null;
        if (typeof e == `function`)
          return e.$$typeof === he ? null : e.displayName || e.name || null;
        if (typeof e == `string`) return e;
        switch (e) {
          case ne:
            return `Fragment`;
          case F:
            return `Profiler`;
          case re:
            return `StrictMode`;
          case ie:
            return `Suspense`;
          case ae:
            return `SuspenseList`;
          case se:
            return `Activity`;
        }
        if (typeof e == `object`)
          switch (
            (typeof e.tag == `number` &&
              console.error(
                `Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.`,
              ),
            e.$$typeof)
          ) {
            case P:
              return `Portal`;
            case L:
              return e.displayName || `Context`;
            case I:
              return (e._context.displayName || `Context`) + `.Consumer`;
            case R:
              var t = e.render;
              return (
                (e = e.displayName),
                (e ||=
                  ((e = t.displayName || t.name || ``),
                  e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)),
                e
              );
            case z:
              return ((t = e.displayName || null), t === null ? d(e.type) || `Memo` : t);
            case oe:
              ((t = e._payload), (e = e._init));
              try {
                return d(e(t));
              } catch {}
          }
        return null;
      }
      function f(e) {
        if (e === ne) return `<>`;
        if (typeof e == `object` && e && e.$$typeof === oe) return `<...>`;
        try {
          var t = d(e);
          return t ? `<` + t + `>` : `<...>`;
        } catch {
          return `<...>`;
        }
      }
      function p() {
        var e = B.A;
        return e === null ? null : e.getOwner();
      }
      function m() {
        return Error(`react-stack-top-frame`);
      }
      function h(e) {
        if (ge.call(e, `key`)) {
          var t = Object.getOwnPropertyDescriptor(e, `key`).get;
          if (t && t.isReactWarning) return !1;
        }
        return e.key !== void 0;
      }
      function g(e, t) {
        function n() {
          ve ||
            ((ve = !0),
            console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              t,
            ));
        }
        ((n.isReactWarning = !0), Object.defineProperty(e, "key", { get: n, configurable: !0 }));
      }
      function _() {
        var e = d(this.type);
        return (
          be[e] ||
            ((be[e] = !0),
            console.error(
              `Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.`,
            )),
          (e = this.props.ref),
          e === void 0 ? null : e
        );
      }
      function v(e, t, n, r, i, a) {
        var o = n.ref;
        return (
          (e = { $$typeof: N, type: e, key: t, props: n, _owner: r }),
          (o === void 0 ? null : o) === null
            ? Object.defineProperty(e, "ref", { enumerable: !1, value: null })
            : Object.defineProperty(e, "ref", { enumerable: !1, get: _ }),
          (e._store = {}),
          Object.defineProperty(e._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0,
          }),
          Object.defineProperty(e, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null,
          }),
          Object.defineProperty(e, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: i,
          }),
          Object.defineProperty(e, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: a,
          }),
          Object.freeze && (Object.freeze(e.props), Object.freeze(e)),
          e
        );
      }
      function y(e, t) {
        return (
          (t = v(e.type, t, e.props, e._owner, e._debugStack, e._debugTask)),
          e._store && (t._store.validated = e._store.validated),
          t
        );
      }
      function b(e) {
        x(e)
          ? e._store && (e._store.validated = 1)
          : typeof e == `object` &&
            e &&
            e.$$typeof === oe &&
            (e._payload.status === `fulfilled`
              ? x(e._payload.value) &&
                e._payload.value._store &&
                (e._payload.value._store.validated = 1)
              : e._store && (e._store.validated = 1));
      }
      function x(e) {
        return typeof e == `object` && !!e && e.$$typeof === N;
      }
      function S(e) {
        var t = { "=": `=0`, ":": `=2` };
        return (
          `$` +
          e.replace(/[=:]/g, function (e) {
            return t[e];
          })
        );
      }
      function C(e, t) {
        return typeof e == `object` && e && e.key != null
          ? (u(e.key), S(`` + e.key))
          : t.toString(36);
      }
      function w(e) {
        switch (e.status) {
          case `fulfilled`:
            return e.value;
          case `rejected`:
            throw e.reason;
          default:
            switch (
              (typeof e.status == `string`
                ? e.then(c, c)
                : ((e.status = `pending`),
                  e.then(
                    function (t) {
                      e.status === `pending` && ((e.status = `fulfilled`), (e.value = t));
                    },
                    function (t) {
                      e.status === `pending` && ((e.status = `rejected`), (e.reason = t));
                    },
                  )),
              e.status)
            ) {
              case `fulfilled`:
                return e.value;
              case `rejected`:
                throw e.reason;
            }
        }
        throw e;
      }
      function T(e, t, n, i, a) {
        var o = typeof e;
        (o === `undefined` || o === `boolean`) && (e = null);
        var s = !1;
        if (e === null) s = !0;
        else
          switch (o) {
            case `bigint`:
            case `string`:
            case `number`:
              s = !0;
              break;
            case `object`:
              switch (e.$$typeof) {
                case N:
                case P:
                  s = !0;
                  break;
                case oe:
                  return ((s = e._init), T(s(e._payload), t, n, i, a));
              }
          }
        if (s) {
          ((s = e), (a = a(s)));
          var c = i === `` ? `.` + C(s, 0) : i;
          return (
            me(a)
              ? ((n = ``),
                c != null && (n = c.replace(we, `$&/`) + `/`),
                T(a, t, n, ``, function (e) {
                  return e;
                }))
              : a != null &&
                (x(a) &&
                  (a.key != null && ((s && s.key === a.key) || u(a.key)),
                  (n = y(
                    a,
                    n +
                      (a.key == null || (s && s.key === a.key)
                        ? ``
                        : (`` + a.key).replace(we, `$&/`) + `/`) +
                      c,
                  )),
                  i !== `` &&
                    s != null &&
                    x(s) &&
                    s.key == null &&
                    s._store &&
                    !s._store.validated &&
                    (n._store.validated = 2),
                  (a = n)),
                t.push(a)),
            1
          );
        }
        if (((s = 0), (c = i === `` ? `.` : i + `:`), me(e)))
          for (var l = 0; l < e.length; l++)
            ((i = e[l]), (o = c + C(i, l)), (s += T(i, t, n, o, a)));
        else if (((l = r(e)), typeof l == `function`))
          for (
            l === e.entries &&
              (Ce ||
                console.warn(
                  `Using Maps as children is not supported. Use an array of keyed ReactElements instead.`,
                ),
              (Ce = !0)),
              e = l.call(e),
              l = 0;
            !(i = e.next()).done;
          )
            ((i = i.value), (o = c + C(i, l++)), (s += T(i, t, n, o, a)));
        else if (o === `object`) {
          if (typeof e.then == `function`) return T(w(e), t, n, i, a);
          throw (
            (t = String(e)),
            Error(
              `Objects are not valid as a React child (found: ` +
                (t === `[object Object]`
                  ? `object with keys {` + Object.keys(e).join(`, `) + `}`
                  : t) +
                `). If you meant to render a collection of children, use an array instead.`,
            )
          );
        }
        return s;
      }
      function E(e, t, n) {
        if (e == null) return e;
        var r = [],
          i = 0;
        return (
          T(e, r, ``, ``, function (e) {
            return t.call(n, e, i++);
          }),
          r
        );
      }
      function D(e) {
        if (e._status === -1) {
          var t = e._ioInfo;
          (t != null && (t.start = t.end = performance.now()), (t = e._result));
          var n = t();
          if (
            (n.then(
              function (t) {
                if (e._status === 0 || e._status === -1) {
                  ((e._status = 1), (e._result = t));
                  var r = e._ioInfo;
                  (r != null && (r.end = performance.now()),
                    n.status === void 0 && ((n.status = `fulfilled`), (n.value = t)));
                }
              },
              function (t) {
                if (e._status === 0 || e._status === -1) {
                  ((e._status = 2), (e._result = t));
                  var r = e._ioInfo;
                  (r != null && (r.end = performance.now()),
                    n.status === void 0 && ((n.status = `rejected`), (n.reason = t)));
                }
              },
            ),
            (t = e._ioInfo),
            t != null)
          ) {
            t.value = n;
            var r = n.displayName;
            typeof r == `string` && (t.name = r);
          }
          e._status === -1 && ((e._status = 0), (e._result = n));
        }
        if (e._status === 1)
          return (
            (t = e._result),
            t === void 0 &&
              console.error(
                `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
                t,
              ),
            `default` in t ||
              console.error(
                `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,
                t,
              ),
            t.default
          );
        throw e._result;
      }
      function O() {
        var e = B.H;
        return (
          e === null &&
            console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`),
          e
        );
      }
      function ee() {
        B.asyncTransitions--;
      }
      function k(e) {
        if (De === null)
          try {
            var n = (`require` + Math.random()).slice(0, 7);
            De = (t && t[n]).call(t, `timers`).setImmediate;
          } catch {
            De = function (e) {
              !1 === Ee &&
                ((Ee = !0),
                typeof MessageChannel > `u` &&
                  console.error(
                    `This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.`,
                  ));
              var t = new MessageChannel();
              ((t.port1.onmessage = e), t.port2.postMessage(void 0));
            };
          }
        return De(e);
      }
      function A(e) {
        return 1 < e.length && typeof AggregateError == `function` ? AggregateError(e) : e[0];
      }
      function j(e, t) {
        (t !== Oe - 1 &&
          console.error(
            `You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. `,
          ),
          (Oe = t));
      }
      function M(e, t, n) {
        var r = B.actQueue;
        if (r !== null)
          if (r.length !== 0)
            try {
              (te(r),
                k(function () {
                  return M(e, t, n);
                }));
              return;
            } catch (e) {
              B.thrownErrors.push(e);
            }
          else B.actQueue = null;
        0 < B.thrownErrors.length
          ? ((r = A(B.thrownErrors)), (B.thrownErrors.length = 0), n(r))
          : t(e);
      }
      function te(e) {
        if (!ke) {
          ke = !0;
          var t = 0;
          try {
            for (; t < e.length; t++) {
              var n = e[t];
              do {
                B.didUsePromise = !1;
                var r = n(!1);
                if (r !== null) {
                  if (B.didUsePromise) {
                    ((e[t] = n), e.splice(0, t));
                    return;
                  }
                  n = r;
                } else break;
              } while (1);
            }
            e.length = 0;
          } catch (n) {
            (e.splice(0, t + 1), B.thrownErrors.push(n));
          } finally {
            ke = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u` &&
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == `function` &&
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var N = Symbol.for(`react.transitional.element`),
        P = Symbol.for(`react.portal`),
        ne = Symbol.for(`react.fragment`),
        re = Symbol.for(`react.strict_mode`),
        F = Symbol.for(`react.profiler`),
        I = Symbol.for(`react.consumer`),
        L = Symbol.for(`react.context`),
        R = Symbol.for(`react.forward_ref`),
        ie = Symbol.for(`react.suspense`),
        ae = Symbol.for(`react.suspense_list`),
        z = Symbol.for(`react.memo`),
        oe = Symbol.for(`react.lazy`),
        se = Symbol.for(`react.activity`),
        ce = Symbol.iterator,
        le = {},
        ue = {
          isMounted: function () {
            return !1;
          },
          enqueueForceUpdate: function (e) {
            i(e, `forceUpdate`);
          },
          enqueueReplaceState: function (e) {
            i(e, `replaceState`);
          },
          enqueueSetState: function (e) {
            i(e, `setState`);
          },
        },
        de = Object.assign,
        fe = {};
      (Object.freeze(fe),
        (a.prototype.isReactComponent = {}),
        (a.prototype.setState = function (e, t) {
          if (typeof e != `object` && typeof e != `function` && e != null)
            throw Error(
              `takes an object of state variables to update or a function which returns an object of state variables.`,
            );
          this.updater.enqueueSetState(this, e, t, `setState`);
        }),
        (a.prototype.forceUpdate = function (e) {
          this.updater.enqueueForceUpdate(this, e, `forceUpdate`);
        }));
      var pe = {
        isMounted: [
          `isMounted`,
          `Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.`,
        ],
        replaceState: [
          `replaceState`,
          `Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236).`,
        ],
      };
      for (Ae in pe) pe.hasOwnProperty(Ae) && n(Ae, pe[Ae]);
      ((o.prototype = a.prototype),
        (pe = s.prototype = new o()),
        (pe.constructor = s),
        de(pe, a.prototype),
        (pe.isPureReactComponent = !0));
      var me = Array.isArray,
        he = Symbol.for(`react.client.reference`),
        B = {
          H: null,
          A: null,
          T: null,
          S: null,
          actQueue: null,
          asyncTransitions: 0,
          isBatchingLegacy: !1,
          didScheduleLegacyUpdate: !1,
          didUsePromise: !1,
          thrownErrors: [],
          getCurrentStack: null,
          recentlyCreatedOwnerStacks: 0,
        },
        ge = Object.prototype.hasOwnProperty,
        _e = console.createTask
          ? console.createTask
          : function () {
              return null;
            };
      pe = {
        react_stack_bottom_frame: function (e) {
          return e();
        },
      };
      var ve,
        ye,
        be = {},
        xe = pe.react_stack_bottom_frame.bind(pe, m)(),
        Se = _e(f(m)),
        Ce = !1,
        we = /\/+/g,
        Te =
          typeof reportError == `function`
            ? reportError
            : function (e) {
                if (typeof window == `object` && typeof window.ErrorEvent == `function`) {
                  var t = new window.ErrorEvent(`error`, {
                    bubbles: !0,
                    cancelable: !0,
                    message:
                      typeof e == `object` && e && typeof e.message == `string`
                        ? String(e.message)
                        : String(e),
                    error: e,
                  });
                  if (!window.dispatchEvent(t)) return;
                } else if (typeof process == `object` && typeof process.emit == `function`) {
                  process.emit(`uncaughtException`, e);
                  return;
                }
                console.error(e);
              },
        Ee = !1,
        De = null,
        Oe = 0,
        V = !1,
        ke = !1,
        H =
          typeof queueMicrotask == `function`
            ? function (e) {
                queueMicrotask(function () {
                  return queueMicrotask(e);
                });
              }
            : k;
      pe = Object.freeze({
        __proto__: null,
        c: function (e) {
          return O().useMemoCache(e);
        },
      });
      var Ae = {
        map: E,
        forEach: function (e, t, n) {
          E(
            e,
            function () {
              t.apply(this, arguments);
            },
            n,
          );
        },
        count: function (e) {
          var t = 0;
          return (
            E(e, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (e) {
          return (
            E(e, function (e) {
              return e;
            }) || []
          );
        },
        only: function (e) {
          if (!x(e))
            throw Error(`React.Children.only expected to receive a single React element child.`);
          return e;
        },
      };
      ((e.Activity = se),
        (e.Children = Ae),
        (e.Component = a),
        (e.Fragment = ne),
        (e.Profiler = F),
        (e.PureComponent = s),
        (e.StrictMode = re),
        (e.Suspense = ie),
        (e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = B),
        (e.__COMPILER_RUNTIME = pe),
        (e.act = function (e) {
          var t = B.actQueue,
            n = Oe;
          Oe++;
          var r = (B.actQueue = t === null ? [] : t),
            i = !1;
          try {
            var a = e();
          } catch (e) {
            B.thrownErrors.push(e);
          }
          if (0 < B.thrownErrors.length)
            throw (j(t, n), (e = A(B.thrownErrors)), (B.thrownErrors.length = 0), e);
          if (typeof a == `object` && a && typeof a.then == `function`) {
            var o = a;
            return (
              H(function () {
                i ||
                  V ||
                  ((V = !0),
                  console.error(
                    `You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);`,
                  ));
              }),
              {
                then: function (e, a) {
                  ((i = !0),
                    o.then(
                      function (i) {
                        if ((j(t, n), n === 0)) {
                          try {
                            (te(r),
                              k(function () {
                                return M(i, e, a);
                              }));
                          } catch (e) {
                            B.thrownErrors.push(e);
                          }
                          if (0 < B.thrownErrors.length) {
                            var o = A(B.thrownErrors);
                            ((B.thrownErrors.length = 0), a(o));
                          }
                        } else e(i);
                      },
                      function (e) {
                        (j(t, n),
                          0 < B.thrownErrors.length
                            ? ((e = A(B.thrownErrors)), (B.thrownErrors.length = 0), a(e))
                            : a(e));
                      },
                    ));
                },
              }
            );
          }
          var s = a;
          if (
            (j(t, n),
            n === 0 &&
              (te(r),
              r.length !== 0 &&
                H(function () {
                  i ||
                    V ||
                    ((V = !0),
                    console.error(
                      "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)",
                    ));
                }),
              (B.actQueue = null)),
            0 < B.thrownErrors.length)
          )
            throw ((e = A(B.thrownErrors)), (B.thrownErrors.length = 0), e);
          return {
            then: function (e, t) {
              ((i = !0),
                n === 0
                  ? ((B.actQueue = r),
                    k(function () {
                      return M(s, e, t);
                    }))
                  : e(s));
            },
          };
        }),
        (e.cache = function (e) {
          return function () {
            return e.apply(null, arguments);
          };
        }),
        (e.cacheSignal = function () {
          return null;
        }),
        (e.captureOwnerStack = function () {
          var e = B.getCurrentStack;
          return e === null ? null : e();
        }),
        (e.cloneElement = function (e, t, n) {
          if (e == null)
            throw Error(`The argument must be a React element, but you passed ` + e + `.`);
          var r = de({}, e.props),
            i = e.key,
            a = e._owner;
          if (t != null) {
            var o;
            a: {
              if (
                ge.call(t, `ref`) &&
                (o = Object.getOwnPropertyDescriptor(t, `ref`).get) &&
                o.isReactWarning
              ) {
                o = !1;
                break a;
              }
              o = t.ref !== void 0;
            }
            for (s in (o && (a = p()), h(t) && (u(t.key), (i = `` + t.key)), t))
              !ge.call(t, s) ||
                s === `key` ||
                s === `__self` ||
                s === `__source` ||
                (s === `ref` && t.ref === void 0) ||
                (r[s] = t[s]);
          }
          var s = arguments.length - 2;
          if (s === 1) r.children = n;
          else if (1 < s) {
            o = Array(s);
            for (var c = 0; c < s; c++) o[c] = arguments[c + 2];
            r.children = o;
          }
          for (
            r = v(e.type, i, r, a, e._debugStack, e._debugTask), i = 2;
            i < arguments.length;
            i++
          )
            b(arguments[i]);
          return r;
        }),
        (e.createContext = function (e) {
          return (
            (e = {
              $$typeof: L,
              _currentValue: e,
              _currentValue2: e,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
            }),
            (e.Provider = e),
            (e.Consumer = { $$typeof: I, _context: e }),
            (e._currentRenderer = null),
            (e._currentRenderer2 = null),
            e
          );
        }),
        (e.createElement = function (e, t, n) {
          for (var r = 2; r < arguments.length; r++) b(arguments[r]);
          r = {};
          var i = null;
          if (t != null)
            for (c in (ye ||
              !(`__self` in t) ||
              `key` in t ||
              ((ye = !0),
              console.warn(
                `Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform`,
              )),
            h(t) && (u(t.key), (i = `` + t.key)),
            t))
              ge.call(t, c) && c !== `key` && c !== `__self` && c !== `__source` && (r[c] = t[c]);
          var a = arguments.length - 2;
          if (a === 1) r.children = n;
          else if (1 < a) {
            for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
            (Object.freeze && Object.freeze(o), (r.children = o));
          }
          if (e && e.defaultProps)
            for (c in ((a = e.defaultProps), a)) r[c] === void 0 && (r[c] = a[c]);
          i && g(r, typeof e == `function` ? e.displayName || e.name || `Unknown` : e);
          var c = 1e4 > B.recentlyCreatedOwnerStacks++;
          return v(e, i, r, p(), c ? Error(`react-stack-top-frame`) : xe, c ? _e(f(e)) : Se);
        }),
        (e.createRef = function () {
          var e = { current: null };
          return (Object.seal(e), e);
        }),
        (e.forwardRef = function (e) {
          (e != null && e.$$typeof === z
            ? console.error(
                "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).",
              )
            : typeof e == `function`
              ? e.length !== 0 &&
                e.length !== 2 &&
                console.error(
                  `forwardRef render functions accept exactly two parameters: props and ref. %s`,
                  e.length === 1
                    ? `Did you forget to use the ref parameter?`
                    : `Any additional parameter will be undefined.`,
                )
              : console.error(
                  `forwardRef requires a render function but was given %s.`,
                  e === null ? `null` : typeof e,
                ),
            e != null &&
              e.defaultProps != null &&
              console.error(
                `forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?`,
              ));
          var t = { $$typeof: R, render: e },
            n;
          return (
            Object.defineProperty(t, "displayName", {
              enumerable: !1,
              configurable: !0,
              get: function () {
                return n;
              },
              set: function (t) {
                ((n = t),
                  e.name ||
                    e.displayName ||
                    (Object.defineProperty(e, "name", { value: t }), (e.displayName = t)));
              },
            }),
            t
          );
        }),
        (e.isValidElement = x),
        (e.lazy = function (e) {
          e = { _status: -1, _result: e };
          var t = { $$typeof: oe, _payload: e, _init: D },
            n = {
              name: `lazy`,
              start: -1,
              end: -1,
              value: null,
              owner: null,
              debugStack: Error(`react-stack-top-frame`),
              debugTask: console.createTask ? console.createTask(`lazy()`) : null,
            };
          return ((e._ioInfo = n), (t._debugInfo = [{ awaited: n }]), t);
        }),
        (e.memo = function (e, t) {
          (e ??
            console.error(
              `memo: The first argument must be a component. Instead received: %s`,
              e === null ? `null` : typeof e,
            ),
            (t = { $$typeof: z, type: e, compare: t === void 0 ? null : t }));
          var n;
          return (
            Object.defineProperty(t, "displayName", {
              enumerable: !1,
              configurable: !0,
              get: function () {
                return n;
              },
              set: function (t) {
                ((n = t),
                  e.name ||
                    e.displayName ||
                    (Object.defineProperty(e, "name", { value: t }), (e.displayName = t)));
              },
            }),
            t
          );
        }),
        (e.startTransition = function (e) {
          var t = B.T,
            n = {};
          ((n._updatedFibers = new Set()), (B.T = n));
          try {
            var r = e(),
              i = B.S;
            (i !== null && i(n, r),
              typeof r == `object` &&
                r &&
                typeof r.then == `function` &&
                (B.asyncTransitions++, r.then(ee, ee), r.then(c, Te)));
          } catch (e) {
            Te(e);
          } finally {
            (t === null &&
              n._updatedFibers &&
              ((e = n._updatedFibers.size),
              n._updatedFibers.clear(),
              10 < e &&
                console.warn(
                  `Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.`,
                )),
              t !== null &&
                n.types !== null &&
                (t.types !== null &&
                  t.types !== n.types &&
                  console.error(
                    `We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React.`,
                  ),
                (t.types = n.types)),
              (B.T = t));
          }
        }),
        (e.unstable_useCacheRefresh = function () {
          return O().useCacheRefresh();
        }),
        (e.use = function (e) {
          return O().use(e);
        }),
        (e.useActionState = function (e, t, n) {
          return O().useActionState(e, t, n);
        }),
        (e.useCallback = function (e, t) {
          return O().useCallback(e, t);
        }),
        (e.useContext = function (e) {
          var t = O();
          return (
            e.$$typeof === I &&
              console.error(
                `Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?`,
              ),
            t.useContext(e)
          );
        }),
        (e.useDebugValue = function (e, t) {
          return O().useDebugValue(e, t);
        }),
        (e.useDeferredValue = function (e, t) {
          return O().useDeferredValue(e, t);
        }),
        (e.useEffect = function (e, t) {
          return (
            e ??
              console.warn(
                `React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?`,
              ),
            O().useEffect(e, t)
          );
        }),
        (e.useEffectEvent = function (e) {
          return O().useEffectEvent(e);
        }),
        (e.useId = function () {
          return O().useId();
        }),
        (e.useImperativeHandle = function (e, t, n) {
          return O().useImperativeHandle(e, t, n);
        }),
        (e.useInsertionEffect = function (e, t) {
          return (
            e ??
              console.warn(
                `React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?`,
              ),
            O().useInsertionEffect(e, t)
          );
        }),
        (e.useLayoutEffect = function (e, t) {
          return (
            e ??
              console.warn(
                `React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?`,
              ),
            O().useLayoutEffect(e, t)
          );
        }),
        (e.useMemo = function (e, t) {
          return O().useMemo(e, t);
        }),
        (e.useOptimistic = function (e, t) {
          return O().useOptimistic(e, t);
        }),
        (e.useReducer = function (e, t, n) {
          return O().useReducer(e, t, n);
        }),
        (e.useRef = function (e) {
          return O().useRef(e);
        }),
        (e.useState = function (e) {
          return O().useState(e);
        }),
        (e.useSyncExternalStore = function (e, t, n) {
          return O().useSyncExternalStore(e, t, n);
        }),
        (e.useTransition = function () {
          return O().useTransition();
        }),
        (e.version = `19.2.7`),
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u` &&
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == `function` &&
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error()));
    })();
  }),
  p = s((e, t) => {
    t.exports = f();
  }),
  m = s((e) => {
    (function () {
      function t() {}
      function n(e) {
        return `` + e;
      }
      function r(e, t, r) {
        var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        try {
          n(i);
          var a = !1;
        } catch {
          a = !0;
        }
        return (
          a &&
            (console.error(
              `The provided key is an unsupported type %s. This value must be coerced to a string before using it here.`,
              (typeof Symbol == `function` && Symbol.toStringTag && i[Symbol.toStringTag]) ||
                i.constructor.name ||
                `Object`,
            ),
            n(i)),
          {
            $$typeof: u,
            key: i == null ? null : `` + i,
            children: e,
            containerInfo: t,
            implementation: r,
          }
        );
      }
      function i(e, t) {
        if (e === `font`) return ``;
        if (typeof t == `string`) return t === `use-credentials` ? t : ``;
      }
      function a(e) {
        return e === null
          ? "`null`"
          : e === void 0
            ? "`undefined`"
            : e === ``
              ? `an empty string`
              : `something with type "` + typeof e + `"`;
      }
      function o(e) {
        return e === null
          ? "`null`"
          : e === void 0
            ? "`undefined`"
            : e === ``
              ? `an empty string`
              : typeof e == `string`
                ? JSON.stringify(e)
                : typeof e == `number`
                  ? "`" + e + "`"
                  : `something with type "` + typeof e + `"`;
      }
      function s() {
        var e = d.H;
        return (
          e === null &&
            console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`),
          e
        );
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u` &&
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == `function` &&
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var c = p(),
        l = {
          d: {
            f: t,
            r: function () {
              throw Error(
                `Invalid form element. requestFormReset must be passed a form that was rendered by React.`,
              );
            },
            D: t,
            C: t,
            L: t,
            m: t,
            X: t,
            S: t,
            M: t,
          },
          p: 0,
          findDOMNode: null,
        },
        u = Symbol.for(`react.portal`),
        d = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      ((typeof Map == `function` &&
        Map.prototype != null &&
        typeof Map.prototype.forEach == `function` &&
        typeof Set == `function` &&
        Set.prototype != null &&
        typeof Set.prototype.clear == `function` &&
        typeof Set.prototype.forEach == `function`) ||
        console.error(
          `React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills`,
        ),
        (e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l),
        (e.createPortal = function (e, t) {
          var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
          if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11))
            throw Error(`Target container is not a DOM element.`);
          return r(e, t, null, n);
        }),
        (e.flushSync = function (e) {
          var t = d.T,
            n = l.p;
          try {
            if (((d.T = null), (l.p = 2), e)) return e();
          } finally {
            ((d.T = t),
              (l.p = n),
              l.d.f() &&
                console.error(
                  `flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.`,
                ));
          }
        }),
        (e.preconnect = function (e, t) {
          (typeof e == `string` && e
            ? t != null && typeof t != `object`
              ? console.error(
                  "ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",
                  o(t),
                )
              : t != null &&
                typeof t.crossOrigin != `string` &&
                console.error(
                  "ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",
                  a(t.crossOrigin),
                )
            : console.error(
                "ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
                a(e),
              ),
            typeof e == `string` &&
              (t
                ? ((t = t.crossOrigin),
                  (t = typeof t == `string` ? (t === `use-credentials` ? t : ``) : void 0))
                : (t = null),
              l.d.C(e, t)));
        }),
        (e.prefetchDNS = function (e) {
          if (typeof e != `string` || !e)
            console.error(
              "ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
              a(e),
            );
          else if (1 < arguments.length) {
            var t = arguments[1];
            typeof t == `object` && t.hasOwnProperty(`crossOrigin`)
              ? console.error(
                  "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
                  o(t),
                )
              : console.error(
                  "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
                  o(t),
                );
          }
          typeof e == `string` && l.d.D(e);
        }),
        (e.preinit = function (e, t) {
          if (
            (typeof e == `string` && e
              ? typeof t != `object` || !t
                ? console.error(
                    "ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",
                    o(t),
                  )
                : t.as !== `style` &&
                  t.as !== `script` &&
                  console.error(
                    'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
                    o(t.as),
                  )
              : console.error(
                  "ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
                  a(e),
                ),
            typeof e == `string` && t && typeof t.as == `string`)
          ) {
            var n = t.as,
              r = i(n, t.crossOrigin),
              s = typeof t.integrity == `string` ? t.integrity : void 0,
              c = typeof t.fetchPriority == `string` ? t.fetchPriority : void 0;
            n === `style`
              ? l.d.S(e, typeof t.precedence == `string` ? t.precedence : void 0, {
                  crossOrigin: r,
                  integrity: s,
                  fetchPriority: c,
                })
              : n === `script` &&
                l.d.X(e, {
                  crossOrigin: r,
                  integrity: s,
                  fetchPriority: c,
                  nonce: typeof t.nonce == `string` ? t.nonce : void 0,
                });
          }
        }),
        (e.preinitModule = function (e, t) {
          var n = ``;
          if (
            ((typeof e == `string` && e) ||
              (n += " The `href` argument encountered was " + a(e) + `.`),
            t !== void 0 && typeof t != `object`
              ? (n += " The `options` argument encountered was " + a(t) + `.`)
              : t &&
                `as` in t &&
                t.as !== `script` &&
                (n += " The `as` option encountered was " + o(t.as) + `.`),
            n)
          )
            console.error(
              "ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",
              n,
            );
          else
            switch (((n = t && typeof t.as == `string` ? t.as : `script`), n)) {
              case `script`:
                break;
              default:
                ((n = o(n)),
                  console.error(
                    'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
                    n,
                    e,
                  ));
            }
          typeof e == `string` &&
            (typeof t == `object` && t
              ? (t.as == null || t.as === `script`) &&
                ((n = i(t.as, t.crossOrigin)),
                l.d.M(e, {
                  crossOrigin: n,
                  integrity: typeof t.integrity == `string` ? t.integrity : void 0,
                  nonce: typeof t.nonce == `string` ? t.nonce : void 0,
                }))
              : (t ?? l.d.M(e)));
        }),
        (e.preload = function (e, t) {
          var n = ``;
          if (
            ((typeof e == `string` && e) ||
              (n += " The `href` argument encountered was " + a(e) + `.`),
            typeof t != `object` || !t
              ? (n += " The `options` argument encountered was " + a(t) + `.`)
              : (typeof t.as == `string` && t.as) ||
                (n += " The `as` option encountered was " + a(t.as) + `.`),
            n &&
              console.error(
                'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
                n,
              ),
            typeof e == `string` && typeof t == `object` && t && typeof t.as == `string`)
          ) {
            n = t.as;
            var r = i(n, t.crossOrigin);
            l.d.L(e, n, {
              crossOrigin: r,
              integrity: typeof t.integrity == `string` ? t.integrity : void 0,
              nonce: typeof t.nonce == `string` ? t.nonce : void 0,
              type: typeof t.type == `string` ? t.type : void 0,
              fetchPriority: typeof t.fetchPriority == `string` ? t.fetchPriority : void 0,
              referrerPolicy: typeof t.referrerPolicy == `string` ? t.referrerPolicy : void 0,
              imageSrcSet: typeof t.imageSrcSet == `string` ? t.imageSrcSet : void 0,
              imageSizes: typeof t.imageSizes == `string` ? t.imageSizes : void 0,
              media: typeof t.media == `string` ? t.media : void 0,
            });
          }
        }),
        (e.preloadModule = function (e, t) {
          var n = ``;
          ((typeof e == `string` && e) ||
            (n += " The `href` argument encountered was " + a(e) + `.`),
            t !== void 0 && typeof t != `object`
              ? (n += " The `options` argument encountered was " + a(t) + `.`)
              : t &&
                `as` in t &&
                typeof t.as != `string` &&
                (n += " The `as` option encountered was " + a(t.as) + `.`),
            n &&
              console.error(
                'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
                n,
              ),
            typeof e == `string` &&
              (t
                ? ((n = i(t.as, t.crossOrigin)),
                  l.d.m(e, {
                    as: typeof t.as == `string` && t.as !== `script` ? t.as : void 0,
                    crossOrigin: n,
                    integrity: typeof t.integrity == `string` ? t.integrity : void 0,
                  }))
                : l.d.m(e)));
        }),
        (e.requestFormReset = function (e) {
          l.d.r(e);
        }),
        (e.unstable_batchedUpdates = function (e, t) {
          return e(t);
        }),
        (e.useFormState = function (e, t, n) {
          return s().useFormState(e, t, n);
        }),
        (e.useFormStatus = function () {
          return s().useHostTransitionStatus();
        }),
        (e.version = `19.2.7`),
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u` &&
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == `function` &&
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error()));
    })();
  }),
  h = s((e, t) => {
    t.exports = m();
  }),
  g = s((e) => {
    (function () {
      function t(e) {
        if (e == null) return null;
        if (typeof e == `function`)
          return e.$$typeof === ee ? null : e.displayName || e.name || null;
        if (typeof e == `string`) return e;
        switch (e) {
          case v:
            return `Fragment`;
          case b:
            return `Profiler`;
          case y:
            return `StrictMode`;
          case w:
            return `Suspense`;
          case T:
            return `SuspenseList`;
          case O:
            return `Activity`;
        }
        if (typeof e == `object`)
          switch (
            (typeof e.tag == `number` &&
              console.error(
                `Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.`,
              ),
            e.$$typeof)
          ) {
            case _:
              return `Portal`;
            case S:
              return e.displayName || `Context`;
            case x:
              return (e._context.displayName || `Context`) + `.Consumer`;
            case C:
              var n = e.render;
              return (
                (e = e.displayName),
                (e ||=
                  ((e = n.displayName || n.name || ``),
                  e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)),
                e
              );
            case E:
              return ((n = e.displayName || null), n === null ? t(e.type) || `Memo` : n);
            case D:
              ((n = e._payload), (e = e._init));
              try {
                return t(e(n));
              } catch {}
          }
        return null;
      }
      function n(e) {
        return `` + e;
      }
      function r(e) {
        try {
          n(e);
          var t = !1;
        } catch {
          t = !0;
        }
        if (t) {
          t = console;
          var r = t.error,
            i =
              (typeof Symbol == `function` && Symbol.toStringTag && e[Symbol.toStringTag]) ||
              e.constructor.name ||
              `Object`;
          return (
            r.call(
              t,
              `The provided key is an unsupported type %s. This value must be coerced to a string before using it here.`,
              i,
            ),
            n(e)
          );
        }
      }
      function i(e) {
        if (e === v) return `<>`;
        if (typeof e == `object` && e && e.$$typeof === D) return `<...>`;
        try {
          var n = t(e);
          return n ? `<` + n + `>` : `<...>`;
        } catch {
          return `<...>`;
        }
      }
      function a() {
        var e = k.A;
        return e === null ? null : e.getOwner();
      }
      function o() {
        return Error(`react-stack-top-frame`);
      }
      function s(e) {
        if (A.call(e, `key`)) {
          var t = Object.getOwnPropertyDescriptor(e, `key`).get;
          if (t && t.isReactWarning) return !1;
        }
        return e.key !== void 0;
      }
      function c(e, t) {
        function n() {
          te ||
            ((te = !0),
            console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              t,
            ));
        }
        ((n.isReactWarning = !0), Object.defineProperty(e, "key", { get: n, configurable: !0 }));
      }
      function l() {
        var e = t(this.type);
        return (
          N[e] ||
            ((N[e] = !0),
            console.error(
              `Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.`,
            )),
          (e = this.props.ref),
          e === void 0 ? null : e
        );
      }
      function u(e, t, n, r, i, a) {
        var o = n.ref;
        return (
          (e = { $$typeof: g, type: e, key: t, props: n, _owner: r }),
          (o === void 0 ? null : o) === null
            ? Object.defineProperty(e, "ref", { enumerable: !1, value: null })
            : Object.defineProperty(e, "ref", { enumerable: !1, get: l }),
          (e._store = {}),
          Object.defineProperty(e._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0,
          }),
          Object.defineProperty(e, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null,
          }),
          Object.defineProperty(e, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: i,
          }),
          Object.defineProperty(e, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: a,
          }),
          Object.freeze && (Object.freeze(e.props), Object.freeze(e)),
          e
        );
      }
      function d(e, n, i, o, l, d) {
        var p = n.children;
        if (p !== void 0)
          if (o)
            if (j(p)) {
              for (o = 0; o < p.length; o++) f(p[o]);
              Object.freeze && Object.freeze(p);
            } else
              console.error(
                `React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.`,
              );
          else f(p);
        if (A.call(n, `key`)) {
          p = t(e);
          var m = Object.keys(n).filter(function (e) {
            return e !== `key`;
          });
          ((o = 0 < m.length ? `{key: someKey, ` + m.join(`: ..., `) + `: ...}` : `{key: someKey}`),
            re[p + o] ||
              ((m = 0 < m.length ? `{` + m.join(`: ..., `) + `: ...}` : `{}`),
              console.error(
                `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
                o,
                p,
                m,
                p,
              ),
              (re[p + o] = !0)));
        }
        if (
          ((p = null),
          i !== void 0 && (r(i), (p = `` + i)),
          s(n) && (r(n.key), (p = `` + n.key)),
          `key` in n)
        )
          for (var h in ((i = {}), n)) h !== `key` && (i[h] = n[h]);
        else i = n;
        return (
          p && c(i, typeof e == `function` ? e.displayName || e.name || `Unknown` : e),
          u(e, p, i, a(), l, d)
        );
      }
      function f(e) {
        m(e)
          ? e._store && (e._store.validated = 1)
          : typeof e == `object` &&
            e &&
            e.$$typeof === D &&
            (e._payload.status === `fulfilled`
              ? m(e._payload.value) &&
                e._payload.value._store &&
                (e._payload.value._store.validated = 1)
              : e._store && (e._store.validated = 1));
      }
      function m(e) {
        return typeof e == `object` && !!e && e.$$typeof === g;
      }
      var h = p(),
        g = Symbol.for(`react.transitional.element`),
        _ = Symbol.for(`react.portal`),
        v = Symbol.for(`react.fragment`),
        y = Symbol.for(`react.strict_mode`),
        b = Symbol.for(`react.profiler`),
        x = Symbol.for(`react.consumer`),
        S = Symbol.for(`react.context`),
        C = Symbol.for(`react.forward_ref`),
        w = Symbol.for(`react.suspense`),
        T = Symbol.for(`react.suspense_list`),
        E = Symbol.for(`react.memo`),
        D = Symbol.for(`react.lazy`),
        O = Symbol.for(`react.activity`),
        ee = Symbol.for(`react.client.reference`),
        k = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
        A = Object.prototype.hasOwnProperty,
        j = Array.isArray,
        M = console.createTask
          ? console.createTask
          : function () {
              return null;
            };
      h = {
        react_stack_bottom_frame: function (e) {
          return e();
        },
      };
      var te,
        N = {},
        P = h.react_stack_bottom_frame.bind(h, o)(),
        ne = M(i(o)),
        re = {};
      ((e.Fragment = v),
        (e.jsx = function (e, t, n) {
          var r = 1e4 > k.recentlyCreatedOwnerStacks++;
          return d(e, t, n, !1, r ? Error(`react-stack-top-frame`) : P, r ? M(i(e)) : ne);
        }),
        (e.jsxs = function (e, t, n) {
          var r = 1e4 > k.recentlyCreatedOwnerStacks++;
          return d(e, t, n, !0, r ? Error(`react-stack-top-frame`) : P, r ? M(i(e)) : ne);
        }));
    })();
  }),
  _ = s((e, t) => {
    t.exports = g();
  }),
  v = _(),
  y = u(p(), 1),
  b = (0, y.createContext)({});
function x(e) {
  let t = (0, y.useRef)(null);
  return (t.current === null && (t.current = e()), t.current);
}
var S = typeof window < `u` ? y.useLayoutEffect : y.useEffect,
  C = (0, y.createContext)(null);
function w(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function T(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
var E = (e, t, n) => (n > t ? t : n < e ? e : n);
function D(e, t) {
  return t
    ? `${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}`
    : e;
}
var O = () => {},
  ee = () => {};
typeof process < `u` &&
  ((O = (e, t, n) => {
    !e && typeof console < `u` && console.warn(D(t, n));
  }),
  (ee = (e, t, n) => {
    if (!e) throw Error(D(t, n));
  }));
var k = {},
  A = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),
  j = (e) => typeof e == `object` && !!e,
  M = (e) => /^0[^.\s]+$/u.test(e);
function te(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
var N = (e) => e,
  P = (...e) => e.reduce((e, t) => (n) => t(e(n))),
  ne = (e, t, n) => {
    let r = t - e;
    return r ? (n - e) / r : 1;
  },
  re = class {
    constructor() {
      this.subscriptions = [];
    }
    add(e) {
      return (w(this.subscriptions, e), () => T(this.subscriptions, e));
    }
    notify(e, t, n) {
      let r = this.subscriptions.length;
      if (r)
        if (r === 1) this.subscriptions[0](e, t, n);
        else
          for (let i = 0; i < r; i++) {
            let r = this.subscriptions[i];
            r && r(e, t, n);
          }
    }
    getSize() {
      return this.subscriptions.length;
    }
    clear() {
      this.subscriptions.length = 0;
    }
  },
  F = (e) => e * 1e3,
  I = (e) => e / 1e3,
  L = (e, t) => (t ? (1e3 / t) * e : 0),
  R = new Set();
function ie(e, t, n) {
  e || R.has(t) || (console.warn(D(t, n)), R.add(t));
}
var ae = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  z = 1e-7,
  oe = 12;
function se(e, t, n, r, i) {
  let a,
    o,
    s = 0;
  do ((o = t + (n - t) / 2), (a = ae(o, r, i) - e), a > 0 ? (n = o) : (t = o));
  while (Math.abs(a) > z && ++s < oe);
  return o;
}
function ce(e, t, n, r) {
  if (e === t && n === r) return N;
  let i = (t) => se(t, 0, 1, e, n);
  return (e) => (e === 0 || e === 1 ? e : ae(i(e), t, r));
}
var le = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
  ue = (e) => (t) => 1 - e(1 - t),
  de = ce(0.33, 1.53, 0.69, 0.99),
  fe = ue(de),
  pe = le(fe),
  me = (e) => (e >= 1 ? 1 : (e *= 2) < 1 ? 0.5 * fe(e) : 0.5 * (2 - 2 ** (-10 * (e - 1)))),
  he = (e) => 1 - Math.sin(Math.acos(e)),
  B = ue(he),
  ge = le(he),
  _e = ce(0.42, 0, 1, 1),
  ve = ce(0, 0, 0.58, 1),
  ye = ce(0.42, 0, 0.58, 1),
  be = (e) => Array.isArray(e) && typeof e[0] != `number`,
  xe = (e) => Array.isArray(e) && typeof e[0] == `number`,
  Se = {
    linear: N,
    easeIn: _e,
    easeInOut: ye,
    easeOut: ve,
    circIn: he,
    circInOut: ge,
    circOut: B,
    backIn: fe,
    backInOut: pe,
    backOut: de,
    anticipate: me,
  },
  Ce = (e) => typeof e == `string`,
  we = (e) => {
    if (xe(e)) {
      ee(
        e.length === 4,
        `Cubic bezier arrays must contain four numerical values.`,
        `cubic-bezier-length`,
      );
      let [t, n, r, i] = e;
      return ce(t, n, r, i);
    } else if (Ce(e))
      return (ee(Se[e] !== void 0, `Invalid easing type '${e}'`, `invalid-easing-type`), Se[e]);
    return e;
  },
  Te = [
    `setup`,
    `read`,
    `resolveKeyframes`,
    `preUpdate`,
    `update`,
    `preRender`,
    `render`,
    `postRender`,
  ];
function Ee(e) {
  let t = new Set(),
    n = new Set(),
    r = !1,
    i = !1,
    a = new WeakSet(),
    o = { delta: 0, timestamp: 0, isProcessing: !1 };
  function s(t) {
    (a.has(t) && (c.schedule(t), e()), t(o));
  }
  let c = {
    schedule: (e, i = !1, o = !1) => {
      let s = o && r ? t : n;
      return (i && a.add(e), s.add(e), e);
    },
    cancel: (e) => {
      (n.delete(e), a.delete(e));
    },
    process: (e) => {
      if (((o = e), r)) {
        i = !0;
        return;
      }
      r = !0;
      let a = t;
      ((t = n), (n = a), t.forEach(s), t.clear(), (r = !1), i && ((i = !1), c.process(e)));
    },
  };
  return c;
}
var De = 40;
function Oe(e, t) {
  let n = !1,
    r = !0,
    i = { delta: 0, timestamp: 0, isProcessing: !1 },
    a = () => (n = !0),
    o = Te.reduce((e, t) => ((e[t] = Ee(a)), e), {}),
    {
      setup: s,
      read: c,
      resolveKeyframes: l,
      preUpdate: u,
      update: d,
      preRender: f,
      render: p,
      postRender: m,
    } = o,
    h = () => {
      let a = k.useManualTiming,
        o = a ? i.timestamp : performance.now();
      ((n = !1),
        a || (i.delta = r ? 1e3 / 60 : Math.max(Math.min(o - i.timestamp, De), 1)),
        (i.timestamp = o),
        (i.isProcessing = !0),
        s.process(i),
        c.process(i),
        l.process(i),
        u.process(i),
        d.process(i),
        f.process(i),
        p.process(i),
        m.process(i),
        (i.isProcessing = !1),
        n && t && ((r = !1), e(h)));
    },
    g = () => {
      ((n = !0), (r = !0), i.isProcessing || e(h));
    };
  return {
    schedule: Te.reduce((e, t) => {
      let r = o[t];
      return ((e[t] = (e, t = !1, i = !1) => (n || g(), r.schedule(e, t, i))), e);
    }, {}),
    cancel: (e) => {
      for (let t = 0; t < Te.length; t++) o[Te[t]].cancel(e);
    },
    state: i,
    steps: o,
  };
}
var {
    schedule: V,
    cancel: ke,
    state: H,
    steps: Ae,
  } = Oe(typeof requestAnimationFrame < `u` ? requestAnimationFrame : N, !0),
  je;
function Me() {
  je = void 0;
}
var Ne = {
    now: () => (
      je === void 0 &&
        Ne.set(H.isProcessing || k.useManualTiming ? H.timestamp : performance.now()),
      je
    ),
    set: (e) => {
      ((je = e), queueMicrotask(Me));
    },
  },
  Pe = (e) => (t) => typeof t == `string` && t.startsWith(e),
  Fe = Pe(`--`),
  Ie = Pe(`var(--`),
  Le = (e) => (Ie(e) ? Re.test(e.split(`/*`)[0].trim()) : !1),
  Re = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function ze(e) {
  return typeof e == `string` && e.split(`/*`)[0].includes(`var(--`);
}
var Be = { test: (e) => typeof e == `number`, parse: parseFloat, transform: (e) => e },
  Ve = { ...Be, transform: (e) => E(0, 1, e) },
  He = { ...Be, default: 1 },
  Ue = (e) => Math.round(e * 1e5) / 1e5,
  We = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Ge(e) {
  return e == null;
}
var Ke =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  qe = (e, t) => (n) =>
    !!(
      (typeof n == `string` && Ke.test(n) && n.startsWith(e)) ||
      (t && !Ge(n) && Object.prototype.hasOwnProperty.call(n, t))
    ),
  Je = (e, t, n) => (r) => {
    if (typeof r != `string`) return r;
    let [i, a, o, s] = r.match(We);
    return {
      [e]: parseFloat(i),
      [t]: parseFloat(a),
      [n]: parseFloat(o),
      alpha: s === void 0 ? 1 : parseFloat(s),
    };
  },
  Ye = (e) => E(0, 255, e),
  Xe = { ...Be, transform: (e) => Math.round(Ye(e)) },
  Ze = {
    test: qe(`rgb`, `red`),
    parse: Je(`red`, `green`, `blue`),
    transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
      `rgba(` +
      Xe.transform(e) +
      `, ` +
      Xe.transform(t) +
      `, ` +
      Xe.transform(n) +
      `, ` +
      Ue(Ve.transform(r)) +
      `)`,
  };
function Qe(e) {
  let t = ``,
    n = ``,
    r = ``,
    i = ``;
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)),
        (n = e.substring(3, 5)),
        (r = e.substring(5, 7)),
        (i = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (n = e.substring(2, 3)),
        (r = e.substring(3, 4)),
        (i = e.substring(4, 5)),
        (t += t),
        (n += n),
        (r += r),
        (i += i)),
    {
      red: parseInt(t, 16),
      green: parseInt(n, 16),
      blue: parseInt(r, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  );
}
var $e = { test: qe(`#`), parse: Qe, transform: Ze.transform },
  et = (e) => ({
    test: (t) => typeof t == `string` && t.endsWith(e) && t.split(` `).length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  tt = et(`deg`),
  nt = et(`%`),
  U = et(`px`),
  rt = et(`vh`),
  it = et(`vw`),
  at = { ...nt, parse: (e) => nt.parse(e) / 100, transform: (e) => nt.transform(e * 100) },
  ot = {
    test: qe(`hsl`, `hue`),
    parse: Je(`hue`, `saturation`, `lightness`),
    transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) =>
      `hsla(` +
      Math.round(e) +
      `, ` +
      nt.transform(Ue(t)) +
      `, ` +
      nt.transform(Ue(n)) +
      `, ` +
      Ue(Ve.transform(r)) +
      `)`,
  },
  W = {
    test: (e) => Ze.test(e) || $e.test(e) || ot.test(e),
    parse: (e) => (Ze.test(e) ? Ze.parse(e) : ot.test(e) ? ot.parse(e) : $e.parse(e)),
    transform: (e) =>
      typeof e == `string` ? e : e.hasOwnProperty(`red`) ? Ze.transform(e) : ot.transform(e),
    getAnimatableNone: (e) => {
      let t = W.parse(e);
      return ((t.alpha = 0), W.transform(t));
    },
  },
  st =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function ct(e) {
  return (
    isNaN(e) && typeof e == `string` && (e.match(We)?.length || 0) + (e.match(st)?.length || 0) > 0
  );
}
var lt = `number`,
  ut = `color`,
  dt = `var`,
  ft = `var(`,
  pt = "${}",
  mt =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ht(e) {
  let t = e.toString(),
    n = [],
    r = { color: [], number: [], var: [] },
    i = [],
    a = 0;
  return {
    values: n,
    split: t
      .replace(
        mt,
        (e) => (
          W.test(e)
            ? (r.color.push(a), i.push(ut), n.push(W.parse(e)))
            : e.startsWith(ft)
              ? (r.var.push(a), i.push(dt), n.push(e))
              : (r.number.push(a), i.push(lt), n.push(parseFloat(e))),
          ++a,
          pt
        ),
      )
      .split(pt),
    indexes: r,
    types: i,
  };
}
function gt(e) {
  return ht(e).values;
}
function _t({ split: e, types: t }) {
  let n = e.length;
  return (r) => {
    let i = ``;
    for (let a = 0; a < n; a++)
      if (((i += e[a]), r[a] !== void 0)) {
        let e = t[a];
        e === lt ? (i += Ue(r[a])) : e === ut ? (i += W.transform(r[a])) : (i += r[a]);
      }
    return i;
  };
}
function vt(e) {
  return _t(ht(e));
}
var yt = (e) => (typeof e == `number` ? 0 : W.test(e) ? W.getAnimatableNone(e) : e),
  bt = (e, t) => (typeof e == `number` ? (t?.trim().endsWith(`/`) ? e : 0) : yt(e));
function xt(e) {
  let t = ht(e);
  return _t(t)(t.values.map((e, n) => bt(e, t.split[n])));
}
var St = { test: ct, parse: gt, createTransformer: vt, getAnimatableNone: xt };
function Ct(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && --n,
    n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
  );
}
function wt({ hue: e, saturation: t, lightness: n, alpha: r }) {
  ((e /= 360), (t /= 100), (n /= 100));
  let i = 0,
    a = 0,
    o = 0;
  if (!t) i = a = o = n;
  else {
    let r = n < 0.5 ? n * (1 + t) : n + t - n * t,
      s = 2 * n - r;
    ((i = Ct(s, r, e + 1 / 3)), (a = Ct(s, r, e)), (o = Ct(s, r, e - 1 / 3)));
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(a * 255),
    blue: Math.round(o * 255),
    alpha: r,
  };
}
function Tt(e, t) {
  return (n) => (n > 0 ? t : e);
}
var G = (e, t, n) => e + (t - e) * n,
  Et = (e, t, n) => {
    let r = e * e,
      i = n * (t * t - r) + r;
    return i < 0 ? 0 : Math.sqrt(i);
  },
  Dt = [$e, Ze, ot],
  Ot = (e) => Dt.find((t) => t.test(e));
function kt(e) {
  let t = Ot(e);
  if (
    (O(
      !!t,
      `'${e}' is not an animatable color. Use the equivalent color code instead.`,
      `color-not-animatable`,
    ),
    !t)
  )
    return !1;
  let n = t.parse(e);
  return (t === ot && (n = wt(n)), n);
}
var At = (e, t) => {
    let n = kt(e),
      r = kt(t);
    if (!n || !r) return Tt(e, t);
    let i = { ...n };
    return (e) => (
      (i.red = Et(n.red, r.red, e)),
      (i.green = Et(n.green, r.green, e)),
      (i.blue = Et(n.blue, r.blue, e)),
      (i.alpha = G(n.alpha, r.alpha, e)),
      Ze.transform(i)
    );
  },
  jt = new Set([`none`, `hidden`]);
function Mt(e, t) {
  return jt.has(e) ? (n) => (n <= 0 ? e : t) : (n) => (n >= 1 ? t : e);
}
function Nt(e, t) {
  return (n) => G(e, t, n);
}
function Pt(e) {
  return typeof e == `number`
    ? Nt
    : typeof e == `string`
      ? Le(e)
        ? Tt
        : W.test(e)
          ? At
          : Rt
      : Array.isArray(e)
        ? Ft
        : typeof e == `object`
          ? W.test(e)
            ? At
            : It
          : Tt;
}
function Ft(e, t) {
  let n = [...e],
    r = n.length,
    i = e.map((e, n) => Pt(e)(e, t[n]));
  return (e) => {
    for (let t = 0; t < r; t++) n[t] = i[t](e);
    return n;
  };
}
function It(e, t) {
  let n = { ...e, ...t },
    r = {};
  for (let i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = Pt(e[i])(e[i], t[i]));
  return (e) => {
    for (let t in r) n[t] = r[t](e);
    return n;
  };
}
function Lt(e, t) {
  let n = [],
    r = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < t.values.length; i++) {
    let a = t.types[i],
      o = e.indexes[a][r[a]];
    ((n[i] = e.values[o] ?? 0), r[a]++);
  }
  return n;
}
var Rt = (e, t) => {
  let n = St.createTransformer(t),
    r = ht(e),
    i = ht(t);
  return r.indexes.var.length === i.indexes.var.length &&
    r.indexes.color.length === i.indexes.color.length &&
    r.indexes.number.length >= i.indexes.number.length
    ? (jt.has(e) && !i.values.length) || (jt.has(t) && !r.values.length)
      ? Mt(e, t)
      : P(Ft(Lt(r, i), i.values), n)
    : (O(
        !0,
        `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,
        `complex-values-different`,
      ),
      Tt(e, t));
};
function zt(e, t, n) {
  return typeof e == `number` && typeof t == `number` && typeof n == `number`
    ? G(e, t, n)
    : Pt(e)(e, t);
}
var Bt = (e) => {
    let t = ({ timestamp: t }) => e(t);
    return {
      start: (e = !0) => V.update(t, e),
      stop: () => ke(t),
      now: () => (H.isProcessing ? H.timestamp : Ne.now()),
    };
  },
  Vt = (e, t, n = 10) => {
    let r = ``,
      i = Math.max(Math.round(t / n), 2);
    for (let t = 0; t < i; t++) r += Math.round(e(t / (i - 1)) * 1e4) / 1e4 + `, `;
    return `linear(${r.substring(0, r.length - 2)})`;
  },
  Ht = 2e4;
function Ut(e) {
  let t = 0,
    n = e.next(t);
  for (; !n.done && t < 2e4;) ((t += 50), (n = e.next(t)));
  return t >= 2e4 ? 1 / 0 : t;
}
function Wt(e, t = 100, n) {
  let r = n({ ...e, keyframes: [0, t] }),
    i = Math.min(Ut(r), Ht);
  return { type: `keyframes`, ease: (e) => r.next(i * e).value / t, duration: I(i) };
}
var K = {
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  duration: 800,
  bounce: 0.3,
  visualDuration: 0.3,
  restSpeed: { granular: 0.01, default: 2 },
  restDelta: { granular: 0.005, default: 0.5 },
  minDuration: 0.01,
  maxDuration: 10,
  minDamping: 0.05,
  maxDamping: 1,
};
function Gt(e, t) {
  return e * Math.sqrt(1 - t * t);
}
var Kt = 12;
function qt(e, t, n) {
  let r = n;
  for (let n = 1; n < Kt; n++) r -= e(r) / t(r);
  return r;
}
var Jt = 0.001;
function Yt({
  duration: e = K.duration,
  bounce: t = K.bounce,
  velocity: n = K.velocity,
  mass: r = K.mass,
}) {
  let i, a;
  O(e <= F(K.maxDuration), `Spring duration must be 10 seconds or less`, `spring-duration-limit`);
  let o = 1 - t;
  ((o = E(K.minDamping, K.maxDamping, o)),
    (e = E(K.minDuration, K.maxDuration, I(e))),
    o < 1
      ? ((i = (t) => {
          let r = t * o,
            i = r * e,
            a = r - n,
            s = Gt(t, o),
            c = Math.exp(-i);
          return Jt - (a / s) * c;
        }),
        (a = (t) => {
          let r = t * o * e,
            a = r * n + n,
            s = o ** 2 * t ** 2 * e,
            c = Math.exp(-r),
            l = Gt(t ** 2, o);
          return ((-i(t) + Jt > 0 ? -1 : 1) * ((a - s) * c)) / l;
        }))
      : ((i = (t) => -0.001 + Math.exp(-t * e) * ((t - n) * e + 1)),
        (a = (t) => Math.exp(-t * e) * ((n - t) * (e * e)))));
  let s = 5 / e,
    c = qt(i, a, s);
  if (((e = F(e)), isNaN(c))) return { stiffness: K.stiffness, damping: K.damping, duration: e };
  {
    let t = c ** 2 * r;
    return { stiffness: t, damping: o * 2 * Math.sqrt(r * t), duration: e };
  }
}
var Xt = [`duration`, `bounce`],
  Zt = [`stiffness`, `damping`, `mass`];
function Qt(e, t) {
  return t.some((t) => e[t] !== void 0);
}
function $t(e) {
  let t = {
    velocity: K.velocity,
    stiffness: K.stiffness,
    damping: K.damping,
    mass: K.mass,
    isResolvedFromDuration: !1,
    ...e,
  };
  if (!Qt(e, Zt) && Qt(e, Xt))
    if (((t.velocity = 0), e.visualDuration)) {
      let n = e.visualDuration,
        r = (2 * Math.PI) / (n * 1.2),
        i = r * r,
        a = 2 * E(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
      t = { ...t, mass: K.mass, stiffness: i, damping: a };
    } else {
      let n = Yt({ ...e, velocity: 0 });
      ((t = { ...t, ...n, mass: K.mass }), (t.isResolvedFromDuration = !0));
    }
  return t;
}
function en(e = K.visualDuration, t = K.bounce) {
  let n = typeof e == `object` ? e : { visualDuration: e, keyframes: [0, 1], bounce: t },
    { restSpeed: r, restDelta: i } = n,
    a = n.keyframes[0],
    o = n.keyframes[n.keyframes.length - 1],
    s = { done: !1, value: a },
    {
      stiffness: c,
      damping: l,
      mass: u,
      duration: d,
      velocity: f,
      isResolvedFromDuration: p,
    } = $t({ ...n, velocity: -I(n.velocity || 0) }),
    m = f || 0,
    h = l / (2 * Math.sqrt(c * u)),
    g = o - a,
    _ = I(Math.sqrt(c / u)),
    v = Math.abs(g) < 5;
  ((r ||= v ? K.restSpeed.granular : K.restSpeed.default),
    (i ||= v ? K.restDelta.granular : K.restDelta.default));
  let y, b, x, S, C, w;
  if (h < 1)
    ((x = Gt(_, h)),
      (S = (m + h * _ * g) / x),
      (y = (e) => {
        let t = Math.exp(-h * _ * e);
        return o - t * (S * Math.sin(x * e) + g * Math.cos(x * e));
      }),
      (C = h * _ * S + g * x),
      (w = h * _ * g - S * x),
      (b = (e) => Math.exp(-h * _ * e) * (C * Math.sin(x * e) + w * Math.cos(x * e))));
  else if (h === 1) {
    y = (e) => o - Math.exp(-_ * e) * (g + (m + _ * g) * e);
    let e = m + _ * g;
    b = (t) => Math.exp(-_ * t) * (_ * e * t - m);
  } else {
    let e = _ * Math.sqrt(h * h - 1);
    y = (t) => {
      let n = Math.exp(-h * _ * t),
        r = Math.min(e * t, 300);
      return o - (n * ((m + h * _ * g) * Math.sinh(r) + e * g * Math.cosh(r))) / e;
    };
    let t = (m + h * _ * g) / e,
      n = h * _ * t - g * e,
      r = h * _ * g - t * e;
    b = (t) => {
      let i = Math.exp(-h * _ * t),
        a = Math.min(e * t, 300);
      return i * (n * Math.sinh(a) + r * Math.cosh(a));
    };
  }
  let T = {
    calculatedDuration: (p && d) || null,
    velocity: (e) => F(b(e)),
    next: (e) => {
      if (!p && h < 1) {
        let t = Math.exp(-h * _ * e),
          n = Math.sin(x * e),
          a = Math.cos(x * e),
          c = o - t * (S * n + g * a),
          l = F(t * (C * n + w * a));
        return ((s.done = Math.abs(l) <= r && Math.abs(o - c) <= i), (s.value = s.done ? o : c), s);
      }
      let t = y(e);
      if (p) s.done = e >= d;
      else {
        let n = F(b(e));
        s.done = Math.abs(n) <= r && Math.abs(o - t) <= i;
      }
      return ((s.value = s.done ? o : t), s);
    },
    toString: () => {
      let e = Math.min(Ut(T), Ht),
        t = Vt((t) => T.next(e * t).value, e, 30);
      return e + `ms ` + t;
    },
    toTransition: () => {},
  };
  return T;
}
en.applyToOptions = (e) => {
  let t = Wt(e, 100, en);
  return ((e.ease = t.ease), (e.duration = F(t.duration)), (e.type = `keyframes`), e);
};
var tn = 5;
function nn(e, t, n) {
  let r = Math.max(t - tn, 0);
  return L(n - e(r), t - r);
}
function rn({
  keyframes: e,
  velocity: t = 0,
  power: n = 0.8,
  timeConstant: r = 325,
  bounceDamping: i = 10,
  bounceStiffness: a = 500,
  modifyTarget: o,
  min: s,
  max: c,
  restDelta: l = 0.5,
  restSpeed: u,
}) {
  let d = e[0],
    f = { done: !1, value: d },
    p = (e) => (s !== void 0 && e < s) || (c !== void 0 && e > c),
    m = (e) => (s === void 0 ? c : c === void 0 || Math.abs(s - e) < Math.abs(c - e) ? s : c),
    h = n * t,
    g = d + h,
    _ = o === void 0 ? g : o(g);
  _ !== g && (h = _ - d);
  let v = (e) => -h * Math.exp(-e / r),
    y = (e) => _ + v(e),
    b = (e) => {
      let t = v(e),
        n = y(e);
      ((f.done = Math.abs(t) <= l), (f.value = f.done ? _ : n));
    },
    x,
    S,
    C = (e) => {
      p(f.value) &&
        ((x = e),
        (S = en({
          keyframes: [f.value, m(f.value)],
          velocity: nn(y, e, f.value),
          damping: i,
          stiffness: a,
          restDelta: l,
          restSpeed: u,
        })));
    };
  return (
    C(0),
    {
      calculatedDuration: null,
      next: (e) => {
        let t = !1;
        return (
          !S && x === void 0 && ((t = !0), b(e), C(e)),
          x !== void 0 && e >= x ? S.next(e - x) : (!t && b(e), f)
        );
      },
    }
  );
}
function an(e, t, n) {
  let r = [],
    i = n || k.mix || zt,
    a = e.length - 1;
  for (let n = 0; n < a; n++) {
    let a = i(e[n], e[n + 1]);
    (t && (a = P(Array.isArray(t) ? t[n] || N : t, a)), r.push(a));
  }
  return r;
}
function on(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
  let a = e.length;
  if (
    (ee(a === t.length, `Both input and output ranges must be the same length`, `range-length`),
    a === 1)
  )
    return () => t[0];
  if (a === 2 && t[0] === t[1]) return () => t[1];
  let o = e[0] === e[1];
  e[0] > e[a - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
  let s = an(t, r, i),
    c = s.length,
    l = (n) => {
      if (o && n < e[0]) return t[0];
      let r = 0;
      if (c > 1) for (; r < e.length - 2 && !(n < e[r + 1]); r++);
      let i = ne(e[r], e[r + 1], n);
      return s[r](i);
    };
  return n ? (t) => l(E(e[0], e[a - 1], t)) : l;
}
function sn(e, t) {
  let n = e[e.length - 1];
  for (let r = 1; r <= t; r++) {
    let i = ne(0, t, r);
    e.push(G(n, 1, i));
  }
}
function cn(e) {
  let t = [0];
  return (sn(t, e.length - 1), t);
}
function ln(e, t) {
  return e.map((e) => e * t);
}
function un(e, t) {
  return e.map(() => t || ye).splice(0, e.length - 1);
}
function dn({ duration: e = 300, keyframes: t, times: n, ease: r = `easeInOut` }) {
  let i = be(r) ? r.map(we) : we(r),
    a = { done: !1, value: t[0] },
    o = on(ln(n && n.length === t.length ? n : cn(t), e), t, {
      ease: Array.isArray(i) ? i : un(t, i),
    });
  return { calculatedDuration: e, next: (t) => ((a.value = o(t)), (a.done = t >= e), a) };
}
var fn = (e) => e !== null;
function pn(e, { repeat: t, repeatType: n = `loop` }, r, i = 1) {
  let a = e.filter(fn),
    o = i < 0 || (t && n !== `loop` && t % 2 == 1) ? 0 : a.length - 1;
  return !o || r === void 0 ? a[o] : r;
}
var mn = { decay: rn, inertia: rn, tween: dn, keyframes: dn, spring: en };
function hn(e) {
  typeof e.type == `string` && (e.type = mn[e.type]);
}
var gn = class {
    constructor() {
      this.updateFinished();
    }
    get finished() {
      return this._finished;
    }
    updateFinished() {
      this._finished = new Promise((e) => {
        this.resolve = e;
      });
    }
    notifyFinished() {
      this.resolve();
    }
    then(e, t) {
      return this.finished.then(e, t);
    }
  },
  _n = (e) => e / 100,
  vn = class extends gn {
    constructor(e) {
      (super(),
        (this.state = `idle`),
        (this.startTime = null),
        (this.isStopped = !1),
        (this.currentTime = 0),
        (this.holdTime = null),
        (this.playbackSpeed = 1),
        (this.delayState = { done: !1, value: void 0 }),
        (this.stop = () => {
          let { motionValue: e } = this.options;
          (e && e.updatedAt !== Ne.now() && this.tick(Ne.now()),
            (this.isStopped = !0),
            this.state !== `idle` && (this.teardown(), this.options.onStop?.()));
        }),
        (this.options = e),
        this.initAnimation(),
        this.play(),
        e.autoplay === !1 && this.pause());
    }
    initAnimation() {
      let { options: e } = this;
      hn(e);
      let { type: t = dn, repeat: n = 0, repeatDelay: r = 0, repeatType: i, velocity: a = 0 } = e,
        { keyframes: o } = e,
        s = t || dn;
      (s !== dn &&
        ee(
          o.length <= 2,
          `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${o}`,
          `spring-two-frames`,
        ),
        s !== dn &&
          typeof o[0] != `number` &&
          ((this.mixKeyframes = P(_n, zt(o[0], o[1]))), (o = [0, 100])));
      let c = s({ ...e, keyframes: o });
      (i === `mirror` &&
        (this.mirroredGenerator = s({ ...e, keyframes: [...o].reverse(), velocity: -a })),
        c.calculatedDuration === null && (c.calculatedDuration = Ut(c)));
      let { calculatedDuration: l } = c;
      ((this.calculatedDuration = l),
        (this.resolvedDuration = l + r),
        (this.totalDuration = this.resolvedDuration * (n + 1) - r),
        (this.generator = c));
    }
    updateTime(e) {
      let t = Math.round(e - this.startTime) * this.playbackSpeed;
      this.holdTime === null ? (this.currentTime = t) : (this.currentTime = this.holdTime);
    }
    tick(e, t = !1) {
      let {
        generator: n,
        totalDuration: r,
        mixKeyframes: i,
        mirroredGenerator: a,
        resolvedDuration: o,
        calculatedDuration: s,
      } = this;
      if (this.startTime === null) return n.next(0);
      let {
        delay: c = 0,
        keyframes: l,
        repeat: u,
        repeatType: d,
        repeatDelay: f,
        type: p,
        onUpdate: m,
        finalKeyframe: h,
      } = this.options;
      (this.speed > 0
        ? (this.startTime = Math.min(this.startTime, e))
        : this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)),
        t ? (this.currentTime = e) : this.updateTime(e));
      let g = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1),
        _ = this.playbackSpeed >= 0 ? g < 0 : g > r;
      ((this.currentTime = Math.max(g, 0)),
        this.state === `finished` && this.holdTime === null && (this.currentTime = r));
      let v = this.currentTime,
        y = n;
      if (u) {
        let e = Math.min(this.currentTime, r) / o,
          t = Math.floor(e),
          n = e % 1;
        (!n && e >= 1 && (n = 1),
          n === 1 && t--,
          (t = Math.min(t, u + 1)),
          t % 2 && (d === `reverse` ? ((n = 1 - n), f && (n -= f / o)) : d === `mirror` && (y = a)),
          (v = E(0, 1, n) * o));
      }
      let b;
      (_ ? ((this.delayState.value = l[0]), (b = this.delayState)) : (b = y.next(v)),
        i && !_ && (b.value = i(b.value)));
      let { done: x } = b;
      !_ &&
        s !== null &&
        (x = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
      let S =
        this.holdTime === null && (this.state === `finished` || (this.state === `running` && x));
      return (
        S && p !== rn && (b.value = pn(l, this.options, h, this.speed)),
        m && m(b.value),
        S && this.finish(),
        b
      );
    }
    then(e, t) {
      return this.finished.then(e, t);
    }
    get duration() {
      return I(this.calculatedDuration);
    }
    get iterationDuration() {
      let { delay: e = 0 } = this.options || {};
      return this.duration + I(e);
    }
    get time() {
      return I(this.currentTime);
    }
    set time(e) {
      ((e = F(e)),
        (this.currentTime = e),
        this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0
          ? (this.holdTime = e)
          : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed),
        this.driver
          ? this.driver.start(!1)
          : ((this.startTime = 0), (this.state = `paused`), (this.holdTime = e), this.tick(e)));
    }
    getGeneratorVelocity() {
      let e = this.currentTime;
      if (e <= 0) return this.options.velocity || 0;
      if (this.generator.velocity) return this.generator.velocity(e);
      let t = this.generator.next(e).value;
      return nn((e) => this.generator.next(e).value, e, t);
    }
    get speed() {
      return this.playbackSpeed;
    }
    set speed(e) {
      let t = this.playbackSpeed !== e;
      (t && this.driver && this.updateTime(Ne.now()),
        (this.playbackSpeed = e),
        t && this.driver && (this.time = I(this.currentTime)));
    }
    play() {
      if (this.isStopped) return;
      let { driver: e = Bt, startTime: t } = this.options;
      ((this.driver ||= e((e) => this.tick(e))), this.options.onPlay?.());
      let n = this.driver.now();
      (this.state === `finished`
        ? (this.updateFinished(), (this.startTime = n))
        : this.holdTime === null
          ? (this.startTime ||= t ?? n)
          : (this.startTime = n - this.holdTime),
        this.state === `finished` && this.speed < 0 && (this.startTime += this.calculatedDuration),
        (this.holdTime = null),
        (this.state = `running`),
        this.driver.start());
    }
    pause() {
      ((this.state = `paused`), this.updateTime(Ne.now()), (this.holdTime = this.currentTime));
    }
    complete() {
      (this.state !== `running` && this.play(), (this.state = `finished`), (this.holdTime = null));
    }
    finish() {
      (this.notifyFinished(),
        this.teardown(),
        (this.state = `finished`),
        this.options.onComplete?.());
    }
    cancel() {
      ((this.holdTime = null),
        (this.startTime = 0),
        this.tick(0),
        this.teardown(),
        this.options.onCancel?.());
    }
    teardown() {
      ((this.state = `idle`), this.stopDriver(), (this.startTime = this.holdTime = null));
    }
    stopDriver() {
      this.driver &&= (this.driver.stop(), void 0);
    }
    sample(e) {
      return ((this.startTime = 0), this.tick(e, !0));
    }
    attachTimeline(e) {
      return (
        this.options.allowFlatten &&
          ((this.options.type = `keyframes`), (this.options.ease = `linear`), this.initAnimation()),
        this.driver?.stop(),
        e.observe(this)
      );
    }
  };
function yn(e) {
  for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
var bn = (e) => (e * 180) / Math.PI,
  xn = (e) => Cn(bn(Math.atan2(e[1], e[0]))),
  Sn = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
    rotate: xn,
    rotateZ: xn,
    skewX: (e) => bn(Math.atan(e[1])),
    skewY: (e) => bn(Math.atan(e[2])),
    skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2,
  },
  Cn = (e) => ((e %= 360), e < 0 && (e += 360), e),
  wn = xn,
  Tn = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]),
  En = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]),
  Dn = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: Tn,
    scaleY: En,
    scale: (e) => (Tn(e) + En(e)) / 2,
    rotateX: (e) => Cn(bn(Math.atan2(e[6], e[5]))),
    rotateY: (e) => Cn(bn(Math.atan2(-e[2], e[0]))),
    rotateZ: wn,
    rotate: wn,
    skewX: (e) => bn(Math.atan(e[4])),
    skewY: (e) => bn(Math.atan(e[1])),
    skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2,
  };
function On(e) {
  return +!!e.includes(`scale`);
}
function kn(e, t) {
  if (!e || e === `none`) return On(t);
  let n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u),
    r,
    i;
  if (n) ((r = Dn), (i = n));
  else {
    let t = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    ((r = Sn), (i = t));
  }
  if (!i) return On(t);
  let a = r[t],
    o = i[1].split(`,`).map(jn);
  return typeof a == `function` ? a(o) : o[a];
}
var An = (e, t) => {
  let { transform: n = `none` } = getComputedStyle(e);
  return kn(n, t);
};
function jn(e) {
  return parseFloat(e.trim());
}
var Mn = [
    `transformPerspective`,
    `x`,
    `y`,
    `z`,
    `translateX`,
    `translateY`,
    `translateZ`,
    `scale`,
    `scaleX`,
    `scaleY`,
    `rotate`,
    `rotateX`,
    `rotateY`,
    `rotateZ`,
    `skew`,
    `skewX`,
    `skewY`,
  ],
  Nn = new Set([...Mn, `pathRotation`]),
  Pn = (e) => e === Be || e === U,
  Fn = new Set([`x`, `y`, `z`]),
  In = Mn.filter((e) => !Fn.has(e));
function Ln(e) {
  let t = [];
  return (
    In.forEach((n) => {
      let r = e.getValue(n);
      r !== void 0 && (t.push([n, r.get()]), r.set(+!!n.startsWith(`scale`)));
    }),
    t
  );
}
var Rn = {
  width: ({ x: e }, { paddingLeft: t = `0`, paddingRight: n = `0`, boxSizing: r }) => {
    let i = e.max - e.min;
    return r === `border-box` ? i : i - parseFloat(t) - parseFloat(n);
  },
  height: ({ y: e }, { paddingTop: t = `0`, paddingBottom: n = `0`, boxSizing: r }) => {
    let i = e.max - e.min;
    return r === `border-box` ? i : i - parseFloat(t) - parseFloat(n);
  },
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  x: (e, { transform: t }) => kn(t, `x`),
  y: (e, { transform: t }) => kn(t, `y`),
};
((Rn.translateX = Rn.x), (Rn.translateY = Rn.y));
var zn = new Set(),
  Bn = !1,
  Vn = !1,
  Hn = !1;
function Un() {
  if (Vn) {
    let e = Array.from(zn).filter((e) => e.needsMeasurement),
      t = new Set(e.map((e) => e.element)),
      n = new Map();
    (t.forEach((e) => {
      let t = Ln(e);
      t.length && (n.set(e, t), e.render());
    }),
      e.forEach((e) => e.measureInitialState()),
      t.forEach((e) => {
        e.render();
        let t = n.get(e);
        t &&
          t.forEach(([t, n]) => {
            e.getValue(t)?.set(n);
          });
      }),
      e.forEach((e) => e.measureEndState()),
      e.forEach((e) => {
        e.suspendedScrollY !== void 0 && window.scrollTo(0, e.suspendedScrollY);
      }));
  }
  ((Vn = !1), (Bn = !1), zn.forEach((e) => e.complete(Hn)), zn.clear());
}
function Wn() {
  zn.forEach((e) => {
    (e.readKeyframes(), e.needsMeasurement && (Vn = !0));
  });
}
function Gn() {
  ((Hn = !0), Wn(), Un(), (Hn = !1));
}
var Kn = class {
    constructor(e, t, n, r, i, a = !1) {
      ((this.state = `pending`),
        (this.isAsync = !1),
        (this.needsMeasurement = !1),
        (this.unresolvedKeyframes = [...e]),
        (this.onComplete = t),
        (this.name = n),
        (this.motionValue = r),
        (this.element = i),
        (this.isAsync = a));
    }
    scheduleResolve() {
      ((this.state = `scheduled`),
        this.isAsync
          ? (zn.add(this), Bn || ((Bn = !0), V.read(Wn), V.resolveKeyframes(Un)))
          : (this.readKeyframes(), this.complete()));
    }
    readKeyframes() {
      let { unresolvedKeyframes: e, name: t, element: n, motionValue: r } = this;
      if (e[0] === null) {
        let i = r?.get(),
          a = e[e.length - 1];
        if (i !== void 0) e[0] = i;
        else if (n && t) {
          let r = n.readValue(t, a);
          r != null && (e[0] = r);
        }
        (e[0] === void 0 && (e[0] = a), r && i === void 0 && r.set(e[0]));
      }
      yn(e);
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete(e = !1) {
      ((this.state = `complete`),
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e),
        zn.delete(this));
    }
    cancel() {
      this.state === `scheduled` && (zn.delete(this), (this.state = `pending`));
    }
    resume() {
      this.state === `pending` && this.scheduleResolve();
    }
  },
  qn = (e) => e.startsWith(`--`);
function Jn(e, t, n) {
  qn(t) ? e.style.setProperty(t, n) : (e.style[t] = n);
}
var Yn = {};
function Xn(e, t) {
  let n = te(e);
  return () => Yn[t] ?? n();
}
var Zn = Xn(() => window.ScrollTimeline !== void 0, `scrollTimeline`),
  Qn = Xn(() => {
    try {
      document.createElement(`div`).animate({ opacity: 0 }, { easing: `linear(0, 1)` });
    } catch {
      return !1;
    }
    return !0;
  }, `linearEasing`),
  $n = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
  er = {
    linear: `linear`,
    ease: `ease`,
    easeIn: `ease-in`,
    easeOut: `ease-out`,
    easeInOut: `ease-in-out`,
    circIn: $n([0, 0.65, 0.55, 1]),
    circOut: $n([0.55, 0, 1, 0.45]),
    backIn: $n([0.31, 0.01, 0.66, -0.59]),
    backOut: $n([0.33, 1.53, 0.69, 0.99]),
  };
function tr(e, t) {
  if (e)
    return typeof e == `function`
      ? Qn()
        ? Vt(e, t)
        : `ease-out`
      : xe(e)
        ? $n(e)
        : Array.isArray(e)
          ? e.map((e) => tr(e, t) || er.easeOut)
          : er[e];
}
function nr(
  e,
  t,
  n,
  {
    delay: r = 0,
    duration: i = 300,
    repeat: a = 0,
    repeatType: o = `loop`,
    ease: s = `easeOut`,
    times: c,
  } = {},
  l = void 0,
) {
  let u = { [t]: n };
  c && (u.offset = c);
  let d = tr(s, i);
  Array.isArray(d) && (u.easing = d);
  let f = {
    delay: r,
    duration: i,
    easing: Array.isArray(d) ? `linear` : d,
    fill: `both`,
    iterations: a + 1,
    direction: o === `reverse` ? `alternate` : `normal`,
  };
  return (l && (f.pseudoElement = l), e.animate(u, f));
}
function rr(e) {
  return typeof e == `function` && `applyToOptions` in e;
}
function ir({ type: e, ...t }) {
  return rr(e) && Qn() ? e.applyToOptions(t) : ((t.duration ??= 300), (t.ease ??= `easeOut`), t);
}
var ar = class extends gn {
    constructor(e) {
      if (
        (super(),
        (this.finishedTime = null),
        (this.isStopped = !1),
        (this.manualStartTime = null),
        !e)
      )
        return;
      let {
        element: t,
        name: n,
        keyframes: r,
        pseudoElement: i,
        allowFlatten: a = !1,
        finalKeyframe: o,
        onComplete: s,
      } = e;
      ((this.isPseudoElement = !!i),
        (this.allowFlatten = a),
        (this.options = e),
        ee(
          typeof e.type != `string`,
          `Mini animate() doesn't support "type" as a string.`,
          `mini-spring`,
        ));
      let c = ir(e);
      ((this.animation = nr(t, n, r, c, i)),
        c.autoplay === !1 && this.animation.pause(),
        (this.animation.onfinish = () => {
          if (((this.finishedTime = this.time), !i)) {
            let e = pn(r, this.options, o, this.speed);
            (this.updateMotionValue && this.updateMotionValue(e),
              Jn(t, n, e),
              this.animation.cancel());
          }
          (s?.(), this.notifyFinished());
        }));
    }
    play() {
      this.isStopped ||
        ((this.manualStartTime = null),
        this.animation.play(),
        this.state === `finished` && this.updateFinished());
    }
    pause() {
      this.animation.pause();
    }
    complete() {
      this.animation.finish?.();
    }
    cancel() {
      try {
        this.animation.cancel();
      } catch {}
    }
    stop() {
      if (this.isStopped) return;
      this.isStopped = !0;
      let { state: e } = this;
      e === `idle` ||
        e === `finished` ||
        (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
        this.isPseudoElement || this.cancel());
    }
    commitStyles() {
      let e = this.options?.element;
      !this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
    }
    get duration() {
      let e = this.animation.effect?.getComputedTiming?.().duration || 0;
      return I(Number(e));
    }
    get iterationDuration() {
      let { delay: e = 0 } = this.options || {};
      return this.duration + I(e);
    }
    get time() {
      return I(Number(this.animation.currentTime) || 0);
    }
    set time(e) {
      let t = this.finishedTime !== null;
      ((this.manualStartTime = null),
        (this.finishedTime = null),
        (this.animation.currentTime = F(e)),
        t && this.animation.pause());
    }
    get speed() {
      return this.animation.playbackRate;
    }
    set speed(e) {
      (e < 0 && (this.finishedTime = null), (this.animation.playbackRate = e));
    }
    get state() {
      return this.finishedTime === null ? this.animation.playState : `finished`;
    }
    get startTime() {
      return this.manualStartTime ?? Number(this.animation.startTime);
    }
    set startTime(e) {
      this.manualStartTime = this.animation.startTime = e;
    }
    attachTimeline({ timeline: e, rangeStart: t, rangeEnd: n, observe: r }) {
      return (
        this.allowFlatten && this.animation.effect?.updateTiming({ easing: `linear` }),
        (this.animation.onfinish = null),
        e && Zn()
          ? ((this.animation.timeline = e),
            t && (this.animation.rangeStart = t),
            n && (this.animation.rangeEnd = n),
            N)
          : r(this)
      );
    }
  },
  or = { anticipate: me, backInOut: pe, circInOut: ge };
function sr(e) {
  return e in or;
}
function cr(e) {
  typeof e.ease == `string` && sr(e.ease) && (e.ease = or[e.ease]);
}
var lr = 10,
  ur = class extends ar {
    constructor(e) {
      (cr(e),
        hn(e),
        super(e),
        e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime),
        (this.options = e));
    }
    updateMotionValue(e) {
      let { motionValue: t, onUpdate: n, onComplete: r, element: i, ...a } = this.options;
      if (!t) return;
      if (e !== void 0) {
        t.set(e);
        return;
      }
      let o = new vn({ ...a, autoplay: !1 }),
        s = Math.max(lr, Ne.now() - this.startTime),
        c = E(0, lr, s - lr),
        l = o.sample(s).value,
        { name: u } = this.options;
      (i && u && Jn(i, u, l),
        t.setWithVelocity(o.sample(Math.max(0, s - c)).value, l, c),
        o.stop());
    }
  },
  dr = (e, t) =>
    t !== `zIndex` &&
    !!(
      typeof e == `number` ||
      Array.isArray(e) ||
      (typeof e == `string` && (St.test(e) || e === `0`) && !e.startsWith(`url(`))
    );
function fr(e) {
  let t = e[0];
  if (e.length === 1) return !0;
  for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function pr(e, t, n, r) {
  let i = e[0];
  if (i === null) return !1;
  if (t === `display` || t === `visibility`) return !0;
  let a = e[e.length - 1],
    o = dr(i, t),
    s = dr(a, t);
  return (
    O(
      o === s,
      `You are trying to animate ${t} from "${i}" to "${a}". "${o ? a : i}" is not an animatable value.`,
      `value-not-animatable`,
    ),
    !o || !s ? !1 : fr(e) || ((n === `spring` || rr(n)) && r)
  );
}
function mr(e) {
  ((e.duration = 0), (e.type = `keyframes`));
}
var hr = new Set([`opacity`, `clipPath`, `filter`, `transform`]),
  gr = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function _r(e) {
  for (let t = 0; t < e.length; t++) if (typeof e[t] == `string` && gr.test(e[t])) return !0;
  return !1;
}
var vr = new Set([
    `color`,
    `backgroundColor`,
    `outlineColor`,
    `fill`,
    `stroke`,
    `borderColor`,
    `borderTopColor`,
    `borderRightColor`,
    `borderBottomColor`,
    `borderLeftColor`,
  ]),
  yr = te(() => Object.hasOwnProperty.call(Element.prototype, `animate`));
function br(e) {
  let {
    motionValue: t,
    name: n,
    repeatDelay: r,
    repeatType: i,
    damping: a,
    type: o,
    keyframes: s,
  } = e;
  if (!(t?.owner?.current instanceof HTMLElement)) return !1;
  let { onUpdate: c, transformTemplate: l } = t.owner.getProps();
  return (
    yr() &&
    n &&
    (hr.has(n) || (vr.has(n) && _r(s))) &&
    (n !== `transform` || !l) &&
    !c &&
    !r &&
    i !== `mirror` &&
    a !== 0 &&
    o !== `inertia`
  );
}
var xr = 40,
  Sr = class extends gn {
    constructor({
      autoplay: e = !0,
      delay: t = 0,
      type: n = `keyframes`,
      repeat: r = 0,
      repeatDelay: i = 0,
      repeatType: a = `loop`,
      keyframes: o,
      name: s,
      motionValue: c,
      element: l,
      ...u
    }) {
      (super(),
        (this.stop = () => {
          (this._animation && (this._animation.stop(), this.stopTimeline?.()),
            this.keyframeResolver?.cancel());
        }),
        (this.createdAt = Ne.now()));
      let d = {
          autoplay: e,
          delay: t,
          type: n,
          repeat: r,
          repeatDelay: i,
          repeatType: a,
          name: s,
          motionValue: c,
          element: l,
          ...u,
        },
        f = l?.KeyframeResolver || Kn;
      ((this.keyframeResolver = new f(
        o,
        (e, t, n) => this.onKeyframesResolved(e, t, d, !n),
        s,
        c,
        l,
      )),
        this.keyframeResolver?.scheduleResolve());
    }
    onKeyframesResolved(e, t, n, r) {
      this.keyframeResolver = void 0;
      let { name: i, type: a, velocity: o, delay: s, isHandoff: c, onUpdate: l } = n;
      this.resolvedAt = Ne.now();
      let u = !0;
      pr(e, i, a, o) ||
        ((u = !1),
        (k.instantAnimations || !s) && l?.(pn(e, n, t)),
        (e[0] = e[e.length - 1]),
        mr(n),
        (n.repeat = 0));
      let d = {
          startTime: r
            ? this.resolvedAt && this.resolvedAt - this.createdAt > xr
              ? this.resolvedAt
              : this.createdAt
            : void 0,
          finalKeyframe: t,
          ...n,
          keyframes: e,
        },
        f = u && !c && br(d),
        p = d.motionValue?.owner?.current,
        m;
      if (f)
        try {
          m = new ur({ ...d, element: p });
        } catch {
          m = new vn(d);
        }
      else m = new vn(d);
      (m.finished
        .then(() => {
          this.notifyFinished();
        })
        .catch(N),
        (this.pendingTimeline &&=
          ((this.stopTimeline = m.attachTimeline(this.pendingTimeline)), void 0)),
        (this._animation = m));
    }
    get finished() {
      return this._animation ? this.animation.finished : this._finished;
    }
    then(e, t) {
      return this.finished.finally(e).then(() => {});
    }
    get animation() {
      return (this._animation || (this.keyframeResolver?.resume(), Gn()), this._animation);
    }
    get duration() {
      return this.animation.duration;
    }
    get iterationDuration() {
      return this.animation.iterationDuration;
    }
    get time() {
      return this.animation.time;
    }
    set time(e) {
      this.animation.time = e;
    }
    get speed() {
      return this.animation.speed;
    }
    get state() {
      return this.animation.state;
    }
    set speed(e) {
      this.animation.speed = e;
    }
    get startTime() {
      return this.animation.startTime;
    }
    attachTimeline(e) {
      return (
        this._animation
          ? (this.stopTimeline = this.animation.attachTimeline(e))
          : (this.pendingTimeline = e),
        () => this.stop()
      );
    }
    play() {
      this.animation.play();
    }
    pause() {
      this.animation.pause();
    }
    complete() {
      this.animation.complete();
    }
    cancel() {
      (this._animation && this.animation.cancel(), this.keyframeResolver?.cancel());
    }
  };
function Cr(e, t, n, r = 0, i = 1) {
  let a = Array.from(e)
      .sort((e, t) => e.sortNodePosition(t))
      .indexOf(t),
    o = e.size,
    s = (o - 1) * r;
  return typeof n == `function` ? n(a, o) : i === 1 ? a * r : s - a * r;
}
var wr = 30,
  Tr = (e) => !isNaN(parseFloat(e)),
  Er = { current: void 0 },
  Dr = class {
    constructor(e, t = {}) {
      ((this.canTrackVelocity = null),
        (this.events = {}),
        (this.updateAndNotify = (e) => {
          let t = Ne.now();
          if (
            (this.updatedAt !== t && this.setPrevFrameValue(),
            (this.prev = this.current),
            this.setCurrent(e),
            this.current !== this.prev &&
              (this.events.change?.notify(this.current), this.dependents))
          )
            for (let e of this.dependents) e.dirty();
        }),
        (this.hasAnimated = !1),
        this.setCurrent(e),
        (this.owner = t.owner));
    }
    setCurrent(e) {
      ((this.current = e),
        (this.updatedAt = Ne.now()),
        this.canTrackVelocity === null &&
          e !== void 0 &&
          (this.canTrackVelocity = Tr(this.current)));
    }
    setPrevFrameValue(e = this.current) {
      ((this.prevFrameValue = e), (this.prevUpdatedAt = this.updatedAt));
    }
    onChange(e) {
      return (
        ie(!1, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`),
        this.on(`change`, e)
      );
    }
    on(e, t) {
      this.events[e] || (this.events[e] = new re());
      let n = this.events[e].add(t);
      return e === `change`
        ? () => {
            (n(),
              V.read(() => {
                this.events.change.getSize() || this.stop();
              }));
          }
        : n;
    }
    clearListeners() {
      for (let e in this.events) this.events[e].clear();
    }
    attach(e, t) {
      ((this.passiveEffect = e), (this.stopPassiveEffect = t));
    }
    set(e) {
      this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
    }
    setWithVelocity(e, t, n) {
      (this.set(t),
        (this.prev = void 0),
        (this.prevFrameValue = e),
        (this.prevUpdatedAt = this.updatedAt - n));
    }
    jump(e, t = !0) {
      (this.updateAndNotify(e),
        (this.prev = e),
        (this.prevUpdatedAt = this.prevFrameValue = void 0),
        t && this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect());
    }
    dirty() {
      this.events.change?.notify(this.current);
    }
    addDependent(e) {
      ((this.dependents ||= new Set()), this.dependents.add(e));
    }
    removeDependent(e) {
      this.dependents && this.dependents.delete(e);
    }
    get() {
      return (Er.current && Er.current.push(this), this.current);
    }
    getPrevious() {
      return this.prev;
    }
    getVelocity() {
      let e = Ne.now();
      if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > wr)
        return 0;
      let t = Math.min(this.updatedAt - this.prevUpdatedAt, wr);
      return L(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
    }
    start(e) {
      return (
        this.stop(),
        new Promise((t) => {
          ((this.hasAnimated = !0),
            (this.animation = e(t)),
            this.events.animationStart && this.events.animationStart.notify());
        }).then(() => {
          (this.events.animationComplete && this.events.animationComplete.notify(),
            this.clearAnimation());
        })
      );
    }
    stop() {
      (this.animation &&
        (this.animation.stop(),
        this.events.animationCancel && this.events.animationCancel.notify()),
        this.clearAnimation());
    }
    isAnimating() {
      return !!this.animation;
    }
    clearAnimation() {
      delete this.animation;
    }
    destroy() {
      (this.dependents?.clear(),
        this.events.destroy?.notify(),
        this.clearListeners(),
        this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect());
    }
  };
function Or(e, t) {
  return new Dr(e, t);
}
function kr(e, t) {
  if (e?.inherit && t) {
    let { inherit: n, ...r } = e;
    return { ...t, ...r };
  }
  return e;
}
function Ar(e, t) {
  let n = e?.[t] ?? e?.default ?? e;
  return n === e ? n : kr(n, e);
}
var jr = { type: `spring`, stiffness: 500, damping: 25, restSpeed: 10 },
  Mr = (e) => ({
    type: `spring`,
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  Nr = { type: `keyframes`, duration: 0.8 },
  Pr = { type: `keyframes`, ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  Fr = (e, { keyframes: t }) =>
    t.length > 2 ? Nr : Nn.has(e) ? (e.startsWith(`scale`) ? Mr(t[1]) : jr) : Pr,
  Ir = new Set([
    `when`,
    `delay`,
    `delayChildren`,
    `staggerChildren`,
    `staggerDirection`,
    `repeat`,
    `repeatType`,
    `repeatDelay`,
    `from`,
    `elapsed`,
  ]);
function Lr(e) {
  for (let t in e) if (!Ir.has(t)) return !0;
  return !1;
}
var Rr =
    (e, t, n, r = {}, i, a) =>
    (o) => {
      let s = Ar(r, e) || {},
        c = s.delay || r.delay || 0,
        { elapsed: l = 0 } = r;
      l -= F(c);
      let u = {
        keyframes: Array.isArray(n) ? n : [null, n],
        ease: `easeOut`,
        velocity: t.getVelocity(),
        ...s,
        delay: -l,
        onUpdate: (e) => {
          (t.set(e), s.onUpdate && s.onUpdate(e));
        },
        onComplete: () => {
          (o(), s.onComplete && s.onComplete());
        },
        name: e,
        motionValue: t,
        element: a ? void 0 : i,
      };
      (Lr(s) || Object.assign(u, Fr(e, u)),
        (u.duration &&= F(u.duration)),
        (u.repeatDelay &&= F(u.repeatDelay)),
        u.from !== void 0 && (u.keyframes[0] = u.from));
      let d = !1;
      if (
        ((u.type === !1 || (u.duration === 0 && !u.repeatDelay)) &&
          (mr(u), u.delay === 0 && (d = !0)),
        (k.instantAnimations || k.skipAnimations || i?.shouldSkipAnimations || s.skipAnimations) &&
          ((d = !0), mr(u), (u.delay = 0)),
        (u.allowFlatten = !s.type && !s.ease),
        d && !a && t.get() !== void 0)
      ) {
        let e = pn(u.keyframes, s);
        if (e !== void 0) {
          V.update(() => {
            (u.onUpdate(e), u.onComplete());
          });
          return;
        }
      }
      return s.isSync ? new vn(u) : new Sr(u);
    },
  zr = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function Br(e) {
  let t = zr.exec(e);
  if (!t) return [,];
  let [, n, r, i] = t;
  return [`--${n ?? r}`, i];
}
var Vr = 4;
function Hr(e, t, n = 1) {
  ee(
    n <= Vr,
    `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`,
    `max-css-var-depth`,
  );
  let [r, i] = Br(e);
  if (!r) return;
  let a = window.getComputedStyle(t).getPropertyValue(r);
  if (a) {
    let e = a.trim();
    return A(e) ? parseFloat(e) : e;
  }
  return Le(i) ? Hr(i, t, n + 1) : i;
}
function Ur(e) {
  let t = [{}, {}];
  return (
    e?.values.forEach((e, n) => {
      ((t[0][n] = e.get()), (t[1][n] = e.getVelocity()));
    }),
    t
  );
}
function Wr(e, t, n, r) {
  if (typeof t == `function`) {
    let [i, a] = Ur(r);
    t = t(n === void 0 ? e.custom : n, i, a);
  }
  if ((typeof t == `string` && (t = e.variants && e.variants[t]), typeof t == `function`)) {
    let [i, a] = Ur(r);
    t = t(n === void 0 ? e.custom : n, i, a);
  }
  return t;
}
function Gr(e, t, n) {
  let r = e.getProps();
  return Wr(r, t, n === void 0 ? r.custom : n, e);
}
var Kr = new Set([`width`, `height`, `top`, `left`, `right`, `bottom`, ...Mn]),
  qr = (e) => Array.isArray(e);
function Jr(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Or(n));
}
function Yr(e) {
  return qr(e) ? e[e.length - 1] || 0 : e;
}
function Xr(e, t) {
  let { transitionEnd: n = {}, transition: r = {}, ...i } = Gr(e, t) || {};
  i = { ...i, ...n };
  for (let t in i) Jr(e, t, Yr(i[t]));
}
var q = (e) => !!(e && e.getVelocity);
function Zr(e) {
  return !!(q(e) && e.add);
}
function Qr(e, t) {
  let n = e.getValue(`willChange`);
  if (Zr(n)) return n.add(t);
  if (!n && k.WillChange) {
    let n = new k.WillChange(`auto`);
    (e.addValue(`willChange`, n), n.add(t));
  }
}
function $r(e) {
  return e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
var ei = `data-` + $r(`framerAppearId`);
function ti(e) {
  return e.props[ei];
}
function ni({ protectedKeys: e, needsAnimating: t }, n) {
  let r = e.hasOwnProperty(n) && t[n] !== !0;
  return ((t[n] = !1), r);
}
function ri(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
  let { transition: a, transitionEnd: o, ...s } = t,
    c = e.getDefaultTransition();
  a = a ? kr(a, c) : c;
  let l = a?.reduceMotion,
    u = a?.skipAnimations;
  r && (a = r);
  let d = [],
    f = i && e.animationState && e.animationState.getState()[i],
    p = a?.path;
  p && p.animateVisualElement(e, s, a, n, d);
  for (let t in s) {
    let r = e.getValue(t, e.latestValues[t] ?? null),
      i = s[t];
    if (i === void 0 || (f && ni(f, t))) continue;
    let o = { delay: n, ...Ar(a || {}, t) };
    u && (o.skipAnimations = !0);
    let c = r.get();
    if (c !== void 0 && !r.isAnimating() && !Array.isArray(i) && i === c && !o.velocity) {
      V.update(() => r.set(i));
      continue;
    }
    let p = !1;
    if (window.MotionHandoffAnimation) {
      let n = ti(e);
      if (n) {
        let e = window.MotionHandoffAnimation(n, t, V);
        e !== null && ((o.startTime = e), (p = !0));
      }
    }
    Qr(e, t);
    let m = l ?? e.shouldReduceMotion;
    r.start(Rr(t, r, i, m && Kr.has(t) ? { type: !1 } : o, e, p));
    let h = r.animation;
    h && d.push(h);
  }
  if (o) {
    let t = () =>
      V.update(() => {
        o && Xr(e, o);
      });
    d.length ? Promise.all(d).then(t) : t();
  }
  return d;
}
function ii(e, t, n = {}) {
  let r = Gr(e, t, n.type === `exit` ? e.presenceContext?.custom : void 0),
    { transition: i = e.getDefaultTransition() || {} } = r || {};
  n.transitionOverride && (i = n.transitionOverride);
  let a = r ? () => Promise.all(ri(e, r, n)) : () => Promise.resolve(),
    o =
      e.variantChildren && e.variantChildren.size
        ? (r = 0) => {
            let { delayChildren: a = 0, staggerChildren: o, staggerDirection: s } = i;
            return ai(e, t, r, a, o, s, n);
          }
        : () => Promise.resolve(),
    { when: s } = i;
  if (s) {
    let [e, t] = s === `beforeChildren` ? [a, o] : [o, a];
    return e().then(() => t());
  } else return Promise.all([a(), o(n.delay)]);
}
function ai(e, t, n = 0, r = 0, i = 0, a = 1, o) {
  let s = [];
  for (let c of e.variantChildren)
    (c.notify(`AnimationStart`, t),
      s.push(
        ii(c, t, {
          ...o,
          delay: n + (typeof r == `function` ? 0 : r) + Cr(e.variantChildren, c, r, i, a),
        }).then(() => c.notify(`AnimationComplete`, t)),
      ));
  return Promise.all(s);
}
function oi(e, t, n = {}) {
  e.notify(`AnimationStart`, t);
  let r;
  if (Array.isArray(t)) {
    let i = t.map((t) => ii(e, t, n));
    r = Promise.all(i);
  } else if (typeof t == `string`) r = ii(e, t, n);
  else {
    let i = typeof t == `function` ? Gr(e, t, n.custom) : t;
    r = Promise.all(ri(e, i, n));
  }
  return r.then(() => {
    e.notify(`AnimationComplete`, t);
  });
}
var si = { test: (e) => e === `auto`, parse: (e) => e },
  ci = (e) => (t) => t.test(e),
  li = [Be, U, nt, tt, it, rt, si],
  ui = (e) => li.find(ci(e));
function di(e) {
  return typeof e == `number` ? e === 0 : e === null || e === `none` || e === `0` || M(e);
}
var fi = new Set([`brightness`, `contrast`, `saturate`, `opacity`]);
function pi(e) {
  let [t, n] = e.slice(0, -1).split(`(`);
  if (t === `drop-shadow`) return e;
  let [r] = n.match(We) || [];
  if (!r) return e;
  let i = n.replace(r, ``),
    a = +!!fi.has(t);
  return (r !== n && (a *= 100), t + `(` + a + i + `)`);
}
var mi = /\b([a-z-]*)\(.*?\)/gu,
  hi = {
    ...St,
    getAnimatableNone: (e) => {
      let t = e.match(mi);
      return t ? t.map(pi).join(` `) : e;
    },
  },
  gi = {
    ...St,
    getAnimatableNone: (e) => {
      let t = St.parse(e);
      return St.createTransformer(e)(
        t.map((e) => (typeof e == `number` ? 0 : typeof e == `object` ? { ...e, alpha: 1 } : e)),
      );
    },
  },
  _i = { ...Be, transform: Math.round },
  vi = {
    borderWidth: U,
    borderTopWidth: U,
    borderRightWidth: U,
    borderBottomWidth: U,
    borderLeftWidth: U,
    borderRadius: U,
    borderTopLeftRadius: U,
    borderTopRightRadius: U,
    borderBottomRightRadius: U,
    borderBottomLeftRadius: U,
    width: U,
    maxWidth: U,
    height: U,
    maxHeight: U,
    top: U,
    right: U,
    bottom: U,
    left: U,
    inset: U,
    insetBlock: U,
    insetBlockStart: U,
    insetBlockEnd: U,
    insetInline: U,
    insetInlineStart: U,
    insetInlineEnd: U,
    padding: U,
    paddingTop: U,
    paddingRight: U,
    paddingBottom: U,
    paddingLeft: U,
    paddingBlock: U,
    paddingBlockStart: U,
    paddingBlockEnd: U,
    paddingInline: U,
    paddingInlineStart: U,
    paddingInlineEnd: U,
    margin: U,
    marginTop: U,
    marginRight: U,
    marginBottom: U,
    marginLeft: U,
    marginBlock: U,
    marginBlockStart: U,
    marginBlockEnd: U,
    marginInline: U,
    marginInlineStart: U,
    marginInlineEnd: U,
    fontSize: U,
    backgroundPositionX: U,
    backgroundPositionY: U,
    rotate: tt,
    pathRotation: tt,
    rotateX: tt,
    rotateY: tt,
    rotateZ: tt,
    scale: He,
    scaleX: He,
    scaleY: He,
    scaleZ: He,
    skew: tt,
    skewX: tt,
    skewY: tt,
    distance: U,
    translateX: U,
    translateY: U,
    translateZ: U,
    x: U,
    y: U,
    z: U,
    perspective: U,
    transformPerspective: U,
    opacity: Ve,
    originX: at,
    originY: at,
    originZ: U,
    zIndex: _i,
    fillOpacity: Ve,
    strokeOpacity: Ve,
    numOctaves: _i,
  },
  yi = {
    ...vi,
    color: W,
    backgroundColor: W,
    outlineColor: W,
    fill: W,
    stroke: W,
    borderColor: W,
    borderTopColor: W,
    borderRightColor: W,
    borderBottomColor: W,
    borderLeftColor: W,
    filter: hi,
    WebkitFilter: hi,
    mask: gi,
    WebkitMask: gi,
  },
  bi = (e) => yi[e],
  xi = new Set([hi, gi]);
function Si(e, t) {
  let n = bi(e);
  return (xi.has(n) || (n = St), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0);
}
var Ci = new Set([`auto`, `none`, `0`]);
function wi(e, t, n) {
  let r = 0,
    i;
  for (; r < e.length && !i;) {
    let t = e[r];
    (typeof t == `string` && !Ci.has(t) && ht(t).values.length && (i = e[r]), r++);
  }
  if (i && n) for (let r of t) e[r] = Si(n, i);
}
var Ti = class extends Kn {
    constructor(e, t, n, r, i) {
      super(e, t, n, r, i, !0);
    }
    readKeyframes() {
      let { unresolvedKeyframes: e, element: t, name: n } = this;
      if (!t || !t.current) return;
      super.readKeyframes();
      for (let n = 0; n < e.length; n++) {
        let r = e[n];
        if (typeof r == `string` && ((r = r.trim()), Le(r))) {
          let i = Hr(r, t.current);
          (i !== void 0 && (e[n] = i), n === e.length - 1 && (this.finalKeyframe = r));
        }
      }
      if ((this.resolveNoneKeyframes(), !Kr.has(n) || e.length !== 2)) return;
      let [r, i] = e,
        a = ui(r),
        o = ui(i);
      if (ze(r) !== ze(i) && Rn[n]) {
        this.needsMeasurement = !0;
        return;
      }
      if (a !== o)
        if (Pn(a) && Pn(o))
          for (let t = 0; t < e.length; t++) {
            let n = e[t];
            typeof n == `string` && (e[t] = parseFloat(n));
          }
        else Rn[n] && (this.needsMeasurement = !0);
    }
    resolveNoneKeyframes() {
      let { unresolvedKeyframes: e, name: t } = this,
        n = [];
      for (let t = 0; t < e.length; t++) (e[t] === null || di(e[t])) && n.push(t);
      n.length && wi(e, n, t);
    }
    measureInitialState() {
      let { element: e, unresolvedKeyframes: t, name: n } = this;
      if (!e || !e.current) return;
      (n === `height` && (this.suspendedScrollY = window.pageYOffset),
        (this.measuredOrigin = Rn[n](e.measureViewportBox(), window.getComputedStyle(e.current))),
        (t[0] = this.measuredOrigin));
      let r = t[t.length - 1];
      r !== void 0 && e.getValue(n, r).jump(r, !1);
    }
    measureEndState() {
      let { element: e, name: t, unresolvedKeyframes: n } = this;
      if (!e || !e.current) return;
      let r = e.getValue(t);
      r && r.jump(this.measuredOrigin, !1);
      let i = n.length - 1,
        a = n[i];
      ((n[i] = Rn[t](e.measureViewportBox(), window.getComputedStyle(e.current))),
        a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a),
        this.removedTransforms?.length &&
          this.removedTransforms.forEach(([t, n]) => {
            e.getValue(t).set(n);
          }),
        this.resolveNoneKeyframes());
    }
  },
  Ei = [
    `borderTopLeftRadius`,
    `borderTopRightRadius`,
    `borderBottomRightRadius`,
    `borderBottomLeftRadius`,
  ];
function Di(e, t, n) {
  if (e == null) return [];
  if (e instanceof EventTarget) return [e];
  if (typeof e == `string`) {
    let r = document;
    t && (r = t.current);
    let i = n?.[e] ?? r.querySelectorAll(e);
    return i ? Array.from(i) : [];
  }
  return Array.from(e).filter((e) => e != null);
}
var Oi = (e, t) => (t && typeof e == `number` ? t.transform(e) : e);
function ki(e) {
  return j(e) && `offsetHeight` in e && !(`ownerSVGElement` in e);
}
var { schedule: Ai, cancel: ji } = Oe(queueMicrotask, !1),
  Mi = { x: !1, y: !1 };
function Ni() {
  return Mi.x || Mi.y;
}
function Pi(e) {
  return e === `x` || e === `y`
    ? Mi[e]
      ? null
      : ((Mi[e] = !0),
        () => {
          Mi[e] = !1;
        })
    : Mi.x || Mi.y
      ? null
      : ((Mi.x = Mi.y = !0),
        () => {
          Mi.x = Mi.y = !1;
        });
}
function Fi(e, t) {
  let n = Di(e),
    r = new AbortController();
  return [n, { passive: !0, ...t, signal: r.signal }, () => r.abort()];
}
function Ii(e) {
  return !(e.pointerType === `touch` || Ni());
}
function Li(e, t, n = {}) {
  let [r, i, a] = Fi(e, n);
  return (
    r.forEach((e) => {
      let n = !1,
        r = !1,
        a,
        o = () => {
          e.removeEventListener(`pointerleave`, u);
        },
        s = (e) => {
          ((a &&= (a(e), void 0)), o());
        },
        c = (e) => {
          ((n = !1),
            window.removeEventListener(`pointerup`, c),
            window.removeEventListener(`pointercancel`, c),
            r && ((r = !1), s(e)));
        },
        l = () => {
          ((n = !0),
            window.addEventListener(`pointerup`, c, i),
            window.addEventListener(`pointercancel`, c, i));
        },
        u = (e) => {
          if (e.pointerType !== `touch`) {
            if (n) {
              r = !0;
              return;
            }
            s(e);
          }
        };
      (e.addEventListener(
        `pointerenter`,
        (n) => {
          if (!Ii(n)) return;
          r = !1;
          let o = t(e, n);
          typeof o == `function` && ((a = o), e.addEventListener(`pointerleave`, u, i));
        },
        i,
      ),
        e.addEventListener(`pointerdown`, l, i));
    }),
    a
  );
}
var Ri = (e, t) => (t ? e === t || Ri(e, t.parentElement) : !1),
  zi = (e) =>
    e.pointerType === `mouse` ? typeof e.button != `number` || e.button <= 0 : e.isPrimary !== !1,
  Bi = new Set([`BUTTON`, `INPUT`, `SELECT`, `TEXTAREA`, `A`]);
function Vi(e) {
  return Bi.has(e.tagName) || e.isContentEditable === !0;
}
var Hi = new Set([`INPUT`, `SELECT`, `TEXTAREA`]);
function Ui(e) {
  return Hi.has(e.tagName) || e.isContentEditable === !0;
}
var Wi = new WeakSet();
function Gi(e) {
  return (t) => {
    t.key === `Enter` && e(t);
  };
}
function Ki(e, t) {
  e.dispatchEvent(new PointerEvent(`pointer` + t, { isPrimary: !0, bubbles: !0 }));
}
var qi = (e, t) => {
  let n = e.currentTarget;
  if (!n) return;
  let r = Gi(() => {
    if (Wi.has(n)) return;
    Ki(n, `down`);
    let e = Gi(() => {
      Ki(n, `up`);
    });
    (n.addEventListener(`keyup`, e, t), n.addEventListener(`blur`, () => Ki(n, `cancel`), t));
  });
  (n.addEventListener(`keydown`, r, t),
    n.addEventListener(`blur`, () => n.removeEventListener(`keydown`, r), t));
};
function Ji(e) {
  return zi(e) && !Ni();
}
var Yi = new WeakSet();
function Xi(e, t, n = {}) {
  let [r, i, a] = Fi(e, n),
    o = (e) => {
      let r = e.currentTarget;
      if (!Ji(e) || Yi.has(e)) return;
      (Wi.add(r), n.stopPropagation && Yi.add(e));
      let a = t(r, e),
        o = { ...i, capture: !0 },
        s = (e, t) => {
          (window.removeEventListener(`pointerup`, c, o),
            window.removeEventListener(`pointercancel`, l, o),
            Wi.has(r) && Wi.delete(r),
            Ji(e) && typeof a == `function` && a(e, { success: t }));
        },
        c = (e) => {
          s(e, r === window || r === document || n.useGlobalTarget || Ri(r, e.target));
        },
        l = (e) => {
          s(e, !1);
        };
      (window.addEventListener(`pointerup`, c, o), window.addEventListener(`pointercancel`, l, o));
    };
  return (
    r.forEach((e) => {
      ((n.useGlobalTarget ? window : e).addEventListener(`pointerdown`, o, i),
        ki(e) &&
          (e.addEventListener(`focus`, (e) => qi(e, i)),
          !Vi(e) && !e.hasAttribute(`tabindex`) && (e.tabIndex = 0)));
    }),
    a
  );
}
function Zi(e) {
  return j(e) && `ownerSVGElement` in e;
}
var Qi = new WeakMap(),
  $i,
  ea = (e, t, n) => (r, i) =>
    i && i[0] ? i[0][e + `Size`] : Zi(r) && `getBBox` in r ? r.getBBox()[t] : r[n],
  ta = ea(`inline`, `width`, `offsetWidth`),
  na = ea(`block`, `height`, `offsetHeight`);
function ra({ target: e, borderBoxSize: t }) {
  Qi.get(e)?.forEach((n) => {
    n(e, {
      get width() {
        return ta(e, t);
      },
      get height() {
        return na(e, t);
      },
    });
  });
}
function ia(e) {
  e.forEach(ra);
}
function aa() {
  typeof ResizeObserver > `u` || ($i = new ResizeObserver(ia));
}
function oa(e, t) {
  $i || aa();
  let n = Di(e);
  return (
    n.forEach((e) => {
      let n = Qi.get(e);
      (n || ((n = new Set()), Qi.set(e, n)), n.add(t), $i?.observe(e));
    }),
    () => {
      n.forEach((e) => {
        let n = Qi.get(e);
        (n?.delete(t), n?.size || $i?.unobserve(e));
      });
    }
  );
}
var sa = new Set(),
  ca;
function la() {
  ((ca = () => {
    let e = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      },
    };
    sa.forEach((t) => t(e));
  }),
    window.addEventListener(`resize`, ca));
}
function ua(e) {
  return (
    sa.add(e),
    ca || la(),
    () => {
      (sa.delete(e),
        !sa.size &&
          typeof ca == `function` &&
          (window.removeEventListener(`resize`, ca), (ca = void 0)));
    }
  );
}
function da(e, t) {
  return typeof e == `function` ? ua(e) : oa(e, t);
}
var fa = { value: null, addProjectionMetrics: null };
function pa(e) {
  return Zi(e) && e.tagName === `svg`;
}
var ma = [...li, W, St],
  ha = (e) => ma.find(ci(e)),
  ga = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  _a = () => ({ x: ga(), y: ga() }),
  va = () => ({ min: 0, max: 0 }),
  J = () => ({ x: va(), y: va() }),
  ya = new WeakMap();
function ba(e) {
  return typeof e == `object` && !!e && typeof e.start == `function`;
}
function xa(e) {
  return typeof e == `string` || Array.isArray(e);
}
var Sa = [`animate`, `whileInView`, `whileFocus`, `whileHover`, `whileTap`, `whileDrag`, `exit`],
  Ca = [`initial`, ...Sa];
function wa(e) {
  return ba(e.animate) || Ca.some((t) => xa(e[t]));
}
function Ta(e) {
  return !!(wa(e) || e.variants);
}
function Ea(e, t, n) {
  for (let r in t) {
    let i = t[r],
      a = n[r];
    if (q(i)) e.addValue(r, i);
    else if (q(a)) e.addValue(r, Or(i, { owner: e }));
    else if (a !== i)
      if (e.hasValue(r)) {
        let t = e.getValue(r);
        t.liveStyle === !0 ? t.jump(i) : t.hasAnimated || t.set(i);
      } else {
        let t = e.getStaticValue(r);
        e.addValue(r, Or(t === void 0 ? i : t, { owner: e }));
      }
  }
  for (let r in n) t[r] === void 0 && e.removeValue(r);
  return t;
}
var Da = { current: null },
  Oa = { current: !1 },
  ka = typeof window < `u`;
function Aa() {
  if (((Oa.current = !0), ka))
    if (window.matchMedia) {
      let e = window.matchMedia(`(prefers-reduced-motion)`),
        t = () => (Da.current = e.matches);
      (e.addEventListener(`change`, t), t());
    } else Da.current = !1;
}
var ja = [
    `AnimationStart`,
    `AnimationComplete`,
    `Update`,
    `BeforeLayoutMeasure`,
    `LayoutMeasure`,
    `LayoutAnimationStart`,
    `LayoutAnimationComplete`,
  ],
  Ma = {};
function Na(e) {
  Ma = e;
}
function Pa() {
  return Ma;
}
var Fa = class {
    scrapeMotionValuesFromProps(e, t, n) {
      return {};
    }
    constructor(
      {
        parent: e,
        props: t,
        presenceContext: n,
        reducedMotionConfig: r,
        skipAnimations: i,
        blockInitialAnimation: a,
        visualState: o,
      },
      s = {},
    ) {
      ((this.current = null),
        (this.children = new Set()),
        (this.isVariantNode = !1),
        (this.isControllingVariants = !1),
        (this.shouldReduceMotion = null),
        (this.shouldSkipAnimations = !1),
        (this.values = new Map()),
        (this.KeyframeResolver = Kn),
        (this.features = {}),
        (this.valueSubscriptions = new Map()),
        (this.prevMotionValues = {}),
        (this.hasBeenMounted = !1),
        (this.events = {}),
        (this.propEventSubscriptions = {}),
        (this.notifyUpdate = () => this.notify(`Update`, this.latestValues)),
        (this.render = () => {
          this.current &&
            (this.triggerBuild(),
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
        }),
        (this.renderScheduledAt = 0),
        (this.scheduleRender = () => {
          let e = Ne.now();
          this.renderScheduledAt < e &&
            ((this.renderScheduledAt = e), V.render(this.render, !1, !0));
        }));
      let { latestValues: c, renderState: l } = o;
      ((this.latestValues = c),
        (this.baseTarget = { ...c }),
        (this.initialValues = t.initial ? { ...c } : {}),
        (this.renderState = l),
        (this.parent = e),
        (this.props = t),
        (this.presenceContext = n),
        (this.depth = e ? e.depth + 1 : 0),
        (this.reducedMotionConfig = r),
        (this.skipAnimationsConfig = i),
        (this.options = s),
        (this.blockInitialAnimation = !!a),
        (this.isControllingVariants = wa(t)),
        (this.isVariantNode = Ta(t)),
        this.isVariantNode && (this.variantChildren = new Set()),
        (this.manuallyAnimateOnMount = !!(e && e.current)));
      let { willChange: u, ...d } = this.scrapeMotionValuesFromProps(t, {}, this);
      for (let e in d) {
        let t = d[e];
        c[e] !== void 0 && q(t) && t.set(c[e]);
      }
    }
    mount(e) {
      if (this.hasBeenMounted)
        for (let e in this.initialValues)
          (this.values.get(e)?.jump(this.initialValues[e]),
            (this.latestValues[e] = this.initialValues[e]));
      ((this.current = e),
        ya.set(e, this),
        this.projection && !this.projection.instance && this.projection.mount(e),
        this.parent &&
          this.isVariantNode &&
          !this.isControllingVariants &&
          (this.removeFromVariantTree = this.parent.addVariantChild(this)),
        this.values.forEach((e, t) => this.bindToMotionValue(t, e)),
        this.reducedMotionConfig === `never`
          ? (this.shouldReduceMotion = !1)
          : this.reducedMotionConfig === `always`
            ? (this.shouldReduceMotion = !0)
            : (Oa.current || Aa(), (this.shouldReduceMotion = Da.current)),
        ie(
          this.shouldReduceMotion !== !0,
          `You have Reduced Motion enabled on your device. Animations may not appear as expected.`,
          `reduced-motion-disabled`,
        ),
        (this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1),
        this.parent?.addChild(this),
        this.update(this.props, this.presenceContext),
        (this.hasBeenMounted = !0));
    }
    unmount() {
      (this.projection && this.projection.unmount(),
        ke(this.notifyUpdate),
        ke(this.render),
        this.valueSubscriptions.forEach((e) => e()),
        this.valueSubscriptions.clear(),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent?.removeChild(this));
      for (let e in this.events) this.events[e].clear();
      for (let e in this.features) {
        let t = this.features[e];
        t && (t.unmount(), (t.isMounted = !1));
      }
      this.current = null;
    }
    addChild(e) {
      (this.children.add(e), (this.enteringChildren ??= new Set()), this.enteringChildren.add(e));
    }
    removeChild(e) {
      (this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e));
    }
    bindToMotionValue(e, t) {
      if (
        (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(),
        t.accelerate && hr.has(e) && this.current instanceof HTMLElement)
      ) {
        let { factory: n, keyframes: r, times: i, ease: a, duration: o } = t.accelerate,
          s = new ar({
            element: this.current,
            name: e,
            keyframes: r,
            times: i,
            ease: a,
            duration: F(o),
          }),
          c = n(s);
        this.valueSubscriptions.set(e, () => {
          (c(), s.cancel());
        });
        return;
      }
      let n = Nn.has(e);
      n && this.onBindTransform && this.onBindTransform();
      let r = t.on(`change`, (t) => {
          ((this.latestValues[e] = t),
            this.props.onUpdate && V.preRender(this.notifyUpdate),
            n && this.projection && (this.projection.isTransformDirty = !0),
            this.scheduleRender());
        }),
        i;
      (typeof window < `u` &&
        window.MotionCheckAppearSync &&
        (i = window.MotionCheckAppearSync(this, e, t)),
        this.valueSubscriptions.set(e, () => {
          (r(), i && i());
        }));
    }
    sortNodePosition(e) {
      return !this.current || !this.sortInstanceNodePosition || this.type !== e.type
        ? 0
        : this.sortInstanceNodePosition(this.current, e.current);
    }
    updateFeatures() {
      let e = `animation`;
      for (e in Ma) {
        let t = Ma[e];
        if (!t) continue;
        let { isEnabled: n, Feature: r } = t;
        if (
          (!this.features[e] && r && n(this.props) && (this.features[e] = new r(this)),
          this.features[e])
        ) {
          let t = this.features[e];
          t.isMounted ? t.update() : (t.mount(), (t.isMounted = !0));
        }
      }
    }
    triggerBuild() {
      this.build(this.renderState, this.latestValues, this.props);
    }
    measureViewportBox() {
      return this.current ? this.measureInstanceViewportBox(this.current, this.props) : J();
    }
    getStaticValue(e) {
      return this.latestValues[e];
    }
    setStaticValue(e, t) {
      this.latestValues[e] = t;
    }
    update(e, t) {
      ((e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
        (this.prevProps = this.props),
        (this.props = e),
        (this.prevPresenceContext = this.presenceContext),
        (this.presenceContext = t));
      for (let t = 0; t < ja.length; t++) {
        let n = ja[t];
        this.propEventSubscriptions[n] &&
          (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
        let r = e[`on` + n];
        r && (this.propEventSubscriptions[n] = this.on(n, r));
      }
      ((this.prevMotionValues = Ea(
        this,
        this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this),
        this.prevMotionValues,
      )),
        this.handleChildMotionValue && this.handleChildMotionValue());
    }
    getProps() {
      return this.props;
    }
    getVariant(e) {
      return this.props.variants ? this.props.variants[e] : void 0;
    }
    getDefaultTransition() {
      return this.props.transition;
    }
    getTransformPagePoint() {
      return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
      return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
    }
    addVariantChild(e) {
      let t = this.getClosestVariantNode();
      if (t)
        return (t.variantChildren && t.variantChildren.add(e), () => t.variantChildren.delete(e));
    }
    addValue(e, t) {
      let n = this.values.get(e);
      t !== n &&
        (n && this.removeValue(e),
        this.bindToMotionValue(e, t),
        this.values.set(e, t),
        (this.latestValues[e] = t.get()));
    }
    removeValue(e) {
      this.values.delete(e);
      let t = this.valueSubscriptions.get(e);
      (t && (t(), this.valueSubscriptions.delete(e)),
        delete this.latestValues[e],
        this.removeValueFromRenderState(e, this.renderState));
    }
    hasValue(e) {
      return this.values.has(e);
    }
    getValue(e, t) {
      if (this.props.values && this.props.values[e]) return this.props.values[e];
      let n = this.values.get(e);
      return (
        n === void 0 &&
          t !== void 0 &&
          ((n = Or(t === null ? void 0 : t, { owner: this })), this.addValue(e, n)),
        n
      );
    }
    readValue(e, t) {
      let n =
        this.latestValues[e] !== void 0 || !this.current
          ? this.latestValues[e]
          : (this.getBaseTargetFromProps(this.props, e) ??
            this.readValueFromInstance(this.current, e, this.options));
      return (
        n != null &&
          (typeof n == `string` && (A(n) || M(n))
            ? (n = parseFloat(n))
            : !ha(n) && St.test(t) && (n = Si(e, t)),
          this.setBaseTarget(e, q(n) ? n.get() : n)),
        q(n) ? n.get() : n
      );
    }
    setBaseTarget(e, t) {
      this.baseTarget[e] = t;
    }
    getBaseTarget(e) {
      let { initial: t } = this.props,
        n;
      if (typeof t == `string` || typeof t == `object`) {
        let r = Wr(this.props, t, this.presenceContext?.custom);
        r && (n = r[e]);
      }
      if (t && n !== void 0) return n;
      let r = this.getBaseTargetFromProps(this.props, e);
      return r !== void 0 && !q(r)
        ? r
        : this.initialValues[e] !== void 0 && n === void 0
          ? void 0
          : this.baseTarget[e];
    }
    on(e, t) {
      return (this.events[e] || (this.events[e] = new re()), this.events[e].add(t));
    }
    notify(e, ...t) {
      this.events[e] && this.events[e].notify(...t);
    }
    scheduleRenderMicrotask() {
      Ai.render(this.render);
    }
  },
  Ia = class extends Fa {
    constructor() {
      (super(...arguments), (this.KeyframeResolver = Ti));
    }
    sortInstanceNodePosition(e, t) {
      return e.compareDocumentPosition(t) & 2 ? 1 : -1;
    }
    getBaseTargetFromProps(e, t) {
      let n = e.style;
      return n ? n[t] : void 0;
    }
    removeValueFromRenderState(e, { vars: t, style: n }) {
      (delete t[e], delete n[e]);
    }
    handleChildMotionValue() {
      this.childSubscription && (this.childSubscription(), delete this.childSubscription);
      let { children: e } = this.props;
      q(e) &&
        (this.childSubscription = e.on(`change`, (e) => {
          this.current && (this.current.textContent = `${e}`);
        }));
    }
  },
  La = class {
    constructor(e) {
      ((this.isMounted = !1), (this.node = e));
    }
    update() {}
  };
function Ra({ top: e, left: t, right: n, bottom: r }) {
  return { x: { min: t, max: n }, y: { min: e, max: r } };
}
function za({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function Ba(e, t) {
  if (!t) return e;
  let n = t({ x: e.left, y: e.top }),
    r = t({ x: e.right, y: e.bottom });
  return { top: n.y, left: n.x, bottom: r.y, right: r.x };
}
function Va(e) {
  return e === void 0 || e === 1;
}
function Ha({ scale: e, scaleX: t, scaleY: n }) {
  return !Va(e) || !Va(t) || !Va(n);
}
function Ua(e) {
  return Ha(e) || Wa(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function Wa(e) {
  return Ga(e.x) || Ga(e.y);
}
function Ga(e) {
  return e && e !== `0%`;
}
function Ka(e, t, n) {
  return n + t * (e - n);
}
function qa(e, t, n, r, i) {
  return (i !== void 0 && (e = Ka(e, i, r)), Ka(e, n, r) + t);
}
function Ja(e, t = 0, n = 1, r, i) {
  ((e.min = qa(e.min, t, n, r, i)), (e.max = qa(e.max, t, n, r, i)));
}
function Ya(e, { x: t, y: n }) {
  (Ja(e.x, t.translate, t.scale, t.originPoint), Ja(e.y, n.translate, n.scale, n.originPoint));
}
var Xa = 0.999999999999,
  Za = 1.0000000000001;
function Qa(e, t, n, r = !1) {
  let i = n.length;
  if (!i) return;
  t.x = t.y = 1;
  let a, o;
  for (let s = 0; s < i; s++) {
    ((a = n[s]), (o = a.projectionDelta));
    let { visualElement: i } = a.options;
    (i && i.props.style && i.props.style.display === `contents`) ||
      (r &&
        a.options.layoutScroll &&
        a.scroll &&
        a !== a.root &&
        ($a(e.x, -a.scroll.offset.x), $a(e.y, -a.scroll.offset.y)),
      o && ((t.x *= o.x.scale), (t.y *= o.y.scale), Ya(e, o)),
      r && Ua(a.latestValues) && no(e, a.latestValues, a.layout?.layoutBox));
  }
  (t.x < Za && t.x > Xa && (t.x = 1), t.y < Za && t.y > Xa && (t.y = 1));
}
function $a(e, t) {
  ((e.min += t), (e.max += t));
}
function eo(e, t, n, r, i = 0.5) {
  Ja(e, t, n, G(e.min, e.max, i), r);
}
function to(e, t) {
  return typeof e == `string` ? (parseFloat(e) / 100) * (t.max - t.min) : e;
}
function no(e, t, n) {
  let r = n ?? e;
  (eo(e.x, to(t.x, r.x), t.scaleX, t.scale, t.originX),
    eo(e.y, to(t.y, r.y), t.scaleY, t.scale, t.originY));
}
function ro(e, t) {
  return Ra(Ba(e.getBoundingClientRect(), t));
}
function io(e, t, n) {
  let r = ro(e, n),
    { scroll: i } = t;
  return (i && ($a(r.x, i.offset.x), $a(r.y, i.offset.y)), r);
}
var ao = { x: `translateX`, y: `translateY`, z: `translateZ`, transformPerspective: `perspective` },
  oo = Mn.length;
function so(e, t, n) {
  let r = ``,
    i = !0;
  for (let a = 0; a < oo; a++) {
    let o = Mn[a],
      s = e[o];
    if (s === void 0) continue;
    let c = !0;
    if (typeof s == `number`) c = s === +!!o.startsWith(`scale`);
    else {
      let e = parseFloat(s);
      c = o.startsWith(`scale`) ? e === 1 : e === 0;
    }
    if (!c || n) {
      let e = Oi(s, vi[o]);
      if (!c) {
        i = !1;
        let t = ao[o] || o;
        r += `${t}(${e}) `;
      }
      n && (t[o] = e);
    }
  }
  let a = e.pathRotation;
  return (
    a && ((i = !1), (r += `rotate(${Oi(a, vi.pathRotation)}) `)),
    (r = r.trim()),
    n ? (r = n(t, i ? `` : r)) : i && (r = `none`),
    r
  );
}
function co(e, t, n) {
  let { style: r, vars: i, transformOrigin: a } = e,
    o = !1,
    s = !1;
  for (let e in t) {
    let n = t[e];
    if (Nn.has(e)) {
      o = !0;
      continue;
    } else if (Fe(e)) {
      i[e] = n;
      continue;
    } else {
      let t = Oi(n, vi[e]);
      e.startsWith(`origin`) ? ((s = !0), (a[e] = t)) : (r[e] = t);
    }
  }
  if (
    (t.transform || (o || n ? (r.transform = so(t, e.transform, n)) : (r.transform &&= `none`)), s)
  ) {
    let { originX: e = `50%`, originY: t = `50%`, originZ: n = 0 } = a;
    r.transformOrigin = `${e} ${t} ${n}`;
  }
}
function lo(e, { style: t, vars: n }, r, i) {
  let a = e.style,
    o;
  for (o in t) a[o] = t[o];
  for (o in (i?.applyProjectionStyles(a, r), n)) a.setProperty(o, n[o]);
}
function uo(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
var fo = {
    correct: (e, t) => {
      if (!t.target) return e;
      if (typeof e == `string`)
        if (U.test(e)) e = parseFloat(e);
        else return e;
      return `${uo(e, t.target.x)}% ${uo(e, t.target.y)}%`;
    },
  },
  po = {
    correct: (e, { treeScale: t, projectionDelta: n }) => {
      let r = e,
        i = St.parse(e);
      if (i.length > 5) return r;
      let a = St.createTransformer(e),
        o = typeof i[0] == `number` ? 0 : 1,
        s = n.x.scale * t.x,
        c = n.y.scale * t.y;
      ((i[0 + o] /= s), (i[1 + o] /= c));
      let l = G(s, c, 0.5);
      return (
        typeof i[2 + o] == `number` && (i[2 + o] /= l),
        typeof i[3 + o] == `number` && (i[3 + o] /= l),
        a(i)
      );
    },
  },
  mo = {
    borderRadius: { ...fo, applyTo: [...Ei] },
    borderTopLeftRadius: fo,
    borderTopRightRadius: fo,
    borderBottomLeftRadius: fo,
    borderBottomRightRadius: fo,
    boxShadow: po,
  };
function ho(e, { layout: t, layoutId: n }) {
  return (
    Nn.has(e) || e.startsWith(`origin`) || ((t || n !== void 0) && (!!mo[e] || e === `opacity`))
  );
}
function go(e, t, n) {
  let r = e.style,
    i = t?.style,
    a = {};
  if (!r) return a;
  for (let t in r)
    (q(r[t]) || (i && q(i[t])) || ho(t, e) || n?.getValue(t)?.liveStyle !== void 0) &&
      (a[t] = r[t]);
  return a;
}
function _o(e) {
  return window.getComputedStyle(e);
}
var vo = class extends Ia {
    constructor() {
      (super(...arguments), (this.type = `html`), (this.renderInstance = lo));
    }
    readValueFromInstance(e, t) {
      if (Nn.has(t)) return this.projection?.isProjecting ? On(t) : An(e, t);
      {
        let n = _o(e),
          r = (Fe(t) ? n.getPropertyValue(t) : n[t]) || 0;
        return typeof r == `string` ? r.trim() : r;
      }
    }
    measureInstanceViewportBox(e, { transformPagePoint: t }) {
      return ro(e, t);
    }
    build(e, t, n) {
      co(e, t, n.transformTemplate);
    }
    scrapeMotionValuesFromProps(e, t, n) {
      return go(e, t, n);
    }
  },
  yo = { offset: `stroke-dashoffset`, array: `stroke-dasharray` },
  bo = { offset: `strokeDashoffset`, array: `strokeDasharray` };
function xo(e, t, n = 1, r = 0, i = !0) {
  e.pathLength = 1;
  let a = i ? yo : bo;
  ((e[a.offset] = `${-r}`), (e[a.array] = `${t} ${n}`));
}
var So = [`offsetDistance`, `offsetPath`, `offsetRotate`, `offsetAnchor`];
function Co(
  e,
  { attrX: t, attrY: n, attrScale: r, pathLength: i, pathSpacing: a = 1, pathOffset: o = 0, ...s },
  c,
  l,
  u,
) {
  if ((co(e, s, l), c)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  ((e.attrs = e.style), (e.style = {}));
  let { attrs: d, style: f } = e;
  (d.transform && ((f.transform = d.transform), delete d.transform),
    (f.transform || d.transformOrigin) &&
      ((f.transformOrigin = d.transformOrigin ?? `50% 50%`), delete d.transformOrigin),
    f.transform && ((f.transformBox = u?.transformBox ?? `fill-box`), delete d.transformBox));
  for (let e of So) d[e] !== void 0 && ((f[e] = d[e]), delete d[e]);
  (t !== void 0 && (d.x = t),
    n !== void 0 && (d.y = n),
    r !== void 0 && (d.scale = r),
    i !== void 0 && xo(d, i, a, o, !1));
}
var wo = new Set([
    `baseFrequency`,
    `diffuseConstant`,
    `kernelMatrix`,
    `kernelUnitLength`,
    `keySplines`,
    `keyTimes`,
    `limitingConeAngle`,
    `markerHeight`,
    `markerWidth`,
    `numOctaves`,
    `targetX`,
    `targetY`,
    `surfaceScale`,
    `specularConstant`,
    `specularExponent`,
    `stdDeviation`,
    `tableValues`,
    `viewBox`,
    `gradientTransform`,
    `pathLength`,
    `startOffset`,
    `textLength`,
    `lengthAdjust`,
  ]),
  To = (e) => typeof e == `string` && e.toLowerCase() === `svg`;
function Eo(e, t, n, r) {
  lo(e, t, void 0, r);
  for (let n in t.attrs) e.setAttribute(wo.has(n) ? n : $r(n), t.attrs[n]);
}
function Do(e, t, n) {
  let r = go(e, t, n);
  for (let n in e)
    if (q(e[n]) || q(t[n])) {
      let t = Mn.indexOf(n) === -1 ? n : `attr` + n.charAt(0).toUpperCase() + n.substring(1);
      r[t] = e[n];
    }
  return r;
}
var Oo = class extends Ia {
    constructor() {
      (super(...arguments),
        (this.type = `svg`),
        (this.isSVGTag = !1),
        (this.measureInstanceViewportBox = J));
    }
    getBaseTargetFromProps(e, t) {
      return e[t];
    }
    readValueFromInstance(e, t) {
      if (Nn.has(t)) {
        let e = bi(t);
        return (e && e.default) || 0;
      }
      return ((t = wo.has(t) ? t : $r(t)), e.getAttribute(t));
    }
    scrapeMotionValuesFromProps(e, t, n) {
      return Do(e, t, n);
    }
    build(e, t, n) {
      Co(e, t, this.isSVGTag, n.transformTemplate, n.style);
    }
    renderInstance(e, t, n, r) {
      Eo(e, t, n, r);
    }
    mount(e) {
      ((this.isSVGTag = To(e.tagName)), super.mount(e));
    }
  },
  ko = Ca.length;
function Ao(e) {
  if (!e) return;
  if (!e.isControllingVariants) {
    let t = (e.parent && Ao(e.parent)) || {};
    return (e.props.initial !== void 0 && (t.initial = e.props.initial), t);
  }
  let t = {};
  for (let n = 0; n < ko; n++) {
    let r = Ca[n],
      i = e.props[r];
    (xa(i) || i === !1) && (t[r] = i);
  }
  return t;
}
function jo(e, t) {
  if (!Array.isArray(t)) return !1;
  let n = t.length;
  if (n !== e.length) return !1;
  for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
  return !0;
}
var Mo = [...Sa].reverse(),
  No = Sa.length;
function Po(e) {
  return (t) => Promise.all(t.map(({ animation: t, options: n }) => oi(e, t, n)));
}
function Fo(e) {
  let t = Po(e),
    n = Ro(),
    r = !0,
    i = !1,
    a = (t) => (n, r) => {
      let i = Gr(e, r, t === `exit` ? e.presenceContext?.custom : void 0);
      if (i) {
        let { transition: e, transitionEnd: t, ...r } = i;
        n = { ...n, ...r, ...t };
      }
      return n;
    };
  function o(n) {
    t = n(e);
  }
  function s(o) {
    let { props: s } = e,
      c = Ao(e.parent) || {},
      l = [],
      u = new Set(),
      d = {},
      f = 1 / 0;
    for (let t = 0; t < No; t++) {
      let p = Mo[t],
        m = n[p],
        h = s[p] === void 0 ? c[p] : s[p],
        g = xa(h),
        _ = p === o ? m.isActive : null;
      _ === !1 && (f = t);
      let v = h === c[p] && h !== s[p] && g;
      if (
        (v && (r || i) && e.manuallyAnimateOnMount && (v = !1),
        (m.protectedKeys = { ...d }),
        (!m.isActive && _ === null) || (!h && !m.prevProp) || ba(h) || typeof h == `boolean`)
      )
        continue;
      if (p === `exit` && m.isActive && _ !== !0) {
        m.prevResolvedValues && (d = { ...d, ...m.prevResolvedValues });
        continue;
      }
      let y = Io(m.prevProp, h),
        b = y || (p === o && m.isActive && !v && g) || (t > f && g),
        x = !1,
        S = Array.isArray(h) ? h : [h],
        C = S.reduce(a(p), {});
      _ === !1 && (C = {});
      let { prevResolvedValues: w = {} } = m,
        T = { ...w, ...C },
        E = (t) => {
          ((b = !0), u.has(t) && ((x = !0), u.delete(t)), (m.needsAnimating[t] = !0));
          let n = e.getValue(t);
          n && (n.liveStyle = !1);
        };
      for (let e in T) {
        let t = C[e],
          n = w[e];
        if (d.hasOwnProperty(e)) continue;
        let r = !1;
        ((r = qr(t) && qr(n) ? !jo(t, n) || y : t !== n),
          r
            ? t == null
              ? u.add(e)
              : E(e)
            : t !== void 0 && u.has(e)
              ? E(e)
              : (m.protectedKeys[e] = !0));
      }
      ((m.prevProp = h),
        (m.prevResolvedValues = C),
        m.isActive && (d = { ...d, ...C }),
        (r || i) && e.blockInitialAnimation && (b = !1));
      let D = v && y;
      b &&
        (!D || x) &&
        l.push(
          ...S.map((t) => {
            let n = { type: p };
            if (typeof t == `string` && (r || i) && !D && e.manuallyAnimateOnMount && e.parent) {
              let { parent: r } = e,
                i = Gr(r, t);
              if (r.enteringChildren && i) {
                let { delayChildren: t } = i.transition || {};
                n.delay = Cr(r.enteringChildren, e, t);
              }
            }
            return { animation: t, options: n };
          }),
        );
    }
    if (u.size) {
      let t = {};
      if (typeof s.initial != `boolean`) {
        let n = Gr(e, Array.isArray(s.initial) ? s.initial[0] : s.initial);
        n && n.transition && (t.transition = n.transition);
      }
      (u.forEach((n) => {
        let r = e.getBaseTarget(n),
          i = e.getValue(n);
        (i && (i.liveStyle = !0), (t[n] = r ?? null));
      }),
        l.push({ animation: t }));
    }
    let p = !!l.length;
    return (
      r && (s.initial === !1 || s.initial === s.animate) && !e.manuallyAnimateOnMount && (p = !1),
      (r = !1),
      (i = !1),
      p ? t(l) : Promise.resolve()
    );
  }
  function c(t, r) {
    if (n[t].isActive === r) return Promise.resolve();
    (e.variantChildren?.forEach((e) => e.animationState?.setActive(t, r)), (n[t].isActive = r));
    let i = s(t);
    for (let e in n) n[e].protectedKeys = {};
    return i;
  }
  return {
    animateChanges: s,
    setActive: c,
    setAnimateFunction: o,
    getState: () => n,
    reset: () => {
      ((n = Ro()), (i = !0));
    },
  };
}
function Io(e, t) {
  return typeof t == `string` ? t !== e : Array.isArray(t) ? !jo(t, e) : !1;
}
function Lo(e = !1) {
  return { isActive: e, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} };
}
function Ro() {
  return {
    animate: Lo(!0),
    whileInView: Lo(),
    whileHover: Lo(),
    whileTap: Lo(),
    whileDrag: Lo(),
    whileFocus: Lo(),
    exit: Lo(),
  };
}
function zo(e, t) {
  ((e.min = t.min), (e.max = t.max));
}
function Bo(e, t) {
  (zo(e.x, t.x), zo(e.y, t.y));
}
function Vo(e, t) {
  ((e.translate = t.translate),
    (e.scale = t.scale),
    (e.originPoint = t.originPoint),
    (e.origin = t.origin));
}
var Ho = 0.9999,
  Uo = 1.0001,
  Wo = -0.01,
  Go = 0.01;
function Ko(e) {
  return e.max - e.min;
}
function qo(e, t, n) {
  return Math.abs(e - t) <= n;
}
function Jo(e, t, n, r = 0.5) {
  ((e.origin = r),
    (e.originPoint = G(t.min, t.max, e.origin)),
    (e.scale = Ko(n) / Ko(t)),
    (e.translate = G(n.min, n.max, e.origin) - e.originPoint),
    ((e.scale >= Ho && e.scale <= Uo) || isNaN(e.scale)) && (e.scale = 1),
    ((e.translate >= Wo && e.translate <= Go) || isNaN(e.translate)) && (e.translate = 0));
}
function Yo(e, t, n, r) {
  (Jo(e.x, t.x, n.x, r ? r.originX : void 0), Jo(e.y, t.y, n.y, r ? r.originY : void 0));
}
function Xo(e, t, n, r = 0) {
  ((e.min = (r ? G(n.min, n.max, r) : n.min) + t.min), (e.max = e.min + Ko(t)));
}
function Zo(e, t, n, r) {
  (Xo(e.x, t.x, n.x, r?.x), Xo(e.y, t.y, n.y, r?.y));
}
function Qo(e, t, n, r = 0) {
  let i = r ? G(n.min, n.max, r) : n.min;
  ((e.min = t.min - i), (e.max = e.min + Ko(t)));
}
function $o(e, t, n, r) {
  (Qo(e.x, t.x, n.x, r?.x), Qo(e.y, t.y, n.y, r?.y));
}
function es(e, t, n, r, i) {
  return ((e -= t), (e = Ka(e, 1 / n, r)), i !== void 0 && (e = Ka(e, 1 / i, r)), e);
}
function ts(e, t = 0, n = 1, r = 0.5, i, a = e, o = e) {
  if (
    (nt.test(t) && ((t = parseFloat(t)), (t = G(o.min, o.max, t / 100) - o.min)),
    typeof t != `number`)
  )
    return;
  let s = G(a.min, a.max, r);
  (e === a && (s -= t), (e.min = es(e.min, t, n, s, i)), (e.max = es(e.max, t, n, s, i)));
}
function ns(e, t, [n, r, i], a, o) {
  ts(e, t[n], t[r], t[i], t.scale, a, o);
}
var rs = [`x`, `scaleX`, `originX`],
  is = [`y`, `scaleY`, `originY`];
function as(e, t, n, r) {
  (ns(e.x, t, rs, n ? n.x : void 0, r ? r.x : void 0),
    ns(e.y, t, is, n ? n.y : void 0, r ? r.y : void 0));
}
function os(e) {
  return e.translate === 0 && e.scale === 1;
}
function ss(e) {
  return os(e.x) && os(e.y);
}
function cs(e, t) {
  return e.min === t.min && e.max === t.max;
}
function ls(e, t) {
  return cs(e.x, t.x) && cs(e.y, t.y);
}
function us(e, t) {
  return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max);
}
function ds(e, t) {
  return us(e.x, t.x) && us(e.y, t.y);
}
function fs(e) {
  return Ko(e.x) / Ko(e.y);
}
function ps(e, t) {
  return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint;
}
function ms(e) {
  return [e(`x`), e(`y`)];
}
function hs(e, t, n) {
  let r = ``,
    i = e.x.translate / t.x,
    a = e.y.translate / t.y,
    o = n?.z || 0;
  if (
    ((i || a || o) && (r = `translate3d(${i}px, ${a}px, ${o}px) `),
    (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `),
    n)
  ) {
    let {
      transformPerspective: e,
      rotate: t,
      pathRotation: i,
      rotateX: a,
      rotateY: o,
      skewX: s,
      skewY: c,
    } = n;
    (e && (r = `perspective(${e}px) ${r}`),
      t && (r += `rotate(${t}deg) `),
      i && (r += `rotate(${i}deg) `),
      a && (r += `rotateX(${a}deg) `),
      o && (r += `rotateY(${o}deg) `),
      s && (r += `skewX(${s}deg) `),
      c && (r += `skewY(${c}deg) `));
  }
  let s = e.x.scale * t.x,
    c = e.y.scale * t.y;
  return ((s !== 1 || c !== 1) && (r += `scale(${s}, ${c})`), r || `none`);
}
var gs = Ei.length,
  _s = (e) => (typeof e == `string` ? parseFloat(e) : e),
  vs = (e) => typeof e == `number` || U.test(e);
function ys(e, t, n, r, i, a) {
  i
    ? ((e.opacity = G(0, n.opacity ?? 1, xs(r))), (e.opacityExit = G(t.opacity ?? 1, 0, Ss(r))))
    : a && (e.opacity = G(t.opacity ?? 1, n.opacity ?? 1, r));
  for (let i = 0; i < gs; i++) {
    let a = Ei[i],
      o = bs(t, a),
      s = bs(n, a);
    (o === void 0 && s === void 0) ||
      ((o ||= 0),
      (s ||= 0),
      o === 0 || s === 0 || vs(o) === vs(s)
        ? ((e[a] = Math.max(G(_s(o), _s(s), r), 0)), (nt.test(s) || nt.test(o)) && (e[a] += `%`))
        : (e[a] = s));
  }
  (t.rotate || n.rotate) && (e.rotate = G(t.rotate || 0, n.rotate || 0, r));
}
function bs(e, t) {
  return e[t] === void 0 ? e.borderRadius : e[t];
}
var xs = Cs(0, 0.5, B),
  Ss = Cs(0.5, 0.95, N);
function Cs(e, t, n) {
  return (r) => (r < e ? 0 : r > t ? 1 : n(ne(e, t, r)));
}
function ws(e, t, n) {
  let r = q(e) ? e : Or(e);
  return (r.start(Rr(``, r, t, n)), r.animation);
}
function Ts(e, t, n, r = { passive: !0 }) {
  return (e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r));
}
var Es = (e, t) => e.depth - t.depth,
  Ds = class {
    constructor() {
      ((this.children = []), (this.isDirty = !1));
    }
    add(e) {
      (w(this.children, e), (this.isDirty = !0));
    }
    remove(e) {
      (T(this.children, e), (this.isDirty = !0));
    }
    forEach(e) {
      (this.isDirty && this.children.sort(Es), (this.isDirty = !1), this.children.forEach(e));
    }
  };
function Os(e, t) {
  let n = Ne.now(),
    r = ({ timestamp: i }) => {
      let a = i - n;
      a >= t && (ke(r), e(a - t));
    };
  return (V.setup(r, !0), () => ke(r));
}
function ks(e) {
  return q(e) ? e.get() : e;
}
var As = class {
    constructor() {
      this.members = [];
    }
    add(e) {
      w(this.members, e);
      for (let t = this.members.length - 1; t >= 0; t--) {
        let n = this.members[t];
        if (n === e || n === this.lead || n === this.prevLead) continue;
        let r = n.instance;
        (!r || r.isConnected === !1) && !n.snapshot && (T(this.members, n), n.unmount());
      }
      e.scheduleRender();
    }
    remove(e) {
      if ((T(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead)) {
        let e = this.members[this.members.length - 1];
        e && this.promote(e);
      }
    }
    relegate(e) {
      for (let t = this.members.indexOf(e) - 1; t >= 0; t--) {
        let e = this.members[t];
        if (e.isPresent !== !1 && e.instance?.isConnected !== !1) return (this.promote(e), !0);
      }
      return !1;
    }
    promote(e, t) {
      let n = this.lead;
      if (e !== n && ((this.prevLead = n), (this.lead = e), e.show(), n)) {
        (n.updateSnapshot(), e.scheduleRender());
        let { layoutDependency: r } = n.options,
          { layoutDependency: i } = e.options;
        ((r === void 0 || r !== i) &&
          ((e.resumeFrom = n),
          t && (n.preserveOpacity = !0),
          n.snapshot &&
            ((e.snapshot = n.snapshot),
            (e.snapshot.latestValues = n.animationValues || n.latestValues)),
          e.root?.isUpdating && (e.isLayoutDirty = !0)),
          e.options.crossfade === !1 && n.hide());
      }
    }
    exitAnimationComplete() {
      this.members.forEach((e) => {
        (e.options.onExitComplete?.(), e.resumingFrom?.options.onExitComplete?.());
      });
    }
    scheduleRender() {
      this.members.forEach((e) => e.instance && e.scheduleRender(!1));
    }
    removeLeadSnapshot() {
      this.lead?.snapshot && (this.lead.snapshot = void 0);
    }
  },
  js = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 },
  Ms = { nodes: 0, calculatedTargetDeltas: 0, calculatedProjections: 0 },
  Ns = [``, `X`, `Y`, `Z`],
  Ps = 1e3,
  Fs = 0;
function Is(e, t, n, r) {
  let { latestValues: i } = t;
  i[e] && ((n[e] = i[e]), t.setStaticValue(e, 0), r && (r[e] = 0));
}
function Ls(e) {
  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
  let { visualElement: t } = e.options;
  if (!t) return;
  let n = ti(t);
  if (window.MotionHasOptimisedAnimation(n, `transform`)) {
    let { layout: t, layoutId: r } = e.options;
    window.MotionCancelOptimisedAnimation(n, `transform`, V, !(t || r));
  }
  let { parent: r } = e;
  r && !r.hasCheckedOptimisedAppear && Ls(r);
}
function Rs({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: n,
  checkIsScrollRoot: r,
  resetTransform: i,
}) {
  return class {
    constructor(e = {}, n = t?.()) {
      ((this.id = Fs++),
        (this.animationId = 0),
        (this.animationCommitId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.layoutVersion = 0),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          ((this.projectionUpdateScheduled = !1),
            fa.value && (Ms.nodes = Ms.calculatedTargetDeltas = Ms.calculatedProjections = 0),
            this.nodes.forEach(Vs),
            this.nodes.forEach(Xs),
            this.nodes.forEach(Zs),
            this.nodes.forEach(Hs),
            fa.addProjectionMetrics && fa.addProjectionMetrics(Ms));
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.linkedParentVersion = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = e),
        (this.root = n ? n.root || n : this),
        (this.path = n ? [...n.path, n] : []),
        (this.parent = n),
        (this.depth = n ? n.depth + 1 : 0));
      for (let e = 0; e < this.path.length; e++) this.path[e].shouldResetTransform = !0;
      this.root === this && (this.nodes = new Ds());
    }
    addEventListener(e, t) {
      return (
        this.eventHandlers.has(e) || this.eventHandlers.set(e, new re()),
        this.eventHandlers.get(e).add(t)
      );
    }
    notifyListeners(e, ...t) {
      let n = this.eventHandlers.get(e);
      n && n.notify(...t);
    }
    hasListeners(e) {
      return this.eventHandlers.has(e);
    }
    mount(t) {
      if (this.instance) return;
      ((this.isSVG = Zi(t) && !pa(t)), (this.instance = t));
      let { layoutId: n, layout: r, visualElement: i } = this.options;
      if (
        (i && !i.current && i.mount(t),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        this.root.hasTreeAnimated && (r || n) && (this.isLayoutDirty = !0),
        e)
      ) {
        let n,
          r = 0,
          i = () => (this.root.updateBlockedByResize = !1);
        (V.read(() => {
          r = window.innerWidth;
        }),
          e(t, () => {
            let e = window.innerWidth;
            e !== r &&
              ((r = e),
              (this.root.updateBlockedByResize = !0),
              n && n(),
              (n = Os(i, 250)),
              js.hasAnimatedSinceResize &&
                ((js.hasAnimatedSinceResize = !1), this.nodes.forEach(Ys)));
          }));
      }
      (n && this.root.registerSharedNode(n, this),
        this.options.animate !== !1 &&
          i &&
          (n || r) &&
          this.addEventListener(
            `didUpdate`,
            ({ delta: e, hasLayoutChanged: t, hasRelativeLayoutChanged: n, layout: r }) => {
              if (this.isTreeAnimationBlocked()) {
                ((this.target = void 0), (this.relativeTarget = void 0));
                return;
              }
              let a = this.options.transition || i.getDefaultTransition() || ic,
                { onLayoutAnimationStart: o, onLayoutAnimationComplete: s } = i.getProps(),
                c = !this.targetLayout || !ds(this.targetLayout, r),
                l = !t && n;
              if (
                this.options.layoutRoot ||
                this.resumeFrom ||
                l ||
                (t && (c || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0));
                let t = { ...Ar(a, `layout`), onPlay: o, onComplete: s };
                ((i.shouldReduceMotion || this.options.layoutRoot) &&
                  ((t.delay = 0), (t.type = !1)),
                  this.startAnimation(t),
                  this.setAnimationOrigin(e, l, t.path));
              } else
                (t || Ys(this),
                  this.isLead() && this.options.onExitComplete && this.options.onExitComplete());
              this.targetLayout = r;
            },
          ));
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this));
      let e = this.getStack();
      (e && e.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        this.eventHandlers.clear(),
        ke(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1;
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0), this.nodes && this.nodes.forEach(Qs), this.animationId++);
    }
    getTransformTemplate() {
      let { visualElement: e } = this.options;
      return e && e.getProps().transformTemplate;
    }
    willUpdate(e = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Ls(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let e = 0; e < this.path.length; e++) {
        let t = this.path[e];
        ((t.shouldResetTransform = !0),
          (typeof t.latestValues.x == `string` || typeof t.latestValues.y == `string`) &&
            (t.isLayoutDirty = !0),
          t.updateScroll(`snapshot`),
          t.options.layoutRoot && t.willUpdate(!1));
      }
      let { layoutId: t, layout: n } = this.options;
      if (t === void 0 && !n) return;
      let r = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = r ? r(this.latestValues, ``) : void 0),
        this.updateSnapshot(),
        e && this.notifyListeners(`willUpdate`));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        let e = this.updateBlockedByResize;
        (this.unblockUpdate(),
          (this.updateBlockedByResize = !1),
          this.clearAllSnapshots(),
          e && this.nodes.forEach(Gs),
          this.nodes.forEach(Ws));
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Ks);
        return;
      }
      ((this.animationCommitId = this.animationId),
        this.isUpdating
          ? ((this.isUpdating = !1),
            this.nodes.forEach(qs),
            this.nodes.forEach(Js),
            this.nodes.forEach(zs),
            this.nodes.forEach(Bs))
          : this.nodes.forEach(Ks),
        this.clearAllSnapshots());
      let e = Ne.now();
      ((H.delta = E(0, 1e3 / 60, e - H.timestamp)),
        (H.timestamp = e),
        (H.isProcessing = !0),
        Ae.update.process(H),
        Ae.preRender.process(H),
        Ae.render.process(H),
        (H.isProcessing = !1));
    }
    didUpdate() {
      this.updateScheduled || ((this.updateScheduled = !0), Ai.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(Us), this.sharedNodes.forEach($s));
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0), V.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      V.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot ||
        !this.instance ||
        ((this.snapshot = this.measure()),
        this.snapshot &&
          !Ko(this.snapshot.measuredBox.x) &&
          !Ko(this.snapshot.measuredBox.y) &&
          (this.snapshot = void 0));
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let e = 0; e < this.path.length; e++) this.path[e].updateScroll();
      let e = this.layout;
      ((this.layout = this.measure(!1)),
        this.layoutVersion++,
        (this.layoutCorrected ||= J()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners(`measure`, this.layout.layoutBox));
      let { visualElement: t } = this.options;
      t && t.notify(`LayoutMeasure`, this.layout.layoutBox, e ? e.layoutBox : void 0);
    }
    updateScroll(e = `measure`) {
      let t = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === e &&
          (t = !1),
        t && this.instance)
      ) {
        let t = r(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: e,
          isRoot: t,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : t,
        };
      }
    }
    resetTransform() {
      if (!i) return;
      let e = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
        t = this.projectionDelta && !ss(this.projectionDelta),
        n = this.getTransformTemplate(),
        r = n ? n(this.latestValues, ``) : void 0,
        a = r !== this.prevTransformTemplateValue;
      e &&
        this.instance &&
        (t || Ua(this.latestValues) || a) &&
        (i(this.instance, r), (this.shouldResetTransform = !1), this.scheduleRender());
    }
    measure(e = !0) {
      let t = this.measurePageBox(),
        n = this.removeElementScroll(t);
      return (
        e && (n = this.removeTransform(n)),
        cc(n),
        {
          animationId: this.root.animationId,
          measuredBox: t,
          layoutBox: n,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      let { visualElement: e } = this.options;
      if (!e) return J();
      let t = e.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(uc))) {
        let { scroll: e } = this.root;
        e && ($a(t.x, e.offset.x), $a(t.y, e.offset.y));
      }
      return t;
    }
    removeElementScroll(e) {
      let t = J();
      if ((Bo(t, e), this.scroll?.wasRoot)) return t;
      for (let n = 0; n < this.path.length; n++) {
        let r = this.path[n],
          { scroll: i, options: a } = r;
        r !== this.root &&
          i &&
          a.layoutScroll &&
          (i.wasRoot && Bo(t, e), $a(t.x, i.offset.x), $a(t.y, i.offset.y));
      }
      return t;
    }
    applyTransform(e, t = !1, n) {
      let r = n || J();
      Bo(r, e);
      for (let e = 0; e < this.path.length; e++) {
        let n = this.path[e];
        (!t &&
          n.options.layoutScroll &&
          n.scroll &&
          n !== n.root &&
          ($a(r.x, -n.scroll.offset.x), $a(r.y, -n.scroll.offset.y)),
          Ua(n.latestValues) && no(r, n.latestValues, n.layout?.layoutBox));
      }
      return (Ua(this.latestValues) && no(r, this.latestValues, this.layout?.layoutBox), r);
    }
    removeTransform(e) {
      let t = J();
      Bo(t, e);
      for (let e = 0; e < this.path.length; e++) {
        let n = this.path[e];
        if (!Ua(n.latestValues)) continue;
        let r;
        (n.instance &&
          (Ha(n.latestValues) && n.updateSnapshot(), (r = J()), Bo(r, n.measurePageBox())),
          as(t, n.latestValues, n.snapshot?.layoutBox, r));
      }
      return (Ua(this.latestValues) && as(t, this.latestValues), t);
    }
    setTargetDelta(e) {
      ((this.targetDelta = e), this.root.scheduleUpdateProjection(), (this.isProjectionDirty = !0));
    }
    setOptions(e) {
      this.options = { ...this.options, ...e, crossfade: e.crossfade === void 0 || e.crossfade };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== H.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(e = !1) {
      let t = this.getLead();
      ((this.isProjectionDirty ||= t.isProjectionDirty),
        (this.isTransformDirty ||= t.isTransformDirty),
        (this.isSharedProjectionDirty ||= t.isSharedProjectionDirty));
      let n = !!this.resumingFrom || this !== t;
      if (!(
        e ||
        (n && this.isSharedProjectionDirty) ||
        this.isProjectionDirty ||
        this.parent?.isProjectionDirty ||
        this.attemptToResolveRelativeTarget ||
        this.root.updateBlockedByResize
      ))
        return;
      let { layout: r, layoutId: i } = this.options;
      if (!this.layout || !(r || i)) return;
      this.resolvedRelativeTargetAt = H.timestamp;
      let a = this.getClosestProjectingParent();
      (a &&
        this.linkedParentVersion !== a.layoutVersion &&
        !a.options.layoutRoot &&
        this.removeRelativeTarget(),
        !this.targetDelta &&
          !this.relativeTarget &&
          (this.options.layoutAnchor !== !1 && a && a.layout
            ? this.createRelativeTarget(a, this.layout.layoutBox, a.layout.layoutBox)
            : this.removeRelativeTarget()),
        !(!this.relativeTarget && !this.targetDelta) &&
          (this.target || ((this.target = J()), (this.targetWithTransforms = J())),
          this.relativeTarget &&
          this.relativeTargetOrigin &&
          this.relativeParent &&
          this.relativeParent.target
            ? (this.forceRelativeParentToResolveTarget(),
              Zo(
                this.target,
                this.relativeTarget,
                this.relativeParent.target,
                this.options.layoutAnchor || void 0,
              ))
            : this.targetDelta
              ? (this.resumingFrom
                  ? this.applyTransform(this.layout.layoutBox, !1, this.target)
                  : Bo(this.target, this.layout.layoutBox),
                Ya(this.target, this.targetDelta))
              : Bo(this.target, this.layout.layoutBox),
          this.attemptToResolveRelativeTarget &&
            ((this.attemptToResolveRelativeTarget = !1),
            this.options.layoutAnchor !== !1 &&
            a &&
            !!a.resumingFrom == !!this.resumingFrom &&
            !a.options.layoutScroll &&
            a.target &&
            this.animationProgress !== 1
              ? this.createRelativeTarget(a, this.target, a.target)
              : (this.relativeParent = this.relativeTarget = void 0)),
          fa.value && Ms.calculatedTargetDeltas++));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Ha(this.parent.latestValues) || Wa(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    createRelativeTarget(e, t, n) {
      ((this.relativeParent = e),
        (this.linkedParentVersion = e.layoutVersion),
        this.forceRelativeParentToResolveTarget(),
        (this.relativeTarget = J()),
        (this.relativeTargetOrigin = J()),
        $o(this.relativeTargetOrigin, t, n, this.options.layoutAnchor || void 0),
        Bo(this.relativeTarget, this.relativeTargetOrigin));
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      let e = this.getLead(),
        t = !!this.resumingFrom || this !== e,
        n = !0;
      if (
        ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (n = !1),
        t && (this.isSharedProjectionDirty || this.isTransformDirty) && (n = !1),
        this.resolvedRelativeTargetAt === H.timestamp && (n = !1),
        n)
      )
        return;
      let { layout: r, layoutId: i } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(r || i))
      )
        return;
      Bo(this.layoutCorrected, this.layout.layoutBox);
      let a = this.treeScale.x,
        o = this.treeScale.y;
      (Qa(this.layoutCorrected, this.treeScale, this.path, t),
        e.layout &&
          !e.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((e.target = e.layout.layoutBox), (e.targetWithTransforms = J())));
      let { target: s } = e;
      if (!s) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      (!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (Vo(this.prevProjectionDelta.x, this.projectionDelta.x),
          Vo(this.prevProjectionDelta.y, this.projectionDelta.y)),
        Yo(this.projectionDelta, this.layoutCorrected, s, this.latestValues),
        (this.treeScale.x !== a ||
          this.treeScale.y !== o ||
          !ps(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !ps(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners(`projectionUpdate`, s)),
        fa.value && Ms.calculatedProjections++);
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(e = !0) {
      if ((this.options.visualElement?.scheduleRender(), e)) {
        let e = this.getStack();
        e && e.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      ((this.prevProjectionDelta = _a()),
        (this.projectionDelta = _a()),
        (this.projectionDeltaWithTransform = _a()));
    }
    setAnimationOrigin(e, t = !1, n) {
      let r = this.snapshot,
        i = r ? r.latestValues : {},
        a = { ...this.latestValues },
        o = _a();
      ((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !t));
      let s = J(),
        c = (r ? r.source : void 0) !== (this.layout ? this.layout.source : void 0),
        l = this.getStack(),
        u = !l || l.members.length <= 1,
        d = !!(c && !u && this.options.crossfade === !0 && !this.path.some(rc));
      this.animationProgress = 0;
      let f,
        p = n?.interpolateProjection(e);
      ((this.mixTargetDelta = (t) => {
        let n = t / 1e3,
          r = p?.(n);
        (r
          ? ((o.x.translate = r.x),
            (o.x.scale = G(e.x.scale, 1, n)),
            (o.x.origin = e.x.origin),
            (o.x.originPoint = e.x.originPoint),
            (o.y.translate = r.y),
            (o.y.scale = G(e.y.scale, 1, n)),
            (o.y.origin = e.y.origin),
            (o.y.originPoint = e.y.originPoint))
          : (ec(o.x, e.x, n), ec(o.y, e.y, n)),
          this.setTargetDelta(o),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            ($o(
              s,
              this.layout.layoutBox,
              this.relativeParent.layout.layoutBox,
              this.options.layoutAnchor || void 0,
            ),
            nc(this.relativeTarget, this.relativeTargetOrigin, s, n),
            f && ls(this.relativeTarget, f) && (this.isProjectionDirty = !1),
            (f ||= J()),
            Bo(f, this.relativeTarget)),
          c && ((this.animationValues = a), ys(a, i, this.latestValues, n, d, u)),
          r &&
            r.rotate !== void 0 &&
            ((this.animationValues ||= a), (this.animationValues.pathRotation = r.rotate)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = n));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
    }
    startAnimation(e) {
      (this.notifyListeners(`animationStart`),
        this.currentAnimation?.stop(),
        this.resumingFrom?.currentAnimation?.stop(),
        (this.pendingAnimation &&= (ke(this.pendingAnimation), void 0)),
        (this.pendingAnimation = V.update(() => {
          ((js.hasAnimatedSinceResize = !0),
            (this.motionValue ||= Or(0)),
            this.motionValue.jump(0, !1),
            (this.currentAnimation = ws(this.motionValue, [0, 1e3], {
              ...e,
              velocity: 0,
              isSync: !0,
              onUpdate: (t) => {
                (this.mixTargetDelta(t), e.onUpdate && e.onUpdate(t));
              },
              onComplete: () => {
                (e.onComplete && e.onComplete(), this.completeAnimation());
              },
            })),
            this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0));
        })));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      let e = this.getStack();
      (e && e.exitAnimationComplete(),
        (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
        this.notifyListeners(`animationComplete`));
    }
    finishAnimation() {
      (this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(Ps), this.currentAnimation.stop()),
        this.completeAnimation());
    }
    applyTransformsToTarget() {
      let e = this.getLead(),
        { targetWithTransforms: t, target: n, layout: r, latestValues: i } = e;
      if (!(!t || !n || !r)) {
        if (
          this !== e &&
          this.layout &&
          r &&
          lc(this.options.animationType, this.layout.layoutBox, r.layoutBox)
        ) {
          n = this.target || J();
          let t = Ko(this.layout.layoutBox.x);
          ((n.x.min = e.target.x.min), (n.x.max = n.x.min + t));
          let r = Ko(this.layout.layoutBox.y);
          ((n.y.min = e.target.y.min), (n.y.max = n.y.min + r));
        }
        (Bo(t, n), no(t, i), Yo(this.projectionDeltaWithTransform, this.layoutCorrected, t, i));
      }
    }
    registerSharedNode(e, t) {
      (this.sharedNodes.has(e) || this.sharedNodes.set(e, new As()),
        this.sharedNodes.get(e).add(t));
      let n = t.options.initialPromotionConfig;
      t.promote({
        transition: n ? n.transition : void 0,
        preserveFollowOpacity:
          n && n.shouldPreserveFollowOpacity ? n.shouldPreserveFollowOpacity(t) : void 0,
      });
    }
    isLead() {
      let e = this.getStack();
      return !e || e.lead === this;
    }
    getLead() {
      let { layoutId: e } = this.options;
      return (e && this.getStack()?.lead) || this;
    }
    getPrevLead() {
      let { layoutId: e } = this.options;
      return e ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      let { layoutId: e } = this.options;
      if (e) return this.root.sharedNodes.get(e);
    }
    promote({ needsReset: e, transition: t, preserveFollowOpacity: n } = {}) {
      let r = this.getStack();
      (r && r.promote(this, n),
        e && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        t && this.setOptions({ transition: t }));
    }
    relegate() {
      let e = this.getStack();
      return e ? e.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      let { visualElement: e } = this.options;
      if (!e) return;
      let t = !1,
        { latestValues: n } = e;
      if (
        ((n.z || n.rotate || n.rotateX || n.rotateY || n.rotateZ || n.skewX || n.skewY) && (t = !0),
        !t)
      )
        return;
      let r = {};
      n.z && Is(`z`, e, r, this.animationValues);
      for (let t = 0; t < Ns.length; t++)
        (Is(`rotate${Ns[t]}`, e, r, this.animationValues),
          Is(`skew${Ns[t]}`, e, r, this.animationValues));
      e.render();
      for (let t in r)
        (e.setStaticValue(t, r[t]), this.animationValues && (this.animationValues[t] = r[t]));
      e.scheduleRender();
    }
    applyProjectionStyles(e, t) {
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) {
        e.visibility = `hidden`;
        return;
      }
      let n = this.getTransformTemplate();
      if (this.needsReset) {
        ((this.needsReset = !1),
          (e.visibility = ``),
          (e.opacity = ``),
          (e.pointerEvents = ks(t?.pointerEvents) || ``),
          (e.transform = n ? n(this.latestValues, ``) : `none`));
        return;
      }
      let r = this.getLead();
      if (!this.projectionDelta || !this.layout || !r.target) {
        (this.options.layoutId &&
          ((e.opacity = this.latestValues.opacity === void 0 ? 1 : this.latestValues.opacity),
          (e.pointerEvents = ks(t?.pointerEvents) || ``)),
          this.hasProjected &&
            !Ua(this.latestValues) &&
            ((e.transform = n ? n({}, ``) : `none`), (this.hasProjected = !1)));
        return;
      }
      e.visibility = ``;
      let i = r.animationValues || r.latestValues;
      this.applyTransformsToTarget();
      let a = hs(this.projectionDeltaWithTransform, this.treeScale, i);
      (n && (a = n(i, a)), (e.transform = a));
      let { x: o, y: s } = this.projectionDelta;
      ((e.transformOrigin = `${o.origin * 100}% ${s.origin * 100}% 0`),
        r.animationValues
          ? (e.opacity =
              r === this
                ? (i.opacity ?? this.latestValues.opacity ?? 1)
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : i.opacityExit)
          : (e.opacity =
              r === this
                ? i.opacity === void 0
                  ? ``
                  : i.opacity
                : i.opacityExit === void 0
                  ? 0
                  : i.opacityExit));
      for (let t in mo) {
        if (i[t] === void 0) continue;
        let { correct: n, applyTo: o, isCSSVariable: s } = mo[t],
          c = a === `none` ? i[t] : n(i[t], r);
        if (o) {
          let t = o.length;
          for (let n = 0; n < t; n++) e[o[n]] = c;
        } else s ? (this.options.visualElement.renderState.vars[t] = c) : (e[t] = c);
      }
      this.options.layoutId && (e.pointerEvents = r === this ? ks(t?.pointerEvents) || `` : `none`);
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach((e) => e.currentAnimation?.stop()),
        this.root.nodes.forEach(Ws),
        this.root.sharedNodes.clear());
    }
  };
}
function zs(e) {
  e.updateLayout();
}
function Bs(e) {
  let t = e.resumeFrom?.snapshot || e.snapshot;
  if (e.isLead() && e.layout && t && e.hasListeners(`didUpdate`)) {
    let { layoutBox: n, measuredBox: r } = e.layout,
      { animationType: i } = e.options,
      a = t.source !== e.layout.source;
    if (i === `size`)
      ms((e) => {
        let r = a ? t.measuredBox[e] : t.layoutBox[e],
          i = Ko(r);
        ((r.min = n[e].min), (r.max = r.min + i));
      });
    else if (i === `x` || i === `y`) {
      let e = i === `x` ? `y` : `x`;
      zo(a ? t.measuredBox[e] : t.layoutBox[e], n[e]);
    } else
      lc(i, t.layoutBox, n) &&
        ms((r) => {
          let i = a ? t.measuredBox[r] : t.layoutBox[r],
            o = Ko(n[r]);
          ((i.max = i.min + o),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0),
              (e.relativeTarget[r].max = e.relativeTarget[r].min + o)));
        });
    let o = _a();
    Yo(o, n, t.layoutBox);
    let s = _a();
    a ? Yo(s, e.applyTransform(r, !0), t.measuredBox) : Yo(s, n, t.layoutBox);
    let c = !ss(o),
      l = !1;
    if (!e.resumeFrom) {
      let r = e.getClosestProjectingParent();
      if (r && !r.resumeFrom) {
        let { snapshot: i, layout: a } = r;
        if (i && a) {
          let o = e.options.layoutAnchor || void 0,
            s = J();
          $o(s, t.layoutBox, i.layoutBox, o);
          let c = J();
          ($o(c, n, a.layoutBox, o),
            ds(s, c) || (l = !0),
            r.options.layoutRoot &&
              ((e.relativeTarget = c), (e.relativeTargetOrigin = s), (e.relativeParent = r)));
        }
      }
    }
    e.notifyListeners(`didUpdate`, {
      layout: n,
      snapshot: t,
      delta: s,
      layoutDelta: o,
      hasLayoutChanged: c,
      hasRelativeLayoutChanged: l,
    });
  } else if (e.isLead()) {
    let { onExitComplete: t } = e.options;
    t && t();
  }
  e.options.transition = void 0;
}
function Vs(e) {
  (fa.value && Ms.nodes++,
    e.parent &&
      (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
      (e.isSharedProjectionDirty ||= !!(
        e.isProjectionDirty ||
        e.parent.isProjectionDirty ||
        e.parent.isSharedProjectionDirty
      )),
      (e.isTransformDirty ||= e.parent.isTransformDirty)));
}
function Hs(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function Us(e) {
  e.clearSnapshot();
}
function Ws(e) {
  e.clearMeasurements();
}
function Gs(e) {
  ((e.isLayoutDirty = !0), e.updateLayout());
}
function Ks(e) {
  e.isLayoutDirty = !1;
}
function qs(e) {
  e.isAnimationBlocked &&
    e.layout &&
    !e.isLayoutDirty &&
    ((e.snapshot = e.layout), (e.isLayoutDirty = !0));
}
function Js(e) {
  let { visualElement: t } = e.options;
  (t && t.getProps().onBeforeLayoutMeasure && t.notify(`BeforeLayoutMeasure`), e.resetTransform());
}
function Ys(e) {
  (e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0));
}
function Xs(e) {
  e.resolveTargetDelta();
}
function Zs(e) {
  e.calcProjection();
}
function Qs(e) {
  e.resetSkewAndRotation();
}
function $s(e) {
  e.removeLeadSnapshot();
}
function ec(e, t, n) {
  ((e.translate = G(t.translate, 0, n)),
    (e.scale = G(t.scale, 1, n)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint));
}
function tc(e, t, n, r) {
  ((e.min = G(t.min, n.min, r)), (e.max = G(t.max, n.max, r)));
}
function nc(e, t, n, r) {
  (tc(e.x, t.x, n.x, r), tc(e.y, t.y, n.y, r));
}
function rc(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
var ic = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  ac = (e) =>
    typeof navigator < `u` && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e),
  oc = ac(`applewebkit/`) && !ac(`chrome/`) ? Math.round : N;
function sc(e) {
  ((e.min = oc(e.min)), (e.max = oc(e.max)));
}
function cc(e) {
  (sc(e.x), sc(e.y));
}
function lc(e, t, n) {
  return e === `position` || (e === `preserve-aspect` && !qo(fs(t), fs(n), 0.2));
}
function uc(e) {
  return e !== e.root && e.scroll?.wasRoot;
}
var dc = Rs({
    attachResizeListener: (e, t) => Ts(e, `resize`, t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
      y: document.documentElement.scrollTop || document.body?.scrollTop || 0,
    }),
    checkIsScrollRoot: () => !0,
  }),
  fc = { current: void 0 },
  pc = Rs({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!fc.current) {
        let e = new dc({});
        (e.mount(window), e.setOptions({ layoutScroll: !0 }), (fc.current = e));
      }
      return fc.current;
    },
    resetTransform: (e, t) => {
      e.style.transform = t === void 0 ? `none` : t;
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === `fixed`,
  }),
  mc = (0, y.createContext)({ transformPagePoint: (e) => e, isStatic: !1, reducedMotion: `never` });
function hc(e, t) {
  if (typeof e == `function`) return e(t);
  e != null && (e.current = t);
}
function gc(...e) {
  return (t) => {
    let n = !1,
      r = e.map((e) => {
        let r = hc(e, t);
        return (!n && typeof r == `function` && (n = !0), r);
      });
    if (n)
      return () => {
        for (let t = 0; t < r.length; t++) {
          let n = r[t];
          typeof n == `function` ? n() : hc(e[t], null);
        }
      };
  };
}
function _c(...e) {
  return y.useCallback(gc(...e), e);
}
var vc = class extends y.Component {
  getSnapshotBeforeUpdate(e) {
    let t = this.props.childRef.current;
    if (ki(t) && e.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      let e = t.offsetParent,
        n = (ki(e) && e.offsetWidth) || 0,
        r = (ki(e) && e.offsetHeight) || 0,
        i = getComputedStyle(t),
        a = this.props.sizeRef.current;
      ((a.height = parseFloat(i.height)),
        (a.width = parseFloat(i.width)),
        (a.top = t.offsetTop),
        (a.left = t.offsetLeft),
        (a.right = n - a.width - a.left),
        (a.bottom = r - a.height - a.top),
        (a.direction = i.direction));
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
};
function yc({ children: e, isPresent: t, anchorX: n, anchorY: r, root: i, pop: a }) {
  let o = (0, y.useId)(),
    s = (0, y.useRef)(null),
    c = (0, y.useRef)({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      direction: `ltr`,
    }),
    { nonce: l } = (0, y.useContext)(mc),
    u = _c(s, e.props?.ref ?? e?.ref);
  return (
    (0, y.useInsertionEffect)(() => {
      let { width: e, height: u, top: d, left: f, right: p, bottom: m, direction: h } = c.current;
      if (t || a === !1 || !s.current || !e || !u) return;
      let g = h === `rtl`,
        _ = n === `left` ? (g ? `right: ${p}` : `left: ${f}`) : g ? `left: ${f}` : `right: ${p}`,
        v = r === `bottom` ? `bottom: ${m}` : `top: ${d}`;
      s.current.dataset.motionPopId = o;
      let y = document.createElement(`style`);
      l && (y.nonce = l);
      let b = i ?? document.head;
      return (
        b.appendChild(y),
        y.sheet &&
          y.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${u}px !important;
            ${_}px !important;
            ${v}px !important;
          }
        `),
        () => {
          (s.current?.removeAttribute(`data-motion-pop-id`), b.contains(y) && b.removeChild(y));
        }
      );
    }, [t]),
    (0, v.jsx)(vc, {
      isPresent: t,
      childRef: s,
      sizeRef: c,
      pop: a,
      children: a === !1 ? e : y.cloneElement(e, { ref: u }),
    })
  );
}
var bc = ({
  children: e,
  initial: t,
  isPresent: n,
  onExitComplete: r,
  custom: i,
  presenceAffectsLayout: a,
  mode: o,
  anchorX: s,
  anchorY: c,
  root: l,
}) => {
  let u = x(xc),
    d = (0, y.useId)(),
    f = (0, y.useRef)(n),
    p = (0, y.useRef)(r);
  S(() => {
    ((f.current = n), (p.current = r));
  });
  let m = !0,
    h = (0, y.useMemo)(
      () => (
        (m = !1),
        {
          id: d,
          initial: t,
          isPresent: n,
          custom: i,
          onExitComplete: (e) => {
            u.set(e, !0);
            for (let e of u.values()) if (!e) return;
            r && r();
          },
          register: (e) => (
            u.set(e, !1),
            () => {
              (u.delete(e), !f.current && !u.size && p.current?.());
            }
          ),
        }
      ),
      [n, u, r],
    );
  return (
    a && m && (h = { ...h }),
    (0, y.useMemo)(() => {
      u.forEach((e, t) => u.set(t, !1));
    }, [n]),
    y.useEffect(() => {
      !n && !u.size && r && r();
    }, [n]),
    (e = (0, v.jsx)(yc, {
      pop: o === `popLayout`,
      isPresent: n,
      anchorX: s,
      anchorY: c,
      root: l,
      children: e,
    })),
    (0, v.jsx)(C.Provider, { value: h, children: e })
  );
};
function xc() {
  return new Map();
}
function Sc(e = !0) {
  let t = (0, y.useContext)(C);
  if (t === null) return [!0, null];
  let { isPresent: n, onExitComplete: r, register: i } = t,
    a = (0, y.useId)();
  (0, y.useEffect)(() => {
    if (e) return i(a);
  }, [e]);
  let o = (0, y.useCallback)(() => e && r && r(a), [a, r, e]);
  return !n && r ? [!1, o] : [!0];
}
var Cc = (e) => e.key || ``;
function wc(e) {
  let t = [];
  return (
    y.Children.forEach(e, (e) => {
      (0, y.isValidElement)(e) && t.push(e);
    }),
    t
  );
}
var Tc = ({
    children: e,
    custom: t,
    initial: n = !0,
    onExitComplete: r,
    presenceAffectsLayout: i = !0,
    mode: a = `sync`,
    propagate: o = !1,
    anchorX: s = `left`,
    anchorY: c = `top`,
    root: l,
  }) => {
    let [u, d] = Sc(o),
      f = (0, y.useMemo)(() => wc(e), [e]),
      p = o && !u ? [] : f.map(Cc),
      m = (0, y.useRef)(!0),
      h = (0, y.useRef)(f),
      g = x(() => new Map()),
      _ = (0, y.useRef)(new Set()),
      [C, w] = (0, y.useState)(f),
      [T, E] = (0, y.useState)(f);
    S(() => {
      ((m.current = !1), (h.current = f));
      for (let e = 0; e < T.length; e++) {
        let t = Cc(T[e]);
        p.includes(t) ? (g.delete(t), _.current.delete(t)) : g.get(t) !== !0 && g.set(t, !1);
      }
    }, [T, p.length, p.join(`-`)]);
    let D = [];
    if (f !== C) {
      let e = [...f];
      for (let t = 0; t < T.length; t++) {
        let n = T[t],
          r = Cc(n);
        p.includes(r) || (e.splice(t, 0, n), D.push(n));
      }
      return (a === `wait` && D.length && (e = D), E(wc(e)), w(f), null);
    }
    a === `wait` &&
      T.length > 1 &&
      console.warn(
        `You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`,
      );
    let { forceRender: O } = (0, y.useContext)(b);
    return (0, v.jsx)(v.Fragment, {
      children: T.map((e) => {
        let y = Cc(e),
          b = o && !u ? !1 : f === T || p.includes(y);
        return (0, v.jsx)(
          bc,
          {
            isPresent: b,
            initial: !m.current || n ? void 0 : !1,
            custom: t,
            presenceAffectsLayout: i,
            mode: a,
            root: l,
            onExitComplete: b
              ? void 0
              : () => {
                  if (_.current.has(y)) return;
                  if (g.has(y)) (_.current.add(y), g.set(y, !0));
                  else return;
                  let e = !0;
                  (g.forEach((t) => {
                    t || (e = !1);
                  }),
                    e && (O?.(), E(h.current), o && d?.(), r && r()));
                },
            anchorX: s,
            anchorY: c,
            children: e,
          },
          y,
        );
      }),
    });
  },
  Ec = (0, y.createContext)({ strict: !1 }),
  Dc = {
    animation: [
      `animate`,
      `variants`,
      `whileHover`,
      `whileTap`,
      `exit`,
      `whileInView`,
      `whileFocus`,
      `whileDrag`,
    ],
    exit: [`exit`],
    drag: [`drag`, `dragControls`],
    focus: [`whileFocus`],
    hover: [`whileHover`, `onHoverStart`, `onHoverEnd`],
    tap: [`whileTap`, `onTap`, `onTapStart`, `onTapCancel`],
    pan: [`onPan`, `onPanStart`, `onPanSessionStart`, `onPanEnd`],
    inView: [`whileInView`, `onViewportEnter`, `onViewportLeave`],
    layout: [`layout`, `layoutId`],
  },
  Oc = !1;
function kc() {
  if (Oc) return;
  let e = {};
  for (let t in Dc) e[t] = { isEnabled: (e) => Dc[t].some((t) => !!e[t]) };
  (Na(e), (Oc = !0));
}
function Ac() {
  return (kc(), Pa());
}
function jc(e) {
  let t = Ac();
  for (let n in e) t[n] = { ...t[n], ...e[n] };
  Na(t);
}
var Mc = new Set(
  `animate.exit.variants.initial.style.values.variants.transition.transformTemplate.custom.inherit.onBeforeLayoutMeasure.onAnimationStart.onAnimationComplete.onUpdate.onDragStart.onDrag.onDragEnd.onMeasureDragConstraints.onDirectionLock.onDragTransitionEnd._dragX._dragY.onHoverStart.onHoverEnd.onViewportEnter.onViewportLeave.globalTapTarget.propagate.ignoreStrict.viewport`.split(
    `.`,
  ),
);
function Nc(e) {
  return (
    e.startsWith(`while`) ||
    (e.startsWith(`drag`) && e !== `draggable`) ||
    e.startsWith(`layout`) ||
    e.startsWith(`onTap`) ||
    e.startsWith(`onPan`) ||
    e.startsWith(`onLayout`) ||
    Mc.has(e)
  );
}
var Pc = c({ default: () => Fc }),
  Fc,
  Ic = o(() => {
    throw (
      (Fc = {}),
      Error(`Could not resolve "@emotion/is-prop-valid" imported by "framer-motion".`)
    );
  }),
  Lc = (e) => !Nc(e);
function Rc(e) {
  typeof e == `function` && (Lc = (t) => (t.startsWith(`on`) ? !Nc(t) : e(t)));
}
try {
  Rc((Ic(), d(Pc)).default);
} catch {}
function zc(e, t, n) {
  let r = {};
  for (let i in e)
    (i === `values` && typeof e.values == `object`) ||
      q(e[i]) ||
      ((Lc(i) ||
        (n === !0 && Nc(i)) ||
        (!t && !Nc(i)) ||
        (e.draggable && i.startsWith(`onDrag`))) &&
        (r[i] = e[i]));
  return r;
}
var Bc = (0, y.createContext)({});
function Vc(e, t) {
  if (wa(e)) {
    let { initial: t, animate: n } = e;
    return { initial: t === !1 || xa(t) ? t : void 0, animate: xa(n) ? n : void 0 };
  }
  return e.inherit === !1 ? {} : t;
}
function Hc(e) {
  let { initial: t, animate: n } = Vc(e, (0, y.useContext)(Bc));
  return (0, y.useMemo)(() => ({ initial: t, animate: n }), [Uc(t), Uc(n)]);
}
function Uc(e) {
  return Array.isArray(e) ? e.join(` `) : e;
}
var Wc = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function Gc(e, t, n) {
  for (let r in t) !q(t[r]) && !ho(r, n) && (e[r] = t[r]);
}
function Kc({ transformTemplate: e }, t) {
  return (0, y.useMemo)(() => {
    let n = Wc();
    return (co(n, t, e), Object.assign({}, n.vars, n.style));
  }, [t]);
}
function qc(e, t) {
  let n = e.style || {},
    r = {};
  return (Gc(r, n, e), Object.assign(r, Kc(e, t)), r);
}
function Jc(e, t) {
  let n = {},
    r = qc(e, t);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((n.draggable = !1),
      (r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = `none`),
      (r.touchAction = e.drag === !0 ? `none` : `pan-${e.drag === `x` ? `y` : `x`}`)),
    e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0),
    (n.style = r),
    n
  );
}
var Yc = () => ({ ...Wc(), attrs: {} });
function Xc(e, t, n, r) {
  let i = (0, y.useMemo)(() => {
    let n = Yc();
    return (Co(n, t, To(r), e.transformTemplate, e.style), { ...n.attrs, style: { ...n.style } });
  }, [t]);
  if (e.style) {
    let t = {};
    (Gc(t, e.style, e), (i.style = { ...t, ...i.style }));
  }
  return i;
}
var Zc = [
  `animate`,
  `circle`,
  `defs`,
  `desc`,
  `ellipse`,
  `g`,
  `image`,
  `line`,
  `filter`,
  `marker`,
  `mask`,
  `metadata`,
  `path`,
  `pattern`,
  `polygon`,
  `polyline`,
  `rect`,
  `stop`,
  `switch`,
  `symbol`,
  `svg`,
  `text`,
  `tspan`,
  `use`,
  `view`,
];
function Qc(e) {
  return typeof e != `string` || e.includes(`-`) ? !1 : !!(Zc.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
function $c(e, t, n, { latestValues: r }, i, a = !1, o) {
  let s = ((o ?? Qc(e)) ? Xc : Jc)(t, r, i, e),
    c = zc(t, typeof e == `string`, a),
    l = e === y.Fragment ? {} : { ...c, ...s, ref: n },
    { children: u } = t,
    d = (0, y.useMemo)(() => (q(u) ? u.get() : u), [u]);
  return (0, y.createElement)(e, { ...l, children: d });
}
function el({ scrapeMotionValuesFromProps: e, createRenderState: t }, n, r, i) {
  return { latestValues: tl(n, r, i, e), renderState: t() };
}
function tl(e, t, n, r) {
  let i = {},
    a = r(e, {});
  for (let e in a) i[e] = ks(a[e]);
  let { initial: o, animate: s } = e,
    c = wa(e),
    l = Ta(e);
  t &&
    l &&
    !c &&
    e.inherit !== !1 &&
    (o === void 0 && (o = t.initial), s === void 0 && (s = t.animate));
  let u = n ? n.initial === !1 : !1;
  u ||= o === !1;
  let d = u ? s : o;
  if (d && typeof d != `boolean` && !ba(d)) {
    let t = Array.isArray(d) ? d : [d];
    for (let n = 0; n < t.length; n++) {
      let r = Wr(e, t[n]);
      if (r) {
        let { transitionEnd: e, transition: t, ...n } = r;
        for (let e in n) {
          let t = n[e];
          if (Array.isArray(t)) {
            let e = u ? t.length - 1 : 0;
            t = t[e];
          }
          t !== null && (i[e] = t);
        }
        for (let t in e) i[t] = e[t];
      }
    }
  }
  return i;
}
var nl = (e) => (t, n) => {
    let r = (0, y.useContext)(Bc),
      i = (0, y.useContext)(C),
      a = () => el(e, t, r, i);
    return n ? a() : x(a);
  },
  rl = nl({ scrapeMotionValuesFromProps: go, createRenderState: Wc }),
  il = nl({ scrapeMotionValuesFromProps: Do, createRenderState: Yc }),
  al = Symbol.for(`motionComponentSymbol`);
function ol(e, t, n) {
  let r = (0, y.useRef)(n);
  (0, y.useInsertionEffect)(() => {
    r.current = n;
  });
  let i = (0, y.useRef)(null);
  return (0, y.useCallback)(
    (n) => {
      (n && e.onMount?.(n), t && (n ? t.mount(n) : t.unmount()));
      let a = r.current;
      if (typeof a == `function`)
        if (n) {
          let e = a(n);
          typeof e == `function` && (i.current = e);
        } else i.current ? (i.current(), (i.current = null)) : a(n);
      else a && (a.current = n);
    },
    [t],
  );
}
var sl = (0, y.createContext)({});
function cl(e) {
  return e && typeof e == `object` && Object.prototype.hasOwnProperty.call(e, `current`);
}
function ll(e, t, n, r, i, a) {
  let { visualElement: o } = (0, y.useContext)(Bc),
    s = (0, y.useContext)(Ec),
    c = (0, y.useContext)(C),
    l = (0, y.useContext)(mc),
    u = l.reducedMotion,
    d = l.skipAnimations,
    f = (0, y.useRef)(null),
    p = (0, y.useRef)(!1);
  ((r ||= s.renderer),
    !f.current &&
      r &&
      ((f.current = r(e, {
        visualState: t,
        parent: o,
        props: n,
        presenceContext: c,
        blockInitialAnimation: c ? c.initial === !1 : !1,
        reducedMotionConfig: u,
        skipAnimations: d,
        isSVG: a,
      })),
      p.current && f.current && (f.current.manuallyAnimateOnMount = !0)));
  let m = f.current,
    h = (0, y.useContext)(sl);
  m && !m.projection && i && (m.type === `html` || m.type === `svg`) && ul(f.current, n, i, h);
  let g = (0, y.useRef)(!1);
  (0, y.useInsertionEffect)(() => {
    m && g.current && m.update(n, c);
  });
  let _ = n[ei],
    v = (0, y.useRef)(
      !!_ &&
        typeof window < `u` &&
        !window.MotionHandoffIsComplete?.(_) &&
        window.MotionHasOptimisedAnimation?.(_),
    );
  return (
    S(() => {
      ((p.current = !0),
        m &&
          ((g.current = !0),
          (window.MotionIsMounted = !0),
          m.updateFeatures(),
          m.scheduleRenderMicrotask(),
          v.current && m.animationState && m.animationState.animateChanges()));
    }),
    (0, y.useEffect)(() => {
      m &&
        (!v.current && m.animationState && m.animationState.animateChanges(),
        (v.current &&=
          (queueMicrotask(() => {
            window.MotionHandoffMarkAsComplete?.(_);
          }),
          !1)),
        (m.enteringChildren = void 0));
    }),
    m
  );
}
function ul(e, t, n, r) {
  let {
    layoutId: i,
    layout: a,
    drag: o,
    dragConstraints: s,
    layoutScroll: c,
    layoutRoot: l,
    layoutAnchor: u,
    layoutCrossfade: d,
  } = t;
  ((e.projection = new n(e.latestValues, t[`data-framer-portal-id`] ? void 0 : dl(e.parent))),
    e.projection.setOptions({
      layoutId: i,
      layout: a,
      alwaysMeasureLayout: !!o || (s && cl(s)),
      visualElement: e,
      animationType: typeof a == `string` ? a : `both`,
      initialPromotionConfig: r,
      crossfade: d,
      layoutScroll: c,
      layoutRoot: l,
      layoutAnchor: u,
    }));
}
function dl(e) {
  if (e) return e.options.allowProjection === !1 ? dl(e.parent) : e.projection;
}
function fl(e, { forwardMotionProps: t = !1, type: n } = {}, r, i) {
  r && jc(r);
  let a = n ? n === `svg` : Qc(e),
    o = a ? il : rl;
  function s(n, s) {
    let c,
      l = { ...(0, y.useContext)(mc), ...n, layoutId: pl(n) },
      { isStatic: u } = l,
      d = Hc(n),
      f = o(n, u);
    if (!u && typeof window < `u`) {
      ml(l, r);
      let t = hl(l);
      ((c = t.MeasureLayout), (d.visualElement = ll(e, f, l, i, t.ProjectionNode, a)));
    }
    return (0, v.jsxs)(Bc.Provider, {
      value: d,
      children: [
        c && d.visualElement ? (0, v.jsx)(c, { visualElement: d.visualElement, ...l }) : null,
        $c(e, n, ol(f, d.visualElement, s), f, u, t, a),
      ],
    });
  }
  s.displayName = `motion.${typeof e == `string` ? e : `create(${e.displayName ?? e.name ?? ``})`}`;
  let c = (0, y.forwardRef)(s);
  return ((c[al] = e), c);
}
function pl({ layoutId: e }) {
  let t = (0, y.useContext)(b).id;
  return t && e !== void 0 ? t + `-` + e : e;
}
function ml(e, t) {
  let n = (0, y.useContext)(Ec).strict;
  if (t && n) {
    let t =
      "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
    e.ignoreStrict ? O(!1, t, `lazy-strict-mode`) : ee(!1, t, `lazy-strict-mode`);
  }
}
function hl(e) {
  let { drag: t, layout: n } = Ac();
  if (!t && !n) return {};
  let r = { ...t, ...n };
  return {
    MeasureLayout: t?.isEnabled(e) || n?.isEnabled(e) ? r.MeasureLayout : void 0,
    ProjectionNode: r.ProjectionNode,
  };
}
function gl(e, t) {
  if (typeof Proxy > `u`) return fl;
  let n = new Map(),
    r = (n, r) => fl(n, r, e, t);
  return new Proxy(
    (e, t) => (ie(!1, `motion() is deprecated. Use motion.create() instead.`), r(e, t)),
    { get: (i, a) => (a === `create` ? r : (n.has(a) || n.set(a, fl(a, void 0, e, t)), n.get(a))) },
  );
}
var _l = (e, t) =>
    (t.isSVG ?? Qc(e)) ? new Oo(t) : new vo(t, { allowProjection: e !== y.Fragment }),
  vl = class extends La {
    constructor(e) {
      (super(e), (e.animationState ||= Fo(e)));
    }
    updateAnimationControlsSubscription() {
      let { animate: e } = this.node.getProps();
      ba(e) && (this.unmountControls = e.subscribe(this.node));
    }
    mount() {
      this.updateAnimationControlsSubscription();
    }
    update() {
      let { animate: e } = this.node.getProps(),
        { animate: t } = this.node.prevProps || {};
      e !== t && this.updateAnimationControlsSubscription();
    }
    unmount() {
      (this.node.animationState.reset(), this.unmountControls?.());
    }
  },
  yl = 0,
  bl = {
    animation: { Feature: vl },
    exit: {
      Feature: class extends La {
        constructor() {
          (super(...arguments), (this.id = yl++), (this.isExitComplete = !1));
        }
        update() {
          if (!this.node.presenceContext) return;
          let { isPresent: e, onExitComplete: t } = this.node.presenceContext,
            { isPresent: n } = this.node.prevPresenceContext || {};
          if (!this.node.animationState || e === n) return;
          if (e && n === !1) {
            if (this.isExitComplete) {
              let { initial: e, custom: t } = this.node.getProps();
              if (typeof e == `string` || (typeof e == `object` && e && !Array.isArray(e))) {
                let n = Gr(this.node, e, t);
                if (n) {
                  let { transition: e, transitionEnd: t, ...r } = n;
                  for (let e in r) this.node.getValue(e)?.jump(r[e]);
                }
              }
              (this.node.animationState.reset(), this.node.animationState.animateChanges());
            } else this.node.animationState.setActive(`exit`, !1);
            this.isExitComplete = !1;
            return;
          }
          let r = this.node.animationState.setActive(`exit`, !e);
          t &&
            !e &&
            r.then(() => {
              ((this.isExitComplete = !0), t(this.id));
            });
        }
        mount() {
          let { register: e, onExitComplete: t } = this.node.presenceContext || {};
          (t && t(this.id), e && (this.unmount = e(this.id)));
        }
        unmount() {}
      },
    },
  };
function xl(e) {
  return { point: { x: e.pageX, y: e.pageY } };
}
var Sl = (e) => (t) => zi(t) && e(t, xl(t));
function Cl(e, t, n, r) {
  return Ts(e, t, Sl(n), r);
}
var wl = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  Tl = (e, t) => Math.abs(e - t);
function El(e, t) {
  let n = Tl(e.x, t.x),
    r = Tl(e.y, t.y);
  return Math.sqrt(n ** 2 + r ** 2);
}
var Dl = new Set([`auto`, `scroll`]),
  Ol = class {
    constructor(
      e,
      t,
      {
        transformPagePoint: n,
        contextWindow: r = window,
        dragSnapToOrigin: i = !1,
        distanceThreshold: a = 3,
        element: o,
      } = {},
    ) {
      if (
        ((this.startEvent = null),
        (this.lastMoveEvent = null),
        (this.lastMoveEventInfo = null),
        (this.lastRawMoveEventInfo = null),
        (this.handlers = {}),
        (this.contextWindow = window),
        (this.scrollPositions = new Map()),
        (this.removeScrollListeners = null),
        (this.onElementScroll = (e) => {
          this.handleScroll(e.target);
        }),
        (this.onWindowScroll = () => {
          this.handleScroll(window);
        }),
        (this.updatePoint = () => {
          if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
          this.lastRawMoveEventInfo &&
            (this.lastMoveEventInfo = kl(this.lastRawMoveEventInfo, this.transformPagePoint));
          let e = jl(this.lastMoveEventInfo, this.history),
            t = this.startEvent !== null,
            n = El(e.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
          if (!t && !n) return;
          let { point: r } = e,
            { timestamp: i } = H;
          this.history.push({ ...r, timestamp: i });
          let { onStart: a, onMove: o } = this.handlers;
          (t || (a && a(this.lastMoveEvent, e), (this.startEvent = this.lastMoveEvent)),
            o && o(this.lastMoveEvent, e));
        }),
        (this.handlePointerMove = (e, t) => {
          ((this.lastMoveEvent = e),
            (this.lastRawMoveEventInfo = t),
            (this.lastMoveEventInfo = kl(t, this.transformPagePoint)),
            V.update(this.updatePoint, !0));
        }),
        (this.handlePointerUp = (e, t) => {
          this.end();
          let { onEnd: n, onSessionEnd: r, resumeAnimation: i } = this.handlers;
          if (
            ((this.dragSnapToOrigin || !this.startEvent) && i && i(),
            !(this.lastMoveEvent && this.lastMoveEventInfo))
          )
            return;
          let a = jl(
            e.type === `pointercancel` ? this.lastMoveEventInfo : kl(t, this.transformPagePoint),
            this.history,
          );
          (this.startEvent && n && n(e, a), r && r(e, a));
        }),
        !zi(e))
      )
        return;
      ((this.dragSnapToOrigin = i),
        (this.handlers = t),
        (this.transformPagePoint = n),
        (this.distanceThreshold = a),
        (this.contextWindow = r || window));
      let s = kl(xl(e), this.transformPagePoint),
        { point: c } = s,
        { timestamp: l } = H;
      this.history = [{ ...c, timestamp: l }];
      let { onSessionStart: u } = t;
      u && u(e, jl(s, this.history));
      let d = { passive: !0, capture: !0 };
      ((this.removeListeners = P(
        Cl(this.contextWindow, `pointermove`, this.handlePointerMove, d),
        Cl(this.contextWindow, `pointerup`, this.handlePointerUp, d),
        Cl(this.contextWindow, `pointercancel`, this.handlePointerUp, d),
      )),
        o && this.startScrollTracking(o));
    }
    startScrollTracking(e) {
      let t = e.parentElement;
      for (; t;) {
        let e = getComputedStyle(t);
        ((Dl.has(e.overflowX) || Dl.has(e.overflowY)) &&
          this.scrollPositions.set(t, { x: t.scrollLeft, y: t.scrollTop }),
          (t = t.parentElement));
      }
      (this.scrollPositions.set(window, { x: window.scrollX, y: window.scrollY }),
        window.addEventListener(`scroll`, this.onElementScroll, { capture: !0 }),
        window.addEventListener(`scroll`, this.onWindowScroll),
        (this.removeScrollListeners = () => {
          (window.removeEventListener(`scroll`, this.onElementScroll, { capture: !0 }),
            window.removeEventListener(`scroll`, this.onWindowScroll));
        }));
    }
    handleScroll(e) {
      let t = this.scrollPositions.get(e);
      if (!t) return;
      let n = e === window,
        r = n ? { x: window.scrollX, y: window.scrollY } : { x: e.scrollLeft, y: e.scrollTop },
        i = { x: r.x - t.x, y: r.y - t.y };
      (i.x === 0 && i.y === 0) ||
        (n
          ? this.lastMoveEventInfo &&
            ((this.lastMoveEventInfo.point.x += i.x), (this.lastMoveEventInfo.point.y += i.y))
          : this.history.length > 0 && ((this.history[0].x -= i.x), (this.history[0].y -= i.y)),
        this.scrollPositions.set(e, r),
        V.update(this.updatePoint, !0));
    }
    updateHandlers(e) {
      this.handlers = e;
    }
    end() {
      (this.removeListeners && this.removeListeners(),
        this.removeScrollListeners && this.removeScrollListeners(),
        this.scrollPositions.clear(),
        ke(this.updatePoint));
    }
  };
function kl(e, t) {
  return t ? { point: t(e.point) } : e;
}
function Al(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function jl({ point: e }, t) {
  return { point: e, delta: Al(e, Nl(t)), offset: Al(e, Ml(t)), velocity: Pl(t, 0.1) };
}
function Ml(e) {
  return e[0];
}
function Nl(e) {
  return e[e.length - 1];
}
function Pl(e, t) {
  if (e.length < 2) return { x: 0, y: 0 };
  let n = e.length - 1,
    r = null,
    i = Nl(e);
  for (; n >= 0 && ((r = e[n]), !(i.timestamp - r.timestamp > F(t)));) n--;
  if (!r) return { x: 0, y: 0 };
  r === e[0] && e.length > 2 && i.timestamp - r.timestamp > F(t) * 2 && (r = e[1]);
  let a = I(i.timestamp - r.timestamp);
  if (a === 0) return { x: 0, y: 0 };
  let o = { x: (i.x - r.x) / a, y: (i.y - r.y) / a };
  return (o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o);
}
function Fl(e, { min: t, max: n }, r) {
  return (
    t !== void 0 && e < t
      ? (e = r ? G(t, e, r.min) : Math.max(e, t))
      : n !== void 0 && e > n && (e = r ? G(n, e, r.max) : Math.min(e, n)),
    e
  );
}
function Il(e, t, n) {
  return {
    min: t === void 0 ? void 0 : e.min + t,
    max: n === void 0 ? void 0 : e.max + n - (e.max - e.min),
  };
}
function Ll(e, { top: t, left: n, bottom: r, right: i }) {
  return { x: Il(e.x, n, i), y: Il(e.y, t, r) };
}
function Rl(e, t) {
  let n = t.min - e.min,
    r = t.max - e.max;
  return (t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r });
}
function zl(e, t) {
  return { x: Rl(e.x, t.x), y: Rl(e.y, t.y) };
}
function Bl(e, t) {
  let n = 0.5,
    r = Ko(e),
    i = Ko(t);
  return (
    i > r ? (n = ne(t.min, t.max - r, e.min)) : r > i && (n = ne(e.min, e.max - i, t.min)),
    E(0, 1, n)
  );
}
function Vl(e, t) {
  let n = {};
  return (
    t.min !== void 0 && (n.min = t.min - e.min),
    t.max !== void 0 && (n.max = t.max - e.min),
    n
  );
}
var Hl = 0.35;
function Ul(e = Hl) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = Hl),
    { x: Wl(e, `left`, `right`), y: Wl(e, `top`, `bottom`) }
  );
}
function Wl(e, t, n) {
  return { min: Gl(e, t), max: Gl(e, n) };
}
function Gl(e, t) {
  return typeof e == `number` ? e : e[t] || 0;
}
var Kl = new WeakMap(),
  ql = class {
    constructor(e) {
      ((this.openDragLock = null),
        (this.isDragging = !1),
        (this.currentDirection = null),
        (this.originPoint = { x: 0, y: 0 }),
        (this.constraints = !1),
        (this.hasMutatedConstraints = !1),
        (this.elastic = J()),
        (this.latestPointerEvent = null),
        (this.latestPanInfo = null),
        (this.visualElement = e));
    }
    start(e, { snapToCursor: t = !1, distanceThreshold: n } = {}) {
      let { presenceContext: r } = this.visualElement;
      if (r && r.isPresent === !1) return;
      let i = (e) => {
          (t && this.snapToCursor(xl(e).point), this.stopAnimation());
        },
        a = (e, t) => {
          let { drag: n, dragPropagation: r, onDragStart: i } = this.getProps();
          if (
            n &&
            !r &&
            (this.openDragLock && this.openDragLock(),
            (this.openDragLock = Pi(n)),
            !this.openDragLock)
          )
            return;
          ((this.latestPointerEvent = e),
            (this.latestPanInfo = t),
            (this.isDragging = !0),
            (this.currentDirection = null),
            this.resolveConstraints(),
            this.visualElement.projection &&
              ((this.visualElement.projection.isAnimationBlocked = !0),
              (this.visualElement.projection.target = void 0)),
            ms((e) => {
              let t = this.getAxisMotionValue(e).get() || 0;
              if (nt.test(t)) {
                let { projection: n } = this.visualElement;
                if (n && n.layout) {
                  let r = n.layout.layoutBox[e];
                  r && (t = Ko(r) * (parseFloat(t) / 100));
                }
              }
              this.originPoint[e] = t;
            }),
            i && V.update(() => i(e, t), !1, !0),
            Qr(this.visualElement, `transform`));
          let { animationState: a } = this.visualElement;
          a && a.setActive(`whileDrag`, !0);
        },
        o = (e, t) => {
          ((this.latestPointerEvent = e), (this.latestPanInfo = t));
          let {
            dragPropagation: n,
            dragDirectionLock: r,
            onDirectionLock: i,
            onDrag: a,
          } = this.getProps();
          if (!n && !this.openDragLock) return;
          let { offset: o } = t;
          if (r && this.currentDirection === null) {
            ((this.currentDirection = Zl(o)),
              this.currentDirection !== null && i && i(this.currentDirection));
            return;
          }
          (this.updateAxis(`x`, t.point, o),
            this.updateAxis(`y`, t.point, o),
            this.visualElement.render(),
            a && V.update(() => a(e, t), !1, !0));
        },
        s = (e, t) => {
          ((this.latestPointerEvent = e),
            (this.latestPanInfo = t),
            this.stop(e, t),
            (this.latestPointerEvent = null),
            (this.latestPanInfo = null));
        },
        c = () => {
          let { dragSnapToOrigin: e } = this.getProps();
          (e || this.constraints) && this.startAnimation({ x: 0, y: 0 });
        },
        { dragSnapToOrigin: l } = this.getProps();
      this.panSession = new Ol(
        e,
        { onSessionStart: i, onStart: a, onMove: o, onSessionEnd: s, resumeAnimation: c },
        {
          transformPagePoint: this.visualElement.getTransformPagePoint(),
          dragSnapToOrigin: l,
          distanceThreshold: n,
          contextWindow: wl(this.visualElement),
          element: this.visualElement.current,
        },
      );
    }
    stop(e, t) {
      let n = e || this.latestPointerEvent,
        r = t || this.latestPanInfo,
        i = this.isDragging;
      if ((this.cancel(), !i || !r || !n)) return;
      let { velocity: a } = r;
      this.startAnimation(a);
      let { onDragEnd: o } = this.getProps();
      o && V.postRender(() => o(n, r));
    }
    cancel() {
      this.isDragging = !1;
      let { projection: e, animationState: t } = this.visualElement;
      (e && (e.isAnimationBlocked = !1), this.endPanSession());
      let { dragPropagation: n } = this.getProps();
      (!n && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)),
        t && t.setActive(`whileDrag`, !1));
    }
    endPanSession() {
      (this.panSession && this.panSession.end(), (this.panSession = void 0));
    }
    updateAxis(e, t, n) {
      let { drag: r } = this.getProps();
      if (!n || !Xl(e, r, this.currentDirection)) return;
      let i = this.getAxisMotionValue(e),
        a = this.originPoint[e] + n[e];
      (this.constraints && this.constraints[e] && (a = Fl(a, this.constraints[e], this.elastic[e])),
        i.set(a));
    }
    resolveConstraints() {
      let { dragConstraints: e, dragElastic: t } = this.getProps(),
        n =
          this.visualElement.projection && !this.visualElement.projection.layout
            ? this.visualElement.projection.measure(!1)
            : this.visualElement.projection?.layout,
        r = this.constraints;
      (e && cl(e)
        ? (this.constraints ||= this.resolveRefConstraints())
        : e && n
          ? (this.constraints = Ll(n.layoutBox, e))
          : (this.constraints = !1),
        (this.elastic = Ul(t)),
        r !== this.constraints &&
          !cl(e) &&
          n &&
          this.constraints &&
          !this.hasMutatedConstraints &&
          ms((e) => {
            this.constraints !== !1 &&
              this.getAxisMotionValue(e) &&
              (this.constraints[e] = Vl(n.layoutBox[e], this.constraints[e]));
          }));
    }
    resolveRefConstraints() {
      let { dragConstraints: e, onMeasureDragConstraints: t } = this.getProps();
      if (!e || !cl(e)) return !1;
      let n = e.current;
      ee(
        n !== null,
        "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.",
        `drag-constraints-ref`,
      );
      let { projection: r } = this.visualElement;
      if (!r || !r.layout) return !1;
      r.root && ((r.root.scroll = void 0), r.root.updateScroll());
      let i = io(n, r.root, this.visualElement.getTransformPagePoint()),
        a = zl(r.layout.layoutBox, i);
      if (t) {
        let e = t(za(a));
        ((this.hasMutatedConstraints = !!e), e && (a = Ra(e)));
      }
      return a;
    }
    startAnimation(e) {
      let {
          drag: t,
          dragMomentum: n,
          dragElastic: r,
          dragTransition: i,
          dragSnapToOrigin: a,
          onDragTransitionEnd: o,
        } = this.getProps(),
        s = this.constraints || {},
        c = ms((o) => {
          if (!Xl(o, t, this.currentDirection)) return;
          let c = (s && s[o]) || {};
          (a === !0 || a === o) && (c = { min: 0, max: 0 });
          let l = r ? 200 : 1e6,
            u = r ? 40 : 1e7,
            d = {
              type: `inertia`,
              velocity: n ? e[o] : 0,
              bounceStiffness: l,
              bounceDamping: u,
              timeConstant: 750,
              restDelta: 1,
              restSpeed: 10,
              ...i,
              ...c,
            };
          return this.startAxisValueAnimation(o, d);
        });
      return Promise.all(c).then(o);
    }
    startAxisValueAnimation(e, t) {
      let n = this.getAxisMotionValue(e);
      return (Qr(this.visualElement, e), n.start(Rr(e, n, 0, t, this.visualElement, !1)));
    }
    stopAnimation() {
      ms((e) => this.getAxisMotionValue(e).stop());
    }
    getAxisMotionValue(e) {
      let t = `_drag${e.toUpperCase()}`;
      return (
        this.visualElement.getProps()[t] ||
        this.visualElement.getValue(e, this.visualElement.latestValues[e] ?? 0)
      );
    }
    snapToCursor(e) {
      ms((t) => {
        let { drag: n } = this.getProps();
        if (!Xl(t, n, this.currentDirection)) return;
        let { projection: r } = this.visualElement,
          i = this.getAxisMotionValue(t);
        if (r && r.layout) {
          let { min: n, max: a } = r.layout.layoutBox[t],
            o = i.get() || 0;
          i.set(e[t] - G(n, a, 0.5) + o);
        }
      });
    }
    scalePositionWithinConstraints() {
      if (!this.visualElement.current) return;
      let { drag: e, dragConstraints: t } = this.getProps(),
        { projection: n } = this.visualElement;
      if (!cl(t) || !n || !this.constraints) return;
      this.stopAnimation();
      let r = { x: 0, y: 0 };
      ms((e) => {
        let t = this.getAxisMotionValue(e);
        if (t && this.constraints !== !1) {
          let n = t.get();
          r[e] = Bl({ min: n, max: n }, this.constraints[e]);
        }
      });
      let { transformTemplate: i } = this.visualElement.getProps();
      ((this.visualElement.current.style.transform = i ? i({}, ``) : `none`),
        n.root && n.root.updateScroll(),
        n.updateLayout(),
        (this.constraints = !1),
        this.resolveConstraints(),
        ms((t) => {
          if (!Xl(t, e, null)) return;
          let n = this.getAxisMotionValue(t),
            { min: i, max: a } = this.constraints[t];
          n.set(G(i, a, r[t]));
        }),
        this.visualElement.render());
    }
    addListeners() {
      if (!this.visualElement.current) return;
      Kl.set(this.visualElement, this);
      let e = this.visualElement.current,
        t = Cl(e, `pointerdown`, (t) => {
          let { drag: n, dragListener: r = !0 } = this.getProps(),
            i = t.target,
            a = i !== e && Ui(i);
          n && r && !a && this.start(t);
        }),
        n,
        r = () => {
          let { dragConstraints: t } = this.getProps();
          cl(t) &&
            t.current &&
            ((this.constraints = this.resolveRefConstraints()),
            (n ||= Yl(e, t.current, () => this.scalePositionWithinConstraints())));
        },
        { projection: i } = this.visualElement,
        a = i.addEventListener(`measure`, r);
      (i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), V.read(r));
      let o = Ts(window, `resize`, () => this.scalePositionWithinConstraints()),
        s = i.addEventListener(`didUpdate`, ({ delta: e, hasLayoutChanged: t }) => {
          this.isDragging &&
            t &&
            (ms((t) => {
              let n = this.getAxisMotionValue(t);
              n && ((this.originPoint[t] += e[t].translate), n.set(n.get() + e[t].translate));
            }),
            this.visualElement.render());
        });
      return () => {
        (o(), t(), a(), s && s(), n && n());
      };
    }
    getProps() {
      let e = this.visualElement.getProps(),
        {
          drag: t = !1,
          dragDirectionLock: n = !1,
          dragPropagation: r = !1,
          dragConstraints: i = !1,
          dragElastic: a = Hl,
          dragMomentum: o = !0,
        } = e;
      return {
        ...e,
        drag: t,
        dragDirectionLock: n,
        dragPropagation: r,
        dragConstraints: i,
        dragElastic: a,
        dragMomentum: o,
      };
    }
  };
function Jl(e) {
  let t = !0;
  return () => {
    if (t) {
      t = !1;
      return;
    }
    e();
  };
}
function Yl(e, t, n) {
  let r = da(e, Jl(n)),
    i = da(t, Jl(n));
  return () => {
    (r(), i());
  };
}
function Xl(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function Zl(e, t = 10) {
  let n = null;
  return (Math.abs(e.y) > t ? (n = `y`) : Math.abs(e.x) > t && (n = `x`), n);
}
var Ql = class extends La {
    constructor(e) {
      (super(e),
        (this.removeGroupControls = N),
        (this.removeListeners = N),
        (this.controls = new ql(e)));
    }
    mount() {
      let { dragControls: e } = this.node.getProps();
      (e && (this.removeGroupControls = e.subscribe(this.controls)),
        (this.removeListeners = this.controls.addListeners() || N));
    }
    update() {
      let { dragControls: e } = this.node.getProps(),
        { dragControls: t } = this.node.prevProps || {};
      e !== t &&
        (this.removeGroupControls(), e && (this.removeGroupControls = e.subscribe(this.controls)));
    }
    unmount() {
      (this.removeGroupControls(),
        this.removeListeners(),
        this.controls.isDragging || this.controls.endPanSession());
    }
  },
  $l = (e) => (t, n) => {
    e && V.update(() => e(t, n), !1, !0);
  },
  eu = class extends La {
    constructor() {
      (super(...arguments), (this.removePointerDownListener = N));
    }
    onPointerDown(e) {
      this.session = new Ol(e, this.createPanHandlers(), {
        transformPagePoint: this.node.getTransformPagePoint(),
        contextWindow: wl(this.node),
      });
    }
    createPanHandlers() {
      let { onPanSessionStart: e, onPanStart: t, onPan: n, onPanEnd: r } = this.node.getProps();
      return {
        onSessionStart: $l(e),
        onStart: $l(t),
        onMove: $l(n),
        onEnd: (e, t) => {
          (delete this.session, r && V.postRender(() => r(e, t)));
        },
      };
    }
    mount() {
      this.removePointerDownListener = Cl(this.node.current, `pointerdown`, (e) =>
        this.onPointerDown(e),
      );
    }
    update() {
      this.session && this.session.updateHandlers(this.createPanHandlers());
    }
    unmount() {
      (this.removePointerDownListener(), this.session && this.session.end());
    }
  },
  tu = !1,
  nu = class extends y.Component {
    componentDidMount() {
      let { visualElement: e, layoutGroup: t, switchLayoutGroup: n, layoutId: r } = this.props,
        { projection: i } = e;
      (i &&
        (t.group && t.group.add(i),
        n && n.register && r && n.register(i),
        tu && i.root.didUpdate(),
        i.addEventListener(`animationComplete`, () => {
          this.safeToRemove();
        }),
        i.setOptions({
          ...i.options,
          layoutDependency: this.props.layoutDependency,
          onExitComplete: () => this.safeToRemove(),
        })),
        (js.hasEverUpdated = !0));
    }
    getSnapshotBeforeUpdate(e) {
      let { layoutDependency: t, visualElement: n, drag: r, isPresent: i } = this.props,
        { projection: a } = n;
      return a
        ? ((a.isPresent = i),
          e.layoutDependency !== t && a.setOptions({ ...a.options, layoutDependency: t }),
          (tu = !0),
          r || e.layoutDependency !== t || t === void 0 || e.isPresent !== i
            ? a.willUpdate()
            : this.safeToRemove(),
          e.isPresent !== i &&
            (i
              ? a.promote()
              : a.relegate() ||
                V.postRender(() => {
                  let e = a.getStack();
                  (!e || !e.members.length) && this.safeToRemove();
                })),
          null)
        : null;
    }
    componentDidUpdate() {
      let { visualElement: e, layoutAnchor: t } = this.props,
        { projection: n } = e;
      n &&
        ((n.options.layoutAnchor = t),
        n.root.didUpdate(),
        Ai.postRender(() => {
          !n.currentAnimation && n.isLead() && this.safeToRemove();
        }));
    }
    componentWillUnmount() {
      let { visualElement: e, layoutGroup: t, switchLayoutGroup: n } = this.props,
        { projection: r } = e;
      ((tu = !0),
        r &&
          (r.scheduleCheckAfterUnmount(),
          t && t.group && t.group.remove(r),
          n && n.deregister && n.deregister(r)));
    }
    safeToRemove() {
      let { safeToRemove: e } = this.props;
      e && e();
    }
    render() {
      return null;
    }
  };
function ru(e) {
  let [t, n] = Sc(),
    r = (0, y.useContext)(b);
  return (0, v.jsx)(nu, {
    ...e,
    layoutGroup: r,
    switchLayoutGroup: (0, y.useContext)(sl),
    isPresent: t,
    safeToRemove: n,
  });
}
var iu = { pan: { Feature: eu }, drag: { Feature: Ql, ProjectionNode: pc, MeasureLayout: ru } };
function au(e, t, n) {
  let { props: r } = e;
  e.animationState && r.whileHover && e.animationState.setActive(`whileHover`, n === `Start`);
  let i = r[`onHover` + n];
  i && V.postRender(() => i(t, xl(t)));
}
var ou = class extends La {
    mount() {
      let { current: e } = this.node;
      e &&
        (this.unmount = Li(
          e,
          (e, t) => (au(this.node, t, `Start`), (e) => au(this.node, e, `End`)),
        ));
    }
    unmount() {}
  },
  su = class extends La {
    constructor() {
      (super(...arguments), (this.isActive = !1));
    }
    onFocus() {
      let e = !1;
      try {
        e = this.node.current.matches(`:focus-visible`);
      } catch {
        e = !0;
      }
      !e ||
        !this.node.animationState ||
        (this.node.animationState.setActive(`whileFocus`, !0), (this.isActive = !0));
    }
    onBlur() {
      !this.isActive ||
        !this.node.animationState ||
        (this.node.animationState.setActive(`whileFocus`, !1), (this.isActive = !1));
    }
    mount() {
      this.unmount = P(
        Ts(this.node.current, `focus`, () => this.onFocus()),
        Ts(this.node.current, `blur`, () => this.onBlur()),
      );
    }
    unmount() {}
  };
function cu(e, t, n) {
  let { props: r } = e;
  if (e.current instanceof HTMLButtonElement && e.current.disabled) return;
  e.animationState && r.whileTap && e.animationState.setActive(`whileTap`, n === `Start`);
  let i = r[`onTap` + (n === `End` ? `` : n)];
  i && V.postRender(() => i(t, xl(t)));
}
var lu = class extends La {
    mount() {
      let { current: e } = this.node;
      if (!e) return;
      let { globalTapTarget: t, propagate: n } = this.node.props;
      this.unmount = Xi(
        e,
        (e, t) => (
          cu(this.node, t, `Start`),
          (e, { success: t }) => cu(this.node, e, t ? `End` : `Cancel`)
        ),
        { useGlobalTarget: t, stopPropagation: n?.tap === !1 },
      );
    }
    unmount() {}
  },
  uu = new WeakMap(),
  du = new WeakMap(),
  fu = (e) => {
    let t = uu.get(e.target);
    t && t(e);
  },
  pu = (e) => {
    e.forEach(fu);
  };
function mu({ root: e, ...t }) {
  let n = e || document;
  du.has(n) || du.set(n, {});
  let r = du.get(n),
    i = JSON.stringify(t);
  return (r[i] || (r[i] = new IntersectionObserver(pu, { root: e, ...t })), r[i]);
}
function hu(e, t, n) {
  let r = mu(t);
  return (
    uu.set(e, n),
    r.observe(e),
    () => {
      (uu.delete(e), r.unobserve(e));
    }
  );
}
var gu = { some: 0, all: 1 },
  _u = class extends La {
    constructor() {
      (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
    }
    startObserver() {
      this.stopObserver?.();
      let { viewport: e = {} } = this.node.getProps(),
        { root: t, margin: n, amount: r = `some`, once: i } = e,
        a = {
          root: t ? t.current : void 0,
          rootMargin: n,
          threshold: typeof r == `number` ? r : gu[r],
        },
        o = (e) => {
          let { isIntersecting: t } = e;
          if (this.isInView === t || ((this.isInView = t), i && !t && this.hasEnteredView)) return;
          (t && (this.hasEnteredView = !0),
            this.node.animationState && this.node.animationState.setActive(`whileInView`, t));
          let { onViewportEnter: n, onViewportLeave: r } = this.node.getProps(),
            a = t ? n : r;
          a && a(e);
        };
      this.stopObserver = hu(this.node.current, a, o);
    }
    mount() {
      this.startObserver();
    }
    update() {
      if (typeof IntersectionObserver > `u`) return;
      let { props: e, prevProps: t } = this.node;
      [`amount`, `margin`, `root`].some(vu(e, t)) && this.startObserver();
    }
    unmount() {
      (this.stopObserver?.(), (this.hasEnteredView = !1), (this.isInView = !1));
    }
  };
function vu({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
var yu = {
    inView: { Feature: _u },
    tap: { Feature: lu },
    focus: { Feature: su },
    hover: { Feature: ou },
  },
  bu = { layout: { ProjectionNode: pc, MeasureLayout: ru } },
  xu = gl({ ...bl, ...yu, ...iu, ...bu }, _l),
  Su = (...e) =>
    e
      .filter((e, t, n) => !!e && e.trim() !== `` && n.indexOf(e) === t)
      .join(` `)
      .trim(),
  Cu = (e) => e.replace(/([a-z0-9])([A-Z])/g, `$1-$2`).toLowerCase(),
  wu = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => (n ? n.toUpperCase() : t.toLowerCase())),
  Tu = (e) => {
    let t = wu(e);
    return t.charAt(0).toUpperCase() + t.slice(1);
  },
  Eu = {
    xmlns: `http://www.w3.org/2000/svg`,
    width: 24,
    height: 24,
    viewBox: `0 0 24 24`,
    fill: `none`,
    stroke: `currentColor`,
    strokeWidth: 2,
    strokeLinecap: `round`,
    strokeLinejoin: `round`,
  },
  Du = (e) => {
    for (let t in e) if (t.startsWith(`aria-`) || t === `role` || t === `title`) return !0;
    return !1;
  },
  Ou = (0, y.forwardRef)(
    (
      {
        color: e = `currentColor`,
        size: t = 24,
        strokeWidth: n = 2,
        absoluteStrokeWidth: r,
        className: i = ``,
        children: a,
        iconNode: o,
        ...s
      },
      c,
    ) =>
      (0, y.createElement)(
        `svg`,
        {
          ref: c,
          ...Eu,
          width: t,
          height: t,
          stroke: e,
          strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
          className: Su(`lucide`, i),
          ...(!a && !Du(s) && { "aria-hidden": `true` }),
          ...s,
        },
        [...o.map(([e, t]) => (0, y.createElement)(e, t)), ...(Array.isArray(a) ? a : [a])],
      ),
  ),
  ku = (e, t) => {
    let n = (0, y.forwardRef)(({ className: n, ...r }, i) =>
      (0, y.createElement)(Ou, {
        ref: i,
        iconNode: t,
        className: Su(`lucide-${Cu(Tu(e))}`, `lucide-${e}`, n),
        ...r,
      }),
    );
    return ((n.displayName = Tu(e)), n);
  },
  Au = {
    light: () => {
      if (typeof navigator < `u` && navigator.vibrate)
        try {
          navigator.vibrate(12);
        } catch {}
    },
    medium: () => {
      if (typeof navigator < `u` && navigator.vibrate)
        try {
          navigator.vibrate(25);
        } catch {}
    },
    heavy: () => {
      if (typeof navigator < `u` && navigator.vibrate)
        try {
          navigator.vibrate(50);
        } catch {}
    },
    success: () => {
      if (typeof navigator < `u` && navigator.vibrate)
        try {
          navigator.vibrate([15, 60, 20]);
        } catch {}
    },
    error: () => {
      if (typeof navigator < `u` && navigator.vibrate)
        try {
          navigator.vibrate([60, 80, 60]);
        } catch {}
    },
    doublePulse: () => {
      if (typeof navigator < `u` && navigator.vibrate)
        try {
          navigator.vibrate([10, 40, 10]);
        } catch {}
    },
  },
  ju = s((e) => {
    (function () {
      function t(e) {
        if (e == null) return null;
        if (typeof e == `function`)
          return e.$$typeof === ee ? null : e.displayName || e.name || null;
        if (typeof e == `string`) return e;
        switch (e) {
          case v:
            return `Fragment`;
          case b:
            return `Profiler`;
          case y:
            return `StrictMode`;
          case w:
            return `Suspense`;
          case T:
            return `SuspenseList`;
          case O:
            return `Activity`;
        }
        if (typeof e == `object`)
          switch (
            (typeof e.tag == `number` &&
              console.error(
                `Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.`,
              ),
            e.$$typeof)
          ) {
            case _:
              return `Portal`;
            case S:
              return e.displayName || `Context`;
            case x:
              return (e._context.displayName || `Context`) + `.Consumer`;
            case C:
              var n = e.render;
              return (
                (e = e.displayName),
                (e ||=
                  ((e = n.displayName || n.name || ``),
                  e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)),
                e
              );
            case E:
              return ((n = e.displayName || null), n === null ? t(e.type) || `Memo` : n);
            case D:
              ((n = e._payload), (e = e._init));
              try {
                return t(e(n));
              } catch {}
          }
        return null;
      }
      function n(e) {
        return `` + e;
      }
      function r(e) {
        try {
          n(e);
          var t = !1;
        } catch {
          t = !0;
        }
        if (t) {
          t = console;
          var r = t.error,
            i =
              (typeof Symbol == `function` && Symbol.toStringTag && e[Symbol.toStringTag]) ||
              e.constructor.name ||
              `Object`;
          return (
            r.call(
              t,
              `The provided key is an unsupported type %s. This value must be coerced to a string before using it here.`,
              i,
            ),
            n(e)
          );
        }
      }
      function i(e) {
        if (e === v) return `<>`;
        if (typeof e == `object` && e && e.$$typeof === D) return `<...>`;
        try {
          var n = t(e);
          return n ? `<` + n + `>` : `<...>`;
        } catch {
          return `<...>`;
        }
      }
      function a() {
        var e = k.A;
        return e === null ? null : e.getOwner();
      }
      function o() {
        return Error(`react-stack-top-frame`);
      }
      function s(e) {
        if (A.call(e, `key`)) {
          var t = Object.getOwnPropertyDescriptor(e, `key`).get;
          if (t && t.isReactWarning) return !1;
        }
        return e.key !== void 0;
      }
      function c(e, t) {
        function n() {
          te ||
            ((te = !0),
            console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              t,
            ));
        }
        ((n.isReactWarning = !0), Object.defineProperty(e, "key", { get: n, configurable: !0 }));
      }
      function l() {
        var e = t(this.type);
        return (
          N[e] ||
            ((N[e] = !0),
            console.error(
              `Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.`,
            )),
          (e = this.props.ref),
          e === void 0 ? null : e
        );
      }
      function u(e, t, n, r, i, a) {
        var o = n.ref;
        return (
          (e = { $$typeof: g, type: e, key: t, props: n, _owner: r }),
          (o === void 0 ? null : o) === null
            ? Object.defineProperty(e, "ref", { enumerable: !1, value: null })
            : Object.defineProperty(e, "ref", { enumerable: !1, get: l }),
          (e._store = {}),
          Object.defineProperty(e._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0,
          }),
          Object.defineProperty(e, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null,
          }),
          Object.defineProperty(e, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: i,
          }),
          Object.defineProperty(e, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: a,
          }),
          Object.freeze && (Object.freeze(e.props), Object.freeze(e)),
          e
        );
      }
      function d(e, n, i, o, l, d) {
        var p = n.children;
        if (p !== void 0)
          if (o)
            if (j(p)) {
              for (o = 0; o < p.length; o++) f(p[o]);
              Object.freeze && Object.freeze(p);
            } else
              console.error(
                `React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.`,
              );
          else f(p);
        if (A.call(n, `key`)) {
          p = t(e);
          var m = Object.keys(n).filter(function (e) {
            return e !== `key`;
          });
          ((o = 0 < m.length ? `{key: someKey, ` + m.join(`: ..., `) + `: ...}` : `{key: someKey}`),
            re[p + o] ||
              ((m = 0 < m.length ? `{` + m.join(`: ..., `) + `: ...}` : `{}`),
              console.error(
                `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
                o,
                p,
                m,
                p,
              ),
              (re[p + o] = !0)));
        }
        if (
          ((p = null),
          i !== void 0 && (r(i), (p = `` + i)),
          s(n) && (r(n.key), (p = `` + n.key)),
          `key` in n)
        )
          for (var h in ((i = {}), n)) h !== `key` && (i[h] = n[h]);
        else i = n;
        return (
          p && c(i, typeof e == `function` ? e.displayName || e.name || `Unknown` : e),
          u(e, p, i, a(), l, d)
        );
      }
      function f(e) {
        m(e)
          ? e._store && (e._store.validated = 1)
          : typeof e == `object` &&
            e &&
            e.$$typeof === D &&
            (e._payload.status === `fulfilled`
              ? m(e._payload.value) &&
                e._payload.value._store &&
                (e._payload.value._store.validated = 1)
              : e._store && (e._store.validated = 1));
      }
      function m(e) {
        return typeof e == `object` && !!e && e.$$typeof === g;
      }
      var h = p(),
        g = Symbol.for(`react.transitional.element`),
        _ = Symbol.for(`react.portal`),
        v = Symbol.for(`react.fragment`),
        y = Symbol.for(`react.strict_mode`),
        b = Symbol.for(`react.profiler`),
        x = Symbol.for(`react.consumer`),
        S = Symbol.for(`react.context`),
        C = Symbol.for(`react.forward_ref`),
        w = Symbol.for(`react.suspense`),
        T = Symbol.for(`react.suspense_list`),
        E = Symbol.for(`react.memo`),
        D = Symbol.for(`react.lazy`),
        O = Symbol.for(`react.activity`),
        ee = Symbol.for(`react.client.reference`),
        k = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
        A = Object.prototype.hasOwnProperty,
        j = Array.isArray,
        M = console.createTask
          ? console.createTask
          : function () {
              return null;
            };
      h = {
        react_stack_bottom_frame: function (e) {
          return e();
        },
      };
      var te,
        N = {},
        P = h.react_stack_bottom_frame.bind(h, o)(),
        ne = M(i(o)),
        re = {};
      ((e.Fragment = v),
        (e.jsxDEV = function (e, t, n, r) {
          var a = 1e4 > k.recentlyCreatedOwnerStacks++;
          return d(e, t, n, r, a ? Error(`react-stack-top-frame`) : P, a ? M(i(e)) : ne);
        }));
    })();
  }),
  Mu = s((e, t) => {
    t.exports = ju();
  }),
  Y = (e, t, n) =>
    n
      ? `linear-gradient(135deg, ${e} 0%, ${t} 50%, ${n} 100%)`
      : `linear-gradient(135deg, ${e} 0%, ${t} 100%)`,
  Nu = [
    {
      id: `a1`,
      title: `Midnight Bloom`,
      artist: `Solene Vasquez`,
      year: `2026`,
      gradient: Y(`#ff3d7f`, `#ff9e5e`, `#ffd66b`),
      tag: `New Release`,
    },
    {
      id: `a2`,
      title: `Neon Cathedral`,
      artist: `Kairo North`,
      year: `2026`,
      gradient: Y(`#0f2027`, `#2c5364`, `#5cbdb9`),
      tag: `Editor's Pick`,
    },
    {
      id: `a3`,
      title: `Paper Boats`,
      artist: `Ines Marlow`,
      year: `2025`,
      gradient: Y(`#f8e8ee`, `#c9a0dc`, `#9b72cf`),
      tag: `Featured`,
    },
    {
      id: `a4`,
      title: `Static Gardens`,
      artist: `Yves Ferro`,
      year: `2026`,
      gradient: Y(`#1a1a2e`, `#4ade80`, `#a78bfa`),
      tag: `New Release`,
    },
    {
      id: `a5`,
      title: `Under the Argon Sky`,
      artist: `The Halide`,
      year: `2025`,
      gradient: Y(`#5c2018`, `#d4842a`, `#e8b84a`),
      tag: `Editor's Pick`,
    },
    {
      id: `a6`,
      title: `Solar Wind`,
      artist: `Halden Frey`,
      year: `2025`,
      gradient: Y(`#3a7bd5`, `#3a6073`),
      tag: `Trending`,
    },
    {
      id: `a7`,
      title: `Rust & Bones`,
      artist: `The Drift`,
      year: `2024`,
      gradient: Y(`#4e342e`, `#212121`),
      tag: `Classic`,
    },
    {
      id: `a8`,
      title: `Glass Castle`,
      artist: `Solene Vasquez`,
      year: `2026`,
      gradient: Y(`#833ab4`, `#fd1d1d`, `#fcb045`),
      tag: `New Release`,
    },
  ],
  Pu = [
    {
      id: `p1`,
      title: `Late Drive`,
      subtitle: `Your after-hours mix`,
      gradient: Y(`#0a0a1a`, `#4f46e5`),
      tracks: 42,
    },
    {
      id: `p2`,
      title: `Focus Field`,
      subtitle: `Ambient · Modern classical`,
      gradient: Y(`#0c2340`, `#5cbdb9`),
      tracks: 68,
    },
    {
      id: `p3`,
      title: `Warm Sunday`,
      subtitle: `Slow mornings, soft edges`,
      gradient: Y(`#faf8f5`, `#c9b99a`, `#8b7355`),
      tracks: 51,
    },
    {
      id: `p4`,
      title: `Iron & Ivory`,
      subtitle: `Post-rock crescendos`,
      gradient: Y(`#1a1a1a`, `#e85d3a`),
      tracks: 33,
    },
    {
      id: `p5`,
      title: `Bright Corners`,
      subtitle: `Indie pop, hand-picked`,
      gradient: Y(`#ff6b6b`, `#c44569`, `#574b90`),
      tracks: 74,
    },
    {
      id: `p6`,
      title: `Golden Hour`,
      subtitle: `Sun-soaked indie pop`,
      gradient: Y(`#ff6b35`, `#f7931e`),
      tracks: 58,
    },
    {
      id: `p7`,
      title: `Blue Room`,
      subtitle: `Late-night jazz and chill`,
      gradient: Y(`#0c2340`, `#1a4a6e`),
      tracks: 47,
    },
    {
      id: `p8`,
      title: `Aura Spark`,
      subtitle: `Upbeat electronic rhythm`,
      gradient: Y(`#11998e`, `#38ef7d`),
      tracks: 64,
    },
  ];
(Y(`#c4654a`, `#e8a87c`),
  Y(`#0d1b2a`, `#2dd4a8`),
  Y(`#5c2018`, `#e8b84a`),
  Y(`#f5f0e8`, `#7d9b76`));
var Fu = [
    { id: `g1`, name: `Alternative`, gradient: Y(`#ff6b35`, `#e84393`) },
    { id: `g2`, name: `Electronic`, gradient: Y(`#0f1b3d`, `#3b6fa0`) },
    { id: `g3`, name: `Jazz`, gradient: Y(`#0d0d0d`, `#c9a84c`) },
    { id: `g4`, name: `Hip-Hop`, gradient: Y(`#1a1a1a`, `#e85d3a`) },
    { id: `g5`, name: `Classical`, gradient: Y(`#f5f3ee`, `#8b7355`) },
    { id: `g6`, name: `R&B / Soul`, gradient: Y(`#c4654a`, `#87a878`) },
    { id: `g7`, name: `Rock`, gradient: Y(`#2d3748`, `#a0aec0`) },
    { id: `g8`, name: `Ambient`, gradient: Y(`#e8f0f8`, `#6ba3c8`) },
    { id: `g9`, name: `Pop`, gradient: Y(`#ff758c`, `#ff7eb3`) },
    { id: `g10`, name: `Indie`, gradient: Y(`#11998e`, `#38ef7d`) },
    { id: `g11`, name: `Latin`, gradient: Y(`#f857a6`, `#ff5858`) },
    { id: `g12`, name: `Reggae`, gradient: Y(`#0575e6`, `#00f260`) },
    { id: `g13`, name: `Metal`, gradient: Y(`#141e30`, `#243b55`) },
    { id: `g14`, name: `Folk`, gradient: Y(`#e65c00`, `#f9d423`) },
    { id: `g15`, name: `Blues`, gradient: Y(`#4e54c8`, `#8f94fb`) },
    { id: `g16`, name: `Dance`, gradient: Y(`#f12711`, `#f5af19`) },
  ],
  Iu = [
    {
      id: `t1`,
      title: `Cascade`,
      artist: `Lior Amari`,
      album: `Midnight Bloom`,
      duration: `3:24`,
      gradient: Y(`#ff3d7f`, `#ff9e5e`),
    },
    {
      id: `t2`,
      title: `Half Light`,
      artist: `Kairo North`,
      album: `Neon Cathedral`,
      duration: `4:11`,
      gradient: Y(`#0f2027`, `#5cbdb9`),
    },
    {
      id: `t3`,
      title: `Paper Boats`,
      artist: `Ines Marlow`,
      album: `Paper Boats`,
      duration: `2:58`,
      gradient: Y(`#c9a0dc`, `#9b72cf`),
    },
    {
      id: `t4`,
      title: `Argon`,
      artist: `The Halide`,
      album: `Under the Argon Sky`,
      duration: `5:02`,
      gradient: Y(`#5c2018`, `#e8b84a`),
    },
    {
      id: `t5`,
      title: `Ferrite`,
      artist: `Yves Ferro`,
      album: `Static Gardens`,
      duration: `3:47`,
      gradient: Y(`#1a1a2e`, `#a78bfa`),
    },
    {
      id: `t6`,
      title: `Slow Vessel`,
      artist: `Solene Vasquez`,
      album: `Midnight Bloom`,
      duration: `4:33`,
      gradient: Y(`#ff3d7f`, `#ffd66b`),
    },
    {
      id: `t7`,
      title: `Aperture`,
      artist: `Nova Ruiz`,
      album: `Aperture EP`,
      duration: `3:12`,
      gradient: Y(`#0c2340`, `#2d8a9e`),
    },
    {
      id: `t8`,
      title: `Copper Wire`,
      artist: `Halden Frey`,
      album: `Circuit Songs`,
      duration: `3:55`,
      gradient: Y(`#6b3a2a`, `#e8c07a`),
    },
  ],
  Lu = Pu.concat([
    {
      id: `p9`,
      title: `Golden Hour`,
      subtitle: `Sun-soaked indie`,
      gradient: Y(`#ff6b35`, `#f7931e`),
    },
    {
      id: `p10`,
      title: `Blue Room`,
      subtitle: `Late-night jazz`,
      gradient: Y(`#0c2340`, `#1a4a6e`),
    },
  ]),
  Ru = [
    {
      id: `tr1`,
      title: `After Hours`,
      artist: `Kairo North`,
      album: `Neon Cathedral`,
      duration: `3:48`,
      gradient: Y(`#0f2027`, `#2c5364`, `#5cbdb9`),
    },
    {
      id: `tr2`,
      title: `Stardust`,
      artist: `Solene Vasquez`,
      album: `Midnight Bloom`,
      duration: `4:02`,
      gradient: Y(`#ff3d7f`, `#ff9e5e`, `#ffd66b`),
    },
    {
      id: `tr3`,
      title: `Submerged`,
      artist: `The Drift`,
      album: `Undertow`,
      duration: `3:15`,
      gradient: Y(`#09090b`, `#180828`, `#4c1d95`),
    },
    {
      id: `tr4`,
      title: `Eclipse`,
      artist: `Luna Ray`,
      album: `Ultrawave EP`,
      duration: `3:51`,
      gradient: Y(`#1e1b4b`, `#31108f`, `#701a75`),
    },
    {
      id: `tr5`,
      title: `Pacific Drift`,
      artist: `Ines Marlow`,
      album: `Paper Boats`,
      duration: `3:32`,
      gradient: Y(`#00c6ff`, `#0072ff`),
    },
    {
      id: `tr6`,
      title: `Mercury`,
      artist: `Yves Ferro`,
      album: `Static Gardens`,
      duration: `4:05`,
      gradient: Y(`#f12711`, `#f5af19`),
    },
  ];
Iu[0];
var zu = [
    ...Nu,
    {
      id: `sea1`,
      title: `Silent Horizon`,
      artist: `Luna Ray`,
      gradient: `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)`,
    },
    {
      id: `sea2`,
      title: `Synapses`,
      artist: `Cipher`,
      gradient: `linear-gradient(135deg, #0f172a 0%, #3b82f6 100%)`,
    },
    {
      id: `sea3`,
      title: `Liquid Echoes`,
      artist: `Nyx`,
      gradient: `linear-gradient(135deg, #065f46 0%, #059669 100%)`,
    },
    {
      id: `sea4`,
      title: `Slow Burn`,
      artist: `The Void`,
      gradient: `linear-gradient(135deg, #451a03 0%, #9a3412 100%)`,
    },
  ],
  Bu = [
    {
      id: `lib-a1-t1`,
      title: `Neon Horizons`,
      artist: `Luna Ray`,
      album: `Neon Horizons`,
      duration: `3:45`,
      gradient: `linear-gradient(135deg, #1e1b4b 0%, #31108f 50%, #701a75 100%)`,
      coverUrl: `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&h=150&fit=crop&q=80`,
    },
    {
      id: `lib-a3-t1`,
      title: `Soft Collapse`,
      artist: `Nyx`,
      album: `Soft Collapse`,
      duration: `3:18`,
      gradient: `linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #f43f5e 100%)`,
      coverUrl: `https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=150&h=150&fit=crop&q=80`,
    },
    {
      id: `lib-a2-t1`,
      title: `Fractured`,
      artist: `Cipher`,
      album: `Fractured`,
      duration: `4:12`,
      gradient: `linear-gradient(135deg, #881337 0%, #be123c 40%, #0369a1 100%)`,
      coverUrl: `https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=150&h=150&fit=crop&q=80`,
    },
    {
      id: `lib-a4-t1`,
      title: `Slow Decay`,
      artist: `The Void`,
      album: `Slow Decay`,
      duration: `3:56`,
      gradient: `linear-gradient(135deg, #09090b 0%, #180828 60%, #4c1d95 100%)`,
      coverUrl: `https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=150&h=150&fit=crop&q=80`,
    },
  ],
  Vu = [
    ...Lu,
    {
      id: `sp1`,
      title: `Retro Wave`,
      subtitle: `80s synths and neon nights`,
      gradient: `linear-gradient(135deg, #4c0519 0%, #be123c 100%)`,
    },
    {
      id: `sp2`,
      title: `Forest Echoes`,
      subtitle: `Acoustic and indie folk`,
      gradient: `linear-gradient(135deg, #14532d 0%, #15803d 100%)`,
    },
    {
      id: `sp3`,
      title: `Lo-Fi Cafe`,
      subtitle: `Chilled beats for study and work`,
      gradient: `linear-gradient(135deg, #1c1917 0%, #44403c 100%)`,
    },
  ],
  Hu = null,
  Uu = null,
  Wu = null,
  Gu = null,
  Ku = null;
function qu() {
  if (typeof window > `u`) return null;
  if (!Hu) {
    let e = window.AudioContext ?? window.webkitAudioContext;
    if (!e) return null;
    Hu = new e();
  }
  return Hu;
}
function Ju() {
  let e = qu();
  return e
    ? (Gu || ((Gu = e.createAnalyser()), (Gu.fftSize = 32), Gu.connect(e.destination)), Gu)
    : null;
}
function Yu(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) t = (t * 31 + e.charCodeAt(n)) | 0;
  return Math.abs(t);
}
var Xu = [220, 246.94, 277.18, 293.66, 329.63, 369.99, 415.3, 440];
function Zu() {
  ((Wu &&= (Wu.pause(), (Wu.src = ``), null)),
    (Ku &&= (Ku.disconnect(), null)),
    (Uu &&= (Uu.stop(), null)));
}
function Qu(e, t) {
  let n = qu();
  if (!n) return;
  if ((Zu(), n.state === `suspended` && n.resume().catch(() => {}), t?.audioUrl)) {
    ((Wu = new Audio(t.audioUrl)), (Wu.crossOrigin = `anonymous`), (Wu.loop = !1));
    try {
      Ku = n.createMediaElementSource(Wu);
      let e = Ju();
      e ? Ku.connect(e) : Ku.connect(n.destination);
    } catch (e) {
      console.warn(`Could not create media element source:`, e);
    }
    Wu.play().catch(console.error);
    return;
  }
  let r = Yu(e) % Xu.length,
    i = [Xu[r], Xu[(r + 2) % Xu.length], Xu[(r + 4) % Xu.length]],
    a = n.createGain();
  a.gain.value = 0;
  let o = n.createBiquadFilter();
  ((o.type = `lowpass`), (o.frequency.value = 1400), (o.Q.value = 0.7), o.connect(a));
  let s = Ju();
  s ? a.connect(s) : a.connect(n.destination);
  let c = [],
    l = [];
  i.forEach((e, t) => {
    let r = n.createOscillator();
    ((r.type = t === 0 ? `sawtooth` : `sine`), (r.frequency.value = e / (t === 0 ? 2 : 1)));
    let i = n.createGain();
    ((i.gain.value = t === 0 ? 0.18 : 0.12),
      r.connect(i).connect(o),
      r.start(),
      c.push(r),
      l.push(i));
  });
  let u = n.currentTime,
    d = t?.seconds ?? 12;
  (a.gain.cancelScheduledValues(u),
    a.gain.setValueAtTime(1e-4, u),
    a.gain.exponentialRampToValueAtTime(0.18, u + 0.8),
    a.gain.setValueAtTime(0.18, u + d - 1.2),
    a.gain.exponentialRampToValueAtTime(1e-4, u + d));
  let f = () => {
      try {
        let e = n.currentTime;
        (a.gain.cancelScheduledValues(e),
          a.gain.setValueAtTime(a.gain.value, e),
          a.gain.exponentialRampToValueAtTime(1e-4, e + 0.15),
          c.forEach((t) => t.stop(e + 0.2)));
      } catch {}
    },
    p = window.setTimeout(() => {
      Uu && Uu.stop === f && (Uu = null);
    }, d * 1e3);
  Uu = {
    stop: () => {
      (window.clearTimeout(p), f());
    },
  };
}
h();
function $u(e) {
  if (!e || typeof document > `u`) return;
  let t = document.head || document.getElementsByTagName(`head`)[0],
    n = document.createElement(`style`);
  ((n.type = `text/css`),
    t.appendChild(n),
    n.styleSheet ? (n.styleSheet.cssText = e) : n.appendChild(document.createTextNode(e)));
}
Array(12).fill(0);
var ed = 1,
  td = new (class {
    constructor() {
      ((this.subscribe = (e) => (
        this.subscribers.push(e),
        () => {
          let t = this.subscribers.indexOf(e);
          this.subscribers.splice(t, 1);
        }
      )),
        (this.publish = (e) => {
          this.subscribers.forEach((t) => t(e));
        }),
        (this.addToast = (e) => {
          (this.publish(e), (this.toasts = [...this.toasts, e]));
        }),
        (this.create = (e) => {
          let { message: t, ...n } = e,
            r = typeof e?.id == `number` || e.id?.length > 0 ? e.id : ed++,
            i = this.toasts.find((e) => e.id === r),
            a = e.dismissible === void 0 || e.dismissible;
          return (
            this.dismissedToasts.has(r) && this.dismissedToasts.delete(r),
            i
              ? (this.toasts = this.toasts.map((n) =>
                  n.id === r
                    ? (this.publish({ ...n, ...e, id: r, title: t }),
                      { ...n, ...e, id: r, dismissible: a, title: t })
                    : n,
                ))
              : this.addToast({ title: t, ...n, dismissible: a, id: r }),
            r
          );
        }),
        (this.dismiss = (e) => (
          e
            ? (this.dismissedToasts.add(e),
              requestAnimationFrame(() =>
                this.subscribers.forEach((t) => t({ id: e, dismiss: !0 })),
              ))
            : this.toasts.forEach((e) => {
                this.subscribers.forEach((t) => t({ id: e.id, dismiss: !0 }));
              }),
          e
        )),
        (this.message = (e, t) => this.create({ ...t, message: e })),
        (this.error = (e, t) => this.create({ ...t, message: e, type: `error` })),
        (this.success = (e, t) => this.create({ ...t, type: `success`, message: e })),
        (this.info = (e, t) => this.create({ ...t, type: `info`, message: e })),
        (this.warning = (e, t) => this.create({ ...t, type: `warning`, message: e })),
        (this.loading = (e, t) => this.create({ ...t, type: `loading`, message: e })),
        (this.promise = (e, t) => {
          if (!t) return;
          let n;
          t.loading !== void 0 &&
            (n = this.create({
              ...t,
              promise: e,
              type: `loading`,
              message: t.loading,
              description: typeof t.description == `function` ? void 0 : t.description,
            }));
          let r = Promise.resolve(e instanceof Function ? e() : e),
            i = n !== void 0,
            a,
            o = r
              .then(async (e) => {
                if (((a = [`resolve`, e]), y.isValidElement(e)))
                  ((i = !1), this.create({ id: n, type: `default`, message: e }));
                else if (rd(e) && !e.ok) {
                  i = !1;
                  let r =
                      typeof t.error == `function`
                        ? await t.error(`HTTP error! status: ${e.status}`)
                        : t.error,
                    a =
                      typeof t.description == `function`
                        ? await t.description(`HTTP error! status: ${e.status}`)
                        : t.description,
                    o = typeof r == `object` && !y.isValidElement(r) ? r : { message: r };
                  this.create({ id: n, type: `error`, description: a, ...o });
                } else if (e instanceof Error) {
                  i = !1;
                  let r = typeof t.error == `function` ? await t.error(e) : t.error,
                    a = typeof t.description == `function` ? await t.description(e) : t.description,
                    o = typeof r == `object` && !y.isValidElement(r) ? r : { message: r };
                  this.create({ id: n, type: `error`, description: a, ...o });
                } else if (t.success !== void 0) {
                  i = !1;
                  let r = typeof t.success == `function` ? await t.success(e) : t.success,
                    a = typeof t.description == `function` ? await t.description(e) : t.description,
                    o = typeof r == `object` && !y.isValidElement(r) ? r : { message: r };
                  this.create({ id: n, type: `success`, description: a, ...o });
                }
              })
              .catch(async (e) => {
                if (((a = [`reject`, e]), t.error !== void 0)) {
                  i = !1;
                  let r = typeof t.error == `function` ? await t.error(e) : t.error,
                    a = typeof t.description == `function` ? await t.description(e) : t.description,
                    o = typeof r == `object` && !y.isValidElement(r) ? r : { message: r };
                  this.create({ id: n, type: `error`, description: a, ...o });
                }
              })
              .finally(() => {
                (i && (this.dismiss(n), (n = void 0)), t.finally == null || t.finally.call(t));
              }),
            s = () =>
              new Promise((e, t) => o.then(() => (a[0] === `reject` ? t(a[1]) : e(a[1]))).catch(t));
          return typeof n != `string` && typeof n != `number`
            ? { unwrap: s }
            : Object.assign(n, { unwrap: s });
        }),
        (this.custom = (e, t) => {
          let n = t?.id || ed++;
          return (this.create({ jsx: e(n), id: n, ...t }), n);
        }),
        (this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id))),
        (this.subscribers = []),
        (this.toasts = []),
        (this.dismissedToasts = new Set()));
    }
  })(),
  nd = (e, t) => {
    let n = t?.id || ed++;
    return (td.addToast({ title: e, ...t, id: n }), n);
  },
  rd = (e) =>
    e &&
    typeof e == `object` &&
    `ok` in e &&
    typeof e.ok == `boolean` &&
    `status` in e &&
    typeof e.status == `number`,
  id = Object.assign(
    nd,
    {
      success: td.success,
      info: td.info,
      warning: td.warning,
      error: td.error,
      custom: td.custom,
      message: td.message,
      promise: td.promise,
      dismiss: td.dismiss,
      loading: td.loading,
    },
    { getHistory: () => td.toasts, getToasts: () => td.getActiveToasts() },
  );
$u(
  `[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}`,
);
var ad = Mu(),
  od = `/app/applet/src/lib/player-context.tsx`,
  sd = (0, y.createContext)(null),
  cd = 14;
function ld({ children: e }) {
  let [t, n] = (0, y.useState)(Iu),
    [r, i] = (0, y.useState)(0),
    [a, o] = (0, y.useState)(!1),
    [s, c] = (0, y.useState)(!1),
    [l, u] = (0, y.useState)(0),
    d = (0, y.useRef)(null),
    f = (0, y.useRef)(0),
    p = (0, y.useRef)(null),
    m = (0, y.useRef)(null),
    [h, g] = (0, y.useState)(null),
    _ = (0, y.useRef)(null),
    v = (0, y.useRef)(!1);
  typeof window < `u` &&
    !m.current &&
    ((m.current = new Audio()), (m.current.crossOrigin = `anonymous`));
  let b = t[r] ?? Iu[0],
    x = (0, y.useCallback)(() => {
      p.current && cancelAnimationFrame(p.current);
      let e = () => {
        if (d.current == null) return;
        let t = (performance.now() - d.current) / 1e3,
          n = Math.min(1, t / cd);
        if ((u(n), (f.current = n), n >= 1)) {
          (o(!1), Zu(), (d.current = null), (f.current = 0), u(0));
          return;
        }
        p.current = requestAnimationFrame(e);
      };
      p.current = requestAnimationFrame(e);
    }, []),
    S = (0, y.useCallback)(() => {
      (p.current && cancelAnimationFrame(p.current), (p.current = null));
    }, []),
    C = (0, y.useCallback)(
      (e, t = 0) => {
        (Au.doublePulse(), Zu());
        let n = m.current;
        if (n)
          if (e.audioUrl) {
            if ((S(), !v.current))
              try {
                let e = Ju();
                e &&
                  e.context &&
                  (e.context.createMediaElementSource(n).connect(e), (v.current = !0));
              } catch (e) {
                console.warn(`Could not connect audio element to Web Audio analyser:`, e);
              }
            n.src !== e.audioUrl && ((n.src = e.audioUrl), n.load());
            let r = () => {
              t > 0 && n.duration
                ? (n.currentTime = t * n.duration)
                : t === 0 && (n.currentTime = 0);
            };
            (n.readyState >= 1
              ? r()
              : (n.onloadedmetadata = () => {
                  (r(), (n.onloadedmetadata = null));
                }),
              o(!0),
              n.play().catch((e) => {
                (console.error(`Audio playback failed:`, e), o(!1));
              }));
          } else {
            (n.pause(), Qu(e.id, { seconds: cd }));
            let r = t * cd;
            ((d.current = performance.now() - r * 1e3), u(t), (f.current = t), o(!0), x());
          }
      },
      [x, S],
    ),
    w = (0, y.useCallback)(() => {
      (Au.light(), Zu(), S(), (d.current = null), o(!1));
      let e = m.current;
      e && e.pause();
    }, [S]),
    T = (0, y.useCallback)((e) => {
      if (((_.current &&= (clearInterval(_.current), null)), e === null)) {
        (g(null), id.success(`Sleep timer cancelled`));
        return;
      }
      let t = e * 60;
      (g(t),
        id.success(`Sleep timer set for ${e} minute${e > 1 ? `s` : ``}`),
        (_.current = setInterval(() => {
          g((e) => {
            if (e === null || e <= 1) {
              (clearInterval(_.current),
                (_.current = null),
                Zu(),
                p.current && cancelAnimationFrame(p.current),
                (p.current = null),
                (d.current = null),
                o(!1));
              let e = m.current;
              return (e && e.pause(), id.info(`Sleep timer ended. Playback stopped.`), null);
            }
            return e - 1;
          });
        }, 1e3)));
    }, []);
  (0, y.useEffect)(
    () => () => {
      _.current && clearInterval(_.current);
    },
    [],
  );
  let E = (0, y.useCallback)(() => {
      a ? w() : C(b, f.current);
    }, [a, C, w, b]),
    D = (0, y.useCallback)(
      (e) => {
        i(e);
        let n = t[e];
        n && C(n);
      },
      [C, t],
    ),
    O = (0, y.useCallback)(() => {
      if (r < t.length - 1) {
        let e = r + 1;
        (i(e), C(t[e], 0));
      }
    }, [r, C, t]),
    ee = (0, y.useCallback)(() => {
      if (r > 0) {
        let e = r - 1;
        (i(e), C(t[e], 0));
      }
    }, [r, C, t]);
  ((0, y.useEffect)(() => {
    let e = m.current;
    if (!e) return;
    let n = () => {
        let n = t[r];
        if (n && n.audioUrl && e.duration) {
          let t = e.currentTime / e.duration;
          (u(t), (f.current = t));
        }
      },
      i = () => {
        let e = t[r];
        e && e.audioUrl && O();
      },
      a = () => {
        o(!0);
      },
      s = () => {
        o(!1);
      };
    return (
      e.addEventListener(`timeupdate`, n),
      e.addEventListener(`ended`, i),
      e.addEventListener(`play`, a),
      e.addEventListener(`pause`, s),
      () => {
        (e.removeEventListener(`timeupdate`, n),
          e.removeEventListener(`ended`, i),
          e.removeEventListener(`play`, a),
          e.removeEventListener(`pause`, s));
      }
    );
  }, [r, t, O]),
    (0, y.useEffect)(
      () => () => {
        (S(), Zu(), m.current && (m.current.pause(), (m.current.src = ``)));
      },
      [S],
    ));
  let k = (0, y.useCallback)(
      (e) => {
        let r = t.findIndex((t) => t.id === e.id);
        (r >= 0 ? i(r) : (n((t) => [e, ...t]), i(0)), C(e, 0));
      },
      [C, t],
    ),
    A = (0, y.useCallback)((e) => {
      (Au.light(),
        n((t) => {
          if (t.length <= 1) return t;
          let n = t.filter((t, n) => n !== e);
          return (i((t) => (e < t ? t - 1 : e === t ? Math.min(t, n.length - 1) : t)), n);
        }));
    }, []),
    j = (0, y.useCallback)((e, t) => {
      (Au.light(),
        n((n) => {
          if (e === t || e < 0 || t < 0 || e >= n.length || t >= n.length) return n;
          let r = n.slice(),
            [a] = r.splice(e, 1);
          return (
            r.splice(t, 0, a),
            i((n) => (n === e ? t : e < n && t >= n ? n - 1 : e > n && t <= n ? n + 1 : n)),
            r
          );
        }));
    }, []),
    M = (0, y.useCallback)(
      (e) => {
        (Au.light(),
          n((t) => {
            if (t[r]?.id === e.id) return t;
            let n = t.filter((t) => t.id !== e.id),
              a = t[r],
              o = n.findIndex((e) => e.id === a.id);
            o === -1 && (o = 0);
            let s = [...n];
            return (s.splice(o + 1, 0, e), i(o), s);
          }),
          id.success(`"${e.title}" will play next`));
      },
      [r],
    ),
    te = (0, y.useCallback)(
      (e) => {
        (Au.light(),
          n((t) => {
            if (t.some((t) => t.id === e.id)) {
              if (t[r]?.id === e.id) return t;
              let n = t.filter((t) => t.id !== e.id),
                a = t[r],
                o = n.findIndex((e) => e.id === a.id);
              return (o === -1 && (o = 0), i(o), [...n, e]);
            }
            return [...t, e];
          }),
          id.success(`Added "${e.title}" to queue`));
      },
      [r],
    );
  return (0, ad.jsxDEV)(
    sd.Provider,
    {
      value: {
        track: b,
        queue: t,
        currentIndex: r,
        isPlaying: a,
        progress: l,
        nowPlayingOpen: s,
        setTrack: k,
        toggle: E,
        next: O,
        prev: ee,
        playAt: D,
        removeAt: A,
        moveItem: j,
        openNowPlaying: () => {
          (Au.light(), c(!0));
        },
        closeNowPlaying: () => {
          (Au.light(), c(!1));
        },
        sleepTimerRemaining: h,
        setSleepTimer: T,
        addToPlayNext: M,
        addToQueue: te,
      },
      children: e,
    },
    void 0,
    !1,
    { fileName: od, lineNumber: 398, columnNumber: 5 },
    this,
  );
}
function ud() {
  let e = (0, y.useContext)(sd);
  if (!e) throw Error(`usePlayer outside provider`);
  return e;
}
function dd(e) {
  var t,
    n,
    r = ``;
  if (typeof e == `string` || typeof e == `number`) r += e;
  else if (typeof e == `object`)
    if (Array.isArray(e)) {
      var i = e.length;
      for (t = 0; t < i; t++) e[t] && (n = dd(e[t])) && (r && (r += ` `), (r += n));
    } else for (n in e) e[n] && (r && (r += ` `), (r += n));
  return r;
}
function fd() {
  for (var e, t, n = 0, r = ``, i = arguments.length; n < i; n++)
    (e = arguments[n]) && (t = dd(e)) && (r && (r += ` `), (r += t));
  return r;
}
var pd = (e, t) => {
    let n = Array(e.length + t.length);
    for (let t = 0; t < e.length; t++) n[t] = e[t];
    for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
    return n;
  },
  md = (e, t) => ({ classGroupId: e, validator: t }),
  hd = (e = new Map(), t = null, n) => ({ nextPart: e, validators: t, classGroupId: n }),
  gd = `-`,
  _d = [],
  vd = `arbitrary..`,
  yd = (e) => {
    let t = Sd(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: (e) => {
        if (e.startsWith(`[`) && e.endsWith(`]`)) return xd(e);
        let n = e.split(gd);
        return bd(n, +(n[0] === `` && n.length > 1), t);
      },
      getConflictingClassGroupIds: (e, t) => {
        if (t) {
          let t = r[e],
            i = n[e];
          return t ? (i ? pd(i, t) : t) : i || _d;
        }
        return n[e] || _d;
      },
    };
  },
  bd = (e, t, n) => {
    if (e.length - t === 0) return n.classGroupId;
    let r = e[t],
      i = n.nextPart.get(r);
    if (i) {
      let n = bd(e, t + 1, i);
      if (n) return n;
    }
    let a = n.validators;
    if (a === null) return;
    let o = t === 0 ? e.join(gd) : e.slice(t).join(gd),
      s = a.length;
    for (let e = 0; e < s; e++) {
      let t = a[e];
      if (t.validator(o)) return t.classGroupId;
    }
  },
  xd = (e) =>
    e.slice(1, -1).indexOf(`:`) === -1
      ? void 0
      : (() => {
          let t = e.slice(1, -1),
            n = t.indexOf(`:`),
            r = t.slice(0, n);
          return r ? vd + r : void 0;
        })(),
  Sd = (e) => {
    let { theme: t, classGroups: n } = e;
    return Cd(n, t);
  },
  Cd = (e, t) => {
    let n = hd();
    for (let r in e) {
      let i = e[r];
      wd(i, n, r, t);
    }
    return n;
  },
  wd = (e, t, n, r) => {
    let i = e.length;
    for (let a = 0; a < i; a++) {
      let i = e[a];
      Td(i, t, n, r);
    }
  },
  Td = (e, t, n, r) => {
    if (typeof e == `string`) {
      Ed(e, t, n);
      return;
    }
    if (typeof e == `function`) {
      Dd(e, t, n, r);
      return;
    }
    Od(e, t, n, r);
  },
  Ed = (e, t, n) => {
    let r = e === `` ? t : kd(t, e);
    r.classGroupId = n;
  },
  Dd = (e, t, n, r) => {
    if (Ad(e)) {
      wd(e(r), t, n, r);
      return;
    }
    (t.validators === null && (t.validators = []), t.validators.push(md(n, e)));
  },
  Od = (e, t, n, r) => {
    let i = Object.entries(e),
      a = i.length;
    for (let e = 0; e < a; e++) {
      let [a, o] = i[e];
      wd(o, kd(t, a), n, r);
    }
  },
  kd = (e, t) => {
    let n = e,
      r = t.split(gd),
      i = r.length;
    for (let e = 0; e < i; e++) {
      let t = r[e],
        i = n.nextPart.get(t);
      (i || ((i = hd()), n.nextPart.set(t, i)), (n = i));
    }
    return n;
  },
  Ad = (e) => `isThemeGetter` in e && e.isThemeGetter === !0,
  jd = (e) => {
    if (e < 1) return { get: () => void 0, set: () => {} };
    let t = 0,
      n = Object.create(null),
      r = Object.create(null),
      i = (i, a) => {
        ((n[i] = a), t++, t > e && ((t = 0), (r = n), (n = Object.create(null))));
      };
    return {
      get(e) {
        let t = n[e];
        if (t !== void 0) return t;
        if ((t = r[e]) !== void 0) return (i(e, t), t);
      },
      set(e, t) {
        e in n ? (n[e] = t) : i(e, t);
      },
    };
  },
  Md = `!`,
  Nd = `:`,
  Pd = [],
  Fd = (e, t, n, r, i) => ({
    modifiers: e,
    hasImportantModifier: t,
    baseClassName: n,
    maybePostfixModifierPosition: r,
    isExternal: i,
  }),
  Id = (e) => {
    let { prefix: t, experimentalParseClassName: n } = e,
      r = (e) => {
        let t = [],
          n = 0,
          r = 0,
          i = 0,
          a,
          o = e.length;
        for (let s = 0; s < o; s++) {
          let o = e[s];
          if (n === 0 && r === 0) {
            if (o === Nd) {
              (t.push(e.slice(i, s)), (i = s + 1));
              continue;
            }
            if (o === `/`) {
              a = s;
              continue;
            }
          }
          o === `[` ? n++ : o === `]` ? n-- : o === `(` ? r++ : o === `)` && r--;
        }
        let s = t.length === 0 ? e : e.slice(i),
          c = s,
          l = !1;
        s.endsWith(Md)
          ? ((c = s.slice(0, -1)), (l = !0))
          : s.startsWith(Md) && ((c = s.slice(1)), (l = !0));
        let u = a && a > i ? a - i : void 0;
        return Fd(t, l, c, u);
      };
    if (t) {
      let e = t + Nd,
        n = r;
      r = (t) => (t.startsWith(e) ? n(t.slice(e.length)) : Fd(Pd, !1, t, void 0, !0));
    }
    if (n) {
      let e = r;
      r = (t) => n({ className: t, parseClassName: e });
    }
    return r;
  },
  Ld = (e) => {
    let t = new Map();
    return (
      e.orderSensitiveModifiers.forEach((e, n) => {
        t.set(e, 1e6 + n);
      }),
      (e) => {
        let n = [],
          r = [];
        for (let i = 0; i < e.length; i++) {
          let a = e[i],
            o = a[0] === `[`,
            s = t.has(a);
          o || s ? (r.length > 0 && (r.sort(), n.push(...r), (r = [])), n.push(a)) : r.push(a);
        }
        return (r.length > 0 && (r.sort(), n.push(...r)), n);
      }
    );
  },
  Rd = (e) => ({
    cache: jd(e.cacheSize),
    parseClassName: Id(e),
    sortModifiers: Ld(e),
    postfixLookupClassGroupIds: zd(e),
    ...yd(e),
  }),
  zd = (e) => {
    let t = Object.create(null),
      n = e.postfixLookupClassGroups;
    if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
    return t;
  },
  Bd = /\s+/,
  Vd = (e, t) => {
    let {
        parseClassName: n,
        getClassGroupId: r,
        getConflictingClassGroupIds: i,
        sortModifiers: a,
        postfixLookupClassGroupIds: o,
      } = t,
      s = [],
      c = e.trim().split(Bd),
      l = ``;
    for (let e = c.length - 1; e >= 0; --e) {
      let t = c[e],
        {
          isExternal: u,
          modifiers: d,
          hasImportantModifier: f,
          baseClassName: p,
          maybePostfixModifierPosition: m,
        } = n(t);
      if (u) {
        l = t + (l.length > 0 ? ` ` + l : l);
        continue;
      }
      let h = !!m,
        g;
      if (h) {
        g = r(p.substring(0, m));
        let e = g && o[g] ? r(p) : void 0;
        e && e !== g && ((g = e), (h = !1));
      } else g = r(p);
      if (!g) {
        if (!h) {
          l = t + (l.length > 0 ? ` ` + l : l);
          continue;
        }
        if (((g = r(p)), !g)) {
          l = t + (l.length > 0 ? ` ` + l : l);
          continue;
        }
        h = !1;
      }
      let _ = d.length === 0 ? `` : d.length === 1 ? d[0] : a(d).join(`:`),
        v = f ? _ + Md : _,
        y = v + g;
      if (s.indexOf(y) > -1) continue;
      s.push(y);
      let b = i(g, h);
      for (let e = 0; e < b.length; ++e) {
        let t = b[e];
        s.push(v + t);
      }
      l = t + (l.length > 0 ? ` ` + l : l);
    }
    return l;
  },
  Hd = (...e) => {
    let t = 0,
      n,
      r,
      i = ``;
    for (; t < e.length;) (n = e[t++]) && (r = Ud(n)) && (i && (i += ` `), (i += r));
    return i;
  },
  Ud = (e) => {
    if (typeof e == `string`) return e;
    let t,
      n = ``;
    for (let r = 0; r < e.length; r++) e[r] && (t = Ud(e[r])) && (n && (n += ` `), (n += t));
    return n;
  },
  Wd = (e, ...t) => {
    let n,
      r,
      i,
      a,
      o = (o) => (
        (n = Rd(t.reduce((e, t) => t(e), e()))),
        (r = n.cache.get),
        (i = n.cache.set),
        (a = s),
        s(o)
      ),
      s = (e) => {
        let t = r(e);
        if (t) return t;
        let a = Vd(e, n);
        return (i(e, a), a);
      };
    return ((a = o), (...e) => a(Hd(...e)));
  },
  Gd = [],
  X = (e) => {
    let t = (t) => t[e] || Gd;
    return ((t.isThemeGetter = !0), t);
  },
  Kd = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  qd = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  Jd = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
  Yd = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Xd =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Zd = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  Qd = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  $d =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  ef = (e) => Jd.test(e),
  Z = (e) => !!e && !Number.isNaN(Number(e)),
  tf = (e) => !!e && Number.isInteger(Number(e)),
  nf = (e) => e.endsWith(`%`) && Z(e.slice(0, -1)),
  rf = (e) => Yd.test(e),
  af = () => !0,
  of = (e) => Xd.test(e) && !Zd.test(e),
  sf = () => !1,
  cf = (e) => Qd.test(e),
  lf = (e) => $d.test(e),
  uf = (e) => !Q(e) && !$(e),
  df = (e) =>
    e.startsWith(`@container`) &&
    ((e[10] === `/` && e[11] !== void 0) ||
      (e[11] === `s` && e[16] !== void 0 && e.startsWith(`-size/`, 10)) ||
      (e[11] === `n` && e[18] !== void 0 && e.startsWith(`-normal/`, 10))),
  ff = (e) => Df(e, jf, sf),
  Q = (e) => Kd.test(e),
  pf = (e) => Df(e, Mf, of),
  mf = (e) => Df(e, Nf, Z),
  hf = (e) => Df(e, Ff, af),
  gf = (e) => Df(e, Pf, sf),
  _f = (e) => Df(e, kf, sf),
  vf = (e) => Df(e, Af, lf),
  yf = (e) => Df(e, If, cf),
  $ = (e) => qd.test(e),
  bf = (e) => Of(e, Mf),
  xf = (e) => Of(e, Pf),
  Sf = (e) => Of(e, kf),
  Cf = (e) => Of(e, jf),
  wf = (e) => Of(e, Af),
  Tf = (e) => Of(e, If, !0),
  Ef = (e) => Of(e, Ff, !0),
  Df = (e, t, n) => {
    let r = Kd.exec(e);
    return r ? (r[1] ? t(r[1]) : n(r[2])) : !1;
  },
  Of = (e, t, n = !1) => {
    let r = qd.exec(e);
    return r ? (r[1] ? t(r[1]) : n) : !1;
  },
  kf = (e) => e === `position` || e === `percentage`,
  Af = (e) => e === `image` || e === `url`,
  jf = (e) => e === `length` || e === `size` || e === `bg-size`,
  Mf = (e) => e === `length`,
  Nf = (e) => e === `number`,
  Pf = (e) => e === `family-name`,
  Ff = (e) => e === `number` || e === `weight`,
  If = (e) => e === `shadow`,
  Lf = Wd(() => {
    let e = X(`color`),
      t = X(`font`),
      n = X(`text`),
      r = X(`font-weight`),
      i = X(`tracking`),
      a = X(`leading`),
      o = X(`breakpoint`),
      s = X(`container`),
      c = X(`spacing`),
      l = X(`radius`),
      u = X(`shadow`),
      d = X(`inset-shadow`),
      f = X(`text-shadow`),
      p = X(`drop-shadow`),
      m = X(`blur`),
      h = X(`perspective`),
      g = X(`aspect`),
      _ = X(`ease`),
      v = X(`animate`),
      y = () => [`auto`, `avoid`, `all`, `avoid-page`, `page`, `left`, `right`, `column`],
      b = () => [
        `center`,
        `top`,
        `bottom`,
        `left`,
        `right`,
        `top-left`,
        `left-top`,
        `top-right`,
        `right-top`,
        `bottom-right`,
        `right-bottom`,
        `bottom-left`,
        `left-bottom`,
      ],
      x = () => [...b(), $, Q],
      S = () => [`auto`, `hidden`, `clip`, `visible`, `scroll`],
      C = () => [`auto`, `contain`, `none`],
      w = () => [$, Q, c],
      T = () => [ef, `full`, `auto`, ...w()],
      E = () => [tf, `none`, `subgrid`, $, Q],
      D = () => [`auto`, { span: [`full`, tf, $, Q] }, tf, $, Q],
      O = () => [tf, `auto`, $, Q],
      ee = () => [`auto`, `min`, `max`, `fr`, $, Q],
      k = () => [
        `start`,
        `end`,
        `center`,
        `between`,
        `around`,
        `evenly`,
        `stretch`,
        `baseline`,
        `center-safe`,
        `end-safe`,
      ],
      A = () => [`start`, `end`, `center`, `stretch`, `center-safe`, `end-safe`],
      j = () => [`auto`, ...w()],
      M = () => [
        ef,
        `auto`,
        `full`,
        `dvw`,
        `dvh`,
        `lvw`,
        `lvh`,
        `svw`,
        `svh`,
        `min`,
        `max`,
        `fit`,
        ...w(),
      ],
      te = () => [ef, `screen`, `full`, `dvw`, `lvw`, `svw`, `min`, `max`, `fit`, ...w()],
      N = () => [ef, `screen`, `full`, `lh`, `dvh`, `lvh`, `svh`, `min`, `max`, `fit`, ...w()],
      P = () => [e, $, Q],
      ne = () => [...b(), Sf, _f, { position: [$, Q] }],
      re = () => [`no-repeat`, { repeat: [``, `x`, `y`, `space`, `round`] }],
      F = () => [`auto`, `cover`, `contain`, Cf, ff, { size: [$, Q] }],
      I = () => [nf, bf, pf],
      L = () => [``, `none`, `full`, l, $, Q],
      R = () => [``, Z, bf, pf],
      ie = () => [`solid`, `dashed`, `dotted`, `double`],
      ae = () => [
        `normal`,
        `multiply`,
        `screen`,
        `overlay`,
        `darken`,
        `lighten`,
        `color-dodge`,
        `color-burn`,
        `hard-light`,
        `soft-light`,
        `difference`,
        `exclusion`,
        `hue`,
        `saturation`,
        `color`,
        `luminosity`,
      ],
      z = () => [Z, nf, Sf, _f],
      oe = () => [``, `none`, m, $, Q],
      se = () => [`none`, Z, $, Q],
      ce = () => [`none`, Z, $, Q],
      le = () => [Z, $, Q],
      ue = () => [ef, `full`, ...w()];
    return {
      cacheSize: 500,
      theme: {
        animate: [`spin`, `ping`, `pulse`, `bounce`],
        aspect: [`video`],
        blur: [rf],
        breakpoint: [rf],
        color: [af],
        container: [rf],
        "drop-shadow": [rf],
        ease: [`in`, `out`, `in-out`],
        font: [uf],
        "font-weight": [
          `thin`,
          `extralight`,
          `light`,
          `normal`,
          `medium`,
          `semibold`,
          `bold`,
          `extrabold`,
          `black`,
        ],
        "inset-shadow": [rf],
        leading: [`none`, `tight`, `snug`, `normal`, `relaxed`, `loose`],
        perspective: [`dramatic`, `near`, `normal`, `midrange`, `distant`, `none`],
        radius: [rf],
        shadow: [rf],
        spacing: [`px`, Z],
        text: [rf],
        "text-shadow": [rf],
        tracking: [`tighter`, `tight`, `normal`, `wide`, `wider`, `widest`],
      },
      classGroups: {
        aspect: [{ aspect: [`auto`, `square`, ef, Q, $, g] }],
        container: [`container`],
        "container-type": [{ "@container": [``, `normal`, `size`, $, Q] }],
        "container-named": [df],
        columns: [{ columns: [Z, Q, $, s] }],
        "break-after": [{ "break-after": y() }],
        "break-before": [{ "break-before": y() }],
        "break-inside": [{ "break-inside": [`auto`, `avoid`, `avoid-page`, `avoid-column`] }],
        "box-decoration": [{ "box-decoration": [`slice`, `clone`] }],
        box: [{ box: [`border`, `content`] }],
        display: [
          `block`,
          `inline-block`,
          `inline`,
          `flex`,
          `inline-flex`,
          `table`,
          `inline-table`,
          `table-caption`,
          `table-cell`,
          `table-column`,
          `table-column-group`,
          `table-footer-group`,
          `table-header-group`,
          `table-row-group`,
          `table-row`,
          `flow-root`,
          `grid`,
          `inline-grid`,
          `contents`,
          `list-item`,
          `hidden`,
        ],
        sr: [`sr-only`, `not-sr-only`],
        float: [{ float: [`right`, `left`, `none`, `start`, `end`] }],
        clear: [{ clear: [`left`, `right`, `both`, `none`, `start`, `end`] }],
        isolation: [`isolate`, `isolation-auto`],
        "object-fit": [{ object: [`contain`, `cover`, `fill`, `none`, `scale-down`] }],
        "object-position": [{ object: x() }],
        overflow: [{ overflow: S() }],
        "overflow-x": [{ "overflow-x": S() }],
        "overflow-y": [{ "overflow-y": S() }],
        overscroll: [{ overscroll: C() }],
        "overscroll-x": [{ "overscroll-x": C() }],
        "overscroll-y": [{ "overscroll-y": C() }],
        position: [`static`, `fixed`, `absolute`, `relative`, `sticky`],
        inset: [{ inset: T() }],
        "inset-x": [{ "inset-x": T() }],
        "inset-y": [{ "inset-y": T() }],
        start: [{ "inset-s": T(), start: T() }],
        end: [{ "inset-e": T(), end: T() }],
        "inset-bs": [{ "inset-bs": T() }],
        "inset-be": [{ "inset-be": T() }],
        top: [{ top: T() }],
        right: [{ right: T() }],
        bottom: [{ bottom: T() }],
        left: [{ left: T() }],
        visibility: [`visible`, `invisible`, `collapse`],
        z: [{ z: [tf, `auto`, $, Q] }],
        basis: [{ basis: [ef, `full`, `auto`, s, ...w()] }],
        "flex-direction": [{ flex: [`row`, `row-reverse`, `col`, `col-reverse`] }],
        "flex-wrap": [{ flex: [`nowrap`, `wrap`, `wrap-reverse`] }],
        flex: [{ flex: [Z, ef, `auto`, `initial`, `none`, Q] }],
        grow: [{ grow: [``, Z, $, Q] }],
        shrink: [{ shrink: [``, Z, $, Q] }],
        order: [{ order: [tf, `first`, `last`, `none`, $, Q] }],
        "grid-cols": [{ "grid-cols": E() }],
        "col-start-end": [{ col: D() }],
        "col-start": [{ "col-start": O() }],
        "col-end": [{ "col-end": O() }],
        "grid-rows": [{ "grid-rows": E() }],
        "row-start-end": [{ row: D() }],
        "row-start": [{ "row-start": O() }],
        "row-end": [{ "row-end": O() }],
        "grid-flow": [{ "grid-flow": [`row`, `col`, `dense`, `row-dense`, `col-dense`] }],
        "auto-cols": [{ "auto-cols": ee() }],
        "auto-rows": [{ "auto-rows": ee() }],
        gap: [{ gap: w() }],
        "gap-x": [{ "gap-x": w() }],
        "gap-y": [{ "gap-y": w() }],
        "justify-content": [{ justify: [...k(), `normal`] }],
        "justify-items": [{ "justify-items": [...A(), `normal`] }],
        "justify-self": [{ "justify-self": [`auto`, ...A()] }],
        "align-content": [{ content: [`normal`, ...k()] }],
        "align-items": [{ items: [...A(), { baseline: [``, `last`] }] }],
        "align-self": [{ self: [`auto`, ...A(), { baseline: [``, `last`] }] }],
        "place-content": [{ "place-content": k() }],
        "place-items": [{ "place-items": [...A(), `baseline`] }],
        "place-self": [{ "place-self": [`auto`, ...A()] }],
        p: [{ p: w() }],
        px: [{ px: w() }],
        py: [{ py: w() }],
        ps: [{ ps: w() }],
        pe: [{ pe: w() }],
        pbs: [{ pbs: w() }],
        pbe: [{ pbe: w() }],
        pt: [{ pt: w() }],
        pr: [{ pr: w() }],
        pb: [{ pb: w() }],
        pl: [{ pl: w() }],
        m: [{ m: j() }],
        mx: [{ mx: j() }],
        my: [{ my: j() }],
        ms: [{ ms: j() }],
        me: [{ me: j() }],
        mbs: [{ mbs: j() }],
        mbe: [{ mbe: j() }],
        mt: [{ mt: j() }],
        mr: [{ mr: j() }],
        mb: [{ mb: j() }],
        ml: [{ ml: j() }],
        "space-x": [{ "space-x": w() }],
        "space-x-reverse": [`space-x-reverse`],
        "space-y": [{ "space-y": w() }],
        "space-y-reverse": [`space-y-reverse`],
        size: [{ size: M() }],
        "inline-size": [{ inline: [`auto`, ...te()] }],
        "min-inline-size": [{ "min-inline": [`auto`, ...te()] }],
        "max-inline-size": [{ "max-inline": [`none`, ...te()] }],
        "block-size": [{ block: [`auto`, ...N()] }],
        "min-block-size": [{ "min-block": [`auto`, ...N()] }],
        "max-block-size": [{ "max-block": [`none`, ...N()] }],
        w: [{ w: [s, `screen`, ...M()] }],
        "min-w": [{ "min-w": [s, `screen`, `none`, ...M()] }],
        "max-w": [{ "max-w": [s, `screen`, `none`, `prose`, { screen: [o] }, ...M()] }],
        h: [{ h: [`screen`, `lh`, ...M()] }],
        "min-h": [{ "min-h": [`screen`, `lh`, `none`, ...M()] }],
        "max-h": [{ "max-h": [`screen`, `lh`, ...M()] }],
        "font-size": [{ text: [`base`, n, bf, pf] }],
        "font-smoothing": [`antialiased`, `subpixel-antialiased`],
        "font-style": [`italic`, `not-italic`],
        "font-weight": [{ font: [r, Ef, hf] }],
        "font-stretch": [
          {
            "font-stretch": [
              `ultra-condensed`,
              `extra-condensed`,
              `condensed`,
              `semi-condensed`,
              `normal`,
              `semi-expanded`,
              `expanded`,
              `extra-expanded`,
              `ultra-expanded`,
              nf,
              Q,
            ],
          },
        ],
        "font-family": [{ font: [xf, gf, t] }],
        "font-features": [{ "font-features": [Q] }],
        "fvn-normal": [`normal-nums`],
        "fvn-ordinal": [`ordinal`],
        "fvn-slashed-zero": [`slashed-zero`],
        "fvn-figure": [`lining-nums`, `oldstyle-nums`],
        "fvn-spacing": [`proportional-nums`, `tabular-nums`],
        "fvn-fraction": [`diagonal-fractions`, `stacked-fractions`],
        tracking: [{ tracking: [i, $, Q] }],
        "line-clamp": [{ "line-clamp": [Z, `none`, $, mf] }],
        leading: [{ leading: [a, ...w()] }],
        "list-image": [{ "list-image": [`none`, $, Q] }],
        "list-style-position": [{ list: [`inside`, `outside`] }],
        "list-style-type": [{ list: [`disc`, `decimal`, `none`, $, Q] }],
        "text-alignment": [{ text: [`left`, `center`, `right`, `justify`, `start`, `end`] }],
        "placeholder-color": [{ placeholder: P() }],
        "text-color": [{ text: P() }],
        "text-decoration": [`underline`, `overline`, `line-through`, `no-underline`],
        "text-decoration-style": [{ decoration: [...ie(), `wavy`] }],
        "text-decoration-thickness": [{ decoration: [Z, `from-font`, `auto`, $, pf] }],
        "text-decoration-color": [{ decoration: P() }],
        "underline-offset": [{ "underline-offset": [Z, `auto`, $, Q] }],
        "text-transform": [`uppercase`, `lowercase`, `capitalize`, `normal-case`],
        "text-overflow": [`truncate`, `text-ellipsis`, `text-clip`],
        "text-wrap": [{ text: [`wrap`, `nowrap`, `balance`, `pretty`] }],
        indent: [{ indent: w() }],
        "tab-size": [{ tab: [tf, $, Q] }],
        "vertical-align": [
          {
            align: [
              `baseline`,
              `top`,
              `middle`,
              `bottom`,
              `text-top`,
              `text-bottom`,
              `sub`,
              `super`,
              $,
              Q,
            ],
          },
        ],
        whitespace: [
          { whitespace: [`normal`, `nowrap`, `pre`, `pre-line`, `pre-wrap`, `break-spaces`] },
        ],
        break: [{ break: [`normal`, `words`, `all`, `keep`] }],
        wrap: [{ wrap: [`break-word`, `anywhere`, `normal`] }],
        hyphens: [{ hyphens: [`none`, `manual`, `auto`] }],
        content: [{ content: [`none`, $, Q] }],
        "bg-attachment": [{ bg: [`fixed`, `local`, `scroll`] }],
        "bg-clip": [{ "bg-clip": [`border`, `padding`, `content`, `text`] }],
        "bg-origin": [{ "bg-origin": [`border`, `padding`, `content`] }],
        "bg-position": [{ bg: ne() }],
        "bg-repeat": [{ bg: re() }],
        "bg-size": [{ bg: F() }],
        "bg-image": [
          {
            bg: [
              `none`,
              {
                linear: [{ to: [`t`, `tr`, `r`, `br`, `b`, `bl`, `l`, `tl`] }, tf, $, Q],
                radial: [``, $, Q],
                conic: [tf, $, Q],
              },
              wf,
              vf,
            ],
          },
        ],
        "bg-color": [{ bg: P() }],
        "gradient-from-pos": [{ from: I() }],
        "gradient-via-pos": [{ via: I() }],
        "gradient-to-pos": [{ to: I() }],
        "gradient-from": [{ from: P() }],
        "gradient-via": [{ via: P() }],
        "gradient-to": [{ to: P() }],
        rounded: [{ rounded: L() }],
        "rounded-s": [{ "rounded-s": L() }],
        "rounded-e": [{ "rounded-e": L() }],
        "rounded-t": [{ "rounded-t": L() }],
        "rounded-r": [{ "rounded-r": L() }],
        "rounded-b": [{ "rounded-b": L() }],
        "rounded-l": [{ "rounded-l": L() }],
        "rounded-ss": [{ "rounded-ss": L() }],
        "rounded-se": [{ "rounded-se": L() }],
        "rounded-ee": [{ "rounded-ee": L() }],
        "rounded-es": [{ "rounded-es": L() }],
        "rounded-tl": [{ "rounded-tl": L() }],
        "rounded-tr": [{ "rounded-tr": L() }],
        "rounded-br": [{ "rounded-br": L() }],
        "rounded-bl": [{ "rounded-bl": L() }],
        "border-w": [{ border: R() }],
        "border-w-x": [{ "border-x": R() }],
        "border-w-y": [{ "border-y": R() }],
        "border-w-s": [{ "border-s": R() }],
        "border-w-e": [{ "border-e": R() }],
        "border-w-bs": [{ "border-bs": R() }],
        "border-w-be": [{ "border-be": R() }],
        "border-w-t": [{ "border-t": R() }],
        "border-w-r": [{ "border-r": R() }],
        "border-w-b": [{ "border-b": R() }],
        "border-w-l": [{ "border-l": R() }],
        "divide-x": [{ "divide-x": R() }],
        "divide-x-reverse": [`divide-x-reverse`],
        "divide-y": [{ "divide-y": R() }],
        "divide-y-reverse": [`divide-y-reverse`],
        "border-style": [{ border: [...ie(), `hidden`, `none`] }],
        "divide-style": [{ divide: [...ie(), `hidden`, `none`] }],
        "border-color": [{ border: P() }],
        "border-color-x": [{ "border-x": P() }],
        "border-color-y": [{ "border-y": P() }],
        "border-color-s": [{ "border-s": P() }],
        "border-color-e": [{ "border-e": P() }],
        "border-color-bs": [{ "border-bs": P() }],
        "border-color-be": [{ "border-be": P() }],
        "border-color-t": [{ "border-t": P() }],
        "border-color-r": [{ "border-r": P() }],
        "border-color-b": [{ "border-b": P() }],
        "border-color-l": [{ "border-l": P() }],
        "divide-color": [{ divide: P() }],
        "outline-style": [{ outline: [...ie(), `none`, `hidden`] }],
        "outline-offset": [{ "outline-offset": [Z, $, Q] }],
        "outline-w": [{ outline: [``, Z, bf, pf] }],
        "outline-color": [{ outline: P() }],
        shadow: [{ shadow: [``, `none`, u, Tf, yf] }],
        "shadow-color": [{ shadow: P() }],
        "inset-shadow": [{ "inset-shadow": [`none`, d, Tf, yf] }],
        "inset-shadow-color": [{ "inset-shadow": P() }],
        "ring-w": [{ ring: R() }],
        "ring-w-inset": [`ring-inset`],
        "ring-color": [{ ring: P() }],
        "ring-offset-w": [{ "ring-offset": [Z, pf] }],
        "ring-offset-color": [{ "ring-offset": P() }],
        "inset-ring-w": [{ "inset-ring": R() }],
        "inset-ring-color": [{ "inset-ring": P() }],
        "text-shadow": [{ "text-shadow": [`none`, f, Tf, yf] }],
        "text-shadow-color": [{ "text-shadow": P() }],
        opacity: [{ opacity: [Z, $, Q] }],
        "mix-blend": [{ "mix-blend": [...ae(), `plus-darker`, `plus-lighter`] }],
        "bg-blend": [{ "bg-blend": ae() }],
        "mask-clip": [
          { "mask-clip": [`border`, `padding`, `content`, `fill`, `stroke`, `view`] },
          `mask-no-clip`,
        ],
        "mask-composite": [{ mask: [`add`, `subtract`, `intersect`, `exclude`] }],
        "mask-image-linear-pos": [{ "mask-linear": [Z] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": z() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": z() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": P() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": P() }],
        "mask-image-t-from-pos": [{ "mask-t-from": z() }],
        "mask-image-t-to-pos": [{ "mask-t-to": z() }],
        "mask-image-t-from-color": [{ "mask-t-from": P() }],
        "mask-image-t-to-color": [{ "mask-t-to": P() }],
        "mask-image-r-from-pos": [{ "mask-r-from": z() }],
        "mask-image-r-to-pos": [{ "mask-r-to": z() }],
        "mask-image-r-from-color": [{ "mask-r-from": P() }],
        "mask-image-r-to-color": [{ "mask-r-to": P() }],
        "mask-image-b-from-pos": [{ "mask-b-from": z() }],
        "mask-image-b-to-pos": [{ "mask-b-to": z() }],
        "mask-image-b-from-color": [{ "mask-b-from": P() }],
        "mask-image-b-to-color": [{ "mask-b-to": P() }],
        "mask-image-l-from-pos": [{ "mask-l-from": z() }],
        "mask-image-l-to-pos": [{ "mask-l-to": z() }],
        "mask-image-l-from-color": [{ "mask-l-from": P() }],
        "mask-image-l-to-color": [{ "mask-l-to": P() }],
        "mask-image-x-from-pos": [{ "mask-x-from": z() }],
        "mask-image-x-to-pos": [{ "mask-x-to": z() }],
        "mask-image-x-from-color": [{ "mask-x-from": P() }],
        "mask-image-x-to-color": [{ "mask-x-to": P() }],
        "mask-image-y-from-pos": [{ "mask-y-from": z() }],
        "mask-image-y-to-pos": [{ "mask-y-to": z() }],
        "mask-image-y-from-color": [{ "mask-y-from": P() }],
        "mask-image-y-to-color": [{ "mask-y-to": P() }],
        "mask-image-radial": [{ "mask-radial": [$, Q] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": z() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": z() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": P() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": P() }],
        "mask-image-radial-shape": [{ "mask-radial": [`circle`, `ellipse`] }],
        "mask-image-radial-size": [
          { "mask-radial": [{ closest: [`side`, `corner`], farthest: [`side`, `corner`] }] },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": b() }],
        "mask-image-conic-pos": [{ "mask-conic": [Z] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": z() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": z() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": P() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": P() }],
        "mask-mode": [{ mask: [`alpha`, `luminance`, `match`] }],
        "mask-origin": [
          { "mask-origin": [`border`, `padding`, `content`, `fill`, `stroke`, `view`] },
        ],
        "mask-position": [{ mask: ne() }],
        "mask-repeat": [{ mask: re() }],
        "mask-size": [{ mask: F() }],
        "mask-type": [{ "mask-type": [`alpha`, `luminance`] }],
        "mask-image": [{ mask: [`none`, $, Q] }],
        filter: [{ filter: [``, `none`, $, Q] }],
        blur: [{ blur: oe() }],
        brightness: [{ brightness: [Z, $, Q] }],
        contrast: [{ contrast: [Z, $, Q] }],
        "drop-shadow": [{ "drop-shadow": [``, `none`, p, Tf, yf] }],
        "drop-shadow-color": [{ "drop-shadow": P() }],
        grayscale: [{ grayscale: [``, Z, $, Q] }],
        "hue-rotate": [{ "hue-rotate": [Z, $, Q] }],
        invert: [{ invert: [``, Z, $, Q] }],
        saturate: [{ saturate: [Z, $, Q] }],
        sepia: [{ sepia: [``, Z, $, Q] }],
        "backdrop-filter": [{ "backdrop-filter": [``, `none`, $, Q] }],
        "backdrop-blur": [{ "backdrop-blur": oe() }],
        "backdrop-brightness": [{ "backdrop-brightness": [Z, $, Q] }],
        "backdrop-contrast": [{ "backdrop-contrast": [Z, $, Q] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": [``, Z, $, Q] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [Z, $, Q] }],
        "backdrop-invert": [{ "backdrop-invert": [``, Z, $, Q] }],
        "backdrop-opacity": [{ "backdrop-opacity": [Z, $, Q] }],
        "backdrop-saturate": [{ "backdrop-saturate": [Z, $, Q] }],
        "backdrop-sepia": [{ "backdrop-sepia": [``, Z, $, Q] }],
        "border-collapse": [{ border: [`collapse`, `separate`] }],
        "border-spacing": [{ "border-spacing": w() }],
        "border-spacing-x": [{ "border-spacing-x": w() }],
        "border-spacing-y": [{ "border-spacing-y": w() }],
        "table-layout": [{ table: [`auto`, `fixed`] }],
        caption: [{ caption: [`top`, `bottom`] }],
        transition: [
          { transition: [``, `all`, `colors`, `opacity`, `shadow`, `transform`, `none`, $, Q] },
        ],
        "transition-behavior": [{ transition: [`normal`, `discrete`] }],
        duration: [{ duration: [Z, `initial`, $, Q] }],
        ease: [{ ease: [`linear`, `initial`, _, $, Q] }],
        delay: [{ delay: [Z, $, Q] }],
        animate: [{ animate: [`none`, v, $, Q] }],
        backface: [{ backface: [`hidden`, `visible`] }],
        perspective: [{ perspective: [h, $, Q] }],
        "perspective-origin": [{ "perspective-origin": x() }],
        rotate: [{ rotate: se() }],
        "rotate-x": [{ "rotate-x": se() }],
        "rotate-y": [{ "rotate-y": se() }],
        "rotate-z": [{ "rotate-z": se() }],
        scale: [{ scale: ce() }],
        "scale-x": [{ "scale-x": ce() }],
        "scale-y": [{ "scale-y": ce() }],
        "scale-z": [{ "scale-z": ce() }],
        "scale-3d": [`scale-3d`],
        skew: [{ skew: le() }],
        "skew-x": [{ "skew-x": le() }],
        "skew-y": [{ "skew-y": le() }],
        transform: [{ transform: [$, Q, ``, `none`, `gpu`, `cpu`] }],
        "transform-origin": [{ origin: x() }],
        "transform-style": [{ transform: [`3d`, `flat`] }],
        translate: [{ translate: ue() }],
        "translate-x": [{ "translate-x": ue() }],
        "translate-y": [{ "translate-y": ue() }],
        "translate-z": [{ "translate-z": ue() }],
        "translate-none": [`translate-none`],
        zoom: [{ zoom: [tf, $, Q] }],
        accent: [{ accent: P() }],
        appearance: [{ appearance: [`none`, `auto`] }],
        "caret-color": [{ caret: P() }],
        "color-scheme": [
          { scheme: [`normal`, `dark`, `light`, `light-dark`, `only-dark`, `only-light`] },
        ],
        cursor: [
          {
            cursor: [
              `auto`,
              `default`,
              `pointer`,
              `wait`,
              `text`,
              `move`,
              `help`,
              `not-allowed`,
              `none`,
              `context-menu`,
              `progress`,
              `cell`,
              `crosshair`,
              `vertical-text`,
              `alias`,
              `copy`,
              `no-drop`,
              `grab`,
              `grabbing`,
              `all-scroll`,
              `col-resize`,
              `row-resize`,
              `n-resize`,
              `e-resize`,
              `s-resize`,
              `w-resize`,
              `ne-resize`,
              `nw-resize`,
              `se-resize`,
              `sw-resize`,
              `ew-resize`,
              `ns-resize`,
              `nesw-resize`,
              `nwse-resize`,
              `zoom-in`,
              `zoom-out`,
              $,
              Q,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": [`fixed`, `content`] }],
        "pointer-events": [{ "pointer-events": [`auto`, `none`] }],
        resize: [{ resize: [`none`, ``, `y`, `x`] }],
        "scroll-behavior": [{ scroll: [`auto`, `smooth`] }],
        "scrollbar-thumb-color": [{ "scrollbar-thumb": P() }],
        "scrollbar-track-color": [{ "scrollbar-track": P() }],
        "scrollbar-gutter": [{ "scrollbar-gutter": [`auto`, `stable`, `both`] }],
        "scrollbar-w": [{ scrollbar: [`auto`, `thin`, `none`] }],
        "scroll-m": [{ "scroll-m": w() }],
        "scroll-mx": [{ "scroll-mx": w() }],
        "scroll-my": [{ "scroll-my": w() }],
        "scroll-ms": [{ "scroll-ms": w() }],
        "scroll-me": [{ "scroll-me": w() }],
        "scroll-mbs": [{ "scroll-mbs": w() }],
        "scroll-mbe": [{ "scroll-mbe": w() }],
        "scroll-mt": [{ "scroll-mt": w() }],
        "scroll-mr": [{ "scroll-mr": w() }],
        "scroll-mb": [{ "scroll-mb": w() }],
        "scroll-ml": [{ "scroll-ml": w() }],
        "scroll-p": [{ "scroll-p": w() }],
        "scroll-px": [{ "scroll-px": w() }],
        "scroll-py": [{ "scroll-py": w() }],
        "scroll-ps": [{ "scroll-ps": w() }],
        "scroll-pe": [{ "scroll-pe": w() }],
        "scroll-pbs": [{ "scroll-pbs": w() }],
        "scroll-pbe": [{ "scroll-pbe": w() }],
        "scroll-pt": [{ "scroll-pt": w() }],
        "scroll-pr": [{ "scroll-pr": w() }],
        "scroll-pb": [{ "scroll-pb": w() }],
        "scroll-pl": [{ "scroll-pl": w() }],
        "snap-align": [{ snap: [`start`, `end`, `center`, `align-none`] }],
        "snap-stop": [{ snap: [`normal`, `always`] }],
        "snap-type": [{ snap: [`none`, `x`, `y`, `both`] }],
        "snap-strictness": [{ snap: [`mandatory`, `proximity`] }],
        touch: [{ touch: [`auto`, `none`, `manipulation`] }],
        "touch-x": [{ "touch-pan": [`x`, `left`, `right`] }],
        "touch-y": [{ "touch-pan": [`y`, `up`, `down`] }],
        "touch-pz": [`touch-pinch-zoom`],
        select: [{ select: [`none`, `text`, `all`, `auto`] }],
        "will-change": [{ "will-change": [`auto`, `scroll`, `contents`, `transform`, $, Q] }],
        fill: [{ fill: [`none`, ...P()] }],
        "stroke-w": [{ stroke: [Z, bf, pf, mf] }],
        stroke: [{ stroke: [`none`, ...P()] }],
        "forced-color-adjust": [{ "forced-color-adjust": [`auto`, `none`] }],
      },
      conflictingClassGroups: {
        "container-named": [`container-type`],
        overflow: [`overflow-x`, `overflow-y`],
        overscroll: [`overscroll-x`, `overscroll-y`],
        inset: [
          `inset-x`,
          `inset-y`,
          `inset-bs`,
          `inset-be`,
          `start`,
          `end`,
          `top`,
          `right`,
          `bottom`,
          `left`,
        ],
        "inset-x": [`right`, `left`],
        "inset-y": [`top`, `bottom`],
        flex: [`basis`, `grow`, `shrink`],
        gap: [`gap-x`, `gap-y`],
        p: [`px`, `py`, `ps`, `pe`, `pbs`, `pbe`, `pt`, `pr`, `pb`, `pl`],
        px: [`pr`, `pl`],
        py: [`pt`, `pb`],
        m: [`mx`, `my`, `ms`, `me`, `mbs`, `mbe`, `mt`, `mr`, `mb`, `ml`],
        mx: [`mr`, `ml`],
        my: [`mt`, `mb`],
        size: [`w`, `h`],
        "font-size": [`leading`],
        "fvn-normal": [
          `fvn-ordinal`,
          `fvn-slashed-zero`,
          `fvn-figure`,
          `fvn-spacing`,
          `fvn-fraction`,
        ],
        "fvn-ordinal": [`fvn-normal`],
        "fvn-slashed-zero": [`fvn-normal`],
        "fvn-figure": [`fvn-normal`],
        "fvn-spacing": [`fvn-normal`],
        "fvn-fraction": [`fvn-normal`],
        "line-clamp": [`display`, `overflow`],
        rounded: [
          `rounded-s`,
          `rounded-e`,
          `rounded-t`,
          `rounded-r`,
          `rounded-b`,
          `rounded-l`,
          `rounded-ss`,
          `rounded-se`,
          `rounded-ee`,
          `rounded-es`,
          `rounded-tl`,
          `rounded-tr`,
          `rounded-br`,
          `rounded-bl`,
        ],
        "rounded-s": [`rounded-ss`, `rounded-es`],
        "rounded-e": [`rounded-se`, `rounded-ee`],
        "rounded-t": [`rounded-tl`, `rounded-tr`],
        "rounded-r": [`rounded-tr`, `rounded-br`],
        "rounded-b": [`rounded-br`, `rounded-bl`],
        "rounded-l": [`rounded-tl`, `rounded-bl`],
        "border-spacing": [`border-spacing-x`, `border-spacing-y`],
        "border-w": [
          `border-w-x`,
          `border-w-y`,
          `border-w-s`,
          `border-w-e`,
          `border-w-bs`,
          `border-w-be`,
          `border-w-t`,
          `border-w-r`,
          `border-w-b`,
          `border-w-l`,
        ],
        "border-w-x": [`border-w-r`, `border-w-l`],
        "border-w-y": [`border-w-t`, `border-w-b`],
        "border-color": [
          `border-color-x`,
          `border-color-y`,
          `border-color-s`,
          `border-color-e`,
          `border-color-bs`,
          `border-color-be`,
          `border-color-t`,
          `border-color-r`,
          `border-color-b`,
          `border-color-l`,
        ],
        "border-color-x": [`border-color-r`, `border-color-l`],
        "border-color-y": [`border-color-t`, `border-color-b`],
        translate: [`translate-x`, `translate-y`, `translate-none`],
        "translate-none": [`translate`, `translate-x`, `translate-y`, `translate-z`],
        "scroll-m": [
          `scroll-mx`,
          `scroll-my`,
          `scroll-ms`,
          `scroll-me`,
          `scroll-mbs`,
          `scroll-mbe`,
          `scroll-mt`,
          `scroll-mr`,
          `scroll-mb`,
          `scroll-ml`,
        ],
        "scroll-mx": [`scroll-mr`, `scroll-ml`],
        "scroll-my": [`scroll-mt`, `scroll-mb`],
        "scroll-p": [
          `scroll-px`,
          `scroll-py`,
          `scroll-ps`,
          `scroll-pe`,
          `scroll-pbs`,
          `scroll-pbe`,
          `scroll-pt`,
          `scroll-pr`,
          `scroll-pb`,
          `scroll-pl`,
        ],
        "scroll-px": [`scroll-pr`, `scroll-pl`],
        "scroll-py": [`scroll-pt`, `scroll-pb`],
        touch: [`touch-x`, `touch-y`, `touch-pz`],
        "touch-x": [`touch`],
        "touch-y": [`touch`],
        "touch-pz": [`touch`],
      },
      conflictingClassGroupModifiers: { "font-size": [`leading`] },
      postfixLookupClassGroups: [`container-type`],
      orderSensitiveModifiers: [
        `*`,
        `**`,
        `after`,
        `backdrop`,
        `before`,
        `details-content`,
        `file`,
        `first-letter`,
        `first-line`,
        `marker`,
        `placeholder`,
        `selection`,
      ],
    };
  });
function Rf(...e) {
  return Lf(fd(e));
}
var zf = [
  {
    id: `midnight`,
    name: `Midnight Velvet`,
    background: `oklch(0.14 0.005 20)`,
    surface: `oklch(0.19 0.007 20)`,
    surfaceElev: `oklch(0.235 0.008 20)`,
    accent: `oklch(0.68 0.22 12)`,
    accentPink: `oklch(0.72 0.22 6)`,
    isLight: !1,
  },
  {
    id: `minimal-light`,
    name: `Minimalist Ivory`,
    background: `oklch(0.97 0.005 60)`,
    surface: `oklch(0.94 0.005 60)`,
    surfaceElev: `oklch(0.90 0.005 60)`,
    accent: `oklch(0.18 0.005 60)`,
    accentPink: `oklch(0.35 0.005 60)`,
    isLight: !0,
  },
  {
    id: `minimal-dark`,
    name: `Minimalist Charcoal`,
    background: `oklch(0.18 0.002 60)`,
    surface: `oklch(0.23 0.002 60)`,
    surfaceElev: `oklch(0.27 0.002 60)`,
    accent: `oklch(0.92 0.002 60)`,
    accentPink: `oklch(0.75 0.002 60)`,
    isLight: !1,
  },
  {
    id: `mono-stark`,
    name: `Stark Mono`,
    background: `oklch(0.02 0 0)`,
    surface: `oklch(0.08 0 0)`,
    surfaceElev: `oklch(0.14 0 0)`,
    accent: `oklch(1 0 0)`,
    accentPink: `oklch(0.85 0 0)`,
    isLight: !1,
  },
  {
    id: `sandstone`,
    name: `Warm Sandstone`,
    background: `oklch(0.94 0.012 80)`,
    surface: `oklch(0.89 0.015 80)`,
    surfaceElev: `oklch(0.84 0.018 80)`,
    accent: `oklch(0.25 0.02 80)`,
    accentPink: `oklch(0.45 0.03 80)`,
    isLight: !0,
  },
  {
    id: `oled`,
    name: `OLED Pitch Black`,
    background: `oklch(0 0 0)`,
    surface: `oklch(0.12 0 0)`,
    surfaceElev: `oklch(0.16 0 0)`,
    accent: `oklch(0.7 0.25 340)`,
    accentPink: `oklch(0.75 0.22 355)`,
    isLight: !1,
  },
];
function Bf(e) {
  let t = zf.find((t) => t.id === e) ?? zf[0],
    n = document.documentElement;
  (t.isLight ? n.classList.remove(`dark`) : n.classList.add(`dark`),
    n.style.setProperty(`--background`, t.background),
    n.style.setProperty(`--surface`, t.surface),
    n.style.setProperty(`--surface-elev`, t.surfaceElev),
    n.style.setProperty(`--card`, t.surface),
    n.style.setProperty(`--popover`, t.surface),
    n.style.setProperty(`--accent`, t.accent),
    n.style.setProperty(`--accent-pink`, t.accentPink),
    t.isLight
      ? (n.style.setProperty(`--foreground`, `oklch(0.18 0.005 60)`),
        n.style.setProperty(`--border`, `oklch(0 0 0 / 8%)`),
        n.style.setProperty(`--input`, `oklch(0 0 0 / 6%)`),
        n.style.setProperty(`--primary`, `oklch(0.18 0.005 60)`),
        n.style.setProperty(`--primary-foreground`, `oklch(0.97 0.005 60)`))
      : (n.style.setProperty(`--foreground`, `oklch(0.985 0.002 20)`),
        n.style.setProperty(`--border`, `oklch(1 0 0 / 8%)`),
        n.style.setProperty(`--input`, `oklch(1 0 0 / 12%)`),
        n.style.setProperty(`--primary`, `oklch(0.985 0.002 20)`),
        n.style.setProperty(`--primary-foreground`, `oklch(0.14 0.005 20)`)),
    n.style.setProperty(`--ring`, t.accent.replace(`)`, ` / 60%)`)));
}
export {
  s as $,
  Di as A,
  V as B,
  Oo as C,
  J as D,
  ya as E,
  cn as F,
  ee as G,
  ue as H,
  sn as I,
  S as J,
  O as K,
  en as L,
  q as M,
  Or as N,
  pa as O,
  rr as P,
  p as Q,
  Wt as R,
  ws as S,
  Fa as T,
  F as U,
  be as V,
  ne as W,
  _ as X,
  b as Y,
  h as Z,
  Mu as _,
  ud as a,
  xu as b,
  Nu as c,
  Pu as d,
  u as et,
  Lu as f,
  Ru as g,
  Iu as h,
  ld as i,
  ri as j,
  Zi as k,
  Fu as l,
  Vu as m,
  Rf as n,
  id as o,
  zu as p,
  T as q,
  zf as r,
  Ju as s,
  Bf as t,
  Bu as u,
  Au as v,
  vo as w,
  Tc as x,
  ku as y,
  G as z,
};
