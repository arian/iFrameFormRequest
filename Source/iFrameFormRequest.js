/*
---
description: This class gives you a method to upload files 'the ajax way'

license: MIT-style

authors:
- Arian Stolwijk

requires:
requires: 
  core/1.2.4: 
  - Class.Extras
  - Element.Event
  - Element.Style

provides: [Element.iFrameFormRequest, iFrameFormRequest]

...
*/

/**
 * @author Arian Stolwijk
 * Idea taken from http://www.webtoolkit.info/ajax-file-upload.html
 */

var iFrameFormRequest = new Class({
	
	Implements: [Options, Events],
	
	options: { /*
		onRequest: function(){},
		onComplete: function(data){},
		onFailure: function(){} */
	},
	
	initialize: function(formElmt, options){
		this.setOptions(options);
		var frameId ='f' + Math.floor(Math.random() * 99999);
		var loading = false;

		formElmt = document.id(formElmt)
			.set('target', frameId)
			.addEvent('submit', function(){
				loading = true;
				this.fireEvent('request');
			}.bind(this));

		this.iframe = new IFrame({
			name: frameId,
			styles: {
				display: 'none'
			},
			src: 'about:blank',
			events: {
				load: function(){
					if (loading) {
						var doc = document.getElementById(frameId).contentWindow.document;
						if (doc) {
							if (doc.location.href == 'about:blank') this.fireEvent('failure');
							this.fireEvent('complete', doc.body.innerHTML);
						} else {
							this.fireEvent('failure');
						}
						loading = false;
					}
				}.bind(this)
			}
		}).inject(document.id(document.body));
	},

	toElement: function(){
		return this.iframe;
	}
	
});

Element.implement('iFrameFormRequest',function(options){
	this.store('iFrameFormRequest',new iFrameFormRequest(this,options));
	return this;
});

