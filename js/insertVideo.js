var videos = {};
console.log("yo")

async function main() {
    console.log("disabled", await isDisabled());
    if (await isDisabled()) return;

    addMessageListener();

    chrome.runtime.sendMessage({ request_type: "request_videos" });

    try {
        let elm = await waitForElm("#primary-inner")
        elm.insertBefore(createVideo(), elm.children[1]);
        playRandomVideo();
    } catch (error) {
        console.log("Element not found or: " + error);
    }

}

function addMessageListener() {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log(request)
            if (request.request_type === "url_change") {
                playRandomVideo();
            }
            if (request.request_type === "video_data") {
                videos = request.data.videos;
            }
        }
    );
}


/**
 * 
 * @returns 
 */
function createVideo() {
    return htmlToElement(`
    <div class="youtube-container">
    <iframe width="560" id="youtube-longs-iframe" height="315" class="gameplay-embeded-video" src="https://www.youtube.com/embed/7ghSziUQnhs?controls=0&amp;start=1000&autoplay=1&mute=1&loop=1&vq=small" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
 * Changed <iframe/> video src
 */
async function playRandomVideo() {
    if (await isDisabled()) return;
    document.getElementById("youtube-longs-iframe").src = buildURL(getRandomVideo());
}

/**
 * 
 * @returns random video from JSON
 */
function getRandomVideo() {
    return videos[Math.floor(Math.random() * videos.length)];
}

/**
 * Returns video URL prepared for <iframe />
 * @param {*} video 
 * @returns 
 */
function buildURL(video) {
    const start = getRndInteger(50, video.length);
    return `https://www.youtube.com/embed/${video.url}?controls=0&amp;start=${start}&autoplay=1&mute=1&loop=1&vq=small`;
}

/**
 * Returns random int between min (included) and max
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


main();