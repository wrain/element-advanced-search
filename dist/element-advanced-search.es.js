import { defineComponent as Oe, ref as P, watch as z, nextTick as W, computed as D, onMounted as fe, resolveComponent as m, openBlock as i, createElementBlock as S, createElementVNode as J, createVNode as g, withKeys as Ne, withCtx as p, createTextVNode as x, createBlock as v, toDisplayString as C, createCommentVNode as U, unref as De, Fragment as k, renderList as w, mergeProps as y, withDirectives as pe, vShow as ve, renderSlot as H, Teleport as qe } from "vue";
import { ElForm as Ee } from "element-plus";
const je = { class: "advanced-search" }, Re = { class: "main-search-bar" }, Ke = { class: "filter-button-wrapper" }, Be = { class: "advanced-search-form-popover" }, We = ["data-field"], Je = {
  key: 9,
  class: "numberrange-container"
}, Me = {
  key: 0,
  class: "search-tags"
}, Le = {
  key: 0,
  class: "search-tags teleported-tags"
}, Ge = /* @__PURE__ */ Oe({
  __name: "index",
  props: {
    searchConfig: {},
    quickSearchField: { default: "keyword" },
    quickSearchPlaceholder: { default: "请输入搜索关键词" },
    modelValue: { default: () => ({}) },
    cacheKey: { default: "" },
    teleportTo: { default: void 0 }
  },
  emits: ["search", "update:modelValue"],
  setup(q, { emit: M }) {
    let V = null;
    const c = q, A = M, he = P(null), $ = P(!1), f = P(""), n = P({}), b = P([]), F = P({}), T = P({}), E = P({}), Q = (l, r) => {
      const t = n.value[l];
      return Array.isArray(t) && t.length > r ? t[r] : null;
    }, X = (l, r, t) => {
      Array.isArray(n.value[l]) || (n.value[l] = [null, null]), n.value[l][r] = t, n.value = { ...n.value };
    };
    z(() => T.value, () => {
      b.value.length > 0 && b.value.some((r) => {
        const t = c.searchConfig.formItems.find((e) => e.field === r.key);
        return t && (t.type === "select" || t.type === "treeselect") && (t.remote || t.loadOptions);
      }) && (V && clearTimeout(V), V = window.setTimeout(() => {
        W(() => {
          ae();
        });
      }, 100));
    }, { deep: !0 });
    const j = P(!1), Y = D(() => c.teleportTo && j.value);
    fe(() => {
      c.teleportTo && W(() => {
        j.value = !!document.querySelector(c.teleportTo);
      });
    }), z(() => c.teleportTo, (l) => {
      l ? setTimeout(() => {
        j.value = !!document.querySelector(l);
      }, 0) : j.value = !1;
    });
    const Z = D(() => c.searchConfig.formItems.length > 1), me = D(() => c.searchConfig.formItems.filter((l) => !l.hidden)), ye = D(() => c.searchConfig.popoverWidth || 800), I = D(() => c.cacheKey ? `advancedSearch@${c.cacheKey}` : ""), be = (l) => {
      F.value[l] = !0, W(() => {
        const r = document.querySelector(`[data-field=${l}] .form-item-textarea-overlay textarea`);
        r && r.focus();
      });
    }, ee = (l) => {
      try {
        if (l.type === "select" || l.type === "treeselect") {
          const r = l;
          return r.remote && T.value[l.field] ? T.value[l.field] : r.options || [];
        }
        return [];
      } catch (r) {
        return console.error("Error getting select options:", r), [];
      }
    }, ge = (l) => ee(l), le = (l) => {
      if (l.type === "treeselect") {
        const r = l;
        return r.props && typeof r.props == "object" ? r.props : {
          value: r.nodeKey || "id",
          label: "label",
          children: "children"
        };
      }
      return {};
    }, _e = (l) => {
      if (l.type !== "select" && l.type !== "treeselect")
        return;
      const r = l;
      return async (t) => {
        if (r.remoteMethod) {
          E.value[l.field] = !0;
          try {
            const e = await r.remoteMethod(t);
            T.value[l.field] = e;
          } catch (e) {
            console.error(`Failed to load remote options for ${l.field}:`, e);
          } finally {
            E.value[l.field] = !1;
          }
        }
      };
    }, re = (l) => {
      if (I.value)
        try {
          localStorage.setItem(I.value, JSON.stringify({
            searchParams: l,
            timestamp: Date.now()
          }));
        } catch (r) {
          console.warn("Failed to save search cache:", r);
        }
    }, Se = () => {
      if (!I.value)
        return null;
      try {
        const l = localStorage.getItem(I.value);
        if (l) {
          const r = JSON.parse(l), t = Date.now(), e = 24 * 60 * 60 * 1e3;
          return t - r.timestamp > e ? (L(), null) : r.searchParams || null;
        }
      } catch (l) {
        console.warn("Failed to get search cache:", l), L();
      }
      return null;
    }, L = () => {
      if (I.value)
        try {
          localStorage.removeItem(I.value);
        } catch (l) {
          console.warn("Failed to clear search cache:", l);
        }
    }, ae = () => {
      const l = {};
      f.value && (l[c.quickSearchField] = f.value), Object.assign(l, n.value);
      const r = b.value, t = [];
      f.value && t.push({
        key: c.quickSearchField,
        label: "关键词",
        value: f.value
      });
      for (const e of c.searchConfig.formItems) {
        const o = l[e.field];
        o != null && o !== "" && !(Array.isArray(o) && o.length === 0) && (e.type === "numberrange" ? Array.isArray(o) && (o[0] !== null || o[1] !== null) && t.push({
          key: e.field,
          label: e.label,
          value: o
        }) : e.type === "daterange" ? Array.isArray(o) && o.length === 2 && (o[0] !== null || o[1] !== null) && t.push({
          key: e.field,
          label: e.label,
          value: o
        }) : e.field !== c.quickSearchField && t.push({
          key: e.field,
          label: e.label,
          value: o
        }));
      }
      Ae(r, t) || (b.value = t);
    }, Ae = (l, r) => l.length !== r.length ? !1 : l.every((t, e) => {
      const o = r[e];
      return t.key === o.key && t.label === o.label && JSON.stringify(t.value) === JSON.stringify(o.value);
    }), xe = () => {
    }, Ve = () => {
      $.value = !1;
    }, te = () => {
      const l = {};
      f.value && (l[c.quickSearchField] = f.value), Object.assign(l, n.value), R(l), re(l), A("update:modelValue", l), A("search", l);
    }, oe = () => {
      const l = {};
      f.value && (l[c.quickSearchField] = f.value), Object.assign(l, n.value), R(l), re(l), Ve(), A("update:modelValue", l), A("search", l);
    }, ne = () => {
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
      n.value = r, F.value = l, b.value = [], L();
      const t = {};
      f.value && (t[c.quickSearchField] = f.value), A("update:modelValue", t), A("search", t);
    }, R = (l) => {
      try {
        const r = [];
        f.value && r.push({
          key: c.quickSearchField,
          label: "关键词",
          value: f.value
        });
        for (const t of c.searchConfig.formItems) {
          const e = l[t.field];
          e != null && e !== "" && !(Array.isArray(e) && e.length === 0) && (t.type === "numberrange" ? Array.isArray(e) && (e[0] !== null || e[1] !== null) && r.push({
            key: t.field,
            label: t.label,
            value: e
          }) : t.type === "daterange" ? Array.isArray(e) && e.length === 2 && (e[0] !== null || e[1] !== null) && r.push({
            key: t.field,
            label: t.label,
            value: e
          }) : t.field !== c.quickSearchField && r.push({
            key: t.field,
            label: t.label,
            value: e
          }));
        }
        b.value = r;
      } catch (r) {
        console.error("Error updating search tags:", r), b.value = [];
      }
    }, Pe = (l, r, t) => {
      const e = t.value || "id", o = t.label || "label", s = [];
      for (const d of l) {
        const _ = O(r, d, e);
        _ && _.hasOwnProperty(o) ? s.push(_[o]) : s.push(String(d));
      }
      return s.join(", ");
    }, Te = (l, r, t) => {
      const e = t.value || "id", o = t.label || "label", s = O(r, l, e);
      return s && s.hasOwnProperty(o) ? s[o] : String(l);
    }, O = (l, r, t) => {
      for (const e of l) {
        if (e.hasOwnProperty(t)) {
          const o = e[t];
          if (String(o) === String(r))
            return e;
        }
        if (e.children && e.children.length > 0) {
          const o = O(e.children, r, t);
          if (o)
            return o;
        }
      }
      return null;
    }, se = (l) => {
      const r = c.searchConfig.formItems.find((t) => t.field === l.key);
      if (r && r.displayValue)
        try {
          return r.displayValue(l.value, n.value) || String(l.value);
        } catch (t) {
          return console.error("Error in custom displayValue function:", t), String(l.value);
        }
      if (r && (r.type === "select" || r.type === "treeselect") && (r.options || T.value[r.field])) {
        const t = r, e = t.remote ? T.value[r.field] : t.options;
        try {
          if (r.type === "treeselect") {
            const o = le(r);
            return Array.isArray(l.value) ? Pe(l.value, e || [], o) : Te(l.value, e || [], o);
          } else {
            if (Array.isArray(l.value))
              return l.value.map((d) => {
                const _ = O(e || [], d, "value");
                return _ ? _.label : String(d);
              }).filter((d) => d !== void 0 && d !== "undefined" && d !== "null" && d !== "").join(", ") || (l.value.length ? l.value.join(", ") : "");
            {
              const o = O(e || [], l.value, "value");
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
            return l.value.map((t) => {
              var o;
              const e = (o = r.options) == null ? void 0 : o.find((s) => s.value === t);
              return e ? e.label : t;
            }).join(", ");
          {
            const t = r.options.find((e) => e.value === l.value);
            return t ? t.label : l.value;
          }
        } catch (t) {
          return console.error("Error processing radio/checkbox display value:", t), Array.isArray(l.value) ? l.value.join(", ") : String(l.value);
        }
      if (r && r.type === "daterange" && Array.isArray(l.value))
        try {
          if (l.value.length === 2) {
            const [t, e] = l.value;
            if (t !== null && e !== null)
              return `${N(t)} ~ ${N(e)}`;
            if (t !== null)
              return `≥ ${N(t)}`;
            if (e !== null)
              return `≤ ${N(e)}`;
          }
          return "";
        } catch (t) {
          return console.error("Error processing daterange display value:", t), "";
        }
      if (r && r.type === "date")
        try {
          return l.value ? N(l.value) : "";
        } catch (t) {
          return console.error("Error processing date display value:", t), "";
        }
      if (r && r.type === "numberrange" && Array.isArray(l.value))
        try {
          const [t, e] = l.value;
          return t !== null && e !== null ? `${t} - ${e}` : t !== null ? `≥ ${t}` : e !== null ? `≤ ${e}` : "";
        } catch (t) {
          return console.error("Error processing numberrange display value:", t), "";
        }
      if (r && r.type === "timerange" && Array.isArray(l.value))
        try {
          const [t, e] = l.value;
          return t && e ? `${t} ~ ${e}` : t ? `≥ ${t}` : e ? `≤ ${e}` : "";
        } catch (t) {
          return console.error("Error processing timerange display value:", t), "";
        }
      if (r && r.type === "time")
        try {
          return l.value ? String(l.value) : "";
        } catch (t) {
          return console.error("Error processing time display value:", t), "";
        }
      return String(l.value);
    }, N = (l) => {
      if (l instanceof Date)
        return l.toLocaleDateString();
      if (typeof l == "string" || typeof l == "number") {
        const r = new Date(l);
        return isNaN(r.getTime()) ? String(l) : r.toLocaleDateString();
      }
      return String(l);
    }, K = (l) => {
      if (l === c.quickSearchField)
        f.value = "";
      else {
        const r = c.searchConfig.formItems.find((t) => t.field === l);
        if (r)
          if (r.type === "checkbox")
            n.value[l] = [];
          else if (r.type === "daterange" || r.type === "numberrange")
            n.value[l] = [];
          else if (r.type === "select" || r.type === "treeselect") {
            const t = r;
            n.value[l] = t.multiple ? [] : "";
          } else
            r.type === "number" ? n.value[l] = null : r.type === "timerange" ? n.value[l] = [] : r.type === "time" ? n.value[l] = null : n.value[l] = "";
        else
          n.value[l] = "";
      }
      oe();
    }, B = () => {
      f.value = "", ne();
    }, Ce = async () => {
      const l = [];
      for (const r of c.searchConfig.formItems)
        if ((r.type === "select" || r.type === "treeselect") && r.loadOptions) {
          const t = r, e = (async () => {
            try {
              const o = await t.loadOptions();
              T.value[r.field] = o;
            } catch (o) {
              console.error(`Failed to load options for ${r.field}:`, o);
            }
          })();
          l.push(e);
        }
      l.length > 0 && (await Promise.all(l), b.value.length > 0 && (V && clearTimeout(V), V = window.setTimeout(() => {
        W(() => {
          ae();
        });
      }, 100)));
    }, h = (l, r, t) => {
      const e = {};
      if (l.hasOwnProperty("elProps")) {
        const o = l;
        o.elProps && (typeof o.elProps == "function" ? Object.assign(e, o.elProps(r, t)) : typeof o.elProps == "object" && o.elProps[r] ? Object.assign(e, o.elProps[r]) : typeof o.elProps == "object" && !Array.isArray(o.elProps) && Object.keys(o.elProps).length > 0 && Object.assign(e, o.elProps));
      }
      return e;
    };
    return z(() => c.modelValue, (l) => {
      if (l) {
        f.value = l[c.quickSearchField] || "";
        const r = { ...n.value };
        let t = !1;
        Object.keys(l).forEach((e) => {
          if (e !== c.quickSearchField) {
            const o = c.searchConfig.formItems.find((s) => s.field === e);
            if (o && o.type === "checkbox" && !Array.isArray(l[e]))
              r[e] = l[e] ? [l[e]] : [], t = !0;
            else if (o && o.type === "daterange" && l[e])
              Array.isArray(l[e]) ? (r[e] = l[e].map((s) => {
                if (s instanceof Date)
                  return s;
                if (typeof s == "string" || typeof s == "number") {
                  const d = new Date(s);
                  return isNaN(d.getTime()) ? s : d;
                }
                return s;
              }), t = !0) : (r[e] = [], t = !0);
            else if (o && o.type === "numberrange" && l[e])
              Array.isArray(l[e]) ? (r[e] = l[e], t = !0) : (r[e] = [null, null], t = !0);
            else if (o && o.type === "number") {
              let s = l[e];
              typeof s == "string" && s !== "" && !isNaN(Number(s)) ? s = Number(s) : (s === "" || s === void 0) && (s = null), r[e] !== s && (r[e] = s, t = !0);
            } else
              o && o.type === "timerange" && l[e] ? Array.isArray(l[e]) ? (r[e] = l[e], t = !0) : (r[e] = [], t = !0) : o && o.type === "time" ? r[e] !== l[e] && (r[e] = l[e], t = !0) : o && o.type === "custom" && typeof o.default == "number" && l[e] === "" ? (r[e] = o.default, t = !0) : r[e] !== l[e] && (r[e] = l[e], t = !0);
          }
        }), t && (n.value = r), R(l);
      }
    }, { immediate: !0, deep: !0 }), fe(() => {
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
      n.value = l, F.value = r;
      const t = Se();
      if (t) {
        f.value = t[c.quickSearchField] || "", Object.keys(t).forEach((o) => {
          if (o !== c.quickSearchField) {
            const s = c.searchConfig.formItems.find((d) => d.field === o);
            if (s && s.type === "checkbox" && !Array.isArray(t[o]))
              l[o] = t[o] ? [t[o]] : [];
            else if (s && s.type === "date" && t[o])
              if (typeof t[o] == "string" || typeof t[o] == "number") {
                const d = new Date(t[o]);
                l[o] = isNaN(d.getTime()) ? t[o] : d;
              } else
                l[o] = t[o];
            else
              s && s.type === "daterange" && t[o] ? Array.isArray(t[o]) ? l[o] = t[o].map((d) => {
                if (d instanceof Date)
                  return d;
                if (typeof d == "string" || typeof d == "number") {
                  const _ = new Date(d);
                  return isNaN(_.getTime()) ? d : _;
                }
                return d;
              }) : l[o] = [] : s && s.type === "numberrange" && t[o] ? Array.isArray(t[o]) ? l[o] = t[o] : l[o] = [null, null] : s && s.type === "timerange" && t[o] ? Array.isArray(t[o]) ? l[o] = t[o] : l[o] = [] : (s && s.type === "time" && t[o], l[o] = t[o]);
          }
        }), n.value = l;
        const e = {};
        f.value && (e[c.quickSearchField] = f.value), Object.assign(e, n.value), R(e), A("update:modelValue", e), A("search", e);
      }
      Ce();
    }), (l, r) => {
      const t = m("el-input"), e = m("el-button"), o = m("el-option"), s = m("el-select"), d = m("el-tree-select"), _ = m("el-radio"), Fe = m("el-radio-group"), Ie = m("el-checkbox"), Ue = m("el-checkbox-group"), ue = m("el-date-picker"), G = m("el-input-number"), ce = m("el-time-picker"), ie = m("el-form-item"), ke = m("el-col"), we = m("el-row"), $e = m("el-popover"), de = m("el-tag");
      return i(), S("div", je, [
        J("div", Re, [
          g(t, {
            modelValue: f.value,
            "onUpdate:modelValue": r[0] || (r[0] = (a) => f.value = a),
            placeholder: l.quickSearchPlaceholder,
            class: "quick-search-input",
            onKeyup: Ne(te, ["enter"])
          }, null, 8, ["modelValue", "placeholder"]),
          g(e, {
            type: "primary",
            icon: "Search",
            onClick: te,
            class: "search-button"
          }, {
            default: p(() => r[2] || (r[2] = [
              x(" 搜索 ", -1)
            ])),
            _: 1,
            __: [2]
          }),
          J("div", Ke, [
            Z.value ? (i(), v($e, {
              key: 0,
              visible: $.value,
              "onUpdate:visible": r[1] || (r[1] = (a) => $.value = a),
              placement: "bottom-end",
              width: ye.value,
              trigger: "click",
              "popper-class": "advanced-search-popover",
              teleported: !0,
              "hide-after": 0,
              persistent: !1,
              "show-arrow": !1
            }, {
              reference: p(() => [
                Z.value ? (i(), v(e, {
                  key: 0,
                  ref: "filterButtonRef",
                  onClick: xe,
                  icon: $.value ? "ArrowUp" : "ArrowDown",
                  class: "filter-button"
                }, {
                  default: p(() => [
                    x(C($.value ? "收起筛选" : "更多筛选"), 1)
                  ]),
                  _: 1
                }, 8, ["icon"])) : U("", !0)
              ]),
              default: p(() => [
                J("div", Be, [
                  g(De(Ee), {
                    ref_key: "advancedFormRef",
                    ref: he,
                    model: n.value,
                    "label-width": l.searchConfig.labelWidth || "100px",
                    inline: l.searchConfig.inline !== !1,
                    class: "advanced-form"
                  }, {
                    default: p(() => [
                      g(we, { gutter: 20 }, {
                        default: p(() => [
                          (i(!0), S(k, null, w(me.value, (a) => (i(), v(ke, {
                            key: a.field,
                            span: 24 / (l.searchConfig.itemsPerRow || 2),
                            class: "advanced-form-item-col"
                          }, {
                            default: p(() => [
                              g(ie, {
                                label: a.label,
                                prop: a.field,
                                class: "advanced-form-item"
                              }, {
                                default: p(() => [
                                  a.type === "input" || !a.type ? (i(), v(t, y({
                                    key: 0,
                                    modelValue: n.value[a.field],
                                    "onUpdate:modelValue": (u) => n.value[a.field] = u,
                                    placeholder: a.placeholder || `请输入${a.label}`,
                                    clearable: a.clearable !== !1,
                                    class: "form-item-input"
                                  }, { ref_for: !0 }, h(a, "input")), null, 16, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable"])) : a.type === "textarea" ? (i(), S("div", {
                                    key: 1,
                                    class: "textarea-container",
                                    "data-field": a.field
                                  }, [
                                    pe(g(t, y({
                                      modelValue: n.value[a.field],
                                      "onUpdate:modelValue": (u) => n.value[a.field] = u,
                                      placeholder: a.shortPlaceholder || a.placeholder || `请输入${a.label}`,
                                      clearable: a.clearable !== !1,
                                      class: "form-item-input",
                                      onFocus: (u) => be(a.field)
                                    }, { ref_for: !0 }, h(a, "input")), null, 16, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "onFocus"]), [
                                      [ve, !F.value[a.field]]
                                    ]),
                                    pe(g(t, y({
                                      modelValue: n.value[a.field],
                                      "onUpdate:modelValue": (u) => n.value[a.field] = u,
                                      placeholder: a.longPlaceholder || a.placeholder || `请输入${a.label}`,
                                      clearable: a.clearable !== !1,
                                      type: "textarea",
                                      autosize: { minRows: 2, maxRows: 4 },
                                      class: "form-item-textarea-overlay",
                                      teleported: !0,
                                      onBlur: () => {
                                        F.value[a.field] = !1;
                                      }
                                    }, { ref_for: !0 }, h(a, "input")), null, 16, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "onBlur"]), [
                                      [ve, F.value[a.field]]
                                    ])
                                  ], 8, We)) : a.type === "select" ? (i(), v(s, y({
                                    key: 2,
                                    modelValue: n.value[a.field],
                                    "onUpdate:modelValue": (u) => n.value[a.field] = u,
                                    placeholder: a.placeholder || `请选择${a.label}`,
                                    clearable: a.clearable !== !1,
                                    multiple: a.multiple,
                                    filterable: a.filterable,
                                    remote: a.remote,
                                    "remote-method": a.remote ? _e(a) : void 0,
                                    loading: E.value[a.field] || !1,
                                    class: "form-item-select",
                                    teleported: !1,
                                    "reserve-keyword": ""
                                  }, { ref_for: !0 }, h(a, "select")), {
                                    default: p(() => [
                                      (i(!0), S(k, null, w(ee(a), (u) => (i(), v(o, y({
                                        key: u.value,
                                        label: u.label,
                                        value: u.value
                                      }, { ref_for: !0 }, h(a, "option", u)), null, 16, ["label", "value"]))), 128))
                                    ]),
                                    _: 2
                                  }, 1040, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "multiple", "filterable", "remote", "remote-method", "loading"])) : a.type === "treeselect" ? (i(), v(d, y({
                                    key: 3,
                                    modelValue: n.value[a.field],
                                    "onUpdate:modelValue": (u) => n.value[a.field] = u,
                                    placeholder: a.placeholder || `请选择${a.label}`,
                                    clearable: a.clearable !== !1,
                                    multiple: a.multiple,
                                    data: ge(a),
                                    "node-key": a.nodeKey || "id",
                                    props: le(a),
                                    "show-checkbox": a.showCheckbox,
                                    filterable: a.filterable,
                                    teleported: !1,
                                    "popper-options": { placement: "bottom-start" },
                                    style: { "--el-tree-select-dropdown-max-height": (a.maxDropdownHeight || 300) + "px" },
                                    "render-after-expand": !1,
                                    loading: E.value[a.field] || !1
                                  }, { ref_for: !0 }, h(a, "treeSelect")), null, 16, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "multiple", "data", "node-key", "props", "show-checkbox", "filterable", "style", "loading"])) : a.type === "radio" ? (i(), v(Fe, y({
                                    key: 4,
                                    modelValue: n.value[a.field],
                                    "onUpdate:modelValue": (u) => n.value[a.field] = u,
                                    class: "form-item-radio"
                                  }, { ref_for: !0 }, h(a, "radioGroup")), {
                                    default: p(() => [
                                      (i(!0), S(k, null, w(a.options, (u) => (i(), v(_, y({
                                        key: u.value,
                                        value: u.value,
                                        class: "form-item-radio-option"
                                      }, { ref_for: !0 }, h(a, "radio", u)), {
                                        default: p(() => [
                                          x(C(u.label), 1)
                                        ]),
                                        _: 2
                                      }, 1040, ["value"]))), 128))
                                    ]),
                                    _: 2
                                  }, 1040, ["modelValue", "onUpdate:modelValue"])) : a.type === "checkbox" ? (i(), v(Ue, y({
                                    key: 5,
                                    modelValue: n.value[a.field],
                                    "onUpdate:modelValue": (u) => n.value[a.field] = u,
                                    class: "form-item-checkbox"
                                  }, { ref_for: !0 }, h(a, "checkboxGroup")), {
                                    default: p(() => [
                                      (i(!0), S(k, null, w(a.options, (u) => (i(), v(Ie, y({
                                        key: u.value,
                                        value: u.value,
                                        class: "form-item-checkbox-option"
                                      }, { ref_for: !0 }, h(a, "checkbox", u)), {
                                        default: p(() => [
                                          x(C(u.label), 1)
                                        ]),
                                        _: 2
                                      }, 1040, ["value"]))), 128))
                                    ]),
                                    _: 2
                                  }, 1040, ["modelValue", "onUpdate:modelValue"])) : a.type === "date" ? (i(), v(ue, y({
                                    key: 6,
                                    modelValue: n.value[a.field],
                                    "onUpdate:modelValue": (u) => n.value[a.field] = u,
                                    type: "date",
                                    placeholder: a.placeholder || `请选择${a.label}`,
                                    clearable: a.clearable !== !1,
                                    class: "form-item-date",
                                    teleported: !1
                                  }, { ref_for: !0 }, h(a, "datePicker")), null, 16, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable"])) : a.type === "daterange" ? (i(), v(ue, y({
                                    key: 7,
                                    modelValue: n.value[a.field],
                                    "onUpdate:modelValue": (u) => n.value[a.field] = u,
                                    type: "daterange",
                                    "start-placeholder": a.startPlaceholder || "开始日期",
                                    "end-placeholder": a.endPlaceholder || "结束日期",
                                    clearable: a.clearable !== !1,
                                    class: "form-item-daterange",
                                    teleported: !1,
                                    "range-separator": "至"
                                  }, { ref_for: !0 }, h(a, "datePicker")), null, 16, ["modelValue", "onUpdate:modelValue", "start-placeholder", "end-placeholder", "clearable"])) : a.type === "number" ? (i(), v(G, y({
                                    key: 8,
                                    modelValue: n.value[a.field],
                                    "onUpdate:modelValue": (u) => n.value[a.field] = u,
                                    min: a.min,
                                    max: a.max,
                                    placeholder: a.placeholder || `请输入${a.label}`,
                                    "controls-position": a.controlsPosition || "right",
                                    class: "form-item-number"
                                  }, { ref_for: !0 }, h(a, "inputNumber")), null, 16, ["modelValue", "onUpdate:modelValue", "min", "max", "placeholder", "controls-position"])) : a.type === "numberrange" ? (i(), S("div", Je, [
                                    g(G, y({
                                      "model-value": Q(a.field, 0),
                                      min: a.min,
                                      max: a.max,
                                      placeholder: a.minPlaceholder || "最小值",
                                      "controls-position": a.controlsPosition || "right",
                                      class: "form-item-number",
                                      "onUpdate:modelValue": (u) => X(a.field, 0, u ?? null)
                                    }, { ref_for: !0 }, h(a, "inputNumber")), null, 16, ["model-value", "min", "max", "placeholder", "controls-position", "onUpdate:modelValue"]),
                                    r[3] || (r[3] = J("span", { class: "range-separator" }, "-", -1)),
                                    g(G, y({
                                      "model-value": Q(a.field, 1),
                                      min: a.min,
                                      max: a.max,
                                      placeholder: a.maxPlaceholder || "最大值",
                                      "controls-position": a.controlsPosition || "right",
                                      class: "form-item-number",
                                      "onUpdate:modelValue": (u) => X(a.field, 1, u ?? null)
                                    }, { ref_for: !0 }, h(a, "inputNumber")), null, 16, ["model-value", "min", "max", "placeholder", "controls-position", "onUpdate:modelValue"])
                                  ])) : a.type === "time" ? (i(), v(ce, y({
                                    key: 10,
                                    modelValue: n.value[a.field],
                                    "onUpdate:modelValue": (u) => n.value[a.field] = u,
                                    placeholder: a.placeholder || `请选择${a.label}`,
                                    clearable: a.clearable !== !1,
                                    format: a.format,
                                    class: "form-item-time",
                                    teleported: !1
                                  }, { ref_for: !0 }, h(a, "timePicker")), null, 16, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "format"])) : a.type === "timerange" ? (i(), v(ce, y({
                                    key: 11,
                                    modelValue: n.value[a.field],
                                    "onUpdate:modelValue": (u) => n.value[a.field] = u,
                                    "is-range": "",
                                    "start-placeholder": a.startPlaceholder || "开始时间",
                                    "end-placeholder": a.endPlaceholder || "结束时间",
                                    clearable: a.clearable !== !1,
                                    format: a.format,
                                    class: "form-item-timerange",
                                    teleported: !1,
                                    "range-separator": "至"
                                  }, { ref_for: !0 }, h(a, "timePicker")), null, 16, ["modelValue", "onUpdate:modelValue", "start-placeholder", "end-placeholder", "clearable", "format"])) : a.type === "custom" ? H(l.$slots, a.slotName || a.field, {
                                    key: 12,
                                    model: n.value,
                                    field: a.field
                                  }, void 0, !0) : U("", !0)
                                ]),
                                _: 2
                              }, 1032, ["label", "prop"])
                            ]),
                            _: 2
                          }, 1032, ["span"]))), 128))
                        ]),
                        _: 3
                      }),
                      g(ie, {
                        class: "advanced-form-actions",
                        "label-width": l.searchConfig.labelWidth || "100px",
                        label: " "
                      }, {
                        default: p(() => [
                          g(e, {
                            type: "primary",
                            icon: "Search",
                            onClick: oe
                          }, {
                            default: p(() => r[4] || (r[4] = [
                              x(" 搜索 ", -1)
                            ])),
                            _: 1,
                            __: [4]
                          }),
                          g(e, {
                            onClick: ne,
                            icon: "Refresh"
                          }, {
                            default: p(() => r[5] || (r[5] = [
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
            }, 8, ["visible", "width"])) : U("", !0)
          ])
        ]),
        H(l.$slots, "search-tags", {
          tags: b.value,
          removeTag: K,
          clearAll: B
        }, () => [
          b.value.length > 0 && !Y.value ? (i(), S("div", Me, [
            (i(!0), S(k, null, w(b.value, (a) => (i(), v(de, {
              key: a.key,
              closable: "",
              onClose: (u) => K(a.key),
              class: "search-tag"
            }, {
              default: p(() => [
                x(C(a.label) + ": " + C(se(a)), 1)
              ]),
              _: 2
            }, 1032, ["onClose"]))), 128)),
            g(e, {
              type: "primary",
              link: "",
              onClick: B,
              class: "clear-all-tags"
            }, {
              default: p(() => r[6] || (r[6] = [
                x(" 清除所有 ", -1)
              ])),
              _: 1,
              __: [6]
            })
          ])) : U("", !0)
        ], !0),
        Y.value ? (i(), v(qe, {
          key: 0,
          to: c.teleportTo
        }, [
          H(l.$slots, "teleported-search-tags", {
            tags: b.value,
            removeTag: K,
            clearAll: B
          }, () => [
            b.value.length > 0 ? (i(), S("div", Le, [
              (i(!0), S(k, null, w(b.value, (a) => (i(), v(de, {
                key: a.key,
                closable: "",
                onClose: (u) => K(a.key),
                class: "search-tag"
              }, {
                default: p(() => [
                  x(C(a.label) + ": " + C(se(a)), 1)
                ]),
                _: 2
              }, 1032, ["onClose"]))), 128)),
              g(e, {
                type: "primary",
                link: "",
                onClick: B,
                class: "clear-all-tags"
              }, {
                default: p(() => r[7] || (r[7] = [
                  x(" 清除所有 ", -1)
                ])),
                _: 1,
                __: [7]
              })
            ])) : U("", !0)
          ], !0)
        ], 8, ["to"])) : U("", !0)
      ]);
    };
  }
});
const ze = (q, M) => {
  const V = q.__vccOpts || q;
  for (const [c, A] of M)
    V[c] = A;
  return V;
}, Xe = /* @__PURE__ */ ze(Ge, [["__scopeId", "data-v-555cd158"]]);
export {
  Xe as ElementAdvancedSearch,
  Xe as default
};
