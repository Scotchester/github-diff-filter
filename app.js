$(document).ready(function(){

  var $diff = $('[data-diff-num]');

  // Remove from Diff Stats list:
  $('a[href^="#diff"]:contains(".min")').parent().hide();

  // Remove the actual file diffs:
  $('[data-path*=".min"]').parent().hide();

  // Diff Collapsing
  $diff.each(function(index){

    var html = {
      iconCollapse:   '<span class="octicon octicon-chevron-up"></span>',
      iconExpand:     '<span class="octicon octicon-chevron-down"></span>',
      iconCheck:      '<span class="octicon octicon-check"></span>',
      reviewButton:   '<a href="#" class="button minibutton tooltipped diff-review" title="Mark as reviewed"></a>',
      collapseButton: '<a href="#" class="button minibutton tooltipped diff-collapse" title="Expand/collapse"></a>',
      buttonFix:      '<code></code>'
    };

    var $thisDiff = $(this);
    var $buttons = $thisDiff.find('.meta .actions .button-group');
    var $review = $(html.reviewButton).html(html.iconCheck + html.buttonFix);
    var $collapse = $(html.collapseButton).html(html.iconCollapse + html.buttonFix);

    $buttons.append($review);
    $buttons.append($collapse);

    $review = $thisDiff.find('.diff-review');
    $collapse = $thisDiff.find('.diff-collapse');

    $review.tipsy();
    $collapse.tipsy();

    $collapse.on('click', function(e){
      var $this = $(this);
      var $thisDiff = getContainerFromButton($this);
      var newHTML;
      e.preventDefault();
      if ($this.html() == html.iconCollapse + html.buttonFix) {
        newHTML = html.iconExpand + html.buttonFix;
      } else {
        newHTML = html.iconCollapse + html.buttonFix;
        $this.html(html.iconCollapse + html.buttonFix);
      }
      $this.html(newHTML);
      $thisDiff.toggleClass('diff-state-collapsed');
      getDiffFromButton($this).toggle();
    });

    $review.on('click', function(e){
      var $this = $(this);
      var $thisDiff = getContainerFromButton($this);
      var newOpacity = ($thisDiff.css('opacity') < 1) ? 1 : 0.2;
      e.preventDefault();
      $thisDiff.css('opacity', newOpacity);
    });

    function getDiffFromButton($button) {
      return $button.parents('.js-details-container').find('.data, .image, .view-modes');
    }

    function getContainerFromButton($button) {
      return $button.parents('.js-details-container');
    }

  });


});
