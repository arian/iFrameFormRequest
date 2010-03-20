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
	
	Implements: Options,
	
	options: { /*
		onRequest: $empty,
		onComplete: function(data){},
		onFailure: $empty */
	},
	
	initialize: function(formElmt,options){
		this.setOptions(options);
		this.frameId ='f' + Math.floor(Math.random() * 99999);
		this.loading = false;

		this.formElmt = document.id(formElmt)
			.set('target',this.frameId)
			.addEvent('submit',function(){
				this.loading = true;
				this.options.onRequest();
			}.bind(this));	

		this.iframe = new IFrame({
			name: this.frameId,
			styles: {
				display: 'none'		
			},
			src: 'about:blank',
			events: {
				load: function(self){
					if (self.loading) {				
						var doc = document.getElementById(self.frameId).contentWindow.document;
						if (doc) {
							if (doc.location.href == 'about:blank') {
								self.options.onFailure();
							}
							if ($type(self.options.onComplete) == 'function') {
								self.options.onComplete(doc.body.innerHTML);
							}
						} else {
							self.options.onFailure();
						}
						self.loading = false;
					}
				}.pass(this)
			}
		}).inject($(document.body));
	},

	toElement: function(){
		return this.iframe;
	}
	
});

Element.implement('iFrameFormRequest',function(options){
	this.store('iFrameFormRequest',new iFrameFormRequest(this,options));
	return this;
});

