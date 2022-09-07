// ==UserScript==
// @name         Removes the blocking banner showing to unauthorized users on Reverso Context
// @namespace    https://context.reverso.net
// @version      1.0
// @author       MRGRD56
// @match        https://context.reverso.net*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function () {
    const EXTENSION_NAME = 'mrgrd56/reverso-context-unblocker';

    document.getElementById('blocked-results-banner')?.remove();
    document.getElementById('blocked-rude-results-banner')?.remove();

    const examplesContainer = document.getElementById('examples-content');
    if (!examplesContainer) {
        console.error(`[${EXTENSION_NAME}] unable to find '#examples-content' element, so could not show and unblur the hidden examples`);
        return;
    }

    const examples = examplesContainer.querySelectorAll('.example.blocked');
    if (!examples.length) {
        console.error(`[${EXTENSION_NAME}] unable to find '.example.blocked' elements, so could not show and unblur the hidden examples`);
        return;
    }

    examples.forEach(example => {
        example.classList.remove('blocked');
        example.style.display = null;
        if (example.getAttribute('style') === '') {
            example.removeAttribute('style');
        }
    });
})();
