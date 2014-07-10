(function () {

  // console.log('Initializing github-diff-filter');

  // Includes processed by grunt-include-replace.
  var css = '<style>@@include("style.min.css")</style>';
  var form = '@@include("../temp/html/form.html")';

  // If not already done, attach the CSS to the head and the overlay markup to the body.
  if ($('#gdf').length === 0) {
    $('head').append(css);
    $('.header .container').append(form);
  }

  // Create the function that hides files.
  window.gdfHide = function (event) {
    // If hitting enter (from the input) or clicking the button.
    if (event.which == 13 || event.which == 1) {
      var query = $('#gdf-hide-input').val();

      if (query !== '') {
        // console.log("github-diff-filter: hiding paths matching '" + query + "'");

        $.each(query.split(','), function (key, value) {
          // Remove from Diff Stats list.
          $('a[href^="#diff"]:contains(' + value + ')').parent().hide();

          // Remove the actual file diffs.
          $('[data-path*="' + value + '"]').parent().hide();
        });

        // Enable the "Show all files" button
        $('#gdf-show-all-btn').removeAttr('disabled');

        // Clear the input field and refocus on it for entering another value.
        $('#gdf-hide-input').val('').focus();
      }
    }
  };

  // Bind event listeners to the button and input field that call gdfHide.
  $('#gdf-hide-btn').click(gdfHide);
  $('#gdf-hide-input').keyup(gdfHide);

  // Create the function that shows files.
  window.gdfShow = function (event) {
    // console.log("github-diff-filter: showing all files");
      
    // Show all in Diff Stats list.
    $('a[href^="#diff"]').parent().show();

    // Show all of the actual file diffs.
    $('[data-path]').parent().show();

    // Hide the "Show all files" button.
    $('#gdf-show-all-btn').attr('disabled', true);
  };

  // Bind event listener to the "Show all files" button.
  $('#gdf-show-all-btn').click(gdfShow);

  // Hide the overlay if the close button is clicked.
  $('#gdf-close-btn').click(function () {
    $(this).parent().remove();
  });

})();
