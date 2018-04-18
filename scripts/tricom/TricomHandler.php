<?php

/**
 * @file
 * Contains \DrupalProject\tricom\TricomHandler
 */

namespace DrupalProject\tricom;

use Composer\Script\Event;
use DrupalFinder\DrupalFinder;
use Symfony\Component\Filesystem\Filesystem;

class TricomHandler {

  public static function removeSomeFiles (Event $event) {
    $fs = new Filesystem();
    $drupalFinder = new DrupalFinder();
    $drupalFinder->locateRoot(getcwd());
    $drupalRoot = $drupalFinder->getDrupalRoot();

    if ($fs->exists($drupalRoot . '/core/install.php'))
      $fs->remove($drupalRoot . '/core/install.php');

    if ($fs->exists($drupalRoot . '/.ht.router.php'))
      $fs->remove($drupalRoot . '/.ht.router.php');

    $event->getIO()->write("Removed Drupal install script and development server script");
  }
}
