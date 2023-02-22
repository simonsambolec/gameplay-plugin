var toggleBtn = document.getElementById("extension-toggle");
var notification = document.getElementById("notification");
toggleBtn.addEventListener("click", toggleExtension);

async function main() {
    toggleBtn.checked = await isDisabled();
}

function toggleExtension() {
    chrome.runtime.sendMessage({
        request_type: "toggle_extension",
        value: toggleBtn.checked
    });
    notification.innerHTML = "Refresh your browser!";
}

main();