function resizeLists() {
  var
    categories = $('#categories'),
    styles = $('#styles');
  categories.css('max-height', $(window).height() / 4);
  categories.perfectScrollbar('update');
  styles.height($(window).height() - styles.position().top - 20);
  styles.perfectScrollbar('update');
}

function selectCategory(category) {
  $('#languages div').each(function(i, div) {
    div = $(div);
    if (div.hasClass(category)) {
      var code = div.find('code');
      if (!code.hasClass('hljs')) {
        hljs.highlightBlock(code.get(0));
      }
      div.show();
    } else {
      div.hide();
    }
  });
}

function initCategories() {
  var categories = {};
  $('#languages div').each(function(i, div) {
    div.className += ' all';
    div.className.split(' ').filter(Boolean).forEach(function(c) {
      categories[c] = (categories[c] || 0) + 1;
    });
  });
  var ul = $('#categories');
  var category_names = Object.keys(categories);
  category_names.sort(function(a, b) {
    if (a === 'common' || b === 'all') {
      return -1;
    } else if (b === 'common' || a === 'all') {
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
    $('#categories li').removeClass('current');
    $(this).addClass('current');
    selectCategory($(this).data('category'));
  });
  $('#categories li:first-child').click();
  ul.perfectScrollbar();
}

function selectStyle(style) {
  $('link[title]').each(function(i, link) {
    link.disabled = (link.title != style);
  });
}

function initStyles() {
  var ul = $('#styles');
  $('link[title]').each(function(i, link) {
    ul.append('<li>' + link.title + '</li>');
  });
  $('#styles li').click(function(e) {
    $('#styles li').removeClass('current');
    $(this).addClass('current');
    selectStyle($(this).text());
  });
  $('#styles li:first-child').click();
  ul.perfectScrollbar();
}

$(document).ready(function() {
  initCategories();
  initStyles();
  $(window).resize(resizeLists);
  resizeLists();
});

