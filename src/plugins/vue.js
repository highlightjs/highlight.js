function hasValueOrEmptyAttribute(value) {
  return Boolean(value || value === "");
}

export const Component = {
  props: ["language", "code", "ignore_illegals", "auto"],
  data: function() {
    return {
      detectedLanguage: ""
    };
  },
  computed: {
    className() {
      return "hljs " + this.detectedLanguage;
    },
    highlighted() {
      if (!this.autoDetect && !hljs.getLanguage(this.language)) return;

      let result;
      if (this.autoDetect) {
        result = hljs.highlightAuto(this.code);
        this.detectedLanguage = result.language;
      } else {
        result = hljs.highlight(this.language, this.code, this.ignoreIllegals);
        this.detectectLanguage = this.language;
      }
      return result.value;
    },
    autoDetect() {
      return !this.language || hasValueOrEmptyAttribute(this.auto);
    },
    ignoreIllegals() {
      return !hasValueOrEmptyAttribute(this.ignore_illegals);
    }
  },
  render(createElement) {
    return createElement("pre", {}, [
      createElement("code", {
        class: this.className,
        domProps: { innerHTML: this.highlighted }})
    ]);
  }
  // template: `<pre><code :class="className" v-html="highlighted"><slot></slot></code></pre>`
};

export const VuePlugin = {
  install(Vue, options) {
    Vue.component('highlightjs', Component);
  }
};
