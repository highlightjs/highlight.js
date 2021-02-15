describe('special cases tests', async () => {
  await import('./explicitLanguage.js');
  await import('./customMarkup.js');
  await import('./languageAlias.js');
  await import('./noHighlight.js');
  await import('./subLanguages.js');
  await import('./buildClassName.js');
  await import('./useBr.js');
  await import('./endsWithParentVariants.js')
});
