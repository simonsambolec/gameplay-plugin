waitForElm("#primary-inner").then(elm => {
    elm.insertBefore(createVideo(), elm.children[1]);
});

/**
 * 
 * @returns 
 */
function createVideo() {
    return htmlToElement(`
    <div class="youtube-container">
    <iframe width="560" height="315" class="gameplay-embeded-video" src="https://www.youtube.com/embed/7ghSziUQnhs?controls=0&amp;start=1000&autoplay=1&mute=1&loop=1&vq=small" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    `)
}

/**
 * Converts string to HTML
 * @param {string} html 
 * @returns HTML element from string
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

/**
 * Listen for URL change from background script
 */
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
    }
);
