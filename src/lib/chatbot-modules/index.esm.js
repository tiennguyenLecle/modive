import * as React from 'react';
import React__default, {
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo as useMemo$1,
  useRef,
  useState,
  version,
} from 'react';
import ReactDOM from 'react-dom';

function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default')
    ? x['default']
    : x;
}

var jsxRuntime = { exports: {} };

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production_min;

function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min)
    return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f = React__default,
    k = Symbol.for('react.element'),
    l = Symbol.for('react.fragment'),
    m = Object.prototype.hasOwnProperty,
    n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b,
      d = {},
      e = null,
      h = null;
    void 0 !== g && (e = '' + g);
    void 0 !== a.key && (e = '' + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps)
      for (b in ((a = c.defaultProps), a)) void 0 === d[b] && (d[b] = a[b]);
    return {
      $$typeof: k,
      type: c,
      key: e,
      ref: h,
      props: d,
      _owner: n.current,
    };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development)
    return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;

  if (process.env.NODE_ENV !== 'production') {
    (function () {
      var React = React__default;

      // ATTENTION
      // When adding new symbols to this file,
      // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
      // The Symbol used to tag the ReactElement-like types.
      var REACT_ELEMENT_TYPE = Symbol.for('react.element');
      var REACT_PORTAL_TYPE = Symbol.for('react.portal');
      var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
      var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
      var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
      var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
      var REACT_CONTEXT_TYPE = Symbol.for('react.context');
      var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
      var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
      var REACT_MEMO_TYPE = Symbol.for('react.memo');
      var REACT_LAZY_TYPE = Symbol.for('react.lazy');
      var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = '@@iterator';
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== 'object') {
          return null;
        }

        var maybeIterator =
          (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
          maybeIterable[FAUX_ITERATOR_SYMBOL];

        if (typeof maybeIterator === 'function') {
          return maybeIterator;
        }

        return null;
      }

      var ReactSharedInternals =
        React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

      function error(format) {
        {
          {
            for (
              var _len2 = arguments.length,
                args = new Array(_len2 > 1 ? _len2 - 1 : 0),
                _key2 = 1;
              _key2 < _len2;
              _key2++
            ) {
              args[_key2 - 1] = arguments[_key2];
            }

            printWarning('error', format, args);
          }
        }
      }

      function printWarning(level, format, args) {
        // When changing this logic, you might want to also
        // update consoleWithStackDev.www.js as well.
        {
          var ReactDebugCurrentFrame =
            ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame.getStackAddendum();

          if (stack !== '') {
            format += '%s';
            args = args.concat([stack]);
          } // eslint-disable-next-line react-internal/safe-string-coercion

          var argsWithFormat = args.map(function (item) {
            return String(item);
          }); // Careful: RN currently depends on this prefix

          argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
          // breaks IE9: https://github.com/facebook/react/issues/13610
          // eslint-disable-next-line react-internal/no-production-logging

          Function.prototype.apply.call(
            console[level],
            console,
            argsWithFormat
          );
        }
      }

      // -----------------------------------------------------------------------------

      var enableScopeAPI = false; // Experimental Create Event Handle API.
      var enableCacheElement = false;
      var enableTransitionTracing = false; // No known bugs, but needs performance testing

      var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
      // stuff. Intended to enable React core members to more easily debug scheduling
      // issues in DEV builds.

      var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

      var REACT_MODULE_REFERENCE;

      {
        REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
      }

      function isValidElementType(type) {
        if (typeof type === 'string' || typeof type === 'function') {
          return true;
        } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).

        if (
          type === REACT_FRAGMENT_TYPE ||
          type === REACT_PROFILER_TYPE ||
          enableDebugTracing ||
          type === REACT_STRICT_MODE_TYPE ||
          type === REACT_SUSPENSE_TYPE ||
          type === REACT_SUSPENSE_LIST_TYPE ||
          enableLegacyHidden ||
          type === REACT_OFFSCREEN_TYPE ||
          enableScopeAPI ||
          enableCacheElement ||
          enableTransitionTracing
        ) {
          return true;
        }

        if (typeof type === 'object' && type !== null) {
          if (
            type.$$typeof === REACT_LAZY_TYPE ||
            type.$$typeof === REACT_MEMO_TYPE ||
            type.$$typeof === REACT_PROVIDER_TYPE ||
            type.$$typeof === REACT_CONTEXT_TYPE ||
            type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE ||
            type.getModuleId !== undefined
          ) {
            return true;
          }
        }

        return false;
      }

      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;

        if (displayName) {
          return displayName;
        }

        var functionName = innerType.displayName || innerType.name || '';
        return functionName !== ''
          ? wrapperName + '(' + functionName + ')'
          : wrapperName;
      } // Keep in sync with react-reconciler/getComponentNameFromFiber

      function getContextName(type) {
        return type.displayName || 'Context';
      } // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.

      function getComponentNameFromType(type) {
        if (type == null) {
          // Host root, text node or just invalid type.
          return null;
        }

        {
          if (typeof type.tag === 'number') {
            error(
              'Received an unexpected object in getComponentNameFromType(). ' +
                'This is likely a bug in React. Please file an issue.'
            );
          }
        }

        if (typeof type === 'function') {
          return type.displayName || type.name || null;
        }

        if (typeof type === 'string') {
          return type;
        }

        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return 'Fragment';

          case REACT_PORTAL_TYPE:
            return 'Portal';

          case REACT_PROFILER_TYPE:
            return 'Profiler';

          case REACT_STRICT_MODE_TYPE:
            return 'StrictMode';

          case REACT_SUSPENSE_TYPE:
            return 'Suspense';

          case REACT_SUSPENSE_LIST_TYPE:
            return 'SuspenseList';
        }

        if (typeof type === 'object') {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + '.Consumer';

            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + '.Provider';

            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, 'ForwardRef');

            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;

              if (outerName !== null) {
                return outerName;
              }

              return getComponentNameFromType(type.type) || 'Memo';

            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;

              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }

            // eslint-disable-next-line no-fallthrough
          }
        }

        return null;
      }

      var assign = Object.assign;

      // Helpers to patch console.logs to avoid logging during side-effect free
      // replaying on render function. This currently only patches the object
      // lazily which won't cover if the log function was extracted eagerly.
      // We could also eagerly patch the method.
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;

      function disabledLog() {}

      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            /* eslint-disable react-internal/no-production-logging */
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true,
            }; // $FlowFixMe Flow thinks console is immutable.

            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props,
            });
            /* eslint-enable react-internal/no-production-logging */
          }

          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;

          if (disabledDepth === 0) {
            /* eslint-disable react-internal/no-production-logging */
            var props = {
              configurable: true,
              enumerable: true,
              writable: true,
            }; // $FlowFixMe Flow thinks console is immutable.

            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog,
              }),
              info: assign({}, props, {
                value: prevInfo,
              }),
              warn: assign({}, props, {
                value: prevWarn,
              }),
              error: assign({}, props, {
                value: prevError,
              }),
              group: assign({}, props, {
                value: prevGroup,
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed,
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd,
              }),
            });
            /* eslint-enable react-internal/no-production-logging */
          }

          if (disabledDepth < 0) {
            error(
              'disabledDepth fell below zero. ' +
                'This is a bug in React. Please file an issue.'
            );
          }
        }
      }

      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === undefined) {
            // Extract the VM specific prefix used by each line.
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = (match && match[1]) || '';
            }
          } // We use the prefix to ensure our stacks line up with native stack frames.

          return '\n' + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;

      {
        var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }

      function describeNativeComponentFrame(fn, construct) {
        // If something asked for a stack inside a fake render, it should get ignored.
        if (!fn || reentry) {
          return '';
        }

        {
          var frame = componentFrameCache.get(fn);

          if (frame !== undefined) {
            return frame;
          }
        }

        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

        Error.prepareStackTrace = undefined;
        var previousDispatcher;

        {
          previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
          // for warnings.

          ReactCurrentDispatcher.current = null;
          disableLogs();
        }

        try {
          // This should throw.
          if (construct) {
            // Something should be setting the props in the constructor.
            var Fake = function () {
              throw Error();
            }; // $FlowFixMe

            Object.defineProperty(Fake.prototype, 'props', {
              set: function () {
                // We use a throwing setter instead of frozen or non-writable props
                // because that won't throw in a non-strict mode function.
                throw Error();
              },
            });

            if (typeof Reflect === 'object' && Reflect.construct) {
              // We construct a different control for this case to include any extra
              // frames added by the construct call.
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }

              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }

              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }

            fn();
          }
        } catch (sample) {
          // This is inlined manually because closure doesn't do it for us.
          if (sample && control && typeof sample.stack === 'string') {
            // This extracts the first frame from the sample that isn't also in the control.
            // Skipping one frame that we assume is the frame that calls the two.
            var sampleLines = sample.stack.split('\n');
            var controlLines = control.stack.split('\n');
            var s = sampleLines.length - 1;
            var c = controlLines.length - 1;

            while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
              // We expect at least one stack frame to be shared.
              // Typically this will be the root most one. However, stack frames may be
              // cut off due to maximum stack limits. In this case, one maybe cut off
              // earlier than the other. We assume that the sample is longer or the same
              // and there for cut off earlier. So we should find the root most frame in
              // the sample somewhere in the control.
              c--;
            }

            for (; s >= 1 && c >= 0; s--, c--) {
              // Next we find the first one that isn't the same which should be the
              // frame that called our sample function and the control.
              if (sampleLines[s] !== controlLines[c]) {
                // In V8, the first line is describing the message but other VMs don't.
                // If we're about to return the first line, and the control is also on the same
                // line, that's a pretty good indicator that our sample threw at same line as
                // the control. I.e. before we entered the sample frame. So we ignore this result.
                // This can happen if you passed a class to function component, or non-function.
                if (s !== 1 || c !== 1) {
                  do {
                    s--;
                    c--; // We may still have similar intermediate frames from the construct call.
                    // The next one that isn't the same should be our match though.

                    if (c < 0 || sampleLines[s] !== controlLines[c]) {
                      // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                      var _frame =
                        '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                      // but we have a user-provided "displayName"
                      // splice it in to make the stack more readable.

                      if (fn.displayName && _frame.includes('<anonymous>')) {
                        _frame = _frame.replace('<anonymous>', fn.displayName);
                      }

                      {
                        if (typeof fn === 'function') {
                          componentFrameCache.set(fn, _frame);
                        }
                      } // Return the line we found.

                      return _frame;
                    }
                  } while (s >= 1 && c >= 0);
                }

                break;
              }
            }
          }
        } finally {
          reentry = false;

          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }

          Error.prepareStackTrace = previousPrepareStackTrace;
        } // Fallback to just using the name if we couldn't make it throw.

        var name = fn ? fn.displayName || fn.name : '';
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

        {
          if (typeof fn === 'function') {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }

        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }

      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }

      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null) {
          return '';
        }

        if (typeof type === 'function') {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }

        if (typeof type === 'string') {
          return describeBuiltInComponentFrame(type);
        }

        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame('Suspense');

          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame('SuspenseList');
        }

        if (typeof type === 'object') {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);

            case REACT_MEMO_TYPE:
              // Memo may contain any component type so we recursively resolve it.
              return describeUnknownElementTypeFrameInDEV(
                type.type,
                source,
                ownerFn
              );

            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;

              try {
                // Lazy may contain any component type so we recursively resolve it.
                return describeUnknownElementTypeFrameInDEV(
                  init(payload),
                  source,
                  ownerFn
                );
              } catch (x) {}
            }
          }
        }

        return '';
      }

      var hasOwnProperty = Object.prototype.hasOwnProperty;

      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(
              element.type,
              element._source,
              owner ? owner.type : null
            );
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }

      function checkPropTypes(
        typeSpecs,
        values,
        location,
        componentName,
        element
      ) {
        {
          // $FlowFixMe This is okay but Flow doesn't know it.
          var has = Function.call.bind(hasOwnProperty);

          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
              // fail the render phase where it didn't fail before. So we log it.
              // After these have been cleaned up, we'll let them throw.

              try {
                // This is intentionally an invariant that gets caught. It's the same
                // behavior as without this statement except with a better message.
                if (typeof typeSpecs[typeSpecName] !== 'function') {
                  // eslint-disable-next-line react-internal/prod-error-codes
                  var err = Error(
                    (componentName || 'React class') +
                      ': ' +
                      location +
                      ' type `' +
                      typeSpecName +
                      '` is invalid; ' +
                      'it must be a function, usually from the `prop-types` package, but received `' +
                      typeof typeSpecs[typeSpecName] +
                      '`.' +
                      'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
                  );
                  err.name = 'Invariant Violation';
                  throw err;
                }

                error$1 = typeSpecs[typeSpecName](
                  values,
                  typeSpecName,
                  componentName,
                  location,
                  null,
                  'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED'
                );
              } catch (ex) {
                error$1 = ex;
              }

              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);

                error(
                  '%s: type specification of %s' +
                    ' `%s` is invalid; the type checker ' +
                    'function must return `null` or an `Error` but returned a %s. ' +
                    'You may have forgotten to pass an argument to the type checker ' +
                    'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
                    'shape all require an argument).',
                  componentName || 'React class',
                  location,
                  typeSpecName,
                  typeof error$1
                );

                setCurrentlyValidatingElement(null);
              }

              if (
                error$1 instanceof Error &&
                !(error$1.message in loggedTypeFailures)
              ) {
                // Only monitor this failure once because there tends to be a lot of the
                // same error.
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);

                error('Failed %s type: %s', location, error$1.message);

                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }

      var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

      function isArray(a) {
        return isArrayImpl(a);
      }

      /*
       * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
       * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
       *
       * The functions in this module will throw an easier-to-understand,
       * easier-to-debug exception with a clear errors message message explaining the
       * problem. (Instead of a confusing exception thrown inside the implementation
       * of the `value` object).
       */
      // $FlowFixMe only called in DEV, so void return is not possible.
      function typeName(value) {
        {
          // toStringTag is needed for namespaced types like Temporal.Instant
          var hasToStringTag =
            typeof Symbol === 'function' && Symbol.toStringTag;
          var type =
            (hasToStringTag && value[Symbol.toStringTag]) ||
            value.constructor.name ||
            'Object';
          return type;
        }
      } // $FlowFixMe only called in DEV, so void return is not possible.

      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e) {
            return true;
          }
        }
      }

      function testStringCoercion(value) {
        // If you ended up here by following an exception call stack, here's what's
        // happened: you supplied an object or symbol value to React (as a prop, key,
        // DOM attribute, CSS property, string ref, etc.) and when React tried to
        // coerce it to a string using `'' + value`, an exception was thrown.
        //
        // The most common types that will cause this exception are `Symbol` instances
        // and Temporal objects like `Temporal.Instant`. But any object that has a
        // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
        // exception. (Library authors do this to prevent users from using built-in
        // numeric operators like `+` or comparison operators like `>=` because custom
        // methods are needed to perform accurate arithmetic or comparison.)
        //
        // To fix the problem, coerce this object or symbol value to a string before
        // passing it to React. The most reliable way is usually `String(value)`.
        //
        // To find which value is throwing, check the browser or debugger console.
        // Before this exception was thrown, there should be `console.error` output
        // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
        // problem and how that type was used: key, atrribute, input value prop, etc.
        // In most cases, this console output also shows the component and its
        // ancestor components where the exception happened.
        //
        // eslint-disable-next-line react-internal/safe-string-coercion
        return '' + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error(
              'The provided key is an unsupported type %s.' +
                ' This value must be coerced to a string before before using it here.',
              typeName(value)
            );

            return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
          }
        }
      }

      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true,
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;

      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, 'ref')) {
            var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }

        return config.ref !== undefined;
      }

      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, 'key')) {
            var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }

        return config.key !== undefined;
      }

      function warnIfStringRefCannotBeAutoConverted(config, self) {
        {
          if (
            typeof config.ref === 'string' &&
            ReactCurrentOwner.current &&
            self
          );
        }
      }

      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function () {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;

              error(
                '%s: `key` is not a prop. Trying to access it will result ' +
                  'in `undefined` being returned. If you need to access the same ' +
                  'value within the child component, you should pass it as a different ' +
                  'prop. (https://reactjs.org/link/special-props)',
                displayName
              );
            }
          };

          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, 'key', {
            get: warnAboutAccessingKey,
            configurable: true,
          });
        }
      }

      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function () {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;

              error(
                '%s: `ref` is not a prop. Trying to access it will result ' +
                  'in `undefined` being returned. If you need to access the same ' +
                  'value within the child component, you should pass it as a different ' +
                  'prop. (https://reactjs.org/link/special-props)',
                displayName
              );
            }
          };

          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, 'ref', {
            get: warnAboutAccessingRef,
            configurable: true,
          });
        }
      }
      /**
       * Factory method to create a new React element. This no longer adheres to
       * the class pattern, so do not use new to call it. Also, instanceof check
       * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
       * if something is a React Element.
       *
       * @param {*} type
       * @param {*} props
       * @param {*} key
       * @param {string|object} ref
       * @param {*} owner
       * @param {*} self A *temporary* helper to detect places where `this` is
       * different from the `owner` when React.createElement is called, so that we
       * can warn. We want to get rid of owner and replace string `ref`s with arrow
       * functions, and as long as `this` and owner are the same, there will be no
       * change in behavior.
       * @param {*} source An annotation object (added by a transpiler or otherwise)
       * indicating filename, line number, and/or other information.
       * @internal
       */

      var ReactElement = function (type, key, ref, self, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type: type,
          key: key,
          ref: ref,
          props: props,
          // Record the component responsible for creating this element.
          _owner: owner,
        };

        {
          // The validation flag is currently mutative. We put it on
          // an external backing store so that we can freeze the whole object.
          // This can be replaced with a WeakMap once they are implemented in
          // commonly used development environments.
          element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
          // the validation flag non-enumerable (where possible, which should
          // include every environment we run tests in), so the test framework
          // ignores it.

          Object.defineProperty(element._store, 'validated', {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false,
          }); // self and source are DEV only properties.

          Object.defineProperty(element, '_self', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self,
          }); // Two elements created in two different places should be considered
          // equal for testing purposes and therefore we hide it from enumeration.

          Object.defineProperty(element, '_source', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source,
          });

          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }

        return element;
      };
      /**
       * https://github.com/reactjs/rfcs/pull/107
       * @param {*} type
       * @param {object} props
       * @param {string} key
       */

      function jsxDEV(type, config, maybeKey, source, self) {
        {
          var propName; // Reserved names are extracted

          var props = {};
          var key = null;
          var ref = null; // Currently, key can be spread in as a prop. This causes a potential
          // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
          // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
          // but as an intermediary step, we will use jsxDEV for everything except
          // <div {...props} key="Hi" />, because we aren't currently able to tell if
          // key is explicitly declared to be undefined or not.

          if (maybeKey !== undefined) {
            {
              checkKeyStringCoercion(maybeKey);
            }

            key = '' + maybeKey;
          }

          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }

            key = '' + config.key;
          }

          if (hasValidRef(config)) {
            ref = config.ref;
            warnIfStringRefCannotBeAutoConverted(config, self);
          } // Remaining properties are added to a new props object

          for (propName in config) {
            if (
              hasOwnProperty.call(config, propName) &&
              !RESERVED_PROPS.hasOwnProperty(propName)
            ) {
              props[propName] = config[propName];
            }
          } // Resolve default props

          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;

            for (propName in defaultProps) {
              if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
              }
            }
          }

          if (key || ref) {
            var displayName =
              typeof type === 'function'
                ? type.displayName || type.name || 'Unknown'
                : type;

            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }

            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }

          return ReactElement(
            type,
            key,
            ref,
            self,
            source,
            ReactCurrentOwner.current,
            props
          );
        }
      }

      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame$1 =
        ReactSharedInternals.ReactDebugCurrentFrame;

      function setCurrentlyValidatingElement$1(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(
              element.type,
              element._source,
              owner ? owner.type : null
            );
            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
          }
        }
      }

      var propTypesMisspellWarningShown;

      {
        propTypesMisspellWarningShown = false;
      }
      /**
       * Verifies the object is a ReactElement.
       * See https://reactjs.org/docs/react-api.html#isvalidelement
       * @param {?object} object
       * @return {boolean} True if `object` is a ReactElement.
       * @final
       */

      function isValidElement(object) {
        {
          return (
            typeof object === 'object' &&
            object !== null &&
            object.$$typeof === REACT_ELEMENT_TYPE
          );
        }
      }

      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(
              ReactCurrentOwner$1.current.type
            );

            if (name) {
              return '\n\nCheck the render method of `' + name + '`.';
            }
          }

          return '';
        }
      }

      function getSourceInfoErrorAddendum(source) {
        {
          return '';
        }
      }
      /**
       * Warn if there's no key explicitly set on dynamic arrays of children or
       * object keys are not valid. This allows us to keep track of children between
       * updates.
       */

      var ownerHasKeyUseWarning = {};

      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();

          if (!info) {
            var parentName =
              typeof parentType === 'string'
                ? parentType
                : parentType.displayName || parentType.name;

            if (parentName) {
              info =
                '\n\nCheck the top-level render call using <' +
                parentName +
                '>.';
            }
          }

          return info;
        }
      }
      /**
       * Warn if the element doesn't have an explicit key assigned to it.
       * This element is in an array. The array could grow and shrink or be
       * reordered. All children that haven't already been validated are required to
       * have a "key" property assigned to it. Error statuses are cached so a warning
       * will only be shown once.
       *
       * @internal
       * @param {ReactElement} element Element that requires a key.
       * @param {*} parentType element's parent's type.
       */

      function validateExplicitKey(element, parentType) {
        {
          if (
            !element._store ||
            element._store.validated ||
            element.key != null
          ) {
            return;
          }

          element._store.validated = true;
          var currentComponentErrorInfo =
            getCurrentComponentErrorInfo(parentType);

          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }

          ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
          // property, it may be the creator of the child that's responsible for
          // assigning it a key.

          var childOwner = '';

          if (
            element &&
            element._owner &&
            element._owner !== ReactCurrentOwner$1.current
          ) {
            // Give the component that originally created this child.
            childOwner =
              ' It was passed a child from ' +
              getComponentNameFromType(element._owner.type) +
              '.';
          }

          setCurrentlyValidatingElement$1(element);

          error(
            'Each child in a list should have a unique "key" prop.' +
              '%s%s See https://reactjs.org/link/warning-keys for more information.',
            currentComponentErrorInfo,
            childOwner
          );

          setCurrentlyValidatingElement$1(null);
        }
      }
      /**
       * Ensure that every element either is passed in a static location, in an
       * array with an explicit keys property defined, or in an object literal
       * with valid key property.
       *
       * @internal
       * @param {ReactNode} node Statically passed child of any type.
       * @param {*} parentType node's parent's type.
       */

      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== 'object') {
            return;
          }

          if (isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];

              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            // This element was passed in a valid location.
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);

            if (typeof iteratorFn === 'function') {
              // Entry iterators used to provide implicit keys,
              // but now we print a separate warning for them later.
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;

                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      /**
       * Given an element, validate that its props follow the propTypes definition,
       * provided by the type.
       *
       * @param {ReactElement} element
       */

      function validatePropTypes(element) {
        {
          var type = element.type;

          if (type === null || type === undefined || typeof type === 'string') {
            return;
          }

          var propTypes;

          if (typeof type === 'function') {
            propTypes = type.propTypes;
          } else if (
            typeof type === 'object' &&
            (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
              // Inner props are checked in the reconciler.
              type.$$typeof === REACT_MEMO_TYPE)
          ) {
            propTypes = type.propTypes;
          } else {
            return;
          }

          if (propTypes) {
            // Intentionally inside to avoid triggering lazy initializers:
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, 'prop', name, element);
          } else if (
            type.PropTypes !== undefined &&
            !propTypesMisspellWarningShown
          ) {
            propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

            var _name = getComponentNameFromType(type);

            error(
              'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?',
              _name || 'Unknown'
            );
          }

          if (
            typeof type.getDefaultProps === 'function' &&
            !type.getDefaultProps.isReactClassApproved
          ) {
            error(
              'getDefaultProps is only used on classic React.createClass ' +
                'definitions. Use a static property named `defaultProps` instead.'
            );
          }
        }
      }
      /**
       * Given a fragment, validate that it can only be provided with fragment props
       * @param {ReactElement} fragment
       */

      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);

          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];

            if (key !== 'children' && key !== 'key') {
              setCurrentlyValidatingElement$1(fragment);

              error(
                'Invalid prop `%s` supplied to `React.Fragment`. ' +
                  'React.Fragment can only have `key` and `children` props.',
                key
              );

              setCurrentlyValidatingElement$1(null);
              break;
            }
          }

          if (fragment.ref !== null) {
            setCurrentlyValidatingElement$1(fragment);

            error('Invalid attribute `ref` supplied to `React.Fragment`.');

            setCurrentlyValidatingElement$1(null);
          }
        }
      }

      function jsxWithValidation(
        type,
        props,
        key,
        isStaticChildren,
        source,
        self
      ) {
        {
          var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
          // succeed and there will likely be errors in render.

          if (!validType) {
            var info = '';

            if (
              type === undefined ||
              (typeof type === 'object' &&
                type !== null &&
                Object.keys(type).length === 0)
            ) {
              info +=
                ' You likely forgot to export your component from the file ' +
                "it's defined in, or you might have mixed up default and named imports.";
            }

            var sourceInfo = getSourceInfoErrorAddendum();

            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }

            var typeString;

            if (type === null) {
              typeString = 'null';
            } else if (isArray(type)) {
              typeString = 'array';
            } else if (
              type !== undefined &&
              type.$$typeof === REACT_ELEMENT_TYPE
            ) {
              typeString =
                '<' +
                (getComponentNameFromType(type.type) || 'Unknown') +
                ' />';
              info =
                ' Did you accidentally export a JSX literal instead of a component?';
            } else {
              typeString = typeof type;
            }

            error(
              'React.jsx: type is invalid -- expected a string (for ' +
                'built-in components) or a class/function (for composite ' +
                'components) but got: %s.%s',
              typeString,
              info
            );
          }

          var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
          // TODO: Drop this when these are no longer allowed as the type argument.

          if (element == null) {
            return element;
          } // Skip key warning if the type isn't valid since our key validation logic
          // doesn't expect a non-string/function type and can throw confusing errors.
          // We don't want exception behavior to differ between dev and prod.
          // (Rendering will throw with a helpful message and as soon as the type is
          // fixed, the key warnings will appear.)

          if (validType) {
            var children = props.children;

            if (children !== undefined) {
              if (isStaticChildren) {
                if (isArray(children)) {
                  for (var i = 0; i < children.length; i++) {
                    validateChildKeys(children[i], type);
                  }

                  if (Object.freeze) {
                    Object.freeze(children);
                  }
                } else {
                  error(
                    'React.jsx: Static children should always be an array. ' +
                      'You are likely explicitly calling React.jsxs or React.jsxDEV. ' +
                      'Use the Babel transform instead.'
                  );
                }
              } else {
                validateChildKeys(children, type);
              }
            }
          }

          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }

          return element;
        }
      } // These two functions exist to still get child warnings in dev
      // even with the prod transform. This means that jsxDEV is purely
      // opt-in behavior for better messages but that we won't stop
      // giving you warnings if you use production apis.

      function jsxWithValidationStatic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, true);
        }
      }
      function jsxWithValidationDynamic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, false);
        }
      }

      var jsx = jsxWithValidationDynamic; // we may want to special case jsxs internally to take advantage of static children.
      // for now we can ship identical prod functions

      var jsxs = jsxWithValidationStatic;

      reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
      reactJsxRuntime_development.jsx = jsx;
      reactJsxRuntime_development.jsxs = jsxs;
    })();
  }
  return reactJsxRuntime_development;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;

  if (process.env.NODE_ENV === 'production') {
    jsxRuntime.exports = requireReactJsxRuntime_production_min();
  } else {
    jsxRuntime.exports = requireReactJsxRuntime_development();
  }
  return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

function r(e) {
  var t,
    f,
    n = '';
  if ('string' == typeof e || 'number' == typeof e) n += e;
  else if ('object' == typeof e)
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (f = r(e[t])) && (n && (n += ' '), (n += f));
    } else for (f in e) e[f] && (n && (n += ' '), (n += f));
  return n;
}
function clsx$1() {
  for (var e, t, f = 0, n = '', o = arguments.length; f < o; f++)
    (e = arguments[f]) && (t = r(e)) && (n && (n += ' '), (n += t));
  return n;
}

/**
 * Utility function to merge class names
 * Combines multiple class names and filters out falsy values
 */
function cn$2(...inputs) {
  return clsx$1(inputs);
}

var styles$8 = { badge: 'Badge-module__badge___KM-kT' };

const Badge = ({ children, className = '' }) => {
  return jsxRuntimeExports.jsx('span', {
    className: cn$2(styles$8.badge, className),
    children: children,
  });
};

var styles$7 = { button: 'Button-module__button___Uc5-f' };

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  isDisabled,
  href,
  className,
  ...props
}) => {
  return href
    ? jsxRuntimeExports.jsx('a', {
        href: href,
        className: cn$2(
          styles$7.button,
          `c-button-link`,
          `c-button-${size}`,
          isDisabled && 'disabled',
          className
        ),
        children: href,
      })
    : jsxRuntimeExports.jsxs('button', {
        className: cn$2(
          styles$7.button,
          `c-button-${variant}`,
          `c-button-${size}`,
          `c-button-icon-${iconPosition}`,
          className
        ),
        disabled: isDisabled,
        ...props,
        children: [
          icon &&
            jsxRuntimeExports.jsx('span', {
              className: 'c-button-icon',
              children: icon,
            }),
          children,
        ],
      });
};

const IconDoubleCheck = ({
  color = 'currentColor',
  width = 14,
  height = 10,
  className,
  ...props
}) => {
  return jsxRuntimeExports.jsxs('svg', {
    width: width,
    height: height,
    viewBox: '0 0 14 10',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className: className,
    ...props,
    children: [
      jsxRuntimeExports.jsx('path', {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        d: 'M13.8271 0.621766C14.035 0.803607 14.056 1.11949 13.8742 1.32731L6.87418 9.3273C6.78305 9.43145 6.65283 9.49317 6.51453 9.49778C6.37622 9.50238 6.24219 9.44946 6.14433 9.35161L3.14433 6.35161C2.94907 6.15634 2.94907 5.83976 3.14433 5.6445C3.3396 5.44924 3.65618 5.44924 3.85144 5.6445L6.47353 8.26659L13.1216 0.668802C13.3034 0.460983 13.6193 0.439925 13.8271 0.621766Z',
        fill: color,
      }),
      jsxRuntimeExports.jsx('path', {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        d: 'M0.144494 5.64455C0.339756 5.44929 0.656338 5.44929 0.8516 5.64455L3.8516 8.64455C4.04686 8.83981 4.04686 9.1564 3.8516 9.35166C3.65634 9.54692 3.33976 9.54692 3.14449 9.35166L0.144493 6.35166C-0.0507687 6.1564 -0.0507687 5.83981 0.144494 5.64455Z',
        fill: color,
      }),
      jsxRuntimeExports.jsx('path', {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        d: 'M10.8257 0.621168C11.0339 0.80263 11.0555 1.11847 10.8741 1.32662L6.62407 6.20162C6.4426 6.40977 6.12676 6.4314 5.91861 6.24994C5.71046 6.06848 5.68883 5.75264 5.87029 5.54449L10.1203 0.669487C10.3018 0.461338 10.6176 0.439705 10.8257 0.621168Z',
        fill: color,
      }),
    ],
  });
};

