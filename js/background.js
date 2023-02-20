
/**
 * Listen for tab updates
 */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    if (!changeInfo.url) return;

    if (changeInfo.url.includes("www.youtube.com")) {
        chrome.tabs.sendMessage(tab.id, "hello from background")
    }
});

