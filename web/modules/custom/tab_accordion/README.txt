CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Requirements
 * Installation
 * Configuration
 * Styling


INTRODUCTION
------------

Tab Accordion creates:
 * Custom block type called "Tab to Accordion", including fields for:
   * Block description (for display in custom block library only)
   * Accordion title
   * Accordion image - optional
   * Accordion content
   * Display page - an ER for whatever content type(s) you want this accordion to display 
   		on. Placement is by default set to unlimited
   * Accordion sort - by default accordions sort based on title. If certain items need to take priority, use this field
 * Custom view block called "Hero Banner", which controls layout and adds classes for styling. View block is automatically placed in the "Bottom No Wrap" region of the D8 theme


REQUIREMENTS
------------

No special requirements.


INSTALLATION
------------

No special requirements.


CONFIGURATION
-------------

Create accordion blocks to your heart's content. If/When the "configure block" pops up for the specific block you are creating, you can ignore. Placing directly with the block will bypass the associated views layout/markup and template... and it won't be pretty.


STYLING
-------
Output is controlled by template within the D8 theme under templates/views-view-unformatted--tab-accordion

Functionality is controlled within the D8 theme under js/tabs-to-accordion

Styling is located within the D8 theme under modules/tab-accordion
