$(document).ready(function() {
  $('#autotest div').each(function(i, div) {
    div = $(div);
    if (hljs.getLanguage(div.attr('class'))) {
      div.show();
    }
    var language = div.find('code').get(0).result.language;
    if (!div.hasClass(language)) {
      div.addClass('fail');
    }
  });
});
