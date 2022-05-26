import Prism from 'prismjs';

Prism.languages.manoasm = {
	'comment': {
		pattern: /\/.*/,
		greedy: true
	},
	'directive': {
		pattern: /\b(?:ORG|DEC|HEX|END)\b/i,
		alias: 'property'
	},
	'instruction': {
		pattern: /\b(?:AND|ADD|LDA|STA|BUN|BSA|ISZ|CLA|CLE|CMA|CME|CIR|CIL|INC|SPA|SNA|SZA|SZE|HLT|INP|OUT|SKI|SKO|ION|IOF)\b/i,
		lookbehind: true,
		alias: 'keyword'
	},
	'number': /(?:\b[2-9]_\d+|(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:e-?\d+)?|\b0(?:[fd]_|x)[0-9a-f]+|&[0-9a-f]+)\b/i,
};

Prism.languages['mano-asm'] = Prism.languages.manoasm;