## Version 8.0

With the newest version of highlight.js, we will be prefixing all
classes located in [classref.txt][cr] with `hljs-`, by default, because
some class names would collide with other people's stylesheets. If you
were using an older version, you might still want the previous behavior,
but still want to upgrade. To suppress this new behavior, you would
initialize like so:

```html
<script type="text/javascript">
  hljs.classPrefix = '';

  hljs.initHighlightingOnLoad();
</script>
```
[cr]: http://github.com/isagalaev/highlight.js/blob/master/classref.txt
