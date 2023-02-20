var videos = {};

/**
 * 
 */
async function main() {
    addTabUpdateListener();
    videos = await httpGet("https://raw.githubusercontent.com/simonsambolec/gameplay-plugin/main/assets/videos.json");
    console.log(videos)
}

/**
 * Listener for tab updates
 */
function addTabUpdateListener() {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

        if (!changeInfo.url) return;

        if (changeInfo.url.includes("www.youtube.com")) {
            chrome.tabs.sendMessage(tab.id, "hello from background")
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