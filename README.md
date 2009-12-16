iFrameFormRequest
===========

This class gives you a method to upload files 'the ajax way'. Attach the iFrameFormMethod to any form tag and you can upload files

How to use
----------

	#JS
	var iFrame = new iFrameFormRequest(document.getElement('form'),{
		onRequest: function(){
			document.id('debug').set('text','start');
		},
		onComplete: function(response){
			document.id('debug').set('html',response);
		}
	});
	
Or you can use it this way:

	#JS
	document.getElement('form').iFrameFormRequest({
		onRequest: function(){
			document.id('debug').set('text','start');
		},
		onComplete: function(response){
			document.id('debug').set('html',response);
		}
	});
	
	
	#HTML
	<form action="upload.php" method="post" enctype="multipart/form-data">	
		<input type="file" name="file" />	
		<input type="submit" value="uploadAjax" />	
	</form>
	
	<div id="debug"></div>
	
