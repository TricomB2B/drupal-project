CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Requirements
 * Installation
 * Configuration
 * Expected use
 * Styling


INTRODUCTION
------------

Hero Banner creates:
 * Custom block type called "Hero Banner", including fields for:
   * Block description (for display in custom block library only)
   * Banner overlay - 3 defaults given, along with a black and white
   * Banner image
   * Banner content
   * Display page - an ER for whatever content type(s) you want this block to display on.
 * Custom view block called "Hero Banner", which controls layout and adds classes for styling and places block in the "Banner" region of the D8 theme.


REQUIREMENTS
------------

No special requirements.


INSTALLATION
------------

No special requirements.


CONFIGURATION
-------------

Create hero banner blocks to your heart's content. If/When the "configure block" pops up for the specific block you are creating, you can ignore. Placing directly with the block will bypass the views layout/markup and it won't be pretty.


EXPECTED USE
------------
One hero banner block per page.

STYLING
-------
Styling for the banner region, image, and text are located within the modules/hero-banner.scss file
Styling for the image overlay are located in the components/image-overlay.scss file
