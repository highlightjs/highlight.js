function hasValueOrEmptyAttribute(value) {
  return Boolean(value || value === "");
}

export const Component = {
  props: ["language", "code", "auto"],
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
      return true;
      // return !hasValueOrEmptyAttribute(this.ignore_illegals);
    }
  },
  // this is on purpose because eventually someone is going to ask us to make
  // the tags configurable (in which case I think we're forced to render?) and
  // it also avoids needing to use to a whole Vue complication pipline just
  // to build Highlight.js
  render(createElement) {
    return createElement("pre", {}, [
      createElement("code", {
        class: this.className,
        domProps: { innerHTML: this.highlighted }})
    ]);
  }
  // template: `<pre><code :class="className" v-html="highlighted"></code></pre>`
};

export const VuePlugin = {
  install(Vue) {
    Vue.component('highlightjs', Component);
  }
};