var styles$6 = { timeLabel: 'TimeLabel-module__timeLabel___G0eeA' };

const TimeLabel = ({
  time,
  className,
  icon,
  iconPosition = 'end',
  hasIcon = false,
  isError = false,
  ...props
}) => {
  return jsxRuntimeExports.jsxs('div', {
    className: cn$2(
      styles$6.timeLabel,
      isError && 'c-time-label-error',
      iconPosition === 'start' && 'c-time-label-icon-start',
      className
    ),
    ...props,
    title: time,
    children: [
      jsxRuntimeExports.jsx('p', {
        className: 'c-time-label-value',
        children: time,
      }),
      (hasIcon || !!icon) &&
        jsxRuntimeExports.jsx('span', {
          className: 'c-time-label-icon',
          children: icon || jsxRuntimeExports.jsx(IconDoubleCheck, {}),
        }),
    ],
  });
};

function _extends() {
  return (
    (_extends = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
          }
          return n;
        }),
    _extends.apply(null, arguments)
  );
}

function _typeof(o) {
  '@babel/helpers - typeof';

  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              'function' == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? 'symbol'
              : typeof o;
          }),
    _typeof(o)
  );
}

function toPrimitive(t, r) {
  if ('object' != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ('object' != _typeof(i)) return i;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return ('string' === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, 'string');
  return 'symbol' == _typeof(i) ? i : i + '';
}

function _defineProperty(e, r, t) {
  return (
    (r = toPropertyKey(r)) in e
      ? Object.defineProperty(e, r, {
          value: t,
          enumerable: true,
          configurable: true,
          writable: true,
        })
      : (e[r] = t),
    e
  );
}

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    (r &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      t.push.apply(t, o));
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2
      ? ownKeys(Object(t), true).forEach(function (r) {
          _defineProperty(e, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
        : ownKeys(Object(t)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
          });
  }
  return e;
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}

function _iterableToArray(r) {
  if (
    ('undefined' != typeof Symbol && null != r[Symbol.iterator]) ||
    null != r['@@iterator']
  )
    return Array.from(r);
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ('string' == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return (
      'Object' === t && r.constructor && (t = r.constructor.name),
      'Map' === t || 'Set' === t
        ? Array.from(r)
        : 'Arguments' === t ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
          ? _arrayLikeToArray(r, a)
          : void 0
    );
  }
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

function _toConsumableArray(r) {
  return (
    _arrayWithoutHoles(r) ||
    _iterableToArray(r) ||
    _unsupportedIterableToArray(r) ||
    _nonIterableSpread()
  );
}

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

function _iterableToArrayLimit(r, l) {
  var t =
    null == r
      ? null
      : ('undefined' != typeof Symbol && r[Symbol.iterator]) || r['@@iterator'];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (((i = (t = t.call(r)).next), 0 === l));
      else
        for (
          ;
          !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l);
          f = !0
        );
    } catch (r) {
      ((o = true), (n = r));
    } finally {
      try {
        if (!f && null != t['return'] && ((u = t['return']()), Object(u) !== u))
          return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

function _slicedToArray(r, e) {
  return (
    _arrayWithHoles(r) ||
    _iterableToArrayLimit(r, e) ||
    _unsupportedIterableToArray(r, e) ||
    _nonIterableRest()
  );
}

function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r)
    if ({}.hasOwnProperty.call(r, n)) {
      if (-1 !== e.indexOf(n)) continue;
      t[n] = r[n];
    }
  return t;
}

function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++)
      ((o = n[r]),
        -1 === t.indexOf(o) &&
          {}.propertyIsEnumerable.call(e, o) &&
          (i[o] = e[o]));
  }
  return i;
}

var classnames = { exports: {} };

/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/

var hasRequiredClassnames;

function requireClassnames() {
  if (hasRequiredClassnames) return classnames.exports;
  hasRequiredClassnames = 1;
  (function (module) {
    /* global define */

    (function () {
      var hasOwn = {}.hasOwnProperty;

      function classNames() {
        var classes = '';

        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (arg) {
            classes = appendClass(classes, parseValue(arg));
          }
        }

        return classes;
      }

      function parseValue(arg) {
        if (typeof arg === 'string' || typeof arg === 'number') {
          return arg;
        }

        if (typeof arg !== 'object') {
          return '';
        }

        if (Array.isArray(arg)) {
          return classNames.apply(null, arg);
        }

        if (
          arg.toString !== Object.prototype.toString &&
          !arg.toString.toString().includes('[native code]')
        ) {
          return arg.toString();
        }

        var classes = '';

        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes = appendClass(classes, key);
          }
        }

        return classes;
      }

      function appendClass(value, newClass) {
        if (!newClass) {
          return value;
        }

        if (value) {
          return value + ' ' + newClass;
        }

        return value + newClass;
      }

      if (module.exports) {
        classNames.default = classNames;
        module.exports = classNames;
      } else {
        window.classNames = classNames;
      }
    })();
  })(classnames);
  return classnames.exports;
}

var classnamesExports = requireClassnames();
var clsx = /*@__PURE__*/ getDefaultExportFromCjs(classnamesExports);

function hasAddon(props) {
  return !!(props.addonBefore || props.addonAfter);
}
function hasPrefixSuffix(props) {
  return !!(props.prefix || props.suffix || props.allowClear);
}

// TODO: It's better to use `Proxy` replace the `element.value`. But we still need support IE11.
function cloneEvent(event, target, value) {
  // A bug report filed on WebKit's Bugzilla tracker, dating back to 2009, specifically addresses the issue of cloneNode() not copying files of <input type="file"> elements.
  // As of the last update, this bug was still marked as "NEW," indicating that it might not have been resolved yet​​.
  // https://bugs.webkit.org/show_bug.cgi?id=28123
  var currentTarget = target.cloneNode(true);

  // click clear icon
  var newEvent = Object.create(event, {
    target: {
      value: currentTarget,
    },
    currentTarget: {
      value: currentTarget,
    },
  });

  // Fill data
  currentTarget.value = value;

  // Fill selection. Some type like `email` not support selection
  // https://github.com/ant-design/ant-design/issues/47833
  if (
    typeof target.selectionStart === 'number' &&
    typeof target.selectionEnd === 'number'
  ) {
    currentTarget.selectionStart = target.selectionStart;
    currentTarget.selectionEnd = target.selectionEnd;
  }
  currentTarget.setSelectionRange = function () {
    target.setSelectionRange.apply(target, arguments);
  };
  return newEvent;
}
function resolveOnChange(target, e, onChange, targetValue) {
  if (!onChange) {
    return;
  }
  var event = e;
  if (e.type === 'click') {
    // Clone a new target for event.
    // Avoid the following usage, the setQuery method gets the original value.
    //
    // const [query, setQuery] = React.useState('');
    // <Input
    //   allowClear
    //   value={query}
    //   onChange={(e)=> {
    //     setQuery((prevStatus) => e.target.value);
    //   }}
    // />

    event = cloneEvent(e, target, '');
    onChange(event);
    return;
  }

  // Trigger by composition event, this means we need force change the input value
  // https://github.com/ant-design/ant-design/issues/45737
  // https://github.com/ant-design/ant-design/issues/46598
  if (target.type !== 'file' && targetValue !== undefined) {
    event = cloneEvent(e, target, targetValue);
    onChange(event);
    return;
  }
  onChange(event);
}

var BaseInput = /*#__PURE__*/ React__default.forwardRef(function (props, ref) {
  var _props, _props2, _props3;
  var inputEl = props.inputElement,
    children = props.children,
    prefixCls = props.prefixCls,
    prefix = props.prefix,
    suffix = props.suffix,
    addonBefore = props.addonBefore,
    addonAfter = props.addonAfter,
    className = props.className,
    style = props.style,
    disabled = props.disabled,
    readOnly = props.readOnly,
    focused = props.focused,
    triggerFocus = props.triggerFocus,
    allowClear = props.allowClear,
    value = props.value,
    handleReset = props.handleReset,
    hidden = props.hidden,
    classes = props.classes,
    classNames = props.classNames,
    dataAttrs = props.dataAttrs,
    styles = props.styles,
    components = props.components,
    onClear = props.onClear;
  var inputElement =
    children !== null && children !== void 0 ? children : inputEl;
  var AffixWrapperComponent =
    (components === null || components === void 0
      ? void 0
      : components.affixWrapper) || 'span';
  var GroupWrapperComponent =
    (components === null || components === void 0
      ? void 0
      : components.groupWrapper) || 'span';
  var WrapperComponent =
    (components === null || components === void 0
      ? void 0
      : components.wrapper) || 'span';
  var GroupAddonComponent =
    (components === null || components === void 0
      ? void 0
      : components.groupAddon) || 'span';
  var containerRef = useRef(null);
  var onInputClick = function onInputClick(e) {
    var _containerRef$current;
    if (
      (_containerRef$current = containerRef.current) !== null &&
      _containerRef$current !== void 0 &&
      _containerRef$current.contains(e.target)
    ) {
      triggerFocus === null || triggerFocus === void 0 || triggerFocus();
    }
  };
  var hasAffix = hasPrefixSuffix(props);
  var element = /*#__PURE__*/ cloneElement(inputElement, {
    value: value,
    className:
      clsx(
        (_props = inputElement.props) === null || _props === void 0
          ? void 0
          : _props.className,
        !hasAffix &&
          (classNames === null || classNames === void 0
            ? void 0
            : classNames.variant)
      ) || null,
  });

  // ======================== Ref ======================== //
  var groupRef = useRef(null);
  React__default.useImperativeHandle(ref, function () {
    return {
      nativeElement: groupRef.current || containerRef.current,
    };
  });

  // ================== Prefix & Suffix ================== //
  if (hasAffix) {
    // ================== Clear Icon ================== //
    var clearIcon = null;
    if (allowClear) {
      var needClear = !disabled && !readOnly && value;
      var clearIconCls = ''.concat(prefixCls, '-clear-icon');
      var iconNode =
        _typeof(allowClear) === 'object' &&
        allowClear !== null &&
        allowClear !== void 0 &&
        allowClear.clearIcon
          ? allowClear.clearIcon
          : '✖';
      clearIcon = /*#__PURE__*/ React__default.createElement(
        'button',
        {
          type: 'button',
          tabIndex: -1,
          onClick: function onClick(event) {
            handleReset === null ||
              handleReset === void 0 ||
              handleReset(event);
            onClear === null || onClear === void 0 || onClear();
          },
          // Do not trigger onBlur when clear input
          // https://github.com/ant-design/ant-design/issues/31200
          onMouseDown: function onMouseDown(e) {
            return e.preventDefault();
          },
          className: clsx(
            clearIconCls,
            _defineProperty(
              _defineProperty(
                {},
                ''.concat(clearIconCls, '-hidden'),
                !needClear
              ),
              ''.concat(clearIconCls, '-has-suffix'),
              !!suffix
            )
          ),
        },
        iconNode
      );
    }
    var affixWrapperPrefixCls = ''.concat(prefixCls, '-affix-wrapper');
    var affixWrapperCls = clsx(
      affixWrapperPrefixCls,
      _defineProperty(
        _defineProperty(
          _defineProperty(
            _defineProperty(
              _defineProperty({}, ''.concat(prefixCls, '-disabled'), disabled),
              ''.concat(affixWrapperPrefixCls, '-disabled'),
              disabled
            ),
            ''.concat(affixWrapperPrefixCls, '-focused'),
            focused
          ),
          ''.concat(affixWrapperPrefixCls, '-readonly'),
          readOnly
        ),
        ''.concat(affixWrapperPrefixCls, '-input-with-clear-btn'),
        suffix && allowClear && value
      ),
      classes === null || classes === void 0 ? void 0 : classes.affixWrapper,
      classNames === null || classNames === void 0
        ? void 0
        : classNames.affixWrapper,
      classNames === null || classNames === void 0 ? void 0 : classNames.variant
    );
    var suffixNode =
      (suffix || allowClear) &&
      /*#__PURE__*/ React__default.createElement(
        'span',
        {
          className: clsx(
            ''.concat(prefixCls, '-suffix'),
            classNames === null || classNames === void 0
              ? void 0
              : classNames.suffix
          ),
          style: styles === null || styles === void 0 ? void 0 : styles.suffix,
        },
        clearIcon,
        suffix
      );
    element = /*#__PURE__*/ React__default.createElement(
      AffixWrapperComponent,
      _extends(
        {
          className: affixWrapperCls,
          style:
            styles === null || styles === void 0 ? void 0 : styles.affixWrapper,
          onClick: onInputClick,
        },
        dataAttrs === null || dataAttrs === void 0
          ? void 0
          : dataAttrs.affixWrapper,
        {
          ref: containerRef,
        }
      ),
      prefix &&
        /*#__PURE__*/ React__default.createElement(
          'span',
          {
            className: clsx(
              ''.concat(prefixCls, '-prefix'),
              classNames === null || classNames === void 0
                ? void 0
                : classNames.prefix
            ),
            style:
              styles === null || styles === void 0 ? void 0 : styles.prefix,
          },
          prefix
        ),
      element,
      suffixNode
    );
  }

  // ================== Addon ================== //
  if (hasAddon(props)) {
    var wrapperCls = ''.concat(prefixCls, '-group');
    var addonCls = ''.concat(wrapperCls, '-addon');
    var groupWrapperCls = ''.concat(wrapperCls, '-wrapper');
    var mergedWrapperClassName = clsx(
      ''.concat(prefixCls, '-wrapper'),
      wrapperCls,
      classes === null || classes === void 0 ? void 0 : classes.wrapper,
      classNames === null || classNames === void 0 ? void 0 : classNames.wrapper
    );
    var mergedGroupClassName = clsx(
      groupWrapperCls,
      _defineProperty({}, ''.concat(groupWrapperCls, '-disabled'), disabled),
      classes === null || classes === void 0 ? void 0 : classes.group,
      classNames === null || classNames === void 0
        ? void 0
        : classNames.groupWrapper
    );

    // Need another wrapper for changing display:table to display:inline-block
    // and put style prop in wrapper
    element = /*#__PURE__*/ React__default.createElement(
      GroupWrapperComponent,
      {
        className: mergedGroupClassName,
        ref: groupRef,
      },
      /*#__PURE__*/ React__default.createElement(
        WrapperComponent,
        {
          className: mergedWrapperClassName,
        },
        addonBefore &&
          /*#__PURE__*/ React__default.createElement(
            GroupAddonComponent,
            {
              className: addonCls,
            },
            addonBefore
          ),
        element,
        addonAfter &&
          /*#__PURE__*/ React__default.createElement(
            GroupAddonComponent,
            {
              className: addonCls,
            },
            addonAfter
          )
      )
    );
  }

  // `className` and `style` are always on the root element
  return /*#__PURE__*/ React__default.cloneElement(element, {
    className:
      clsx(
        (_props2 = element.props) === null || _props2 === void 0
          ? void 0
          : _props2.className,
        className
      ) || null,
    style: _objectSpread2(
      _objectSpread2(
        {},
        (_props3 = element.props) === null || _props3 === void 0
          ? void 0
          : _props3.style
      ),
      style
    ),
    hidden: hidden,
  });
});

function useEvent(callback) {
  var fnRef = React.useRef();
  fnRef.current = callback;
  var memoFn = React.useCallback(function () {
    var _fnRef$current;
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }
    return (_fnRef$current = fnRef.current) === null ||
      _fnRef$current === void 0
      ? void 0
      : _fnRef$current.call.apply(_fnRef$current, [fnRef].concat(args));
  }, []);
  return memoFn;
}

function canUseDom() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

/**
 * Wrap `React.useLayoutEffect` which will not throw warning message in test env
 */
var useInternalLayoutEffect =
  process.env.NODE_ENV !== 'test' && canUseDom()
    ? React.useLayoutEffect
    : React.useEffect;
var useLayoutEffect = function useLayoutEffect(callback, deps) {
  var firstMountRef = React.useRef(true);
  useInternalLayoutEffect(function () {
    return callback(firstMountRef.current);
  }, deps);

  // We tell react that first mount has passed
  useInternalLayoutEffect(function () {
    firstMountRef.current = false;
    return function () {
      firstMountRef.current = true;
    };
  }, []);
};
var useLayoutUpdateEffect = function useLayoutUpdateEffect(callback, deps) {
  useLayoutEffect(function (firstMount) {
    if (!firstMount) {
      return callback();
    }
  }, deps);
};

/**
 * Same as React.useState but `setState` accept `ignoreDestroy` param to not to setState after destroyed.
 * We do not make this auto is to avoid real memory leak.
 * Developer should confirm it's safe to ignore themselves.
 */
function useSafeState(defaultValue) {
  var destroyRef = React.useRef(false);
  var _React$useState = React.useState(defaultValue),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    value = _React$useState2[0],
    setValue = _React$useState2[1];
  React.useEffect(function () {
    destroyRef.current = false;
    return function () {
      destroyRef.current = true;
    };
  }, []);
  function safeSetState(updater, ignoreDestroy) {
    if (ignoreDestroy && destroyRef.current) {
      return;
    }
    setValue(updater);
  }
  return [value, safeSetState];
}

/** We only think `undefined` is empty */
function hasValue(value) {
  return value !== undefined;
}

/**
 * Similar to `useState` but will use props value if provided.
 * Note that internal use rc-util `useState` hook.
 */
function useMergedState(defaultStateValue, option) {
  var _ref = option || {},
    defaultValue = _ref.defaultValue,
    value = _ref.value,
    onChange = _ref.onChange,
    postState = _ref.postState;

  // ======================= Init =======================
  var _useState = useSafeState(function () {
      if (hasValue(value)) {
        return value;
      } else if (hasValue(defaultValue)) {
        return typeof defaultValue === 'function'
          ? defaultValue()
          : defaultValue;
      } else {
        return typeof defaultStateValue === 'function'
          ? defaultStateValue()
          : defaultStateValue;
      }
    }),
    _useState2 = _slicedToArray(_useState, 2),
    innerValue = _useState2[0],
    setInnerValue = _useState2[1];
  var mergedValue = value !== undefined ? value : innerValue;
  var postMergedValue = postState ? postState(mergedValue) : mergedValue;

  // ====================== Change ======================
  var onChangeFn = useEvent(onChange);
  var _useState3 = useSafeState([mergedValue]),
    _useState4 = _slicedToArray(_useState3, 2),
    prevValue = _useState4[0],
    setPrevValue = _useState4[1];
  useLayoutUpdateEffect(
    function () {
      var prev = prevValue[0];
      if (innerValue !== prev) {
        onChangeFn(innerValue, prev);
      }
    },
    [prevValue]
  );

  // Sync value back to `undefined` when it from control to un-control
  useLayoutUpdateEffect(
    function () {
      if (!hasValue(value)) {
        setInnerValue(value);
      }
    },
    [value]
  );

  // ====================== Update ======================
  var triggerChange = useEvent(function (updater, ignoreDestroy) {
    setInnerValue(updater, ignoreDestroy);
    setPrevValue([mergedValue], ignoreDestroy);
  });
  return [postMergedValue, triggerChange];
}

var _excluded$2 = ['show'];
function useCount(count, showCount) {
  return React.useMemo(
    function () {
      var mergedConfig = {};
      if (showCount) {
        mergedConfig.show =
          _typeof(showCount) === 'object' && showCount.formatter
            ? showCount.formatter
            : !!showCount;
      }
      mergedConfig = _objectSpread2(_objectSpread2({}, mergedConfig), count);
      var _ref = mergedConfig,
        show = _ref.show,
        rest = _objectWithoutProperties(_ref, _excluded$2);
      return _objectSpread2(
        _objectSpread2({}, rest),
        {},
        {
          show: !!show,
          showFormatter: typeof show === 'function' ? show : undefined,
          strategy:
            rest.strategy ||
            function (value) {
              return value.length;
            },
        }
      );
    },
    [count, showCount]
  );
}

var REACT_ELEMENT_TYPE_18 = Symbol.for('react.element');
var REACT_ELEMENT_TYPE_19 = Symbol.for('react.transitional.element');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');

/**
 * Compatible with React 18 or 19 to check if node is a Fragment.
 */
function isFragment(object) {
  return (
    // Base object type
    object &&
    _typeof(object) === 'object' &&
    // React Element type
    (object.$$typeof === REACT_ELEMENT_TYPE_18 ||
      object.$$typeof === REACT_ELEMENT_TYPE_19) &&
    // React Fragment type
    object.type === REACT_FRAGMENT_TYPE
  );
}

function toArray(children) {
  var option =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var ret = [];
  React__default.Children.forEach(children, function (child) {
    if ((child === undefined || child === null) && !option.keepEmpty) {
      return;
    }
    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    } else if (isFragment(child) && child.props) {
      ret = ret.concat(toArray(child.props.children, option));
    } else {
      ret.push(child);
    }
  });
  return ret;
}

/* eslint-disable no-console */
var preWarningFns = [];

/**
 * Warning if condition not match.
 * @param valid Condition
 * @param message Warning message
 * @example
 * ```js
 * warning(false, 'some error'); // print some error
 * warning(true, 'some error'); // print nothing
 * warning(1 === 2, 'some error'); // print some error
 * ```
 */
function warning(valid, message) {
  if (process.env.NODE_ENV !== 'production' && true && console !== undefined) {
    var finalMessage = preWarningFns.reduce(function (msg, preMessageFn) {
      return preMessageFn(msg !== null && msg !== void 0 ? msg : '', 'warning');
    }, message);
    if (finalMessage) {
      console.error('Warning: '.concat(finalMessage));
    }
  }
}

function isDOM(node) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Element
  // Since XULElement is also subclass of Element, we only need HTMLElement and SVGElement
  return node instanceof HTMLElement || node instanceof SVGElement;
}

/**
 * Retrieves a DOM node via a ref, and does not invoke `findDOMNode`.
 */
function getDOM(node) {
  if (node && _typeof(node) === 'object' && isDOM(node.nativeElement)) {
    return node.nativeElement;
  }
  if (isDOM(node)) {
    return node;
  }
  return null;
}

/**
 * Return if a node is a DOM node. Else will return by `findDOMNode`
 */
function findDOMNode(node) {
  var domNode = getDOM(node);
  if (domNode) {
    return domNode;
  }
  if (node instanceof React__default.Component) {
    var _ReactDOM$findDOMNode;
    return (_ReactDOM$findDOMNode = ReactDOM.findDOMNode) === null ||
      _ReactDOM$findDOMNode === void 0
      ? void 0
      : _ReactDOM$findDOMNode.call(ReactDOM, node);
  }
  return null;
}

var reactIs = { exports: {} };

var reactIs_production_min = {};

/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_production_min;

function requireReactIs_production_min() {
  if (hasRequiredReactIs_production_min) return reactIs_production_min;
  hasRequiredReactIs_production_min = 1;
  var b = Symbol.for('react.element'),
    c = Symbol.for('react.portal'),
    d = Symbol.for('react.fragment'),
    e = Symbol.for('react.strict_mode'),
    f = Symbol.for('react.profiler'),
    g = Symbol.for('react.provider'),
    h = Symbol.for('react.context'),
    k = Symbol.for('react.server_context'),
    l = Symbol.for('react.forward_ref'),
    m = Symbol.for('react.suspense'),
    n = Symbol.for('react.suspense_list'),
    p = Symbol.for('react.memo'),
    q = Symbol.for('react.lazy'),
    t = Symbol.for('react.offscreen'),
    u;
  u = Symbol.for('react.module.reference');
  function v(a) {
    if ('object' === typeof a && null !== a) {
      var r = a.$$typeof;
      switch (r) {
        case b:
          switch (((a = a.type), a)) {
            case d:
            case f:
            case e:
            case m:
            case n:
              return a;
            default:
              switch (((a = a && a.$$typeof), a)) {
                case k:
                case h:
                case l:
                case q:
                case p:
                case g:
                  return a;
                default:
                  return r;
              }
          }
        case c:
          return r;
      }
    }
  }
  reactIs_production_min.ContextConsumer = h;
  reactIs_production_min.ContextProvider = g;
  reactIs_production_min.Element = b;
  reactIs_production_min.ForwardRef = l;
  reactIs_production_min.Fragment = d;
  reactIs_production_min.Lazy = q;
  reactIs_production_min.Memo = p;
  reactIs_production_min.Portal = c;
  reactIs_production_min.Profiler = f;
  reactIs_production_min.StrictMode = e;
  reactIs_production_min.Suspense = m;
  reactIs_production_min.SuspenseList = n;
  reactIs_production_min.isAsyncMode = function () {
    return false;
  };
  reactIs_production_min.isConcurrentMode = function () {
    return false;
  };
  reactIs_production_min.isContextConsumer = function (a) {
    return v(a) === h;
  };
  reactIs_production_min.isContextProvider = function (a) {
    return v(a) === g;
  };
  reactIs_production_min.isElement = function (a) {
    return 'object' === typeof a && null !== a && a.$$typeof === b;
  };
  reactIs_production_min.isForwardRef = function (a) {
    return v(a) === l;
  };
  reactIs_production_min.isFragment = function (a) {
    return v(a) === d;
  };
  reactIs_production_min.isLazy = function (a) {
    return v(a) === q;
  };
  reactIs_production_min.isMemo = function (a) {
    return v(a) === p;
  };
  reactIs_production_min.isPortal = function (a) {
    return v(a) === c;
  };
  reactIs_production_min.isProfiler = function (a) {
    return v(a) === f;
  };
  reactIs_production_min.isStrictMode = function (a) {
    return v(a) === e;
  };
  reactIs_production_min.isSuspense = function (a) {
    return v(a) === m;
  };
  reactIs_production_min.isSuspenseList = function (a) {
    return v(a) === n;
  };
  reactIs_production_min.isValidElementType = function (a) {
    return 'string' === typeof a ||
      'function' === typeof a ||
      a === d ||
      a === f ||
      a === e ||
      a === m ||
      a === n ||
      a === t ||
      ('object' === typeof a &&
        null !== a &&
        (a.$$typeof === q ||
          a.$$typeof === p ||
          a.$$typeof === g ||
          a.$$typeof === h ||
          a.$$typeof === l ||
          a.$$typeof === u ||
          void 0 !== a.getModuleId))
      ? true
      : false;
  };
  reactIs_production_min.typeOf = v;
  return reactIs_production_min;
}

var reactIs_development = {};

/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_development;

function requireReactIs_development() {
  if (hasRequiredReactIs_development) return reactIs_development;
  hasRequiredReactIs_development = 1;

  if (process.env.NODE_ENV !== 'production') {
    (function () {
      // ATTENTION
      // When adding new symbols to this file,
      // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
      // The Symbol used to tag the ReactElement-like types.
      var REACT_ELEMENT_TYPE = Symbol.for('react.element');
      var REACT_PORTAL_TYPE = Symbol.for('react.portal');
      var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
      var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
      var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
      var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
      var REACT_CONTEXT_TYPE = Symbol.for('react.context');
      var REACT_SERVER_CONTEXT_TYPE = Symbol.for('react.server_context');
      var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
      var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
      var REACT_MEMO_TYPE = Symbol.for('react.memo');
      var REACT_LAZY_TYPE = Symbol.for('react.lazy');
      var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');

      // -----------------------------------------------------------------------------

      var enableScopeAPI = false; // Experimental Create Event Handle API.
      var enableCacheElement = false;
      var enableTransitionTracing = false; // No known bugs, but needs performance testing

      var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
      // stuff. Intended to enable React core members to more easily debug scheduling
      // issues in DEV builds.

      var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

      var REACT_MODULE_REFERENCE;

      {
        REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
      }

      function isValidElementType(type) {
        if (typeof type === 'string' || typeof type === 'function') {
          return true;
        } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).

        if (
          type === REACT_FRAGMENT_TYPE ||
          type === REACT_PROFILER_TYPE ||
          enableDebugTracing ||
          type === REACT_STRICT_MODE_TYPE ||
          type === REACT_SUSPENSE_TYPE ||
          type === REACT_SUSPENSE_LIST_TYPE ||
          enableLegacyHidden ||
          type === REACT_OFFSCREEN_TYPE ||
          enableScopeAPI ||
          enableCacheElement ||
          enableTransitionTracing
        ) {
          return true;
        }

        if (typeof type === 'object' && type !== null) {
          if (
            type.$$typeof === REACT_LAZY_TYPE ||
            type.$$typeof === REACT_MEMO_TYPE ||
            type.$$typeof === REACT_PROVIDER_TYPE ||
            type.$$typeof === REACT_CONTEXT_TYPE ||
            type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE ||
            type.getModuleId !== undefined
          ) {
            return true;
          }
        }

        return false;
      }

      function typeOf(object) {
        if (typeof object === 'object' && object !== null) {
          var $$typeof = object.$$typeof;

          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;

              switch (type) {
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                case REACT_SUSPENSE_LIST_TYPE:
                  return type;

                default:
                  var $$typeofType = type && type.$$typeof;

                  switch ($$typeofType) {
                    case REACT_SERVER_CONTEXT_TYPE:
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;

                    default:
                      return $$typeof;
                  }
              }

            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }

        return undefined;
      }
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false;
      var hasWarnedAboutDeprecatedIsConcurrentMode = false; // AsyncMode should be deprecated

      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

            console['warn'](
              'The ReactIs.isAsyncMode() alias has been deprecated, ' +
                'and will be removed in React 18+.'
            );
          }
        }

        return false;
      }
      function isConcurrentMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
            hasWarnedAboutDeprecatedIsConcurrentMode = true; // Using console['warn'] to evade Babel and ESLint

            console['warn'](
              'The ReactIs.isConcurrentMode() alias has been deprecated, ' +
                'and will be removed in React 18+.'
            );
          }
        }

        return false;
      }
      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }
      function isElement(object) {
        return (
          typeof object === 'object' &&
          object !== null &&
          object.$$typeof === REACT_ELEMENT_TYPE
        );
      }
      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }
      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }
      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }
      function isSuspenseList(object) {
        return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
      }

      reactIs_development.ContextConsumer = ContextConsumer;
      reactIs_development.ContextProvider = ContextProvider;
      reactIs_development.Element = Element;
      reactIs_development.ForwardRef = ForwardRef;
      reactIs_development.Fragment = Fragment;
      reactIs_development.Lazy = Lazy;
      reactIs_development.Memo = Memo;
      reactIs_development.Portal = Portal;
      reactIs_development.Profiler = Profiler;
      reactIs_development.StrictMode = StrictMode;
      reactIs_development.Suspense = Suspense;
      reactIs_development.SuspenseList = SuspenseList;
      reactIs_development.isAsyncMode = isAsyncMode;
      reactIs_development.isConcurrentMode = isConcurrentMode;
      reactIs_development.isContextConsumer = isContextConsumer;
      reactIs_development.isContextProvider = isContextProvider;
      reactIs_development.isElement = isElement;
      reactIs_development.isForwardRef = isForwardRef;
      reactIs_development.isFragment = isFragment;
      reactIs_development.isLazy = isLazy;
      reactIs_development.isMemo = isMemo;
      reactIs_development.isPortal = isPortal;
      reactIs_development.isProfiler = isProfiler;
      reactIs_development.isStrictMode = isStrictMode;
      reactIs_development.isSuspense = isSuspense;
      reactIs_development.isSuspenseList = isSuspenseList;
      reactIs_development.isValidElementType = isValidElementType;
      reactIs_development.typeOf = typeOf;
    })();
  }
  return reactIs_development;
}

