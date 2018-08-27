/**
 * Tabs to accordions
 * Actions for the tabs to accordions component on the solutions and sub solutions pages.
 *
 * @author Devon Taylor <https://github.com/Taylord93>, revised by Abigail Kesler <https://github.com/abbingail>
 */

(function($){

  $(document).ready(function(){

    // Grab the parent element by the data tab
    const $parent = $('[data-custom-tabs]');
    // Set the current index.
    let currentIndex = 1;

    initialize();

    // Attach click handler to the tabs within the parent element in case two tabs ever appear on the same page
    $parent.find('[data-tab]')
      .click(handleClick);

    /**
     * Initialize
     * Set the first tab and related content div to active, remove the anchor tab from the heading div.
     */
    function initialize () {

      const $firstTab = $parent.find('[data-tab]:eq(0)'),
        id = $firstTab.attr('data-index'),
        $content = $parent.find(`[data-tab-content="${id}"]`),
        $heading = $parent.find('.heading');

      $firstTab.attr('data-active', true);
      $content.attr('data-active', true);

      const headingContent = $heading.find('a').html();

      if(headingContent){
        $heading.empty().append(headingContent);
      }

    }

    /**
     * handleClick
     * Handle the tab click to switch active to clicked tab and related content
     * @param e {Event}
     */
    function handleClick (e) {

      const $el = $(this),
        id = $el.attr('data-index'),
        nextIndex = parseInt($el.attr('data-index')),
        $content = $parent.find(`[data-tab-content="${id}"]`);

      if(!$el.attr('data-active')){

        // Check which diection the click is coming from for a better UX, apply appropriate class for transition of content.
        if(nextIndex < currentIndex){
          $parent.addClass('upward-transition');
        }else{
          $parent.removeClass('upward-transition');
        }

        currentIndex = nextIndex;

        // Set a small delay so that the transitions can hook into the new class for up/down
        setTimeout(init, 150);

      }

      // ===== The following functions have to be inside of the click handler so they can access the cached element above and stay relative to the active ID ===== //

      /**
       * init
       * initialize events on the click handler before removing previously active tab and content.
       */
      function init () {

        // Remove current active tabs active prop
        $parent.find('[data-active][data-tab]')
          .removeAttr('data-active');

        $el.attr('data-active', true);
        $el.addClass('next-tab'); // For CSS transition

        $content.addClass('next-tab')
          .attr('data-active', true);

        // Set a delay so that the previous active content isn't removed before the transition completes
        setTimeout(removeActive, 300);
      }

      /**
       * removeActive
       * Remove active prop from previously active content
       */
      function removeActive () {

        $parent.find('[data-tab-content][data-active]')
          .not(`[data-tab-content="${id}"]`) // Do not target the content with the current ID
          .removeAttr('data-active');

        // Remove CSS transition related class from now active content.
        $content.removeClass('next-tab');

      }

    }

  });

})(jQuery);