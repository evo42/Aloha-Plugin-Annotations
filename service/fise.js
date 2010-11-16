/*!
* Aloha Editor
* Author & Copyright (c) 2010 Gentics Software GmbH
* aloha-sales@gentics.com
* Licensed unter the terms of http://www.aloha-editor.com/license.html
*/

/**
 * Create the Services object. Namespace for Services
 * @hide
 */
if ( !GENTICS.Aloha.Annotations.Services ) GENTICS.Aloha.Annotations.Services = {};

/**
 * register the plugin with unique name
 */
GENTICS.Aloha.Annotations.Services.fise = new GENTICS.Aloha.Annotations.Service('com.gentics.aloha.plugins.Annotations.service.fise');

/**
 * If no API key is given, the public service is searched:
 * @property
 * @cfg
 */
GENTICS.Aloha.Annotations.Services.fise.settings.ApiKey = false;

/**
 * API Endpoint URL:
 * @property
 * @cfg
 */
GENTICS.Aloha.Annotations.Services.fise.settings.ApiEndpoint = "http://fise.demo.nuxeo.com/engines/";


/**
 * init IKS Fise Service
 */
GENTICS.Aloha.Annotations.Services.fise.init = function() {
	var that = this;
	
	this.subscribeEvents();
	
	// REST API Endpoint URL.
	this.ApiEndpoint = "http://fise.demo.nuxeo.com/engines/";
	
	// application/json, application/rdf+xml, application/rdf+json, text/turtle or text/rdf+nt
	this.ResponseFormat = "application/rdf+json"; 
	
	if ( this.settings.ApiKey ) {
		// set the service name
		this.repositoryName = 'fise/' + this.settings.ApiKey;
	} else {
		// set the service name
		this.repositoryName = 'fise/public';
	}
};

/**
 * Subscribe for events
 */
GENTICS.Aloha.Annotations.Services.fise.subscribeEvents = function () {

	var that = this;	
	
    // add the event handler for editableDeactivated
    GENTICS.Aloha.EventRegistry.subscribe(GENTICS.Aloha, 'editableDeactivated', function(event, rangeObject) {
    	if (GENTICS.Aloha.activeEditable) {
			
			/* test proxy; move to settings */
			var proxyUrl = 'http://localhost/aloha-editor/Aloha-Plugin-Annotations/proxy.php?url=';
			var serviceUrl = 'http://fise.demo.nuxeo.com/engines/';
			var url = proxyUrl + serviceUrl;
			var timeout = 10000;

			var data = {
				content: GENTICS.Aloha.activeEditable.getContents(),
				ajax: true,
				format:  "application/json" // application/json, application/rdf+xml, application/rdf+json, text/turtle or text/rdf+nt
			};

			// submit the data to our proxy
			$.ajax({
				type: "POST",
				url: url,
				data: data,
				//dataType: "html",
				contentType: 'text/plain',
				cache: false,
				beforeSend : function (xhr) {
					xhr.setRequestHeader('Accept', 'application/xml, text/xml');
					xhr.setRequestHeader('X-Service-Info', 'Aloha Annotation Service');
				},
				success: function(result) {
					var obj = jQuery.parseJSON(result);
					var suggestionsContainer = $("#suggestions input[type=text]");
					var suggestions = [];
					var ns_str = 'ns1';
					
					$.each(obj["#"], function(index, value) { 
						// search for namespace: http://fise.iks-project.eu/ontology/
						var re = new RegExp("http:\/\/fise.iks-project.eu\/ontology\/");
						var match = re.exec(value);
						if (match != null) {
							ns_str = index;
						}
					});
					
					// try / catch instead of:
					if (obj["@"] == undefined) {
						obj["@"] = [];
						obj["@"][0] = false;
					}
					
					for (i = 0; i < obj["@"].length; i++) {
						// nsX:entity-label or nsX:selected-text for suggestions
						var label = obj["@"][i][ns_str + ":entity-label"];
						if (label == undefined) {
							var label = obj["@"][i][ns_str + ":selected-text"];
						}
						
						if (label != undefined) {
							//var re = new RegExp('\"(.*)\"\^\^<\w+:\w+>'); // not working for "Tag Name"^^<ns5:string>
							var re = new RegExp('\"(.*)\"');
							var match = re.exec(label);
							
							if (match != null) {
								
								if (jQuery.inArray(match[1], suggestions) < 0) { // a bit of that is now also in the autoSuggest plugin
									suggestions.push(match[1]);
								}
							}
						}
					};
					
					for (i=0; i < suggestions.length; i++) {
						suggestionsContainer[0].add_selected_item({name:suggestions[i], value:suggestions[i]});
					}
				},
				error: function(result) {
					//alert('error');
					console.log('There was an error fetching the contents of the annotation service.');
				}
			});
		}
	});
};