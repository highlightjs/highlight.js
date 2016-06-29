(function() {
  'use strict';

  function resizeLists() {
    var $categories = $('#categories'),
        $styles     = $('#styles');

    $categories.css('max-height', $(window).height() / 4);
    $categories.perfectScrollbar('update');
    $styles.height($(window).height() - $styles.position().top - 20);
    $styles.perfectScrollbar('update');
  }

  function selectCategory(category) {
    $('#languages div').each(function(i, div) {
      var $div = $(div);
      if ($div.hasClass(category)) {
        var code = $div.find('code');
        if (!code.hasClass('hljs')) {
          hljs.highlightBlock(code.get(0));
        }
        $div.show();
      } else {
        $div.hide();
      }
    });

    $(document).scrollTop(0);
  }

  function categoryKey(c) {
    return c === 'common' ? '' : c === 'misc' ? 'z' : c === 'all' ? 'zz' : c;
  }

  function initCategories() {
    var categories         = {},
        $categoryContainer = $('#categories');

    $('#languages div').each(function(i, div) {
      if (!div.className) {
        div.className += 'misc';
      }
      div.className += ' all';
      div.className.split(' ').forEach(function(c) {
        categories[c] = (categories[c] || 0) + 1;
      });
    });
    var category_names = Object.keys(categories);
    category_names.sort(function(a, b) {
      a = categoryKey(a);
      b = categoryKey(b);
      return a < b ? -1 : a > b ? 1 : 0;
    });
    category_names.forEach(function(c) {
      $categoryContainer.append('<li data-category="' + c + '">' + c + ' (' + categories[c] +')</li>');
    });
    $('#categories li').click(function(e) {
      $('#categories li').removeClass('current');
      $(this).addClass('current');
      selectCategory($(this).data('category'));
    });
    $('#categories li:first-child').click();
    $categoryContainer.perfectScrollbar();
  }

  function selectStyle(style) {
    $('link[title]').each(function(i, link) {
      link.disabled = (link.title != style);
    });
  }

  function initStyles() {
    var $styleContainer = $('#styles');
    $('link[title]').each(function(i, link) {
      $styleContainer.append('<li>' + link.title + '</li>');
    });
    $('#styles li').click(function(e) {
      $('#styles li').removeClass('current');
      $(this).addClass('current');
      selectStyle($(this).text());
    });
    $('#styles li:first-child').click();
    $styleContainer.perfectScrollbar();
  }

  $(document).ready(function() {
    initCategories();
    initStyles();
    $(window).resize(resizeLists);
    resizeLists();
  });
}).call(this);
