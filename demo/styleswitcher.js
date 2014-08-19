$(document).ready(function(){
  var ul = $('#styles');
  $('link[title]').each(function(i, link) {
    ul.append('<li><a href="#">' + link.title + '</a></li>');
  });
  $('#styles li a').click(function(e) {
    e.preventDefault();
    var title = $(this).text();
    $('link[title]').each(function(i, link) {
      link.disabled = (link.title != title);
    });
  })
});
