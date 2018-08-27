/**
 * Wraps up Radio and Checkbox input elements and
 * adds an additional element so we can custom style
 * the checkbox and radio buttons
 *
 * @author Todd Miller <https://github.com/Toddses>
 */

(function ($) {
  'use strict';

  Drupal.behaviors.wrapRadiosAndCheckboxes = {
    attach: (context) => {
      // prevents duplicate wrapper elements
      if ($(context).is('form'))
        return;

      $('input[type="checkbox"]', context)
        .wrap('<div class="checkbox-wrap"></div>')
        .after('<div class="checkbox"></div>');

      $('input[type="radio"]', context)
      .wrap('<div class="radio-wrap"></div>')
      .after('<div class="radio"></div>');
    }
  };
})(jQuery);