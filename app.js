$(document).ready(function(){

  var $dif = $('.js-details-container');

  // Remove from Diff Stats list:
  $('a[href^="#diff"]:contains(".min")').parent().hide();

  // Remove the actual file diffs:
  $('[data-path*=".min"]').parent().hide();

  // Diff Collapsing
  $dif.each(function(index){

    $thisDif = $(this);
    $buttons = $thisDif.find('.meta .actions .button-group');
    $review = $('<a href="#" class="button minibutton diff-review">Mark as reviewed<code></code></a>');
    $collapse = $('<a href="#" class="button minibutton diff-collapse">Collapse<code></code></a>');

    $buttons.append($review);
    $buttons.append($collapse);

    $review = $thisDif.find('.diff-review');
    $collapse = $thisDif.find('.diff-collapse');

    $collapse.on('click', function(e){
      var $this = $(this);
      e.preventDefault();
      if ($this.text() == 'Collapse') {
        $this.html('Expand<code></code>');
      } else {
        $this.html('Collapse<code></code>');
      }
      getDiffFromButton($this).toggle();
    });

    $review.on('click', function(e){
      var $this = $(this);
      e.preventDefault();
      if ($this.text().indexOf('Reviewed') != -1) {
        getContainerFromButton($this).fadeTo('fast', 1);
        $this.html('Mark as reviewed<code></code>');
      } else {
        getContainerFromButton($this).fadeTo('fast', .2);
        $this.html('Reviewed<code></code>');
      }
    });

    function getDiffFromButton($button) {
      return $button.parents('.js-details-container').find('.data, .image');
    }

    function getContainerFromButton($button) {
      return $button.parents('.js-details-container');
    }

  });


});
