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
GENTICS.Aloha.Annotations.Services.zemanta = new GENTICS.Aloha.Annotations.Service('com.gentics.aloha.plugins.Annotations.service.zemanta');

/**
 * If no API key is given, the public service is searched:
 * @property
 * @cfg
 */
GENTICS.Aloha.Annotations.Services.zemanta.settings.ApiKey = '1234567890';
GENTICS.Aloha.Annotations.Services.zemanta.settings.ResponseFormat = 'rdfxml';

/**
 * init Zemanta Service
 */
GENTICS.Aloha.Annotations.Services.zemanta.init = function() {
	var that = this;
	
	// see: http://developer.zemanta.com/docs/suggest_markup/
	
	// REST API Endpoint URL.
	this.ApiEndpoint = "http://api.zemanta.com/services/rest/0.0/";
	
	// API method
	this.ApiMethod = "zemanta.suggest_markup";
	
	// "xml", "json", "rdfxml"
	this.ResponseFormat = "rdfxml"; 
		
	if ( this.settings.ApiKey ) {
		// set the repository name
		this.repositoryName = 'zemanta/' + this.settings.ApiKey;
	} else {
		// set the repository name
		this.repositoryName = 'zemanta/public';
	}
};