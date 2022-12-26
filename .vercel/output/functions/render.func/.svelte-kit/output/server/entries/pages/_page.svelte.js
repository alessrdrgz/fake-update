import { l as listen, d as bubble, p as prevent_default, f as stop_propagation, c as create_ssr_component, h as compute_rest_props, i as get_current_component, s as setContext, j as spread, k as escape_attribute_value, o as escape_object, q as add_attribute, g as getContext, v as validate_component, m as missing_component, r as is_void, t as onDestroy, u as globals, b as subscribe, w as createEventDispatcher, e as escape } from "../../chunks/index.js";
import { isEmpty, pickBy, isEqual, mapValues, merge, pick, keys, minBy, toPairs, omit, reduce } from "lodash-es";
import { w as writable } from "../../chunks/index2.js";
const PUBLIC_BASE_URL = "http://localhost:5173";
function classMap(classObj) {
  return Object.entries(classObj).filter(([name, value]) => name !== "" && value).map(([name]) => name).join(" ");
}
function exclude(obj, keys2) {
  let names = Object.getOwnPropertyNames(obj);
  const newObj = {};
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const cashIndex = name.indexOf("$");
    if (cashIndex !== -1 && keys2.indexOf(name.substring(0, cashIndex + 1)) !== -1) {
      continue;
    }
    if (keys2.indexOf(name) !== -1) {
      continue;
    }
    newObj[name] = obj[name];
  }
  return newObj;
}
const oldModifierRegex = /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
const newModifierRegex = /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
function forwardEventsBuilder(component) {
  let $on;
  let events = [];
  component.$on = (fullEventType, callback) => {
    let eventType = fullEventType;
    let destructor = () => {
    };
    if ($on) {
      destructor = $on(eventType, callback);
    } else {
      events.push([eventType, callback]);
    }
    const oldModifierMatch = eventType.match(oldModifierRegex);
    if (oldModifierMatch && console) {
      console.warn('Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ', eventType);
    }
    return () => {
      destructor();
    };
  };
  function forward(e) {
    bubble(component, e);
  }
  return (node) => {
    const destructors = [];
    const forwardDestructors = {};
    $on = (fullEventType, callback) => {
      let eventType = fullEventType;
      let handler = callback;
      let options = false;
      const oldModifierMatch = eventType.match(oldModifierRegex);
      const newModifierMatch = eventType.match(newModifierRegex);
      const modifierMatch = oldModifierMatch || newModifierMatch;
      if (eventType.match(/^SMUI:\w+:/)) {
        const newEventTypeParts = eventType.split(":");
        let newEventType = "";
        for (let i = 0; i < newEventTypeParts.length; i++) {
          newEventType += i === newEventTypeParts.length - 1 ? ":" + newEventTypeParts[i] : newEventTypeParts[i].split("-").map((value) => value.slice(0, 1).toUpperCase() + value.slice(1)).join("");
        }
        console.warn(`The event ${eventType.split("$")[0]} has been renamed to ${newEventType.split("$")[0]}.`);
        eventType = newEventType;
      }
      if (modifierMatch) {
        const parts = eventType.split(oldModifierMatch ? ":" : "$");
        eventType = parts[0];
        const eventOptions = parts.slice(1).reduce((obj, mod) => {
          obj[mod] = true;
          return obj;
        }, {});
        if (eventOptions.passive) {
          options = options || {};
          options.passive = true;
        }
        if (eventOptions.nonpassive) {
          options = options || {};
          options.passive = false;
        }
        if (eventOptions.capture) {
          options = options || {};
          options.capture = true;
        }
        if (eventOptions.once) {
          options = options || {};
          options.once = true;
        }
        if (eventOptions.preventDefault) {
          handler = prevent_default(handler);
        }
        if (eventOptions.stopPropagation) {
          handler = stop_propagation(handler);
        }
      }
      const off = listen(node, eventType, handler, options);
      const destructor = () => {
        off();
        const idx = destructors.indexOf(destructor);
        if (idx > -1) {
          destructors.splice(idx, 1);
        }
      };
      destructors.push(destructor);
      if (!(eventType in forwardDestructors)) {
        forwardDestructors[eventType] = listen(node, eventType, forward);
      }
      return destructor;
    };
    for (let i = 0; i < events.length; i++) {
      $on(events[i][0], events[i][1]);
    }
    return {
      destroy: () => {
        for (let i = 0; i < destructors.length; i++) {
          destructors[i]();
        }
        for (let entry of Object.entries(forwardDestructors)) {
          entry[1]();
        }
      }
    };
  };
}
function prefixFilter(obj, prefix) {
  let names = Object.getOwnPropertyNames(obj);
  const newObj = {};
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    if (name.substring(0, prefix.length) === prefix) {
      newObj[name.substring(prefix.length)] = obj[name];
    }
  }
  return newObj;
}
let waiting = Promise.resolve();
const Snackbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "use",
    "class",
    "variant",
    "leading",
    "timeoutMs",
    "closeOnEscape",
    "labelText",
    "actionButtonText",
    "surface$class",
    "surface$use",
    "open",
    "forceOpen",
    "close",
    "isOpen",
    "getLabelElement",
    "getActionButtonElement",
    "getElement"
  ]);
  forwardEventsBuilder(get_current_component());
  let uninitializedValue = () => {
  };
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { variant = "" } = $$props;
  let { leading = false } = $$props;
  let { timeoutMs = 5e3 } = $$props;
  let { closeOnEscape = true } = $$props;
  let { labelText = uninitializedValue } = $$props;
  let { actionButtonText = uninitializedValue } = $$props;
  let { surface$class = "" } = $$props;
  let { surface$use = [] } = $$props;
  let element;
  let instance;
  let internalClasses = {};
  let closePromise = new Promise((resolve) => resolve);
  setContext("SMUI:label:context", "snackbar");
  function open() {
    waiting = waiting.then(() => {
      instance.open();
      return closePromise;
    });
  }
  function forceOpen() {
    return instance.open();
  }
  function close(reason) {
    return instance.close(reason);
  }
  function isOpen() {
    return instance.isOpen();
  }
  function getLabelElement() {
    var _a;
    return (_a = getElement().querySelector(".mdc-snackbar__label")) !== null && _a !== void 0 ? _a : document.createElement("div");
  }
  function getActionButtonElement() {
    var _a;
    return (_a = getElement().querySelector(".mdc-snackbar__action")) !== null && _a !== void 0 ? _a : document.createElement("button");
  }
  function getElement() {
    return element;
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.leading === void 0 && $$bindings.leading && leading !== void 0)
    $$bindings.leading(leading);
  if ($$props.timeoutMs === void 0 && $$bindings.timeoutMs && timeoutMs !== void 0)
    $$bindings.timeoutMs(timeoutMs);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0)
    $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.actionButtonText === void 0 && $$bindings.actionButtonText && actionButtonText !== void 0)
    $$bindings.actionButtonText(actionButtonText);
  if ($$props.surface$class === void 0 && $$bindings.surface$class && surface$class !== void 0)
    $$bindings.surface$class(surface$class);
  if ($$props.surface$use === void 0 && $$bindings.surface$use && surface$use !== void 0)
    $$bindings.surface$use(surface$use);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.forceOpen === void 0 && $$bindings.forceOpen && forceOpen !== void 0)
    $$bindings.forceOpen(forceOpen);
  if ($$props.close === void 0 && $$bindings.close && close !== void 0)
    $$bindings.close(close);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.getLabelElement === void 0 && $$bindings.getLabelElement && getLabelElement !== void 0)
    $$bindings.getLabelElement(getLabelElement);
  if ($$props.getActionButtonElement === void 0 && $$bindings.getActionButtonElement && getActionButtonElement !== void 0)
    $$bindings.getActionButtonElement(getActionButtonElement);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  return `<aside${spread(
    [
      {
        class: escape_attribute_value(classMap({
          [className]: true,
          "mdc-snackbar": true,
          "mdc-snackbar--stacked": variant === "stacked",
          "mdc-snackbar--leading": leading,
          ...internalClasses
        }))
      },
      escape_object(exclude($$restProps, ["surface$"]))
    ],
    {}
  )}${add_attribute("this", element, 0)}><div${spread(
    [
      {
        class: escape_attribute_value(classMap({
          [surface$class]: true,
          "mdc-snackbar__surface": true
        }))
      },
      { role: "status" },
      { "aria-relevant": "additions" },
      escape_object(prefixFilter($$restProps, "surface$"))
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>
</aside>`;
});
const CommonLabel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["use", "class", "component", "tag", "getElement"]);
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let element;
  let { component = SmuiElement } = $$props;
  let { tag = component === SmuiElement ? "span" : void 0 } = $$props;
  const context = getContext("SMUI:label:context");
  const tabindex = getContext("SMUI:label:tabindex");
  function getElement() {
    return element.getElement();
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.component === void 0 && $$bindings.component && component !== void 0)
    $$bindings.component(component);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(component || missing_component, "svelte:component").$$render(
      $$result,
      Object.assign(
        { tag },
        { use: [forwardEvents, ...use] },
        {
          class: classMap({
            [className]: true,
            "mdc-button__label": context === "button",
            "mdc-fab__label": context === "fab",
            "mdc-tab__text-label": context === "tab",
            "mdc-image-list__label": context === "image-list",
            "mdc-snackbar__label": context === "snackbar",
            "mdc-banner__text": context === "banner",
            "mdc-segmented-button__label": context === "segmented-button",
            "mdc-data-table__pagination-rows-per-page-label": context === "data-table:pagination",
            "mdc-data-table__header-cell-label": context === "data-table:sortable-header-cell"
          })
        },
        context === "snackbar" ? { "aria-atomic": "false" } : {},
        { tabindex },
        $$restProps,
        { this: element }
      ),
      {
        this: ($$value) => {
          element = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const SmuiElement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selfClosing;
  let $$restProps = compute_rest_props($$props, ["use", "tag", "getElement"]);
  let { use = [] } = $$props;
  let { tag } = $$props;
  forwardEventsBuilder(get_current_component());
  let element;
  function getElement() {
    return element;
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  selfClosing = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ].indexOf(tag) > -1;
  return `${selfClosing ? `${((tag$1) => {
    return tag$1 ? `<${tag}${spread([escape_object($$restProps)], {})}${add_attribute("this", element, 0)}>${is_void(tag$1) ? "" : ``}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}` : `${((tag$1) => {
    return tag$1 ? `<${tag}${spread([escape_object($$restProps)], {})}${add_attribute("this", element, 0)}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`}`;
});
const { Object: Object_1 } = globals;
const internals = {
  component: SmuiElement,
  tag: "div",
  class: "",
  classMap: {},
  contexts: {},
  props: {}
};
const ClassAdder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["use", "class", "component", "tag", "getElement"]);
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let element;
  const smuiClass = internals.class;
  const smuiClassMap = {};
  const smuiClassUnsubscribes = [];
  const contexts = internals.contexts;
  const props = internals.props;
  let { component = internals.component } = $$props;
  let { tag = component === SmuiElement ? internals.tag : void 0 } = $$props;
  Object.entries(internals.classMap).forEach(([name, context]) => {
    const store = getContext(context);
    if (store && "subscribe" in store) {
      smuiClassUnsubscribes.push(store.subscribe((value) => {
        smuiClassMap[name] = value;
      }));
    }
  });
  const forwardEvents = forwardEventsBuilder(get_current_component());
  for (let context in contexts) {
    if (contexts.hasOwnProperty(context)) {
      setContext(context, contexts[context]);
    }
  }
  onDestroy(() => {
    for (const unsubscribe of smuiClassUnsubscribes) {
      unsubscribe();
    }
  });
  function getElement() {
    return element.getElement();
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.component === void 0 && $$bindings.component && component !== void 0)
    $$bindings.component(component);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(component || missing_component, "svelte:component").$$render(
      $$result,
      Object_1.assign(
        { tag },
        { use: [forwardEvents, ...use] },
        {
          class: classMap({
            [className]: true,
            [smuiClass]: true,
            ...smuiClassMap
          })
        },
        props,
        $$restProps,
        { this: element }
      ),
      {
        this: ($$value) => {
          element = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const defaults = Object.assign({}, internals);
function classAdderBuilder(props) {
  return new Proxy(ClassAdder, {
    construct: function(target, args) {
      Object.assign(internals, defaults, props);
      return new target(...args);
    },
    get: function(target, prop) {
      Object.assign(internals, defaults, props);
      return target[prop];
    }
  });
}
classAdderBuilder({
  class: "mdc-snackbar__actions",
  tag: "div",
  props: { "aria-atomic": "true" },
  contexts: {
    "SMUI:button:context": "snackbar:actions",
    "SMUI:icon-button:context": "snackbar:actions",
    "SMUI:label:context": void 0
  }
});
const Sveltik = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isValid;
  let isDirty;
  let $validators, $$unsubscribe_validators;
  let $values, $$unsubscribe_values;
  let $warnings, $$unsubscribe_warnings;
  let $touched, $$unsubscribe_touched;
  let $errors, $$unsubscribe_errors;
  let $markers, $$unsubscribe_markers;
  let { enableReinitialize = false } = $$props;
  let { initialStatus = void 0 } = $$props;
  let { initialErrors = {} } = $$props;
  let { initialTouched = {} } = $$props;
  let { initialWarnings = {} } = $$props;
  let { initialValues = {} } = $$props;
  let { onReset = () => {
  } } = $$props;
  let { onSubmit = () => {
  } } = $$props;
  let { validate = () => ({}) } = $$props;
  let { validateOnBlur = true } = $$props;
  let { validateOnChange = true } = $$props;
  let { validateOnMount = false } = $$props;
  const values = writable(initialValues);
  $$unsubscribe_values = subscribe(values, (value) => $values = value);
  const errors = writable(initialErrors);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  const warnings = writable(initialWarnings);
  $$unsubscribe_warnings = subscribe(warnings, (value) => $warnings = value);
  const touched = writable(initialTouched);
  $$unsubscribe_touched = subscribe(touched, (value) => $touched = value);
  const validators = writable({});
  $$unsubscribe_validators = subscribe(validators, (value) => $validators = value);
  const markers = writable({});
  $$unsubscribe_markers = subscribe(markers, (value) => $markers = value);
  setContext("values", values);
  setContext("errors", errors);
  setContext("warnings", warnings);
  setContext("touched", touched);
  setContext("validators", validators);
  setContext("markers", markers);
  setContext("initialErrors", initialErrors);
  setContext("initialTouched", initialTouched);
  setContext("initialValues", initialValues);
  setContext("initialWarnings", initialWarnings);
  let isSubmitting = false;
  let isValidating = false;
  let status = initialStatus;
  let submitAttemptCount = 0;
  let submitFailureCount = 0;
  let submitSuccessCount = 0;
  function scrollFirstErrorIntoView() {
    const errorMarkers = pick($markers, keys(pickBy($errors)));
    const scrollHeights = mapValues(errorMarkers, (node) => {
      const domRect = node.getBoundingClientRect();
      return domRect.y;
    });
    const top = minBy(toPairs(scrollHeights), (o) => o[1]);
    if (top) {
      $markers[top[0]].scrollIntoView();
    }
  }
  function resetForm(nextInitialState) {
    let nextValues = initialValues;
    let nextErrors = initialErrors;
    let nextTouched = initialTouched;
    let nextStatus = initialStatus;
    if (nextInitialState) {
      nextValues = nextInitialState.values || {};
      nextErrors = nextInitialState.errors || {};
      nextTouched = nextInitialState.touched || {};
      nextStatus = nextInitialState.status;
    }
    values.set(nextValues);
    errors.set(nextErrors);
    touched.set(nextTouched);
    status = nextStatus;
  }
  function setErrors(fields) {
    errors.set(fields);
  }
  function setFieldError(field, errorMsg) {
    errors.update((_e) => ({ ..._e, [field]: errorMsg }));
  }
  function setFieldTouched(field, isTouched, shouldValidate = validateOnBlur) {
    touched.update((_t) => ({ ..._t, [field]: isTouched }));
    if (isTouched && shouldValidate) {
      handleValidate();
    }
  }
  function setFieldValue(field, value, shouldValidate = validateOnChange) {
    values.update((_v) => ({ ..._v, [field]: value }));
    if (shouldValidate) {
      handleValidate();
    }
  }
  function setFieldWarning(field, warningMsg) {
    warnings.update((_w) => ({ ..._w, [field]: warningMsg }));
  }
  function setStatus(nextStatus) {
    status = nextStatus;
  }
  function setSubmitting(nextIsSubmitting) {
    isSubmitting = nextIsSubmitting;
  }
  function submitFailure(fields) {
    if (fields) {
      errors.set(fields);
    }
    isSubmitting = false;
    submitFailureCount += 1;
  }
  function submitSuccess() {
    isSubmitting = false;
    submitSuccessCount += 1;
  }
  function setTouched(fields, shouldValidate = validateOnBlur) {
    touched.set(fields);
    if (shouldValidate) {
      handleValidate();
    }
  }
  function setValues(fields, shouldValidate = validateOnChange) {
    values.set(fields);
    if (shouldValidate) {
      handleValidate();
    }
  }
  function setWarnings(fields) {
    warnings.set(fields);
  }
  function submitForm() {
    if (isValid) {
      const result = handleSubmit();
      return Promise.resolve(result);
    } else {
      return Promise.reject();
    }
  }
  function validateField(field) {
    handleValidate($values, field);
  }
  function validateForm(nextValues = $values) {
    handleValidate(nextValues);
  }
  const bag = {
    resetForm,
    setErrors,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    setFieldWarning,
    setStatus,
    setSubmitting,
    setTouched,
    setValues,
    setWarnings,
    submitFailure,
    submitForm,
    submitSuccess,
    validateField,
    validateForm,
    scrollFirstErrorIntoView
  };
  const getBag = () => ({
    errors: $errors,
    touched: $touched,
    values: $values,
    warnings: $warnings,
    ...bag
  });
  function handleBlur({ target: { name } }) {
    touched.update((_t) => ({ ..._t, [name]: true }));
    if (validateOnBlur) {
      handleValidate();
    }
  }
  function handleInput({ target }) {
    const { name, type, checked, value } = target;
    let nextValue = value;
    if (type === "range" || type === "number") {
      nextValue = nextValue === "" ? void 0 : +nextValue;
    } else if (type === "select-multiple") {
      nextValue = [].map.call(target.querySelectorAll(":checked"), (option) => option.value);
    } else if (type === "checkbox") {
      nextValue = checked;
    }
    values.update((_v) => ({ ..._v, [name]: nextValue }));
    if (validateOnChange) {
      handleValidate();
    }
  }
  function handleReset() {
    isSubmitting = false;
    isValidating = false;
    status = initialStatus;
    submitAttemptCount = 0;
    submitFailureCount = 0;
    submitSuccessCount = 0;
    values.set(initialValues);
    errors.set(initialErrors);
    touched.set(initialTouched);
    onReset($values, getBag());
  }
  function handleSubmit() {
    touched.set(mapValues($validators, () => true));
    submitAttemptCount += 1;
    isSubmitting = true;
    isValidating = true;
    const nextErrors = handleValidate();
    isValidating = false;
    if (!isEmpty(pickBy(nextErrors))) {
      submitFailureCount += 1;
      isSubmitting = false;
      return;
    }
    const result = onSubmit($values, getBag());
    if (result && typeof result.then === "function") {
      return Promise.resolve(result).then(submitSuccess).catch((errors2) => submitFailure(errors2));
    }
  }
  function handleValidate(nextValues = $values, onlyField) {
    if (onlyField) {
      if ($validators[onlyField]) {
        errors.update((_e) => ({
          ..._e,
          [onlyField]: $validators[onlyField](nextValues[onlyField], getBag())
        }));
      }
      return;
    }
    const nextErrors = merge(validate(nextValues, getBag()), mapValues($validators, (_, name) => {
      if (!$validators[name])
        return;
      return $validators[name](nextValues[name], getBag());
    }));
    errors.set(nextErrors);
    return nextErrors;
  }
  setContext("handleBlur", handleBlur);
  setContext("handleInput", handleInput);
  setContext("handleReset", handleReset);
  setContext("handleSubmit", handleSubmit);
  setContext("sveltikBag", bag);
  if ($$props.enableReinitialize === void 0 && $$bindings.enableReinitialize && enableReinitialize !== void 0)
    $$bindings.enableReinitialize(enableReinitialize);
  if ($$props.initialStatus === void 0 && $$bindings.initialStatus && initialStatus !== void 0)
    $$bindings.initialStatus(initialStatus);
  if ($$props.initialErrors === void 0 && $$bindings.initialErrors && initialErrors !== void 0)
    $$bindings.initialErrors(initialErrors);
  if ($$props.initialTouched === void 0 && $$bindings.initialTouched && initialTouched !== void 0)
    $$bindings.initialTouched(initialTouched);
  if ($$props.initialWarnings === void 0 && $$bindings.initialWarnings && initialWarnings !== void 0)
    $$bindings.initialWarnings(initialWarnings);
  if ($$props.initialValues === void 0 && $$bindings.initialValues && initialValues !== void 0)
    $$bindings.initialValues(initialValues);
  if ($$props.onReset === void 0 && $$bindings.onReset && onReset !== void 0)
    $$bindings.onReset(onReset);
  if ($$props.onSubmit === void 0 && $$bindings.onSubmit && onSubmit !== void 0)
    $$bindings.onSubmit(onSubmit);
  if ($$props.validate === void 0 && $$bindings.validate && validate !== void 0)
    $$bindings.validate(validate);
  if ($$props.validateOnBlur === void 0 && $$bindings.validateOnBlur && validateOnBlur !== void 0)
    $$bindings.validateOnBlur(validateOnBlur);
  if ($$props.validateOnChange === void 0 && $$bindings.validateOnChange && validateOnChange !== void 0)
    $$bindings.validateOnChange(validateOnChange);
  if ($$props.validateOnMount === void 0 && $$bindings.validateOnMount && validateOnMount !== void 0)
    $$bindings.validateOnMount(validateOnMount);
  isValid = isEmpty(pickBy($errors));
  isDirty = !isEqual($values, initialValues);
  {
    {
      if (enableReinitialize) {
        values.set(initialValues);
      }
    }
  }
  $$unsubscribe_validators();
  $$unsubscribe_values();
  $$unsubscribe_warnings();
  $$unsubscribe_touched();
  $$unsubscribe_errors();
  $$unsubscribe_markers();
  return `
${slots.default ? slots.default({
    errors: $errors,
    touched: $touched,
    values: $values,
    warnings: $warnings,
    isDirty,
    isSubmitting,
    isValid,
    isValidating,
    status,
    submitAttemptCount,
    submitFailureCount,
    submitSuccessCount,
    resetForm,
    setErrors,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    setFieldWarning,
    setStatus,
    setSubmitting,
    setTouched,
    setValues,
    setWarnings,
    submitFailure,
    submitForm,
    submitSuccess,
    validateField,
    validateForm,
    handleBlur,
    handleInput,
    handleReset,
    handleSubmit,
    props: {
      errors: $errors,
      touched: $touched,
      values: $values,
      warnings: $warnings,
      isDirty,
      isSubmitting,
      isValid,
      isValidating,
      status,
      submitAttemptCount,
      submitFailureCount,
      submitSuccessCount,
      resetForm,
      setErrors,
      setFieldError,
      setFieldTouched,
      setFieldValue,
      setFieldWarning,
      setStatus,
      setSubmitting,
      setTouched,
      setValues,
      setWarnings,
      submitFailure,
      submitForm,
      submitSuccess,
      validateField,
      validateForm,
      handleBlur,
      handleInput,
      handleReset,
      handleSubmit
    }
  }) : ``}`;
});
const Form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getContext("handleSubmit");
  getContext("handleReset");
  return `<form${spread([escape_object($$props)], {})}>${slots.default ? slots.default({}) : ``}</form>`;
});
const Field = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["as", "type", "name", "validate"]);
  let $values, $$unsubscribe_values;
  let $touched, $$unsubscribe_touched;
  let $errors, $$unsubscribe_errors;
  let $warnings, $$unsubscribe_warnings;
  const values = getContext("values");
  $$unsubscribe_values = subscribe(values, (value) => $values = value);
  const errors = getContext("errors");
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  const warnings = getContext("warnings");
  $$unsubscribe_warnings = subscribe(warnings, (value) => $warnings = value);
  const touched = getContext("touched");
  $$unsubscribe_touched = subscribe(touched, (value) => $touched = value);
  const validators = getContext("validators");
  const contextHandleInput = getContext("handleInput");
  const contextHandleBlur = getContext("handleBlur");
  const initialErrors = getContext("initialErrors") || {};
  const initialTouched = getContext("initialTouched") || {};
  const initialValues = getContext("initialValues") || {};
  const initialWarnings = getContext("initialWarnings") || {};
  const sveltikBag = getContext("sveltikBag");
  let { as = void 0 } = $$props;
  let { type = "text" } = $$props;
  let { name } = $$props;
  let { validate = void 0 } = $$props;
  createEventDispatcher();
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.validate === void 0 && $$bindings.validate && validate !== void 0)
    $$bindings.validate(validate);
  {
    validators.update((_v) => ({ ..._v, [name]: validate }));
  }
  $$unsubscribe_values();
  $$unsubscribe_touched();
  $$unsubscribe_errors();
  $$unsubscribe_warnings();
  return `${as === "select" ? `<select${spread(
    [
      { name: escape_attribute_value(name) },
      {
        value: escape_attribute_value($values[name])
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({
    field: {
      name,
      value: $values[name],
      handleBlur: contextHandleBlur,
      handleInput: contextHandleInput
    },
    form: sveltikBag,
    meta: {
      initialError: initialErrors[name],
      initialTouched: initialTouched[name],
      initialValue: initialValues[name],
      initialWarning: initialWarnings[name],
      value: $values[name],
      touched: $touched[name],
      error: $errors[name],
      warning: $warnings[name]
    }
  }) : ``}</select>` : `${as === "textarea" ? `<textarea${spread([{ name: escape_attribute_value(name) }, escape_object($$restProps)], {})}>${escape($values[name], true)}</textarea>` : `${as === "checkbox" ? `<input${spread(
    [
      { name: escape_attribute_value(name) },
      { type: "checkbox" },
      { checked: $values[name] || null },
      escape_object($$restProps)
    ],
    {}
  )}>` : `${typeof as === "object" || typeof as === "function" ? `${validate_component(as || missing_component, "svelte:component").$$render(
    $$result,
    {
      field: {
        name,
        value: $values[name],
        handleBlur: contextHandleBlur,
        handleInput: contextHandleInput
      },
      form: sveltikBag,
      meta: {
        initialError: initialErrors[name],
        initialTouched: initialTouched[name],
        initialValue: initialValues[name],
        initialWarning: initialWarnings[name],
        value: $values[name],
        touched: $touched[name],
        error: $errors[name],
        warning: $warnings[name]
      },
      props: $$restProps
    },
    {},
    {}
  )}` : `${slots.default ? slots.default({
    field: {
      name,
      value: $values[name],
      handleBlur: contextHandleBlur,
      handleInput: contextHandleInput
    },
    form: sveltikBag,
    meta: {
      initialError: initialErrors[name],
      initialTouched: initialTouched[name],
      initialValue: initialValues[name],
      initialWarning: initialWarnings[name],
      value: $values[name],
      touched: $touched[name],
      error: $errors[name],
      warning: $warnings[name]
    }
  }) : `
        ${type === "number" ? `<input${spread(
    [
      { name: escape_attribute_value(name) },
      { type: "number" },
      {
        value: escape_attribute_value($values[name])
      },
      escape_object($$restProps)
    ],
    {}
  )}>` : `<input${spread(
    [
      { name: escape_attribute_value(name) },
      {
        value: escape_attribute_value($values[name])
      },
      { type: escape_attribute_value(type) },
      escape_object($$restProps)
    ],
    {}
  )}>`}
    `}`}`}`}`}`;
});
const ErrorMessage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let error;
  let $errors, $$unsubscribe_errors;
  let $touched, $$unsubscribe_touched;
  let { name } = $$props;
  let { as = void 0 } = $$props;
  const omitted = ["name", "as"];
  const errors = getContext("errors");
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  const touched = getContext("touched");
  $$unsubscribe_touched = subscribe(touched, (value) => $touched = value);
  function propsToString(p) {
    const s = reduce(
      omit(p, omitted),
      (a, v, k) => typeof v === "boolean" ? `${a} ${k}`.trim() : `${a} ${k}="${v}"`.trim(),
      ""
    );
    return s ? ` ${s}` : "";
  }
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  error = $errors[name];
  $$unsubscribe_errors();
  $$unsubscribe_touched();
  return `${error && $touched[name] ? `${typeof as === "string" ? `<!-- HTML_TAG_START -->${`<${as}${propsToString($$props)}>${error}</${as}>`}<!-- HTML_TAG_END -->` : `${typeof as === "object" || typeof as === "function" ? `${validate_component(as || missing_component, "svelte:component").$$render(
    $$result,
    {
      props: omit($$props, omitted),
      msg: error
    },
    {},
    {}
  )}` : `${slots.default ? slots.default({ msg: error }) : `${escape(error)}`}`}`}` : ``}`;
});
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name = "" } = $$props;
  let { type = "text" } = $$props;
  let { label = "" } = $$props;
  let { className = "" } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<div><div${add_attribute("class", `styled-input ${className}`, 0)}>${validate_component(Field, "Field").$$render($$result, { type, name, autocomplete: "off" }, {}, {})}
    <label${add_attribute("for", name, 0)}>${escape(label)}</label></div>
  ${validate_component(ErrorMessage, "ErrorMessage").$$render(
    $$result,
    {
      name,
      as: "div",
      class: "text-red-500 mt-2"
    },
    {},
    {}
  )}</div>`;
});
const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let successSnackbar;
  let initialValues = { errorCode: "", qrUrl: "" };
  let validate = (values) => {
    const errors = {};
    if (!values.errorCode)
      errors.errorCode = "Necesario";
    if (!values.qrUrl)
      errors.qrUrl = "Necesario";
    else if (!urlRegex.test(values.qrUrl))
      errors.qrUrl = "URL introducida inválida";
    return errors;
  };
  let onSubmit = (values, { setSubmitting }) => {
    const url = `${PUBLIC_BASE_URL}/windows?errorCode=${values.errorCode}&qrUrl=${values.qrUrl}`;
    navigator.clipboard.writeText(url);
    setSubmitting(false);
    successSnackbar.open();
  };
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="${"h-screen w-screen"}"><main class="${"items-center justify-center gradient-bg flex h-full w-full"}"><div class="${"md:rounded-xl p-4 md:p-6 bg-dark md:h-auto md:w-auto h-full w-full"}">${validate_component(Sveltik, "Sveltik").$$render($$result, { initialValues, validate, onSubmit }, {}, {
      default: ({ isSubmitting }) => {
        return `${validate_component(Form, "Form").$$render(
          $$result,
          {
            class: "flex gap-8 flex-col w-full md:px-20 md:mt-10 h-full justify-center"
          },
          {},
          {
            default: () => {
              return `<h1 class="${"text-white text-4xl text-center"}">Fake W10 update generator
          </h1>
          ${validate_component(Input, "Input").$$render(
                $$result,
                {
                  name: "errorCode",
                  label: "Código de error",
                  className: "w-full"
                },
                {},
                {}
              )}
          ${validate_component(Input, "Input").$$render(
                $$result,
                {
                  name: "qrUrl",
                  label: "URL del código QR",
                  className: "w-full"
                },
                {},
                {}
              )}
          <button type="${"submit"}" ${isSubmitting ? "disabled" : ""} class="${"mt-2 py-4 px-1 text-2xl text-white bg-blue-500 rounded-2xl enabled:hover:bg-blue-700 transition-all duration-200 ease-in-out enabled:hover:scale-90 disabled:bg-gray-500"}">Generar</button>`;
            }
          }
        )}`;
      }
    })}</div></main></div>

${validate_component(Snackbar, "Snackbar").$$render(
      $$result,
      { this: successSnackbar },
      {
        this: ($$value) => {
          successSnackbar = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(CommonLabel, "Label").$$render($$result, {}, {}, {
            default: () => {
              return `URL copiada al portapapeles`;
            }
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
