import { defineComponent as Ve, ref as A, watch as ee, nextTick as B, computed as D, onMounted as ke, resolveComponent as v, openBlock as c, createElementBlock as _, createElementVNode as N, createVNode as h, withKeys as Ce, withCtx as f, createTextVNode as S, createBlock as m, toDisplayString as I, createCommentVNode as O, unref as Fe, Fragment as w, renderList as U, withDirectives as le, vShow as ae, normalizeStyle as Ie, renderSlot as we } from "vue";
import { ElForm as Ue } from "element-plus";
const Te = { class: "advanced-search" }, Pe = { class: "main-search-bar" }, $e = { class: "filter-button-wrapper" }, qe = { class: "advanced-search-form-popover" }, De = ["data-field"], Ne = {
  key: 9,
  class: "numberrange-container"
}, Oe = {
  key: 0,
  class: "search-tags"
}, Re = /* @__PURE__ */ Ve({
  __name: "index",
  props: {
    searchConfig: {},
    quickSearchField: { default: "keyword" },
    quickSearchPlaceholder: { default: "请输入搜索关键词" },
    modelValue: { default: () => ({}) },
    cacheKey: { default: "" }
  },
  emits: ["search", "update:modelValue"],
  setup(T, { emit: R }) {
    let b = null;
    const u = T, y = R, oe = A(null), C = A(!1), i = A(""), n = A({}), g = A([]), V = A({}), x = A({}), P = A({}), J = (e, a) => {
      const l = n.value[e];
      return Array.isArray(l) && l.length > a ? l[a] : null;
    }, M = (e, a, l) => {
      Array.isArray(n.value[e]) || (n.value[e] = [null, null]), n.value[e][a] = l;
    };
    ee(() => x.value, () => {
      g.value.length > 0 && g.value.some((a) => {
        const l = u.searchConfig.formItems.find((t) => t.field === a.key);
        return l && (l.type === "select" || l.type === "treeselect") && (l.remote || l.loadOptions);
      }) && (b && clearTimeout(b), b = window.setTimeout(() => {
        B(() => {
          H();
        });
      }, 100));
    }, { deep: !0 });
    const W = D(() => u.searchConfig.formItems.length > 1), re = D(() => u.searchConfig.formItems.filter((e) => !e.hidden)), te = D(() => u.searchConfig.popoverWidth || 800), k = D(() => u.cacheKey ? `advancedSearch@${u.cacheKey}` : ""), ne = (e) => {
      V.value[e] = !0, B(() => {
        const a = document.querySelector(`[data-field=${e}] .form-item-textarea-overlay textarea`);
        a && a.focus();
      });
    }, L = (e) => {
      if (e.type === "select" || e.type === "treeselect") {
        const a = e;
        return a.remote && x.value[e.field] ? x.value[e.field] : a.options || [];
      }
      return [];
    }, se = (e) => L(e), ue = (e) => {
      if (e.type !== "select" && e.type !== "treeselect")
        return;
      const a = e;
      return async (l) => {
        if (a.remoteMethod) {
          P.value[e.field] = !0;
          try {
            const t = await a.remoteMethod(l);
            x.value[e.field] = t;
          } catch (t) {
            console.error(`Failed to load remote options for ${e.field}:`, t);
          } finally {
            P.value[e.field] = !1;
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
          const a = JSON.parse(e), l = Date.now(), t = 24 * 60 * 60 * 1e3;
          return l - a.timestamp > t ? (E(), null) : a.searchParams || null;
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
      i.value && (e[u.quickSearchField] = i.value), Object.assign(e, n.value);
      const a = g.value, l = [];
      i.value && l.push({
        key: u.quickSearchField,
        label: "关键词",
        value: i.value
      });
      for (const t of u.searchConfig.formItems) {
        const r = e[t.field];
        r != null && r !== "" && !(Array.isArray(r) && r.length === 0) && (t.type === "numberrange" ? Array.isArray(r) && (r[0] !== null || r[1] !== null) && l.push({
          key: t.field,
          label: t.label,
          value: r
        }) : t.type === "daterange" ? Array.isArray(r) && r.length === 2 && (r[0] !== null || r[1] !== null) && l.push({
          key: t.field,
          label: t.label,
          value: r
        }) : t.field !== u.quickSearchField && l.push({
          key: t.field,
          label: t.label,
          value: r
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
      i.value && (e[u.quickSearchField] = i.value), Object.assign(e, n.value), $(e), z(e), y("update:modelValue", e), y("search", e);
    }, G = () => {
      const e = {};
      i.value && (e[u.quickSearchField] = i.value), Object.assign(e, n.value), $(e), z(e), fe(), y("update:modelValue", e), y("search", e);
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
          const t = l;
          n.value[l.field] = t.multiple ? [] : "";
        } else if (l.type === "select") {
          const t = l;
          n.value[l.field] = t.multiple ? [] : "";
        } else
          l.type === "textarea" ? (n.value[l.field] = l.default ?? "", e[l.field] = !1) : l.type === "number" ? n.value[l.field] = l.default ?? null : n.value[l.field] = l.default ?? "";
      V.value = e, g.value = [], E();
      const a = {};
      i.value && (a[u.quickSearchField] = i.value), y("update:modelValue", a), y("search", a);
    }, $ = (e) => {
      const a = [];
      i.value && a.push({
        key: u.quickSearchField,
        label: "关键词",
        value: i.value
      });
      for (const l of u.searchConfig.formItems) {
        const t = e[l.field];
        t != null && t !== "" && !(Array.isArray(t) && t.length === 0) && (l.type === "numberrange" ? Array.isArray(t) && (t[0] !== null || t[1] !== null) && a.push({
          key: l.field,
          label: l.label,
          value: t
        }) : l.type === "daterange" ? Array.isArray(t) && t.length === 2 && (t[0] !== null || t[1] !== null) && a.push({
          key: l.field,
          label: l.label,
          value: t
        }) : l.field !== u.quickSearchField && a.push({
          key: l.field,
          label: l.label,
          value: t
        }));
      }
      g.value = a;
    }, pe = (e) => {
      const a = u.searchConfig.formItems.find((l) => l.field === e.key);
      if (a && a.displayValue)
        return a.displayValue(e.value, n.value);
      if (a && (a.type === "select" || a.type === "treeselect") && (a.options || x.value[a.field])) {
        const l = a, t = l.remote ? x.value[a.field] : l.options, r = a.type === "treeselect" && a.nodeKey || "value";
        if (Array.isArray(e.value))
          return e.value.map((d) => {
            const p = j(t || [], d, r);
            return p ? p.label : d;
          }).join(", ");
        {
          const d = j(t || [], e.value, r);
          return d ? d.label : e.value;
        }
      }
      if (a && (a.type === "radio" || a.type === "checkbox") && a.options) {
        if (Array.isArray(e.value))
          return e.value.map((l) => {
            var r;
            const t = (r = a.options) == null ? void 0 : r.find((d) => d.value === l);
            return t ? t.label : l;
          }).join(", ");
        {
          const l = a.options.find((t) => t.value === e.value);
          return l ? l.label : e.value;
        }
      }
      if (a && a.type === "daterange" && Array.isArray(e.value)) {
        if (e.value.length === 2) {
          const [l, t] = e.value;
          if (l !== null && t !== null)
            return `${F(l)} ~ ${F(t)}`;
          if (l !== null)
            return `≥ ${F(l)}`;
          if (t !== null)
            return `≤ ${F(t)}`;
        }
        return "";
      }
      if (a && a.type === "date")
        return e.value ? F(e.value) : "";
      if (a && a.type === "numberrange" && Array.isArray(e.value)) {
        const [l, t] = e.value;
        return l !== null && t !== null ? `${l} - ${t}` : l !== null ? `≥ ${l}` : t !== null ? `≤ ${t}` : "";
      }
      return e.value;
    }, F = (e) => {
      if (e instanceof Date)
        return e.toLocaleDateString();
      if (typeof e == "string" || typeof e == "number") {
        const a = new Date(e);
        return isNaN(a.getTime()) ? String(e) : a.toLocaleDateString();
      }
      return String(e);
    }, j = (e, a, l) => {
      for (const t of e) {
        if (t[l] === a)
          return t;
        if (t.children && t.children.length > 0) {
          const r = j(t.children, a, l);
          if (r)
            return r;
        }
      }
      return null;
    }, ve = (e) => {
      if (e === u.quickSearchField)
        i.value = "";
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
            a.type === "number" ? n.value[e] = null : n.value[e] = "";
        else
          n.value[e] = "";
      }
      G();
    }, me = () => {
      i.value = "", X();
    }, he = async () => {
      for (const e of u.searchConfig.formItems)
        if ((e.type === "select" || e.type === "treeselect") && e.loadOptions) {
          const a = e;
          try {
            const l = await a.loadOptions();
            x.value[e.field] = l, g.value.length > 0 && (b && clearTimeout(b), b = window.setTimeout(() => {
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
      e && (i.value = e[u.quickSearchField] || "", Object.keys(e).forEach((a) => {
        if (a !== u.quickSearchField) {
          const l = u.searchConfig.formItems.find((t) => t.field === a);
          l && l.type === "checkbox" && !Array.isArray(e[a]) ? n.value[a] = e[a] ? [e[a]] : [] : l && l.type === "daterange" && e[a] ? Array.isArray(e[a]) ? n.value[a] = e[a].map((t) => {
            if (t instanceof Date)
              return t;
            if (typeof t == "string" || typeof t == "number") {
              const r = new Date(t);
              return isNaN(r.getTime()) ? t : r;
            }
            return t;
          }) : n.value[a] = [] : l && l.type === "numberrange" && e[a] ? Array.isArray(e[a]) ? n.value[a] = e[a] : n.value[a] = [null, null] : l && l.type === "number" && (e[a] === "" || e[a] === void 0) ? n.value[a] = null : n.value[a] = e[a];
        }
      }), $(e));
    }, { immediate: !0 }), ke(() => {
      const e = {}, a = {};
      for (const r of u.searchConfig.formItems)
        if (r.type === "custom")
          e[r.field] = r.default !== void 0 ? r.default : "";
        else if (r.type === "checkbox")
          e[r.field] = Array.isArray(r.default) ? r.default : [];
        else if (r.type === "treeselect") {
          const d = r;
          e[r.field] = d.multiple ? Array.isArray(r.default) ? r.default : [] : r.default ?? "";
        } else if (r.type === "select") {
          const d = r;
          e[r.field] = d.multiple ? Array.isArray(r.default) ? r.default : [] : r.default ?? "";
        } else
          r.type === "daterange" ? e[r.field] = Array.isArray(r.default) ? r.default : [] : r.type === "numberrange" ? e[r.field] = Array.isArray(r.default) ? r.default : [null, null] : r.type === "textarea" ? (e[r.field] = r.default ?? "", a[r.field] = !1) : r.type === "number" ? e[r.field] = r.default ?? null : e[r.field] = r.default ?? "";
      n.value = e, V.value = a;
      const l = ce();
      l && (i.value = l[u.quickSearchField] || "", Object.keys(l).forEach((r) => {
        if (r !== u.quickSearchField) {
          const d = u.searchConfig.formItems.find((p) => p.field === r);
          if (d && d.type === "checkbox" && !Array.isArray(l[r]))
            e[r] = l[r] ? [l[r]] : [];
          else if (d && d.type === "date" && l[r])
            if (typeof l[r] == "string" || typeof l[r] == "number") {
              const p = new Date(l[r]);
              e[r] = isNaN(p.getTime()) ? l[r] : p;
            } else
              e[r] = l[r];
          else
            d && d.type === "daterange" && l[r] ? Array.isArray(l[r]) ? e[r] = l[r].map((p) => {
              if (p instanceof Date)
                return p;
              if (typeof p == "string" || typeof p == "number") {
                const q = new Date(p);
                return isNaN(q.getTime()) ? p : q;
              }
              return p;
            }) : e[r] = [] : d && d.type === "numberrange" && l[r] ? Array.isArray(l[r]) ? e[r] = l[r] : e[r] = [null, null] : e[r] = l[r];
        }
      })), n.value = e;
      const t = {};
      i.value && (t[u.quickSearchField] = i.value), Object.assign(t, n.value), $(t), l && (y("update:modelValue", t), y("search", t)), he();
    }), (e, a) => {
      const l = v("el-input"), t = v("el-button"), r = v("el-option"), d = v("el-select"), p = v("el-tree-select"), q = v("el-radio"), ye = v("el-radio-group"), be = v("el-checkbox"), ge = v("el-checkbox-group"), Y = v("el-date-picker"), K = v("el-input-number"), Z = v("el-form-item"), _e = v("el-col"), Ae = v("el-row"), Se = v("el-popover"), xe = v("el-tag");
      return c(), _("div", Te, [
        N("div", Pe, [
          h(l, {
            modelValue: i.value,
            "onUpdate:modelValue": a[0] || (a[0] = (o) => i.value = o),
            placeholder: e.quickSearchPlaceholder,
            class: "quick-search-input",
            onKeyup: Ce(Q, ["enter"])
          }, null, 8, ["modelValue", "placeholder"]),
          h(t, {
            type: "primary",
            icon: "Search",
            onClick: Q,
            class: "search-button"
          }, {
            default: f(() => a[2] || (a[2] = [
              S(" 搜索 ", -1)
            ])),
            _: 1,
            __: [2]
          }),
          N("div", $e, [
            W.value ? (c(), m(Se, {
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
                W.value ? (c(), m(t, {
                  key: 0,
                  ref: "filterButtonRef",
                  onClick: ie,
                  icon: C.value ? "ArrowUp" : "ArrowDown",
                  class: "filter-button"
                }, {
                  default: f(() => [
                    S(I(C.value ? "收起筛选" : "更多筛选"), 1)
                  ]),
                  _: 1
                }, 8, ["icon"])) : O("", !0)
              ]),
              default: f(() => [
                N("div", qe, [
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
                          (c(!0), _(w, null, U(re.value, (o) => (c(), m(_e, {
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
                                  o.type === "input" || !o.type ? (c(), m(l, {
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
                                  ], 8, De)) : o.type === "select" ? (c(), m(d, {
                                    key: 2,
                                    modelValue: n.value[o.field],
                                    "onUpdate:modelValue": (s) => n.value[o.field] = s,
                                    placeholder: o.placeholder || `请选择${o.label}`,
                                    clearable: o.clearable !== !1,
                                    multiple: o.multiple,
                                    filterable: o.filterable,
                                    remote: o.remote,
                                    "remote-method": o.remote ? ue(o) : void 0,
                                    loading: P.value[o.field] || !1,
                                    class: "form-item-select",
                                    teleported: !1,
                                    "reserve-keyword": ""
                                  }, {
                                    default: f(() => [
                                      (c(!0), _(w, null, U(L(o), (s) => (c(), m(r, {
                                        key: s.value,
                                        label: s.label,
                                        value: s.value
                                      }, null, 8, ["label", "value"]))), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "multiple", "filterable", "remote", "remote-method", "loading"])) : o.type === "treeselect" ? (c(), m(p, {
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
                                    loading: P.value[o.field] || !1
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "multiple", "data", "node-key", "props", "show-checkbox", "filterable", "style", "loading"])) : o.type === "radio" ? (c(), m(ye, {
                                    key: 4,
                                    modelValue: n.value[o.field],
                                    "onUpdate:modelValue": (s) => n.value[o.field] = s,
                                    class: "form-item-radio"
                                  }, {
                                    default: f(() => [
                                      (c(!0), _(w, null, U(o.options, (s) => (c(), m(q, {
                                        key: s.value,
                                        value: s.value,
                                        class: "form-item-radio-option"
                                      }, {
                                        default: f(() => [
                                          S(I(s.label), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]))), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["modelValue", "onUpdate:modelValue"])) : o.type === "checkbox" ? (c(), m(ge, {
                                    key: 5,
                                    modelValue: n.value[o.field],
                                    "onUpdate:modelValue": (s) => n.value[o.field] = s,
                                    class: "form-item-checkbox"
                                  }, {
                                    default: f(() => [
                                      (c(!0), _(w, null, U(o.options, (s) => (c(), m(be, {
                                        key: s.value,
                                        value: s.value,
                                        class: "form-item-checkbox-option"
                                      }, {
                                        default: f(() => [
                                          S(I(s.label), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]))), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["modelValue", "onUpdate:modelValue"])) : o.type === "date" ? (c(), m(Y, {
                                    key: 6,
                                    modelValue: n.value[o.field],
                                    "onUpdate:modelValue": (s) => n.value[o.field] = s,
                                    type: "date",
                                    placeholder: o.placeholder || `请选择${o.label}`,
                                    clearable: o.clearable !== !1,
                                    class: "form-item-date",
                                    teleported: !1
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable"])) : o.type === "daterange" ? (c(), m(Y, {
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
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "start-placeholder", "end-placeholder", "clearable"])) : o.type === "number" ? (c(), m(K, {
                                    key: 8,
                                    modelValue: n.value[o.field],
                                    "onUpdate:modelValue": (s) => n.value[o.field] = s,
                                    min: o.min,
                                    max: o.max,
                                    placeholder: o.placeholder || `请输入${o.label}`,
                                    "controls-position": o.controlsPosition || "right",
                                    class: "form-item-number"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max", "placeholder", "controls-position"])) : o.type === "numberrange" ? (c(), _("div", Ne, [
                                    h(K, {
                                      "model-value": J(o.field, 0),
                                      min: o.min,
                                      max: o.max,
                                      placeholder: o.minPlaceholder || "最小值",
                                      "controls-position": o.controlsPosition || "right",
                                      class: "form-item-number",
                                      "onUpdate:modelValue": (s) => M(o.field, 0, s ?? null)
                                    }, null, 8, ["model-value", "min", "max", "placeholder", "controls-position", "onUpdate:modelValue"]),
                                    a[3] || (a[3] = N("span", { class: "range-separator" }, "-", -1)),
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
                                  }, void 0, !0) : O("", !0)
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
                          h(t, {
                            type: "primary",
                            icon: "Search",
                            onClick: G
                          }, {
                            default: f(() => a[4] || (a[4] = [
                              S(" 搜索 ", -1)
                            ])),
                            _: 1,
                            __: [4]
                          }),
                          h(t, {
                            onClick: X,
                            icon: "Refresh"
                          }, {
                            default: f(() => a[5] || (a[5] = [
                              S(" 重置 ", -1)
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
            }, 8, ["visible", "width"])) : O("", !0)
          ])
        ]),
        g.value.length > 0 ? (c(), _("div", Oe, [
          (c(!0), _(w, null, U(g.value, (o) => (c(), m(xe, {
            key: o.key,
            closable: "",
            onClose: (s) => ve(o.key),
            class: "search-tag"
          }, {
            default: f(() => [
              S(I(o.label) + ": " + I(pe(o)), 1)
            ]),
            _: 2
          }, 1032, ["onClose"]))), 128)),
          h(t, {
            type: "primary",
            link: "",
            onClick: me,
            class: "clear-all-tags"
          }, {
            default: f(() => a[6] || (a[6] = [
              S(" 清除所有 ", -1)
            ])),
            _: 1,
            __: [6]
          })
        ])) : O("", !0)
      ]);
    };
  }
});
const Ee = (T, R) => {
  const b = T.__vccOpts || T;
  for (const [u, y] of R)
    b[u] = y;
  return b;
}, Be = /* @__PURE__ */ Ee(Re, [["__scopeId", "data-v-31329598"]]);
export {
  Be as ElementAdvancedSearch,
  Be as default
};
