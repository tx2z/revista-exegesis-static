/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-cloud-download' : '&#xe000;',
			'icon-arrow-right' : '&#xe001;',
			'icon-arrow-left' : '&#xe002;',
			'icon-google-plus' : '&#xe003;',
			'icon-facebook' : '&#xe004;',
			'icon-twitter' : '&#xe005;',
			'icon-feed' : '&#xe006;',
			'icon-pinterest' : '&#xe007;',
			'icon-html5' : '&#xe008;',
			'icon-css3' : '&#xe009;',
			'icon-wordpress' : '&#xe00a;',
			'icon-menu' : '&#xe00b;',
			'icon-share' : '&#xe00c;',
			'icon-attachment' : '&#xe00d;',
			'icon-link' : '&#xe00e;',
			'icon-folder' : '&#xe00f;',
			'icon-download' : '&#xe010;',
			'icon-untitled' : '&#xf000;',
			'icon-paypal' : '&#xe011;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};