var hasRequiredReactIs;

function requireReactIs() {
  if (hasRequiredReactIs) return reactIs.exports;
  hasRequiredReactIs = 1;

  if (process.env.NODE_ENV === 'production') {
    reactIs.exports = requireReactIs_production_min();
  } else {
    reactIs.exports = requireReactIs_development();
  }
  return reactIs.exports;
}

var reactIsExports = requireReactIs();

function useMemo(getValue, condition, shouldUpdate) {
  var cacheRef = React.useRef({});
  if (
    !('value' in cacheRef.current) ||
    shouldUpdate(cacheRef.current.condition, condition)
  ) {
    cacheRef.current.value = getValue();
    cacheRef.current.condition = condition;
  }
  return cacheRef.current.value;
}

var ReactMajorVersion = Number(version.split('.')[0]);
var fillRef = function fillRef(ref, node) {
  if (typeof ref === 'function') {
    ref(node);
  } else if (_typeof(ref) === 'object' && ref && 'current' in ref) {
    ref.current = node;
  }
};

/**
 * Merge refs into one ref function to support ref passing.
 */
var composeRef = function composeRef() {
  for (
    var _len = arguments.length, refs = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    refs[_key] = arguments[_key];
  }
  var refList = refs.filter(Boolean);
  if (refList.length <= 1) {
    return refList[0];
  }
  return function (node) {
    refs.forEach(function (ref) {
      fillRef(ref, node);
    });
  };
};
var useComposeRef = function useComposeRef() {
  for (
    var _len2 = arguments.length, refs = new Array(_len2), _key2 = 0;
    _key2 < _len2;
    _key2++
  ) {
    refs[_key2] = arguments[_key2];
  }
  return useMemo(
    function () {
      return composeRef.apply(void 0, refs);
    },
    refs,
    function (prev, next) {
      return (
        prev.length !== next.length ||
        prev.every(function (ref, i) {
          return ref !== next[i];
        })
      );
    }
  );
};
var supportRef = function supportRef(nodeOrComponent) {
  var _type$prototype, _nodeOrComponent$prot;
  if (!nodeOrComponent) {
    return false;
  }

  // React 19 no need `forwardRef` anymore. So just pass if is a React element.
  if (isReactElement(nodeOrComponent) && ReactMajorVersion >= 19) {
    return true;
  }
  var type = reactIsExports.isMemo(nodeOrComponent)
    ? nodeOrComponent.type.type
    : nodeOrComponent.type;

  // Function component node
  if (
    typeof type === 'function' &&
    !(
      (_type$prototype = type.prototype) !== null &&
      _type$prototype !== void 0 &&
      _type$prototype.render
    ) &&
    type.$$typeof !== reactIsExports.ForwardRef
  ) {
    return false;
  }

  // Class component
  if (
    typeof nodeOrComponent === 'function' &&
    !(
      (_nodeOrComponent$prot = nodeOrComponent.prototype) !== null &&
      _nodeOrComponent$prot !== void 0 &&
      _nodeOrComponent$prot.render
    ) &&
    nodeOrComponent.$$typeof !== reactIsExports.ForwardRef
  ) {
    return false;
  }
  return true;
};
function isReactElement(node) {
  return /*#__PURE__*/ isValidElement(node) && !isFragment(node);
}

/**
 * In React 19. `ref` is not a property from node.
 * But a property from `props.ref`.
 * To check if `props.ref` exist or fallback to `ref`.
 */
var getNodeRef = function getNodeRef(node) {
  if (node && isReactElement(node)) {
    var ele = node;

    // Source from:
    // https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/getReactNodeRef/getReactNodeRef.ts
    return ele.props.propertyIsEnumerable('ref') ? ele.props.ref : ele.ref;
  }
  return null;
};

var CollectionContext = /*#__PURE__*/ React.createContext(null);
/**
 * Collect all the resize event from children ResizeObserver
 */
function Collection(_ref) {
  var children = _ref.children,
    onBatchResize = _ref.onBatchResize;
  var resizeIdRef = React.useRef(0);
  var resizeInfosRef = React.useRef([]);
  var onCollectionResize = React.useContext(CollectionContext);
  var onResize = React.useCallback(
    function (size, element, data) {
      resizeIdRef.current += 1;
      var currentId = resizeIdRef.current;
      resizeInfosRef.current.push({
        size: size,
        element: element,
        data: data,
      });
      Promise.resolve().then(function () {
        if (currentId === resizeIdRef.current) {
          onBatchResize === null ||
            onBatchResize === void 0 ||
            onBatchResize(resizeInfosRef.current);
          resizeInfosRef.current = [];
        }
      });

      // Continue bubbling if parent exist
      onCollectionResize === null ||
        onCollectionResize === void 0 ||
        onCollectionResize(size, element, data);
    },
    [onBatchResize, onCollectionResize]
  );
  return /*#__PURE__*/ React.createElement(
    CollectionContext.Provider,
    {
      value: onResize,
    },
    children
  );
}

/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
  if (typeof Map !== 'undefined') {
    return Map;
  }
  /**
   * Returns index in provided array that matches the specified key.
   *
   * @param {Array<Array>} arr
   * @param {*} key
   * @returns {number}
   */
  function getIndex(arr, key) {
    var result = -1;
    arr.some(function (entry, index) {
      if (entry[0] === key) {
        result = index;
        return true;
      }
      return false;
    });
    return result;
  }
  return /** @class */ (function () {
    function class_1() {
      this.__entries__ = [];
    }
    Object.defineProperty(class_1.prototype, 'size', {
      /**
       * @returns {boolean}
       */
      get: function () {
        return this.__entries__.length;
      },
      enumerable: true,
      configurable: true,
    });
    /**
     * @param {*} key
     * @returns {*}
     */
    class_1.prototype.get = function (key) {
      var index = getIndex(this.__entries__, key);
      var entry = this.__entries__[index];
      return entry && entry[1];
    };
    /**
     * @param {*} key
     * @param {*} value
     * @returns {void}
     */
    class_1.prototype.set = function (key, value) {
      var index = getIndex(this.__entries__, key);
      if (~index) {
        this.__entries__[index][1] = value;
      } else {
        this.__entries__.push([key, value]);
      }
    };
    /**
     * @param {*} key
     * @returns {void}
     */
    class_1.prototype.delete = function (key) {
      var entries = this.__entries__;
      var index = getIndex(entries, key);
      if (~index) {
        entries.splice(index, 1);
      }
    };
    /**
     * @param {*} key
     * @returns {void}
     */
    class_1.prototype.has = function (key) {
      return !!~getIndex(this.__entries__, key);
    };
    /**
     * @returns {void}
     */
    class_1.prototype.clear = function () {
      this.__entries__.splice(0);
    };
    /**
     * @param {Function} callback
     * @param {*} [ctx=null]
     * @returns {void}
     */
    class_1.prototype.forEach = function (callback, ctx) {
      if (ctx === void 0) {
        ctx = null;
      }
      for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
        var entry = _a[_i];
        callback.call(ctx, entry[1], entry[0]);
      }
    };
    return class_1;
  })();
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
  if (typeof global !== 'undefined' && global.Math === Math) {
    return global;
  }
  if (typeof self !== 'undefined' && self.Math === Math) {
    return self;
  }
  if (typeof window !== 'undefined' && window.Math === Math) {
    return window;
  }
  // eslint-disable-next-line no-new-func
  return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
  if (typeof requestAnimationFrame === 'function') {
    // It's required to use a bounded function because IE sometimes throws
    // an "Invalid calling object" error if rAF is invoked without the global
    // object on the left hand side.
    return requestAnimationFrame.bind(global$1);
  }
  return function (callback) {
    return setTimeout(function () {
      return callback(Date.now());
    }, 1000 / 60);
  };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle(callback, delay) {
  var leadingCall = false,
    trailingCall = false,
    lastCallTime = 0;
  /**
   * Invokes the original callback function and schedules new invocation if
   * the "proxy" was called during current request.
   *
   * @returns {void}
   */
  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }
    if (trailingCall) {
      proxy();
    }
  }
  /**
   * Callback invoked after the specified delay. It will further postpone
   * invocation of the original function delegating it to the
   * requestAnimationFrame.
   *
   * @returns {void}
   */
  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  /**
   * Schedules invocation of the original function.
   *
   * @returns {void}
   */
  function proxy() {
    var timeStamp = Date.now();
    if (leadingCall) {
      // Reject immediately following calls.
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      }
      // Schedule new call to be in invoked when the pending one is resolved.
      // This is important for "transitions" which never actually start
      // immediately so there is a chance that we might miss one if change
      // happens amids the pending invocation.
      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }
    lastCallTime = timeStamp;
  }
  return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = [
  'top',
  'right',
  'bottom',
  'left',
  'width',
  'height',
  'size',
  'weight',
];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
  /**
   * Creates a new instance of ResizeObserverController.
   *
   * @private
   */
  function ResizeObserverController() {
    /**
     * Indicates whether DOM listeners have been added.
     *
     * @private {boolean}
     */
    this.connected_ = false;
    /**
     * Tells that controller has subscribed for Mutation Events.
     *
     * @private {boolean}
     */
    this.mutationEventsAdded_ = false;
    /**
     * Keeps reference to the instance of MutationObserver.
     *
     * @private {MutationObserver}
     */
    this.mutationsObserver_ = null;
    /**
     * A list of connected observers.
     *
     * @private {Array<ResizeObserverSPI>}
     */
    this.observers_ = [];
    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
  }
  /**
   * Adds observer to observers list.
   *
   * @param {ResizeObserverSPI} observer - Observer to be added.
   * @returns {void}
   */
  ResizeObserverController.prototype.addObserver = function (observer) {
    if (!~this.observers_.indexOf(observer)) {
      this.observers_.push(observer);
    }
    // Add listeners if they haven't been added yet.
    if (!this.connected_) {
      this.connect_();
    }
  };
  /**
   * Removes observer from observers list.
   *
   * @param {ResizeObserverSPI} observer - Observer to be removed.
   * @returns {void}
   */
  ResizeObserverController.prototype.removeObserver = function (observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer);
    // Remove observer if it's present in registry.
    if (~index) {
      observers.splice(index, 1);
    }
    // Remove listeners if controller has no connected observers.
    if (!observers.length && this.connected_) {
      this.disconnect_();
    }
  };
  /**
   * Invokes the update of observers. It will continue running updates insofar
   * it detects changes.
   *
   * @returns {void}
   */
  ResizeObserverController.prototype.refresh = function () {
    var changesDetected = this.updateObservers_();
    // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.
    if (changesDetected) {
      this.refresh();
    }
  };
  /**
   * Updates every observer from observers list and notifies them of queued
   * entries.
   *
   * @private
   * @returns {boolean} Returns "true" if any observer has detected changes in
   *      dimensions of it's elements.
   */
  ResizeObserverController.prototype.updateObservers_ = function () {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function (observer) {
      return (observer.gatherActive(), observer.hasActive());
    });
    // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.
    activeObservers.forEach(function (observer) {
      return observer.broadcastActive();
    });
    return activeObservers.length > 0;
  };
  /**
   * Initializes DOM listeners.
   *
   * @private
   * @returns {void}
   */
  ResizeObserverController.prototype.connect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
      return;
    }
    // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.
    document.addEventListener('transitionend', this.onTransitionEnd_);
    window.addEventListener('resize', this.refresh);
    if (mutationObserverSupported) {
      this.mutationsObserver_ = new MutationObserver(this.refresh);
      this.mutationsObserver_.observe(document, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
    } else {
      document.addEventListener('DOMSubtreeModified', this.refresh);
      this.mutationEventsAdded_ = true;
    }
    this.connected_ = true;
  };
  /**
   * Removes DOM listeners.
   *
   * @private
   * @returns {void}
   */
  ResizeObserverController.prototype.disconnect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
      return;
    }
    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);
    if (this.mutationsObserver_) {
      this.mutationsObserver_.disconnect();
    }
    if (this.mutationEventsAdded_) {
      document.removeEventListener('DOMSubtreeModified', this.refresh);
    }
    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
  };
  /**
   * "Transitionend" event handler.
   *
   * @private
   * @param {TransitionEvent} event
   * @returns {void}
   */
  ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
    var _b = _a.propertyName,
      propertyName = _b === void 0 ? '' : _b;
    // Detect whether transition may affect dimensions of an element.
    var isReflowProperty = transitionKeys.some(function (key) {
      return !!~propertyName.indexOf(key);
    });
    if (isReflowProperty) {
      this.refresh();
    }
  };
  /**
   * Returns instance of the ResizeObserverController.
   *
   * @returns {ResizeObserverController}
   */
  ResizeObserverController.getInstance = function () {
    if (!this.instance_) {
      this.instance_ = new ResizeObserverController();
    }
    return this.instance_;
  };
  /**
   * Holds reference to the controller's instance.
   *
   * @private {ResizeObserverController}
   */
  ResizeObserverController.instance_ = null;
  return ResizeObserverController;
})();

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = function (target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key = _a[_i];
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true,
    });
  }
  return target;
};

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = function (target) {
  // Assume that the element is an instance of Node, which means that it
  // has the "ownerDocument" property from which we can retrieve a
  // corresponding global object.
  var ownerGlobal =
    target && target.ownerDocument && target.ownerDocument.defaultView;
  // Return the local global object if it's not possible extract one from
  // provided element.
  return ownerGlobal || global$1;
};

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
  return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
  var positions = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }
  return positions.reduce(function (size, position) {
    var value = styles['border-' + position + '-width'];
    return size + toFloat(value);
  }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
  var positions = ['top', 'right', 'bottom', 'left'];
  var paddings = {};
  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i];
    var value = styles['padding-' + position];
    paddings[position] = toFloat(value);
  }
  return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
  // Client width & height properties can't be
  // used exclusively as they provide rounded values.
  var clientWidth = target.clientWidth,
    clientHeight = target.clientHeight;
  // By this condition we can catch all non-replaced inline, hidden and
  // detached elements. Though elements with width & height properties less
  // than 0.5 will be discarded as well.
  //
  // Without it we would need to implement separate methods for each of
  // those cases and it's not possible to perform a precise and performance
  // effective test for hidden elements. E.g. even jQuery's ':visible' filter
  // gives wrong results for elements with width & height less than 0.5.
  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }
  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom;
  // Computed styles of width & height are being used because they are the
  // only dimensions available to JS that contain non-rounded values. It could
  // be possible to utilize the getBoundingClientRect if only it's data wasn't
  // affected by CSS transformations let alone paddings, borders and scroll bars.
  var width = toFloat(styles.width),
    height = toFloat(styles.height);
  // Width & height include paddings and borders when the 'border-box' box
  // model is applied (except for IE).
  if (styles.boxSizing === 'border-box') {
    // Following conditions are required to handle Internet Explorer which
    // doesn't include paddings and borders to computed CSS dimensions.
    //
    // We can say that if CSS dimensions + paddings are equal to the "client"
    // properties then it's either IE, and thus we don't need to subtract
    // anything, or an element merely doesn't have paddings/borders styles.
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, 'left', 'right') + horizPad;
    }
    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
    }
  }
  // Following steps can't be applied to the document's root element as its
  // client[Width/Height] properties represent viewport area of the window.
  // Besides, it's as well not necessary as the <html> itself neither has
  // rendered scroll bars nor it can be clipped.
  if (!isDocumentElement(target)) {
    // In some browsers (only in Firefox, actually) CSS width & height
    // include scroll bars size which can be removed at this step as scroll
    // bars are the only difference between rounded dimensions + paddings
    // and "client" properties, though that is not always true in Chrome.
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight;
    // Chrome has a rather weird rounding of "client" properties.
    // E.g. for an element with content width of 314.2px it sometimes gives
    // the client width of 315px and for the width of 314.7px it may give
    // 314px. And it doesn't happen all the time. So just ignore this delta
    // as a non-relevant.
    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }
    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }
  return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
  // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
  // interface.
  if (typeof SVGGraphicsElement !== 'undefined') {
    return function (target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  }
  // If it's so, then check that element is at least an instance of the
  // SVGElement and that it has the "getBBox" method.
  // eslint-disable-next-line no-extra-parens
  return function (target) {
    return (
      target instanceof getWindowOf(target).SVGElement &&
      typeof target.getBBox === 'function'
    );
  };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }
  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }
  return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
  var x = _a.x,
    y = _a.y,
    width = _a.width,
    height = _a.height;
  // If DOMRectReadOnly is available use it as a prototype for the rectangle.
  var Constr =
    typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype);
  // Rectangle's properties are not writable and non-enumerable.
  defineConfigurable(rect, {
    x: x,
    y: y,
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x,
  });
  return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
  return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
  /**
   * Creates an instance of ResizeObservation.
   *
   * @param {Element} target - Element to be observed.
   */
  function ResizeObservation(target) {
    /**
     * Broadcasted width of content rectangle.
     *
     * @type {number}
     */
    this.broadcastWidth = 0;
    /**
     * Broadcasted height of content rectangle.
     *
     * @type {number}
     */
    this.broadcastHeight = 0;
    /**
     * Reference to the last observed content rectangle.
     *
     * @private {DOMRectInit}
     */
    this.contentRect_ = createRectInit(0, 0, 0, 0);
    this.target = target;
  }
  /**
   * Updates content rectangle and tells whether it's width or height properties
   * have changed since the last broadcast.
   *
   * @returns {boolean}
   */
  ResizeObservation.prototype.isActive = function () {
    var rect = getContentRect(this.target);
    this.contentRect_ = rect;
    return (
      rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight
    );
  };
  /**
   * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
   * from the corresponding properties of the last observed content rectangle.
   *
   * @returns {DOMRectInit} Last observed content rectangle.
   */
  ResizeObservation.prototype.broadcastRect = function () {
    var rect = this.contentRect_;
    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;
    return rect;
  };
  return ResizeObservation;
})();

var ResizeObserverEntry = /** @class */ (function () {
  /**
   * Creates an instance of ResizeObserverEntry.
   *
   * @param {Element} target - Element that is being observed.
   * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
   */
  function ResizeObserverEntry(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit);
    // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.
    defineConfigurable(this, { target: target, contentRect: contentRect });
  }
  return ResizeObserverEntry;
})();

var ResizeObserverSPI = /** @class */ (function () {
  /**
   * Creates a new instance of ResizeObserver.
   *
   * @param {ResizeObserverCallback} callback - Callback function that is invoked
   *      when one of the observed elements changes it's content dimensions.
   * @param {ResizeObserverController} controller - Controller instance which
   *      is responsible for the updates of observer.
   * @param {ResizeObserver} callbackCtx - Reference to the public
   *      ResizeObserver instance which will be passed to callback function.
   */
  function ResizeObserverSPI(callback, controller, callbackCtx) {
    /**
     * Collection of resize observations that have detected changes in dimensions
     * of elements.
     *
     * @private {Array<ResizeObservation>}
     */
    this.activeObservations_ = [];
    /**
     * Registry of the ResizeObservation instances.
     *
     * @private {Map<Element, ResizeObservation>}
     */
    this.observations_ = new MapShim();
    if (typeof callback !== 'function') {
      throw new TypeError(
        'The callback provided as parameter 1 is not a function.'
      );
    }
    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
  }
  /**
   * Starts observing provided element.
   *
   * @param {Element} target - Element to be observed.
   * @returns {void}
   */
  ResizeObserverSPI.prototype.observe = function (target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    }
    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
      return;
    }
    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }
    var observations = this.observations_;
    // Do nothing if element is already being observed.
    if (observations.has(target)) {
      return;
    }
    observations.set(target, new ResizeObservation(target));
    this.controller_.addObserver(this);
    // Force the update of observations.
    this.controller_.refresh();
  };
  /**
   * Stops observing provided element.
   *
   * @param {Element} target - Element to stop observing.
   * @returns {void}
   */
  ResizeObserverSPI.prototype.unobserve = function (target) {
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    }
    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
      return;
    }
    if (!(target instanceof getWindowOf(target).Element)) {
      throw new TypeError('parameter 1 is not of type "Element".');
    }
    var observations = this.observations_;
    // Do nothing if element is not being observed.
    if (!observations.has(target)) {
      return;
    }
    observations.delete(target);
    if (!observations.size) {
      this.controller_.removeObserver(this);
    }
  };
  /**
   * Stops observing all elements.
   *
   * @returns {void}
   */
  ResizeObserverSPI.prototype.disconnect = function () {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
  };
  /**
   * Collects observation instances the associated element of which has changed
   * it's content rectangle.
   *
   * @returns {void}
   */
  ResizeObserverSPI.prototype.gatherActive = function () {
    var _this = this;
    this.clearActive();
    this.observations_.forEach(function (observation) {
      if (observation.isActive()) {
        _this.activeObservations_.push(observation);
      }
    });
  };
  /**
   * Invokes initial callback function with a list of ResizeObserverEntry
   * instances collected from active resize observations.
   *
   * @returns {void}
   */
  ResizeObserverSPI.prototype.broadcastActive = function () {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
      return;
    }
    var ctx = this.callbackCtx_;
    // Create ResizeObserverEntry instance for every active observation.
    var entries = this.activeObservations_.map(function (observation) {
      return new ResizeObserverEntry(
        observation.target,
        observation.broadcastRect()
      );
    });
    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
  };
  /**
   * Clears the collection of active observations.
   *
   * @returns {void}
   */
  ResizeObserverSPI.prototype.clearActive = function () {
    this.activeObservations_.splice(0);
  };
  /**
   * Tells whether observer has active observations.
   *
   * @returns {boolean}
   */
  ResizeObserverSPI.prototype.hasActive = function () {
    return this.activeObservations_.length > 0;
  };
  return ResizeObserverSPI;
})();

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver$2 = /** @class */ (function () {
  /**
   * Creates a new instance of ResizeObserver.
   *
   * @param {ResizeObserverCallback} callback - Callback that is invoked when
   *      dimensions of the observed elements change.
   */
  function ResizeObserver(callback) {
    if (!(this instanceof ResizeObserver)) {
      throw new TypeError('Cannot call a class as a function.');
    }
    if (!arguments.length) {
      throw new TypeError('1 argument required, but only 0 present.');
    }
    var controller = ResizeObserverController.getInstance();
    var observer = new ResizeObserverSPI(callback, controller, this);
    observers.set(this, observer);
  }
  return ResizeObserver;
})();
// Expose public methods of ResizeObserver.
['observe', 'unobserve', 'disconnect'].forEach(function (method) {
  ResizeObserver$2.prototype[method] = function () {
    var _a;
    return (_a = observers.get(this))[method].apply(_a, arguments);
  };
});

var index = (function () {
  // Export existing implementation if available.
  if (typeof global$1.ResizeObserver !== 'undefined') {
    return global$1.ResizeObserver;
  }
  return ResizeObserver$2;
})();

// =============================== Const ===============================
var elementListeners = new Map();
function onResize(entities) {
  entities.forEach(function (entity) {
    var _elementListeners$get;
    var target = entity.target;
    (_elementListeners$get = elementListeners.get(target)) === null ||
      _elementListeners$get === void 0 ||
      _elementListeners$get.forEach(function (listener) {
        return listener(target);
      });
  });
}

// Note: ResizeObserver polyfill not support option to measure border-box resize
var resizeObserver = new index(onResize);

// Dev env only
process.env.NODE_ENV !== 'production' ? elementListeners : null; // eslint-disable-line
process.env.NODE_ENV !== 'production' ? onResize : null; // eslint-disable-line

// ============================== Observe ==============================
function observe(element, callback) {
  if (!elementListeners.has(element)) {
    elementListeners.set(element, new Set());
    resizeObserver.observe(element);
  }
  elementListeners.get(element).add(callback);
}
function unobserve(element, callback) {
  if (elementListeners.has(element)) {
    elementListeners.get(element).delete(callback);
    if (!elementListeners.get(element).size) {
      resizeObserver.unobserve(element);
      elementListeners.delete(element);
    }
  }
}

function _classCallCheck(a, n) {
  if (!(a instanceof n))
    throw new TypeError('Cannot call a class as a function');
}

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    ((o.enumerable = o.enumerable || false),
      (o.configurable = true),
      'value' in o && (o.writable = true),
      Object.defineProperty(e, toPropertyKey(o.key), o));
  }
}
function _createClass(e, r, t) {
  return (
    r && _defineProperties(e.prototype, r),
    Object.defineProperty(e, 'prototype', {
      writable: false,
    }),
    e
  );
}

function _setPrototypeOf(t, e) {
  return (
    (_setPrototypeOf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return ((t.__proto__ = e), t);
        }),
    _setPrototypeOf(t, e)
  );
}

function _inherits(t, e) {
  if ('function' != typeof e && null !== e)
    throw new TypeError('Super expression must either be null or a function');
  ((t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: true,
      configurable: true,
    },
  })),
    Object.defineProperty(t, 'prototype', {
      writable: false,
    }),
    e && _setPrototypeOf(t, e));
}

function _getPrototypeOf(t) {
  return (
    (_getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        }),
    _getPrototypeOf(t)
  );
}

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}

function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}

function _possibleConstructorReturn(t, e) {
  if (e && ('object' == _typeof(e) || 'function' == typeof e)) return e;
  if (void 0 !== e)
    throw new TypeError(
      'Derived constructors may only return object or undefined'
    );
  return _assertThisInitialized(t);
}

function _createSuper(t) {
  var r = _isNativeReflectConstruct();
  return function () {
    var e,
      o = _getPrototypeOf(t);
    if (r) {
      var s = _getPrototypeOf(this).constructor;
      e = Reflect.construct(o, arguments, s);
    } else e = o.apply(this, arguments);
    return _possibleConstructorReturn(this, e);
  };
}

/**
 * Fallback to findDOMNode if origin ref do not provide any dom element
 */
var DomWrapper = /*#__PURE__*/ (function (_React$Component) {
  _inherits(DomWrapper, _React$Component);
  var _super = _createSuper(DomWrapper);
  function DomWrapper() {
    _classCallCheck(this, DomWrapper);
    return _super.apply(this, arguments);
  }
  _createClass(DomWrapper, [
    {
      key: 'render',
      value: function render() {
        return this.props.children;
      },
    },
  ]);
  return DomWrapper;
})(React.Component);

function SingleObserver(props, ref) {
  var children = props.children,
    disabled = props.disabled;
  var elementRef = React.useRef(null);
  var wrapperRef = React.useRef(null);
  var onCollectionResize = React.useContext(CollectionContext);

  // =========================== Children ===========================
  var isRenderProps = typeof children === 'function';
  var mergedChildren = isRenderProps ? children(elementRef) : children;

  // ============================= Size =============================
  var sizeRef = React.useRef({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1,
  });

  // ============================= Ref ==============================
  var canRef =
    !isRenderProps &&
    /*#__PURE__*/ React.isValidElement(mergedChildren) &&
    supportRef(mergedChildren);
  var originRef = canRef ? getNodeRef(mergedChildren) : null;
  var mergedRef = useComposeRef(originRef, elementRef);
  var getDom = function getDom() {
    var _elementRef$current;
    return (
      findDOMNode(elementRef.current) ||
      // Support `nativeElement` format
      (elementRef.current && _typeof(elementRef.current) === 'object'
        ? findDOMNode(
            (_elementRef$current = elementRef.current) === null ||
              _elementRef$current === void 0
              ? void 0
              : _elementRef$current.nativeElement
          )
        : null) ||
      findDOMNode(wrapperRef.current)
    );
  };
  React.useImperativeHandle(ref, function () {
    return getDom();
  });

  // =========================== Observe ============================
  var propsRef = React.useRef(props);
  propsRef.current = props;

  // Handler
  var onInternalResize = React.useCallback(function (target) {
    var _propsRef$current = propsRef.current,
      onResize = _propsRef$current.onResize,
      data = _propsRef$current.data;
    var _target$getBoundingCl = target.getBoundingClientRect(),
      width = _target$getBoundingCl.width,
      height = _target$getBoundingCl.height;
    var offsetWidth = target.offsetWidth,
      offsetHeight = target.offsetHeight;

    /**
     * Resize observer trigger when content size changed.
     * In most case we just care about element size,
     * let's use `boundary` instead of `contentRect` here to avoid shaking.
     */
    var fixedWidth = Math.floor(width);
    var fixedHeight = Math.floor(height);
    if (
      sizeRef.current.width !== fixedWidth ||
      sizeRef.current.height !== fixedHeight ||
      sizeRef.current.offsetWidth !== offsetWidth ||
      sizeRef.current.offsetHeight !== offsetHeight
    ) {
      var size = {
        width: fixedWidth,
        height: fixedHeight,
        offsetWidth: offsetWidth,
        offsetHeight: offsetHeight,
      };
      sizeRef.current = size;

      // IE is strange, right?
      var mergedOffsetWidth =
        offsetWidth === Math.round(width) ? width : offsetWidth;
      var mergedOffsetHeight =
        offsetHeight === Math.round(height) ? height : offsetHeight;
      var sizeInfo = _objectSpread2(
        _objectSpread2({}, size),
        {},
        {
          offsetWidth: mergedOffsetWidth,
          offsetHeight: mergedOffsetHeight,
        }
      );

      // Let collection know what happened
      onCollectionResize === null ||
        onCollectionResize === void 0 ||
        onCollectionResize(sizeInfo, target, data);
      if (onResize) {
        // defer the callback but not defer to next frame
        Promise.resolve().then(function () {
          onResize(sizeInfo, target);
        });
      }
    }
  }, []);

  // Dynamic observe
  React.useEffect(
    function () {
      var currentElement = getDom();
      if (currentElement && !disabled) {
        observe(currentElement, onInternalResize);
      }
      return function () {
        return unobserve(currentElement, onInternalResize);
      };
    },
    [elementRef.current, disabled]
  );

  // ============================ Render ============================
  return /*#__PURE__*/ React.createElement(
    DomWrapper,
    {
      ref: wrapperRef,
    },
    canRef
      ? /*#__PURE__*/ React.cloneElement(mergedChildren, {
          ref: mergedRef,
        })
      : mergedChildren
  );
}
var RefSingleObserver = /*#__PURE__*/ React.forwardRef(SingleObserver);
if (process.env.NODE_ENV !== 'production') {
  RefSingleObserver.displayName = 'SingleObserver';
}

