import { defineComponent as Ve, ref as A, watch as ee, nextTick as B, computed as O, onMounted as ke, resolveComponent as p, openBlock as c, createElementBlock as _, createElementVNode as q, createVNode as h, withKeys as Ce, withCtx as f, createTextVNode as x, createBlock as v, toDisplayString as F, createCommentVNode as N, unref as Fe, Fragment as I, renderList as w, withDirectives as le, vShow as ae, normalizeStyle as Ie, renderSlot as we } from "vue";
import { ElForm as Ue } from "element-plus";
const Te = { class: "advanced-search" }, $e = { class: "main-search-bar" }, Pe = { class: "filter-button-wrapper" }, De = { class: "advanced-search-form-popover" }, Oe = ["data-field"], qe = {
  key: 9,
  class: "numberrange-container"
}, Ne = {
  key: 0,
  class: "search-tags"
}, Re = /* @__PURE__ */ Ve({
  __name: "index",
  props: {
    searchConfig: {},
    quickSearchField: { default: "keyword" },
    modelValue: { default: () => ({}) },
    cacheKey: { default: "" }
  },
  emits: ["search", "update:modelValue"],
  setup(U, { emit: R }) {
    let b = null;
    const u = U, y = R, oe = A(null), C = A(!1), d = A(""), n = A({}), g = A([]), V = A({}), S = A({}), T = A({}), J = (e, a) => {
      const l = n.value[e];
      return Array.isArray(l) && l.length > a ? l[a] : null;
    }, M = (e, a, l) => {
      Array.isArray(n.value[e]) || (n.value[e] = [null, null]), n.value[e][a] = l;
    };
    ee(() => S.value, () => {
      g.value.length > 0 && g.value.some((a) => {
        const l = u.searchConfig.formItems.find((r) => r.field === a.key);
        return l && (l.type === "select" || l.type === "treeselect") && (l.remote || l.loadOptions);
      }) && (b && clearTimeout(b), b = window.setTimeout(() => {
        B(() => {
          H();
        });
      }, 100));
    }, { deep: !0 });
    const W = O(() => u.searchConfig.formItems.length > 1), re = O(() => u.searchConfig.formItems.filter((e) => !e.hidden)), te = O(() => u.searchConfig.popoverWidth || 800), k = O(() => u.cacheKey ? `advancedSearch@${u.cacheKey}` : ""), ne = (e) => {
      V.value[e] = !0, B(() => {
        const a = document.querySelector(`[data-field=${e}] .form-item-textarea-overlay textarea`);
        a && a.focus();
      });
    }, L = (e) => {
      if (e.type === "select" || e.type === "treeselect") {
        const a = e;
        return a.remote && S.value[e.field] ? S.value[e.field] : a.options || [];
      }
      return [];
    }, se = (e) => L(e), ue = (e) => {
      if (e.type !== "select" && e.type !== "treeselect")
        return;
      const a = e;
      return async (l) => {
        if (a.remoteMethod) {
          T.value[e.field] = !0;
          try {
            const r = await a.remoteMethod(l);
            S.value[e.field] = r;
          } catch (r) {
            console.error(`Failed to load remote options for ${e.field}:`, r);
          } finally {
            T.value[e.field] = !1;
          }
        }
      };
    }, z = (e) => {
      if (k.value)
        try {
          localStorage.setItem(k.value, JSON.stringify({
            searchParams: e,
            timestamp: Date.now()
          }));
        } catch (a) {
          console.warn("Failed to save search cache:", a);
        }
    }, ce = () => {
      if (!k.value)
        return null;
      try {
        const e = localStorage.getItem(k.value);
        if (e) {
          const a = JSON.parse(e), l = Date.now(), r = 24 * 60 * 60 * 1e3;
          return l - a.timestamp > r ? (E(), null) : a.searchParams || null;
        }
      } catch (e) {
        console.warn("Failed to get search cache:", e), E();
      }
      return null;
    }, E = () => {
      if (k.value)
        try {
          localStorage.removeItem(k.value);
        } catch (e) {
          console.warn("Failed to clear search cache:", e);
        }
    }, H = () => {
      const e = {};
      d.value && (e[u.quickSearchField] = d.value), Object.assign(e, n.value);
      const a = g.value, l = [];
      d.value && l.push({
        key: u.quickSearchField,
        label: "关键词",
        value: d.value
      });
      for (const r of u.searchConfig.formItems) {
        const t = e[r.field];
        t != null && t !== "" && !(Array.isArray(t) && t.length === 0) && (r.type === "numberrange" ? Array.isArray(t) && (t[0] !== null || t[1] !== null) && l.push({
          key: r.field,
          label: r.label,
          value: t
        }) : r.type === "daterange" ? Array.isArray(t) && t.length === 2 && (t[0] !== null || t[1] !== null) && l.push({
          key: r.field,
          label: r.label,
          value: t
        }) : l.push({
          key: r.field,
          label: r.label,
          value: t
        }));
      }
      de(a, l) || (g.value = l);
    }, de = (e, a) => {
      if (e.length !== a.length)
        return !1;
      for (let l = 0; l < e.length; l++)
        if (e[l].key !== a[l].key || e[l].label !== a[l].label || JSON.stringify(e[l].value) !== JSON.stringify(a[l].value))
          return !1;
      return !0;
    }, ie = () => {
    }, fe = () => {
      C.value = !1;
    }, Q = () => {
      const e = {};
      d.value && (e[u.quickSearchField] = d.value), Object.assign(e, n.value), $(e), z(e), y("update:modelValue", e), y("search", e);
    }, G = () => {
      const e = {};
      d.value && (e[u.quickSearchField] = d.value), Object.assign(e, n.value), $(e), z(e), fe(), y("update:modelValue", e), y("search", e);
    }, X = () => {
      const e = {};
      for (const l of u.searchConfig.formItems)
        if (l.type === "custom")
          n.value[l.field] = l.default !== void 0 ? l.default : "";
        else if (l.type === "checkbox")
          n.value[l.field] = [];
        else if (l.type === "daterange" || l.type === "numberrange")
          n.value[l.field] = [];
        else if (l.type === "treeselect") {
          const r = l;
          n.value[l.field] = r.multiple ? [] : "";
        } else if (l.type === "select") {
          const r = l;
          n.value[l.field] = r.multiple ? [] : "";
        } else
          l.type === "textarea" ? (n.value[l.field] = l.default ?? "", e[l.field] = !1) : n.value[l.field] = l.default ?? "";
      V.value = e, g.value = [], E();
      const a = {};
      d.value && (a[u.quickSearchField] = d.value), y("update:modelValue", a), y("search", a);
    }, $ = (e) => {
      const a = [];
      d.value && a.push({
        key: u.quickSearchField,
        label: "关键词",
        value: d.value
      });
      for (const l of u.searchConfig.formItems) {
        const r = e[l.field];
        r != null && r !== "" && !(Array.isArray(r) && r.length === 0) && (l.type === "numberrange" ? Array.isArray(r) && (r[0] !== null || r[1] !== null) && a.push({
          key: l.field,
          label: l.label,
          value: r
        }) : l.type === "daterange" ? Array.isArray(r) && r.length === 2 && (r[0] !== null || r[1] !== null) && a.push({
          key: l.field,
          label: l.label,
          value: r
        }) : a.push({
          key: l.field,
          label: l.label,
          value: r
        }));
      }
      g.value = a;
    }, pe = (e) => {
      const a = u.searchConfig.formItems.find((l) => l.field === e.key);
      if (a && a.type === "custom")
        return a.displayValue ? a.displayValue(e.value, n.value) : String(e.value);
      if (a && (a.type === "select" || a.type === "treeselect") && (a.options || S.value[a.field])) {
        const l = a, r = l.remote ? S.value[a.field] : l.options, t = a.type === "treeselect" && a.nodeKey || "value";
        if (Array.isArray(e.value))
          return e.value.map((i) => {
            const m = j(r || [], i, t);
            return m ? m.label : i;
          }).join(", ");
        {
          const i = j(r || [], e.value, t);
          return i ? i.label : e.value;
        }
      }
      if (a && (a.type === "radio" || a.type === "checkbox") && a.options) {
        if (Array.isArray(e.value))
          return e.value.map((l) => {
            var t;
            const r = (t = a.options) == null ? void 0 : t.find((i) => i.value === l);
            return r ? r.label : l;
          }).join(", ");
        {
          const l = a.options.find((r) => r.value === e.value);
          return l ? l.label : e.value;
        }
      }
      if (a && a.type === "daterange" && Array.isArray(e.value)) {
        if (e.value.length === 2) {
          const [l, r] = e.value;
          if (l !== null && r !== null)
            return `${P(l)} ~ ${P(r)}`;
          if (l !== null)
            return `≥ ${P(l)}`;
          if (r !== null)
            return `≤ ${P(r)}`;
        }
        return "";
      }
      if (a && a.type === "numberrange" && Array.isArray(e.value)) {
        const [l, r] = e.value;
        return l !== null && r !== null ? `${l} - ${r}` : l !== null ? `≥ ${l}` : r !== null ? `≤ ${r}` : "";
      }
      return e.value;
    }, P = (e) => {
      if (e instanceof Date)
        return e.toLocaleDateString();
      if (typeof e == "string" || typeof e == "number") {
        const a = new Date(e);
        return isNaN(a.getTime()) ? String(e) : a.toLocaleDateString();
      }
      return String(e);
    }, j = (e, a, l) => {
      for (const r of e) {
        if (r[l] === a)
          return r;
        if (r.children && r.children.length > 0) {
          const t = j(r.children, a, l);
          if (t)
            return t;
        }
      }
      return null;
    }, ve = (e) => {
      if (e === u.quickSearchField)
        d.value = "";
      else {
        const a = u.searchConfig.formItems.find((l) => l.field === e);
        if (a)
          if (a.type === "checkbox")
            n.value[e] = [];
          else if (a.type === "daterange" || a.type === "numberrange")
            n.value[e] = [];
          else if (a.type === "select" || a.type === "treeselect") {
            const l = a;
            n.value[e] = l.multiple ? [] : "";
          } else
            n.value[e] = "";
        else
          n.value[e] = "";
      }
      G();
    }, me = () => {
      d.value = "", X();
    }, he = async () => {
      for (const e of u.searchConfig.formItems)
        if ((e.type === "select" || e.type === "treeselect") && e.loadOptions) {
          const a = e;
          try {
            const l = await a.loadOptions();
            S.value[e.field] = l, g.value.length > 0 && (b && clearTimeout(b), b = window.setTimeout(() => {
              B(() => {
                H();
              });
            }, 100));
          } catch (l) {
            console.error(`Failed to load options for ${e.field}:`, l);
          }
        }
    };
    return ee(() => u.modelValue, (e) => {
      e && (d.value = e[u.quickSearchField] || "", Object.keys(e).forEach((a) => {
        if (a !== u.quickSearchField) {
          const l = u.searchConfig.formItems.find((r) => r.field === a);
          l && l.type === "checkbox" && !Array.isArray(e[a]) ? n.value[a] = e[a] ? [e[a]] : [] : l && l.type === "daterange" && e[a] ? Array.isArray(e[a]) ? n.value[a] = e[a].map((r) => {
            if (r instanceof Date)
              return r;
            if (typeof r == "string" || typeof r == "number") {
              const t = new Date(r);
              return isNaN(t.getTime()) ? r : t;
            }
            return r;
          }) : n.value[a] = [] : l && l.type === "numberrange" && e[a] ? Array.isArray(e[a]) ? n.value[a] = e[a] : n.value[a] = [null, null] : n.value[a] = e[a];
        }
      }), $(e));
    }, { immediate: !0 }), ke(() => {
      const e = {}, a = {};
      for (const t of u.searchConfig.formItems)
        if (t.type === "custom")
          e[t.field] = t.default !== void 0 ? t.default : "";
        else if (t.type === "checkbox")
          e[t.field] = Array.isArray(t.default) ? t.default : [];
        else if (t.type === "treeselect") {
          const i = t;
          e[t.field] = i.multiple ? Array.isArray(t.default) ? t.default : [] : t.default ?? "";
        } else if (t.type === "select") {
          const i = t;
          e[t.field] = i.multiple ? Array.isArray(t.default) ? t.default : [] : t.default ?? "";
        } else
          t.type === "daterange" ? e[t.field] = Array.isArray(t.default) ? t.default : [] : t.type === "numberrange" ? e[t.field] = Array.isArray(t.default) ? t.default : [null, null] : t.type === "textarea" ? (e[t.field] = t.default ?? "", a[t.field] = !1) : e[t.field] = t.default ?? "";
      n.value = e, V.value = a;
      const l = ce();
      l && (d.value = l[u.quickSearchField] || "", Object.keys(l).forEach((t) => {
        if (t !== u.quickSearchField) {
          const i = u.searchConfig.formItems.find((m) => m.field === t);
          i && i.type === "checkbox" && !Array.isArray(l[t]) ? e[t] = l[t] ? [l[t]] : [] : i && i.type === "daterange" && l[t] ? Array.isArray(l[t]) ? e[t] = l[t].map((m) => {
            if (m instanceof Date)
              return m;
            if (typeof m == "string" || typeof m == "number") {
              const D = new Date(m);
              return isNaN(D.getTime()) ? m : D;
            }
            return m;
          }) : e[t] = [] : i && i.type === "numberrange" && l[t] ? Array.isArray(l[t]) ? e[t] = l[t] : e[t] = [null, null] : e[t] = l[t];
        }
      })), n.value = e;
      const r = {};
      d.value && (r[u.quickSearchField] = d.value), Object.assign(r, n.value), $(r), l && (y("update:modelValue", r), y("search", r)), he();
    }), (e, a) => {
      const l = p("el-input"), r = p("el-button"), t = p("el-option"), i = p("el-select"), m = p("el-tree-select"), D = p("el-radio"), ye = p("el-radio-group"), be = p("el-checkbox"), ge = p("el-checkbox-group"), Y = p("el-date-picker"), K = p("el-input-number"), Z = p("el-form-item"), _e = p("el-col"), Ae = p("el-row"), xe = p("el-popover"), Se = p("el-tag");
      return c(), _("div", Te, [
        q("div", $e, [
          h(l, {
            modelValue: d.value,
            "onUpdate:modelValue": a[0] || (a[0] = (o) => d.value = o),
            placeholder: "请输入搜索关键词",
            class: "quick-search-input",
            onKeyup: Ce(Q, ["enter"])
          }, null, 8, ["modelValue"]),
          h(r, {
            type: "primary",
            icon: "Search",
            onClick: Q,
            class: "search-button"
          }, {
            default: f(() => a[2] || (a[2] = [
              x(" 搜索 ", -1)
            ])),
            _: 1,
            __: [2]
          }),
          q("div", Pe, [
            W.value ? (c(), v(xe, {
              key: 0,
              visible: C.value,
              "onUpdate:visible": a[1] || (a[1] = (o) => C.value = o),
              placement: "bottom-end",
              width: te.value,
              trigger: "click",
              "popper-class": "advanced-search-popover",
              teleported: !0
            }, {
              reference: f(() => [
                W.value ? (c(), v(r, {
                  key: 0,
                  ref: "filterButtonRef",
                  onClick: ie,
                  icon: C.value ? "ArrowUp" : "ArrowDown",
                  class: "filter-button"
                }, {
                  default: f(() => [
                    x(F(C.value ? "收起筛选" : "更多筛选"), 1)
                  ]),
                  _: 1
                }, 8, ["icon"])) : N("", !0)
              ]),
              default: f(() => [
                q("div", De, [
                  h(Fe(Ue), {
                    ref_key: "advancedFormRef",
                    ref: oe,
                    model: n.value,
                    "label-width": e.searchConfig.labelWidth || "100px",
                    inline: e.searchConfig.inline !== !1,
                    class: "advanced-form"
                  }, {
                    default: f(() => [
                      h(Ae, { gutter: 20 }, {
                        default: f(() => [
                          (c(!0), _(I, null, w(re.value, (o) => (c(), v(_e, {
                            key: o.field,
                            span: 24 / (e.searchConfig.itemsPerRow || 2),
                            class: "advanced-form-item-col"
                          }, {
                            default: f(() => [
                              h(Z, {
                                label: o.label,
                                prop: o.field,
                                class: "advanced-form-item"
                              }, {
                                default: f(() => [
                                  o.type === "input" || !o.type ? (c(), v(l, {
                                    key: 0,
                                    modelValue: n.value[o.field],
                                    "onUpdate:modelValue": (s) => n.value[o.field] = s,
                                    placeholder: o.placeholder || `请输入${o.label}`,
                                    clearable: o.clearable !== !1,
                                    class: "form-item-input"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable"])) : o.type === "textarea" ? (c(), _("div", {
                                    key: 1,
                                    class: "textarea-container",
                                    "data-field": o.field
                                  }, [
                                    le(h(l, {
                                      modelValue: n.value[o.field],
                                      "onUpdate:modelValue": (s) => n.value[o.field] = s,
                                      placeholder: o.shortPlaceholder || o.placeholder || `请输入${o.label}`,
                                      clearable: o.clearable !== !1,
                                      class: "form-item-input",
                                      onFocus: (s) => ne(o.field)
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "onFocus"]), [
                                      [ae, !V.value[o.field]]
                                    ]),
                                    le(h(l, {
                                      modelValue: n.value[o.field],
                                      "onUpdate:modelValue": (s) => n.value[o.field] = s,
                                      placeholder: o.longPlaceholder || o.placeholder || `请输入${o.label}`,
                                      clearable: o.clearable !== !1,
                                      type: "textarea",
                                      autosize: { minRows: 2, maxRows: 4 },
                                      class: "form-item-textarea-overlay",
                                      teleported: !0,
                                      onBlur: () => {
                                        V.value[o.field] = !1;
                                      }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "onBlur"]), [
                                      [ae, V.value[o.field]]
                                    ])
                                  ], 8, Oe)) : o.type === "select" ? (c(), v(i, {
                                    key: 2,
                                    modelValue: n.value[o.field],
                                    "onUpdate:modelValue": (s) => n.value[o.field] = s,
                                    placeholder: o.placeholder || `请选择${o.label}`,
                                    clearable: o.clearable !== !1,
                                    multiple: o.multiple,
                                    filterable: o.filterable,
                                    remote: o.remote,
                                    "remote-method": o.remote ? ue(o) : void 0,
                                    loading: T.value[o.field] || !1,
                                    class: "form-item-select",
                                    teleported: !1,
                                    "reserve-keyword": ""
                                  }, {
                                    default: f(() => [
                                      (c(!0), _(I, null, w(L(o), (s) => (c(), v(t, {
                                        key: s.value,
                                        label: s.label,
                                        value: s.value
                                      }, null, 8, ["label", "value"]))), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "multiple", "filterable", "remote", "remote-method", "loading"])) : o.type === "treeselect" ? (c(), v(m, {
                                    key: 3,
                                    modelValue: n.value[o.field],
                                    "onUpdate:modelValue": (s) => n.value[o.field] = s,
                                    placeholder: o.placeholder || `请选择${o.label}`,
                                    clearable: o.clearable !== !1,
                                    multiple: o.multiple,
                                    data: se(o),
                                    "node-key": o.nodeKey || "value",
                                    props: o.props || { value: "value", label: "label", children: "children" },
                                    "show-checkbox": o.showCheckbox,
                                    filterable: o.filterable,
                                    teleported: !1,
                                    "popper-options": { placement: "bottom-start" },
                                    style: Ie({ "--el-tree-select-dropdown-max-height": (o.maxDropdownHeight || 300) + "px" }),
                                    "render-after-expand": !1,
                                    loading: T.value[o.field] || !1
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "multiple", "data", "node-key", "props", "show-checkbox", "filterable", "style", "loading"])) : o.type === "radio" ? (c(), v(ye, {
                                    key: 4,
                                    modelValue: n.value[o.field],
                                    "onUpdate:modelValue": (s) => n.value[o.field] = s,
                                    class: "form-item-radio"
                                  }, {
                                    default: f(() => [
                                      (c(!0), _(I, null, w(o.options, (s) => (c(), v(D, {
                                        key: s.value,
                                        value: s.value,
                                        class: "form-item-radio-option"
                                      }, {
                                        default: f(() => [
                                          x(F(s.label), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]))), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["modelValue", "onUpdate:modelValue"])) : o.type === "checkbox" ? (c(), v(ge, {
                                    key: 5,
                                    modelValue: n.value[o.field],
                                    "onUpdate:modelValue": (s) => n.value[o.field] = s,
                                    class: "form-item-checkbox"
                                  }, {
                                    default: f(() => [
                                      (c(!0), _(I, null, w(o.options, (s) => (c(), v(be, {
                                        key: s.value,
                                        value: s.value,
                                        class: "form-item-checkbox-option"
                                      }, {
                                        default: f(() => [
                                          x(F(s.label), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]))), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["modelValue", "onUpdate:modelValue"])) : o.type === "date" ? (c(), v(Y, {
                                    key: 6,
                                    modelValue: n.value[o.field],
                                    "onUpdate:modelValue": (s) => n.value[o.field] = s,
                                    type: "date",
                                    placeholder: o.placeholder || `请选择${o.label}`,
                                    clearable: o.clearable !== !1,
                                    class: "form-item-date",
                                    teleported: !1
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable"])) : o.type === "daterange" ? (c(), v(Y, {
                                    key: 7,
                                    modelValue: n.value[o.field],
                                    "onUpdate:modelValue": (s) => n.value[o.field] = s,
                                    type: "daterange",
                                    "start-placeholder": o.startPlaceholder || "开始日期",
                                    "end-placeholder": o.endPlaceholder || "结束日期",
                                    clearable: o.clearable !== !1,
                                    class: "form-item-daterange",
                                    teleported: !1,
                                    "range-separator": "至"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "start-placeholder", "end-placeholder", "clearable"])) : o.type === "number" ? (c(), v(K, {
                                    key: 8,
                                    modelValue: n.value[o.field],
                                    "onUpdate:modelValue": (s) => n.value[o.field] = s,
                                    min: o.min,
                                    max: o.max,
                                    placeholder: o.placeholder || `请输入${o.label}`,
                                    "controls-position": o.controlsPosition || "right",
                                    class: "form-item-number"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max", "placeholder", "controls-position"])) : o.type === "numberrange" ? (c(), _("div", qe, [
                                    h(K, {
                                      "model-value": J(o.field, 0),
                                      min: o.min,
                                      max: o.max,
                                      placeholder: o.minPlaceholder || "最小值",
                                      "controls-position": o.controlsPosition || "right",
                                      class: "form-item-number",
                                      "onUpdate:modelValue": (s) => M(o.field, 0, s ?? null)
                                    }, null, 8, ["model-value", "min", "max", "placeholder", "controls-position", "onUpdate:modelValue"]),
                                    a[3] || (a[3] = q("span", { class: "range-separator" }, "-", -1)),
                                    h(K, {
                                      "model-value": J(o.field, 1),
                                      min: o.min,
                                      max: o.max,
                                      placeholder: o.maxPlaceholder || "最大值",
                                      "controls-position": o.controlsPosition || "right",
                                      class: "form-item-number",
                                      "onUpdate:modelValue": (s) => M(o.field, 1, s ?? null)
                                    }, null, 8, ["model-value", "min", "max", "placeholder", "controls-position", "onUpdate:modelValue"])
                                  ])) : o.type === "custom" ? we(e.$slots, o.slotName || o.field, {
                                    key: 10,
                                    model: n.value,
                                    field: o.field
                                  }, void 0, !0) : N("", !0)
                                ]),
                                _: 2
                              }, 1032, ["label", "prop"])
                            ]),
                            _: 2
                          }, 1032, ["span"]))), 128))
                        ]),
                        _: 3
                      }),
                      h(Z, {
                        class: "advanced-form-actions",
                        "label-width": e.searchConfig.labelWidth || "100px",
                        label: " "
                      }, {
                        default: f(() => [
                          h(r, {
                            type: "primary",
                            icon: "Search",
                            onClick: G
                          }, {
                            default: f(() => a[4] || (a[4] = [
                              x(" 搜索 ", -1)
                            ])),
                            _: 1,
                            __: [4]
                          }),
                          h(r, {
                            onClick: X,
                            icon: "Refresh"
                          }, {
                            default: f(() => a[5] || (a[5] = [
                              x(" 重置 ", -1)
                            ])),
                            _: 1,
                            __: [5]
                          })
                        ]),
                        _: 1
                      }, 8, ["label-width"])
                    ]),
                    _: 3
                  }, 8, ["model", "label-width", "inline"])
                ])
              ]),
              _: 3
            }, 8, ["visible", "width"])) : N("", !0)
          ])
        ]),
        g.value.length > 0 ? (c(), _("div", Ne, [
          (c(!0), _(I, null, w(g.value, (o) => (c(), v(Se, {
            key: o.key,
            closable: "",
            onClose: (s) => ve(o.key),
            class: "search-tag"
          }, {
            default: f(() => [
              x(F(o.label) + ": " + F(pe(o)), 1)
            ]),
            _: 2
          }, 1032, ["onClose"]))), 128)),
          h(r, {
            type: "primary",
            link: "",
            onClick: me,
            class: "clear-all-tags"
          }, {
            default: f(() => a[6] || (a[6] = [
              x(" 清除所有 ", -1)
            ])),
            _: 1,
            __: [6]
          })
        ])) : N("", !0)
      ]);
    };
  }
});
const Ee = (U, R) => {
  const b = U.__vccOpts || U;
  for (const [u, y] of R)
    b[u] = y;
  return b;
}, Be = /* @__PURE__ */ Ee(Re, [["__scopeId", "data-v-ca879d08"]]);
export {
  Be as default
};
