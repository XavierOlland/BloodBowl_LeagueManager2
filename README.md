# leaguemanager2

Version 2.0.0 - Point Zero

## To do after build

Change index extension to **php** file and add the following script at the end of the **head** section to ensure phpBB interaction.

`<script>
    <?php  
      define('PHPBB_ROOT_PATH','./Forum/');  
      include('backend/vue-config.php');  
      echo "window.user = ".json_encode($user->data).";";  
      echo "window.admin = ".$admin  
    ?>  
  </script>`
