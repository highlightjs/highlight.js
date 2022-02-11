## Subresource Integrity

If you are loading Highlight.js via CDN you may wish to use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to guarantee that you are using a legimitate build of the library.

To do this you simply need to add the `integrity` attribute for each JavaScript file you download via CDN. These digests are used by the browser to confirm the files downloaded have not been modified.

```html
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/<!-- $VERSION -->/highlight.min.js"
  integrity="<!-- $MIN_JS_DIGEST -->"></script>
<!-- including any other grammars you might need to load -->
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/<!-- $VERSION -->/languages/go.min.js"
  integrity="<!-- $GO_SHA -->"></script>
```

The full list of digests for every file can be found below.

### Digests

```
<!-- $DIGEST_LIST -->
```
