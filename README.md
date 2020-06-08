# leaguemanager2

Version 2.0.0 - Point Zero

THe previous version of our League Manager for Blood Bowl 2 from Cyanide had been developed with AngularJS. It has been redeveloped under VueJS to allow also a redesign of some feature and development of new ones.

We're currently alpha testing and you can check the result here: http://www.bbbl.fr/vue.php#/

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
