
var videos = {};

/**
 * 
 */
async function main() {
    addTabUpdateListener();
    addMessageListener();

    videos = await httpGet("https://raw.githubusercontent.com/simonsambolec/gameplay-plugin/main/assets/videos.json");
    console.log(videos)
}


/**
 * Listen for messages
 */
function addMessageListener() {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log(request, sender)
            if (request.request_type === "request_videos") {
                chrome.tabs.sendMessage(sender.tab.id, videos)
            }
        }
    );
}


/**
 * Listener for tab updates
 */
function addTabUpdateListener() {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

        if (!changeInfo.url) return;

        if (changeInfo.url.includes("www.youtube.com")) {
            try {
                chrome.tabs.sendMessage(tabId, "hello from background")
            } catch (error) {
                console.log(error.message)
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