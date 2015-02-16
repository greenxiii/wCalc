<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>WordCalc</title>
	<link rel="stylesheet" type="text/css" href="styles/s.css">
	<link rel="stylesheet" type="text/css" href="bower_components/fontawesome/css/font-awesome.min.css">
</head>
<body>
	<header>
	
	</header>
	<sidebar id=side>
		<div class="item" id=head>details</div>
		<div id="data">
			<div class="item">Characters<div class="val">0</div></div>
			<div class="item">Words<div class="val">0</div></div>
			<div class="item">Sentences<div class="val">0</div></div>
			<div class="item">Paragraphs<div class="val">0</div></div>
			<div class="item">Avg. Sentence (w)<div class="val">0</div></div>
			<div class="item">Avg. Sentence (c)<div class="val">0</div></div>
		</div>
		
		<div class="item" id=head>Keyword Density
		<i class="fa fa-cog" data-modal="settings_m"></i>
		</div>
		<div id="data1"></div>
	</sidebar>
	<section id=section>
		<div id="info">0 Characters 0 Words</div>
		
		<div class="textinpt">
			<textarea name="" id="mainText"></textarea>
		</div>
	</section>
	<footer>
		
	</footer>
	<div class="modal" id=settings_m>
		<div class="m_head" id=head>Settings<i class="fa fa-times"></i></div>
		<div class="m_body">
			<label>Language
				<select name="lang" id="lang">
					<option value="en" selected>English</option>
					<option value="ukr">Ukrainian</option>
				</select>
			</label>
			<span>Keywords:</span><br>
			<textarea id="keys"></textarea>
			<input id=upkey type="button" value="ok">
		</div>
	</div>
	<div class="layout"></div>
	
	<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
</body>
</html>