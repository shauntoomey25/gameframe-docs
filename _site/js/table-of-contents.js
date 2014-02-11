$(function() {

  // Only display table of contents if there is more than one header
  if($('#toc_1').length != 1) {
    return;
  }

  // Add table of contents title
  $('#toc').append('<u>Page Contents:</u><br>');

  // Add links to headers
  var i = 0;
  while($('#toc_' + i).length == 1) {
    var id = '#toc_' + i;
    var el = $(id);
    var link = $('<a></a>');
    link.attr('href', id);
    link.text(el.text());
    $('#toc').append(link).append('<br>');
    i++;
  }
  
  // Add extra white space at bottom of table of contents
  $('#toc').append('<br>');
});
