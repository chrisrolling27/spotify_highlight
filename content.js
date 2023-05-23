function getSelectedText() {
    let text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "getText") {
            sendResponse({text: getSelectedText()});
        }
    }
);
