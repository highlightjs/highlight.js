# AI-assisted contributions

AI tools (chat assistants, coding agents, autocomplete, etc.) are welcome.
They are tools. You are still the author.

## Expectations

1. **Human in the loop.** Read and review everything the tool produced before
   you ask maintainers to review it. Do not open PRs, issues, or review
   comments that are unexamined machine output.

2. **You own the change.** You must understand what you submitted well enough
   to explain it and answer questions in review. If you cannot defend a line,
   do not ship it.

3. **No slop.** Unverified, low-quality, or drive-by bulk output wastes
   scarce maintainer time and is not an acceptable contribution. Prefer small,
   focused changes that are worth more to the project than they cost to review.

4. **Same bar as any other PR.** Tests, style, scope, and our usual
   contributing guidelines still apply. Tooling does not lower the bar.

5. **Transparency (encouraged).** If a contribution was substantially
   tool-assisted, say so in the PR description or a commit trailer.
   Prefer model, effort/reasoning level, and context window when known:

   ```text
   Assisted-by: <model> (<effort>) [<context>]
   ```

   Examples:

   ```text
   Assisted-by: Grok 4.5 (low) [512k]
   Assisted-by: Claude Sonnet 4 (high) [200k]
   Assisted-by: Copilot
   ```

   A bare tool name is fine when the rest is unknown.

## Not allowed

- Unattended bots that open or update PRs, issues, or review comments without
  a human approving each action.
- Using AI to “claim” [good first issue](https://github.com/highlightjs/highlight.js/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
  work end-to-end without learning the codebase. Those issues exist so people
  can grow; fully automating them skips the point.

## License and copyright

You are responsible for ensuring you have the right to contribute the material
under this project’s license. Regenerating copyrighted material with a tool
does not make it free to relicense. Do not submit content you are not allowed
to contribute.

## Credits

This policy is adapted from the
[LLVM AI Tool Use Policy](https://llvm.org/docs/AIToolPolicy.html) and the
[Fedora Project Policy on AI-Assisted Contributions](https://communityblog.fedoraproject.org/council-policy-proposal-policy-on-ai-assisted-contributions/)
(portions of which are available under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)).
