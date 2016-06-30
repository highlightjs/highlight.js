(function() {
  'use strict';

  var $window    = $(window),
      $languages = $('#languages div');

  function resizeLists() {
    var $categories = $('#categories'),
        $styles     = $('#styles');

    $categories.css('max-height', $window.height() / 4);
    $categories.perfectScrollbar('update');
    $styles.height($window.height() - $styles.position().top - 20);
    $styles.perfectScrollbar('update');
  }

  function selectCategory(category) {
    $languages.each(function(i, language) {
      var $language = $(language);

      if ($language.hasClass(category)) {
        var code = $language.find('code');

        if (!code.hasClass('hljs')) {
          hljs.highlightBlock(code.get(0));
        }

        $language.show();
      } else {
        $language.hide();
      }
    });

    $(document).scrollTop(0);
  }

  function categoryKey(c) {
    return c === 'common' ? '' : c === 'misc' ? 'z' : c === 'all' ? 'zz' : c;
  }

  function initCategories() {
    var $categories, categoryNames;
    var categories         = {},
        $categoryContainer = $('#categories');

    $languages.each(function(i, div) {
      if (!div.className) {
        div.className += 'misc';
      }
      div.className += ' all';
      div.className.split(' ').forEach(function(c) {
        categories[c] = (categories[c] || 0) + 1;
      });
    });

    categoryNames = Object.keys(categories);

    categoryNames.sort(function(a, b) {
      a = categoryKey(a);
      b = categoryKey(b);
      return a < b ? -1 : a > b ? 1 : 0;
    });

    categoryNames.forEach(function(c) {
      $categoryContainer.append(
        '<li data-category="' + c + '">' + c + ' (' + categories[c] +')</li>'
      );
    });

    $categories = $categoryContainer.find('li');

    $categories.click(function() {
      var $category = $(this);

      $categories.removeClass('current');
      $category.addClass('current');
      selectCategory($category.data('category'));
    });

    $categories.first().click();
    $categoryContainer.perfectScrollbar();
  }

  function selectStyle(style) {
    $('link[title]').each(function(i, link) {
      link.disabled = (link.title !== style);
    });
  }

  function initStyles() {
    var $styles;
    var $styleContainer = $('#styles');

    $('link[title]').each(function(i, link) {
      $styleContainer.append('<li>' + link.title + '</li>');
    });

    $styles = $styleContainer.find('li');

    $styles.click(function() {
      var $style = $(this);

      $styles.removeClass('current');
      $style.addClass('current');
      selectStyle($style.text());
    });
    $styles.first().click();
    $styleContainer.perfectScrollbar();
  }

  $(function() {
    initCategories();
    initStyles();
    $window.resize(resizeLists);
    resizeLists();
  });
}).call(this);
