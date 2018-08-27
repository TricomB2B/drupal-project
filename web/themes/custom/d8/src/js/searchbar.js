/**
 * Toggles the search bar when icon is clicked
 * @author Jess McClary <jess.mcclary@tricomb2b.com>
 * @author Todd Miller <https://github.com/Toddses>
 */

(function ($) {
  'use strict';

  let $searchIcon;
  let $searchBar;
  let $searchInput;

  $(document).ready(initialize);

  /**
   * Caches elements and preps event listeners
   */
  function initialize() {
    $searchIcon  = $('.search-icon');
    $searchBar   = $('.search-bar');
    $searchInput = $('.form-search');

    $searchIcon.on('click', handleClick);
  }

  /**
   * Toggles the search bar visibility on click,
   * gives the form focus if the form is being opened
   */
  function handleClick () {
    $searchBar.toggleClass('active');
    if ($searchBar.hasClass('active'))
      $searchInput.focus();
  }

})(jQuery);