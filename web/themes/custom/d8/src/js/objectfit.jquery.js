
/**
 * Making object fit for images IE 11-friendly
 * @author Abigail Kesler <abigail.kesler@tricomb2b.com>
 */


(function ($) {
  'use strict';

  $(document).ready(initialize);

  function initialize () {
    objectFitImages();
    objectFitVideos();
  }
})(jQuery);