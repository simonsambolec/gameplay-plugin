/**
 * Waits for element with selector
 * @param {*} selector 
 * @returns 
 */
const waitForElm = (selector) => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
};

/**
 * Check if extension is disabled
 * @returns true if extension is disabled
 */
async function isDisabled() {
    result = await chrome.storage.local.get(["disabled"]);
    return result.disabled;
}