var INTERNAL_PREFIX_KEY = 'rc-observer-key';
function ResizeObserver$1(props, ref) {
  var children = props.children;
  var childNodes =
    typeof children === 'function' ? [children] : toArray(children);
  if (process.env.NODE_ENV !== 'production') {
    if (childNodes.length > 1) {
      warning(
        false,
        'Find more than one child node with `children` in ResizeObserver. Please use ResizeObserver.Collection instead.'
      );
    } else if (childNodes.length === 0) {
      warning(
        false,
        '`children` of ResizeObserver is empty. Nothing is in observe.'
      );
    }
  }
  return childNodes.map(function (child, index) {
    var key =
      (child === null || child === void 0 ? void 0 : child.key) ||
      ''.concat(INTERNAL_PREFIX_KEY, '-').concat(index);
    return /*#__PURE__*/ React.createElement(
      RefSingleObserver,
      _extends({}, props, {
        key: key,
        ref: index === 0 ? ref : undefined,
      }),
      child
    );
  });
}
var RefResizeObserver = /*#__PURE__*/ React.forwardRef(ResizeObserver$1);
if (process.env.NODE_ENV !== 'production') {
  RefResizeObserver.displayName = 'ResizeObserver';
}
RefResizeObserver.Collection = Collection;

var raf = function raf(callback) {
  return +setTimeout(callback, 16);
};
var caf = function caf(num) {
  return clearTimeout(num);
};
if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
  raf = function raf(callback) {
    return window.requestAnimationFrame(callback);
  };
  caf = function caf(handle) {
    return window.cancelAnimationFrame(handle);
  };
}
var rafUUID = 0;
var rafIds = new Map();
function cleanup(id) {
  rafIds.delete(id);
}
var wrapperRaf = function wrapperRaf(callback) {
  var times =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  rafUUID += 1;
  var id = rafUUID;
  function callRef(leftTimes) {
    if (leftTimes === 0) {
      // Clean up
      cleanup(id);

      // Trigger
      callback();
    } else {
      // Next raf
      var realId = raf(function () {
        callRef(leftTimes - 1);
      });

      // Bind real raf id
      rafIds.set(id, realId);
    }
  }
  callRef(times);
  return id;
};
wrapperRaf.cancel = function (id) {
  var realId = rafIds.get(id);
  cleanup(id);
  return caf(realId);
};
if (process.env.NODE_ENV !== 'production') {
  wrapperRaf.ids = function () {
    return rafIds;
  };
}

// Thanks to https://github.com/andreypopp/react-textarea-autosize/

/**
 * calculateNodeHeight(uiTextNode, useCache = false)
 */

var HIDDEN_TEXTAREA_STYLE =
  '\n  min-height:0 !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important;\n  pointer-events: none !important;\n';
var SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'font-variant',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
  'word-break',
  'white-space',
];
var computedStyleCache = {};
var hiddenTextarea;
function calculateNodeStyling(node) {
  var useCache =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var nodeRef =
    node.getAttribute('id') ||
    node.getAttribute('data-reactid') ||
    node.getAttribute('name');
  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef];
  }
  var style = window.getComputedStyle(node);
  var boxSizing =
    style.getPropertyValue('box-sizing') ||
    style.getPropertyValue('-moz-box-sizing') ||
    style.getPropertyValue('-webkit-box-sizing');
  var paddingSize =
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'));
  var borderSize =
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'));
  var sizingStyle = SIZING_STYLE.map(function (name) {
    return ''.concat(name, ':').concat(style.getPropertyValue(name));
  }).join(';');
  var nodeInfo = {
    sizingStyle: sizingStyle,
    paddingSize: paddingSize,
    borderSize: borderSize,
    boxSizing: boxSizing,
  };
  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }
  return nodeInfo;
}
function calculateAutoSizeStyle(uiTextNode) {
  var useCache =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var minRows =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var maxRows =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.setAttribute('tab-index', '-1');
    hiddenTextarea.setAttribute('aria-hidden', 'true');
    // fix: A form field element should have an id or name attribute
    // A form field element has neither an id nor a name attribute. This might prevent the browser from correctly autofilling the form.
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
    hiddenTextarea.setAttribute('name', 'hiddenTextarea');
    document.body.appendChild(hiddenTextarea);
  }

  // Fix wrap="off" issue
  // https://github.com/ant-design/ant-design/issues/6577
  if (uiTextNode.getAttribute('wrap')) {
    hiddenTextarea.setAttribute('wrap', uiTextNode.getAttribute('wrap'));
  } else {
    hiddenTextarea.removeAttribute('wrap');
  }

  // Copy all CSS properties that have an impact on the height of the content in
  // the textbox
  var _calculateNodeStyling = calculateNodeStyling(uiTextNode, useCache),
    paddingSize = _calculateNodeStyling.paddingSize,
    borderSize = _calculateNodeStyling.borderSize,
    boxSizing = _calculateNodeStyling.boxSizing,
    sizingStyle = _calculateNodeStyling.sizingStyle;

  // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be
  // narrower for content
  hiddenTextarea.setAttribute(
    'style',
    ''.concat(sizingStyle, ';').concat(HIDDEN_TEXTAREA_STYLE)
  );
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || '';
  var minHeight = undefined;
  var maxHeight = undefined;
  var overflowY;
  var height = hiddenTextarea.scrollHeight;
  if (boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    height += borderSize;
  } else if (boxSizing === 'content-box') {
    // remove padding, since height = content
    height -= paddingSize;
  }
  if (minRows !== null || maxRows !== null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = ' ';
    var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      overflowY = height > maxHeight ? '' : 'hidden';
      height = Math.min(maxHeight, height);
    }
  }
  var style = {
    height: height,
    overflowY: overflowY,
    resize: 'none',
  };
  if (minHeight) {
    style.minHeight = minHeight;
  }
  if (maxHeight) {
    style.maxHeight = maxHeight;
  }
  return style;
}

var _excluded$1 = [
  'prefixCls',
  'defaultValue',
  'value',
  'autoSize',
  'onResize',
  'className',
  'style',
  'disabled',
  'onChange',
  'onInternalAutoSize',
];
var RESIZE_START = 0;
var RESIZE_MEASURING = 1;
var RESIZE_STABLE = 2;
var ResizableTextArea = /*#__PURE__*/ React.forwardRef(function (props, ref) {
  var _ref = props,
    prefixCls = _ref.prefixCls,
    defaultValue = _ref.defaultValue,
    value = _ref.value,
    autoSize = _ref.autoSize,
    onResize = _ref.onResize,
    className = _ref.className,
    style = _ref.style,
    disabled = _ref.disabled,
    onChange = _ref.onChange,
    onInternalAutoSize = _ref.onInternalAutoSize,
    restProps = _objectWithoutProperties(_ref, _excluded$1);

  // =============================== Value ================================
  var _useMergedState = useMergedState(defaultValue, {
      value: value,
      postState: function postState(val) {
        return val !== null && val !== void 0 ? val : '';
      },
    }),
    _useMergedState2 = _slicedToArray(_useMergedState, 2),
    mergedValue = _useMergedState2[0],
    setMergedValue = _useMergedState2[1];
  var onInternalChange = function onInternalChange(event) {
    setMergedValue(event.target.value);
    onChange === null || onChange === void 0 || onChange(event);
  };

  // ================================ Ref =================================
  var textareaRef = React.useRef();
  React.useImperativeHandle(ref, function () {
    return {
      textArea: textareaRef.current,
    };
  });

  // ============================== AutoSize ==============================
  var _React$useMemo = React.useMemo(
      function () {
        if (autoSize && _typeof(autoSize) === 'object') {
          return [autoSize.minRows, autoSize.maxRows];
        }
        return [];
      },
      [autoSize]
    ),
    _React$useMemo2 = _slicedToArray(_React$useMemo, 2),
    minRows = _React$useMemo2[0],
    maxRows = _React$useMemo2[1];
  var needAutoSize = !!autoSize;

  // =============================== Scroll ===============================
  // https://github.com/ant-design/ant-design/issues/21870
  var fixFirefoxAutoScroll = function fixFirefoxAutoScroll() {
    try {
      var isFirefox = navigator.userAgent.includes('Firefox');
      // FF has bug with jump of scroll to top. We force back here.
      if (isFirefox && document.activeElement === textareaRef.current) {
        var _textareaRef$current = textareaRef.current,
          scrollTop = _textareaRef$current.scrollTop,
          selectionStart = _textareaRef$current.selectionStart,
          selectionEnd = _textareaRef$current.selectionEnd;

        // Fix Safari bug which not rollback when break line
        // This makes Chinese IME can't input. Do not fix this
        // const { value: tmpValue } = textareaRef.current;
        // textareaRef.current.value = '';
        // textareaRef.current.value = tmpValue;

        textareaRef.current.setSelectionRange(selectionStart, selectionEnd);
        textareaRef.current.scrollTop = scrollTop;
      }
    } catch (e) {
      // Fix error in Chrome:
      // Failed to read the 'selectionStart' property from 'HTMLInputElement'
      // http://stackoverflow.com/q/21177489/3040605
    }
  };

  // =============================== Resize ===============================
  var _React$useState = React.useState(RESIZE_STABLE),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    resizeState = _React$useState2[0],
    setResizeState = _React$useState2[1];
  var _React$useState3 = React.useState(),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    autoSizeStyle = _React$useState4[0],
    setAutoSizeStyle = _React$useState4[1];
  var startResize = function startResize() {
    setResizeState(RESIZE_START);
    if (process.env.NODE_ENV === 'test') {
      onInternalAutoSize === null ||
        onInternalAutoSize === void 0 ||
        onInternalAutoSize();
    }
  };

  // Change to trigger resize measure
  useLayoutEffect(
    function () {
      if (needAutoSize) {
        startResize();
      }
    },
    [value, minRows, maxRows, needAutoSize]
  );
  useLayoutEffect(
    function () {
      if (resizeState === RESIZE_START) {
        setResizeState(RESIZE_MEASURING);
      } else if (resizeState === RESIZE_MEASURING) {
        var textareaStyles = calculateAutoSizeStyle(
          textareaRef.current,
          false,
          minRows,
          maxRows
        );

        // Safari has bug that text will keep break line on text cut when it's prev is break line.
        // ZombieJ: This not often happen. So we just skip it.
        // const { selectionStart, selectionEnd, scrollTop } = textareaRef.current;
        // const { value: tmpValue } = textareaRef.current;
        // textareaRef.current.value = '';
        // textareaRef.current.value = tmpValue;

        // if (document.activeElement === textareaRef.current) {
        //   textareaRef.current.scrollTop = scrollTop;
        //   textareaRef.current.setSelectionRange(selectionStart, selectionEnd);
        // }

        setResizeState(RESIZE_STABLE);
        setAutoSizeStyle(textareaStyles);
      } else {
        fixFirefoxAutoScroll();
      }
    },
    [resizeState]
  );

  // We lock resize trigger by raf to avoid Safari warning
  var resizeRafRef = React.useRef();
  var cleanRaf = function cleanRaf() {
    wrapperRaf.cancel(resizeRafRef.current);
  };
  var onInternalResize = function onInternalResize(size) {
    if (resizeState === RESIZE_STABLE) {
      onResize === null || onResize === void 0 || onResize(size);
      if (autoSize) {
        cleanRaf();
        resizeRafRef.current = wrapperRaf(function () {
          startResize();
        });
      }
    }
  };
  React.useEffect(function () {
    return cleanRaf;
  }, []);

  // =============================== Render ===============================
  var mergedAutoSizeStyle = needAutoSize ? autoSizeStyle : null;
  var mergedStyle = _objectSpread2(
    _objectSpread2({}, style),
    mergedAutoSizeStyle
  );
  if (resizeState === RESIZE_START || resizeState === RESIZE_MEASURING) {
    mergedStyle.overflowY = 'hidden';
    mergedStyle.overflowX = 'hidden';
  }
  return /*#__PURE__*/ React.createElement(
    RefResizeObserver,
    {
      onResize: onInternalResize,
      disabled: !(autoSize || onResize),
    },
    /*#__PURE__*/ React.createElement(
      'textarea',
      _extends({}, restProps, {
        ref: textareaRef,
        style: mergedStyle,
        className: clsx(
          prefixCls,
          className,
          _defineProperty({}, ''.concat(prefixCls, '-disabled'), disabled)
        ),
        disabled: disabled,
        value: mergedValue,
        onChange: onInternalChange,
      })
    )
  );
});

var _excluded = [
  'defaultValue',
  'value',
  'onFocus',
  'onBlur',
  'onChange',
  'allowClear',
  'maxLength',
  'onCompositionStart',
  'onCompositionEnd',
  'suffix',
  'prefixCls',
  'showCount',
  'count',
  'className',
  'style',
  'disabled',
  'hidden',
  'classNames',
  'styles',
  'onResize',
  'onClear',
  'onPressEnter',
  'readOnly',
  'autoSize',
  'onKeyDown',
];
var TextArea = /*#__PURE__*/ React__default.forwardRef(function (_ref, ref) {
  var _countConfig$max;
  var defaultValue = _ref.defaultValue,
    customValue = _ref.value,
    onFocus = _ref.onFocus,
    onBlur = _ref.onBlur,
    onChange = _ref.onChange,
    allowClear = _ref.allowClear,
    maxLength = _ref.maxLength,
    onCompositionStart = _ref.onCompositionStart,
    onCompositionEnd = _ref.onCompositionEnd,
    suffix = _ref.suffix,
    _ref$prefixCls = _ref.prefixCls,
    prefixCls = _ref$prefixCls === void 0 ? 'rc-textarea' : _ref$prefixCls,
    showCount = _ref.showCount,
    count = _ref.count,
    className = _ref.className,
    style = _ref.style,
    disabled = _ref.disabled,
    hidden = _ref.hidden,
    classNames = _ref.classNames,
    styles = _ref.styles,
    onResize = _ref.onResize,
    onClear = _ref.onClear,
    onPressEnter = _ref.onPressEnter,
    readOnly = _ref.readOnly,
    autoSize = _ref.autoSize,
    onKeyDown = _ref.onKeyDown,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useMergedState = useMergedState(defaultValue, {
      value: customValue,
      defaultValue: defaultValue,
    }),
    _useMergedState2 = _slicedToArray(_useMergedState, 2),
    value = _useMergedState2[0],
    setValue = _useMergedState2[1];
  var formatValue = value === undefined || value === null ? '' : String(value);
  var _React$useState = React__default.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focused = _React$useState2[0],
    setFocused = _React$useState2[1];
  var compositionRef = React__default.useRef(false);
  var _React$useState3 = React__default.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    textareaResized = _React$useState4[0],
    setTextareaResized = _React$useState4[1];

  // =============================== Ref ================================
  var holderRef = useRef(null);
  var resizableTextAreaRef = useRef(null);
  var getTextArea = function getTextArea() {
    var _resizableTextAreaRef;
    return (_resizableTextAreaRef = resizableTextAreaRef.current) === null ||
      _resizableTextAreaRef === void 0
      ? void 0
      : _resizableTextAreaRef.textArea;
  };
  var focus = function focus() {
    getTextArea().focus();
  };
  useImperativeHandle(ref, function () {
    var _holderRef$current;
    return {
      resizableTextArea: resizableTextAreaRef.current,
      focus: focus,
      blur: function blur() {
        getTextArea().blur();
      },
      nativeElement:
        ((_holderRef$current = holderRef.current) === null ||
        _holderRef$current === void 0
          ? void 0
          : _holderRef$current.nativeElement) || getTextArea(),
    };
  });
  useEffect(
    function () {
      setFocused(function (prev) {
        return !disabled && prev;
      });
    },
    [disabled]
  );

  // =========================== Select Range ===========================
  var _React$useState5 = React__default.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    selection = _React$useState6[0],
    setSelection = _React$useState6[1];
  React__default.useEffect(
    function () {
      if (selection) {
        var _getTextArea;
        (_getTextArea = getTextArea()).setSelectionRange.apply(
          _getTextArea,
          _toConsumableArray(selection)
        );
      }
    },
    [selection]
  );

  // ============================== Count ===============================
  var countConfig = useCount(count, showCount);
  var mergedMax =
    (_countConfig$max = countConfig.max) !== null && _countConfig$max !== void 0
      ? _countConfig$max
      : maxLength;

  // Max length value
  var hasMaxLength = Number(mergedMax) > 0;
  var valueLength = countConfig.strategy(formatValue);
  var isOutOfRange = !!mergedMax && valueLength > mergedMax;

  // ============================== Change ==============================
  var triggerChange = function triggerChange(e, currentValue) {
    var cutValue = currentValue;
    if (
      !compositionRef.current &&
      countConfig.exceedFormatter &&
      countConfig.max &&
      countConfig.strategy(currentValue) > countConfig.max
    ) {
      cutValue = countConfig.exceedFormatter(currentValue, {
        max: countConfig.max,
      });
      if (currentValue !== cutValue) {
        setSelection([
          getTextArea().selectionStart || 0,
          getTextArea().selectionEnd || 0,
        ]);
      }
    }
    setValue(cutValue);
    resolveOnChange(e.currentTarget, e, onChange, cutValue);
  };

  // =========================== Value Update ===========================
  var onInternalCompositionStart = function onInternalCompositionStart(e) {
    compositionRef.current = true;
    onCompositionStart === null ||
      onCompositionStart === void 0 ||
      onCompositionStart(e);
  };
  var onInternalCompositionEnd = function onInternalCompositionEnd(e) {
    compositionRef.current = false;
    triggerChange(e, e.currentTarget.value);
    onCompositionEnd === null ||
      onCompositionEnd === void 0 ||
      onCompositionEnd(e);
  };
  var onInternalChange = function onInternalChange(e) {
    triggerChange(e, e.target.value);
  };
  var handleKeyDown = function handleKeyDown(e) {
    if (e.key === 'Enter' && onPressEnter) {
      onPressEnter(e);
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(e);
  };
  var handleFocus = function handleFocus(e) {
    setFocused(true);
    onFocus === null || onFocus === void 0 || onFocus(e);
  };
  var handleBlur = function handleBlur(e) {
    setFocused(false);
    onBlur === null || onBlur === void 0 || onBlur(e);
  };

  // ============================== Reset ===============================
  var handleReset = function handleReset(e) {
    setValue('');
    focus();
    resolveOnChange(getTextArea(), e, onChange);
  };
  var suffixNode = suffix;
  var dataCount;
  if (countConfig.show) {
    if (countConfig.showFormatter) {
      dataCount = countConfig.showFormatter({
        value: formatValue,
        count: valueLength,
        maxLength: mergedMax,
      });
    } else {
      dataCount = ''
        .concat(valueLength)
        .concat(hasMaxLength ? ' / '.concat(mergedMax) : '');
    }
    suffixNode = /*#__PURE__*/ React__default.createElement(
      React__default.Fragment,
      null,
      suffixNode,
      /*#__PURE__*/ React__default.createElement(
        'span',
        {
          className: clsx(
            ''.concat(prefixCls, '-data-count'),
            classNames === null || classNames === void 0
              ? void 0
              : classNames.count
          ),
          style: styles === null || styles === void 0 ? void 0 : styles.count,
        },
        dataCount
      )
    );
  }
  var handleResize = function handleResize(size) {
    var _getTextArea2;
    onResize === null || onResize === void 0 || onResize(size);
    if (
      (_getTextArea2 = getTextArea()) !== null &&
      _getTextArea2 !== void 0 &&
      _getTextArea2.style.height
    ) {
      setTextareaResized(true);
    }
  };
  var isPureTextArea = !autoSize && !showCount && !allowClear;
  return /*#__PURE__*/ React__default.createElement(
    BaseInput,
    {
      ref: holderRef,
      value: formatValue,
      allowClear: allowClear,
      handleReset: handleReset,
      suffix: suffixNode,
      prefixCls: prefixCls,
      classNames: _objectSpread2(
        _objectSpread2({}, classNames),
        {},
        {
          affixWrapper: clsx(
            classNames === null || classNames === void 0
              ? void 0
              : classNames.affixWrapper,
            _defineProperty(
              _defineProperty(
                {},
                ''.concat(prefixCls, '-show-count'),
                showCount
              ),
              ''.concat(prefixCls, '-textarea-allow-clear'),
              allowClear
            )
          ),
        }
      ),
      disabled: disabled,
      focused: focused,
      className: clsx(
        className,
        isOutOfRange && ''.concat(prefixCls, '-out-of-range')
      ),
      style: _objectSpread2(
        _objectSpread2({}, style),
        textareaResized && !isPureTextArea
          ? {
              height: 'auto',
            }
          : {}
      ),
      dataAttrs: {
        affixWrapper: {
          'data-count': typeof dataCount === 'string' ? dataCount : undefined,
        },
      },
      hidden: hidden,
      readOnly: readOnly,
      onClear: onClear,
    },
    /*#__PURE__*/ React__default.createElement(
      ResizableTextArea,
      _extends({}, rest, {
        autoSize: autoSize,
        maxLength: maxLength,
        onKeyDown: handleKeyDown,
        onChange: onInternalChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onCompositionStart: onInternalCompositionStart,
        onCompositionEnd: onInternalCompositionEnd,
        className: clsx(
          classNames === null || classNames === void 0
            ? void 0
            : classNames.textarea
        ),
        style: _objectSpread2(
          _objectSpread2(
            {},
            styles === null || styles === void 0 ? void 0 : styles.textarea
          ),
          {},
          {
            resize: style === null || style === void 0 ? void 0 : style.resize,
          }
        ),
        disabled: disabled,
        prefixCls: prefixCls,
        onResize: handleResize,
        ref: resizableTextAreaRef,
        readOnly: readOnly,
      })
    )
  );
});

var styles$5 = {
  textareaContainer: 'Textarea-module__textareaContainer___HNQbK',
};

const Textarea = memo(
  forwardRef(
    (
      { className = '', disabled, error, startIcon, endIcon, ...props },
      ref
    ) => {
      return jsxRuntimeExports.jsxs('div', {
        className: `${styles$5.textareaContainer} ${error ? 'c-textarea-error' : ''} ${disabled ? 'c-textarea-disabled' : ''} ${className}`,
        children: [
          startIcon &&
            jsxRuntimeExports.jsx('span', {
              className: 'c-textarea-start-icon',
              children: startIcon,
            }),
          jsxRuntimeExports.jsx(TextArea, {
            ref: ref,
            disabled: disabled,
            ...props,
          }),
          endIcon &&
            jsxRuntimeExports.jsx('span', {
              className: 'c-textarea-end-icon',
              children: endIcon,
            }),
        ],
      });
    }
  )
);

var styles$4 = { avatar: 'Avatar-module__avatar___9LUr-' };

const Avatar = ({
  children,
  className = '',
  src,
  alt,
  title,
  defaultAvatar,
  shape = 'circle',
  imageSize = 40,
  size = imageSize ? 'custom' : 'small',
  ...props
}) => {
  return jsxRuntimeExports.jsxs('div', {
    className: `${styles$4.avatar} c-avatar-${shape} c-avatar-${size} ${className}`,
    ...props,
    children: [
      src &&
        jsxRuntimeExports.jsx('img', {
          className: 'c-avatar-image',
          src: src,
          alt: alt,
          title: title,
          style: {
            width: imageSize,
            height: imageSize,
          },
        }),
      defaultAvatar && defaultAvatar,
      children,
    ],
  });
};

var styles$3 = {
  message: 'Message-module__message___wukte',
  messageImage: 'Message-module__messageImage___MrErV',
  messageVideo: 'Message-module__messageVideo___GpV6K',
};

const TextMessage = ({
  className = '',
  message,
  children,
  position = 'normal',
  onClick,
  ...props
}) => {
  return jsxRuntimeExports.jsxs('div', {
    className: `${styles$3.message} c-message-${position} ${className}`,
    onClick: onClick,
    ...props,
    children: [
      jsxRuntimeExports.jsx('span', {
        className: 'c-message-text',
        children: message,
      }),
      children,
    ],
  });
};

const ImageMessage = ({
  className = '',
  imageUrl,
  children,
  size = 'small',
  onClick,
  ...props
}) => {
  return jsxRuntimeExports.jsxs('div', {
    className: `${styles$3.messageImage} c-message-image-${size} ${className}`,
    onClick: onClick,
    ...props,
    children: [
      jsxRuntimeExports.jsx('img', { src: imageUrl, alt: 'message' }),
      children,
    ],
  });
};

const VideoMessage = ({
  className = '',
  children,
  thumbnailUrl,
  onClick,
  hasLock = true,
  customThumbnail,
  ...props
}) => {
  return jsxRuntimeExports.jsx('div', {
    className: `${styles$3.messageVideo} ${className}`,
    onClick: onClick,
    ...props,
    children: hasLock
      ? customThumbnail ||
        jsxRuntimeExports.jsx('img', { src: thumbnailUrl, alt: 'message' })
      : jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
          children: children,
        }),
  });
};

var style = { topInfo: 'TopInfo-module__topInfo___BDy95' };

const TopInfo = ({
  avatar,
  name,
  role,
  children,
  avatarSize = 'large',
  className = '',
  ...props
}) => {
  return jsxRuntimeExports.jsxs('div', {
    className: cn$2(style.topInfo, className),
    ...props,
    children: [
      jsxRuntimeExports.jsxs('div', {
        className: 'c-top-info-user-section',
        children: [
          jsxRuntimeExports.jsx(Avatar, {
            src: avatar,
            size: avatarSize,
            className: 'c-top-info-avatar',
          }),
          jsxRuntimeExports.jsxs('div', {
            className: 'c-top-info-name-and-role',
            children: [
              jsxRuntimeExports.jsx('span', {
                className: 'c-top-info-name',
                children: name,
              }),
              jsxRuntimeExports.jsx(Badge, { children: role }),
            ],
          }),
        ],
      }),
      children,
    ],
  });
};

var styles$2 = {
  chatboxLayoutContainer:
    'ChatboxLayout-module__chatboxLayoutContainer___1XhgN',
};

