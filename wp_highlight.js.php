<?php
/*
Plugin Name: highlight.js
Plugin URI: http://softwaremaniacs.org/soft/highlight/
Description: Syntax highlighting with language autodetection
Version: 4.0
Author: Ivan Sagalaev
Author URI: http://softwaremaniacs.org/about/
*/

add_option('hljs_languages', '');
if (!get_option('hljs_script_path')) {
  $components = explode('/', dirname(__FILE__));
  $l = sizeof($components);
  $script_path = get_settings('home') . '/' . $components[$l - 3] . '/' . $components[$l - 2] . '/' . $components[$l - 1];
  add_option('hljs_script_path', $script_path . '/highlight.js');
}
add_option('hljs_css', '');

function init_highlighting_on_load() {
  $languages_str = get_option('hljs_languages');
  if ($languages_str) {
    $languages = explode(',', $languages_str);
    foreach ($languages as $i => $language) {
      $languages[$i] = '\'' . trim($language) . '\'';
    }
    $languages_str = implode(', ', $languages);
  }
  ?>
<script type="text/javascript" src="<?php echo get_option('hljs_script_path');?>"></script>
<script type="text/javascript">hljs.initHighlightingOnLoad(<?php echo $languages_str; ?>);</script>
<?php
  $css = get_option('hljs_css');
  if ($css) {?>
<style type="text/css">
<?php echo $css ?>
</style>
<?php
  }
}
add_action('wp_head', 'init_highlighting_on_load');

function add_hljs_subpanel() {
  if (function_exists('add_options_page')) {
    add_options_page('highlight.js options', 'highlight.js', 'manage_options', __FILE__, 'hljs_subpanel');
  }
}
add_action('admin_menu', 'add_hljs_subpanel');

function hljs_subpanel() {
  if (isset($_POST['hljs_script_path'])) {
    update_option('hljs_languages', $_POST['hljs_languages']);
    update_option('hljs_script_path', $_POST['hljs_script_path']);
    update_option('hljs_css', $_POST['hljs_css']);
    ?><div class="updated"><p><strong>Options updated.</strong></p></div><?php
	} ?>
<div class="wrap">
  <form method="post">
    <h2>highlight.js options</h2>
    
    <div>
      <p><label for="id_hljs_languages">Highlight Languages:</label> <input type="text" name="hljs_languages" id="id_hljs_languages" value="<?php echo get_option('hljs_languages'); ?>" /></p>
      <p><small>List here languages that you want to highlight on your blog like this: php, html, css. Empty string means "all known languages". For the list
      of supported languages refer to <a href="http://softwaremaniacs.org/soft/highlight/">highlight.js homepage</a>.</small></p>
    </div>
      
    <div>
      <p><label for="id_hljs_script_path">Path to highlight.js:</label> <input type="text" name="hljs_script_path" id="id_hljs_script_path" value="<?php echo get_option('hljs_script_path'); ?>" /></p>
      <p><small>Let's you place the script in a convenient place</small></p>
    </div>
    
    <div>
      <p><label for="id_hljs_css">Custom CSS:</label></p>
      <p><textarea name="hljs_css" id="id_hljs_css" rows="20" cols="70"><?php echo get_option('hljs_css'); ?></textarea></p>
      <p><small>Normally styling of code snippets goes into site's main CSS files. But you can
      write it here if you can't access site's CSS or just like it this way.</small></p>
    </div>
    
    <div class="submit">
      <input type="submit" name="info_update" value="Update options »" />
    </div>
  </form>
</div><?php

}
?>