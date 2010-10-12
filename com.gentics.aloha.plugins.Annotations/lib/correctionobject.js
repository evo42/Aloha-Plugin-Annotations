/*!
* Aloha Editor
* Author & Copyright (c) 2010 Gentics Software GmbH
* aloha-sales@gentics.com
* Licensed unter the terms of http://www.aloha-editor.com/license.html
*/

/**
 * Correction object
 * Example:
 * var foaf = new GENTICS.Aloha.Annotations.Namespace ('foaf', 'http://xmlns.com/foaf/0.1')
 */
GENTICS.Aloha.Annotations.Correction = function(prefix, uri) {
	
	// @todo check URI if NS is available
	
	this.prefix = prefix;
	this.uri = uri;
};