const ChatboxLayout = memo(props => {
  const {
    layoutHeight = '100dvh',
    className = '',
    backgroundColor,
    backgroundImage,
    topInfoComponentOverride,
    style = {},
    showTopInfo = false,
    headerComponent,
    topInfoProps,
    messageComponent,
    composerComponent,
    ...rest
  } = props;
  const [composerHeight, setComposerHeight] = useState(0);
  const [firstRender, setFirstRender] = useState(true);
  const backgroundStyle = useMemo$1(
    () => ({
      backgroundColor: backgroundColor || 'var(--chatbox-bg-color, #fff)',
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      backgroundSize: backgroundImage ? 'cover' : undefined,
      backgroundRepeat: backgroundImage ? 'no-repeat' : undefined,
    }),
    [backgroundColor, backgroundImage]
  );
  const mergedStyle = useMemo$1(
    () => ({
      ...backgroundStyle,
      ...style,
      height: `calc(${layoutHeight} - ${composerHeight}px)`,
      // add transition to the height of the messages container
      // when composer height changed
      transition: !firstRender ? 'height 0.3s ease-in-out' : undefined,
    }),
    [backgroundStyle, style, layoutHeight, composerHeight, firstRender]
  );
  const renderTopInfo = () => {
    if (!showTopInfo) return null;
    return (
      topInfoComponentOverride ||
      jsxRuntimeExports.jsx(TopInfo, {
        className: 'c-chatbox-top-info',
        ...topInfoProps,
      })
    );
  };
  useEffect(() => {
    const composer = document.querySelector('.c-chatbox-layout-composer');
    if (composer) {
      const resizeObserver = new ResizeObserver(() => {
        setComposerHeight(composer.clientHeight ?? 44);
      });
      resizeObserver.observe(composer);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [layoutHeight]);
  // set first render to false after 50ms
  useEffect(() => {
    const timeout = setTimeout(() => setFirstRender(false), 50);
    return () => clearTimeout(timeout);
  }, []);
  return jsxRuntimeExports.jsxs('div', {
    className: `${styles$2.chatboxLayoutContainer} c-chatbox-layout-container ${className}`,
    style: { height: layoutHeight },
    ...rest,
    children: [
      headerComponent,
      jsxRuntimeExports.jsxs('div', {
        className: 'c-chatbox-layout',
        style: mergedStyle,
        children: [renderTopInfo(), messageComponent],
      }),
      jsxRuntimeExports.jsx('div', {
        className: 'c-chatbox-layout-composer',
        children: composerComponent,
      }),
    ],
  });
});

var styles$1 = {
  chatboxComposer: 'ChatboxComposer-module__chatboxComposer___u8BG-',
};

const ChatboxComposer = ({
  className = '',
  beforeComposer,
  afterComposer,
  sendButtonComponent,
  textareaProps,
  ...props
}) => {
  const textareaRef = useRef(null);
  return jsxRuntimeExports.jsxs('div', {
    className: `${styles$1.chatboxComposer} ${className}`,
    ...props,
    children: [
      beforeComposer,
      jsxRuntimeExports.jsxs('div', {
        className: 'c-chatbox-composer-input-container',
        children: [
          jsxRuntimeExports.jsx(Textarea, {
            ...textareaProps,
            ref: textareaRef,
            className: 'c-chatbox-composer-textarea',
          }),
          jsxRuntimeExports.jsx(Button, {
            ...sendButtonComponent,
            className: 'c-chatbox-composer-button',
            onClick: () => {
              sendButtonComponent?.onClick?.();
              textareaRef.current?.focus();
            },
          }),
        ],
      }),
      afterComposer,
    ],
  });
};

const we = 0,
  zt = 1,
  qt = 2,
  kn = 4;
function cn$1(t) {
  return () => t;
}
function uo(t) {
  t();
}
function ne(t, e) {
  return n => t(e(n));
}
function un(t, e) {
  return () => t(e);
}
function ao(t, e) {
  return n => t(e, n);
}
function Me(t) {
  return t !== void 0;
}
function fo(...t) {
  return () => {
    t.map(uo);
  };
}
function Yt() {}
function ve(t, e) {
  return (e(t), t);
}
function mo(t, e) {
  return e(t);
}
function X(...t) {
  return t;
}
function K(t, e) {
  return t(zt, e);
}
function G(t, e) {
  t(we, e);
}
function We(t) {
  t(qt);
}
function st(t) {
  return t(kn);
}
function O(t, e) {
  return K(t, ao(e, we));
}
function bt(t, e) {
  const n = t(zt, o => {
    (n(), e(o));
  });
  return n;
}
function an(t) {
  let e, n;
  return o => r => {
    ((e = r),
      n && clearTimeout(n),
      (n = setTimeout(() => {
        o(e);
      }, t)));
  };
}
function Fn(t, e) {
  return t === e;
}
function Z(t = Fn) {
  let e;
  return n => o => {
    t(e, o) || ((e = o), n(o));
  };
}
function P(t) {
  return e => n => {
    t(n) && e(n);
  };
}
function E(t) {
  return e => ne(e, t);
}
function yt(t) {
  return e => () => {
    e(t);
  };
}
function x(t, ...e) {
  const n = po(...e);
  return (o, r) => {
    switch (o) {
      case qt:
        We(t);
        return;
      case zt:
        return K(t, n(r));
    }
  };
}
function Rt(t, e) {
  return n => o => {
    n((e = t(e, o)));
  };
}
function jt(t) {
  return e => n => {
    t > 0 ? t-- : e(n);
  };
}
function Lt(t) {
  let e = null,
    n;
  return o => r => {
    ((e = r),
      !n &&
        (n = setTimeout(() => {
          ((n = void 0), o(e));
        }, t)));
  };
}
function _(...t) {
  const e = new Array(t.length);
  let n = 0,
    o = null;
  const r = Math.pow(2, t.length) - 1;
  return (
    t.forEach((s, i) => {
      const l = Math.pow(2, i);
      K(s, c => {
        const a = n;
        ((n = n | l), (e[i] = c), a !== r && n === r && o && (o(), (o = null)));
      });
    }),
    s => i => {
      const l = () => {
        s([i].concat(e));
      };
      n === r ? l() : (o = l);
    }
  );
}
function po(...t) {
  return e => t.reduceRight(mo, e);
}
function ho(t) {
  let e, n;
  const o = () => (e == null ? void 0 : e());
  return function (r, s) {
    switch (r) {
      case zt:
        return s
          ? n === s
            ? void 0
            : (o(), (n = s), (e = K(t, s)), e)
          : (o(), Yt);
      case qt:
        (o(), (n = null));
        return;
    }
  };
}
function C(t) {
  let e = t;
  const n = $();
  return (o, r) => {
    switch (o) {
      case we:
        e = r;
        break;
      case zt: {
        r(e);
        break;
      }
      case kn:
        return e;
    }
    return n(o, r);
  };
}
function ct(t, e) {
  return ve(C(e), n => O(t, n));
}
function $() {
  const t = [];
  return (e, n) => {
    switch (e) {
      case we:
        t.slice().forEach(o => {
          o(n);
        });
        return;
      case qt:
        t.splice(0, t.length);
        return;
      case zt:
        return (
          t.push(n),
          () => {
            const o = t.indexOf(n);
            o > -1 && t.splice(o, 1);
          }
        );
    }
  };
}
function ht(t) {
  return ve($(), e => O(t, e));
}
function U(t, e = [], { singleton: n } = { singleton: true }) {
  return {
    constructor: t,
    dependencies: e,
    id: go(),
    singleton: n,
  };
}
const go = () => Symbol();
function Io(t) {
  const e = /* @__PURE__ */ new Map(),
    n = ({ constructor: o, dependencies: r, id: s, singleton: i }) => {
      if (i && e.has(s)) return e.get(s);
      const l = o(r.map(c => n(c)));
      return (i && e.set(s, l), l);
    };
  return n(t);
}
function rt(...t) {
  const e = $(),
    n = new Array(t.length);
  let o = 0;
  const r = Math.pow(2, t.length) - 1;
  return (
    t.forEach((s, i) => {
      const l = Math.pow(2, i);
      K(s, c => {
        ((n[i] = c), (o = o | l), o === r && G(e, n));
      });
    }),
    function (s, i) {
      switch (s) {
        case qt: {
          We(e);
          return;
        }
        case zt:
          return (o === r && i(n), K(e, i));
      }
    }
  );
}
function A(t, e = Fn) {
  return x(t, Z(e));
}
function dn(...t) {
  return function (e, n) {
    switch (e) {
      case qt:
        return;
      case zt:
        return fo(...t.map(o => K(o, n)));
    }
  };
}
var mt = /* @__PURE__ */ (t => (
  (t[(t.DEBUG = 0)] = 'DEBUG'),
  (t[(t.INFO = 1)] = 'INFO'),
  (t[(t.WARN = 2)] = 'WARN'),
  (t[(t.ERROR = 3)] = 'ERROR'),
  t
))(mt || {});
const So = {
    0: 'debug',
    3: 'error',
    1: 'log',
    2: 'warn',
  },
  xo = () => (typeof globalThis > 'u' ? window : globalThis),
  Vt = U(
    () => {
      const t = C(
        3
        /* ERROR */
      );
      return {
        log: C((n, o, r = 1) => {
          var i;
          const s = (i = xo().VIRTUOSO_LOG_LEVEL) != null ? i : st(t);
          r >= s &&
            console[So[r]](
              '%creact-virtuoso: %c%s %o',
              'color: #0253b3; font-weight: bold',
              'color: initial',
              n,
              o
            );
        }),
        logLevel: t,
      };
    },
    [],
    { singleton: true }
  );
function Ht(t, e, n) {
  return Ge(t, e, n).callbackRef;
}
function Ge(t, e, n) {
  const o = React__default.useRef(null);
  let r = i => {};
  const s = React__default.useMemo(
    () =>
      typeof ResizeObserver < 'u'
        ? new ResizeObserver(i => {
            const l = () => {
              const c = i[0].target;
              c.offsetParent !== null && t(c);
            };
            n ? l() : requestAnimationFrame(l);
          })
        : null,
    [t, n]
  );
  return (
    (r = i => {
      i && e
        ? (s == null || s.observe(i), (o.current = i))
        : (o.current && (s == null || s.unobserve(o.current)),
          (o.current = null));
    }),
    { callbackRef: r, ref: o }
  );
}
function On(t, e, n, o, r, s, i, l, c) {
  const a = React__default.useCallback(
    p => {
      const S = To(p.children, e, l ? 'offsetWidth' : 'offsetHeight', r);
      let g = p.parentElement;
      for (; !g.dataset.virtuosoScroller; ) g = g.parentElement;
      const h = g.lastElementChild.dataset.viewportType === 'window';
      let w;
      h && (w = g.ownerDocument.defaultView);
      const v = i
          ? l
            ? i.scrollLeft
            : i.scrollTop
          : h
            ? l
              ? w.scrollX || w.document.documentElement.scrollLeft
              : w.scrollY || w.document.documentElement.scrollTop
            : l
              ? g.scrollLeft
              : g.scrollTop,
        m = i
          ? l
            ? i.scrollWidth
            : i.scrollHeight
          : h
            ? l
              ? w.document.documentElement.scrollWidth
              : w.document.documentElement.scrollHeight
            : l
              ? g.scrollWidth
              : g.scrollHeight,
        d = i
          ? l
            ? i.offsetWidth
            : i.offsetHeight
          : h
            ? l
              ? w.innerWidth
              : w.innerHeight
            : l
              ? g.offsetWidth
              : g.offsetHeight;
      (o({
        scrollHeight: m,
        scrollTop: Math.max(v, 0),
        viewportHeight: d,
      }),
        s == null ||
          s(
            l
              ? fn('column-gap', getComputedStyle(p).columnGap, r)
              : fn('row-gap', getComputedStyle(p).rowGap, r)
          ),
        S !== null && t(S));
    },
    [t, e, r, s, i, o, l]
  );
  return Ge(a, n, c);
}
function To(t, e, n, o) {
  const r = t.length;
  if (r === 0) return null;
  const s = [];
  for (let i = 0; i < r; i++) {
    const l = t.item(i);
    if (l.dataset.index === void 0) continue;
    const c = parseInt(l.dataset.index),
      a = parseFloat(l.dataset.knownSize),
      p = e(l, n);
    if (
      (p === 0 &&
        o('Zero-sized element, this should not happen', { child: l }, mt.ERROR),
      p === a)
    )
      continue;
    const S = s[s.length - 1];
    s.length === 0 || S.size !== p || S.endIndex !== c - 1
      ? s.push({ endIndex: c, size: p, startIndex: c })
      : s[s.length - 1].endIndex++;
  }
  return s;
}
function fn(t, e, n) {
  return (
    e !== 'normal' &&
      !(e != null && e.endsWith('px')) &&
      n(`${t} was not resolved to pixel value correctly`, e, mt.WARN),
    e === 'normal' ? 0 : parseInt(e != null ? e : '0', 10)
  );
}
function _e(t, e, n) {
  const o = React__default.useRef(null),
    r = React__default.useCallback(
      c => {
        if (!(c != null && c.offsetParent)) return;
        const a = c.getBoundingClientRect(),
          p = a.width;
        let S, g;
        if (e) {
          const h = e.getBoundingClientRect(),
            w = a.top - h.top;
          ((g = h.height - Math.max(0, w)), (S = w + e.scrollTop));
        } else {
          const h = i.current.ownerDocument.defaultView;
          ((g = h.innerHeight - Math.max(0, a.top)), (S = a.top + h.scrollY));
        }
        ((o.current = {
          offsetTop: S,
          visibleHeight: g,
          visibleWidth: p,
        }),
          t(o.current));
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [t, e]
    ),
    { callbackRef: s, ref: i } = Ge(r, true, n),
    l = React__default.useCallback(() => {
      r(i.current);
    }, [r, i]);
  return (
    React__default.useEffect(() => {
      var c;
      if (e) {
        e.addEventListener('scroll', l);
        const a = new ResizeObserver(() => {
          requestAnimationFrame(l);
        });
        return (
          a.observe(e),
          () => {
            (e.removeEventListener('scroll', l), a.unobserve(e));
          }
        );
      } else {
        const a =
          (c = i.current) == null ? void 0 : c.ownerDocument.defaultView;
        return (
          a == null || a.addEventListener('scroll', l),
          a == null || a.addEventListener('resize', l),
          () => {
            (a == null || a.removeEventListener('scroll', l),
              a == null || a.removeEventListener('resize', l));
          }
        );
      }
    }, [l, e, i]),
    s
  );
}
const at = U(
    () => {
      const t = $(),
        e = $(),
        n = C(0),
        o = $(),
        r = C(0),
        s = $(),
        i = $(),
        l = C(0),
        c = C(0),
        a = C(0),
        p = C(0),
        S = $(),
        g = $(),
        h = C(false),
        w = C(false),
        v = C(false);
      return (
        O(
          x(
            t,
            E(({ scrollTop: m }) => m)
          ),
          e
        ),
        O(
          x(
            t,
            E(({ scrollHeight: m }) => m)
          ),
          i
        ),
        O(e, r),
        {
          deviation: n,
          fixedFooterHeight: a,
          fixedHeaderHeight: c,
          footerHeight: p,
          headerHeight: l,
          horizontalDirection: w,
          scrollBy: g,
          // input
          scrollContainerState: t,
          scrollHeight: i,
          scrollingInProgress: h,
          // signals
          scrollTo: S,
          scrollTop: e,
          skipAnimationFrameInResizeObserver: v,
          smoothScrollTargetReached: o,
          // state
          statefulScrollTop: r,
          viewportHeight: s,
        }
      );
    },
    [],
    { singleton: true }
  ),
  oe = { lvl: 0 };
function Ln(t, e) {
  const n = t.length;
  if (n === 0) return [];
  let { index: o, value: r } = e(t[0]);
  const s = [];
  for (let i = 1; i < n; i++) {
    const { index: l, value: c } = e(t[i]);
    (s.push({ end: l - 1, start: o, value: r }), (o = l), (r = c));
  }
  return (s.push({ end: 1 / 0, start: o, value: r }), s);
}
function j(t) {
  return t === oe;
}
function re(t, e) {
  if (!j(t)) return e === t.k ? t.v : e < t.k ? re(t.l, e) : re(t.r, e);
}
function Ct(t, e, n = 'k') {
  if (j(t)) return [-1 / 0, void 0];
  if (Number(t[n]) === e) return [t.k, t.v];
  if (Number(t[n]) < e) {
    const o = Ct(t.r, e, n);
    return o[0] === -1 / 0 ? [t.k, t.v] : o;
  }
  return Ct(t.l, e, n);
}
function pt(t, e, n) {
  return j(t)
    ? Pn(e, n, 1)
    : e === t.k
      ? ot(t, { k: e, v: n })
      : e < t.k
        ? mn(ot(t, { l: pt(t.l, e, n) }))
        : mn(ot(t, { r: pt(t.r, e, n) }));
}
function Kt() {
  return oe;
}
function ye(t, e, n) {
  if (j(t)) return [];
  const o = Ct(t, e)[0];
  return Co(ze(t, o, n));
}
function Le(t, e) {
  if (j(t)) return oe;
  const { k: n, l: o, r } = t;
  if (e === n) {
    if (j(o)) return r;
    if (j(r)) return o;
    {
      const [s, i] = Vn(o);
      return ge(ot(t, { k: s, l: zn(o), v: i }));
    }
  } else return e < n ? ge(ot(t, { l: Le(o, e) })) : ge(ot(t, { r: Le(r, e) }));
}
function Gt(t) {
  return j(t) ? [] : [...Gt(t.l), { k: t.k, v: t.v }, ...Gt(t.r)];
}
function ze(t, e, n) {
  if (j(t)) return [];
  const { k: o, l: r, r: s, v: i } = t;
  let l = [];
  return (
    o > e && (l = l.concat(ze(r, e, n))),
    o >= e && o <= n && l.push({ k: o, v: i }),
    o <= n && (l = l.concat(ze(s, e, n))),
    l
  );
}
function ge(t) {
  const { l: e, lvl: n, r: o } = t;
  if (o.lvl >= n - 1 && e.lvl >= n - 1) return t;
  if (n > o.lvl + 1) {
    if (Ee(e)) return An(ot(t, { lvl: n - 1 }));
    if (!j(e) && !j(e.r))
      return ot(e.r, {
        l: ot(e, { r: e.r.l }),
        lvl: n,
        r: ot(t, {
          l: e.r.r,
          lvl: n - 1,
        }),
      });
    throw new Error('Unexpected empty nodes');
  } else {
    if (Ee(t)) return Ve(ot(t, { lvl: n - 1 }));
    if (!j(o) && !j(o.l)) {
      const r = o.l,
        s = Ee(r) ? o.lvl - 1 : o.lvl;
      return ot(r, {
        l: ot(t, {
          lvl: n - 1,
          r: r.l,
        }),
        lvl: r.lvl + 1,
        r: Ve(ot(o, { l: r.r, lvl: s })),
      });
    } else throw new Error('Unexpected empty nodes');
  }
}
function ot(t, e) {
  return Pn(
    e.k !== void 0 ? e.k : t.k,
    e.v !== void 0 ? e.v : t.v,
    e.lvl !== void 0 ? e.lvl : t.lvl,
    e.l !== void 0 ? e.l : t.l,
    e.r !== void 0 ? e.r : t.r
  );
}
function zn(t) {
  return j(t.r) ? t.l : ge(ot(t, { r: zn(t.r) }));
}
function Ee(t) {
  return j(t) || t.lvl > t.r.lvl;
}
function Vn(t) {
  return j(t.r) ? [t.k, t.v] : Vn(t.r);
}
function Pn(t, e, n, o = oe, r = oe) {
  return { k: t, l: o, lvl: n, r, v: e };
}
function mn(t) {
  return Ve(An(t));
}
function An(t) {
  const { l: e } = t;
  return !j(e) && e.lvl === t.lvl ? ot(e, { r: ot(t, { l: e.r }) }) : t;
}
function Ve(t) {
  const { lvl: e, r: n } = t;
  return !j(n) && !j(n.r) && n.lvl === e && n.r.lvl === e
    ? ot(n, { l: ot(t, { r: n.l }), lvl: e + 1 })
    : t;
}
function Co(t) {
  return Ln(t, ({ k: e, v: n }) => ({ index: e, value: n }));
}
function Mn(t, e) {
  return !!(t && t.startIndex === e.startIndex && t.endIndex === e.endIndex);
}
function se(t, e) {
  return !!(t && t[0] === e[0] && t[1] === e[1]);
}
const Ne = U(() => ({ recalcInProgress: C(false) }), [], { singleton: true });
function Wn(t, e, n) {
  return t[Se(t, e, n)];
}
function Se(t, e, n, o = 0) {
  let r = t.length - 1;
  for (; o <= r; ) {
    const s = Math.floor((o + r) / 2),
      i = t[s],
      l = n(i, e);
    if (l === 0) return s;
    if (l === -1) {
      if (r - o < 2) return s - 1;
      r = s - 1;
    } else {
      if (r === o) return s;
      o = s + 1;
    }
  }
  throw new Error(
    `Failed binary finding record in array - ${t.join(',')}, searched for ${e}`
  );
}
function wo(t, e, n, o) {
  const r = Se(t, e, o),
    s = Se(t, n, o, r);
  return t.slice(r, s + 1);
}
function wt(t, e) {
  return Math.round(t.getBoundingClientRect()[e]);
}
function Re(t) {
  return !j(t.groupOffsetTree);
}
function De({ index: t }, e) {
  return e === t ? 0 : e < t ? -1 : 1;
}
function vo() {
  return {
    groupIndices: [],
    groupOffsetTree: Kt(),
    lastIndex: 0,
    lastOffset: 0,
    lastSize: 0,
    offsetTree: [],
    sizeTree: Kt(),
  };
}
function yo(t, e) {
  let n = j(t) ? 0 : 1 / 0;
  for (const o of e) {
    const { endIndex: r, size: s, startIndex: i } = o;
    if (((n = Math.min(n, i)), j(t))) {
      t = pt(t, 0, s);
      continue;
    }
    const l = ye(t, i - 1, r + 1);
    if (l.some(Fo(o))) continue;
    let c = false,
      a = false;
    for (const { end: p, start: S, value: g } of l)
      (c ? (r >= S || s === g) && (t = Le(t, S)) : ((a = g !== s), (c = true)),
        p > r && r >= S && g !== s && (t = pt(t, r + 1, g)));
    a && (t = pt(t, i, s));
  }
  return [t, n];
}
function Ro(t) {
  return typeof t.groupIndex < 'u';
}
function bo({ offset: t }, e) {
  return e === t ? 0 : e < t ? -1 : 1;
}
function ie(t, e, n) {
  if (e.length === 0) return 0;
  const { index: o, offset: r, size: s } = Wn(e, t, De),
    i = t - o,
    l = s * i + (i - 1) * n + r;
  return l > 0 ? l + n : l;
}
function Gn(t, e) {
  if (!Re(e)) return t;
  let n = 0;
  for (; e.groupIndices[n] <= t + n; ) n++;
  return t + n;
}
function _n(t, e, n) {
  if (Ro(t)) return e.groupIndices[t.groupIndex] + 1;
  {
    const o = t.index === 'LAST' ? n : t.index;
    let r = Gn(o, e);
    return ((r = Math.max(0, r, Math.min(n, r))), r);
  }
}
function Ho(t, e, n, o = 0) {
  return (
    o > 0 && (e = Math.max(e, Wn(t, o, De).offset)),
    Ln(wo(t, e, n, bo), ko)
  );
}
function Eo(t, [e, n, o, r]) {
  e.length > 0 && o('received item sizes', e, mt.DEBUG);
  const s = t.sizeTree;
  let i = s,
    l = 0;
  if (n.length > 0 && j(s) && e.length === 2) {
    const g = e[0].size,
      h = e[1].size;
    i = n.reduce((w, v) => pt(pt(w, v, g), v + 1, h), i);
  } else [i, l] = yo(i, e);
  if (i === s) return t;
  const {
    lastIndex: c,
    lastOffset: a,
    lastSize: p,
    offsetTree: S,
  } = Pe(t.offsetTree, l, i, r);
  return {
    groupIndices: n,
    groupOffsetTree: n.reduce((g, h) => pt(g, h, ie(h, S, r)), Kt()),
    lastIndex: c,
    lastOffset: a,
    lastSize: p,
    offsetTree: S,
    sizeTree: i,
  };
}
function Bo(t) {
  return Gt(t).map(({ k: e, v: n }, o, r) => {
    const s = r[o + 1];
    return { endIndex: s ? s.k - 1 : 1 / 0, size: n, startIndex: e };
  });
}
function pn(t, e) {
  let n = 0,
    o = 0;
  for (; n < t; ) ((n += e[o + 1] - e[o] - 1), o++);
  return o - (n === t ? 0 : 1);
}
function Pe(t, e, n, o) {
  let r = t,
    s = 0,
    i = 0,
    l = 0,
    c = 0;
  if (e !== 0) {
    ((c = Se(r, e - 1, De)), (l = r[c].offset));
    const p = Ct(n, e - 1);
    ((s = p[0]),
      (i = p[1]),
      r.length && r[c].size === Ct(n, e)[1] && (c -= 1),
      (r = r.slice(0, c + 1)));
  } else r = [];
  for (const { start: a, value: p } of ye(n, e, 1 / 0)) {
    const S = a - s,
      g = S * i + l + S * o;
    (r.push({
      index: a,
      offset: g,
      size: p,
    }),
      (s = a),
      (l = g),
      (i = p));
  }
  return {
    lastIndex: s,
    lastOffset: l,
    lastSize: i,
    offsetTree: r,
  };
}
function ko(t) {
  return { index: t.index, value: t };
}
function Fo(t) {
  const { endIndex: e, size: n, startIndex: o } = t;
  return r =>
    r.start === o && (r.end === e || r.end === 1 / 0) && r.value === n;
}
const Oo = {
    offsetHeight: 'height',
    offsetWidth: 'width',
  },
  Et = U(
    ([{ log: t }, { recalcInProgress: e }]) => {
      const n = $(),
        o = $(),
        r = ct(o, 0),
        s = $(),
        i = $(),
        l = C(0),
        c = C([]),
        a = C(void 0),
        p = C(void 0),
        S = C((I, f) => wt(I, Oo[f])),
        g = C(void 0),
        h = C(0),
        w = vo(),
        v = ct(x(n, _(c, t, h), Rt(Eo, w), Z()), w),
        m = ct(
          x(
            c,
            Z(),
            Rt((I, f) => ({ current: f, prev: I.current }), {
              current: [],
              prev: [],
            }),
            E(({ prev: I }) => I)
          ),
          []
        );
      (O(
        x(
          c,
          P(I => I.length > 0),
          _(v, h),
          E(([I, f, b]) => {
            const k = I.reduce(
              (F, L, V) => pt(F, L, ie(L, f.offsetTree, b) || V),
              Kt()
            );
            return {
              ...f,
              groupIndices: I,
              groupOffsetTree: k,
            };
          })
        ),
        v
      ),
        O(
          x(
            o,
            _(v),
            P(([I, { lastIndex: f }]) => I < f),
            E(([I, { lastIndex: f, lastSize: b }]) => [
              {
                endIndex: f,
                size: b,
                startIndex: I,
              },
            ])
          ),
          n
        ),
        O(a, p));
      const d = ct(
        x(
          a,
          E(I => I === void 0)
        ),
        true
      );
      O(
        x(
          p,
          P(I => I !== void 0 && j(st(v).sizeTree)),
          E(I => [{ endIndex: 0, size: I, startIndex: 0 }])
        ),
        n
      );
      const u = ht(
        x(
          n,
          _(v),
          Rt(
            ({ sizes: I }, [f, b]) => ({
              changed: b !== I,
              sizes: b,
            }),
            { changed: false, sizes: w }
          ),
          E(I => I.changed)
        )
      );
      (K(
        x(
          l,
          Rt((I, f) => ({ diff: I.prev - f, prev: f }), { diff: 0, prev: 0 }),
          E(I => I.diff)
        ),
        I => {
          const { groupIndices: f } = st(v);
          if (I > 0) (G(e, true), G(s, I + pn(I, f)));
          else if (I < 0) {
            const b = st(m);
            (b.length > 0 && (I -= pn(-I, b)), G(i, I));
          }
        }
      ),
        K(x(l, _(t)), ([I, f]) => {
          I < 0 &&
            f(
              "`firstItemIndex` prop should not be set to less than zero. If you don't know the total count, just use a very high value",
              { firstItemIndex: l },
              mt.ERROR
            );
        }));
      const T = ht(s);
      O(
        x(
          s,
          _(v),
          E(([I, f]) => {
            const b = f.groupIndices.length > 0,
              k = [],
              F = f.lastSize;
            if (b) {
              const L = re(f.sizeTree, 0);
              let V = 0,
                D = 0;
              for (; V < I; ) {
                const B = f.groupIndices[D],
                  Y =
                    f.groupIndices.length === D + 1
                      ? 1 / 0
                      : f.groupIndices[D + 1] - B - 1;
                (k.push({
                  endIndex: B,
                  size: L,
                  startIndex: B,
                }),
                  k.push({
                    endIndex: B + 1 + Y - 1,
                    size: F,
                    startIndex: B + 1,
                  }),
                  D++,
                  (V += Y + 1));
              }
              const J = Gt(f.sizeTree);
              return (
                V !== I && J.shift(),
                J.reduce(
                  (B, { k: Y, v: it }) => {
                    let dt = B.ranges;
                    return (
                      B.prevSize !== 0 &&
                        (dt = [
                          ...B.ranges,
                          {
                            endIndex: Y + I - 1,
                            size: B.prevSize,
                            startIndex: B.prevIndex,
                          },
                        ]),
                      {
                        prevIndex: Y + I,
                        prevSize: it,
                        ranges: dt,
                      }
                    );
                  },
                  {
                    prevIndex: I,
                    prevSize: 0,
                    ranges: k,
                  }
                ).ranges
              );
            }
            return Gt(f.sizeTree).reduce(
              (L, { k: V, v: D }) => ({
                prevIndex: V + I,
                prevSize: D,
                ranges: [
                  ...L.ranges,
                  {
                    endIndex: V + I - 1,
                    size: L.prevSize,
                    startIndex: L.prevIndex,
                  },
                ],
              }),
              {
                prevIndex: 0,
                prevSize: F,
                ranges: [],
              }
            ).ranges;
          })
        ),
        n
      );
      const R = ht(
        x(
          i,
          _(v, h),
          E(([I, { offsetTree: f }, b]) => {
            const k = -I;
            return ie(k, f, b);
          })
        )
      );
      return (
        O(
          x(
            i,
            _(v, h),
            E(([I, f, b]) => {
              if (f.groupIndices.length > 0) {
                if (j(f.sizeTree)) return f;
                let F = Kt();
                const L = st(m);
                let V = 0,
                  D = 0,
                  J = 0;
                for (; V < -I; ) {
                  J = L[D];
                  const B = L[D + 1] - J - 1;
                  (D++, (V += B + 1));
                }
                if (
                  ((F = Gt(f.sizeTree).reduce(
                    (B, { k: Y, v: it }) => pt(B, Math.max(0, Y + I), it),
                    F
                  )),
                  V !== -I)
                ) {
                  const B = re(f.sizeTree, J);
                  F = pt(F, 0, B);
                  const Y = Ct(f.sizeTree, -I + 1)[1];
                  F = pt(F, 1, Y);
                }
                return {
                  ...f,
                  sizeTree: F,
                  ...Pe(f.offsetTree, 0, F, b),
                };
              } else {
                const F = Gt(f.sizeTree).reduce(
                  (L, { k: V, v: D }) => pt(L, Math.max(0, V + I), D),
                  Kt()
                );
                return {
                  ...f,
                  sizeTree: F,
                  ...Pe(f.offsetTree, 0, F, b),
                };
              }
            })
          ),
          v
        ),
        {
          beforeUnshiftWith: T,
          // input
          data: g,
          defaultItemSize: p,
          firstItemIndex: l,
          fixedItemSize: a,
          gap: h,
          groupIndices: c,
          itemSize: S,
          listRefresh: u,
          shiftWith: i,
          shiftWithOffset: R,
          sizeRanges: n,
          // output
          sizes: v,
          statefulTotalCount: r,
          totalCount: o,
          trackItemSizes: d,
          unshiftWith: s,
        }
      );
    },
    X(Vt, Ne),
    { singleton: true }
  );
function Lo(t) {
  return t.reduce(
    (e, n) => (e.groupIndices.push(e.totalCount), (e.totalCount += n + 1), e),
    {
      groupIndices: [],
      totalCount: 0,
    }
  );
}
const Nn = U(
    ([
      { groupIndices: t, sizes: e, totalCount: n },
      { headerHeight: o, scrollTop: r },
    ]) => {
      const s = $(),
        i = $(),
        l = ht(x(s, E(Lo)));
      return (
        O(
          x(
            l,
            E(c => c.totalCount)
          ),
          n
        ),
        O(
          x(
            l,
            E(c => c.groupIndices)
          ),
          t
        ),
        O(
          x(
            rt(r, e, o),
            P(([c, a]) => Re(a)),
            E(([c, a, p]) => Ct(a.groupOffsetTree, Math.max(c - p, 0), 'v')[0]),
            Z(),
            E(c => [c])
          ),
          i
        ),
        { groupCounts: s, topItemsIndexes: i }
      );
    },
    X(Et, at)
  ),
  Pt = U(
    ([{ log: t }]) => {
      const e = C(false),
        n = ht(
          x(
            e,
            P(o => o),
            Z()
          )
        );
      return (
        K(e, o => {
          o && st(t)('props updated', {}, mt.DEBUG);
        }),
        { didMount: n, propsReady: e }
      );
    },
    X(Vt),
    { singleton: true }
  ),
  zo =
    typeof document < 'u' && 'scrollBehavior' in document.documentElement.style;
function Dn(t) {
  const e = typeof t == 'number' ? { index: t } : t;
  return (
    e.align || (e.align = 'start'),
    (!e.behavior || !zo) && (e.behavior = 'auto'),
    e.offset || (e.offset = 0),
    e
  );
}
const ce = U(
  ([
    { gap: t, listRefresh: e, sizes: n, totalCount: o },
    {
      fixedFooterHeight: r,
      fixedHeaderHeight: s,
      footerHeight: i,
      headerHeight: l,
      scrollingInProgress: c,
      scrollTo: a,
      smoothScrollTargetReached: p,
      viewportHeight: S,
    },
    { log: g },
  ]) => {
    const h = $(),
      w = $(),
      v = C(0);
    let m = null,
      d = null,
      u = null;
    function T() {
      (m && (m(), (m = null)),
        u && (u(), (u = null)),
        d && (clearTimeout(d), (d = null)),
        G(c, false));
    }
    return (
      O(
        x(
          h,
          _(n, S, o, v, l, i, g),
          _(t, s, r),
          E(([[R, I, f, b, k, F, L, V], D, J, nt]) => {
            const B = Dn(R),
              { align: Y, behavior: it, offset: dt } = B,
              St = b - 1,
              ft = _n(B, I, St);
            let ut = ie(ft, I.offsetTree, D) + F;
            (Y === 'end'
              ? ((ut += J + Ct(I.sizeTree, ft)[1] - f + nt),
                ft === St && (ut += L))
              : Y === 'center'
                ? (ut += (J + Ct(I.sizeTree, ft)[1] - f + nt) / 2)
                : (ut -= k),
              dt && (ut += dt));
            const At = xt => {
              (T(),
                xt
                  ? (V('retrying to scroll to', { location: R }, mt.DEBUG),
                    G(h, R))
                  : (G(w, true),
                    V('list did not change, scroll successful', {}, mt.DEBUG)));
            };
            if ((T(), it === 'smooth')) {
              let xt = false;
              ((u = K(e, Xt => {
                xt = xt || Xt;
              })),
                (m = bt(p, () => {
                  At(xt);
                })));
            } else m = bt(x(e, Vo(150)), At);
            return (
              (d = setTimeout(() => {
                T();
              }, 1200)),
              G(c, true),
              V(
                'scrolling from index to',
                { behavior: it, index: ft, top: ut },
                mt.DEBUG
              ),
              { behavior: it, top: ut }
            );
          })
        ),
        a
      ),
      {
        scrollTargetReached: w,
        scrollToIndex: h,
        topListHeight: v,
      }
    );
  },
  X(Et, at, Vt),
  { singleton: true }
);
function Vo(t) {
  return e => {
    const n = setTimeout(() => {
      e(false);
    }, t);
    return o => {
      o && (e(true), clearTimeout(n));
    };
  };
}
function $e(t, e) {
  t == 0
    ? e()
    : requestAnimationFrame(() => {
        $e(t - 1, e);
      });
}
function Ue(t, e) {
  const n = e - 1;
  return typeof t == 'number' ? t : t.index === 'LAST' ? n : t.index;
}
const ue = U(
  ([
    { defaultItemSize: t, listRefresh: e, sizes: n },
    { scrollTop: o },
    { scrollTargetReached: r, scrollToIndex: s },
    { didMount: i },
  ]) => {
    const l = C(true),
      c = C(0),
      a = C(true);
    return (
      O(
        x(
          i,
          _(c),
          P(([p, S]) => !!S),
          yt(false)
        ),
        l
      ),
      O(
        x(
          i,
          _(c),
          P(([p, S]) => !!S),
          yt(false)
        ),
        a
      ),
      K(
        x(
          rt(e, i),
          _(l, n, t, a),
          P(
            ([[, p], S, { sizeTree: g }, h, w]) =>
              p && (!j(g) || Me(h)) && !S && !w
          ),
          _(c)
        ),
        ([, p]) => {
          (bt(r, () => {
            G(a, true);
          }),
            $e(4, () => {
              (bt(o, () => {
                G(l, true);
              }),
                G(s, p));
            }));
        }
      ),
      {
        initialItemFinalLocationReached: a,
        initialTopMostItemIndex: c,
        scrolledToInitialItem: l,
      }
    );
  },
  X(Et, at, ce, Pt),
  { singleton: true }
);
function $n(t, e) {
  return Math.abs(t - e) < 1.01;
}
const le = 'up',
  te = 'down',
  Po = 'none',
  Ao = {
    atBottom: false,
    notAtBottomBecause: 'NOT_SHOWING_LAST_ITEM',
    state: {
      offsetBottom: 0,
      scrollHeight: 0,
      scrollTop: 0,
      viewportHeight: 0,
    },
  },
  Mo = 0,
  ae = U(
    ([
      {
        footerHeight: t,
        headerHeight: e,
        scrollBy: n,
        scrollContainerState: o,
        scrollTop: r,
        viewportHeight: s,
      },
    ]) => {
      const i = C(false),
        l = C(true),
        c = $(),
        a = $(),
        p = C(4),
        S = C(Mo),
        g = ct(
          x(
            dn(x(A(r), jt(1), yt(true)), x(A(r), jt(1), yt(false), an(100))),
            Z()
          ),
          false
        ),
        h = ct(x(dn(x(n, yt(true)), x(n, yt(false), an(200))), Z()), false);
      (O(
        x(
          rt(A(r), A(S)),
          E(([u, T]) => u <= T),
          Z()
        ),
        l
      ),
        O(x(l, Lt(50)), a));
      const w = ht(
          x(
            rt(o, A(s), A(e), A(t), A(p)),
            Rt((u, [{ scrollHeight: T, scrollTop: R }, I, f, b, k]) => {
              const F = R + I - T > -k,
                L = {
                  scrollHeight: T,
                  scrollTop: R,
                  viewportHeight: I,
                };
              if (F) {
                let D, J;
                return (
                  R > u.state.scrollTop
                    ? ((D = 'SCROLLED_DOWN'), (J = u.state.scrollTop - R))
                    : ((D = 'SIZE_DECREASED'),
                      (J = u.state.scrollTop - R || u.scrollTopDelta)),
                  {
                    atBottom: true,
                    atBottomBecause: D,
                    scrollTopDelta: J,
                    state: L,
                  }
                );
              }
              let V;
              return (
                L.scrollHeight > u.state.scrollHeight
                  ? (V = 'SIZE_INCREASED')
                  : I < u.state.viewportHeight
                    ? (V = 'VIEWPORT_HEIGHT_DECREASING')
                    : R < u.state.scrollTop
                      ? (V = 'SCROLLING_UPWARDS')
                      : (V = 'NOT_FULLY_SCROLLED_TO_LAST_ITEM_BOTTOM'),
                {
                  atBottom: false,
                  notAtBottomBecause: V,
                  state: L,
                }
              );
            }, Ao),
            Z((u, T) => u && u.atBottom === T.atBottom)
          )
        ),
        v = ct(
          x(
            o,
            Rt(
              (u, { scrollHeight: T, scrollTop: R, viewportHeight: I }) => {
                if ($n(u.scrollHeight, T))
                  return {
                    changed: false,
                    jump: 0,
                    scrollHeight: T,
                    scrollTop: R,
                  };
                {
                  const f = T - (R + I) < 1;
                  return u.scrollTop !== R && f
                    ? {
                        changed: true,
                        jump: u.scrollTop - R,
                        scrollHeight: T,
                        scrollTop: R,
                      }
                    : {
                        changed: true,
                        jump: 0,
                        scrollHeight: T,
                        scrollTop: R,
                      };
                }
              },
              { changed: false, jump: 0, scrollHeight: 0, scrollTop: 0 }
            ),
            P(u => u.changed),
            E(u => u.jump)
          ),
          0
        );
      (O(
        x(
          w,
          E(u => u.atBottom)
        ),
        i
      ),
        O(x(i, Lt(50)), c));
      const m = C(te);
      (O(
        x(
          o,
          E(({ scrollTop: u }) => u),
          Z(),
          Rt(
            (u, T) =>
              st(h)
                ? { direction: u.direction, prevScrollTop: T }
                : {
                    direction: T < u.prevScrollTop ? le : te,
                    prevScrollTop: T,
                  },
            { direction: te, prevScrollTop: 0 }
          ),
          E(u => u.direction)
        ),
        m
      ),
        O(x(o, Lt(50), yt(Po)), m));
      const d = C(0);
      return (
        O(
          x(
            g,
            P(u => !u),
            yt(0)
          ),
          d
        ),
        O(
          x(
            r,
            Lt(100),
            _(g),
            P(([u, T]) => !!T),
            Rt(([u, T], [R]) => [T, R], [0, 0]),
            E(([u, T]) => T - u)
          ),
          d
        ),
        {
          atBottomState: w,
          atBottomStateChange: c,
          atBottomThreshold: p,
          atTopStateChange: a,
          atTopThreshold: S,
          isAtBottom: i,
          isAtTop: l,
          isScrolling: g,
          lastJumpDueToItemResize: v,
          scrollDirection: m,
          scrollVelocity: d,
        }
      );
    },
    X(at)
  ),
  xe = 'top',
  Te = 'bottom',
  hn = 'none';
function gn(t, e, n) {
  return typeof t == 'number'
    ? (n === le && e === xe) || (n === te && e === Te)
      ? t
      : 0
    : n === le
      ? e === xe
        ? t.main
        : t.reverse
      : e === Te
        ? t.main
        : t.reverse;
}
function In(t, e) {
  var n;
  return typeof t == 'number' ? t : (n = t[e]) != null ? n : 0;
}
const Ke = U(
  ([
    {
      deviation: t,
      fixedHeaderHeight: e,
      headerHeight: n,
      scrollTop: o,
      viewportHeight: r,
    },
  ]) => {
    const s = $(),
      i = C(0),
      l = C(0),
      c = C(0),
      a = ct(
        x(
          rt(A(o), A(r), A(n), A(s, se), A(c), A(i), A(e), A(t), A(l)),
          E(([p, S, g, [h, w], v, m, d, u, T]) => {
            const R = p - u,
              I = m + d,
              f = Math.max(g - R, 0);
            let b = hn;
            const k = In(T, xe),
              F = In(T, Te);
            return (
              (h -= u),
              (h += g + d),
              (w += g + d),
              (w -= u),
              h > p + I - k && (b = le),
              w < p - f + S + F && (b = te),
              b !== hn
                ? [
                    Math.max(R - g - gn(v, xe, b) - k, 0),
                    R - f - d + S + gn(v, Te, b) + F,
                  ]
                : null
            );
          }),
          P(p => p != null),
          Z(se)
        ),
        [0, 0]
      );
    return {
      increaseViewportBy: l,
      // input
      listBoundary: s,
      overscan: c,
      topListHeight: i,
      // output
      visibleRange: a,
    };
  },
  X(at),
  { singleton: true }
);
function Wo(t, e, n) {
  if (Re(e)) {
    const o = Gn(t, e);
    return [
      { index: Ct(e.groupOffsetTree, o)[0], offset: 0, size: 0 },
      { data: n == null ? void 0 : n[0], index: o, offset: 0, size: 0 },
    ];
  }
  return [{ data: n == null ? void 0 : n[0], index: t, offset: 0, size: 0 }];
}
const Be = {
  bottom: 0,
  firstItemIndex: 0,
  items: [],
  offsetBottom: 0,
  offsetTop: 0,
  top: 0,
  topItems: [],
  topListHeight: 0,
  totalCount: 0,
};
function Ie(t, e, n, o, r, s) {
  const { lastIndex: i, lastOffset: l, lastSize: c } = r;
  let a = 0,
    p = 0;
  if (t.length > 0) {
    a = t[0].offset;
    const v = t[t.length - 1];
    p = v.offset + v.size;
  }
  const S = n - i,
    g = l + S * c + (S - 1) * o,
    h = a,
    w = g - p;
  return {
    bottom: p,
    firstItemIndex: s,
    items: Sn(t, r, s),
    offsetBottom: w,
    offsetTop: a,
    top: h,
    topItems: Sn(e, r, s),
    topListHeight: e.reduce((v, m) => m.size + v, 0),
    totalCount: n,
  };
}
function Un(t, e, n, o, r, s) {
  let i = 0;
  if (n.groupIndices.length > 0)
    for (const p of n.groupIndices) {
      if (p - i >= t) break;
      i++;
    }
  const l = t + i,
    c = Ue(e, l),
    a = Array.from({ length: l }).map((p, S) => ({
      data: s[S + c],
      index: S + c,
      offset: 0,
      size: 0,
    }));
  return Ie(a, [], l, r, n, o);
}
function Sn(t, e, n) {
  if (t.length === 0) return [];
  if (!Re(e))
    return t.map(a => ({ ...a, index: a.index + n, originalIndex: a.index }));
  const o = t[0].index,
    r = t[t.length - 1].index,
    s = [],
    i = ye(e.groupOffsetTree, o, r);
  let l,
    c = 0;
  for (const a of t) {
    (!l || l.end < a.index) &&
      ((l = i.shift()), (c = e.groupIndices.indexOf(l.start)));
    let p;
    (a.index === l.start
      ? (p = {
          index: c,
          type: 'group',
        })
      : (p = {
          groupIndex: c,
          index: a.index - (c + 1) + n,
        }),
      s.push({
        ...p,
        data: a.data,
        offset: a.offset,
        originalIndex: a.index,
        size: a.size,
      }));
  }
  return s;
}
const Dt = U(
    ([
      { data: t, firstItemIndex: e, gap: n, sizes: o, totalCount: r },
      s,
      { listBoundary: i, topListHeight: l, visibleRange: c },
      { initialTopMostItemIndex: a, scrolledToInitialItem: p },
      { topListHeight: S },
      g,
      { didMount: h },
      { recalcInProgress: w },
    ]) => {
      const v = C([]),
        m = C(0),
        d = $();
      O(s.topItemsIndexes, v);
      const u = ct(
        x(
          rt(h, w, A(c, se), A(r), A(o), A(a), p, A(v), A(e), A(n), t),
          P(([f, b, , k, , , , , , , F]) => {
            const L = F && F.length !== k;
            return f && !b && !L;
          }),
          E(([, , [f, b], k, F, L, V, D, J, nt, B]) => {
            const Y = F,
              { offsetTree: it, sizeTree: dt } = Y,
              St = st(m);
            if (k === 0) return { ...Be, totalCount: k };
            if (f === 0 && b === 0)
              return St === 0
                ? { ...Be, totalCount: k }
                : Un(St, L, F, J, nt, B || []);
            if (j(dt))
              return St > 0 ? null : Ie(Wo(Ue(L, k), Y, B), [], k, nt, Y, J);
            const ft = [];
            if (D.length > 0) {
              const Mt = D[0],
                vt = D[D.length - 1];
              let Bt = 0;
              for (const y of ye(dt, Mt, vt)) {
                const N = y.value,
                  Q = Math.max(y.start, Mt),
                  lt = Math.min(y.end, vt);
                for (let tt = Q; tt <= lt; tt++)
                  (ft.push({
                    data: B == null ? void 0 : B[tt],
                    index: tt,
                    offset: Bt,
                    size: N,
                  }),
                    (Bt += N));
              }
            }
            if (!V) return Ie([], ft, k, nt, Y, J);
            const ut = D.length > 0 ? D[D.length - 1] + 1 : 0,
              At = Ho(it, f, b, ut);
            if (At.length === 0) return null;
            const xt = k - 1,
              Xt = ve([], Mt => {
                for (const vt of At) {
                  const Bt = vt.value;
                  let y = Bt.offset,
                    N = vt.start;
                  const Q = Bt.size;
                  if (Bt.offset < f) {
                    N += Math.floor((f - Bt.offset + nt) / (Q + nt));
                    const tt = N - vt.start;
                    y += tt * Q + tt * nt;
                  }
                  N < ut && ((y += (ut - N) * Q), (N = ut));
                  const lt = Math.min(vt.end, xt);
                  for (let tt = N; tt <= lt && !(y >= b); tt++)
                    (Mt.push({
                      data: B == null ? void 0 : B[tt],
                      index: tt,
                      offset: y,
                      size: Q,
                    }),
                      (y += Q + nt));
                }
              });
            return Ie(Xt, ft, k, nt, Y, J);
          }),
          //@ts-expect-error filter needs to be fixed
          P(f => f !== null),
          Z()
        ),
        Be
      );
      (O(
        x(
          t,
          P(Me),
          E(f => (f == null ? void 0 : f.length))
        ),
        r
      ),
        O(
          x(
            u,
            E(f => f.topListHeight)
          ),
          S
        ),
        O(S, l),
        O(
          x(
            u,
            E(f => [f.top, f.bottom])
          ),
          i
        ),
        O(
          x(
            u,
            E(f => f.items)
          ),
          d
        ));
      const T = ht(
          x(
            u,
            P(({ items: f }) => f.length > 0),
            _(r, t),
            P(([{ items: f }, b]) => f[f.length - 1].originalIndex === b - 1),
            E(([, f, b]) => [f - 1, b]),
            Z(se),
            E(([f]) => f)
          )
        ),
        R = ht(
          x(
            u,
            Lt(200),
            P(
              ({ items: f, topItems: b }) =>
                f.length > 0 && f[0].originalIndex === b.length
            ),
            E(({ items: f }) => f[0].index),
            Z()
          )
        ),
        I = ht(
          x(
            u,
            P(({ items: f }) => f.length > 0),
            E(({ items: f }) => {
              let b = 0,
                k = f.length - 1;
              for (; f[b].type === 'group' && b < k; ) b++;
              for (; f[k].type === 'group' && k > b; ) k--;
              return {
                endIndex: f[k].index,
                startIndex: f[b].index,
              };
            }),
            Z(Mn)
          )
        );
      return {
        endReached: T,
        initialItemCount: m,
        itemsRendered: d,
        listState: u,
        rangeChanged: I,
        startReached: R,
        topItemsIndexes: v,
        ...g,
      };
    },
    X(Et, Nn, Ke, ue, ce, ae, Pt, Ne),
    { singleton: true }
  ),
  Kn = U(
    ([
      {
        fixedFooterHeight: t,
        fixedHeaderHeight: e,
        footerHeight: n,
        headerHeight: o,
      },
      { listState: r },
    ]) => {
      const s = $(),
        i = ct(
          x(
            rt(n, t, o, e, r),
            E(([l, c, a, p, S]) => l + c + a + p + S.offsetBottom + S.bottom)
          ),
          0
        );
      return (O(A(i), s), { totalListHeight: i, totalListHeightChanged: s });
    },
    X(at, Dt),
    { singleton: true }
  ),
  Go = U(
    ([{ viewportHeight: t }, { totalListHeight: e }]) => {
      const n = C(false),
        o = ct(
          x(
            rt(n, t, e),
            P(([r]) => r),
            E(([, r, s]) => Math.max(0, r - s)),
            Lt(0),
            Z()
          ),
          0
        );
      return { alignToBottom: n, paddingTopAddition: o };
    },
    X(at, Kn),
    { singleton: true }
  );
function xn(t) {
  return t ? (t === 'smooth' ? 'smooth' : 'auto') : false;
}
const _o = (t, e) => (typeof t == 'function' ? xn(t(e)) : e && xn(t)),
  No = U(
    ([
      { listRefresh: t, totalCount: e, fixedItemSize: n },
      { atBottomState: o, isAtBottom: r },
      { scrollToIndex: s },
      { scrolledToInitialItem: i },
      { didMount: l, propsReady: c },
      { log: a },
      { scrollingInProgress: p },
    ]) => {
      const S = C(false),
        g = $();
      let h = null;
      function w(m) {
        G(s, {
          align: 'end',
          behavior: m,
          index: 'LAST',
        });
      }
      K(
        x(
          rt(x(A(e), jt(1)), l),
          _(A(S), r, i, p),
          E(([[m, d], u, T, R, I]) => {
            let f = d && R,
              b = 'auto';
            return (
              f && ((b = _o(u, T || I)), (f = f && !!b)),
              { followOutputBehavior: b, shouldFollow: f, totalCount: m }
            );
          }),
          P(({ shouldFollow: m }) => m)
        ),
        ({ followOutputBehavior: m, totalCount: d }) => {
          (h && (h(), (h = null)),
            st(n)
              ? requestAnimationFrame(() => {
                  (st(a)('following output to ', { totalCount: d }, mt.DEBUG),
                    w(m));
                })
              : (h = bt(t, () => {
                  (st(a)('following output to ', { totalCount: d }, mt.DEBUG),
                    w(m),
                    (h = null));
                })));
        }
      );
      function v(m) {
        const d = bt(o, u => {
          m &&
            !u.atBottom &&
            u.notAtBottomBecause === 'SIZE_INCREASED' &&
            !h &&
            (st(a)('scrolling to bottom due to increased size', {}, mt.DEBUG),
            w('auto'));
        });
        setTimeout(d, 100);
      }
      return (
        K(
          x(
            rt(A(S), e, c),
            P(([m, , d]) => m && d),
            Rt(({ value: m }, [, d]) => ({ refreshed: m === d, value: d }), {
              refreshed: false,
              value: 0,
            }),
            P(({ refreshed: m }) => m),
            _(S, e)
          ),
          ([, m]) => {
            st(i) && v(m !== false);
          }
        ),
        K(g, () => {
          v(st(S) !== false);
        }),
        K(rt(A(S), o), ([m, d]) => {
          m &&
            !d.atBottom &&
            d.notAtBottomBecause === 'VIEWPORT_HEIGHT_DECREASING' &&
            w('auto');
        }),
        { autoscrollToBottom: g, followOutput: S }
      );
    },
    X(Et, ae, ce, ue, Pt, Vt, at)
  ),
  Do = U(
    ([
      { data: t, firstItemIndex: e, gap: n, sizes: o },
      { initialTopMostItemIndex: r },
      { initialItemCount: s, listState: i },
      { didMount: l },
    ]) => (
      O(
        x(
          l,
          _(s),
          P(([, c]) => c !== 0),
          _(r, o, e, n, t),
          E(([[, c], a, p, S, g, h = []]) => Un(c, a, p, S, g, h))
        ),
        i
      ),
      {}
    ),
    X(Et, ue, Dt, Pt),
    { singleton: true }
  ),
  $o = U(
    ([{ didMount: t }, { scrollTo: e }, { listState: n }]) => {
      const o = C(0);
      return (
        K(
          x(
            t,
            _(o),
            P(([, r]) => r !== 0),
            E(([, r]) => ({ top: r }))
          ),
          r => {
            bt(
              x(
                n,
                jt(1),
                P(s => s.items.length > 1)
              ),
              () => {
                requestAnimationFrame(() => {
                  G(e, r);
                });
              }
            );
          }
        ),
        {
          initialScrollTop: o,
        }
      );
    },
    X(Pt, at, Dt),
    { singleton: true }
  ),
  Uo = ({
    itemBottom: t,
    itemTop: e,
    locationParams: { align: n, behavior: o, ...r },
    viewportBottom: s,
    viewportTop: i,
  }) =>
    e < i
      ? { ...r, align: n != null ? n : 'start', behavior: o }
      : t > s
        ? { ...r, align: n != null ? n : 'end', behavior: o }
        : null,
  Ko = U(
    ([
      { gap: t, sizes: e, totalCount: n },
      {
        fixedFooterHeight: o,
        fixedHeaderHeight: r,
        headerHeight: s,
        scrollingInProgress: i,
        scrollTop: l,
        viewportHeight: c,
      },
      { scrollToIndex: a },
    ]) => {
      const p = $();
      return (
        O(
          x(
            p,
            _(e, c, n, s, r, o, l),
            _(t),
            E(([[S, g, h, w, v, m, d, u], T]) => {
              const {
                  align: R,
                  behavior: I,
                  calculateViewLocation: f = Uo,
                  done: b,
                  ...k
                } = S,
                F = _n(S, g, w - 1),
                L = ie(F, g.offsetTree, T) + v + m,
                V = L + Ct(g.sizeTree, F)[1],
                D = u + m,
                J = u + h - d,
                nt = f({
                  itemBottom: V,
                  itemTop: L,
                  locationParams: { align: R, behavior: I, ...k },
                  viewportBottom: J,
                  viewportTop: D,
                });
              return (
                nt
                  ? b &&
                    bt(
                      x(
                        i,
                        P(B => !B),
                        // skips the initial publish of false, and the cleanup call.
                        // but if scrollingInProgress is true, we skip the initial publish.
                        jt(st(i) ? 1 : 2)
                      ),
                      b
                    )
                  : b && b(),
                nt
              );
            }),
            P(S => S !== null)
          ),
          a
        ),
        {
          scrollIntoView: p,
        }
      );
    },
    X(Et, at, ce, Dt, Vt),
    { singleton: true }
  ),
  jn = U(
    ([{ scrollVelocity: t }]) => {
      const e = C(false),
        n = $(),
        o = C(false);
      return (
        O(
          x(
            t,
            _(o, e, n),
            P(([r, s]) => !!s),
            E(([r, s, i, l]) => {
              const { enter: c, exit: a } = s;
              if (i) {
                if (a(r, l)) return false;
              } else if (c(r, l)) return true;
              return i;
            }),
            Z()
          ),
          e
        ),
        K(x(rt(e, t, n), _(o)), ([[r, s, i], l]) => {
          r && l && l.change && l.change(s, i);
        }),
        {
          isSeeking: e,
          scrollSeekConfiguration: o,
          scrollSeekRangeChanged: n,
          scrollVelocity: t,
        }
      );
    },
    X(ae),
    { singleton: true }
  ),
  je = U(([{ scrollContainerState: t, scrollTo: e }]) => {
    const n = $(),
      o = $(),
      r = $(),
      s = C(false),
      i = C(void 0);
    return (
      O(
        x(
          rt(n, o),
          E(
            ([
              { scrollHeight: l, scrollTop: c, viewportHeight: a },
              { offsetTop: p },
            ]) => ({
              scrollHeight: l,
              scrollTop: Math.max(0, c - p),
              viewportHeight: a,
            })
          )
        ),
        t
      ),
      O(
        x(
          e,
          _(o),
          E(([l, { offsetTop: c }]) => ({
            ...l,
            top: l.top + c,
          }))
        ),
        r
      ),
      {
        customScrollParent: i,
        // config
        useWindowScroll: s,
        // input
        windowScrollContainerState: n,
        // signals
        windowScrollTo: r,
        windowViewportRect: o,
      }
    );
  }, X(at)),
  jo = U(
    ([
      { sizeRanges: t, sizes: e },
      { headerHeight: n, scrollTop: o },
      { initialTopMostItemIndex: r },
      { didMount: s },
      {
        useWindowScroll: i,
        windowScrollContainerState: l,
        windowViewportRect: c,
      },
    ]) => {
      const a = $(),
        p = C(void 0),
        S = C(null),
        g = C(null);
      return (
        O(l, S),
        O(c, g),
        K(x(a, _(e, o, i, S, g, n)), ([h, w, v, m, d, u, T]) => {
          const R = Bo(w.sizeTree);
          (m && d !== null && u !== null && (v = d.scrollTop - u.offsetTop),
            (v -= T),
            h({ ranges: R, scrollTop: v }));
        }),
        O(x(p, P(Me), E(qo)), r),
        O(
          x(
            s,
            _(p),
            P(([, h]) => h !== void 0),
            Z(),
            E(([, h]) => h.ranges)
          ),
          t
        ),
        {
          getState: a,
          restoreStateFrom: p,
        }
      );
    },
    X(Et, at, ue, Pt, je)
  );
function qo(t) {
  return { align: 'start', index: 0, offset: t.scrollTop };
}
const Yo = U(([{ topItemsIndexes: t }]) => {
  const e = C(0);
  return (
    O(
      x(
        e,
        P(n => n >= 0),
        E(n => Array.from({ length: n }).map((o, r) => r))
      ),
      t
    ),
    { topItemCount: e }
  );
}, X(Dt));
function qn(t) {
  let e = false,
    n;
  return () => (e || ((e = true), (n = t())), n);
}
const Zo = qn(
    () =>
      /iP(ad|od|hone)/i.test(navigator.userAgent) &&
      /WebKit/i.test(navigator.userAgent)
  ),
  Xo = U(
    ([
      { deviation: t, scrollBy: e, scrollingInProgress: n, scrollTop: o },
      {
        isAtBottom: r,
        isScrolling: s,
        lastJumpDueToItemResize: i,
        scrollDirection: l,
      },
      { listState: c },
      { beforeUnshiftWith: a, gap: p, shiftWithOffset: S, sizes: g },
      { log: h },
      { recalcInProgress: w },
    ]) => {
      const v = ht(
        x(
          c,
          _(i),
          Rt(
            (
              [, d, u, T],
              [{ bottom: R, items: I, offsetBottom: f, totalCount: b }, k]
            ) => {
              const F = R + f;
              let L = 0;
              return (
                u === b &&
                  d.length > 0 &&
                  I.length > 0 &&
                  ((I[0].originalIndex === 0 && d[0].originalIndex === 0) ||
                    ((L = F - T), L !== 0 && (L += k))),
                [L, I, b, F]
              );
            },
            [0, [], 0, 0]
          ),
          P(([d]) => d !== 0),
          _(o, l, n, r, h, w),
          P(([, d, u, T, , , R]) => !R && !T && d !== 0 && u === le),
          E(
            ([[d], , , , , u]) => (
              u('Upward scrolling compensation', { amount: d }, mt.DEBUG),
              d
            )
          )
        )
      );
      function m(d) {
        d > 0
          ? (G(e, { behavior: 'auto', top: -d }), G(t, 0))
          : (G(t, 0), G(e, { behavior: 'auto', top: -d }));
      }
      return (
        K(x(v, _(t, s)), ([d, u, T]) => {
          T && Zo() ? G(t, u - d) : m(-d);
        }),
        K(
          x(
            rt(ct(s, false), t, w),
            P(([d, u, T]) => !d && !T && u !== 0),
            E(([d, u]) => u),
            Lt(1)
          ),
          m
        ),
        O(
          x(
            S,
            E(d => ({ top: -d }))
          ),
          e
        ),
        K(
          x(
            a,
            _(g, p),
            E(([d, { groupIndices: u, lastSize: T, sizeTree: R }, I]) => {
              function f(b) {
                return b * (T + I);
              }
              if (u.length === 0) return f(d);
              {
                let b = 0;
                const k = re(R, 0);
                let F = 0,
                  L = 0;
                for (; F < d; ) {
                  (F++, (b += k));
                  let V = u.length === L + 1 ? 1 / 0 : u[L + 1] - u[L] - 1;
                  (F + V > d && ((b -= k), (V = d - F + 1)),
                    (F += V),
                    (b += f(V)),
                    L++);
                }
                return b;
              }
            })
          ),
          d => {
            (G(t, d),
              requestAnimationFrame(() => {
                (G(e, { top: d }),
                  requestAnimationFrame(() => {
                    (G(t, 0), G(w, false));
                  }));
              }));
          }
        ),
        { deviation: t }
      );
    },
    X(at, ae, Dt, Et, Vt, Ne)
  ),
  Jo = U(
    ([t, e, n, o, r, s, i, l, c, a]) => ({
      ...t,
      ...e,
      ...n,
      ...o,
      ...r,
      ...s,
      ...i,
      ...l,
      ...c,
      ...a,
    }),
    X(Ke, Do, Pt, jn, Kn, $o, Go, je, Ko, Vt)
  ),
  Yn = U(
    ([
      {
        data: t,
        defaultItemSize: e,
        firstItemIndex: n,
        fixedItemSize: o,
        gap: r,
        groupIndices: s,
        itemSize: i,
        sizeRanges: l,
        sizes: c,
        statefulTotalCount: a,
        totalCount: p,
        trackItemSizes: S,
      },
      {
        initialItemFinalLocationReached: g,
        initialTopMostItemIndex: h,
        scrolledToInitialItem: w,
      },
      v,
      m,
      d,
      { listState: u, topItemsIndexes: T, ...R },
      { scrollToIndex: I },
      f,
      { topItemCount: b },
      { groupCounts: k },
      F,
    ]) => (
      O(R.rangeChanged, F.scrollSeekRangeChanged),
      O(
        x(
          F.windowViewportRect,
          E(L => L.visibleHeight)
        ),
        v.viewportHeight
      ),
      {
        data: t,
        defaultItemHeight: e,
        firstItemIndex: n,
        fixedItemHeight: o,
        gap: r,
        groupCounts: k,
        initialItemFinalLocationReached: g,
        initialTopMostItemIndex: h,
        scrolledToInitialItem: w,
        sizeRanges: l,
        topItemCount: b,
        topItemsIndexes: T,
        // input
        totalCount: p,
        ...d,
        groupIndices: s,
        itemSize: i,
        listState: u,
        scrollToIndex: I,
        // output
        statefulTotalCount: a,
        trackItemSizes: S,
        // exported from stateFlagsSystem
        ...R,
        // the bag of IO from featureGroup1System
        ...F,
        ...v,
        sizes: c,
        ...m,
      }
    ),
    X(Et, ue, at, jo, No, Dt, ce, Xo, Yo, Nn, Jo)
  );
function Qo(t, e) {
  const n = {},
    o = {};
  let r = 0;
  const s = t.length;
  for (; r < s; ) ((o[t[r]] = 1), (r += 1));
  for (const i in e) Object.hasOwn(o, i) || (n[i] = e[i]);
  return n;
}
const pe =
  typeof document < 'u'
    ? React__default.useLayoutEffect
    : React__default.useEffect;
function qe(t, e, n) {
  const o = Object.keys(e.required || {}),
    r = Object.keys(e.optional || {}),
    s = Object.keys(e.methods || {}),
    i = Object.keys(e.events || {}),
    l = React__default.createContext({});
  function c(d, u) {
    d.propsReady && G(d.propsReady, false);
    for (const T of o) {
      const R = d[e.required[T]];
      G(R, u[T]);
    }
    for (const T of r)
      if (T in u) {
        const R = d[e.optional[T]];
        G(R, u[T]);
      }
    d.propsReady && G(d.propsReady, true);
  }
  function a(d) {
    return s.reduce(
      (u, T) => (
        (u[T] = R => {
          const I = d[e.methods[T]];
          G(I, R);
        }),
        u
      ),
      {}
    );
  }
  function p(d) {
    return i.reduce((u, T) => ((u[T] = ho(d[e.events[T]])), u), {});
  }
  const S = React__default.forwardRef((d, u) => {
      const { children: T, ...R } = d,
        [I] = React__default.useState(() =>
          ve(Io(t), k => {
            c(k, R);
          })
        ),
        [f] = React__default.useState(un(p, I));
      (pe(() => {
        for (const k of i) k in R && K(f[k], R[k]);
        return () => {
          Object.values(f).map(We);
        };
      }, [R, f, I]),
        pe(() => {
          c(I, R);
        }),
        React__default.useImperativeHandle(u, cn$1(a(I))));
      const b = n;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(l.Provider, {
        value: I,
        children: n
          ? /* @__PURE__ */ jsxRuntimeExports.jsx(b, {
              ...Qo([...o, ...r, ...i], R),
              children: T,
            })
          : T,
      });
    }),
    g = d => {
      const u = React__default.useContext(l);
      return React__default.useCallback(
        T => {
          G(u[d], T);
        },
        [u, d]
      );
    },
    h = d => {
      const T = React__default.useContext(l)[d],
        R = React__default.useCallback(I => K(T, I), [T]);
      return React__default.useSyncExternalStore(
        R,
        () => st(T),
        () => st(T)
      );
    },
    w = d => {
      const T = React__default.useContext(l)[d],
        [R, I] = React__default.useState(un(st, T));
      return (
        pe(
          () =>
            K(T, f => {
              f !== R && I(cn$1(f));
            }),
          [T, R]
        ),
        R
      );
    },
    v = React__default.version.startsWith('18') ? h : w;
  return {
    Component: S,
    useEmitter: (d, u) => {
      const R = React__default.useContext(l)[d];
      pe(() => K(R, u), [u, R]);
    },
    useEmitterValue: v,
    usePublisher: g,
  };
}
const be = React__default.createContext(void 0),
  Zn = React__default.createContext(void 0),
  Xn =
    typeof document < 'u'
      ? React__default.useLayoutEffect
      : React__default.useEffect;
function ke(t) {
  return 'self' in t;
}
function tr(t) {
  return 'body' in t;
}
function Jn(t, e, n, o = Yt, r, s) {
  const i = React__default.useRef(null),
    l = React__default.useRef(null),
    c = React__default.useRef(null),
    a = React__default.useCallback(
      g => {
        let h, w, v;
        const m = g.target;
        if (tr(m) || ke(m)) {
          const u = ke(m) ? m : m.defaultView;
          ((v = s ? u.scrollX : u.scrollY),
            (h = s
              ? u.document.documentElement.scrollWidth
              : u.document.documentElement.scrollHeight),
            (w = s ? u.innerWidth : u.innerHeight));
        } else
          ((v = s ? m.scrollLeft : m.scrollTop),
            (h = s ? m.scrollWidth : m.scrollHeight),
            (w = s ? m.offsetWidth : m.offsetHeight));
        const d = () => {
          t({
            scrollHeight: h,
            scrollTop: Math.max(v, 0),
            viewportHeight: w,
          });
        };
        (g.suppressFlushSync ? d() : ReactDOM.flushSync(d),
          l.current !== null &&
            (v === l.current || v <= 0 || v === h - w) &&
            ((l.current = null),
            e(true),
            c.current && (clearTimeout(c.current), (c.current = null))));
      },
      [t, e, s]
    );
  React__default.useEffect(() => {
    const g = r || i.current;
    return (
      o(r || i.current),
      a({ suppressFlushSync: true, target: g }),
      g.addEventListener('scroll', a, { passive: true }),
      () => {
        (o(null), g.removeEventListener('scroll', a));
      }
    );
  }, [i, a, n, o, r]);
  function p(g) {
    const h = i.current;
    if (
      !h ||
      (s
        ? 'offsetWidth' in h && h.offsetWidth === 0
        : 'offsetHeight' in h && h.offsetHeight === 0)
    )
      return;
    const w = g.behavior === 'smooth';
    let v, m, d;
    ke(h)
      ? ((m = Math.max(
          wt(h.document.documentElement, s ? 'width' : 'height'),
          s
            ? h.document.documentElement.scrollWidth
            : h.document.documentElement.scrollHeight
        )),
        (v = s ? h.innerWidth : h.innerHeight),
        (d = s ? window.scrollX : window.scrollY))
      : ((m = h[s ? 'scrollWidth' : 'scrollHeight']),
        (v = wt(h, s ? 'width' : 'height')),
        (d = h[s ? 'scrollLeft' : 'scrollTop']));
    const u = m - v;
    if (
      ((g.top = Math.ceil(Math.max(Math.min(u, g.top), 0))),
      $n(v, m) || g.top === d)
    ) {
      (t({ scrollHeight: m, scrollTop: d, viewportHeight: v }), w && e(true));
      return;
    }
    (w
      ? ((l.current = g.top),
        c.current && clearTimeout(c.current),
        (c.current = setTimeout(() => {
          ((c.current = null), (l.current = null), e(true));
        }, 1e3)))
      : (l.current = null),
      s && (g = { behavior: g.behavior, left: g.top }),
      h.scrollTo(g));
  }
  function S(g) {
    (s && (g = { behavior: g.behavior, left: g.top }), i.current.scrollBy(g));
  }
  return { scrollByCallback: S, scrollerRef: i, scrollToCallback: p };
}
const Fe = '-webkit-sticky',
  Tn = 'sticky',
  Ye = qn(() => {
    if (typeof document > 'u') return Tn;
    const t = document.createElement('div');
    return ((t.style.position = Fe), t.style.position === Fe ? Fe : Tn);
  });
function Ze(t) {
  return t;
}
const er = /* @__PURE__ */ U(() => {
    const t = C(c => `Item ${c}`),
      e = C(null),
      n = C(c => `Group ${c}`),
      o = C({}),
      r = C(Ze),
      s = C('div'),
      i = C(Yt),
      l = (c, a = null) =>
        ct(
          x(
            o,
            E(p => p[c]),
            Z()
          ),
          a
        );
    return {
      components: o,
      computeItemKey: r,
      context: e,
      EmptyPlaceholder: l('EmptyPlaceholder'),
      FooterComponent: l('Footer'),
      GroupComponent: l('Group', 'div'),
      groupContent: n,
      HeaderComponent: l('Header'),
      HeaderFooterTag: s,
      ItemComponent: l('Item', 'div'),
      itemContent: t,
      ListComponent: l('List', 'div'),
      ScrollerComponent: l('Scroller', 'div'),
      scrollerRef: i,
      ScrollSeekPlaceholder: l('ScrollSeekPlaceholder'),
      TopItemListComponent: l('TopItemList'),
    };
  }),
  nr = /* @__PURE__ */ U(([t, e]) => ({ ...t, ...e }), X(Yn, er)),
  or = ({ height: t }) =>
    /* @__PURE__ */ jsxRuntimeExports.jsx('div', { style: { height: t } }),
  rr = { overflowAnchor: 'none', position: Ye(), zIndex: 1 },
  Qn = { overflowAnchor: 'none' },
  sr = { ...Qn, display: 'inline-block', height: '100%' },
  Cn = /* @__PURE__ */ React__default.memo(function ({
    showTopList: e = false,
  }) {
    const n = M('listState'),
      o = gt('sizeRanges'),
      r = M('useWindowScroll'),
      s = M('customScrollParent'),
      i = gt('windowScrollContainerState'),
      l = gt('scrollContainerState'),
      c = s || r ? i : l,
      a = M('itemContent'),
      p = M('context'),
      S = M('groupContent'),
      g = M('trackItemSizes'),
      h = M('itemSize'),
      w = M('log'),
      v = gt('gap'),
      m = M('horizontalDirection'),
      { callbackRef: d } = On(
        o,
        h,
        g,
        e ? Yt : c,
        w,
        v,
        s,
        m,
        M('skipAnimationFrameInResizeObserver')
      ),
      [u, T] = React__default.useState(0);
    Qe('deviation', B => {
      u !== B && T(B);
    });
    const R = M('EmptyPlaceholder'),
      I = M('ScrollSeekPlaceholder') || or,
      f = M('ListComponent'),
      b = M('ItemComponent'),
      k = M('GroupComponent'),
      F = M('computeItemKey'),
      L = M('isSeeking'),
      V = M('groupIndices').length > 0,
      D = M('alignToBottom'),
      J = M('initialItemFinalLocationReached'),
      nt = e
        ? {}
        : {
            boxSizing: 'border-box',
            ...(m
              ? {
                  display: 'inline-block',
                  height: '100%',
                  marginLeft: u !== 0 ? u : D ? 'auto' : 0,
                  paddingLeft: n.offsetTop,
                  paddingRight: n.offsetBottom,
                  whiteSpace: 'nowrap',
                }
              : {
                  marginTop: u !== 0 ? u : D ? 'auto' : 0,
                  paddingBottom: n.offsetBottom,
                  paddingTop: n.offsetTop,
                }),
            ...(J ? {} : { visibility: 'hidden' }),
          };
    return !e && n.totalCount === 0 && R
      ? /* @__PURE__ */ jsxRuntimeExports.jsx(R, { ...q(R, p) })
      : /* @__PURE__ */ jsxRuntimeExports.jsx(f, {
          ...q(f, p),
          'data-testid': e ? 'virtuoso-top-item-list' : 'virtuoso-item-list',
          ref: d,
          style: nt,
          children: (e ? n.topItems : n.items).map(B => {
            const Y = B.originalIndex,
              it = F(Y + n.firstItemIndex, B.data, p);
            return L
              ? /* @__PURE__ */ createElement(I, {
                  ...q(I, p),
                  height: B.size,
                  index: B.index,
                  key: it,
                  type: B.type || 'item',
                  ...(B.type === 'group' ? {} : { groupIndex: B.groupIndex }),
                })
              : B.type === 'group'
                ? /* @__PURE__ */ createElement(
                    k,
                    {
                      ...q(k, p),
                      'data-index': Y,
                      'data-item-index': B.index,
                      'data-known-size': B.size,
                      key: it,
                      style: rr,
                    },
                    S(B.index, p)
                  )
                : /* @__PURE__ */ createElement(
                    b,
                    {
                      ...q(b, p),
                      ...to(b, B.data),
                      'data-index': Y,
                      'data-item-group-index': B.groupIndex,
                      'data-item-index': B.index,
                      'data-known-size': B.size,
                      key: it,
                      style: m ? sr : Qn,
                    },
                    V
                      ? a(B.index, B.groupIndex, B.data, p)
                      : a(B.index, B.data, p)
                  );
          }),
        });
  }),
  ir = {
    height: '100%',
    outline: 'none',
    overflowY: 'auto',
    position: 'relative',
    WebkitOverflowScrolling: 'touch',
  },
  lr = {
    outline: 'none',
    overflowX: 'auto',
    position: 'relative',
  },
  Zt = t => ({
    height: '100%',
    position: 'absolute',
    top: 0,
    width: '100%',
    ...(t ? { display: 'flex', flexDirection: 'column' } : {}),
  }),
  cr = {
    position: Ye(),
    top: 0,
    width: '100%',
    zIndex: 1,
  };
function q(t, e) {
  if (typeof t != 'string') return { context: e };
}
function to(t, e) {
  return { item: typeof t == 'string' ? void 0 : e };
}
const ur = /* @__PURE__ */ React__default.memo(function () {
    const e = M('HeaderComponent'),
      n = gt('headerHeight'),
      o = M('HeaderFooterTag'),
      r = Ht(
        React__default.useMemo(
          () => i => {
            n(wt(i, 'height'));
          },
          [n]
        ),
        true,
        M('skipAnimationFrameInResizeObserver')
      ),
      s = M('context');
    return e
      ? /* @__PURE__ */ jsxRuntimeExports.jsx(o, {
          ref: r,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(e, { ...q(e, s) }),
        })
      : null;
  }),
  ar = /* @__PURE__ */ React__default.memo(function () {
    const e = M('FooterComponent'),
      n = gt('footerHeight'),
      o = M('HeaderFooterTag'),
      r = Ht(
        React__default.useMemo(
          () => i => {
            n(wt(i, 'height'));
          },
          [n]
        ),
        true,
        M('skipAnimationFrameInResizeObserver')
      ),
      s = M('context');
    return e
      ? /* @__PURE__ */ jsxRuntimeExports.jsx(o, {
          ref: r,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(e, { ...q(e, s) }),
        })
      : null;
  });
function Xe({ useEmitter: t, useEmitterValue: e, usePublisher: n }) {
  return React__default.memo(function ({ children: s, style: i, ...l }) {
    const c = n('scrollContainerState'),
      a = e('ScrollerComponent'),
      p = n('smoothScrollTargetReached'),
      S = e('scrollerRef'),
      g = e('context'),
      h = e('horizontalDirection') || false,
      {
        scrollByCallback: w,
        scrollerRef: v,
        scrollToCallback: m,
      } = Jn(c, p, a, S, void 0, h);
    return (
      t('scrollTo', m),
      t('scrollBy', w),
      /* @__PURE__ */ jsxRuntimeExports.jsx(a, {
        'data-testid': 'virtuoso-scroller',
        'data-virtuoso-scroller': true,
        ref: v,
        style: { ...(h ? lr : ir), ...i },
        tabIndex: 0,
        ...l,
        ...q(a, g),
        children: s,
      })
    );
  });
}
function Je({ useEmitter: t, useEmitterValue: e, usePublisher: n }) {
  return React__default.memo(function ({ children: s, style: i, ...l }) {
    const c = n('windowScrollContainerState'),
      a = e('ScrollerComponent'),
      p = n('smoothScrollTargetReached'),
      S = e('totalListHeight'),
      g = e('deviation'),
      h = e('customScrollParent'),
      w = e('context'),
      v = React__default.useRef(null),
      m = e('scrollerRef'),
      {
        scrollByCallback: d,
        scrollerRef: u,
        scrollToCallback: T,
      } = Jn(c, p, a, m, h);
    return (
      Xn(() => {
        var R;
        return (
          (u.current =
            h ||
            ((R = v.current) == null ? void 0 : R.ownerDocument.defaultView)),
          () => {
            u.current = null;
          }
        );
      }, [u, h]),
      t('windowScrollTo', T),
      t('scrollBy', d),
      /* @__PURE__ */ jsxRuntimeExports.jsx(a, {
        ref: v,
        'data-virtuoso-scroller': true,
        style: {
          position: 'relative',
          ...i,
          ...(S !== 0 ? { height: S + g } : {}),
        },
        ...l,
        ...q(a, w),
        children: s,
      })
    );
  });
}
const dr = ({ children: t }) => {
    const e = React__default.useContext(be),
      n = gt('viewportHeight'),
      o = gt('fixedItemHeight'),
      r = M('alignToBottom'),
      s = M('horizontalDirection'),
      i = React__default.useMemo(
        () => ne(n, c => wt(c, s ? 'width' : 'height')),
        [n, s]
      ),
      l = Ht(i, true, M('skipAnimationFrameInResizeObserver'));
    return (
      React__default.useEffect(() => {
        e && (n(e.viewportHeight), o(e.itemHeight));
      }, [e, n, o]),
      /* @__PURE__ */ jsxRuntimeExports.jsx('div', {
        'data-viewport-type': 'element',
        ref: l,
        style: Zt(r),
        children: t,
      })
    );
  },
  fr = ({ children: t }) => {
    const e = React__default.useContext(be),
      n = gt('windowViewportRect'),
      o = gt('fixedItemHeight'),
      r = M('customScrollParent'),
      s = _e(n, r, M('skipAnimationFrameInResizeObserver')),
      i = M('alignToBottom');
    return (
      React__default.useEffect(() => {
        e &&
          (o(e.itemHeight),
          n({
            offsetTop: 0,
            visibleHeight: e.viewportHeight,
            visibleWidth: 100,
          }));
      }, [e, n, o]),
      /* @__PURE__ */ jsxRuntimeExports.jsx('div', {
        'data-viewport-type': 'window',
        ref: s,
        style: Zt(i),
        children: t,
      })
    );
  },
  mr = ({ children: t }) => {
    const e = M('TopItemListComponent') || 'div',
      n = M('headerHeight'),
      o = { ...cr, marginTop: `${n}px` },
      r = M('context');
    return /* @__PURE__ */ jsxRuntimeExports.jsx(e, {
      style: o,
      ...q(e, r),
      children: t,
    });
  },
  pr = /* @__PURE__ */ React__default.memo(function (e) {
    const n = M('useWindowScroll'),
      o = M('topItemsIndexes').length > 0,
      r = M('customScrollParent'),
      s = M('context'),
      i = r || n ? gr : hr,
      l = r || n ? fr : dr;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(i, {
      ...e,
      ...q(i, s),
      children: [
        o &&
          /* @__PURE__ */ jsxRuntimeExports.jsx(mr, {
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cn, {
              showTopList: true,
            }),
          }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(l, {
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ur, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Cn, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ar, {}),
          ],
        }),
      ],
    });
  }),
  {
    Component: eo,
    useEmitter: Qe,
    useEmitterValue: M,
    usePublisher: gt,
  } = /* @__PURE__ */ qe(
    nr,
    {
      required: {},
      optional: {
        restoreStateFrom: 'restoreStateFrom',
        context: 'context',
        followOutput: 'followOutput',
        itemContent: 'itemContent',
        groupContent: 'groupContent',
        overscan: 'overscan',
        increaseViewportBy: 'increaseViewportBy',
        totalCount: 'totalCount',
        groupCounts: 'groupCounts',
        topItemCount: 'topItemCount',
        firstItemIndex: 'firstItemIndex',
        initialTopMostItemIndex: 'initialTopMostItemIndex',
        components: 'components',
        atBottomThreshold: 'atBottomThreshold',
        atTopThreshold: 'atTopThreshold',
        computeItemKey: 'computeItemKey',
        defaultItemHeight: 'defaultItemHeight',
        fixedItemHeight: 'fixedItemHeight',
        itemSize: 'itemSize',
        scrollSeekConfiguration: 'scrollSeekConfiguration',
        headerFooterTag: 'HeaderFooterTag',
        data: 'data',
        initialItemCount: 'initialItemCount',
        initialScrollTop: 'initialScrollTop',
        alignToBottom: 'alignToBottom',
        useWindowScroll: 'useWindowScroll',
        customScrollParent: 'customScrollParent',
        scrollerRef: 'scrollerRef',
        logLevel: 'logLevel',
        horizontalDirection: 'horizontalDirection',
        skipAnimationFrameInResizeObserver:
          'skipAnimationFrameInResizeObserver',
      },
      methods: {
        scrollToIndex: 'scrollToIndex',
        scrollIntoView: 'scrollIntoView',
        scrollTo: 'scrollTo',
        scrollBy: 'scrollBy',
        autoscrollToBottom: 'autoscrollToBottom',
        getState: 'getState',
      },
      events: {
        isScrolling: 'isScrolling',
        endReached: 'endReached',
        startReached: 'startReached',
        rangeChanged: 'rangeChanged',
        atBottomStateChange: 'atBottomStateChange',
        atTopStateChange: 'atTopStateChange',
        totalListHeightChanged: 'totalListHeightChanged',
        itemsRendered: 'itemsRendered',
        groupIndices: 'groupIndices',
      },
    },
    pr
  ),
  hr = /* @__PURE__ */ Xe({
    useEmitter: Qe,
    useEmitterValue: M,
    usePublisher: gt,
  }),
  gr = /* @__PURE__ */ Je({
    useEmitter: Qe,
    useEmitterValue: M,
    usePublisher: gt,
  }),
  jr = eo,
  Ir = /* @__PURE__ */ U(() => {
    const t = C(a =>
        /* @__PURE__ */ jsxRuntimeExports.jsxs('td', {
          children: ['Item $', a],
        })
      ),
      e = C(null),
      n = C(a =>
        /* @__PURE__ */ jsxRuntimeExports.jsxs('td', {
          colSpan: 1e3,
          children: ['Group ', a],
        })
      ),
      o = C(null),
      r = C(null),
      s = C({}),
      i = C(Ze),
      l = C(Yt),
      c = (a, p = null) =>
        ct(
          x(
            s,
            E(S => S[a]),
            Z()
          ),
          p
        );
    return {
      components: s,
      computeItemKey: i,
      context: e,
      EmptyPlaceholder: c('EmptyPlaceholder'),
      FillerRow: c('FillerRow'),
      fixedFooterContent: r,
      fixedHeaderContent: o,
      itemContent: t,
      groupContent: n,
      ScrollerComponent: c('Scroller', 'div'),
      scrollerRef: l,
      ScrollSeekPlaceholder: c('ScrollSeekPlaceholder'),
      TableBodyComponent: c('TableBody', 'tbody'),
      TableComponent: c('Table', 'table'),
      TableFooterComponent: c('TableFoot', 'tfoot'),
      TableHeadComponent: c('TableHead', 'thead'),
      TableRowComponent: c('TableRow', 'tr'),
      GroupComponent: c('Group', 'tr'),
    };
  });
/* @__PURE__ */ U(([t, e]) => ({ ...t, ...e }), X(Yn, Ir));
({ position: Ye() });
const yn = {
    bottom: 0,
    itemHeight: 0,
    items: [],
    itemWidth: 0,
    offsetBottom: 0,
    offsetTop: 0,
    top: 0,
  },
  Er = {
    bottom: 0,
    itemHeight: 0,
    items: [{ index: 0 }],
    itemWidth: 0,
    offsetBottom: 0,
    offsetTop: 0,
    top: 0,
  },
  { ceil: Rn, floor: Ce, max: ee, min: Oe, round: bn } = Math;
function Hn(t, e, n) {
  return Array.from({ length: e - t + 1 }).map((o, r) => ({
    data: n === null ? null : n[r + t],
    index: r + t,
  }));
}
function Br(t) {
  return {
    ...Er,
    items: t,
  };
}
function he(t, e) {
  return t && t.width === e.width && t.height === e.height;
}
function kr(t, e) {
  return t && t.column === e.column && t.row === e.row;
}
const Fr = /* @__PURE__ */ U(
  ([
    { increaseViewportBy: t, listBoundary: e, overscan: n, visibleRange: o },
    {
      footerHeight: r,
      headerHeight: s,
      scrollBy: i,
      scrollContainerState: l,
      scrollTo: c,
      scrollTop: a,
      smoothScrollTargetReached: p,
      viewportHeight: S,
    },
    g,
    h,
    { didMount: w, propsReady: v },
    {
      customScrollParent: m,
      useWindowScroll: d,
      windowScrollContainerState: u,
      windowScrollTo: T,
      windowViewportRect: R,
    },
    I,
  ]) => {
    const f = C(0),
      b = C(0),
      k = C(yn),
      F = C({ height: 0, width: 0 }),
      L = C({ height: 0, width: 0 }),
      V = $(),
      D = $(),
      J = C(0),
      nt = C(null),
      B = C({ column: 0, row: 0 }),
      Y = $(),
      it = $(),
      dt = C(false),
      St = C(0),
      ft = C(true),
      ut = C(false),
      At = C(false);
    (K(
      x(
        w,
        _(St),
        P(([y, N]) => !!N)
      ),
      () => {
        G(ft, false);
      }
    ),
      K(
        x(
          rt(w, ft, L, F, St, ut),
          P(
            ([y, N, Q, lt, , tt]) =>
              y && !N && Q.height !== 0 && lt.height !== 0 && !tt
          )
        ),
        ([, , , , y]) => {
          (G(ut, true),
            $e(1, () => {
              G(V, y);
            }),
            bt(x(a), () => {
              (G(e, [0, 0]), G(ft, true));
            }));
        }
      ),
      O(
        x(
          it,
          P(y => y != null && y.scrollTop > 0),
          yt(0)
        ),
        b
      ),
      K(
        x(
          w,
          _(it),
          P(([, y]) => y != null)
        ),
        ([, y]) => {
          y &&
            (G(F, y.viewport),
            G(L, y.item),
            G(B, y.gap),
            y.scrollTop > 0 &&
              (G(dt, true),
              bt(x(a, jt(1)), N => {
                G(dt, false);
              }),
              G(c, { top: y.scrollTop })));
        }
      ),
      O(
        x(
          F,
          E(({ height: y }) => y)
        ),
        S
      ),
      O(
        x(
          rt(
            A(F, he),
            A(L, he),
            A(B, (y, N) => y && y.column === N.column && y.row === N.row),
            A(a)
          ),
          E(([y, N, Q, lt]) => ({
            gap: Q,
            item: N,
            scrollTop: lt,
            viewport: y,
          }))
        ),
        Y
      ),
      O(
        x(
          rt(
            A(f),
            o,
            A(B, kr),
            A(L, he),
            A(F, he),
            A(nt),
            A(b),
            A(dt),
            A(ft),
            A(St)
          ),
          P(([, , , , , , , y]) => !y),
          E(([y, [N, Q], lt, tt, kt, Jt, $t, , de, Ft]) => {
            const { column: Ot, row: Qt } = lt,
              { height: fe, width: He } = tt,
              { width: en } = kt;
            if ($t === 0 && (y === 0 || en === 0)) return yn;
            if (He === 0) {
              const ln = Ue(Ft, y),
                io = ln + Math.max($t - 1, 0);
              return Br(Hn(ln, io, Jt));
            }
            const me = oo(en, He, Ot);
            let Ut, Wt;
            de
              ? N === 0 && Q === 0 && $t > 0
                ? ((Ut = 0), (Wt = $t - 1))
                : ((Ut = me * Ce((N + Qt) / (fe + Qt))),
                  (Wt = me * Rn((Q + Qt) / (fe + Qt)) - 1),
                  (Wt = Oe(y - 1, ee(Wt, me - 1))),
                  (Ut = Oe(Wt, ee(0, Ut))))
              : ((Ut = 0), (Wt = -1));
            const nn = Hn(Ut, Wt, Jt),
              { bottom: on, top: rn } = En(kt, lt, tt, nn),
              sn = Rn(y / me),
              so = sn * fe + (sn - 1) * Qt - on;
            return {
              bottom: on,
              itemHeight: fe,
              items: nn,
              itemWidth: He,
              offsetBottom: so,
              offsetTop: rn,
              top: rn,
            };
          })
        ),
        k
      ),
      O(
        x(
          nt,
          P(y => y !== null),
          E(y => y.length)
        ),
        f
      ),
      O(
        x(
          rt(F, L, k, B),
          P(
            ([y, N, { items: Q }]) =>
              Q.length > 0 && N.height !== 0 && y.height !== 0
          ),
          E(([y, N, { items: Q }, lt]) => {
            const { bottom: tt, top: kt } = En(y, lt, N, Q);
            return [kt, tt];
          }),
          Z(se)
        ),
        e
      ));
    const xt = C(false);
    O(
      x(
        a,
        _(xt),
        E(([y, N]) => N || y !== 0)
      ),
      xt
    );
    const Xt = ht(
        x(
          rt(k, f),
          P(([{ items: y }]) => y.length > 0),
          _(xt),
          P(([[y, N], Q]) => {
            const tt = y.items[y.items.length - 1].index === N - 1;
            return (
              (Q ||
                (y.bottom > 0 &&
                  y.itemHeight > 0 &&
                  y.offsetBottom === 0 &&
                  y.items.length === N)) &&
              tt
            );
          }),
          E(([[, y]]) => y - 1),
          Z()
        )
      ),
      Mt = ht(
        x(
          A(k),
          P(({ items: y }) => y.length > 0 && y[0].index === 0),
          yt(0),
          Z()
        )
      ),
      vt = ht(
        x(
          A(k),
          _(dt),
          P(([{ items: y }, N]) => y.length > 0 && !N),
          E(([{ items: y }]) => ({
            endIndex: y[y.length - 1].index,
            startIndex: y[0].index,
          })),
          Z(Mn),
          Lt(0)
        )
      );
    (O(vt, h.scrollSeekRangeChanged),
      O(
        x(
          V,
          _(F, L, f, B),
          E(([y, N, Q, lt, tt]) => {
            const kt = Dn(y),
              { align: Jt, behavior: $t, offset: de } = kt;
            let Ft = kt.index;
            (Ft === 'LAST' && (Ft = lt - 1), (Ft = ee(0, Ft, Oe(lt - 1, Ft))));
            let Ot = Ae(N, tt, Q, Ft);
            return (
              Jt === 'end'
                ? (Ot = bn(Ot - N.height + Q.height))
                : Jt === 'center' &&
                  (Ot = bn(Ot - N.height / 2 + Q.height / 2)),
              de && (Ot += de),
              { behavior: $t, top: Ot }
            );
          })
        ),
        c
      ));
    const Bt = ct(
      x(
        k,
        E(y => y.offsetBottom + y.bottom)
      ),
      0
    );
    return (
      O(
        x(
          R,
          E(y => ({ height: y.visibleHeight, width: y.visibleWidth }))
        ),
        F
      ),
      {
        customScrollParent: m,
        // input
        data: nt,
        deviation: J,
        footerHeight: r,
        gap: B,
        headerHeight: s,
        increaseViewportBy: t,
        initialItemCount: b,
        itemDimensions: L,
        overscan: n,
        restoreStateFrom: it,
        scrollBy: i,
        scrollContainerState: l,
        scrollHeight: D,
        scrollTo: c,
        scrollToIndex: V,
        scrollTop: a,
        smoothScrollTargetReached: p,
        totalCount: f,
        useWindowScroll: d,
        viewportDimensions: F,
        windowScrollContainerState: u,
        windowScrollTo: T,
        windowViewportRect: R,
        ...h,
        // output
        gridState: k,
        horizontalDirection: At,
        initialTopMostItemIndex: St,
        totalListHeight: Bt,
        ...g,
        endReached: Xt,
        propsReady: v,
        rangeChanged: vt,
        startReached: Mt,
        stateChanged: Y,
        stateRestoreInProgress: dt,
        ...I,
      }
    );
  },
  X(Ke, at, ae, jn, Pt, je, Vt)
);
function oo(t, e, n) {
  return ee(1, Ce((t + n) / (Ce(e) + n)));
}
function En(t, e, n, o) {
  const { height: r } = n;
  if (r === void 0 || o.length === 0) return { bottom: 0, top: 0 };
  const s = Ae(t, e, n, o[0].index);
  return { bottom: Ae(t, e, n, o[o.length - 1].index) + r, top: s };
}
function Ae(t, e, n, o) {
  const r = oo(t.width, n.width, e.column),
    s = Ce(o / r),
    i = s * n.height + ee(0, s - 1) * e.row;
  return i > 0 ? i + e.row : i;
}
const Or = /* @__PURE__ */ U(() => {
    const t = C(S => `Item ${S}`),
      e = C({}),
      n = C(null),
      o = C('virtuoso-grid-item'),
      r = C('virtuoso-grid-list'),
      s = C(Ze),
      i = C('div'),
      l = C(Yt),
      c = (S, g = null) =>
        ct(
          x(
            e,
            E(h => h[S]),
            Z()
          ),
          g
        ),
      a = C(false),
      p = C(false);
    return (
      O(A(p), a),
      {
        components: e,
        computeItemKey: s,
        context: n,
        FooterComponent: c('Footer'),
        HeaderComponent: c('Header'),
        headerFooterTag: i,
        itemClassName: o,
        ItemComponent: c('Item', 'div'),
        itemContent: t,
        listClassName: r,
        ListComponent: c('List', 'div'),
        readyStateChanged: a,
        reportReadyState: p,
        ScrollerComponent: c('Scroller', 'div'),
        scrollerRef: l,
        ScrollSeekPlaceholder: c('ScrollSeekPlaceholder', 'div'),
      }
    );
  }),
  Lr = /* @__PURE__ */ U(([t, e]) => ({ ...t, ...e }), X(Fr, Or)),
  zr = /* @__PURE__ */ React__default.memo(function () {
    const e = et('gridState'),
      n = et('listClassName'),
      o = et('itemClassName'),
      r = et('itemContent'),
      s = et('computeItemKey'),
      i = et('isSeeking'),
      l = It('scrollHeight'),
      c = et('ItemComponent'),
      a = et('ListComponent'),
      p = et('ScrollSeekPlaceholder'),
      S = et('context'),
      g = It('itemDimensions'),
      h = It('gap'),
      w = et('log'),
      v = et('stateRestoreInProgress'),
      m = It('reportReadyState'),
      d = Ht(
        React__default.useMemo(
          () => u => {
            const T = u.parentElement.parentElement.scrollHeight;
            l(T);
            const R = u.firstChild;
            if (R) {
              const { height: I, width: f } = R.getBoundingClientRect();
              g({ height: I, width: f });
            }
            h({
              column: Bn('column-gap', getComputedStyle(u).columnGap, w),
              row: Bn('row-gap', getComputedStyle(u).rowGap, w),
            });
          },
          [l, g, h, w]
        ),
        true,
        false
      );
    return (
      Xn(() => {
        e.itemHeight > 0 && e.itemWidth > 0 && m(true);
      }, [e]),
      v
        ? null
        : /* @__PURE__ */ jsxRuntimeExports.jsx(a, {
            className: n,
            ref: d,
            ...q(a, S),
            'data-testid': 'virtuoso-item-list',
            style: { paddingBottom: e.offsetBottom, paddingTop: e.offsetTop },
            children: e.items.map(u => {
              const T = s(u.index, u.data, S);
              return i
                ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    p,
                    {
                      ...q(p, S),
                      height: e.itemHeight,
                      index: u.index,
                      width: e.itemWidth,
                    },
                    T
                  )
                : /* @__PURE__ */ createElement(
                    c,
                    {
                      ...q(c, S),
                      className: o,
                      'data-index': u.index,
                      key: T,
                    },
                    r(u.index, u.data, S)
                  );
            }),
          })
    );
  }),
  Vr = React__default.memo(function () {
    const e = et('HeaderComponent'),
      n = It('headerHeight'),
      o = et('headerFooterTag'),
      r = Ht(
        React__default.useMemo(
          () => i => {
            n(wt(i, 'height'));
          },
          [n]
        ),
        true,
        false
      ),
      s = et('context');
    return e
      ? /* @__PURE__ */ jsxRuntimeExports.jsx(o, {
          ref: r,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(e, { ...q(e, s) }),
        })
      : null;
  }),
  Pr = React__default.memo(function () {
    const e = et('FooterComponent'),
      n = It('footerHeight'),
      o = et('headerFooterTag'),
      r = Ht(
        React__default.useMemo(
          () => i => {
            n(wt(i, 'height'));
          },
          [n]
        ),
        true,
        false
      ),
      s = et('context');
    return e
      ? /* @__PURE__ */ jsxRuntimeExports.jsx(o, {
          ref: r,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(e, { ...q(e, s) }),
        })
      : null;
  }),
  Ar = ({ children: t }) => {
    const e = React__default.useContext(Zn),
      n = It('itemDimensions'),
      o = It('viewportDimensions'),
      r = Ht(
        React__default.useMemo(
          () => s => {
            o(s.getBoundingClientRect());
          },
          [o]
        ),
        true,
        false
      );
    return (
      React__default.useEffect(() => {
        e &&
          (o({ height: e.viewportHeight, width: e.viewportWidth }),
          n({ height: e.itemHeight, width: e.itemWidth }));
      }, [e, o, n]),
      /* @__PURE__ */ jsxRuntimeExports.jsx('div', {
        ref: r,
        style: Zt(false),
        children: t,
      })
    );
  },
  Mr = ({ children: t }) => {
    const e = React__default.useContext(Zn),
      n = It('windowViewportRect'),
      o = It('itemDimensions'),
      r = et('customScrollParent'),
      s = _e(n, r, false);
    return (
      React__default.useEffect(() => {
        e &&
          (o({ height: e.itemHeight, width: e.itemWidth }),
          n({
            offsetTop: 0,
            visibleHeight: e.viewportHeight,
            visibleWidth: e.viewportWidth,
          }));
      }, [e, n, o]),
      /* @__PURE__ */ jsxRuntimeExports.jsx('div', {
        ref: s,
        style: Zt(false),
        children: t,
      })
    );
  },
  Wr = /* @__PURE__ */ React__default.memo(function ({ ...e }) {
    const n = et('useWindowScroll'),
      o = et('customScrollParent'),
      r = o || n ? Nr : _r,
      s = o || n ? Mr : Ar,
      i = et('context');
    return /* @__PURE__ */ jsxRuntimeExports.jsx(r, {
      ...e,
      ...q(r, i),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(s, {
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Vr, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(zr, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pr, {}),
        ],
      }),
    });
  }),
  {
    useEmitter: ro,
    useEmitterValue: et,
    usePublisher: It,
  } = /* @__PURE__ */ qe(
    Lr,
    {
      optional: {
        context: 'context',
        totalCount: 'totalCount',
        overscan: 'overscan',
        itemContent: 'itemContent',
        components: 'components',
        computeItemKey: 'computeItemKey',
        data: 'data',
        initialItemCount: 'initialItemCount',
        scrollSeekConfiguration: 'scrollSeekConfiguration',
        headerFooterTag: 'headerFooterTag',
        listClassName: 'listClassName',
        itemClassName: 'itemClassName',
        useWindowScroll: 'useWindowScroll',
        customScrollParent: 'customScrollParent',
        scrollerRef: 'scrollerRef',
        logLevel: 'logLevel',
        restoreStateFrom: 'restoreStateFrom',
        initialTopMostItemIndex: 'initialTopMostItemIndex',
        increaseViewportBy: 'increaseViewportBy',
      },
      methods: {
        scrollTo: 'scrollTo',
        scrollBy: 'scrollBy',
        scrollToIndex: 'scrollToIndex',
      },
      events: {
        isScrolling: 'isScrolling',
        endReached: 'endReached',
        startReached: 'startReached',
        rangeChanged: 'rangeChanged',
        atBottomStateChange: 'atBottomStateChange',
        atTopStateChange: 'atTopStateChange',
        stateChanged: 'stateChanged',
        readyStateChanged: 'readyStateChanged',
      },
    },
    Wr
  ),
  _r = /* @__PURE__ */ Xe({
    useEmitter: ro,
    useEmitterValue: et,
    usePublisher: It,
  }),
  Nr = /* @__PURE__ */ Je({
    useEmitter: ro,
    useEmitterValue: et,
    usePublisher: It,
  });
