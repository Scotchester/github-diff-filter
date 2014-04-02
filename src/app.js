(function () {

  console.log('Initializing github-diff-filter');

  // Includes processed by grunt-include-replace.
  var css = '<style>@@include("style.min.css")</style>';
  var form = '@@include("../temp/html/form.html")';

  // Attach the CSS to the head and the overlay markup to the body.
  $('head').append(css);
  $('body').append(form);

  // Create the callback function to bind to the event listeners below.
  window.gdfHide = function (event) {
    // If hitting enter (from the input) or clicking the button.
    if (event.which == 13 || event.which == 1) {
      var query = $('#gdf-hide-input').val();

      if (query !== '') {
        console.log("github-diff-filter: hiding paths matching '" + query + "'");
        
        // Remove from Diff Stats list.
        $('a[href^="#diff"]:contains(' + query + ')').parent().hide();

        // Remove the actual file diffs.
        $('[data-path*="' + query + '"]').parent().hide();

        // Clear the input field and refocus on it for entering another value.
        $('#gdf-hide-input').val('').focus();

      }
    }
  };

  // Bind event listeners to the button and input field that call gdfHide
  $('#gdf-hide-btn').click(gdfHide);
  $('#gdf-hide-input').keyup(gdfHide);

  // Hide the overlay if the close button is clicked.
  $('#gdf-close-btn').click(function () {
    $(this).parent().remove();
  });

})();
