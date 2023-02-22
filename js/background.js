
var videos = {};
var disabled = false;


async function main() {
    disabled = await isDisabled();

    addTabUpdateListener();
    addMessageListener();

    videos = await httpGet("https://raw.githubusercontent.com/simonsambolec/gameplay-plugin/main/assets/videos.json");
}

async function isDisabled() {
    result = await chrome.storage.local.get(["disabled"]);
    return result.disabled;
}


/**
 * Listen for messages
 */
function addMessageListener() {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            //console.log(request, sender)
            if (request.request_type === "request_videos") {
                requestVideos(sender);
            }
            if (request.request_type === "toggle_extension") {
                toggleExtension(request.value)
            }
        }
    );
}

/**
 * Toggles extension
 * @param {*} value true if disabled, false if enabled
 */
function toggleExtension(value) {
    chrome.storage.local.set({ disabled: value }).then(() => {
        disabled = value;
    });
}

function requestVideos(sender) {
    chrome.tabs.sendMessage(sender.tab.id, { request_type: "video_data", data: videos })
}


/**
 * Listener for tab updates
 */
function addTabUpdateListener() {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (!changeInfo.url) return;

        if (changeInfo.url.includes("www.youtube.com")) {
            try {
                chrome.tabs.sendMessage(tabId, { request_type: "url_change" })
            } catch (error) {
                console.log(error)
            }
        }
    });
}



/**
 * 
 * @param {string} url 
 * @returns 
 */
async function httpGet(url) {
    let response = await fetch(url)
        .then((response) => response.json())
    return response;
}

main();