function Bn(t, e, n) {
  return (
    e !== 'normal' &&
      !(e != null && e.endsWith('px')) &&
      n(`${t} was not resolved to pixel value correctly`, e, mt.WARN),
    e === 'normal' ? 0 : parseInt(e != null ? e : '0', 10)
  );
}

const instanceOfAny = (object, constructors) =>
  constructors.some(c => object instanceof c);

let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
  return (
    idbProxyableTypes ||
    (idbProxyableTypes = [
      IDBDatabase,
      IDBObjectStore,
      IDBIndex,
      IDBCursor,
      IDBTransaction,
    ])
  );
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
  return (
    cursorAdvanceMethods ||
    (cursorAdvanceMethods = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const transactionDoneMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener('success', success);
      request.removeEventListener('error', error);
    };
    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };
    const error = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener('success', success);
    request.addEventListener('error', error);
  });
  // This mapping exists in reverseTransformCache but doesn't exist in transformCache. This
  // is because we create many promises from a single IDBRequest.
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  // Early bail if we've already created a done promise for this transaction.
  if (transactionDoneMap.has(tx)) return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener('complete', complete);
      tx.removeEventListener('error', error);
      tx.removeEventListener('abort', error);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error = () => {
      reject(tx.error || new DOMException('AbortError', 'AbortError'));
      unlisten();
    };
    tx.addEventListener('complete', complete);
    tx.addEventListener('error', error);
    tx.addEventListener('abort', error);
  });
  // Cache it for later retrieval.
  transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      // Special handling for transaction.done.
      if (prop === 'done') return transactionDoneMap.get(target);
      // Make tx.store return the only store in the transaction, or undefined if there are many.
      if (prop === 'store') {
        return receiver.objectStoreNames[1]
          ? undefined
          : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    // Else transform whatever we get back.
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    if (
      target instanceof IDBTransaction &&
      (prop === 'done' || prop === 'store')
    ) {
      return true;
    }
    return prop in target;
  },
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  // Due to expected object equality (which is enforced by the caching in `wrap`), we
  // only create one new func per func.
  // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
  // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
  // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
  // with real promises, so each advance methods returns a new promise for the cursor object, or
  // undefined if the end of the cursor has been reached.
  if (getCursorAdvanceMethods().includes(func)) {
    return function (...args) {
      // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
      // the original object.
      func.apply(unwrap(this), args);
      return wrap(this.request);
    };
  }
  return function (...args) {
    // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
    // the original object.
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === 'function') return wrapFunction(value);
  // This doesn't return, it just creates a 'done' promise for the transaction,
  // which is later returned for transaction.done (see idbObjectHandler).
  if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes()))
    return new Proxy(value, idbProxyTraps);
  // Return the same value back if we're not going to transform it.
  return value;
}
function wrap(value) {
  // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
  // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
  if (value instanceof IDBRequest) return promisifyRequest(value);
  // If we've already transformed this value before, reuse the transformed value.
  // This is faster, but it also provides object equality.
  if (transformCache.has(value)) return transformCache.get(value);
  const newValue = transformCachableValue(value);
  // Not all types are transformed.
  // These may be primitive types, so they can't be WeakMap keys.
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
const unwrap = value => reverseTransformCache.get(value);

/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(
  name,
  version,
  { blocked, upgrade, blocking, terminated } = {}
) {
  const request = indexedDB.open(name, version);
  const openPromise = wrap(request);
  if (upgrade) {
    request.addEventListener('upgradeneeded', event => {
      upgrade(
        wrap(request.result),
        event.oldVersion,
        event.newVersion,
        wrap(request.transaction),
        event
      );
    });
  }
  if (blocked) {
    request.addEventListener('blocked', event =>
      blocked(
        // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion,
        event.newVersion,
        event
      )
    );
  }
  openPromise
    .then(db => {
      if (terminated) db.addEventListener('close', () => terminated());
      if (blocking) {
        db.addEventListener('versionchange', event =>
          blocking(event.oldVersion, event.newVersion, event)
        );
      }
    })
    .catch(() => {});
  return openPromise;
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
  if (
    !(
      target instanceof IDBDatabase &&
      !(prop in target) &&
      typeof prop === 'string'
    )
  ) {
    return;
  }
  if (cachedMethods.get(prop)) return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, '');
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
    !(isWrite || readMethods.includes(targetFuncName))
  ) {
    return;
  }
  const method = async function (storeName, ...args) {
    // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
    const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
    let target = tx.store;
    if (useIndex) target = target.index(args.shift());
    // Must reject if op rejects.
    // If it's a write operation, must reject if tx.done rejects.
    // Must reject with op rejection first.
    // Must resolve with op value.
    // Must handle both promises (no unhandled rejections)
    return (
      await Promise.all([target[targetFuncName](...args), isWrite && tx.done])
    )[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
replaceTraps(oldTraps => ({
  ...oldTraps,
  get: (target, prop, receiver) =>
    getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) =>
    !!getMethod(target, prop) || oldTraps.has(target, prop),
}));

const advanceMethodProps = ['continue', 'continuePrimaryKey', 'advance'];
const methodMap = {};
const advanceResults = new WeakMap();
const ittrProxiedCursorToOriginalProxy = new WeakMap();
const cursorIteratorTraps = {
  get(target, prop) {
    if (!advanceMethodProps.includes(prop)) return target[prop];
    let cachedFunc = methodMap[prop];
    if (!cachedFunc) {
      cachedFunc = methodMap[prop] = function (...args) {
        advanceResults.set(
          this,
          ittrProxiedCursorToOriginalProxy.get(this)[prop](...args)
        );
      };
    }
    return cachedFunc;
  },
};
async function* iterate(...args) {
  // tslint:disable-next-line:no-this-assignment
  let cursor = this;
  if (!(cursor instanceof IDBCursor)) {
    cursor = await cursor.openCursor(...args);
  }
  if (!cursor) return;
  cursor = cursor;
  const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
  ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
  // Map this double-proxy back to the original, so other cursor methods work.
  reverseTransformCache.set(proxiedCursor, unwrap(cursor));
  while (cursor) {
    yield proxiedCursor;
    // If one of the advancing methods was not called, call continue().
    cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
    advanceResults.delete(proxiedCursor);
  }
}
function isIteratorProp(target, prop) {
  return (
    (prop === Symbol.asyncIterator &&
      instanceOfAny(target, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (prop === 'iterate' && instanceOfAny(target, [IDBIndex, IDBObjectStore]))
  );
}
replaceTraps(oldTraps => ({
  ...oldTraps,
  get(target, prop, receiver) {
    if (isIteratorProp(target, prop)) return iterate;
    return oldTraps.get(target, prop, receiver);
  },
  has(target, prop) {
    return isIteratorProp(target, prop) || oldTraps.has(target, prop);
  },
}));

/**
 * Utility function to merge class names
 * Combines multiple class names and filters out falsy values
 */
function cn(...inputs) {
  return clsx$1(inputs);
}
/**
 * Utility function to save messages to indexedDBs
 */
const getDB = async () => {
  return await openDB('chatbox-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('messages')) {
        db.createObjectStore('messages');
      }
    },
  });
};
const readIndexedDB = async conversationId => {
  try {
    const db = await getDB();
    return (await db.get('messages', conversationId)) || null;
  } catch (err) {
    console.error('IndexedDB read error:', err);
    return null;
  }
};
const writeIndexedDB = async (conversationId, messages) => {
  try {
    const db = await getDB();
    await db.put('messages', messages, conversationId);
  } catch (err) {
    console.error('IndexedDB write error:', err);
  }
};
const scrollToEnd = (virtuosoRef, messages) => {
  if (!virtuosoRef) return;
  virtuosoRef.scrollToIndex({
    index: messages?.length || 0,
    align: 'end',
    behavior: 'smooth',
  });
};

