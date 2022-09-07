// ==UserScript==
// @name         Remove the blocking banner showing to unauthorized users on Reverso Context
// @namespace    https://context.reverso.net
// @version      1.0
// @author       MRGRD56
// @match        https://context.reverso.net*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function () {
    const EXTENSION_NAME = 'mrgrd56/reverso-context-unblocker';

    const onNodeAdded = (handler) => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (!mutation.addedNodes) {
                    return;
                }

                for (const addedNode of mutation.addedNodes) {
                    const isHandled = handler(addedNode);
                    if (isHandled) {
                        observer.disconnect();
                    }
                }
            })
        })

        observer.observe(document.body, {
            childList: true
            , subtree: true
            , attributes: false
            , characterData: false
        })
    };

    const unblockExamples = () => {
        try {
            document.getElementById('blocked-results-banner')?.remove();
            document.getElementById('blocked-rude-results-banner')?.remove();

            const examplesContainer = document.getElementById('examples-content');
            if (!examplesContainer) {
                return;
            }

            const examples = examplesContainer.querySelectorAll('.example.blocked');
            if (!examples.length) {
                return;
            }

            examples.forEach(example => {
                example.classList.remove('blocked');
                if (example.display === 'none') {
                    example.style.display = null;
                }
                if (example.getAttribute('style') === '') {
                    example.removeAttribute('style');
                }
            });
        } catch (e) {
            console.error(`An error occurred in script '${EXTENSION_NAME}'`)
            throw e;
        }
    };

    if (document.getElementById('blocked-results-banner')) {
        unblockExamples();
        return;
    }

    onNodeAdded((addedNode) => {
        if (addedNode.id !== 'blocked-results-banner') {
            return false;
        }

        try {
            return true;
        } finally {
            unblockExamples();
        }
    });
})();
