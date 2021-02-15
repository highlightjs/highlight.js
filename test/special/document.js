import { JSDOM } from 'jsdom';
import * as utility from '../utility.js';
import nested from '../fixtures/nested.js';

const filename = utility.buildPath('fixtures', 'index.html');
const { window } = await JSDOM.fromFile(filename);

// Allows hljs to use document
export const document = window.document;

// Special language to test endsWithParentVariants
hljs.registerLanguage('nested', nested);

// Setup hljs environment
hljs.configure({ tabReplace: '    ' });
let blocks = document.querySelectorAll('pre code');
blocks.forEach(hljs.highlightElement);

// Setup hljs for non-`<pre><code>` tests
hljs.configure({ useBR: true });

blocks = document.querySelectorAll('.code');
blocks.forEach(hljs.highlightElement);