var styles = {
  msgComponent: 'MessageList-module__msgComponent___buiq1',
  messageListContainer: 'MessageList-module__messageListContainer___-6o9-',
};

const MessageComponent = memo(
  ({
    item,
    className = '',
    textMessageOverride,
    imageMessageOverride,
    videoMessageOverride,
    textMessageProps,
    imageMessageProps,
    videoMessageProps,
    timeLabelProps,
    avatarProps,
  }) => {
    const {
      avatarUrl,
      message,
      speakerType,
      createdAt,
      contentOverride,
      name,
      videoMessageContent,
      messageArray,
    } = item;
    const handleRenderContentByType = item => {
      if (!item)
        return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
          children: message,
        });
      const { type, message: messageContent, imageUrl } = item;
      switch (type) {
        case 'text':
          return jsxRuntimeExports.jsx('div', {
            className: 'c-msg-text',
            children:
              textMessageOverride ||
              (messageContent &&
                jsxRuntimeExports.jsx(TextMessage, {
                  className: 'c-msg-text-line',
                  ...textMessageProps,
                  message: messageContent,
                })),
          });
        case 'image':
          return (
            imageMessageOverride ||
            jsxRuntimeExports.jsx(ImageMessage, {
              className: 'c-msg-image',
              ...imageMessageProps,
              imageUrl: imageUrl ?? '',
            })
          );
        case 'video':
          return (
            videoMessageOverride ||
            jsxRuntimeExports.jsx(VideoMessage, {
              className: 'c-msg-video',
              ...videoMessageProps,
              children: videoMessageContent,
            })
          );
        default:
          return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
            children: message,
          });
      }
    };
    return jsxRuntimeExports.jsx('div', {
      className: `${styles.msgComponent} c-msg-component c-msg-${speakerType} ${className}`,
      children:
        contentOverride ||
        jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
          children: [
            avatarUrl &&
              jsxRuntimeExports.jsx(Avatar, {
                className: 'c-msg-avatar',
                src: avatarUrl,
                ...avatarProps,
              }),
            jsxRuntimeExports.jsxs('div', {
              className: 'c-msg-content',
              children: [
                jsxRuntimeExports.jsx('div', {
                  className: 'c-msg-name',
                  children: name,
                }),
                messageArray && messageArray?.length > 0
                  ? messageArray?.map((item, index) => {
                      return jsxRuntimeExports.jsx(
                        'div',
                        {
                          className: 'c-msg-line',
                          children: handleRenderContentByType(item),
                        },
                        index
                      );
                    })
                  : jsxRuntimeExports.jsx('div', {
                      className: 'c-msg-line',
                      children: handleRenderContentByType({
                        type: 'text',
                        message,
                      }),
                    }),
              ],
            }),
            createdAt &&
              jsxRuntimeExports.jsx(TimeLabel, {
                ...timeLabelProps,
                className: 'c-msg-timestamp',
                time: createdAt,
              }),
          ],
        }),
    });
  },
  (prev, next) =>
    prev?.item?.id === next?.item?.id &&
    prev?.item?.message === next?.item?.message
);

