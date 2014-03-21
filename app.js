$(document).ready(function(){

  var $dif = $('[data-diff-num]');

  // Remove from Diff Stats list:
  $('a[href^="#diff"]:contains(".min")').parent().hide();

  // Remove the actual file diffs:
  $('[data-path*=".min"]').parent().hide();

  // Diff Collapsing
  $dif.each(function(index){

    var html = {
      iconCollapse:   '<span class="octicon octicon-chevron-up"></span>',
      iconExpand:     '<span class="octicon octicon-chevron-down"></span>',
      iconCheck:      '<span class="octicon octicon-check"></span>',
      reviewButton:   '<a href="#" class="button minibutton diff-review"></a>',
      collapseButton: '<a href="#" class="button minibutton diff-collapse"></a>',
      buttonFix:      '<code></code>'
    };

    var $thisDif = $(this);
    var $buttons = $thisDif.find('.meta .actions .button-group');
    var $review = $(html.reviewButton).html(html.iconCheck + html.buttonFix);
    var $collapse = $(html.collapseButton).html(html.iconCollapse + html.buttonFix);

    $buttons.append($review);
    $buttons.append($collapse);

    $review = $thisDif.find('.diff-review');
    $collapse = $thisDif.find('.diff-collapse');

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
      return $button.parents('.js-details-container').find('.data, .image');
    }

    function getContainerFromButton($button) {
      return $button.parents('.js-details-container');
    }

  });


});
