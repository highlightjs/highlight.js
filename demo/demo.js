function highlightDiv(div) {
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

function selectCategory(category) {
  $('#languages div').each(function(i, div) {
    div = $(div);
    var category_str = div.data('category');
    if (category_str.split(' ').indexOf(category) != -1) {
      highlightDiv(div);
      div.show();
    } else {
      div.hide();
    }
  });
}

function initCategories() {
  var categories = {};
  $('#languages div').each(function(i, div) {
    var category_str = $(div).data('category');
    if (!category_str) {
      category_str = 'other';
      $(div).data('category', category_str);
    }
    category_str.split(' ').forEach(function(c) {
      categories[c] = (categories[c] || 0) + 1;
    });
  });
  var ul = $('#categories');
  Object.keys(categories).forEach(function(c) {
    ul.append('<li><a href="#" data-category="' + c + '">' + c + ' (' + categories[c] +')</a></li>');
  });
  $('#categories li a').click(function(e) {
    e.preventDefault();
    var category = $(this).data('category');
    selectCategory(category);
  });
}

function selectStyle(style) {
  $('link[title]').each(function(i, link) {
    link.disabled = (link.title != style);
  });
  ['color', 'background-color'].forEach(function(value) {
    $('#languages').css(value, $('#languages pre code').css(value));
  });
}

function initStyleSwitcher() {
  var ul = $('#styles');
  $('link[title]').each(function(i, link) {
    ul.append('<li><a href="#">' + link.title + '</a></li>');
  });
  $('#styles li a').click(function(e) {
    e.preventDefault();
    selectStyle($(this).text());
  })
}

$(document).ready(function() {
  initCategories();
  selectCategory('common');
  initStyleSwitcher();
  selectStyle('Default');
});