const DEFAULT_AVATAR_IMAGE_URL =
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
const sampleMessages = [
  {
    id: '5f357b46-96cd-4928-a1c6-5b1c0b94073a',
    chatroomId: 'b78de529-17a2-4341-8269-60c1b07d8c97',
    speakerType: 'system',
    contentOverride: '---- Wednesday, October 4, 2023 ----',
  },
  {
    id: '5f357b46-96cd-4928-a1c6-5b1c0b94073a',
    chatroomId: 'b78de529-17a2-4341-8269-60c1b07d8c97',
    speakerType: 'user',
    speakerId: 'c7a2d99e-985d-4c3c-8c0c-8d36cb1c6001',
    name: 'Bubu Chacha',
    message:
      '::image{id=f8u85GSs5A}Just took this while reading my favorite book! Maybe we could find something we both enjoy talking about? 😊',
    createdAt: '09:32 pm',
    avatarUrl: 'https://cdn3.emoji.gg/emojis/10098-pervy-look.png',
  },
  {
    id: 'c7908ad7-aba6-4377-a55d-600bf1d1bd22',
    chatroomId: 'b78de529-17a2-4341-8269-60c1b07d8c97',
    speakerType: 'chatbot',
    speakerId: 'koharuGemini',
    name: 'Koharu',
    message:
      "Oh... hehe, I wasn't expecting to hear that so soon.\nIt feels a little… surprising, but sweet. 💕",
    createdAt: '09:32 pm',
    avatarUrl: 'https://cdn3.emoji.gg/emojis/10098-pervy-look.png',
  },
  {
    id: 'c7908ad7-aba6-4377-a55d-600bf1d1bd22',
    chatroomId: 'b78de529-17a2-4341-8269-60c1b07d8c97',
    speakerType: 'chatbot',
    speakerId: 'koharuGemini',
    name: 'Koharu',
    message:
      "Oh... hehe, I wasn't expecting to hear that so soon.\nIt feels a little… surprising, but sweet. 💕",
    createdAt: '09:32 pm',
    avatarUrl: 'https://cdn3.emoji.gg/emojis/10098-pervy-look.png',
  },
  {
    id: 'c7908ad7-aba6-4377-a55d-600bf1d1bd22',
    chatroomId: 'b78de529-17a2-4341-8269-60c1b07d8c97',
    speakerType: 'chatbot',
    speakerId: 'koharuGemini',
    name: 'Koharu',
    message:
      "Oh... hehe, I wasn't expecting to hear that so soon.\nIt feels a little… surprising, but sweet. 💕",
    createdAt: '09:32 pm',
    avatarUrl: 'https://cdn3.emoji.gg/emojis/10098-pervy-look.png',
  },
  {
    id: 'c7908ad7-aba6-4377-a55d-600bf1d1bd22',
    chatroomId: 'b78de529-17a2-4341-8269-60c1b07d8c97',
    speakerType: 'chatbot',
    speakerId: 'koharuGemini',
    name: 'Koharu',
    message:
      "Oh... hehe, I wasn't expecting to hear that so soon.\nIt feels a little… surprising, but sweet. 💕.\nIt feels a little… surprising, but sweet. 💕",
    createdAt: '09:32 pm',
    avatarUrl: 'https://cdn3.emoji.gg/emojis/10098-pervy-look.png',
  },
  {
    id: 'c7908ad7-aba6-4377-a55d-600bf1d1bd22',
    chatroomId: 'b78de529-17a2-4341-8269-60c1b07d8c97',
    speakerType: 'chatbot',
    speakerId: 'koharuGemini',
    name: 'Koharu',
    message:
      "Oh... hehe, I wasn't expecting to hear that so soon.\nIt feels a little… surprising, but sweet. 💕",
    createdAt: '09:32 pm',
    avatarUrl: 'https://cdn3.emoji.gg/emojis/10098-pervy-look.png',
  },
  // {
  //   id: 'c7908ad7-aba6-4377-a55d-600bf1d1bd22',
  //   chatroomId: 'b78de529-17a2-4341-8269-60c1b07d8c97',
  //   speakerType: 'chatbot',
  //   speakerId: 'koharuGemini',
  //   name: 'Koharu',
  //   message: "Oh... hehe, I wasn't expecting to hear that so soon.",
  //   createdAt: '09:32 pm',
  //   avatarUrl: 'https://cdn3.emoji.gg/emojis/10098-pervy-look.png',
  //   type: 'text',
  // },
  // {
  //   id: 'c7908ad7-aba6-4377-a55d-600bf1d1bd22',
  //   chatroomId: 'b78de529-17a2-4341-8269-60c1b07d8c97',
  //   speakerType: 'chatbot',
  //   speakerId: 'koharuGemini',
  //   name: 'Koharu',
  //   message:
  //     "Oh... hehe, I wasn't expecting to hear that so soon.\nIt feels a little… surprising, but sweet. 💕\nIt feels a little… surprising, but sweet. 💕",
  //   createdAt: '09:32 pm',
  //   avatarUrl: 'https://cdn3.emoji.gg/emojis/10098-pervy-look.png',
  //   type: 'text',
  // },
];
const MESSAGE_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  FILE: 'file',
};
const MESSAGE_SPEAKER_TYPE = {
  USER: 'user',
  CHATBOT: 'chatbot',
  SYSTEM: 'system',
};
const MESSAGE_CACHE_TYPE = {
  LOCAL: 'local',
  INDEXED: 'indexed',
  FALSE: 'false',
};

const memoryCache = new Map();
const useMessageCache = (conversationId, initial, cache) => {
  const [messages, setMessages] = useState(initial);
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    setMessages(initial);
  }, [initial]);
  // Helper function to compare messages
  const areMessagesEqual = (msg1, msg2) => {
    if (msg1.length !== msg2.length) return false;
    return msg1?.every((message, index) => {
      const otherMessage = msg2[index];
      if (!message || !otherMessage) return false;
      return (
        message.id === otherMessage.id &&
        message.message === otherMessage.message &&
        message.createdAt === otherMessage.createdAt &&
        message.speakerId === otherMessage.speakerId
      );
    });
  };
  // Helper function to save messages to cache
  const saveToCache = useCallback(
    msgs => {
      if (!cache) return;
      memoryCache.set(conversationId, msgs);
      if (cache === MESSAGE_CACHE_TYPE.LOCAL) {
        localStorage.setItem(
          `chatbox_cache_${conversationId}`,
          JSON.stringify(msgs)
        );
      } else if (cache === MESSAGE_CACHE_TYPE.INDEXED) {
        writeIndexedDB(conversationId, msgs);
      }
    },
    [cache, conversationId]
  );
  // Get messages from cache
  useEffect(() => {
    if (!cache || isInitialized) return;
    const getMessagesFromCache = async () => {
      let cachedMessages = null;
      if (cache === MESSAGE_CACHE_TYPE.LOCAL) {
        const raw = localStorage.getItem(`chatbox_cache_${conversationId}`);
        if (raw) cachedMessages = JSON.parse(raw);
      } else if (cache === MESSAGE_CACHE_TYPE.INDEXED) {
        cachedMessages = await readIndexedDB(conversationId);
      }
      if (
        cachedMessages &&
        cachedMessages?.length === 0 &&
        initial?.length === 0
      ) {
        return;
      }
      if (cachedMessages && cachedMessages?.length > 0) {
        // Cache exists, compare with initial messages
        if (!areMessagesEqual(cachedMessages, initial)) {
          // Messages are different, update cache with new messages
          setMessages(initial);
          saveToCache(initial);
        } else {
          // Messages are the same, use cached messages
          setMessages(cachedMessages);
        }
      } else {
        // No cache exists, save initial messages
        setMessages(initial);
        saveToCache(initial);
      }
      setIsInitialized(true);
    };
    getMessagesFromCache();
  }, [conversationId, cache, initial, saveToCache, isInitialized]);
  // Update cache when messages change (for new messages added via onNewMessage)
  useEffect(() => {
    if (!cache || isInitialized) return;
    saveToCache(messages);
  }, [messages, cache, conversationId, saveToCache, isInitialized]);
  return [messages, setMessages];
};

const MessageListComponent = forwardRef(
  (
    {
      messages = [],
      conversationId = '',
      className = '',
      onLoadMorePreviousData,
      cache = false,
      showScrollToEndButton = true,
      virtuosoProps,
      scrollToEndButtonProps,
      emptyDataComponent,
      isPrevLoading = false,
      isPrevLoadingComponent,
      customMessageComponentProps,
    },
    ref
  ) => {
    const [msgs, setMsgs] = useMessageCache(
      conversationId || '',
      messages || [],
      cache
    );
    const virtuosoRef = useRef(null);
    const [hasShowScrollToEndButton, setHasShowScrollToEndButton] =
      useState(false);
    const [isTop, setIsTop] = useState(false);
    // Forward the ref to the parent component
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(virtuosoRef.current);
        } else {
          ref.current = virtuosoRef.current;
        }
      }
    }, [ref, virtuosoRef.current]);
    const Row = ({ index }) => {
      return jsxRuntimeExports.jsx(MessageComponent, {
        ...customMessageComponentProps,
        className: 'c-message-item',
        item: msgs[index],
      });
    };
    // Update messages when messages props change
    useEffect(() => {
      setMsgs(messages);
    }, [messages, setMsgs]);
    return jsxRuntimeExports.jsxs('div', {
      className: `${styles.messageListContainer} ${className}`,
      children: [
        isPrevLoading &&
          (isPrevLoadingComponent ||
            jsxRuntimeExports.jsx('div', {
              className: 'c-message-list-loading',
              children: 'Loading...',
            })),
        msgs?.length > 0
          ? jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
              children: [
                jsxRuntimeExports.jsx(jr, {
                  className: `c-message-list-component`,
                  followOutput: isAtBottom => {
                    if (isAtBottom || !isTop) {
                      return true;
                    }
                    return false;
                  },
                  ref: virtuosoRef,
                  totalCount: msgs?.length,
                  data: msgs,
                  initialTopMostItemIndex:
                    msgs?.length > 0 ? msgs?.length - 1 : 0,
                  increaseViewportBy: { top: 300, bottom: 300 },
                  itemContent: index =>
                    jsxRuntimeExports.jsx(Row, { index: index }),
                  scrollerRef: ref => {
                    if (!ref) return;
                    const handleScroll = async () => {
                      if (ref?.scrollTop <= window.innerHeight / 3) {
                        await onLoadMorePreviousData?.();
                      } else {
                        setIsTop(false);
                      }
                    };
                    ref.addEventListener('scroll', handleScroll);
                    return () => {
                      ref.removeEventListener('scroll', handleScroll);
                    };
                  },
                  atBottomStateChange: isBottom => {
                    setHasShowScrollToEndButton(!isBottom);
                  },
                  ...virtuosoProps,
                }),
                showScrollToEndButton &&
                  hasShowScrollToEndButton &&
                  jsxRuntimeExports.jsx(Button, {
                    className: `c-chatbox-scroll-to-end-button`,
                    icon: '↓',
                    onClick: () => {
                      scrollToEnd(virtuosoRef.current, msgs);
                      scrollToEndButtonProps?.onClick?.();
                    },
                    ...scrollToEndButtonProps,
                  }),
              ],
            })
          : jsxRuntimeExports.jsx('div', {
              className: `c-message-list-empty`,
              children: emptyDataComponent || 'No messages',
            }),
      ],
    });
  }
);
MessageListComponent.displayName = 'MessageList';
const MessageList = memo(MessageListComponent);

export {
  ChatboxComposer,
  ChatboxLayout,
  DEFAULT_AVATAR_IMAGE_URL,
  MESSAGE_CACHE_TYPE,
  MESSAGE_SPEAKER_TYPE,
  MESSAGE_TYPE,
  MessageList,
  TopInfo,
  cn,
  getDB,
  readIndexedDB,
  sampleMessages,
  scrollToEnd,
  writeIndexedDB,
};
//# sourceMappingURL=index.esm.js.map
