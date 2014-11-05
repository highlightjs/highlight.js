function initHighlighting(div) {
  var code = div.find('code');
  if (code.hasClass('hljs')) {
    return;
  }
  code = code.get(0);
  hljs.highlightBlock(code);
  if (!div.hasClass(code.result.language)) {
    div.addClass('fail');
  }
}

$(document).ready(function() {

  var categories = {};
  $('#languages div').each(function(i, div) {
    var category_str = $(div).data('category');
    if (category_str) {
      category_str.split(' ').forEach(function(c) {
        categories[c] = true;
      });
    }
  });
  var ul = $('#categories');
  Object.keys(categories).forEach(function(c) {
    ul.append('<li><a href="#">' + c + '</a></li>');
  });
  $('#categories li a').click(function(e) {
    e.preventDefault();
    var category = $(this).text();
    $('#languages div').each(function(i, div) {
      div = $(div);
      var category_str = div.data('category');
      if (category_str && category_str.split(' ').indexOf(category) != -1) {
        initHighlighting(div);
        div.show();
      } else {
        div.hide();
      }
    });
  })
});
