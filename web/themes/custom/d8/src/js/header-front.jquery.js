/**
 * Watches the scroll action on the front page
 * and manages the visibility of the "internal" header bar
 * @author Todd Miller <todd.miller@tricomb2b.com>
 */

(function ($) {
  'use strict';

  let $header;
  let $page;

  $(document).ready(init);

  /**
   * Cache elements, set up event listeners
   * But only if it's the front page
   */
  function init () {
    if ($('.front').length > 0) {
      // target the internal header for style adjustments
      $header = $('header .internal-container');
      // target the HTML for getting the proper scroll position
      $page = $('html');

      updateBackground();
      // throttle the event for better performance
      $(window).scroll($.throttle(250, updateBackground));
    }
  }

  /**
   * Determine the users position on the page and adjust the header classes
   */
  function updateBackground () {
    if ($page.scrollTop() > 75)
      $header.addClass('is-active');
    else
      $header.removeClass('is-active');
  }
})(jQuery);
