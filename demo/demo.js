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
  var category_names = Object.keys(categories);
  category_names.sort(function(a, b) {
    if (a === 'common' || b === 'other') {
      return -1;
    } else if (b === 'common' || a === 'other') {
      return 1;
    } else if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
  category_names.forEach(function(c) {
    ul.append('<li data-category="' + c + '">' + c + ' (' + categories[c] +')</li>');
  });
  $('#categories li').click(function(e) {
    selectCategory($(this).data('category'));
  });
  return category_names[0];
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
    ul.append('<li>' + link.title + '</li>');
  });
  $('#styles li').click(function(e) {
    selectStyle($(this).text());
  });
  return 'Default';
}

$(document).ready(function() {
  var defaultCategory = initCategories();
  selectCategory(defaultCategory);
  var defaultStyle = initStyleSwitcher();
  selectStyle(defaultStyle);
});

