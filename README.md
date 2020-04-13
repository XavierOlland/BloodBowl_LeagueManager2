# leaguemanager2

Version 2.0.0 - Point Zero

## To do after build

Change index extnesion to **php** file and add the following script in the **head** section to ensure phpBB interaction.

`<script>  
  <?php  
    define('PHPBB_ROOT_PATH','./Forum/');  
    include('backend/vue-config.php');  
    echo "window.user = ".json_encode($user->data);  
  ?>  
</script>`
