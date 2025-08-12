import { defineComponent as we, ref as V, watch as te, nextTick as J, computed as E, onMounted as Oe, resolveComponent as h, openBlock as d, createElementBlock as x, createElementVNode as j, createVNode as b, withKeys as Te, withCtx as p, createTextVNode as P, createBlock as m, toDisplayString as T, createCommentVNode as R, unref as $e, Fragment as $, renderList as N, mergeProps as y, withDirectives as oe, vShow as ne, renderSlot as Ne } from "vue";
import { ElForm as De } from "element-plus";
const ke = { class: "advanced-search" }, qe = { class: "main-search-bar" }, Ee = { class: "filter-button-wrapper" }, je = { class: "advanced-search-form-popover" }, Re = ["data-field"], Ke = {
  key: 9,
  class: "numberrange-container"
}, Be = {
  key: 0,
  class: "search-tags"
}, We = /* @__PURE__ */ we({
  __name: "index",
  props: {
    searchConfig: {},
    quickSearchField: { default: "keyword" },
    quickSearchPlaceholder: { default: "请输入搜索关键词" },
    modelValue: { default: () => ({}) },
    cacheKey: { default: "" }
  },
  emits: ["search", "update:modelValue"],
  setup(D, { emit: K }) {
    let A = null;
    const c = D, _ = K, se = V(null), U = V(!1), f = V(""), n = V({}), S = V([]), C = V({}), F = V({}), k = V({}), M = (l, r) => {
      const a = n.value[l];
      return Array.isArray(a) && a.length > r ? a[r] : null;
    }, L = (l, r, a) => {
      Array.isArray(n.value[l]) || (n.value[l] = [null, null]), n.value[l][r] = a, n.value = { ...n.value };
    };
    te(() => F.value, () => {
      S.value.length > 0 && S.value.some((r) => {
        const a = c.searchConfig.formItems.find((e) => e.field === r.key);
        return a && (a.type === "select" || a.type === "treeselect") && (a.remote || a.loadOptions);
      }) && (A && clearTimeout(A), A = window.setTimeout(() => {
        J(() => {
          X();
        });
      }, 100));
    }, { deep: !0 });
    const G = E(() => c.searchConfig.formItems.length > 1), ue = E(() => c.searchConfig.formItems.filter((l) => !l.hidden)), ce = E(() => c.searchConfig.popoverWidth || 800), I = E(() => c.cacheKey ? `advancedSearch@${c.cacheKey}` : ""), ie = (l) => {
      C.value[l] = !0, J(() => {
        const r = document.querySelector(`[data-field=${l}] .form-item-textarea-overlay textarea`);
        r && r.focus();
      });
    }, z = (l) => {
      try {
        if (l.type === "select" || l.type === "treeselect") {
          const r = l;
          return r.remote && F.value[l.field] ? F.value[l.field] : r.options || [];
        }
        return [];
      } catch (r) {
        return console.error("Error getting select options:", r), [];
      }
    }, de = (l) => z(l), H = (l) => {
      if (l.type === "treeselect") {
        const r = l;
        return r.props && typeof r.props == "object" ? r.props : {
          value: r.nodeKey || "id",
          label: "label",
          children: "children"
        };
      }
      return {};
    }, fe = (l) => {
      if (l.type !== "select" && l.type !== "treeselect")
        return;
      const r = l;
      return async (a) => {
        if (r.remoteMethod) {
          k.value[l.field] = !0;
          try {
            const e = await r.remoteMethod(a);
            F.value[l.field] = e;
          } catch (e) {
            console.error(`Failed to load remote options for ${l.field}:`, e);
          } finally {
            k.value[l.field] = !1;
          }
        }
      };
    }, Q = (l) => {
      if (I.value)
        try {
          localStorage.setItem(I.value, JSON.stringify({
            searchParams: l,
            timestamp: Date.now()
          }));
        } catch (r) {
          console.warn("Failed to save search cache:", r);
        }
    }, pe = () => {
      if (!I.value)
        return null;
      try {
        const l = localStorage.getItem(I.value);
        if (l) {
          const r = JSON.parse(l), a = Date.now(), e = 24 * 60 * 60 * 1e3;
          return a - r.timestamp > e ? (B(), null) : r.searchParams || null;
        }
      } catch (l) {
        console.warn("Failed to get search cache:", l), B();
      }
      return null;
    }, B = () => {
      if (I.value)
        try {
          localStorage.removeItem(I.value);
        } catch (l) {
          console.warn("Failed to clear search cache:", l);
        }
    }, X = () => {
      const l = {};
      f.value && (l[c.quickSearchField] = f.value), Object.assign(l, n.value);
      const r = S.value, a = [];
      f.value && a.push({
        key: c.quickSearchField,
        label: "关键词",
        value: f.value
      });
      for (const e of c.searchConfig.formItems) {
        const o = l[e.field];
        o != null && o !== "" && !(Array.isArray(o) && o.length === 0) && (e.type === "numberrange" ? Array.isArray(o) && (o[0] !== null || o[1] !== null) && a.push({
          key: e.field,
          label: e.label,
          value: o
        }) : e.type === "daterange" ? Array.isArray(o) && o.length === 2 && (o[0] !== null || o[1] !== null) && a.push({
          key: e.field,
          label: e.label,
          value: o
        }) : e.field !== c.quickSearchField && a.push({
          key: e.field,
          label: e.label,
          value: o
        }));
      }
      ve(r, a) || (S.value = a);
    }, ve = (l, r) => l.length !== r.length ? !1 : l.every((a, e) => {
      const o = r[e];
      return a.key === o.key && a.label === o.label && JSON.stringify(a.value) === JSON.stringify(o.value);
    }), he = () => {
    }, me = () => {
      U.value = !1;
    }, Y = () => {
      const l = {};
      f.value && (l[c.quickSearchField] = f.value), Object.assign(l, n.value), q(l), Q(l), _("update:modelValue", l), _("search", l);
    }, Z = () => {
      const l = {};
      f.value && (l[c.quickSearchField] = f.value), Object.assign(l, n.value), q(l), Q(l), me(), _("update:modelValue", l), _("search", l);
    }, ee = () => {
      const l = {}, r = {};
      for (const e of c.searchConfig.formItems)
        if (e.type === "custom")
          r[e.field] = e.default !== void 0 ? e.default : "";
        else if (e.type === "checkbox")
          r[e.field] = [];
        else if (e.type === "daterange" || e.type === "numberrange")
          r[e.field] = [];
        else if (e.type === "treeselect") {
          const o = e;
          r[e.field] = o.multiple ? [] : "";
        } else if (e.type === "select") {
          const o = e;
          r[e.field] = o.multiple ? [] : "";
        } else
          e.type === "textarea" ? (r[e.field] = e.default ?? "", l[e.field] = !1) : e.type === "number" ? r[e.field] = e.default ?? null : r[e.field] = e.default ?? "";
      n.value = r, C.value = l, S.value = [], B();
      const a = {};
      f.value && (a[c.quickSearchField] = f.value), _("update:modelValue", a), _("search", a);
    }, q = (l) => {
      try {
        const r = [];
        f.value && r.push({
          key: c.quickSearchField,
          label: "关键词",
          value: f.value
        });
        for (const a of c.searchConfig.formItems) {
          const e = l[a.field];
          e != null && e !== "" && !(Array.isArray(e) && e.length === 0) && (a.type === "numberrange" ? Array.isArray(e) && (e[0] !== null || e[1] !== null) && r.push({
            key: a.field,
            label: a.label,
            value: e
          }) : a.type === "daterange" ? Array.isArray(e) && e.length === 2 && (e[0] !== null || e[1] !== null) && r.push({
            key: a.field,
            label: a.label,
            value: e
          }) : a.field !== c.quickSearchField && r.push({
            key: a.field,
            label: a.label,
            value: e
          }));
        }
        S.value = r;
      } catch (r) {
        console.error("Error updating search tags:", r), S.value = [];
      }
    }, ye = (l, r, a) => {
      const e = a.value || "id", o = a.label || "label", s = [];
      for (const i of l) {
        const g = w(r, i, e);
        g && g.hasOwnProperty(o) ? s.push(g[o]) : s.push(String(i));
      }
      return s.join(", ");
    }, be = (l, r, a) => {
      const e = a.value || "id", o = a.label || "label", s = w(r, l, e);
      return s && s.hasOwnProperty(o) ? s[o] : String(l);
    }, w = (l, r, a) => {
      for (const e of l) {
        if (e.hasOwnProperty(a)) {
          const o = e[a];
          if (String(o) === String(r))
            return e;
        }
        if (e.children && e.children.length > 0) {
          const o = w(e.children, r, a);
          if (o)
            return o;
        }
      }
      return null;
    }, ge = (l) => {
      const r = c.searchConfig.formItems.find((a) => a.field === l.key);
      if (r && r.displayValue)
        try {
          return r.displayValue(l.value, n.value) || String(l.value);
        } catch (a) {
          return console.error("Error in custom displayValue function:", a), String(l.value);
        }
      if (r && (r.type === "select" || r.type === "treeselect") && (r.options || F.value[r.field])) {
        const a = r, e = a.remote ? F.value[r.field] : a.options;
        try {
          if (r.type === "treeselect") {
            const o = H(r);
            return Array.isArray(l.value) ? ye(l.value, e || [], o) : be(l.value, e || [], o);
          } else {
            if (Array.isArray(l.value))
              return l.value.map((i) => {
                const g = w(e || [], i, "value");
                return g ? g.label : String(i);
              }).filter((i) => i !== void 0 && i !== "undefined" && i !== "null" && i !== "").join(", ") || (l.value.length ? l.value.join(", ") : "");
            {
              const o = w(e || [], l.value, "value");
              return (o ? o.label : String(l.value)) || String(l.value);
            }
          }
        } catch (o) {
          return console.error("Error processing select/treeselect display value:", o), Array.isArray(l.value) ? l.value.join(", ") : String(l.value);
        }
      }
      if (r && (r.type === "radio" || r.type === "checkbox") && r.options)
        try {
          if (Array.isArray(l.value))
            return l.value.map((a) => {
              var o;
              const e = (o = r.options) == null ? void 0 : o.find((s) => s.value === a);
              return e ? e.label : a;
            }).join(", ");
          {
            const a = r.options.find((e) => e.value === l.value);
            return a ? a.label : l.value;
          }
        } catch (a) {
          return console.error("Error processing radio/checkbox display value:", a), Array.isArray(l.value) ? l.value.join(", ") : String(l.value);
        }
      if (r && r.type === "daterange" && Array.isArray(l.value))
        try {
          if (l.value.length === 2) {
            const [a, e] = l.value;
            if (a !== null && e !== null)
              return `${O(a)} ~ ${O(e)}`;
            if (a !== null)
              return `≥ ${O(a)}`;
            if (e !== null)
              return `≤ ${O(e)}`;
          }
          return "";
        } catch (a) {
          return console.error("Error processing daterange display value:", a), "";
        }
      if (r && r.type === "date")
        try {
          return l.value ? O(l.value) : "";
        } catch (a) {
          return console.error("Error processing date display value:", a), "";
        }
      if (r && r.type === "numberrange" && Array.isArray(l.value))
        try {
          const [a, e] = l.value;
          return a !== null && e !== null ? `${a} - ${e}` : a !== null ? `≥ ${a}` : e !== null ? `≤ ${e}` : "";
        } catch (a) {
          return console.error("Error processing numberrange display value:", a), "";
        }
      if (r && r.type === "timerange" && Array.isArray(l.value))
        try {
          const [a, e] = l.value;
          return a && e ? `${a} ~ ${e}` : a ? `≥ ${a}` : e ? `≤ ${e}` : "";
        } catch (a) {
          return console.error("Error processing timerange display value:", a), "";
        }
      if (r && r.type === "time")
        try {
          return l.value ? String(l.value) : "";
        } catch (a) {
          return console.error("Error processing time display value:", a), "";
        }
      return String(l.value);
    }, O = (l) => {
      if (l instanceof Date)
        return l.toLocaleDateString();
      if (typeof l == "string" || typeof l == "number") {
        const r = new Date(l);
        return isNaN(r.getTime()) ? String(l) : r.toLocaleDateString();
      }
      return String(l);
    }, _e = (l) => {
      if (l === c.quickSearchField)
        f.value = "";
      else {
        const r = c.searchConfig.formItems.find((a) => a.field === l);
        if (r)
          if (r.type === "checkbox")
            n.value[l] = [];
          else if (r.type === "daterange" || r.type === "numberrange")
            n.value[l] = [];
          else if (r.type === "select" || r.type === "treeselect") {
            const a = r;
            n.value[l] = a.multiple ? [] : "";
          } else
            r.type === "number" ? n.value[l] = null : r.type === "timerange" ? n.value[l] = [] : r.type === "time" ? n.value[l] = null : n.value[l] = "";
        else
          n.value[l] = "";
      }
      Z();
    }, Se = () => {
      f.value = "", ee();
    }, Ae = async () => {
      const l = [];
      for (const r of c.searchConfig.formItems)
        if ((r.type === "select" || r.type === "treeselect") && r.loadOptions) {
          const a = r, e = (async () => {
            try {
              const o = await a.loadOptions();
              F.value[r.field] = o;
            } catch (o) {
              console.error(`Failed to load options for ${r.field}:`, o);
            }
          })();
          l.push(e);
        }
      l.length > 0 && (await Promise.all(l), S.value.length > 0 && (A && clearTimeout(A), A = window.setTimeout(() => {
        J(() => {
          X();
        });
      }, 100)));
    }, v = (l, r, a) => {
      const e = {};
      if (l.hasOwnProperty("elProps")) {
        const o = l;
        o.elProps && (typeof o.elProps == "function" ? Object.assign(e, o.elProps(r, a)) : typeof o.elProps == "object" && o.elProps[r] ? Object.assign(e, o.elProps[r]) : typeof o.elProps == "object" && !Array.isArray(o.elProps) && Object.keys(o.elProps).length > 0 && Object.assign(e, o.elProps));
      }
      return e;
    };
    return te(() => c.modelValue, (l) => {
      if (l) {
        f.value = l[c.quickSearchField] || "";
        const r = { ...n.value };
        let a = !1;
        Object.keys(l).forEach((e) => {
          if (e !== c.quickSearchField) {
            const o = c.searchConfig.formItems.find((s) => s.field === e);
            if (o && o.type === "checkbox" && !Array.isArray(l[e]))
              r[e] = l[e] ? [l[e]] : [], a = !0;
            else if (o && o.type === "daterange" && l[e])
              Array.isArray(l[e]) ? (r[e] = l[e].map((s) => {
                if (s instanceof Date)
                  return s;
                if (typeof s == "string" || typeof s == "number") {
                  const i = new Date(s);
                  return isNaN(i.getTime()) ? s : i;
                }
                return s;
              }), a = !0) : (r[e] = [], a = !0);
            else if (o && o.type === "numberrange" && l[e])
              Array.isArray(l[e]) ? (r[e] = l[e], a = !0) : (r[e] = [null, null], a = !0);
            else if (o && o.type === "number") {
              let s = l[e];
              typeof s == "string" && s !== "" && !isNaN(Number(s)) ? s = Number(s) : (s === "" || s === void 0) && (s = null), r[e] !== s && (r[e] = s, a = !0);
            } else
              o && o.type === "timerange" && l[e] ? Array.isArray(l[e]) ? (r[e] = l[e], a = !0) : (r[e] = [], a = !0) : o && o.type === "time" ? r[e] !== l[e] && (r[e] = l[e], a = !0) : o && o.type === "custom" && typeof o.default == "number" && l[e] === "" ? (r[e] = o.default, a = !0) : r[e] !== l[e] && (r[e] = l[e], a = !0);
          }
        }), a && (n.value = r), q(l);
      }
    }, { immediate: !0, deep: !0 }), Oe(() => {
      const l = {}, r = {};
      for (const e of c.searchConfig.formItems)
        if (e.type === "custom")
          l[e.field] = e.default !== void 0 ? e.default : "";
        else if (e.type === "checkbox")
          l[e.field] = Array.isArray(e.default) ? e.default : [];
        else if (e.type === "treeselect") {
          const o = e;
          l[e.field] = o.multiple ? Array.isArray(e.default) ? e.default : [] : e.default ?? "";
        } else if (e.type === "select") {
          const o = e;
          l[e.field] = o.multiple ? Array.isArray(e.default) ? e.default : [] : e.default ?? "";
        } else
          e.type === "daterange" ? l[e.field] = Array.isArray(e.default) ? e.default : [] : e.type === "numberrange" ? l[e.field] = Array.isArray(e.default) ? e.default : [null, null] : e.type === "textarea" ? (l[e.field] = e.default ?? "", r[e.field] = !1) : e.type === "number" ? l[e.field] = e.default ?? null : e && e.type === "timerange" ? l[e.field] = Array.isArray(e.default) ? e.default : [] : e && e.type === "time" ? l[e.field] = e.default ?? null : l[e.field] = e.default ?? "";
      n.value = l, C.value = r;
      const a = pe();
      if (a) {
        f.value = a[c.quickSearchField] || "", Object.keys(a).forEach((o) => {
          if (o !== c.quickSearchField) {
            const s = c.searchConfig.formItems.find((i) => i.field === o);
            if (s && s.type === "checkbox" && !Array.isArray(a[o]))
              l[o] = a[o] ? [a[o]] : [];
            else if (s && s.type === "date" && a[o])
              if (typeof a[o] == "string" || typeof a[o] == "number") {
                const i = new Date(a[o]);
                l[o] = isNaN(i.getTime()) ? a[o] : i;
              } else
                l[o] = a[o];
            else
              s && s.type === "daterange" && a[o] ? Array.isArray(a[o]) ? l[o] = a[o].map((i) => {
                if (i instanceof Date)
                  return i;
                if (typeof i == "string" || typeof i == "number") {
                  const g = new Date(i);
                  return isNaN(g.getTime()) ? i : g;
                }
                return i;
              }) : l[o] = [] : s && s.type === "numberrange" && a[o] ? Array.isArray(a[o]) ? l[o] = a[o] : l[o] = [null, null] : s && s.type === "timerange" && a[o] ? Array.isArray(a[o]) ? l[o] = a[o] : l[o] = [] : (s && s.type === "time" && a[o], l[o] = a[o]);
          }
        }), n.value = l;
        const e = {};
        f.value && (e[c.quickSearchField] = f.value), Object.assign(e, n.value), q(e), _("update:modelValue", e), _("search", e);
      }
      Ae();
    }), (l, r) => {
      const a = h("el-input"), e = h("el-button"), o = h("el-option"), s = h("el-select"), i = h("el-tree-select"), g = h("el-radio"), xe = h("el-radio-group"), Ve = h("el-checkbox"), Pe = h("el-checkbox-group"), le = h("el-date-picker"), W = h("el-input-number"), re = h("el-time-picker"), ae = h("el-form-item"), Fe = h("el-col"), Ce = h("el-row"), Ie = h("el-popover"), Ue = h("el-tag");
      return d(), x("div", ke, [
        j("div", qe, [
          b(a, {
            modelValue: f.value,
            "onUpdate:modelValue": r[0] || (r[0] = (t) => f.value = t),
            placeholder: l.quickSearchPlaceholder,
            class: "quick-search-input",
            onKeyup: Te(Y, ["enter"])
          }, null, 8, ["modelValue", "placeholder"]),
          b(e, {
            type: "primary",
            icon: "Search",
            onClick: Y,
            class: "search-button"
          }, {
            default: p(() => r[2] || (r[2] = [
              P(" 搜索 ", -1)
            ])),
            _: 1,
            __: [2]
          }),
          j("div", Ee, [
            G.value ? (d(), m(Ie, {
              key: 0,
              visible: U.value,
              "onUpdate:visible": r[1] || (r[1] = (t) => U.value = t),
              placement: "bottom-end",
              width: ce.value,
              trigger: "click",
              "popper-class": "advanced-search-popover",
              teleported: !0,
              "hide-after": 0,
              persistent: !1,
              "show-arrow": !1
            }, {
              reference: p(() => [
                G.value ? (d(), m(e, {
                  key: 0,
                  ref: "filterButtonRef",
                  onClick: he,
                  icon: U.value ? "ArrowUp" : "ArrowDown",
                  class: "filter-button"
                }, {
                  default: p(() => [
                    P(T(U.value ? "收起筛选" : "更多筛选"), 1)
                  ]),
                  _: 1
                }, 8, ["icon"])) : R("", !0)
              ]),
              default: p(() => [
                j("div", je, [
                  b($e(De), {
                    ref_key: "advancedFormRef",
                    ref: se,
                    model: n.value,
                    "label-width": l.searchConfig.labelWidth || "100px",
                    inline: l.searchConfig.inline !== !1,
                    class: "advanced-form"
                  }, {
                    default: p(() => [
                      b(Ce, { gutter: 20 }, {
                        default: p(() => [
                          (d(!0), x($, null, N(ue.value, (t) => (d(), m(Fe, {
                            key: t.field,
                            span: 24 / (l.searchConfig.itemsPerRow || 2),
                            class: "advanced-form-item-col"
                          }, {
                            default: p(() => [
                              b(ae, {
                                label: t.label,
                                prop: t.field,
                                class: "advanced-form-item"
                              }, {
                                default: p(() => [
                                  t.type === "input" || !t.type ? (d(), m(a, y({
                                    key: 0,
                                    modelValue: n.value[t.field],
                                    "onUpdate:modelValue": (u) => n.value[t.field] = u,
                                    placeholder: t.placeholder || `请输入${t.label}`,
                                    clearable: t.clearable !== !1,
                                    class: "form-item-input"
                                  }, { ref_for: !0 }, v(t, "input")), null, 16, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable"])) : t.type === "textarea" ? (d(), x("div", {
                                    key: 1,
                                    class: "textarea-container",
                                    "data-field": t.field
                                  }, [
                                    oe(b(a, y({
                                      modelValue: n.value[t.field],
                                      "onUpdate:modelValue": (u) => n.value[t.field] = u,
                                      placeholder: t.shortPlaceholder || t.placeholder || `请输入${t.label}`,
                                      clearable: t.clearable !== !1,
                                      class: "form-item-input",
                                      onFocus: (u) => ie(t.field)
                                    }, { ref_for: !0 }, v(t, "input")), null, 16, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "onFocus"]), [
                                      [ne, !C.value[t.field]]
                                    ]),
                                    oe(b(a, y({
                                      modelValue: n.value[t.field],
                                      "onUpdate:modelValue": (u) => n.value[t.field] = u,
                                      placeholder: t.longPlaceholder || t.placeholder || `请输入${t.label}`,
                                      clearable: t.clearable !== !1,
                                      type: "textarea",
                                      autosize: { minRows: 2, maxRows: 4 },
                                      class: "form-item-textarea-overlay",
                                      teleported: !0,
                                      onBlur: () => {
                                        C.value[t.field] = !1;
                                      }
                                    }, { ref_for: !0 }, v(t, "input")), null, 16, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "onBlur"]), [
                                      [ne, C.value[t.field]]
                                    ])
                                  ], 8, Re)) : t.type === "select" ? (d(), m(s, y({
                                    key: 2,
                                    modelValue: n.value[t.field],
                                    "onUpdate:modelValue": (u) => n.value[t.field] = u,
                                    placeholder: t.placeholder || `请选择${t.label}`,
                                    clearable: t.clearable !== !1,
                                    multiple: t.multiple,
                                    filterable: t.filterable,
                                    remote: t.remote,
                                    "remote-method": t.remote ? fe(t) : void 0,
                                    loading: k.value[t.field] || !1,
                                    class: "form-item-select",
                                    teleported: !1,
                                    "reserve-keyword": ""
                                  }, { ref_for: !0 }, v(t, "select")), {
                                    default: p(() => [
                                      (d(!0), x($, null, N(z(t), (u) => (d(), m(o, y({
                                        key: u.value,
                                        label: u.label,
                                        value: u.value
                                      }, { ref_for: !0 }, v(t, "option", u)), null, 16, ["label", "value"]))), 128))
                                    ]),
                                    _: 2
                                  }, 1040, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "multiple", "filterable", "remote", "remote-method", "loading"])) : t.type === "treeselect" ? (d(), m(i, y({
                                    key: 3,
                                    modelValue: n.value[t.field],
                                    "onUpdate:modelValue": (u) => n.value[t.field] = u,
                                    placeholder: t.placeholder || `请选择${t.label}`,
                                    clearable: t.clearable !== !1,
                                    multiple: t.multiple,
                                    data: de(t),
                                    "node-key": t.nodeKey || "id",
                                    props: H(t),
                                    "show-checkbox": t.showCheckbox,
                                    filterable: t.filterable,
                                    teleported: !1,
                                    "popper-options": { placement: "bottom-start" },
                                    style: { "--el-tree-select-dropdown-max-height": (t.maxDropdownHeight || 300) + "px" },
                                    "render-after-expand": !1,
                                    loading: k.value[t.field] || !1
                                  }, { ref_for: !0 }, v(t, "treeSelect")), null, 16, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "multiple", "data", "node-key", "props", "show-checkbox", "filterable", "style", "loading"])) : t.type === "radio" ? (d(), m(xe, y({
                                    key: 4,
                                    modelValue: n.value[t.field],
                                    "onUpdate:modelValue": (u) => n.value[t.field] = u,
                                    class: "form-item-radio"
                                  }, { ref_for: !0 }, v(t, "radioGroup")), {
                                    default: p(() => [
                                      (d(!0), x($, null, N(t.options, (u) => (d(), m(g, y({
                                        key: u.value,
                                        value: u.value,
                                        class: "form-item-radio-option"
                                      }, { ref_for: !0 }, v(t, "radio", u)), {
                                        default: p(() => [
                                          P(T(u.label), 1)
                                        ]),
                                        _: 2
                                      }, 1040, ["value"]))), 128))
                                    ]),
                                    _: 2
                                  }, 1040, ["modelValue", "onUpdate:modelValue"])) : t.type === "checkbox" ? (d(), m(Pe, y({
                                    key: 5,
                                    modelValue: n.value[t.field],
                                    "onUpdate:modelValue": (u) => n.value[t.field] = u,
                                    class: "form-item-checkbox"
                                  }, { ref_for: !0 }, v(t, "checkboxGroup")), {
                                    default: p(() => [
                                      (d(!0), x($, null, N(t.options, (u) => (d(), m(Ve, y({
                                        key: u.value,
                                        value: u.value,
                                        class: "form-item-checkbox-option"
                                      }, { ref_for: !0 }, v(t, "checkbox", u)), {
                                        default: p(() => [
                                          P(T(u.label), 1)
                                        ]),
                                        _: 2
                                      }, 1040, ["value"]))), 128))
                                    ]),
                                    _: 2
                                  }, 1040, ["modelValue", "onUpdate:modelValue"])) : t.type === "date" ? (d(), m(le, y({
                                    key: 6,
                                    modelValue: n.value[t.field],
                                    "onUpdate:modelValue": (u) => n.value[t.field] = u,
                                    type: "date",
                                    placeholder: t.placeholder || `请选择${t.label}`,
                                    clearable: t.clearable !== !1,
                                    class: "form-item-date",
                                    teleported: !1
                                  }, { ref_for: !0 }, v(t, "datePicker")), null, 16, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable"])) : t.type === "daterange" ? (d(), m(le, y({
                                    key: 7,
                                    modelValue: n.value[t.field],
                                    "onUpdate:modelValue": (u) => n.value[t.field] = u,
                                    type: "daterange",
                                    "start-placeholder": t.startPlaceholder || "开始日期",
                                    "end-placeholder": t.endPlaceholder || "结束日期",
                                    clearable: t.clearable !== !1,
                                    class: "form-item-daterange",
                                    teleported: !1,
                                    "range-separator": "至"
                                  }, { ref_for: !0 }, v(t, "datePicker")), null, 16, ["modelValue", "onUpdate:modelValue", "start-placeholder", "end-placeholder", "clearable"])) : t.type === "number" ? (d(), m(W, y({
                                    key: 8,
                                    modelValue: n.value[t.field],
                                    "onUpdate:modelValue": (u) => n.value[t.field] = u,
                                    min: t.min,
                                    max: t.max,
                                    placeholder: t.placeholder || `请输入${t.label}`,
                                    "controls-position": t.controlsPosition || "right",
                                    class: "form-item-number"
                                  }, { ref_for: !0 }, v(t, "inputNumber")), null, 16, ["modelValue", "onUpdate:modelValue", "min", "max", "placeholder", "controls-position"])) : t.type === "numberrange" ? (d(), x("div", Ke, [
                                    b(W, y({
                                      "model-value": M(t.field, 0),
                                      min: t.min,
                                      max: t.max,
                                      placeholder: t.minPlaceholder || "最小值",
                                      "controls-position": t.controlsPosition || "right",
                                      class: "form-item-number",
                                      "onUpdate:modelValue": (u) => L(t.field, 0, u ?? null)
                                    }, { ref_for: !0 }, v(t, "inputNumber")), null, 16, ["model-value", "min", "max", "placeholder", "controls-position", "onUpdate:modelValue"]),
                                    r[3] || (r[3] = j("span", { class: "range-separator" }, "-", -1)),
                                    b(W, y({
                                      "model-value": M(t.field, 1),
                                      min: t.min,
                                      max: t.max,
                                      placeholder: t.maxPlaceholder || "最大值",
                                      "controls-position": t.controlsPosition || "right",
                                      class: "form-item-number",
                                      "onUpdate:modelValue": (u) => L(t.field, 1, u ?? null)
                                    }, { ref_for: !0 }, v(t, "inputNumber")), null, 16, ["model-value", "min", "max", "placeholder", "controls-position", "onUpdate:modelValue"])
                                  ])) : t.type === "time" ? (d(), m(re, y({
                                    key: 10,
                                    modelValue: n.value[t.field],
                                    "onUpdate:modelValue": (u) => n.value[t.field] = u,
                                    placeholder: t.placeholder || `请选择${t.label}`,
                                    clearable: t.clearable !== !1,
                                    format: t.format,
                                    class: "form-item-time",
                                    teleported: !1
                                  }, { ref_for: !0 }, v(t, "timePicker")), null, 16, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "format"])) : t.type === "timerange" ? (d(), m(re, y({
                                    key: 11,
                                    modelValue: n.value[t.field],
                                    "onUpdate:modelValue": (u) => n.value[t.field] = u,
                                    "is-range": "",
                                    "start-placeholder": t.startPlaceholder || "开始时间",
                                    "end-placeholder": t.endPlaceholder || "结束时间",
                                    clearable: t.clearable !== !1,
                                    format: t.format,
                                    class: "form-item-timerange",
                                    teleported: !1,
                                    "range-separator": "至"
                                  }, { ref_for: !0 }, v(t, "timePicker")), null, 16, ["modelValue", "onUpdate:modelValue", "start-placeholder", "end-placeholder", "clearable", "format"])) : t.type === "custom" ? Ne(l.$slots, t.slotName || t.field, {
                                    key: 12,
                                    model: n.value,
                                    field: t.field
                                  }, void 0, !0) : R("", !0)
                                ]),
                                _: 2
                              }, 1032, ["label", "prop"])
                            ]),
                            _: 2
                          }, 1032, ["span"]))), 128))
                        ]),
                        _: 3
                      }),
                      b(ae, {
                        class: "advanced-form-actions",
                        "label-width": l.searchConfig.labelWidth || "100px",
                        label: " "
                      }, {
                        default: p(() => [
                          b(e, {
                            type: "primary",
                            icon: "Search",
                            onClick: Z
                          }, {
                            default: p(() => r[4] || (r[4] = [
                              P(" 搜索 ", -1)
                            ])),
                            _: 1,
                            __: [4]
                          }),
                          b(e, {
                            onClick: ee,
                            icon: "Refresh"
                          }, {
                            default: p(() => r[5] || (r[5] = [
                              P(" 重置 ", -1)
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
            }, 8, ["visible", "width"])) : R("", !0)
          ])
        ]),
        S.value.length > 0 ? (d(), x("div", Be, [
          (d(!0), x($, null, N(S.value, (t) => (d(), m(Ue, {
            key: t.key,
            closable: "",
            onClose: (u) => _e(t.key),
            class: "search-tag"
          }, {
            default: p(() => [
              P(T(t.label) + ": " + T(ge(t)), 1)
            ]),
            _: 2
          }, 1032, ["onClose"]))), 128)),
          b(e, {
            type: "primary",
            link: "",
            onClick: Se,
            class: "clear-all-tags"
          }, {
            default: p(() => r[6] || (r[6] = [
              P(" 清除所有 ", -1)
            ])),
            _: 1,
            __: [6]
          })
        ])) : R("", !0)
      ]);
    };
  }
});
const Je = (D, K) => {
  const A = D.__vccOpts || D;
  for (const [c, _] of K)
    A[c] = _;
  return A;
}, Ge = /* @__PURE__ */ Je(We, [["__scopeId", "data-v-cbe75641"]]);
export {
  Ge as ElementAdvancedSearch,
  Ge as default
};
