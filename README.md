# BloodBowl League Manager 2
The aim of the League Manager is to deliver a tool for leagues playing BloodBowl 2 from Cyanide Studio to organize themselves and keep track of their competitions and results.  
The overall tool is a combination of 3 elements:  
- [A web interface built with VueJS](https://github.com/XavierOlland/BloodBowl_LeagueManager2): to display the competitions, results and statistics.
- [A backend built with PHP](https://github.com/XavierOlland/BB_LM2_Backend): to update the data and serve it to the interface.
- [A phpBB forum](https://www.phpbb.com/): for coach to organize them.

You can see the whole project running for French Blood Bowl Baston League at [https://bbbl.fr](https://bbbl.fr)

# This web interface
This web interface is built with [VueJS](https://vuejs.org/) using [VueCLI](https://cli.vuejs.org/).
It's role is to show the current and past competitions results through standings, leaderboards, and matches details.

## Dependencies
- [Vuex](https://vuex.vuejs.org/) for state management
- [VueRouter](https://router.vuejs.org/) for routing
- [Axios](https://github.com/axios/axios) to connect to the BB_LM2_Backend
- [vuemoment](https://github.com/brockpetrie/vue-moment) for date manipulation
- [vue-datetime](https://github.com/mariomka/vue-datetime) for the date picker when planning games
- [vuelodash](https://github.com/Ewocker/vue-lodash) because
- [vue2-filters](https://github.com/freearhey/vue2-filters) for easy to use filters

## Before building

Building won't work because of missing images. Because we can't be sure to what extend ingame content is considered as fair use. This apply mainly to teams' logos and stadium images.
Please feel free to contact us for any help concerning that matter.

## To do after building

Change index extension to **php** file and add the following script at the end of the **head** section to ensure phpBB interaction.
Remember to adapt your backend url if necessary.

`<script>  
    <?php  
      define('PHPBB_ROOT_PATH','./Forum/');  
      include('backend/config.php');  
      echo "window.user = ".json_encode($user->data).";";  
      echo "window.admin = ".$admin  
    ?>  
  </script>`

# Disclaimer
This project has no link whatsoever with phpBB, Cyanide Studio, Focus Interactive or Games Workshop (though we'd like to thank Cyanide for their help and support with their API).
BloodBowl is a registered trademark of Games Workshop.
