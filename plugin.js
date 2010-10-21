/*!
* Aloha Editor
* Author & Copyright (c) 2010 Gentics Software GmbH
* aloha-sales@gentics.com
* Licensed unter the terms of http://www.aloha-editor.com/license.html
*/

/**
 * register the plugin with unique name
 */
GENTICS.Aloha.Annotations = new GENTICS.Aloha.Plugin('com.gentics.aloha.plugins.Annotations');

/**
 * Configure the available languages
 */
GENTICS.Aloha.Annotations.languages = ['en', 'de'];

/**
 * Default configuration inserts Annotations as span element
 */
GENTICS.Aloha.Annotations.config.defaultElement = ['span'];

/**
 * Initialize the buttons
 */
GENTICS.Aloha.Annotations.createButtons = function () {
    var that = this;
	
	// add button to UI for manual annotations and auto-tagging
};

/**
 * Initialize the plugin
 */
GENTICS.Aloha.Annotations.init = function () {
	
};
