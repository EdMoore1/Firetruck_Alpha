<?php
		//EDIT HERE
		$keys = array("123-4567-890",
					  "123-4567-890",
					  "123-4567-890",
					  "123-4567-890",
					  "123-4567-890",
					  "123-4567-890",
					  "123-4567-890",
					  "123-4567-890",
					  "123-4567-890",
					  "123-4567-890",
					  "123-4567-890",
					  "123-4567-890",
					  "123-4567-890",
					  "123-4567-890"
					  );
		//DO NOT EDIT BELOW THIS LINE
?>







<?php
	$postKey = "FALSEKEY";
	if(!empty($_POST))
		$postKey = $_POST['key1']."-".$_POST['key2']."-".$_POST['key3'];

	if(in_array($postKey, $keys)) {
?>
<html>
<head>
	<script src="js/jQuery.js" type="text/javascript"></script>
	<script src="js/levels.js" type="text/javascript"></script>
	<script src="js/gameLibrary.js" type="text/javascript"></script>
	<script src="js/elementsLibrary.js" type="text/javascript"></script>
	<script src="js/firetruckLibrary.js" type="text/javascript"></script>
	<script src="js/newsLibrary.js" type="text/javascript"></script>
	<script src="js/pointsLibrary.js" type="text/javascript"></script>
	<script src="js/keys.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<script type="text/javascript">
		$(document).ready(function() {
			//Initialise the game
			var game = new GameCanvas(levels);
			game.Setup();
		});
	</script>
</head>

<body>
	<div id="gameContent2">
		<!-- <div id="points" width="1024px" height="30px"><div id="timer"></div></div> -->
		<canvas id="points" width="1024px" height="20px"></canvas>
		<canvas id="game" width="1024px" height="640px"></canvas>
		<canvas id="news" width="1024px" height="20px"></canvas>
	</div>

</body>
</html>
<?php } else { ?>
<html>
<head>
	<title>Please login</title>
</head>
<body>
	<form action="<?=$_SERVER['REQUEST_URI']?>" method="POST">
		<p>This game is restricted to MacICT Clients only. Please enter your serial key below.</p>
		<br/>
		<input class="serial" id="key1" name="key1" maxlength="3" placeholder="xxx" />-
		<input class="serial" id="key2" name="key2" maxlength="4" placeholder="xxxx" />-
		<input class="serial" id="key3" name="key3" maxlength="3" placeholder="xxx" />
		<input class="serial" type="submit" value="Play!" onClick="validate();" />
	</form>
</body>
</html>
<?php } ?>