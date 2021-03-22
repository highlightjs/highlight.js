// @ts-nocheck
import { escapeHTML } from "../lib/utils.js";

function hasValueOrEmptyAttribute(value) {
  return Boolean(value || value === "");
}

export default function BuildVuePlugin(hljs) {
  const Component = {
    props: ["language", "code", "autodetect"],
    data: function() {
      return {
        detectedLanguage: "",
        unknownLanguage: false
      };
    },
    computed: {
      className() {
        if (this.unknownLanguage) return "";

        return "hljs " + this.detectedLanguage;
      },
      highlighted() {
        // no idea what language to use, return raw code
        if (!this.autoDetect && !hljs.getLanguage(this.language)) {
          console.warn(`The language "${this.language}" you specified could not be found.`);
          this.unknownLanguage = true;
          return escapeHTML(this.code);
        }

        let result = {};
        if (this.autoDetect) {
          result = hljs.highlightAuto(this.code);
          this.detectedLanguage = result.language;
        } else {
          result = hljs.highlight(this.language, this.code, this.ignoreIllegals);
          this.detectedLanguage = this.language;
        }
        return result.value;
      },
      autoDetect() {
        return !this.language || hasValueOrEmptyAttribute(this.autodetect);
      },
      ignoreIllegals() {
        return true;
      }
    },
    // this avoids needing to use a whole Vue compilation pipeline just
    // to build Highlight.js
    render(createElement) {
      return createElement("pre", {}, [
        createElement("code", {
          class: this.className,
          domProps: { innerHTML: this.highlighted }
        })
      ]);
    }
    // template: `<pre><code :class="className" v-html="highlighted"></code></pre>`
  };

  const VuePlugin = {
    install(Vue) {
      Vue.component('highlightjs', Component);
    },
    component: Component
  };

  return VuePlugin;
}
