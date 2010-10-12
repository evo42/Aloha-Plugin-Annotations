/*!
* Aloha Editor
* Author & Copyright (c) 2010 Gentics Software GmbH
* aloha-sales@gentics.com
* Licensed unter the terms of http://www.aloha-editor.com/license.html
*/

/**
 * Annotation object
 * Example:
 * var rdfa_example = new GENTICS.Aloha.Annotations.Annotation ({rel:'', rev:''})
 *
 *  rel a whitespace separated list of CURIEs, used for expressing relationships between two resources ('predicates' in RDF terminology);
 * rev a whitespace separated list of CURIEs, used for expressing reverse relationships between two resources (also 'predicates’);
 * content a string, for supplying machine-readable content for a literal (a 'plain literal object', in RDF terminology);
 * href a URI for expressing the partner resource of a relationship (a 'resource object', in RDF terminology);
 * src a URI for expressing the partner resource of a relationship when the resource is embedded (also a 'resource object’).
 * about a URIorSafeCURIE, used for stating what the data is about (a 'subject' in RDF terminology);
 * property a whitespace separated list of CURIEs, used for expressing relationships between a subject and some literal text (also a 'predicate’);
 * resource a URIorSafeCURIE for expressing the partner resource of a relationship that is not intended to be 'clickable' (also an 'object’);
 * datatype a CURIE representing a datatype, to express the datatype of a literal;
 * typeof a whitespace separated list of CURIEs that indicate the RDF type(s) to associate with a subject.
*/
GENTICS.Aloha.Annotations.Annotation = function(attrs, namespaces) {	
	
	this.namespaces = namespaces;
	
	if (attrs) {
		this.attrs = attrs;
		try {
			this.rel = this.getAttr('rel');
			this.rev = this.getAttr('rev');
			this.content = this.getAttr('content');
			this.href = this.getAttr('href');
			this.src = this.getAttr('src');
			this.about = this.getAttr('about');
			this.property = this.getAttr('property');
			this.resource = this.getAttr('resource');
			this.datatype = this.getAttr('datatype');
			this.type = this.getAttr('type');
		} catch () {
			
		}
	}
};


GENTICS.Aloha.Annotations.Annotation.prototype.getAttr(name) {
	
	// RDFa datatype namespace check
	// http://www.w3.org/TR/rdfa-syntax/#sec_9.1.
	// @todo rel + rev is also a valid value of: http://www.w3.org/TR/rdfa-syntax/#relValues
	if (jQuery.inArray(name, ['rel','rev','property','type'])) {

		var curies = this.attrs[name].split(' ');

		for (var i = 0; i < curies.length; i++) {
			this.isCURIE( curies[i].trim() );
		}

	} else if (jQuery.inArray(name, ['datatype'])) {

		this.isCURIE( this.attrs[name].trim() );

	} else if (jQuery.inArray(name, 'about','resource')) {

		this.isURIorSafeCURIE( this.attrs[name].trim() );
			
	}
	
	/*
	// @todo check URL
	if (jQuery.(name,['href','src'])) {
		
	}*/
	
	return value;
}

// http://www.w3.org/TR/rdfa-syntax/#s_datatypes
GENTICS.Aloha.Annotations.Annotation.prototype.isCURIE(value) {
	var v = value.split(':');
	var regex = new RegExp('(([\i-[:]][\c-[:]]*)?:)?.+');

	if (value.match(regex)) {
		if (this.inNamespace(v[0])) {
			return value;
		} else {
			throw 'Annotation object: unknown namespace: ' + value;
		}
	} else {
		throw 'Annotation object: invalid CURIE: ' + value;
	}
}

// http://www.w3.org/TR/rdfa-syntax/#s_datatypes
GENTICS.Aloha.Annotations.Annotation.prototype.isURIorSafeCURIE(value) {
	var v = value.split(':');
	var safeCURIEregex = new RegExp('\[(([\i-[:]][\c-[:]]*)?:)?.+\]');
	var URIregex = new RegExp('^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)');

	if (value.match(safeCURIEregex) || value.match(URIregex)) {
		if (this.inNamespace(v[0])) {
			return value;
		} else {
			throw 'Annotation object: unknown namespace: ' + value;
		}
	} else {
			throw 'Annotation object: invalid URIorSafeCURIE: ' + value;
	}
}

GENTICS.Aloha.Annotations.Annotation.prototype.inNamespace(prefix) {
	for (var i = 0; i < this.namespaces; i++) {
		if (this.namespaces[i].prefix == prefix) {
			return true;
		} 
	}
	
	return false;
}
