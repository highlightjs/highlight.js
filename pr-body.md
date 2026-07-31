## Summary

When `highlightElement` is called on already-highlighted code (e.g., consecutive `hljs.highlightAll()` calls), the existing `<span class="hljs-*">` tags from the previous highlighting are incorrectly flagged as "unescaped HTML" - a false positive security warning.

## Fix

This fix checks for the `data-highlighted` attribute early and silently skips re-highlighting, matching the proposed solution in issue #3761.

## Test

The fix prevents the false warning when calling `hljs.highlightAll()` multiple times on the same code blocks.

Fixes #3761